import { combineReducers } from "redux";
import cardsReducer from "./cards.reducer";
import userReducer from "./user.reducer";
import levelsReducer from "./levels.reducer";
import lessonsReducer from "./lessons.reducer";
import reviewsReducer from "./reviews.reducer";
import sessionReducer from "./session.reducer";
import updatesReducer from "./updates.reducer";

export default combineReducers({
  cards: cardsReducer,
  user: userReducer,
  levelsInfo: levelsReducer,
  lessons: lessonsReducer,
  session: sessionReducer,
  updates: updatesReducer,
  reviews: reviewsReducer,
});
