import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ViewPostService } from './view-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { Comment } from 'src/app/model/comment.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {

  postId: string = '';
  commentId: string = '';
  comments: Comment[] = [];

  constructor(
		private auth: AuthService,
		private viewPostService: ViewPostService,
		private route: ActivatedRoute,
		public post: Post,
    public comment: Comment,
		private router: Router,
    public user : User,
	) { };

	ngOnInit(): void {
    let id  = localStorage.getItem("activeUser") as string;
    this.getCurrentUserByID(id);

    this.postId = this.route.snapshot.paramMap.get('id') as string;
		this.route.snapshot.paramMap.get('id')

    if (this.postId != null && this.postId != '0')
			this.getPostByID(this.postId);
    this.comment = new Comment();
	}

  getCurrentUserByID(id: string){
    this.viewPostService.getUserByID(id).then(res => {
      this.user.id = res.id;
      this.user.Data = res.data();
      console.log(this.user.Data.photoUrl);
    }, err => {
      alert("Error occured!!");
    });
  }

	getPostByID(id: string) {
		this.viewPostService.getPostByID(id).then(res => {
      this.post.ID = res.id;
			this.post.Data = res.data();
			this.post = this.post.Data;

      if(this.post.Comments.length > 0){
        for(let comment of this.post.Comments || []) {
          this.getCommentByID(comment);
        }
      }
		}, err => {
			alert("Error occured!!");
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
      })
      this.comments.push(comment);
		}, err => {
			alert("Error occured!!");
		});
	}

  onClickAddComment() {
    this.comment.User = localStorage.getItem('activeUser');
    this.comment.Post = this.postId;

    this.viewPostService.saveComment(this.comment).then(res => {
      this.commentId = res;
      this.savePost(this.post);
    }, err => {
      alert("Error occured!!");
    });
  }

	savePost(post: Post) {
		this.post?.Comments.push(this.commentId);
    this.viewPostService.updatePost(this.postId,this.post);
	}
}

