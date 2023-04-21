import React, { useEffect } from 'react'
import { Grid } from '@mui/material';
import { useForm, Form } from 'ui-component/useForm';
import Controls from 'ui-component/controls/Controls';

const FormCategory = (props) => {
    
    const initialFValues = {
        category_name: ''
    }
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('category_name' in fieldValues) {
            temp.category_name = fieldValues.category_name ? "" : "Tên danh mục không đươc để trống."
        }
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
            <Grid container style={{ width: '500px'}}>
                <Grid item xs={12} style={{marginBottom: '15px'}}>
                    {/* CategoryName */}
                    <Controls.Input
                        label="Tên danh mục"
                        name="category_name"
                        value={values.category_name}
                        onChange={handleInputChange}
                        error={errors.category_name}
                    />
                </Grid>
                <Grid item xs={12} style={{textAlign: 'right'}}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Lưu" />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
};

export default FormCategory;