import React from 'react';
import Home from './containers/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Home/>
      <div id="other-window">
                <a href="https://github.com/therealchiendat">Github</a>
                <a href="https://www.linkedin.com/in/chiendat/">LinkedIn</a>
                <a href="https://www.instagram.com/notchiendat/">Instagram</a>
            </div>
    </div>
  );
}

export default App;
