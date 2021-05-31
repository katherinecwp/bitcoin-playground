import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import MnemomicWordsPage from './mnemomic-words/components/MnemomicWordsPage';
import HDSegWitPage from './hd-segwit/components/HDSegWitPage';
import P2SHPage from './p2sh/components/P2SHPage';
import { Route as Path } from "./common/Route";

const App: FC = () => {

  return (
    <Router>
        <React.Suspense fallback={true}>
          <Switch>
            <Route path={Path.HOME} component={Home} exact/>
            <Route path={Path.MNEMONIC_WORDS} component={MnemomicWordsPage} exact/>
            <Route path={Path.HD_SEGWIT} component={HDSegWitPage} exact/>
            <Route path={Path.N_OUT_OF_M_P2SH} component={P2SHPage} exact/>
          </Switch>
        </React.Suspense>
    </Router>
  );

}

export default App;
