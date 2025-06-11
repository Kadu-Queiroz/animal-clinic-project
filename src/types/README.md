# Estrutura da Pasta `types`

A pasta `types` do projeto organiza todas as definições de tipos TypeScript usados em diferentes áreas do sistema da clínica Toka dos Pets. A organização segue um modelo baseado em domínio de uso, separando claramente os tipos reutilizáveis dos tipos específicos de cada contexto (cliente/tutor, intranet/administração, etc).

---

## Diretórios

### `/types/shared/`

Contém **tipos reutilizáveis** entre módulos diferentes.

Exemplos:

- `BaseConsulta`: tipo básico com `id`, `data_hora`, `status`, etc.
- `AnimalInfoResumido`: nome e espécie do pet.
- `TutorInfoResumido`: nome do tutor.

Esses tipos não possuem dados exclusivos de uma das partes do sistema e podem ser utilizados tanto no frontend do tutor quanto na intranet (veterinário, recepção, admin).

---

### `/types/tutor/`

Contém **tipos exclusivos da área do cliente/tutor**. São usados principalmente na interface web que o tutor acessa para acompanhar consultas, exames, vacinas, etc.

Exemplos:

- `ConsultaResumoTutor`: resumo da consulta para o tutor (contém `veterinario_nome`, `pet`, etc).
- `EventoHistorico`: eventos passados na linha do tempo do animal (ex: vacina, consulta).

Esses tipos podem **estender tipos de `shared/`** quando apropriado.

---

### `/types/intranet/`

Contém **tipos exclusivos para uso interno da clínica**, como dashboards de veterinários, recepcionistas e admins.

Exemplos:

- `ConsultaAgendaVet`: usada na agenda do veterinário com `hora_inicio`, `procedimento`, `animal`, `tutor`, etc.

Esses tipos também **usam partes do `shared/`**, mas têm campos adaptados ao uso da intranet.

---

### `/types/common/`

Contém **tipos transversais e estruturais**, como dados de autenticação, roles, usuários e contexto global.

Exemplos:

- `BaseUser`, `TutorAuthData`, `UsuarioAutenticado`
- `UserRole`: enumeração dos perfis do sistema (TUTOR, VETERINARIO, ADMIN, etc).

São compartilhados entre todos os contextos da aplicação.

---

## Boas práticas

- Tipos que possuem representação específica por papel (como tutor e veterinário) **não devem ser reaproveitados diretamente**. Crie tipos distintos que extendem `shared/`.

- Evite colocar lógica de domínio (como `procedimento`, `observacoes`) nos tipos `shared/`. Deixe esses detalhes nos tipos da `intranet/` ou `tutor/`, conforme o uso.

- Sempre que precisar adicionar um novo tipo, pergunte:

  1. Esse tipo é compartilhado entre domínios? ➔ Coloque em `shared/`
  2. Esse tipo é só para tutor? ➔ Coloque em `tutor/`
  3. Esse tipo é só para veterinário/intranet? ➔ Coloque em `intranet/`

---

## Exemplo prático

```ts
// shared/consulta.ts
export interface BaseConsulta {
  id: number;
  data_hora: string;
  status: string;
  tipo?: string;
}

export interface AnimalInfoResumido {
  nome: string;
  especie: string;
}

export interface TutorInfoResumido {
  nome: string;
}
```

```ts
// tutor/consulta.ts
import type { BaseConsulta } from '@/types/shared/consulta';

export interface ConsultaResumoTutor extends BaseConsulta {
  veterinario_nome: string;
  pet?: string;
}
```

```ts
// intranet/consulta.ts
import type { AnimalInfoResumido, TutorInfoResumido } from '@/types/shared/consulta';

export interface ConsultaAgendaVet {
  id: number;
  hora_inicio: string;
  procedimento: string;
  observacoes?: string;
  animal: AnimalInfoResumido & {
    tutor: TutorInfoResumido;
  };
}
```

---

Com essa estrutura clara e modular, evitamos confusão na manutenção e mantemos a coesão dos domínios funcionais do sistema.
