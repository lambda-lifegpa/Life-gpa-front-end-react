import {
  LOGIN_START,
  LOGIN_SUCCESS,
  GETTING_DATA,
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
  ADDING_HABIT,
  ADD_HABIT,
  DELETE_HABIT,
  DELETING_HABIT,
  UPDATE_HABIT,
  UPDATING_HABIT,
  TOGGLE_HABIT_DONE,
  GET_GPA_SUCCESS,
  GET_GPA_FAIL,
  SUBMIT_HABITS
} from "../actions";

const initialState = {
  habits: [],
  loggingIn: false,
  gettingData: false,
  updatingHabit: false,
  addingHabit: false,
  gettingGPA: false,
  gettingHabit: false,
  deletingHabit: false,
  submittingHabit: false,
  error: null,
  errorStatusCode: null,
  token: localStorage.getItem("token")
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        token: action.payload
      };
    case GETTING_DATA:
      return {
        ...state,
        gettingData: true
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        gettingData: false,
        errorStatusCode: null,
        data: action.payload,
        error: null
      };
    case GET_DATA_FAIL:
      return {
        ...state,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
        gettingData: false
      };
    case GET_GPA_SUCCESS:
      return {
        ...state,
        daily: action.payload.daily,
        weekly: action.payload.weekly,
        monthly: action.payload.monthly,
        allTime: action.payload.allTime,
        error: action.payload.error,
        errorStatusCode: action.payload.status,
        gettingGPA: false
      };
    case GET_GPA_FAIL:
      return {
        ...state,
        error: action.payload.data.error,
        errorStatusCode: action.payload.status,
        gettingGPA: false
      };
    case SUBMIT_HABITS:
      return {
        ...state,
        habits: action.payload,
        daily: action.payload.daily,
        weekly: action.payload.weekly,
        monthly: action.payload.monthly,
        total: action.payload.allTime,
        submittingHabit: false
      };
    case ADDING_HABIT:
      return { ...state, addingHabit: true };
    case ADD_HABIT:
      return {
        ...state,
        habit: action.payload,
        addingHabit: false,
        error: null,
        errorStatusCode: null
      };
    case DELETING_HABIT:
      return { ...state, deletingHabit: true };
    case DELETE_HABIT:
      return { ...state, deletingHabit: false };
    case UPDATE_HABIT:
      return {
        ...state,
        updatingHabit: false,
        error: null,
        errorStatusCode: null,
        habits: action.payload
      };
    case TOGGLE_HABIT_DONE:
      return {
        ...state,
        data: state.data.map(habit => {
          if (action.payload === habit.id) {
            habit.completed = !habit.completed;
          }
          return habit;
        })
      };
    default:
      return state;
  }
};

export default reducer;
