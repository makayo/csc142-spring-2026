import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileForm from "../components/ProfileForm";
import * as profileApi from "../api/profileApi";

const mockProfile = {
  username: "john",
  email: "john@example.com",
  bio: "Hello world",
  notifications: false,
};

const renderForm = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <ProfileForm />
    </QueryClientProvider>
  );
};

beforeEach(() => {
  vi.spyOn(profileApi, "fetchProfile").mockResolvedValue(mockProfile);
});

// ─── NORMAL TESTS ────────────────────────────────────────────────────────────

describe("Normal Tests", () => {
  it("1. loads and displays profile data from server", async () => {
    renderForm();
    expect(screen.getByText("Loading profile...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByDisplayValue("john")).toBeInTheDocument();
      expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
    });
  });

  it("2. Save Changes button is disabled when form is pristine", async () => {
    renderForm();
    await waitFor(() => screen.getByDisplayValue("john"));
    const button = screen.getByRole("button", { name: /save changes/i });
    expect(button).toBeDisabled();
  });

  it("3. Save Changes button enables when a field is changed", async () => {
    renderForm();
    await waitFor(() => screen.getByDisplayValue("john"));
    const input = screen.getByDisplayValue("john");
    await userEvent.clear(input);
    await userEvent.type(input, "jane");
    const button = screen.getByRole("button", { name: /save changes/i });
    expect(button).toBeEnabled();
  });
});

// ─── EDGE TESTS ──────────────────────────────────────────────────────────────

describe("Edge Tests", () => {
  it("4. shows error message for conflict@example.com email", async () => {
    vi.spyOn(profileApi, "updateProfile").mockRejectedValue({
      response: { status: 409, data: { message: "Email already exists" } },
    });
    renderForm();
    await waitFor(() => screen.getByDisplayValue("john"));
    const emailInput = screen.getByDisplayValue("john@example.com");
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "conflict@example.com");
    const button = screen.getByRole("button", { name: /save changes/i });
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText("Email already exists")).toBeInTheDocument();
    });
  });

  it("5. shows loading state while fetching", () => {
    vi.spyOn(profileApi, "fetchProfile").mockReturnValue(new Promise(() => {}));
    renderForm();
    expect(screen.getByText("Loading profile...")).toBeInTheDocument();
  });

  it("6. shows error state when fetch fails", async () => {
    vi.spyOn(profileApi, "fetchProfile").mockRejectedValue(new Error("Network error"));
    renderForm();
    await waitFor(() => {
      expect(screen.getByText("Failed to load profile")).toBeInTheDocument();
    });
  });
});
