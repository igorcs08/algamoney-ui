import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../../categorias/service/categoria.service';
import { PessoaService } from './../../pessoas/service/pessoa.service';
import { NgForm } from '@angular/forms';

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
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(lancamentoForm: NgForm) {
    console.log(this.lancamento);
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
