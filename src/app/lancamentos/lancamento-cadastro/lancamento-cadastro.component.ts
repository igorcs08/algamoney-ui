import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';
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
  //lancamento = new Lancamento();
  formulario!: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.title.setTitle("Novo lançamento");
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo')!.value);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscaPorCodigo(codigo)
      .subscribe(lancamento => {
        this.converterStringsParaDatas([lancamento]);
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      });
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento()
    } else {
      this.adicionaLancamento();
    }
  }

  adicionaLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
      .subscribe(lancamentoAdicionado => {
        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento adicionado com sucesso!'
        });
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .subscribe((lancamento: Lancamento) => {
        this.formulario.patchValue(lancamento);
        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento alterado com sucesso!'
        });
        this.atualizarTituloEdicao();
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

  novo() {
    this.formulario.reset(new Lancamento);
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao')!.value}`)
  }


}
