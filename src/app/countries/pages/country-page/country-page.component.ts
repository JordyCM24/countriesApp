import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.countryService.searchCountryByAlphaCode( id) )
      ) //se desestructura los parametros para obtener el id
      .subscribe( country => {
        if ( !country ) return this.router.navigateByUrl('');
        return this.country = country;
      })

    
    /* this.activatedRoute.params
    .subscribe(({id}) => {
      //console.log({param: id});
      this.countryService.searchCountryByAlphaCode(id)
        .subscribe(country => {
          console.log({country});
        })

    }) */
    /* (params) => {
      console.log({params: params['id']});
    } */ //toma de la definicio Param de la ruta
  }


}
