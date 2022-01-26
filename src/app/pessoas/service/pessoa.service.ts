import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/core/model';

export class PessoaFiltro {
  nome: string = '';
  cidade: string = '';
  estado: string = '';
  ativo?: boolean;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas'
  accessToken: string = 'Bearer eyJraWQiOiJjMWFjOWExYy04MTgzLTQyMjgtOTFiNS04MzBjYjNkMmY0N2EiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiYXVkIjoiYW5ndWxhciIsIm5iZiI6MTY0MzIyNDUwMywic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwIiwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDMzMTA5MDMsImlhdCI6MTY0MzIyNDUwMywiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXX0.u8jxBlXOYywRfQLyW2_ehPm64cbtho9fqz--zbQPrN-Y7ajvf7XOv1WPhGHq-iia25AYQIzRyoU2-aJuJcaYUfQj4PGuUIJ28fk_yasnT9I9M9nzM9ZNaLNvGMLukvYCjAMH3GdOiXAEGzPqOe1DUXNYhjJpqngESC-cxjJMRZM24bnb50j8IdzEHc7uh3optwOLJdvYCjPpH003i3cYkVNVjPjPOMJdNdtQ3DkedKcJcvyVsnJdNkZO33dgK-Lt8VV3vVXUBwIB5c3KDuO7QJeiOfWsY6_8tI7cUmRQjcrlGjxstKssiJIvxWgvlp9licOs6i8dIuIC8s8Fgqgu4A';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', this.accessToken);

    let params = new HttpParams();
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, params })
      .toPromise()
      .then((response: any) => {
        const pessoas = response['content'];
        const resultado = {
          pessoas: pessoas,
          total: response['totalElements']
        };
        return resultado;
      });

  }

  listarTodas(): Observable<any> {
    const headers = new HttpHeaders()
      .append('Authorization', this.accessToken);

    return this.http.get(`${this.pessoasUrl}`, { headers });

  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', this.accessToken);

    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise();
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', this.accessToken)
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers }).toPromise();
  }

  adicionar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', this.accessToken)
      .append('Content-Type', 'application/json');

    console.log(pessoa);

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers });
  }


}
