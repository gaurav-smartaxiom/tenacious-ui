import { TestBed, getTestBed } from '@angular/core/testing';

import { EndPointService } from './end-point.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonService } from 'src/app/core/services/common.service';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';

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

const fakeSocket = {
  ioSocket: {
    io: {
      opts: {
        query:{}
      }
    }
  },
  connect: () => { },
  emit: () => {
    return of({})
  },
  fromEvent() {
    return of({}) as any
  },
  disconnect:()=>{}
  
};

describe('EndPointService', () => {
  let endPointService:EndPointService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
        FormsModule],
      providers: [EndPointService,
        { provide: CommonService, useValue: fakeCommonService },
        {provide:Socket,useValue:fakeSocket}
      ]
    })
    endPointService = TestBed.inject(EndPointService);
    httpMock = TestBed.inject(HttpTestingController);

  })

  afterEach(() => {
    httpMock.verify();
  })

  it('should return all end-point list', () => {
   let response = [{"id":"5ff34e0a710cd75ce966c704","index":1,"previousHash":"96ed975535f955ee53d7b5730fa03b75e8da476a54e3edc60257c56c3c64a78c","timestamp":1609307771,"data":{"client_id":"Renesas Semiconductor","mac_addr":"00:11:22:33:44:55","mfg_name":"SmartAxiom, Inc","model_name":"EK-RA6M3","serial_number":"R7FA6M3AH32BD","sw_ver":2,"boot_rom_ver":1,"Firmware":null,"token":"3692283f1507f801e60077704caa9d0f14df74b5acc88f95aebf92ff1a053ad2","active":true,"deviceUUID":"cab-209f38922bf6","blSerialNumber":"36fbc0a0-35ea-11eb-966b-6b54eb76d8fe36fbe7b0-35ea-11eb-966b-6b54eb76d8fe","genesisBlk":"b8698fe97512bb82766aaf2f5646d706593da96a16a12f62dc3032ae5f113783"},"currentHash":"c919910b285e7793df5039d3b8da18c165823d57e083740a7251afc4c1523a4d","isModified":0}]
    endPointService.getAllEndPoint().subscribe(
     (res => {
      expect(res).toBeTruthy();
      expect(res[0].id).toEqual("5ff34e0a710cd75ce966c704");
      expect(res[0].data).toBeTruthy();
      expect(res[0].data['client_id']).toEqual("Renesas Semiconductor");
     })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.endPointManagement}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    req.flush(response);
  })

  it('should give an error when all endpoint list fail', () => {
    const { user } = fakeCommonService.getCurrentUserData();
    endPointService.getAllEndPoint().subscribe(
      (res => {
        fail('all endpoint list fail');
      }),
        ((error: HttpErrorResponse) => {
          expect(error.status).toEqual(500);
          expect(error.statusText).toEqual("internal server error");
     })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.endPointManagement}`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('email')).toEqual(user.officialEmail);
    req.flush("get all endpoint fail",{status:500,statusText:'internal server error'});
  })

  it('should getEndPointById', () => {
    let response = [{ id: '1' }];
    const arrId = ['1'];
     endPointService.getEndPointById(arrId).subscribe(
      (res => {
       expect(res).toBeTruthy();
       expect(res[0].id).toEqual("1");
      })
     )
     const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.endPointManagement}`);
     expect(req.request.method).toEqual('GET');
     expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
     req.flush(response);
  })
  
  it('should deleteEndpoint', () => {
    let response = [{ id: '1' }];
    const arrId = ['1'];
     endPointService.deleteEndpoint(arrId).subscribe(
      (res => {
       expect(res).toBeTruthy();
       expect(res[0].id).toEqual("1");
      })
     )
     const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.deleteEndPointManagement}`);
     expect(req.request.method).toEqual('POST');
     expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
     req.flush(response);
   })

   it('should updateEndpoint', () => {
    let response = [{ id: '1' }];
    const body = {id:'1'}
     endPointService.updateEndpoint(body).subscribe(
      (res => {
       expect(res).toBeTruthy();
       expect(res['id']).toEqual("1");
      })
     )
     const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.updateEndPointManagement}`);
     expect(req.request.method).toEqual('POST');
     expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
     req.flush(body);
   })
  
   it('should activateEndpoint', () => {
    let response = [{ id: '1' }];
    const body = {id:'1'}
     endPointService.activateEndpoint(body).subscribe(
      (res => {
       expect(res).toBeTruthy();
       expect(res['id']).toEqual("1");
      })
     )
     const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.activateEndPointManagement}`);
     expect(req.request.method).toEqual('POST');
     expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
     req.flush(body);
   })
  
   it('should getEndPointByStatus', () => {
    let response = [{ id: '1' }];
    const status = false
     endPointService.getEndPointByStatus(status).subscribe(
      (res => {
       expect(res).toBeTruthy();
       expect(res[0]['id']).toEqual("1");
      })
     )
     const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.endPointManagement}`);
     expect(req.request.method).toEqual('GET');
     expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
     req.flush(response);
   })

   it('should connectSocket', () => {
    endPointService.connectSocket()
  })
  
  it('should requestEvents', () => {
    endPointService.requestEvents().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual({});
      })
  })
  
  it('should receiveEvents', () => {
    endPointService.receiveEvents().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual({});
      })
  })
  
  it('should disconnectSocket', () => {
    endPointService.disconnectSocket();
  })
  
  it('should getEndpointByDeviceUUID', () => {
    let response = [{ id: '1' }];
    const body = {id:'1'}
     endPointService.getEndpointByDeviceUUID(body.id).subscribe(
      (res => {
       expect(res).toBeTruthy();
       expect(res['id']).toEqual("1");
      })
     )
     const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.endPointManagementById}`);
     expect(req.request.method).toEqual('GET');
     expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
     req.flush(body);
   })

});
