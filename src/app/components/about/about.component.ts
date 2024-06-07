import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InfoService } from '../../services/info.service';
import { Informacion } from '../../models/infor.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent  implements OnInit{
  isAdmin: boolean = false;
  informacionEmpresa: Informacion | null = null;
  informacionForm: FormGroup;

  constructor(
    private authService: AuthService,
    private informacionEmpresaService: InfoService,
    private fb: FormBuilder
  ) {
    this.isAdmin = this.authService.isAdmin();
    this.informacionForm = this.fb.group({
      about: ['' ],
      mision: [''],
      vision: ['']
    });
  }

  ngOnInit(): void {
    this.loadInformacionEmpresa();
  }

  loadInformacionEmpresa(): void {
    const id = 1; // Asume que siempre estás obteniendo la información de la empresa con ID 1
    this.informacionEmpresaService.getInformacionEmpresa(id).subscribe(
      (data: Informacion) => {
        this.informacionEmpresa = data;
        this.informacionForm.patchValue(data);
      },
      error => {
        console.error('Error al obtener la información de la empresa', error);
      }
    );
  }

  updateInformacionEmpresa(): void {
    if (this.informacionForm.valid) {
      const updatedInfo = this.informacionForm.value;
      this.informacionEmpresaService.updateInformacionEmpresa(1, updatedInfo).subscribe(
        () => {
          this.loadInformacionEmpresa(); // Recargar la información después de actualizar
        },
        error => {
          console.error('Error al actualizar la información de la empresa', error);
        }
      );
    }
  }
}
