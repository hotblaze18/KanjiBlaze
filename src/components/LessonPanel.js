import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { doProgressUnlockCardsAndMakeLessonQueue } from "../actions/mixed.action";

class LessonPanel extends React.Component {
  componentDidMount() {
    if (this.props.sessionType !== "lesson") {
      this.props.doProgressUnlockCardsAndMakeLessonQueue();
    }
  }

  render() {
    return (
      <div id="lesson-panel">
        <div className="flex justify-center rounded-md w-full bg-primary font-semibold h-48">
          <span className=" text-white text-4xl self-center">
            Lessons: {this.props.lessons.length}
          </span>
        </div>
        {!this.props.sessionStarted ? (
          <Link className="btn-2 mt-4" to="/lesson/session">
            Start Lesson
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lessons: state.lessons,
  sessionType: state.session.type,
  sessionStarted: state.session.started,
});

export default connect(mapStateToProps, {
  doProgressUnlockCardsAndMakeLessonQueue,
})(LessonPanel);
