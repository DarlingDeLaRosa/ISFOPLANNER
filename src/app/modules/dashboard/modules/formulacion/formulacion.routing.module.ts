import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulacionComponent } from './formulacion.component';
import { ProductoFormulacionComponent } from './components/producto-formulacion/producto-formulacion.component';
import { ActividadesFormulacionComponent } from './components/actividades-formulacion/actividades-formulacion.component';
import { ActividadesInvolucradosComponent } from './components/actividades-involucrados/actividades-involucrados.component';
import { IndicadoresFormulacionComponent } from './components/indicadores-formulacion/indicadores-formulacion.component';

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
        path: 'indicadores',
        component: IndicadoresFormulacionComponent
    },
    {
        path: 'actividades-involucradas',
        component: ActividadesInvolucradosComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormulacionRoutingModule { }
