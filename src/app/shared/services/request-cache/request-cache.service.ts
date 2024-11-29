import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge = 2 * 60 * 1000;
@Injectable({
  providedIn: 'root'
})
export class RequestCache {

  cache = new Map();
  tempCache = new Map();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    if (req.method != "GET") {
        return undefined;
    }
    const cached = this.cache.get(url);
    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  getTemp(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.tempCache.get(url);
    if (!cached) {
      return undefined;
    }
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);
    this.tempCache.delete(url);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
        // console.log("expiredEntry", expiredEntry);
      if (expiredEntry.lastRead < expired) {
        console.log("should expire Entry", expiredEntry.url);
        this.cache.delete(expiredEntry.url);
        this.tempCache.set(expiredEntry.url, expiredEntry);
      }
    });
  }

  delete(req: HttpRequest<any>, response: HttpResponse<any>, urlList: any): void {
    const url = req.url;
    // this.cache.delete(url);
    this.cache.forEach((value, key) => {
      for (const iterator of urlList) {
        if(key.indexOf(iterator) != -1 && req.url.indexOf(iterator) != -1) {
          this.cache.delete(key);
        }
      }
    })
  }
}
