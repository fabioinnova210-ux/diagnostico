import React, { useState, useEffect } from 'react';
import { Aprendiz, EvaluacionResultado, NotificacionReporteInstructor } from './types';
import {
  getAprendicesList,
  saveAprendiz,
  INSTRUCTOR_DATOS,
} from './data/aprendicesData';
import { generarResultadoDiagnostico } from './utils/designThinkingPlan';
import {
  getNotificacionesInstructor,
  marcarNotificacionesLeidas,
  obtenerRespuestasCoherentes,
  registrarEnvioReporteInstructor,
} from './utils/reporteGeneralInstructor';
import { Navbar } from './components/Navbar';
import { RoleSelector } from './components/RoleSelector';
import { CuestionarioDiagnostico } from './components/AprendizPortal/CuestionarioDiagnostico';
import { ResultadoDiagnostico } from './components/AprendizPortal/ResultadoDiagnostico';
import { GuiaAprendizajeView } from './components/AprendizPortal/GuiaAprendizajeView';
import { AprendizProfileModal } from './components/AprendizPortal/AprendizProfileModal';
import { InstructorDashboard } from './components/InstructorPortal/InstructorDashboard';

export default function App() {
  const [aprendices, setAprendices] = useState<Aprendiz[]>([]);
  const [rolActual, setRolActual] = useState<'aprendiz' | 'instructor' | null>(null);
  const [aprendizActivo, setAprendizActivo] = useState<Aprendiz | null>(null);
  const [vistaActiva, setVistaActiva] = useState<
    'selector' | 'diagnostico' | 'resultado' | 'guia' | 'instructor'
  >('selector');
  const [resultadoActual, setResultadoActual] = useState<EvaluacionResultado | null>(null);
  const [modalPerfilAbierto, setModalPerfilAbierto] = useState(false);
  const [notificacionesInstructor, setNotificacionesInstructor] = useState<
    NotificacionReporteInstructor[]
  >([]);

  // Cargar aprendices y notificaciones de reporte desde almacenamiento local
  useEffect(() => {
    const list = getAprendicesList();
    setAprendices(list);
    setNotificacionesInstructor(getNotificacionesInstructor());
  }, []);

  // Al seleccionar un aprendiz desde el selector de roles
  const handleSeleccionarAprendiz = (aprendiz: Aprendiz) => {
    setAprendizActivo(aprendiz);
    setRolActual('aprendiz');

    if (aprendiz.haRealizadoDiagnostico) {
      // Reconstruir su resultado previo de forma coherente
      const respuestas = obtenerRespuestasCoherentes(aprendiz);
      const res = generarResultadoDiagnostico(aprendiz.id, respuestas);
      res.aciertos = aprendiz.puntajeDiagnostico ?? res.aciertos;
      res.porcentaje = aprendiz.porcentajeDiagnostico ?? res.porcentaje;
      res.aprobado = aprendiz.aprobado ?? res.aprobado;
      setResultadoActual(res);
      setVistaActiva('resultado');
    } else {
      setResultadoActual(null);
      setVistaActiva('diagnostico');
    }
  };

  // Al seleccionar el rol de instructor Fabio Enrique Moreno
  const handleSeleccionarInstructor = () => {
    setRolActual('instructor');
    setVistaActiva('instructor');
  };

  // Cambiar rol y volver a la pantalla de selección
  const handleCambiarRol = () => {
    setRolActual(null);
    setVistaActiva('selector');
  };

  // Actualizar datos del aprendiz (por él mismo o por el instructor)
  const handleActualizarAprendiz = (aprendizActualizado: Aprendiz) => {
    const updatedList = saveAprendiz(aprendizActualizado);
    setAprendices(updatedList);
    if (aprendizActivo && aprendizActivo.id === aprendizActualizado.id) {
      setAprendizActivo(aprendizActualizado);
    }
  };

  // Finalizar cuestionario diagnóstico y enviar reporte general actualizado al instructor
  const handleFinalizarDiagnostico = (
    resultado: EvaluacionResultado,
    aprendizActualizado: Aprendiz
  ) => {
    handleActualizarAprendiz(aprendizActualizado);

    const nuevasNotif = registrarEnvioReporteInstructor({
      id: `rep-${Date.now()}`,
      aprendizNombre: `${aprendizActualizado.nombres} ${aprendizActualizado.apellidos}`,
      porcentaje: resultado.porcentaje,
      semaforo: resultado.semaforo,
      estiloIdentificado: resultado.estiloAprendizaje.nombre,
      fechaEnvio: resultado.fecha,
      leido: false,
    });
    setNotificacionesInstructor(nuevasNotif);

    setResultadoActual(resultado);
    setVistaActiva('resultado');
  };

  const handleMarcarNotificacionesLeidas = () => {
    setNotificacionesInstructor(marcarNotificacionesLeidas());
  };

  // Seguir la secuencia del RAP 01 (desbloqueo de Guía de Aprendizaje 01)
  const handleContinuarSecuenciaRap01 = () => {
    setVistaActiva('guia');
  };

  // Simular la vista como un aprendiz específico desde el panel del instructor
  const handleSimularAprendiz = (aprendiz: Aprendiz) => {
    handleSeleccionarAprendiz(aprendiz);
  };

  // Navegación rápida entre vistas para el aprendiz
  const handleNavegarVista = (vista: 'diagnostico' | 'resultado' | 'guia' | 'instructor') => {
    if (vista === 'diagnostico' && aprendizActivo?.haRealizadoDiagnostico) {
      setVistaActiva('resultado');
    } else {
      setVistaActiva(vista);
    }
  };

  // Registrar un nuevo aprendiz con sus datos personales y acceder a la prueba
  const handleRegistrarAprendiz = (nuevoAprendiz: Aprendiz) => {
    const updatedList = saveAprendiz(nuevoAprendiz);
    setAprendices(updatedList);
    handleSeleccionarAprendiz(nuevoAprendiz);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans selection:bg-[#39A900] selection:text-white">
      {/* Barra de Navegación Institucional SENA */}
      <Navbar
        rolActual={rolActual}
        aprendizActivo={aprendizActivo}
        onCambiarRol={handleCambiarRol}
        onCerrarSesion={handleCambiarRol}
        vistaActiva={vistaActiva}
        onNavegarVista={handleNavegarVista}
      />

      {/* Contenido Dinámico según la vista activa */}
      <main className="flex-1">
        {vistaActiva === 'selector' && (
          <RoleSelector
            aprendices={aprendices}
            onSeleccionarAprendiz={handleSeleccionarAprendiz}
            onSeleccionarInstructor={handleSeleccionarInstructor}
            onActualizarAprendiz={handleActualizarAprendiz}
            onRegistrarAprendiz={handleRegistrarAprendiz}
          />
        )}

        {vistaActiva === 'diagnostico' && aprendizActivo && (
          <CuestionarioDiagnostico
            aprendiz={aprendizActivo}
            onFinalizar={handleFinalizarDiagnostico}
            onAbrirPerfil={() => setModalPerfilAbierto(true)}
          />
        )}

        {vistaActiva === 'resultado' && aprendizActivo && resultadoActual && (
          <ResultadoDiagnostico
            aprendiz={aprendizActivo}
            resultado={resultadoActual}
            onContinuarSecuenciaRap01={handleContinuarSecuenciaRap01}
          />
        )}

        {vistaActiva === 'guia' && aprendizActivo && (
          <GuiaAprendizajeView
            aprendiz={aprendizActivo}
            onVolverADiagnostico={() => setVistaActiva('diagnostico')}
          />
        )}

        {vistaActiva === 'instructor' && (
          <InstructorDashboard
            aprendices={aprendices}
            notificaciones={notificacionesInstructor}
            onMarcarNotificacionesLeidas={handleMarcarNotificacionesLeidas}
            onActualizarAprendiz={handleActualizarAprendiz}
            onSimularAprendiz={handleSimularAprendiz}
            onVerGuiaPedagogica={() => {
              if (aprendices.length > 0) {
                // Utilizar un aprendiz modelo para la vista de la guía
                const modelo = aprendices.find((a) => a.haRealizadoDiagnostico) || aprendices[0];
                setAprendizActivo(modelo);
                setVistaActiva('guia');
              }
            }}
          />
        )}
      </main>

      {/* Modal de visualización y edición de datos personales del aprendiz */}
      {modalPerfilAbierto && aprendizActivo && (
        <AprendizProfileModal
          aprendiz={aprendizActivo}
          isOpen={modalPerfilAbierto}
          onClose={() => setModalPerfilAbierto(false)}
          onGuardar={handleActualizarAprendiz}
        />
      )}

      {/* Pie de página institucional */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 text-xs text-gray-500 text-center space-y-1">
        <p className="font-semibold text-gray-700">
          Servicio Nacional de Aprendizaje - SENA • Regional Distrito Capital
        </p>
        <p>
          Centro de Gestión Administrativa • Programa Técnico en Asistencia Administrativa (Versión 3) • Ficha 2874102
        </p>
        <p className="text-[11px] text-gray-400">
          Instructor Líder Técnico: {INSTRUCTOR_DATOS.nombreCompleto} ({INSTRUCTOR_DATOS.correo})
        </p>
      </footer>
    </div>
  );
}
