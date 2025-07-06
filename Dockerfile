FROM alpine/java:21-jdk
WORKDIR /app
COPY target/BlogApp-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8090
ENTRYPOINT ["java","-jar","app.jar"]