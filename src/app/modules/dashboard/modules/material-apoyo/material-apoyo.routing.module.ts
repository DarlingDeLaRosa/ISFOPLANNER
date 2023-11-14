import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialApoyoComponent } from './material-apoyo.component';

const routes: Routes = [
    {
        path: '',
        component: MaterialApoyoComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaterialDeApoyoRoutingModule { }
