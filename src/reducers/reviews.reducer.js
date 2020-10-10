import { CREATE_RQUEUE, UPDATE_RCARD, EMPTY_RQUEUE } from "./action_names";

export default (reviews = [], action) => {
  switch (action.type) {
    case CREATE_RQUEUE:
      return action.reviewsQueue;
    case UPDATE_RCARD:
      return reviews.map((val, ind) => {
        if (ind === action.ind) return action.lesson;
        return val;
      });
    case EMPTY_RQUEUE:
      return [];
    default:
      return reviews;
  }
};
