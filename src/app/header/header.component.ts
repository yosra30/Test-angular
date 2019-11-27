import { ApiService } from '../../Services/api.service';
import { Component, OnInit,HostListener  } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchText;
  displayType = "ListView"
  constructor(private api: ApiService) { }
  onSearch(){
this.api.setSearchText(this.searchText)
  }
  onChangeDispaly(type){
    this.displayType=type
    this.api.setDisplaytype(type)
  }
  ngOnInit() {
     
   
  }
 
  ngAfterContentInit() {
    if( window.innerWidth <= 640 ){
      this.displayType='cardView'
      this.api.setDisplaytype('cardView')
    }else{
     this.displayType='ListView'
     this.api.setDisplaytype('ListView')
    }  }
  @HostListener('window:resize', ['$event'])
  onResize(event){

     if(event.target.innerWidth <= 640 ){
       this.displayType='cardView'
       this.api.setDisplaytype('cardView')
     }else{
      this.displayType='ListView'
      this.api.setDisplaytype('ListView')
     }
  }
}
