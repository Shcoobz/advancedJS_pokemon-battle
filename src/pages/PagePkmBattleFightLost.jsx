import ComTitle from '../components/ComTitle';
import ComBtn from '../components/ComBtn';

import '../css/PagePkmBattleFightLost.css';

const PagePkmBattleFightLost = ({ handleBackBtnClick }) => {
  return (
    <div>
      <ComTitle text={"You have been defeated :'( !"} />
      <div className='battle-lost-img'></div>
      <ComBtn
        text="M'kay..."
        onClick={handleBackBtnClick}
        className='back-btn'
      />
    </div>
  );
};

export default PagePkmBattleFightLost;
