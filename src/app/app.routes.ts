import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { ModifyInventoryComponent } from './modify-inventory/modify-inventory.component';

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: InventoryComponent},
    {path: 'modify', component: ModifyInventoryComponent},
    {path: 'inventory', component: InventoryComponent}
];
