import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  terms: boolean;
};

const STORAGE_KEY = "registration_draft";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setFocus,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      terms: false,
    },
  });

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);

  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Registered:", data);
    reset();
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: 480,
        margin: "40px auto",
        fontFamily: "Georgia, serif",
      }}
    >
      <h2 style={{ marginBottom: 24 }}>User Registration</h2>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="fullName" style={{ display: "block", marginBottom: 4 }}>
          Full Name
        </label>
        <input
          id="fullName"
          {...register("fullName", {
            required: "Full name is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
          style={{ width: "100%", padding: "8px 12px" }}
        />
        {errors.fullName && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>
          Email Address
        </label>
        <input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          style={{ width: "100%", padding: "8px 12px" }}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: 4 }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              message: "Must contain uppercase, lowercase, and a number",
            },
          })}
          style={{ width: "100%", padding: "8px 12px" }}
        />
        {errors.password && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>
            {errors.password.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="confirmPassword"
          style={{ display: "block", marginBottom: 4 }}
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          style={{ width: "100%", padding: "8px 12px" }}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="role" style={{ display: "block", marginBottom: 4 }}>
          Role / Account Type
        </label>
        <select
          id="role"
          {...register("role", { required: "Please select a role" })}
          style={{ width: "100%", padding: "8px 12px" }}
        >
          <option value="">Select a role...</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="product_manager">Product Manager</option>
        </select>
        {errors.role && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>
            {errors.role.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 24 }}>
        <label htmlFor="terms">
          <input
            id="terms"
            type="checkbox"
            {...register("terms", { required: "You must accept the terms" })}
            style={{ marginRight: 8 }}
          />
          I agree to the Terms & Conditions
        </label>
        {errors.terms && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>
            {errors.terms.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        style={{ padding: "10px 24px", width: "100%" }}
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
