import os

class Settings:
    """
    Configurações principais do projeto.
    """
    # Caminho para o modelo LLaMA
    LLAMA_MODEL_PATH = os.getenv("LLAMA_MODEL_PATH", "C:/Users/carlo/Documents/Projetos/ClinicaTokaPET/animal-clinic-project/llama-backend/app/models/Llama-3.2-3B")
    
    # Configuração de rede da API
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", 8000))

settings = Settings()
