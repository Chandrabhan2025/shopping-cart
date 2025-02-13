import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userObj: any = {
    username:'',
    password:''
  }

  router = inject(Router);

  constructor(private http: HttpClient, private toastr: ToastrService, private authservice: AuthServiceService, private cdr: ChangeDetectorRef){}

  onLogin(){
    this.http.post("http://localhost:8090/auth/login", this.userObj).subscribe((res: any) => {
      // localStorage.setItem("token", res);
      console.log(res.token);
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.userID)
      localStorage.setItem("user", JSON.stringify(res));
      this.authservice.setRole(res.role);
      console.log(res);
      if(res!==null){
        this.toastr.success('Successfull', 'Toastr fun!');
        this.router.navigateByUrl('');
      }
     
    })
  }

}
