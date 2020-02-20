import React, { Component } from "react";
import "./App.css";
import { v4 } from "uuid";
class App extends Component {
  receiveMessage(event) {
    if (
      (event.data &&
        event.data.source &&
        event.data.source.includes("react")) ||
      !event.data
    ) {
      return;
    }
    console.log("parent receiveMessage event", event);

    // if (event.origin !== "http://localhost:3500") {
    //   return;
    // }

    const epicAuthResponse = {
      messageId: v4(),
      token: "abcd1234"
    };
    const orderSubmitSuccessResponse = {
      messageId: v4(),
      token: "abcd1234",
      actionExecuted: true
    };
    if (event.data) {
      if (
        event.data.action === "Epic.Clinical.Informatics.Web.InitiateHandshake"
      ) {
        console.log("InitiateHandshake action heard");
        event.source.postMessage(epicAuthResponse, "*");
      }

      if (event.data.action === "Epic.Clinical.Informatics.Web.PostOrder") {
        console.log("Submit order action heard");
        event.source.postMessage(orderSubmitSuccessResponse, "*");
      }
    }
  }

  componentDidMount() {
    window.addEventListener("message", this.receiveMessage, false);
  }

  render() {
    return (
      <div className="App">
        <iframe
          id="inlineFrameExample"
          title="Inline Frame Example"
          width="700"
          height="1000"
          src="https://localhost:3500"
        ></iframe>
      </div>
    );
  }
}

export default App;
