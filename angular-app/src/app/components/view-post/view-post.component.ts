import { Component, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ViewPostService } from './view-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { Comment } from 'src/app/model/comment.model';
import { User } from 'src/app/model/user.model';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { UtilsService } from 'src/app/services/utils.service';

declare var bootstrap: any;

@Component({
	selector: 'app-view-post',
	templateUrl: './view-post.component.html',
	styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {

	postId: string = '';
	commentId: string = '';
	comments: Comment[] = [];
	showLoader: boolean = false;
	isLiked: boolean = false;
	likesCount: any = 0;
	visible: boolean = false;
	parentElement: any;
	id: any;
	isDelete: boolean = false;

	constructor(
		private auth: AuthService,
		private viewPostService: ViewPostService,
		private route: ActivatedRoute,
		public post: Post,
		public comment: Comment,
		private router: Router,
		public user: User,
		private elementRef: ElementRef,
		public confirmationService: ConfirmationService, 
		public messageService: MessageService,
		public utilsService: UtilsService
	) { };

	ngOnInit(): void {
		 this.id = localStorage.getItem("activeUser") as string;
		this.showLoader = true;
		this.getCurrentUserByID(this.id);

		this.postId = this.route.snapshot.paramMap.get('id') as string;
		this.route.snapshot.paramMap.get('id')

		if (this.postId != null && this.postId != '0')
			this.getPostByID(this.postId);
		this.comment = new Comment();
	}

	ngAfterViewInit(): void {
		this.parentElement = this.elementRef.nativeElement.querySelector('.parent-container') as HTMLElement;

	}




	getCurrentUserByID(id: string) {
		this.user = new User();
		this.viewPostService.getUserByID(id).then(res => {
			this.user.id = res.id;
			this.user.Data = res.data();
			this.showLoader = false;
		}, err => {
			this.router.navigate(['error-page'])
		});
	}

	getPostByID(id: string) {
		this.viewPostService.getPostByID(id).then(res => {
			
			this.post.Data = res.data();
			this.post = this.post.Data;
			this.post.ID = res.id;
			this.likesCount = this.post.Likes;
			this.showLoader = false;
			console.log(this.post)
			if (this.post.Comments.length > 0) {
				for (let comment of this.post.Comments || []) {
					this.showLoader = true;
					this.getCommentByID(comment);
				}
			}
		}, err => {
			this.router.navigate(['error-page'])
		});
	}

	getCommentByID(id: string) {
		this.viewPostService.getCommentByID(id).then(res => {
			let comment = new Comment();
			comment.ID = res.id;
			comment = res.data() as Comment;

			this.viewPostService.getUserByID(comment.User).then(res => {
				let user = new User();
				user.Data = res.data()
				comment.UserName = user.Data?.Name;
				this.showLoader = false;
			})
			this.comments.push(comment);
		}, err => {
			this.router.navigate(['error-page'])
		});
	}

	onClickAddComment() {
		this.comment.User = localStorage.getItem('activeUser');
		this.comment.Post = this.postId;
		this.showLoader = true;
		this.viewPostService.saveComment(this.comment).then(res => {
			this.commentId = res;
			this.comment.CommentStr = '';
			this.savePost(this.post);
		}, err => {
			this.router.navigate(['error-page'])
		});
	}

	savePost(post: Post) {
		this.post?.Comments.push(this.commentId);
		this.viewPostService.updatePost(this.postId, this.post).then(res => {
			this.showLoader = false;
			this.comments = [];
			this.getPostByID(this.postId);
		}, err => {
			this.router.navigate(['error-page'])
		});
	}

	toggleLike() {
		this.isLiked = !this.isLiked;
		this.post.Likes = this.isLiked ? this.post.Likes - 1 : this.post.Likes + 1;

		this.viewPostService.updatePost(this.postId, this.post).then(res => {
			this.showLoader = false;
			this.comments = [];
			this.getPostByID(this.postId);
		}, err => {
			this.router.navigate(['error-page'])
		});
	}

	showDialog(event: Event) {
		this.parentElement.classList.add('dialog-clicked');
		this.visible = true;
	}

	closeDialog() {
		this.parentElement.classList.remove('dialog-clicked');
		this.visible = false;
	}

	onPostCreation(event: any) {
		this.closeDialog();
	}

	deletePost(post: Post) {
		
		
	}

	onDeleteClick(event:any,post: Post) {
		console.log(event)
		event.preventDefault();
		this.isDelete = true;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this post?',
            header: 'Delete Post',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
				this.viewPostService.deletePost(post);
                this.router.navigate(['/my-feed']);
				//this.utilsService.handleSuccess('Post Deleted.')
            },
            reject: (type:any) => {
            }
        });
    }
}


