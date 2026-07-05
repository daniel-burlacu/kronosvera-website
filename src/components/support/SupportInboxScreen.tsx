import { Stack, Typography } from "@mui/material";

import type { AdminUserRole } from "../../lib/admin-api";
import type { DeletedSupportRequestsState } from "../../hooks/useDeletedSupportRequests";
import type { SupportInboxState } from "../../hooks/useSupportInbox";
import { DeletedSupportPanel } from "./DeletedSupportPanel";
import { SupportInboxTabs } from "./SupportInboxTabs";
import { SupportTicketDetail } from "./SupportTicketDetail";
import { SupportTicketList } from "./SupportTicketList";

type SupportInboxScreenProps = {
  adminRole: AdminUserRole;
  deletedState: DeletedSupportRequestsState;
  onDeleteRequest: (deleteNote?: string) => Promise<void>;
  onRestoreDeletedRequest: () => Promise<void>;
  state: SupportInboxState;
};

export function SupportInboxScreen({
  adminRole,
  deletedState,
  onDeleteRequest,
  onRestoreDeletedRequest,
  state,
}: SupportInboxScreenProps) {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h5">Support inbox</Typography>
        <Typography color="text.secondary">
          Browse active tickets by workflow status, inspect the full request,
          and translate the original subject or message to English on demand.
          {adminRole === "support_super_admin"
            ? " Super-admin controls like purge will be added in a later slice."
            : ""}
        </Typography>
      </Stack>

      <SupportInboxTabs
        activeStatus={state.activeStatus}
        onChange={state.setActiveStatus}
      />

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2.5}>
        <Stack spacing={1.5} sx={{ flex: { lg: "0 0 32%" } }}>
          <Typography variant="subtitle2">Ticket subjects</Typography>
          <SupportTicketList
            error={state.listError ?? undefined}
            loading={state.listLoading}
            onSelect={state.selectRequest}
            requests={state.requests}
            selectedRequestId={state.selectedRequestId ?? undefined}
          />
        </Stack>

        <Stack spacing={1.5} sx={{ flex: 1 }}>
          <Typography variant="subtitle2">Ticket detail</Typography>
          <SupportTicketDetail
            createNote={state.createNote}
            deleteNote={state.deleteNote}
            detail={state.detail}
            detailError={state.detailError ?? undefined}
            deletingRequest={state.deletingRequest}
            deletingNoteId={state.deletingNoteId}
            loading={state.detailLoading}
            mutationError={state.mutationError ?? undefined}
            notes={state.notes}
            onChangeStatus={state.updateStatus}
            onDeleteRequest={onDeleteRequest}
            onResolveAttachmentAccessUrl={state.resolveAttachmentAccessUrl}
            onTranslate={state.translateField}
            pendingStatus={state.pendingStatus}
            translatingField={state.translatingField}
            translationError={state.translationError ?? undefined}
            translations={state.translations}
            updateNote={state.updateNote}
            upsertingNoteId={state.upsertingNoteId}
          />
        </Stack>
      </Stack>

      <DeletedSupportPanel
        adminRole={adminRole}
        onRestore={onRestoreDeletedRequest}
        state={deletedState}
      />
    </Stack>
  );
}
