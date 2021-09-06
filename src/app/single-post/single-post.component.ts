import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls:['./single_post.component.scss']
})
export class SinglePostComponent implements OnInit {


  singlePost=<any>[]
  postId: string | null|undefined;
  constructor(private route:ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.postId=this.route.snapshot.paramMap.get("postId");
    this.singlePostInfo()
  }

  singlePostInfo(){
    this.http.get<any>("http://localhost:8000/post/getpost/"+this.postId).subscribe((data)=>{

        let dateYear = new Date(data.DateCreated).toLocaleDateString()
        let dateTime = new Date(data.DateCreated).toLocaleTimeString()
        data.DateCreated=dateYear + " " + dateTime;
        this.singlePost.push(data)

    },(error) => {
      alert(error.error.Error);
    })
  }

}
