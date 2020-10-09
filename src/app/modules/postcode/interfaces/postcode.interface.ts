/**
 * Interface definitions for Postcode functionality.
 */

export interface Codes {
    adminDistrict: string;
    adminCounty: string;
    adminWard: string;
    parish: string;
    parliamentaryConstituency: string;
    ccg: string;
    ccgId: string;
    ced: string;
    nuts: string;   
}


export interface PostcodeLocation {
    postcode: string;
    outcode: string;
    incode: string;
    quality: number;
    eastings: number | null;
    northings: number | null;
    country: string;
    nhsHa: string | null;
    adminCounty: string | null;
    adminWard: string | null;
    longitude: number | null;
    latitude: number | null;
    parliamentaryConstituency: string | null;
    europeanElectoralRegion: string | null;
    primaryCareTrust: string | null;
    region: string | null;
    parish: string | null;
    lsoa: string | null;
    msoa: string | null;
    ced: string | null;
    ccg: string | null;
    nuts: string | null;
    codes: Codes;
}
