import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['codigo']);

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Lançamento adicionado com sucesso!'
        });
        lancamentoForm.reset();
        this.lancamento = new Lancamento();
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

}
