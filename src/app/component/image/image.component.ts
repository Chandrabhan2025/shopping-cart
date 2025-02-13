import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image',
  imports: [FormsModule, CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent implements OnInit {
  uploadForm!: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      file: [null, Validators.required],
    });
  }

  onFileChange(event:any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  onSubmit(): void {
      this.uploadImage();
      this.loadImage();
    
  }

  uploadImage(): void {
    const formData = new FormData();
    if(this.selectedFile){
      formData.append('file', this.selectedFile);
    }
    console.log(formData);
   

    this.http.post('http://localhost:8082/image/upload', formData, {responseType: 'text'}).subscribe(
      (response) => {
        console.log('Image uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }

  loadImage(){
    this.http.get('http://localhost:8082/image/getimage/1', {responseType: 'blob'}).subscribe(res =>{
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(res);
     
    })
  }
}
