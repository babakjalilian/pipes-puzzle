

import Layout from 'Components/layout/Layout';
import Welcome from 'Components/pages/welcome/Welcome';
import Game from 'Components/pages/game/Game';
import { useSelector } from 'react-redux';
import { IReduxState } from 'Redux-Manager/interfaces/puzzle.Interface';

function App(): JSX.Element {
  const puzzleIsWelcome = useSelector((state:IReduxState)=>state.puzzleReducer.puzzleIsWelcome);

  return (
    <Layout>
      {puzzleIsWelcome && <Welcome />}
      {!puzzleIsWelcome && <Game />}
    </Layout>
  );
}

export default App;
