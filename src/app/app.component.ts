import { Component } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import * as $ from 'jquery';

// const URL = 'http://localhost:3000/api/upload';
const URL = 'http://3.17.180.228:8000/api/v1/';
// const URL = 'http://127.0.0.1:8000/api/v1/';
let fdata = '';

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
		// console.log(localStorage.getItem("formdata"));
		if (localStorage.getItem("formdata")){
			let doc = JSON.parse(localStorage.getItem("formdata"));
			this.loadData(doc.id);
		}
	}

	public loadData(id){
		this.oldfile(id).subscribe(
		  (res) => {
			this.webdata = res;
			this.final = this.sanitizer.bypassSecurityTrustHtml(this.webdata.html);
			// console.log(res);
		  },
		  (err) => this.error = err
		);
	}

	public oldfile(id) {
		let url = URL+`file/`+id+`/`;
		return this.httpClient.get(url);
	}

	public uploader: FileUploader = new FileUploader({url: URL+'file/', itemAlias: 'file'});

	ngOnInit() {
		this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
		this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
			 // console.log('ImageUpload:uploaded:', item, status, response);
			 if (JSON.parse(response).id) {
			 	localStorage.setItem("formdata",response);
			 }
			 this.loadData(JSON.parse(response).id);
			 alert('File uploaded successfully');
		};
		$(document).ready(function(){
			$(".update").click(function(){
				let fdata = new Array();
				let inputs = $(".editor").serializeArray();
				$.each(inputs,function(index,element){
					fdata.push(element.value);
				});
				console.log(fdata);
				let doc = JSON.parse(localStorage.getItem("formdata"));
				$.ajax({
					url: URL+`file/`+doc.id+`/`,
					type:'PATCH',
					data:{'length':fdata.length,'data':JSON.stringify(fdata)},
					success: function(result) {
					    alert('Document Updated.');
					}
				});
			})
		});
	}

	public SubForm(){
		console.log("Hello");
	}
}
