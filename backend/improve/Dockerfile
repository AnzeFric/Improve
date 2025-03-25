FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Copy Maven wrapper files first
COPY ./.mvn ./.mvn
COPY ./mvnw ./mvnw
COPY ./pom.xml ./

# Copy source code
COPY ./src ./src

# Expose port
EXPOSE 8080

# Run Spring Boot directly using Maven wrapper
CMD ["./mvnw", "spring-boot:run"]