import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {httpComponents} from './index'
import {HttpExampleRoutingModule} from './http-example-routing.module'

@NgModule({
  declarations: [...httpComponents.all],
  imports: [
    HttpExampleRoutingModule,
    CommonModule
  ]
})
export class HttpExampleModule {
}
