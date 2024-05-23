# Usa uma imagem base oficial do Node.js
FROM node:14

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/src/app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação para o diretório de trabalho
COPY . .

# Instala nodemon globalmente para desenvolvimento
RUN npm install -g nodemon

# Expõe a porta em que a aplicação será executada
EXPOSE 3000

# Define o comando padrão para iniciar a aplicação
CMD ["npm", "run", "dev"]