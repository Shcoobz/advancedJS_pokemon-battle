import ComTitle from '../components/ComTitle';
import ComPkm from '../components/ComPkm';
import ComBtn from '../components/ComBtn';

import { formatPokemonName } from '../utils/UtiHelpers';
import '../css/PagePkmBattlePkmCaught.css';

const PagePkmBattlePkmCaught = ({ pokemon, handleBackBtnClick }) => {
  return (
    <div>
      <ComTitle
        text={`Congrats! You caught ${formatPokemonName(pokemon.name)}!`}
      />
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
