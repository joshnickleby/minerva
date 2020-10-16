import {Injectable} from '@angular/core'
import {FileAware} from '../shared'
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http'
import {BehaviorSubject, Observable, of, throwError} from 'rxjs'
import {catchError, filter, finalize, switchMap, take, tap} from 'rxjs/operators'

@Injectable()
export class AuthInterceptor extends FileAware implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization'
  private token = 'secret'
  private refreshTokenInProgress = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  private refreshNumber = 0

  constructor() {
    super('AuthInterceptor')
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      })
    }

    if (!req.headers.has('Enable-Auth')) {
      this.log('Authentication not enabled')
      return next.handle(req)
    }

    req = this.addAuthenticationToken(req)

    this.logGroup('Adding authentication REQUEST', req.headers)

    return next.handle(req)
      .pipe(
        tap((res: HttpResponse<any>) => {
          res?.headers?.keys()
          this.logGroup('Authentication: beginning chain', res)
        }),
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 401) {
            // 401 errors most likely happen due to an expired token that we can refresh
            if (this.refreshTokenInProgress) {
              // wait until refreshTokenSubject has a non-null value which means the new token is ready and we can retry the request
              return this.refreshTokenSubject.pipe(
                filter(result => !result),
                take(1),
                switchMap(() => next.handle(this.addAuthenticationToken(req)))
              )
            } else {
              this.refreshTokenInProgress = true

              // set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
              this.refreshTokenSubject.next(null)

              return this.refreshAccessToken()
                .pipe(
                  switchMap((success: boolean) => {
                    this.refreshTokenSubject.next(success)
                    return next.handle(this.addAuthenticationToken(req))
                  }),
                  // when the call to refreshToken completes we reset the refreshTokenInProgress to false
                  // for the next time the token needs to be refreshed
                  finalize(() => (this.refreshTokenInProgress = false))
                )
            }
          } else {
            throwError(error)
          }
        })
      )
  }


  private refreshAccessToken(): Observable<any> {
    this.refreshNumber++

    return of('secret ' + this.refreshNumber)
  }

  private addAuthenticationToken(req: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    return this.token ? req.clone({
      headers: req.headers.set(this.AUTH_HEADER, `Bearer ${this.token}`)
    }) : req
  }
}
