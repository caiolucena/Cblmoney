import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit, AfterContentInit {

  filtro = new LancamentoFiltro();
  lancamentos = [];
  totalRegistros = 0;
  loading: boolean;

  @ViewChild('tabela') tabela;
  constructor(
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private confirmationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos');
  }
  ngAfterContentInit() {
    this.loading = true;
  }

  pesquisar(pagina = 0) {
    this.loading = true;

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
        this.loading = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(lancamento: any) {


    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {

        this.tabela.first === 0 ? this.pesquisar() : this.tabela.first = 0;
        this.toastyService.success('Lançamento excluído com sucesso');

      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);

      }
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {

    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }
}
