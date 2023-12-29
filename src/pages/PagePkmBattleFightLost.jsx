import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';

import '../css/PagePkmBattleFightLost.css';

/**
 * A component that displays a message and a button after losing a Pokemon battle.
 *
 * @param {Object} props - The props for the PagePkmBattleFightLost component.
 * @param {Function} props.handleBackBtnClick - The function to handle a button click to go back.
 * @returns {JSX.Element} The PagePkmBattleFightLost component.
 */
const PagePkmBattleFightLost = ({ handleBackBtnClick }) => {
  return (
    <div>
      <ComTitle text={"You have been defeated :'( !"} />
      <div className='battle-lost-img'></div>
      <ComBtn text="M'kay..." onClick={handleBackBtnClick} className='back-btn' />
    </div>
  );
};

export default PagePkmBattleFightLost;
