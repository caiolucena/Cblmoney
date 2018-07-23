package com.cbl.money.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbl.money.api.model.Pessoa;
import com.cbl.money.api.repository.pessoa.PessoaRepositoryQuery;

public interface PessoaRepository extends JpaRepository<Pessoa,Long>,PessoaRepositoryQuery{
	
}
