import React, { useState } from 'react';
import { Aprendiz } from '../../types';
import { ShieldCheck, User, Mail, Phone, Building, MapPin, X, Check } from 'lucide-react';

interface AprendizProfileModalProps {
  aprendiz: Aprendiz;
  isOpen: boolean;
  onClose: () => void;
  onGuardar: (aprendizActualizado: Aprendiz) => void;
}

export const AprendizProfileModal: React.FC<AprendizProfileModalProps> = ({
  aprendiz,
  isOpen,
  onClose,
  onGuardar,
}) => {
  const [formData, setFormData] = useState<Aprendiz>({ ...aprendiz });
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(formData);
    setGuardadoExitoso(true);
    setTimeout(() => {
      setGuardadoExitoso(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#39A900] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6" />
            <div>
              <h3 className="text-base font-bold">Datos Personales del Aprendiz</h3>
              <p className="text-xs text-emerald-100">Información privada y confidencial SENA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white rounded-lg p-1 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security guarantee notice */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-6 py-2.5 text-xs text-emerald-900 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse shrink-0" />
          <span>
            Sus datos personales y número celular <strong>no son visibles para los demás aprendices</strong>.
          </span>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nombres</label>
              <input
                type="text"
                required
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Apellidos</label>
              <input
                type="text"
                required
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tipo Doc.</label>
              <select
                value={formData.tipoDocumento}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tipoDocumento: e.target.value as 'CC' | 'TI' | 'CE' | 'PEP',
                  })
                }
                className="w-full text-xs font-medium rounded-lg border border-gray-300 px-2 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              >
                <option value="CC">C.C.</option>
                <option value="TI">T.I.</option>
                <option value="CE">C.E.</option>
                <option value="PEP">PEP</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Número Documento</label>
              <input
                type="text"
                required
                value={formData.numeroDocumento}
                onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
                className="w-full text-xs font-mono font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-500" />
              Correo Electrónico (Institucional o Personal)
            </label>
            <input
              type="email"
              required
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                Número de Celular
              </label>
              <input
                type="tel"
                required
                value={formData.celular}
                onChange={(e) => setFormData({ ...formData, celular: e.target.value })}
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
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-gray-500" />
              Empresa / Unidad Productiva Vinculada al Proyecto
            </label>
            <input
              type="text"
              placeholder="Ej. Distribuidora del Norte S.A.S."
              value={formData.empresaProyecto || ''}
              onChange={(e) => setFormData({ ...formData, empresaProyecto: e.target.value })}
              className="w-full text-xs font-medium rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-[#39A900]"
            />
          </div>

          {guardadoExitoso && (
            <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-lg text-xs text-emerald-800 font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Datos personales actualizados correctamente con reserva confidencial.</span>
            </div>
          )}

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
              <span>Guardar Información</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
