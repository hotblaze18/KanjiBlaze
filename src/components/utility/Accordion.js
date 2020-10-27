import React, { useState, useRef } from "react";

import "./Accordion.css";

function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section">
      <button className={`accordion rounded-md ${setActive}`} onClick={toggleAccordion}>
        <p className="accordion__title">{props.title}</p>
        <i className={`fa fa-chevron-right ${setRotate}`}></i>
      </button>
      <div
        ref={content}
        style={{ height: `${setHeight}` }}
        className="accordion__content shadow-xs rounded-sm mb-2"
      >
        <div
          className="accordion__text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;
