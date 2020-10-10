import React from "react";

class ReviewsForecast extends React.Component {
  render() {
    return (
      <div className="forecast col-span-1 rounded-xs shadow-xs">
        <h1 class="flex-none text-xl font-medium leading-normal text-dark-gray mt-0 mx-0 mb-3">
          Review Forecast
        </h1>
        <div className="forecast-body"></div>
      </div>
    );
  }
}

export default ReviewsForecast;
