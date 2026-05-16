import { useContext } from "react";
import { UserContext } from "../UserContext";

function UserProfile() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h3>User Profile</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Theme: {user.themePreference}</p>
    </div>
  );
}

export default UserProfile;
