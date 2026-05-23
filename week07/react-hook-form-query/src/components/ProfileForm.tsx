import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProfile, updateProfile } from "../api/profileApi";
import "../index.css";

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
    <div className="toast">
      <div className="toast-header">
        <span className="toast-title">✓ Changes Saved</span>
        <button onClick={onClose} className="toast-close">
          ✕
        </button>
      </div>
      {[
        ["Username", data.username],
        ["Email", data.email],
        ["Bio", data.bio],
        ["Notifications", data.notifications ? "On" : "Off"],
      ].map(([key, val]) => (
        <div key={key} className="toast-row">
          <span className="toast-key">{key}</span>
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
        className="profile-form"
      >
        <h2>User Profile</h2>

        <div className="form-field">
          <label>Username</label>
          <input {...register("username")} />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input {...register("email")} />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="form-field">
          <label>Bio</label>
          <textarea {...register("bio")} />
        </div>

        <div className="form-field-checkbox">
          <label>
            <input type="checkbox" {...register("notifications")} />
            Notifications
          </label>
        </div>

        <button
          type="submit"
          disabled={!isDirty || mutation.isPending}
          className="submit-button"
        >
          {mutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </form>

      <Toast data={savedData} onClose={() => setSavedData(null)} />
    </>
  );
}
