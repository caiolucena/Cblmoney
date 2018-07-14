package com.cbl.money.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbl.money.api.model.Lancamento;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long>{

}
