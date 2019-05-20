import axios from "axios";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

//login
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOG_OUT = "LOG_OUT";

//signup
export const SIGN_UP = "SIGN_UP";
export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";

//data

export const GETTING_DATA = "GET_DATA";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAIL = "GET_DATA_FAILURE";

export const UNAUTHORIZED_USER = "UNAUTHORIZED_USER";

// GPAS

export const GET_GPA_SUCCESS = "GET_GPA_SUCCESS";
export const GET_GPA_FAIL = "GET_GPA_FAIL";

// SUBMIT TASKS

export const SUBMIT_HABITS = "SUBMIT_HABITS";
export const SUBMIT_HABITS_FAIL = "SUBMIT_HABITS_FAIL";

//habits
export const ADD_HABIT = "ADD_HABIT";
export const ADDING_HABIT = "ADDING_HABIT";
export const ADD_HABIT_FAIL = "ADD_HABIT_FAIL";

//delete
export const DELETE_HABIT = "DELETE_HABIT";
export const DELETING_HABIT = "DELETING_HABIT";
export const DELETE_HABIT_FAIL = "DELETE_HABIT_FAIL";

//update
export const UPDATE_HABIT = "UPDATE_HABIT";
export const UPDATING_HABIT = "UPDATING_HABIT";
export const UPDATE_HABIT_FAIL = "UPDATE_HABIT_FAIL";

//grade habits
export const SUBMIT_DAILY_HABITs = "SUBMIT_DAILY_HABITS";
export const TOGGLE_HABIT_DONE = "TOGGLE_HABIT_DONE";

//Action Creators

//Login

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post("https://lifegpadb.herokuapp.com/api/users/login", credentials)
    .then(res => {
      const username = res.data.username;
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      this.props.history.push("/protected");
    })
    .catch(err => console.log(err.response));
};

//get data

export const getData = () => dispatch => {
  axios
    .get("https://lifegpadb.herokuapp.com/users/id/habits", {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      console.log("res", res.data);
      dispatch({ type: GET_DATA_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log("err", err);
      if (err.response.status === 403) {
        dispatch({ type: UNAUTHORIZED_USER, payload: err.response });
      } else {
        dispatch({ type: GET_DATA_FAIL, payload: err.response });
      }
    });
};

// signup

export const signUp = credentials => dispatch => {
  dispatch({ type: SIGNUP_START });
  const credentials = this.state;
  return axios
    .post("https://lifegpadb.herokuapp.com/api/users/register", credentials)
    .then(res => {
      this.props.history.push("/login");
    })
    .catch(err => console.log(err.response));
};

// add Habit

export const addHabit = habit => dispatch => {
  return axios
    .post("https://life-gpa-api.herokuapp.com/api/habits", habit, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      dispatch({ type: ADD_HABIT, payload: res.data });
    })
    .catch(err => {
      if (err.response.status === 403) {
        dispatch({ type: UNAUTHORIZED_USER, payload: err.response });
      } else {
        dispatch({ type: ADD_HABIT_FAIL, payload: err.response });
      }
    });
};

export const deleteHabit = habit => dispatch => {
  return axios
    .delete(`https://lifegpadb.herokuapp.com/api/habits/${habit.id}`, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      dispatch({ type: DELETE_HABIT, payload: res.data });
    })
    .catch(err => {
      if (err.response.status === 403) {
        dispatch({ type: UNAUTHORIZED_USER, payload: err.response });
      } else {
        dispatch({ type: DELETE_HABIT_FAIL, payload: err.response });
      }
    });
};

//update Habit
export const updateHabit = habit => dispatch => {
  console.log("updateTask action", habit);
  return axios
    .put(`https://lifegpadb.herokuapp.com/api/habits/${habit.id}`, habit, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      dispatch({ type: UPDATE_HABIT, payload: res.data });
    })
    .catch(err => {
      if (err.response.status === 403) {
        dispatch({ type: UNAUTHORIZED_USER, payload: err.response });
      } else {
        dispatch({ type: UPDATE_HABIT_FAIL, payload: err.response });
      }
    });
};

//GPAS
export const getGPA = () => dispatch => {
  axios
    .get("https://lifegpadb.herokuapp.com/api/habits/gpa", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then(res => {
      console.log("res", res.data);
      dispatch({ type: GET_GPA_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const submitHabits = habits => dispatch => {
  console.log("submittasks action", habits);
  return axios
    .post(
      "https://lifegpadb.herokuapp.com/api/habits/submit",
      { habits },
      {
        headers: { Authorization: localStorage.getItem("token") }
      }
    )
    .then(res => {
      dispatch({ type: SUBMIT_HABITS, payload: res.data });
    })
    .catch(err => {
      if (err.response.status === 403) {
        dispatch({ type: UNAUTHORIZED_USER, payload: err.response });
      } else {
        dispatch({ type: SUBMIT_HABITS_FAIL, payload: err.response });
      }
    });
};

export const toggleCompleted = habit => {
  console.log("togglecompleted habit", habit);
  return { type: TOGGLE_HABIT_DONE, payload: habit.id };
};
