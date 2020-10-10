import React from "react";
import { connect } from "react-redux";
import { fetchCardsAndLevelsInfo } from "../actions/mixed.action";
import { isEmpty } from "lodash";
import LessonPanel from "./LessonPanel";
import Header from "./Header";
import { Link } from "react-router-dom";
import ReviewsPanel from "./ReviewsPanel";
import ReviewsForecast from "./ReviewsForecast";

class Dashboard extends React.Component {
  componentDidMount() {
    if (isEmpty(this.props.cards) || isEmpty(this.props.levelsInfo)) {
      this.props.fetchCardsAndLevelsInfo();
    }
  }

  renderResumeButton() {
    if (this.props.sessionType === "lesson") {
      return (
        <div className="mt-4 col-start-1 col-end-3 justify-self-center">
          <Link className="btn-2" to="lesson/session">
            Resume Session
          </Link>
        </div>
      );
    } else
      return (
        <div className="mt-4 col-start-1 col-end-3 justify-self-center">
          <Link className="btn-2" to="reviews/session">
            Resume Session
          </Link>
        </div>
      );
  }

  render() {
    if (
      !this.props.user.isLoggedIn ||
      isEmpty(this.props.cards) ||
      isEmpty(this.props.levelsInfo)
    ) {
      return (
        <div>
          <Header />
          Loading...
        </div>
      );
    }
    return (
      <div>
        <Header />
        <div className="grid py-10 md:grid-cols-3 px-10 w-full col-gap-8">
          <LessonPanel />
          <ReviewsPanel />
          {this.props.sessionStarted ? this.renderResumeButton() : ""}
          <ReviewsForecast />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cards: state.cards,
  levelsInfo: state.levelsInfo,
  user: state.user,
  sessionType: state.session.type,
  sessionStarted: state.session.started,
});

export default connect(mapStateToProps, {
  fetchCardsAndLevelsInfo,
})(Dashboard);