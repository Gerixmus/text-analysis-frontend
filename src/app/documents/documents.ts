import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  imports: [MatCardModule, MatIconModule, CommonModule, MatMenuModule, FormsModule, MatPaginatorModule, MatTableModule],
  templateUrl: './documents.html',
  styleUrl: './documents.css'
})
export class Documents {
  displayedColumns: string[] = ['name', 'status', 'uploaded', 'actions'];

  pageIndex = 0;
  pageSize = 10;

  files: { name: string }[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchFiles()
  }

  fetchFiles(): void {
    this.http.get<{ name: string }[]>(`${environment.apiBaseUrl}/files`).subscribe({
      next: (files) => {
        this.files = files;
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

  handleFileDeletion(id: string) {
    this.http.delete(`${environment.apiBaseUrl}/files/${id}`).subscribe({
      next: () => {
        this.fetchFiles();
      },
      error: err => {
        console.error('Failed to delete file:', err);
      }
    });
  }

  handleDocumentNavigation(id: string) {
    this.router.navigate([`/documents/${id}`]);
  }
}
