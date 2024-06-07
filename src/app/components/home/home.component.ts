import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FileService } from '../../services/file.service';
import { ImageService } from '../../services/image.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;
  imageSrc: string = '';
  image1: string = '';
  image2: string = '';
  image3: string = '';
  image4: string = '';
  image5: string = '';


  currentIndex = 0;

  carouselImages = [
    { id: 2, url: '' },
    { id: 3, url: '' },
    { id: 4, url: '' },
    { id: 5, url: '' },
  ];


  constructor(
    private authService: AuthService,
    private fileService: FileService,
    private imageServ:ImageService

  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    console.log('hola'+this.imageSrc);

    this.loadImage(1); // Suponiendo que deseas cargar la imagen con ID 1
    this.loadCarouselImages();


  }
  loadCarouselImages(): void {
    this.carouselImages.forEach((image, index) => {
      this.loadImage2(image.id, index);
    });
  }

  loadImage2(id: number, index: number): void {
    this.imageServ.getImagePathById(id).subscribe(response => {
      this.carouselImages[index].url = response.path;
    });
  }

  loadImage(id: number): void {
    this.imageServ.getImagePathById(id).subscribe(response => {
        this.imageSrc = response.path;
     
    });
  }  

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.fileService.uploadFile(file).subscribe(response => {
        console.log('Archivo subido:', response.filePath);
        this.updateImagePathChange(this.carouselImages[index].id, response.filePath);
      });
    }
  }

  updateImagePathChange(id: number, newPath: string): void {
    this.imageServ.updateImageById(id, newPath).subscribe(response => {
      console.log('Image path updated:', response);
      this.loadImage2(id, this.carouselImages.findIndex(image => image.id === id));
    });
  }

  editCarousel(): void {
    // Implementa la lógica de edición del carrusel para el admin
    console.log('Editar Carrusel');
  }

  editImage(): void {
    // Implementa la lógica de edición de la imagen para el admin
    console.log('Editar Imagen');
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.fileService.uploadFile(file).subscribe(response => {
      console.log('Archivo subido:', response.filePath);
      //this.getFile(response.filePath);
      this.updateImagePath(1, response.filePath); // Actualiza la imagen con ID 1

    });
  }

  updateImagePath(id: number, newPath: string): void {
    this.imageServ.updateImageById(id, newPath).subscribe(response => {
      console.log('Image path updated:', response);
      this.loadImage(id); // Recargar la imagen actualizada
    });
  }

  /*getFile(filePath: string) {
    this.fileService.getFile(filePath).subscribe(blob => {
      const fileURL = URL.createObjectURL(blob);
      this.imageSrc = fileURL;
      console.log('hola'+this.imageSrc);
    });
  }
    */

  updateImage(image: any) {
    // Implementa la lógica para actualizar la imagen 'image'
    console.log('Actualizando imagen:', image);
    // Puedes llamar a un servicio HTTP para actualizar la imagen en el servidor
  }

}
