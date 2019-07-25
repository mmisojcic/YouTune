import { ConfirmDialogData } from './../../models/confirm-dialog-data.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogAction } from '../../models/confirm-dialog-actions.enum';

@Component({
  selector: 'yt-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  actions = DialogAction;

  onNoClick(): void {
    this.dialogRef.close(this.actions.NO);
  }

  closeDialog(answer: DialogAction) {
    this.dialogRef.close(answer);
  }

  ngOnInit() {}
}
