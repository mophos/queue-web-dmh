import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NhsoService {

  token: any;
  httpOptions: any;

  constructor(@Inject('API_URL') private apiUrl: string, private httpClient: HttpClient) {
    // this.token = sessionStorage.getItem('token');
    this.httpOptions = {
      observe: 'response'
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + this.token
      //   })
    };
  }

  async getCard() {
    const _url = `http://localhost:8189/api/smartcard/read`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

  getAuthenCode(pid, correlationId, hn, hcode) {
    const _url = `http://localhost:8189/api/nhso-service/confirm-save`;
    return this.httpClient.post(_url, {
      pid, claimType: 'PG0060001',
      mobile: 0,
      correlationId,
      hn,
      hcode
    }, this.httpOptions).toPromise();
  }

  async save(data: object) {
    const _url = `${this.apiUrl}/nhso`;
    return this.httpClient.post(_url, data, this.httpOptions).toPromise();
  }

  getLastToken(cid) {
    const _url = `http://localhost:8189/api/nhso-service/latest-authen-code/${cid}`;
    return this.httpClient.get(_url, this.httpOptions).toPromise();
  }

}
