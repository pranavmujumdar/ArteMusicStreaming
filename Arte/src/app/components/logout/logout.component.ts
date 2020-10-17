import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }
  Logout() {
    window.location.href='http://localhost:3000';
    // this.clientService.Logout();
  }
  toHome(){
    window.location.href="http://localhost:4200/tracks"
  }
}
