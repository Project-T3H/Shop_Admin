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
        address: '',
        role: ''
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

    const role = [
        {
            id: 2,
            title: 'MANAGER',
        },
        {
            id: 3,
            title: 'MANAGER_ODER'
        },
        {
            id: 4,
            title: 'MANAGER_WAREHOUSE'
        },
        {
            id: 5,
            title: 'MANAGER_USER'
        },
    ]

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        console.log(fieldValues.username);
        console.log(fieldValues.gender === '');
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "Tên đăng nhập không được để trống"
        if ('gender' in fieldValues)
            temp.gender = fieldValues.gender ? "" : "Giới tính không được để trống"
        if ('date' in fieldValues)
            temp.date = fieldValues.date ? "" : "Ngày sinh không được để trống"
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? "" : "SĐT không được để trống"
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "Địa chỉ không được để trống"
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "Email không được để trống"
        if ('role' in fieldValues)
            temp.role = fieldValues.role ? "" : "Quyền không được để trống"

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
        if (recordForEdit !== null) {
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    const handleChangeRole = (event) => {
        const {
            target: { value },
        } = event;
        setValues({
            ...values,
            role: value
        })
    }

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
                    <Controls.Select
                        options={role}
                        value={values.role}
                        onChange={handleChangeRole}
                        name="role"
                        label="Quyền"
                        error={errors.role}
                    />
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