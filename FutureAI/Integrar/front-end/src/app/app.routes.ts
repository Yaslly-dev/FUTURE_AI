import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ResultComponent } from './upload/result/result.component';


export const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'result', component: ResultComponent },
];
