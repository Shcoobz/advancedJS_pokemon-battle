import { useState, useEffect } from 'react';
import '../css/PagePkmEncounter.css';

import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';

// TODO: make sprite bigger
// TODO: format pokemon name to TileCase, maybe with helper function already in place
// TODO: each pokemon in one line

const PagePkmEncounter = ({
  locationUrl,
  userPokemon,
  onEncounter,
  handleBackBtn,
}) => {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      const res = await fetch(`${locationUrl}`);
      const locationData = await res.json();

      if (!locationData.areas.length) {
        setPokemon(null);
        setIsLoading(false);
        return;
      }

      const randomAreaUrl =
        locationData.areas[
          Math.floor(Math.random() * locationData.areas.length)
        ].url;
      const areaRes = await fetch(randomAreaUrl);
      const areaData = await areaRes.json();

      if (!areaData.pokemon_encounters.length) {
        setPokemon(null);
        setIsLoading(false);
        return;
      }

      const randomPokemon =
        areaData.pokemon_encounters[
          Math.floor(Math.random() * areaData.pokemon_encounters.length)
        ].pokemon;

      const pokemonRes = await fetch(randomPokemon.url);
      let pokemonData = await pokemonRes.json();

      const hpStat = pokemonData.stats.find((stat) => stat.stat.name === 'hp');
      pokemonData.hp = hpStat ? hpStat.base_stat : 'Unknown';

      setPokemon(pokemonData);
      setIsLoading(false);
    };

    fetchPokemon();
  }, [locationUrl]);

  const handleEncounterClick = () => {
    onEncounter(pokemon);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!pokemon) {
    return (
      <div>
        <p>This location doesn't seem to have any Pokémon.</p>
        <ComBtn text='Back' onClick={handleBackBtn} className='back-btn' />
      </div>
    );
  }

  return (
    <div>
      <ComTitle text={`${pokemon.name} wants to fight!`} />
      <div className='battle-prep'>
        <div className='user-side'>
          <img
            className='user-pokemon'
            src={userPokemon.sprites.front_default}
            alt={userPokemon.name}
          />
          <div className='user-pkm-stats'>
            <span>{userPokemon.name}</span>
            <span>HP: {userPokemon.hp}</span>
          </div>
        </div>
        <div className='pokemon-side'>
          <img
            className='wild-pokemon'
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <div className='wild-pkm-stats'>
            <span>HP: {pokemon.hp}</span>
            <span>{pokemon.name}</span>
          </div>
        </div>
      </div>
      <button onClick={handleEncounterClick}>Start Battle</button>
      <ComBtn text='Back' onClick={handleBackBtn} className='back-btn' />
    </div>
  );
};

export default PagePkmEncounter;
