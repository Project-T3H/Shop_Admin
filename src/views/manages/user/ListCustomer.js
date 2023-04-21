// material-ui
import { Grid, TableBody, TableRow, TableCell, InputAdornment, Toolbar } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { useState } from 'react';

import useTable from 'ui-component/useTable';
import Controls from 'ui-component/controls/Controls';
import { makeStyles } from '@mui/styles';
// ===============================|| Dialog ||================================= //
import { IconSearch } from '@tabler/icons';
import { useEffect } from 'react';
import { getListCustomer } from 'services/AccountService';

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

const ManageCustomer = () => {

    const classes = useStyles();

    const headCells = [
        { id: 'id', label: 'STT' },
        { id: 'username', label: 'Tên đăng nhập' },
        { id: 'gender', label: 'Giới tính' },
        { id: 'email', label: 'Email' },
        { id: 'phone', label: 'SĐT' },
        { id: 'date', label: 'Ngày sinh' },
        { id: 'address', label: 'Địa chỉ' }
    ]

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [records, setRecords] = useState([])

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "") {
                    console.log(items);
                    return items;
                }
                else {
                    return items.filter(x => x.username.toLowerCase().includes(target.value.toLowerCase()))
                }
            }
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        getListCustomer()
            .then(response => {
                setRecords(response);
            }).catch(error => {
                console.log(error)
            });
    };

    const viewGender = (gender) => {
        if (gender !== null) {
            if (gender !== '') {
                if (gender === false) {
                    return 'Nam';
                } else if (gender === true) {
                    return 'Nữ';
                } else if (gender === 0) {
                    return 'Nam';
                } else {
                    return 'Nữ'
                }
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    return (
        <>
            <MainCard title="Danh sách khách hàng">
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
                    <Grid item xs={12} style={{ overflow: 'auto' }}>
                        {/* === Table === */}
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map((item, index) =>
                                    (<TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.username}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{viewGender(item.gender)}</TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.address}</TableCell>
                                    </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Grid>
                </Grid>
            </MainCard>
        </>
    );
};

export default ManageCustomer;
