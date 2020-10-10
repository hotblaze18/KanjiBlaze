import React from "react";
import { connect } from "react-redux";
import levels from "../info";
import Header from "./Header";
import ProgressBar from "./ProgressBar";

const uicards = require("../uicards.json");

const LevelBox = (props) => {
  const { type, cards, completed, total } = props;
  let link = "";
  if (type === "radical") {
    link = "/radicals/";
  } else if (type === "kanji") {
    link = "/kanji/";
  } else {
    link = "/vocabulary/";
  }

  const barProps = {
    height: 20,
    containerBg: "#c8c8c8",
    fillerBg: "#474747",
    completed,
    total,
  };

  if (type === "vocabulary") {
    return (
      <div>
        <h2 className="level-box-header">
          {type[0].toUpperCase() + type.slice(1)}
        </h2>
        <ProgressBar {...barProps} />
        <ul className="multi-character-grid">
          {cards.map((card) => (
            <li
              key={card.cardNo}
              class={`${type}-${card.cardNo} character-item`}
            >
              <a href={`${link}/${card.cardNo}`}>
                <span class="character" lang="ja">
                  {card.cardBody}
                </span>
                <ul>
                  <li lang="ja" className="text-center">
                    {card.kanaReading}
                  </li>
                  <li className="text-center">{card.cardMeaning[0]}</li>
                </ul>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h2 className="level-box-header">
        {type[0].toUpperCase() + type.slice(1)}
      </h2>
      <ProgressBar {...barProps} />
      <ul className="single-character-grid">
        {cards.map((card) => (
          <li key={card.cardNo} class={`${type}-${card.cardNo} character-item`}>
            <a href={`${link}/${card.cardNo}`}>
              <span class="character" lang="ja">
                {card.cardBody}
              </span>
              <ul>
                <li lang="ja" className="text-center">
                  {card.mainReading}
                </li>
                <li className="text-center">{card.cardMeaning[0]}</li>
              </ul>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LevelPage = (props) => {
  const radicals = [];
  const kanji = [];
  const vocabulary = [];

  const start = levels[props.level].start;
  const end = levels[props.level].end;

  console.log(props.levelsInfo);

  //const radProgress = props.levelsInfo[props.level].radicalProgress;
  const radTotal = levels[props.level].noOfRadicals;
  //const kanProgress = props.levelsInfo[props.level].kanjiProgress;
  const kanTotal = levels[props.level].noOfKanji;
  //const vocProgress = props.levelsInfo[props.level].vocProgress;
  const vocTotal = levels[props.level].noOfVocab;

  for (let i = start; i <= end; i++) {
    if (uicards[i].type === "radical") {
      radicals.push(uicards[i]);
    } else if (uicards[i].type === "kanji") {
      kanji.push(uicards[i]);
    } else {
      vocabulary.push(uicards[i]);
    }
  }

  return (
    <div>
      <Header />
      <div className="px-6 py-10 md:px-10">
        <h1 className="font-light text-5xl mb-10">
          Level {props.level}
          <small className="text-3xl ml-3 text-gray-500 font-hairline">
            RADICALS, KANJI, &amp; VOCABULARY
          </small>
        </h1>
        <LevelBox
          type="radical"
          cards={radicals}
          completed={12}
          total={radTotal}
        />
        <LevelBox type="kanji" cards={kanji} completed={10} total={kanTotal} />
        <LevelBox
          type="vocabulary"
          cards={vocabulary}
          completed={5}
          total={vocTotal}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  levelsInfo: state.levelsInfo,
});

export default connect(mapStateToProps)(LevelPage);
