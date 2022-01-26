import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lancamento } from './../../core/model';

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
  accessToken: string = 'Bearer eyJraWQiOiJjMWFjOWExYy04MTgzLTQyMjgtOTFiNS04MzBjYjNkMmY0N2EiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiYXVkIjoiYW5ndWxhciIsIm5iZiI6MTY0MzIyNDUwMywic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwIiwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDMzMTA5MDMsImlhdCI6MTY0MzIyNDUwMywiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXX0.u8jxBlXOYywRfQLyW2_ehPm64cbtho9fqz--zbQPrN-Y7ajvf7XOv1WPhGHq-iia25AYQIzRyoU2-aJuJcaYUfQj4PGuUIJ28fk_yasnT9I9M9nzM9ZNaLNvGMLukvYCjAMH3GdOiXAEGzPqOe1DUXNYhjJpqngESC-cxjJMRZM24bnb50j8IdzEHc7uh3optwOLJdvYCjPpH003i3cYkVNVjPjPOMJdNdtQ3DkedKcJcvyVsnJdNkZO33dgK-Lt8VV3vVXUBwIB5c3KDuO7QJeiOfWsY6_8tI7cUmRQjcrlGjxstKssiJIvxWgvlp9licOs6i8dIuIC8s8Fgqgu4A';

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

  adicionar(lancamento: Lancamento): Observable<Lancamento> {
    const headers = new HttpHeaders().append('Authorization', this.accessToken).append('Content-Type', 'application/json');

    console.log(lancamento);

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers });

  }
}
