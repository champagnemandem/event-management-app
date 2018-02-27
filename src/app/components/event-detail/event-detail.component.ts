import { ActivatedRoute, Params} from '@angular/router';
import {Event} from './../../model/Event';
import {Agendum} from './../../model/Agendum';
import {Discussion} from './../../model/Discussion';
import 'rxjs/add/operator/map'
import "rxjs/add/operator/switchMap";
import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { SalesforceService, LoggerService, SOQL } from '../../services/index';
import {EventService} from "../../services/event.service";
import {NavigationStateService} from "../../services/navigation-state.service";
import { GoogleMapComponent } from './googlemap.component';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {DiscussionService} from "../../services/discussion.service";



@Component({
  moduleId:module.id,
  selector: 'event-detail',
  templateUrl: './event-detail.html'
})

export class EventDetailComponent implements OnInit {

  @ViewChild(GoogleMapComponent) googleMapComponent: GoogleMapComponent;

  @Input()
  latitude: number;
  longitude: number;

	private eventComplete: Boolean = false;
	event: Event;
  	
	agendumList: Agendum[]; 
	discussionQuestions: Discussion[];
	eventDates: Event[];
	attachmentsPhase = "pre";
	eventId: string;
	errorType: any;
	errorMsg: any;
	dates_list: string[];
	sorted_dates: any;
	sign = "down";
	toggle: string[][];
	prepopulateAttendee: boolean[];

	// formgroup
	discussionForm: FormGroup;
	discussion: Discussion;
	discussionComplete: Boolean = false;
	fillerQuestion: string[];
	parsedInvitee: string[];
	parsedInviteeMin: string[];
	showButton: String = "All";
	showAllBool: Boolean = false;
	showButtonBool: Boolean = true;
	weekendButton: Boolean = false;

	constructor (private discussionService: DiscussionService, 
				 private rootNode: ElementRef, 
				 private formBuilder: FormBuilder, 
				 private eventService: EventService, 
				 private route: ActivatedRoute, 
				 private navigationStateService: NavigationStateService ) {
	
	}

	ngOnInit() {

		this.fillerQuestion = [];
		this.route.params
			.subscribe( (params:Params) => {
				this.navigationStateService.setActivePage("event", params['id']);
				this.eventId = params['id'];
				this.getEvent(this.eventId);
				this.getDiscussion(this.eventId);
			});
			
		$(this.rootNode.nativeElement).on('shown.bs.modal', () => {
          this.googleMapComponent.resize();
          this.googleMapComponent.lat = this.latitude;
          this.googleMapComponent.lng = this.longitude;
          $(this).off();
      });

		this.discussionForm = this.formBuilder.group({
			DiscussionQuestion: '',
		});

		// $(document).ready(function(){
	 //      $("#header").sticky({ topSpacing: 0 });
	 //    });
	}
	
	getDiscussion(eventId: string) {
		this.discussionService.getDiscussion(eventId).subscribe(data => {
			this.discussion = <Discussion> data;
			this.discussionComplete = true;
		},
		error => {
			this.errorType = "Error!";
			this.errorMsg = "An unexpected error occured. Please refresh page";
			}
		);
	}

	updateDiscussion(form: any){
		// console.log("EventDetailsComponent -> updateDiscussion() " + JSON.stringify(form));
		this.discussionService.updateDiscussion(this.eventId, form).subscribe(data => {
			this.discussionComplete = true;
		},
		error => {
			this.discussionComplete = true;
			this.errorType = "Error!";
			this.errorMsg = "An error occured"
		}
		);
	}

	//after this is set, this is extracting the details from the page of the :id
	getEvent(eventId: string) {
		this.eventService.getEvent(eventId).subscribe(data => {
			this.event = <Event> data;
			this.eventComplete = true;
			this.dates_list = this.parseDates(data, data.DisplayWeekend);
			this.sorted_dates = this.sortDates(data);
			this.prepopulateAttendee =this.prepopulation(data);
			this.parsedInvitee = this.parseInvitee(data);
			this.parsedInviteeMin = this.parsedInviteeMinimized();
			this.sortButtons(data);
			console.log(data);
		},
		error => {
			this.errorType = "Error!";
			this.errorMsg = "An unexpected error occured. Please refresh page";
			}
		);
	}

	setAttachmentsPhase(phase: string) {
		this.attachmentsPhase = phase;
	}

	public isEvent():Boolean {
		return true;
	}

	setMap(lat, long){
		console.log("#####ENTERED##########")
		this.longitude = Number(long);
		this.latitude = Number(lat);
	}

