import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/core/model';
import { environment } from 'src/environments/environment';

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

  pessoasUrl = environment.apiUrl + '/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

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
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.pessoasUrl}`, { headers });

  }

  excluir(codigo: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise();
  }

  alterarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers }).toPromise();
  }

  adicionar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    console.log(pessoa);

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers });
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers });
  }

  buscarPorCodigo(codigo: number): Observable<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers });
  }

}
