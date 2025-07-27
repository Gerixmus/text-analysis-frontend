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
  files: { name: string }[] = [];

  constructor(private http: HttpClient) {}

   ngOnInit(): void {
    this.fetchFiles()
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("file", file);

      const upload$ = this.http.post("http://localhost:3000/files", formData);

      upload$.subscribe({
        next: (res) => {
          console.log('Upload success:', res);
          this.fetchFiles();
        },
        error: (err) => console.error('Upload failed:', err)
      });
    }
  }

  fetchFiles(): void {
    this.http.get<{ name: string }[]>("http://localhost:3000/files").subscribe({
      next: (files) => {
        this.files = files.filter(file => !file.name.includes('_summary.txt'));
      },
      error: (err) => console.error('Failed to fetch files:', err)
    });
  }
}
