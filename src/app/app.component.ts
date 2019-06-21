import { Component } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import * as $ from 'jquery';

// const URL = 'http://localhost:3000/api/upload';
// const URL = 'http://3.17.180.228:8000/api/v1/';
const URL = 'http://127.0.0.1:8000/api/v1/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'file-upload';
	final:any;
	webdata:any;
	error:any;

	constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer){
		this.oldfile().subscribe(
		  (res) => {
			this.webdata = res;
			this.final = sanitizer.bypassSecurityTrustHtml(this.webdata.html);
			// console.log(res);
		  },
		  (err) => this.error = err
		);
	}

	public oldfile() {
		let url = URL+`file/1/`;
		return this.httpClient.get(url);
	}

	public uploader: FileUploader = new FileUploader({url: URL+'file/', itemAlias: 'file'});

	ngOnInit() {
		this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			 console.log('ImageUpload:uploaded:', item, status, response);
			 alert('File uploaded successfully');
		};
		$(document).ready(function(){
			// alert("Hello");
			$(".update").click(function(){
				let arr = {}
				console.log($(".editor input").length);
				console.log($(".editor").serializeArray());
			})
		});
	}

	SubForm(){
		console.log("Hello");
	}
}
