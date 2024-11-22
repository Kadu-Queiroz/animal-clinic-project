import os

class Settings:
    LLAMA_MODEL_PATH = os.getenv("LLAMA_MODEL_PATH", "./models/default_model")
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", 8000))

settings = Settings()
