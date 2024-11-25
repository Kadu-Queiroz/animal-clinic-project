from fastapi import FastAPI, HTTPException
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
        load_model()
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

@app.get("/")
async def read_root():
    """
    Rota principal para testar a API.
    """
    return {"message": "Llama-backend API está em funcionamento"}

@app.get("/generate/")
async def get_response(prompt: str):
    """
    Gera uma resposta para o prompt fornecido.
    """
    try:
        response = generate_response(prompt)
        return {"response": response}
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar resposta: {e}")
