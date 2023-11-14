import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento.component';

const routes: Routes = [
    {
        path: '',
        component: MantenimientoComponent,
        // children: [
        //     { path: 'ejes', component: MantenimientoComponent, outlet: 'mantenimiento' },
        //     { path: 'estrategias', outlet: 'mantenimiento' },
        //     { path: 'resultadoEfecto', outlet: 'mantenimiento' },
        //     { path: 'indicadores', outlet: 'mantenimiento' },
        //     { path: 'productos', outlet: 'mantenimiento' },
        //     { path: 'estructuraProgramatica', outlet: 'mantenimiento' },
        //     { path: 'actividades', outlet: 'mantenimiento' },
        //     { path: 'usuarios', outlet: 'mantenimiento' },
        // ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
