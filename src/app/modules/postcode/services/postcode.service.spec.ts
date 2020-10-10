import { TestBed, async, getTestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostcodeService } from './postcode.service';
import { mockPostcodeResponse, mockLocation, testPostcode } from '../testing/data';

describe('PostcodeService', () => {
  let injector: TestBed;
  let service: PostcodeService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PostcodeService
      ]
    });
    injector = getTestBed();
    service = injector.get(PostcodeService);
    httpTestingController = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    // Verify that no unmatched requests are outstanding.
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * We're testing to ensure that a postcode is retrieved successfully.
   * - Correct endpoint
   * - Correct HTTP verb
   * - Correct formatting of response
   */
  it('should get a postcode', fakeAsync(() => {

    service.getPostcode(testPostcode).subscribe(res => {
      expect(res).toEqual(mockLocation);
    });

    const request = httpTestingController.expectOne(`https://api.postcodes.io/postcodes/${testPostcode.replace(' ', '')}`);

    expect(request.request.method).toEqual('GET');

    request.flush(mockPostcodeResponse);

  }));
});
