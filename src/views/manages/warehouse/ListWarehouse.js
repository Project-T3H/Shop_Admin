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
import { IconEdit, IconTrash, IconSearch } from '@tabler/icons';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { showNotification } from 'services/NotificationService';
import FormWarehouse from './FormWarehouse';
import { createTicketImport, createTicketImportDetail, deleteTicketImport, getListAllTicketImport, updateTicketImport } from 'services/TicketImportService';

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

const ManageWarehouse = () => {
    
    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'code', label: 'Mã phiếu nhập' },
        { id: 'supllier_name', label: 'Nhà cung cấp'},
        { id: 'total_price', label: 'Tổng tiền nhập'},
        { id: 'actions', label: 'Lựa chọn', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (imports, resetForm, lstProductImport) => {
        console.log(lstProductImport)
        if (imports.id) {
            updateTicketImport(imports).then(response => {
                if (response !== null) {
                    showNotification("Cập nhật phiếu nhập thành công!", 'success');
                    getData();
                }
            }).catch(error => {
                console.log(error)
                showNotification("Cập nhật phiếu nhập thất bại!", 'danger')
            })
        } else {
            // Thêm mới category
            createTicketImport(imports)
            .then(response => {
                if(response){
                    lstProductImport.map(productImport => {
                        let p = {};
                        p.product = productImport.product_id;
                        p.quantity = productImport.quantity;
                        p.ticket_import = response.id;
                        createTicketImportDetail(p)
                        .then(res => {console.log(res)}).catch(error => console.log(error))
                    })
                }
                showNotification('Tạo mới phiếu nhập thành công!', 'success');
                getData();
            }).catch(error => {
                console.log(error)
                showNotification('Tạo mới phiếu nhập thất bại!', 'danger');
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
                    console.log(items);
                    return items;
                }
                else {
                    return items.filter(x => x.code.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })
        // Code tìm kiếm 
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListAllTicketImport()
            .then(response => {
                setRecords(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteImports = (item) => {
        deleteTicketImport(item).then(response => {
            if (response !== null) {
                showNotification("Xóa phiếu nhập thành công!", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification('Xóa phiếu nhập thất bại!', 'danger');
        });
    }

    return (
        <>
            <MainCard title="Danh sách phiếu nhập">
                <Toolbar>
                    <Controls.Input
                        label="Tìm kiếm"
                        className={classes.searchInput}
                        placeholder= "Tìm kiếm ...."
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
                    <Grid item xs={12}>
                        {/* === Table === */}
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map((item, index) =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell>{item.supplier}</TableCell>
                                        <TableCell>{converToPrice(item.total_price)}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                                >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            {/* <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => {deleteImports(item) }}>
                                                <IconTrash color='red' />
                                            </Controls.ActionButton> */}
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
            <Popup title={recordForEdit === null ? 'Tạo phiếu nhập hàng' : 'Cập nhật phiếu nhập hàng'} openPopup={open} setOpenPopup={setOpen}>
                <FormWarehouse recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageWarehouse;
