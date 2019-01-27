import React, { Component } from "react";
import "./bottomHalf.scss";
import ForecastDay from "./ForecastDay";
export default class BottomHalf extends Component {
  render() {
    const { forecastDays } = this.props;
    return (
      <div className="bottomHalf-container">
        <div className="inner-container">
          {forecastDays &&
            forecastDays.map((forecastDay, index) => {
              return <ForecastDay key={index} forecastDay={forecastDay.day} />;
            })}
        </div>
      </div>
    );
  }
}
