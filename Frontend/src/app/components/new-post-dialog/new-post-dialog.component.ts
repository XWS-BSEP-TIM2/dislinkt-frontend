import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/model/post';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrls: ['./new-post-dialog.component.scss'],
})
export class NewPostDialogComponent implements OnInit {
  post: Post = new Post();

  constructor(
    private postService: PostService,
    private loginService: LoginService,
    public dialogRef: MatDialogRef<NewPostDialogComponent>
  ) {}

  ngOnInit(): void {}

  removeImage() {}

  publishPost() {
    let requestBody: any = new Object();
    requestBody.ownerId = this.loginService.getCurrentUser().userID;
    requestBody.content = this.post.content;
    requestBody.links = [];
    requestBody.imageBase64 = '';
    console.log(requestBody);

    this.postService.publishPost(requestBody).subscribe((data) => {
      this.dialogRef.close();
      alert('Post succesfully shared!');
    });
  }
}
