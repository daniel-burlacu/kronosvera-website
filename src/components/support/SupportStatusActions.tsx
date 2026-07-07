import { Button, Stack, Typography } from "@mui/material";

import type { SupportRequestStatus } from "../../lib/admin-api";

type SupportStatusActionsProps = {
  currentStatus: SupportRequestStatus;
  onChangeStatus: (status: SupportRequestStatus) => Promise<void>;
  pendingStatus: SupportRequestStatus | null;
};

const supportStatusLabel: Record<SupportRequestStatus, string> = {
  blocked: "Blocked",
  done: "Done",
  in_progress: "In Progress",
  todo: "Todo",
  waiting: "Waiting",
};

const supportStatuses: readonly SupportRequestStatus[] = [
  "todo",
  "in_progress",
  "blocked",
  "waiting",
  "done",
];

export function SupportStatusActions({
  currentStatus,
  onChangeStatus,
  pendingStatus,
}: SupportStatusActionsProps) {
  return (
    <Stack spacing={1.25}>
      <Typography variant="overline">Workflow</Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {supportStatuses.map((status) => {
          const selected = status === currentStatus;
          const isPending = pendingStatus === status;
          return (
            <Button
              disabled={Boolean(pendingStatus) || selected}
              key={status}
              onClick={() => void onChangeStatus(status)}
              size="small"
              variant={selected ? "contained" : "outlined"}
            >
              {isPending ? "Updating…" : supportStatusLabel[status]}
            </Button>
          );
        })}
      </Stack>
    </Stack>
  );
}
