import Login from "./Pages/Login";

import React, { Component } from "react";
import { ANALYTICS_FLAG, LOGIN_FLAG } from "./constant";
import Main from "./Pages/Main";
import Analytics from "./Pages/Analytics";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FLAG: LOGIN_FLAG,
    };
  }

  updateFlag = (flag) => {
    this.setState({
      FLAG: flag,
    });
  };

  render() {
    if (this.state.FLAG === LOGIN_FLAG) {
      return (
        <div>
          <Login updateFlag={this.updateFlag}></Login>
        </div>
      );
    } else if (this.state.FLAG === ANALYTICS_FLAG) {
      return (
        <div>
          <Analytics updateFlag={this.updateFlag}></Analytics>
        </div>
      );
    } else {
      return (
        <div>
          <Main></Main>
        </div>
      );
    }
  }
}
