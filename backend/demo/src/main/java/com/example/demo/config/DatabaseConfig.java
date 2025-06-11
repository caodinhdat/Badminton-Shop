package com.example.demo.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Bean
    public Dotenv dotenv() {
        return Dotenv.configure()
                .directory("/workspaces/Badminton-Shop/backend/demo/") 
                .load();
    }

    @Bean
    public DataSource dataSource(Dotenv dotenv) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl(dotenv.get("DATABASE_URL"));
        dataSource.setUsername(dotenv.get("DATABASE_USERNAME"));
        dataSource.setPassword(dotenv.get("DATABASE_PASSWORD"));
        dataSource.setDriverClassName(dotenv.get("DATABASE_DRIVER"));

        return dataSource;
    }
}
