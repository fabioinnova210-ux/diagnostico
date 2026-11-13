import React from 'react';
import { Aprendiz } from '../types';
import { INSTRUCTOR_DATOS } from '../data/aprendicesData';
import { BookOpen, GraduationCap, ShieldCheck, UserCheck, ArrowLeftRight, Award } from 'lucide-react';

interface NavbarProps {
  rolActual: 'aprendiz' | 'instructor' | null;
  aprendizActivo: Aprendiz | null;
  onCambiarRol: () => void;
  onCerrarSesion: () => void;
  vistaActiva: 'selector' | 'diagnostico' | 'resultado' | 'guia' | 'instructor';
  onNavegarVista?: (vista: 'diagnostico' | 'resultado' | 'guia' | 'instructor') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  rolActual,
  aprendizActivo,
  onCambiarRol,
  onCerrarSesion,
  vistaActiva,
  onNavegarVista,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-emerald-700/20 shadow-xs">
      {/* Top institutional strip */}
      <div className="bg-[#39A900] text-white px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider">SENA</span>
            <span className="opacity-80">|</span>
            <span>Regional Distrito Capital • Centro de Gestión Administrativa</span>
            <span className="hidden md:inline opacity-80">•</span>
            <span className="hidden md:inline font-semibold">Ficha 2874102</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] opacity-95">
            <span className="bg-emerald-800/50 px-2 py-0.5 rounded-sm">Asistencia Administrativa V3</span>
            <span className="hidden sm:inline">RAP 01 - Razonamiento Cuantitativo</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-xs overflow-hidden p-1">
            <img
              src="data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e"
              alt="SENA Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Sistema de Evaluación Diagnóstica & Secuencia RAP 01
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                Prototipo Oficial
              </span>
            </div>
            <p className="text-xs text-gray-500 hidden sm:block">
              Programa Técnico en Asistencia Administrativa - Versión 3
            </p>
          </div>
        </div>

        {/* Right side: User information & Role actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {rolActual === 'instructor' && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 text-left">
              <div className="w-7 h-7 rounded-full bg-[#39A900] text-white flex items-center justify-center text-xs font-bold">
                FE
              </div>
              <div className="text-xs">
                <p className="font-semibold text-gray-900 leading-none">{INSTRUCTOR_DATOS.nombreCompleto}</p>
                <p className="text-[10px] text-emerald-700 font-medium">Instructor Líder de Formación</p>
              </div>
            </div>
          )}

          {rolActual === 'aprendiz' && aprendizActivo && (
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-left">
              <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
                {aprendizActivo.nombres.charAt(0)}
                {aprendizActivo.apellidos.charAt(0)}
              </div>
              <div className="text-xs max-w-[140px] sm:max-w-none truncate">
                <p className="font-semibold text-gray-900 leading-none truncate">
                  {aprendizActivo.nombres} {aprendizActivo.apellidos}
                </p>
                <p className="text-[10px] text-gray-500 font-mono">
                  {aprendizActivo.tipoDocumento} {aprendizActivo.numeroDocumento}
                </p>
              </div>
              {aprendizActivo.haRealizadoDiagnostico && (
                <span
                  className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    aprendizActivo.aprobado
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {aprendizActivo.aprobado ? 'Aprobado (>=70%)' : 'Refuerzo (<70%)'}
                </span>
              )}
            </div>
          )}

          {/* Navigation quick links for Aprendiz if available */}
          {rolActual === 'aprendiz' && aprendizActivo && onNavegarVista && (
            <div className="hidden lg:flex items-center gap-1 border-l border-gray-200 pl-3">
              <button
                onClick={() => onNavegarVista(aprendizActivo.haRealizadoDiagnostico ? 'resultado' : 'diagnostico')}
                className={`text-xs px-2.5 py-1.5 rounded-md font-medium transition-colors ${
                  vistaActiva === 'diagnostico' || vistaActiva === 'resultado'
                    ? 'bg-emerald-100 text-emerald-900 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Prueba Diagnóstica
              </button>
              <button
                onClick={() => {
                  if (aprendizActivo.haRealizadoDiagnostico) {
                    onNavegarVista('guia');
                  }
                }}
                disabled={!aprendizActivo.haRealizadoDiagnostico}
                className={`text-xs px-2.5 py-1.5 rounded-md font-medium flex items-center gap-1 transition-colors ${
                  vistaActiva === 'guia'
                    ? 'bg-emerald-100 text-emerald-900 font-semibold'
                    : aprendizActivo.haRealizadoDiagnostico
                    ? 'text-gray-600 hover:bg-gray-100'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
                title={
                  aprendizActivo.haRealizadoDiagnostico
                    ? 'Ver Guía de Aprendizaje 01'
                    : 'Bloqueado: Debe realizar la prueba diagnóstica para acceder'
                }
              >
                <BookOpen className="w-3.5 h-3.5" />
                Guía 01 (RAP 01)
                {!aprendizActivo.haRealizadoDiagnostico && (
                  <span className="text-[9px] bg-gray-200 text-gray-600 px-1 rounded">Bloqueada</span>
                )}
              </button>
            </div>
          )}

          {/* Role switcher button */}
          {rolActual && (
            <button
              onClick={onCambiarRol}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors cursor-pointer"
              title="Cambiar entre rol de Aprendiz e Instructor Fabio Enrique Moreno"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#39A900]" />
              <span className="hidden sm:inline">Cambiar Rol</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
