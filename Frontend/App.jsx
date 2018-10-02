import React from 'react';
import 'normalize.css';
import ReactDOM from "react-dom";
import { Master } from 'react-syncing';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ButtonAppBar from './components/ButtonAppBar';
import Login from './components/Login';
import FormPlayer from './components/FormPlayer';
import FormStaff from './components/FormStaff';
import FormTrainingPlayer from './components/FormTrainingPlayer';
import FormTrainingStaff from './components/FormTrainingStaff';
import ProfilePage from './components/ProfilePage';
import ProfilePlayer from './components/ProfilePlayer';
import ProfileStaff from './components/ProfileStaff';
import TeamStaff from './components/TeamStaff';
import TrainingsPlayer from './components/TrainingsPlayer';
import ReportPlayer from './components/ReportPlayer';
import IndexPage from './components/IndexPage';
import Chart from './components/Chart';

class App extends Master {
    didMount() {
        const url = `https://server.nviano.es/status`;
        fetch(url, {
            method: 'get',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {

                if (res.message === 'ok') {
                    this.set({ logged: true, idClub: res.idClub, rol: res.rol, nombre: res.nombre })
                } else {
                    this.set({ logged: false })
                }
            })
            .catch(console.log)
    }
    render() {

        return (

            <div>
                {!this.state.logged && <Router><div>
                    <ButtonAppBar />
                    <Switch>
                        <Route path="/register-player" exact component={FormPlayer}></Route>
                        <Route path="/register-staff" component={FormStaff}></Route>
                        <Route path="/login" component={Login} />
                        <Route component={IndexPage} />
                    </Switch>
                </div>
                </Router>}
                {this.state.logged && <Router><div><ButtonAppBar /><Switch>

                    <Route path="/profile" component={ProfilePage}></Route>

                    {/* rutas para jugadores */}
                    <Route path="/trainings-player" component={TrainingsPlayer}></Route>
                    <Route path="/report-triaining-player/:idTraining" component={FormTrainingPlayer}></Route>
                    <Route path="/profile-player" component={ProfilePlayer}></Route>

                    {/* rutas para staff */}
                    <Route path="/report-triaining-staff" component={FormTrainingStaff}></Route>
                    <Route path="/team-staff" component={TeamStaff}></Route>
                    <Route path="/report-player/:idPersona" component={ReportPlayer}></Route>
                    <Route path="/profile-staff" component={ProfileStaff}></Route>
                    <Route path="/chart/:id" component={Chart}></Route>
                    <Route component={IndexPage} />
                </Switch></div>
                </Router>}

            </div>

        )

    }
}


ReactDOM.render(<App />, document.querySelector("#app"));
