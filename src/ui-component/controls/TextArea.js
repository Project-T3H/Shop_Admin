import React from "react";
import { TextField } from '@mui/material';


export default function TextArea(props) {
    const { name, label, value, maxRows, type, error = null, placeholder, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            multiline
            minRows={5}
            placeholder={placeholder || ''}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}