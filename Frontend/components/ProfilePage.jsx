import React from 'react';
import { Slave } from 'react-syncing';
import axios from 'axios';
import ProfileStaff from './ProfileStaff';
import ProfilePlayer from './ProfilePlayer';



export default class ProfilePage extends Slave {

    constructor() {
        super()

        this.getProfileStaff = this.getProfileStaff.bind(this);
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
                    <div>
                        <ProfileStaff />
                    </div>
                ) : (
                        <div>
                            <ProfilePlayer />
                        </div>
                    )}


            </div>


        );
    }
}