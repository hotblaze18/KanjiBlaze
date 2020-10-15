import React from "react";

import ProgressBar from "./ProgressBar";

const LevelBox = (props) => {
    const { type, cards, completed, total } = props;
    let link = "";
    if (type === "radical") {
      link = "/radicals";
    } else if (type === "kanji") {
      link = "/kanji";
    } else {
      link = "/vocabulary";
    }
  
    const barProps = {
      height: 20,
      containerBg: "#c8c8c8",
      fillerBg: "#474747",
      completed,
      total,
      tooltip: true
    };
  
    if (type === "vocabulary") {
      return (
        <div className="py-10">
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
      <div className="py-10">
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

  export default LevelBox;