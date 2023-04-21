import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ManageCategory = Loadable(lazy(() => import('views/manages/category/ListCategory')));
const ManageBranch = Loadable(lazy(() => import('views/manages/branch/ListBranch')));
const ManageSupplier = Loadable(lazy(() => import('views/manages/supplier/ListSupplier')));
const ManageCustomer = Loadable(lazy(() => import('views/manages/user/ListCustomer')));
const ManageEmployee = Loadable(lazy(() => import('views/manages/user/ListUser')));
const ManageProduct = Loadable(lazy(() => import('views/manages/product/ListProduct')));
const ImportWarehouse = Loadable(lazy(() => import('views/manages/warehouse/ListWarehouse')));
const ManagesOrders = Loadable(lazy(() => import('views/manages/orders/ListOrders')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/admin/',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'manage',
            children: [
                {
                    path: 'customer',
                    element: <ManageCustomer />
                },
                {
                    path: 'employee',
                    element: <ManageEmployee />
                },
                {
                    path: 'category',
                    element: <ManageCategory/>
                },
                {
                    path: 'branch',
                    element: <ManageBranch/>
                },
                {
                    path: 'supplier',
                    element: <ManageSupplier/>
                },
                {
                    path: 'product',
                    element: <ManageProduct />
                },
                {
                    path: 'warehouse',
                    element: <ImportWarehouse />
                },
                {
                    path: 'orders',
                    element: <ManagesOrders />
                }
            ]
        }
    ]
};

export default MainRoutes;
