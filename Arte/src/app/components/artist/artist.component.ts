import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { Album } from 'src/app/models/albums';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

   /**
 * @param searchStr music album search string
 * @param searchRes response array of Artist  model type
 */
  searchStr: string;
  searchRes: Artist[];
  constructor(private clientService: ClientService, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  // function and service call to get artist details
  searchMusic() {
    this.clientService.getToken()
      .subscribe(res => {
        this.clientService.searchMusicArtist(this.searchStr, 'artist', res.access_token)
          .subscribe(res => {
            console.log(res.artists.items)
            this.searchRes = res.artists.items;
          })
      })
  }
}
