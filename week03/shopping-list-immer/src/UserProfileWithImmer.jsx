import { useImmer } from "use-immer";

export default function UserProfileWithImmer() {
  const [userProfile, updateUserProfile] = useImmer({
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

  const updateContactDetails = (field, value) => {
    updateUserProfile((draft) => {
      draft.contactDetails[field] = value;
    });
  };

  const toggleNewsletter = () => {
    updateUserProfile((draft) => {
      draft.preferences.newsletter = !draft.preferences.newsletter;
    });
  };

  const toggleNotifications = () => {
    updateUserProfile((draft) => {
      draft.preferences.notifications = !draft.preferences.notifications;
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>User Profile (useImmer)</h1>

      {/* NAME */}
      <input
        placeholder="Name"
        value={userProfile.name}
        onChange={(e) =>
          updateUserProfile((draft) => {
            draft.name = e.target.value;
          })
        }
      />

      {/* EMAIL */}
      <input
        placeholder="Email"
        value={userProfile.email}
        onChange={(e) =>
          updateUserProfile((draft) => {
            draft.email = e.target.value;
          })
        }
      />

      {/* CONTACT */}
      <h3>Contact Details</h3>

      <input
        placeholder="Phone"
        value={userProfile.contactDetails.phone}
        onChange={(e) => updateContactDetails("phone", e.target.value)}
      />

      <input
        placeholder="Address"
        value={userProfile.contactDetails.address}
        onChange={(e) => updateContactDetails("address", e.target.value)}
      />

      {/* PREFERENCES */}
      <h3>Preferences</h3>

      <label>
        <input
          type="checkbox"
          checked={userProfile.preferences.newsletter}
          onChange={toggleNewsletter}
        />
        Newsletter
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={userProfile.preferences.notifications}
          onChange={toggleNotifications}
        />
        Notifications
      </label>

      {/* DEBUG VIEW */}
      <h3>Live State</h3>
      <pre>{JSON.stringify(userProfile, null, 2)}</pre>
    </div>
  );
}
