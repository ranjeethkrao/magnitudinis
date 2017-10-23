import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mg-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css']
})
export class AgGridComponent implements OnInit {

  private params: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
  }

  ngOnInit() {
  }

}
