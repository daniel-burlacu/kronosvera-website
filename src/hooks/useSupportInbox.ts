import { useCallback, useEffect, useState } from "react";

import type {
  SupportRequestDetail,
  SupportRequestNote,
  SupportRequestStatus,
  SupportRequestSummary,
  SupportRequestTranslation,
  SupportRequestTranslationField,
} from "../lib/admin-api";
import {
  createSupportRequestNote,
  deleteSupportRequestNote,
  getSupportRequestAttachmentAccessUrl,
  getSupportRequestDetail,
  getSupportRequestNotes,
  getSupportRequests,
  softDeleteSupportRequest,
  translateSupportRequestField,
  updateSupportRequestNote,
  updateSupportRequestStatus,
} from "../lib/admin-api";

export const supportInboxStatuses: readonly SupportRequestStatus[] = [
  "todo",
  "in_progress",
  "blocked",
  "waiting",
  "done",
];

type TranslationCache = Record<
  string,
  Partial<Record<SupportRequestTranslationField, SupportRequestTranslation>>
>;

type UseSupportInboxInput = {
  enabled: boolean;
  getAccessToken: () => Promise<string>;
};

const SUPPORT_INBOX_POLL_INTERVAL_MS = 15000;

export type SupportInboxState = {
  activeStatus: SupportRequestStatus;
  createNote: (body: string) => Promise<void>;
  deleteRequest: (deleteNote?: string) => Promise<void>;
  deleteNote: (supportRequestNoteId: string) => Promise<void>;
  detail: SupportRequestDetail | null;
  detailError: string | null;
  detailLoading: boolean;
  deletingRequest: boolean;
  deletingNoteId: string | null;
  listError: string | null;
  listLoading: boolean;
  mutationError: string | null;
  notes: SupportRequestNote[];
  pendingStatus: SupportRequestStatus | null;
  requests: SupportRequestSummary[];
  resolveAttachmentAccessUrl: (attachmentId: string) => Promise<string>;
  reload: () => Promise<void>;
  selectRequest: (supportRequestId: string) => void;
  selectedRequestId: string | null;
  setActiveStatus: (status: SupportRequestStatus) => void;
  translateField: (field: SupportRequestTranslationField) => Promise<void>;
  translatingField: SupportRequestTranslationField | null;
  translationError: string | null;
  translations: Partial<
    Record<SupportRequestTranslationField, SupportRequestTranslation>
  >;
  updateNote: (supportRequestNoteId: string, body: string) => Promise<void>;
  updateStatus: (status: SupportRequestStatus) => Promise<void>;
  upsertingNoteId: string | null;
};

const syncSelectedRequest = (
  previousSelectedRequestId: string | null,
  requests: SupportRequestSummary[],
): string | null => {
  if (requests.length === 0) {
    return null;
  }
  if (
    previousSelectedRequestId &&
    requests.some((request) => request.id === previousSelectedRequestId)
  ) {
    return previousSelectedRequestId;
  }
  return requests[0]?.id ?? null;
};

