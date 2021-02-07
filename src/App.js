import React, {Component} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const DefaultLayout = React.lazy(()=>import('./containers/DefaultLayout'));

class App extends Component
{
    constructor() {
        super();

        this.state={
            user:{}
        };
        this.handleLogin=this.handleLogin.bind(this);
    }

    handleLogin(user){
        localStorage.setItem("user",JSON.stringify(user));
        this.setState({
            user:user
        })
    }
  render() {
    return (
        <HashRouter>
            <React.Suspense fallback={loading()}>
                <Switch>
                    <Route path="/" name="Home" render={props =>
                        <DefaultLayout {...props} handleLogin={this.handleLogin} user={this.state.user}/>} />
                </Switch>
            </React.Suspense>
        </HashRouter>
    );
  }
}

export default App;
