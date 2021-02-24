import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'App Angular';

  constructor(public authService: AuthService, private router: Router) { }

  logout(): void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Sesion Finalizada', `${username}, cerro sesion`, 'success');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }



}
