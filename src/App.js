import './App.scss';
import Header from './components/Header';
import Notifier from './components/Notifier';
import VotingContainer from './containers/voting';

function App() {
  return (
    <>
      <Header />
      <VotingContainer />
      <Notifier />
    </>
  );
}

export default App;
