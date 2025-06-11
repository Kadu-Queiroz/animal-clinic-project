# 🏥 Módulo Intranet — Toka dos Pets

Este diretório contém **toda a estrutura da interface interna da clínica** (intranet), acessada por funcionários com diferentes funções (roles), como:

- `ADMIN`
- `RECEPCAO`
- `VETERINARIO`
- `SYSADMIN`

A intranet é **totalmente separada** da área do cliente (tutor), e foi projetada para ser **modular, escalável e integrável com a IA autônoma da clínica**.

---

## 📦 Estrutura

/intranet
/components/ → Componentes visuais reutilizáveis (cards, sidebars, headers)
/layouts/ → Layouts por função (Admin, Vet, Recepção)
/pages/ → Telas organizadas por função
/routes/ → Rotas protegidas com ACL, roteamento por role
/hooks/ → Hooks específicos da intranet

yaml
Copiar
Editar

---

## 🧠 Controle de Acesso (ACL)

O roteamento e os layouts são **baseados na função (`user.funcao`) obtida via `useAuth()`**.  
O componente `IntranetRouter.tsx` redireciona cada usuário para sua interface apropriada:

- `ADMIN` / `SYSADMIN` → `/intranet/admin`
- `RECEPCAO` → `/intranet/recepcao`
- `VETERINARIO` → `/intranet/vet`

Cada grupo de rotas é isolado e utiliza um layout próprio com navegação exclusiva.

---

## 🧠 Integração com IA

A intranet será o principal ponto de atuação da IA, que:

- Distribui avisos para recepção
- Atualiza status de agendamentos
- Auxilia médicos com informações clínicas
- Gerencia estoque e agenda de forma proativa

---

## 🛡️ Segurança

Todas as rotas da intranet são protegidas por `PrivateRouteIntranet`, que valida:

- Se o usuário está autenticado
- Se possui função autorizada para o contexto

---

## 🚧 Próximos passos

- [ ] Criar os layouts por role (`LayoutAdmin`, `LayoutVet`, `LayoutRecepcao`)
- [ ] Implementar os dashboards iniciais
- [ ] Conectar cards com dados reais do backend
- [ ] Integrar comandos da IA na interface da recepção

---

> Projeto desenvolvido por [OzTech] com foco em automação de clínicas com suporte de IA.
