import React, { useState } from 'react';
import { Aprendiz, EvaluacionResultado } from '../../types';
import { ESTUDIO_CASO_GENERAL, PREGUNTAS_DIAGNOSTICAS } from '../../data/preguntasDiagnosticas';
import { generarResultadoDiagnostico } from '../../utils/designThinkingPlan';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  Calculator,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Building2,
  FileText,
  Clock,
  Sparkles,
  Info,
  Send,
  RotateCcw,
} from 'lucide-react';

interface CuestionarioDiagnosticoProps {
  aprendiz: Aprendiz;
  onFinalizar: (resultado: EvaluacionResultado, aprendizActualizado: Aprendiz) => void;
  onAbrirPerfil: () => void;
}

export const CuestionarioDiagnostico: React.FC<CuestionarioDiagnosticoProps> = ({
  aprendiz,
  onFinalizar,
  onAbrirPerfil,
}) => {
  const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<number, number>>(
    aprendiz.respuestasAprendiz || {}
  );
  const [mostrarCalculadora, setMostrarCalculadora] = useState(false);
  const [blocNotas, setBlocNotas] = useState('');
  const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);

  const pregunta = PREGUNTAS_DIAGNOSTICAS[preguntaActualIndex];
  const totalPreguntas = PREGUNTAS_DIAGNOSTICAS.length;
  const respondidasCount = Object.keys(respuestas).length;
  const progresoPorcentaje = Math.round((respondidasCount / totalPreguntas) * 100);

  const handleSeleccionarOpcion = (opcionId: number) => {
    setRespuestas((prev) => ({
      ...prev,
      [pregunta.id]: opcionId,
    }));
  };

  const handleConfirmarEnvio = () => {
    setMostrarModalConfirmacion(false);

    // Calcular resultado
    const resultado = generarResultadoDiagnostico(aprendiz.id, respuestas);

    // Actualizar aprendiz
    const aprendizActualizado: Aprendiz = {
      ...aprendiz,
      haRealizadoDiagnostico: true,
      puntajeDiagnostico: resultado.aciertos,
      porcentajeDiagnostico: resultado.porcentaje,
      aprobado: resultado.aprobado,
      fechaRealizacion: resultado.fecha,
      respuestasAprendiz: respuestas,
      intentos: (aprendiz.intentos || 0) + 1,
    };

    if (resultado.aprobado) {
      // Confetti celebration for SENA achievement
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#39A900', '#257300', '#00324d', '#f97316'],
        });
      } catch (e) {
        // Safe fallback
      }
    }

    onFinalizar(resultado, aprendizActualizado);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Banner de Identificación y Contexto del Caso */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-2xl text-white p-5 sm:p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-emerald-300 text-xs font-semibold tracking-wide">
                Evaluación Diagnóstica Preliminar (Umbral: 70%)
              </span>
              <span className="text-xs text-emerald-200">
                10 Preguntas Cuantitativas
              </span>
            </div>

            <button
              onClick={onAbrirPerfil}
              className="text-xs text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Aprendiz: <strong>{aprendiz.nombres} {aprendiz.apellidos}</strong></span>
              <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.2 rounded font-mono">
                {aprendiz.numeroDocumento}
              </span>
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Estudio de Caso: {ESTUDIO_CASO_GENERAL.empresa}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-3xl leading-relaxed">
            {ESTUDIO_CASO_GENERAL.descripcion}
          </p>

          <div className="mt-4 pt-3 border-t border-emerald-700/50 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-emerald-200">
              <span><strong>NIT:</strong> {ESTUDIO_CASO_GENERAL.nit}</span>
              <span className="hidden sm:inline">|</span>
              <span><strong>Supervisor / Instructor:</strong> Fabio Enrique Moreno</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMostrarCalculadora(!mostrarCalculadora)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded-md text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{mostrarCalculadora ? 'Ocultar Bloc de Cálculo' : 'Bloc de Cálculo y Notas'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bloc de cálculo rápido opcional desplegable */}
      {mostrarCalculadora && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-amber-700" />
              Bloc de Cálculos Rápidos del Asistente Administrativo
            </h4>
            <span className="text-[10px] text-amber-700">Espacio de borrador personal para operaciones</span>
          </div>
          <textarea
            rows={3}
            placeholder="Escribe aquí tus operaciones, fórmulas o anotaciones intermedias (ej. $2.500.000 * 0.12 = 300.000...)"
            value={blocNotas}
            onChange={(e) => setBlocNotas(e.target.value)}
            className="w-full text-xs font-mono bg-white border border-amber-300 rounded-lg p-2.5 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-gray-800"
          />
        </div>
      )}

      {/* Barra de progreso y navegador de preguntas */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-700">
              Pregunta {preguntaActualIndex + 1} de {totalPreguntas}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-medium text-emerald-700">
              {respondidasCount} respondidas ({progresoPorcentaje}%)
            </span>
          </div>

          <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Tiempo sugerido: 25 - 30 minutos</span>
          </div>
        </div>

        {/* Barra de progreso visual */}
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[#39A900] transition-all duration-300"
            style={{ width: `${(respondidasCount / totalPreguntas) * 100}%` }}
          />
        </div>

        {/* Botones de navegación directa a preguntas */}
        <div className="flex flex-wrap gap-1.5">
          {PREGUNTAS_DIAGNOSTICAS.map((p, idx) => {
            const contestada = respuestas[p.id] !== undefined;
            const esActual = idx === preguntaActualIndex;
            return (
              <button
                key={p.id}
                onClick={() => setPreguntaActualIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  esActual
                    ? 'ring-2 ring-[#39A900] bg-emerald-700 text-white shadow-xs'
                    : contestada
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={`Pregunta ${idx + 1}: ${p.titulo}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta de la Pregunta Actual */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
        {/* Cabecera de la pregunta */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded text-[11px] font-bold">
                Caso No. {pregunta.id}
              </span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold">
                {pregunta.categoria}
              </span>
              <span className="text-xs text-gray-400">
                Dificultad: <strong className="text-gray-700">{pregunta.dificultad}</strong>
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">
              {pregunta.titulo}
            </h3>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-gray-500 block">RAP 01 - Criterio:</span>
            <span className="text-xs font-medium text-emerald-700 max-w-xs block truncate" title={pregunta.competenciaRelacionada}>
              {pregunta.competenciaRelacionada}
            </span>
          </div>
        </div>

        {/* Contexto del caso específico */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <p className="font-semibold text-gray-900 mb-1 flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-emerald-700" />
            Situación Problema en AndeTech S.A.S.:
          </p>
          <p>{pregunta.contextoCaso}</p>
        </div>

        {/* Datos clave estructurados */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            Variables y Datos Numéricos del Problema:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {pregunta.datosClave.map((dato, i) => (
              <div key={i} className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-2.5 text-xs">
                <span className="text-gray-500 block text-[11px] font-medium">{dato.etiqueta}</span>
                <span className="font-bold text-emerald-950 font-mono text-sm mt-0.5 block">{dato.valor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enunciado de la pregunta */}
        <div className="p-3 bg-emerald-100/50 border-l-4 border-[#39A900] rounded-r-lg">
          <p className="text-sm sm:text-base font-bold text-gray-900">
            {pregunta.enunciado}
          </p>
        </div>

        {/* Opciones de respuesta */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Selecciona la respuesta correcta:
          </label>
          {pregunta.opciones.map((opcion) => {
            const estaSeleccionada = respuestas[pregunta.id] === opcion.id;
            return (
              <button
                key={opcion.id}
                type="button"
                onClick={() => handleSeleccionarOpcion(opcion.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                  estaSeleccionada
                    ? 'border-[#39A900] bg-emerald-50/70 shadow-xs'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/60'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                    estaSeleccionada
                      ? 'border-[#39A900] bg-[#39A900]'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {estaSeleccionada && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>

                <div className="flex-1">
                  <span className={`text-xs sm:text-sm font-semibold ${estaSeleccionada ? 'text-gray-900' : 'text-gray-700'}`}>
                    {opcion.texto}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Botones de navegación inferior */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            disabled={preguntaActualIndex === 0}
            onClick={() => setPreguntaActualIndex((prev) => Math.max(0, prev - 1))}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${
              preguntaActualIndex === 0
                ? 'opacity-40 cursor-not-allowed text-gray-400 border-gray-200'
                : 'text-gray-700 hover:bg-gray-100 border-gray-300 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-2">
            {preguntaActualIndex < totalPreguntas - 1 ? (
              <button
                type="button"
                onClick={() => setPreguntaActualIndex((prev) => Math.min(totalPreguntas - 1, prev + 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Siguiente Pregunta</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMostrarModalConfirmacion(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer animate-pulse"
              >
                <Send className="w-4 h-4" />
                <span>Finalizar y Enviar Evaluación</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Regla institucional de aprobación del 70% */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-950">
        <Info className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Criterio Institucional SENA de Aprobación:</p>
          <p className="mt-0.5 text-emerald-900 leading-relaxed">
            La prueba diagnóstica se aprueba con el <strong>70% de las preguntas correctamente respondidas (7 de 10)</strong>. A los aprendices aprobados se les emitirá la constancia oficial y a todos se les generará el plan de acción con Design Thinking y recomendaciones de mejora. <em>Es requisito indispensable para continuar el proceso formativo y desbloquear la Guía 01.</em>
          </p>
        </div>
      </div>

      {/* Modal de confirmación de envío */}
      {mostrarModalConfirmacion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#39A900] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">
              ¿Deseas enviar tu evaluación diagnóstica?
            </h3>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              Has respondido <strong>{respondidasCount} de {totalPreguntas} preguntas</strong>.
              {respondidasCount < totalPreguntas && (
                <span className="block mt-2 text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 font-medium">
                  Aviso: Tienes {totalPreguntas - respondidasCount} preguntas sin responder. Las preguntas no contestadas contarán como incorrectas.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setMostrarModalConfirmacion(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                Volver y Revisar
              </button>
              <button
                type="button"
                onClick={handleConfirmarEnvio}
                className="px-5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#2d8500] rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Confirmar y Calificar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
