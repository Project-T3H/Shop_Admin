import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";


const FormSupplier = (props) => {

    const initialFValues = {
        supplier_name: '',
        phone: '',
        address: '',
    }

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('supplier_name' in fieldValues)
            temp.supplier_name = fieldValues.supplier_name ? "" : "Tên nhà cung cấp không được để trống"
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "SĐT không được để trống"
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "Địa chỉ không được để trống"
            
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
        if (recordForEdit !== null){
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container style={{ width: '500px' }}>
                <Grid item xs={12} style={{ marginBottom: '15px' }}>
                    <Controls.Input
                        name="supplier_name"
                        label="Tên nhà cung cấp"
                        value={values.supplier_name}
                        onChange={handleInputChange}
                        error={errors.supplier_name}
                    />
                    <Controls.Input
                        name="phone"
                        label="SĐT"
                        value={values.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                    />
                    <Controls.Input
                        name="address"
                        label="Địa chỉ"
                        value={values.address}
                        onChange={handleInputChange}
                        error={errors.address}
                    />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'right' }}>
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

export default FormSupplier;