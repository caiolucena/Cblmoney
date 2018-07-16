package com.cbl.money.api.repository.lancamento;

import java.util.List;

import com.cbl.money.api.model.Lancamento;
import com.cbl.money.api.repository.filter.LancamentoFilter;

public interface LancamentoRepositoryQuery {

	public List<Lancamento> filtrar(LancamentoFilter lancamentoFilter);
}
