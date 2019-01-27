import React, { Component } from "react";
import "./forecastDay.scss";

class ForecastDay extends Component {
  render() {
    const { forecastDay } = this.props;
    return (
      <div className="forecastday-container">
        <div className="image">
          <img src={forecastDay.condition.icon} alt="forecastdays" />
        </div>
        <div className="temperature">
          <div className="high">{forecastDay.maxtemp_c}°</div>
          <div className="low">{forecastDay.mintemp_c}°</div>
        </div>
      </div>
    );
  }
}

export default ForecastDay;
