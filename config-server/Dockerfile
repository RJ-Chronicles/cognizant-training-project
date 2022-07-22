FROM amazoncorretto:11-alpine-jdk
ARG JAR_FILE
COPY ${config-server-0.0.1-SNAPSHOT.jar} app.jar
ENTRYPOINT [ "java", "-jar", "-Xms512m", "-Xmx512m","/app.jar" ]

