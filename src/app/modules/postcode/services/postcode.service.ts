import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { PostcodeLocation } from '../interfaces/postcode.interface';

@Injectable()
export class PostcodeService {

  postcodeApi = environment.postcodeIO.api;

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Given a postcode string, return an observable of location data for the postcode.
   */
  getPostcode(postcode: string): Observable<PostcodeLocation> {
    // We'll trim the spaces from the postcode for simplicity.
    const url = this.buildUrl(['postcodes', this.cleanPostcode(postcode)]);
    return this.http.get(url).pipe(
      map(response => this.extractResult(response)),
      map(response => this.formatResponseData(response)),
      catchError(this.handleError),
    );
  }

  /**
   * Given a postcode string, return an observable of location data for nearby locations.
   */
  getNearestPostcodes(postcode: string): Observable<any> {
    // We'll trim the spaces from the postcode for simplicity.
    const url = this.buildUrl(['postcodes', this.cleanPostcode(postcode), 'nearest']);
    return this.http.get(url);
  }

  /**
   * Given an array of path components, return a URL suitable
   * for use with the postcodes.io endpoint.
   * 
   * @note Its likely that a function like this would be used in
   *   multiple places in a larger app. It would make sense to
   *   refactor this into a seperate utility service.
   */
  private buildUrl(pathComponents: string[]): string {
    // We simply need to combine the postcode endpoint with path components
    // into an array and join the values with a forward slash.
    return [
      this.postcodeApi,
      ...pathComponents
    ].join('/')
  }

  /**
   * Given a postcode, clean it up (remove spaces);
   */
  private cleanPostcode(postcode: string): string {
    return postcode.replace(' ', '');
  }

  /**
   * Explicitly build a location object. Lets not reply on a third party
   * services to remain consitent. Here we can put in safeguards.
   */
  private formatResponseData(res: any): PostcodeLocation {
    return {
      postcode: res.postcode,
      outcode: res.outcode,
      incode: res.incode,
      quality: res.quality,
      eastings: res.eastings,
      northings: res.northings,
      country: res.country,
      nhsHa: res.nhs_ha,
      adminCounty: res.admin_county,
      adminWard: res.admin_ward,
      longitude: res.longitude,
      latitude: res.latitude,
      parliamentaryConstituency: res.parliamentary_constituency,
      europeanElectoralRegion: res.european_electoral_region,
      primaryCareTrust: res.primary_care_trust,
      region: res.region,
      parish: res.parish,
      lsoa: res.lsoa,
      msoa: res.msoa,
      ced: res.ced,
      ccg: res.ccg,
      nuts: res.nuts,
      codes: {
        adminDistrict: res.codes.admin_district,
        adminCounty: res.codes.admin_county,
        adminWard: res.codes.admin_ward,
        parish: res.codes.parish,
        parliamentaryConstituency: res.codes.parliamentary_constituency,
        ccg: res.codes.ccg,
        ccgId: res.codes.ccg_id,
        ced: res.codes.ced,
        nuts: res.codes.nuts,
      }
    }
  }

  /**
   * Extract results from postcode.io http responses.
   */
  private extractResult(res: any): any {
    return res.result;
  }

  /**
   * Handle response errors.
   *
   * @note This is essentially a copy and paste from the angular docs.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
