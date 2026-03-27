import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateLinearCongruential, generateMultiplicativeCongruential, generateMiddleSquare, calculateStats } from '../utils/generators';
import { chiSquareTest, kolmogorovSmirnovTest, pokerTest } from '../utils/tests';

export default function CompareModal({ isOpen, onClose, params }) {
  const compareData = useMemo(() => {
    if (!isOpen) return null;
    
    // Generar simulaciones para los 3 modelos con los parámetros actuales
    const lcg = generateLinearCongruential(params.x0, params.a, params.c, params.m, params.n);
    const mcg = generateMultiplicativeCongruential(params.x0, params.a, params.m, params.n);
    const ms = generateMiddleSquare(params.x0, params.d, params.n);

    const lcgRi = lcg.data.map(d => d.ri);
    const mcgRi = mcg.data.map(d => d.ri);
    const msRi = ms.data.map(d => d.ri);

    // Combinar datos para la gráfica de Recharts
    const chartData = [];
    for (let i = 0; i < params.n; i++) {
      chartData.push({
        iteration: i + 1,
        LCG: lcgRi[i],
        MCG: mcgRi[i],
        MS: msRi[i]
      });
    }

    const getTests = (arr) => ({
      chiSquare: chiSquareTest(arr).passed,
      ks: kolmogorovSmirnovTest(arr).passed,
      poker: pokerTest(arr).passed
    });

    return {
      lcg: { period: lcg.period, isComplete: lcg.isComplete, stats: calculateStats(lcgRi), tests: getTests(lcgRi) },
      mcg: { period: mcg.period, isComplete: mcg.isComplete, stats: calculateStats(mcgRi), tests: getTests(mcgRi) },
      ms: { period: ms.period, isComplete: ms.isComplete, stats: calculateStats(msRi), tests: getTests(msRi) },
      chartData
    };
  }, [isOpen, params]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-slate-900 border border-slate-700 w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
        >
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h2 className="text-2xl font-bold text-indigo-300 flex items-center gap-3">
              <BarChart3 className="w-7 h-7" /> Análisis Comparativo de Modelos
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-8">
            
            <p className="text-slate-400 text-sm">
              Esta ventana evalúa los tres modelos generadores principales simultáneamente basándose en la configuración base actual de <strong>{params.n} iteraciones</strong>. 
              Si quieres cambiar el módulo, la semilla o las iteraciones, debes hacerlo en el panel de configuración y volver a abrir esta comparación.
            </p>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 h-96 shadow-inner relative">
              <h3 className="absolute top-4 left-6 text-sm font-bold text-slate-300 z-10">Trayectoria Estocástica (Comparativa Ri)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={compareData.chartData} margin={{ top: 40, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="iteration" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={[0, 1]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="LCG" stroke="#818cf8" strokeWidth={2} dot={false} activeDot={{ r: 6 }} name="Congruencial Lineal" />
                  <Line type="monotone" dataKey="MCG" stroke="#c084fc" strokeWidth={2} dot={false} activeDot={{ r: 6 }} name="C. Multiplicativo" />
                  <Line type="monotone" dataKey="MS" stroke="#2dd4bf" strokeWidth={2} dot={false} activeDot={{ r: 6 }} name="Cuadrados Medios" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LCG Stats */}
              <ModelStatCard title="Congruencial Lineal" color="text-indigo-400" bg="bg-indigo-500/10" border="border-indigo-500/30" data={compareData.lcg} />
              {/* MCG Stats */}
              <ModelStatCard title="C. Multiplicativo" color="text-purple-400" bg="bg-purple-500/10" border="border-purple-500/30" data={compareData.mcg} />
              {/* MS Stats */}
              <ModelStatCard title="Cuadrados Medios" color="text-teal-400" bg="bg-teal-500/10" border="border-teal-500/30" data={compareData.ms} />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ModelStatCard({ title, color, bg, border, data }) {
  return (
    <div className={`rounded-2xl border p-5 ${bg} ${border}`}>
      <h3 className={`text-lg font-bold mb-4 ${color}`}>{title}</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center border-b border-slate-700/50 pb-2 hover:bg-slate-800/30 p-1 rounded transition-colors">
          <span className="text-slate-400">Periodo de Vida</span>
          <span className="font-bold text-slate-200">{data.period} iteraciones</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-700/50 pb-2 hover:bg-slate-800/30 p-1 rounded transition-colors">
          <span className="text-slate-400">Estado del Ciclo</span>
          <span className={`font-semibold ${data.isComplete ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]' : 'text-amber-400'}`}>
            {data.isComplete ? 'Completo' : 'Incompleto'}
          </span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-700/50 pb-2 hover:bg-slate-800/30 p-1 rounded transition-colors">
          <span className="text-slate-400">Media Promedio (μ)</span>
          <span className="font-mono text-slate-200">{data.stats.mean.toFixed(6)}</span>
        </div>
        <div className="flex justify-between items-center hover:bg-slate-800/30 p-1 rounded transition-colors">
          <span className="text-slate-400">Varianza (σ²)</span>
          <span className="font-mono text-slate-200">{data.stats.variance.toFixed(6)}</span>
        </div>
        
        <div className="pt-2 mt-2 border-t border-slate-700/50 space-y-2">
          <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-2 block">Pruebas (Rechaza H₀)</span>
          <div className="flex justify-between items-center text-xs hover:bg-slate-800/30 p-1 rounded transition-colors">
            <span className="text-slate-400">Chi-Cuadrado:</span>
            {data.tests.chiSquare ? <span className="text-emerald-400 font-bold flex items-center gap-1">Cumple ✔️</span> : <span className="text-rose-400 font-bold flex items-center gap-1">Falla ❌</span>}
          </div>
          <div className="flex justify-between items-center text-xs hover:bg-slate-800/30 p-1 rounded transition-colors">
            <span className="text-slate-400">Kolmogorov-S:</span>
            {data.tests.ks ? <span className="text-emerald-400 font-bold flex items-center gap-1">Cumple ✔️</span> : <span className="text-rose-400 font-bold flex items-center gap-1">Falla ❌</span>}
          </div>
          <div className="flex justify-between items-center text-xs hover:bg-slate-800/30 p-1 rounded transition-colors">
            <span className="text-slate-400">Póker:</span>
            {data.tests.poker ? <span className="text-emerald-400 font-bold flex items-center gap-1">Cumple ✔️</span> : <span className="text-rose-400 font-bold flex items-center gap-1">Falla ❌</span>}
          </div>
        </div>
      </div>
    </div>
  );
}