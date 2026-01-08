# import image node versi 18 alpine
FROM node:18-alpine

#Set folder kerja
WORKDIR /usr/src/app

# Salin package.json dan install library
COPY package*.json ./
RUN npm install

# Salin semua kode aplikasi
COPY . .

# Jalankan aplikasi pada port 3000
EXPOSE 3000
CMD ["node", "app.js"]