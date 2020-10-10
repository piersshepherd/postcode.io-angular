/**
 * Provides a mock test class for PostcodeService.
 */

 import { mockLocation } from '../../testing/data';

import { of } from 'rxjs';

export class MockPostcodeService {

    getPostcode(postcode: string) {
        return of(mockLocation)
    }
    
}