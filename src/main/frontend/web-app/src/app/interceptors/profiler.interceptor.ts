import {Injectable} from '@angular/core'
import {FileAware} from '../shared'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import {Observable} from 'rxjs'
import {finalize, tap} from 'rxjs/operators'

@Injectable()
export class ProfilerInterceptor extends FileAware implements HttpInterceptor {
  constructor() {
    super('ProfilerInterceptor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now()
    let ok: string

    return next
      .handle(req)
      .pipe(
        tap(
          event => (ok = event instanceof HttpResponse ? 'succeeded' : 'failed' ),
          _ => (ok = 'failed')
        ),
        finalize(() => {
          const elapsed = Date.now() - started
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`
          this.log(msg)
        })
      )
  }

}
