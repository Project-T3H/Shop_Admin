import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";
import { useState } from "react";
import { getListAllBranch } from "services/BranchService";
import { getListAllCategory } from "services/CategoryService";

const FormProduct = (props) => {
    const initialFValues = {
        branch: '',
        category: '',
        // product_code: '',
        product_name: '',
        sale: '',
        price: '',
        image: File,
        description: '',
        content: ''
    }
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('product_name' in fieldValues)
            temp.product_name = fieldValues.product_name ? "" : "Tên sản phẩm không được để trống"
        if ('category' in fieldValues)
            temp.category = fieldValues.category ? "" : "Danh mục không được để trống"
        if ('branch' in fieldValues)
            temp.branch = fieldValues.branch ? "" : "Nhãn hàng không được để trống"

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const [lstCategory, setLstCategory] = useState([])
    const [lstBranch, setLstBranch] = useState([])

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        getListCategory();
        getListBranch();
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const getListCategory = () => {
        getListAllCategory()
            .then(response => {
                let list = [];
                response.forEach(item => {
                    let customItem = {};
                    customItem = { ...item, id: item.id, title: item.category_name }
                    list = [...list, customItem];
                });
                setLstCategory(list);
            }).catch(error => {
                console.log(error)
            });
    }

    const getListBranch = () => {
        getListAllBranch()
            .then(response => {
                let list = [];
                response.forEach(item => {
                    let customItem = {};
                    customItem = { ...item, id: item.id, title: item.branch_name }
                    list = [...list, customItem];
                });
                setLstBranch(list);
            }).catch(error => {
                console.log(error)
            });
    }

    const handleChangeCategory = (event) => {
        const {
            target: { value },
        } = event;
        setValues({
            ...values,
            category: value
        })
    }

    const handleChangeBranch = (event) => {
        const {
            target: { value },
        } = event;
        setValues({
            ...values,
            branch: value
        })
    }

    const handleFileUpload = (event) => {
        setValues({
            ...values,
            image: event.target.files[0]
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container style={{ width: '700px' }}>
                <Grid item xs={6} style={{ marginBottom: '15px' }}>
                    <Controls.Input
                        name="product_name"
                        label="Tên sản phẩm"
                        value={values.product_name}
                        onChange={handleInputChange}
                        error={errors.product_name}
                    />
                    <Controls.Select
                        options={lstCategory}
                        value={values.category}
                        onChange={handleChangeCategory}
                        name="category"
                        label="Danh mục"
                        error={errors.category}
                    />
                    <Controls.Select
                        options={lstBranch}
                        value={values.branch}
                        onChange={handleChangeBranch}
                        name="branch"
                        label="Nhãn hàng"
                        error={errors.branch}
                    />
                    {/* Hình ảnh sp */}
                    <Grid item xs="12">
                        <Controls.Input type="file" id="upload1" accept="image/*" onChange={handleFileUpload} name="image" />
                    </Grid>
                </Grid>
                <Grid item xs={6} style={{ marginBottom: '15px' }}>
                    <Controls.Input
                        name="price"
                        label="Giá"
                        value={values.price}
                        onChange={handleInputChange}
                        error={errors.price}
                    />
                    <Controls.Input
                        name="sale"
                        label="Sale"
                        value={values.sale}
                        onChange={handleInputChange}
                        error={errors.sale}
                    />
                    <Controls.Input
                        name="content"
                        label="Mô tả"
                        value={values.content}
                        onChange={handleInputChange}
                        error={errors.content}
                    />
                    <Controls.TextArea
                        name="description"
                        label="Nội dung"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
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

export default FormProduct;