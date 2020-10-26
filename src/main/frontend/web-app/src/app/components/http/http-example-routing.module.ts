import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {httpComponents} from './index'

const routes: Routes = [
  {path: 'cookies', component: httpComponents.cookies}
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HttpExampleRoutingModule {}
