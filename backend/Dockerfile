# Sử dụng một image nền chứa JDK và Maven/Gradle 
FROM maven:3.9.6-sapmachine-17 AS builder

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Mục đích là để các dependencies được tải về và lưu vào cache của layer Docker
# Khi code thay đổi, layer này không cần rebuild lại, giúp tiết kiệm thời gian
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Chạy lệnh để tải các dependencies. -DskipTests để bỏ qua chạy test ở bước này
# Lệnh này sẽ chỉ chạy lại nếu pom.xml/build.gradle thay đổi
RUN ./mvnw dependency:go-offline

# Expose cổng mà ứng dụng Spring Boot sẽ lắng nghe
EXPOSE 8080

# Lệnh mặc định khi chạy container.
# Tuy nhiên, trong docker-compose.yml chúng ta sẽ ghi đè lệnh này
# để chạy ứng dụng trực tiếp bằng Maven/Gradle Wrapper
CMD ["/bin/bash"]