from transformers import LlamaForCausalLM, PreTrainedTokenizerFast
from app.config import settings
import os
import torch
import shutil

# Caminho do modelo obtido do config.py
MODEL_PATH = settings.LLAMA_MODEL_PATH

def load_model():
    """
    Carrega o modelo LLaMA e o tokenizador com base no caminho especificado no config.py.
    """
    global model, tokenizer
    model_id = "meta-llama/Llama-3.2-3B"
    try:
        print(f"Validando e baixando modelo: {model_id}")
        

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
        outputs = model.generate(
            **inputs, 
            max_new_tokens=100,   # Aumenta a quantidade de tokens gerados
            temperature=0.8,     # Diminui a aleatoriedade para respostas mais precisas
            top_p=0.9,            # Controla a diversidade dos tokens
            top_k=50,             # Limita os tokens mais prováveis
            no_repeat_ngram_size=3  # Evita repetições de n-grams
        )
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Limite o tamanho da resposta, se necessário
        response = response.strip()  # Remove espaços extras no início/fim
        if len(response) > 500:
            response = response[:500]  # Trunca a resposta, se for muito longa
        
        return response
    except Exception as e:
        print(f"Erro durante a geração de resposta: {e}")
        raise RuntimeError(f"Erro ao gerar resposta: {e}")

