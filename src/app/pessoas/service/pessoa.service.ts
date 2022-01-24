import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  accessToken: string = 'Bearer eyJraWQiOiIzMDkxZDQ0Ny0xMjZkLTRlMjktOWJlNC1hZDkyNTVlYzBlM2YiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiYXVkIjoiYW5ndWxhciIsIm5iZiI6MTY0MzA1ODQwMSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwIiwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDMxNDQ4MDEsImlhdCI6MTY0MzA1ODQwMSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXX0.PYzRURb1EqVPerMTO7lHp-jPLnXd43yuNMk7ROoawjq0tXYTXpL-gcp5kv_D-ifu0k59lPGr_r4-aLbpFJJUPHGtNvKGbqSfZsTfStQo0pkviBk73Tii7yTWF14NJcQQaTgAK-VBo-vigTbnPSUmf413b9V-jCfc2TxSxWO6xffMkxfGzfmjNNUj5dbVAVlxZDpuCWRAGWEWm_tCwW2gINm8JekJ5mksUw0DPu4khC9rNCkEJtZTzs9N8ncH8MOEChPOgxnBjhUdKzZixV9CtJspuUdt8bEbP4KckJOdUUba1BrVw9iuA3GjLhquKMJz7L29_ldRr5hBzol9LrNfAA';

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


}
