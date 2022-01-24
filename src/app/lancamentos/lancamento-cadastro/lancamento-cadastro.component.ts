import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../../categorias/service/categoria.service';
import { PessoaService } from './../../pessoas/service/pessoa.service';

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

  pessoas = [
    { label: 'João da Silva', value: 1 },
    { label: 'Sebastião Souza', value: 2 },
    { label: 'Maria Abadia', value: 3 },
  ]

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().subscribe((categorias: any) => {
      this.categorias = categorias.map((c: any) => {
        return { label: c.nome, value: c.codigo }
      });
      console.log(categorias);
    })
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas().subscribe((pessoas: any) => {
      this.pessoas = pessoas['content'].map((p: any) => {
        return { label: p.nome, value: p.codigo }
      })
    })
  }

}
