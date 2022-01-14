import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../models/member.model';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent implements OnInit {
  //form:FormGroup; ama tji error
  form: any;
  currentId: any;
  item: any;
  item1: any;
  constructor(
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  onSubmit(): void {
    const memberToSave = { ...this.item1, ...this.form.value };
    console.log(memberToSave);
    this.memberService
      .saveMember(memberToSave)
      .then(() => this.router.navigate(['/members']));
  }
  InitForm(item: any): void {
    this.form = new FormGroup({
      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      cv: new FormControl(item?.cv, []),
      type: new FormControl(item?.type, [Validators.required]),
      email: new FormControl(item?.email, [Validators.required]),
      photoURL: new FormControl(item?.photoURL, [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.currentId = this.activatedRoute.snapshot.params.id;
    console.log(this.currentId);
    if (!!this.currentId) {
      this.memberService.getMemeberById(this.currentId).then((item) => {
        this.item1 = item;
        this.InitForm(this.item1);
      });
    } else {
      this.InitForm(null);
    }
  }
}
