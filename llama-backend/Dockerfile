# Use a versão slim do Python 3.13
FROM python:3.13-slim

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Instalar dependências do sistema necessárias para Poetry e Python
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar o Poetry via script oficial
RUN curl -sSL https://install.python-poetry.org | python3 -

# Adicionar Poetry ao PATH
ENV PATH="/root/.local/bin:$PATH"

# Desabilitar virtualenvs do Poetry
RUN poetry config virtualenvs.create false

# Copiar arquivos do Poetry
COPY pyproject.toml poetry.lock ./

# Instalar dependências do projeto
RUN poetry install --no-root --no-interaction --no-ansi

# Copiar o código da aplicação
COPY app/ ./app/

# Expor a porta do FastAPI
EXPOSE 8000

# Comando para rodar a aplicação
CMD ["poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
