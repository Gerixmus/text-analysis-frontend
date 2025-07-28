import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-documents',
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './documents.html',
  styleUrl: './documents.css'
})
export class Documents {
  currentPage = 1;
  itemsPerPage = 12;
  files: { name: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFiles()
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
