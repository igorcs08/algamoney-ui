import { Component, OnInit } from '@angular/core';
import { CategoriaService } from './../../categorias/service/categoria.service';

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

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().subscribe((categorias: any) => {
      this.categorias = categorias.map((c: any) => {
        return { label: c.nome, value: c.codigo }
      });
      console.log(categorias);
    })
  }

}
