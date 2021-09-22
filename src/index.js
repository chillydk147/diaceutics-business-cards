import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import data from "./data/data.json";
import "./styles.css";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <App
    baseDir="https://www.diaceutics.co.uk/card/"
    data={data}
    ref={(ourComponent) => {
      window.ourComponent = ourComponent;
    }}
  />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
