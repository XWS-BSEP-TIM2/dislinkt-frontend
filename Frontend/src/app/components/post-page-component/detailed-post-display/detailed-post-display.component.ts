import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Post } from 'src/app/model/post';
import { LoginService } from 'src/app/services/login.service';
import { PostService } from 'src/app/services/post.service';
import { PhotoLightBoxComponent } from '../photo-light-box/photo-light-box.component';

@Component({
  selector: 'detailed-post-display',
  templateUrl: './detailed-post-display.component.html',
  styleUrls: ['./detailed-post-display.component.scss'],
})
export class DetailedPostDisplayComponent implements OnInit {
  @Input() post: Post = new Post();
  timestamp: Date = new Date();
  loaded: boolean = false;
  loggedInUser: boolean = false;
  likesCount: number = 0;
  commentsCount: number = 0;
  imagePath: SafeResourceUrl | null = null;
  likedByUser: boolean = false;
  dislikedByUser: boolean = false;
  likeId: string = '';
  dislikeId: string = '';

  constructor(
    private postService: PostService,
    private _sanitizer: DomSanitizer,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {
    this.loggedInUser = this.loginService.isUserLoggedIn();
  }

  ngOnInit(): void {
    if (this.post.image_base64 != null) {
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + this.post.image_base64
      );
    }

    this.refreshNumbers();
  }

  refreshNumbers(): void {
    this.postService.getPostHref(this.post.hrefs[2].url).subscribe((data) => {
      if (data.reactions != undefined) {
        this.likesCount = data.reactions.length;

        if (this.loggedInUser) {
          this.isPostLikedByUser(data.reactions);
        }
      } else {
        this.likesCount = 0;
      }

      this.postService.getPostHref(this.post.hrefs[1].url).subscribe((data) => {
        if (data.comments != undefined) {
          this.commentsCount = data.comments.length;
        } else {
          this.commentsCount = 0;
        }

        this.postService
          .getPostHref(this.post.hrefs[3].url)
          .subscribe((data) => {
            if (data.reactions != undefined) {
              if (this.loggedInUser) {
                this.isPostDislikedLikedByUser(data.reactions);
              }
            }
            this.loaded = true;
          });
      });
    });
  }

  reloadPost() {
    this.postService.getPostHref(this.post.hrefs[0].url).subscribe((data) => {
      this.post = data.post;
    });
  }

  isPostLikedByUser(reactions: any) {
    this.likedByUser = false;
    let urlMatch = 'profile/' + this.loginService.getCurrentUser().userID;
    for (let reaction of reactions) {
      if (reaction.hrefs[1].url == urlMatch) {
        this.likedByUser = true;
        this.dislikedByUser = false;
        this.likeId = reaction.hrefs[0].url;
        break;
      }
    }
  }

  isPostDislikedLikedByUser(reactions: any) {
    this.dislikedByUser = false;
    let urlMatch = 'profile/' + this.loginService.getCurrentUser().userID;
    for (let reaction of reactions) {
      if (reaction.hrefs[1].url == urlMatch) {
        this.likedByUser = false;
        this.dislikedByUser = true;
        this.dislikeId = reaction.hrefs[0].url;
        break;
      }
    }
  }

  redirectAuthorProfile() {
    window.location.href = this.post.hrefs[4].url;
  }

  redirectPostPage() {
    window.location.href = this.post.hrefs[0].url;
  }

  likePost() {
    let requestBody: any = new Object();
    requestBody.ownerId = this.loginService.getCurrentUser().userID;
    this.postService
      .postPostHref(this.post.hrefs[2].url, requestBody)
      .subscribe((data) => {
        this.refreshNumbers();
      });
  }

  unlikePost() {
    this.postService.deletePostHref(this.likeId).subscribe((data) => {
      this.likedByUser = false;
      this.refreshNumbers();
    });
  }

  dislikePost() {
    let requestBody: any = new Object();
    requestBody.ownerId = this.loginService.getCurrentUser().userID;
    this.postService
      .postPostHref(this.post.hrefs[3].url, requestBody)
      .subscribe((data) => {
        this.refreshNumbers();
      });
  }

  undislikePost() {
    this.postService.deletePostHref(this.dislikeId).subscribe((data) => {
      this.dislikedByUser = false;
      this.refreshNumbers();
    });
  }

  openImageLightbox() {
    this.dialog.open(PhotoLightBoxComponent, { data: {imgData: this.imagePath}});
  }
}
