import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Skillh } from 'src/app/model/skillh';
import { SkillhService } from 'src/app/servicios/skillh.service';

@Component({
  selector: 'app-edit-skillh',
  templateUrl: './edit-skillh.component.html',
  styleUrls: ['./edit-skillh.component.css']
})


export class EditSkillhComponent implements OnInit {

  skillh: Skillh = new Skillh("", 0);
  errorNombreSkillH: boolean = false;

  constructor(
    private service: SkillhService,
    public dialogRef: MatDialogRef<EditSkillhComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }



  ngOnInit(): void {
    this.service.detail(this.data.id).subscribe(data => {
      this.skillh = data;
    }, error => {
      this._snackBar.open(`Error al cargar skill: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
    })
  }



  onUpdate(id: any): void {
    this.validarLongitudNombreSkillH(); // validar la longitud del nombre de habilidad
    if (!this.errorNombreSkillH) { // si no hay error de longitud
    this.service.update(id, this.skillh).subscribe(data => {
      this.dialogRef.close();
      this._snackBar.open(`Skills actualizado correctamente`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
    }, error => {
      this._snackBar.open(`Error al actualizar skill: ${error.error.mensaje}`, 'Cerrar', {
        duration: 2000,
        verticalPosition: 'bottom'
      })
    })
  }  else {
    this._snackBar.open(`El nombre de la habilidad debe tener menos de 10 caracteres.`, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'bottom'
    })
  }
} 


  onNoClick(): void {
    this.dialogRef.close();
  }

  
  formatLabel(value: number) {
    return value + '%';
  }


   //VALIDACION DE ENTRADA POR TEMAS ESTETICOS
   validarLongitudNombreSkillH() {
    if (this.skillh.nombreSkillH && this.skillh.nombreSkillH.length > 10) {
      this.errorNombreSkillH = true;
    } else {
      this.errorNombreSkillH = false;
    }
  }
  


}
