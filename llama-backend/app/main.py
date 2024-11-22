from fastapi import FastAPI
from app.llama_integration.llama_service import load_model  # Função de exemplo para carregar o modelo, será reajustado posteriormente.

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Llama-backend API está em funcionamento"}

@app.on_event("startup")
def initialize_model():
    load_model()  # Função para carregar o modelo ao iniciar
