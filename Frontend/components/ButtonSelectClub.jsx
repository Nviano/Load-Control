import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';


export default (props) =>
    <FormControl style={{ marginTop: 20 }}>
        <Select

            value={props.club}
            onChange={props.handleClub}
            inputProps={{
                name: 'nombre',
                id: 'idClub',
            }}
        >
            {props.clubes.map((club) => <MenuItem value={club.idClub} key={club.idClub}>{club.nombre}</MenuItem>)}
        </Select>
        <FormHelperText>Club</FormHelperText>
    </FormControl>


