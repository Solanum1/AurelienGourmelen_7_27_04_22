import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth!: boolean;

  

  constructor(private router: Router,
              private auth: AuthService
              ) { }

  onLogout() {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    this.router.navigate([`/`]);
  }

  reloadCurrentPage() {
    window.location.reload();
  }
  
  ngOnInit(): void {
    let token = this.auth.getToken();
    if (token == null) {
      this.isAuth = false;
    } else {
      this.isAuth = true;
    }
    setTimeout(() => {this.ngOnInit()}, 1000 * 0.1);
  }


  
}
