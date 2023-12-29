import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';

import '../css/PagePkmBattleEscape.css';

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
