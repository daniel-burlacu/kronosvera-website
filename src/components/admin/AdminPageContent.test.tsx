import { render, screen } from "@testing-library/react";
import { Typography } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { AdminPageContent } from "./AdminPageContent";

const noop = vi.fn(async () => {});

describe("AdminPageContent", () => {
  it("shows the sign-in call to action when signed out", () => {
    render(
      <MemoryRouter>
        <AdminPageContent
          onSignIn={noop}
          onSignOut={noop}
          status="signed_out"
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", { name: /continue with google/i }),
    ).toBeInTheDocument();
  });

  it("shows an allowlist message when the account is unauthorized", () => {
    render(
      <MemoryRouter>
        <AdminPageContent
          email="blocked@example.com"
          message="This Google account is signed in but is not on the admin allowlist."
          onSignIn={noop}
          onSignOut={noop}
          status="unauthorized"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(/blocked@example.com/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign out/i }),
    ).toBeInTheDocument();
  });

  it("shows the ready state when an admin session is available", () => {
    render(
      <MemoryRouter>
        <AdminPageContent
          adminUser={{
            email: "admin@example.com",
            id: "admin-id",
            role: "support_admin",
          }}
          onSignIn={noop}
          onSignOut={noop}
          status="ready"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(/admin bootstrap is ready/i)).toBeInTheDocument();
    expect(screen.getByText(/admin@example.com/i)).toBeInTheDocument();
  });

  it("renders custom ready content when the admin workspace is loaded", () => {
    render(
      <MemoryRouter>
        <AdminPageContent
          adminUser={{
            email: "admin@example.com",
            id: "admin-id",
            role: "support_admin",
          }}
          onSignIn={noop}
          onSignOut={noop}
          readyContent={<Typography>Inbox workspace</Typography>}
          status="ready"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText(/inbox workspace/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/admin bootstrap is ready/i),
    ).not.toBeInTheDocument();
  });
});
