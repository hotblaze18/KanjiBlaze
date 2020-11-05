import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createReviewsQueue } from "../actions/reviews.action";

class ReviewsPanel extends React.Component {
  componentDidMount() {
    this.props.createReviewsQueue();
  }

  render() {
    return (
      <div id="review-panel">
        <div className="flex justify-center rounded-md w-full bg-secondary font-semibold h-48">
          <span className=" text-white text-4xl self-center">
            Reviews: {this.props.reviews.length}
          </span>
        </div>
        {!this.props.sessionStarted && this.props.reviews.length > 0 ? (
          <Link className="btn-2 mt-4" to="/reviews/session">
            Start Reviews
          </Link>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reviews: state.reviews,
  sessionType: state.session.type,
  sessionStarted: state.session.started,
});

export default connect(mapStateToProps, { createReviewsQueue })(ReviewsPanel);
