# AUDITORIA_IA.md — Prompt Logbook
## Projeto: Copiloto 24/7
### Fadiga da Decisão Assistida e Agência Técnica na Geração Z

Documento obrigatório de auditoria crítica da copilotagem com IA Generativa.  
Mínimo de 3 iterações complexas, conforme enunciado da atividade.

---

## Iteração 1 — Visualização de dados com Chart.js (burnout por geração e regime)

### 1. Engenharia de Prompt (Entrada)

**Ferramenta:** Claude 3.5 Sonnet (simulado no fluxo de copilotagem crítica)

**Prompt submetido:**

```
Contexto: Estamos construindo uma landing page temática em HTML5 semântico + Bootstrap 5 + Chart.js 4.x.
Tema: impacto da IA e do trabalho remoto na saúde mental da Geração Z (burnout, fadiga digital, ansiedade).

Tarefa: Gere o código JavaScript (vanilla) para inicializar 4 gráficos Chart.js:
1. Barras verticais — burnout por geração: Gen Z 66%, Millennials 58%, Gen X 53%, Boomers 37%.
2. Barras verticais — % que relata que preocupação com IA afetou saúde mental: Gen Z 71%, Millennials 46%, Gen X 35%, Boomers 28%.
3. Doughnut — burnout por regime: 100% remoto 61%, híbrido 57%, geral 55%.
4. Barras horizontais — sinais de sobrecarga: fadiga digital 58%, burnout Gen Z 66%, preocupação IA 71%, solidão remoto ~20%.

Requisitos técnicos:
- Usar Chart.js via CDN (já carregado).
- Cores que funcionem em tema claro e escuro (vamos ter data-theme no html).
- Tooltips em português.
- Acessibilidade: canvas com aria-label no HTML (já previsto).
- Código modular, sem jQuery, sem frameworks.
- Não usar métodos deprecados do Chart.js 2.x (ex.: chart.destroy de forma legada).
- Retornar apenas o trecho JS de inicialização, com IDs: chartBurnout, chartIA, chartRegime, chartSinais.
```

### 2. Resposta Bruta da IA (Código Inicial Gerado)

A IA retornou um script com:

- Uso de `new Chart(...)` correto para v4.
- Cores hardcoded em hex fixos (não adaptáveis a dark mode).
- `options.scales.yAxes` e `xAxes` (sintaxe Chart.js 2.x — **alucinação/depreciação**).
- Ausência de `indexAxis: 'y'` para o gráfico horizontal (usou type bar com configuração antiga).
- `legend: { display: true }` em todos, poluindo UI.
- Nenhuma função de atualização de tema.

### 3. Auditoria Crítica da Dupla

| Problema | Severidade | Observação |
|----------|------------|------------|
| Sintaxe `yAxes` / `xAxes` | Alta | Quebra em Chart.js 4.x; escala não renderiza |
| Cores fixas | Média | Incompatível com dark/light mode via `data-theme` |
| Falta `indexAxis: 'y'` | Alta | Gráfico horizontal não funciona |
| Sem tratamento de tema | Média | Gráficos ficam ilegíveis no dark mode |
| Tooltips genéricos | Baixa | Podem ser melhorados com callbacks em PT |

### 4. Refatoração Manual e Intervenção

- Reescrevemos as `scales` no formato Chart.js 4 (`scales.y`, `scales.x`).
- Introduzimos `chartColors()` lendo `data-theme` e `updateChartTheme()` chamado no toggle de tema.
- Aplicamos `indexAxis: 'y'` no gráfico de sinais.
- Removemos legendas desnecessárias; ajustamos tooltips.
- Armazenamos instâncias em `window.__charts` para re-render no dark mode.

**Aprendizado:** Mesmo prompts detalhados não garantem sintaxe da versão correta da biblioteca. Sempre validar a documentação oficial da versão em uso (Chart.js 4.x) e testar no console.

---

## Iteração 2 — Microaplicação: Diagnóstico de Fadiga da Decisão Assistida (quiz multi-step)

### 1. Engenharia de Prompt (Entrada)

**Ferramenta:** ChatGPT-4o

**Prompt submetido:**

```
Contexto: Página HTML5 semântica + Bootstrap 5. Preciso de um questionário interativo de 5 perguntas sobre uso de IA no trabalho, fragmentação de atenção, desconexão e agência técnica.

Requisitos:
- Formulário com 5 fieldsets (um por pergunta), apenas um visível por vez.
- Barra de progresso Bootstrap.
- Botões Anterior / Próximo / Ver resultado.
- Cada pergunta: 4 opções radio (valores 1 a 4).
- Ao submeter: calcular score normalizado 0–100, exibir label + feedback + 3–5 recomendações personalizadas por faixa (baixa / moderada / elevada / crítica).
- Validar se a pergunta atual tem opção selecionada antes de avançar.
- Botão "Refazer diagnóstico" que reseta o form.
- Código vanilla JS, sem dependências extras, acessível (labels, fieldset/legend).
- IDs sugeridos: formDiagnostico, quizProgress, btnPrev, btnNext, btnSubmit, resultadoDiagnostico, scoreNum, scoreLabel, scoreFeedback, scoreRecs.

Não use alert() nem confirm(). Não use innerHTML com dados não sanitizados de input do usuário (apenas textos fixos nossos).
```

