import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../models/member.model';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  //form:FormGroup; ama tji error 
  form: FormGroup =  new FormGroup({
    cin: new FormControl("",[Validators.required]),
    nom: new FormControl("",[Validators.required]),
    prenom: new FormControl("",[Validators.required]),
    date : new FormControl("",[Validators.required]),
    cv: new FormControl("",[]),
    type: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required]),
    photoURL: new FormControl("",[Validators.required]),
  }) ;
  currentId :any ;
  item : any;
  item1: any;
  constructor (private memberService : MemberService, private router : Router, private activatedRoute : ActivatedRoute) {}
  

onSubmit():void {
      
  const memberToSave={...this.item1 , ...this.form.value};
  this.memberService.saveMember(memberToSave).then(()=>this.router.navigate(['/members']));
     }

  ngOnInit(): void {
    
    this.currentId = this.activatedRoute.snapshot.params.id;
    console.log(this.currentId);
    if (!!this.currentId) 
    {
      this.memberService.getMemeberById(this.currentId).then
       ((item) => {this.item1 =item; 
        this.form.patchValue(item);
       })
    }
    
  }
 
}
