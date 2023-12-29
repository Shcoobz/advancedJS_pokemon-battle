import { useState } from 'react';

import PageLocationsList from './pages/PageLocationsList';
import SelectionLogic from './gameLogic/SelectionLogic';
import EncounterLogic from './gameLogic/EncounterLogic';
import BattleLogic from './gameLogic/BattleLogic';

import { getPokemonUrlFromSpeciesUrl } from './utils/UtiHelpers';

import './App.css';

const usersPokemon = [
  'https://pokeapi.co/api/v2/pokemon/bulbasaur',
  'https://pokeapi.co/api/v2/pokemon/charizard',
  'https://pokeapi.co/api/v2/pokemon/poliwhirl',
];

function App() {
  const [userPokemonUrls, setUserPokemonUrls] = useState(usersPokemon);
  const [userPokemon, setUserPokemon] = useState(null);
  const [wildPokemon, setWildPokemon] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [caughtPokemon, setCaughtPokemon] = useState(null);

  console.log({
    userPokemon,
    wildPokemon,
    selectedLocation,
    selectedPokemon,
    caughtPokemon,
  });

  const handleLocationClick = (locationUrl) => {
    console.log('Function handleLocationClick was called');
    setSelectedLocation(locationUrl);
  };

  const handlePokemonSelect = (pokemon) => {
    console.log('Function handlePokemonSelect was called');
    setUserPokemon(pokemon);
    setSelectedPokemon(null);
  };

  const handleWildPokemonEncounter = (pokemon) => {
    console.log('Function handleWildPokemonEncounter was called');
    setWildPokemon(pokemon);
  };

  const handleBattleEnd = () => {
    console.log('Function handleBattleEnd was called');
    setSelectedLocation(null);
    setUserPokemon(null);
    setWildPokemon(null);
  };

  const handlePokemonCaught = (pokemon) => {
    console.log('Function handlePokemonCaught was called');
    const pokemonUrl = getPokemonUrlFromSpeciesUrl(pokemon.species.url);
    setUserPokemonUrls([...userPokemonUrls, pokemonUrl]);
    setCaughtPokemon(pokemon);
  };

  const handleBackBtnClick = () => {
    console.log('Function handleBackBtnClick was called');
    setSelectedLocation(null);
    setUserPokemon(null);
    setCaughtPokemon(null);
  };

  // select pkm if conditions are met
  if (selectedLocation && !userPokemon && !wildPokemon && !selectedPokemon) {
    return (
      <SelectionLogic
        selectedLocation={selectedLocation}
        userPokemon={userPokemon}
        wildPokemon={wildPokemon}
        selectedPokemon={selectedPokemon}
        userPokemonUrls={userPokemonUrls}
        handlePokemonSelect={handlePokemonSelect}
        handleBackBtnClick={handleBackBtnClick}
      />
    );
  }

  // encounter pkm if conditions are met
  if (selectedLocation && !selectedPokemon && !wildPokemon) {
    return (
      <EncounterLogic
        selectedLocation={selectedLocation}
        selectedPokemon={selectedPokemon}
        wildPokemon={wildPokemon}
        userPokemon={userPokemon}
        handleWildPokemonEncounter={handleWildPokemonEncounter}
        handleBackBtnClick={handleBackBtnClick}
        handleBattleEnd={handleBattleEnd}
      />
    );
  }

  // start battle if conditions are met
  if (selectedLocation && userPokemon && wildPokemon) {
    return (
      <BattleLogic
        selectedLocation={selectedLocation}
        userPokemon={userPokemon}
        wildPokemon={wildPokemon}
        caughtPokemon={caughtPokemon}
        handleBackBtnClick={handleBackBtnClick}
        handleBattleEnd={handleBattleEnd}
        handlePokemonCaught={handlePokemonCaught}
      />
    );
  }

  return (
    <div className='App'>
      <PageLocationsList onLocationClick={handleLocationClick} />
    </div>
  );
}

export default App;
