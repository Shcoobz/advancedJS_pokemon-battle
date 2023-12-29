import ComTitle from '../components/ComTitle';
import ComPkm from '../components/ComPkm';
import ComBtn from '../components/ComBtn';

import { formatPokemonName } from '../utils/UtiHelpers';
import '../css/PagePkmBattlePkmCaught.css';

/**
 * A component that displays a message and the details of a caught Pokemon.
 *
 * @param {Object} props - The props for the PagePkmBattlePkmCaught component.
 * @param {Object} props.pokemon - The caught Pokemon's data.
 * @param {Function} props.handleBackBtnClick - The function to handle a button click to go back.
 * @returns {JSX.Element} The PagePkmBattlePkmCaught component.
 */
const PagePkmBattlePkmCaught = ({ pokemon, handleBackBtnClick }) => {
  return (
    <div>
      <ComTitle text={`Congrats! You caught ${formatPokemonName(pokemon.name)}!`} />
      <div className='battle-success'>
        <div className='battle-success-image'></div>
        <div className='pkm-caught-card'>
          <ComPkm pokemon={pokemon} />
        </div>
      </div>
      <ComBtn text='Back' onClick={handleBackBtnClick} className='back-btn' />
    </div>
  );
};

export default PagePkmBattlePkmCaught;
