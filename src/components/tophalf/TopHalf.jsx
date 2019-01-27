import React, { Component } from "react";
import "./topHalf.scss";
import Weather from "./Weather";

import { Manager, Reference, Popper } from "react-popper";

export default class TopHalf extends Component {
  state = {
    isSelectLocationOpen: false,
    locationName: ""
  };
  onSelectLocation = () => {
    this.setState(prevState => {
      return {
        isSelectLocationOpen: !prevState.isSelectLocationOpen
      };
    });
  };

  onLocationChange = e => {
    this.setState({
      locationName: e.target.value.trim()
    });
  };
  onLocationSelect = () => {
    const { locationName } = this.state;
    const { eventEmitter } = this.props;
    this.setState({ isSelectLocationOpen: false });
    eventEmitter.emit("updateWeather", locationName);
  };
  render() {
    const { isSelectLocationOpen } = this.state;
    const { eventEmitter } = this.props;
    return (
      <div className="topHalf-container">
        <div className="topHalf-title">Weather Forecast</div>
        <Weather {...this.props} />

        <Manager>
          <Reference>
            {({ ref }) => (
              <button
                className="btn btn-select-location"
                ref={ref}
                onClick={this.onSelectLocation}
              >
                See Location
              </button>
            )}
          </Reference>

          <Popper placement="top">
            {({ ref, style, placement, arrowProps }) =>
              isSelectLocationOpen && (
                <div
                  className="popup-container"
                  ref={ref}
                  style={style}
                  data-placement={placement}
                >
                  <div className="form-container">
                    <label htmlFor="location-name">Location Name</label>
                    <input
                      id="location-name"
                      type="text"
                      placeholder="City Name"
                      onChange={this.onLocationChange}
                    />
                    <button
                      className="btn btn-select-location"
                      style={{ margin: "10px 0" }}
                      onClick={this.onLocationSelect}
                    >
                      Select
                    </button>
                  </div>
                  <div ref={arrowProps.ref} style={arrowProps.style} />
                </div>
              )
            }
          </Popper>
        </Manager>
      </div>
    );
  }
}
