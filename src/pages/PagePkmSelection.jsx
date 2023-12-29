import { useState, useEffect } from 'react';
import '../css/PagePkmSelection.css';

import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';
import ComPkm from '../components/ComPkm';

// TODO: add background color for card according to type
// TODO: implement making the first letter big
// TODO: add hp & all moves to card

const PagePkmSelection = ({ pokemonUrls, onSelect, handleBackBtn }) => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const fetchedPokemon = [];
      for (const url of pokemonUrls) {
        const res = await fetch(url);
        const data = await res.json();

        const hpStat = data.stats.find((stat) => stat.stat.name === 'hp');
        data.hp = hpStat ? hpStat.base_stat : 'Unknown';

        fetchedPokemon.push(data);
      }
      setPokemonList(fetchedPokemon);
    };

    fetchPokemonData();
  }, [pokemonUrls]);

  const handleSelect = (pokemon) => {
    onSelect(pokemon);
  };

  return (
    <div>
      <ComTitle text='Select your Pokémon:' />
      <div className='pkm-grid'>
        {pokemonList.map((pokemon, index) => (
          <div key={index} onClick={() => handleSelect(pokemon)}>
            {pokemon.sprites?.front_default && (
              <ComPkm
                key={index}
                pokemon={pokemon}
                handleSelect={handleSelect}
              />
            )}
          </div>
        ))}
      </div>
      <ComBtn text='Back' onClick={handleBackBtn} className='back-btn' />
    </div>
  );
};

export default PagePkmSelection;
