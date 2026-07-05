import { useCallback, useEffect, useState } from "react";

import type {
  SupportRequestDetail,
  SupportRequestNote,
  SupportRequestSummary,
} from "../lib/admin-api";
import {
  getSupportRequestDetail,
  getSupportRequestNotes,
  getSupportRequests,
  purgeDeletedSupportRequests,
  restoreSupportRequest,
} from "../lib/admin-api";

type UseDeletedSupportRequestsInput = {
  enabled: boolean;
  getAccessToken: () => Promise<string>;
};

const DELETED_SUPPORT_POLL_INTERVAL_MS = 15000;

export type DeletedSupportRequestsState = {
  detail: SupportRequestDetail | null;
  detailError: string | null;
  detailLoading: boolean;
  listError: string | null;
  listLoading: boolean;
  notes: SupportRequestNote[];
  purge: (olderThanDays: number) => Promise<void>;
  purgeResult: {
    deletedAttachmentCount: number;
    deletedTicketCount: number;
  } | null;
  purging: boolean;
  reload: () => Promise<void>;
  requests: SupportRequestSummary[];
  restoring: boolean;
  restoreSelected: () => Promise<void>;
  selectRequest: (supportRequestId: string) => void;
  selectedRequestId: string | null;
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

export const useDeletedSupportRequests = ({
  enabled,
  getAccessToken,
}: UseDeletedSupportRequestsInput): DeletedSupportRequestsState => {
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
  const [restoring, setRestoring] = useState(false);
  const [purging, setPurging] = useState(false);
  const [purgeResult, setPurgeResult] = useState<{
    deletedAttachmentCount: number;
    deletedTicketCount: number;
  } | null>(null);

  const reload = useCallback(
    async (options?: { silent?: boolean }): Promise<void> => {
      const silent = options?.silent ?? false;
      if (!silent) {
        setListLoading(true);
      }
      setListError(null);
    try {
      const token = await getAccessToken();
      const nextRequests = await getSupportRequests(token, {
        visibility: "deleted",
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
          : "Failed to load deleted support requests.",
      );
    } finally {
      if (!silent) {
        setListLoading(false);
      }
    }
    },
    [getAccessToken],
  );

  useEffect(() => {
    if (!enabled) {
      setRequests([]);
      setSelectedRequestId(null);
      setDetail(null);
      setNotes([]);
      setListError(null);
      setDetailError(null);
      setPurgeResult(null);
      return;
    }

    void reload();
  }, [enabled, reload]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timer = setInterval(() => {
      void reload({ silent: true });
    }, DELETED_SUPPORT_POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [enabled, reload]);

  useEffect(() => {
    if (!enabled || !selectedRequestId) {
      setDetail(null);
      setNotes([]);
      setDetailError(null);
      return;
    }

    let cancelled = false;

    const loadDetail = async (): Promise<void> => {
      setDetailLoading(true);
      setDetailError(null);
      try {
        const token = await getAccessToken();
        const [nextDetail, nextNotes] = await Promise.all([
          getSupportRequestDetail(token, selectedRequestId),
          getSupportRequestNotes(token, selectedRequestId),
        ]);
        if (cancelled) {
          return;
        }
        setDetail(nextDetail);
        setNotes(nextNotes);
      } catch (error) {
        if (cancelled) {
          return;
        }
        setDetail(null);
        setNotes([]);
        setDetailError(
          error instanceof Error
            ? error.message
            : "Failed to load deleted support request.",
        );
      } finally {
        if (!cancelled) {
          setDetailLoading(false);
        }
      }
    };

    void loadDetail();

    return () => {
      cancelled = true;
    };
  }, [enabled, getAccessToken, selectedRequestId]);

  const restoreSelected = async (): Promise<void> => {
    if (!detail) {
      return;
    }

    setRestoring(true);
    setDetailError(null);
    try {
      const token = await getAccessToken();
      await restoreSupportRequest(token, detail.id);
      const remainingRequests = requests.filter(
        (item) => item.id !== detail.id,
      );
      setRequests(remainingRequests);
      setSelectedRequestId(syncSelectedRequest(null, remainingRequests));
      setDetail(null);
      setNotes([]);
    } catch (error) {
      setDetailError(
        error instanceof Error
          ? error.message
          : "Failed to restore support request.",
      );
    } finally {
      setRestoring(false);
    }
  };

  const purge = async (olderThanDays: number): Promise<void> => {
    setPurging(true);
    setDetailError(null);
    try {
      const token = await getAccessToken();
      const result = await purgeDeletedSupportRequests(token, olderThanDays);
      setPurgeResult(result);
      await reload();
    } catch (error) {
      setDetailError(
        error instanceof Error
          ? error.message
          : "Failed to purge deleted support requests.",
      );
    } finally {
      setPurging(false);
    }
  };

  return {
    detail,
    detailError,
    detailLoading,
    listError,
    listLoading,
    notes,
    purge,
    purgeResult,
    purging,
    reload,
    requests,
    restoring,
    restoreSelected,
    selectRequest: setSelectedRequestId,
    selectedRequestId,
  };
};
