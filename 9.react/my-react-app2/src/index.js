import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return <h1>헬로우 리엑트!</h1>
}

const Banner = () => {
  return <h1>여기는 광고가 올 곳!</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Banner />
  </React.StrictMode>
);
