import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  private token: string;
  constructor(private client: ClientService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.fragment
    .pipe(
      map(fragment => new URLSearchParams(fragment)),
      map(params => ({
        access_token: params.get('access_token')
      }))
    )
    .subscribe(res => this.client.setToken(res.access_token));
  }

}
