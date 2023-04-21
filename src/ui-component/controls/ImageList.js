import React from "react";
import { ImageListItem } from "@mui/material";

export default function Image(props) {
    const { name, cols, rows, error=null, onChange, ...other } = props

    return (
        <ImageListItem 
            name={name}
            cols={cols}
            rows={cols}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}