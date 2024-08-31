import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private apiUrl: string = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital: { term: '', countries: []},
        byCountries: { term: '', countries: []},
        byRegion: { region: '', countries: []},
    }

    constructor(private http: HttpClient) { }

    // Voy a retornar un Observable de tipo Country[] y al get tambien le paso el tipo de dato que va a retornar
    private getCountriesRequest(url: string): Observable<Country []> {
        return this.http.get<Country[]>(url)
        .pipe(
            // si no uso la variable error mejor le mando ()
            // devuelvo un array vacio 
            catchError(() => of([])),
            //delay( 2000 )
        );
    }

    searchCountryByAlphaCode(code: string): Observable<Country | null> { 
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.http.get<Country[]>(url)
            .pipe(
                map( countries => countries.length > 0 ? countries[0]: null ),
                catchError(() => of(null)) 
            );
    }
    
    searchCapital(term: string): Observable<Country[]> { 
        const url = `${this.apiUrl}/capital/${term}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => this.cacheStore.byCapital = {term, countries})
        );
    }

    searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => this.cacheStore.byCountries = {term, countries})
        );
    }

    searchRegion(region: Region): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${region}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => this.cacheStore.byRegion = {region, countries})
        );
    }

}