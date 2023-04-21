import React, { useEffect } from "react";
import { Box, Grid, Tab, Tabs, Typography, TableBody, TableRow, TableCell, } from "@mui/material";
import { useForm, Form } from "ui-component/useForm";
import Controls from "ui-component/controls/Controls";
import { getProductById, getlistProduct } from "services/ProductService";
import { useState } from "react";
import { getListAllSupplier } from "services/SupplierService";
import useTable from "ui-component/useTable";
import { IconTrash } from '@tabler/icons';


// Tab 
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const FormWarehouse = (props) => {
    const initialFValues = {
        code: '',
        supplier: '',
        total_price: '',
        product_id: '',
        quantity: ''
    }

    // Bảng danh sách nhập
    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'product_id', label: 'Sản phẩm' },
        { id: 'quantity', label: 'Số lượng' },
        { id: 'actions', label: 'Lựa chọn', disableSorting: true }
    ]

    const { addOrEdit, recordForEdit } = props
    const [value, setValue] = useState(0);
    // Khai báo listData
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])
    // Danh sách nhà cung cấp
    const [lstSupplier, setLstSupplier] = useState([])
    // Danh sách sản phẩm
    const [lstProduct, setLstProduct] = useState([])
    // Danh sách sản phẩm import
    const [lstProductImport, setLstProductImport] = useState([])
    const [nameProductImport, setNameProductImport] = useState([])

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('supplier' in fieldValues)
            temp.supplier = fieldValues.supplier ? "" : "Nhà cung cấp không được để trống"
        if ('code' in fieldValues)
            temp.code = fieldValues.code ? "" : "Mã phiếu nhập không được để trống"
        // if ('total_price' in fieldValues)
        //     temp.total_price = fieldValues.total_price ? "" : "Tổng tiền nhập không được để trống"

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

    // table
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm, lstProductImport);
        }
    }

    useEffect(() => {
        getAllSupplier();
        getAllProduct();
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    const getAllSupplier = () => {
        getListAllSupplier()
            .then(response => {
                let list = [];
                response.forEach(item => {
                    let customItem = {};
                    customItem = { ...item, id: item.id, title: item.supplier_name }
                    list = [...list, customItem];
                });
                setLstSupplier(list);
            }).catch(error => {
                console.log(error)
            });
    }

    const handleChangeSupplier = (event) => {
        const {
            target: { value },
        } = event;
        setValues({
            ...values,
            supplier: value,
        })
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getAllProduct = () => {
        getlistProduct()
            .then(response => {
                let list = [];
                response.forEach(item => {
                    let customItem = {};
                    customItem = { ...item, id: item.id, title: item.product_name }
                    list = [...list, customItem];
                });
                setLstProduct(list);
            }).catch(error => {
                console.log(error)
            });
    }

    const handleChangeProduct = (event) => {
        const {
            target: { value },
        } = event;
        setValues({
            ...values,
            product_id: value,
        })

        getProductById(value)
        .then(response => {
            setNameProductImport(response.product_name)
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }

    const addProductImport = () => {
        var lst = [];
        const importProduct = {
            product_id: values.product_id,
            product_name: nameProductImport,
            quantity: values.quantity
        }
        lst = [...lstProductImport, importProduct]
        setLstProductImport(lst)
        setRecords(lstProductImport);
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Box container>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Thông tin phiếu nhập" {...a11yProps(0)} />
                    <Tab label="Nhập sản phẩm" {...a11yProps(1)} />
                </Tabs>
                {/* Code giao diện và xử lý phần thông tin của phiếu nhập */}
                <TabPanel value={value} index={0}>
                    <Box item xs={12} style={{ marginBottom: '15px' }}>
                        <Controls.Input
                            name="code"
                            label="Mã phiếu nhập"
                            value={values.code}
                            onChange={handleInputChange}
                            error={errors.code}
                        />
                        <Controls.Select
                            options={lstSupplier}
                            name="supplier"
                            label="Nhà cung cấp"
                            value={values.supplier}
                            onChange={handleChangeSupplier}
                        />
                        <Controls.Input
                            name="total_price"
                            label="Tổng tiền nhập"
                            value={values.total_price}
                            onChange={handleInputChange}
                            error={errors.total_price}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box item xs={12} style={{ width: '500px' }}>
                        <Box item xs={4} style={{ marginBottom: '15px' }}>
                            <Controls.Select
                                options={lstProduct}
                                name="product_id"
                                label="Sản phẩm"
                                value={values.product_id}
                                onChange={handleChangeProduct}
                            />
                        </Box>
                        <Box item xs={4} style={{ marginBottom: '15px' }}>
                            <Controls.Input
                                name="quantity"
                                label="Số lượng"
                                value={values.quantity}
                                onChange={handleInputChange}
                                error={errors.quantity}
                            />
                        </Box>
                        <Controls.Button
                            type="button"
                            text="Thêm sản phẩm"
                            onClick={() => addProductImport()}
                        />
                    </Box>
                    <Box>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map((item, index) =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.product_name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="secondary">
                                                <IconTrash color='red' />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Box>
                </TabPanel>
                <Grid item xs={12} style={{ textAlign: 'right' }}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Lưu"
                        />
                    </div>
                </Grid>
            </Box>
        </Form>
    )
}

export default FormWarehouse;