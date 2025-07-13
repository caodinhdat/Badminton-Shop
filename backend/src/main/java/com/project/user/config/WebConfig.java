package com.project.user.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost", "http://127.0.0.1") // Thay đổi theo địa chỉ frontend của bạn
                .allowedHeaders("*")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}
