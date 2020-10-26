import {Component, Inject} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {tap} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {DOCUMENT} from '@angular/common'
import {CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'web-app'

  data: Observable<any>

  cookie = {
    key: '',
    value: ''
  }

  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document,
              private cookieService: CookieService) {

  }

  getSimpleCookie() {
    const params: { [param: string]: string | string[] } = {
      form: 'SIMPLE_DATA',
      convert: 'CAMEL_CASE'
    }

    const headers: { [header: string]: string | string[] } = {
      'Modify-Custom-Header': 'DO IT',
      'Enable-Auth': 'true'
    }

    this.data = this.http.get<any>('/api/cookies', {params, headers, observe: 'response', withCredentials: true})
      .pipe(tap(data => {
        console.groupCollapsed('getSimpleCookie')
        console.log(data)
        console.groupEnd()
      }))
  }

  getComplexCookie() {
    const params: { [param: string]: string | string[] } = {
      form: 'COMPLEX_DATA',
      convert: 'CAMEL_CASE'
    }

    const headers: { [header: string]: string | string[] } = {
      'Modify-Custom-Header': 'DO IT',
      'Enable-Auth': 'true'
    }

    this.data = this.http.get<any>('/api/cookies', {params, headers, observe: 'response', withCredentials: true})
      .pipe(tap(data => {
        console.groupCollapsed('getComplexCookie')
        console.log(data)
        console.groupEnd()
      }))
  }

  checkCookies() {

    console.log('check cookies', this.cookieService.check('Simple-Cookie'))
    console.log('cookie list', this.cookieService.getAll())
  }

  showError() {
    this.http.get('/api/error').subscribe()
  }
}
