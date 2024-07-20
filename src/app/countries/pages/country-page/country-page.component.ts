import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(({id}) => {
      //console.log({param: id});
      this.countryService.searchCountryByAlphaCode(id)
        .subscribe(country => {
          console.log({country});
        })

    })


    /* (params) => {
      console.log({params: params['id']});
    } */ //toma de la definicio Param de la ruta
  }


}
