import { useState } from "react";
import { 
  TrendingUp, 
  Activity, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  Calendar, 
  Printer, 
  Calculator,
  ShieldAlert,
  Info,
  Sun,
  Moon
} from "lucide-react";

export default function App() {
  const [currency, setCurrency] = useState<"BRL" | "USD">("BRL");
  const [isDark, setIsDark] = useState<boolean>(true); // Defaults to dark mode for comfortable reading
  
  // Exchange rate reference (e.g. 1 USD = 5.45 BRL as of June/July 2026 reference)
  const usdToBrl = 5.45;

  // Projection simulator state
  const [simulatedRequests, setSimulatedRequests] = useState<number>(10000);
  const baseRequests = 182;
  const baseCloudRunUsd = 0.10;
  const baseVertexBrl = 41.81;

  // Format helper for tooltips/labels
  const formatValue = (val: number, isUsd: boolean = false) => {
    if (isUsd) {
      return `US$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
    }
    return `R$ ${val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
  };

  // Convert given values dynamically based on currency toggle
  const displayVal = (brlVal: number, usdVal?: number) => {
    if (currency === "BRL") {
      if (usdVal !== undefined) {
        return `R$ ${(usdVal * usdToBrl).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      return `R$ ${brlVal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      if (usdVal !== undefined) {
        return `US$ ${usdVal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      return `US$ ${(brlVal / usdToBrl).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  // Simulator values
  const simulatedCloudRunUsd = (simulatedRequests / baseRequests) * baseCloudRunUsd;
  // Vertex AI linear scaling helper
  const simulatedVertexBrl = (simulatedRequests / baseRequests) * baseVertexBrl;

  const handlePrint = () => {
    window.print();
  };

  // Dynamic Theme Styling Variables
  const themeBg = isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const themeCard = isDark ? "bg-slate-900 border-slate-800 shadow-xl" : "bg-white border-slate-200 shadow-xs";
  const themeCardSurface = isDark ? "bg-slate-950/65 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-600";
  const themeTextPrimary = isDark ? "text-slate-100" : "text-slate-900";
  const themeTextSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const themeBorder = isDark ? "border-slate-800" : "border-slate-200";
  const themeTableHead = isDark ? "bg-slate-950 text-slate-400" : "bg-slate-50 text-slate-500";
  const themeTableBorder = isDark ? "border-slate-800/80" : "border-slate-200";
  const themeCodeClass = isDark ? "px-1.5 py-0.5 bg-slate-950 rounded font-mono text-xs text-slate-300 border border-slate-800" : "px-1.5 py-0.5 bg-slate-100 rounded font-mono text-xs text-slate-800 border border-slate-200";
  const themeInputRange = isDark ? "bg-slate-800" : "bg-slate-200";

  return (
    <div className={`min-h-screen ${themeBg} font-sans antialiased transition-colors duration-200 print:bg-white print:text-black`}>
      {/* Top Navigation & Accessibility Bar - Beautiful clean minimalist design */}
      <div className={`border-b sticky top-0 z-50 transition-colors duration-200 print:hidden ${isDark ? "bg-slate-900/90 backdrop-blur-md border-slate-800 text-slate-200" : "bg-white/95 backdrop-blur-md border-slate-200 text-slate-800"}`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs gap-3 py-3 px-4">
          <div className="flex items-center gap-2 text-inherit opacity-95">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-success"></span>
            <span className="font-semibold">Visão Executiva Hermes</span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} className="opacity-60" />
              Período: Junho / 2026
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <div className={`flex items-center p-0.5 rounded-md border ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
              <button
                id="btn-theme-light"
                onClick={() => setIsDark(false)}
                className={`p-1 rounded text-xs transition cursor-pointer ${
                  !isDark 
                    ? "bg-white text-brand-blue shadow-xs border border-slate-200" 
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
                    ? "bg-slate-850 text-brand-blue shadow-xs border border-slate-700" 
                    : "text-slate-400 hover:text-slate-600"
                }`}
                title="Ativar Tema Escuro"
              >
                <Moon size={14} />
              </button>
            </div>

            {/* Currency selector */}
            <div className={`flex items-center p-1 rounded-md border ${isDark ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
              <button
                id="btn-curr-brl"
                onClick={() => setCurrency("BRL")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  currency === "BRL" 
                    ? (isDark ? "bg-slate-850 text-white border border-slate-750" : "bg-white text-brand-blue shadow-xs border border-slate-200") 
                    : (isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900")
                }`}
              >
                BRL (R$)
              </button>
              <button
                id="btn-curr-usd"
                onClick={() => setCurrency("USD")}
                className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  currency === "USD" 
                    ? (isDark ? "bg-slate-850 text-white border border-slate-750" : "bg-white text-brand-blue shadow-xs border border-slate-200") 
                    : (isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900")
                }`}
              >
                USD ($)
              </button>
            </div>

            {/* Print Action */}
            <button
              id="btn-print-report"
              onClick={handlePrint}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] transition cursor-pointer font-semibold shadow-xs ${isDark ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
            >
              <Printer size={13} />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 print:py-0 print:px-0">
        
        {/* Header Section */}
        <header className={`border-b pb-5 mb-8 text-center sm:text-left ${themeBorder}`}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
            <div>
              <p className="text-[10px] font-bold text-brand-blue tracking-widest uppercase font-mono mb-1">
                Relatório de Custos GCP
              </p>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${themeTextPrimary}`}>
                Relatório Executivo de Custos Estimados
              </h1>
              <h2 className={`text-base font-semibold mt-0.5 ${themeTextSecondary}`}>
                Hermes | Junho de 2026
              </h2>
            </div>
            <div className={`text-center sm:text-right font-mono text-xs p-2.5 sm:p-0 rounded-md border sm:border-0 ${isDark ? "bg-slate-900/40 border-slate-800/60 text-slate-400" : "bg-slate-50 border-slate-100 text-slate-500"}`}>
              <p>Gerado em: 06/07/2026</p>
              <p>Câmbio de Ref: 1 USD = R$ {usdToBrl.toFixed(2)}</p>
            </div>
          </div>
        </header>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Column (Spans 2 columns on large screens) */}
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
                  Este relatório apresenta uma visão macro do custo estimado do ecossistema <strong className={themeTextPrimary}>Hermes</strong> no mês de junho de 2026.
                </p>
                <p>
                  O custo do serviço <span className={themeCodeClass}>Vertex AI</span> é tratado como <strong className={themeTextPrimary}>diretamente atribuível ao Hermes</strong>, pois apenas o Hermes utiliza esse serviço no contexto analisado.
                </p>
                <p>
                  Os custos de <span className={themeCodeClass}>Cloud Run</span> e <span className={themeCodeClass}>Cloud Build</span> foram tratados como <strong className={themeTextPrimary}>estimativas parciais</strong> para o Hermes, pois existem outros workloads compartilhando esses serviços na conta organizacional.
                </p>
                <div className={`p-3.5 rounded-md text-xs flex items-start gap-2 border ${themeCardSurface}`}>
                  <Info size={15} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    O objetivo é oferecer uma leitura executiva clara, fornecendo transparência total sobre o que representa custo observado exclusivo e o que consiste em custo compartilhado estimado.
                  </span>
                </div>
              </div>
            </section>

            {/* 2. Visão Consolidada de Custos */}
            <section id="visao-consolidada" className={`rounded-lg p-6 border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  2. Visão Consolidada de Custos (Junho 2026)
                </h3>
              </div>

              {/* Minimal Stat Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {/* Vertex AI */}
                <div className={`${isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"} p-4 rounded-md border text-center flex flex-col justify-between`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Vertex AI
                  </span>
                  <div className="my-2">
                    <span className={`text-lg font-bold font-mono ${themeTextPrimary}`}>
                      {displayVal(41.81)}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 block font-mono">Direto</span>
                </div>

                {/* Cloud Run */}
                <div className={`${isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"} p-4 rounded-md border text-center flex flex-col justify-between`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Cloud Run
                  </span>
                  <div className="my-2">
                    <span className={`text-lg font-bold font-mono ${themeTextPrimary}`}>
                      {displayVal(1.05)}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 block font-mono">Total Conta</span>
                </div>

                {/* Cloud Build */}
                <div className={`${isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"} p-4 rounded-md border text-center flex flex-col justify-between`}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Cloud Build
                  </span>
                  <div className="my-2">
                    <span className={`text-lg font-bold font-mono ${themeTextPrimary}`}>
                      {displayVal(0.00)}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 block font-mono">Total Conta</span>
                </div>

                {/* Webhook Estimate */}
                <div className={`${isDark ? "bg-slate-950/90 border-slate-850" : "bg-slate-50 border-slate-200"} p-4 rounded-md border border-brand-blue/30 text-center flex flex-col justify-between`}>
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-wider font-mono">
                    Est. Webhook
                  </span>
                  <div className="my-2">
                    <span className="text-lg font-bold text-brand-blue font-mono">
                      {displayVal(0.10 * usdToBrl, 0.10)}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-500 block font-mono">Operacional</span>
                </div>
              </div>

              {/* Leitura Executiva Textual */}
              <div className={`border-t pt-4 space-y-3 ${themeBorder}`}>
                <h4 className={`text-xs font-bold uppercase tracking-widest font-mono ${themeTextPrimary}`}>
                  Leitura Executiva Principal
                </h4>
                <ul className={`space-y-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0"></span>
                    <span>
                      <strong className={themeTextPrimary}>Vertex AI</strong> representa o principal componente de custo associado ao Hermes em junho de 2026.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0"></span>
                    <span>
                      O serviço <strong className={themeTextPrimary}>Cloud Run</strong> teve custo muito baixo no período observado.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0"></span>
                    <span>
                      O serviço <strong className={themeTextPrimary}>Cloud Build</strong> foi praticamente irrelevante no período de faturamento.
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
                  O serviço <span className={themeCodeClass}>Vertex AI</span> pode ser considerado custo direto do Hermes, porque o Hermes é o único projeto que utiliza esse serviço no contexto analisado.
                </p>

                <div className={`border rounded-md p-4 flex justify-between items-center gap-4 ${themeCardSurface}`}>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                      Custo Direto Confirmado
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">Serviço: Vertex AI</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-brand-blue font-mono">
                      {displayVal(41.81)}
                    </p>
                    <p className="text-[9px] text-slate-400 font-mono">BRL Bruto: R$ 41,81</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Custos Estimados do Hermes */}
            <section id="custos-estimados" className={`rounded-lg p-6 border ${themeCard}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  4. Custos Estimados do Hermes
                </h3>
              </div>
              <div className={`${isDark ? "text-slate-300" : "text-slate-600"} text-sm space-y-4`}>
                <p>
                  Como <strong className={themeTextPrimary}>Cloud Run</strong> e <strong className={themeTextPrimary}>Cloud Build</strong> possuem compartilhamento com outros workloads, esses itens não podem ser tratados como custo exclusivo do Hermes sem uma atribuição mais detalhada por projeto, revisão ou labels organizacionais. Ainda assim, eles servem de referência macro limitadora para o relatório.
                </p>

                <div className={`overflow-x-auto border rounded-md ${themeBorder}`}>
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className={`border-b font-mono ${themeTableHead} ${themeBorder}`}>
                        <th className="py-2.5 px-3 font-semibold">Serviço Compartilhado</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Total na Billing Account</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Valor Convertido ({currency})</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y font-mono ${isDark ? "divide-slate-800" : "divide-slate-100"}`}>
                      <tr className={isDark ? "text-slate-300" : "text-slate-700"}>
                        <td className="py-2.5 px-3 font-medium text-inherit">Cloud Run total</td>
                        <td className="py-2.5 px-3 text-right">R$ 1,05</td>
                        <td className={`py-2.5 px-3 text-right font-semibold ${themeTextPrimary}`}>{displayVal(1.05)}</td>
                      </tr>
                      <tr className={isDark ? "text-slate-300" : "text-slate-700"}>
                        <td className="py-2.5 px-3 font-medium text-inherit">Cloud Build total</td>
                        <td className="py-2.5 px-3 text-right">R$ 0,00</td>
                        <td className={`py-2.5 px-3 text-right font-semibold ${themeTextPrimary}`}>{displayVal(0.00)}</td>
                      </tr>
                      <tr className={isDark ? "bg-slate-950/40 text-slate-500 text-[11px]" : "bg-slate-50/50 text-slate-500 text-[11px]"}>
                        <td className="py-2 px-3 pl-6 italic">Subtotal não arredondado de Cloud Build</td>
                        <td className="py-2 px-3 text-right">R$ 0,000315</td>
                        <td className="py-2 px-3 text-right">
                          {currency === "BRL" ? "R$ 0,000315" : formatValue(0.000315 / usdToBrl, true)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className={`p-3.5 border rounded text-xs ${themeCardSurface}`}>
                  <strong className={themeTextPrimary}>Observação Importante:</strong> Esses valores de faturamento agregado devem ser interpretados como referência agregada da conta para os serviços compartilhados, e não como custo exclusivo do Hermes.
                </div>
              </div>
            </section>

            {/* 5. Projeção de Escala */}
            <section id="projecao-escala" className={`rounded-lg p-6 border ${themeCard}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  5. Projeção de Escala (Cloud Run)
                </h3>
              </div>

              <div className="space-y-4">
                <p className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  A projeção abaixo considera apenas o comportamento operacional do Cloud Run do endpoint analisado. Ela <strong className={themeTextPrimary}>não projeta</strong> automaticamente o crescimento de custo de Vertex AI, que pode variar drasticamente conforme modelo de LLM selecionado, tamanho de prompt, tokens e padrão de uso geral.
                </p>

                {/* Minimal Table */}
                <div className={`overflow-x-auto border rounded-md ${themeBorder}`}>
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className={`border-b font-mono ${themeTableHead} ${themeBorder}`}>
                        <th className="py-2.5 px-3 font-semibold">Volume Mensal (Requisições)</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Custo Estimado (USD)</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Custo Convertido ({currency})</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y font-mono ${isDark ? "divide-slate-800" : "divide-slate-100"} ${isDark ? "text-slate-300" : "text-slate-700"}`}>
                      <tr>
                        <td className="py-2.5 px-3">182 (Base)</td>
                        <td className="py-2.5 px-3 text-right">US$ 0,10</td>
                        <td className={`py-2.5 px-3 text-right font-semibold ${themeTextPrimary}`}>{displayVal(0.10 * usdToBrl, 0.10)}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3">1.000</td>
                        <td className="py-2.5 px-3 text-right">US$ 0,55</td>
                        <td className={`py-2.5 px-3 text-right font-semibold ${themeTextPrimary}`}>{displayVal(0.55 * usdToBrl, 0.55)}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3">10.000</td>
                        <td className="py-2.5 px-3 text-right text-brand-blue font-bold">US$ 5,49</td>
                        <td className={`py-2.5 px-3 text-right font-semibold ${themeTextPrimary}`}>{displayVal(5.49 * usdToBrl, 5.49)}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3">100.000</td>
                        <td className="py-2.5 px-3 text-right text-brand-blue font-bold">US$ 54,91</td>
                        <td className={`py-2.5 px-3 text-right font-semibold ${themeTextPrimary}`}>{displayVal(54.91 * usdToBrl, 54.91)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Interactive Simulator widget */}
                <div className={`border p-4 rounded-md print:hidden ${themeCardSurface}`}>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Calculator size={13} className="text-slate-500" />
                    <span className={`text-xs font-bold uppercase tracking-widest font-mono ${themeTextPrimary}`}>
                      Simulador Interativo de Requests
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span className={isDark ? "text-slate-300" : "text-slate-600"}>Volume de Requisições Mensais:</span>
                      <span className="font-bold font-mono text-brand-blue">
                        {simulatedRequests.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <input
                      id="sim-range-input"
                      type="range"
                      min="182"
                      max="200000"
                      step="500"
                      value={simulatedRequests}
                      onChange={(e) => setSimulatedRequests(Number(e.target.value))}
                      className={`w-full h-1 rounded-lg appearance-none cursor-pointer accent-brand-blue ${themeInputRange}`}
                    />
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className={`p-2.5 rounded border text-center ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-mono">Cloud Run</span>
                        <span className={`text-sm font-bold font-mono ${themeTextPrimary}`}>
                          {displayVal(simulatedCloudRunUsd * usdToBrl, simulatedCloudRunUsd)}
                        </span>
                      </div>
                      <div className={`p-2.5 rounded border text-center ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
                        <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-mono">Vertex AI Linear (Est.)</span>
                        <span className={`text-sm font-bold font-mono ${themeTextPrimary}`}>
                          {displayVal(simulatedVertexBrl)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Destaque textual */}
                <div className={`p-3.5 border rounded-md flex gap-2 ${themeCardSurface}`}>
                  <ShieldAlert className="text-slate-500 shrink-0 mt-0.5" size={15} />
                  <p className="text-xs">
                    <strong className={themeTextPrimary}>Destaque estratégico:</strong> Se o uso de LLM crescer junto com o volume de requests, o custo total do Hermes tenderá a ser puxado principalmente por <strong className={themeTextPrimary}>Vertex AI</strong>, e não por <strong className={themeTextPrimary}>Cloud Run</strong>.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-6">
            
            {/* 6. Dados Operacionais Observados */}
            <section id="dados-operacionais" className={`rounded-lg p-5 border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
              <div className="minimalist-header mb-4">
                <h3 className={`text-xs font-bold tracking-wider uppercase ${themeTextSecondary}`}>
                  6. Dados Operacionais
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                
                {/* Meta details list */}
                <div className={`space-y-2 border-b pb-3 ${themeBorder}`}>
                  <div>
                    <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Projeto analisado:</span>
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
                    <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Período analisado:</span>
                    <span className={`font-semibold font-mono ${themeTextPrimary}`}>2026-06-01 a 2026-06-30</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Tempo ativo estimado:</span>
                    <span className={`font-semibold font-mono ${themeTextPrimary}`}>3768.622595 s</span>
                  </div>
                </div>

                {/* Requests detail */}
                <div className="space-y-2">
                  <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Tráfego /webhook:</span>
                  <div className={`flex justify-between py-1 border-b font-mono ${themeBorder}`}>
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>Requisições Totais</span>
                    <span className={`font-bold ${themeTextPrimary}`}>182</span>
                  </div>
                  <div className={`flex justify-between py-1 border-b font-mono items-center ${themeBorder}`}>
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>Status 200 (Sucesso)</span>
                    <span className="font-bold text-brand-success bg-emerald-500/10 px-1.5 py-0.5 rounded text-[11px]">180</span>
                  </div>
                  <div className={`flex justify-between py-1 border-b font-mono ${themeBorder}`}>
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>Status 401</span>
                    <span className={`font-bold ${themeTextPrimary}`}>1</span>
                  </div>
                  <div className={`flex justify-between py-1 border-b font-mono ${themeBorder}`}>
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>Status 403</span>
                    <span className={`font-bold ${themeTextPrimary}`}>1</span>
                  </div>
                </div>

                {/* Latencies */}
                <div className="space-y-2 pt-2">
                  <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Latências Observadas:</span>
                  <div className={`flex justify-between py-1 border-b font-mono ${themeBorder}`}>
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>Latência total</span>
                    <span className={themeTextPrimary}>3854.304697 s</span>
                  </div>
                  <div className={`flex justify-between py-1 border-b font-mono ${themeBorder}`}>
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>Latência média</span>
                    <span className={themeTextPrimary}>21.177498 s</span>
                  </div>
                  <div className={`flex justify-between py-1 border-b font-mono ${themeBorder}`}>
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>Latência P50 (Mediana)</span>
                    <span className={themeTextPrimary}>19.190444 s</span>
                  </div>
                  <div className={`flex justify-between py-1 border-b font-mono ${themeBorder}`}>
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>Latência P95</span>
                    <span className="font-bold text-brand-blue">48.95701 s</span>
                  </div>
                </div>

                {/* Service Specs config */}
                <div className={`border rounded-md p-3.5 space-y-2 mt-4 text-[11px] font-mono ${themeCardSurface}`}>
                  <span className="text-slate-400 block font-mono uppercase tracking-wider text-[9px]">Configurações Físicas:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>CPU: <strong className={themeTextPrimary}>1 vCPU</strong></div>
                    <div>Memória: <strong className={themeTextPrimary}>1 GiB</strong></div>
                    <div>Concurrency: <strong className={themeTextPrimary}>5</strong></div>
                    <div>Max scale: <strong className={themeTextPrimary}>1</strong></div>
                    <div className="col-span-2">CPU Boost: <strong className={themeTextPrimary}>True</strong></div>
                    <div className="col-span-2">Min scale: <span className="text-slate-400 italic">não identificado</span></div>
                  </div>
                </div>

                {/* Operational summary note */}
                <p className={`text-[11px] leading-relaxed pt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  <strong>Leitura:</strong> O tráfego verificado no Cloud Run foi baixo em junho de 2026, o que explica o custo operacional reduzido dessa camada.
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

              <ul className="space-y-3 text-[11px] leading-relaxed list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue select-none font-bold mt-0">•</span>
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    <strong className={themeTextPrimary}>Vertex AI</strong> foi tratado como custo diretamente atribuível ao Hermes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue select-none font-bold mt-0">•</span>
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    <strong className={themeTextPrimary}>Cloud Run</strong> e <strong className={themeTextPrimary}>Cloud Build</strong> foram tratados como custos compartilhados e apresentados como referência macro da conta.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue select-none font-bold mt-0">•</span>
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    O billing export disponível está agregado por serviço, e não por workload específico.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue select-none font-bold mt-0">•</span>
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    A estimativa operacional do Cloud Run foi baseada em logs e na configuração do serviço.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue select-none font-bold mt-0">•</span>
                  <span className={isDark ? "text-slate-300" : "text-slate-600"}>
                    O relatório não representa um rateio contábil exato, mas sim uma visão defensável gerencial para tomada de decisão.
                  </span>
                </li>
              </ul>
            </section>

          </div>

        </div>

        {/* Small Footer */}
        <footer className={`border-t pt-6 mt-12 text-center text-[10px] text-slate-400 font-mono space-y-1 ${themeBorder}`}>
          <p>
            Baseado em billing agregado da conta, Cloud Logging e configuração do Cloud Run
          </p>
          <p>
            Data de referência: Junho de 2026
          </p>
        </footer>

      </main>
    </div>
  );
}
