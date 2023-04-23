// material-ui
import { Grid, TableBody, TableRow, TableCell, InputAdornment, Toolbar } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
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
import { getListUser, createUser, deleteUser, updateUser } from 'services/AccountService';
import FormUser from './FormUser';
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

const ManageUser = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'username', label: 'Tên đăng nhập' },
        { id: 'gender', label: 'Giới tính'},
        { id: 'email', label: 'Email'},
        { id: 'phone', label: 'SĐT'},
        { id: 'date', label: 'Ngày sinh'},
        { id: 'address', label: 'Địa chỉ'},
        { id: 'actions', label: 'Lựa chọn', disableSorting: true }
    ]

    const [open, setOpen] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const addOrEdit = (user, resetForm) => {
        const dateBirth = new Date(user.date);
        user.date = dateBirth;
        console.log(user)
        if (user.id) {
            updateUser(user).then(response => {
                if (response !== null) {
                    showNotification("Cập nhật nhân viên thành công!", 'success');
                    getData();
                }
            }).catch(error => {
                console.log(error)
                showNotification("Cập nhật nhân viên thất bại!", 'danger');
            })
        } else {
            createUser(user)
            .then(response => {
                console.log(response)
                showNotification("Tạo mới nhân viên thành công!", 'success');
                getData();
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
        // Set lại giá trị giới tính cho popup cập nhật
        if (item.gender !== null) {
            if(item.gender !== ''){
                if (item.gender === false){
                    item.gender = 0;
                }else if (item.gender === true){
                    item.gender = 1;
                }
            }else {
                item.gender = '';
            }
        }else {
            item.gender = '';
        }
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
                else{
                    return items.filter(x => x.username.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListUser()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const deleteUsers = (item) => {
        deleteUser(item).then(response => {
            if (response !== null) {
                showNotification("Delete User Success", 'success');
                getData();
            }
        }).catch(error => {
            console.log(error);
            showNotification("Delete User Fail", 'danger');
        });
    }

    const convertDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().split('T')[0];
    }

    const viewGender = (gender) => {
        if (gender !== null) {
            if(gender !== ''){
                if(gender === false) {
                    return 'Nam';
                }else if(gender === true) {
                    return 'Nữ';
                }else if (gender === 0){
                    return 'Nam';
                }else {
                    return 'Nữ'
                }
            }else {
                return '';
            }
        }else {
            return '';
        }
    }

    return (
        <>
            <MainCard title="Danh sách nhân viên">
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
                                        <TableCell>{item.username}</TableCell>
                                        <TableCell>{viewGender(item.gender)}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.date !== null ? convertDateTime(item.date) : ''}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="primary"
                                                onClick={() => { openInPopup(item) }}
                                            >
                                                <IconEdit />
                                            </Controls.ActionButton>
                                            <Controls.ActionButton
                                                color="secondary"
                                                onClick = {() => { deleteUsers(item) }}
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
            <Popup title={recordForEdit === null ? 'Tạo mới nhân viên': 'Cập nhật nhân viên'} openPopup={open} setOpenPopup={setOpen}>
                <FormUser recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    );
};

export default ManageUser;
