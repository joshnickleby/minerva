import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {finalize} from 'rxjs/operators'
import {FileAware} from '../shared'

@Injectable()
export class LoaderInterceptor extends FileAware implements HttpInterceptor {

  constructor() {
    super('LoaderInterceptor');
  }

  // bring in the loader
  // one way
  // const loaderService = this.injector.get(LoaderService)

  isLoading = false

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.isLoading = true

    this.log('Loading request - ' + req.urlWithParams)

    return next
      .handle(req)
      .pipe(finalize(() => {
          this.isLoading = true
          this.log('Request loaded - ' + req.urlWithParams)
        })
      )
  }

}
