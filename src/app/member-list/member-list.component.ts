import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GLOBAL } from '../app-config';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Member } from '../models/member';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  //public dataSource: Member[] = [];
  public dataSource: MatTableDataSource<Member>; // casting
  constructor(private memberservice: MemberService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([] as Member[])
  }

  ngOnInit(): void 
  {
    this.fetchDataSource();
  }
  //ds tab ngContainer on fait la correspondance
  displayedColumns: string[] = ['id', 'cin', 'name', 'createdDate', 'cv', 'type', 'actions']
  private fetchDataSource(): void {
    // this.dataSource.data = this.memberservice.Tab;
    //this.dataSource.data = this.memberservice.Tab;
    this.getMembers();
  }
  onRemoveAccount (id : string) 
  {
    ///this.memberservice.onRemoveAccount(id).then(() => this.dataSource = this.memberservice.Tab)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    dialogRef.afterClosed().pipe().subscribe (
      isDeletedConfirmed => {
      if (isDeletedConfirmed) 
      {this.memberservice.onRemoveAccount(id).then(() => this.dataSource.data = this.memberservice.Tab)}
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getMembers() : void
  {
    this.memberservice.getAllMembers().then((data) => this.dataSource.data = data);
  }
}




