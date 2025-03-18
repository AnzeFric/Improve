package com.anzefric.improve;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ImproveApplication {

    public static void main(String[] args) {
        System.out.println("Starting Improve backend");
        SpringApplication.run(ImproveApplication.class, args);
        System.out.println("Improve backend started successfully!");
    }
}

