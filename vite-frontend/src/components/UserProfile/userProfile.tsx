import { useSelector } from "react-redux";
import { StateType } from "../../typeDeclerations";



const UserProfile = () => {
    const user = useSelector((state: StateType) => state.session.user);



  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div>
      <h2>{user.firstname} {user.lastname}</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
    </div>
  );
};

export default UserProfile;