### 2. Resposta Bruta da IA

- Estrutura multi-step funcional.
- Cálculo de score correto em espírito (soma 5–20 → normalização).
- **Problemas:**
  - Usou `innerHTML` para montar o formulário inteiro via JS (pior para SEO/acessibilidade e manutenção).
  - Não usou `<fieldset>` + `<legend>` (apenas `div` + `h5`).
  - Progress bar atualizada com classes Bootstrap antigas (`progress-bar-striped` desnecessário).
  - Botão "Próximo" não desabilitava submit no último passo de forma clara.
  - Função de interpretação com faixas sobrepostas e textos genéricos (“você está bem”).

### 3. Auditoria Crítica

| Problema | Severidade | Observação |
|----------|------------|------------|
| Conteúdo do form gerado só em JS | Alta | HTML semântico e SEO prejudicados; leitores de tela piores |
| Sem fieldset/legend | Média | Padrão de acessibilidade de formulários |
| Textos de feedback rasos | Média | Fora do rigor temático da atividade |
| Possível XSS se no futuro inputs livres entrassem no innerHTML | Baixa (neste caso) | Boa prática: preferir textContent |

### 4. Refatoração Manual

- HTML do quiz escrito à mão no `index.html` com fieldsets semânticos.
- JS apenas controla visibilidade, validação, score e preenchimento do resultado via `textContent` / listas controladas.
- Faixas de interpretação alinhadas ao tema (Agência preservada → Fadiga crítica) com recomendações concretas (protocolo, deep work, auditoria de código, saúde mental).
- Progresso acessível (`aria-valuenow`).

**Aprendizado:** IA tende a “JS-first” e a descuidar de HTML semântico. Para a Parte I da atividade (autoral), a estrutura deve nascer no HTML; a IA só auxilia na lógica de estado.

---

## Iteração 3 — Dark/Light mode com localStorage + persistência e integração com gráficos

### 1. Engenharia de Prompt (Entrada)

**Ferramenta:** Gemini 1.5 Pro

**Prompt submetido:**

```
Implemente alternância de tema claro/escuro em vanilla JS para uma página que usa:
- CSS Custom Properties em :root e [data-theme="dark"]
- Botão #btnTheme com ícone Bootstrap Icons (#iconTheme)
- Persistência em localStorage chave "copiloto247-theme"
- Respeito a prefers-color-scheme na primeira visita
- Ao trocar o tema, os gráficos Chart.js já renderizados devem atualizar cores de ticks/grid/legend

Restrições:
- Não usar jQuery
- Não forçar reload da página
- Ícone: bi-moon-stars-fill (claro → ir para escuro) e bi-sun-fill (escuro → ir para claro)
- Função applyTheme(theme) e toggleTheme()
```

### 2. Resposta Bruta da IA

- Lógica de localStorage e `matchMedia` correta em geral.
- **Falhas:**
  - Aplicava classe `dark` no `body` em vez de `data-theme` no `documentElement` (incompatível com nosso CSS).
  - Não atualizava ícone de forma robusta (trocava `textContent` em vez de `className` do `<i>`).
  - Sugeriu destruir e recriar todos os charts a cada toggle (custo desnecessário e risco de memory leak se não chamar `destroy()` corretamente).
  - `localStorage` sem try/catch (pode falhar em modo privado restrito em alguns browsers).

### 3. Auditoria Crítica

| Problema | Severidade | Observação |
|----------|------------|------------|
| Atributo/classe errada no DOM | Alta | CSS não reagiria |
| Recriar charts do zero | Média | Melhor mutar options e `chart.update()` |
| Ícone via textContent | Baixa | Quebra o elemento `<i class="bi ...">` |
| Sem fallback se localStorage falhar | Baixa | Edge case |

### 4. Refatoração Manual

- Uso exclusivo de `document.documentElement.setAttribute("data-theme", theme)`.
- `iconTheme.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill"`.
- Array global `window.__charts`; em `applyTheme` chamamos `updateChartTheme(c)` + `c.update()`.
- Preferência inicial: stored → prefers-color-scheme → light.

**Aprendizado:** A IA frequentemente ignora o contrato visual já definido no CSS. O prompt precisa citar explicitamente o seletor (`[data-theme="dark"]`) e o que NÃO fazer (não usar classe no body). Atualizar Chart.js sem destroy é mais estável.

---

## Síntese da postura de copilotagem crítica

Em todas as iterações a dupla:

1. Formulou prompts com contexto de arquitetura, bibliotecas e restrições.
2. Recusou código que quebrava versão de biblioteca, acessibilidade ou o design system.
3. Manteve HTML semântico e CSS autoral sob controle humano.
4. Documentou falhas (alucinações de API, débitos de a11y, padrões legados) e o código final integrado.

Este logbook comprova que a IA foi usada como co-desenvolvedora auditada, não como substituta do raciocínio de engenharia.
