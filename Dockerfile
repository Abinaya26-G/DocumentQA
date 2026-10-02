FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

EXPOSE 9090

CMD ["java", "-jar", "target/documentqa-0.0.1-SNAPSHOT.jar"]