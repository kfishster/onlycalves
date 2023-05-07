import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { createBrowserHistory } from "history";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

const browserHistory = createBrowserHistory();
export var reactPlugin = new ReactPlugin();

var appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: "7047ae3a-8031-45ae-a433-3deeb255896a",
    extensions: [reactPlugin],
    enableAutoRouteTracking: true,
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory },
    },
  },
});

appInsights.loadAppInsights();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
