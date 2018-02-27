import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationService {

  public contact: any;
  public currentUser: any;
  public isLoggedInBool: boolean = false;
  public isLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor() {

    this.isLoggedIn.subscribe(
      x => this.isLoggedInBool = x
    )

    console.log("AuthenticationService -> constructor()");

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // var sessionId = (<HTMLInputElement>document.getElementById("sessionId")).value;
    var sessionId = '00D0v0000000WY6!ASAAQBfXn5JHVwIPMAGrMTTNJESbGwyi.Tfo74e6nqUOuFD_DnQzq30vJKu5oVHQE58ziCcVjg2aNMtK34oXB1eWs6Oly_9y'

    if ((this.currentUser && this.currentUser.sessionId)) {
      console.log("(this.currentUser && this.currentUser.sessionId)");
      this.doLogin();
    } else if (sessionId) {
      console.log("sessionId");
      localStorage.setItem('currentUser', JSON.stringify({
        sessionId: sessionId
      }));
      this.doLogin();
    } else {
      console.log("this.isLoggedIn.next(false)");
      this.isLoggedIn.next(false);
    }
  }

  doLogin() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isLoggedIn.next(true);
  }

  get loggedInBool() {
    return this.isLoggedInBool;
  }

  get sessionId() {
    return this.currentUser.sessionId;
  }

  logout(): void {
    console.log('logging out');
    this.isLoggedIn.next(false);
  }
}
