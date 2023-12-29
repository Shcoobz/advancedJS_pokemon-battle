import PagePkmEncounter from '../pages/PagePkmEncounter';

/**
 * A component that manages the logic for Pokemon encounters in a specific location.
 *
 * @param {Object} props - The props for the EncounterLogic component.
 * @param {string} props.selectedLocation - The selected location where the encounter takes place.
 * @param {Object} props.selectedPokemon - The selected Pokemon for the encounter (if any).
 * @param {Object} props.wildPokemon - The wild Pokemon encountered in the location (if any).
 * @param {Object} props.userPokemon - The user's Pokemon available for the encounter.
 * @param {Function} props.handleWildPokemonEncounter - The function to handle wild Pokemon encounters.
 * @param {Function} props.handleBackBtnClick - The function to handle a button click to go back.
 * @param {Function} props.handleBattleEnd - The function to handle the end of a battle (if applicable).
 * @returns {JSX.Element|null} The EncounterLogic component or null if conditions are not met.
 */
function EncounterLogic({
  selectedLocation,
  selectedPokemon,
  wildPokemon,
  userPokemon,
  handleWildPokemonEncounter,
  handleBackBtnClick,
  handleBattleEnd,
}) {
  /**
   * Renders the PagePkmEncounter component if specific conditions are met.
   * @returns {JSX.Element|null} The PagePkmEncounter component or null if conditions are not met.
   */
  if (selectedLocation && !selectedPokemon && !wildPokemon) {
    return (
      <PagePkmEncounter
        locationUrl={selectedLocation}
        userPokemon={userPokemon}
        onEncounter={handleWildPokemonEncounter}
        handleBackBtn={handleBackBtnClick}
        onReset={handleBattleEnd}
      />
    );
  }

  return null;
}

export default EncounterLogic;
