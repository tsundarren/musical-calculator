import React from 'react';
import './SlidingToggle.css';

const SlidingToggle = ({ nightMode, onClick }) => {
  return (
    <div className="sliding-toggle" onClick={onClick}>
      <input type="checkbox" checked={nightMode} readOnly />
      <span className="slider round"></span>
    </div>
  );
};

export default SlidingToggle;
