import React from "react";

class LessonInfo extends React.Component {
  render() {
    return (
      <div>
        <h3>LESSONS: {this.props.queueLength}</h3>
        <button>Start Lessons</button>
      </div>
    );
  }
}

export default LessonInfo;
