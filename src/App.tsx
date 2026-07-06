import { useState } from "react";
import { 
  Calendar, 
  Printer, 
  Calculator,
  ShieldAlert,
  Sun,
  Moon,
  TrendingUp,
  Cpu
} from "lucide-react";

export default function App() {
  const [currency, setCurrency] = useState<"BRL" | "USD">("BRL");
  const [isDark, setIsDark] = useState<boolean>(true);

  // Conversion factor: 1 USD = 5.45 BRL
  const usdToBrl = 5.45;

  // Real observed values in BRL
  const costVertexBrl = 41.81;
  const costCloudRunBrl = 1.05;
  const costCloudBuildBrl = 0.00;
  const costCloudBuildPrecisionBrl = 0.000315;
  const costFunctionsBrl = 101.90;
  
  // Operational baseline
  const baseRequests = 182;
  const costWebhookUsd = 0.10;

  // Simulator state: Cloud Run requests volume
  const [simulatedRequests, setSimulatedRequests] = useState<number>(10000);

  // Helper for formatting values based on currency selection
  const formatValue = (brlVal: number, rawUsd?: number) => {
    if (currency === "BRL") {
      if (rawUsd !== undefined) {
        return `R$ ${(rawUsd * usdToBrl).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      return `R$ ${brlVal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      if (rawUsd !== undefined) {
        return `US$ ${rawUsd.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      return `US$ ${(brlVal / usdToBrl).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  // Helper for precise values
  const formatPrecision = (brlVal: number) => {
    if (currency === "BRL") {
      return `R$ ${brlVal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
    } else {
      return `US$ ${(brlVal / usdToBrl).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
    }
  };

  // Simulate Cloud Run costs (pure linear simulation of runtime)
  const simulatedRunUsd = (simulatedRequests / baseRequests) * costWebhookUsd;

  // CSS classes based on theme state
  const bgTheme = isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900";
  const cardTheme = isDark ? "bg-slate-900/40 border-slate-800" : "bg-slate-50/70 border-slate-200/80";
  const borderTheme = isDark ? "border-slate-800" : "border-slate-200";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const codeTheme = isDark ? "bg-slate-900 text-slate-300 border-slate-800" : "bg-slate-100 text-slate-800 border-slate-200";

  return (
    <div className={`min-h-screen ${bgTheme} font-sans antialiased transition-colors duration-150 print:bg-white print:text-black pb-16`}>
      
      {/* Dynamic Nav Control Panel */}
      <nav className={`border-b sticky top-0 z-50 print:hidden ${isDark ? "bg-slate-950/90 backdrop-blur-md border-slate-800" : "bg-white/95 backdrop-blur-md border-slate-200"}`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs gap-3 py-3 px-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold tracking-tight">Hermes v2 — Relatório Minimalista</span>
            <span className="opacity-30">|</span>
            <span className="flex items-center gap-1 opacity-70">
              <Calendar size={12} />
              Junho / 2026
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <div className={`flex items-center p-0.5 rounded border ${isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
              <button
                id="btn-theme-light"
                onClick={() => setIsDark(false)}
                className={`p-1 rounded cursor-pointer transition ${!isDark ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
                title="Modo Claro"
              >
                <Sun size={13} />
              </button>
              <button
                id="btn-theme-dark"
                onClick={() => setIsDark(true)}
                className={`p-1 rounded cursor-pointer transition ${isDark ? "bg-slate-800 text-blue-400 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                title="Modo Escuro"
              >
                <Moon size={13} />
              </button>
            </div>

            {/* Currency Toggle */}
            <div className={`flex items-center p-0.5 rounded border ${isDark ? "bg-slate-900 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
              <button
                id="btn-curr-brl"
                onClick={() => setCurrency("BRL")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${currency === "BRL" ? (isDark ? "bg-slate-800 text-white" : "bg-white text-blue-600 shadow-sm") : "text-slate-400"}`}
              >
                BRL
              </button>
              <button
                id="btn-curr-usd"
                onClick={() => setCurrency("USD")}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${currency === "USD" ? (isDark ? "bg-slate-800 text-white" : "bg-white text-blue-600 shadow-sm") : "text-slate-400"}`}
              >
                USD
              </button>
            </div>

            <button
              id="btn-print-report"
              onClick={() => window.print()}
              className={`flex items-center gap-1 px-3 py-1 rounded text-[10px] cursor-pointer font-bold shadow-sm transition ${isDark ? "bg-slate-800 hover:bg-slate-750 text-white" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
            >
              <Printer size={12} />
              Imprimir
            </button>
          </div>
        </div>
      </nav>

      {/* Main Report Document */}
      <main className="max-w-4xl mx-auto px-6 py-10 sm:py-16 print:py-0 print:px-0">
        
        {/* Document Header */}
        <header className={`border-b pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 ${borderTheme}`}>
          <div>
            <span className="text-[10px] font-bold text-blue-500 tracking-widest uppercase font-mono block mb-1">
              Demonstrativo Financeiro Gerencial
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Relatório Executivo de Custos Estimados
            </h1>
            <h2 className={`text-sm font-semibold tracking-tight mt-0.5 ${textMuted}`}>
              Hermes | Junho de 2026
            </h2>
          </div>
          <div className="text-left sm:text-right font-mono text-[11px] opacity-80">
            <p>Emissão: 06/07/2026</p>
            <p>Referência: 1 USD = R$ {usdToBrl.toFixed(2)}</p>
          </div>
        </header>

        <div className="space-y-8">
          
          {/* Section 1: Resumo Executivo */}
          <section id="resumo-executivo" className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-wider uppercase opacity-60 font-mono">
              1. Resumo Executivo
            </h3>
            <div className={`p-5 rounded-lg border leading-relaxed text-sm ${cardTheme} space-y-3`}>
              <p>
                Visão executiva simplificada dos custos do <strong className="font-semibold">Hermes</strong> em junho de 2026, projetada com foco em transparência metodológica para apoiar decisões estratégicas:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs">
                <li>
                  <strong className="font-semibold text-blue-500">Custo Direto:</strong> O principal faturamento direto atribuível ao Hermes é o <span className={`px-1 py-0.5 rounded font-mono border ${codeTheme}`}>Vertex AI</span>.
                </li>
                <li>
                  <strong className="font-semibold">Custo Operacional Webhook:</strong> O tráfego do endpoint analisado em Cloud Run gerou um impacto residual na camada básica de computação.
                </li>
                <li>
                  <strong className="font-semibold">Custos Compartilhados / Não Atribuídos:</strong> Recursos como <span className={`px-1 py-0.5 rounded font-mono border ${codeTheme}`}>Cloud Run Functions</span>, <span className={`px-1 py-0.5 rounded font-mono border ${codeTheme}`}>Cloud Run</span> e <span className={`px-1 py-0.5 rounded font-mono border ${codeTheme}`}>Cloud Build</span> pertencem ao faturamento geral da conta e não são de atribuição exclusiva.
                </li>
              </ul>
              <div className="flex items-start gap-2 text-[11px] pt-1 opacity-85">
                <ShieldAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Nota Executiva:</strong> Este é um demonstrativo gerencial, não um rateio contábil fechado ou auditoria exata.
                </span>
              </div>
            </div>
          </section>

          {/* Section 2: Visão Consolidada e Atribuição de Custos */}
          <section id="visao-consolidada" className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-wider uppercase opacity-60 font-mono">
              2. Demonstrativo Consolidado de Custos
            </h3>
            
            <div className={`overflow-hidden border rounded-lg ${borderTheme} ${cardTheme}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className={`border-b font-mono opacity-80 ${isDark ? "bg-slate-900/50" : "bg-slate-100/50"}`}>
                      <th className="py-2 px-3.5 font-semibold">Serviço GCP</th>
                      <th className="py-2 px-3.5 font-semibold">Classificação</th>
                      <th className="py-2 px-3.5 font-semibold text-right">Valor Período</th>
                      <th className="py-2 px-3.5 font-semibold">Comentário Executivo</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
                    <tr>
                      <td className="py-3 px-3.5 font-bold">Vertex AI</td>
                      <td className="py-3 px-3.5"><span className="text-emerald-500 font-semibold font-mono">Diretamente Atribuível</span></td>
                      <td className="py-3 px-3.5 text-right font-mono font-bold text-emerald-500">{formatValue(costVertexBrl)}</td>
                      <td className={`py-3 px-3.5 ${textMuted}`}>Custo real observado exclusivo do Hermes.</td>
                    </tr>
                    <tr className={isDark ? "bg-slate-900/20" : "bg-slate-50/30"}>
                      <td className="py-3 px-3.5 font-medium">Cloud Run Functions</td>
                      <td className="py-3 px-3.5"><span className="text-amber-500 font-semibold font-mono">Não Atribuído</span></td>
                      <td className="py-3 px-3.5 text-right font-mono font-bold text-amber-500">{formatValue(costFunctionsBrl)}</td>
                      <td className={`py-3 px-3.5 ${textMuted}`}>Custo relevante na conta; exige auditoria futura.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3.5 font-medium">Cloud Run (Geral)</td>
                      <td className="py-3 px-3.5"><span className="text-slate-400 font-mono">Compartilhado</span></td>
                      <td className="py-3 px-3.5 text-right font-mono">{formatValue(costCloudRunBrl)}</td>
                      <td className={`py-3 px-3.5 ${textMuted}`}>Uso compartilhado entre múltiplos workloads.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-3.5 font-medium">Cloud Build (Geral)</td>
                      <td className="py-3 px-3.5"><span className="text-slate-400 font-mono">Compartilhado</span></td>
                      <td className="py-3 px-3.5 text-right font-mono">{formatValue(costCloudBuildBrl)}</td>
                      <td className={`py-3 px-3.5 ${textMuted}`}>Consumo residual: <span className="font-mono">{formatPrecision(costCloudBuildPrecisionBrl)}</span></td>
                    </tr>
                    <tr className={`border-t-2 font-bold ${isDark ? "bg-slate-900/40 border-slate-800" : "bg-slate-100/40 border-slate-200"}`}>
                      <td className="py-2.5 px-3.5 text-blue-500" colSpan={2}>Est. Operacional (/webhook)</td>
                      <td className="py-2.5 px-3.5 text-right font-mono text-blue-500">{formatValue(0.10 * usdToBrl, costWebhookUsd)}</td>
                      <td className={`py-2.5 px-3.5 ${textMuted}`}>Mapeamento de telemetria base de logs.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 3: Dados Operacionais e Projeção do Cloud Run */}
          <section id="operacional-projecao" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Column A: Dados Operacionais */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold tracking-wider uppercase opacity-60 font-mono">
                3. Perfil Operacional Observado
              </h3>
              <div className={`p-4 rounded-lg border text-xs space-y-2 font-mono ${cardTheme}`}>
                <div className="flex justify-between border-b pb-1.5 border-slate-800/20">
                  <span className="opacity-60">Projeto:</span>
                  <span className="font-semibold text-right">contabilizei-canais-xp</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-slate-800/20">
                  <span className="opacity-60">Instância Run:</span>
                  <span className="font-semibold text-right">hermes-observability-agent-prd</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-slate-800/20">
                  <span className="opacity-60">Janela temporal:</span>
                  <span className="font-semibold text-right">2026-06-01 a 2026-06-30</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-slate-800/20">
                  <span className="opacity-60">Requisições Totais:</span>
                  <span className="font-bold text-blue-500">182 (180 OK | 2 Erros)</span>
                </div>
                <div className="flex justify-between border-b pb-1.5 border-slate-800/20">
                  <span className="opacity-60">Latência (P50 | P95):</span>
                  <span className="font-semibold text-right">19.19 s | 48.95 s</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Especificação:</span>
                  <span className="font-semibold text-right">1 vCPU | 1 GiB | Concurrency 5</span>
                </div>
              </div>
            </div>

            {/* Column B: Projeções de Custos (Cloud Run + Vertex AI) */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold tracking-wider uppercase opacity-60 font-mono">
                4. Projeção Integrada de Tráfego e Custos
              </h3>
              <div className={`p-4 rounded-lg border text-xs ${cardTheme} space-y-3`}>
                <p className={textMuted}>
                  Projeta a escalabilidade combinada do endpoint (computação Cloud Run) e das consultas de inteligência (Vertex AI):
                </p>

                <div className="space-y-3 font-mono text-[10px]">
                  <div className="border-b pb-1.5 border-slate-800/10">
                    <div className="flex justify-between font-bold text-[11px] text-blue-500">
                      <span>182 reqs (Base de Junho)</span>
                      <span>{formatValue(0.10 * usdToBrl + costVertexBrl)}</span>
                    </div>
                    <div className="flex justify-between opacity-75 mt-0.5 text-[9px]">
                      <span>Cloud Run: {formatValue(0.10 * usdToBrl, 0.10)}</span>
                      <span>Vertex AI: {formatValue(costVertexBrl)}</span>
                    </div>
                  </div>
                  <div className="border-b pb-1.5 border-slate-800/10">
                    <div className="flex justify-between font-bold text-[11px] text-blue-500">
                      <span>1.000 reqs</span>
                      <span>{formatValue(0.55 * usdToBrl + (1000 / 182) * costVertexBrl)}</span>
                    </div>
                    <div className="flex justify-between opacity-75 mt-0.5 text-[9px]">
                      <span>Cloud Run: {formatValue(0.55 * usdToBrl, 0.55)}</span>
                      <span>Vertex AI: {formatValue((1000 / 182) * costVertexBrl)}</span>
                    </div>
                  </div>
                  <div className="border-b pb-1.5 border-slate-800/10">
                    <div className="flex justify-between font-bold text-[11px] text-blue-500">
                      <span>10.000 reqs</span>
                      <span>{formatValue(5.49 * usdToBrl + (10000 / 182) * costVertexBrl)}</span>
                    </div>
                    <div className="flex justify-between opacity-75 mt-0.5 text-[9px]">
                      <span>Cloud Run: {formatValue(5.49 * usdToBrl, 5.49)}</span>
                      <span>Vertex AI: {formatValue((10000 / 182) * costVertexBrl)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold text-[11px] text-blue-500">
                      <span>100.000 reqs</span>
                      <span>{formatValue(54.91 * usdToBrl + (100000 / 182) * costVertexBrl)}</span>
                    </div>
                    <div className="flex justify-between opacity-75 mt-0.5 text-[9px]">
                      <span>Cloud Run: {formatValue(54.91 * usdToBrl, 54.91)}</span>
                      <span>Vertex AI: {formatValue((100000 / 182) * costVertexBrl)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Simulador de Cloud Run e Vertex AI */}
          <section id="simulador" className="space-y-3 print:hidden">
            <h3 className="text-[11px] font-bold tracking-wider uppercase opacity-60 font-mono">
              5. Simulador Dinâmico de Tráfego e Custos (Integrado)
            </h3>
            <div className={`p-5 rounded-lg border ${cardTheme} space-y-4`}>
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium">Selecione o Volume Operacional do Endpoint:</span>
                <span className="font-bold font-mono text-blue-500 text-sm">
                  {simulatedRequests.toLocaleString("pt-BR")} requisições/mês
                </span>
              </div>
              <input
                id="sim-requests"
                type="range"
                min="182"
                max="150000"
                step="500"
                value={simulatedRequests}
                onChange={(e) => setSimulatedRequests(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>182 reqs</span>
                <span>75.000 reqs</span>
                <span>150.000 reqs</span>
              </div>

              <div className={`p-4 rounded-lg border border-dashed grid grid-cols-1 sm:grid-cols-3 gap-4 ${isDark ? "bg-slate-950/60 border-slate-850" : "bg-white border-slate-200"}`}>
                <div className="space-y-0.5">
                  <span className={`text-[10px] font-semibold block uppercase tracking-wider ${textMuted}`}>1. Computação (Cloud Run)</span>
                  <div className="font-mono font-bold text-base text-emerald-500">
                    {formatValue(simulatedRunUsd * usdToBrl, simulatedRunUsd)}
                  </div>
                  <span className={`text-[9px] ${textMuted}`}>Carga física do webhook</span>
                </div>
                
                <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l pt-3 sm:pt-0 sm:pl-4 border-slate-800/10">
                  <span className={`text-[10px] font-semibold block uppercase tracking-wider ${textMuted}`}>2. Inteligência (Vertex AI)</span>
                  <div className="font-mono font-bold text-base text-blue-500">
                    {formatValue((simulatedRequests / baseRequests) * costVertexBrl)}
                  </div>
                  <span className={`text-[9px] ${textMuted}`}>Estimativa baseada em tokens</span>
                </div>

                <div className="space-y-0.5 border-t sm:border-t-0 sm:border-l pt-3 sm:pt-0 sm:pl-4 border-slate-800/10">
                  <span className="text-[10px] font-bold block uppercase tracking-wider text-blue-600 dark:text-blue-400">3. Custo Total Estimado</span>
                  <div className="font-mono font-extrabold text-base text-blue-600 dark:text-blue-400">
                    {formatValue(simulatedRunUsd * usdToBrl + (simulatedRequests / baseRequests) * costVertexBrl)}
                  </div>
                  <span className={`text-[9px] ${textMuted}`}>Projeção total combinada</span>
                </div>
              </div>

              <div className="flex gap-2 text-[10px] opacity-80 leading-relaxed">
                <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={13} />
                <p>
                  <strong>Metodologia de Estimativa:</strong> Os custos de computação física e de tokens/LLM foram escalados de forma linear com base no comportamento de consumo observado do período, demonstrando que a demanda de inteligência (Vertex AI) constitui a parcela predominante do faturamento operacional do Hermes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Premissas e Limitações */}
          <section id="premissas" className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-wider uppercase opacity-60 font-mono">
              6. Premissas e Limitações Metodológicas
            </h3>
            <div className={`p-5 rounded-lg border text-xs ${cardTheme}`}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                <li className="flex gap-2">
                  <span className="text-blue-500 select-none font-bold">•</span>
                  <span className={textMuted}>
                    <strong>Vertex AI</strong> foi categorizado como custo direto exclusivo com base na exclusividade de pipeline.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 select-none font-bold">•</span>
                  <span className={textMuted}>
                    <strong>Cloud Run Functions</strong> gerou faturamento agregado de R$ 101,90 e não deve ser desconsiderado nas auditorias.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 select-none font-bold">•</span>
                  <span className={textMuted}>
                    A modelagem de faturamento é gerencial, não representando partilha contábil formal ou oficial.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500 select-none font-bold">•</span>
                  <span className={textMuted}>
                    A telemetria de consumo computacional do webhook foi obtida e calibrada diretamente a partir de logs do GCP.
                  </span>
                </li>
              </ul>
            </div>
          </section>

        </div>

        {/* Small Footer */}
        <footer className={`border-t pt-6 mt-12 text-center text-[10px] ${textMuted} font-mono space-y-1 ${borderTheme}`}>
          <p>
            Fontes: Faturamento Geral de Conta GCP, Logs de Runtime do Cloud Logging e Parâmetros Físicos do Cloud Run (contabilizei-canais-xp)
          </p>
          <p>
            Período de Auditoria: Junho de 2026
          </p>
        </footer>

      </main>
    </div>
  );
}
