const defaultUserState = {
  name: null,
  email: null,
  currLevel: null,
  maxLessonsPerSession: 5,
  maxReviewsPerSession: 100,
  isLoggedIn: false,
};

export default (user = defaultUserState, action) => {
  switch (action.type) {
    case "SIGNUP_USER":
      return action.user;
    case "LOGIN_USER":
      return { ...user, ...action.user, isLoggedIn: true };
    case "LOGOUT_USER":
      return defaultUserState;
    case "FETCH_USER":
      return { ...user, ...action.user, isLoggedIn: true };
    case "UPDATE_USER":
      return { ...user, ...action.updates };
    default:
      return user;
  }
};
