import React from 'react';
import { Twemoji } from 'react-emoji-render';

const CountryList = ({ countries, onSelectCountry }) => {
  return (
    <div className="country-list">
      {countries.map(country => (
        <div
          key={country.code}
          className="country-item"
          onClick={() => onSelectCountry(country)}
        >
          <div className="country-emoji">
            <Twemoji text={country.emoji} />
          </div>           
          <div className="country-name">{country.name}</div>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
