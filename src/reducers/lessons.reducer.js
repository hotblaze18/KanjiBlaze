import {
  CREATE_LQUEUE,
  EMPTY_LESSON_QUEUE,
  UPDATE_LESSON_CARD,
} from "./action_names";

export default (lessonQueue = [], action) => {
  switch (action.type) {
    case CREATE_LQUEUE:
      return action.lessonQueue;
    case EMPTY_LESSON_QUEUE:
      return [];
    case UPDATE_LESSON_CARD:
      return lessonQueue.map((val, ind) => {
        if (ind === action.ind) return action.lesson;
        return val;
      });
    default:
      return lessonQueue;
  }
};
