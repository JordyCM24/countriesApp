import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private apiUrl = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) { }

    searchCountryByAlphaCode(code: string): Observable<Country | null> { 
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.http.get<Country[]>(url)
            .pipe(
                map( countries => countries.length > 0 ? countries[0]: null ),
                catchError(() => of(null)) 
            );
    }
    
    // Voy a retornar un Observable de tipo Country[] y al get tambien le paso el tipo de dato que va a retornar
    searchCapital(term: string): Observable<Country[]> { 
        const url = `${this.apiUrl}/capital/${term}`;
        return this.http.get<Country[]>(url)
            .pipe(
                // si no uso la variable error mejor le mando ()
                // devuelvo un array vacio 
                catchError(() => of([]))
            );
    }

    searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`;
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(() => of([]))
            );
    }

    searchRegion(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${term}`;
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(() => of([]))
            );
    }

}