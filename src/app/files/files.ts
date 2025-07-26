import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-files',
  imports: [MatIconModule, CommonModule],
  templateUrl: './files.html',
  styleUrl: './files.css'
})
export class Files {

  fileName = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

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
