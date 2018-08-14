import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ToastyService } from 'ng2-toasty';

import { Lancamento } from './../../core/model';
import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { not } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {



  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];

  pessoas = [];

  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoLancamento = this.route.snapshot.params['codigo'];
    this.title.setTitle('Novo Lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
      this.atualizarTituloEdicao();
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  getEditando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => {
          return { label: p.nome, value: p.codigo };
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  salvar(form: FormControl) {

    this.getEditando() ? this.atualizar(form) : this.adicionar(form);

  }

  atualizar(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {

        this.lancamento = lancamento;
        this.toastyService.success('Lançamento alterado com sucessso');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionar(form: FormControl) {

    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {

        this.toastyService.success('Lançamento salvo com sucesso');
        this.novo(form);

      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  novo(form: FormControl) {

    form.reset();
    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);


    this.router.navigate(['/lancamentos/novo']);

  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
