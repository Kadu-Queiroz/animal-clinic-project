// src/components/ContatoForm.tsx
import { useState } from "react";
import contatoService from "../service/contatoService";

const ContatoForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await contatoService.enviarEmail(formData);
      setStatus("success");
      setFormData({ nome: "", email: "", mensagem: "" }); // Limpa os campos
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-white">Fale Conosco</h2>

      <input
        type="text"
        name="nome"
        placeholder="Seu nome"
        value={formData.nome}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border border-gray-700 rounded bg-gray-900 text-white"
      />

      <input
        type="email"
        name="email"
        placeholder="Seu e-mail"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border border-gray-700 rounded bg-gray-900 text-white"
      />

      <textarea
        name="mensagem"
        placeholder="Sua mensagem"
        value={formData.mensagem}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 border border-gray-700 rounded bg-gray-900 text-white"
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
      >
        {status === "loading" ? "Enviando..." : "Enviar"}
      </button>

      {status === "success" && <p className="mt-2 text-green-500">E-mail enviado com sucesso!</p>}
      {status === "error" && <p className="mt-2 text-red-500">Erro ao enviar. Tente novamente.</p>}
    </form>
  );
};

export default ContatoForm;