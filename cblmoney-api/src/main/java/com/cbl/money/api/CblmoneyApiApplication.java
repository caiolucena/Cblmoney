package com.cbl.money.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.cbl.money.api.config.property.AlgamoneyApiProperty;

@SpringBootApplication
@EnableConfigurationProperties(AlgamoneyApiProperty.class)
public class CblmoneyApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CblmoneyApiApplication.class, args);
	}
}
