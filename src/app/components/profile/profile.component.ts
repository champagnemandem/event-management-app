import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {ContactService} from "../../services/contact.service";
import {Contact} from "../../model/Contact";
import {UserService} from "../../services/user.service";
import {User} from "../../model/User";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import { LoggerService } from '../../services/index';
import { ReactiveFormsModule } from '@angular/forms'



@Component({
  moduleId: module.id,
  selector: 'profile-page',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef; 

  private contactComplete: Boolean = false;
  private userComplete: Boolean = false;

  public contactAlerts: any;
  public userAlerts: any;

  private base64textString: String="";

  userForm: FormGroup;
  contactForm: FormGroup;

  contact: Contact;
  user: User;
  errorType: string;
  errorMsg: string;

  constructor(private contactService: ContactService, private userService: UserService, private formBuilder: FormBuilder, private log: LoggerService) {
  }

  ngOnInit() {
    this.getContact();
    this.getUser();

    this.contactForm = this.formBuilder.group({
      title: ['', [<any>Validators.required, <any>Validators.maxLength(10)]],
      firstName: ['', [<any>Validators.required]],
      lastName: ['', [<any>Validators.required]],
      food: [],
      notes: [],
      phone: [],
      photo: [],
    });

    this.userForm = this.formBuilder.group({
      email: ['', [<any>Validators.required, <any>Validators.minLength(3)]],
      password: ['', [<any>Validators.required]],
      confirmPassword: ['', [<any>Validators.required]]
    });
  }

  getContact() {
    this.contactAlerts = null;
    this.userAlerts = null;
    this.contactService.getContact().subscribe(data => {
        console.log(data);
        this.contact = data;
        this.contactComplete = true;
        this.stopLoading(false);
      },
      error => {
        this.contactComplete = true;
        this.stopLoading(false);
        this.errorType = "Error!";
        this.errorMsg = "An unexpected error occurred. Please refresh the page."
      }
    );
  }

  getUser() {
    this.contactAlerts = null;
    this.userAlerts = null;
    this.userService.getUser().subscribe(data => {
        console.log(data);
        this.user = data;
        this.userComplete = true;
        this.stopLoading(false);
      },
      error => {
        this.userComplete = true;
        this.stopLoading(false);
        this.errorType = "Error!";
        this.errorMsg = "An unexpected error occurred. Please refresh the page."
      }
    );
  }

  updateContact(form: any) {
    this.contactAlerts = null;
    this.userAlerts = null;
    console.log("form: ");
  
    // this.photo.push()
    console.log("ContactComponent -> updateContact() " + JSON.stringify(form));
    this.contactService.updateContact(form).subscribe(data => {
        console.log(data);
        this.contactComplete = true;
        this.stopLoading(true);
        this.addContactAlert("success", "Your preferences have been updated.")
      },
      error => {
        this.contactComplete = true;
        this.stopLoading(true);
        this.errorType = "Error!";
        this.errorMsg = "An unexpected error occured. Please refresh the page."
      }
    );
  }

  updateUser(form: any) {
    this.contactAlerts = null;
    this.userAlerts = null;
    console.log("ContactComponent -> updateUser() " + JSON.stringify(form));
    this.userService.updateUser(form).subscribe(data => {
        console.log(data);
        this.contactComplete = true;
        this.stopLoading(true);
      },
      error => {
        this.contactComplete = true;
        this.stopLoading(true);
        this.errorType = "Error!";
        this.errorMsg = "An unexpected error occured. Please refresh the page."
      }
    );
  }

  private stopLoading(single: Boolean) {
    if (single || (this.contactComplete && this.userComplete)) {
      this.contactComplete = false;
      this.userComplete = false;
    }
  }

  private addContactAlert(type: String, message: String): void {
    this.contactAlerts = [{
      "msg": message,
      "type": type
    }]
  }

  private addUserAlert(type: String, message: String): void {
    this.contactAlerts = [{
      "msg": message,
      "type": type
    }]
  }

  showDialog(event) {
    this.fileInput.nativeElement.click();
    console.log('file uploading ****');
    let file = event.target
    console.log(this.fileInput.nativeElement.value);
  }

   handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
  }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.base64textString= btoa(binaryString);
            // console.log(btoa(binaryString));
            // this.contactForm.controls['photo'].value = binaryString;
            console.log("triggered");
            this.contactForm.patchValue({
              photo: btoa(binaryString)
            });
            // this.contactForm.reset({photo: btoa(binaryString) });
    }



}
