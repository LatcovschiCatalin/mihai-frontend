import {HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AUTH_LOCAL_TOKEN_KEY} from "../../auth/auth.constants";

@Injectable()
export class AccessTokenService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem(AUTH_LOCAL_TOKEN_KEY)}`
  })

}
