// assets
import { IconTicket } from '@tabler/icons';

// constant
const icons = { IconTicket };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const ticket = {
    id: 'ticket',
    title: 'Quản trị kho hàng',
    type: 'group',
    role: 'MANAGER_WAREHOUSE',
    children: [
        {
            id: 'ticket',
            title: 'Nhập hàng',
            type: 'item',
            url: '/admin/manage/warehouse',
            icon: icons.IconTicket,
            breadcrumbs: false
        }
    ]
};

export default ticket;
