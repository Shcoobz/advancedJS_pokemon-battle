import { useState } from 'react';
import PagePkmBattle from '../pages/PagePkmBattle';
import PagePkmBattlePkmCaught from '../pages/PagePkmBattlePkmCaught';
import PagePkmBattleFightLost from '../pages/PagePkmBattleFightLost';

/**
 * A component that manages the logic for Pokemon battles and related pages.
 *
 * @param {Object} props - The props for the BattleLogic component.
 * @param {string} props.selectedLocation - The selected location for the battle.
 * @param {Object} props.userPokemon - The user's Pokemon participating in the battle.
 * @param {Object} props.wildPokemon - The wild Pokemon encountered in the battle.
 * @param {Object} props.caughtPokemon - The Pokemon that was caught during the battle (if any).
 * @param {Function} props.handleBackBtnClick - The function to handle a button click to go back.
 * @param {Function} props.handleBattleEnd - The function to handle the end of the battle.
 * @param {Function} props.handlePokemonCaught - The function to handle when a Pokemon is caught during the battle.
 * @param {Function} props.handleBattleLost - The function to handle when the battle is lost.
 * @returns {JSX.Element|null} The BattleLogic component or null if conditions are not met.
 */
function BattleLogic({
  selectedLocation,
  userPokemon,
  wildPokemon,
  caughtPokemon,
  handleBackBtnClick,
  handleBattleEnd,
  handlePokemonCaught,
  handleBattleLost,
}) {
  const [battleStatus, setBattleStatus] = useState('ongoing');

  /**
   * Handles the end of a lost battle and resets the battle status to 'ongoing'.
   */
  const handleBattleLostEnd = () => {
    console.log('Function handleBattleLostEnd was called');
    setBattleStatus('ongoing');
  };

  // Render the appropriate page based on the battle and game state.
  if (caughtPokemon) {
    return (
      <PagePkmBattlePkmCaught
        pokemon={caughtPokemon}
        handleBackBtnClick={handleBackBtnClick}
      />
    );
  }

  if (battleStatus === 'lost') {
    return <PagePkmBattleFightLost handleBackBtnClick={handleBattleLostEnd} />;
  }

  if (selectedLocation && userPokemon && wildPokemon) {
    return (
      <PagePkmBattle
        userPokemon={userPokemon}
        wildPokemon={wildPokemon}
        handleBattleEnd={() => {
          handleBattleEnd();
          setBattleStatus('ongoing');
        }}
        onPokemonCaught={(pokemon) => {
          handlePokemonCaught(pokemon);
          setBattleStatus('won');
        }}
        onBattleLost={() => {
          handleBattleLost();
          setBattleStatus('lost');
        }}
        handleBackBtnClick={handleBackBtnClick}
      />
    );
  }

  return null;
}

export default BattleLogic;
