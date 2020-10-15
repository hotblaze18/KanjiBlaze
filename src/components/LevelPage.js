import React from "react";
import { connect } from "react-redux";
import levels from "../info";
import Header from "./Header";
import isEmpty from "lodash/isEmpty";
import { fetchLevelsInfo } from "../actions/levles.action";
import LevelBox from "./LevelBox";

const uicards = require("../uicards.json");




class LevelPage extends React.Component {
  
  componentDidMount() {
    if(isEmpty(this.props.levelsInfo)) {
      this.props.fetchLevelsInfo();
    }
    console.log(this.props);
  }

  getUiCards(level) {
    const radicals = [];
  const kanji = [];
  const vocabulary = [];

  const start = levels[level].start;
  const end = levels[level].end;

  for (let i = start; i <= end; i++) {
    if (uicards[i].type === "radical") {
      radicals.push(uicards[i]);
    } else if (uicards[i].type === "kanji") {
      kanji.push(uicards[i]);
    } else {
      vocabulary.push(uicards[i]);
    }
  }

  return { radicals, kanji, vocabulary };

  }

  render() {
  
    if(isEmpty(this.props.levelsInfo)) {
      return "Loading..."
    }
    else {

      const level = this.props.match.params.level;
      const { radicals, kanji, vocabulary } = this.getUiCards(level);
      const { levelsInfo } = this.props

      const radProgress = levelsInfo[level].radicalProgress;
      const radTotal = levels[level].noOfRadicals;
      const kanProgress = levelsInfo[level].kanjiProgress;
      const kanTotal = levels[level].noOfKanji;
      const vocProgress = levelsInfo[level].vocabProgress;
      const vocTotal = levels[level].noOfVocab;
      
      return (
        <div>
          <Header />
          <div className="px-6 py-10 md:px-10">
            <h1 className="font-light text-5xl mb-10">
              Level {level}
              <small className="text-3xl ml-3 text-gray-500 font-hairline">
                RADICALS, KANJI, &amp; VOCABULARY
              </small>
            </h1>
            <LevelBox
              type="radical"
              cards={radicals}
              completed={radProgress}
              total={radTotal}
            />
            <LevelBox type="kanji" cards={kanji} completed={kanProgress} total={kanTotal} />
            <LevelBox
              type="vocabulary"
              cards={vocabulary}
              completed={vocProgress}
              total={vocTotal}
            />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  levelsInfo: state.levelsInfo,
});

export default connect(mapStateToProps, {fetchLevelsInfo})(LevelPage);
