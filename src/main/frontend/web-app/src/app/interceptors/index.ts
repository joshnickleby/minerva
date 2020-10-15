import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {HttpsInterceptor} from './https.interceptor'
import {LoaderInterceptor} from './loader.interceptor'
import {ConvertInterceptor} from './convert.interceptor'
import {HeaderInterceptor} from './header.interceptor'
import {NotificationInterceptor} from './notification.interceptor'

export const HTTP_INTERCEPTOR_PROVIDERS = [
  {provide: HTTP_INTERCEPTORS, useClass: ConvertInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true}
]
