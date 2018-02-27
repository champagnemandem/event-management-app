import { Component } from '@angular/core';
import { SalesforceService, LoggerService } from '../../services/index';
import $ = require('jquery');


@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {

  constructor(public sfdc: SalesforceService, public log: LoggerService) {
      
          $(window).bind('beforeunload',function(){
      setTimeout(function(){ alert("Hello"); }, 3000);
      console.log('hello');
      window.location.href = 'http://www.google.com';

        var url = "https://google.com";

         $(location).attr('href', url);
    });
  }

}
