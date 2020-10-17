import axios from "axios";
import { trackPromise } from "react-promise-tracker";

import { baseURL, settings } from "../api/kanjiblaze";
import history from "../history";
import { FETCH_LEVELS_INFO } from "../reducers/action_names";

const fetchLevelsInfo = (redirect) => {
  return async (dispatch) => {
    try {
      const res = await trackPromise(axios.get(`${baseURL}/user/levelsinfo`, settings));
      dispatch({
        type: FETCH_LEVELS_INFO,
        levelsInfo: res.data.data.levelsInfo,
      });
    } catch (e) {
      console.log(e);
      history.push(redirect);
    }
  };
};

export { fetchLevelsInfo };
