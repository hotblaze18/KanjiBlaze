import { fetchCards } from "./cards.action";
import { fetchLevelsInfo } from "./levles.action";
import { createLessonQueue } from "./lessons.action";
import { createReviewsQueue } from "./reviews.action";
import { createSession } from "./session.action";
import { doProgressUpdate } from "./updates.action";
import { fetchUser } from "./user.action";
import levels from "../info";
import { UNLOCK_CARDS, UPDATE_LEVEL } from "../reducers/action_names";

const fetchCardsAndLevelsInfo = () => {
  return async (dispatch) => {
    await fetchCards("/")(dispatch);
    await fetchLevelsInfo("/")(dispatch);
  };
};

const fetchAndMakeSession = (sessionType) => {
  return async (dispatch, getState) => {
    await fetchCardsAndLevelsInfo()(dispatch);
    await fetchUser("/login")(dispatch);
    if (sessionType === "lesson") {
      createLessonQueue()(dispatch, getState);
    } else {
      createReviewsQueue()(dispatch, getState);
    }
    createSession(sessionType)(dispatch, getState);
  };
};

//need to fetch levels info first and then update it for progress
const fetchAnddoProgress = () => {
  return async (dispatch, getState) => {
    await fetchCardsAndLevelsInfo()(dispatch);
    doProgressUpdate()(dispatch, getState);
  };
};

const unlockCardsAndUpdate = () => {
  return (dispatch, getState) => {
    try {
      const { user, levelsInfo, cards } = getState();
      const lvl = user.currLevel;
      const currLevelInfo = levelsInfo[lvl];
      const unlockReqBody = {
        type: "",
        level: lvl,
      };
      console.log("entered");
      if (
        canUnlockCardsAndUpdateLevelInfo(currLevelInfo, user, unlockReqBody)
      ) {
        //Add unlock cards to global updates
        dispatch({
          type: "ADD_UNLOCK",
          unlock: unlockReqBody,
        });

        //change the unlocked state of the levelInfo
        levelsInfo[lvl] = currLevelInfo;

        //if level has to change then add new level to global updates
        if (currLevelInfo.kanjiProgress >= 90) {
          dispatch({
            type: "ADD_UPDATE_LEVEL",
            newLevel: lvl + 1,
          });
          //set the starting time of this new level to now in levels Info
          levelsInfo[lvl + 1].startedAt = currLevelInfo;
        }
        //add new levelsInfo to global updates
        dispatch({
          type: "ADD_UPDATE_LEVELSINFO",
          levelsInfo,
        });
        console.log("Added to global updates.");
        //set unlock for appropriate cards and refelct in app state
        const start = levels[lvl].start;
        const end = levels[lvl].end;
        const type = unlockReqBody.type;
        for (let i = start; i <= end; i++) {
          if (cards[i].type === type && !cards[i].unlocked) {
            cards[i].unlocked = true;
          }
        }
        dispatch({ type: UNLOCK_CARDS, cards });
        //update the levels info in application state
        dispatch({
          type: UPDATE_LEVEL,
          level: lvl,
          levelInfo: currLevelInfo,
        });
        if (currLevelInfo.kanjiProgress >= 90) {
          dispatch({
            type: "UPDATE_USER",
            updates: { currLevel: user.currLevel },
          });
        }
        console.log("local updates done.");
      }
    } catch (e) {
      console.log(e);
    }
  };
};

const canUnlockCardsAndUpdateLevelInfo = (currLevelInfo, user, reqBody) => {
  const lvl = user.currLevel;
  console.log(lvl, currLevelInfo.radicalProgress);
  const radPercentProgress = Math.ceil(
    (currLevelInfo.radicalProgress / levels[lvl].noOfRadicals) * 100
  );
  const kanPercentProgress = Math.ceil(
    (currLevelInfo.kanjiProgress / levels[lvl].noOfKanji) * 100
  );
  console.log(radPercentProgress);
  if (!currLevelInfo.radicalsUnlocked) {
    currLevelInfo.radicalsUnlocked = true;
    reqBody.type = "radical";
    return true;
  } else if (!currLevelInfo.kanjiUnlocked && radPercentProgress >= 90) {
    currLevelInfo.kanjiUnlocked = true;
    reqBody.type = "kanji";
    return true;
  } else if (!currLevelInfo.vocabUnlocked && kanPercentProgress >= 90) {
    currLevelInfo.vocabUnlocked = true;
    reqBody.type = "vocabulary";
    user.currLevel += 1;
    return true;
  }
  return false;
};

const doProgressUnlockCardsAndMakeLessonQueue = () => {
  return async (dispatch, getState) => {
    try {
      //first update level progress
      doProgressUpdate()(dispatch, getState);
      //then based on progress unlock appropriate cards
      unlockCardsAndUpdate()(dispatch, getState);
      //then create the lesson queue
      createLessonQueue()(dispatch, getState);
    } catch (e) {
      console.log(e);
    }
  };
};

export {
  fetchCardsAndLevelsInfo,
  fetchAndMakeSession,
  doProgressUnlockCardsAndMakeLessonQueue,
};
