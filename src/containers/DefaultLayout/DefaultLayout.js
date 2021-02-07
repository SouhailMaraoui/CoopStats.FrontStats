import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppFooter,
  AppHeader,
} from '@coreui/react';

import routes from '../../routes';
import Row from "reactstrap/es/Row";

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader/>
          </Suspense>
        </AppHeader>

        <div className="app-body">
          <main className="main">
            <Container fluid={true}>
              <Row className="mt-3">
                <div className="col-sm"/>
                <div className="col-10">
                  <Suspense fallback={this.loading()}>
                    <Switch>
                      {routes.map((route, idx) => {
                        return route.component ? (
                            <Route
                                key={idx}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                render={props => (
                                    <route.component {...props} handleLogin={this.props.handleLogin} user={this.props.user}/>
                                )} />
                        ) : null;
                      })}
                      <Redirect from="/" to="/Home" />
                    </Switch>
                  </Suspense>
                </div>
                <div className="col-sm"/>
              </Row>

            </Container>
          </main>
        </div>


        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
