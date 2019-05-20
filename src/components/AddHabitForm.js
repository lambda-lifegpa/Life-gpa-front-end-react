import React from "react";
import { connect } from "react-redux";
import { addHabit, getData } from "../actions";

class AddHabitForm extends React.Component {
  constructor() {
    super();
    this.state = {
      habits: {
        name: "",
        category: "",
        completed: false
      }
    };
  }
  componentDidMount() {
    this.setState({ name: "", category: "" });
  }

  handleInput = event => {
    event.preventDefault();
    this.setState({
      ...this.state.task,
      [event.target.name]: event.target.value
    });
  };

  addHabit = event => {
    this.props.addHabit(this.state.habits);
    this.props.getData();
  };

  render() {
    return (
      <div>
        <form>
          <h1>Add a Task for Today</h1>
          <p>
            You can add a task and its category, it will be added to your Task
            List. Each day mark whether you completedeach task, and it will be
            added to your average
          </p>
          <input
            tpye="text"
            name="name"
            placeholder="task"
            value={this.state.task.name}
            onChange={this.handleInput}
          />
          <input
            type="text"
            name="category"
            placeholder="category"
            value={this.state.task.category}
            onChange={this.handleInput}
          />
          <button className="add-task" type="submit">
            add Task
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ error, addingHabit }) => ({ error, addingHabit });

export default connect(
  mapStateToProps,
  { addHabit, getData }
)(AddHabitForm);
