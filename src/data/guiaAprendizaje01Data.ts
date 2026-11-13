import { ActividadGuia } from '../types';

export const PROYECTO_FORMATIVO = {
  codigo: '2874102-PF',
  nombre: 'Diseño e implementación de un modelo de gestión y soporte administrativo para el fortalecimiento de la productividad y sostenibilidad financiera en las Mipymes del departamento.',
  fase: 'Fase I: Análisis y Diagnóstico Organizacional',
  actividadProyecto: 'AP1: Diagnosticar la situación administrativa, contable y documental de la unidad productiva objeto de estudio mediante herramientas de razonamiento cuantitativo y análisis del entorno.',
  objetivoGeneral: 'Desarrollar soluciones integrales de asistencia administrativa basadas en el análisis cuantitativo de datos, optimización de recursos y diseño centrado en el usuario para mejorar la competitividad de las pequeñas y medianas empresas.',
  duracionTotalFase: '180 Horas',
};

export const PLANEACION_PEDAGOGICA = {
  competenciaCodigo: '240201528',
  competenciaNombre: 'Razonar cuantitativamente frente a situaciones susceptibles de ser abordadas de manera matemática en contextos laborales, sociales y personales.',
  resultadoAprendizaje: '240201528-01: Identificar situaciones problemáticas asociadas a sus necesidades de contexto aplicando procedimientos matemáticos.',
  duracionEstimada: '48 Horas (24 presenciales / 24 trabajo autónomo guiado)',
  estrategiasDidacticas: [
    'Aprendizaje Basado en Problemas (ABP) enfocado en microempresas de suministros y servicios.',
    'Método de Estudio de Casos empresariales con simulaciones contables y administrativas.',
    'Metodología Design Thinking para el diseño de planes de mejoramiento cuantitativo.',
    'Talleres de modelado matemático aplicado en hojas de cálculo (Microsoft Excel / Google Sheets).',
  ],
  ambientesAprendizaje: [
    'Ambiente de aprendizaje polivalente SENA con conectividad de alta velocidad.',
    'Sala de cómputo y ofimática dotada de suites de productividad y simuladores de negocios.',
    'Plataforma institucional LMS Zajuna / Territorium para recepción y trazabilidad de evidencias.',
  ],
  criteriosEvaluacion: [
    'Identifica con exactitud las variables cuantitativas presentes en una situación problema de origen administrativo.',
    'Aplica correctamente los algoritmos aritméticos de porcentajes, proporciones y equivalencias comerciales.',
    'Modela matemáticamente el punto de equilibrio y los costos operativos de una unidad de negocio.',
    'Formula soluciones cuantitativas coherentes fundamentadas en el rigor matemático y la toma de decisiones informada.',
  ],
};

export const GUIA_APRENDIZAJE_INFO = {
  numeroGuia: 'Guía de Aprendizaje No. 01',
  denominacion: 'Identificación y Formulación de Situaciones Problemáticas Mediante Razonamiento Cuantitativo en la Gestión Administrativa',
  instructorLider: 'Fabio Enrique Moreno',
  programaFormacion: 'Técnico en Asistencia Administrativa - Versión 3 (Código 134101)',
  centroFormacion: 'Centro de Gestión Administrativa - Regional Distrito Capital',
  introduccion: `Estimado(a) aprendiz:

En el dinámico mundo empresarial contemporáneo, el asistente administrativo ha dejado de ser un mero ejecutor de tareas rutinarias para convertirse en un actor estratégico indispensable en la recopilación, procesamiento y análisis de información operativa y financiera.

Cada decisión en una organización —desde la compra de resmas de papel, el cálculo de las horas extras de los colaboradores, el control minucioso de la caja menor, hasta el cálculo del punto de equilibrio de un nuevo producto— requiere un sólido dominio del razonamiento cuantitativo. La matemática no es un conjunto de fórmulas abstractas, sino el lenguaje de la eficiencia, la precisión y la toma de decisiones acertadas.

Esta Guía de Aprendizaje No. 01 le permitirá desarrollar las destrezas necesarias para diagnosticar, modelar y resolver problemáticas del entorno empresarial real, integrando el pensamiento analítico con la creatividad del Design Thinking. Lo invitamos a asumir este reto con compromiso, rigor y entusiasmo por aprender.`,
};

