import React from "react";
import ReactModal from "react-modal";
import LessonCard from "./LessonCard";
import { connect } from "react-redux";
import TestCard from "./TestCard";
import {
  createSession,
  changeIndex,
  endSession,
} from "../actions/session.action";
import { fetchAndMakeSession } from "../actions/mixed.action";
import isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";
import { convertToText } from "number-to-text";
import "number-to-text/converters/en-us";
import history from "../history";

class Session extends React.Component {
  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    if (isEmpty(this.props.cards)) {
      if (this.props.type === "lesson")
        this.props.fetchAndMakeSession("lesson");
      else this.props.fetchAndMakeSession("review");
    } else if (isEmpty(this.props.session.sessionQueue)) {
      if (this.props.type === "lesson") this.props.createSession("lesson");
      else this.props.createSession("review");
    }
    // history.listen((location, action) => {
    //   console.log(this.props.location);
    //   if (
    //     (this.props.location.pathname === "/lesson/session" ||
    //       this.props.location.pathname === "/reviews/session") &&
    //     action === "POP"
    //   ) {
    //     this.props.pauseSession();
    //   }
    // });
    console.log(this.props.mainQueue);
  }

  changeIndex(type) {
    if (type === "inc") {
      this.props.changeIndex(1);
    } else {
      this.props.changeIndex(-1);
    }
  }

  getBg() {
    const { sessionQueue, currIndex } = this.props.session;
    const info = sessionQueue[currIndex];
    const card = this.props.mainQueue[info.ind];
    switch (card.type) {
      case "radical":
        return " bg-primary";
      case "kanji":
        return " bg-secondary";
      case "vocabulary":
        return " bg-tertiary";
      default:
        return "";
    }
  }

  abandonSession() {
    this.props.endSession();
    history.push("/dashboard");
  }

  getQuizInfo() {
    const queue = this.props.mainQueue;
    let quizzed = 0;
    let partiallyQuizzed = 0;
    let unquizzed = 0;
    queue.forEach((card) => {
      const { timesCorrect, timesAttempted, type } = card;
      if ((type === "radical" && timesCorrect === 1) || timesCorrect === 2)
        quizzed++;
      else if (timesAttempted >= 1) partiallyQuizzed++;
      else unquizzed++;
    });
    return {
      quizzed,
      partiallyQuizzed,
      unquizzed,
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  renderModal() {
    const style = {
      content: {
        width: "35rem",
        height: "25rem",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    };

    const { quizzed, partiallyQuizzed, unquizzed } = this.getQuizInfo();

    return (
      <ReactModal
        appElement={document.getElementById("root")}
        isOpen={this.state.isModalOpen}
        style={style}
        onRequestClose={this.toggleModal}
      >
        <div className="p-4 w-full h-full flex flex-col justify-between">
          <h2 className="text-2xl p-2 border-b border-gray-300">
            Abandon session?
          </h2>
          <div className="p-2">
            <p className="p-2">
              {convertToText(quizzed)} quizzed items will be reported.
            </p>
            <p className="p-2">
              {convertToText(partiallyQuizzed)} partially Quizzed items will not
              be reported.
            </p>
            <p className="p-2">
              {convertToText(unquizzed)} unquizzed items will not be reported.
            </p>
          </div>
          <div className="p-2 flex justify-end">
            <button
              onClick={() => this.abandonSession()}
              className="bg-red-700 px-4 py-2 text-white"
            >
              Abandon Session
            </button>
          </div>
        </div>
      </ReactModal>
    );
  }

  renderTopBar() {
    return (
      <div className={"p-4 flex text-white" + this.getBg()}>
        <span className="ml-3 self-center">
          <Link to="/dashboard">
            <i
              className="fa text-2xl cursor-pointer fa-home"
              aria-hidden="true"
            ></i>
          </Link>
        </span>
        <span
          onClick={() => this.setState({ isModalOpen: true })}
          className="ml-auto mr-3 self-center"
        >
          <i
            className="fa text-2xl cursor-pointer fa-times-circle-o"
            aria-hidden="true"
          ></i>
        </span>
      </div>
    );
  }

  renderLessonCard(card) {
    const currIndex = this.props.session.currIndex;
    const len = this.props.mainQueue.length;
    return (
      <div>
        <LessonCard card={card} />
        <div className="flex justify-between p-2">
          {currIndex > 0 ? (
            <button
              onClick={() => this.changeIndex("dec")}
              className="controlBtn controlBtnLeft"
            >
              <span className="fa fa-chevron-left"></span>
            </button>
          ) : (
            <div></div>
          )}
          {currIndex < len - 1 ? (
            <button
              onClick={() => this.changeIndex("inc")}
              className="controlBtn controlBtnRight"
            >
              <span className="fa fa-chevron-right"></span>
            </button>
          ) : (
            <div></div>
          )}
          {currIndex === len - 1 ? (
            <button
              onClick={() => this.changeIndex("inc")}
              className="controlBtn controlBtnRight"
            >
              Start Test
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }

  renderTestCard(card, stype) {
    return (
      <div id="test-card">
        <TestCard card={card} stype={stype} />
      </div>
    );
  }

  renderSessionCard(sessionInfo) {
    if (sessionInfo.mtype === "lesson") {
      return this.renderLessonCard(this.props.mainQueue[sessionInfo.ind]);
    } else {
      return this.renderTestCard(
        this.props.mainQueue[sessionInfo.ind],
        sessionInfo.stype
      );
    }
  }

  render() {
    if (!this.props.session.started) {
      return "Loading...";
    }
    const { sessionQueue, currIndex } = this.props.session;
    return (
      <div>
        {this.renderTopBar()}
        {this.renderSessionCard(sessionQueue[currIndex])}
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  cards: state.cards,
  mainQueue: ownProps.type === "lesson" ? state.lessons : state.reviews,
  session: state.session,
});

export default connect(mapStateToProps, {
  createSession,
  changeIndex,
  fetchAndMakeSession,
  endSession,
})(Session);
