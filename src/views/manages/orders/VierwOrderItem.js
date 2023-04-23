import React, { useEffect } from 'react'
import { Grid, TableBody, TableRow, TableCell } from '@mui/material';
import { useForm } from 'ui-component/useForm';
import Controls from 'ui-component/controls/Controls';
import useTable from 'ui-component/useTable';
import { useState } from 'react';
import { converToPrice, gridSpacing } from 'store/constant';
import { getListAllOrderItem } from 'services/OrdersService';

const ViewOrderItem = (props) => {

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'productName', label: 'Sản phẩm' },
        { id: 'quantity', label: 'Số lượng' },
        { id: 'price', label: 'Giá' },
        { id: 'totalPrice', label: 'Tổng tiền' }
    ];


    const initialFValues = {
        roleName: ''
    }
    const { addOrEdit, recordForEdit } = props

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('roleName' in fieldValues)
            temp.roleName = fieldValues.roleName ? "" : "This field is required."

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
        resetForm
    } = useForm(initialFValues, true, validate);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSubmit = e => {
        e.preventDefault();
        addOrEdit(recordForEdit, resetForm);
    }

    useEffect(() => {
        if (recordForEdit != null) {
            getListOrderItem(recordForEdit.id);
            setValues({
                ...recordForEdit
            })
        }
    }, [recordForEdit])

    // Lấy ds chức năng

    const getListOrderItem = (id) => {
        getListAllOrderItem(id)
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    }

    return (
        <div>
            <Grid container spacing={gridSpacing} style={{ width: '800px' }}>
                <Grid item xs={12}>
                    {/* === Table === */}
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map((item, index) =>
                                (<TableRow key={item.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.product}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{converToPrice(item.price)}</TableCell>
                                    <TableCell>{converToPrice(item.price * item.quantity)}</TableCell>
                                </TableRow>
                                ))
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </Grid>
                {recordForEdit === null ? '' : recordForEdit.status === false ?<Grid item xs={12} style={{ textAlign: 'right' }}>
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Duyệt" onClick={handleSubmit} />
                    </div>
                </Grid> : ''}
            </Grid>
        </div>
    )
};

export default ViewOrderItem;