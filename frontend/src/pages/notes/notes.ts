import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { ViewnotesPage} from '../viewnotes/viewnotes';
/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
  }
  base64: any;
  fun(b64Data,ty)
  {
    //console.log(b64Data)
    let x=b64Data.split(',')[1]
    //http call to upload notes where x is base64 rep- when islink is 1 data will have link- anyways not sure if link will work
    console.log(x)
    let postParams = {'data':x,'userid':'5be700b0655e4e1078388cbc','subject':'WT','title':'Reverse Ajax','summary':'xxxx','islink':0}
     let headers = new Headers();
     headers.append('Content-Type','application/json');
 
         let path="http://127.0.0.1:5000/notes/upload"
 
         this.http.post(path, postParams, {headers: headers})
           .subscribe(res => {  
             //let data = res.json();
             console.log(res)
             
           }, (err) => {
             console.log(err);
             
           });
   
    
  }
  onUploadChange(ev) {
    let file = ev.target.files[0];
    console.log(file.type)
  let fileReader = new FileReader();
            let self=this;
            // Onload of file read the file content
            fileReader.addEventListener("load", function () {
              self.base64 = fileReader.result;
              //console.log(self.base64);
              self.fun(self.base64,file.type);
            }, false);
            // Convert data to base64
            fileReader.readAsDataURL(file);
  //console.log(postParams)
  //console.log(this.base64);
  

  }
  download(){
    let postParams = {'userid':'5be700b0655e4e1078388cbc','notesid':'5be72447655e4e19b4be7f27'}
     let headers = new Headers();
     headers.append('Content-Type','application/json');
 
         let path="http://127.0.0.1:5000/notes/view"
 
         this.http.post(path, postParams, {headers: headers})
           .subscribe(res => {  
             
             console.log(res)
             let data = res.json();
             var byteCharacters = atob(data['data']);
              var byteNumbers = new Array(byteCharacters.length);
              for (var i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              var byteArray = new Uint8Array(byteNumbers);
              var blob = new Blob([byteArray], {type: 'application/pdf'});
              //var blobUrl = URL.createObjectURL(blob);
              let pdfUrl = {pdfUrl: URL.createObjectURL(blob)};
              this.navCtrl.push(ViewnotesPage, pdfUrl);
             
           }, (err) => {
             console.log(err);
             
           });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

}
