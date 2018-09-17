import React from 'react';
import { Slave } from 'react-syncing';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import ButtonSelectClub from './ButtonSelectClub';
import swal from 'sweetalert';

import image from '../images/background-login.jpg';

export default withRouter(class FormStaff extends Slave {

    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.getClub = this.getClub.bind(this);

        this.state = {
            nombre: '',
            apellidos: '',
            email: '',
            password: '',
            pais: '',
            fechaNacimiento: '',
            telefono: '',
            club: '',
            clubes: [],
        }


    }
    didMount() {
        this.getClub();
    }

    getClub() {
        const url = `http://localhost:8000/club/`;
        axios.get(url)
            .then(res => {
                this.set({
                    clubes: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    };



    handleRegister() {
        const url = `http://localhost:8000/addPersona`;
        const reader = new FileReader();
        reader.readAsDataURL(window.document.querySelector("#avatar").files[0]);
        reader.onload = () => {
            fetch(url, {
                method: 'post',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: this.state.nombre,
                    apellidos: this.state.apellidos,
                    pais: this.state.pais,
                    fechaNacimiento: this.state.fechaNacimiento,
                    telefono: this.state.telefono,
                    club: this.state.club,
                    clubes: this.state.clubes,
                    email: this.state.email,
                    password: this.state.password
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.ok) {
                        this.set({ ok: true })
                        swal("Bién Hecho", "Registro creado correctamente", "success");
                        this.props.history.push("/login")
                    } else {
                        this.set({ error: true, errorMsg: res.error })
                        swal("Error", res.error, "error");

                    }
                })
                .catch(console.log)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }


    handleChange(name) {
        return event => {
            this.set({
                [name]: event.target.value,
            });
        };
    }


    render() {
        return (
            <div style={{
                display: 'flex',
                flexFlow: 'column ,nowrap'
            }}>
                <div
                    style={{
                        width: '50%',
                        display: 'flex',
                        flexFlow: 'column ,nowrap',
                        flex: 'row',
                        opacity: 0.8
                    }}>
                    <img style={{ opacity: 0.8, width: "100%" }} src={image}></img>

                </div>

                <div

                    style={{

                        width: '50%',
                        float: 'right'
                    }}>
                    <h1 style={{
                        marginLeft: "25%",
                        marginTop: '20%',
                        fontWeight: 'bolder',
                        fontSize: '40px',
                        display: 'flex',
                        flexFlow: 'column ,nowrap'

                    }}>Únete a Load Control</h1>
                    <div style={{
                        marginTop: 50,
                        marginLeft: "50%",
                        width: 500,
                        transform: "translateX(-50%)",
                        padding: '15px',
                    }}>

                        <form style={{ display: 'flex', flexDirection: "column", flexWrap: 'wrap', width: 500 }}>
                            <TextField
                                label="Nombre"
                                value={this.state.nombre}
                                onChange={this.handleChange('nombre')}
                                margin="normal"
                            />
                            <TextField
                                label="Apellidos"
                                value={this.state.apellidos}
                                onChange={this.handleChange('apellidos')}
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                type="email"
                                margin="normal"
                            />
                            <TextField
                                label="Password"
                                value={this.state.password}
                                type="password"
                                onChange={this.handleChange('password')}
                                margin="normal"
                            />
                            <TextField
                                label="Fecha de Nacimiento"
                                value={this.state.fechaNacimiento}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleChange('fechaNacimiento')}
                                type="date"
                                margin="normal"
                            />
                            <TextField
                                label="Teléfono"
                                value={this.state.telefono}
                                onChange={this.handleChange('telefono')}
                                type="number"
                                margin="normal"
                            />
                            <TextField
                                label="Pais"
                                value={this.state.pais}
                                onChange={this.handleChange('pais')}
                                margin="normal"
                            />
                            <ButtonSelectClub
                                club={this.state.club}
                                clubes={this.state.clubes || []}
                                handleClub={(e) => { this.set({ club: e.target.value }) }}
                            />
                            <div style={{ marginTop: 30 }}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="avatar"
                                    type="file"
                                />
                                <label htmlFor="avatar">
                                    <Button variant="contained" component="span">
                                        Upload Profile Image
                                    </Button>
                                </label>
                            </div>
                            <Button style={{ marginTop: 50, width: 100 }} onClick={this.handleRegister} variant="contained" color="secondary">Registrar</Button>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
})    