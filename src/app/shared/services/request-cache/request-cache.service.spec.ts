import { TestBed } from '@angular/core/testing';

import { RequestCache } from './request-cache.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('RequestCacheService', () => {
  let service: RequestCache;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(RequestCache);
    service.cache = new Map();
    service.tempCache = new Map();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get request cache', () => {
    let req = {urlWithParams:'',method:'POST'} as any
    expect(service.get(req)).toBeUndefined();
  });

  it('should get request cache', () => {
    let req = { urlWithParams: '', method: 'POST' } as any
    expect(service.getTemp(req)).toBeUndefined();
  });

  it('should getTemp request cache', () => {
    let req = { urlWithParams: '', method: 'POST' } as any
    expect(service.getTemp(req)).toBeUndefined();
  });

  it('should put request cache', () => {
    let req = { url: '', method: 'POST' } as any
    let res = {} as any;
    expect(service.put(req,res)).toBeUndefined();
  });

  it('should delete request cache', () => {
    let req = { url: '', method: 'POST' } as any
    let res = {} as any;
    expect(service.delete(req,res,{})).toBeUndefined();
  });

  //put
  //get

});
