import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit, AfterContentInit {

  filtro = new PessoaFiltro();
  pessoas = [];
  totalRegistros = 0;
  loading = true;

  @ViewChild('tabela') tabela;

  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');
  }
  ngAfterContentInit() {
    this.loading = true;
  }
  pesquisar(pagina = 0) {
    this.loading = true;
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {

        this.pessoas = resultado.pessoas;
        this.totalRegistros = resultado.total;
        this.loading = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  editarAtivo(pessoa: any): void {

    const novoStatus = !pessoa.ativo; // o novo status vai ser o oposto do que era


    this.pessoaService.editarAtivo(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toastyService.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(pessoa: any) {

    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {

        this.tabela.first === 0 ? this.pesquisar() : this.tabela.first = 0;
        this.toastyService.success('Registro da pessoa excluído com sucesso');

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(pessoa: any) {

    this.confirmationService.confirm({

      message: 'Tem certeza?',
      accept: () => {
        this.excluir(pessoa);
      }
    });

  }
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }



}
