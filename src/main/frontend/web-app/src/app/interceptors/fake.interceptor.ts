import {Injectable} from '@angular/core'
import {FileAware} from '../shared'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import {Observable, of} from 'rxjs'

@Injectable()
export class FakeInterceptor extends FileAware implements HttpInterceptor {
  constructor() {
    super('FakeInterceptor')
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('test')) {
      this.log('Testing data')


      const body = {content: 'test'}

      return of(new HttpResponse({status: 200, body: body}))
    }

    this.log('Regular data')

    return next.handle(req)
  }

}
