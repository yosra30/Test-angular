import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss'],
})
export class ModalItemComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faTimes = faTimes;

  @Input() data
  @Input() next
  @Input() previous
  @Input() news

  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  closeResult: string;
  formatedDate: String;
  modalScrollDistance = 2;
  modalScrollThrottle = 50;

  constructor(private modalService: NgbModal, private api: ApiService) { }


  onScroll() {
    console.log('scrolled!!');
  }
  onClose() {
    this.close.emit();
  }
  getarticle(type) {
    console.log(type)
    if (type == "next") {
      this.api.getSpecificNews(this.next.objectID)
        .subscribe(data => {
          this.data = data;
          this.getIndexes()

        });
    } else {
      this.api.getSpecificNews(this.previous.objectID)
        .subscribe(data => {
          this.data = data;
          this.getIndexes()

        });
    }
  }
  getIndexes() {
    var currentArticleIndex = this.news.findIndex(article => article.objectID == this.data.objectID);

    if (currentArticleIndex != -1) {
      if (currentArticleIndex == 0) {
        this.next = this.news[currentArticleIndex + 1]
        this.previous = ""
      } else if (currentArticleIndex == this.news.length - 1) {
        this.previous = this.news[currentArticleIndex - 1]
        this.next = ""
      } else {
        this.next = this.news[currentArticleIndex + 1]

        this.previous = this.news[currentArticleIndex - 1]

      }
    }
  }
  ngOnInit() {
    var ts = new Date(this.data['releasedAt']);
    this.formatedDate = ts.toLocaleDateString();
  }

}
