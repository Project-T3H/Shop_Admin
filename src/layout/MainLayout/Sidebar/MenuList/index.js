// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const roleUser = JSON.parse(localStorage.getItem("roleUser"));
    const lstItem = menuItem.items;
    var lstMenu = [];
    if(roleUser[0].role_name === 'ADMIN') {
        lstMenu = lstItem
    }else {
        lstMenu = lstItem.filter((item) => item.role === undefined || item.role === roleUser[0].role_name)
    }
    // const navItems = menuItem.items.map((item) => {
    const navItems = lstMenu.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
