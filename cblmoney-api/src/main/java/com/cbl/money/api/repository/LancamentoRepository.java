package com.cbl.money.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbl.money.api.model.Lancamento;
import com.cbl.money.api.repository.lancamento.LancamentoRepositoryQuery;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long>, LancamentoRepositoryQuery{

}
