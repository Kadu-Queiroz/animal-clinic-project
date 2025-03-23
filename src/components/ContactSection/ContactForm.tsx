import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData(e.currentTarget as HTMLFormElement);
    formDataToSend.append('service_id', import.meta.env.VITE_EMAILJS_SERVICE_ID);
    formDataToSend.append('template_id', import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    formDataToSend.append('user_id', import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Erro ao enviar mensagem.');
      }
    } catch (error) {
      alert('Erro ao enviar mensagem.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002B3D] focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002B3D] focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002B3D] focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
        <textarea
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002B3D] focus:border-transparent transition"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-[#002B3D] text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition flex items-center justify-center gap-2"
      >
        <span>Enviar Mensagem</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </form>
  );
}