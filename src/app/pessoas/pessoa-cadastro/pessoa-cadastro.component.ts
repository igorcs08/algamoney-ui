import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PessoaService } from './../service/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  salvar(pessoaForm: NgForm) {
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

}
