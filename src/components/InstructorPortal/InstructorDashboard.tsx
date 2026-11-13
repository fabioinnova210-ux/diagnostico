import React, { useState, useMemo } from 'react';
import { Aprendiz, NotificacionReporteInstructor } from '../../types';
import { INSTRUCTOR_DATOS, exportAprendicesToCSV } from '../../data/aprendicesData';
import { generarResultadoDiagnostico } from '../../utils/designThinkingPlan';
import { descargarInformePDF } from '../../utils/pdfGenerator';
import { generarReporteGeneralInstructor, obtenerRespuestasCoherentes } from '../../utils/reporteGeneralInstructor';
import { ReporteGeneralView } from './ReporteGeneralView';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Eye,
  MessageSquare,
  BookOpen,
  Mail,
  Phone,
  Check,
  X,
  FileDown,
  BarChart3,
  ClipboardList,
} from 'lucide-react';

interface InstructorDashboardProps {
  aprendices: Aprendiz[];
  notificaciones: NotificacionReporteInstructor[];
  onMarcarNotificacionesLeidas: () => void;
  onActualizarAprendiz: (aprendiz: Aprendiz) => void;
  onSimularAprendiz: (aprendiz: Aprendiz) => void;
  onVerGuiaPedagogica: () => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  aprendices,
  notificaciones,
  onMarcarNotificacionesLeidas,
  onActualizarAprendiz,
  onSimularAprendiz,
  onVerGuiaPedagogica,
}) => {
  const [vistaTab, setVistaTab] = useState<'reporte' | 'matriz'>('reporte');
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'aprobados' | 'noAprobados' | 'pendientes'>('todos');
  const [aprendizSeleccionado, setAprendizSeleccionado] = useState<Aprendiz | null>(null);
  const [retroTexto, setRetroTexto] = useState('');
  const [modalRetroAbierto, setModalRetroAbierto] = useState(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const reporteGeneral = useMemo(() => generarReporteGeneralInstructor(aprendices), [aprendices]);
  const noLeidasCount = notificaciones.filter((n) => !n.leido).length;

  // Estadísticas globales de los 35 aprendices
  const total = aprendices.length;
  const evaluados = aprendices.filter((a) => a.haRealizadoDiagnostico);
  const totalEvaluados = evaluados.length;
  const aprobados = evaluados.filter((a) => a.aprobado);
  const totalAprobados = aprobados.length;
  const noAprobados = evaluados.filter((a) => !a.aprobado);
  const totalNoAprobados = noAprobados.length;
  const pendientes = total - totalEvaluados;

  const tasaAprobacion = totalEvaluados > 0 ? Math.round((totalAprobados / totalEvaluados) * 100) : 0;
  const promedioPuntaje =
    totalEvaluados > 0
      ? (
          evaluados.reduce((sum, a) => sum + (a.puntajeDiagnostico || 0), 0) / totalEvaluados
        ).toFixed(1)
      : '0.0';

  // Filtrado de la tabla
  const aprendicesFiltrados = aprendices.filter((a) => {
    const textoCompleto = `${a.nombres} ${a.apellidos} ${a.numeroDocumento} ${a.correo} ${a.celular} ${a.empresaProyecto || ''}`.toLowerCase();
    const coincideBusqueda = textoCompleto.includes(busqueda.toLowerCase());

    if (!coincideBusqueda) return false;

    if (filtroEstado === 'aprobados') return a.haRealizadoDiagnostico && a.aprobado;
    if (filtroEstado === 'noAprobados') return a.haRealizadoDiagnostico && !a.aprobado;
    if (filtroEstado === 'pendientes') return !a.haRealizadoDiagnostico;
    return true;
  });

  const handleDescargarExcel = () => {
    const csvContent = exportAprendicesToCSV();
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SENA_Asistencia_Admin_Ficha2874102_35Aprendices.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMensajeExito('Matriz de 35 aprendices exportada exitosamente a Excel (CSV).');
    setTimeout(() => setMensajeExito(null), 3000);
  };

  const handleAbrirRetro = (aprendiz: Aprendiz) => {
    setAprendizSeleccionado(aprendiz);
    setRetroTexto(aprendiz.retroalimentacionInstructor || '');
    setModalRetroAbierto(true);
  };

  const handleGuardarRetro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aprendizSeleccionado) return;

    const actualizado: Aprendiz = {
      ...aprendizSeleccionado,
      retroalimentacionInstructor: retroTexto,
    };

    onActualizarAprendiz(actualizado);
    setModalRetroAbierto(false);
    setMensajeExito(`Retroalimentación registrada para el aprendiz ${actualizado.nombres} ${actualizado.apellidos}.`);
    setTimeout(() => setMensajeExito(null), 3000);
  };

  const handleDescargarPdfAprendiz = (aprendiz: Aprendiz) => {
    const respuestas = obtenerRespuestasCoherentes(aprendiz);
    const resultado = generarResultadoDiagnostico(aprendiz.id, respuestas);
    // Asignar los puntajes guardados
    resultado.aciertos = aprendiz.puntajeDiagnostico ?? resultado.aciertos;
    resultado.porcentaje = aprendiz.porcentajeDiagnostico ?? resultado.porcentaje;
    resultado.aprobado = aprendiz.aprobado ?? resultado.aprobado;
    descargarInformePDF(aprendiz, resultado);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Banner de Identificación del Instructor Fabio Enrique Moreno */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl text-white p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-semibold border border-emerald-400/30">
                Panel de Control del Instructor
              </span>
              <span className="text-xs text-slate-300">
                Ficha 2874102 • Asistencia Administrativa V3
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {INSTRUCTOR_DATOS.nombreCompleto}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200">
              {INSTRUCTOR_DATOS.cargo} • Regional Distrito Capital (Centro de Gestión Administrativa)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleDescargarExcel}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Exportar Matriz a Excel (.csv)</span>
            </button>

            <button
              type="button"
              onClick={onVerGuiaPedagogica}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl border border-white/20 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Revisar Guía 01 & Proyecto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alerta de notificación flotante */}
      {mensajeExito && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-semibold text-emerald-900 flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{mensajeExito}</span>
          </div>
          <button onClick={() => setMensajeExito(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tarjetas de Indicadores Clave (KPIs) de los 35 aprendices */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 uppercase block">Total Aprendices</span>
          <p className="text-2xl font-black text-gray-900 mt-1">{total}</p>
          <span className="text-[10px] text-gray-400">Listados en base de datos</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase block">Presentaron</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">{totalEvaluados}</p>
          <span className="text-[10px] text-emerald-600 font-medium">
            {Math.round((totalEvaluados / total) * 100)}% de la ficha
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-indigo-700 uppercase block">Aprobados (≥70%)</span>
          <p className="text-2xl font-black text-indigo-700 mt-1">{totalAprobados}</p>
          <span className="text-[10px] text-indigo-600 font-medium">Constancia emitida</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-amber-700 uppercase block">En Refuerzo (&lt;70%)</span>
          <p className="text-2xl font-black text-amber-700 mt-1">{totalNoAprobados}</p>
          <span className="text-[10px] text-amber-600 font-medium">Plan Design Thinking</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-gray-500 uppercase block">Pendientes</span>
          <p className="text-2xl font-black text-gray-600 mt-1">{pendientes}</p>
          <span className="text-[10px] text-gray-400">Sin realizar prueba</span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-800 uppercase block">Promedio Ficha</span>
          <p className="text-2xl font-black text-emerald-900 mt-1">{promedioPuntaje} <span className="text-sm font-normal text-gray-400">/ 10</span></p>
          <span className="text-[10px] text-emerald-700 font-semibold">{tasaAprobacion}% Tasa Éxito</span>
        </div>
      </div>

      {/* Selector de Vistas Principales del Instructor */}
      <div className="bg-white border border-gray-200 rounded-xl p-1.5 shadow-xs flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setVistaTab('reporte')}
          className={`flex-1 min-w-[220px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            vistaTab === 'reporte'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Reporte General y Planificación Pedagógica SENA</span>
          {noLeidasCount > 0 && (
            <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-extrabold rounded-full">
              {noLeidasCount} nuevo
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setVistaTab('matriz')}
          className={`flex-1 min-w-[220px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            vistaTab === 'matriz'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Matriz Detallada de Aprendices ({total} en Ficha)</span>
        </button>
      </div>

      {vistaTab === 'reporte' ? (
        <ReporteGeneralView
          reporte={reporteGeneral}
          notificaciones={notificaciones}
          onMarcarNotificacionesLeidas={onMarcarNotificacionesLeidas}
        />
      ) : (
        /* Matriz Tipo Excel de Seguimiento de Aprendices */
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Barra de Filtros y Búsqueda */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, documento, correo, celular o empresa..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-300 pl-9 pr-4 py-2 focus:outline-hidden focus:ring-2 focus:ring-[#39A900] bg-gray-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-gray-500 font-medium mr-1 text-[11px]">Filtrar:</span>
            <button
              onClick={() => setFiltroEstado('todos')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                filtroEstado === 'todos'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos ({total})
            </button>
            <button
              onClick={() => setFiltroEstado('aprobados')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                filtroEstado === 'aprobados'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Aprobados ≥70% ({totalAprobados})
            </button>
            <button
              onClick={() => setFiltroEstado('noAprobados')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                filtroEstado === 'noAprobados'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              En Refuerzo ({totalNoAprobados})
            </button>
            <button
              onClick={() => setFiltroEstado('pendientes')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                filtroEstado === 'pendientes'
                  ? 'bg-gray-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pendientes ({pendientes})
            </button>
          </div>
        </div>

        {/* Tabla tipo Excel con los datos personales confidenciales */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] tracking-wider border-b border-gray-200 font-bold">
              <tr>
                <th className="py-3 px-3">#</th>
                <th className="py-3 px-3">Aprendiz</th>
                <th className="py-3 px-3">Documento</th>
                <th className="py-3 px-3">Contacto (Correo & Celular)</th>
                <th className="py-3 px-3">Empresa Vinculada</th>
                <th className="py-3 px-3 text-center">Estado Diagnóstico</th>
                <th className="py-3 px-2 text-center">Puntaje</th>
                <th className="py-3 px-3">Fecha</th>
                <th className="py-3 px-3 text-right">Acciones Pedagógicas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {aprendicesFiltrados.map((a, index) => (
                <tr key={a.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-mono text-gray-400 font-semibold">
                    {index + 1}
                  </td>

                  {/* Nombre */}
                  <td className="py-3 px-3 font-semibold text-gray-900">
                    <div>{a.nombres} {a.apellidos}</div>
                    {a.retroalimentacionInstructor && (
                      <span className="text-[10px] text-emerald-700 flex items-center gap-1 mt-0.5 font-normal">
                        <MessageSquare className="w-3 h-3 shrink-0" />
                        Retroalimentado
                      </span>
                    )}
                  </td>

                  {/* Documento */}
                  <td className="py-3 px-3 font-mono text-gray-600">
                    <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] mr-1 text-gray-700 font-semibold">
                      {a.tipoDocumento}
                    </span>
                    {a.numeroDocumento}
                  </td>

                  {/* Contacto */}
                  <td className="py-3 px-3 text-gray-600 space-y-0.5">
                    <div className="flex items-center gap-1 text-[11px] truncate max-w-[190px]">
                      <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                      <span className="truncate">{a.correo}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-gray-700">
                      <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                      <span>{a.celular}</span>
                    </div>
                  </td>

                  {/* Empresa */}
                  <td className="py-3 px-3 text-gray-700 max-w-[160px] truncate text-[11px]">
                    {a.empresaProyecto || <span className="text-gray-400 italic">Por asignar</span>}
                  </td>

                  {/* Estado Diagnóstico */}
                  <td className="py-3 px-3 text-center">
                    {a.haRealizadoDiagnostico ? (
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          a.aprobado
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {a.aprobado ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        <span>{a.aprobado ? 'APROBADO (≥70%)' : 'REFUERZO (<70%)'}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-gray-100 text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>NO PRESENTÓ</span>
                      </span>
                    )}
                  </td>

                  {/* Puntaje */}
                  <td className="py-3 px-2 text-center font-mono">
                    {a.haRealizadoDiagnostico ? (
                      <div>
                        <span className="font-bold text-gray-900">{a.puntajeDiagnostico}/10</span>
                        <span className="text-[10px] text-gray-500 block">({a.porcentajeDiagnostico}%)</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  {/* Fecha */}
                  <td className="py-3 px-3 text-[11px] text-gray-500 whitespace-nowrap">
                    {a.fechaRealizacion || 'Pendiente'}
                  </td>

                  {/* Acciones */}
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Simular como este aprendiz */}
                      <button
                        type="button"
                        onClick={() => onSimularAprendiz(a)}
                        title="Ver plataforma como este aprendiz"
                        className="p-1.5 text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Retroalimentación */}
                      <button
                        type="button"
                        onClick={() => handleAbrirRetro(a)}
                        title="Registrar retroalimentación del instructor Fabio Enrique Moreno"
                        className="p-1.5 text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      {/* Descargar PDF si presentó */}
                      {a.haRealizadoDiagnostico && (
                        <button
                          type="button"
                          onClick={() => handleDescargarPdfAprendiz(a)}
                          title="Descargar informe y constancia en PDF"
                          className="p-1.5 text-[#39A900] hover:text-[#2d8500] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <FileDown className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {aprendicesFiltrados.length === 0 && (
          <div className="py-12 text-center text-xs text-gray-500">
            No se encontraron aprendices con los filtros seleccionados.
          </div>
        )}
        </div>
      )}

      {/* Modal para emitir retroalimentación pedagógica */}
      {modalRetroAbierto && aprendizSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-bold text-gray-900">
                  Retroalimentación Pedagógica del Instructor
                </h3>
              </div>
              <button
                onClick={() => setModalRetroAbierto(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl mb-4 text-xs space-y-1">
              <p className="font-bold text-gray-900">
                Aprendiz: {aprendizSeleccionado.nombres} {aprendizSeleccionado.apellidos}
              </p>
              <p className="text-gray-600">
                Documento: {aprendizSeleccionado.tipoDocumento} {aprendizSeleccionado.numeroDocumento} | Estado: {aprendizSeleccionado.haRealizadoDiagnostico ? `${aprendizSeleccionado.porcentajeDiagnostico}% (${aprendizSeleccionado.aprobado ? 'Aprobado' : 'Refuerzo'})` : 'Pendiente'}
              </p>
            </div>

            <form onSubmit={handleGuardarRetro} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Observaciones y Orientaciones de Fabio Enrique Moreno:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ingrese las observaciones específicas sobre el desempeño en razonamiento cuantitativo, recomendaciones de horas extras, caja menor o el plan Design Thinking..."
                  value={retroTexto}
                  onChange={(e) => setRetroTexto(e.target.value)}
                  className="w-full text-xs rounded-xl border border-gray-300 p-3 focus:outline-hidden focus:ring-2 focus:ring-[#39A900] text-gray-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalRetroAbierto(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Guardar Retroalimentación</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
