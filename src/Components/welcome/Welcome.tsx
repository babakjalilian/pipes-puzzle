import 'Components/welcome/Welcome.scss';
import { FcKey } from 'react-icons/fc';
import { FiHelpCircle as IconPassword } from 'react-icons/fi';
import { HiLockClosed as IconLock } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { puzzleStarted } from 'Redux-Manager/actions/puzzleActions';
import { constants, messages } from 'Utils/constants';
import { getStorageItem } from 'Utils/helpers';

function Welcome(): JSX.Element {
  const dispatch = useDispatch();

  const buttonStartHandler = (puzzleLevel: number): void => {
    dispatch(puzzleStarted(puzzleLevel));
  };

  return (
    <div className='welcome'>
      <div className='welcome-container'>
        <h1 className='welcome-title'>{messages.text.welcomeTitle}</h1>
        <p className='welcome-description'>{messages.text.welcomeDescription}</p>
      </div>

      <div className='levels-container'>
        <div className='level header-row'>
          <div className='level-title'>{messages.text.levelPrefix}</div>
          <div className='password-title'>
            <FcKey className='password-icon' />
          </div>
        </div>

        {Object.entries(constants.localStorageKeys).map(
          ([, localKeyValue], localKeyIndex) => {
            const levelPassword = getStorageItem(localKeyValue);
            const prevLevelHasAchieved = getStorageItem(`${constants.localStorageKeyPrefix}${localKeyIndex}`);
            const levelCanPlay = localKeyIndex === 0 || prevLevelHasAchieved;
            const puzzleLevel = localKeyIndex + 1;
            let levelDescription='';
            Object.entries(messages.levelDescriptions).some((item) => {
              if(item[0] === `level_${puzzleLevel}`){
                levelDescription=item[1];
                return true ;
              }
            });
            return (
              <div key={localKeyIndex} className={`level ${ levelCanPlay && levelPassword && 'level-success'}`}>
                <div className='level-info level-image'>
                  <button type='button' className={`play-button ${ levelCanPlay ? '' : 'disable'}`} onClick={ levelCanPlay ? () => buttonStartHandler(puzzleLevel) : undefined} >
                    {!levelCanPlay && <IconLock className='lock-icon' />}
                    <img src={process.env.PUBLIC_URL + `/Level_${puzzleLevel}.PNG`} className='play-button-image' />
                  </button>
                </div>
                <div className={`level-info level-label ${!levelCanPlay ? 'level-locked' : '' }`} >
                  <span className='level-description'>{levelDescription}</span>
                </div>
                <div className='level-info level-password'>
                  { (levelCanPlay && levelPassword) || (<IconPassword className='password-placeholder-icon' />) }
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default Welcome;
