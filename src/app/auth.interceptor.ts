import { HttpInterceptorFn } from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
    const token = localStorage.getItem('token') ?? '';
    request = request.clone(
        {
            setHeaders: {
                Authorisation: token ? `Token ${token}` : '',
            }
        }
    );
    return next(request);
}