import { useImmer } from "use-immer";

export default function UserProfileWithImmer() {
  const [userProfile, updateUserProfile] = useImmer({
    viewMode: "edit", // 👈 NOW PART OF STATE (shows in JSON)
    name: "",
    email: "",
    contactDetails: {
      phone: "",
      address: "",
    },
    preferences: {
      newsletter: false,
      notifications: false,
    },
  });

  const isLocked = userProfile.viewMode === "view";

  const toggleViewMode = () => {
    updateUserProfile((draft) => {
      draft.viewMode = draft.viewMode === "edit" ? "view" : "edit";
    });
  };

  const updateContact = (field, value) => {
    updateUserProfile((draft) => {
      draft.contactDetails[field] = value;
    });
  };

  const togglePref = (key) => {
    updateUserProfile((draft) => {
      draft.preferences[key] = !draft.preferences[key];
    });
  };

  return (
    <div style={styles.page}>
      {/* LEFT: EDITOR */}
      <div style={styles.panel}>
        <div style={styles.header}>
          <h2>👤 User Profile</h2>

          <button style={styles.button} onClick={toggleViewMode}>
            {userProfile.viewMode === "edit"
              ? "🔒 Lock Editing"
              : "🔓 Unlock Editing"}
          </button>
        </div>

        <p style={styles.modeText}>
          Mode: <b>{userProfile.viewMode.toUpperCase()}</b>
        </p>

        {/* BASIC INFO */}
        <div style={styles.card}>
          <h3>Basic Info</h3>

          <input
            style={styles.input}
            placeholder="Name"
            value={userProfile.name}
            disabled={isLocked}
            onChange={(e) =>
              updateUserProfile((draft) => {
                draft.name = e.target.value;
              })
            }
          />

          <input
            style={styles.input}
            placeholder="Email"
            value={userProfile.email}
            disabled={isLocked}
            onChange={(e) =>
              updateUserProfile((draft) => {
                draft.email = e.target.value;
              })
            }
          />
        </div>

        {/* CONTACT */}
        <div style={styles.card}>
          <h3>Contact Details</h3>

          <input
            style={styles.input}
            placeholder="Phone"
            value={userProfile.contactDetails.phone}
            disabled={isLocked}
            onChange={(e) => updateContact("phone", e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Address"
            value={userProfile.contactDetails.address}
            disabled={isLocked}
            onChange={(e) => updateContact("address", e.target.value)}
          />
        </div>

        {/* PREFERENCES */}
        <div style={styles.card}>
          <h3>Preferences</h3>

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={userProfile.preferences.newsletter}
              disabled={isLocked}
              onChange={() => togglePref("newsletter")}
            />
            Email Updates
          </label>

          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={userProfile.preferences.notifications}
              disabled={isLocked}
              onChange={() => togglePref("notifications")}
            />
            Notifications
          </label>
        </div>
      </div>

      {/* RIGHT: LIVE JSON */}
      <div style={styles.jsonPanel}>
        <h2>📊 Live State Inspector</h2>

        <p style={styles.subtitle}>
          Includes UI state + user data (Immer store)
        </p>

        <pre style={styles.json}>{JSON.stringify(userProfile, null, 2)}</pre>
      </div>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    display: "flex",
    gap: "20px",
    padding: "30px",
    fontFamily: "Arial",
    background: "#0b1220",
    minHeight: "100vh",
  },

  panel: {
    flex: 1,
    background: "white",
    borderRadius: "12px",
    padding: "20px",
  },

  jsonPanel: {
    flex: 1,
    background: "#0f172a",
    color: "#00ff99",
    borderRadius: "12px",
    padding: "20px",
    fontSize: "13px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modeText: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "10px",
  },

  card: {
    marginTop: "15px",
    padding: "15px",
    border: "1px solid #eee",
    borderRadius: "10px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  checkbox: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
    alignItems: "center",
  },

  button: {
    padding: "8px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  json: {
    background: "#020617",
    padding: "15px",
    borderRadius: "10px",
    overflow: "auto",
  },

  subtitle: {
    fontSize: "12px",
    opacity: 0.7,
  },
};
