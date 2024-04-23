import { Dispatch } from "react";
import { createErrorObject } from "../helperFunctions";
import { UserType } from "../typeDeclerations";

type ActionType = ReturnType<typeof setUser> | ReturnType<typeof removeUser>

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

type PasswordType = string;

const setUser = (user: UserType) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate =
  () =>
  async (dispatch: Dispatch<ActionType>) => {
    const response = await fetch("/api/auth/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
      dispatch(setUser(data));
    }
  };

export const login =
  (email: UserType["email"], password: PasswordType) =>
  async (dispatch: Dispatch<ActionType>) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const logout =
  () => async (dispatch: Dispatch<ActionType>) => {
    try {
      const response = await fetch("/api/auth/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        dispatch(removeUser());
      } else {
        const errors = await response.json();
        return errors;
      }
    } catch (error) {
      return createErrorObject(error);
    }
  };

export const signUp =
  (
    firstname: UserType["firstname"],
    lastname: UserType["lastname"],
    username: UserType["username"],
    email: UserType["email"],
    bio: UserType["bio"],
    password: PasswordType
  ) =>
  async (dispatch: (arg0: { type: string; payload: UserType }) => void) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        username,
        email,
        bio,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export default function reducer(
  state = initialState,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
