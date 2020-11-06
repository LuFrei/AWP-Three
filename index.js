import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Viewport from "./client/Components/Viewport";

import store from './client/store'

class App extends Component {
  render(){
    return(
      <Provider store={store}>
        <div className="control-panel" />
        <Viewport />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));