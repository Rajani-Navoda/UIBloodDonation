import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private userAuthService: UserAuthService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get("No_Auth")==="true"){
            return next.handle(req.clone());
        }
        const token = this.userAuthService.getToken();
    
       
       req = this.addToken(req, token);

       return next.handle(req).pipe(
        catchError(
            (err: HttpErrorResponse) => {
                console.log(err.status);
                if(err.status === 401){
                    this.router.navigate(['/login']);
                }else if(err.status === 403){
                    this.router.navigate(['/forbidden']);
                }
                return throwError(() => new Error('Something is wrong'));
            }
        )
       );
    }

    // private addToken(request: HttpRequest<any>, token:string){
    //    const clonedReq = request.clone(
    //         {
    //             setHeaders:{
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }
    //     );
    //     return clonedReq;
    // }

    private addToken(request: HttpRequest<any>, token: string) {
        if (!token) {
            console.warn('No token found');
            return request;
        }
        
        console.log('Adding token to request:', token.substring(0, 20) + '...');
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token.trim()}`
            }
        });
    }
    
}