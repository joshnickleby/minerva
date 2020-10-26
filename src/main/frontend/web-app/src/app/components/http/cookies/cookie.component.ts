import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {CookieService} from 'ngx-cookie-service'
import {tap} from 'rxjs/operators'

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.sass']
})
export class CookieComponent {

  data: Observable<any>

  cookieServiceCookies: { [key: string]: string } = {}

  constructor(private http: HttpClient,
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
    this.cookieServiceCookies = this.cookieService.getAll()
  }

  showError() {
    this.http.get('/api/error').subscribe()
  }

}
