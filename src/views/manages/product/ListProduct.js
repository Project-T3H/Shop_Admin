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
import { createProduct, deleteProduct, getlistProduct } from 'services/ProductService';
import FormProduct from './FormProduct';
// import dayjs from 'dayjs';

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

const ManageProduct = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'category', label: 'Danh mục'},
        { id: 'branch', label: 'Nhãn hàng'},
        { id: 'name', label: 'Tên sản phẩm' },
        { id: 'price', label: 'Giá'},
        { id: 'sale', label: 'Sale'},
        { id: 'actions', label: 'Lựa chọn', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (product, resetForm) => {
        if (product.id) {
            updateProduct(product).then(response => {
                if (response !== null) {
                    showNotification("Cập nhật sản phẩm thành công!", 'success');
                    getData();
                }
            }).catch(error => {
                console.log(error)
                showNotification("Cập nhật sản phẩm thất bại!", 'danger');
            })
        } else {
            createProduct(product)
            .then(response => {
                if(response !== null){
                    showNotification("Create Prodcuct Success", 'success');
                    getData();
                }
            }).catch(error => {
                console.log(error)
                showNotification("Tạo mới sản phẩm thất bại!", 'danger');
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
        console.log(item)
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
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getlistProduct()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const deleteProducts = (item) => {
        deleteProduct(item).then(response => {
            if (response !== null) {
                showNotification("Xóa sản phẩm thành công!", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification("Xóa sản phẩm thất bại!", 'danger');
        });
    }

    return (
        <>
            <MainCard title="Danh sách sản phẩm">
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
                                        <TableCell>{item.branch}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.product_name}</TableCell>
                                        <TableCell>{converToPrice(item.price)}</TableCell>
                                        <TableCell>{item.sale}%</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick = {() => { deleteProducts(item) }}
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
            <Popup title={recordForEdit === null ? 'Tạo mới sản phẩm' : 'Cập nhật sản phẩm'} openPopup={open} setOpenPopup={setOpen}>
                <FormProduct recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageProduct;
