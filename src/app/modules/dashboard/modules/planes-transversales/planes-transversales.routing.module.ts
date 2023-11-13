import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanesTransversalesComponent } from './planes-transversales.component';
import { DetallePlanesTransversalesComponent } from './components/detalle-planes-transversales/detalle-planes-transversales.component';

const routes: Routes = [
    {
        path: '',
        component: PlanesTransversalesComponent
    },
    {
        path: 'detallePlanTransversal',
        component: DetallePlanesTransversalesComponent
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlanesTransversalesRoutingModule { }
