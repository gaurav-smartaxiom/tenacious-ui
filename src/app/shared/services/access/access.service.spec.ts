import { TestBed, getTestBed } from '@angular/core/testing';

import { AccessService } from './access.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonService } from 'src/app/core/services/common.service';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

const fakeCommonService = {
  getCurrentUserData: ()=> {
    return {
      user: {
        id: "5f806aa2d3cfea3d705b6a56",
        fullName: "amol",
        officialEmail: "amolw211@gmail.com",
        password: "27311814e8c2326ef30f7d44f80dd7ce",
        address: "Karve Nagar",
        city: "Pune",
        country: "India",
        state: "Maharashtra",
        zipCode: "411544",
        contactNumber: 8989898989,
        organizationName: "newvisionpvtltd",
        roleId: "5f80682fd3cfea3d705b6a4d",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvZmZpY2lhbEVtYWlsIjoiYW1vbHcyMTFAZ21haWwuY29tIiwiaWQiOiI1ZjgwNmFhMmQzY2ZlYTNkNzA1YjZhNTYiLCJpYXQiOjE2MDI0ODk2MDIsImV4cCI6MTYwMjU3NjAwMn0._KgptHsMBhdAvl8aKZbW62-iTPCGIwQoKZ2U3I0WuEE",
        userLevel: "ADMIN",
        emailVerified: true,
        firstTimeLogin: true,
        domainName: "http://52.156.71.26/#/user-signup?org=newvisionpvtltd",
        accountType: "Enterprise"
    }
    } 
  }
}

const data = [{id: "5f806aa2d3cfea3d705b6a56",
fullName: "amol",
officialEmail: "amolw211@gmail.com",
password: "27311814e8c2326ef30f7d44f80dd7ce",
address: "Karve Nagar",
city: "Pune",
country: "India",
state: "Maharashtra",
zipCode: "411544",
contactNumber: 8989898989,
organizationName: "newvisionpvtltd",
roleId: "5f80682fd3cfea3d705b6a4d",
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvZmZpY2lhbEVtYWlsIjoiYW1vbHcyMTFAZ21haWwuY29tIiwiaWQiOiI1ZjgwNmFhMmQzY2ZlYTNkNzA1YjZhNTYiLCJpYXQiOjE2MDI0ODk2MDIsImV4cCI6MTYwMjU3NjAwMn0._KgptHsMBhdAvl8aKZbW62-iTPCGIwQoKZ2U3I0WuEE",
userLevel: "ADMIN",
emailVerified: true,
firstTimeLogin: true,
domainName: "http://52.156.71.26/#/user-signup?org=newvisionpvtltd",
accountType: "Enterprise"}] as any[]

