import React from "react";
import { connect } from "react-redux";
import ProgressBar from "./ProgressBar";
import levels from "../info";
import { Link } from "react-router-dom";
const uicards = require("../uicards.json");



class LevelProgress extends React.Component {

    getBg(type) {
        switch (type) {
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

    renderProgressCard(uicard) {
        const { cardBody, cardNo, type, cardMeaning } = uicard;
        const { cardProgress }  = this.props.cards[cardNo];
        
        const smallBarProps = {
            height: 4,
            radius: "1px",
            containerBg: "#c8c8c8",
            fillerBg: "#08C66C",
            completed: cardProgress,
            total: 5,
        }

        return(
            <div key={cardNo} class="progress-card">
                <Link to={`/${type}/${cardNo}`}>
                <div className={"flex justify-center rounded-sm shadow-sm p-2 mb-2 w-12 h-12" + this.getBg(type)}>
                <span lang="jp" style={{fontSize:"1.5rem"}} className="text-white self-center">{cardBody ? cardBody : <img src={`/imgs/${cardMeaning[0]}.png`} alt={cardMeaning[0]}></img>}</span>
                </div>
                </Link>
                <ProgressBar {...smallBarProps} />
            </div>
        )
    }

    renderProgressGrid(type, uicards) {
        return(
            <div className="bg-white p-4 my-4">
                <h2 class="border-gray-100 border-solid border-0 border-b text-sm text-black text-left leading-none tracking-normal font-bold mt-0 pb-2 mb-2">{type}</h2>
                <div className="progress-grid py-2">
                    {uicards.map((uicard) => {
                        return this.renderProgressCard(uicard)
                    })}
                </div>
            </div>
        )
    }

    render() {

        const { currLevel, levelsInfo } = this.props;
        const radicals = [];
        const kanji = [];

        const start = levels[currLevel].start;
        const end = levels[currLevel].end;

        for(let i=start; i<=end; i++) {
            if(uicards[i].type === "radical")
                radicals.push(uicards[i]);
            else if(uicards[i].type === "kanji")
                kanji.push(uicards[i]);
        }

        const barProps = {
            height: 40,
            radius: "20px",
            containerBg: "#c8c8c8",
            fillerBg: "#f100a1",
            completed: levelsInfo[currLevel].kanjiProgress,
            total: kanji.length,
            text: {
                content: "#completed of #total kanji passed",
                color: "#fff"
            }
        };

        return(
            <div id="level-progress" className="bg-white rounded-md shadow-xs px-4 py-5">
                <h1 class="text-xl leading-normal font-medium text-dark-gray m-0">Level {currLevel} Progress</h1>
                <div className="py-4">
                <ProgressBar {...barProps} />
                </div>
                {this.renderProgressGrid("Radicals", radicals)}
                {this.renderProgressGrid("Kanji", kanji)}
            </div>
        )
    }

}

const mapStateToProps = (state) => (
    {
        cards: state.cards,
        levelsInfo: state.levelsInfo,
        currLevel: state.user.currLevel
    }
);

export default connect(mapStateToProps)(LevelProgress);