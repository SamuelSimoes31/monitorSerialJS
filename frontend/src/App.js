import React from 'react';
import './App.css';
import GenerealContextProvider from './components/GeneralContext';
import SerialConnection from './components/SerialConnection';
import SerialRead from './components/SerialRead';
import SerialWrite from './components/SerialWrite';

function App() {
  return (
    <div className="App">
      <GenerealContextProvider>
        <SerialConnection/>
        <SerialRead/>
        <SerialWrite/>
      </GenerealContextProvider>
    </div>
  );
}

export default App;
