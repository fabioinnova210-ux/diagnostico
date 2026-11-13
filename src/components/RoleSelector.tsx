import React, { useState } from 'react';
import { Aprendiz } from '../types';
import { INSTRUCTOR_DATOS } from '../data/aprendicesData';
import { RegistroAprendizModal } from './AprendizPortal/RegistroAprendizModal';
import {
  UserCheck,
  Shield,
  GraduationCap,
  Users,
  Lock,
  ArrowRight,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  UserPlus,
} from 'lucide-react';

interface RoleSelectorProps {
  aprendices: Aprendiz[];
  onSeleccionarAprendiz: (aprendiz: Aprendiz) => void;
  onSeleccionarInstructor: () => void;
  onActualizarAprendiz: (aprendiz: Aprendiz) => void;
  onRegistrarAprendiz: (aprendiz: Aprendiz) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  aprendices,
  onSeleccionarAprendiz,
  onSeleccionarInstructor,
  onActualizarAprendiz,
  onRegistrarAprendiz,
}) => {
  const [documentoBusqueda, setDocumentoBusqueda] = useState('');
  const [aprendizSeleccionadoId, setAprendizSeleccionadoId] = useState<string>(aprendices[0]?.id || '');
  const [errorBusqueda, setErrorBusqueda] = useState<string | null>(null);
  const [modoIngreso, setModoIngreso] = useState<'lista' | 'documento'>('lista');
  const [modalRegistroAbierto, setModalRegistroAbierto] = useState(false);

  // Instructor PIN modal or quick confirm
  const [mostrarPinInstructor, setMostrarPinInstructor] = useState(false);
  const [pinInstructor, setPinInstructor] = useState('');
  const [errorPin, setErrorPin] = useState<string | null>(null);

  // Quick stats for selector preview
  const evaluados = aprendices.filter((a) => a.haRealizadoDiagnostico).length;
  const aprobados = aprendices.filter((a) => a.haRealizadoDiagnostico && a.aprobado).length;

  const handleBuscarPorDocumento = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBusqueda(null);
    const docLimpio = documentoBusqueda.trim().replace(/\./g, '');
    if (!docLimpio) {
      setErrorBusqueda('Por favor ingrese su número de documento.');
      return;
    }

    const encontrado = aprendices.find(
      (a) => a.numeroDocumento.replace(/\./g, '') === docLimpio
    );

    if (encontrado) {
      onSeleccionarAprendiz(encontrado);
    } else {
      setErrorBusqueda(
        `No se encontró ningún aprendiz con el documento ${documentoBusqueda} en la ficha 2874102. Puedes registrarte abajo como nuevo aprendiz.`
      );
    }
  };

  const handleIngresarDesdeLista = () => {
    const seleccionado = aprendices.find((a) => a.id === aprendizSeleccionadoId);
    if (seleccionado) {
      onSeleccionarAprendiz(seleccionado);
    }
  };

  const handleIngresoInstructor = () => {
    if (pinInstructor === '' || pinInstructor === '91290') {
      onSeleccionarInstructor();
    } else {
      setErrorPin('PIN incorrecto. (Código institucional requerido: 91290)');
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50/40 via-white to-gray-50 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Banner institucional informativo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 border border-emerald-300 rounded-full text-emerald-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
            Servicio Nacional de Aprendizaje - SENA • Versión 3
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Bienvenido al Sistema de Evaluación Diagnóstica
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Programa: <strong className="text-gray-900">Técnico en Asistencia Administrativa (Ficha 2874102)</strong>
            <br />
            Competencia: <span className="text-[#257300] font-medium">Razonamiento Cuantitativo - Matemáticas (RAP 01)</span>
          </p>
        </div>

        {/* Dos tarjetas de rol principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* ROL APRENDIZ */}
          <div className="bg-white rounded-2xl border-2 border-emerald-500/30 hover:border-emerald-500 transition-all shadow-sm hover:shadow-md p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200">
                  Acceso Personal Privado
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">Soy Aprendiz</h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Regístrate con tus datos personales o selecciona tu perfil para presentar la prueba diagnóstica de 10 preguntas sobre el caso <strong>AndeTech S.A.S.</strong>, generar tu plan <strong>Design Thinking</strong> y desbloquear la <strong>Guía 01</strong>.
              </p>

              {/* Mensaje de confidencialidad estricto */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4 flex items-start gap-2.5 text-xs text-amber-900">
                <Shield className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Privacidad y Protección de Datos:</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Tus datos personales y resultados son <strong>estrictamente privados</strong> y no están abiertos a los demás aprendices de la ficha. Solo tú y el instructor tienen acceso.
                  </p>
                </div>
              </div>

              {/* Botón destacado para Registrar Nuevo Aprendiz */}
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setModalRegistroAbierto(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-[#257300] hover:from-emerald-700 hover:to-emerald-800 text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-white" />
                  <span>Registrarme con Mis Datos Personales</span>
                </button>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-[11px] text-gray-400 uppercase font-medium">o ingresa con registro existente</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Selector de modo de ingreso */}
              <div className="flex items-center gap-2 my-3 bg-gray-100 p-1 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setModoIngreso('lista')}
                  className={`flex-1 py-1.5 px-2 rounded-md transition-all ${
                    modoIngreso === 'lista'
                      ? 'bg-white text-gray-900 shadow-xs font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Seleccionar de la Ficha ({aprendices.length} Aprendices)
                </button>
                <button
                  type="button"
                  onClick={() => setModoIngreso('documento')}
                  className={`flex-1 py-1.5 px-2 rounded-md transition-all ${
                    modoIngreso === 'documento'
                      ? 'bg-white text-gray-900 shadow-xs font-semibold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Ingresar por Documento
                </button>
              </div>

              {modoIngreso === 'lista' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Selecciona tu perfil de aprendiz:
                    </label>
                    <select
                      value={aprendizSeleccionadoId}
                      onChange={(e) => setAprendizSeleccionadoId(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      {aprendices.map((a, i) => (
                        <option key={a.id} value={a.id}>
                          {i + 1}. {a.nombres} {a.apellidos} - {a.tipoDocumento} {a.numeroDocumento} {a.haRealizadoDiagnostico ? `(${a.aprobado ? 'Aprobó 70%+' : 'Refuerzo'})` : '(Sin iniciar)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Resumen del perfil seleccionado */}
                  {(() => {
                    const sel = aprendices.find((a) => a.id === aprendizSeleccionadoId);
                    if (!sel) return null;
                    return (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-[11px] text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-800">Correo:</span>
                          <span className="text-gray-700 truncate max-w-[200px]">{sel.correo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-800">Celular:</span>
                          <span className="font-mono text-gray-700">{sel.celular}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-800">Estado Diagnóstico:</span>
                          <span className={`font-bold ${sel.haRealizadoDiagnostico ? (sel.aprobado ? 'text-emerald-700' : 'text-amber-700') : 'text-gray-500'}`}>
                            {sel.haRealizadoDiagnostico ? (sel.aprobado ? 'Presentada (Aprobado >=70%)' : 'Presentada (En Refuerzo <70%)') : 'Pendiente por realizar'}
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                  <button
                    type="button"
                    onClick={handleIngresarDesdeLista}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <span>Ingresar con este Perfil</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBuscarPorDocumento} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Número de Documento (C.C. o T.I.):
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 1014285910"
                      value={documentoBusqueda}
                      onChange={(e) => setDocumentoBusqueda(e.target.value)}
                      className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">
                      Si aún no estás en la lista, regístrate haciendo clic arriba en <strong>"Registrarme con Mis Datos Personales"</strong>.
                    </p>
                  </div>

                  {errorBusqueda && (
                    <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <div>
                        <span>{errorBusqueda}</span>
                        <button
                          type="button"
                          onClick={() => setModalRegistroAbierto(true)}
                          className="block mt-1 font-bold underline text-red-800 hover:text-red-950"
                        >
                          → Registrarse ahora como nuevo aprendiz
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#39A900] hover:bg-[#2d8500] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <span>Verificar Documento e Ingresar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ROL INSTRUCTOR */}
          <div className="bg-white rounded-2xl border-2 border-slate-300 hover:border-slate-800 transition-all shadow-sm hover:shadow-md p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-bl-full pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                  <UserCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md border border-slate-300">
                  Gestión y Seguimiento
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Soy Instructor Formador
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mb-3">
                {INSTRUCTOR_DATOS.nombreCompleto}
              </p>

              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Único instructor encargado de revisar y auditar la información diagnóstica de los aprendices, guiar el proceso formativo del RAP 01, monitorear los planes Design Thinking, retroalimentar evidencias y exportar la matriz consolidada a formato tipo Excel.
              </p>

              {/* Indicadores en vivo de la ficha */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl mb-5 text-center">
                <div>
                  <p className="text-xs text-gray-500">Total Ficha</p>
                  <p className="text-lg font-extrabold text-gray-900">{aprendices.length}</p>
                  <p className="text-[10px] text-gray-400">Aprendices</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Evaluados</p>
                  <p className="text-lg font-extrabold text-emerald-700">{evaluados}</p>
                  <p className="text-[10px] text-emerald-600">Presentaron</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Aprobados</p>
                  <p className="text-lg font-extrabold text-indigo-700">{aprobados}</p>
                  <p className="text-[10px] text-indigo-600">≥ 70%</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-100/70 rounded-lg text-[11px] text-gray-700 space-y-1">
                  <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900]" />
                    Herramientas del Instructor Fabio Enrique Moreno:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-0.5 pl-1">
                    <li>Matriz completa tipo Excel con datos personales y celulares.</li>
                    <li>Filtro de aprobados (≥70%) y asignación de refuerzo.</li>
                    <li>Auditoría de los planes de acción con Design Thinking.</li>
                    <li>Gestión y parametrización de la Guía de Aprendizaje 01.</li>
                  </ul>
                </div>

                {!mostrarPinInstructor ? (
                  <button
                    type="button"
                    onClick={() => setMostrarPinInstructor(true)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Ingresar al Panel del Instructor Fabio Enrique</span>
                  </button>
                ) : (
                  <div className="p-3 bg-white border border-slate-300 rounded-lg space-y-2">
                    <label className="block text-xs font-semibold text-gray-700">
                      PIN de acceso institucional (Código requerido: 91290):
                    </label>
                    <input
                      type="password"
                      placeholder="Ingrese PIN 91290"
                      value={pinInstructor}
                      onChange={(e) => setPinInstructor(e.target.value)}
                      className="w-full text-xs font-mono rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-slate-800"
                    />
                    {errorPin && <p className="text-[11px] text-red-600">{errorPin}</p>}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleIngresoInstructor}
                        className="flex-1 px-3 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-md"
                      >
                        Acceder al Panel
                      </button>
                      <button
                        type="button"
                        onClick={() => setMostrarPinInstructor(false)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-md"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Resumen pedagógico del flujo institucional */}
        <div className="mt-10 p-5 bg-white border border-gray-200 rounded-2xl shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
            Ruta Metodológica y Secuencia Formativa del Prototipo (SENA AA3)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
              <span className="inline-block w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold text-center leading-5 mb-1.5">
                1
              </span>
              <h5 className="font-bold text-gray-900">Diagnóstico Preliminar</h5>
              <p className="text-gray-600 mt-1">
                10 preguntas sobre el caso de la Mipyme <em>AndeTech S.A.S.</em> Umbral de aprobación del <strong>70%</strong>. Si no se realiza, la Guía 01 permanece bloqueada.
              </p>
            </div>
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl">
              <span className="inline-block w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold text-center leading-5 mb-1.5">
                2
              </span>
              <h5 className="font-bold text-gray-900">Plan Design Thinking & PDF</h5>
              <p className="text-gray-600 mt-1">
                Emisión de constancia para aprobados (≥70%), recomendaciones para todos y plan en 5 fases (Empatizar a Evaluar) exportable a PDF.
              </p>
            </div>
            <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
              <span className="inline-block w-5 h-5 rounded-full bg-amber-600 text-white text-[10px] font-bold text-center leading-5 mb-1.5">
                3
              </span>
              <h5 className="font-bold text-gray-900">Desbloqueo de la Guía 01</h5>
              <p className="text-gray-600 mt-1">
                Activación del botón de secuencia para acceder a la Planeación Pedagógica, Proyecto Formativo, Guía 01, Plan de Sesión y Rúbricas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Registro de Nuevo Aprendiz */}
      {modalRegistroAbierto && (
        <RegistroAprendizModal
          isOpen={modalRegistroAbierto}
          onClose={() => setModalRegistroAbierto(false)}
          onRegistrarYAcceder={(nuevo) => {
            onRegistrarAprendiz(nuevo);
          }}
        />
      )}
    </div>
  );
};
