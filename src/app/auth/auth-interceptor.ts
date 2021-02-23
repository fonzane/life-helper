import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.token;

        if(authToken) {
            const user: {_id: string, email: string, name: string} = jwtDecode(authToken)['user'];
            const authReq = req.clone({
                headers: req.headers.set('userID', user._id)
            })
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}