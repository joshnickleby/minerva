import {Component, Inject} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {tap} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {DOCUMENT} from '@angular/common'

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

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    console.log(document.cookie)
  }

  getCookie() {
    const params: { [param: string]: string | string[] } = {
      form: 'SIMPLE_DATA',
      convert: 'CAMEL_CASE'
    }

    const headers: { [header: string]: string | string[] } = {
      'Modify-Custom-Header': 'DO IT'
    }

    this.data = this.http.get<any>('/api/cookies', {params, headers})
      .pipe(tap(data => {
        console.groupCollapsed('getCookie')
        console.log(data)
        console.groupEnd()
      }))
  }

  addCookie() {
    this.data = this.http.post<any>('/api/cookies?expiration=false', this.cookie)
      .pipe(tap(data => {
        console.groupCollapsed('addCookie')
        console.log(data)
        console.groupEnd()
      }))
  }

  showError() {
    this.http.get('/api/error').subscribe()
  }
}
