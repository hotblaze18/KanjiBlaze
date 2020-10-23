import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import Reducers from "./reducers";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  Reducers,
  //persistedState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// if (isConnected()) {
//   console.log("connected");
//   // Unlock the appropriate cards
//   await axios.post(`${baseURL}/cards/unlock`, unlockReqBody, settings);
//   //Update the levels Info for Current Level.
//   await axios.patch(
//     `${baseURL}/user/levelsinfo`,
//     {
//       level: lvl,
//       info: currLevelInfo,
//     },
//     settings
//   );
//   // If kanji_progress>=90 then increment current users level
//   if (currLevelInfo.kanjiProgress >= 90) {
//     await axios.patch(
//       `${baseURL}/user/level`,
//       {
//         newLevel: lvl + 1,
//       },
//       settings
//     );
//   }
// } else {
//   //Add unlock cards to global updates
//   dispatch({
//     type: "ADD_UNLOCK",
//     unlock: unlockReqBody,
//   });
//   //add new levelsInfo to global updates
//   levelsInfo[lvl] = currLevelInfo;
//   dispatch({
//     type: "ADD_UPDATE_LEVELSINFO",
//     levelsInfo,
//   });
//   //if level has to change then add new level to global updates
//   if (currLevelInfo.kanjiProgress >= 90) {
//     dispatch({
//       type: "ADD_UPDATE_LEVEL",
//       newLevel: lvl + 1,
//     });
//   }
// }
