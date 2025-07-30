import { Routes } from '@angular/router';
import { Documents } from './documents/documents';
import { Upload } from './upload/upload';

export const routes: Routes = [
  { path: '', component: Upload },
  { path: 'upload', component: Upload },
  { path: 'documents', component: Documents },
  { path: 'documents/:id', component: Documents }
];
