import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,

  ) {
    this.isAdmin = this.authService.isAdmin();
  }
}
