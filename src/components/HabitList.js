import React from "react";
import Habit from "./Habit";
import AddTaskFrom from "./AddHabitForm";

const HabitList = props => {
  console.log("habitlist prop", props.habits);

  return (
    <div className="habit-list">
      <h1>Habit List</h1>
      <p>
        This is your daily task list, to be graded. Each day, input a task that
        you accomplished, at end of each day you either Pass or Fail. Don't
        worry we won't say anything if you "read" but simply glance at a few
        pages.
      </p>
      <div className="task-container">
        {props.habits.map(habit => {
          return (
            <div>
              <Habit
                key={habit.id}
                habit={habit}
                toggleCompleted={props.toggleCompleted}
              />
            </div>
          );
        })}
      </div>
      <button className="submit-task">Submit Habit!</button>
    </div>
  );
};

export default HabitList;
