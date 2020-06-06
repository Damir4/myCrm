import { AuthService } from './shaped/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{
  constructor(private auth:AuthService){}

  ngOnInit(){
    const potenialToken= localStorage.getItem('auth-token')
    if(potenialToken){
      this.auth.setToken(potenialToken)
    }
  }
}
