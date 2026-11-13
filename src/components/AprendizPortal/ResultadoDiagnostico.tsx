import React, { useState } from 'react';
import { Aprendiz, EvaluacionResultado } from '../../types';
import { INSTRUCTOR_DATOS } from '../../data/aprendicesData';
import { PREGUNTAS_DIAGNOSTICAS } from '../../data/preguntasDiagnosticas';
import { descargarInformePDF } from '../../utils/pdfGenerator';
import {
  Award,
  CheckCircle2,
  XCircle,
  FileDown,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Lightbulb,
  Layers,
  ChevronDown,
  ChevronUp,
  Printer,
  RotateCcw,
  UserCheck,
} from 'lucide-react';

interface ResultadoDiagnosticoProps {
  aprendiz: Aprendiz;
  resultado: EvaluacionResultado;
  onContinuarSecuenciaRap01: () => void;
  onPresentarDeNuevo?: () => void;
}

export const ResultadoDiagnostico: React.FC<ResultadoDiagnosticoProps> = ({
  aprendiz,
  resultado,
  onContinuarSecuenciaRap01,
  onPresentarDeNuevo,
}) => {
  const [pestanaActiva, setPestanaActiva] = useState<'resumen' | 'constancia' | 'designThinking' | 'revision'>(
    'resumen'
  );
  const [preguntaExpandida, setPreguntaExpandida] = useState<number | null>(null);

  const esAprobado = resultado.aprobado;

  const togglePregunta = (id: number) => {
    setPreguntaExpandida(preguntaExpandida === id ? null : id);
  };

  const handleDescargarPDF = () => {
    descargarInformePDF(aprendiz, resultado);
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Banner Principal de Resultados */}
      <div
        className={`rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden transition-all ${
          esAprobado
            ? 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-[#257300]'
            : 'bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900'
        }`}
      >
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-semibold tracking-wide border border-white/20">
                Resultado de Aprendizaje 01 • Razonamiento Cuantitativo
              </span>
              <span className="text-xs text-white/80 hidden sm:inline">
                Código: 240201528-01
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
              <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Aprendiz: <strong>{aprendiz.nombres} {aprendiz.apellidos}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Calificación y Porcentaje */}
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 border border-white/30">
                {esAprobado ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Actividad Diagnóstica Aprobada (≥ 70%)</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 text-amber-300" />
                    <span>Nivel Preliminar: En Refuerzo Inicial (&lt; 70%)</span>
                  </>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {esAprobado ? '¡Felicitaciones! Has superado la prueba' : 'Evaluación Completada con Plan de Apoyo'}
              </h2>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl">
                {esAprobado
                  ? `Has respondido correctamente ${resultado.aciertos} de ${resultado.totalPreguntas} preguntas (${resultado.porcentaje}%), superando el umbral mínimo del 70%. Se ha emitido tu constancia oficial y se habilita la secuencia hacia la Guía de Aprendizaje 01.`
                  : `Obtuviste ${resultado.aciertos} de ${resultado.totalPreguntas} aciertos (${resultado.porcentaje}%). Aunque estás por debajo del 70%, has cumplido el requisito de realizar el diagnóstico para avanzar a la Guía 01 con el Plan de Acción Design Thinking guiado por el instructor Fabio Enrique Moreno.`}
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-300/40 text-xs font-medium text-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>
                  Reporte diagnóstico y actualización grupal enviados automáticamente al instructor{' '}
                  <strong className="text-white">{INSTRUCTOR_DATOS.nombreCompleto}</strong>.
                </span>
              </div>

              {/* Botones de acción principales */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleDescargarPDF}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-gray-900 hover:bg-gray-100 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-[#39A900]" />
                  <span>Descargar Informe y Plan en PDF</span>
                </button>

                {/* BOTÓN CLAVE SOLICITADO: Seguir la secuencia del RAP 01 */}
                <button
                  type="button"
                  onClick={onContinuarSecuenciaRap01}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#39A900] hover:bg-[#2e8500] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer ring-2 ring-white/40 animate-bounce"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Continuar Secuencia RAP 01 (Ver Guía de Aprendizaje)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Score Ring Display */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                Calificación Obtenida
              </span>
              <div className="text-5xl sm:text-6xl font-black tracking-tight text-white my-1 font-mono">
                {resultado.porcentaje}%
              </div>
              <div className="text-xs font-medium text-white/90">
                {resultado.aciertos} de {resultado.totalPreguntas} Aciertos
              </div>
              <div className="mt-3 pt-3 border-t border-white/20 w-full text-[11px] text-white/75 flex justify-between">
                <span>Umbral de aprobación:</span>
                <span className="font-bold text-white">70% (7/10)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pestañas de Navegación del Resultado */}
      <div className="bg-white border border-gray-200 rounded-xl p-1.5 shadow-xs flex flex-wrap gap-1">
        <button
          onClick={() => setPestanaActiva('resumen')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            pestanaActiva === 'resumen'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Resumen y Desglose</span>
        </button>

        <button
          onClick={() => setPestanaActiva('constancia')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            pestanaActiva === 'constancia'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Constancia Institucional</span>
        </button>

        <button
          onClick={() => setPestanaActiva('designThinking')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            pestanaActiva === 'designThinking'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Plan Design Thinking (5 Fases)</span>
        </button>

        <button
          onClick={() => setPestanaActiva('revision')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            pestanaActiva === 'revision'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Revisión de Preguntas ({resultado.aciertos}/10)</span>
        </button>
      </div>

      {/* CONTENIDO PESTAÑA: Resumen y Desglose */}
      {pestanaActiva === 'resumen' && (
        <div className="space-y-6">
          {/* SEMAFORIZACIÓN DIAGNÓSTICA */}
          <div
            className={`rounded-2xl p-6 border-2 shadow-xs ${
              resultado.semaforo === 'verde'
                ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
                : resultado.semaforo === 'amarillo'
                ? 'bg-amber-50/80 border-amber-400 text-amber-950'
                : 'bg-red-50/80 border-red-400 text-red-950'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-xs ${
                    resultado.semaforo === 'verde'
                      ? 'bg-emerald-600'
                      : resultado.semaforo === 'amarillo'
                      ? 'bg-amber-600'
                      : 'bg-red-600'
                  }`}
                >
                  {resultado.semaforo === 'verde' ? '🟢' : resultado.semaforo === 'amarillo' ? '🟡' : '🔴'}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block opacity-80">
                    Semaforización Diagnóstica Institucional
                  </span>
                  <h3 className="text-lg font-extrabold">
                    {resultado.semaforo === 'verde'
                      ? 'Nivel Óptimo y Consolidado (Semáforo Verde)'
                      : resultado.semaforo === 'amarillo'
                      ? 'Nivel En Progreso / Atención Moderada (Semáforo Amarillo)'
                      : 'Nivel En Refuerzo Inicial / Alerta (Semáforo Rojo)'}
                  </h3>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                  resultado.semaforo === 'verde'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : resultado.semaforo === 'amarillo'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-red-100 text-red-900 border-red-300'
                }`}
              >
                {resultado.porcentaje}% ({resultado.aciertos}/10)
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed mt-2 opacity-95">
              {resultado.semaforo === 'verde'
                ? 'El aprendiz demuestra excelentes competencias cuantitativas y se encuentra plenamente preparado para liderar los procesos analíticos y de soporte administrativo en la empresa AndeTech S.A.S.'
                : resultado.semaforo === 'amarillo'
                ? 'El aprendiz muestra bases aceptables pero requiere afianzar ciertos conceptos operativos (costos o nómina). El plan Design Thinking le proporcionará el soporte necesario.'
                : 'El aprendiz presenta brechas cuantitativas significativas que exigen un plan de mejoramiento guiado y tutoría personalizada con el instructor Fabio Enrique Moreno.'}
            </p>
          </div>

          {/* ESTRATEGIAS PEDAGÓGICAS SEGÚN ESTILO DE APRENDIZAJE */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                🧠
              </div>
              <div>
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                  Perfil Cognitivo Identificado
                </span>
                <h3 className="text-base font-bold text-gray-900">
                  {resultado.estiloAprendizaje.nombre}
                </h3>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
              {resultado.estiloAprendizaje.descripcion}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-800 block">
                Estrategias Pedagógicas Recomendadas para tu Estilo:
              </span>
              {resultado.estiloAprendizaje.estrategias.map((est, idx) => (
                <div key={idx} className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs text-indigo-950 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{est}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FORTALECIMIENTO PERSONAL */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                🌱
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Crecimiento Profesional y Humano
                </span>
                <h3 className="text-base font-bold text-gray-900">
                  Recomendaciones para tu Fortalecimiento Personal
                </h3>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-4">
              Directrices actitudinales y de gestión personal para tu desempeño como Asistente Administrativo:
            </p>

            <div className="space-y-2.5">
              {resultado.fortalecimientoPersonal.map((fort, idx) => (
                <div key={idx} className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[#39A900] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{fort}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desglose por áreas evaluadas */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#39A900]" />
              Desempeño por Áreas de Razonamiento Cuantitativo
            </h3>

            <div className="space-y-3">
              {resultado.desgloseCategorias.map((cat, idx) => (
                <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-gray-800">{cat.categoria}</span>
                    <span className="font-mono text-gray-900">
                      {cat.aciertos} de {cat.total} aciertos ({cat.porcentaje}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        cat.porcentaje >= 70 ? 'bg-[#39A900]' : 'bg-amber-500'
                      }`}
                      style={{ width: `${cat.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendaciones de mejora para TODOS los aprendices */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Recomendaciones Formativas de Mejora (Técnicas)
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Emitidas automáticamente según tus respuestas para afianzar el desempeño en el programa Asistencia Administrativa:
            </p>

            <div className="space-y-2.5">
              {resultado.recomendacionesMejora.map((rec, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA: Constancia Institucional */}
      {pestanaActiva === 'constancia' && (
        <div className="bg-white border-2 border-emerald-600/30 rounded-2xl p-6 sm:p-8 shadow-md space-y-6 printable-certificate">
          {/* Header institucional */}
          <div className="border-b-2 border-emerald-700 pb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#39A900] text-white flex items-center justify-center font-black text-xl">
                SENA
              </div>
              <div>
                <h4 className="text-base font-extrabold text-gray-900 tracking-tight">
                  SERVICIO NACIONAL DE APRENDIZAJE - SENA
                </h4>
                <p className="text-xs text-emerald-800 font-semibold">
                  Regional Distrito Capital • Centro de Gestión Administrativa
                </p>
                <p className="text-[11px] text-gray-500">
                  Ficha de Caracterización No. 2874102 • Asistencia Administrativa V3
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-400 block uppercase">Código de Verificación:</span>
              <span className="text-xs font-mono font-bold text-gray-800 bg-gray-100 px-2 py-1 rounded border border-gray-300">
                {resultado.codigoVerificacion}
              </span>
            </div>
          </div>

          {/* Cuerpo de la constancia */}
          <div className="text-center py-4 space-y-4">
            <span className="inline-block text-xs font-bold tracking-widest text-[#39A900] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Constancia Oficial de Realización Diagnóstica
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-gray-900">
              HACE CONSTAR QUE:
            </h3>

            <p className="text-lg sm:text-xl font-bold text-[#257300] font-serif">
              {aprendiz.nombres.toUpperCase()} {aprendiz.apellidos.toUpperCase()}
            </p>

            <p className="text-xs text-gray-600">
              Identificado(a) con <strong>{aprendiz.tipoDocumento} No. {aprendiz.numeroDocumento}</strong>
            </p>

            <div className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-700 leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-5 text-justify">
              Presentó la <strong>Evaluación Diagnóstica Preliminar</strong> del Resultado de Aprendizaje{' '}
              <em>01: Identificar situaciones problemáticas asociadas a sus necesidades de contexto aplicando procedimientos matemáticos</em>, perteneciente a la competencia transversal de <strong>Razonamiento Cuantitativo - Matemáticas</strong>, fundamentada en el estudio de caso empresarial de la unidad productiva <strong>AndeTech S.A.S.</strong>, obteniendo una calificación del <strong>{resultado.porcentaje}% ({resultado.aciertos}/10 aciertos)</strong>.
              {esAprobado ? (
                <span className="block mt-2 font-bold text-emerald-800">
                  ✔ Estado: APROBADO (Cumple con el criterio mínimo institucional del 70%). Se autoriza el avance formal en la secuencia pedagógica hacia la Guía de Aprendizaje No. 01.
                </span>
              ) : (
                <span className="block mt-2 font-bold text-amber-800">
                  ⚠ Estado: EN REFUERZO INICIAL. Ha cumplido con la realización de la prueba diagnóstica y se le asigna el Plan de Acción Design Thinking para superar las brechas identificadas durante el desarrollo de la Guía 01.
                </span>
              )}
            </div>
          </div>

          {/* Firmas institucionales */}
          <div className="pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-1">
              <div className="w-48 mx-auto border-b border-gray-400 pb-1 font-signature text-emerald-800 italic">
                Fabio Enrique Moreno
              </div>
              <p className="font-bold text-gray-900">{INSTRUCTOR_DATOS.nombreCompleto}</p>
              <p className="text-[11px] text-gray-500">{INSTRUCTOR_DATOS.cargo}</p>
              <p className="text-[10px] text-gray-400 font-mono">fabio.moreno@sena.edu.co</p>
            </div>

            <div className="space-y-1">
              <div className="w-48 mx-auto border-b border-gray-400 pb-1 font-signature text-gray-600 italic">
                Firma Digital del Aprendiz
              </div>
              <p className="font-bold text-gray-900">{aprendiz.nombres} {aprendiz.apellidos}</p>
              <p className="text-[11px] text-gray-500">Aprendiz en Formación - Asistencia Administrativa V3</p>
              <p className="text-[10px] text-gray-400">Fecha: {resultado.fecha}</p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleDescargarPDF}
              className="px-4 py-2 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar Constancia en PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA: Plan Design Thinking */}
      {pestanaActiva === 'designThinking' && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Plan de Acción Metodológico con Design Thinking
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Estrategia didáctica activa para cerrar brechas cuantitativas en el marco del programa Asistencia Administrativa
                </p>
              </div>

              <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-full">
                Nivel Asignado: {resultado.planDesignThinking.nivelAlcanzado}
              </span>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-gray-700 leading-relaxed mb-6">
              <strong>Diagnóstico Técnico: </strong>
              {resultado.planDesignThinking.diagnosticoGeneral}
            </div>

            {/* Las 5 fases del Design Thinking */}
            <div className="space-y-4">
              {resultado.planDesignThinking.fases.map((fase, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-gray-100 hover:border-emerald-200 rounded-xl p-5 shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{fase.fase}</h4>
                      <p className="text-xs text-emerald-800 font-medium">{fase.objetivo}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-3 border-t border-gray-100">
                    <div>
                      <span className="font-semibold text-gray-800 block mb-1">Acciones sugeridas:</span>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {fase.accionesSugeridas.map((acc, aIdx) => (
                          <li key={aIdx}>{acc}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold text-gray-800 block">Herramientas pedagógicas:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {fase.herramientas.map((h, hIdx) => (
                            <span
                              key={hIdx}
                              className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[11px] font-medium"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100 text-[11px] text-emerald-950">
                        <strong className="text-emerald-800">Evidencia esperada:</strong> {fase.evidenciaEsperada}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Compromisos y Tutoría */}
            <div className="mt-6 pt-5 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <h5 className="font-bold text-emerald-900 mb-2">Compromisos del Aprendiz:</h5>
                <ul className="list-disc list-inside space-y-1 text-emerald-800">
                  {resultado.planDesignThinking.compromisosAprendiz.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h5 className="font-bold text-gray-900 mb-2">Acompañamiento del Instructor Fabio Enrique Moreno:</h5>
                <p className="text-gray-700 leading-relaxed">
                  {resultado.planDesignThinking.acompanamientoInstructor}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PESTAÑA: Revisión de Preguntas */}
      {pestanaActiva === 'revision' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Revisión Pedagógica y Procedimientos Paso a Paso
            </h3>
            <span className="text-xs text-gray-500">
              Haz clic en cada caso para ver la solución y justificación técnica
            </span>
          </div>

          <div className="space-y-3">
            {PREGUNTAS_DIAGNOSTICAS.map((p) => {
              const eleccionAprendiz = resultado.respuestas[p.id];
              const esCorrecta = eleccionAprendiz !== undefined && p.opciones[eleccionAprendiz]?.esCorrecta;
              const expandida = preguntaExpandida === p.id;

              return (
                <div
                  key={p.id}
                  className={`border rounded-xl transition-all overflow-hidden ${
                    esCorrecta ? 'border-emerald-200 bg-white' : 'border-red-200 bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => togglePregunta(p.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-gray-50/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {esCorrecta ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                      <div>
                        <span className="text-xs font-bold text-gray-900">
                          Pregunta {p.id}: {p.titulo}
                        </span>
                        <span className="text-[11px] text-gray-500 block">
                          Categoría: {p.categoria}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          esCorrecta
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {esCorrecta ? 'Correcta (+1.0)' : 'Incorrecta (0.0)'}
                      </span>
                      {expandida ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {expandida && (
                    <div className="p-4 pt-0 border-t border-gray-100 text-xs text-gray-700 space-y-3 bg-gray-50/50">
                      <p className="font-semibold text-gray-900 pt-3">{p.enunciado}</p>

                      <div className="space-y-1.5">
                        <span className="font-semibold text-gray-800 block">Opciones:</span>
                        {p.opciones.map((opc) => {
                          const seleccionadaPorAprendiz = eleccionAprendiz === opc.id;
                          return (
                            <div
                              key={opc.id}
                              className={`p-2.5 rounded-lg border text-xs flex items-start justify-between gap-2 ${
                                opc.esCorrecta
                                  ? 'bg-emerald-100/60 border-emerald-300 text-emerald-950 font-semibold'
                                  : seleccionadaPorAprendiz
                                  ? 'bg-red-100/60 border-red-300 text-red-950'
                                  : 'bg-white border-gray-200 text-gray-600'
                              }`}
                            >
                              <span>{opc.texto}</span>
                              <div className="shrink-0 flex items-center gap-1 text-[10px]">
                                {seleccionadaPorAprendiz && (
                                  <span className="bg-slate-800 text-white px-1.5 py-0.2 rounded font-medium">
                                    Tu respuesta
                                  </span>
                                )}
                                {opc.esCorrecta && (
                                  <span className="bg-emerald-700 text-white px-1.5 py-0.2 rounded font-medium">
                                    Respuesta correcta
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Procedimiento paso a paso */}
                      <div className="p-3 bg-white border border-gray-200 rounded-lg space-y-1">
                        <span className="font-bold text-gray-900 block text-xs">
                          Procedimiento de Solución Paso a Paso:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-gray-600 text-[11px]">
                          {p.procedimientoPasoAPaso.map((paso, pIdx) => (
                            <li key={pIdx}>{paso}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Banner de Avance a la Guía 01 */}
      <div className="bg-emerald-50 border-2 border-[#39A900] rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#39A900] text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900">
              Secuencia Formativa Desbloqueada: Guía de Aprendizaje 01
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Has cumplido el prerrequisito obligatorio. Ya puedes acceder a la Planeación Pedagógica, Proyecto Formativo, Plan de Sesión y Entregables.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onContinuarSecuenciaRap01}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
        >
          <span>Abrir Guía de Aprendizaje 01 (RAP 01)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
