import history from "../history";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { baseURL, settings } from "../api/kanjiblaze";

const loginUser = (email, password, redirect) => {
  return async (dispatch) => {
    try {
      const res = await trackPromise(axios.post(
        `${baseURL}/user/login`,
        {
          email,
          password,
        },
        settings
      ));
      const { name, currLevel } = res.data.data.user;
      dispatch({
        type: "LOGIN_USER",
        user: { name, email, currLevel },
      });
      history.push(redirect)
    } catch (e) {

    }
  };
};

const fetchUser = (sucRedirect, failRedirect) => {
  return async (dispatch) => {
    try {
      const res = await trackPromise(axios.get(`${baseURL}/user/me`, settings));
      const { name, email, currLevel } = res.data.data.user;
      dispatch({
        type: "FETCH_USER",
        user: { name, email, currLevel },
      });
      history.push(sucRedirect);
    } catch (e) {
      history.push(failRedirect);
    }
  };
};

const signUpUser = (name, email, password, redirect) => {
  return async (dispatch) => {
    try {
      const res = await trackPromise(axios.post(
        `${baseURL}/user/create`,
        {
          name,
          email,
          password,
        },
        settings
      ));
      const { currLevel } = res.data.data.user;
      dispatch({
        type: "FETCH_USER",
        user: { name, email, currLevel },
      });
      history.push(redirect);
    } catch (e) {
      console.log(e);
    }
  };
};

const signOutUser = (sucRedirect) => {
  return async (dispatch) => {
    try {
      //remove jwt from the server side.
      await trackPromise(axios.get(`${baseURL}/user/signout`, settings));
      //dispatch signout user action.
      dispatch({ type: "SIGNOUT_USER" });
      //remove the persisted state from local storage.
      localStorage.removeItem("state");
      //redirect to landing page
      history.push(sucRedirect);
    } catch (e) {

    }
  }
}

export { loginUser, fetchUser, signUpUser, signOutUser };