	parseDates(data, bool) {
		var d1 = this.convertDate(data.Start_DateTime);
		var d2 = this.convertDate(data.End_DateTime);
		var dates_list = [];

		if (bool == false){
			while (d1 <= d2) {
				if(d1.getDay() != 6 && d1.getDay() != 0){
					dates_list.push(new Date(d1));
				    d1.setDate(d1.getDate() + 1);
				} else{
					d1.setDate(d1.getDate() + 1);
				}
			}			
		}
		else {
			while (d1 <= d2) {
				dates_list.push(new Date(d1));
				d1.setDate(d1.getDate() + 1);
			}

		}
		
		console.log("dates:" + dates_list)
		return dates_list;
	}

	sortDates(data){

		//this contains a list of dates in strings
		this.dates_list = this.parseDates(data, data.DisplayWeekend);
		var date_objects = [];

		for (var i = 0; i < this.dates_list.length; i++) {
			var obj = {
				"date": this.dates_list[i],
				"agendum": []
			};
			date_objects.push(obj);
		}
		for (var j = 0; j < data.AgendumList.length; j++) {
			for (var i = 0; i < this.dates_list.length; i++) {
				var pushObj = data.AgendumList[j];
				var compareDate = String(this.convertDate(data.AgendumList[j].Start_DateTime))
				if (compareDate.localeCompare( date_objects[i].date ) == 0  ) {
					date_objects[i].agendum.push({
						data: pushObj,
						togglePos: 'down'
					});

				}
			}
		}

		for (var i = 0 ; i < date_objects.length; i++) {
			date_objects[i].date = String(date_objects[i].date).substring(0,15);
		}

		return date_objects;
	}

	//used to convert date from salesforce to js object
	convertDate(d) {
		var date = d.slice(0,10);
		var dateArr = date.split("-");
		var d1 = new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2]) );
		return d1;
	}

	toggleSign(j,i){
		if (this.sorted_dates[j].agendum[i].togglePos == 'up') {
			this.sorted_dates[j].agendum[i].togglePos = 'down';
		} else {
			this.sorted_dates[j].agendum[i].togglePos = 'up';
		}
	}

	prepopulation(d) {
		// console.log(d.Invitees.length);
		var prepopulate = [];

		for (var i = 0; i < d.Invitees.length; i++){
			if (d.Invitees[i].imgUrl != null) {
				prepopulate.push(true) ;
			} else {
				prepopulate.push(false);
			}
		}
		// console.log(prepopulate);
		return prepopulate;
	}

	filler(){

		if (this.discussionComplete == true && this.discussion.DiscussionQuestion != null && this.discussion.DiscussionQuestion != ''){
			this.fillerQuestion.push(this.discussion.DiscussionQuestion);
		}
	}

	parseInvitee(data){
		var parsedInvitee = [];
		var fours = [];
		var content = []

		for(var i = 0; i < data.Invitees.length; i++){
			fours.push(data.Invitees[i]);
			if(fours.length == 4){
				parsedInvitee.push(fours);
				fours = [];
			}
		}

		if (fours.length != 0) {
			parsedInvitee.push(fours);
		}

		return parsedInvitee;
	}

	parsedInviteeMinimized() {
		var parsedInviteeMin = [];

		if (this.parsedInvitee.length >= 2){
			parsedInviteeMin.push(this.parsedInvitee[0]);
			parsedInviteeMin.push(this.parsedInvitee[1]);
			if(this.parsedInvitee.length == 2){
				this.showButtonBool = false;
			}
		} else {
			parsedInviteeMin = this.parsedInvitee;
			this.showButtonBool = false;
		}
		console.log("&&&&&")
		console.log(parsedInviteeMin)
		return parsedInviteeMin;
	}

	showMoreInviteeClick(){
		if (this.showAllBool == false){
			if(this.parsedInvitee.length > 2) {
				for(var i = 2; i < this.parsedInvitee.length; i++){
					this.parsedInviteeMin.push(this.parsedInvitee[i]);
					console.log("^^^^^^^^")
				}
			}
			this.showAllBool = true;
			this.showButton = "Less";
		}
		else {
			this.parsedInviteeMin = [];
			this.parsedInviteeMin.push(this.parsedInvitee[0]);
			this.parsedInviteeMin.push(this.parsedInvitee[1]);
			this.showAllBool = false;
			this.showButton = "All";
		}
		
	}

	onClick(section){
    let x = document.querySelector("#" + section);
    if (x){
        x.scrollIntoView();
    	}
	}

	sortButtons(data){
		var filler = data.ButtonList;
		console.log(filler)
		filler.sort(function(a,b){
			return a.ButtonOrder - b.ButtonOrder;
		})
	}

}


