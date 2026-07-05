import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SupportInboxScreen } from "./SupportInboxScreen";
import type { DeletedSupportRequestsState } from "../../hooks/useDeletedSupportRequests";
import type { SupportInboxState } from "../../hooks/useSupportInbox";

const buildState = (): SupportInboxState => ({
  activeStatus: "todo",
  createNote: vi.fn(async () => {}),
  deleteRequest: vi.fn(async () => {}),
  deleteNote: vi.fn(async () => {}),
  detail: {
    attachmentCount: 1,
    attachments: [
      {
        createdAt: "2026-07-05T10:00:00.000Z",
        downloadUrl: "/v1/admin/support-requests/req-1/attachments/att-1",
        fileName: "screen.webp",
        fileSizeBytes: 1200,
        id: "att-1",
        mimeType: "image/webp",
      },
    ],
    createdAt: "2026-07-05T10:00:00.000Z",
    id: "req-1",
    message: "Butonul Google se inchide fara sa ma autentifice.",
    metadata: { locale: "ro" },
    status: "todo",
    subject: "Nu ma pot loga in aplicatie",
    updatedAt: "2026-07-05T10:00:00.000Z",
    user: { email: "user@example.com", id: "user-1" },
  },
  detailError: null,
  detailLoading: false,
  deletingRequest: false,
  deletingNoteId: null,
  listError: null,
  listLoading: false,
  mutationError: null,
  notes: [
    {
      author: { email: "admin@example.com", id: "admin-1" },
      body: "Waiting for a clearer reproduction path.",
      createdAt: "2026-07-05T10:05:00.000Z",
      id: "note-1",
      updatedAt: "2026-07-05T10:05:00.000Z",
    },
  ],
  pendingStatus: null,
  requests: [
    {
      attachmentCount: 1,
      createdAt: "2026-07-05T10:00:00.000Z",
      id: "req-1",
      message: "Butonul Google se inchide fara sa ma autentifice.",
      status: "todo",
      subject: "Nu ma pot loga in aplicatie",
      updatedAt: "2026-07-05T10:00:00.000Z",
      user: { email: "user@example.com", id: "user-1" },
    },
  ],
  resolveAttachmentAccessUrl: vi.fn(
    async () => "https://signed.example.com/image.webp",
  ),
  reload: vi.fn(async () => {}),
  selectRequest: vi.fn(),
  selectedRequestId: "req-1",
  setActiveStatus: vi.fn(),
  translateField: vi.fn(async () => {}),
  translatingField: null,
  translationError: null,
  translations: {
    subject: {
      field: "subject",
      sourceLanguage: "ro",
      targetLanguage: "en",
      translatedText: "I cannot log into the app",
    },
  },
  updateNote: vi.fn(async () => {}),
  updateStatus: vi.fn(async () => {}),
  upsertingNoteId: null,
});

const buildDeletedState = (): DeletedSupportRequestsState => ({
  detail: {
    attachmentCount: 0,
    attachments: [],
    createdAt: "2026-07-01T10:00:00.000Z",
    deletedAt: "2026-07-02T11:00:00.000Z",
    deletedBy: { email: "admin@example.com", id: "admin-1" },
    id: "deleted-1",
    message: "Deleted spam message",
    status: "todo",
    subject: "Deleted spam ticket",
    updatedAt: "2026-07-02T11:00:00.000Z",
    user: { email: "spam@example.com", id: "user-2" },
  },
  detailError: null,
  detailLoading: false,
  listError: null,
  listLoading: false,
  notes: [],
  purge: vi.fn(async () => {}),
  purgeResult: null,
  purging: false,
  reload: vi.fn(async () => {}),
  requests: [
    {
      attachmentCount: 0,
      createdAt: "2026-07-01T10:00:00.000Z",
      deletedAt: "2026-07-02T11:00:00.000Z",
      deletedBy: { email: "admin@example.com", id: "admin-1" },
      id: "deleted-1",
      message: "Deleted spam message",
      status: "todo",
      subject: "Deleted spam ticket",
      updatedAt: "2026-07-02T11:00:00.000Z",
      user: { email: "spam@example.com", id: "user-2" },
    },
  ],
  restoring: false,
  restoreSelected: vi.fn(async () => {}),
  selectRequest: vi.fn(),
  selectedRequestId: "deleted-1",
});

describe("SupportInboxScreen", () => {
  it("renders the ticket list, detail pane, deleted panel, and cached translation", () => {
    render(
      <SupportInboxScreen
        adminRole="support_super_admin"
        deletedState={buildDeletedState()}
        onDeleteRequest={vi.fn(async () => {})}
        onRestoreDeletedRequest={vi.fn(async () => {})}
        state={buildState()}
      />,
    );

    expect(screen.getByText(/support inbox/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/nu ma pot loga in aplicatie/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(/i cannot log into the app/i)).toBeInTheDocument();
    expect(
      screen.getByText(/waiting for a clearer reproduction path/i),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /translate to english/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: /in progress/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        /notes become read-only once the request leaves in progress/i,
      ).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("heading", { name: /deleted tickets/i }).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/deleted spam ticket/i).length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getByRole("button", { name: /move to deleted/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /restore ticket/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /purge deleted tickets/i }),
    ).toBeInTheDocument();
  });

  it("opens an image attachment preview and keeps fullscreen link available", async () => {
    const state = buildState();

    render(
      <SupportInboxScreen
        adminRole="support_super_admin"
        deletedState={buildDeletedState()}
        onDeleteRequest={vi.fn(async () => {})}
        onRestoreDeletedRequest={vi.fn(async () => {})}
        state={state}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /screen\.webp/i }));

    const previewDialog = await screen.findByRole("dialog");
    expect(previewDialog).toBeInTheDocument();
    expect(
      within(previewDialog).getByText(/screen\.webp/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /open full image/i }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(state.resolveAttachmentAccessUrl).toHaveBeenCalledWith("att-1");
    });
  });

  it("triggers restore for the selected deleted request", async () => {
    const onRestoreDeletedRequest = vi.fn(async () => {});

    render(
      <SupportInboxScreen
        adminRole="support_super_admin"
        deletedState={buildDeletedState()}
        onDeleteRequest={vi.fn(async () => {})}
        onRestoreDeletedRequest={onRestoreDeletedRequest}
        state={buildState()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /restore ticket/i }));

    await waitFor(() => {
      expect(onRestoreDeletedRequest).toHaveBeenCalledTimes(1);
    });
  });

  it("requires confirmation before purging deleted tickets", async () => {
    const deletedState = buildDeletedState();

    render(
      <SupportInboxScreen
        adminRole="support_super_admin"
        deletedState={deletedState}
        onDeleteRequest={vi.fn(async () => {})}
        onRestoreDeletedRequest={vi.fn(async () => {})}
        state={buildState()}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: /purge deleted tickets/i }),
    );

    expect(
      screen.getByRole("button", { name: /confirm purge 30\+ day tickets/i }),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /confirm purge 30\+ day tickets/i }),
    );

    await waitFor(() => {
      expect(deletedState.purge).toHaveBeenCalledWith(30);
    });
  });
});
