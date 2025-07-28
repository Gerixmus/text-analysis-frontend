import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-documents',
  imports: [MatCardModule, MatIconModule, CommonModule, MatMenuModule, FormsModule, MatPaginatorModule],
  templateUrl: './documents.html',
  styleUrl: './documents.css'
})
export class Documents {
  pageIndex = 0;
  pageSize = 10;

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
    const start = (this.pageIndex) * this.pageSize;
    return this.files.slice(start, start + this.pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
