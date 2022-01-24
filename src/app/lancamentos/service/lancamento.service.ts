import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class LancamentoFiltro {
  descricao: string = '';
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  accessToken: string = 'Bearer eyJraWQiOiIzMDkxZDQ0Ny0xMjZkLTRlMjktOWJlNC1hZDkyNTVlYzBlM2YiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiYXVkIjoiYW5ndWxhciIsIm5iZiI6MTY0MzA1ODQwMSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwIiwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDMxNDQ4MDEsImlhdCI6MTY0MzA1ODQwMSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXX0.PYzRURb1EqVPerMTO7lHp-jPLnXd43yuNMk7ROoawjq0tXYTXpL-gcp5kv_D-ifu0k59lPGr_r4-aLbpFJJUPHGtNvKGbqSfZsTfStQo0pkviBk73Tii7yTWF14NJcQQaTgAK-VBo-vigTbnPSUmf413b9V-jCfc2TxSxWO6xffMkxfGzfmjNNUj5dbVAVlxZDpuCWRAGWEWm_tCwW2gINm8JekJ5mksUw0DPu4khC9rNCkEJtZTzs9N8ncH8MOEChPOgxnBjhUdKzZixV9CtJspuUdt8bEbP4KckJOdUUba1BrVw9iuA3GjLhquKMJz7L29_ldRr5hBzol9LrNfAA';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', this.accessToken);

    let params = new HttpParams();

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response['content'];
        const resultado = {
          lancamentos: lancamentos,
          total: response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', this.accessToken);

    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise();

  }
}
