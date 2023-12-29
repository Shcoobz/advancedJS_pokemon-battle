import { useState, useEffect } from 'react';
import '../css/PagePkmSelection.css';

import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';
import ComPkm from '../components/ComPkm';

/**
 * A component that allows the user to select a Pokémon from a list.
 *
 * @param {Object} props - The props for the PagePkmSelection component.
 * @param {Array} props.pokemonUrls - An array of Pokémon URLs to be displayed for selection.
 * @param {Function} props.onSelect - The function to handle the selection of a Pokémon.
 * @param {Function} props.handleBackBtn - The function to handle a button click to go back.
 * @returns {JSX.Element} The PagePkmSelection component.
 */
const PagePkmSelection = ({ pokemonUrls, onSelect, handleBackBtn }) => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    /**
     * Fetches Pokémon data from the provided URLs and prepares them for selection.
     */
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

  /**
   * Handles the selection of a Pokémon.
   * @param {Object} pokemon - The selected Pokémon data.
   */
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
              <ComPkm key={index} pokemon={pokemon} handleSelect={handleSelect} />
            )}
          </div>
        ))}
      </div>
      <ComBtn text='Back' onClick={handleBackBtn} className='back-btn' />
    </div>
  );
};

export default PagePkmSelection;
