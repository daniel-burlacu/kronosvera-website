export class ApiError extends Error {
  readonly status: number;
  readonly details: string | null;

  constructor(message: string, status: number, details: string | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const normalizedApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/$/, "") ?? "";

const buildApiUrl = (path: string): string => {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  return normalizedApiBaseUrl ? `${normalizedApiBaseUrl}${path}` : path;
};

const toErrorDetails = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") {
    return null;
  }
  const maybeDetails = "details" in payload ? payload.details : null;
  if (typeof maybeDetails === "string") {
    return maybeDetails;
  }
  return null;
};

const toErrorMessage = (payload: unknown, status: number): string => {
  if (payload && typeof payload === "object" && "error" in payload) {
    const maybeError = payload.error;
    if (typeof maybeError === "string" && maybeError.length > 0) {
      return maybeError;
    }
  }
  return `Request failed with status ${status}`;
};

export const fetchJson = async <T>(
  path: string,
  init: RequestInit = {},
): Promise<T> => {
  const response = await fetch(buildApiUrl(path), init);
  const payload = (await response.json().catch(() => null)) as unknown;
  if (!response.ok) {
    throw new ApiError(
      toErrorMessage(payload, response.status),
      response.status,
      toErrorDetails(payload),
    );
  }
  return payload as T;
};
