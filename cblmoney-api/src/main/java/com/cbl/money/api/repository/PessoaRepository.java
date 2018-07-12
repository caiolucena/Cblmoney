package com.cbl.money.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbl.money.api.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa,Long>{

	public Pessoa findByCodigo(Long codigo);
	
}
