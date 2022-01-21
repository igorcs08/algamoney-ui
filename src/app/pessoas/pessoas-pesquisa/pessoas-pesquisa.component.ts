import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';
import { PessoaFiltro } from '../service/pessoa.service';
import { PessoaService } from './../service/pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas: any[] = [];
  @ViewChild('tabela') grid!: Table;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

  }

  pesquisar(pagina = 0) {
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

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja remover?',
      accept: () => {
        this.excluir(pessoa)
      },
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Pessoa removida com sucesso!' })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  alterarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;
    this.pessoaService.alterarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        this.grid.reset();
        const acao = novoStatus ? 'ativada' : 'desativada';
        this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!` })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
