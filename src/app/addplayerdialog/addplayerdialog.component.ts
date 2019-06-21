import { Component, OnInit, Inject } from '@angular/core';
import { Player } from 'src/datatypes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-addplayerdialog',
  templateUrl: './addplayerdialog.component.html',
  styleUrls: ['./addplayerdialog.component.css']
})
export class AddplayerdialogComponent implements OnInit {


  // player: Player = { id: 0, name: '', nickName: '' };
  constructor(public dialogRef: MatDialogRef<AddplayerdialogComponent>,
              @Inject(MAT_DIALOG_DATA) public player: Player) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
