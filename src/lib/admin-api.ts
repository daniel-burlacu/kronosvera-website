import { fetchJson } from "./api";

export type AdminUserRole = "support_admin" | "support_super_admin";
export type SupportRequestStatus =
  "todo" | "in_progress" | "blocked" | "waiting" | "done";
export type SupportRequestVisibility = "active" | "all" | "deleted";
export type SupportRequestTranslationField = "subject" | "message";

export type AdminUserSession = {
  email: string;
  id: string;
  role: AdminUserRole;
};

export type SupportRequestSummary = {
  attachmentCount: number;
  createdAt: string;
  deletedAt?: string;
  deletedBy?: {
    email?: string;
    id: string;
  };
  id: string;
  message: string;
  status: SupportRequestStatus;
  subject: string;
  updatedAt: string;
  user: {
    email?: string;
    fullName?: string;
    id: string;
  };
};

export type SupportRequestAttachment = {
  createdAt: string;
  downloadUrl: string;
  fileName: string;
  fileSizeBytes: number;
  id: string;
  imageHeight?: number;
  imageWidth?: number;
  mimeType: string;
  openUrl?: string;
};

export type SupportRequestAttachmentAccessUrl = {
  expiresInSeconds: number;
  url: string;
};

export type SupportRequestDetail = SupportRequestSummary & {
  attachments: SupportRequestAttachment[];
  deleteNote?: string;
  metadata?: {
    appVersion?: string;
    locale?: string;
    platform?: "android" | "ios" | "web";
  };
};

export type SupportRequestNote = {
  author: {
    email: string;
    id?: string;
  };
  body: string;
  createdAt: string;
  id: string;
  updatedAt: string;
};

export type SupportRequestTranslation = {
  field: SupportRequestTranslationField;
  sourceLanguage: string;
  targetLanguage: "en";
  translatedText: string;
};

type SupportRequestStatusUpdateResponse = {
  request: SupportRequestDetail;
};

type PurgeDeletedSupportRequestsResponse = {
  deletedAttachmentCount: number;
  deletedTicketCount: number;
};

type SupportRequestNoteResponse = {
  note: SupportRequestNote;
};

type AdminMeResponse = {
  adminUser: AdminUserSession;
};

type SupportRequestDetailResponse = {
  request: SupportRequestDetail;
};

type SupportRequestListResponse = {
  requests: SupportRequestSummary[];
};

type SupportRequestNotesResponse = {
  notes: SupportRequestNote[];
};

const adminHeaders = (token: string): HeadersInit => ({
  Authorization: `Bearer ${token}`,
});

const supportRequestSearch = (input: {
  status?: SupportRequestStatus;
  visibility?: SupportRequestVisibility;
}): string => {
  const params = new URLSearchParams();
  if (input.status) {
    params.set("status", input.status);
  }
  if (input.visibility) {
    params.set("visibility", input.visibility);
  }
  const query = params.toString();
  return query.length > 0 ? `?${query}` : "";
};

export const getAdminSession = async (
  token: string,
): Promise<AdminUserSession> => {
  const response = await fetchJson<AdminMeResponse>("/v1/admin/me", {
    headers: adminHeaders(token),
  });
  return response.adminUser;
};

export const getSupportRequests = async (
  token: string,
  input: {
    status?: SupportRequestStatus;
    visibility?: SupportRequestVisibility;
  },
): Promise<SupportRequestSummary[]> => {
  const response = await fetchJson<SupportRequestListResponse>(
    `/v1/admin/support-requests${supportRequestSearch(input)}`,
    {
      headers: adminHeaders(token),
    },
  );
  return response.requests;
};

export const getSupportRequestDetail = async (
  token: string,
  supportRequestId: string,
): Promise<SupportRequestDetail> => {
  const response = await fetchJson<SupportRequestDetailResponse>(
    `/v1/admin/support-requests/${supportRequestId}`,
    {
      headers: adminHeaders(token),
    },
  );
  return response.request;
};

