import {
  Alert,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { SupportRequestSummary } from "../../lib/admin-api";

type SupportTicketListProps = {
  error?: string;
  loading: boolean;
  onSelect: (supportRequestId: string) => void;
  requests: SupportRequestSummary[];
  selectedRequestId?: string;
};

const formatTimestamp = (value: string): string =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export function SupportTicketList({
  error,
  loading,
  onSelect,
  requests,
  selectedRequestId,
}: SupportTicketListProps) {
  if (loading) {
    return (
      <Paper variant="outlined" sx={{ borderRadius: 2, p: 2.5 }}>
        <Typography color="text.secondary">
          Loading support requests…
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (requests.length === 0) {
    return (
      <Paper variant="outlined" sx={{ borderRadius: 2, p: 2.5 }}>
        <Typography color="text.secondary">
          No support requests are currently in this workflow tab.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <List disablePadding>
        {requests.map((request) => (
          <ListItemButton
            divider
            key={request.id}
            onClick={() => onSelect(request.id)}
            sx={{ alignItems: "flex-start", py: 1.25 }}
            selected={request.id === selectedRequestId}
          >
            <ListItemText
              primary={request.subject}
              primaryTypographyProps={{
                sx: {
                  lineHeight: 1.35,
                  overflowWrap: "anywhere",
                  whiteSpace: "normal",
                },
                variant: "body2",
              }}
              secondary={
                <Stack
                  component="span"
                  spacing={0.5}
                  sx={{ display: "block", mt: 0.5 }}
                >
                  <Typography color="text.secondary" variant="caption">
                    {request.user.email ?? "Unknown user"}
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    {formatTimestamp(request.createdAt)}
                  </Typography>
                </Stack>
              }
              secondaryTypographyProps={{ component: "span" }}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}
