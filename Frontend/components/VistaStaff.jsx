import React from 'react';
import { Slave } from 'react-syncing';
import { TextField, Button } from '@material-ui/core';
import CardProfilePhoto from './CardProfilePhoto'
import swal from 'sweetalert';

import image from '../images/bgprofilestaff.jpg';

export default class VistaPerfil extends Slave {

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
        const url = `//${process.env.SERVER}/vistaperfil-player`;
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
        const url = `//${process.env.SERVER}/jugador/modificar`;

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
            <div>
                <div>
                    <img src={image} style={{ height: '100%', position: 'absolute' }} />
                </div>
                <div>
                </div>

            </div>
        );
    }
}    
