import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';
import { MessageService } from 'primeng/api';
import { Pessoa } from 'src/app/core/model';
import { PessoaService } from './../service/pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Novo cadastro de pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) this.carregarPessoa(codigoPessoa);

  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
    .subscribe(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    });
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionaPessoa(form);
    }
  }

  adicionaPessoa(pessoaForm: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Pessoa adicionanda com sucesso!'
        });
        pessoaForm.reset();
        this.pessoa = new Pessoa();
      })
  }

  atualizarPessoa(pessoaForm: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
    .subscribe(pessoa => {
      this.pessoa = pessoa;
      this.messageService.add( {
        severity: 'success',
        detail: 'Dados alterados com sucesso!'
      });
      this.atualizarTituloEdicao();
    })
  }

  novo(form: NgForm) {
    form.reset();
    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);
    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição dos dados de: ${this.pessoa.nome}`);
  }

}
