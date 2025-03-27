import { useEffect, useRef } from 'react';

export const SmartChatbot = () => {
  const chatbotRef = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;

    const loadChatbot = () => {
      const existing = document.querySelector('zapier-interfaces-chatbot-embed');
      if (existing) return;

      const script = document.createElement('script');
      script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
      script.async = true;
      script.type = 'module';

      script.onload = () => {
        if (!chatbotRef.current) return;

        const chatbot = document.createElement('zapier-interfaces-chatbot-embed');
        chatbot.setAttribute('is-popup', 'true');
        chatbot.setAttribute('chatbot-id', 'cm8msxoa40031dwt0hhssixax');
        chatbot.setAttribute('auto-open-delay', '3000');
        
        chatbot.style.cssText = `
          position: fixed;
          right: 24px;
          bottom: 24px;
          width: 72px;
          height: 72px;
          z-index: 9999;
        `;

        chatbotRef.current.appendChild(chatbot);
        loaded.current = true;
      };

      document.body.appendChild(script);
    };

    const timer = setTimeout(loadChatbot, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <div ref={chatbotRef} className="chatbot-container" />;
};