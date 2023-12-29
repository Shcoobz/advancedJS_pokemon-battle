import PagePkmSelection from '../pages/PagePkmSelection';

/**
 * A component that manages the logic for selecting a user's Pokemon in a specific location.
 *
 * @param {Object} props - The props for the SelectionLogic component.
 * @param {string} props.selectedLocation - The selected location where Pokemon selection takes place.
 * @param {Object} props.userPokemon - The user's current Pokemon (if any).
 * @param {Object} props.wildPokemon - The wild Pokemon encountered in the location (if any).
 * @param {Object} props.selectedPokemon - The selected Pokemon for the user (if any).
 * @param {string[]} props.userPokemonUrls - The URLs of the user's available Pokemon.
 * @param {Function} props.handlePokemonSelect - The function to handle Pokemon selection.
 * @param {Function} props.handleBackBtnClick - The function to handle a button click to go back.
 * @returns {JSX.Element|null} The SelectionLogic component or null if conditions are not met.
 */
function SelectionLogic({
  selectedLocation,
  userPokemon,
  wildPokemon,
  selectedPokemon,
  userPokemonUrls,
  handlePokemonSelect,
  handleBackBtnClick,
}) {
  /**
   * Renders the PagePkmSelection component if specific conditions are met.
   *
   * @returns {JSX.Element|null} The PagePkmSelection component or null if conditions are not met.
   */
  if (selectedLocation && !userPokemon && !wildPokemon && !selectedPokemon) {
    return (
      <PagePkmSelection
        pokemonUrls={userPokemonUrls}
        onSelect={handlePokemonSelect}
        handleBackBtn={handleBackBtnClick}
      />
    );
  }

  return null;
}

export default SelectionLogic;
