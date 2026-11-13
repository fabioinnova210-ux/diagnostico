export interface Aprendiz {
  id: string;
  tipoDocumento: 'CC' | 'TI' | 'CE' | 'PEP';
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  correo: string;
  celular: string;
  ciudad: string;
  empresaProyecto?: string;
  haRealizadoDiagnostico: boolean;
  puntajeDiagnostico?: number; // 0 a 10
  porcentajeDiagnostico?: number; // 0 a 100
  aprobado?: boolean; // >= 70%
  fechaRealizacion?: string;
  respuestasAprendiz?: Record<number, number>; // questionId -> selectedOptionIndex
  intentos?: number;
  retroalimentacionInstructor?: string;
}

export interface OpcionRespuesta {
  id: number;
  texto: string;
  esCorrecta: boolean;
  explicacion: string;
}

export interface PreguntaDiagnostica {
  id: number;
  categoria: 'Aritmética y Porcentajes' | 'Costos y Presupuestos' | 'Nómina y Horas Extras' | 'Inventarios y Logística' | 'Estadística Administrativa';
  titulo: string;
  contextoCaso: string;
  enunciado: string;
  datosClave: { etiqueta: string; valor: string }[];
  opciones: OpcionRespuesta[];
  procedimientoPasoAPaso: string[];
  competenciaRelacionada: string;
  dificultad: 'Básica' | 'Intermedia' | 'Avanzada';
}

export interface FaseDesignThinking {
  fase: '1. Empatizar' | '2. Definir' | '3. Idear' | '4. Prototipar' | '5. Evaluar';
  objetivo: string;
  accionesSugeridas: string[];
  herramientas: string[];
  evidenciaEsperada: string;
}

export interface PlanAccionDesignThinking {
  diagnosticoGeneral: string;
  nivelAlcanzado: 'Sobresaliente' | 'Aceptable' | 'Básico' | 'En Refuerzo Inicial';
  fases: FaseDesignThinking[];
  compromisosAprendiz: string[];
  acompanamientoInstructor: string;
  fechaEmision: string;
}

export interface EvaluacionResultado {
  aprendizId: string;
  totalPreguntas: number;
  aciertos: number;
  porcentaje: number;
  aprobado: boolean;
  fecha: string;
  respuestas: Record<number, number>;
  semaforo: 'verde' | 'amarillo' | 'rojo';
  fortalecimientoPersonal: string[];
  estiloAprendizaje: {
    nombre: string;
    descripcion: string;
    estrategias: string[];
  };
  desgloseCategorias: {
    categoria: string;
    total: number;
    aciertos: number;
    porcentaje: number;
  }[];
  recomendacionesMejora: string[];
  planDesignThinking: PlanAccionDesignThinking;
  codigoVerificacion: string;
}

export interface ActividadGuia {
  id: string;
  codigo: string;
  nombre: string;
  tipo: 'Reflexión Inicial' | 'Contextualización' | 'Apropiación' | 'Transferencia';
  descripcion: string;
  horasEstimadas: number;
  criterioEvaluacion: string;
  formaEntrega: string;
  fechaLimite: string;
  instrumentoEvaluacion: string;
  estadoEntrega?: 'Pendiente' | 'Entregado' | 'Calificado';
}

export interface EvidenciaEntrega {
  id: string;
  actividadId: string;
  aprendizId: string;
  aprendizNombre: string;
  fechaEnvio: string;
  archivoNombre: string;
  comentarioAprendiz: string;
  calificacion?: 'Aprobado' | 'No Aprobado' | 'Pendiente';
  observacionInstructor?: string;
}

export interface PrioridadFortalecimientoGrupal {
  ordenPrioridad: number;
  nivelUrgencia: 'Prioridad Crítica (Alta)' | 'Prioridad Media' | 'Prioridad de Consolidación (Baja)';
  categoria: string;
  actividadFortalecimiento: string;
  descripcionOperativa: string;
  aprendicesConDificultad: number;
  totalEvaluados: number;
  porcentajeBrecha: number;
  porcentajeDominio: number;
  preguntasAsociadas: string[];
  tiempoSugeridoHoras: number;
}

export interface EstrategiaEstiloAprendizajeGrupal {
  estilo: string;
  descripcionEstilo: string;
  cantidadAprendices: number;
  porcentajeGrupo: number;
  semaforoAsociado: 'rojo' | 'amarillo' | 'verde';
  estrategiaPedagogicaSena: string;
  tecnicaDidacticaActiva: string;
  fundamentacionTecnica: string;
  actividadesEnAmbiente: string[];
  recursosDidacticos: string[];
}

export interface ItemPlanificacionPedagogica {
  prioridad: number;
  faseCurricular: string;
  actividadAprendizaje: string;
  estiloObjetivo: string;
  estrategiaSena: string;
  tecnicaDidacticaActiva: string;
  duracionHoras: number;
  ambienteYRecursos: string;
  criterioEvaluacion: string;
  evidenciaYProducto: string;
  instrumentoEvaluacion: string;
}

export interface ReporteGeneralInstructor {
  fechaGeneracion: string;
  ficha: string;
  programa: string;
  instructor: string;
  competencia: string;
  resultadoAprendizaje: string;
  totalAprendicesFicha: number;
  totalEvaluados: number;
  pendientesPorEvaluar: number;
  promedioGrupalPorcentaje: number;
  distribucionSemaforo: {
    verde: number;
    amarillo: number;
    rojo: number;
  };
  prioridadesFortalecimiento: PrioridadFortalecimientoGrupal[];
  estrategiasPorEstilo: EstrategiaEstiloAprendizajeGrupal[];
  planificacionPedagogica: ItemPlanificacionPedagogica[];
}

export interface NotificacionReporteInstructor {
  id: string;
  aprendizNombre: string;
  porcentaje: number;
  semaforo: 'verde' | 'amarillo' | 'rojo';
  estiloIdentificado: string;
  fechaEnvio: string;
  leido: boolean;
}

