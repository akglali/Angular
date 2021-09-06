import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostPageComponent} from "./post-page/post_page.component";
import {LoginComponent} from "./login/login.component";
import {SinglePostComponent} from "./single-post/single-post.component";

const routes: Routes = [
  {path:'',component:LoginComponent ,pathMatch:'full'},
  {path:'post_page', component:PostPageComponent},
  {path:"single_post/:postId",component:SinglePostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
