import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {FileAware} from '../shared'


@Injectable()
export class HttpsInterceptor extends FileAware implements HttpInterceptor {

  constructor() {
    super('HttpsInterceptor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('secure')) {
      const httpsReq = req.clone({
        url: req.url.replace('http://', 'https://')
      })

      this.log('Secure (HTTPS) connection')

      return next.handle(httpsReq)
    }

    this.log('Non-secure (HTTP) connection')

    return next.handle(req)
  }

}
