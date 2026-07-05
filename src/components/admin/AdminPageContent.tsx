import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import { Link as RouterLink } from "react-router-dom";

import type { AdminUserSession } from "../../lib/admin-api";
import type { AdminAuthStatus } from "../../hooks/useAdminAuth";

type AdminPageContentProps = {
  adminUser?: AdminUserSession;
  email?: string;
  message?: string;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  readyContent?: React.ReactNode;
  status: AdminAuthStatus;
};

const supportRoleLabel: Record<AdminUserSession["role"], string> = {
  support_admin: "Support admin",
  support_super_admin: "Support super-admin",
};

function AdminShellFrame({
  actions,
  children,
}: {
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box className="admin-shell" sx={{ py: { xs: 4, md: 7 } }}>
      <Container maxWidth="lg">
        <Paper
          className="admin-shell-card"
          sx={{ overflow: "hidden", p: { xs: 3, md: 5 } }}
        >
          <Stack spacing={4}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={2}>
                <Box className="admin-shell-badge">
                  KronosVera admin support
                </Box>
                <Typography
                  variant="h2"
                  sx={{
                    maxWidth: 720,
                    fontSize: { xs: "2.4rem", md: "3.6rem" },
                  }}
                >
                  Dedicated support inbox access for approved admins.
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ maxWidth: 640, fontSize: "1.05rem" }}
                >
                  This bootstrap step secures the admin area and confirms
                  allowlist access before the inbox workflow UI loads.
                </Typography>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ xs: "stretch", md: "flex-start" }}
              >
                {actions}
                <Button
                  component={RouterLink}
                  to="/"
                  color="inherit"
                  startIcon={<ArrowBackRoundedIcon />}
                >
                  Public site
                </Button>
              </Stack>
            </Stack>
            {children}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

function LoadingState() {
  return (
    <Paper variant="outlined" sx={{ p: 3.5, borderRadius: 4 }}>
      <Stack spacing={1.5}>
        <Typography variant="h5">Checking admin session</Typography>
        <Typography color="text.secondary">
          Verifying the Google session and admin allowlist before loading the
          support workspace.
        </Typography>
      </Stack>
    </Paper>
  );
}

function SignedOutState({
  onSignIn,
  message,
}: Pick<AdminPageContentProps, "onSignIn" | "message">) {
  return (
    <Paper variant="outlined" sx={{ p: 3.5, borderRadius: 4 }}>
      <Stack spacing={2.5}>
        <Typography variant="h5">
          Sign in with your approved Google account
        </Typography>
        <Typography color="text.secondary">
          Access is granted only after Firebase sign-in succeeds and the backend
          confirms the email in the admin allowlist.
        </Typography>
        {message ? <Alert severity="warning">{message}</Alert> : null}
        <Box>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={() => void onSignIn()}
          >
            Continue with Google
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

function UnauthorizedState({
  email,
  message,
  onSignOut,
}: Pick<AdminPageContentProps, "email" | "message" | "onSignOut">) {
  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={() => void onSignOut()}>
          Sign out
        </Button>
      }
    >
      <strong>{email ?? "Signed-in account"}</strong> does not have support
      inbox access. {message}
    </Alert>
  );
}

function ReadyState({
  adminUser,
  readyContent,
}: {
  adminUser: AdminUserSession;
  readyContent?: React.ReactNode;
}) {
  if (readyContent) {
    return (
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Chip
            color="primary"
            icon={<SupportAgentRoundedIcon />}
            label={supportRoleLabel[adminUser.role]}
          />
          <Typography color="text.secondary">{adminUser.email}</Typography>
        </Stack>
        {readyContent}
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Paper variant="outlined" sx={{ p: 3.5, borderRadius: 4 }}>
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Chip
              color="primary"
              icon={<SupportAgentRoundedIcon />}
              label={supportRoleLabel[adminUser.role]}
            />
            <Typography color="text.secondary">{adminUser.email}</Typography>
          </Stack>
          <Typography variant="h5">Admin bootstrap is ready</Typography>
          <Typography color="text.secondary">
            The site now supports Google admin sign-in, backend allowlist
            verification, and a dedicated `/admin` entry point. The next slice
            is the inbox list and detail layout.
          </Typography>
        </Stack>
      </Paper>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Paper variant="outlined" sx={{ flex: 1, p: 3.5, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Ready now
          </Typography>
          <Typography color="text.secondary">
            Firebase Google sign-in, allowlist validation through
            `/v1/admin/me`, and a protected admin shell are wired.
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ flex: 1, p: 3.5, borderRadius: 4 }}>
          <Typography variant="h6" gutterBottom>
            Next implementation slice
          </Typography>
          <Typography color="text.secondary">
            Build the support inbox tabs and the ticket detail pane against the
            existing admin support request endpoints.
          </Typography>
        </Paper>
      </Stack>
    </Stack>
  );
}

export function AdminPageContent({
  adminUser,
  email,
  message,
  onSignIn,
  onSignOut,
  readyContent,
  status,
}: AdminPageContentProps) {
  const headerActions =
    status === "ready"
      ? [
          <Button
            key="sign-out"
            variant="outlined"
            startIcon={<LogoutRoundedIcon />}
            onClick={() => void onSignOut()}
          >
            Sign out
          </Button>,
        ]
      : undefined;

  return (
    <AdminShellFrame actions={headerActions}>
      {status === "loading" ? <LoadingState /> : null}
      {status === "signed_out" || status === "config_error" ? (
        <SignedOutState onSignIn={onSignIn} message={message} />
      ) : null}
      {status === "unauthorized" ? (
        <UnauthorizedState
          email={email}
          message={message}
          onSignOut={onSignOut}
        />
      ) : null}
      {status === "error" ? (
        <Alert severity="error">
          {message ?? "Failed to load the admin session."}
        </Alert>
      ) : null}
      {status === "ready" && adminUser ? (
        <ReadyState adminUser={adminUser} readyContent={readyContent} />
      ) : null}
    </AdminShellFrame>
  );
}
