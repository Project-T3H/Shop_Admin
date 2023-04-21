// assets
import { IconShoppingCart } from '@tabler/icons';

// constant
const icons = { IconShoppingCart };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const order = {
    id: 'orders',
    title: 'Quản trị đơn hàng',
    type: 'group',
    role: 'MANAGER_ORDER',
    children: [
        {
            id: 'order',
            title: 'Đơn hàng',
            type: 'item',
            url: '/admin/manage/orders',
            icon: icons.IconShoppingCart,
            breadcrumbs: false
        }
    ]
};

export default order;
