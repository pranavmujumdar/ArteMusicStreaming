import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private clientService:ClientService) { }
  searchStr:string;
  searchRes : string[];
  ngOnInit() {
  }

  
  searchMusics(){
    this.clientService.getToken()
    .subscribe(res => {
      this.clientService.searchMusicTrack(this.searchStr,'track',res.access_token)
      .subscribe(res =>{
        this.searchRes = res.tracks.items;
    })
  })
}}
