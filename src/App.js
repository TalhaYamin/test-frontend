import { Provider } from 'react-redux';
import './App.css';
import BulletList from './components/BulletList';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BulletList />
    </Provider>
  );
}

export default App;
