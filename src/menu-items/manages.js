import { 
    IconTypography, 
    IconPalette, 
    IconShadow, 
    IconWindmill, 
    IconApps,
    IconBox,
    IconBriefcase,
    IconUsers,
    IconUser,
    IconMenu2, 
    IconBuildingWarehouse,
    IconDiscount
} from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconApps,
    IconBox,
    IconBriefcase,
    IconUsers,
    IconUser,
    IconMenu2,
    IconBuildingWarehouse,
    IconDiscount
};

const manages = {
    id: 'pages',
    title: 'Quản trị hệ thống',
    type: 'group',
    role: 'MANAGER',
    children: [
        {
            id: 'manage_category',
            title: 'Quản lý danh mục',
            type: 'item',
            url: '/admin/manage/category',
            icon: icons.IconApps,
            breadcrumbs: false
        },
        {
            id: 'manage_branch',
            title: 'Quản lý nhãn hàng',
            type: 'item',
            url: '/admin/manage/branch',
            icon: icons.IconBox,
            breadcrumbs: false
        },
        {
            id: 'manage_supplier',
            title: 'Quản lý nhà cung cấp',
            type: 'item',
            url: '/admin/manage/supplier',
            icon: icons.IconBriefcase,
            breadcrumbs: false
        },
        {
            id: 'manage_product',
            title: 'Quản lý sản phẩm',
            type: 'item',
            url: '/admin/manage/product',
            icon: icons.IconShadow,
            breadcrumbs: true
        }
    ]
};

export default manages;
