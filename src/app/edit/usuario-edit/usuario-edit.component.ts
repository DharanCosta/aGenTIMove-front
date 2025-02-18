import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmarSenha: string;
  tipoUsuario: string;
  // idUsuario: number

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ""){
      alert("Sua seção expirou, faça o login novamente.")
      this.router.navigate(["/login"])

    }

    this.authService.refreshToken()
    let idUsuario = this.route.snapshot.params['id']
    // this.findByIdUsuario(this.idUsuario)
    this.findByIdUsuario(idUsuario)
  }


  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  atualizar(){
    this.usuario.tipo = this.tipoUsuario
    if (this.usuario.senha != this.confirmarSenha) {
      alert("As senhas não coincidem, tente novamente")
    } else {
      this.authService.atualizar(this.usuario).subscribe((resp: Usuario)=> {
        this.usuario = resp
        alert("Usuário atualizado com sucesso! Faça o login novamente.")
        environment.token = ''
        environment.foto = ''
        environment.usuario = ''
        environment.nome = ''
        environment.id = 0
        this.router.navigate(["/login"])
      })
    }
  }


  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
      this.usuario.senha = ''
    })
  }
}
