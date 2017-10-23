import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';

import { HistoricService } from './historic.service';

declare const require: any;

declare const $: any;

@Component({
  selector: 'mg-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {

  public form: FormGroup;
  public symbol: AbstractControl;
  public exchange: AbstractControl;
  public histStartDate: AbstractControl;
  public histEndDate: AbstractControl;

  private symbolOptions = [];
  private symbolDropdownSettings = {};
  private symbolSelectedItems = [];

  private exchangeOptions = [];
  private exchangeDropdownSettings = {};
  private exchangeSelectionItems = [];

  private tradeGridData: any[];
  private tradeGridCols: any[];

  private params: any;

  constructor(
    fb: FormBuilder, 
    private hs: HistoricService,
    public datePipe: DatePipe) {
    this.form = fb.group({
      'symbol': ['', Validators.compose([Validators.required])],
      'exchange': ['', Validators.compose([Validators.required])],
      'histStartDate': [null, Validators.compose([Validators.required])],
      'histEndDate': [null, Validators.compose([Validators.required])]
    });

    this.symbol = this.form.controls['symbol'];
    this.exchange = this.form.controls['exchange'];
    this.histStartDate = this.form.controls['histStartDate'];
    this.histEndDate = this.form.controls['histEndDate'];

    this.symbolDropdownSettings = { 
      singleSelection: false, 
      text:"Select Symbols",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      badgeShowLimit: 3,
      enableSearchFilter: true
    };

    this.exchangeDropdownSettings = { 
      singleSelection: true, 
      text:"Select Exchange",
      enableSearchFilter: true
    };

    this.tradeGridData = [];
    this.tradeGridCols = this.getTradeGridCols();
  }

  agInit(params: any): void {
    this.params = params;
  }

  ngOnInit() {
    this.hs.fetchAllExchange().subscribe((data) => {
      this.exchangeOptions = [];
      for(let obj of data.data) {
        this.exchangeOptions.push({
          id: obj['ID'],
          itemName: obj['VALUE']
        });
      }
    });
  }

  onExchangeItemSelect(item){
    this.hs.fetchDistinctSymbol(item['itemName']).subscribe((data) => {
      this.symbol.reset();
      this.symbolOptions = [];
      for(let obj of data.data) {
        this.symbolOptions.push({
          id: obj['ID'],
          itemName: obj['VALUE']
        });
      }
    });
  }

  onSubmit(values: Object) {

    let symbolValueArr = [];
    values['exchange'] = values['exchange'][0].itemName;
    values['histStartDate'] = this.getFormattedDate(values['histStartDate'], 'yyyy-MM-dd') ;
    values['histEndDate'] = this.getFormattedDate(values['histEndDate'], 'yyyy-MM-dd');

    for(let symObj of this.symbolSelectedItems) {
      symbolValueArr.push(symObj['itemName']);
    }
    
    values['symbol'] = symbolValueArr;

    this.hs.fetchHistoricTradeData(values).subscribe(data => {
      this.tradeGridData = data.data
    });

  }

  getFormattedDate(date: Date, format: string) {
    return this.datePipe.transform(date, format);
  }

  getHistTradeDataKeys(row: Object): Array<string> {
    return Object.keys(row);
  }

  getTradeGridCols() {
    return [
      { name: 'Symbol', prop: 'SYMBOL' },
      { name: 'Trade', prop: 'TRADE' },
      { name: 'Price #1', prop: 'PRICE_1'},
      { name: 'Date #1', prop: 'DATE_1' },
      { name: 'Price #2', prop: 'PRICE_2'},
      { name: 'Date #2', prop: 'DATE_2' },
      { name: 'Cash Futures', prop: 'CASH_FUTURES' },
      { name: 'Exchange', prop: 'EXCHANGE' }
     ];
  }

}
