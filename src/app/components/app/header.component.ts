import {Component} from "@angular/core";
import {AuthenticationService} from "../../services/auth.service";
import {NavigationStateService} from "../../services/navigation-state.service";

@Component({
  moduleId: module.id,
  selector: 'greenhouse-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent {

  public isCollapsed: boolean = true;

  public active: boolean;

  public showDiscussion: boolean;

  public collapsed(event: any): void {
  }

  public expanded(event: any): void {
  }

  public isLoggedIn: any

  constructor(private auth: AuthenticationService, private navigationStateService: NavigationStateService) {
    this.isLoggedIn = auth.isLoggedInBool;
    this.auth.isLoggedIn.subscribe(
      result => this.isLoggedIn = result,
      error => console.log(error),
      () => console.log("HeaderComponent -> subscribed to ")
      )

    this.navigationStateService.navigationState.subscribe(
      state => {
        this.showDiscussion = state.page == "event";
        console.log("navigationStateEvent " + JSON.stringify(state));
      }
      )
  }
}
