import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactievate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactievate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router ) { }    // for subscribing the router link

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);   // obtaining the one time snapshot 
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe(               // user can updaete the query params from the same page
      (queryParams : Params ) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true: false;
      }
    );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate (['../'], {relativeTo:this.route});
  }

  canDeactivate():Observable<boolean>| Promise<boolean> | boolean {
    if (!this.allowEdit){
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.serverStatus) && !this.changesSaved){
        return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }

}
