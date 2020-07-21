import { Observable } from "rxjs/Observable";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

export interface CanComponentDeactievate {
    canDeactivate: () => Observable<boolean> | Promise <boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactievate> {
    canDeactivate(component: CanComponentDeactievate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState? : RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | 
    boolean {
            return component.canDeactivate();
            
        }
}
