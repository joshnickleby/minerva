import {Injectable} from '@angular/core'
import {FileAware} from '../shared'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {ToastrService} from 'ngx-toastr'
import {catchError, retry} from 'rxjs/operators'

@Injectable()
export class ErrorInterceptor extends FileAware implements HttpInterceptor {
  constructor(private toaster: ToastrService) {
    super('Error Interceptor')
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        retry(2),
        catchError((error) => {
          this.log('ERROR')
          this.toaster.error(error.message)
          return throwError(error)
        })
      )
  }
}
