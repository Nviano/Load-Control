import React from 'react';
import { Slave } from 'react-syncing';
import axios from 'axios';
import ProfileStaff from './ProfileStaff';
import ProfilePlayer from './ProfilePlayer';



export default class ProfilePage extends Slave {

    constructor() {
        super()

        this.state = {


            user: {},

        }
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