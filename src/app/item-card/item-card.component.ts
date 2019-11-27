import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Object;
  formatedDate: String;
  constructor() { }

  ngOnInit() {
    var ts = new Date(this.item['releasedAt']);
    this.formatedDate = ts.toLocaleDateString();
  }

}
