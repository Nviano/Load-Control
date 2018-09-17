import React from 'react';
import { Slave } from 'react-syncing';
import { TextField, Button } from '@material-ui/core';
import swal from 'sweetalert';


import image from '../images/avatar.png';

export default class ProfileStaff extends Slave {

    constructor() {
        super()

        this.getProfilePlayer = this.getProfilePlayer.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            user: {}
        }
    }

    didMount() {
        this.getProfilePlayer()
    }

    getProfilePlayer() {
        const url = `http://localhost:8000/vistaperfil-player`;
        fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(res => {
                this.set({
                    user: res.result
                })
                console.log(res.result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleUpdate() {
        const url = `http://localhost:8000/jugador/modificar`;

        fetch(url, {
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: this.state.nombre,
                apellidos: this.state.apellidos,
                email: this.state.email,
                telefono: this.state.telefono,
                peso: this.state.peso,
                altura: this.state.altura,
                avatar: this.state.avatar
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.ok) {
                    this.set({ ok: true })
                    swal("Buen trabajo", "Perfil modificado correctamente", "success");

                } else {
                    this.set({ error: true, errorMsg: res.error })
                    swal("Error", res.error, "error");

                }
            })
            .catch(console.log)
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
            <div style={{ display: "flex" }} >
                <div
                    style={{
                        width: '15%',
                        height: '30px',
                        marginTop: '90px',
                        marginLeft: '150px'
                    }}>
                    <img style={{ width: "100%" }} src={this.state.user.avatar}></img>
                </div>

                <div

                    style={{

                        marginLeft: '20%',
                        width: '50%',
                    }}>
                    <h1 style={{
                        marginTop: '15%',
                        fontWeight: 'bolder',
                        fontSize: '40px'

                    }}>Tu perfil de Load Control</h1>
                    <div style={{
                        marginTop: 50,
                        marginLeft: "30%",
                        width: 500,
                        transform: "translateX(-50%)",
                        padding: '15px',
                    }}>

                        <form style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField
                                style={{ width: 500 }}
                                label={this.state.user.nombre || ''}
                                value={this.state.nombre || ''}
                                onChange={this.handleChange('nombre')}
                                margin="normal"
                                helperText="Nombre"
                            />
                            <TextField
                                style={{ width: 500 }}
                                label={this.state.user.apellidos || ''}
                                value={this.state.apellidos || ''}
                                onChange={this.handleChange('apellidos')}
                                margin="normal"
                                helperText="Apellidos"
                            />
                            <TextField
                                style={{ width: 500 }}
                                label={this.state.user.email || ''}
                                value={this.state.email || ''}
                                onChange={this.handleChange('email')}
                                type="email"
                                margin="normal"
                                helperText="Email"
                            />

                            <TextField
                                style={{ width: 500 }}
                                label={this.state.user.telefono || ''}
                                value={this.state.telefono || ''}
                                onChange={this.handleChange('telefono')}
                                type="number"
                                margin="normal"
                                helperText="Teléfono"
                            />
                            {/* <TextField
                                style={{ width: 500 }}
                                label={this.state.user.altura || ''}
                                value={this.state.altura || ''}
                                onChange={this.handleChange('altura')}
                                margin="normal"
                                type="text"
                                helperText="altura"
                            />
                            <TextField
                                style={{ width: 500 }}
                                label={this.state.user.peso || ''}
                                value={this.state.peso || ''}
                                onChange={this.handleChange('peso')}

                                helperText="peso"
                            /> */}

                            <Button
                                color="secondary"
                                style={{ marginTop: 50, width: 500 }}
                                onClick={this.handleUpdate}
                                variant="contained">
                                Modificar
                            </Button>

                        </form>
                    </div>
                </div>

            </div>
        );
    }
}    
