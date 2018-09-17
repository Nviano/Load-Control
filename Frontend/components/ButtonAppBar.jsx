import React from 'react';
import { Slave } from 'react-syncing';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom"
import ButtonMenuHomeStaff from './ButtonMenuHomeStaff';
import ButtonMenuHomePlayer from './ButtonMenuHomePlayer';


class ButtonAppBar extends Slave {


  render() {
    return (
      <div style={{ flexGrow: "1" }}>
        <AppBar style={{ backgroundColor: "black" }} position="fixed">
          <Toolbar style={{ flexDirection: this.state.logged ? "row-reverse" : "row" }}>

            {this.state.logged && <Button style={{ color: "white" }} onClick={() => {
              const url = `http://localhost:8000/logout`;

              fetch(url, {
                method: 'get',
                credentials: "include",
                headers: {
                  'Content-Type': 'application/json'
                }
              })
                .then((res) => res.json())
                .then((res) => {
                  if (res.message) {
                    this.set({ logged: false })

                  }
                })
                .catch(console.log)
            }} color="inherit">Logout</Button>}

            {this.state.logged && this.state.rol === 1 && <ButtonMenuHomeStaff />}
            {this.state.logged && this.state.rol === 2 && <ButtonMenuHomePlayer />}
            {!this.state.logged && <Button style={{ color: "white", flexGrow: '2' }} onClick={() => { this.props.history.push("/index") }} >
              Load Control
            </Button>}
            {!this.state.logged && <Button style={{ color: "white", flexGrow: '2' }} onClick={() => { this.props.history.push("/register-staff") }} >
              Registro Staff
            </Button>}
            {!this.state.logged && <Button style={{ color: "white", flexGrow: '2' }} onClick={() => { this.props.history.push("/register-player") }} >
              Registro Jugador
            </Button>}
            {!this.state.logged && <Button style={{ color: "white", flexGrow: '2' }} onClick={() => { this.props.history.push("/login") }} >
              Login
            </Button>}
          </Toolbar>
        </AppBar>
      </div >
    );
  }

}



export default withRouter(ButtonAppBar);