import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfile } from "../api/profileApi";

type Profile = {
  username: string;
  email: string;
  bio: string;
  notifications: boolean;
};

function Toast({
  data,
  onClose,
}: {
  data: Profile | null;
  onClose: () => void;
}) {
  if (!data) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 30,
        right: 30,
        background: "#1a1a1a",
        border: "1px solid #c8a96e",
        borderRadius: 8,
        padding: "16px 20px",
        minWidth: 280,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        fontFamily: "Georgia, serif",
        color: "#f0ede6",
        animation: "slideUp 0.35s ease",
        zIndex: 999,
      }}
    >
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#c8a96e",
          }}
        >
          ✓ Changes Saved
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#888",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          ✕
        </button>
      </div>
      {[
        ["Username", data.username],
        ["Email", data.email],
        ["Bio", data.bio],
        ["Notifications", data.notifications ? "On" : "Off"],
      ].map(([key, val]) => (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.85rem",
            padding: "4px 0",
            borderBottom: "1px solid #2a2a2a",
          }}
        >
          <span style={{ color: "#888" }}>{key}</span>
          <span>{val}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProfileForm() {
  const queryClient = useQueryClient();
  const [savedData, setSavedData] = useState<Profile | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isDirty, errors },
  } = useForm<Profile>({
    defaultValues: { username: "", email: "", bio: "", notifications: false },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchProfile,
  });

  useEffect(() => {
    if (data && typeof data === "object") reset(data);
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      reset(updatedData);
      setSavedData(updatedData);
    },
    onError: (error: any) => {
      if (error?.response?.status === 409) {
        setError("email", {
          type: "server",
          message: error.response.data.message,
        });
      }
    },
  });

  if (isLoading) return <div>Loading profile...</div>;
  if (isError) return <div>Failed to load profile</div>;

  return (
    <>
      <form
        onSubmit={handleSubmit((v) => mutation.mutate(v))}
        style={{
          maxWidth: 480,
          margin: "40px auto",
          fontFamily: "Georgia, serif",
        }}
      >
        <h2 style={{ marginBottom: 24 }}>User Profile</h2>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Username</label>
          <input
            {...register("username")}
            style={{ width: "100%", padding: "8px 12px" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Email</label>
          <input
            {...register("email")}
            style={{ width: "100%", padding: "8px 12px" }}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "0.85rem", marginTop: 4 }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Bio</label>
          <textarea
            {...register("bio")}
            style={{ width: "100%", padding: "8px 12px" }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label>
            <input
              type="checkbox"
              {...register("notifications")}
              style={{ marginRight: 8 }}
            />
            Notifications
          </label>
        </div>

        <button
          type="submit"
          disabled={!isDirty || mutation.isPending}
          style={{ padding: "10px 24px" }}
        >
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <Toast data={savedData} onClose={() => setSavedData(null)} />
    </>
  );
}
