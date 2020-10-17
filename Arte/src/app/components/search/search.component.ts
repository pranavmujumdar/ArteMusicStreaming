import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { Artist } from '../../models/artist'
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ClientService],
})

export class SearchComponent implements OnInit {

  searchStr:string;
  searchRes : Artist[];
 
  constructor(private clientService:ClientService) {

   }

   ngOnInit() {
  }


  searchMusic(){
    this.clientService.getToken()
    .subscribe(res => {
      this.clientService.searchMusicArtist(this.searchStr,'artist',res.access_token)
      .subscribe(res =>{
        this.searchRes = res.artists.items;
    })
  })

}
}
