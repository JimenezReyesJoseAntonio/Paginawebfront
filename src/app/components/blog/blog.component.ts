import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,

  ) {
    this.isAdmin = this.authService.isAdmin();
  }
}
