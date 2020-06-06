import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialInstance } from './../../classes/material.service';
import { User } from './../../interfaces';
import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-loyaut',
  templateUrl: './site-loyaut.component.html',
  styleUrls: ['./site-loyaut.component.css']
})
export class SiteLoyautComponent implements AfterViewInit,OnInit {
 @ViewChild('floating') floatingRef: ElementRef
 @ViewChild('modal') modalRef: ElementRef
 @ViewChild('input') inputRef: ElementRef
 modal: MaterialInstance
 exchang = false
 user
 image: File
 imagePreview 
 form: FormGroup
 disbl: Boolean = true
 links = [
  {url: '/analytics', name: 'Аналитика',icon:'trending_up',activ:true},
  {url: '/overview', name: 'Обзор',icon:'today',activ:true},
  {url: '/history', name: 'История',icon:'history',activ:true},
  {url: '/order', name: 'Добавить заказ',icon:'add_shopping_cart',activ:true},
  {url: '/categories', name: 'Ассортимент',icon:'assignment',activ:true},
  {url: '/todoist', name: 'Документация',icon:'book',activ:true}
]

 constructor(private auth: AuthService,
             private router: Router) { }

ngOnInit(){
  this.form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })
  this.getUser()
}
 ngAfterViewInit(){
  MaterialService.initializeFloatingButton(this.floatingRef)
  this.modal = MaterialService.initModal(this.modalRef)
  
  MaterialService.updateTextInputs()
 }
 getUser(){
  this.user = this.auth.info().subscribe(info=>{
    this.user = info
    if(info[0].email==='administrator@mail.ru' && info[0].name==='admin'){
      this.links[3].activ=false
      this.links[4].activ=false
      this.disbl = false
    }
    
    console.log(this.links)
    this.imagePreview = info[0].imgSrc
    this.form.patchValue({
      name:info[0].name,
      email:info[0].email
    })
  })
 }

 logout(event: Event) {
  event.preventDefault()
  
  this.auth.logout()
  this.router.navigate(['/login'])
}
currency(){
  this.exchang = !this.exchang
}

open(){
  this.modal.open()
}

close(){
  this.modal.close()
}
onSubmit(){
  const name = this.form.value.name
  const email = this.form.value.email
  this.auth.update(name,email,this.image).subscribe(
    users => {
      
      MaterialService.toast('Изменения сохранены')
    },
    error => MaterialService.toast(error.error.message),
  )
  this.getUser()
  this.modal.close()
}
triggerClick(){
  this.inputRef.nativeElement.click()
}
onFileUpload(event:any){
  const file = event.target.files[0]
  this.image = file

  const reader = new FileReader()

  reader.onload = () => {
    this.imagePreview = reader.result
  }

  reader.readAsDataURL(file)
}

}
