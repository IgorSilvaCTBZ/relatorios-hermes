import { useState } from "react";
import { 
  TrendingUp, 
  Activity, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Printer, 
  Calculator,
  ShieldAlert,
  Info,
  Sun,
  Moon,
  HelpCircle
} from "lucide-react";

export default function App() {
  const [currency, setCurrency] = useState<"BRL" | "USD">("BRL");
  const [isDark, setIsDark] = useState<boolean>(true); // Defaults to dark mode as requested

  // Fixed conversion rate reference: 1 USD = 5.45 BRL for June 2026
  const usdToBrl = 5.45;

  // Values in BRL
  const costVertexBrl = 41.81;
  const costCloudRunBrl = 1.05;
  const costCloudBuildBrl = 0.00;
  const costCloudBuildPrecisionBrl = 0.000315;
  const costFunctionsBrl = 101.90;
  
  // Operational values
  const baseRequests = 182;
  const costWebhookUsd = 0.10;

  // Simulator State: Cloud Run only
  const [simulatedRequests, setSimulatedRequests] = useState<number>(10000);

  // Conversion helper
  const convertValue = (brlVal: number, rawUsd?: number) => {
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

  // High precision helper for Cloud Build
  const convertPrecisionValue = (brlVal: number) => {
    if (currency === "BRL") {
      return `R$ ${brlVal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
    } else {
      return `US$ ${(brlVal / usdToBrl).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;
    }
  };

  // Simulate only Cloud Run costs (Linear simulation)
  const simulatedRunUsd = (simulatedRequests / baseRequests) * costWebhookUsd;

  const handlePrint = () => {
    window.print();
  };

  // Theme styling helpers
  const themeBg = isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const themeCard = isDark ? "bg-slate-900 border-slate-800 shadow-xl" : "bg-white border-slate-200 shadow-xs";
  const themeCardSurface = isDark ? "bg-slate-950/60 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-600";
  const themeTextPrimary = isDark ? "text-slate-100" : "text-slate-900";
  const themeTextSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const themeBorder = isDark ? "border-slate-800" : "border-slate-200";
  const themeTableHead = isDark ? "bg-slate-950 text-slate-400" : "bg-slate-50 text-slate-500";
  const themeCodeClass = isDark ? "px-1.5 py-0.5 bg-slate-950 rounded font-mono text-xs text-slate-300 border border-slate-800" : "px-1.5 py-0.5 bg-slate-100 rounded font-mono text-xs text-slate-800 border border-slate-200";
  const themeInputRange = isDark ? "bg-slate-800" : "bg-slate-200";

  return (
    <div className={`min-h-screen ${themeBg} font-sans antialiased transition-colors duration-200 print:bg-white print:text-black`}>
      {/* Navbar Section */}
      <div className={`border-b sticky top-0 z-50 transition-colors duration-200 print:hidden ${isDark ? "bg-slate-900/95 backdrop-blur-md border-slate-800 text-slate-200" : "bg-white/95 backdrop-blur-md border-slate-200 text-slate-800"}`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs gap-3 py-3 px-4">
          <div className="flex items-center gap-2 text-inherit opacity-95">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold">Painel Executivo Hermes v2</span>
            <span className="opacity-30">|</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="opacity-60" />
              Competência: Junho / 2026
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Selector Toggle */}
            <div className={`flex items-center p-0.5 rounded-md border ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
              <button
                id="btn-theme-light"
                onClick={() => setIsDark(false)}
                className={`p-1 rounded text-xs transition cursor-pointer ${
                  !isDark 
                    ? "bg-white text-blue-600 shadow-xs border border-slate-200" 
                    : "text-slate-500 hover:text-slate-300"
                }`}
                title="Ativar Tema Claro"
              >
                <Sun size={14} />
              </button>
              <button
                id="btn-theme-dark"
                onClick={() => setIsDark(true)}
                className={`p-1 rounded text-xs transition cursor-pointer ${
                  isDark 
                    ? "bg-slate-800 text-blue-400 shadow-xs border border-slate-700" 
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Ativar Tema Escuro"
              >
                <Moon size={14} />
              </button>
            </div>

            {/* Currency Selector */}
            <div className={`flex items-center p-1 rounded-md border ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
              <button
                id="btn-curr-brl"
                onClick={() => setCurrency("BRL")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  currency === "BRL" 
                    ? (isDark ? "bg-slate-800 text-white border border-slate-700" : "bg-white text-blue-600 shadow-xs border border-slate-200") 
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                BRL (R$)
              </button>
              <button
                id="btn-curr-usd"
                onClick={() => setCurrency("USD")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  currency === "USD" 
                    ? (isDark ? "bg-slate-800 text-white border border-slate-700" : "bg-white text-blue-600 shadow-xs border border-slate-200") 
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* PDF Export Action */}
            <button
              id="btn-print-report"
              onClick={handlePrint}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] transition cursor-pointer font-semibold shadow-xs ${isDark ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
            >
              <Printer size={13} />
              Imprimir
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 print:py-0 print:px-0">
        
        {/* Header Section */}
        <header className={`border-b pb-5 mb-8 text-center sm:text-left ${themeBorder}`}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
            <div>
              <p className="text-[10px] font-bold text-blue-500 tracking-widest uppercase font-mono mb-1">
                Demonstrativo de Custos Consolidados GCP
              </p>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${themeTextPrimary}`}>
                Relatório Executivo de Custos Estimados
              </h1>
              <h2 className={`text-base font-semibold mt-0.5 ${themeTextSecondary}`}>
                Hermes | Junho de 2026
              </h2>
            </div>
            <div className={`text-center sm:text-right font-mono text-xs p-2.5 sm:p-3 rounded-md border ${isDark ? "bg-slate-900/50 border-slate-800/80 text-slate-400" : "bg-slate-50 border-slate-100 text-slate-500"}`}>
              <p>Gerado em: 06/07/2026</p>
              <p>Câmbio Comercial de Ref: 1 USD = R$ {usdToBrl.toFixed(2)}</p>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Resumo Executivo */}
            <section id="resumo-executivo" className={`rounded-lg p-6 border ${themeCard}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  1. Resumo Executivo
                </h3>
              </div>
              <div className={`${isDark ? "text-slate-300" : "text-slate-600"} space-y-3.5 text-sm leading-relaxed`}>
                <p>
                  Este relatório apresenta uma visão executiva consistente do ecossistema <strong className={themeTextPrimary}>Hermes</strong> no mês de junho de 2026, refinando a identificação de faturamentos para dar maior segurança à tomada de decisão.
                </p>
                <p>
                  O principal componente financeiro diretamente atribuível ao Hermes é o <span className={themeCodeClass}>Vertex AI</span>. O custo operacional computacional observado para o endpoint <span className={themeCodeClass}>/webhook</span> em Cloud Run foi extremamente baixo e residual.
                </p>
                <p>
                  Existem serviços compartilhados ou não atribuídos na billing account geral (tais como <span className={themeCodeClass}>Cloud Run</span>, <span className={themeCodeClass}>Cloud Build</span> e <span className={themeCodeClass}>Cloud Run Functions</span>) que contêm recursos de outros workloads e não podem ser tidos como exclusivos do Hermes.
                </p>
                
                <div className={`p-4 rounded-md text-xs flex items-start gap-2.5 border ${themeCardSurface}`}>
                  <ShieldAlert size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Natureza Gerencial:</strong> Este documento fornece uma visão gerencial e executiva com máxima transparência metodológica. Ele não representa e não deve ser confundido com um rateio contábil exato ou balanço financeiro fechado do Hermes.
                  </span>
                </div>
              </div>
            </section>

            {/* 2. Visão Consolidada dos Custos Observados */}
            <section id="visao-consolidada" className={`rounded-lg p-6 border ${themeCard}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  2. Visão Consolidada dos Custos Observados
                </h3>
              </div>

              {/* Observed Cost Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                {/* Vertex AI */}
                <div className={`${isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"} p-4 rounded-md border flex flex-col justify-between`}>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Vertex AI (Direto)
                  </span>
                  <div className="my-2">
                    <span className={`text-xl font-bold font-mono ${themeTextPrimary}`}>
                      {convertValue(costVertexBrl)}
                    </span>
                  </div>
                  <span className="text-[9px] text-emerald-500 block font-medium">100% Atribuído</span>
                </div>

                {/* Cloud Run Functions */}
                <div className={`${isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"} p-4 rounded-md border flex flex-col justify-between`}>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Run Functions (Não Atrib.)
                  </span>
                  <div className="my-2">
                    <span className={`text-xl font-bold font-mono text-amber-500`}>
                      {convertValue(costFunctionsBrl)}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 block font-mono">Relevante / Investigar</span>
                </div>

                {/* Cloud Run */}
                <div className={`${isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"} p-4 rounded-md border flex flex-col justify-between`}>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Cloud Run (Total)
                  </span>
                  <div className="my-2">
                    <span className={`text-xl font-bold font-mono ${themeTextPrimary}`}>
                      {convertValue(costCloudRunBrl)}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 block font-mono">Compartilhado</span>
                </div>

                {/* Cloud Build */}
                <div className={`${isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"} p-4 rounded-md border flex flex-col justify-between`}>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Cloud Build (Total)
                  </span>
                  <div className="my-2">
                    <span className={`text-xl font-bold font-mono ${themeTextPrimary}`}>
                      {convertValue(costCloudBuildBrl)}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 block font-mono">Compartilhado</span>
                </div>

                {/* Cloud Build Subtotal real */}
                <div className={`${isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"} p-4 rounded-md border flex flex-col justify-between`}>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Build Residência Real
                  </span>
                  <div className="my-2">
                    <span className="text-xs font-bold font-mono text-slate-400">
                      {convertPrecisionValue(costCloudBuildPrecisionBrl)}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 block font-mono">Não arredondado</span>
                </div>

                {/* Webhook Estimate */}
                <div className={`${isDark ? "bg-slate-950/90 border-slate-800" : "bg-slate-50 border-slate-200"} p-4 rounded-md border border-blue-500/20 flex flex-col justify-between`}>
                  <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider font-mono">
                    Est. Webhook
                  </span>
                  <div className="my-2">
                    <span className="text-xl font-bold text-blue-500 font-mono">
                      {convertValue(0.10 * usdToBrl, costWebhookUsd)}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 block font-mono">Mapeamento Logs</span>
                </div>
              </div>

              {/* Leitura Executiva */}
              <div className={`border-t pt-4 space-y-2.5 ${themeBorder}`}>
                <h4 className={`text-xs font-bold uppercase tracking-widest font-mono ${themeTextPrimary}`}>
                  Leitura Executiva Curta
                </h4>
                <ul className={`space-y-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <span>
                      <strong className={themeTextPrimary}>Vertex AI (R$ 41,81)</strong> é o principal custo diretamente atribuível ao Hermes no período examinado.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                    <span>
                      <strong className={themeTextPrimary}>Cloud Run Functions (R$ 101,90)</strong> representa um custo de tamanho relevante na billing account do período, porém sem atribuição confirmada ao Hermes, necessitando de auditoria específica de uso.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <span>
                      Os serviços de <strong className={themeTextPrimary}>Cloud Run</strong> e <strong className={themeTextPrimary}>Cloud Build</strong> tiveram impacto financeiro extremamente marginal e próximo de zero na conta de faturamento total.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. Custos Diretamente Atribuíveis ao Hermes */}
            <section id="custos-diretos" className={`rounded-lg p-6 border ${themeCard}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  3. Custos Diretamente Atribuíveis ao Hermes
                </h3>
              </div>
              <div className={`${isDark ? "text-slate-300" : "text-slate-600"} text-sm space-y-4`}>
                <p>
                  Apenas o <span className={themeCodeClass}>Vertex AI</span> será tratado formalmente como custo diretamente atribuível ao Hermes. Isso ocorre porque o Hermes é o único ecossistema ativo que consome e interage com os endpoints desse serviço no contexto analisado da conta do GCP.
                </p>

                <div className={`border rounded-md p-4 flex justify-between items-center gap-4 ${themeCardSurface}`}>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                      Custo Direto Confirmado
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">Serviço: Vertex AI</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-500 font-mono">
                      {convertValue(costVertexBrl)}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">Base: R$ 41,81</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Custos Compartilhados e Não Atribuídos */}
            <section id="custos-compartilhados" className={`rounded-lg p-6 border ${themeCard}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  4. Custos Compartilhados e Não Atribuídos
                </h3>
              </div>
              <div className={`${isDark ? "text-slate-300" : "text-slate-600"} text-sm space-y-4`}>
                <p>
                  Os serviços listados abaixo aparecem na faturamento do mesmo período da conta, mas não possuem labels ou configurações de rede que os vinculem exclusivamente ao Hermes. Eles devem ser interpretados como custos da conta organizacional e não como custos imputados ao Hermes.
                </p>
                
                <p>
                  Notavelmente, as <strong className={themeTextPrimary}>Cloud Run Functions</strong> geraram o maior faturamento de infraestrutura após o Vertex AI. Elas devem ser investigadas em análises operacionais de rotas futuras para verificar se há chamadas do ecossistema integradas a elas.
                </p>

                <div className={`overflow-x-auto border rounded-md ${themeBorder}`}>
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className={`border-b font-mono ${themeTableHead} ${themeBorder}`}>
                        <th className="py-2.5 px-3 font-semibold">Serviço GCP</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Valor Observado</th>
                        <th className="py-2.5 px-3 font-semibold">Status de Atribuição</th>
                        <th className="py-2.5 px-3 font-semibold">Leitura Executiva</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y font-mono ${isDark ? "divide-slate-850" : "divide-slate-100"} ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      <tr>
                        <td className="py-3 px-3 font-semibold">Vertex AI</td>
                        <td className="py-3 px-3 text-right">{convertValue(costVertexBrl)}</td>
                        <td className="py-3 px-3 text-emerald-500 font-medium text-[10px]">Diretamente atribuível</td>
                        <td className="py-3 px-3 text-slate-500 font-sans">Custo direto exclusivo do Hermes</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold">Cloud Run</td>
                        <td className="py-3 px-3 text-right">{convertValue(costCloudRunBrl)}</td>
                        <td className="py-3 px-3 text-amber-500 font-medium text-[10px]">Compartilhado</td>
                        <td className="py-3 px-3 text-slate-500 font-sans">Baixo impacto no período</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold">Cloud Build</td>
                        <td className="py-3 px-3 text-right">{convertValue(costCloudBuildBrl)}</td>
                        <td className="py-3 px-3 text-amber-500 font-medium text-[10px]">Compartilhado</td>
                        <td className="py-3 px-3 text-slate-500 font-sans">Impacto praticamente nulo</td>
                      </tr>
                      <tr className={isDark ? "bg-slate-900/60" : "bg-slate-50/50"}>
                        <td className="py-3 px-3 font-semibold text-amber-500">Cloud Run Functions</td>
                        <td className="py-3 px-3 text-right font-bold text-amber-500">{convertValue(costFunctionsBrl)}</td>
                        <td className="py-3 px-3 text-red-500 font-semibold text-[10px]">Não atribuído</td>
                        <td className="py-3 px-3 text-slate-400 font-sans italic">Custo relevante que exige investigação futura</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* 5. Projeção Operacional de Cloud Run */}
            <section id="projecao-operacional" className={`rounded-lg p-6 border ${themeCard}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  5. Projeção Operacional de Cloud Run (Webhook)
                </h3>
              </div>

              <div className="space-y-4">
                <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  A projeção abaixo considera <strong>apenas</strong> o comportamento operacional e financeiro do Cloud Run do endpoint analisado. 
                  Ela <span className="underline decoration-red-500 underline-offset-4">não representa o crescimento dos custos de Vertex AI</span> ou de outros componentes de modelo inteligente do Hermes, que são independentes e dependem puramente da volumetria de tokens e requisições da LLM.
                </p>

                {/* Fixed Projections Table */}
                <div className={`overflow-x-auto border rounded-md ${themeBorder}`}>
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className={`border-b font-mono ${themeTableHead} ${themeBorder}`}>
                        <th className="py-2.5 px-3 font-semibold">Volume Mensal (Requests)</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Custo Estimado (USD)</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Custo Convertido ({currency})</th>
                        <th className="py-2.5 px-3">Escala do Runtime</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y font-mono ${isDark ? "divide-slate-850" : "divide-slate-100"} ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      <tr>
                        <td className="py-2.5 px-3">182 (Base Observada)</td>
                        <td className="py-2.5 px-3 text-right">US$ 0,10</td>
                        <td className={`py-2.5 px-3 text-right font-semibold ${themeTextPrimary}`}>{convertValue(0.10 * usdToBrl, 0.10)}</td>
                        <td className="py-2.5 px-3 text-slate-500 font-sans text-[11px]">Consumo atual observado</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3">1.000</td>
                        <td className="py-2.5 px-3 text-right">US$ 0,55</td>
                        <td className={`py-2.5 px-3 text-right font-semibold ${themeTextPrimary}`}>{convertValue(0.55 * usdToBrl, 0.55)}</td>
                        <td className="py-2.5 px-3 text-slate-500 font-sans text-[11px]">Tráfego inicial de homologação</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3">10.000</td>
                        <td className="py-2.5 px-3 text-right text-blue-500 font-bold">US$ 5,49</td>
                        <td className={`py-2.5 px-3 text-right font-semibold ${themeTextPrimary}`}>{convertValue(5.49 * usdToBrl, 5.49)}</td>
                        <td className="py-2.5 px-3 text-slate-500 font-sans text-[11px]">Tráfego médio em produção</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3">100.000</td>
                        <td className="py-2.5 px-3 text-right text-blue-500 font-bold">US$ 54,91</td>
                        <td className={`py-2.5 px-3 text-right font-semibold ${themeTextPrimary}`}>{convertValue(54.91 * usdToBrl, 54.91)}</td>
                        <td className="py-2.5 px-3 text-slate-500 font-sans text-[11px]">Tráfego intenso de larga escala</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Cloud Run simulator widget */}
                <div className={`border p-5 rounded-md print:hidden ${themeCardSurface}`}>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Calculator size={14} className="text-slate-500" />
                    <span className={`text-xs font-bold uppercase tracking-widest font-mono ${themeTextPrimary}`}>
                      Simulador de Custo do Cloud Run (Webhook)
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs">
                      <span>Volume de Requisições Simulado:</span>
                      <span className="font-bold font-mono text-blue-500 text-sm">
                        {simulatedRequests.toLocaleString("pt-BR")} requests
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
                      className={`w-full h-1 rounded-lg appearance-none cursor-pointer accent-blue-500 ${themeInputRange}`}
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>182 reqs</span>
                      <span>75.000</span>
                      <span>150.000 reqs</span>
                    </div>

                    <div className={`p-4 rounded border text-center ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Custo Estimado de Cloud Run</span>
                      <span className={`text-lg font-bold font-mono ${themeTextPrimary}`}>
                        {convertValue(simulatedRunUsd * usdToBrl, simulatedRunUsd)}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1">
                        Cálculo baseado puramente no runtime do webhook ({simulatedRequests} reqs)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Strategic Callout */}
                <div className={`p-4 border rounded-md flex gap-2.5 ${themeCardSurface}`}>
                  <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-xs">
                    <strong className={themeTextPrimary}>Destaque Operacional Importante:</strong> Se o uso de LLM (Inteligência Artificial) crescer junto com o tráfego físico, o custo total do Hermes pode crescer de forma altamente não linear e ser puxado principalmente pelo <strong className={themeTextPrimary}>Vertex AI</strong>, e não pela infraestrutura básica de contêiner do <strong className={themeTextPrimary}>Cloud Run</strong>.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* 6. Dados Operacionais Observados do Cloud Run */}
            <section id="dados-operacionais" className={`rounded-lg p-5 border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  6. Dados Operacionais
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                {/* Deployment Metadata */}
                <div className={`space-y-2 border-b pb-3.5 ${themeBorder}`}>
                  <div>
                    <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">GCP Project:</span>
                    <span className={`font-semibold font-mono ${themeTextPrimary}`}>contabilizei-canais-xp</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Serviço Cloud Run:</span>
                    <span className={`font-semibold font-mono break-all ${themeTextPrimary}`}>hermes-observability-agent-prd</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Região:</span>
                    <span className={`font-semibold font-mono ${themeTextPrimary}`}>us-central1</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Janela Temporal:</span>
                    <span className={`font-semibold font-mono ${themeTextPrimary}`}>2026-06-01 a 2026-06-30</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Tempo Ativo Estimado:</span>
                    <span className={`font-semibold font-mono ${themeTextPrimary}`}>3768.622595 s</span>
                  </div>
                </div>

                {/* HTTP Request Status */}
                <div className={`space-y-2 border-b pb-3.5 ${themeBorder}`}>
                  <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Tráfego de Endpoint (/webhook):</span>
                  <div className="flex justify-between py-1 font-mono">
                    <span className="text-slate-500">Requisições Totais</span>
                    <span className={`font-bold ${themeTextPrimary}`}>182</span>
                  </div>
                  <div className="flex justify-between py-1 font-mono items-center">
                    <span className="text-slate-500">Status 200 (OK)</span>
                    <span className="font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">180</span>
                  </div>
                  <div className="flex justify-between py-1 font-mono">
                    <span className="text-slate-500">Status 401</span>
                    <span className={`font-bold ${themeTextPrimary}`}>1</span>
                  </div>
                  <div className="flex justify-between py-1 font-mono">
                    <span className="text-slate-500">Status 403</span>
                    <span className={`font-bold ${themeTextPrimary}`}>1</span>
                  </div>
                </div>

                {/* Latencies metrics */}
                <div className={`space-y-2 border-b pb-3.5 ${themeBorder}`}>
                  <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Métricas de Latência:</span>
                  <div className="flex justify-between py-0.5 font-mono">
                    <span className="text-slate-500">Latência Total</span>
                    <span className={themeTextPrimary}>3854.304697 s</span>
                  </div>
                  <div className="flex justify-between py-0.5 font-mono">
                    <span className="text-slate-500">Latência Média</span>
                    <span className={themeTextPrimary}>21.177498 s</span>
                  </div>
                  <div className="flex justify-between py-0.5 font-mono">
                    <span className="text-slate-500">Latência P50</span>
                    <span className={themeTextPrimary}>19.190444 s</span>
                  </div>
                  <div className="flex justify-between py-0.5 font-mono">
                    <span className="text-slate-500">Latência P95</span>
                    <span className="font-bold text-blue-500">48.95701 s</span>
                  </div>
                </div>

                {/* Container Physical Configuration */}
                <div className={`border rounded p-3.5 space-y-2 ${themeCardSurface}`}>
                  <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Especificações da Instância:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>CPU: <strong className={themeTextPrimary}>1 vCPU</strong></div>
                    <div>Memória: <strong className={themeTextPrimary}>1 GiB</strong></div>
                    <div>Concurrency: <strong className={themeTextPrimary}>5</strong></div>
                    <div>Max Scale: <strong className={themeTextPrimary}>1</strong></div>
                    <div className="col-span-2">CPU Boost: <strong className={themeTextPrimary}>True</strong></div>
                    <div className="col-span-2">Min Scale: <span className="text-slate-400 italic">não identificado</span></div>
                  </div>
                </div>

                {/* Executive observation */}
                <p className={`text-[11px] leading-relaxed pt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  <strong>Observação:</strong> O endpoint analisado registrou baixo tráfego absoluto em junho de 2026. Consequentemente, o custo operacional de Cloud Run para este tráfego foi meramente residual quando comparado ao custo direto de Vertex AI.
                </p>

              </div>
            </section>

            {/* 7. Premissas e Limitações */}
            <section id="premissas-limitacoes" className={`rounded-lg p-5 border ${themeCard}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  7. Premissas e Limitações
                </h3>
              </div>

              <ul className="space-y-3.5 text-[11px] leading-relaxed list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 select-none font-bold mt-0">•</span>
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    <strong className={themeTextPrimary}>Vertex AI</strong> foi tratado como o único faturamento diretamente atribuível ao Hermes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 select-none font-bold mt-0">•</span>
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    <strong className={themeTextPrimary}>Cloud Run</strong>, <strong className={themeTextPrimary}>Cloud Build</strong> e <strong className={themeTextPrimary}>Cloud Run Functions</strong> foram tratados como faturamentos agregados compartilhados ou não atribuídos na billing account.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 select-none font-bold mt-0">•</span>
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    A base bruta de dados do billing export disponível é consolidada por tipo de recurso provisionado ao nível do provedor GCP, e não por workload individual.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 select-none font-bold mt-0">•</span>
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    A estimativa de consumo do Cloud Run foi derivada de telemetrias físicas obtidas nos logs operacionais do Cloud Logging.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 select-none font-bold mt-0">•</span>
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    Este relatório não representa um custo contábil fechado ou rateio formal absoluto, mas sim uma modelagem racional executiva para apoio de investimentos.
                  </span>
                </li>
              </ul>
            </section>

          </div>

        </div>

        {/* Small Footer */}
        <footer className={`border-t pt-6 mt-12 text-center text-[10px] text-slate-400 font-mono space-y-1.5 ${themeBorder}`}>
          <p>
            Fontes de Dados: Export de Billing Agregado GCP, Cloud Logging & Configurações de Ativos (contabilizei-canais-xp)
          </p>
          <p>
            Competência de Auditoria: Junho de 2026
          </p>
        </footer>

      </main>
    </div>
  );
}
