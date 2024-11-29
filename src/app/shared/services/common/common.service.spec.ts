import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getTenantData', () => {
    expect(service.getTenantData()).toBeNull();
  });

  it('should getCurrentUserData', () => {
    expect(service.getCurrentUserData()).toEqual({});
  });

  it('should setUserData', () => {
    service.setUserData({})
    expect(sessionStorage.getItem('data')).toBeDefined();
  });

  it('should setAccessToken', () => {
    service.setAccessToken('ds')
    expect(sessionStorage.getItem('token')).toBeDefined();
    expect(service.getAccessToken()).toEqual('ds')
  });

  it('should getDecryptedToken', () => {
    service.getDecryptedToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
    console.log('dssd',service.getDecryptedToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'))
    expect(sessionStorage.getItem('data')).toBeDefined();
  });

  it('should logout', () => {
    service.logout();
  });

  it('should resetToken', () => {
    service.setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
    service.resetToken();
    expect(sessionStorage.getItem('token')).toBeNull();
  });
  
});
