import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegistrationForm from "../components/RegistrationForm";

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

const fillValidForm = async () => {
  await userEvent.type(screen.getByLabelText(/full name/i), "Mark Yosinao");
  await userEvent.type(
    screen.getByLabelText(/email address/i),
    "mark@example.com",
  );
  await userEvent.type(screen.getByLabelText(/^password$/i), "Password1");
  await userEvent.type(screen.getByLabelText(/confirm password/i), "Password1");
  await userEvent.selectOptions(screen.getByLabelText(/role/i), "developer");
  await userEvent.click(screen.getByLabelText(/terms/i));
};

describe("Normal Tests", () => {
  it("1. renders all form fields", () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms/i)).toBeInTheDocument();
  });

  it("2. submits successfully with valid data and resets form", async () => {
    render(<RegistrationForm />);
    await fillValidForm();
    await userEvent.click(screen.getByRole("button", { name: /register/i }));
    await waitFor(
      () => {
        expect(screen.getByLabelText(/full name/i)).toHaveValue("");
      },
      { timeout: 6000 },
    );
  }, 8000);

  it("3. shows Registering... during submission", async () => {
    render(<RegistrationForm />);
    await fillValidForm();
    await userEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(
      screen.getByRole("button", { name: /registering/i }),
    ).toBeInTheDocument();
  });
});

describe("Edge Tests", () => {
  it("4. shows error when passwords do not match", async () => {
    render(<RegistrationForm />);
    await userEvent.type(screen.getByLabelText(/^password$/i), "Password1");
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      "Wrong123",
    );
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
  });

  it("5. shows error for weak password", async () => {
    render(<RegistrationForm />);
    await userEvent.type(screen.getByLabelText(/^password$/i), "weakpass");
    await userEvent.tab();
    await waitFor(() => {
      expect(
        screen.getByText("Must contain uppercase, lowercase, and a number"),
      ).toBeInTheDocument();
    });
  });

  it("6. saves draft to localStorage as user types", async () => {
    render(<RegistrationForm />);
    await userEvent.type(screen.getByLabelText(/full name/i), "Mark");
    await waitFor(() => {
      const draft = JSON.parse(
        localStorage.getItem("registration_draft") || "{}",
      );
      expect(draft.fullName).toBe("Mark");
    });
  });
});
