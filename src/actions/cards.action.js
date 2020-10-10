import axios from "axios";
import { baseURL, settings } from "../api/kanjiblaze";
import history from "../history";
import { FETCH_CARDS, UPDATE_CARD } from "../reducers/action_names";

// Fetch all the user cards
const fetchCards = (redirect) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${baseURL}/user/cards`, settings);
      dispatch({ type: FETCH_CARDS, cards: res.data.data.cards });
    } catch (e) {
      history.push(redirect);
    }
  };
};

//update a particular user card
const updateCard = (card) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CARD,
      card,
    });
  };
};

export { fetchCards, updateCard };
