import React from "react";
import Accordion from "./utility/Accordion";
import moment from "moment";
import levels from "../info";
import { connect } from "react-redux";

class ReviewsForecast extends React.Component {

  getForecast(weeksArr) {
    const {cards, currLevel} = this.props;
    
    const foreCastArray = [0, 0, 0, 0, 0, 0, 0];
    const start = levels[1].start;
    const end = levels[currLevel].end;

    for(let j=0; j<7; j++) {
      for(let i=start; i<=end; i++) {
        if(!cards[i].unlocked || !cards[i].learned)
          continue;
        const reviewTime = cards[i].timeNextReview;
        const dur = weeksArr[j].dur;
        if(dur.isSameOrAfter(reviewTime)) {
          foreCastArray[j]++;
        }
      }
    }
    return foreCastArray;
  }

  getWeek() {
    const week = moment.weekdays();
    const weekArray = []
    for(let i=0; i<7; i++) {
      const today = moment();
      const nextDay = today.add(i, 'd');
      const dur = nextDay.endOf('d');
      let day
      if(i === 0) {
        day = "Today"
      } else {
        day = week[nextDay.day()];
      }
      weekArray.push({
        day,
        dur 
      })
    }
    return weekArray;
  }

  render() {

    const weekArr = this.getWeek();
    const foreCastArray = this.getForecast(weekArr);

    return (
      <div id="review-forecast" className="rounded-xs shadow-xs px-2 py-3">
        <h1 class="flex-none text-xl font-medium leading-normal text-dark-gray mt-0 mx-0 mb-3 p-3">
          Review Forecast
        </h1>
        <div className="forecast-body">
          {foreCastArray.map((val, ind) => {
            return <Accordion key={ind}
            title={weekArr[ind].day}
            content={`${val} reviews`}
            />
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cards: state.cards,
  currLevel: state.user.currLevel
})

export default connect(mapStateToProps)(ReviewsForecast);
