import React from 'react';
import { NotificacionReporteInstructor, ReporteGeneralInstructor } from '../../types';
import { descargarReporteGeneralInstructorPDF } from '../../utils/pdfGenerator';
import {
  AlertTriangle,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Compass,
  FileDown,
  Layers,
  Lightbulb,
  Send,
  Sparkles,
  Target,
  TrendingDown,
  Users,
} from 'lucide-react';

interface ReporteGeneralViewProps {
  reporte: ReporteGeneralInstructor;
  notificaciones: NotificacionReporteInstructor[];
  onMarcarNotificacionesLeidas: () => void;
}

export const ReporteGeneralView: React.FC<ReporteGeneralViewProps> = ({
  reporte,
  notificaciones,
  onMarcarNotificacionesLeidas,
}) => {
  const noLeidas = notificaciones.filter((n) => !n.leido);

  const handleDescargarReportePDF = () => {
    descargarReporteGeneralInstructorPDF(reporte);
  };

  return (
    <div className="space-y-6">
      {/* Notificación automática de reportes recibidos cuando aprendices terminan la prueba */}
      {notificaciones.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#39A900] text-white flex items-center justify-center shrink-0">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <span>Bandeja de Reportes Recibidos Automáticamente</span>
                  {noLeidas.length > 0 && (
                    <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-extrabold rounded-full">
                      {noLeidas.length} nuevo(s)
                    </span>
                  )}
                </h4>
                <p className="text-[11px] text-emerald-800">
                  Cada vez que un aprendiz finaliza su diagnóstico, el reporte consolidado del grupo se recalcula y envía automáticamente al instructor {reporte.instructor}.
                </p>
              </div>
            </div>

            {noLeidas.length > 0 && (
              <button
                type="button"
                onClick={onMarcarNotificacionesLeidas}
                className="px-3 py-1.5 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Marcar como revisados
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {notificaciones.slice(0, 3).map((notif) => (
              <div
                key={notif.id}
                className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                  notif.leido
                    ? 'bg-white/80 border-emerald-200 text-gray-700'
                    : 'bg-white border-emerald-400 text-gray-900 shadow-xs'
                }`}
              >
                <div className="min-w-0">
                  <p className="font-bold truncate">{notif.aprendizNombre}</p>
                  <p className="text-[10px] text-gray-500 truncate">{notif.estiloIdentificado}</p>
                  <p className="text-[10px] text-gray-400">{notif.fechaEnvio}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold shrink-0 ${
                    notif.semaforo === 'verde'
                      ? 'bg-emerald-100 text-emerald-800'
                      : notif.semaforo === 'amarillo'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {notif.porcentaje}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cabecera del Reporte General + Botón Exportar PDF */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-[#257300] border border-emerald-200 rounded-md text-[11px] font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              Reporte General Consolidado del Grupo
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">
              Diagnóstico Grupal, Priorización de Fortalecimiento y Planificación Pedagógica SENA
            </h3>
            <p className="text-xs text-gray-500">
              Corte actualizado al {reporte.fechaGeneracion} • Basado en {reporte.totalEvaluados} aprendices evaluados de {reporte.totalAprendicesFicha} en ficha.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDescargarReportePDF}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Descargar Reporte y Planificación (PDF)</span>
          </button>
        </div>

        {/* Semaforización Grupal Consolidada */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Promedio Grupal</span>
            <p className="text-3xl font-black text-slate-900 mt-1">{reporte.promedioGrupalPorcentaje}%</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {reporte.totalEvaluados} evaluados / {reporte.pendientesPorEvaluar} pendientes
            </p>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-800 uppercase">Semáforo Verde (≥70%)</span>
              <span className="w-3 h-3 rounded-full bg-emerald-600" />
            </div>
            <p className="text-3xl font-black text-emerald-800 mt-1">{reporte.distribucionSemaforo.verde}</p>
            <p className="text-[11px] text-emerald-700 mt-0.5">Nivel consolidado / Monitores</p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-800 uppercase">Semáforo Amarillo (50-69%)</span>
              <span className="w-3 h-3 rounded-full bg-amber-500" />
            </div>
            <p className="text-3xl font-black text-amber-800 mt-1">{reporte.distribucionSemaforo.amarillo}</p>
            <p className="text-[11px] text-amber-700 mt-0.5">Requiere práctica guiada</p>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-red-800 uppercase">Semáforo Rojo (&lt;50%)</span>
              <span className="w-3 h-3 rounded-full bg-red-600" />
            </div>
            <p className="text-3xl font-black text-red-800 mt-1">{reporte.distribucionSemaforo.rojo}</p>
            <p className="text-[11px] text-red-700 mt-0.5">Nivelación prioritaria</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: ACTIVIDADES PRIORITARIAS DE FORTALECIMIENTO (DE MAYOR A MENOR) */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              1. Actividades Prioritarias para el Fortalecimiento del Grupo (De Mayor a Menor Brecha)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Ordenadas estrictamente según el porcentaje de dificultad detectado en los aprendices evaluados para orientar la intervención inmediata del instructor.
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
            Orden: Prioridad #1 (Mayor necesidad) → #{reporte.prioridadesFortalecimiento.length}
          </span>
        </div>

        <div className="space-y-3">
          {reporte.prioridadesFortalecimiento.map((item) => {
            const esCritica = item.nivelUrgencia === 'Prioridad Crítica (Alta)';
            const esMedia = item.nivelUrgencia === 'Prioridad Media';

            return (
              <div
                key={item.categoria}
                className={`rounded-xl border-2 p-4 sm:p-5 transition-all ${
                  esCritica
                    ? 'border-red-200 bg-red-50/30'
                    : esMedia
                    ? 'border-amber-200 bg-amber-50/30'
                    : 'border-emerald-200 bg-emerald-50/30'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center text-white shrink-0 shadow-xs ${
                        esCritica ? 'bg-red-600' : esMedia ? 'bg-amber-600' : 'bg-[#39A900]'
                      }`}
                    >
                      #{item.ordenPrioridad}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                            esCritica
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : esMedia
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {item.nivelUrgencia}
                        </span>
                        <span className="text-xs font-bold text-gray-500">Área: {item.categoria}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 mt-1">
                        {item.actividadFortalecimiento}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-gray-900 font-mono">
                      {item.porcentajeBrecha}% brecha
                    </span>
                    <span className="block text-[11px] text-gray-500">
                      {item.aprendicesConDificultad} de {item.totalEvaluados} aprendices con fallo • {item.tiempoSugeridoHoras}h asignadas
                    </span>
                  </div>
                </div>

                {/* Barra comparativa Brecha vs Dominio */}
                <div className="my-3 space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-red-700">Necesidad de refuerzo: {item.porcentajeBrecha}%</span>
                    <span className="text-emerald-700">Dominio grupal actual: {item.porcentajeDominio}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-emerald-200 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-500 ${
                        esCritica ? 'bg-red-500' : esMedia ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${item.porcentajeBrecha}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed mb-2">
                  {item.descripcionOperativa}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-200/70">
                  <span className="text-[10px] font-bold text-gray-500 uppercase mr-1">Ítems críticos:</span>
                  {item.preguntasAsociadas.map((preg, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-medium text-gray-700"
                    >
                      {preg}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN 2: ESTRATEGIA PEDAGÓGICA SENA BASADA EN ESTILOS DE APRENDIZAJE Y TÉCNICA DIDÁCTICA ACTIVA */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            2. Estrategia Pedagógica SENA por Estilos de Aprendizaje y Técnica Didáctica Activa (TDA)
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Articulación de los estilos cognitivos identificados en la prueba diagnóstica con estrategias pedagógicas SENA y técnicas didácticas activas para el ambiente de formación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {reporte.estrategiasPorEstilo.map((est, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-2xl p-5 bg-gradient-to-b from-slate-50/70 to-white flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      est.semaforoAsociado === 'rojo'
                        ? 'bg-red-100 text-red-800'
                        : est.semaforoAsociado === 'amarillo'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {est.cantidadAprendices} aprendices ({est.porcentajeGrupo}%)
                  </span>
                  <Users className="w-4 h-4 text-gray-400 shrink-0" />
                </div>

                <h4 className="text-sm font-extrabold text-gray-900 leading-snug">{est.estilo}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{est.descripcionEstilo}</p>

                <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block">
                    Estrategia Pedagógica SENA:
                  </span>
                  <p className="text-xs font-bold text-indigo-950">{est.estrategiaPedagogicaSena}</p>
                </div>

                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Técnica Didáctica Activa (TDA):
                  </span>
                  <p className="text-xs font-bold text-emerald-950">{est.tecnicaDidacticaActiva}</p>
                </div>

                <p className="text-[11px] text-gray-600 italic leading-relaxed">
                  {est.fundamentacionTecnica}
                </p>

                <div>
                  <span className="text-[11px] font-bold text-gray-800 block mb-1">
                    Acciones en Ambiente de Formación:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-600">
                    {est.actividadesEnAmbiente.map((act, aIdx) => (
                      <li key={aIdx}>{act}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1.5">
                  Recursos Didácticos:
                </span>
                <div className="flex flex-wrap gap-1">
                  {est.recursosDidacticos.map((rec, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium"
                    >
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN 3: PLANIFICACIÓN PEDAGÓGICA SENA GENERADA */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-[#39A900]" />
              3. Planificación Pedagógica Generada (RAP 01 - Competencia 240201528)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Secuencia operativa de sesiones, técnicas didácticas activas, criterios y evidencias alineada con las prioridades del grupo.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            Total Intensidad: {reporte.planificacionPedagogica.reduce((s, i) => s + i.duracionHoras, 0)} Horas Formativas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3">Prioridad</th>
                <th className="py-3 px-3">Actividad de Aprendizaje y Fortalecimiento</th>
                <th className="py-3 px-3">Estilo de Aprendizaje Objetivo</th>
                <th className="py-3 px-3">Estrategia SENA & Técnica Didáctica Activa</th>
                <th className="py-3 px-2 text-center">Horas</th>
                <th className="py-3 px-3">Criterio, Evidencia e Instrumento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reporte.planificacionPedagogica.map((row) => (
                <tr key={row.prioridad} className="hover:bg-slate-50/80 transition-colors align-top">
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-extrabold text-xs text-white ${
                        row.prioridad === 1
                          ? 'bg-red-600'
                          : row.prioridad === 2
                          ? 'bg-amber-600'
                          : 'bg-[#39A900]'
                      }`}
                    >
                      #{row.prioridad}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 max-w-[230px]">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase block mb-0.5">
                      {row.faseCurricular}
                    </span>
                    <p className="font-bold text-gray-900 leading-snug">{row.actividadAprendizaje}</p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      <strong>Ambiente:</strong> {row.ambienteYRecursos}
                    </p>
                  </td>

                  <td className="py-3.5 px-3 max-w-[170px]">
                    <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-lg text-[11px] font-semibold leading-snug">
                      {row.estiloObjetivo}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 max-w-[240px] space-y-1.5">
                    <div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase block">Estrategia SENA:</span>
                      <p className="font-semibold text-gray-800">{row.estrategiaSena}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#257300] uppercase block">Técnica Didáctica Activa:</span>
                      <p className="font-bold text-emerald-900">{row.tecnicaDidacticaActiva}</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-2 text-center font-mono font-bold text-gray-900">
                    {row.duracionHoras}h
                  </td>

                  <td className="py-3.5 px-3 max-w-[240px] space-y-1 text-[11px] text-gray-600">
                    <p>
                      <strong className="text-gray-800">Criterio:</strong> {row.criterioEvaluacion}
                    </p>
                    <p>
                      <strong className="text-gray-800">Evidencia:</strong> {row.evidenciaYProducto}
                    </p>
                    <p>
                      <strong className="text-gray-800">Instrumento:</strong> {row.instrumentoEvaluacion}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
