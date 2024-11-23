### Java Dockerfile ###

## Build stage ##
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY . .
RUN mvn install -DskipTests=true

## Run stage ##
FROM alpine:3.19
RUN adduser -D healthme
RUN apk add openjdk21-jre # add jdk
WORKDIR /run
COPY --from=build /app/target/*.jar /run/healthme/app.jar
RUN chown -R healthme:healthme /run
USER healthme
EXPOSE 8000
ENTRYPOINT java -jar /run/healthme/app.jar