import React from 'react';
import './App.css';
import GenerealContextProvider from './components/GeneralContext';
import SerialConnection from './components/SerialConnection';

function App() {
  return (
    <div className="App">
      <GenerealContextProvider>
        <SerialConnection/>
      </GenerealContextProvider>
    </div>
  );
}

export default App;
