import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import * as Enums from '../../assets/apiconfig';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  public token: any;

  constructor(public http: Http, public storage: Storage) {

  }

  checkAuthentication(){

    return new Promise((resolve, reject) => {

        //Load token if exists
        this.storage.get('token').then((value) => {

            this.token = value;

            let headers = new Headers();
            headers.append('Authorization', this.token);

            let url = Enums.APIURL.URL1;
            let path = url.concat( "/v1/auth");
            //console.log(path);
            this.http.get(path)
                .subscribe(res => {
                    resolve(res);
                    console.log(resolve(res));
                }, (err) => {
                  console.log("yo");
                    reject(err);
                });

        });

    });

  }

  createAccount(details){

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = Enums.APIURL.URL1;
        let path = url.concat( "/v1/signup");
        console.log(details);


        this.http.post(path, details, {headers: headers})
          .subscribe(res => {

            let data = res.json();
            console.log(data)
            //this.token = data.token;
            this.storage.set('token', data['user_id']);
            resolve(data);

          }, (err) => {
            console.log(err);
            reject(err);
          });

    });

  }

  login(credentials){

    return new Promise((resolve, reject) => {

      //console.log(credentials);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');


        let url = Enums.APIURL.URL1;
        let path = url.concat("/v1/auth");
        //console.log(path);

        this.http.post(path, JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            //console.log(res['_body']);
            let data = res.json();
            console.log(data);
            //this.token = data.result;
            this.storage.set('token', data['user_id']);
            resolve(data);

          }, (err) => {
            console.log("yo");
            reject(err);
          });

    });

  }

  logout(){
    this.storage.set('token', '');
  }

}
