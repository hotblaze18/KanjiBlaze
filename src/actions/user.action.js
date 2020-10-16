import history from "../history";
import axios from "axios";
import { baseURL, settings } from "../api/kanjiblaze";

const loginUser = (email, password, redirect) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${baseURL}/user/login`,
        {
          email,
          password,
        },
        settings
      );
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
      const res = await axios.get(`${baseURL}/user/me`, settings);
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
      const res = await axios.post(
        `${baseURL}/user/create`,
        {
          name,
          email,
          password,
        },
        settings
      );
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

export { loginUser, fetchUser, signUpUser };
