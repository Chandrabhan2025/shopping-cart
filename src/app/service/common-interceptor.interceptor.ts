import { HttpInterceptorFn } from '@angular/common/http';

export const commonInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/login')) {
    return next(req);
  }

  if(req.url.includes('/update-user')){
    return next(req);
  }

  const token = localStorage.getItem("token");

  if (token) {
    const cloneReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloneReq);
  }
  return next(req);
};
