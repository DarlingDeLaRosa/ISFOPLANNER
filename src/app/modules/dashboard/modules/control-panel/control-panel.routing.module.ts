import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPanelComponent } from './control-panel.component';
import { MiAreaTrabajoComponent } from './components/mi-area-trabajo/mi-area-trabajo.component';
import { LogroProductoUnidadComponent } from './components/logro-producto-unidad/logro-producto-unidad.component';
import { ActividadPrevistasComponent } from './components/actividad-previstas/actividad-previstas.component';
import { ActividadNoPrevistasComponent } from './components/actividad-no-previstas/actividad-no-previstas.component';
import { EjecucionPresupuestariaComponent } from './components/ejecucion-presupuestaria/ejecucion-presupuestaria.component';

const routes: Routes = [
    {
        path: '',
        component: ControlPanelComponent
    },
    {
        path: 'miAreaDeTrabajo',
        component: MiAreaTrabajoComponent,
        children: [
            {
                path: 'logroInstitucional',
                children: [
                    {
                        path: '',
                        component: LogroProductoUnidadComponent,
                        outlet: 'Logros'
                    },
                    {
                        path: 'actPrevistas',
                        component: ActividadPrevistasComponent,
                        outlet: 'Logros'
                    },
                    {
                        path: 'actNoPrevistas',
                        component: ActividadNoPrevistasComponent,
                        outlet: 'Logros'
                    }
                ]
            }
            , {
                path: 'ejecucionPresupuestaria',
                children: [
                    {
                        path: '',
                        component: EjecucionPresupuestariaComponent,
                        outlet: 'Logros'
                    }
                ]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ControlPanelRoutingModule { }
