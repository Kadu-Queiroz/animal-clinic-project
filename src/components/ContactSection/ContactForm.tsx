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
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente mais tarde.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white p-8 shadow-lg">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-[#002B3D]"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-[#002B3D]"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Telefone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-[#002B3D]"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Mensagem</label>
        <textarea
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 transition focus:border-transparent focus:ring-2 focus:ring-[#002B3D]"
        ></textarea>
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#002B3D] px-6 py-3 text-white transition hover:bg-blue-900"
      >
        <span>Enviar Mensagem</span>
        <ChevronRight className="h-5 w-5" />
      </button>
    </form>
  );
}
