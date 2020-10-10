import isEmpty from "lodash/isEmpty";
import isConnected from "../connection";
import { baseURL, settings } from "../api/kanjiblaze";
import axios from "axios";
import levels from "../info";
import { UPDATE_LEVELS_INFO } from "../reducers/action_names";

const addCardToUpdateQueue = (card) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_CARD_TO_UPDATE_QUEUE",
      card,
    });
  };
};

const performUpdatesInQueue = () => {
  return async (dispatch, getState) => {
    //if internet connection is not available then return
    if (!isConnected()) {
      return;
    }

    const { updates } = getState();
    const { unlocks, cards, levelsInfo, currLevel } = updates;

    try {
      //set synicingNow to true
      dispatch({
        type: "START_UPDATES",
      });
      //if unlocks exist then finish them.
      if (!isEmpty(unlocks)) {
        unlocks.forEach(async (unlock) => {
          await axios.post(`${baseURL}/cards/unlock`, unlock, settings);
        });
      }
      //if cards updates exist then complete then finish them.
      if (!isEmpty(cards))
        await axios.put(`${baseURL}/user/cards`, { cards }, settings);
      //levelsInfo
      if (levelsInfo !== null) {
        await axios.patch(
          `${baseURL}/user/levelsinfo`,
          {
            levelsInfo,
          },
          settings
        );
      }
      //currLevel
      if (currLevel !== null) {
        await axios.patch(
          `${baseURL}/user/level`,
          {
            newLevel: currLevel,
          },
          settings
        );
      }
      //if everything was successfull then end the update
      dispatch({
        type: "END_UPDATES",
      });
    } catch (e) {
      console.log(e);
    }
  };
};

const doProgressUpdate = () => {
  console.log("progress");
  return (dispatch, getState) => {
    const { user, cards, levelsInfo } = getState();
    const start = 1;
    const end = levels[user.currLevel].end;
    let newLevelsInfo = {};
    for (let i = 1; i <= user.currLevel; i++) {
      newLevelsInfo[i] = {
        ...levelsInfo[i],
        radicalProgress: 0,
        kanjiProgress: 0,
        vocabProgress: 0,
      };
    }
    for (let i = start; i <= end; i++) {
      if (cards[i].cardProgress >= 5) {
        const { type, cardLevel } = cards[i];
        if (type === "radical") {
          newLevelsInfo[cardLevel].radicalProgress++;
        } else if (type === "kanji") {
          newLevelsInfo[cardLevel].kanjiProgress++;
        } else {
          newLevelsInfo[cardLevel].vocabProgress++;
        }
      }
    }
    newLevelsInfo = { ...levelsInfo, ...newLevelsInfo };
    // add to global updates queue
    dispatch({
      type: "ADD_UPDATE_LEVELSINFO",
      levelsInfo: newLevelsInfo,
    });
    //change in store
    dispatch({
      type: UPDATE_LEVELS_INFO,
      levelsInfo: newLevelsInfo,
    });
  };
};

export { addCardToUpdateQueue, performUpdatesInQueue, doProgressUpdate };
