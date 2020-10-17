import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Album } from '../../models/albums';
import { ActivatedRoute , Params } from "@angular/router";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

/**
 * @param id id that is passed as a query param
 * @param album model type
 */
  id:string;
  album:Album[];

  constructor(private ClientService:ClientService , private _route:ActivatedRoute){}

  //service call to fetch album details
  ngOnInit(){
      console.log(this._route.params);
      this._route.params
      .pipe(map(params => params['id']))
      .subscribe((id) => {
          this.ClientService.getToken()
          .subscribe(data => {
              this.ClientService.getAlbum(id, data.access_token)
              .subscribe(album => {
                  this.album = album;
              })
          })
      })
  }
}
