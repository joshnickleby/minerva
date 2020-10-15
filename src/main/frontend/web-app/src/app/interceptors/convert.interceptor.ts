import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import {Observable} from 'rxjs'
import {FileAware} from '../shared'
import {map} from 'rxjs/operators'
import {mapKeys, camelCase} from 'lodash'

@Injectable()
export class ConvertInterceptor extends FileAware implements HttpInterceptor {

  convertMap = {
    CAMEL_CASE: (event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const camelCaseObject = mapKeys(event.body, (v, k) => camelCase(k))

        return event.clone({ body: camelCaseObject })
      }
    }
  }

  constructor() {
    super('ConvertInterceptor');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.logGroup('', req);

    if (req.params.has('convert')) {
      const convertType = req.params.get('convert')
      this.logGroup('', req);

      this.log(`Converted to type: ${convertType}`)

      const fn = this.convertMap[convertType]
      req.params.delete('convert')
      return next.handle(req).pipe(map(fn))
    }

    this.log('No conversion')

    return next.handle(req)
  }

}
