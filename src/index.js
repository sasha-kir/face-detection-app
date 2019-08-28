import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'tachyons';
import * as serviceWorker from './serviceWorker';
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from './components/alert-template/react-alert-custom-template';

const alertOptions = {
  timeout: 4000,
  position: positions.TOP_CENTER
};

ReactDOM.render(
	<AlertProvider template={AlertTemplate} {...alertOptions}>
		<App />
	</AlertProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
