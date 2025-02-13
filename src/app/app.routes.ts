import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { AddressComponent } from './pages/address/address.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductsComponent } from './component/add-products/add-products.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { OrderComponent } from './pages/order/order.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { ProfilePageComponent } from './pages/profile/profile-page/profile-page.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'product',
        component: ProductComponent
    },
    {
        path:'cart',
        component: CartComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path:'product-details/:id',
        component: ProductDetailsComponent
    },
    {
        path:'address',
        component: AddressComponent
    },
    {
        path:'dashboard',
        component: DashboardComponent
    },
    {
        path:'add-product',
        component: AddProductsComponent
    },
    {
        path:'product-list',
        component: ProductListComponent
    },
    {
        path:'order',
        component: OrderComponent
    },
    {
        path:'track-order/:id',
        component: TrackOrderComponent
    },
    {
        path:'trackorder',
        component: TrackOrderComponent
    },
    {
        path:'invoice/:orderId',
        component: InvoiceComponent
    },
    {
        path:'change-password',
        component: ChangePasswordComponent
    },
    {
        path:'profile-page',
        component: ProfilePageComponent
    }
];
