import React from 'react';
import { Slave } from 'react-syncing';
import { TextField, Button } from '@material-ui/core';


import image from '../images/avatar.png';

export default class ProfileStaff extends Slave {

    constructor() {
        super()

        this.getProfileStaff = this.getProfileStaff.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            user: {},
        }
    }

    didMount() {
        this.getProfileStaff()
    }

    getProfileStaff() {
        const url = `http://localhost:8000/vistaperfil-staff`;
        fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then((res) => res.json())
            .then(res => {
                console.log("user", res.result)
                this.set({
                    user: res.result[0]
                })
                console.log(res.result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange(name) {
        return event => {
            const user = this.state.user;
            user[name] = event.target.value
            this.set({
                user: user,
            });
        };
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
                nombre: this.state.user.nombre,
                apellidos: this.state.user.apellidos,
                email: this.state.user.email,
                telefono: this.state.user.telefono,
                idPersona: this.state.user.idPersona
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




    render() {
        return (
            <div style={{ display: "flex" }} >
                <div
                    style={{
                        width: '15%',
                        marginTop: '90px',
                        marginLeft: '150px'
                    }}>
                    <img style={{ width: "100%" }} src={image}></img>

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
                                value={this.state.user.nombre}
                                onChange={this.handleChange('nombre')}
                                margin="normal"
                                helperText="Nombre"
                            />
                            <TextField
                                style={{ width: 500 }}
                                value={this.state.user.apellidos}
                                onChange={this.handleChange('apellidos')}
                                margin="normal"
                                helperText="Apellidos"
                            />
                            <TextField
                                style={{ width: 500 }}
                                value={this.state.user.email}
                                onChange={this.handleChange('email')}
                                type="email"
                                margin="normal"
                                helperText="Email"
                            />

                            <TextField
                                style={{ width: 500 }}
                                value={this.state.user.telefono}
                                onChange={this.handleChange('telefono')}
                                type="number"
                                margin="normal"
                                helperText="Teléfono"
                            />

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
