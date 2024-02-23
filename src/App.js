import React, { useState } from 'react';
import './App.css';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import Button from './components/Button';
import ButtonBox from './components/ButtonBox';
import CalcProvider from './context/CalcContext';
import SlidingToggle from './components/SlidingToggle';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function App() {
  const [nightMode, setNightMode] = useState(false);

  const toggleNightMode = () => {
    setNightMode(!nightMode);
    document.body.classList.toggle('night-mode');
  };

  return (
    <CalcProvider>
      <div className={`app ${nightMode ? 'night-mode' : ''}`}>
        <div className="calculator-container">
          <Wrapper nightMode={nightMode}>
            <Screen />
            <ButtonBox>
              {btnValues.flat().map((btn, i) => (
                <Button
                  value={btn}
                  key={i}
                />
              ))}
            </ButtonBox>
          </Wrapper>
          <div className="toggle-container">
            <SlidingToggle nightMode={nightMode} onClick={toggleNightMode} />
          </div>
        </div>
      </div>
    </CalcProvider>
  );
}

export default App;
