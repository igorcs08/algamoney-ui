import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Pessoa } from 'src/app/core/model';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';
import { PessoaService } from './../service/pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  //pessoa = new Pessoa();

  formPessoa!: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private errorHandler: ErrorHandlerService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.title.setTitle('Novo cadastro de pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) this.carregarPessoa(codigoPessoa);

  }

  configurarFormulario() {
    this.formPessoa = this.formBuilder.group({
      codigo: [],
      nome: [null, Validators.required],
      ativo: [true],
      endereco: this.formBuilder.group({
        logradouro: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        bairro: [null, Validators.required],
        cep: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    })
  }

  get editando() {
    return Boolean(this.formPessoa.get('codigo')!.value);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .subscribe(pessoa => {
        this.formPessoa.patchValue(pessoa);
        this.atualizarTituloEdicao();
      });
  }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionaPessoa();
    }
  }

  adicionaPessoa() {
    this.pessoaService.adicionar(this.formPessoa.value)
      .subscribe(pessoaAdicionada => {
        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa adicionada com sucesso!'
        });
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
  }

  atualizarPessoa() {
    this.pessoaService.atualizar(this.formPessoa.value)
      .subscribe(pessoa => {
        this.formPessoa.patchValue(pessoa);
        this.messageService.add({
          severity: 'success',
          detail: 'Dados alterados com sucesso!'
        });
        this.atualizarTituloEdicao();
      })
  }

  novo() {
    this.formPessoa.reset(new Pessoa);
    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição dos dados de: ${this.formPessoa.get('nome')!.value}`);
  }

}
