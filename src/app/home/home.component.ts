import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private authService: AuthService ) { }

  ngOnInit() {
  }

  onGoToServer(){
    // some calculation according to the need

    //a routing code
    this.route.navigate(['/servers']);
  }

  onLoadServer(id: number){
    this.route.navigate(['/servers', id, 'edit'],{queryParams: {allowEdit:1}, fragment:'loading'});
  }

  onLogin(){
    this.authService.login();
  }

  onLogout(){
    this.authService.logout();
  }

}
