import { HttpInterceptorFn } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { RequestCache } from '../../shared/services/request-cache/request-cache.service';
import { inject } from '@angular/core';

export const cachingInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const cache = inject(RequestCache); // Adjust to inject your cache service
  const UrlList = ['dashboard'];
  const skipGetURL: any[] = [];

  const checkInList = (url: string) => UrlList.some((URL) => url.includes(URL));
  const checkInSkipList = (url: string) => skipGetURL.some((URL) => url.includes(URL));

  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cache.get(req);
  if (cachedResponse) {
    return of(cachedResponse);
  }

  const tempCachedResponse = cache.getTemp(req);
  if (tempCachedResponse) {
    sendRequest(req, next, cache, checkInList, checkInSkipList);
    return of(tempCachedResponse);
  }

  return sendRequest(req, next, cache, checkInList, checkInSkipList);
};

const sendRequest = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  cache: RequestCache,
  checkInList: (url: string) => boolean,
  checkInSkipList: (url: string) => boolean
): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && checkInList(req.url)) {
        if (!checkInSkipList(req.url)) {
          cache.put(req, event);
        } else {
          cache.delete(req, event, req.url);
        }
      }
    })
  );
};
