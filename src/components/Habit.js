import React from "react";
import { connect } from "react-redux";

class Habit extends React.Component {
  constructor() {
    super();
    console.log("task props", this.props);
    this.state = {
      habits: {
        id: "",
        name: "",
        category: "",
        completed: false
      },
      updatingHabit: false
    };
  }

  componentDidMount() {
    this.setState({
      habits: {
        id: this.props.task.id,
        name: this.props.task.name,
        category: this.props.task.category,
        completed: this.props.task.completed
      },
      updatingTask: false
    });
  }

  componentDidUpdate() {
    console.log("CDM task", this.props.habits.completed);
  }

  handleInput = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      habits: { ...this.state.habits, [event.target.name]: event.target.value }
    });
  };

  toggleUpdate = () => {
    this.setState({ updatingHabit: !this.state.updatingHabit });
  };

  render() {
    console.log("render", this.props.habits.completed);
    if (this.state.updatingTask)
      return (
        <div className="habits">
          <div className="habits-name">
            <p>Habit: </p>
            <p>{this.props.habits.name}</p>
          </div>
          <div className="category-name">
            <p>Category: </p>
            <p>{this.props.habits.category}</p>
          </div>
          <div className="grade-yourself-container">
            {this.props.habits.completed ? (
              <>
                {" "}
                <i className="success fas fa-calendar-check" />{" "}
              </>
            ) : (
              <>
                {" "}
                <i class="failure fas fa-calendar-times" />{" "}
              </>
            )}
            <button
              className={`btn btn-success`}
              onClick={() => this.props.toggleCompleted(this.props.task)}
            >
              I did this today!
            </button>
          </div>
        </div>
      );
    else
      return (
        <div className="habit">
          <div className="habit-name">
            {" "}
            <p>Habit: </p>
            <p>{this.props.habits.name}</p>
          </div>
          <div className="category-name">
            <p>Category:</p>
            <p>{this.props.habits.category}</p>
          </div>
          <div className="grade-yourself-container">
            {this.props.habits.completed ? (
              <>
                {" "}
                <i className="success fas fa-calendar-check" />{" "}
              </>
            ) : (
              <>
                {" "}
                <i class="failure fas fa-calendar-times" />{" "}
              </>
            )}
            <button
              className={`btn btn-success`}
              onClick={() => this.props.toggleCompleted(this.props.habits)}
            >
              I did this today!
            </button>
          </div>
          <div className="habit-button-container">
            <button
              className="delete-btn"
              onClick={() => {
                this.props.deleteHabit(this.props.habits);
              }}
            >
              delete
            </button>
            <button className="edit-btn" onClick={() => this.toggleUpdate()}>
              edit
            </button>
          </div>
        </div>
      );
  }
}

const mapStateToProps = ({ error, data, updatingHabit }) => ({
  error,
  updatingHabit,
  data
});

export default connect(
  mapStateToProps,
  {}
)(Habit);
