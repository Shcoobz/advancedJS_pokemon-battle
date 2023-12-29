import { formatPokemonName } from '../utils/UtiHelpers';

const ComPkm = ({ pokemon, handleSelect }) => {
  const { name, sprites, weight, height } = pokemon;

  return (
    <div className='pkm-card' onClick={() => handleSelect(pokemon)}>
      {sprites?.front_default && (
        <img
          src={sprites.front_default}
          alt={name}
          className='pkm-selection-sprite'
        />
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
