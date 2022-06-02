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
  fileToUpload: File | any = null;
  base64: string | any = '';

  constructor(
    private postService: PostService,
    private loginService: LoginService,
    public dialogRef: MatDialogRef<NewPostDialogComponent>
  ) {}

  ngOnInit(): void {}

  removeImage() {
    this.fileToUpload = null;
    this.base64 = '';
  }

  publishPost() {
    let requestBody: any = new Object();
    requestBody.ownerId = this.loginService.getCurrentUser().userID;
    requestBody.content = this.post.content;
    requestBody.links = [];
    requestBody.imageBase64 = '';
    if (this.fileToUpload != null && this.base64.includes('data:image/jpeg')) {
      requestBody.imageBase64 = this.base64.substring(23);
    } else if (
      this.fileToUpload != null &&
      this.base64.includes('data:image/png')
    ) {
      requestBody.imageBase64 = this.base64.substring(22);
    }

    this.postService.publishPost(requestBody).subscribe((data) => {
      this.dialogRef.close();
      alert('Post succesfully shared!');
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.getBase64(this.fileToUpload).then((data) => (this.base64 = data));
  }

  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
