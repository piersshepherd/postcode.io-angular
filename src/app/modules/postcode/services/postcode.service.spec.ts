import { TestBed, async, getTestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PostcodeService } from './postcode.service';
import { PostcodeLocation } from '../interfaces/postcode.interface';

// Mock data for tests.
const testPostcode = 'BS20 6QD'
const mockLocation: PostcodeLocation = {
  postcode: testPostcode,
  outcode: 'BS20',
  incode: '6QD',
  quality: 1,
  eastings: 347151,
  northings: 175601,
  country: 'England',
  nhsHa: 'South West',
  adminCounty: null,
  adminWard: 'Portishead South',
  longitude: -2.762365,
  latitude: 51.476885,
  parliamentaryConstituency: 'North Somerset',
  europeanElectoralRegion: 'South West',
  primaryCareTrust: 'North Somerset',
  region: 'South West',
  parish: 'Portishead',
  lsoa: 'North Somerset 003B',
  msoa: 'North Somerset 003',
  ced: null,
  ccg: 'NHS Bristol, North Somerset and South Gloucestershire',
  nuts: 'Bath and North East Somerset, North Somerset and South Gloucestershire',
  codes: {
    adminDistrict: 'E06000024',
    adminCounty: 'E99999999',
    adminWard: 'E05010295',
    parish: 'E04012097',
    parliamentaryConstituency: 'E14000850',
    ccg: 'E38000222',
    ccgId: '15C',
    ced: 'E99999999',
    nuts: 'UKK12',
  }
};
const mockPostcodeResponse = {
  postcode: testPostcode,
  quality: 1,
  eastings: 347151,
  northings: 175601,
  country: "England",
  nhs_ha: "South West",
  longitude: -2.762365,
  latitude: 51.476885,
  european_electoral_region: "South West",
  primary_care_trust: "North Somerset",
  region: "South West",
  lsoa: "North Somerset 003B",
  msoa: "North Somerset 003",
  incode: "6QD",
  outcode: "BS20",
  parliamentary_constituency: "North Somerset",
  admin_district: "North Somerset",
  parish: "Portishead",
  admin_county: null,
  admin_ward: "Portishead South",
  ced: null,
  ccg: "NHS Bristol, North Somerset and South Gloucestershire",
  nuts: "Bath and North East Somerset, North Somerset and South Gloucestershire",
  codes: {
    admin_district: "E06000024",
    admin_county: "E99999999",
    admin_ward: "E05010295",
    parish: "E04012097",
    parliamentary_constituency: "E14000850",
    ccg: "E38000222",
    ccg_id: "15C",
    ced: "E99999999",
    nuts: "UKK12"
  }
}

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
