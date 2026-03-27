import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, Play, Dices, Info, HelpCircle, Spade, Heart, Club, Diamond, ChevronDown } from 'lucide-react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import DataTable from './components/DataTable';
import StatsDisplay from './components/StatsDisplay';
import ChartDisplay from './components/ChartDisplay';
import TestResults from './components/TestResults';
import WelcomeScreen from './components/WelcomeScreen';
import TransitionScreen from './components/TransitionScreen';
import InfoModal from './components/InfoModal';
import { generateLinearCongruential, generateMultiplicativeCongruential, generateMiddleSquare, calculateStats } from './utils/generators';
import { chiSquareTest, kolmogorovSmirnovTest, pokerTest } from './utils/tests';

function App() {
  const [appState, setAppState] = useState('welcome'); // welcome, transition, generator
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [method, setMethod] = useState('LCG');
  const [params, setParams] = useState({ x0: 554, a: 5, c: 7, m: 16, d: 4, n: 100 });
  const [results, setResults] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleInputChange = (e) => setParams({ ...params, [e.target.name]: Number(e.target.value) });

  const startApp = () => {
    setAppState('transition');
    setTimeout(() => {
      setAppState('generator');
    }, 1800); // Wait for transition animation
  };

  const generate = () => {
    setIsGenerating(true);
    setResults(null);

    // Simulamos un tiempo de carga para el efecto visual llamativo
    setTimeout(() => {
      let genData = {};
      if (method === 'LCG') genData = generateLinearCongruential(params.x0, params.a, params.c, params.m, params.n);
      else if (method === 'MCG') genData = generateMultiplicativeCongruential(params.x0, params.a, params.m, params.n);
      else if (method === 'MS') genData = generateMiddleSquare(params.x0, params.d, params.n);
      
      const riArray = genData.data.map(d => d.ri);
      const xiArray = genData.data.map(d => d.xi);
      
      const statsRi = calculateStats(riArray);
      const statsXi = calculateStats(xiArray);
      
      const tests = { chiSquare: chiSquareTest(riArray), ks: kolmogorovSmirnovTest(riArray), poker: pokerTest(riArray) };
      
      setResults({ ...genData, statsRi, statsXi, tests, method });
      setIsGenerating(false);
    }, 1200);
  };

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      nextBtnText: 'Siguiente',
      prevBtnText: 'Atrás',
      doneBtnText: 'Terminar',
      progressText: 'Paso {{current}} de {{total}}',
      popoverClass: 'driverjs-theme', // We can style it in CSS if we want, or rely on default
      steps: [
        {
          element: '.tour-config',
          popover: { title: 'Configuración', description: 'Aquí puedes configurar el generador.', side: 'right', align: 'start' }
        },
        {
          element: '.tour-guide',
          popover: { title: 'Guía de Parámetros', description: 'Haciendo clic aquí puedes ver recomendaciones matemáticas (semillas, multiplicadores) probadas para tener mejores resultados en tus distribuciones.', side: 'right', align: 'start' }
        },
        {
          element: '.tour-method',
          popover: { title: 'Método de Generación', description: 'Selecciona el método matemático que deseas utilizar (Congruencial Lineal, Multiplicativo o Cuadrados Medios).', side: 'right', align: 'start' }
        },
        {
          element: '.tour-params',
          popover: { title: 'Parámetros', description: 'Ingresa los parámetros necesarios. Estos cambiarán automáticamente según el método que selecciones.', side: 'right', align: 'start' }
        },
        {
          element: '.tour-generate',
          popover: { title: 'Generar', description: '¡Haz clic aquí para generar los números! La aplicación aplicará el método y realizará todas las pruebas estadísticas.', side: 'right', align: 'start' }
        },
        {
          element: '.tour-results',
          popover: { title: 'Resultados', description: 'Una vez generados, aquí aparecerán todos los resultados: medias, varianzas, gráficas de dispersión y las pruebas Chi-Cuadrado, K-S y Poker.', side: 'left', align: 'start' }
        },
        {
          element: '.tour-info',
          popover: { title: 'Acerca de', description: 'Si quieres saber quiénes desarrollaron esta aplicación o quieres ver detalles de la materia, haz clic aquí en el botón de Acerca de.', side: 'bottom', align: 'start' }
        },
        {
          element: '.tour-help',
          popover: { title: 'Repetir Tour', description: 'Siempre que necesites volver a ver este recorrido, puedes presionar este botón.', side: 'bottom', align: 'end' }
        }
      ]
    });
    driverObj.drive();
  };

  if (appState === 'welcome') return <WelcomeScreen onStart={startApp} />;
  if (appState === 'transition') return <TransitionScreen />;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">


      <header className="bg-slate-800/50 border-b border-slate-700 p-6 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center justify-center">
              <Settings2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-linear-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-md">
                Laboratorio de Simulación RNG
              </h1>
              <p className="text-sm text-slate-400 font-medium">Números Pseudoaleatorios y Pruebas</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!results && !isGenerating && (
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  setTimeout(startTour, 100);
                }}
                className="tour-help p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-indigo-500 rounded-xl transition-all text-indigo-400 flex items-center justify-center gap-2 font-medium shadow-lg"
                title="Iniciar Tour Guiado"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={() => setShowInfoModal(true)}
              className="tour-info p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-indigo-500 rounded-xl transition-all text-slate-300 hover:text-indigo-400 flex items-center gap-2 font-medium shadow-lg"
            >
              <Info className="w-5 h-5" />
              <span className="hidden md:inline">Acerca de</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 grid grid-cols-1 xl:grid-cols-12 gap-8 mt-6 relative">
        <div className="tour-config xl:col-span-3 space-y-6">
          
          <div className="tour-guide bg-slate-800 border border-indigo-500/30 rounded-2xl shadow-lg relative overflow-hidden transition-all">
            <button 
              onClick={() => setShowGuide(!showGuide)}
              className="w-full p-4 flex items-center justify-between text-sm font-bold text-indigo-300 hover:bg-slate-750 transition-colors focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-400" /> 
                Guía de Parámetros
              </div>
              <ChevronDown className={`w-5 h-5 text-indigo-400 transition-transform duration-300 ${showGuide ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showGuide && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-5 pt-0 text-xs text-indigo-100/70 space-y-3 leading-relaxed border-t border-slate-700/50 mt-1">
                    <p>
                      <strong className="text-indigo-200">Congruencial Lineal:</strong><br/>
                      • <span className="text-indigo-100 font-medium">m (módulo):</span> Valor grande (ej. 2^32 o 100).<br/>
                      • <span className="text-indigo-100 font-medium">c (incremento):</span> Impar si <i>m</i> es potencia de 2.<br/>
                      • <span className="text-indigo-100 font-medium">a (multiplicador):</span> <i>a-1</i> múltiplo de los factores primos de <i>m</i>.<br/>
                      <span className="text-emerald-400 font-medium mt-1 inline-block">💡 Semilla y Parámetros Ideales:</span> X₀=15, a=17, c=43, m=100
                    </p>
                    <p>
                      <strong className="text-indigo-200">Congruencial Multiplicativo:</strong><br/>
                      • <span className="text-indigo-100 font-medium">X₀ (semilla):</span> Impar y no divisible por 2 o 5 si <i>m=10^k</i>.<br/>
                      • <span className="text-indigo-100 font-medium">a:</span> <i>8t ± 3</i> (para m=2^k) o <i>200t ± p</i> (para m=10^k).<br/>
                      <span className="text-emerald-400 font-medium mt-1 inline-block">💡 Semilla y Parámetros Ideales:</span> X₀=17, a=211, m=1000
                    </p>
                    <p>
                      <strong className="text-indigo-200">Cuadrados Medios:</strong><br/>
                      • <span className="text-indigo-100 font-medium">X₀ (semilla):</span> Exactamente <i>D</i> dígitos.<br/>
                      • ⚠️ Evita semillas con ceros al final para no colapsar rápidamente a 0.<br/>
                      <span className="text-emerald-400 font-medium mt-1 inline-block">💡 Semillas Ideales (D=4):</span> 5772, 7182 o 9143
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 text-indigo-300">
              <Settings2 className="w-5 h-5" /> Configuración
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Método</label>
                <select
                  className="tour-method w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  value={method} onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="LCG">Congruencial Lineal</option>
                  <option value="MCG">Congruencial Multiplicativo</option>
                  <option value="MS">Cuadrados Medios</option>
                </select>
              </div>

              <div className="tour-params grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">X₀ (Semilla)</label>
                  <input type="number" name="x0" value={params.x0} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Cantidad (N)</label>
                  <input type="number" name="n" value={params.n} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
                
                {(method === 'LCG' || method === 'MCG') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">a (Multiplic.)</label>
                      <input type="number" name="a" value={params.a} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">m (Módulo)</label>
                      <input type="number" name="m" value={params.m} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                  </>
                )}
                
                {method === 'LCG' && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">c (Incremento)</label>
                    <input type="number" name="c" value={params.c} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"/>
                  </div>
                )}

                {method === 'MS' && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-1">D (Dígitos)</label>
                    <input type="number" name="d" value={params.d} onChange={handleInputChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"/>
                  </div>
                )}
              </div>

              <button
                onClick={generate}
                disabled={isGenerating}
                className="tour-generate w-full mt-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-500/25"
              >
                {isGenerating ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                    <Dices className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Play className="w-5 h-5 fill-current" />
                )}
                {isGenerating ? 'Generando...' : 'Generar Números'}
              </button>
            </div>
          </div>
        </div>

        <div className="tour-results xl:col-span-9 space-y-6">
          {isGenerating ? (
            <div className="h-full min-h-100 flex flex-col items-center justify-center text-indigo-400 border-2 border-slate-800 border-dashed rounded-2xl relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-linear-to-t from-indigo-900/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="flex gap-4 mb-8 z-10">
                {[Spade, Heart, Club, Diamond].map((Icon, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ 
                      rotateY: [0, 180, 360],
                      y: [0, -20, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5, 
                      delay: idx * 0.2,
                      ease: 'easeInOut'
                    }}
                    className={`w-16 h-20 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] ${
                      idx % 2 !== 0 ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30' : 'bg-slate-800 text-slate-300 border border-slate-600'
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                ))}
              </div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-2xl font-bold tracking-[0.2em] z-10 text-indigo-300 drop-shadow-md"
              >
                GENERANDO NÚMEROS...
              </motion.p>
            </div>
          ) : !results ? (
            <div className="h-full min-h-100 flex flex-col items-center justify-center text-slate-500 border-2 border-slate-800 border-dashed rounded-2xl">
              <div className="relative mb-6">
                <Dices className="w-20 h-20 opacity-20" />
                <motion.div
                  className="absolute -bottom-2 -right-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                >
                  <Spade className="w-10 h-10 text-indigo-500/40" />
                </motion.div>
              </div>
              <p className="text-xl font-medium">Configura los parámetros y presiona Generar</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <StatsDisplay statsRi={results.statsRi} statsXi={results.statsXi} period={results.period} n={params.n} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DataTable data={results.data} method={results.method} />
                <ChartDisplay data={results.data} />
              </div>

              <TestResults tests={results.tests} />
            </motion.div>
          )}
        </div>
      </main>

      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
    </div>
  );
}

export default App;
