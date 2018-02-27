import {Component, OnInit} from "@angular/core";
import {FaqService} from "../../services/faq.service";
import {Faq} from './../../model/Faq';

@Component({
  moduleId: module.id,
  selector: 'faq-page',
  templateUrl: './faq.html'
})
export class FaqComponent implements OnInit {

  private faqComplete = false;
  faqs: Faq[];
  errorType: string;
  errorMsg: string;

  constructor(private faqService: FaqService) {
  }

  ngOnInit() {
    console.log("FaqComponent -> ngOnInit()");
    this.getFaqs();
  }

  getFaqs() {
    this.faqService.getFaq().subscribe(
      faqs => {
        this.faqs = faqs;
        this.faqComplete = true;
      },
      error => {
        this.faqComplete = true;
        this.errorType = "Error!";
        this.errorMsg = "An unexpected error occured. Please refresh the page."
      })
  }
}
