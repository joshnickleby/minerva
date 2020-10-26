import {Injectable} from '@angular/core'
import {FileAware} from '../shared'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import {Observable} from 'rxjs'
import {CookieService} from 'ngx-cookie-service'
import {tap} from 'rxjs/operators'

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
            const cookiesString = event.headers.get('custom-cookies')

            this.log('Cookies String', cookiesString)

            const cookieStringList = cookiesString.split('||')

            cookieStringList.forEach(cookieString => {
              const cookieParts = cookieString.split(';')

              

              this.cookieService.set(cookieParts[0], cookieParts[1])
            })
          }
        })
      )
  }

}
