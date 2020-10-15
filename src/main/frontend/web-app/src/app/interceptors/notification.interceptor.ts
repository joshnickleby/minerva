import {Injectable} from '@angular/core'
import {FileAware} from '../shared'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {ToastrService} from 'ngx-toastr'

@Injectable()
export class NotificationInterceptor extends FileAware implements HttpInterceptor {

  constructor(private toaster: ToastrService) {
    super('NotificationInterceptor');
  }

  // todo: Hitting twice for some reason
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(tap(event => {
          if (event instanceof HttpResponse && event.status <= 200 && event.status < 400) {
            this.log('Intercepted')
            this.toaster.success('Successful intercept!')
          } else {
            this.log('Not intercepted')
          }
        })
      )
  }
}
