import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';
  accessToken: string = 'Bearer eyJraWQiOiJiMDgzMTQzZi1mODkyLTQ2NjgtYTMxNi0yYmVmZTIzODViMjciLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiYXVkIjoiYW5ndWxhciIsIm5iZiI6MTY0Mjc4ODkwMCwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwIiwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDI4NzUzMDAsImlhdCI6MTY0Mjc4ODkwMCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXX0.Tx7WT0akCm7gl5SuanOKonoSH8UdSycSaflvQoEZrdUWeA-ORiY_pICntXKSzsPe7cANDsCaD0BSu0jQ_xcel2sGXXSSwdP1ZeDSXFkBmqldZEg8cK5mzs8BlG9E01uA-58wqKBQ0T8BKC0FXnXo15w9G_6ziL5CvnE5Hr3H-9TC4A0HMZ6gM5Hmu3gBwCuE-SX_QKHC4xnDYdDX0GRff7E7VtLEkAbaKgs8CeWfm2Hoa-04wms7nj5HqnZw7OvQkzk-VFH4L4eGo9MBS8B6SbkwLN_hNPdEO9VDxzDcwZ3OmqgFMi5XMnFk0Dnl32l8IltRNBm4s3mIXx9ZVuNnIQ';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', this.accessToken);

    return this.http.get(this.categoriasUrl, { headers })
      .toPromise();
  }

}
