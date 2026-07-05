import {
  Alert,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import type { AdminUserRole } from "../../lib/admin-api";
import type { DeletedSupportRequestsState } from "../../hooks/useDeletedSupportRequests";
import { SupportTicketDetail } from "./SupportTicketDetail";
import { SupportTicketList } from "./SupportTicketList";

type DeletedSupportPanelProps = {
  adminRole: AdminUserRole;
  onRestore: () => Promise<void>;
  state: DeletedSupportRequestsState;
};

const purgePresets = [7, 14, 30, 90] as const;

function PurgeControls({
  onPurge,
  purgeResult,
  purging,
}: {
  onPurge: (olderThanDays: number) => Promise<void>;
  purgeResult: DeletedSupportRequestsState["purgeResult"];
  purging: boolean;
}) {
  const [olderThanDays, setOlderThanDays] = useState<number>(30);
  const [confirming, setConfirming] = useState(false);

  const trigger = async (): Promise<void> => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    await onPurge(olderThanDays);
    setConfirming(false);
  };

  return (
    <Paper sx={{ borderRadius: 4, p: 2.5 }} variant="outlined">
      <Stack spacing={1.5}>
        <Typography variant="subtitle2">Purge deleted tickets</Typography>
        <Typography color="text.secondary" variant="body2">
          Permanently remove deleted tickets older than the selected retention
          window.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <TextField
            label="Older than"
            onChange={(event) => setOlderThanDays(Number(event.target.value))}
            select
            size="small"
            value={String(olderThanDays)}
          >
            {purgePresets.map((value) => (
              <MenuItem key={value} value={String(value)}>
                {value} days
              </MenuItem>
            ))}
          </TextField>
          <Button
            color={confirming ? "error" : "primary"}
            onClick={() => void trigger()}
            variant="contained"
          >
            {purging
              ? "Purging…"
              : confirming
                ? `Confirm purge ${olderThanDays}+ day tickets`
                : "Purge deleted tickets"}
          </Button>
          {confirming ? (
            <Button onClick={() => setConfirming(false)}>Cancel</Button>
          ) : null}
        </Stack>
        {purgeResult ? (
          <Alert severity="success">
            Purged {purgeResult.deletedTicketCount} tickets and{" "}
            {purgeResult.deletedAttachmentCount} attachments.
          </Alert>
        ) : null}
      </Stack>
    </Paper>
  );
}

export function DeletedSupportPanel({
  adminRole,
  onRestore,
  state,
}: DeletedSupportPanelProps) {
  return (
    <Stack spacing={2}>
      <Stack spacing={0.75}>
        <Typography variant="h6">Deleted tickets</Typography>
        <Typography color="text.secondary">
          Deleted tickets stay out of the main workflow tabs and can be restored
          from here.
        </Typography>
      </Stack>

      {adminRole === "support_super_admin" ? (
        <PurgeControls
          onPurge={state.purge}
          purgeResult={state.purgeResult}
          purging={state.purging}
        />
      ) : null}

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2.5}>
        <Stack spacing={1.5} sx={{ flex: { lg: "0 0 32%" } }}>
          <Typography variant="subtitle2">Deleted subjects</Typography>
          <SupportTicketList
            error={state.listError ?? undefined}
            loading={state.listLoading}
            onSelect={state.selectRequest}
            requests={state.requests}
            selectedRequestId={state.selectedRequestId ?? undefined}
          />
        </Stack>
        <Stack spacing={1.5} sx={{ flex: 1 }}>
          <Typography variant="subtitle2">Deleted detail</Typography>
          <SupportTicketDetail
            createNote={async () => {}}
            deletedMode
            deleteNote={async () => {}}
            deletingNoteId={null}
            detail={state.detail}
            detailError={state.detailError ?? undefined}
            loading={state.detailLoading}
            mutationError={state.detailError ?? undefined}
            notes={state.notes}
            onChangeStatus={async () => {}}
            onRestoreRequest={onRestore}
            onTranslate={async () => {}}
            pendingStatus={null}
            restoringRequest={state.restoring}
            translations={{}}
            updateNote={async () => {}}
            upsertingNoteId={null}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
