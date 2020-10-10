import { shuffle, concat } from "lodash";
import history from "../history";
import {
  CREATE_SESSION,
  ADD_TO_SESSION_QUEUE,
  REMOVE_CURR_FROM_QUEUE,
  CHANGE_INDEX,
  END_SESSION,
} from "../reducers/action_names";

const createSession = (sessionType) => {
  return (dispatch, getState) => {
    let sessionQueue;
    if (sessionType === "lesson") {
      const { lessons } = getState();
      const sessionLQueue = [];
      const sessionTQueue = [];
      for (let i = 0; i < lessons.length; i++) {
        sessionLQueue.push({
          ind: i,
          mtype: "lesson",
        });
        if (lessons[i].type === "radical") {
          sessionTQueue.push({ ind: i, mtype: "test", stype: "meaning" });
        } else {
          sessionTQueue.push(
            {
              ind: i,
              mtype: "test",
              stype: "meaning",
            },
            {
              ind: i,
              mtype: "test",
              stype: "reading",
            }
          );
        }
      }
      sessionQueue = concat(sessionLQueue, shuffle(sessionTQueue));
    } else {
      const { reviews, user } = getState();
      const queue = [];
      const maxReviewsPerSession = user.maxReviewsPerSession;
      console.log(reviews.length, maxReviewsPerSession);
      for (
        let i = 0;
        i <= Math.min(reviews.length - 1, maxReviewsPerSession);
        i++
      ) {
        if (reviews[i].type === "radical") {
          queue.push({ ind: i, mtype: "test", stype: "meaning" });
        } else {
          queue.push(
            {
              ind: i,
              mtype: "test",
              stype: "meaning",
            },
            {
              ind: i,
              mtype: "test",
              stype: "reading",
            }
          );
        }
      }
      sessionQueue = shuffle(queue);
    }
    console.log(sessionQueue);
    dispatch({
      type: CREATE_SESSION,
      session: { type: sessionType, sessionQueue, started: true },
    });
  };
};

const addToSessionQueue = (info) => {
  return (dispatch) => {
    dispatch({ type: ADD_TO_SESSION_QUEUE, info });
  };
};

const removeCurrFromSessionQueue = () => {
  return (dispatch, getState) => {
    const { session } = getState();
    if (session.currIndex === session.sessionQueue.length - 1) {
      dispatch({ type: END_SESSION });
      history.push("/dashboard");
    } else dispatch({ type: REMOVE_CURR_FROM_QUEUE });
  };
};

const changeIndex = (val) => {
  return (dispatch, getState) => {
    const { session } = getState();
    if (session.currIndex === session.sessionQueue.length - 1) {
      dispatch({
        type: END_SESSION,
      });
      history.push("/dashboard");
    }
    dispatch({
      type: CHANGE_INDEX,
      currIndex: session.currIndex + val,
    });
  };
};

const endSession = () => {
  return (dispatch) => {
    dispatch({
      type: END_SESSION,
    });
  };
};

export {
  createSession,
  changeIndex,
  addToSessionQueue,
  removeCurrFromSessionQueue,
  endSession,
};
