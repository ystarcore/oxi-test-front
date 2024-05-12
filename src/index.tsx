import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Auth0Provider } from "@auth0/auth0-react"
import { createBrowserHistory } from "history"
import { OAuth_ClientId, OAuth_Domain } from './constants/AppConstants'

function getConfig() {
  // Configure the audience here. By default, it will take whatever is in the config
  // (specified by the `audience` key) unless it's the default value of "YOUR_API_IDENTIFIER" (which
  // is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you
  // don't have an API).
  // If this resolves to `null`, the API page changes to show some helpful info about what to do
  // with the audience.

  // const audience =
  //   process.env.audience && process.env.audience !== "YOUR_API_IDENTIFIER"
  //     ? process.env.audience
  //     : null

  const audience = null

  return {
    domain: OAuth_Domain,
    clientId: OAuth_ClientId,
    ...(audience ? { audience } : null),
  };
}

const history = createBrowserHistory()

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};


const config = getConfig()
const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <Auth0Provider
    {...providerConfig}
  >
    <App />
  </Auth0Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
