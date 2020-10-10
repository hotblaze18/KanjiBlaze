import levels from "../info";
import {
  CREATE_LQUEUE,
  EMPTY_LESSON_QUEUE,
  UPDATE_LESSON_CARD,
} from "../reducers/action_names";

const uicards = require("../uicards.json");

const createLessonQueue = () => {
  return (dispatch, getState) => {
    //empty the previous queue
    dispatch({
      type: EMPTY_LESSON_QUEUE,
    });

    //Check current and previous level for lessons.
    try {
      const { user, cards } = getState();
      const start =
        user.currLevel > 1
          ? levels[user.currLevel - 1].start
          : levels[user.currLevel].start;
      const end = levels[user.currLevel].end;
      const maxLessonsPerSession = user.maxLessonsPerSession;
      const lessons = [];
      let count = 0;
      for (let i = start; i <= end; i++) {
        if (cards[i].unlocked && !cards[i].learned) {
          lessons.push({
            ...uicards[cards[i].cardNo],
            timesAttempted: 0,
            timesCorrect: 0,
            timesIncorrect: 0,
          });
          count++;
        }
        if (count === maxLessonsPerSession) break;
      }
      console.log(lessons);
      dispatch({
        type: CREATE_LQUEUE,
        lessonQueue: lessons,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

const updateLessonCard = (lesson, ind) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_LESSON_CARD, ind, lesson });
  };
};

export { createLessonQueue, updateLessonCard };

// let count = 0;
//       const radIds = [];
//       const kanIds = [];
//       const vocIds = [];
//       for (let i = start; i <= end; i++) {
//         if (cards[i].unlocked && !cards[i].learned) {
//           if (cards[i].type === "radical") {
//             radIds.push(cards[i].cardId);
//           } else if (cards[i].type === "kanji") {
//             kanIds.push(cards[i].cardId);
//           } else {
//             vocIds.push(cards[i].cardId);
//           }
//           count++;
//           if (count === 5) {
//             break;
//           }
//         }
//       }
//       const res = await axios.post(
//         `${baseURL}/uicards`,
//         {
//           radIds,
//           kanIds,
//           vocIds,
//         },
//         settings
//       );
//       let uicards = res.data.data.uicards;
//       uicards = uicards.map((uicard) => ({
//         ...uicard,
//         timesAttempted: 0,
//         wrongAttempt: false,
//         timesIncorrect: 0,
//       }));
