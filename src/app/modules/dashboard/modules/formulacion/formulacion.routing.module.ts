import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulacionComponent } from './formulacion.component';
import { ProductoFormulacionComponent } from './components/producto-formulacion/producto-formulacion.component';
import { ActividadesFormulacionComponent } from './components/actividades-formulacion/actividades-formulacion.component';
import { NuevoInsumoComponent } from './modals/nuevo-insumo/nuevo-insumo.component';

const routes: Routes = [
    {
        path: '',
        component: FormulacionComponent
    },
    {
        path: 'producto',
        component: ProductoFormulacionComponent
    },
    {
        path: 'actividad',
        component: ActividadesFormulacionComponent
    },
    {
        path: 'nuevoInsumo',
        component: NuevoInsumoComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormulacionRoutingModule { }
