// assets
import { IconUser, IconUsers } from '@tabler/icons';

// constant
const icons = {IconUser, IconUsers};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const user = {
    id: 'user',
    title: 'Quản trị người dùng',
    type: 'group',
    role: 'MANAGER_USER',
    children: [
        {
            id: 'employee',
            title: 'Quản lý nhân viên',
            type: 'item',
            url: '/admin/manage/employee',
            icon: icons.IconUser,
            breadcrumbs: false
        },
        {
            id: 'customer',
            title: 'Quản lý khách hàng',
            type: 'item',
            url: '/admin/manage/customer',
            icon: icons.IconUsers,
            breadcrumbs: false
        }
    ]
};

export default user;
