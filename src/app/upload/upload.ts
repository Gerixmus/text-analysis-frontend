import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-upload',
  imports: [MatCardModule, MatIconModule,  CommonModule],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {
  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("file", file);

      const upload$ = this.http.post("http://localhost:3000/files", formData);

      upload$.subscribe({
        next: (res) => console.log('Upload success:', res),
        error: (err) => console.error('Upload failed:', err)
      });
    }
  }
}
