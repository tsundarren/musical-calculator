import React, { useContext, useEffect } from "react";
import { CalcContext } from '../context/CalcContext';

const getStyleName = btn => {
  const className = {
    '-': 'operation',
    '+': 'operation',
    'x': 'operation',
    '/': 'operation',
    '=': 'equals',
  };
  return className[btn];
};

// Cleaner way to import soundfiles
const importSound = (soundName) => require(`../sound/${soundName}.mp3`);

const soundMap = {
  '+': importSound('plus'),
  '-': importSound('minus'),
  'x': importSound('mult'),
  '/': importSound('div'),
  '+-': importSound('invert'),
  '%': importSound('percent'),
  '.': importSound('decimal'),
  '=': importSound('equals'),
  'C': importSound('clear'),
  '0': importSound('zero'), 
  '1': importSound('one'),
  '2': importSound('two'),
  '3': importSound('three'),
  '4': importSound('four'),
  '5': importSound('five'),
  '6': importSound('six'),
  '7': importSound('seven'),
  '8': importSound('eight'),
  '9': importSound('nine')
};

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);

  const playSound = () => {
    const audioSrc = soundMap[value];
    if (audioSrc) {
      const audio = new Audio(audioSrc);
      audio.play();
    }
  };

  // Decimal btn handler
  const decimalClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
    });
  };

  // Clear btn handler
  const clearClick = () => {
    setCalc({ sign: '', num: 0, res: 0 });
  };

  // Number btn handler
  const handleNumClick = () => {
    const numberString = value.toString();
    const numberValue = numberString === '0' && calc.num === 0 ? "0" : Number(calc.num + numberString);

    setCalc({
      ...calc,
      num: numberValue
    });
  };

  // Operation btn handler
  const operationClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    });
  };

  // Equals btn handler
  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          '+': (a, b) => a + b,
          '-': (a, b) => a - b,
          'x': (a, b) => a * b,
          '/': (a, b) => a / b,
        };

        if (!result.hasOwnProperty(sign)) {
          console.error("Invalid operator:", sign);
          return NaN;
        }
        return result[sign](a, b);
      };

      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: '',
        num: 0
      });
    } else {
      console.error("Invalid operation sign:", calc.sign);
      setCalc({
        sign: '',
        num: 0,
        res: 0
      });
    }
  };

  // Percent btn handler
  const percentClick = () => {
    setCalc({
      num: (calc.num / 100),
      res: (calc.res / 100),
      sign: ''
    });
  };

  // Invert btn handler
  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: ''
    });
  };

  // Dynamic btn handler
  // eslint-disable-next-line 
  const handleBtnClick = () => {
    playSound();
    const results = {
      '+': operationClick,
      '-': operationClick,
      'x': operationClick,
      '/': operationClick,
      '.': decimalClick,
      'C': clearClick,
      '%': percentClick,
      '+-': invertClick,
      '=': equalsClick
    };

    if (results[value]) {
      return results[value]();
    } else {
      return handleNumClick();
    }
  };

  // Keyboard input handler
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === value.toString()) {
        handleBtnClick();
      } else if (event.key === 'Escape' && value === 'C') {
        handleBtnClick();
      } else if (event.key === 'Enter' && value === '=') {
        handleBtnClick();
      } else if (event.key === ' ' && value === '+-') {
        handleBtnClick();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [value, handleBtnClick]);


  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>
      {value}
    </button>
  );
};

export default Button;
