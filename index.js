/* global document */

import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import GenerationView from './src/components/GenerationView';

ReactDOM.render(
  <GenerationView />,
  document.getElementById('app')
);
