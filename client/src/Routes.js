import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import SendValue from './pages/SendValue';
import MinValue from './pages/MinValue';

const Routes = () => (
    <BrowserRouter>
      <Suspense fallback={<div>Carregando...</div>}>
        <Switch>
          <Route exact path="/enviar-lance" component={SendValue}/>
          <Route exact path="/valor-minimo" component={MinValue} />
          <Redirect
            to={{
              pathname: '/enviar-lance',
            }}
          />
        </Switch>          
      </Suspense>
    </BrowserRouter>
);

export default Routes;