import React from 'react';
import { Slave } from 'react-syncing'
import ButtonMenuHomeStaff from './ButtonMenuHomeStaff';
import ButtonMenuHomePlayer from './ButtonMenuHomePlayer';

export default class Home extends Slave {

    constructor() {
        super()
        this.getProfileStaff = this.getProfileStaff.bind(this);
        this.state = {
            logged: true,
            user: {},


        }

    }
    didMount() {
        this.getProfileStaff()
    }

    getProfileStaff() {
        const url = `//server.nviano.es/vistaperfil-staff`;
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
                    user: res.result[0]
                })

            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                {this.state.user.rol === 1 ? (
                    <ButtonMenuHomeStaff />
                ) : (
                        <ButtonMenuHomePlayer />
                    )}
            </div>
        );
    }
}



