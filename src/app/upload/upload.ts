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
  files: { name: string }[] = [];
  currentPage = 1;
  itemsPerPage = 12;

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

  get paginatedFiles() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.files.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.files.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
}
}
