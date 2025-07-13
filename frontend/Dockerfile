# Sử dụng một image nền chứa Node.js (để chạy Vue CLI/Vite)
FROM node:20-alpine

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt dependencies
COPY package.json .
COPY package-lock.json . 

# Cài đặt các dependencies. Bước này sẽ được cache nếu package.json không thay đổi
RUN npm install --legacy-peer-deps

# Expose cổng mà Vue dev server sẽ lắng nghe
EXPOSE 8080 

# Lệnh mặc định để chạy dev server.
# Sẽ được ghi đè bởi docker-compose.yml để chạy ứng dụng
CMD ["/bin/bash"]