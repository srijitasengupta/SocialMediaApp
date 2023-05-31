import { Component, EventEmitter, HostListener, Input, Output, SimpleChange } from '@angular/core';
import { EditPostService } from './edit-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
	selector: 'app-edit-post',
	templateUrl: './edit-post.component.html',
	styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent {

	showLoader: boolean = false;
	@Input() ID: any;
	@Input() postObj: any;
	isDragOver: boolean = false;
	@Output() postCreated: EventEmitter<boolean> = new EventEmitter<boolean>()

	constructor(
		private auth: AuthService,
		private editPostService: EditPostService,
		private route: ActivatedRoute,
		public post: Post,
		private router: Router,
				
	) { };

	ngOnInit(): void {
	}

	ngOnDestroy() {
		console.log("destroying child...")
	}

	ngOnChanges(changes: any) {
		if (changes?.postObj) {
			this.post = this.postObj
		}
	}
	getPostByID(id: string) {
		this.showLoader = true;
		this.editPostService.getPostByID(id).then(res => {

			this.post.ID = res.id;
			this.post.Data = res.data();
			this.post = this.post.Data;
			this.post.ID = res.id;
			this.showLoader = false;
		}, err => {
			this.router.navigate(['error-page']);
		});
	}

	save(post: Post) {
		this.showLoader = true;
		post.User = localStorage.getItem('activeUser');
		this.editPostService.savePost(post);
		this.showLoader = false;
		this.router.navigate(['/my-feed']);
		this.postCreated.emit(false);
	}

	async upload(path: any) {
		//let path = event.target.files[0];
		this.showLoader = true;
		this.post.PhotoUrl = await this.auth.uploadImage(path, this.post.ID, path.name)
		console.log(this.post.PhotoUrl);
		if (this.post.PhotoUrl)
			this.showLoader = false;
	}

	@HostListener('dragover', ['$event'])
	onDragOver(event: DragEvent): void {
		event.preventDefault();
		this.isDragOver = true;
	}

	@HostListener('dragleave', ['$event'])
	onDragLeave(event: DragEvent): void {
		this.isDragOver = false;
	}

	handleFileDrop(event: any): void {
		event.preventDefault();
		this.isDragOver = false;
		console.log("wwee", event.dataTransfer.files[0])
		this.upload(event.dataTransfer.files[0]);

	}

	handleFileInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		const files = target.files as FileList;
		this.upload(files[0])
	}

}