export const useSupportInbox = ({
  enabled,
  getAccessToken,
}: UseSupportInboxInput): SupportInboxState => {
  const [activeStatus, setActiveStatus] =
    useState<SupportRequestStatus>("todo");
  const [requests, setRequests] = useState<SupportRequestSummary[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null,
  );
  const [detail, setDetail] = useState<SupportRequestDetail | null>(null);
  const [notes, setNotes] = useState<SupportRequestNote[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [deletingRequest, setDeletingRequest] = useState(false);
  const [translatingField, setTranslatingField] =
    useState<SupportRequestTranslationField | null>(null);
  const [pendingStatus, setPendingStatus] =
    useState<SupportRequestStatus | null>(null);
  const [upsertingNoteId, setUpsertingNoteId] = useState<string | null>(null);
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);
  const [translationCache, setTranslationCache] = useState<TranslationCache>(
    {},
  );

  const loadRequests = useCallback(
    async (options?: { silent?: boolean }): Promise<void> => {
      const silent = options?.silent ?? false;
      if (!silent) {
        setListLoading(true);
      }
      setListError(null);
    try {
      const token = await getAccessToken();
      const nextRequests = await getSupportRequests(token, {
        status: activeStatus,
      });
      setRequests(nextRequests);
      setSelectedRequestId((current) =>
        syncSelectedRequest(current, nextRequests),
      );
    } catch (error) {
      setRequests([]);
      setSelectedRequestId(null);
      setListError(
        error instanceof Error
          ? error.message
          : "Failed to load support requests.",
      );
    } finally {
      if (!silent) {
        setListLoading(false);
      }
    }
    },
    [activeStatus, getAccessToken],
  );

  useEffect(() => {
    if (!enabled) {
      setRequests([]);
      setSelectedRequestId(null);
      setDetail(null);
      setNotes([]);
      setListError(null);
      setDetailError(null);
      setMutationError(null);
      setTranslationError(null);
      setTranslationCache({});
      return;
    }

    void loadRequests();
  }, [enabled, loadRequests]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timer = setInterval(() => {
      void loadRequests({ silent: true });
    }, SUPPORT_INBOX_POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [enabled, loadRequests]);

  useEffect(() => {
    if (!enabled || !selectedRequestId) {
      setDetail(null);
      setNotes([]);
      setDetailError(null);
      return;
    }

    let isCancelled = false;

    const loadDetail = async () => {
      setDetailLoading(true);
      setDetailError(null);
      try {
        const token = await getAccessToken();
        const [nextDetail, nextNotes] = await Promise.all([
          getSupportRequestDetail(token, selectedRequestId),
          getSupportRequestNotes(token, selectedRequestId),
        ]);
        if (isCancelled) {
          return;
        }
        setDetail(nextDetail);
        setNotes(nextNotes);
      } catch (error) {
        if (isCancelled) {
          return;
        }
        setDetail(null);
        setNotes([]);
        setDetailError(
          error instanceof Error
            ? error.message
            : "Failed to load the selected support request.",
        );
      } finally {
        if (!isCancelled) {
          setDetailLoading(false);
        }
      }
    };

    void loadDetail();

    return () => {
      isCancelled = true;
    };
  }, [enabled, getAccessToken, selectedRequestId]);

  const translateField = async (
    field: SupportRequestTranslationField,
  ): Promise<void> => {
    if (!detail) {
      return;
    }

    const cachedTranslation = translationCache[detail.id]?.[field];
    if (cachedTranslation) {
      return;
    }

    setTranslatingField(field);
    setTranslationError(null);
    try {
      const token = await getAccessToken();
      const translation = await translateSupportRequestField(
        token,
        detail.id,
        field,
      );
      setTranslationCache((current) => ({
        ...current,
        [detail.id]: {
          ...(current[detail.id] ?? {}),
          [field]: translation,
        },
      }));
    } catch (error) {
      setTranslationError(
        error instanceof Error
          ? error.message
          : "Failed to translate support request text.",
      );
    } finally {
      setTranslatingField(null);
    }
  };

  const updateStatus = async (status: SupportRequestStatus): Promise<void> => {
    if (!detail || detail.status === status) {
      return;
    }

    setPendingStatus(status);
    setMutationError(null);
    try {
      const token = await getAccessToken();
      const updatedDetail = await updateSupportRequestStatus(
        token,
        detail.id,
        status,
      );
      setDetail(updatedDetail);
      setActiveStatus(status);
    } catch (error) {
      setMutationError(
        error instanceof Error
          ? error.message
          : "Failed to update support request status.",
      );
    } finally {
      setPendingStatus(null);
    }
  };

  const createNote = async (body: string): Promise<void> => {
    if (!detail) {
      return;
    }

    setUpsertingNoteId("new");
    setMutationError(null);
    try {
      const token = await getAccessToken();
      const note = await createSupportRequestNote(token, detail.id, body);
      setNotes((current) => [...current, note]);
    } catch (error) {
      setMutationError(
        error instanceof Error ? error.message : "Failed to create note.",
      );
    } finally {
      setUpsertingNoteId(null);
    }
  };

  const updateNote = async (
    supportRequestNoteId: string,
    body: string,
  ): Promise<void> => {
    setUpsertingNoteId(supportRequestNoteId);
    setMutationError(null);
    try {
      const token = await getAccessToken();
      const note = await updateSupportRequestNote(
        token,
        supportRequestNoteId,
        body,
      );
      setNotes((current) =>
        current.map((item) => (item.id === supportRequestNoteId ? note : item)),
      );
    } catch (error) {
      setMutationError(
        error instanceof Error ? error.message : "Failed to update note.",
      );
    } finally {
      setUpsertingNoteId(null);
    }
  };

  const deleteNote = async (supportRequestNoteId: string): Promise<void> => {
    setDeletingNoteId(supportRequestNoteId);
    setMutationError(null);
    try {
      const token = await getAccessToken();
      await deleteSupportRequestNote(token, supportRequestNoteId);
      setNotes((current) =>
        current.filter((item) => item.id !== supportRequestNoteId),
      );
    } catch (error) {
      setMutationError(
        error instanceof Error ? error.message : "Failed to delete note.",
      );
    } finally {
      setDeletingNoteId(null);
    }
  };

  const deleteRequest = async (deleteNote?: string): Promise<void> => {
    if (!detail) {
      return;
    }

    setDeletingRequest(true);
    setMutationError(null);
    try {
      const token = await getAccessToken();
      await softDeleteSupportRequest(token, detail.id, deleteNote?.trim());
      const remainingRequests = requests.filter(
        (item) => item.id !== detail.id,
      );
      setRequests(remainingRequests);
      setSelectedRequestId(syncSelectedRequest(null, remainingRequests));
      setDetail(null);
      setNotes([]);
    } catch (error) {
      setMutationError(
        error instanceof Error
          ? error.message
          : "Failed to delete support request.",
      );
    } finally {
      setDeletingRequest(false);
    }
  };

  const resolveAttachmentAccessUrl = async (
    attachmentId: string,
  ): Promise<string> => {
    if (!detail) {
      throw new Error("Support request detail is unavailable.");
    }

    const token = await getAccessToken();
    const response = await getSupportRequestAttachmentAccessUrl(
      token,
      detail.id,
      attachmentId,
    );
    return response.url;
  };

  return {
    activeStatus,
    createNote,
    deleteRequest,
    deleteNote,
    detail,
    detailError,
    detailLoading,
    deletingRequest,
    deletingNoteId,
    listError,
    listLoading,
    mutationError,
    notes,
    pendingStatus,
    requests,
    resolveAttachmentAccessUrl,
    reload: loadRequests,
    selectRequest: setSelectedRequestId,
    selectedRequestId,
    setActiveStatus,
    translateField,
    translatingField,
    translationError,
    translations: detail ? (translationCache[detail.id] ?? {}) : {},
    updateNote,
    updateStatus,
    upsertingNoteId,
  };
};
