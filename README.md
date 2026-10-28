# Copiloto 24/7

**Fadiga da Decisão Assistida e Agência Técnica na Geração Z**

Aplicação web temática desenvolvida como **Atividade Prática Avaliativa — Front-end & Copilotagem com IA** (Prof. Diego Marques de Carvalho).

[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue?style=flat-square)](#)
[![HTML5](https://img.shields.io/badge/HTML5-Semântico-E34F26?style=flat-square&logo=html5&logoColor=white)](#)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)](#)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.x-FF6384?style=flat-square)](#)

---

## 1. Visão Geral e Preview

**Título:** Copiloto 24/7 — O paradoxo da disponibilidade infinita  

**Proposta:** Cruzar o **futuro do trabalho** (IA como colega, regimes remotos/assíncronos, direito à desconexão, métricas algorítmicas) com as **dimensões socioemocionais da geração atual** (adaptabilidade e propósito vs. fadiga digital, ansiedade de performance, síndrome do impostor amplificada por LLMs, solidão no remoto).

O recorte **não** é genérico (“o que é o futuro do trabalho”). Ele investiga a **fadiga da decisão assistida**: o esgotamento cognitivo e a erosão de agência técnica quando a IA se torna o primeiro interlocutor do dia de trabalho e a desconexão permanece retórica.

**Link de produção (GitHub Pages):**  
`https://SEU-USUARIO.github.io/copiloto-247/`  
*(substituir após o deploy conforme o repositório oficial da dupla)*

---

## 2. Estrutura de Arquivos e Diretórios

```
copiloto-247/
├── index.html              # Página principal (HTML5 semântico)
├── css/
│   └── styles.css          # Design system autoral (:root, Grid/Flex, microinterações)
├── js/
│   └── app.js              # Tema, diagnóstico, protocolo, Chart.js
├── image/                  # Assets visuais (reservado)
├── AUDITORIA_IA.md         # Logbook obrigatório de auditoria de prompts
├── README.md               # Este arquivo
├── LICENSE                 # MIT
└── .gitignore
```

---

## 3. Arquitetura de Software e Contratos de Dados

### Componentes de interface

| Componente | Tecnologia | Responsabilidade |
|------------|------------|------------------|
| Navbar fixa + menu hambúrguer | Bootstrap 5 + CSS glass | Navegação e toggle de tema |
| Hero + stats | HTML semântico + CSS Grid | Apresentação do recorte e KPIs |
| Cards de eixos | Bootstrap Cards + CSS | Facetas positivas/críticas |
| 4 gráficos | Chart.js 4 | Evidências empíricas |
| Diagnóstico (quiz) | Vanilla JS + Bootstrap Progress | Score 0–100 + feedback |
| Protocolo de desconexão | Vanilla JS | Geração de texto exportável/imprimível |
| Accordion FAQ | Bootstrap Accordion | Debates temáticos |
| Dark/Light mode | `data-theme` + localStorage | Persistência de preferência |

### Contratos de dados (microaplicação e gráficos)

**Quiz — respostas**

```js
// Cada pergunta: radio name="q1"…"q5", value ∈ {1,2,3,4}
// Score bruto: soma ∈ [5, 20]
// Score normalizado: Math.round(((soma - 5) / 15) * 100)  → 0–100
```

**Faixas de interpretação**

| Score | Label |
|-------|--------|
| 0–30 | Agência preservada |
| 31–55 | Atenção moderada |
| 56–75 | Sobrecarga elevada |
| 76–100 | Fadiga crítica |

**Protocolo**

Objeto lógico montado no submit:

- `horaFim`: string `HH:mm`
- `canais`: string[]
- `rituais`: string[]
- `excecao`: string (opcional)

**Datasets Chart.js (exemplos)**

```js
// Burnout por geração
{ labels: ["Gen Z","Millennials","Gen X","Boomers"], data: [66,58,53,37] }

// Preocupação com IA → saúde mental
{ labels: [...], data: [71,46,35,28] }

// Regime
{ labels: ["100% remoto","Híbrido","Geral"], data: [61,57,55] }
```

---

## 4. Declaração de Dependências e CDN

| Biblioteca | Versão | CDN / origem | Justificativa |
|------------|--------|--------------|---------------|
| Bootstrap | 5.3.3 | jsDelivr | Grid 12 colunas, Navbar, Accordion, Cards, Progress, formulários — padrão estável e acessível |
| Bootstrap Icons | 1.11.3 | jsDelivr | Ícones leves sem dependência de SVG inline em massa |
| Chart.js | 4.4.4 | jsDelivr | Visualização interativa leve; API moderna (sem jQuery) |
| Google Fonts | Inter + Space Grotesk | fonts.googleapis.com | Tipografia legível e identidade contemporânea |

Compatibilidade: browsers modernos (Chrome, Firefox, Safari, Edge recentes). Polyfills não foram necessários para os recursos utilizados (CSS variables, localStorage, Chart.js 4).

---

## 5. Matriz de Rastreabilidade e Colaboração

> **Nota:** Em entrega real da dupla, preencher com nomes reais e hashes de commits. Abaixo, modelo obrigatório.

| Tarefa | Responsável (exemplo) | Commits / tipo | Observação |
|--------|------------------------|----------------|------------|
| HTML5 semântico, SEO, a11y | Integrante A | `feat:`, `fix:` | Hierarquia h1–h3, ARIA, skip-link |
| Design system CSS (`:root`, glass, microinterações) | Integrante A | `style:` | Variáveis e dark theme |
| Integração Bootstrap (navbar, accordion, grid) | Integrante B | `feat:` | Responsividade testada |
| Diagnóstico + Protocolo (JS) | Integrante B | `feat:`, `refactor:` | Após auditoria de prompts |
| Chart.js + dados da pesquisa | Integrante A | `feat:` | Fontes documentadas |
| Dark mode + localStorage | Integrante B | `feat:`, `fix:` | Persistência e sync com charts |
| AUDITORIA_IA.md | Ambos | `docs:` | 3 iterações completas |
| README + .gitignore + LICENSE | Integrante A | `docs:` | — |

### Referências bibliográficas e fontes de dados

- Eagle Hill Consulting / Apollo Technical (2025–2026) — burnout por geração e por regime de trabalho.
- Deloitte Global Gen Z and Millennial Survey (2026) — fadiga digital, burnout, bem-estar.
- Sylvia Brafman Mental Health Center (2026) — preocupação com IA e saúde mental (71% Gen Z).
- Gallup / análises de engajamento vs. bem-estar no remoto.
- Estudos sobre isolamento e trabalho remoto (ex.: evidências recentes de aumento de solidão e distress em regimes remotáveis).
- Discussões sobre direito à desconexão (ABQV, Eurofound, relatórios nacionais).

---

## 6. Como rodar localmente

```bash
# Clone
git clone https://github.com/SEU-USUARIO/copiloto-247.git
cd copiloto-247

# Servir (qualquer servidor estático)
# Python 3:
python -m http.server 8080

# Ou VS Code Live Server / npx serve
```

Abrir `http://localhost:8080`.

---

## 7. Deploy no GitHub Pages

1. Settings → Pages → Source: **Deploy from a branch**
2. Branch: `main` (ou `master`), pasta `/ (root)`
3. Save e aguardar o Actions
4. Validar o link em desktop e mobile (caminhos relativos de CSS/JS)

---

## 8. Checklist de conformidade (enunciado)

- [x] Tema com delimitação inovadora (fadiga da decisão assistida × Gen Z × remoto/IA)
- [x] HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `footer`)
- [x] CSS3 autoral com `:root` e design system
- [x] Bootstrap 5 via CDN + grid responsivo + Navbar, Cards, Accordion, Badges
- [x] Microaplicação interativa (diagnóstico + protocolo)
- [x] Chart.js com dados fundamentados
- [x] Dark/Light mode com localStorage
- [x] AUDITORIA_IA.md com ≥ 3 iterações (prompt → resposta → diagnóstico → refatoração)
- [x] README com seções obrigatórias

---

## Licença

MIT — ver arquivo `LICENSE`.
