import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

export class User{
  name: any;
  email: any;
  profile_img: any;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  UserProfile!: User;

  constructor(public authService: AuthService){
    this.authService.profileUser().subscribe((data:any) => {
      this.UserProfile = data;
    });
  }

  ngOnInit(){}
}
