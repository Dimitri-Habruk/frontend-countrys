import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import Header from '@/components/Header';
import CountryList from '@/components/CountryList';
import CountryPopup from '@/components/CountryPopup';

const ADD_COUNTRY = gql`
  mutation AddCountry($name: String!, $emoji: String!, $code: String!, $continent: ObjectIdInput!) {
    addCountry(data: { name: $name, emoji: $emoji, code: $code, continent: $continent }) {
      name
      emoji
      code
      continent {
        name
        id
      }
    }
  }
`;

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      emoji
      code
      continent {
        name
      }
    }
  }
`;

const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      id
      name
    }
  }
`;

const Countries = () => {
    const [countryName, setCountryName] = useState('');
    const [countryEmoji, setCountryEmoji] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [continent, setContinent] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const { loading: loadingCountries, error: errorCountries, data: dataCountries, refetch } = useQuery(GET_COUNTRIES);
    const { loading: loadingContinents, error: errorContinents, data: dataContinents } = useQuery(GET_CONTINENTS);
    const [addCountry] = useMutation(ADD_COUNTRY);

    const handleButtonClick = async () => {
        try {
            await addCountry({
                variables: {
                    name: countryName,
                    emoji: countryEmoji,
                    code: countryCode,
                    continent: continent ? { id: continent } : null
                }
            });
            refetch();
        } catch (error) {
            console.error('Error adding country:', error);
        }
    };

    if (loadingCountries || loadingContinents) return <p>Loading...</p>;
    if (errorCountries || errorContinents) return <p>Error: {errorCountries ? errorCountries.message : errorContinents.message}</p>;

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <Header />
            <div className="form-inputs">
                <input
                    type="text"
                    placeholder="Country Name"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    className="form-inputs-item"
                />
                <input
                    type="text"
                    placeholder="Country Emoji"
                    value={countryEmoji}
                    onChange={(e) => setCountryEmoji(e.target.value)}
                    className="form-inputs-item"
                />
                <input
                    type="text"
                    placeholder="Country Code"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="form-inputs-item"
                />
                <select
                    value={continent || ''}
                    onChange={(e) => setContinent(e.target.value)}
                    className="form-inputs-item"
                >
                    <option value="" disabled>Select Continent</option>
                    {dataContinents.continents.map((continent: any) => (
                        <option key={continent.id} value={continent.id}>
                            {continent.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleButtonClick}
                    className="form-inputs-item-btn"
                >
                    Add
                </button>
            </div>
            <div className="w-full max-w-2xl">
                <h2 className="text-cente header">Countries</h2>
                <CountryList
                    countries={dataCountries.countries}
                    onSelectCountry={setSelectedCountry}
                />
            </div>
            <CountryPopup
                country={selectedCountry}
                onClose={() => setSelectedCountry(null)}
            />
        </div>
    );
}

export default Countries;