export const getSupportRequestNotes = async (
  token: string,
  supportRequestId: string,
): Promise<SupportRequestNote[]> => {
  const response = await fetchJson<SupportRequestNotesResponse>(
    `/v1/admin/support-requests/${supportRequestId}/notes`,
    {
      headers: adminHeaders(token),
    },
  );
  return response.notes;
};

export const translateSupportRequestField = async (
  token: string,
  supportRequestId: string,
  field: SupportRequestTranslationField,
): Promise<SupportRequestTranslation> => {
  return fetchJson<SupportRequestTranslation>(
    `/v1/admin/support-requests/${supportRequestId}/translate`,
    {
      body: JSON.stringify({ field, targetLanguage: "en" }),
      headers: {
        ...adminHeaders(token),
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );
};

export const updateSupportRequestStatus = async (
  token: string,
  supportRequestId: string,
  status: SupportRequestStatus,
): Promise<SupportRequestDetail> => {
  const response = await fetchJson<SupportRequestStatusUpdateResponse>(
    `/v1/admin/support-requests/${supportRequestId}/status`,
    {
      body: JSON.stringify({ status }),
      headers: {
        ...adminHeaders(token),
        "Content-Type": "application/json",
      },
      method: "PATCH",
    },
  );
  return response.request;
};

export const createSupportRequestNote = async (
  token: string,
  supportRequestId: string,
  body: string,
): Promise<SupportRequestNote> => {
  const response = await fetchJson<SupportRequestNoteResponse>(
    `/v1/admin/support-requests/${supportRequestId}/notes`,
    {
      body: JSON.stringify({ body }),
      headers: {
        ...adminHeaders(token),
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );
  return response.note;
};

export const updateSupportRequestNote = async (
  token: string,
  supportRequestNoteId: string,
  body: string,
): Promise<SupportRequestNote> => {
  const response = await fetchJson<SupportRequestNoteResponse>(
    `/v1/admin/support-request-notes/${supportRequestNoteId}`,
    {
      body: JSON.stringify({ body }),
      headers: {
        ...adminHeaders(token),
        "Content-Type": "application/json",
      },
      method: "PATCH",
    },
  );
  return response.note;
};

export const deleteSupportRequestNote = async (
  token: string,
  supportRequestNoteId: string,
): Promise<void> => {
  await fetchJson<void>(
    `/v1/admin/support-request-notes/${supportRequestNoteId}`,
    {
      headers: adminHeaders(token),
      method: "DELETE",
    },
  );
};

export const softDeleteSupportRequest = async (
  token: string,
  supportRequestId: string,
  deleteNote?: string,
): Promise<SupportRequestDetail> => {
  const response = await fetchJson<SupportRequestStatusUpdateResponse>(
    `/v1/admin/support-requests/${supportRequestId}/delete`,
    {
      body: JSON.stringify(deleteNote ? { deleteNote } : {}),
      headers: {
        ...adminHeaders(token),
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );
  return response.request;
};

export const restoreSupportRequest = async (
  token: string,
  supportRequestId: string,
): Promise<SupportRequestDetail> => {
  const response = await fetchJson<SupportRequestStatusUpdateResponse>(
    `/v1/admin/support-requests/${supportRequestId}/restore`,
    {
      body: JSON.stringify({}),
      headers: {
        ...adminHeaders(token),
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );
  return response.request;
};

export const purgeDeletedSupportRequests = async (
  token: string,
  olderThanDays: number,
): Promise<PurgeDeletedSupportRequestsResponse> => {
  return fetchJson<PurgeDeletedSupportRequestsResponse>(
    "/v1/admin/support-requests/purge-deleted",
    {
      body: JSON.stringify({ olderThanDays }),
      headers: {
        ...adminHeaders(token),
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );
};

export const getSupportRequestAttachmentAccessUrl = async (
  token: string,
  supportRequestId: string,
  attachmentId: string,
): Promise<SupportRequestAttachmentAccessUrl> => {
  return fetchJson<SupportRequestAttachmentAccessUrl>(
    `/v1/admin/support-requests/${supportRequestId}/attachments/${attachmentId}/url`,
    {
      headers: adminHeaders(token),
    },
  );
};
