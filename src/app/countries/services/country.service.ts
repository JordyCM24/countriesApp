import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    private apiUrl = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) { }

    // Voy a retornar un Observable de tipo Country[] y al get tambien le paso el tipo de dato que va a retornar
    searchCapital(term: string): Observable<Country[]> { 
        const url = `${this.apiUrl}/capital/${term}`;
        return this.http.get<Country[]>(url)
    }

}