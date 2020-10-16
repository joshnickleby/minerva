import {Injectable} from '@angular/core'
import {FileAware} from '../shared'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import {Observable, of} from 'rxjs'
import {tap} from 'rxjs/operators'

@Injectable()
export class CacheInterceptor extends FileAware implements HttpInterceptor {
  private cache = new Map<string, any>()

  constructor() {
    super('CacheInterceptor')
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req)
    }

    const cachedResponse = this.cache[req.urlWithParams]

    if (cachedResponse) {
      this.logGroup('Cached response exists!', cachedResponse)

      return of(cachedResponse)
    }

    this.logGroup('No cached response', this.cache)

    return next
      .handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cache[req.urlWithParams] = event
          }
        })
      )
  }
}
