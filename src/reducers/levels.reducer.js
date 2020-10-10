import {
  FETCH_LEVELS_INFO,
  UPDATE_LEVELS_INFO,
  UPDATE_LEVEL,
} from "./action_names";

export default (levelsInfo = {}, action) => {
  switch (action.type) {
    case FETCH_LEVELS_INFO:
      return action.levelsInfo;
    case UPDATE_LEVEL:
      return { ...levelsInfo, [action.level]: action.levelInfo };
    case UPDATE_LEVELS_INFO:
      return action.levelsInfo;
    default:
      return levelsInfo;
  }
};
