package com.cbl.money.api.repository.filter;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class LancamentoFilter {

	private String descricao;
	
	@DateTimeFormat(pattern = "yyy-MM-dd")
	private LocalDate dataDeVencimentoDe;
	
	@DateTimeFormat(pattern = "yyy-MM-dd")
	private LocalDate dataDeVencimentoAte;
	
	
	
}
