from transformers import AutoModelForCausalLM, AutoTokenizer

MODEL = None

def load_model():
    global MODEL
    tokenizer = AutoTokenizer.from_pretrained("path/to/llama-model")
    model = AutoModelForCausalLM.from_pretrained("path/to/llama-model")
    MODEL = (tokenizer, model)
    print("Llama model loaded!")

def generate_response(prompt: str) -> str:
    global MODEL
    if MODEL is None:
        raise RuntimeError("Model not loaded")
    
    tokenizer, model = MODEL
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)
