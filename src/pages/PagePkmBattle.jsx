import { useState, useEffect } from 'react';
import PagePkmBattleFightLost from './PagePkmBattleFightLost';
import PagePkmBattleEscape from './PagePkmBattleEscape';
import ComBtn from '../components/ComBtn';
import { formatPokemonName } from '../utils/UtiHelpers';
import '../css/PagePkmBattle.css';

function PagePkmBattle({
  userPokemon,
  wildPokemon,
  onPokemonCaught,
  handleBackBtnClick,
  handleBattleLost,
  handleBattleEnd,
}) {
  const userPkmHPBaseStat = getHP(userPokemon);
  const wildPkmHPBaseStat = getHP(wildPokemon);

  const [userPokemonHP, setUserPokemonHP] = useState(userPkmHPBaseStat);
  const [wildPokemonHP, setWildPokemonHP] = useState(wildPkmHPBaseStat);
  const [currentTurn, setCurrentTurn] = useState('user');
  const [attackingPokemon, setAttackingPokemon] = useState('');
  const [hitPokemon, setHitPokemon] = useState('');
  const [isBattleLost, setIsBattleLost] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('battle');

  let currentPage;

  function getHP(pokemon) {
    return pokemon.stats.find((s) => s.stat.name === 'hp').base_stat;
  }

  // handle updates to HP
  useEffect(() => {
    if (userPokemonHP <= 0) {
      setIsBattleLost(true);
    } else if (wildPokemonHP <= 0) {
      onPokemonCaught(wildPokemon);
    }
  }, [userPokemonHP, wildPokemonHP, onPokemonCaught, wildPokemon]);

  // calc damage
  function calculateDamage(attack, defense) {
    const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217;

    return Math.floor(
      ((((2 / 5 + 2) * attack * 60) / defense / 50 + 2) * Z) / 255
    );
  }

  // get base stat value for given stat name
  function getStatValue(pokemon, statName) {
    return pokemon.stats.find((stat) => stat.stat.name === statName).base_stat;
  }

  // handle single attack from one pkm to another
  function performAttack(attacker, defender, defenderHP, setDefenderHP) {
    const attackStat = getStatValue(attacker, 'attack');
    const defenseStat = getStatValue(defender, 'defense');

    const damage = calculateDamage(attackStat, defenseStat);

    // subtract the damage from defender's HP, ensuring it doesn't drop below 0
    setDefenderHP(Math.max(defenderHP - damage, 0));

    if (attacker === userPokemon) {
      setCurrentTurn('user');
    } else if (attacker === wildPokemon) {
      setCurrentTurn('wild');
    }
  }

  function handleAttack() {
    setAttackingPokemon('user');

    // perform user attack on wild pkm
    performAttack(userPokemon, wildPokemon, wildPokemonHP, setWildPokemonHP);

    // after 1 second, indicate that user pkm has hit target
    setTimeout(function () {
      setHitPokemon('user');
    }, 1000);

    // after another second, clear hit indicator && let wild pkm attack
    setTimeout(function () {
      setHitPokemon('');
      setAttackingPokemon('wild');

      // wild pkm attack on user pkm
      performAttack(wildPokemon, userPokemon, userPokemonHP, setUserPokemonHP);

      // after 1 second, indicate that wild pkm has hit target
      setTimeout(function () {
        setHitPokemon('wild');
      }, 1000);

      // after another second, clear hit indicator && end wild pkm turn
      setTimeout(function () {
        setHitPokemon('');
        setAttackingPokemon('');
        setCurrentTurn('user');
      }, 2000);
    }, 2000);

    // if the user pkm HP drops to 0, the battle is lost
    if (userPokemonHP <= 0) {
      setTimeout(function () {
        handleBattleLost();
      }, 3000);
      return;
    }
  }

  // define class names for pkm based on attack/hit status
  let wildPkmClass = defineClass('wild');
  let userPkmClass = defineClass('user');

  function defineClass(playerType) {
    let classes = `battle-${playerType}-pkm-sprite-img `;

    if (
      attackingPokemon === playerType &&
      hitPokemon !== determineOpponent(playerType)
    ) {
      classes += 'attacking';
    } else if (
      hitPokemon === determineOpponent(playerType) &&
      attackingPokemon !== playerType
    ) {
      classes += 'hit';
    }
    return classes;
  }

  function determineOpponent(playerType) {
    return playerType === 'wild' ? 'user' : 'wild';
  }

  function handleRunBtnClick() {
    setCurrentScreen('escape');
  }

  // display battle lost page
  if (isBattleLost) {
    return <PagePkmBattleFightLost handleBackBtnClick={handleBackBtnClick} />;
  }

  const wildPkmBattleArea = (
    <div className='battle-wild-pkm-area'>
      <div className='battle-wild-pkm-stats'>
        <h3>
          <span className='wild-pkm-name'>
            {formatPokemonName(wildPokemon.name)}
          </span>
          <span className='wild-pkm-hp'> HP: {wildPokemonHP}</span>
        </h3>
      </div>
      <div className='battle-wild-pkm-sprite'>
        <img
          className={wildPkmClass}
          src={wildPokemon.sprites.front_default}
          alt={wildPokemon.name}
        />
      </div>
    </div>
  );

  const userPkmBattleArea = (
    <div className='battle-user-pkm-battle-area'>
      <div className='battle-user-pkm-sprite'>
        <img
          className={userPkmClass}
          src={userPokemon.sprites.back_default}
          alt={userPokemon.name}
        />
      </div>
      <div className='battle-user-pkm-stats'>
        <h3>
          <span className='user-pkm-name'>
            {formatPokemonName(userPokemon.name)}
          </span>
          <span className='user-pkm-hp'>HP: {userPokemonHP}</span>
        </h3>
      </div>
    </div>
  );

  const battleTurnStatus = (
    <div className='battle-turn-area'>
      <div className='battle-turn-status'>
        {currentTurn === 'user'
          ? `Your turn, ${formatPokemonName(userPokemon.name)}!`
          : `Wild ${formatPokemonName(wildPokemon.name)} attacking!`}
      </div>
    </div>
  );

  const battleMessageArea = (
    <div className='battle-message-area'>
      <div className='battle-message-content'>
        <p>
          What will {' >>' + formatPokemonName(userPokemon.name) + '<< '}
          do?
        </p>
        <div className='battle-message-buttons'>
          <ComBtn
            text='Attack'
            onClick={handleAttack}
            className='battle-attack-btn'
            isDisabled={currentTurn !== 'user' || userPokemonHP <= 0}
          />
          <ComBtn
            text='Run'
            onClick={handleRunBtnClick}
            btnText='Run'
            className='back-btn'
            isDisabled={currentTurn !== 'user' || userPokemonHP <= 0}
          />
        </div>
      </div>
    </div>
  );

  // check to see if user is trying to escape
  if (currentScreen === 'battle') {
    currentPage = (
      <div className='battle-screen'>
        <div className='battle-field'>
          {wildPkmBattleArea}
          {userPkmBattleArea}
        </div>
        <div className='battle-message-box'>
          {battleTurnStatus}
          {battleMessageArea}
        </div>
      </div>
    );
  } else {
    currentPage = (
      <PagePkmBattleEscape handleBackBtnClick={handleBackBtnClick} />
    );
  }

  return <div>{currentPage}</div>;
}

export default PagePkmBattle;
