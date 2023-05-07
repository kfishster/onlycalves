import { createBrowserHistory } from "history";
import {
  ReactPlugin,
  withAITracking,
} from "@microsoft/applicationinsights-react-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

const browserHistory = createBrowserHistory();

var reactPlugin = new ReactPlugin();
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

export const appInsightsTracking = (
  name: string,
  component: React.ComponentType<any>
) => withAITracking(reactPlugin, component, name, "flex w-full justify-center");
