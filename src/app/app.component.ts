import { Component } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { FormBuilder, FormGroup } from  '@angular/forms';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'online-editor-angular';
  	SERVER_URL: string = "http://localhost:3000";

  	form: FormGroup;
	error: string;
	userId: number = 1;
	uploadResponse = { status: '', message: '', filePath: '' };
	fileForm = { file: '', name: '' };

  	constructor(private httpClient: HttpClient, private formBuilder: FormBuilder,) { }
  	public upload(data) {
	    let uploadURL = `http://127.0.0.1:8000/api/v1/file/`;
	    console.log(data)
	    return this.httpClient.post<any>(uploadURL, data, {
	      reportProgress: true,
	      observe: 'events'
	    }).pipe(map((event) => {

	      switch (event.type) {

	        case HttpEventType.UploadProgress:
	          const progress = Math.round(100 * event.loaded / event.total);
	          return { status: 'progress', message: progress };

	        case HttpEventType.Response:
	          return event.body;
	        default:
	          return `Unhandled event: ${event.type}`;
	      }
	    })
	    );
  	}

  onSubmit(data) {
  	console.log(data)
    // const formData = new FormData();
    // formData.append('file', this.form.get('mydoc').value);
    // formData.append('name', this.form.get('name').value);
    // console.log(formData);
    // console.log(this.userId);

    this.upload(data).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );
  }

}
