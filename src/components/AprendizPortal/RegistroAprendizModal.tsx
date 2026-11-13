import React, { useState } from 'react';
import { Aprendiz } from '../../types';
import { UserPlus, ShieldCheck, X, Check, Mail, Phone, Building, MapPin } from 'lucide-react';

interface RegistroAprendizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrarYAcceder: (nuevoAprendiz: Aprendiz) => void;
}

export const RegistroAprendizModal: React.FC<RegistroAprendizModalProps> = ({
  isOpen,
  onClose,
  onRegistrarYAcceder,
}) => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState<'CC' | 'TI' | 'CE' | 'PEP'>('CC');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [ciudad, setCiudad] = useState('Bogotá D.C.');
  const [empresaProyecto, setEmpresaProyecto] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const docLimpio = numeroDocumento.trim().replace(/\./g, '');
    if (!nombres.trim() || !apellidos.trim() || !docLimpio || !correo.trim() || !celular.trim()) {
      setError('Por favor complete todos los campos obligatorios.');
      return;
    }

    const nuevoAprendiz: Aprendiz = {
      id: `apr-reg-${Date.now()}`,
      tipoDocumento,
      numeroDocumento: docLimpio,
      nombres: nombres.trim(),
      apellidos: apellidos.trim(),
      correo: correo.trim(),
      celular: celular.trim(),
      ciudad: ciudad.trim(),
      empresaProyecto: empresaProyecto.trim() || 'Unidad Productiva Independiente',
      haRealizadoDiagnostico: false,
    };

    onRegistrarYAcceder(nuevoAprendiz);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#39A900] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <UserPlus className="w-6 h-6" />
            <div>
              <h3 className="text-base font-bold">Registro de Nuevo Aprendiz</h3>
              <p className="text-xs text-emerald-100">Ficha 2874102 • Asistencia Administrativa V3</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white rounded-lg p-1 hover:bg-white/15 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confidentiality Notice */}
        <div className="bg-emerald-50/80 border-b border-emerald-100 px-6 py-2.5 text-xs text-emerald-950 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#39A900] shrink-0" />
          <span>
            Sus datos personales y número celular son <strong>estrictamente privados</strong> y confidenciales.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nombres *</label>
              <input
                type="text"
                required
                placeholder="Ej. Luisa Fernanda"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Apellidos *</label>
              <input
                type="text"
                required
                placeholder="Ej. Morales Castro"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tipo Doc. *</label>
              <select
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value as any)}
                className="w-full text-xs font-medium rounded-lg border border-gray-300 px-2 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              >
                <option value="CC">C.C.</option>
                <option value="TI">T.I.</option>
                <option value="CE">C.E.</option>
                <option value="PEP">PEP</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Número de Documento *</label>
              <input
                type="text"
                required
                placeholder="Ej. 1098234567"
                value={numeroDocumento}
                onChange={(e) => setNumeroDocumento(e.target.value)}
                className="w-full text-xs font-mono font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              Correo Electrónico (Misena / Personal) *
            </label>
            <input
              type="email"
              required
              placeholder="Ej. lmorales.castro@misena.edu.co"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                Número de Celular *
              </label>
              <input
                type="tel"
                required
                placeholder="Ej. 3156789012"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                className="w-full text-xs font-mono font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                Ciudad / Municipio
              </label>
              <input
                type="text"
                placeholder="Ej. Bogotá D.C."
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-gray-500" />
              Empresa / Unidad Productiva Vinculada (Proyecto Formativo)
            </label>
            <input
              type="text"
              placeholder="Ej. Inversiones Andinas S.A.S."
              value={empresaProyecto}
              onChange={(e) => setEmpresaProyecto(e.target.value)}
              className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#2d8500] rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Registrarse y Acceder a la Prueba</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
