import {
  CREATE_SESSION,
  ADD_TO_SESSION_QUEUE,
  REMOVE_CURR_FROM_QUEUE,
  CHANGE_INDEX,
  END_SESSION,
} from "./action_names";

const defaultSession = {
  type: null,
  sessionQueue: [],
  sessionUpdates: [],
  started: false,
  currIndex: 0,
};

export default (session = defaultSession, action) => {
  switch (action.type) {
    case CREATE_SESSION:
      return { ...session, ...action.session };
    case ADD_TO_SESSION_QUEUE:
      return {
        ...session,
        sessionQueue: [...session.sessionQueue, action.info],
      };
    case REMOVE_CURR_FROM_QUEUE:
      return {
        ...session,
        sessionQueue: session.sessionQueue.filter(
          (val, ind) => ind !== session.currIndex
        ),
      };
    case CHANGE_INDEX:
      return { ...session, currIndex: action.currIndex };
    case END_SESSION:
      return defaultSession;
    default:
      return session;
  }
};
