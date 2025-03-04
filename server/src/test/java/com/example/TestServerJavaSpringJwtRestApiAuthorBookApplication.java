package com.example;

import org.springframework.boot.SpringApplication;

public class TestServerJavaSpringJwtRestApiAuthorBookApplication {

	public static void main(String[] args) {
		SpringApplication.from(ServerJavaSpringJwtRestApiAuthorBookApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
