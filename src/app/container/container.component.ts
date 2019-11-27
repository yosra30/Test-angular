import { PlaceholderDirective } from './../placeholder.directive';
import { ModalItemComponent } from './../modal-item/modal-item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],

})
export class ContainerComponent implements OnInit {

  news = [];
  nbNews: number;
  p: number = 1;
  loading: boolean;
  newsIndex: number = 1;
  ITEMS_PER_PAGE = 15;
  dynamicModalTitleText = 'Dynamic modal title text';
  dynamicModalBodyText = 'Dynamic modal body text';
  displayType: string = "ListView"

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private dynamicModalCloseSubscription: Subscription;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private api: ApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.api.searchTextUpdated.subscribe(
      (searchText) => {
        this.getPage(1)
      }
    );

    this.api.displayTypeUpdate.subscribe(
      () => {
       this.displayType =this.api.getDisplaytype()
      }
    );
    //Appel à la fonction getPage 
    this.getPage(1)

  }
  // Fonction qui permet d'extraire les articles de chaque page du paramétre 
  getPage(page: number) {
    this.loading = true;
    this.api
      .getAllNews(page)
      .subscribe(resp => {
        if (resp['page'] == 1) {
          this.newsIndex = 1;
        } else {
          this.newsIndex = (this.ITEMS_PER_PAGE * (resp['page'] - 1)) + 1;

        }
        this.p = resp['page'];
        this.loading = false;
        this.news = resp['hits'];
        if (resp['nbHits'] < 1000) {
          this.nbNews = resp['nbHits']
        } else {
          // Calcule de nombre de page pour ne pas passer les limites
          if (1000 % this.ITEMS_PER_PAGE != 0) {
            this.nbNews = Math.floor(1000 / this.ITEMS_PER_PAGE) * this.ITEMS_PER_PAGE
          } else {
            this.nbNews = 1000
          }
        }
        return console.log(resp);
      });

  }
  /* dynamic */
  onShowDynamicModal(item) {
    var currentArticleIndex = this.news.findIndex(article => article.objectID == item.objectID);
    var previous = ""
    var next = ""
    if (currentArticleIndex != -1) {
      if (currentArticleIndex == 0) {
        next = this.news[currentArticleIndex + 1]
        previous = ""
      } else if (currentArticleIndex == this.news.length - 1) {
        previous = this.news[currentArticleIndex - 1]
        next = ""
      } else {
        next = this.news[currentArticleIndex + 1]

        previous = this.news[currentArticleIndex - 1]

      }
    }
    console.log(previous)

    this.api.getSpecificNews(item.objectID)
      .subscribe(data => {
        // créer le modal dynamic
        this.showDynamic(data,previous,next,this.news);

      });
  }

  private showDynamic(data,previous,next,news) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalItemComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

  
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.data = data;
    componentRef.instance.previous = previous;
    componentRef.instance.next = next;
    componentRef.instance.news = news;


    this.dynamicModalCloseSubscription = componentRef.instance.close.subscribe(() => {
      this.dynamicModalCloseSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.dynamicModalCloseSubscription) {
      this.dynamicModalCloseSubscription.unsubscribe();
    }
  }
  openXl(content) { this.modalService.open(content, { size: 'xl' }); }
}
