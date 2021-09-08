import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Comment} from "../helpers/comment.interface";
import {Post} from "../helpers/post.interface";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single_post.component.scss']
})
export class SinglePostComponent implements OnInit {
  postUrl = "http://localhost:8000/post/";
  commentUrl = "http://localhost:8000/comment/"
  showCommentStatus = false;
  token = '';
  textField = "";
  editTextField = "";
  allComments: Comment[] = [];
  singlePost: Post[] = [];
  edit = false;
  postId: string | null | undefined;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get("postId");
    this.token = <string>localStorage.getItem('token');
    this.singlePostInfo()
    this.getAllComment()
    this.checkTheOwner()
  }


  editStatus() {
    this.edit = !this.edit
  }

  editText() {
    this.http.post<Post>(this.postUrl + "edit/" + this.postId, {textField: this.editTextField}, {headers: {'Token': this.token}}).subscribe((data:any) => {
      let dateYear = new Date(data.DateCreated).toLocaleDateString()
      let dateTime = new Date(data.DateCreated).toLocaleTimeString()
      data.DateCreated = dateYear + " " + dateTime;
      this.singlePost[0].DateCreated=data.DateCreated;
      this.singlePost[0].TextContent=data.TextContent;
    },(error) => {
      alert(error.error.Error)
    })
  }

  checkTheOwner() {
    this.http.get<boolean>(this.postUrl + "getowner/" + this.postId, {headers: {'Token': this.token}}).subscribe((data: boolean) => {
      if (data) {
        this.singlePost[0].Owner = true
      }
    })
  }

  singlePostInfo() {
    this.http.get<Post>(this.postUrl + "getpost/" + this.postId).subscribe((data) => {
      let dateYear = new Date(data.DateCreated).toLocaleDateString()
      let dateTime = new Date(data.DateCreated).toLocaleTimeString()
      data.DateCreated = dateYear + " " + dateTime;
      this.singlePost.push(data)
    }, (error) => {
      alert(error.error.Error);
    })
  }

  showComment() {
    this.showCommentStatus = !this.showCommentStatus
    console.log(this.showCommentStatus)
  }

  getAllComment() {
    this.http.get<Comment>(this.commentUrl + "get_comment/" + this.postId).subscribe((data: any) => {
      for (let val in data) {
        let dateYear = new Date(data[val].CommentDateCreated).toLocaleDateString()
        let dateTime = new Date(data[val].CommentDateCreated).toLocaleTimeString()
        data[val].CommentDateCreated = dateYear + " " + dateTime;
        console.log(data[val])
        this.allComments.push(data[val])
      }
    }, (error => {
      alert(error.error.Error)
    }))
  }

  comment() {
    this.showCommentStatus = !this.showCommentStatus;
    this.http.post<Comment>(this.commentUrl + "post", {
      postId: this.postId,
      textField: this.textField
    }, {headers: {'Token': this.token}}).subscribe((data) => {
      let dateYear = new Date(data.CommentDateCreated).toLocaleDateString()
      let dateTime = new Date(data.CommentDateCreated).toLocaleTimeString()
      data.CommentDateCreated = dateYear + " " + dateTime;
      this.singlePost[0].CommentCount = this.singlePost[0].CommentCount + 1
      this.allComments.unshift({
        CommentId: data.CommentId,
        PostId: data.PostId,
        TextField: data.TextField,
        Nickname: data.Nickname,
        Likes: data.Likes,
        Dislikes: data.Dislikes,
        CommentColor: data.CommentColor,
        CommentDateCreated: data.CommentDateCreated
      })
    })
  }

}
