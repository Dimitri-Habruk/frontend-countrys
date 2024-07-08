import React from 'react';
import { Twemoji } from 'react-emoji-render';

const CountryPopup = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="popup-content">
          <h2>{country.name} ({country.code})</h2>
          <div className="country-emoji">
            <Twemoji text={country.emoji.toUpperCase()} />
          </div>  
        <p>Continent: {country.continent ? country.continent.name : 'Continent is not provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryPopup;
