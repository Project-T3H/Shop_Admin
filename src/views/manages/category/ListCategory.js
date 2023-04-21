// material-ui
import { Grid, TableBody, TableRow, TableCell, InputAdornment, Toolbar } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useState } from 'react';

import Popup from 'ui-component/Popup';
import FormCategory from './FormCategory';
import useTable from 'ui-component/useTable';
import Controls from 'ui-component/controls/Controls';
import { makeStyles } from '@mui/styles';
// ===============================|| Dialog ||================================= //
import { IconEdit, IconTrash, IconSearch } from '@tabler/icons';
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from 'react';
import { createCategory, deleteCategory, getListAllCategory, updateCategory } from 'services/CategoryService';
import { showNotification } from 'services/NotificationService';

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

const ManageCategory = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'categoryName', label: 'Tên danh mục' },
        { id: 'createDate', label: 'Ngày tạo' },
        { id: 'actions', label: 'Lựa chọn', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (category, resetForm) => {
        if (category.id) {
            updateCategory(category).then(response => {
                if (response !== null) {
                    showNotification("Cập nhật danh mục thành công!", 'success');
                    getData();
                }
            }).catch(error => {
                showNotification("Cập nhật danh mục thất bại!", 'danger')
            })
        } else {
            // Thêm mới category
            createCategory(category)
                .then(response => {
                    showNotification('Tạo mới danh mục thành công!', 'success');
                    getData();
                }).catch(error => {
                    showNotification('Tạo mới danh mục thất bại!', 'danger');
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
                else {
                    return items.filter(x => x.category_name.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListAllCategory()
            .then(response => {
                setRecords(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteCategorys = (item) => {
        deleteCategory(item).then(response => {
            if (response !== null) {
                showNotification("Xóa danh mục thành công!", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification('Xóa danh mục thất bại!', 'danger');
        });
    }

    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return (
            [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }

    return (
        <>
            <MainCard title="Danh sách danh mục">
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
                    <Grid item xs={12}>
                        {/* === Table === */}
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map((item, index) =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.category_name}</TableCell>
                                        <TableCell>{item.create_date !== null ? formatDateTime(item.create_date) : ''}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick={() => { deleteCategorys(item) }}>
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
            <Popup title={recordForEdit === null ? 'Tạo mới danh mục' : 'Cập nhật danh mục'} openPopup={open} setOpenPopup={setOpen}>
                <FormCategory recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageCategory;
