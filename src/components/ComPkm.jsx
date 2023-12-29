import { formatPokemonName } from '../utils/UtiHelpers';

/**
 * A component for displaying Pokemon details.
 *
 * @param {Object} props - The props for the ComPkm component.
 * @param {Object} props.pokemon - The Pokemon data to display.
 * @param {Function} props.handleSelect - The function to be called when the Pokemon card is clicked.
 * @returns {JSX.Element} The ComPkm component.
 */
const ComPkm = ({ pokemon, handleSelect }) => {
  const { name, sprites, weight, height } = pokemon;

  return (
    <div className='pkm-card' onClick={() => handleSelect(pokemon)}>
      {sprites?.front_default && (
        <img src={sprites.front_default} alt={name} className='pkm-selection-sprite' />
      )}
      <div className='pkm-details'>
        <h3 className='pkm-name'>{formatPokemonName(name)}</h3>
        <p className='pkm-data'>Weight: {weight}</p>
        <p className='pkm-data'>Height: {height}</p>
      </div>
    </div>
  );
};

export default ComPkm;
