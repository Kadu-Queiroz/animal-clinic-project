from fastapi import APIRouter, HTTPException, Depends, FastAPI
from pydantic import BaseModel

router = APIRouter()

# Definindo o modelo de entrada para a previsão
class Query(BaseModel):
    input: str

# Função para injeção do modelo carregado
def get_model(app: FastAPI):
    if not hasattr(app.state, "model"):
        raise HTTPException(status_code=500, detail="Modelo não carregado")
    return app.state.model

@router.post("/predict")
async def predict(query: Query, model: object = Depends(get_model)):
    """
    Endpoint para gerar previsão a partir de uma entrada de texto.
    """
    try:
        # Supondo que o modelo tenha o método 'predict'
        response = model.predict(query.input)  # Ajuste conforme o método do seu modelo
        return {"prediction": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao fazer a previsão: {e}")
