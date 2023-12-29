import { useState } from 'react';

import PageLocationsList from './pages/PageLocationsList';
import SelectionLogic from './gameLogic/SelectionLogic';
import EncounterLogic from './gameLogic/EncounterLogic';
import BattleLogic from './gameLogic/BattleLogic';

import { getPokemonUrlFromSpeciesUrl } from './utils/UtiHelpers';

import './css/App.css';

const usersPokemon = [
  'https://pokeapi.co/api/v2/pokemon/bulbasaur',
  'https://pokeapi.co/api/v2/pokemon/charizard',
  'https://pokeapi.co/api/v2/pokemon/poliwhirl',
];

/**
 * The main application component responsible for managing game logic and user interactions.
 *
 * @component
 */
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

  /**
   * Handles the click event when a location is selected.
   *
   * @param {string} locationUrl - The URL of the selected location.
   */
  const handleLocationClick = (locationUrl) => {
    console.log('Function handleLocationClick was called');
    setSelectedLocation(locationUrl);
  };

  /**
   * Handles the selection of a Pokémon.
   *
   * @param {Object} pokemon - The selected Pokémon data.
   */
  const handlePokemonSelect = (pokemon) => {
    console.log('Function handlePokemonSelect was called');
    setUserPokemon(pokemon);
    setSelectedPokemon(null);
  };

  /**
   * Handles the encounter of a wild Pokémon in the selected location.
   *
   * @param {Object} pokemon - The encountered wild Pokémon data.
   */
  const handleWildPokemonEncounter = (pokemon) => {
    console.log('Function handleWildPokemonEncounter was called');
    setWildPokemon(pokemon);
  };

  /**
   * Handles the end of a battle, resetting game state.
   */
  const handleBattleEnd = () => {
    console.log('Function handleBattleEnd was called');
    setSelectedLocation(null);
    setUserPokemon(null);
    setWildPokemon(null);
  };

  /**
   * Handles the event when a Pokémon is successfully caught.
   *
   * @param {Object} pokemon - The caught Pokémon data.
   */
  const handlePokemonCaught = (pokemon) => {
    console.log('Function handlePokemonCaught was called');
    const pokemonUrl = getPokemonUrlFromSpeciesUrl(pokemon.species.url);
    setUserPokemonUrls([...userPokemonUrls, pokemonUrl]);
    setCaughtPokemon(pokemon);
  };

  /**
   * Handles the click event when the back button is clicked.
   */
  const handleBackBtnClick = () => {
    console.log('Function handleBackBtnClick was called');
    setSelectedLocation(null);
    setUserPokemon(null);
    setCaughtPokemon(null);
  };

  // Select a Pokémon if conditions are met
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

  // Encounter a wild Pokémon if conditions are met
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

  // Start a battle if conditions are met
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

  // Display the location selection page by default
  return (
    <div className='App'>
      <PageLocationsList onLocationClick={handleLocationClick} />
    </div>
  );
}

export default App;
