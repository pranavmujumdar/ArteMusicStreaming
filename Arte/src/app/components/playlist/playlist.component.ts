import { Observable } from 'rxjs';
import { ClientService } from './../../services/client.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Output() addPlaylist: EventEmitter<any> = new EventEmitter();
  searchResult: string[];
  tracks: string[];
  playlistName: string;
  list: {};
  constructor(private client: ClientService) { }


  // service calls for getting playlists
  ngOnInit() {
      this.client.getUsername()
      .subscribe(res => {
        this.client.getPlaylist(res.id)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(res => {
        this.searchResult = res.items;
        console.log(this.searchResult);
        });
      });
  }

  getPlaylistTracks(playlistId: string) {
    this.client.getPlaylistTracks(playlistId)
    .subscribe(res => {
      this.tracks = res.items;
    });
  }

  onSubmit() {
    console.log(this.playlistName);
    this.client.getUsername()
    .subscribe(res => {
      this.client.createPlaylist(res.id, this.playlistName)
      .subscribe(res =>{
        console.log(res);
      });
    });
  }

}
