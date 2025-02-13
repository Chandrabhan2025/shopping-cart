import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SearchService } from '../../service/searchService';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  role: string = '';
  searchValue: string = '';
  router = inject(Router);
  constructor(private searchService: SearchService, private toastr: ToastrService,  private authservice: AuthServiceService, private cdr: ChangeDetectorRef){
      
  }
  ngOnInit(): void {
    this.loadRole();
  }

  loadRole(): void {
    this.role = this.authservice.getRole();
    this.cdr.detectChanges();
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('user') !== null;
  }

  logout(): void{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload()
    this.toastr.success("logout Successfull");
    
  }

  onSearch(): void {
    console.log(this.searchValue)
    this.searchService.setSearchQuery(this.searchValue);
  }


}
