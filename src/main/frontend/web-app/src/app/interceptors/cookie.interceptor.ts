import {Injectable} from '@angular/core'
import {FileAware} from '../shared'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import {Observable} from 'rxjs'
import {CookieService} from 'ngx-cookie-service'
import {tap} from 'rxjs/operators'

interface CustomCookie {
  name: string,
  value: string,
  options: {
    expires?: number | Date
    path?: string
    domain?: string
    secure?: boolean
    sameSite?: 'Lax' | 'None' | 'Strict'
  }
}

@Injectable()
export class CookieInterceptor extends FileAware implements HttpInterceptor {

  constructor(private cookieService: CookieService) {
    super('CookieInterceptor')
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.headers.has('custom-cookies')) {
            const cookieJsonString: string = event.headers.get('custom-cookies')

            this.cookieService.deleteAll()

            const cookies = JSON.parse(cookieJsonString) as CustomCookie[]

            this.logGroup('receiving cookies', cookies)

            cookies.forEach(cookie => {
              const options: {
                expires?: number | Date;
                path?: string;
                domain?: string;
                secure?: boolean;
                sameSite?: 'Lax' | 'None' | 'Strict';
              } = {}

              // the library can't handle the object so I have to parse out null values
              Object.keys(cookie.options).forEach(k => {
                const v = cookie.options[k]

                if (v == null) {
                  options[k] = v
                }
              })
              this.cookieService.set(cookie.name, cookie.value, options)
            })
          }
        })
      )
  }

}
