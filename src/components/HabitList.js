import React from "react";
import Habit from "./Habit";
import AddHabit from "./AddHabitForm";

const HabitList = props => {
  console.log("habitlist props", props.habits);

  return (
    <div className="habit-list">
      <h1>habit List</h1>
      <p>
        This is a list of your daily habits to be graded. Each day, tell us if
        you did a habit.
      </p>
      <div className="habits-container">
        {props.habits.map(habit => {
          return (
            <div>
              <habit
                key={habit._id}
                habit={habit}
                toggleCompleted={props.toggleCompleted}
                deletehabit={props.deletehabit}
                updatehabit={props.updatehabit}
              />
            </div>
          );
        })}
      </div>
      <button
        className={`btn btn-primary`}
        onClick={() => {
          props.submithabits();
        }}
      >
        Submit your habits for grading!
      </button>
    </div>
  );
};

export default HabitList;
