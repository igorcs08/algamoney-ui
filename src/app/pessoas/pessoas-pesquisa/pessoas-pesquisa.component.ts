import { PessoaService } from './../service/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { PessoaFiltro } from '../service/pessoa.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas: any[] = [];

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {

  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    let pagina = 0;
    if (event.first && event.rows) {
      pagina = event.first / event.rows;
    }
    this.pesquisar(pagina);
  }

  listar() {
    this.pessoaService.listar()
    .then(resultado => {
      this.pessoas = resultado.pessoas;
    });
  }

}
