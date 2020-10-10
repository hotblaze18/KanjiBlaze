import levels from "../info";
import moment from "moment";
import {
  CREATE_RQUEUE,
  UPDATE_RCARD,
  EMPTY_RQUEUE,
} from "../reducers/action_names";

const uicards = require("../uicards.json");

const createReviewsQueue = () => {
  return (dispatch, getState) => {
    //empty the previous queue.
    dispatch({ type: EMPTY_RQUEUE });
    const { cards, user } = getState();
    const reviewsQueue = [];
    const currLevel = user.currLevel;
    const start = levels[1].start;
    const end = levels[currLevel].end;
    const now = moment();
    for (let i = start; i <= end; i++) {
      if (cards[i].learned === true) {
        const reviewTime = moment(cards[i].timeNextReview);
        if (now.isSameOrAfter(reviewTime)) {
          reviewsQueue.push({
            ...uicards[i],
            timesAttempted: 0,
            timesCorrect: 0,
            timesIncorrect: 0,
          });
        }
      }
    }
    dispatch({ type: CREATE_RQUEUE, reviewsQueue });
  };
};

const updateReviewCard = (lesson, ind) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_RCARD, ind, lesson });
  };
};

export { createReviewsQueue, updateReviewCard };
