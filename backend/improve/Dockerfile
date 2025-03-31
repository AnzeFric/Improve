FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN chmod +x ./mvnw
RUN ./mvnw dependency:go-offline -B
RUN ./mvnw install -DskipTests

FROM eclipse-temurin:21-jdk-jammy
VOLUME /tmp
COPY --from=build /app/target/*.jar /usr/src/improve/app.jar
WORKDIR /usr/src/improve

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=production", "app.jar"]
