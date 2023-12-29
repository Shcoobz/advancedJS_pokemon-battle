import PagePkmSelection from '../pages/PagePkmSelection';

function SelectionLogic({
  selectedLocation,
  userPokemon,
  wildPokemon,
  selectedPokemon,
  userPokemonUrls,
  handlePokemonSelect,
  handleBackBtnClick,
}) {
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