export const ACTIVIDADES_GUIA: ActividadGuia[] = [
  {
    id: 'act-01',
    codigo: '3.1',
    nombre: 'Actividad de Reflexión Inicial: El impacto del error numérico en la administración',
    tipo: 'Reflexión Inicial',
    descripcion: 'Análisis individual del caso: "¿Qué consecuencias legales, financieras y operativas genera una factura con un error del 2% en el cálculo de impuestos para una Mipyme?". Participación en el foro reflexivo institucional y redacción de una postura crítica de 2 páginas.',
    horasEstimadas: 6,
    criterioEvaluacion: 'Reconoce la importancia del razonamiento cuantitativo en la ética y precisión del ejercicio administrativo.',
    formaEntrega: 'Documento en PDF subido al foro temático del LMS Zajuna.',
    fechaLimite: 'Semana 1 - Viernes 18:00',
    instrumentoEvaluacion: 'Rúbrica de participación y argumentación reflexiva.',
    estadoEntrega: 'Pendiente',
  },
  {
    id: 'act-02',
    codigo: '3.2',
    nombre: 'Actividad de Contextualización: Mapa de variables cuantitativas en la oficina moderna',
    tipo: 'Contextualización',
    descripcion: 'Diseño colaborativo (equipos de 3 aprendices) de un mapa conceptual y cuadro comparativo que identifique las 10 principales magnitudes matemáticas presentes en la gestión documental, compras, tesorería y talento humano.',
    horasEstimadas: 10,
    criterioEvaluacion: 'Clasifica variables discretas, continuas, razones, proporciones y tasas de variación en contextos administrativos.',
    formaEntrega: 'Enlace a infografía digital interactiva (Canva/Genially) o PDF en Zajuna.',
    fechaLimite: 'Semana 2 - Miércoles 23:59',
    instrumentoEvaluacion: 'Lista de chequeo de contenidos conceptuales.',
    estadoEntrega: 'Pendiente',
  },
  {
    id: 'act-03',
    codigo: '3.3',
    nombre: 'Actividad de Apropiación: Taller de algoritmos matemáticos y hoja de cálculo',
    tipo: 'Apropiación',
    descripcion: 'Desarrollo del taller de 15 ejercicios prácticos que comprende: encadenamiento de descuentos e IVA, cálculo de punto de equilibrio contable, liquidación de nómina con recargos según el Código Sustantivo del Trabajo colombiano y regla de Pareto 80/20. Cada ejercicio debe ser resuelto manualmente y luego parametrizado en Microsoft Excel con fórmulas.',
    horasEstimadas: 18,
    criterioEvaluacion: 'Aplica algoritmos matemáticos en herramientas ofimáticas demostrando consistencia numérica y uso adecuado de referencias relativas y absolutas.',
    formaEntrega: 'Libro de Excel (.xlsx) con fórmulas dinámicas y hojas rotuladas por temática.',
    fechaLimite: 'Semana 3 - Domingo 23:59',
    instrumentoEvaluacion: 'Rúbrica analítica de desempeño técnico en hoja de cálculo.',
    estadoEntrega: 'Pendiente',
  },
  {
    id: 'act-04',
    codigo: '3.4',
    nombre: 'Actividad de Transferencia: Solución integral del caso "AndeTech S.A.S." con Design Thinking',
    tipo: 'Transferencia',
    descripcion: 'Aplicación integral de las 5 fases de Design Thinking para optimizar los procesos de compras, inventario y facturación de la empresa AndeTech S.A.S. Presentación de un informe ejecutivo en formato informe técnico SENA, acompañado de una plantilla prototipo en Excel lista para ser implementada en la empresa.',
    horasEstimadas: 14,
    criterioEvaluacion: 'Modela y propone soluciones pertinentes a situaciones problemáticas contextualizadas sustentando su viabilidad económica y operativa.',
    formaEntrega: 'Carpeta comprimida (.zip) que contenga informe técnico en PDF + prototipo funcional en Excel.',
    fechaLimite: 'Semana 4 - Jueves 18:00',
    instrumentoEvaluacion: 'Lista de verificación de producto final y sustentación oral/virtual.',
    estadoEntrega: 'Pendiente',
  },
];

