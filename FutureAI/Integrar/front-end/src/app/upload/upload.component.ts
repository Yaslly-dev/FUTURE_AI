import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  imports: [CommonModule]
})
export class UploadComponent {
  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.zone.run(() => {
        this.selectedFile = input.files![0]; // '!' para garantir ao TypeScript que não é null
        console.log("Arquivo selecionado:", this.selectedFile);
        this.cdr.detectChanges();
      });
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // ✅ Evita reload da página
    console.log("onSubmit chamado");

    if (!this.selectedFile) {
      console.warn("Nenhum arquivo selecionado");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8000/uploadfile/', formData).subscribe({
      next: (res: any) => {
        console.log("Arquivo enviado com sucesso:", res);
        localStorage.setItem('graficoData', JSON.stringify(res));
        this.router.navigate(['/result']);
      },
      error: (err) => {
        console.error('Erro ao enviar o arquivo:', err);
      }
    });
  }
}
