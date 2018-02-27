import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthenticationTwoService {

  public contact: any;
  public currentUser: any;
  public isLoggedInBool: boolean = false;
  public isLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor() {

    this.isLoggedIn.subscribe(
      x => this.isLoggedInBool = x
    )

    console.log("AuthenticationTwoService -> constructor()");

    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // var sessionId = '00D0v0000000WY6!ASAAQNnghEeg_1pnKUyMMTIW0oYjsg5qlnbPZVktxy36j0.LBZeVGRtfc5Qb.kEtDqJaKFW3lyW_2FZSn7pOVBJW3zytikFO'
    var sessionId = (<HTMLInputElement>document.getElementById("sessionId")).value;

    if ((this.currentUser && this.currentUser.sessionId)) {
      console.log("(this.currentUser && this.currentUser.sessionId)");

      localStorage.setItem('currentUser', JSON.stringify({
        sessionId: sessionId
      }));


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
