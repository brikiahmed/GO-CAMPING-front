import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../_models/user.model';
import {BASE_API, CONNECTED_USER, REGISTER} from '../_globals/vars';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  register(user: UserModel) {
    return this.http.post(BASE_API + REGISTER, user);
  }

  getCurrentUser() {
    return this.http.get(BASE_API + CONNECTED_USER);
  }
}
