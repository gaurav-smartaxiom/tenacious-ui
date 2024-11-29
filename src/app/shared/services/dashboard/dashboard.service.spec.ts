import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from 'src/app/core/services/api.service';
// import { fail } from 'assert';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from 'src/app/core/services/common.service';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;
  let fakeSocket: Partial<Socket>;

  fakeSocket = {
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
    

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[DashboardService,
        { provide: CommonService, useValue: fakeCommonService },
        {provide:Socket,useValue:fakeSocket}
       ]
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  })


  it('should update first time login status', () => {
    const user = {
      officialEmail:"amolw211@gmail.com",
      id: '123',
      firstTimeLoginStatus:true
    }
    service.setFirstTimeLoginStatus(user).subscribe(
      (res => {
        expect(res).toBeTruthy();
        expect(res['firstTimeLoginStatus']).toEqual(true);
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.firstTimeLogin}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    expect(req.request.params.get('userId')).toEqual('123');
    req.flush(user);

  });

  it('should give an error if first time login status fails', () => {
    const user = {
      officialEmail:"amolw211@gmail.com",
      id: '123',
      firstTimeLoginStatus:true
    }
    service.setFirstTimeLoginStatus(user).subscribe(
      (res => {
        fail('should fail to update status')
      }),
     ((error:HttpErrorResponse) => {
       expect(error.status).toEqual(500);
       expect(error.statusText).toEqual('Internal Server Error');
      })
    )
    const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.firstTimeLogin}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
    expect(req.request.params.get('userId')).toEqual('123');
    req.flush('First time login status fail',{status:500,statusText:'Internal Server Error'});

  });

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

it('should return all totaldevice', () => {
  const data = 1;
  service.getTotalDevices().subscribe(res => {
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  })
  
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getTotalDevices}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  console.log(req.request.body)
  req.flush(data);
})

it('should return all totalprovisions', () => {
  const data = 1;
  service.getTotalProvisons().subscribe(res => {
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  });

  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getTotalProvisons}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  req.flush(data);
})

  it('should return all TotalBlocklock', () => {
    const data = 1;
    service.getTotalBlocklock().subscribe(res => {
      expect(res).toBeTruthy();
      expect(res).toEqual(data);
  });

  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getTotalBlocklock}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  req.flush(data);
})

it('should return all TotalBlocklock', () => {
  const type = "hourly";
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  service.getTotalEventByDuration(type).subscribe((res => {
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  }));
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getTotalEventByDuration}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  expect(req.request.params.get('duration')).toEqual('hourly');
  req.flush(data);
})

it('should return all getSparklineGraph', () => {
  const type = "hourly";
  const data = [0, 0, 0];
  service.getSparklineGraph(type).subscribe(res => {
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  });
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getSparklineGraph}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  expect(req.request.params.get('type')).toEqual('hourly');
  req.flush(data);
})

  it('should return all getTotalDevicesGraph', () => {
    const type = 'hourly';
    const data = {"ArrayEnd":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"ArrayEdge":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
  service.getTotalDevicesGraph(type).subscribe(res => {
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
});
  
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getTotalDevicesGraph}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  expect(req.request.params.get('duration')).toEqual('hourly');
  req.flush(data);
})

it('should return all getAverageSensorGraph', () => {
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const type = 'hourly';
  service.getAverageSensorGraph(type,'Temp&Hum').subscribe(res => {
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  });
  
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getAverageSensorGraph}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  expect(req.request.params.get('duration')).toEqual('hourly');
  req.flush(data);
})

it('should return all getSensorEvents', () => {
  const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const type = 'hourly';
  service.getSensorEvents(type,'Temp').subscribe(res => {
    expect(res).toBeTruthy();
    expect(res).toEqual(data);
  });
  
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getSensorEvents}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  expect(req.request.params.get('duration')).toEqual('hourly');
  expect(req.request.params.get('sensorType')).toEqual('Temp');
  req.flush(data);
})
  
it('should getImage', () => {
  service.getImage().subscribe(res => {
    expect(res).toBeTruthy();
  });
  
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.profileImage}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  expect(req.request.params.get('userId')).toEqual('5f806aa2d3cfea3d705b6a56');
  req.flush(new Blob());
})
  
it('should getImageBase64', () => {
  service.getImageBase64().subscribe(res => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
  });
  
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.profileImage}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  expect(req.request.params.get('userId')).toEqual('5f806aa2d3cfea3d705b6a56');
  req.flush({});
})
 
it('should getAllUsers', () => {
  service.getAllUsers().subscribe(res => {
    expect(res).toBeTruthy();
    expect(res).toEqual([{}]);
  });
  
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getNewUsers}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  req.flush([{}]);
})
  
it('should getUIReleaseVersion', () => {
  service.getUIReleaseVersion().subscribe(res => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
  });
  
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getUIReleaseVersion}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  req.flush({});
})
  
it('should getBLReleaseVersion', () => {
  service.getBLReleaseVersion().subscribe(res => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
  });
  
  const req = httpMock.expectOne(req => req.url == `${ApiService.URLs.getBlReleaseVersion}`);
  expect(req.request.method).toEqual('GET');
  expect(req.request.params.get('email')).toEqual('amolw211@gmail.com');
  req.flush({});
})
  
it('should connectSocket', () => {
  service.connectSocket()
})

it('should requestCounts', () => {
  expect(service.requestCounts()).toBeUndefined()
})

it('should requestEdgeChainCount', () => {
  service.requestEdgeChainCount().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})
  
it('should requestActiveEdgeCount', () => {
  service.requestActiveEdgeCount().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should activeEdgeCount', () => {
  service.activeEdgeCount().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should requestEndPointCount', () => {
  service.requestEndPointCount().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should endPointCount', () => {
  service.endPointCount().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

  
it('should requestProvisionEndPointCount', () => {
  service.requestProvisionEndPointCount().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should provisionEndPointCount', () => {
  service.provisionEndPointCount().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should requestEventCount', () => {
  service.requestEventCount().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should eventCount', () => {
  service.eventCount().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should requestSparkLine', () => {
  service.requestSparkLine('').subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})


it('should usersSparklineGraph', () => {
  service.usersSparklineGraph().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should eventsSparklineGraph', () => {
  service.eventsSparklineGraph().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should activeEndpointsSparklineGraph', () => {
  service.activeEndpointsSparklineGraph().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should provisioningQueueSparklineGraph', () => {
  service.provisioningQueueSparklineGraph().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should totalEndpointsSparklineGraph', () => {
  service.totalEndpointsSparklineGraph().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should requestEventByDuration', () => {
  service.requestEventByDuration('').subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should eventByDuration', () => {
  service.eventByDuration().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})


it('should requestDeviceByDuration', () => {
  service.requestDeviceByDuration('').subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should deviceByDuration', () => {
  service.deviceByDuration().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})
  
it('should requestAverageSensorData', () => {
  service.requestAverageSensorData('','','','').subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should averageSensorData', () => {
  service.averageSensorData().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should requestSensorEventsData', () => {
  service.requestSensorEventsData('','','','').subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should sensorEventsData', () => {
  service.sensorEventsData().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should requestEvents', () => {
  service.requestEvents().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should requestSensorList', () => {
  service.requestSensorList().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should receiveEvents', () => {
  service.receiveEvents().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should reciveSensor', () => {
  service.reciveSensor().subscribe((res) => {
    expect(res).toBeTruthy();
    expect(res).toEqual({});
    })
})

it('should disconnectSocket', () => {
  service.disconnectSocket();
})
  
});
