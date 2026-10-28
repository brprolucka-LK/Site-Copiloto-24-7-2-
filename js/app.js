/**
 * Copiloto 24/7 — app.js
 * Dark/Light mode (localStorage), diagnóstico interativo, protocolo, Chart.js
 */

(function () {
  "use strict";

  /* ========== TEMA CLARO / ESCURO ========== */
  const root = document.documentElement;
  const btnTheme = document.getElementById("btnTheme");
  const iconTheme = document.getElementById("iconTheme");
  const STORAGE_KEY = "copiloto247-theme";

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (iconTheme) {
      iconTheme.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    }
    localStorage.setItem(STORAGE_KEY, theme);
    // Atualiza cores dos gráficos se já existirem
    if (window.__charts) {
      window.__charts.forEach((c) => {
        updateChartTheme(c);
        c.update();
      });
    }
  }

  function toggleTheme() {
    const current = root.getAttribute("data-theme") || "light";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  applyTheme(getPreferredTheme());
  if (btnTheme) btnTheme.addEventListener("click", toggleTheme);

  function isDark() {
    return root.getAttribute("data-theme") === "dark";
  }

  function chartColors() {
    return {
      text: isDark() ? "#94a3b8" : "#64748b",
      grid: isDark() ? "rgba(148, 163, 184, 0.15)" : "rgba(100, 116, 139, 0.15)",
      primary: isDark() ? "#818cf8" : "#4f46e5",
      accent: "#22d3ee",
      danger: "#ef4444",
      warning: "#f59e0b",
      success: "#10b981",
    };
  }

  function updateChartTheme(chart) {
    const c = chartColors();
    if (chart.options.scales) {
      Object.keys(chart.options.scales).forEach((key) => {
        const scale = chart.options.scales[key];
        if (scale.ticks) scale.ticks.color = c.text;
        if (scale.grid) scale.grid.color = c.grid;
      });
    }
    if (chart.options.plugins && chart.options.plugins.legend) {
      chart.options.plugins.legend.labels = chart.options.plugins.legend.labels || {};
      chart.options.plugins.legend.labels.color = c.text;
    }
  }

  /* ========== CHART.JS ========== */
  function initCharts() {
    if (typeof Chart === "undefined") return;

    const c = chartColors();
    window.__charts = [];

    // Burnout por geração
    const ctxBurnout = document.getElementById("chartBurnout");
    if (ctxBurnout) {
      const chart = new Chart(ctxBurnout, {
        type: "bar",
        data: {
          labels: ["Gen Z", "Millennials", "Gen X", "Boomers"],
          datasets: [
            {
              label: "Burnout (%)",
              data: [66, 58, 53, 37],
              backgroundColor: [c.danger, c.warning, c.primary, c.success],
              borderRadius: 6,
              maxBarThickness: 48,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.parsed.y}% reportam burnout`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 80,
              ticks: { color: c.text, callback: (v) => v + "%" },
              grid: { color: c.grid },
            },
            x: {
              ticks: { color: c.text },
              grid: { display: false },
            },
          },
        },
      });
      window.__charts.push(chart);
    }

    // Impacto IA na saúde mental
    const ctxIA = document.getElementById("chartIA");
    if (ctxIA) {
      const chart = new Chart(ctxIA, {
        type: "bar",
        data: {
          labels: ["Gen Z", "Millennials", "Gen X", "Boomers"],
          datasets: [
            {
              label: "Preocupação com IA afetou saúde mental (%)",
              data: [71, 46, 35, 28],
              backgroundColor: c.primary,
              borderRadius: 6,
              maxBarThickness: 48,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.parsed.y}%`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: { color: c.text, callback: (v) => v + "%" },
              grid: { color: c.grid },
            },
            x: {
              ticks: { color: c.text },
              grid: { display: false },
            },
          },
        },
      });
      window.__charts.push(chart);
    }

    // Regime de trabalho (doughnut)
    const ctxRegime = document.getElementById("chartRegime");
    if (ctxRegime) {
      const chart = new Chart(ctxRegime, {
        type: "doughnut",
        data: {
          labels: ["100% remoto", "Híbrido", "Geral (média)"],
          datasets: [
            {
              data: [61, 57, 55],
              backgroundColor: [c.danger, c.warning, c.primary],
              borderWidth: 0,
              hoverOffset: 6,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: c.text, padding: 16 },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => `${ctx.label}: ${ctx.parsed}% burnout`,
              },
            },
          },
        },
      });
      window.__charts.push(chart);
    }

    // Sinais de sobrecarga
    const ctxSinais = document.getElementById("chartSinais");
    if (ctxSinais) {
      const chart = new Chart(ctxSinais, {
        type: "bar",
        data: {
          labels: [
            "Fadiga digital regular",
            "Burnout (Gen Z)",
            "Preocupação IA → saúde mental",
            "Solidão (remoto Gen Z ~)",
          ],
          datasets: [
            {
              label: "%",
              data: [58, 66, 71, 20],
              backgroundColor: [c.accent, c.danger, c.primary, c.warning],
              borderRadius: 6,
              maxBarThickness: 32,
            },
          ],
        },
        options: {
          indexAxis: "y",
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 100,
              ticks: { color: c.text, callback: (v) => v + "%" },
              grid: { color: c.grid },
            },
            y: {
              ticks: { color: c.text },
              grid: { display: false },
            },
          },
        },
      });
      window.__charts.push(chart);
    }
  }

  /* ========== DIAGNÓSTICO (QUIZ) ========== */
  const formDiag = document.getElementById("formDiagnostico");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const btnSubmit = document.getElementById("btnSubmit");
  const progressBar = document.getElementById("quizProgress");
  const progressWrap = progressBar ? progressBar.parentElement : null;
  const resultado = document.getElementById("resultadoDiagnostico");
  const totalSteps = 5;
  let currentStep = 1;

  function showStep(step) {
    document.querySelectorAll(".quiz-step").forEach((el) => {
      const s = parseInt(el.dataset.step, 10);
      el.classList.toggle("d-none", s !== step);
    });
    currentStep = step;
    if (progressBar && progressWrap) {
      const pct = ((step - 1) / totalSteps) * 100;
      progressBar.style.width = pct + "%";
      progressWrap.setAttribute("aria-valuenow", String(Math.round(pct)));
    }
    if (btnPrev) btnPrev.disabled = step === 1;
    if (btnNext) btnNext.classList.toggle("d-none", step === totalSteps);
    if (btnSubmit) btnSubmit.classList.toggle("d-none", step !== totalSteps);
  }

  function currentFieldset() {
    return document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
  }

  function isStepValid() {
    const fs = currentFieldset();
    if (!fs) return false;
    const checked = fs.querySelector('input[type="radio"]:checked');
    return !!checked;
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      if (!isStepValid()) {
        const fs = currentFieldset();
        const first = fs && fs.querySelector('input[type="radio"]');
        if (first) first.focus();
        return;
      }
      if (currentStep < totalSteps) showStep(currentStep + 1);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      if (currentStep > 1) showStep(currentStep - 1);
    });
  }

  function computeScore() {
    let sum = 0;
    for (let i = 1; i <= totalSteps; i++) {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (selected) sum += parseInt(selected.value, 10);
    }
    // min 5, max 20 → normaliza 0–100
    const normalized = Math.round(((sum - 5) / 15) * 100);
    return { sum, normalized: Math.max(0, Math.min(100, normalized)) };
  }

  function interpretScore(n) {
    if (n <= 30) {
      return {
        label: "Agência preservada",
        feedback:
          "Seu padrão sugere uso consciente de IA e boa capacidade de desconexão. Continue protegendo blocos de deep work e revisando criticamente o que a máquina sugere.",
        recs: [
          "Mantenha ao menos 1–2 blocos diários sem copilot para problemas centrais.",
          "Documente decisões técnicas importantes com seu raciocínio (não só o output da IA).",
          "Revise periodicamente se as métricas de produtividade não estão invadindo o tempo de descanso.",
        ],
      };
    }
    if (n <= 55) {
      return {
        label: "Atenção moderada",
        feedback:
          "Há sinais de fragmentação e dependência parcial. O risco de fadiga da decisão assistida já aparece em alguns dias da semana.",
        recs: [
          "Defina um horário fixo de desconexão e silencie canais de trabalho após ele.",
          "Pratique resolver um problema por dia sem abrir a IA no primeiro momento.",
          "Reduza notificações de ferramentas de produtividade e de chat.",
          "Inclua um ritual de transição (caminhada, checklist de fechamento).",
        ],
      };
    }
    if (n <= 75) {
      return {
        label: "Sobrecarga elevada",
        feedback:
          "O padrão indica alta exposição a copilotagem contínua, dificuldade de desligar e possível erosão de confiança técnica. Priorize limites claros.",
        recs: [
          "Crie um Protocolo de Desconexão formal (use o gerador nesta página).",
          "Bloqueie 90 minutos diários de deep work sem IA e sem chat.",
          "Audite código/sugestões da IA antes de aceitar — anote o que você mudaria.",
          "Converse com a liderança sobre expectativas de disponibilidade assíncrona.",
          "Considere suporte de saúde mental se a ansiedade de performance for frequente.",
        ],
      };
    }
    return {
      label: "Fadiga crítica",
      feedback:
        "Indicadores apontam para always-on, dependência forte de validação algorítmica e risco alto de burnout e perda de agência. Aja com urgência em limites e recuperação.",
      recs: [
        "Pare e gere seu Protocolo de Desconexão agora — e compartilhe-o com alguém de confiança.",
        "Reduza drasticamente o uso de IA em tarefas que treinam julgamento (arquitetura, debug complexo).",
        "Negocie explicitamente horários de não-contato com a equipe.",
        "Busque avaliação profissional de saúde mental se sintomas de esgotamento forem persistentes.",
        "Priorize sono, movimento e contato social real fora da tela.",
      ],
    };
  }

  if (formDiag) {
    formDiag.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!isStepValid()) return;

      const { normalized } = computeScore();
      const interp = interpretScore(normalized);

      const scoreNum = document.getElementById("scoreNum");
      const scoreLabel = document.getElementById("scoreLabel");
      const scoreFeedback = document.getElementById("scoreFeedback");
      const scoreRecs = document.getElementById("scoreRecs");

      if (scoreNum) scoreNum.textContent = normalized;
      if (scoreLabel) scoreLabel.textContent = interp.label;
      if (scoreFeedback) scoreFeedback.textContent = interp.feedback;
      if (scoreRecs) {
        scoreRecs.innerHTML = interp.recs.map((r) => `<li class="mb-2"><i class="bi bi-arrow-right-short text-primary" aria-hidden="true"></i> ${r}</li>`).join("");
      }

      formDiag.classList.add("d-none");
      if (resultado) resultado.classList.remove("d-none");
      if (progressBar) progressBar.style.width = "100%";
      if (progressWrap) progressWrap.setAttribute("aria-valuenow", "100");
    });
  }

  const btnRestart = document.getElementById("btnRestart");
  if (btnRestart) {
    btnRestart.addEventListener("click", () => {
      formDiag.reset();
      formDiag.classList.remove("d-none");
      if (resultado) resultado.classList.add("d-none");
      showStep(1);
    });
  }

  showStep(1);

  /* ========== PROTOCOLO DE DESCONEXÃO ========== */
  const formProto = document.getElementById("formProtocolo");
  const output = document.getElementById("protocoloOutput");
  const protocolContent = document.getElementById("protocolContent");

  if (formProto) {
    formProto.addEventListener("submit", (e) => {
      e.preventDefault();
      const hora = document.getElementById("horaFim").value || "18:00";
      const canais = [];
      ["chSlack", "chEmail", "chIA", "chWhats"].forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.checked) canais.push(el.value);
      });
      const ritualSelect = document.getElementById("rituais");
      const rituais = Array.from(ritualSelect.selectedOptions).map((o) => o.value);
      const excecao = (document.getElementById("excecao").value || "").trim();

      const data = new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      let texto = `PROTOCOLO PESSOAL DE DESCONEXÃO\n`;
      texto += `Data de compromisso: ${data}\n`;
      texto += `────────────────────────────────────\n\n`;
      texto += `1. Fim da jornada formal: ${hora}\n\n`;
      texto += `2. Canais silenciados após esse horário:\n`;
      if (canais.length) {
        canais.forEach((c) => (texto += `   • ${c}\n`));
      } else {
        texto += `   • (nenhum selecionado — considere escolher ao menos um)\n`;
      }
      texto += `\n3. Rituais de transição:\n`;
      if (rituais.length) {
        rituais.forEach((r) => (texto += `   • ${r}\n`));
      } else {
        texto += `   • Definir ao menos um ritual esta semana\n`;
      }
      if (excecao) {
        texto += `\n4. Regra de exceção:\n   ${excecao}\n`;
      }
      texto += `\n5. Compromisso\n`;
      texto += `   Eu me comprometo a proteger meu tempo de recuperação, a não responder mensagens de trabalho fora do combinado (salvo a regra de exceção) e a revisar este protocolo em 30 dias.\n\n`;
      texto += `Assinatura: _______________________    Data: ________\n`;

      if (protocolContent) protocolContent.textContent = texto;
      if (output) output.classList.remove("d-none");
      output.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  const btnPrint = document.getElementById("btnPrint");
  if (btnPrint) {
    btnPrint.addEventListener("click", () => window.print());
  }

  const btnCopy = document.getElementById("btnCopy");
  if (btnCopy) {
    btnCopy.addEventListener("click", async () => {
      const text = protocolContent ? protocolContent.textContent : "";
      try {
        await navigator.clipboard.writeText(text);
        btnCopy.innerHTML = '<i class="bi bi-check2 me-1" aria-hidden="true"></i>Copiado!';
        setTimeout(() => {
          btnCopy.innerHTML = '<i class="bi bi-clipboard me-1" aria-hidden="true"></i>Copiar texto';
        }, 2000);
      } catch {
        btnCopy.textContent = "Selecione e copie manualmente";
      }
    });
  }

  /* ========== INIT ========== */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCharts);
  } else {
    initCharts();
  }
})();
