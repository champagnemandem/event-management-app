import {Component, OnInit} from "@angular/core";
import {EventService} from "../../services/event.service";
import {Event} from "../../model/Event";
import {Router} from "@angular/router";
import {NavigationStateService} from "../../services/navigation-state.service";
import $ = require('jquery');

@Component({
	moduleId: module.id,
  selector: 'event-listing',
  templateUrl: './event.html'
})

export class EventComponent implements OnInit {

  public events: Event[];
  public errorType: string;
  public errorMsg: string;


  constructor(private eventService: EventService,
              private navigationStateService: NavigationStateService,
              private router: Router) {

        // var windowElement = angular.element($window);
        // windowElement.on('beforeunload', function (event) {
        //    //Do Something

        //    //After this will prevent reload or navigating away.
        //    event.preventDefault();
        // });


    //       $(window).bind('beforeunload',function(){
    //   setTimeout(function(){ alert("Hello"); }, 3000);
    //   console.log('hello');
    //   window.location.href = 'http://www.google.com';

    //     var url = "https://google.com";

    //      $(location).attr('href', url);
    // });
    // window.onbeforeunload = function(e) {
    //   window.location.href ='http://www.google.com';
    // }


  }

  ngOnInit() {
    console.log("EventComponent -> ngOnInit()");
    this.navigationStateService.clear();
    this.getEvents();
    // location.reload();
    
    


//     window.onbeforeunload = function() { 
//     window.setTimeout(function () { 
//         window.location = 'AAA.jsp';
//     }, 0); 
//     window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
// }
  // $(window).bind('beforeunload',function(){
  //     setTimeout(function(){ alert("Hello"); }, 3000);
  //     console.log('hello');
  //     this.refresh();

  //     window.location.href = 'http://www.google.com';

  //       var url = "https://google.com";

  //        $(location).attr('href', url);
  //   });

   
  
  }


refresh(){
  this.router.navigate(["http://www.google.com"]);
}


  getEvents() {
    this.eventService.getEvents().subscribe(data => {
        this.events = data;
        let id: string;
        if (this.events.length == 1) {
          console.log("getEvents() : only one event is present")
          id = this.events[0].Id;
          this.router.navigate(['event/' + id])
        }
      },
      error => {
        this.errorType = "Error!";
        this.errorMsg = "An unexpected error occurred. Please refresh the page."
      }
    );
  }

  pastEvents(d): Boolean {
    let endDate = new Date(d.substring(0,4), d.substring(5,7) - 1, d.substring(8,10));
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1 );

    if(tomorrow > endDate){
      return true;
    } else {
      return false;
    }
  }

    backgroundStyle(url, color): any {

    var styleURL = url? url : '/experience/resource/eventdefault';
    var colorHex = color? color: 'fff';

    let myStyles = {
      'background': 'url(\''+ styleURL + '\')',
      'background-repeat': 'no-repeat',
      'background-size': '100% ',
      'background-position': 'center',
      'padding': '20px',
      'margin-bottom':'20px',
      'color': '#' + colorHex
    };
    return myStyles;
  }

}


