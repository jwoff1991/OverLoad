import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../typeDeclerations";
import { useState, ChangeEvent } from "react";

interface EditModeType {
  firstname: boolean;
  lastname: boolean;
  username: boolean;
  email: boolean;
  bio: boolean;
}

interface UserInfoType {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  bio: string;
}

const UserProfile = () => {
  const user = useSelector((state: StateType) => state.session.user);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState<EditModeType>({
    firstname: false,
    lastname: false,
    username: false,
    email: false,
    bio: false,
  });
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  const handleEdit = (field: keyof UserInfoType) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: keyof UserInfoType) => {
    setUserInfo({ ...userInfo, [field]: e.target.value });
  };

  const handleSave = (field: keyof UserInfoType) => {
    setEditMode({ ...editMode, [field]: false });
    // Optionally, dispatch an action to update the user info in the store
  };

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div>
      {Object.keys(editMode).map((field) => (
        <div key={field}>
          <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
          {editMode[field as keyof UserInfoType] ? (
            <input
              type="text"
              value={userInfo[field as keyof UserInfoType]}
              onChange={(e) => handleChange(e, field as keyof UserInfoType)}
              onBlur={() => handleSave(field as keyof UserInfoType)}
            />
          ) : (
            <span>
              {userInfo[field as keyof UserInfoType]}{" "}
              <button onClick={() => handleEdit(field as keyof UserInfoType)}>Edit</button>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
