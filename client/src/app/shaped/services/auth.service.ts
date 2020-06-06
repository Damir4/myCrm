import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {User} from '../interfaces'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token = null

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }
   
  info() {
    return this.http.get<User>(`/api/auth/info`)
  }

  update(name: string, email:string, image?: File): Observable<User> {
    const fd = new FormData()
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)
    fd.append('email', email)

    return this.http.patch<User>(`/api/auth/update`, fd)
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}