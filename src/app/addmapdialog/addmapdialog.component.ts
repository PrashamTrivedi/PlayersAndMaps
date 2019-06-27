import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Map } from 'src/datatypes';

@Component({
  selector: 'app-addmapdialog',
  templateUrl: './addmapdialog.component.html',
  styleUrls: ['./addmapdialog.component.css']
})
export class AddmapdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddmapdialogComponent>,
              @Inject(MAT_DIALOG_DATA) public map: Map) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
