import axios from "axios";
import { history } from "../helper/history";
import authentication from "../authentication/authentication";

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

export const login = e => {
  e.preventDefault();
  const credentials = this.state;
  axios
    .post("http://lifegpadb.herokuapp.com/api/users/login", credentials)
    .then(res => {
      console.log(res.data, "5");
      const token = res.data.token;
      const id = res.data.id;
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      this.props.history.push("/home");
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

// export const signUp = credentials => dispatch => {
//   dispatch({ type: SIGNUP_START });
//   return axios
//     .post("https://lifegpadb.herokuapp.com/api/users/register", credentials)
//     .then(res => {
//       localStorage.setItem("token", res.data.payload);
//       dispatch({ type: SIGNUP_SUCCESS, payload: res.data.payload });
//       history.push("/protected");
//     });
// };

export const signUp = e => {
  e.preventDefault();
  const credentials = this.state;
  axios
    .post("http://lifegpadb.herokuapp.com/api/users/register", credentials)
    .then(res => {
      const token = res.data.token;
      localStorage.setItem("token", token);
      this.props.history.push("/login");
    })
    .catch(err => console.log(err));
};

// add Habit

export const addHabit = habit => dispatch => {
  return axios
    .post("https://lifegpadb.herokuapp.com/api/habits", habit, {
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
export const updateHabit = (e, id, habit) => dispatch => {
  e.preventDefault();
  authentication()
    .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, {
      habit: this.state.updateHabit
    })
    .then(res => {
      this.setState({ updateHabit: "" });
    })
    .then(res => {
      authentication()
        .get("http://lifegpadb.herokuapp.com/api/habits/")
        .then(res => {
          this.props.getHabits();
        });
      this.setState({ editHabit: false });
    });
};

export const toggle = (id, i) => {
  let lastCompletedDate = null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (this.props.habit.last_completed !== null) {
    lastCompletedDate = new Date(this.props.habit.last_completed);
  } else {
    lastCompletedDate = new Date(today - 1000 * 60 * 60 * 24);
    lastCompletedDate.setHours(0, 0, 0, 0);
  }

  const dateDifference = (today - lastCompletedDate) / 1000 / 60 / 60 / 24;

  if (dateDifference >= 1) {
    console.log("INCREMENTING");
    let newCount;
    if (this.props.habit.count == null || this.props.habit.count === 0) {
      newCount = 1;
    } else {
      newCount = this.props.count + 1;
    }

    authentication()
      .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, {
        count: newCount,
        last_completed: today
      })
      .then(res => {
        this.props.getHabits();
      })
      .catch(err => console.log("whatTheLiteralF"));
  } else {
    console.log("DECREMENTING");
    const newCount = this.props.habit.count - 1;

    const yesterday = new Date(today - 1000 * 60 * 60 * 24);
    yesterday.setHours(0, 0, 0, 0);

    authentication()
      .put(`http://lifegpadb.herokuapp.com/api/habits/${id}`, {
        count: newCount,
        last_completed: yesterday
      })
      .then(res => this.props.getHabits())
      .catch(err => console.log("error"));
  }
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
