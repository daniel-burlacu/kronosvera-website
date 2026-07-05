import { Tab, Tabs } from "@mui/material";

import type { SupportRequestStatus } from "../../lib/admin-api";
import { supportInboxStatuses } from "../../hooks/useSupportInbox";

type SupportInboxTabsProps = {
  activeStatus: SupportRequestStatus;
  onChange: (status: SupportRequestStatus) => void;
};

const supportStatusLabel: Record<SupportRequestStatus, string> = {
  blocked: "Blocked",
  done: "Done",
  in_progress: "In Progress",
  todo: "Todo",
  waiting: "Waiting",
};

export function SupportInboxTabs({
  activeStatus,
  onChange,
}: SupportInboxTabsProps) {
  return (
    <Tabs
      allowScrollButtonsMobile
      onChange={(_event, value: SupportRequestStatus) => onChange(value)}
      scrollButtons="auto"
      value={activeStatus}
      variant="scrollable"
    >
      {supportInboxStatuses.map((status) => (
        <Tab key={status} label={supportStatusLabel[status]} value={status} />
      ))}
    </Tabs>
  );
}
