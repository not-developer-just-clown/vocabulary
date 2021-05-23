import React from 'react';
import { render } from 'react-dom';

import App from './App'
import './index.scss';

let data = [];

if (localStorage.getItem('l23h4o2upqsaf')) {
  data = JSON.parse(localStorage.getItem('l23h4o2upqsaf'));
}

render(
  <App data={data} />,
  document.getElementById('root')
);
