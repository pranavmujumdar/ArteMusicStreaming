import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {

  constructor(private clientService: ClientService) { }
  searchStr: string;
  searchRes: string[];
  ngOnInit() {
  }

  // service call to fetch tracks from API
  searchMusics(){
    this.clientService.getToken()
    .subscribe(res => {
      this.clientService.searchMusicTrack(this.searchStr, 'track', res.access_token)
      .subscribe(res => {
        this.searchRes = res.tracks.items;
    });
  });
}

}
