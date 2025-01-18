from fastapi import FastAPI, HTTPException, APIRouter
from pydantic import BaseModel
from app.llama_integration.model_loader import load_model, generate_response

app = FastAPI()

# Inicialização do modelo durante o início da aplicação
@app.on_event("startup")
async def startup_event():
    """
    Evento executado ao iniciar a aplicação.
    """
    try:
        print("Iniciando a aplicação...")
        print("Carregando o modelo...")
        load_model()  # Carrega o modelo durante a inicialização
        print("Modelo carregado com sucesso!")
    except Exception as e:
        print(f"Erro durante o carregamento do modelo: {e}")
        raise RuntimeError("Falha ao inicializar o modelo.")

# Encerramento do aplicativo e liberação de recursos
@app.on_event("shutdown")
async def shutdown_event():
    """
    Evento executado ao encerrar a aplicação.
    """
    print("Encerrando a aplicação e liberando recursos...")

# Definindo o modelo de entrada para a previsão
class Query(BaseModel):
    input: str

# Rota principal para testar a API
@app.get("/")
async def read_root():
    """
    Rota principal para testar a API.
    """
    return {"message": "Llama-backend API está em funcionamento"}

# Rota de previsão, utilizando o modelo carregado
@app.post("/predict/")
async def predict(query: Query):
    """
    Endpoint para gerar previsão a partir de um prompt.
    """
    try:
        # Gerando a resposta utilizando o modelo carregado
        response = generate_response(query.input)
        return {"prediction": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar resposta: {e}")
