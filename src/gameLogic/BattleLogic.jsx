import { useState } from 'react';
import PagePkmBattle from '../pages/PagePkmBattle';
import PagePkmBattlePkmCaught from '../pages/PagePkmBattlePkmCaught';
import PagePkmBattleFightLost from '../pages/PagePkmBattleFightLost';

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

  const handleBattleLostEnd = () => {
    console.log('Function handleBattleLostEnd was called');
    setBattleStatus('ongoing');
  };

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
