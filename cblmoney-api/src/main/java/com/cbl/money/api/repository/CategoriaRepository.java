package com.cbl.money.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbl.money.api.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria,Long>{

	Categoria findByCodigo(Long codigo);

}
