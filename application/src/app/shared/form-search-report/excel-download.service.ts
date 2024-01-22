// excel-download.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExcelDownloadService {

  constructor(private http: HttpClient) { }

  downloadExcelFile(url: string) {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;

        link.download = 'financial-report.xlsx';
        link.click();
      })
      .catch(err => {
        alert('Error has occurs')
        console.error(err)
      })
    // return this.http.get(url, { responseType: 'arraybuffer' });
  }
}
