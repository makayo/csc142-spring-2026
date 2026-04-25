import { useImmer } from "use-immer";
import "./UserProfileWithImmer.css";

const EMPTY_PROFILE = {
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
};

export default function UserProfileWithImmer() {
  const [state, updateState] = useImmer({
    viewMode: "view", // "view" | "edit"
    draft: EMPTY_PROFILE,
    saved: EMPTY_PROFILE,
  });

  const isLocked = state.viewMode === "view";

  // 🔓 Enter edit mode (copy saved → draft safely)
  const enableEdit = () => {
    updateState((draft) => {
      draft.viewMode = "edit";

      draft.draft.name = draft.saved.name;
      draft.draft.email = draft.saved.email;
      draft.draft.contactDetails.phone = draft.saved.contactDetails.phone;
      draft.draft.contactDetails.address = draft.saved.contactDetails.address;
      draft.draft.preferences.newsletter = draft.saved.preferences.newsletter;
      draft.draft.preferences.notifications =
        draft.saved.preferences.notifications;
    });
  };

  // ❌ Cancel edits (restore saved → draft)
  const cancelEdit = () => {
    updateState((draft) => {
      draft.viewMode = "view";

      draft.draft.name = draft.saved.name;
      draft.draft.email = draft.saved.email;
      draft.draft.contactDetails.phone = draft.saved.contactDetails.phone;
      draft.draft.contactDetails.address = draft.saved.contactDetails.address;
      draft.draft.preferences.newsletter = draft.saved.preferences.newsletter;
      draft.draft.preferences.notifications =
        draft.saved.preferences.notifications;
    });
  };

  // 💾 Save changes (draft → saved + reset draft)
  const submitChanges = () => {
    updateState((draft) => {
      draft.saved.name = draft.draft.name;
      draft.saved.email = draft.draft.email;
      draft.saved.contactDetails.phone = draft.draft.contactDetails.phone;
      draft.saved.contactDetails.address = draft.draft.contactDetails.address;
      draft.saved.preferences.newsletter = draft.draft.preferences.newsletter;
      draft.saved.preferences.notifications =
        draft.draft.preferences.notifications;

      // reset draft cleanly (NO CLONE)
      draft.draft.name = "";
      draft.draft.email = "";
      draft.draft.contactDetails.phone = "";
      draft.draft.contactDetails.address = "";
      draft.draft.preferences.newsletter = false;
      draft.draft.preferences.notifications = false;

      draft.viewMode = "view";
    });
  };

  // ✏️ simple field updates
  const updateField = (field, value) => {
    updateState((draft) => {
      draft.draft[field] = value;
    });
  };

  // 📞 nested updates
  const updateContact = (field, value) => {
    updateState((draft) => {
      draft.draft.contactDetails[field] = value;
    });
  };

  // ⚙️ toggle preferences
  const togglePref = (key) => {
    updateState((draft) => {
      draft.draft.preferences[key] = !draft.draft.preferences[key];
    });
  };

  const d = state.draft;

  return (
    <div className="page">
      {/* LEFT PANEL */}
      <div className="panel">
        <div className="header">
          <h2>👤 User Profile</h2>

          <div style={{ display: "flex", gap: 8 }}>
            {state.viewMode === "view" ? (
              <button className="button" onClick={enableEdit}>
                ✏️ Edit
              </button>
            ) : (
              <>
                <button className="saveButton" onClick={submitChanges}>
                  💾 Save
                </button>

                <button className="cancelButton" onClick={cancelEdit}>
                  ✖ Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <p className="modeText">
          Mode: <b>{state.viewMode.toUpperCase()}</b>
        </p>

        {/* BASIC INFO */}
        <div className="card">
          <h3>Basic Info</h3>

          <input
            className="input"
            placeholder="Name"
            value={d.name}
            disabled={isLocked}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <input
            className="input"
            placeholder="Email"
            value={d.email}
            disabled={isLocked}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        {/* CONTACT */}
        <div className="card">
          <h3>Contact Details</h3>

          <input
            className="input"
            placeholder="Phone"
            value={d.contactDetails.phone}
            disabled={isLocked}
            onChange={(e) => updateContact("phone", e.target.value)}
          />

          <input
            className="input"
            placeholder="Address"
            value={d.contactDetails.address}
            disabled={isLocked}
            onChange={(e) => updateContact("address", e.target.value)}
          />
        </div>

        {/* PREFERENCES */}
        <div className="card">
          <h3>Preferences</h3>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={d.preferences.newsletter}
              disabled={isLocked}
              onChange={() => togglePref("newsletter")}
            />
            Email Updates
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={d.preferences.notifications}
              disabled={isLocked}
              onChange={() => togglePref("notifications")}
            />
            Notifications
          </label>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="jsonPanel">
        <h2>📊 Live State Inspector</h2>
        <p className="subtitle">Immer Nested State</p>

        <pre className="json">{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}
