import { SuccessMessageComponent } from './../success-message/success-message.component';
import { CalanderBodyService } from './../calander-body.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calander-dialog',
  templateUrl: './calander-dialog.component.html',
  styleUrls: ['./calander-dialog.component.scss']
})
export class CalanderDialogComponent implements OnInit {

  constructor(private _calander: CalanderBodyService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  callCalander(mail:string){
if(mail != ''){
  this._calander.sendBody.emit(mail)
  this._snackBar.open('uw oproep succesvol gepland', 'jaaa!!' , {duration: 3000 , panelClass: ['blue-snackbar']})
}
else{
  this._snackBar.open('Vul een geldig e-mailadres in', 'Oke', {duration: 3000 , panelClass: ['blue-snackbar']})

}

  }

}
