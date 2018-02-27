import {Injectable} from "@angular/core";
import {Router, CanActivate} from "@angular/router";
import {AuthenticationTwoService} from "./authservicetwo.service";
import {NavigationStateService} from "./navigation-state.service";

@Injectable()
export class AuthGuard implements CanActivate {

  private isAuthenticated: boolean = false;

  constructor(private auth: AuthenticationTwoService, private navigationStateService: NavigationStateService) {
    console.log("AuthGuard() -> constructor()");
    this.auth.isLoggedIn.subscribe(
      result => this.isAuthenticated = result,
      error => console.log('error')
    )
  }

  canActivate() {
    console.log("canActivate ? " + this.auth.isLoggedInBool);
    // this.navigationStateService.clear();
    return this.auth.isLoggedInBool;
  }
}
