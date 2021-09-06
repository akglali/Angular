import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
@Component({
  selector: 'app-post-page',
  templateUrl: './post_page.component.html',
  styleUrls: ['post_page.component.scss']
})
export class PostPageComponent implements OnInit{
  textField='';
  url="http://localhost:8000/post/"

  token=<string>localStorage.getItem('token');
  showButton:boolean=true;

  allPosts: Post[] = []
  ngOnInit() {
    this.getAllPosts()
  }

  constructor(private http: HttpClient,private router:Router) {}

  //getAllPosts is getting all post info from the server and put them into the array
  getAllPosts(){
    this.http.get<Post>(this.url+'getallpost').subscribe((data:any) => {
      for (let val in data){
        let dateYear = new Date(data[val].DateCreated).toLocaleDateString()
        let dateTime = new Date(data[val].DateCreated).toLocaleTimeString()
        data[val].DateCreated=dateYear + " " + dateTime;
          this.allPosts.push(data[val])
      }
    }, (error) => {
      alert(error.error.Error);
    });
  }

  // showAll helps to show post or to create new post
  showAll = () =>{
    this.showButton= !this.showButton;
  }

  // getPostInfo will navigate you to specific post
  getPostInfo(postId:string ){
    this.router.navigate(['single_post',postId]);

  }

  // creating new post and unshift it to the front
  post = () =>{
    this.showButton= !this.showButton;
    this.http.post<Post>(this.url+'newpost',{
      textField:this.textField
    },{headers:{'Token':this.token}}).subscribe((data) => {
      this.allPosts.unshift({Color: data.Color,
        CommentCount: data.CommentCount,
        DateCreated: data.DateCreated,
        Dislikes: data.Dislikes, Likes: data.Likes,
        PostId: data.PostId,
        TextContent: this.textField,
        VirtualName: data.VirtualName})
    }, (error) => {
      alert(error.error.Error);
    });
  }

}


export interface Post{
  PostId:string
  TextContent: string
  Color: string
  VirtualName: string
  CommentCount: number
  Dislikes: number
  Likes :number
  DateCreated: string
}
