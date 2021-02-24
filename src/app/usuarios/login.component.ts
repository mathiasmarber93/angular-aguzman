import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = "Iniciar Sesión";
  usuario: Usuario;


  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      Swal.fire('Aviso', `Hola ${this.authService.usuario.username}, ya estas autenticado`, 'info');
      this.router.navigate(['/clientes'])
    }
  }

  login(): void {
    console.log(this.usuario);

    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error', 'Por favor, ingrese llene los campos', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['/clientes']);
      Swal.fire('Bienvenido', `Bienvenido ${usuario.username}`, 'success');
    }, err => {
      if (err.status == 400) {
        Swal.fire('Error', 'El usuario o contraseña no son validos', 'error');
      }
    }
    );
  }

}
