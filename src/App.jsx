import React, { Component } from "react";
import "./sass/app.scss";
import TopHalf from "./components/tophalf/TopHalf";
import BottomHalf from "./components/bottomhalf/BottomHalf";
import axios from "axios";
const WEATHER_API_KEY = "ae2e601302674b5fb43192027192601";
class App extends Component {
  state = {
    cityName: "Karachi",
    forecastDaysNum: 5,
    isLoading: true
  };

  updateWeather = () => {
    const { cityName, forecastDaysNum } = this.state;
    const URL = `https://api.apixu.com/v1/forecast.json?key=${WEATHER_API_KEY} &q=${cityName} &days=${forecastDaysNum}`;

    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          temp_c: data.current.temp_c,
          isDay: data.current.is_day,
          text: data.current.condition.text,
          iconURL: data.current.condition.icon,
          isLoading: false,
          forecastDays: data.forecast.forecastday
        });
      })
      .catch(err => {
        if (err) {
          console.error("Unable to get the data from API", err);
        }
      });
  };
  componentWillMount() {
    const { eventEmitter } = this.props;
    this.updateWeather();
    eventEmitter.on("updateWeather", data => {
      this.setState({ cityName: data }, () => this.updateWeather());
    });
  }

  render() {
    const {
      isLoading,
      cityName,
      temp_c,
      text,
      isDay,
      iconURL,
      forecastDays
    } = this.state;
    const { eventEmitter } = this.props;
    return (
      <div className="app-container">
        <div className="main-container">
          {isLoading && <h3>Loading......</h3>}
          {!isLoading && (
            <div className="top-half">
              <TopHalf
                location={cityName}
                temp_c={temp_c}
                text={text}
                isDay={isDay}
                iconURL={iconURL}
                eventEmitter={eventEmitter}
              />
            </div>
          )}

          <div className="bottom-half">
            <BottomHalf forecastDays={forecastDays} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
