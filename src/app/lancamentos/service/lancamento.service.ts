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

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJraWQiOiI2NTJlNDBjNS02NzJhLTRlMTUtOTMzNi1jMmZlZTEwOGU4MWEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiYXVkIjoiYW5ndWxhciIsIm5iZiI6MTY0MjcxNDI4NSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwIiwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDI4MDA2ODUsImlhdCI6MTY0MjcxNDI4NSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXX0.WoR_15hhGYTmgeb0Twk5IOoRkNDinr4y7QaOe2TXniKXf6PxUFHRgOQOoBBCdLS5lP7bEjIVururuEBLiva9dtMYsVDgy4DuN1ldcO6dkhJfBStpz3cuKgjwTMOiumkCOtTj5uMvytN9HvHJvjRX44Tu5vDr-YXqJtyesRVMR2oNCraFTVMPkgLjmVtr-DRyIg6yc1gy3bq1-PmAwWsuJXOrWYwYCDyVZSbjex9YwAcM-8lJA-2-E2KIc0HQxT6P9J3W_jRHorveym9eJHCHuA_J--j9WRc45utlG9hYLegxtfCmeF8OHAcDDmQnRSlvcpqVyoddpNGBYYzUZnOIrg');

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
      .append('Authorization', 'Bearer eyJraWQiOiI2NTJlNDBjNS02NzJhLTRlMTUtOTMzNi1jMmZlZTEwOGU4MWEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiYXVkIjoiYW5ndWxhciIsIm5iZiI6MTY0MjcxNDI4NSwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwIiwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDI4MDA2ODUsImlhdCI6MTY0MjcxNDI4NSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXX0.WoR_15hhGYTmgeb0Twk5IOoRkNDinr4y7QaOe2TXniKXf6PxUFHRgOQOoBBCdLS5lP7bEjIVururuEBLiva9dtMYsVDgy4DuN1ldcO6dkhJfBStpz3cuKgjwTMOiumkCOtTj5uMvytN9HvHJvjRX44Tu5vDr-YXqJtyesRVMR2oNCraFTVMPkgLjmVtr-DRyIg6yc1gy3bq1-PmAwWsuJXOrWYwYCDyVZSbjex9YwAcM-8lJA-2-E2KIc0HQxT6P9J3W_jRHorveym9eJHCHuA_J--j9WRc45utlG9hYLegxtfCmeF8OHAcDDmQnRSlvcpqVyoddpNGBYYzUZnOIrg');

    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise();

  }
}
