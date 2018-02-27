import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {NavigationState} from "./navigation-state";

@Injectable()
export class NavigationStateService {

  public navigationState: Subject<NavigationState> = new Subject<NavigationState>();

  //makes this the current active page
  public setActivePage(page: String, id: String): void {
    let state = new NavigationState();
    state.id = id;
    state.page = page;
    this.navigationState.next(state);
  }

  public clear(): void {
    let state = new NavigationState();
    this.navigationState.next(state);
  }
}
