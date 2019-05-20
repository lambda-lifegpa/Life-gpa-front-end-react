import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-spinner";

import {
  getData,
  toggleCompleted,
  deleteHabit,
  getGPA,
  updateHabit,
  submitHabits
} from "../actions";

import Footer from "./footer";
import HabitList from "./HabitList";
import AddHabitForm from "./AddHabitForm";
import GPAContainer from "./GPAContainer";
import Nav from "./Nav";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      gpa: {}
    };
  }

  componentDidMount() {
    this.props.getData();
  }

  componentDidUpdate() {
    console.log("something updated!");
  }

  toggleCompleted = id => {
    this.props.toggleCompleted(id);
  };

  deletehabits = id => {
    this.props.deleteHabit(id);
    this.props.getData();
  };

  updatehabits = (e, habit) => {
    e.preventDefault();
    console.log(this.props.updateHabit);
    this.props.updateHabit(habit);
    this.props.getData();
  };

  submithabitss = () => {
    this.props.submitHabits(this.props.data);
  };

  render() {
    if (!this.props.data)
      return <Loader type="Audio" color="#C62727" height={300} width={300} />;
    else
      return (
        <div>
          <Nav />
          <h1>Welcome to LifeGPA</h1>
          <GPAContainer />
          <HabitList
            habits={this.props.data}
            toggleCompleted={this.toggleCompleted}
            deleteHabit={this.deleteHabit}
            updateHabit={this.updateHabit}
            submitHabit={this.submitHabit}
          />
          <AddHabitForm />
          <Footer />
        </div>
      );
  }
}

const mapStateToProps = ({ data, habits }) => ({
  data,
  habits
});

export default withRouter(
  connect(
    mapStateToProps,
    { getData, toggleCompleted, deleteHabit, getGPA, updateHabit, submitHabits }
  )(Dashboard)
);
