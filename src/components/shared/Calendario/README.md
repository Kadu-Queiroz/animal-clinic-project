# 📅 Calendário Compartilhado (`Shared/Calendario`)

Esta pasta contém componentes reutilizáveis relacionados à visualização e confirmação de **consultas agendadas** dentro do sistema Toka dos Pets.  
São utilizados tanto na **área do cliente** quanto na **intranet/admin**, podendo também ser integrados à IA no futuro.

---

## 📦 Componentes disponíveis

### `CalendarioConsultas.tsx`

> Grade visual de dias com consultas marcadas.

- 🔹 Recebe `cpf` e `token` por props, mas usa `useAuth()` como fallback.
- 🔹 Ideal para visualização rápida no dashboard do tutor ou staff.
- 🔹 Permite callback `onSelecionarConsulta` ao clicar em um dia.

---

### `ModalVisualizarConsulta.tsx`

> Modal exibindo o calendário de consultas.

- 🔹 Embute o `CalendarioConsultas`.
- 🔹 Pode receber `titulo`, `cpf`, `token` e `eventos` (futuro uso com FullCalendar).
- 🔹 Usado para mostrar visualmente os agendamentos do tutor ou de um pet específico.

---

### `ModalConfirmarConsulta.tsx`

> Modal de confirmação final do agendamento.

- 🔹 Mostra os dados escolhidos (pet, serviço, tipo, data).
- 🔹 Ideal para uso após um fluxo de etapas (`wizard`) ou via IA.
- 🔹 Possui botões "Confirmar" e "Cancelar" com callbacks externos.

---

## ✅ Regras de uso

- Estes componentes **não devem conter lógica específica de cliente, IA ou admin**.
- Preferir sempre **props controladas externamente** (`cpf`, `token`, `onClose`, `onConfirm`, etc).
- Todos os componentes são compatíveis com **tema escuro (`dark`)**.

---

## 🧠 Sugestões futuras

- Integrar `CalendarioConsultas` com **FullCalendar** para visualização mais rica.
- Permitir `modoEdicao` para intranet, com opção de cancelar ou mover consultas.
- Suportar `eventos` externos como exames e lembretes integrados ao calendário.

---

## 📁 Localização

src/
└── components/
└── Shared/
└── Calendario/
├── CalendarioConsultas.tsx
├── ModalVisualizarConsulta.tsx
├── ModalConfirmarConsulta.tsx
└── README.md

> Para dúvidas ou sugestões, consulte a documentação geral do sistema ou entre em contato com o desenvolvedor responsável.
