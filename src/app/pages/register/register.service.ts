import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  get windowRef() {
    return window;
  }

  public fetchAllCountries() {
    return this.http.get('/auth/findCountries').map(res => res.json());
  }

  public fetchAllStates(country: string) {
    let params = new URLSearchParams();
    params.append('country', country);
    let options = new RequestOptions({search: params.toString()});

    return this.http.get('/auth/fetchAllStates', options).map(res => res.json());
  }

  public saveUser(values: Object) {
    delete values['confPass'];
    return this.http.post('/auth/register', values).map(res => res.json());
  }

  public getUsersFromFirebase() {
    return this.http.get('/auth/fetchAllUsers').map(res => res.json());
  }

  public getTradingExperience() {
    return [
      {itemName: "0", id: 0},
      {itemName: "1-5", id: 1},
      {itemName: "6-10", id: 2},
      {itemName: "10+", id: 3}
    ];
  }

  public getTradeTimes() {
    return [
      {itemName: "0", id: 0},
      {itemName: "1-10", id: 1},
      {itemName: "10-50", id: 2},
      {itemName: "50+", id: 3}
    ];
  }

  public getBrokerageAccOption() {
    return [
      { itemName: "Yes", id: 0 },
      { itemName: "No", id: 1 }
    ];
  }

  public getInterest() {
    return [
      { itemName: 'Equities', id: 0 },
      { itemName: 'Options', id: 1 },
      { itemName: 'Futures', id: 2 },
      { itemName: 'Forex', id: 3 },
      { itemName: 'Exchange-traded funds(ETFs)', id: 4 }
    ];
  }

}
