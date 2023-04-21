// material-ui
import { Grid, TableBody, TableRow, TableCell, InputAdornment, Toolbar } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { converToPrice, gridSpacing } from 'store/constant';
import { useState } from 'react';

import Popup from 'ui-component/Popup';
import useTable from 'ui-component/useTable';
import Controls from 'ui-component/controls/Controls';
import { makeStyles } from '@mui/styles';
// ===============================|| Dialog ||================================= //
import { IconEye, IconSearch } from '@tabler/icons';
import { useEffect } from 'react';
import { getListAllOrders } from 'services/OrdersService';
import ViewOrderItem from './VierwOrderItem';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}));

const ManageOrders = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'code', label: 'Mã đơn hàng' },
        { id: 'customerId', label: 'Khách hàng' },
        { id: 'phone', label: 'SĐT' },
        { id: 'email', label: 'Email' },
        { id: 'address', label: 'Địa chỉ' },
        { id: 'total', label: 'Tổng số tiền' },
        { id: 'status', label: 'Trạng thái' },
        { id: 'actions', label: 'Lựa chọn', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (functions, resetForm) => {
        // if (functions.id) {
        //     // Update function
        //     updateFunction(functions).then(response => {
        //         if (response !== null) {
        //             showNotification('Update Function Success', 'success');
        //             getData();
        //         }
        //     }).catch(error => {
        //         showNotification('Update Function Fail', 'danger');
        //     });
        // } else {
        //     // Thêm mới function
        //     createFunction(functions.name_function).then(response => {
        //         if (response !== null) {
        //             showNotification('Create Function Success', 'success');
        //             getData();
        //         }
        //     }).catch(error => {
        //         showNotification('Create Function Fail', 'danger');
        //     });
        // }
        resetForm()
        setRecordForEdit(null)
        setOpen(false)
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpen(true);
    }

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "") {
                    return items;
                }
                else
                    return items.filter(x => x.order_code.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListAllOrders()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    return (
        <>
            <MainCard title="Danh sách đơn hàng">
                <Toolbar>
                    <Controls.Input
                        label="Tìm kiếm"
                        className={classes.searchInput}
                        placeholder="Tìm kiếm ...."
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <IconSearch />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        {/* === Table === */}
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map((item, index) =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.order_code}</TableCell>
                                        <TableCell>{item.customer_name}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{converToPrice(item.total_price)}</TableCell>
                                        <TableCell>{item.status === false ? 'Pending' : 'Approved'}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEye />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Grid>
                </Grid>
            </MainCard>
            <Popup title="Chi tiết đơn hàng" openPopup={open} setOpenPopup={setOpen}>
                <ViewOrderItem recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageOrders;
