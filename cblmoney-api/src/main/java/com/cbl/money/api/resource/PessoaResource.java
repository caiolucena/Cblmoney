package com.cbl.money.api.resource;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cbl.money.api.model.Pessoa;
import com.cbl.money.api.repository.PessoaRepository;

@RestController
@RequestMapping("/pessoas")
public class PessoaResource {

	
	@Autowired
	PessoaRepository pessoaRepository;
	
	
	@PostMapping
	public ResponseEntity<Pessoa> criar (@Valid @RequestBody Pessoa pessoa){
		Pessoa pessoaSalva = pessoaRepository.save(pessoa);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{codigo}")
			.buildAndExpand(pessoaSalva.getCodigo()).toUri();
		
		return ResponseEntity.created(uri).body(pessoa);
	}
	
	
	@GetMapping("/{codigo}")
	public ResponseEntity <Pessoa> buscarPeloCodigo(@PathVariable("codigo") Long codigo) {
		Pessoa pessoa = pessoaRepository.findByCodigo(codigo);
		
		return pessoa != null? ResponseEntity.ok(pessoa) : ResponseEntity.noContent().build(); 
	}
	
	@GetMapping
	public List<Pessoa> listarTodos(){
		return pessoaRepository.findAll();
	}
}
