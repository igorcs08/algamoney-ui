import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(): Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer eyJraWQiOiI3YzdmODAxNi05NzlkLTRjYzctYjdhNy05OWI1NWU1ZWEyNzIiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiYXVkIjoiYW5ndWxhciIsIm5iZiI6MTY0MjcwMDgwMiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDgwIiwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDI3ODcyMDIsImlhdCI6MTY0MjcwMDgwMiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXX0.BF-FpkNH9mnqcxC552rC15D7NJQ-MTkm3nlDk2NFopM8LWHF2Z8eTbdMFxIwlg08RNw5Qh7ramTSKGFBOQ7ukcl3O5C6s2vZKnJYVa5rTg_dbEyQsGZH3sBD4sUlxwyCFjRcAIMRScLXdPZG7oQBj2QAxu4KLhI0kEXgjWD8Q3EYGMp09awfHsCVCwIBlMQ04k9YCIlsDu6bJ2mOfNKLpYIKDKjJ1wOh361BvLJew5UwILl2mjz3EGig9Nvdl1ZWR6Lu1Epv1b_OiKciBobSqG3yvnkJifxhftk9sqmzg7Fl8b8YE7aYsM6FseT4lJrBiv2OAx2qvUGCUqy_k2K1tQ');

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers })
      .toPromise()
      .then((response: any) => response['content']);
  }
}