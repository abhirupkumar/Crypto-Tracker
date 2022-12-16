import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from 'tss-react/mui';
import Alert from './components/Alert.js'

const useStyles = makeStyles()(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh'
  },
}));

function App() {

  const { classes } = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div >
      <Alert />
    </BrowserRouter>
  );
}

export default App;
