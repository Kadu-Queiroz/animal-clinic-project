# 🔐 Pipeline de Autenticação – Frontend Toka dos Pets

Este documento descreve o fluxo de autenticação no frontend da clínica **Toka dos Pets**, sua estrutura de arquivos, responsabilidades e funcionamento geral. A autenticação é feita com **CPF e senha**, utilizando JWT e persistência via `localStorage`.

---

## 🧩 Visão Geral

O fluxo é baseado em **contexto React**, com um `AuthProvider` central que:

- realiza login,
- persiste token e usuário no `localStorage`,
- verifica `senha_provisoria`,
- controla a sessão do usuário.

---

## 🗂 Estrutura de Arquivos

### 1. `src/context/AuthContext.ts`

Define o **tipo do contexto de autenticação** (`AuthContextType`) e cria o `AuthContext`.

- ✅ Tipado com `UsuarioAutenticado`
- ✅ Expõe `user`, `token`, `isAuthenticated`, `login`, `logout`, `setUser`
- ❗ **Não possui lógica**, apenas definição de contrato.

---

### 2. `src/context/AuthProvider.tsx`

Implementa o **provedor de autenticação**, contendo a lógica de login, logout, e carregamento inicial do `localStorage`.

**Responsabilidades:**

- Carrega `user` e `token` salvos no localStorage
- Realiza login com `loginTutor` e salva dados localmente
- Mostra o modal `NovaSenhaModal` se `senha_provisoria === true`
- Remove dados de sessão ao fazer logout

✅ Centraliza toda a lógica de sessão  
✅ Protege o acesso condicionalmente ao estado do React

---

### 3. `src/context/useAuth.ts`

Hook personalizado para acessar o contexto com segurança e conveniência.

**Responsabilidades:**

- Garante uso apenas dentro de `<AuthProvider>`
- Adiciona utilitários:
  - `is(role)` → verifica se o usuário é de um role específico
  - `hasRole(...roles)` → verifica múltiplos roles

✅ Simples, seguro e reutilizável

---

### 4. `src/services/tutor-service.ts`

Responsável por fazer as **requisições HTTP** da área do tutor.

**Principais funções:**

- `loginTutor` → autentica via `/auth/login`
- `alterarSenha` → envia nova senha ao backend
- `buscarDadosDoTutor`, `buscarExamesDetalhados`, `buscarConsultasDoTutor` → recuperam dados autenticados

✅ Usa headers com JWT via `getAuthHeaders`

---

### 5. `src/lib/auth-headers.ts`

Função utilitária que retorna os headers de autorização com `Bearer {token}`.

**Responsabilidade:**

- Evita repetição do código de headers nos serviços

---

### 6. `src/lib/api.ts`

Instância do `axios` com baseURL global configurada via `.env`.

---

### 7. `src/components/Modals/LoginModal.tsx`

Componente de **interface de login** do tutor.

**Fluxo:**

1. Captura CPF e senha
2. Chama `login()` do contexto
3. Navega para `/cliente/dashboard`
4. Exibe modal de nova senha se necessário

✅ Formata CPF dinamicamente  
✅ Trata erros e loading

---

### 8. `src/components/Modals/NovaSenhaModal.tsx`

Exibido após login com senha provisória.

**Responsabilidades:**

- Valida nova senha com regras específicas
- Envia para o backend
- Atualiza o contexto com `senha_provisoria = false`

✅ Foco em segurança  
✅ Feedback visual completo

---

## ✅ Pontos Fortes

- Lógica de login completamente centralizada
- JWT persistido com segurança (token + user)
- Suporte a senhas provisórias
- Estrutura modular e clara
- Baixo acoplamento entre backend e frontend

---

## ⚠️ Pontos de Atenção

- É necessário garantir que o **CPF seja normalizado no backend** (sem pontos ou hífens) para evitar falhas de autenticação.
- Certifique-se de que os valores de `role` (`funcao`) no backend estejam **case-insensitive** ou que o frontend normalize os dados para minúsculas.

---

## 🧪 Sugestões Futuras

- Criar `UsuarioDTO` no frontend para substituir o `dict` em `LoginResponseDTO`
- Adicionar validação de expiração de token (JWT exp)
- Migrar para `zustand` ou `redux` se escopo aumentar

---