describe('AccessService', () => {
  let accessService:AccessService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [AccessService,
        {provide:CommonService,useValue:fakeCommonService},
        
      ]
    })
    accessService = TestBed.get(AccessService);
    httpMock = TestBed.get(HttpTestingController);
    
  })

  afterEach(() => {
    httpMock.verify();
  })

  it('should return all user list', () => {
    const {user} = fakeCommonService.getCurrentUserData();
    accessService.getUserManagement().subscribe(
      (res => {
        expect(res).toBeTruthy();
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.userManagement}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    expect(req.request.params.get('organizationName')).toEqual('newvisionpvtltd');
    expect(req.request.params.get('userId')).toEqual('5f806aa2d3cfea3d705b6a56');
    req.flush(data);
  })

  it('should create new user', () => {
    const { user } = fakeCommonService.getCurrentUserData();
    const data = {
      fullName: 'System User',
      userLevel: 'Admin',
      password: "admin@1234",
      address: "Pune",
      contactNumber: '4349349090',
      officialEmail: 'admin@gmail.com',
      id:'123'
    }
    accessService.postUserManagement(data).subscribe(
      (res => {
        expect(res).toBeTruthy();
        expect(res['userLevel']).toEqual('Admin');
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.userManagement}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    expect(req.request.params.get('tenant')).toEqual('newvisionpvtltd');
    req.flush(data);
  })

  it('should delete existing user', () => {
    const { user } = fakeCommonService.getCurrentUserData();
    const deleteData = {
      officialEmail: 'admin@gmail.com',
      id:'123'
    }

    accessService.deleteUserManagement(deleteData).subscribe(
      (res => {
        expect(res).toBeTruthy();
        expect(res['id']).toEqual('123');
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.userManagement}`);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    expect(req.request.params.get('tenant')).toEqual('newvisionpvtltd');
    expect(req.request.params.get('id')).toEqual('123');
    expect(req.request.params.get('username')).toEqual('admin@gmail.com');
    req.flush(deleteData);
  })

  it('should create access level', () => {
    const { user } = fakeCommonService.getCurrentUserData();
    const accessLevelData = {
      type: "admin",
      name: "ADMIN",
      levelname: "ADMIN",
      action: true,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
      createdAt: new Date(),
      permissions:{}
    }

    accessService.createAccessLevel(accessLevelData).subscribe(
      (res => {
        expect(res).toBeTruthy();
        expect(res['levelname']).toEqual('ADMIN');
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.accessControl}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    req.flush(accessLevelData);
  })

  it('should get access level', () => {
    const { user } = fakeCommonService.getCurrentUserData();
    const accessLevelData = [{
      type: "admin",
      name: "ADMIN",
      levelname: "ADMIN",
      action: true,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
      createdAt: new Date(),
      permissions:{}
    },
    {
      type: "user",
      name: "User",
      levelname: "USER",
      action: true,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
      createdAt: new Date(),
      permissions:{}
    }]

    accessService.getAccessLevel().subscribe(
      (res => {
        expect(res).toBeTruthy();
        expect(res[0]?.levelname).toEqual('ADMIN');
        expect(res[1]?.levelname).toEqual('USER');
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.accessControl}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    expect(req.request.params.get('userLevel')).toEqual('ADMIN');
    req.flush(accessLevelData);
  })

  
  it('should delete access level', () => {
    const { user } = fakeCommonService.getCurrentUserData();
    const accessLevelData = {
      id:"123",
      type: "user",
      name: "User",
      levelname: "USER",
      action: true,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
      createdAt: new Date(),
      permissions:{}
    }

    accessService.deleteLevel(accessLevelData).subscribe(
      (res => {
        expect(res).toBeTruthy();
        expect(res['levelname']).toEqual('USER');
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.accessControl}`);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    expect(req.request.params.get('id')).toEqual('123');
    req.flush(accessLevelData);
  })

  it('should delete all access level', () => {
    const { user } = fakeCommonService.getCurrentUserData();
    const accessLevelData = {
      id:"123",
      type: "user",
      name: "User",
      levelname: "USER",
      action: true,
      createdBy: "SYSTEM",
      updatedBy: "SYSTEM",
      createdAt: new Date(),
      permissions:{}
    }

    accessService.deleteAllLevel(accessLevelData).subscribe(
      (res => {
        expect(res).toBeTruthy();
        expect(res['levelname']).toEqual('USER');
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.deleteSelected}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    req.flush(accessLevelData);
  })

  it('should getUserChain', () => {
    const { user } = fakeCommonService.getCurrentUserData();

    accessService.getUserChain().subscribe(
      (res => {
        expect(res).toBeTruthy();
        expect(res[0].fullName).toEqual('amol');
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getUserChain}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    req.flush(data);
  })

  it('should editProfile', () => {
    const { user } = fakeCommonService.getCurrentUserData();
    const body = {
      id: "5f806aa2d3cfea3d705b6a56",
      fullName: "amol",
      officialEmail: "amolw211@gmail.com",
      password: "27311814e8c2326ef30f7d44f80dd7ce",
      address: "Karve Nagar",
      city: "Pune",
      country: "India",
      state: "Maharashtra",
      zipCode: "411544",
    }
    accessService.editProfile(body).subscribe(
      (res => {
        expect(res).toBeTruthy();
        expect(res[0].fullName).toEqual('amol');
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.editProfile}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    req.flush(data);
  })

});
