import React, { useState } from 'react';
import { Aprendiz, ActividadGuia } from '../../types';
import {
  PROYECTO_FORMATIVO,
  PLANEACION_PEDAGOGICA,
  GUIA_APRENDIZAJE_INFO,
  ACTIVIDADES_GUIA,
  PLAN_DE_SESION,
  FORMAS_DE_ENTREGA,
  MODO_EVALUACION,
} from '../../data/guiaAprendizaje01Data';
import { INSTRUCTOR_DATOS } from '../../data/aprendicesData';
import {
  BookOpen,
  Lock,
  Unlock,
  CheckCircle2,
  Calendar,
  Clock,
  Send,
  Upload,
  FileText,
  Layers,
  Award,
  AlertTriangle,
  FileCheck,
  Building,
  Target,
  Sparkles,
  ChevronRight,
  User,
  ArrowLeft,
} from 'lucide-react';

interface GuiaAprendizajeViewProps {
  aprendiz: Aprendiz;
  onVolverADiagnostico: () => void;
}

export const GuiaAprendizajeView: React.FC<GuiaAprendizajeViewProps> = ({
  aprendiz,
  onVolverADiagnostico,
}) => {
  const [tabActiva, setTabActiva] = useState<
    'planeacion' | 'proyecto' | 'guia' | 'sesion' | 'actividades' | 'entrega' | 'evaluacion'
  >('guia');

  // Estado local para simular la entrega de evidencias por el aprendiz
  const [actividades, setActividades] = useState<ActividadGuia[]>(ACTIVIDADES_GUIA);
  const [actividadSeleccionada, setActividadSeleccionada] = useState<ActividadGuia | null>(null);
  const [archivoSimulado, setArchivoSimulado] = useState<string>('');
  const [comentarioEntrega, setComentarioEntrega] = useState<string>('');
  const [entregaExitosa, setEntregaExitosa] = useState(false);

  // Verificación del prerrequisito obligatorio
  if (!aprendiz.haRealizadoDiagnostico) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border-2 border-red-200 p-8 sm:p-10 shadow-lg space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Secuencia Formativa Bloqueada</span>
          </div>

          <h2 className="text-2xl font-black text-gray-900">
            Prerrequisito Obligatorio Pendiente
          </h2>

          <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            Estimado(a) aprendiz <strong>{aprendiz.nombres} {aprendiz.apellidos}</strong>, el acceso a la{' '}
            <strong>Guía de Aprendizaje 01</strong> y a las evidencias del RAP 01 está condicionado a la realización de la{' '}
            <strong>Evaluación Diagnóstica Preliminar</strong> (10 preguntas del caso empresarial <em>AndeTech S.A.S.</em>).
          </p>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 max-w-md mx-auto text-left space-y-1">
            <p className="font-bold text-gray-900">¿Por qué es obligatorio?</p>
            <p>
              El diagnóstico permite identificar sus competencias de ingreso en aritmética comercial, costos y nómina, y asignarle un Plan de Acción con Design Thinking guiado por el instructor <strong>Fabio Enrique Moreno</strong>.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onVolverADiagnostico}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#39A900] hover:bg-[#2d8500] text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              <span>Presentar Prueba Diagnóstica Ahora</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSimularEntrega = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actividadSeleccionada) return;

    setActividades((prev) =>
      prev.map((act) =>
        act.id === actividadSeleccionada.id
          ? { ...act, estadoEntrega: 'Entregado' }
          : act
      )
    );

    setEntregaExitosa(true);
    setTimeout(() => {
      setEntregaExitosa(false);
      setActividadSeleccionada(null);
      setArchivoSimulado('');
      setComentarioEntrega('');
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Banner de Bienvenida a la Secuencia RAP 01 Desbloqueada */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 rounded-2xl text-white p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-400/30 flex items-center gap-1.5">
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                Secuencia Formativa Habilitada
              </span>
              <span className="text-xs text-white/70">
                Ficha 2874102 • Asistencia Administrativa V3
              </span>
            </div>

            <div className="text-xs bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
              Instructor a Cargo: <strong>{INSTRUCTOR_DATOS.nombreCompleto}</strong>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Guía de Aprendizaje No. 01: Identificar Situaciones Problemáticas
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-3xl leading-relaxed">
            Competencia: {PLANEACION_PEDAGOGICA.competenciaNombre} (Código {PLANEACION_PEDAGOGICA.competenciaCodigo}) • Duración: {PLANEACION_PEDAGOGICA.duracionEstimada}
          </p>
        </div>
      </div>

      {/* Menú de Pestañas con los 7 componentes requeridos */}
      <div className="bg-white border border-gray-200 rounded-xl p-1.5 shadow-xs flex flex-wrap gap-1">
        <button
          onClick={() => setTabActiva('guia')}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            tabActiva === 'guia'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Guía 01 (SENA)</span>
        </button>

        <button
          onClick={() => setTabActiva('planeacion')}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            tabActiva === 'planeacion'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Planeación Pedagógica</span>
        </button>

        <button
          onClick={() => setTabActiva('proyecto')}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            tabActiva === 'proyecto'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>Proyecto Formativo</span>
        </button>

        <button
          onClick={() => setTabActiva('sesion')}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            tabActiva === 'sesion'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Plan de Sesión (4 Sem.)</span>
        </button>

        <button
          onClick={() => setTabActiva('actividades')}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            tabActiva === 'actividades'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Actividades & Entregables</span>
        </button>

        <button
          onClick={() => setTabActiva('entrega')}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            tabActiva === 'entrega'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Formas de Entrega</span>
        </button>

        <button
          onClick={() => setTabActiva('evaluacion')}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            tabActiva === 'evaluacion'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Modo de Evaluación</span>
        </button>
      </div>

      {/* CONTENIDO 1: GUÍA DE APRENDIZAJE 01 */}
      {tabActiva === 'guia' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
              Documento Formativo Oficial
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-1">
              {GUIA_APRENDIZAJE_INFO.denominacion}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {GUIA_APRENDIZAJE_INFO.centroFormacion} • Instructor: {GUIA_APRENDIZAJE_INFO.instructorLider}
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
              1. Presentación e Introducción
            </h4>
            <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
              {GUIA_APRENDIZAJE_INFO.introduccion}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              2. Formulación de Actividades de Aprendizaje
            </h4>
            <div className="space-y-4">
              {actividades.map((act) => (
                <div key={act.id} className="border border-gray-200 rounded-xl p-4 bg-white hover:border-emerald-300 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[11px] font-bold">
                        {act.codigo}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold">
                        {act.tipo}
                      </span>
                      <span className="text-xs font-bold text-gray-900">{act.nombre}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {act.horasEstimadas} Horas
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {act.descripcion}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-3 border-t border-gray-100 text-gray-600">
                    <div>
                      <strong className="text-gray-800">Criterio: </strong>
                      {act.criterioEvaluacion}
                    </div>
                    <div>
                      <strong className="text-gray-800">Forma de entrega: </strong>
                      {act.formaEntrega}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO 2: PLANEACIÓN PEDAGÓGICA */}
      {tabActiva === 'planeacion' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-bold text-gray-900">Planeación Pedagógica del RAP 01</h3>
            <p className="text-xs text-gray-500 mt-1">
              Estructura curricular de la competencia de razonamiento cuantitativo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-400 text-[11px] font-medium block">Código y Denominación de la Competencia</span>
              <p className="text-gray-900 font-bold mt-1 text-sm">{PLANEACION_PEDAGOGICA.competenciaCodigo}</p>
              <p className="text-gray-700 mt-0.5">{PLANEACION_PEDAGOGICA.competenciaNombre}</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-emerald-700 text-[11px] font-medium block">Resultado de Aprendizaje (RAP 01)</span>
              <p className="text-emerald-950 font-bold mt-1 text-sm">{PLANEACION_PEDAGOGICA.resultadoAprendizaje}</p>
              <p className="text-emerald-800 text-[11px] mt-1 font-semibold">Duración: {PLANEACION_PEDAGOGICA.duracionEstimada}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Estrategias Didácticas Activas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PLANEACION_PEDAGOGICA.estrategiasDidacticas.map((est, i) => (
                <div key={i} className="p-3 bg-white border border-gray-200 rounded-xl text-xs flex items-start gap-2.5 text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{est}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Criterios Institucionales de Evaluación SENA
            </h4>
            <div className="space-y-2">
              {PLANEACION_PEDAGOGICA.criteriosEvaluacion.map((crit, i) => (
                <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center gap-2.5 text-slate-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
                  <span>{crit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO 3: PROYECTO FORMATIVO */}
      {tabActiva === 'proyecto' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Articulación Curricular SENA
            </span>
            <h3 className="text-xl font-bold text-gray-900 mt-1">
              Proyecto Formativo de la Ficha 2874102
            </h3>
            <p className="text-xs font-mono text-gray-500 mt-0.5">
              Código del Proyecto: {PROYECTO_FORMATIVO.codigo}
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-200 rounded-2xl space-y-3">
            <h4 className="text-sm font-bold text-gray-900">
              {PROYECTO_FORMATIVO.nombre}
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-md font-semibold">
                {PROYECTO_FORMATIVO.fase}
              </span>
              <span className="px-2.5 py-1 bg-slate-200 text-slate-800 rounded-md font-medium">
                Duración de Fase: {PROYECTO_FORMATIVO.duracionTotalFase}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <strong className="text-gray-900 block mb-1">Actividad del Proyecto (AP1):</strong>
              <p className="text-gray-700 leading-relaxed">{PROYECTO_FORMATIVO.actividadProyecto}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <strong className="text-gray-900 block mb-1">Objetivo General del Proyecto:</strong>
              <p className="text-gray-700 leading-relaxed">{PROYECTO_FORMATIVO.objetivoGeneral}</p>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO 4: PLAN DE SESIÓN */}
      {tabActiva === 'sesion' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-bold text-gray-900">Plan de Sesión por Semanas (48 Horas)</h3>
            <p className="text-xs text-gray-500 mt-1">
              Guiado por el Instructor Líder <strong>{INSTRUCTOR_DATOS.nombreCompleto}</strong>
            </p>
          </div>

          <div className="space-y-4">
            {PLAN_DE_SESION.map((ses) => (
              <div key={ses.sesion} className="border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition-all bg-white shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#39A900] text-white rounded-md text-xs font-bold">
                      {ses.semana}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">{ses.tema}</h4>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {ses.horas} Horas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-3 border-t border-gray-100">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <strong className="text-slate-800 block mb-1 text-[11px] uppercase">1. Apertura:</strong>
                    <p className="text-gray-600">{ses.momentos.apertura}</p>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-lg">
                    <strong className="text-emerald-900 block mb-1 text-[11px] uppercase">2. Desarrollo:</strong>
                    <p className="text-gray-600">{ses.momentos.desarrollo}</p>
                  </div>
                  <div className="p-3 bg-amber-50/60 rounded-lg">
                    <strong className="text-amber-900 block mb-1 text-[11px] uppercase">3. Cierre Evaluativo:</strong>
                    <p className="text-gray-600">{ses.momentos.cierre}</p>
                  </div>
                </div>

                <div className="mt-3 pt-2 text-[11px] text-gray-500 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span><strong>Evidencia asociada:</strong> {ses.evidenciaAsociada}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTENIDO 5: ACTIVIDADES & ENTREGABLES (Con simulador de envío) */}
      {tabActiva === 'actividades' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-200 pb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Actividades y Tiempos de Entrega</h3>
              <p className="text-xs text-gray-500 mt-1">
                Cronograma y radicación de evidencias de aprendizaje
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              Aprendiz: {aprendiz.nombres} {aprendiz.apellidos}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50 text-gray-700 uppercase text-[10px] tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 px-3">Código</th>
                  <th className="py-3 px-3">Actividad de Aprendizaje</th>
                  <th className="py-3 px-2">Tipo</th>
                  <th className="py-3 px-2">Horas</th>
                  <th className="py-3 px-3">Fecha Límite</th>
                  <th className="py-3 px-2">Estado</th>
                  <th className="py-3 px-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {actividades.map((act) => (
                  <tr key={act.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-gray-900">{act.codigo}</td>
                    <td className="py-3 px-3 font-semibold text-gray-900 max-w-xs">{act.nombre}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-medium">{act.tipo}</span>
                    </td>
                    <td className="py-3 px-2 font-mono">{act.horasEstimadas}h</td>
                    <td className="py-3 px-3 font-medium text-gray-700">{act.fechaLimite}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          act.estadoEntrega === 'Entregado'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {act.estadoEntrega || 'Pendiente'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => setActividadSeleccionada(act)}
                        className="px-3 py-1.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-[11px] font-bold rounded-md shadow-xs transition-colors cursor-pointer"
                      >
                        {act.estadoEntrega === 'Entregado' ? 'Reenviar' : 'Radicar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal / Panel para radicar la evidencia seleccionada */}
          {actividadSeleccionada && (
            <div className="p-5 bg-emerald-50/70 border-2 border-[#39A900] rounded-2xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#39A900]" />
                  Radicación de Evidencia: {actividadSeleccionada.codigo} - {actividadSeleccionada.nombre}
                </h4>
                <button
                  type="button"
                  onClick={() => setActividadSeleccionada(null)}
                  className="text-xs text-gray-500 hover:text-gray-700 font-semibold"
                >
                  Cerrar
                </button>
              </div>

              <form onSubmit={handleSimularEntrega} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Nombre del Archivo de Evidencia (.xlsx, .pdf o .zip):
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Taller_Costos_ValentinaGomez_Ficha2874102.xlsx"
                      value={archivoSimulado}
                      onChange={(e) => setArchivoSimulado(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Canal de Radicación:
                    </label>
                    <input
                      type="text"
                      disabled
                      value="LMS Zajuna SENA - Espacio Evaluativo RAP 01"
                      className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-xs text-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1 text-xs">
                    Comentarios u Observaciones para el Instructor Fabio Enrique Moreno:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Instructor, adjunto la evidencia con las fórmulas requeridas del caso AndeTech..."
                    value={comentarioEntrega}
                    onChange={(e) => setComentarioEntrega(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>

                {entregaExitosa && (
                  <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>¡Evidencia radicada exitosamente! Notificación enviada al instructor Fabio Enrique Moreno.</span>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActividadSeleccionada(null)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirmar Entrega de Evidencia</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* CONTENIDO 6: FORMAS DE ENTREGA */}
      {tabActiva === 'entrega' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-bold text-gray-900">Formas y Canales Institucionales de Entrega</h3>
            <p className="text-xs text-gray-500 mt-1">
              Políticas y formatos válidos para la radicación de productos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
              <span className="text-emerald-700 font-bold block text-[11px] uppercase">Plataforma Principal:</span>
              <p className="text-gray-900 font-bold text-sm">{FORMAS_DE_ENTREGA.plataformaOficial}</p>
              <p className="text-gray-600 text-[11px]">Centro de Gestión Administrativa - SENA</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-600 font-bold block text-[11px] uppercase">Canal de Acompañamiento:</span>
              <p className="text-gray-900 font-bold font-mono text-xs">{FORMAS_DE_ENTREGA.correoInstructor}</p>
              <p className="text-gray-600 text-[11px]">Asunto obligatorio: {FORMAS_DE_ENTREGA.asuntoRequerido}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Formatos Técnicos Admitidos
            </h4>
            <div className="space-y-2">
              {FORMAS_DE_ENTREGA.formatosPermitidos.map((f, i) => (
                <div key={i} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-700" />
              Política Institucional de Puntualidad y Retroalimentación:
            </p>
            <p className="text-amber-800 leading-relaxed">
              {FORMAS_DE_ENTREGA.politicaPuntualidad}
            </p>
          </div>
        </div>
      )}

      {/* CONTENIDO 7: MODO DE EVALUACIÓN */}
      {tabActiva === 'evaluacion' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-bold text-gray-900">Modo de Evaluación y Rúbricas de Valoración</h3>
            <p className="text-xs text-gray-500 mt-1">
              Escala institucional SENA y ponderación porcentual del RAP 01
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-emerald-700 font-bold block text-[11px] uppercase">Escala Evaluativa SENA:</span>
              <p className="text-gray-900 font-bold text-sm mt-1">{MODO_EVALUACION.escalaEvaluativaSena}</p>
              <p className="text-emerald-800 text-[11px] mt-0.5">Umbral: {MODO_EVALUACION.porcentajeMinimoAprobacion}</p>
            </div>

            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <span className="text-indigo-700 font-bold block text-[11px] uppercase">Plan de Mejoramiento:</span>
              <p className="text-indigo-950 font-medium text-xs mt-1">Garantía pedagógica de nivelación en caso de obtener Deficiente (D).</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
              Ponderación de Componentes Evaluativos
            </h4>
            <div className="space-y-3">
              {MODO_EVALUACION.componentesCalificacion.map((comp, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">{comp.componente}</span>
                    <span className="text-gray-600 text-[11px]">{comp.descripcion}</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#39A900] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                    {comp.peso}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-gray-700 leading-relaxed">
            <strong className="text-gray-900 block mb-1">Procedimiento del Plan de Mejoramiento:</strong>
            {MODO_EVALUACION.planDeMejoramiento}
          </div>
        </div>
      )}
    </div>
  );
};
