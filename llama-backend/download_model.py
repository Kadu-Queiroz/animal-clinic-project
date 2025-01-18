from transformers import LlamaForCausalLM, PreTrainedTokenizerFast
from app.config import settings
import os
import torch
from huggingface_hub import login

# Caminho do modelo obtido do config.py
MODEL_PATH = settings.LLAMA_MODEL_PATH
HUGGINGFACE_TOKEN = "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"  # Substitua com seu token

def download_model_if_missing(model_id, local_path, auth_token):
    """
    Baixa o modelo da Hugging Face caso esteja faltando arquivos necessários.
    Utiliza o token de autenticação para garantir acesso.
    """
    # Autenticar utilizando o token
    login(token=auth_token)

    if not os.path.exists(local_path):
        print(f"Diretório {local_path} não encontrado. Criando e iniciando download do modelo...")
        os.makedirs(local_path, exist_ok=True)
        os.system(f"huggingface-cli download {model_id} --include 'original/*' --local-dir {local_path} --token {auth_token}")
    else:
        print(f"Diretório {local_path} encontrado. Validando arquivos...")

    required_files = ["config.json", "tokenizer.model", "pytorch_model.bin"]
    missing_files = [file for file in required_files if not os.path.exists(os.path.join(local_path, file))]
    
    if missing_files:
        print(f"Arquivos ausentes: {', '.join(missing_files)}. Iniciando novo download...")
        os.system(f"huggingface-cli download {model_id} --include 'original/*' --local-dir {local_path} --token {auth_token}")

def load_model():
    """
    Carrega o modelo LLaMA e o tokenizador com base no caminho especificado no config.py.
    """
    global model, tokenizer
    model_id = "meta-llama/Llama-3.2-3B"
    try:
        print(f"Validando e baixando modelo: {model_id}")
        download_model_if_missing(model_id, MODEL_PATH, HUGGINGFACE_TOKEN)

        print(f"Carregando tokenizador do caminho: {MODEL_PATH}")
        # Usando o PreTrainedTokenizerFast em vez do LlamaTokenizer
        tokenizer = PreTrainedTokenizerFast.from_pretrained(MODEL_PATH)

        print("Carregando o modelo...")
        model = LlamaForCausalLM.from_pretrained(
            MODEL_PATH,
            local_files_only=True,  # Garante que os arquivos serão buscados localmente
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            device_map="auto"
        )
        print("Modelo e tokenizador carregados com sucesso.")
    except Exception as e:
        print(f"Erro ao carregar o modelo: {e}")
        raise RuntimeError(f"Falha ao carregar o modelo: {e}")

def generate_response(prompt: str):
    """
    Gera uma resposta baseada no prompt fornecido.
    """
    global model, tokenizer
    if model is None or tokenizer is None:
        raise RuntimeError("O modelo e o tokenizador não estão carregados. Execute load_model primeiro.")

    try:
        print("Preparando o prompt para geração...")
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        print("Gerando resposta...")
        outputs = model.generate(**inputs, max_new_tokens=50, temperature=0.7)
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response
    except Exception as e:
        print(f"Erro durante a geração de resposta: {e}")
        raise RuntimeError(f"Erro ao gerar resposta: {e}")