export const PLAN_DE_SESION = [
  {
    sesion: 1,
    semana: 'Semana 1',
    tema: 'Inducción al Razonamiento Cuantitativo, Diagnóstico Preliminar y Fundamentos de Aritmética Comercial',
    horas: 12,
    momentos: {
      apertura: 'Presentación del RAP 01 por el instructor Fabio Enrique Moreno, aplicación de la prueba diagnóstica y socialización del estudio de caso empresarial AndeTech S.A.S.',
      desarrollo: 'Taller presencial guiado sobre porcentajes, bases gravables, IVA del 19%, retenciones básicas y descuentos comerciales encadenados.',
      cierre: 'Emisión del reporte diagnóstico preliminar, asignación del plan Design Thinking inicial y apertura de la Guía 01.',
    },
    evidenciaAsociada: 'Resultado de la Prueba Diagnóstica + Actividad 3.1 (Reflexión Inicial)',
  },
  {
    sesion: 2,
    semana: 'Semana 2',
    tema: 'Costos Administrativos, Punto de Equilibrio y Manejo de Fondos de Caja Menor',
    horas: 12,
    momentos: {
      apertura: 'Retroalimentación de la reflexión inicial. Análisis de casos reales de desbalance financiero en pequeñas empresas.',
      desarrollo: 'Modelado matemático de costos fijos, costos variables y formulación de la ecuación de equilibrio. Metodología de arqueo de caja menor y conciliación de sobrantes/faltantes.',
      cierre: 'Laboratorio de Excel para automatizar arqueos de caja con validación de datos.',
    },
    evidenciaAsociada: 'Actividad 3.2 (Contextualización) + Avance Taller de Apropiación',
  },
  {
    sesion: 3,
    semana: 'Semana 3',
    tema: 'Nómina Operativa, Horas Extras, Recargos Laborales y Estadística Descriptiva (Pareto)',
    horas: 12,
    momentos: {
      apertura: 'Estudio de la legislación laboral colombiana vigente sobre jornada laboral y horas ordinarias/extras.',
      desarrollo: 'Liquidación matemática de factores: horas extras diurnas (1.25), nocturnas (1.75), dominicales y festivas. Construcción de tablas de frecuencia y diagrama de Pareto 80/20.',
      cierre: 'Ejercicios de priorización de quejas de clientes y resolución de dudas para entrega del taller.',
    },
    evidenciaAsociada: 'Actividad 3.3 (Taller de Apropiación en Excel)',
  },
  {
    sesion: 4,
    semana: 'Semana 4',
    tema: 'Integración Metodológica con Design Thinking, Sustentación de Prototipos y Cierre Evaluativo',
    horas: 12,
    momentos: {
      apertura: 'Revisión de las fases Prototipar y Evaluar de los planes de acción de los aprendices.',
      desarrollo: 'Sustentación en mesas de trabajo de los prototipos en Excel diseñados para AndeTech S.A.S. y su aplicación en las empresas del proyecto formativo.',
      cierre: 'Emisión de juicios evaluativos SENA (Aprobado / No Aprobado) en Sofía Plus / Zajuna y retroalimentación personalizada por el instructor Fabio Enrique Moreno.',
    },
    evidenciaAsociada: 'Actividad 3.4 (Transferencia: Solución AndeTech S.A.S. con Design Thinking)',
  },
];

export const FORMAS_DE_ENTREGA = {
  plataformaOficial: 'LMS Zajuna SENA (Enlace oficial de la Ficha 2874102)',
  correoInstructor: 'fabio.moreno@sena.edu.co',
  asuntoRequerido: '[AA3-FICHA 2874102] Entrega Evidencia [Código] - [Nombre Aprendiz]',
  formatosPermitidos: [
    'Documentos de informe técnico: Formato PDF (.pdf) con portada institucional SENA y normas APA 7ma edición.',
    'Modelos matemáticos: Libros de cálculo de Microsoft Excel (.xlsx) con fórmulas nativas auditables.',
    'Entregas múltiples: Archivo comprimido (.zip) no superior a 25 MB.',
  ],
  politicaPuntualidad: 'Las evidencias entregadas dentro del cronograma recibirán retroalimentación formativa en un plazo máximo de 48 horas hábiles. Las evidencias extemporáneas deberán ser sustentadas mediante plan de concertación con el instructor Fabio Enrique Moreno.',
};

export const MODO_EVALUACION = {
  escalaEvaluativaSena: 'Cualitativa: APROBADO (A) o NO APROBADO (D - Deficiente)',
  porcentajeMinimoAprobacion: '70% de cumplimiento en criterios técnicos, conceptuales y actitudinales.',
  componentesCalificacion: [
    { componente: 'Evaluación Diagnóstica Preliminar (Punto de Partida)', peso: '15%', descripcion: 'Identificación inicial del nivel del aprendiz y formulación de plan de acción.' },
    { componente: 'Evidencias de Conocimiento (Talleres y Cuestionarios)', peso: '30%', descripcion: 'Apropiación de conceptos de porcentajes, costos, nómina y estadística.' },
    { componente: 'Evidencias de Desempeño (Laboratorios en Excel y ABP)', peso: '25%', descripcion: 'Manejo procedimental de hojas de cálculo y formulación matemática autónoma.' },
    { componente: 'Evidencia de Producto (Caso AndeTech + Design Thinking)', peso: '30%', descripcion: 'Prototipo aplicado y sustentación de la solución integral para la Mipyme.' },
  ],
  planDeMejoramiento: 'Aquel aprendiz que obtenga un juicio preliminar de NO APROBADO (D) en cualquiera de las fases tendrá derecho a concertar un Plan de Mejoramiento Pedagógico con el instructor Fabio Enrique Moreno, consistente en la reelaboración de evidencias con tutoría personalizada dentro de los 5 días hábiles siguientes.',
};
