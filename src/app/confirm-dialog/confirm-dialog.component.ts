import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public title = "Are You Sure";
  public Message = "do you really want to delete this item?";
  public Cancel = "Cancel"
  public confirm = "confirm"

  constructor(public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
  }

}