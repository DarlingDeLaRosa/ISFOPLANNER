import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoreoComponent } from './monitoreo.component';
import { MatrizMonitoreoComponent } from './components/matriz-monitoreo/matriz-monitoreo.component';
import { ProductoMonitoreoComponent } from './components/producto-monitoreo/producto-monitoreo.component';

const routes: Routes = [
    {
        path: '',
        component: MonitoreoComponent
    },
    {
        path: 'miMatriz',
        component: MatrizMonitoreoComponent
    },
    {
        path: 'productoMonitoreo',
        component: ProductoMonitoreoComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonitoreoRoutingModule { }
