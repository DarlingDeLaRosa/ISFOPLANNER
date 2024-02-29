
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionSubunidadesComponent } from './asignacion-subunidades.component';

const routes: Routes = [
    {
        path: '',
        component: AsignacionSubunidadesComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsignacionSubunidadesRoutingModule { }
