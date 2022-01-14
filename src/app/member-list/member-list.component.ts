import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Member } from '../models/member.model';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  public dataSource: Member[] = [];
  //public dataSource: MatTableDataSource<Member>; // casting
  constructor(private memberservice: MemberService, private dialog: MatDialog) {
    //this.dataSource = new MatTableDataSource([] as Member[])
  }

  ngOnInit(): void 
  {
    this.getAllMembers();
  }
  //ds tab ngContainer on fait la correspondance
  displayedColumns: string[] = ['id', 'cin', 'nom','prenom', 'type', 'cv', 'date','email','photoURL', 'actions']
  private fetchDataSource(): void {
    // this.dataSource.data = this.memberservice.Tab;
    //this.dataSource.data = this.memberservice.Tab;

  }
  onRemoveAccount (id : string) 
  {
    ///this.memberservice.onRemoveAccount(id).then(() => this.dataSource = this.memberservice.Tab)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    dialogRef.afterClosed().pipe().subscribe (
      isDeletedConfirmed => {
      if (isDeletedConfirmed) 
      {this.memberservice.deleteMemberById(id);}
      }
    )
  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  getAllMembers() {
    this.memberservice.getAllMembers().then((members) => {
      this.dataSource = members;
      this.dataSource.forEach((member) => {
  
      })
   
    });
  }

  getMembers(): void {
    this.memberservice.getAllMembers().then((members)=>{
    console.log(members);
    this.dataSource = members;
    });
  }
}




