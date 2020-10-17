import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private searchUrl: string;
  private clientId = '8173fa018b554d1c8d306e92da2c364b';
  private clientSecret = '06356f82e3334a85b8b520aca5c57d6f';
  private ArtistUrl: string;
  private AlbumsUrl: string;
  private encoded = btoa(this.clientId + ':' + this.clientSecret);
  private AlbumUrl: string;
  private token: string;
  constructor(private http: HttpClient) { }
/**
 * @description gets the token from the api based on the clientid and secret
 */
  getToken(): Observable<any> {
    const params = ('grant_type=client_credentials');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + this.encoded
      })
    };

    return this.http.post('https://accounts.spotify.com/api/token', params, httpOptions);

  }

  setToken(token: string) {
    this.token = token;
  }

/**
 * @description gets user name
 * @param token auth token
 */
  getUsername(): Observable<any> {
    this.searchUrl = 'https://api.spotify.com/v1/me';
    console.log(this.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.token
      })
    };
    console.log(httpOptions);
    return this.http.get(this.searchUrl, httpOptions);
  }
/**
 * @description gets playlist
 * @param token auth token
 */
  getPlaylist(token: string): Observable<any> {

    console.log(this.encoded);
    this.searchUrl = 'https://api.spotify.com/v1/users/' + token + '/playlists';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.token
      })
    };

    return this.http.get(this.searchUrl, httpOptions);
  }
/**
 * @description searches for artists
 * @param str string that is passed as a query param
 * @param type type is album
 * @param token auth token
 */
  searchMusicArtist(str: string, type = 'artist', token: string): Observable<any> {
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.searchUrl, httpOptions);
  }

/**
 * @description searches music tracks
 * @param str string that is passed as a query param
 * @param type type is track
 * @param token auth token
 */
  searchMusicTrack(str: string, type = 'track', token: string): Observable<any> {
    console.log(this.encoded);
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.searchUrl, httpOptions)
  }
/**
 * @description searches albums
 * @param str string that is passed as a query param
 * @param type type is album
 * @param token auth token
 * @returns an array of Albums matching the criteria
 */
  searchMusicAlbum(str: string, type = 'album', token: string): Observable<any>  {
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.searchUrl, httpOptions);
  }

/**
 * @function getAlbum
 * @param id string that mathes the album id
 * @param token auth token
 * @returns a particular album with album id
 */
  getAlbum(id: string, token: string): Observable<any> {

    this.AlbumUrl = 'https://api.spotify.com/v1/albums/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token
      })
    };
    console.log("Came here2");
    return this.http.get(this.AlbumUrl, httpOptions);
  }

/**
 *
 * @param id gets a particular artist
 * @param token the Identity token
 */
  getArtist(id: string, token: string): Observable<any> {

    this.ArtistUrl = 'https://api.spotify.com/v1/artists/' + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.ArtistUrl, httpOptions);
  }

  /**
   * @function getAlbums
   * @param artistId string based on the id this function will return list of albums
   * @param token
   */
  getAlbums(artistId: string, token: string): Observable<any> {

    this.AlbumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums/?query=&limit=50';
    let headers = new Headers();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + token
      })
    };
    return this.http.get(this.AlbumUrl, httpOptions);
  }

  getPlaylistTracks(playlistId: string): Observable<any> {
    this.searchUrl = 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Bearer ' + this.token
      })
    };
    return this.http.get(this.searchUrl, httpOptions);
  }

  createPlaylist(userId: string, playlistName: string): Observable<any> {
    this.searchUrl = 'https://api.spotify.com/v1/users/' + userId + '/playlists';
    console.log("here:"+playlistName);
    const params = {
      name: playlistName,
      public: true
    };
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.searchUrl, params, httpOptions);
  }
}

