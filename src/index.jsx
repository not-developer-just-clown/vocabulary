import React from 'react';
import { render } from 'react-dom';

import App from './App'
import './index.scss';

let data = [];

if (localStorage.getItem('l23h4o2upqsaf')) {
  data = JSON.parse(localStorage.getItem('l23h4o2upqsaf'));
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        console.log("Service Worker registration successful with scope: ", registration.scope);
      },
      function (err) {
        console.log("Service Worker registration failed: ", err);
      }
    );
  });
}

render(
  <App data={data} />,
  document.getElementById('root')
);
