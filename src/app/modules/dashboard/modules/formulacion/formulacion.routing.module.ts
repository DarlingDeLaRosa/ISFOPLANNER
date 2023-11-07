import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulacionComponent } from './formulacion.component';

const routes: Routes = [
    {
        path: '',
        component: FormulacionComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormulacionRoutingModule { }
