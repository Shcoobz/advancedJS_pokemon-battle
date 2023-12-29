import PagePkmEncounter from '../pages/PagePkmEncounter';

function EncounterLogic({
  selectedLocation,
  selectedPokemon,
  wildPokemon,
  userPokemon,
  handleWildPokemonEncounter,
  handleBackBtnClick,
  handleBattleEnd,
}) {
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
