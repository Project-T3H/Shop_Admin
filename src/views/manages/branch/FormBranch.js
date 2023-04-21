import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";


const FormBranch = (props) => {

    const initialFValues = {
        branch_name: ''
    }

    const { addOrEdit, recordForEdit} = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors}
        if ('branch_name' in fieldValues)
            temp.branch_name = fieldValues.branch_name ? "" : "Tên nhãn hàng không được để trống."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container style={{width: '500px'}}>
                <Grid item xs={12} style={{textAlign: 'center', marginBottom: '15px'}}>
                    <Controls.Input
                        name="branch_name"
                        label="Tên nhãn hàng"
                        value={values.branch_name}
                        onChange={handleInputChange}
                        error={errors.branch_name}
                    />
                </Grid>
                <Grid item xs={12} style={{textAlign: 'right'}}>
                    <div>
                        <Controls.Button 
                            type="submit"
                            text="Lưu"
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}

export default FormBranch;