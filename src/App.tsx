import { 
  FileText, 
  Printer, 
  Info, 
  TrendingUp, 
  Cpu, 
  Server
} from "lucide-react";

export default function App() {
  const usdToBrl = 5.45;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased transition-colors duration-150 print:bg-white print:text-black pb-16 selection:bg-blue-600/30 selection:text-white">
      
      {/* Top action bar (Hidden on Print) */}
      <nav className="border-b border-slate-900 sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md print:hidden">
        <div className="max-w-3xl mx-auto flex flex-row justify-between items-center py-3 px-6 gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="font-bold tracking-tight text-slate-200">Hermes — Relatório de Custos</span>
          </div>

          <div>
            <button
              id="btn-print-report"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition cursor-pointer shadow-sm"
              title="Imprimir Relatório"
            >
              <Printer size={13} />
              Imprimir PDF
            </button>
          </div>
        </div>
      </nav>

      {/* Main Report Container */}
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-14 print:py-0 print:px-0">
        
        <div className="space-y-10">
          
          {/* Document Header */}
          <header className="border-b border-slate-900 pb-6 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 print:border-slate-300">
            <div>
              <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase font-mono block mb-1">
                Demonstrativo Financeiro Gerencial
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50 print:text-black">
                Relatório Executivo de Custos Estimados
              </h1>
              <p className="text-sm text-slate-400 mt-1 font-medium print:text-slate-600">
                Hermes | Junho de 2026
              </p>
            </div>
            <div className="text-left sm:text-right font-mono text-[11px] text-slate-400 print:text-slate-600 leading-relaxed">
              <p>Emissão: 06/07/2026</p>
              <p>Referência: 1 USD = R$ {usdToBrl.toFixed(2)}</p>
            </div>
          </header>

          {/* Section 1: Resumo Executivo */}
          <section id="resumo-executivo" className="space-y-3">
            <h2 className="text-[11px] font-bold tracking-wider uppercase text-slate-400 font-mono flex items-center gap-1.5">
              <FileText size={12} className="text-blue-400 shrink-0" />
              1. Resumo Executivo
            </h2>
            <div className="bg-slate-900/30 border border-slate-900 rounded-lg p-5 leading-relaxed text-sm text-slate-300 space-y-3 print:bg-slate-50 print:border-slate-200 print:text-slate-800">
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300 print:text-slate-700">
                <li>
                  O principal custo diretamente atribuível ao Hermes em junho de 2026 foi <code className="bg-slate-900/80 px-1.5 py-0.5 rounded font-mono text-[11px] text-blue-300 border border-slate-800/80 print:bg-slate-100 print:border-slate-200 print:text-blue-850">Vertex AI</code>.
                </li>
                <li>
                  O custo operacional observado de <code className="bg-slate-900/80 px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800/80 print:bg-slate-100 print:border-slate-200 print:text-slate-850">Cloud Run</code> para o endpoint analisado foi baixo.
                </li>
                <li>
                  <code className="bg-slate-900/80 px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-300 border border-slate-800/80 print:bg-slate-100 print:border-slate-200 print:text-slate-850">Cloud Run Functions</code> apareceu como custo relevante na billing account, mas não foi atribuído automaticamente ao Hermes.
                </li>
                <li>
                  Este relatório apresenta uma visão executiva simplificada, não um fechamento contábil.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Custos Observados */}
          <section id="custos-observados" className="space-y-3">
            <h2 className="text-[11px] font-bold tracking-wider uppercase text-slate-400 font-mono flex items-center gap-1.5">
              <Server size={12} className="text-blue-400 shrink-0" />
              2. Custos Observados
            </h2>
            
            <div className="border border-slate-900 rounded-lg overflow-hidden bg-slate-900/10 print:border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900/40 border-b border-slate-900 font-mono text-slate-400 print:bg-slate-100 print:border-slate-200 print:text-slate-700">
                      <th className="py-2.5 px-4 font-semibold">Serviço GCP</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Valor Período</th>
                      <th className="py-2.5 px-4 font-semibold">Classificação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 print:divide-slate-200 text-slate-300 print:text-slate-800">
                    <tr className="hover:bg-slate-900/20">
                      <td className="py-2.5 px-4 font-semibold text-slate-200 print:text-slate-900">Vertex AI</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-blue-400 print:text-blue-700">R$ 41,81</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400 print:text-slate-500">Direto</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20">
                      <td className="py-2.5 px-4 font-medium text-slate-300">Cloud Run</td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-300">R$ 1,05</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400 print:text-slate-500">Compartilhado</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20">
                      <td className="py-2.5 px-4 font-medium text-slate-300">Cloud Build</td>
                      <td className="py-2.5 px-4 text-right font-mono text-slate-300">R$ 0,00</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400 print:text-slate-500">Compartilhado</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20">
                      <td className="py-2.5 px-4 font-medium text-slate-300">Cloud Run Functions</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-400">R$ 101,90</td>
                      <td className="py-2.5 px-4 font-mono text-slate-400 print:text-slate-500">Não atribuído</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20">
                      <td className="py-2.5 px-4 font-medium text-slate-400">Cloud Build (não arredondado)</td>
                      <td className="py-2.5 px-4 text-right font-mono text-[11px] text-slate-400">R$ 0,000315</td>
                      <td className="py-2.5 px-4 font-mono text-slate-500">Residual</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sub-tabela: Detalhe do Endpoint */}
            <div className="bg-slate-900/20 border border-slate-900 rounded-lg p-4 font-mono text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between gap-2 sm:items-center print:bg-slate-50 print:border-slate-200 print:text-slate-700">
              <div>
                <span className="text-slate-500 print:text-slate-400">Endpoint analisado:</span> <strong className="text-slate-300 print:text-slate-900">/webhook</strong>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <span>Requests observados: <strong className="text-blue-400 font-bold print:text-blue-700">182</strong></span>
                <span className="text-slate-600 print:text-slate-300">|</span>
                <span>Custo operacional est. Cloud Run: <strong className="text-slate-200 print:text-slate-900">US$ 0,10</strong></span>
              </div>
            </div>
          </section>

          {/* Section 3: Projeção Executiva */}
          <section id="projecao-executiva" className="space-y-3">
            <h2 className="text-[11px] font-bold tracking-wider uppercase text-slate-400 font-mono flex items-center gap-1.5">
              <TrendingUp size={12} className="text-blue-400 shrink-0" />
              3. Projeção Executiva
            </h2>
            <div className="text-xs text-slate-400 space-y-2 leading-relaxed print:text-slate-600">
              <p>
                A projeção abaixo usa uma aproximação linear simples com base no comportamento observado em junho de 2026.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400 print:text-slate-600">
                <li>Para <strong className="text-slate-300 print:text-slate-800">Cloud Run</strong>, a projeção representa custo operacional por request.</li>
                <li>Para <strong className="text-slate-300 print:text-slate-800">Vertex AI</strong>, a projeção representa uma previsão executiva simplificada, sujeita a variação conforme modelo e consumo de tokens.</li>
              </ul>
            </div>

            <div className="border border-slate-900 rounded-lg overflow-hidden bg-slate-900/10 mt-3 print:border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900/40 border-b border-slate-900 font-mono text-slate-400 print:bg-slate-100 print:border-slate-200 print:text-slate-700">
                      <th className="py-2.5 px-4 font-semibold">Requests/mês</th>
                      <th className="py-2.5 px-4 text-right font-semibold">Cloud Run</th>
                      <th className="py-2.5 px-4 text-right font-semibold">Vertex AI</th>
                      <th className="py-2.5 px-4 text-right font-semibold text-blue-400 print:text-blue-700">Total Estimado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 print:divide-slate-200 text-slate-300 print:text-slate-800 font-mono">
                    <tr className="hover:bg-slate-900/20">
                      <td className="py-2.5 px-4 font-bold text-slate-200 print:text-slate-900">182</td>
                      <td className="py-2.5 px-4 text-right">US$ 0,10</td>
                      <td className="py-2.5 px-4 text-right">R$ 41,81</td>
                      <td className="py-2.5 px-4 text-right font-bold text-blue-400 print:text-blue-700">R$ 42,36</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20">
                      <td className="py-2.5 px-4 font-bold text-slate-200 print:text-slate-900">1.000</td>
                      <td className="py-2.5 px-4 text-right">US$ 0,55</td>
                      <td className="py-2.5 px-4 text-right">R$ 229,73</td>
                      <td className="py-2.5 px-4 text-right font-bold text-blue-400 print:text-blue-700">R$ 232,73</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20 bg-slate-900/10 print:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-slate-200 print:text-slate-900">10.000</td>
                      <td className="py-2.5 px-4 text-right">US$ 5,49</td>
                      <td className="py-2.5 px-4 text-right">R$ 2.297,25</td>
                      <td className="py-2.5 px-4 text-right font-bold text-blue-400 print:text-blue-700">R$ 2.327,17</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20">
                      <td className="py-2.5 px-4 font-bold text-slate-200 print:text-slate-900">100.000</td>
                      <td className="py-2.5 px-4 text-right">US$ 54,91</td>
                      <td className="py-2.5 px-4 text-right">R$ 22.972,53</td>
                      <td className="py-2.5 px-4 text-right font-bold text-blue-400 print:text-blue-700">R$ 23.271,79</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Destaque textual */}
            <div className="bg-blue-950/20 border border-blue-900/50 rounded-lg p-4 text-xs text-blue-200 space-y-1.5 print:bg-slate-50 print:border-slate-200 print:text-slate-800">
              <div className="flex items-center gap-2 font-semibold text-blue-400 print:text-blue-850">
                <Info size={14} className="shrink-0" />
                <span>Análise de Concentração de Gastos</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-slate-300 print:text-slate-700">
                <li>No cenário observado, <strong className="text-blue-200 print:text-blue-900">Vertex AI</strong> tende a concentrar a maior parte do custo do Hermes.</li>
                <li><strong className="text-slate-200 print:text-slate-900">Cloud Run</strong> permanece com peso financeiro pequeno em comparação ao uso do LLM.</li>
              </ul>
            </div>
          </section>

          {/* Section 4: Premissas */}
          <section id="premissas" className="space-y-3">
            <h2 className="text-[11px] font-bold tracking-wider uppercase text-slate-400 font-mono flex items-center gap-1.5">
              <Cpu size={12} className="text-blue-400 shrink-0" />
              4. Premissas
            </h2>
            <div className="bg-slate-900/10 border border-slate-900 rounded-lg p-4 text-xs text-slate-400 print:border-slate-200 print:text-slate-700">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold shrink-0">•</span>
                  <span><strong className="text-slate-300 print:text-slate-900">Vertex AI</strong> foi tratado como custo diretamente atribuível ao Hermes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold shrink-0">•</span>
                  <span><strong className="text-slate-300 print:text-slate-900">Cloud Run</strong> foi projetado a partir do comportamento observado do endpoint <code className="font-mono text-[11px] bg-slate-900 px-1 py-0.5 rounded print:bg-slate-100">/webhook</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold shrink-0">•</span>
                  <span><strong className="text-slate-300 print:text-slate-900">Vertex AI</strong> foi projetado linearmente apenas como previsão executiva simplificada.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold shrink-0">•</span>
                  <span><strong className="text-slate-300 print:text-slate-900">Cloud Run Functions</strong> não foi atribuído automaticamente ao Hermes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold shrink-0">•</span>
                  <span>O relatório não representa custo contábil exato.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Small Footer */}
          <footer className="border-t border-slate-900 pt-6 mt-14 text-center text-[10px] text-slate-500 font-mono space-y-1 print:border-slate-300 print:text-slate-500">
            <p>
              Baseado em billing agregado da conta e dados observados no Cloud Logging
            </p>
            <p>
              Referência: Junho de 2026
            </p>
          </footer>

        </div>

      </main>
    </div>
  );
}
