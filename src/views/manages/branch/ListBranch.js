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
import FormBranch from './FormBranch';
import { useEffect } from 'react';
import { showNotification } from 'services/NotificationService';
import { createBranch, deleteBranch, getListAllBranch, updateBranch } from 'services/BranchService';

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

const ManageBranch = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'nameBranch', label: 'Tên nhãn hàng' },
        { id: 'createBy', label: 'Người tạo' },
        { id: 'createDate', label: 'Ngày tạo' },
        { id: 'actions', label: 'Lựa chọn', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (branch, resetForm) => {
        if (branch.id) {
            // Update branch
            updateBranch(branch).then(response => {
                if (response !== null) {
                    showNotification('Cập nhật nhãn hàng thành công!', 'success');
                    getData();
                }
            }).catch(error => {
                showNotification('Cập nhật nhãn hàng thất bại!', 'danger');
            });
        } else {
            // Thêm mới branch
            createBranch(branch).then(response => {
                if (response !== null) {
                    showNotification('Tạo mới nhãn hàng thành công!', 'success');
                    getData();
                }
            }).catch(error => {
                showNotification('Tạo mới nhãn hàng thất bại!', 'danger');
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
                else
                    return items.filter(x => x.branch_name.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListAllBranch()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const deleteBranchs = (item) => {
        deleteBranch(item.id).then(response => {
            if (response !== null) {
                showNotification('Xóa nhãn hàng thành công!', 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification('Xóa nhãn hàng thất bại!', 'danger');
        });
    }


    return (
        <>
            <MainCard title="Danh sách nhãn hàng">
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
                                        <TableCell>{item.branch_name}</TableCell>
                                        <TableCell>{item.create_by}</TableCell>
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
                                                onClick={() => { deleteBranchs(item) }}>
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
            <Popup title={recordForEdit === null ? 'Thêm mới nhãn hàng' : 'Cập nhật nhãn hàng'} openPopup={open} setOpenPopup={setOpen}>
                <FormBranch recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageBranch;
