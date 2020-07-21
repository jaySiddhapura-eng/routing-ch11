import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router, Data} from '@angular/router'

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,    // for subscribing the route
              private router: Router) { }       // for navigating to the route

  ngOnInit() {

    this.route.data.subscribe(
      (data:Data) => {
        this.server = data['server'];
      }
    );
    // this.server = this.serversService.getServer(1);

    // // obtain the parameter from the route link and assign it to the const
    // // following method will not update the link param if you are on the same page
    // const id = +this.route.snapshot.params['id'];     

    // // following method is same as aboe one
    // // but user can update the link param even from the same page
    // this.route.params.subscribe(
    //   (params:Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //   }
    // )
  }

  onEdit(){
    // navigate to the server edit component 
    this.router.navigate(['edit'],{relativeTo:this.route, queryParamsHandling:'preserve'});
    // above way to use relative route with child router link
    // use preserve keyword to presrve the query component
  }

}
