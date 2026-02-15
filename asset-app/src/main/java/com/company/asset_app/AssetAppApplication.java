package com.company.asset_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AssetAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(AssetAppApplication.class, args);
	}

}
