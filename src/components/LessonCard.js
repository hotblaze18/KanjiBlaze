import React from "react";

class LessonCard extends React.Component {
  state = {
    slideClass: "slide",
  };

  renderBody(card) {
    if (card["cardBody"]) {
      return (
        <span className="text-white text-3xl font-bold self-center">
          {card["cardBody"]}
        </span>
      );
    } else {
      return (
        <img
          className="self-center"
          alt={card["cardMeaning"]}
          src={"public/" + card["cardImg"]}
        />
      );
    }
  }

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

  renderCardMeaning() {
    const meanings = this.props.card["cardMeaning"];
    const html = (
      <h3 className="text-xl ml-2">
        <span className="font-medium">{meanings[0]}</span>
        {meanings.map((meaning, ind) => {
          if (ind > 0) return ", " + meaning;
          return "";
        })}
      </h3>
    );
    return html;
  }

  renderOnAndKunReadings(type) {
    if (type === "kanji") {
      const { Onyomi, Kunyomi, Nanori } = this.props.card;
      return (
        <div className="p-2">
          <span className="block">{"Onyomi: " + Onyomi}</span>
          <span className="block">{"Kunnyomi: " + Kunyomi}</span>
          {Nanori !== "None" ? <span>{"Nanori: " + Nanori}</span> : ""}
        </div>
      );
    } else return "";
  }

  slideDown() {
    this.setState({ slideClass: "slide slideDown" });
  }

  renderLessonHeader() {
    const { cardLevel, type, mainReading, kanaReading } = this.props.card;
    if (type === "vocabulary") {
      return (
        <div className="pb-6 border-b  border-gray-600 relative">
          <div className="flex p-4 flex-col">
            <div
              className={
                "p-2 flex rounded-sm shadow-xs justify-center mb-4 md:mb-2 self-center" +
                this.getBg()
              }
            >
              {this.renderBody(this.props.card)}
            </div>
            <div className="flex w-full justify-between self-center">
              <div className="ml-2">
                <span className="block text-xs ml-2">{`level ${cardLevel} ${type}`}</span>
                {this.renderCardMeaning()}
                <span className="font-medium ml-2">{kanaReading}</span>
              </div>
              <button className="btn-2 self-center">
                <i className="fa fa-volume-up mr-2" aria-hidden="true"></i>
                {kanaReading}
              </button>
            </div>
          </div>
          {this.props.slide ? (
            <button className="slideButton" onClick={() => this.slideDown()}>
              Show More
            </button>
          ) : (
            ""
          )}
        </div>
      );
    } else
      return (
        <div className="pb-8 border-b  border-gray-600 relative">
          <div className="flex p-4">
            <div
              className={
                "p-4 flex rounded-sm shadow-xs w-20 h-20 justify-center" +
                this.getBg()
              }
            >
              {this.renderBody(this.props.card)}
            </div>
            <div>
              <span className="block text-xs ml-2">{`level ${cardLevel} ${type}`}</span>
              {this.renderCardMeaning()}
              {mainReading !== null ? (
                <span className="text-xl font-medium ml-2">{mainReading}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          {this.renderOnAndKunReadings(type)}
          {this.props.slide ? (
            <button
              className="slideButton btn-2"
              onClick={() => this.slideDown()}
            >
              Show More
            </button>
          ) : (
            ""
          )}
        </div>
      );
  }

  renderMnemonic(mntype) {
    let mnemonic = "";
    let heading = "";
    let additional = "";
    const card = this.props.card;
    if (mntype === "meaning") {
      mnemonic = card["meaningMnemonic"];
      heading = "Meaning Mnemonic";
      additional = card["additionalM"] ? card["additionalM"] : "";
    } else {
      mnemonic = card["readingMnemonic"];
      heading = "Reading Mnemonic";
      additional = card["additionalR"] ? card["additionalR"] : "";
    }

    return (
      <div className="p-2 border-b border-gray-600 md:py-8">
        <h4 className="text-md mb-4 font-semibold">{heading}</h4>
        <p className="text-md font-light text-justify md:w-3/4">{mnemonic}</p>
        {additional !== "" ? (
          <p className="text-md font-light my-2 bg-gray-300 p-3 text-justify md:w-3/4">
            {additional}
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }

  renderRadical() {
    return (
      <div>
        <div className="md:p-10 h-full">
          {this.renderLessonHeader()}
          {this.props.slide ? (
            <div className={this.state.slideClass}>
              {this.renderMnemonic("meaning")}
            </div>
          ) : (
            this.renderMnemonic("meaning")
          )}
        </div>
      </div>
    );
  }

  renderKanji() {
    return (
      <div>
        <div className="md:p-10 h-full">
          {this.renderLessonHeader()}
          {this.renderMnemonic("meaning")}
          {this.renderMnemonic("reading")}
        </div>
      </div>
    );
  }

  renderContextSentences(contextSentences) {
    const html = (
      <div className="p-2 border-b border-gray-600 sm:py-4 md:py-8">
        <h2 className="text-md mb-4 font-semibold">Context sentences: </h2>
        {contextSentences.map((pair, ind) => {
          return (
            <div className="p-3">
              <p className="mb-1">
                <span className="mr-2">{`${ind + 1}.`}</span>
                <span>{pair.sentence}</span>
              </p>
              <p>{pair.meaning}</p>
            </div>
          );
        })}
      </div>
    );
    return html;
  }

  renderVocab() {
    const { partOfSpeech, contextSentences } = this.props.card;
    return (
      <div>
        <div className="md:p-10 h-full">
          {this.renderLessonHeader()}
          {this.renderMnemonic("meaning")}
          {this.renderMnemonic("reading")}
          <div className="p-2 border-b border-gray-600">
            <span>Part of speech: </span>
            <span className="font-light">{partOfSpeech}</span>
          </div>
          {this.renderContextSentences(contextSentences)}
        </div>
      </div>
    );
  }

  render() {
    const { type } = this.props.card;
    if (type === "radical") {
      return this.renderRadical();
    } else if (type === "kanji") {
      return this.renderKanji();
    } else if (type === "vocabulary") {
      return this.renderVocab();
    }
    return "";
  }
}

export default LessonCard;
