# Gunakan image Node.js resmi
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode aplikasi
COPY . .

# Expose port
EXPOSE 3002

# Environment variables default
ENV NODE_ENV=production
ENV PORT=3002

# Jalankan aplikasi
CMD ["npm", "start"]
