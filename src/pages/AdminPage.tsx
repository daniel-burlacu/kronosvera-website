import { AdminPageContent } from "../components/admin/AdminPageContent";
import { SupportInboxScreen } from "../components/support/SupportInboxScreen";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { useDeletedSupportRequests } from "../hooks/useDeletedSupportRequests";
import { useSupportInbox } from "../hooks/useSupportInbox";

export function AdminPage() {
  const adminAuth = useAdminAuth();
  const ready = adminAuth.status === "ready";
  const supportInbox = useSupportInbox({
    enabled: ready,
    getAccessToken: adminAuth.getAccessToken,
  });
  const deletedSupportRequests = useDeletedSupportRequests({
    enabled: ready,
    getAccessToken: adminAuth.getAccessToken,
  });

  const handleDeleteRequest = async (deleteNote?: string): Promise<void> => {
    await supportInbox.deleteRequest(deleteNote);
    await deletedSupportRequests.reload();
  };

  const handleRestoreDeletedRequest = async (): Promise<void> => {
    await deletedSupportRequests.restoreSelected();
    await supportInbox.reload();
  };

  return (
    <AdminPageContent
      adminUser={adminAuth.adminUser ?? undefined}
      email={adminAuth.email ?? undefined}
      readyContent={
        ready && adminAuth.adminUser ? (
          <SupportInboxScreen
            adminRole={adminAuth.adminUser.role}
            deletedState={deletedSupportRequests}
            onDeleteRequest={handleDeleteRequest}
            onRestoreDeletedRequest={handleRestoreDeletedRequest}
            state={supportInbox}
          />
        ) : undefined
      }
      message={adminAuth.message ?? undefined}
      onSignIn={adminAuth.signIn}
      onSignOut={adminAuth.signOut}
      status={adminAuth.status}
    />
  );
}
