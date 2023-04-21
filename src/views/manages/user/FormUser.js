import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";

const FormUser = (props) => {

    const initialFValues = {
        username: '',
        gender: '',
        date: '',
        email: '',
        phone: '',
        address: ''
    }

    const genders = [
        {
            id: 0,
            title: 'Nam',
        },
        {
            id: 1,
            title: 'Nữ'
        }
    ]

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This fields is required."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "This fields is required."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This fields is required."
            
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
            <Grid container style={{ width: '700px' }}>
                <Grid item xs={6} style={{ marginBottom: '15px' }}>
                    <Controls.Input
                        name="username"
                        label="Tên đăng nhập"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <Controls.RadioGroup
                        name="gender"
                        label="Giới tính"
                        items={genders}
                        value={values.gender}
                        onChange={handleInputChange}
                        error={errors.gender}
                    />
                    <Controls.BasicDatePicker
                        name="date"
                        label="Ngày sinh"
                        value={values.date}
                        onChange={handleInputChange}
                        error={errors.date}
                    />
                </Grid>
                <Grid item xs={6} style={{ marginBottom: '15px' }}>
                    <Controls.Input
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
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

export default FormUser;