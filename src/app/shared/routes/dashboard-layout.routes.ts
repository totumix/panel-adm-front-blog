import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth.guard';

export const DashboardLayout_ROUTES: Routes = [
    {
        path: "",
        pathMatch: "prefix",
        canActivate: [AuthGuard],
        children: [
            {
                path: 'start-view',
                loadChildren: () => import('../../pages/start-view/start-view.module').then(m => m.StartViewModule)
            },
            {
                path: 'posts',
                loadChildren: () => import('../../pages/posts/posts.module').then(m => m.PostsModule)
            },
            {
                path: 'categories',
                loadChildren: () => import('../../pages/categories/categories.module').then(m => m.CategoriesModule)
            },
            {
                path: 'business',
                loadChildren: () => import('../../pages/business/business.module').then(m => m.BusinessModule)
            },
            {
                path: 'orders',
                loadChildren: () => import('../../pages/orders/orders.module').then(m => m.OrdersModule)
            },
            {
                path: 'clients',
                loadChildren: () => import('../../pages/clients/clients.module').then(m => m.ClientsModule)
            },
            {
                path: 'orders-manager',
                loadChildren: () => import('../../pages/orders-manager/orders-manager.module').then(m => m.OrdersManagerModule)
            },
            {
                path: 'messengers',
                loadChildren: () => import('../../pages/messengers/messengers.module').then(m => m.MessengersModule)
            },
            {
                path: 'setting',
                loadChildren: () => import('../../pages/setting/setting.module').then(m => m.SettingModule)
            },
            {
                path: 'users',
                loadChildren: () => import('../../pages/users/users.module').then(m => m.UsersModule)
            },
        ]
    }


];