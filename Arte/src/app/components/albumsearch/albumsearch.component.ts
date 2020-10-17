import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/albums';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-albumsearch',
  templateUrl: './albumsearch.component.html',
  styleUrls: ['./albumsearch.component.scss'],
  providers: [ClientService],
})
export class AlbumsearchComponent implements OnInit {

  /**
 * @param searchStr music album search string
 * @param searchRes response array of album  model type
 */
  searchStr: string;
  searchRes: Album[];

  constructor(private albumService: ClientService) { }

  ngOnInit() {
  }

  // function call to fetch albums and call service to API
  searchMusic() {
    this.albumService.getToken()
      .subscribe(res => {
        this.albumService.searchMusicAlbum(this.searchStr, 'album', res.access_token)
          .subscribe(res => {
            console.log("In Res");
            console.log(res);
            this.searchRes = res.albums.items;
          })
      })
  }
}
