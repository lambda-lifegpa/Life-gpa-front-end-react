import React from "react";
import { connect } from "react-redux";
import { getGPA } from "../actions";

class GPAContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      daily: 0,
      weekly: 0,
      monthly: 0,
      total: 0
    };
  }

  componentDidMount() {
    this.props.getGPA();
    console.log("gpa props", this.props.getGPA());
  }
  render() {
    return (
      <div className="gpa">
        <h1>LifeGPA</h1>
        <p>Daily Grade: {this.props.daily}</p>
        <p>Weekly Grade: {this.props.weekly}</p>
        <p>Monthly Grade: {this.props.monthly}</p>
        <p>Total GPA: {this.props.total}%</p>
      </div>
    );
  }
}

const mapStateToProps = ({ daily, weekly, monthly, total }) => ({
  daily,
  weekly,
  monthly,
  total
});

export default connect(
  mapStateToProps,
  { getGPA }
)(GPAContainer);
