import React, { Component } from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'; 


const SelectForm = ({input, type, placeholder, value, onChange, name}) => {
    return(
        <FormControl
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={input.onChange}
                name={input.name}>

                <option value="contributor1">Contributor 1</option>
                <option value="contributor2">Contributor 2</option>
        </FormControl>

    )
        
}

export default SelectForm; 