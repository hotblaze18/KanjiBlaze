import React from "react";
import { connect } from "react-redux";
import { toHiragana } from "@koozaki/romaji-conv";
import { findBestMatch } from "string-similarity";
import {
  addToSessionQueue,
  removeCurrFromSessionQueue,
} from "../actions/session.action";
import { updateLessonCard } from "../actions/lessons.action";
import { updateReviewCard } from "../actions/reviews.action";
import { updateCard } from "../actions/cards.action";
import { addCardToUpdateQueue } from "../actions/updates.action";
import moment from "moment";
import LessonCard from "./LessonCard";

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

let resultText = "";

class TestCard extends React.Component {
  state = {
    resultIcon: null,
    resultText: "",
    referenceCard: null,
  };

  inputRef = React.createRef();
  resultRef = React.createRef();
  submitButtonRef = React.createRef();

  getBg() {
    switch (this.props.card.type) {
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

  renderCardContent() {
    if (this.props.card["cardBody"]) {
      return this.props.card["cardBody"];
    } else {
      return (
        <img
          alt={this.props.card["cardMeaning"]}
          src={"public/" + this.props.card["cardImg"]}
        />
      );
    }
  }

  getPlaceholder() {
    if (this.props.stype === "reading") {
      return "答え";
    } else return "Your Response";
  }

  getLang() {
    if (this.props.stype === "reading") {
      return "ja";
    } else {
      return "en";
    }
  }

  getCardFooter() {
    const { sessionQueue, currIndex } = this.props.session;
    const stype = sessionQueue[currIndex].stype.capitalize();
    const type = this.props.card.type.capitalize();
    return type + " " + stype;
  }

  inputKeyPress() {
    if (this.props.stype === "reading")
      this.inputRef.current.value = toHiragana(this.inputRef.current.value);
  }

  isCorrectAnswer() {
    let isCorrect = false;

    if (this.props.stype === "meaning") {
      const meanings = this.props.card["cardMeaning"].map((meaning) =>
        meaning.toLowerCase()
      );
      const similarity = findBestMatch(
        this.inputRef.current.value.toLowerCase(),
        meanings
      );
      similarity.ratings.forEach(({ rating }) => {
        if (rating >= 0.7) {
          isCorrect = true;
        }
      });
    } else {
      const card = this.props.card;
      const type = card.type;
      let readings;
      if (type === "kanji") {
        readings = card.mainReading.split(",").map((r) => r.trim());
      } else if (type === "vocabulary") {
        readings = card.kanaReading.split(",").map((r) => r.trim());
      }

      readings.forEach((reading) => {
        if (reading === this.inputRef.current.value) isCorrect = true;
      });
    }
    return isCorrect;
  }

  getPromotion(lesson, correct) {
    console.log(correct, lesson);
    if (correct === true) {
      if (lesson.type === "radical") {
        if (lesson.timesAttempted === 1) return 1;
        else if (lesson.timesAttempted > 1) return -1;
      } else {
        if (lesson.timesAttempted === 2 && lesson.timesCorrect === 2) {
          return 1;
        } else if (lesson.timesCorrect === 2) {
          return -1;
        } else {
          return 0;
        }
      }
    } else {
      return 0;
    }
  }

  showResult(promotionVal, correct) {
    console.log(promotionVal, correct);
    const wrongIcon = (
      <div className="w-12 h-12 p-4 flex justify-center rounded-full bg-red-400">
        <i
          className="fa fa-2x fa-times self-center text-red-600"
          aria-hidden="true"
        ></i>
      </div>
    );
    const rightIcon = (
      <div className="w-12 h-12 p-4 flex justify-center rounded-full bg-green-400">
        <i
          className="fa fa-2x fa-check self-center text-green-600"
          aria-hidden="true"
        ></i>
      </div>
    );
    const promotedIcon = (
      <div className="inline-block px-3 py-2 rounded bg-green-400">
        <span className="text-white font-semibold">
          <i className="fa fa-arrow-up mr-2" aria-hidden="true"></i>
          <span>{resultText}</span>
        </span>
      </div>
    );
    const demotedIcon = (
      <div className="inline-block px-3 py-2 rounded bg-red-400">
        <span className="text-white font-semibold">
          <i className="fa fa-arrow-down mr-2" aria-hidden="true"></i>
          <span>{resultText}</span>
        </span>
      </div>
    );
    if (promotionVal === 0 && correct) {
      this.setState({ resultIcon: rightIcon });
    } else if (promotionVal === 0 && !correct) {
      this.setState({ resultIcon: wrongIcon });
    } else if (promotionVal === 1) {
      this.setState({ resultIcon: promotedIcon });
    } else {
      this.setState({ resultIcon: demotedIcon });
    }
    // make the result visible
    setTimeout(
      () => this.resultRef.current.classList.add("resultIconVisible"),
      200
    );
  }

  applyCardUpdates(promotionVal, lesson) {
    // get the requred data out of store
    const { type } = this.props.session;
    const card = this.props.cards[this.props.card.cardNo];
    const currLevel = this.props.currLevel;
    const { timesIncorrect } = lesson;
    console.log(card, lesson);
    // Set demoting factors.
    const curr_srs_stage = card.cardProgress;
    const incorrect_factor = Math.ceil(timesIncorrect / 2);
    const srs_penalty_factor = card.cardProgress < 5 ? 1 : 2;
    console.log(promotionVal);
    //if type of session is lesson then just set learned true so that card can be review from now onwards
    if (type === "lesson" && promotionVal !== 0) {
      card.learned = true;
      //get attained level and sub level to set the state
      card.attainedLevel = reviews_info[card.cardProgress].attained;
      resultText = reviews_info[card.cardProgress].sub;
      //this.setState({ resultText: reviews_info[card.cardProgress].sub });
      //get time to be added for curr progress(in hours);
      let addTime = reviews_info[card.cardProgress].time;
      //if currLevel is 1 or 2 and user is apprentince then reduce time by factor of 2
      if (
        (currLevel === 1 || currLevel === 2) &&
        card.attainedLevel === "apprentince"
      ) {
        addTime = Math.ceil(addTime / 2);
      }
      //update the time next review on the card
      card.timeNextReview = moment().add(addTime, "h").endOf("h");
      //Add card to global updates queue
      this.props.addCardToUpdateQueue(card);
      //Update the card in the store
      this.props.updateCard(card);
      // increment the no of quizzed items in the current session
    } else if (type === "review") {
      if (promotionVal === 1) {
        //Increment the card progress by 1 since promovalue is 1
        card.cardProgress = card.cardProgress + 1;
        //get new attained level and sub level to set the state
        card.attainedLevel = reviews_info[card.cardProgress].attained;
        resultText = reviews_info[card.cardProgress].sub;
        //this.setState({ resultText: reviews_info[card.cardProgress].sub });
        //get time to be added for curr progress(in hours);
        let addTime = reviews_info[card.cardProgress].time;
        //if currLevel is 1 or 2 and user is apprentince then reduce time by factor of 2
        if (
          (currLevel === 1 || currLevel === 2) &&
          card.attainedLevel === "apprentince"
        ) {
          addTime = Math.ceil(addTime / 2);
        }
        //update the time next review on the card
        card.timeNextReview = moment().add(addTime, "h").endOf("h");
        //add the card to global updates
        this.props.addCardToUpdateQueue(card);
        //update the card in the store
        this.props.updateCard(card);
        // increment the no of quizzed items in the current session
      } else if (promotionVal === -1) {
        //demote the cardProgress for the given card
        card.cardProgress = Math.max(
          1,
          curr_srs_stage - incorrect_factor * srs_penalty_factor
        );
        //get the time to be added for new level(in hours)
        let addTime = reviews_info[card.cardProgress].time;
        //get attained level and sub level to set the state
        card.attainedLevel = reviews_info[card.cardProgress].attained;
        resultText = reviews_info[card.cardProgress].sub;
        //this.setState({ resultText: reviews_info[card.cardProgress].sub });
        //update the time next review on the card
        card.timeNextReview = moment().add(addTime, "h").endOf("h");
        //add the card to global updates
        this.props.addCardToUpdateQueue(card);
        //update the card in the store
        this.props.updateCard(card);
        // increment the no of quizzed items in the current session
      }
    }
  }

  toggleReferenceCard() {
    if (this.state.referenceCard === null) {
      this.setState({
        referenceCard: <LessonCard card={this.props.card} slide={true} />,
      });
    } else {
      this.setState({ referenceCard: null });
    }
  }

  onSubmit(e) {
    if (!this.props.card) return;
    //prevent default form submission
    e.preventDefault();
    //if input is empty return
    if (this.inputRef.current.value === "") {
      return;
    }

    //get required data from store
    const { sessionQueue, currIndex, type } = this.props.session;
    const info = sessionQueue[currIndex];
    const lesson = this.props.card;

    // set UI factors after submission;
    let resultColor;
    this.submitButtonRef.current.disabled = true;
    this.inputRef.current.disabled = true;

    //Increment the timesAttempted of current lesson
    lesson.timesAttempted += 1;

    //Check correctness of submitted anser
    const isCorrect = this.isCorrectAnswer();

    if (isCorrect) {
      lesson.timesCorrect += 1;
      //set green color as indication of correct answer
      resultColor = "bg-green-400";
      this.inputRef.current.classList.add(resultColor);
    } else {
      //update lesson values for incorrect answer
      lesson.timesIncorrect += 1;
      //set red color as indication of wrong answer
      resultColor = "bg-red-400";
      this.inputRef.current.classList.add(resultColor);
      //show the lesson card for user reference(since incorrectly answered)
      this.toggleReferenceCard();
      //add card again to session queue to revisit
      this.props.addToSessionQueue(info);
    }
    //get the promotion val for user answer
    const promotionVal = this.getPromotion(lesson, isCorrect);
    //update lesson/review card in store for future reference
    if (type === "lesson") {
      this.props.updateLessonCard(lesson, info.ind);
    } else {
      this.props.updateReviewCard(lesson, info.ind);
    }
    //apply updates to user card and reflect them in store and global updates queue
    this.applyCardUpdates(promotionVal, lesson);
    // show the result status to user (result text get set in applyCardUpdates)
    this.showResult(promotionVal, isCorrect);
    //clear all unwanted UI settings for next card
    const clearUnwanted = () => {
      this.props.removeCurrFromSessionQueue();
      if (this.inputRef.current !== null) {
        this.inputRef.current.classList.remove(resultColor);
        this.inputRef.current.value = "";
        this.inputRef.current.disabled = false;
        this.submitButtonRef.current.disabled = false;
      }
      if (this.state.referenceCard !== null) {
        this.toggleReferenceCard();
      }
    };
    //proceed to next card
    const proceed = (e) => {
      if (e.key === "Enter") {
        clearUnwanted();
        window.removeEventListener("keypress", proceed);
      }
    };
    //Proceed on pressing enter event
    window.addEventListener("keypress", proceed);
    //set the display of the result none automatically after some time
    setTimeout(() => {
      if (this.resultRef.current !== null) {
        this.resultRef.current.classList.remove("resultIconVisible");
      }
    }, 2500);
  }

  render() {
    return (
      <div className="test-card">
        <div className={"test-card__content" + this.getBg()}>
          <span className="font-bold text-6xl text-white self-center" lang="ja">
            {this.renderCardContent()}
          </span>
        </div>
        <div className="bg-gray-800 text-2xl text-center mb-2 shadow-sm text-white">
          <span className="py-1">{this.getCardFooter()}</span>
        </div>
        <div id="resultIcon" ref={this.resultRef}>
          {this.state.resultIcon}
        </div>
        <div className="p-2" id="answer-form">
          <form onSubmit={(e) => this.onSubmit(e)} className="relative">
            <input
              ref={this.inputRef}
              onKeyUp={(e) => setTimeout(() => this.inputKeyPress(e), 200)}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              id="user-response"
              name="user-response"
              placeholder={this.getPlaceholder()}
              type="text"
              lang={this.getLang()}
            />
            <button
              ref={this.submitButtonRef}
              type="submit"
              className="fa fa-2x fa-chevron-right cardsubmit"
            ></button>
          </form>
        </div>
        <div className="mt-4">{this.state.referenceCard}</div>
      </div>
    );
  }
}

const reviews_info = {
  1: { attained: "apprentince", sub: "Appr I", time: 4 },
  2: { attained: "apprentince", sub: "Appr II", time: 8 },
  3: { attained: "apprentince", sub: "Aprr III", time: 24 },
  4: { attained: "apprentince", sub: "Appr IV", time: 48 },
  5: { attained: "guru", sub: "Guru I", time: 7 * 24 },
  6: { attained: "guru", sub: "Guru II", time: 2 * 7 * 24 },
  7: { attained: "master", sub: "Master", time: 7 * 4 * 24 },
  8: { attained: "enlightened", sub: "Master", time: 4 * 7 * 4 * 24 },
  9: { attained: "burned", sub: "Burned", time: 10000 },
};

const mapStateToProps = (state) => ({
  session: state.session,
  cards: state.cards,
  currLevel: state.user.currLevel,
});

export default connect(mapStateToProps, {
  addToSessionQueue,
  removeCurrFromSessionQueue,
  updateLessonCard,
  updateReviewCard,
  updateCard,
  addCardToUpdateQueue,
})(TestCard);
