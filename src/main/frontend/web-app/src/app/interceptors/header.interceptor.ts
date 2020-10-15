import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {FileAware} from '../shared'

@Injectable()
export class HeaderInterceptor extends FileAware implements HttpInterceptor {
  constructor() {
    super('HeaderInterceptor')
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('Modify-Custom-Header')) {
      const modified = req.clone({setHeaders: {'Modified-Header': 'This Is Example'}})

      this.logGroup('Modified Headers', modified)

      return next.handle(modified)
    }

    this.log('Unmodified Headers')

    return next.handle(req)
  }
}
