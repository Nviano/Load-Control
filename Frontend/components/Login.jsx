import React from 'react';
import { Slave } from 'react-syncing';
import { TextField, Button } from '@material-ui/core';
import { Redirect } from "react-router-dom";

import image from '../images/bg-login.jpg';

export default class Login extends Slave {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }



    handleChange(name) {
        return event => {
            this.set({
                [name]: event.target.value,
            });
        };
    }

    handleLogin() {
        const url = `//${process.env.SERVER}/users/loginPersona`;

        fetch(url, {
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    this.set({ logged: true, idClub: res.idClub, rol: res.rol, nombre: res.nombre })
                } else {
                    this.set({ error: true, errorMsg: res.error })
                }
            })
            .catch(console.log)
    }
    render() {
        return (
            <div style={{
                display: 'flex',
                flexFlow: 'column ,nowrap'
            }} >
                <div
                    style={{
                        display: 'flex',
                        flexFlow: 'column ,nowrap',
                        width: '50%',
                        marginTop: '5%',
                        flex: 'colum'
                    }}>
                    <img style={{ opacity: 0.7, width: "100%" }} src={image}></img>

                </div>

                <div

                    style={{
                        width: '50%',
                    }}>
                    <h1 style={{
                        marginTop: '30%',
                        marginLeft: '20%',
                        fontWeight: 'bolder',
                        fontSize: '40px'

                    }}>Únete a Load Control</h1>
                    <div style={{
                        flex: 'row',
                        marginLeft: "50%",
                        width: '50%',
                        transform: "translateX(-50%)",
                        padding: '15px',
                    }}>

                        <div>
                            {this.state.logged ? (
                                <Redirect to="/home" />
                            ) : (
                                    <div style={{ marginTop: 10, marginLeft: "53%", width: 500, transform: "translateX(-50%)" }}>

                                        <form style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                        }} noValidate autoComplete="off">

                                            <TextField
                                                error={this.state.error ? true : false}
                                                helperText={this.state.error ? this.state.errorMsg : ""}
                                                label="Email"
                                                style={{
                                                    marginBottom: '70px',
                                                    width: 500,
                                                }}
                                                value={this.state.email}
                                                onChange={this.handleChange('email')}
                                                margin="normal"
                                            />

                                            <TextField

                                                label="Password"
                                                style={{

                                                    width: 500,
                                                }}
                                                type="password"
                                                value={this.state.password}
                                                onChange={this.handleChange('password')}
                                                margin="normal"
                                            />
                                            <Button style={{ width: '500px', marginTop: '50px' }} color="secondary" onClick={this.handleLogin} variant="contained">Login</Button>
                                        </form>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}    