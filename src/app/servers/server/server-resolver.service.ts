import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { ServersService } from "../servers.service";

interface Server{
    id: number;
    name: string;
    status: string;
}

@Injectable()
export class ServerResolver implements Resolve<{id: number, name: string, status:string}> {

    constructor(private serverSerice: ServersService){}


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<Server> | Promise<Server>| Server {
        return this.serverSerice.getServer(route.params['id']);
    }

}