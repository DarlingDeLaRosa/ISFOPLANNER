import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPanelComponent } from './control-panel.component';
import { MiAreaTrabajoComponent } from './components/mi-area-trabajo/mi-area-trabajo.component';

const routes: Routes = [
    {
        path: '',
        component: ControlPanelComponent
    },
    {
        path: 'miAreaDeTrabajo',
        component: MiAreaTrabajoComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ControlPanelRoutingModule { }
