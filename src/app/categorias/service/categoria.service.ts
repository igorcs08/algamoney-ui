import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';
  accessToken: string = 'Bearer eyJraWQiOiJjMWFjOWExYy04MTgzLTQyMjgtOTFiNS04MzBjYjNkMmY0N2EiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiYXVkIjoiYW5ndWxhciIsIm5iZiI6MTY0MzIyNDUwMywic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwIiwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDMzMTA5MDMsImlhdCI6MTY0MzIyNDUwMywiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXX0.u8jxBlXOYywRfQLyW2_ehPm64cbtho9fqz--zbQPrN-Y7ajvf7XOv1WPhGHq-iia25AYQIzRyoU2-aJuJcaYUfQj4PGuUIJ28fk_yasnT9I9M9nzM9ZNaLNvGMLukvYCjAMH3GdOiXAEGzPqOe1DUXNYhjJpqngESC-cxjJMRZM24bnb50j8IdzEHc7uh3optwOLJdvYCjPpH003i3cYkVNVjPjPOMJdNdtQ3DkedKcJcvyVsnJdNkZO33dgK-Lt8VV3vVXUBwIB5c3KDuO7QJeiOfWsY6_8tI7cUmRQjcrlGjxstKssiJIvxWgvlp9licOs6i8dIuIC8s8Fgqgu4A';

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<any> {
    const headers = new HttpHeaders()
      .append('Authorization', this.accessToken);

    return this.http.get<any>(this.categoriasUrl, { headers });
  }

}
