import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from './../../categorias/service/categoria.service';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/service/pessoa.service';
import { LancamentoService } from './../service/lancamento.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ]

  categorias: any[] = [];
  pessoas: any[] = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscaPorCodigo(codigo)
      .subscribe(lancamento => {
        console.log(lancamento);
        this.converterStringsParaDatas([lancamento]);
        this.lancamento = lancamento;
      });
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(form)
    } else {
      this.adicionaLancamento(form);
    }
  }

  adicionaLancamento(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(lancamentoAdicionado => {
        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento adicionado com sucesso!'
        });
        // lancamentoForm.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
  }

  atualizarLancamento(lancamentoForm: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
      .subscribe(lancamento => {
        this.lancamento = lancamento;

        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento alterado com sucesso!'
        });
      })
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().subscribe((categorias: any) => {
      this.categorias = categorias.map((c: any) => {
        return { label: c.nome, value: c.codigo }
      });
    })
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas().subscribe((pessoas: any) => {
      this.pessoas = pessoas['content'].map((p: any) => {
        return { label: p.nome, value: p.codigo }
      });
    })
  }

  private converterStringsParaDatas(lancamentos: any[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = new Date(lancamento.dataVencimento);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(lancamento.dataPagamento)
      }

    }
  }

  novo(form: NgForm) {
    form.reset();
    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);
    this.router.navigate(['/lancamentos/novo']);
  }


}
