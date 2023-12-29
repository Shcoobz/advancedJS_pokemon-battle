import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';

import '../css/PagePkmBattleEscape.css';

/**
 * A component that displays a message and a button after successfully escaping from a Pokemon battle.
 *
 * @param {Object} props - The props for the PagePkmBattleEscape component.
 * @param {Function} props.handleBackBtnClick - The function to handle a button click to go back.
 * @returns {JSX.Element} The PagePkmBattleEscape component.
 */
const PagePkmBattleEscape = ({ handleBackBtnClick }) => {
  return (
    <div>
      <ComTitle text={'You got away safely :D!'} />
      <div className='escape-img'></div>
      <ComBtn text='YEAH!' onClick={handleBackBtnClick} className='back-btn' />
    </div>
  );
};

export default PagePkmBattleEscape;
