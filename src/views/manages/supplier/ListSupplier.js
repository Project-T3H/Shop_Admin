// material-ui
import { Grid, TableBody, TableRow, TableCell, InputAdornment, Toolbar } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { formatDateTime, gridSpacing } from 'store/constant';
import { useState } from 'react';

import Popup from 'ui-component/Popup';
import useTable from 'ui-component/useTable';
import Controls from 'ui-component/controls/Controls';
import { makeStyles } from '@mui/styles';
// ===============================|| Dialog ||================================= //
import { IconEdit, IconTrash, IconSearch } from '@tabler/icons';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import FormSupplier from './FormSupplier';
import { showNotification } from 'services/NotificationService';
import { createSupplier, deleteSupplier, getListAllSupplier, updateSupplier } from 'services/SupplierService';

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

const ManageSupplier = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'nameSupplier', label: 'Tên nhà cung cấp' },
        { id: 'phone', label: 'SĐT'},
        { id: 'address', label: 'Địa chỉ'},
        { id: 'createDate', label: 'Ngày tạo'},
        { id: 'actions', label: 'Lựa chọn', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (supplier, resetForm) => {
        if (supplier.id) {
            updateSupplier(supplier).then(response => {
                if (response !== null) {
                    showNotification("Cập nhật nhà cung cấp thành công!", 'success');
                    getData();
                }
            }).catch(error => {
                showNotification("Cập nhật nhà cung cấp thất bại!", 'danger');
            })
        } else {
            createSupplier(supplier)
            .then(response => {
                if(response){
                    showNotification("Tạo mới nhà cung cấp thành công! ", 'success');
                }
                getData();
            }).catch(error => {
                console.log(error);
                showNotification("Tạo mới nhà cung cấp thất bại!", 'danger');
            });
        }
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
                else{
                    return items.filter(x => x.supplier_name.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListAllSupplier()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const deleteSuppliers = (item) => {
        deleteSupplier(item).then(response => {
            if (response !== null) {
                showNotification("Xóa nhà cung cấp thành công!", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification("Xóa nhà cung cấp thất bại!", 'danger');
        });
    }

    return (
        <>
            <MainCard title="Danh sách nhà cung cấp">
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
                    <Controls.Button
                        text="Tạo mới"
                        variant="contained"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpen(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} style={{overflow: 'auto'}}>
                        {/* === Table === */}
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map((item, index) =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.supplier_name}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>{formatDateTime(item.create_date)}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick = {() => { deleteSuppliers(item) }}
                                            >
                                                <IconTrash color='red' />
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
            <Popup title={recordForEdit === null ? 'Tạo mới nhà cung cấp' : 'Cập nhật nhà cung cấp'} openPopup={open} setOpenPopup={setOpen}>
                <FormSupplier recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageSupplier;
