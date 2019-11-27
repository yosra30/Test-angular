import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @Input() item: Object;
  formatedDate: String;
  tags: String[]=[];
  constructor( ) { }


  ngOnInit() {
    var ts = new Date(this.item['releasedAt']);
    this.formatedDate = ts.toLocaleDateString();
this.item['_tags'].map( tag=>{
  if(tag.visible && this.tags.length<3){
    this.tags.push(tag.name)
  }
})

  }

}
