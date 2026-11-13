import {
  Aprendiz,
  EstrategiaEstiloAprendizajeGrupal,
  ItemPlanificacionPedagogica,
  NotificacionReporteInstructor,
  PrioridadFortalecimientoGrupal,
  ReporteGeneralInstructor,
} from '../types';
import { INSTRUCTOR_DATOS } from '../data/aprendicesData';
import { PREGUNTAS_DIAGNOSTICAS } from '../data/preguntasDiagnosticas';

const STORAGE_KEY_NOTIFICACIONES_INSTRUCTOR = 'sena_notificaciones_reporte_instructor_v1';

/**
 * Para aprendices precargados que ya tenían un puntaje asignado pero no el mapa de respuestas,
 * reconstruye de forma determinística un vector de respuestas coherente con su puntaje exacto,
 * priorizando fallos típicos en áreas complejas (Costos, Estadística, Inventarios) para el análisis grupal.
 */
export function obtenerRespuestasCoherentes(aprendiz: Aprendiz): Record<number, number> {
  if (aprendiz.respuestasAprendiz && Object.keys(aprendiz.respuestasAprendiz).length > 0) {
    return aprendiz.respuestasAprendiz;
  }

  const puntajeObjetivo = aprendiz.puntajeDiagnostico ?? 0;
  // Orden de dificultad típico para simular qué preguntas acertaron/fallaron según su puntaje
  // Primero se suelen acertar básicas (1, 4, 5, 7) y fallar avanzadas/intermedias (9, 3, 8, 10, 6, 2)
  const ordenAciertosTipico = [1, 4, 5, 7, 2, 6, 10, 8, 3, 9];

  // Pequeña variación determinística por ID del aprendiz para realismo grupal
  const seed = aprendiz.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const preguntasOrdenadas = [...ordenAciertosTipico];
  if (seed % 3 === 0 && preguntasOrdenadas.length >= 9) {
    // Intercambiar ligeramente orden entre categorías intermedias
    [preguntasOrdenadas[4], preguntasOrdenadas[7]] = [preguntasOrdenadas[7], preguntasOrdenadas[4]];
  } else if (seed % 3 === 1 && preguntasOrdenadas.length >= 10) {
    [preguntasOrdenadas[5], preguntasOrdenadas[8]] = [preguntasOrdenadas[8], preguntasOrdenadas[5]];
  }

  const idsAcertados = new Set(preguntasOrdenadas.slice(0, puntajeObjetivo));
  const respuestas: Record<number, number> = {};

  PREGUNTAS_DIAGNOSTICAS.forEach((p) => {
    const opcionCorrecta = p.opciones.find((o) => o.esCorrecta);
    const opcionIncorrecta = p.opciones.find((o) => !o.esCorrecta);
    if (idsAcertados.has(p.id)) {
      respuestas[p.id] = opcionCorrecta ? opcionCorrecta.id : 0;
    } else {
      respuestas[p.id] = opcionIncorrecta ? opcionIncorrecta.id : 0;
    }
  });

  return respuestas;
}

const CATALOGO_FORTALECIMIENTO_POR_CATEGORIA: Record<
  string,
  {
    actividad: string;
    descripcion: string;
    faseCurricular: string;
    criterioEvaluacion: string;
    evidencia: string;
    instrumento: string;
    ambiente: string;
  }
> = {
  'Costos y Presupuestos': {
    actividad: 'Taller Práctico de Punto de Equilibrio, Costeo Administrativo y Arqueo de Caja Menor',
    descripcion:
      'Nivelación intensiva en clasificación de costos fijos vs. variables, cálculo del margen de contribución, reparto proporcional presupuestal y conciliación de fondos de caja menor en Mipymes.',
    faseCurricular: 'Apropiación y Transferencia del Conocimiento (RAP 01)',
    criterioEvaluacion:
      'Modela matemáticamente el punto de equilibrio y concilia arqueos de caja menor identificando desviaciones porcentuales.',
    evidencia: 'Simulador parametrizado en Excel de Punto de Equilibrio y Acta de Arqueo de Caja Menor.',
    instrumento: 'Rúbrica analítica de desempeño técnico en hoja de cálculo.',
    ambiente: 'Sala de ofimática / Ambiente polivalente SENA + Plantilla Excel AndeTech S.A.S.',
  },
  'Estadística Administrativa': {
    actividad: 'Laboratorio de Análisis de Frecuencias, PQRS y Priorización mediante Principio de Pareto (80/20)',
    descripcion:
      'Construcción de tablas de frecuencia absoluta, relativa y acumulada aplicadas a informes de servicio al cliente y toma de decisiones gerenciales basadas en datos.',
    faseCurricular: 'Contextualización y Apropiación (RAP 01)',
    criterioEvaluacion:
      'Construye e interpreta tablas de frecuencias acumuladas y diagramas de Pareto para priorizar problemáticas administrativas.',
    evidencia: 'Informe ejecutivo con tabla de frecuencias y gráfico de Pareto de quejas empresariales.',
    instrumento: 'Lista de chequeo de producto estadístico.',
    ambiente: 'Ambiente TIC SENA + Software de hoja de cálculo (Excel / Google Sheets).',
  },
  'Inventarios y Logística': {
    actividad: 'Simulación de Control de Existencias, Punto de Reorden (ROP) y Costo Unitario de Insumos',
    descripcion:
      'Cálculo de demanda durante tiempos de reposición del proveedor, stock de seguridad, conversión de unidades compuestas y cálculo de costos marginales de oficina.',
    faseCurricular: 'Apropiación Procedimental (RAP 01)',
    criterioEvaluacion:
      'Determina el punto de reorden y el costo unitario real de consumibles evitando roturas de inventario.',
    evidencia: 'Kardex automatizado con alertas de punto de reorden para insumos de oficina.',
    instrumento: 'Lista de verificación de desempeño procedimental.',
    ambiente: 'Ambiente de aprendizaje administrativo + Simulador de bodega AndeTech S.A.S.',
  },
  'Nómina y Horas Extras': {
    actividad: 'Clínica de Liquidación de Jornada Laboral, Horas Extras y Recargos según Normativa Colombiana',
    descripcion:
      'Aplicación de factores multiplicadores legales (1.25 diurna, 1.75 nocturna/dominical) sobre el valor de la hora ordinaria en liquidaciones operativas de personal.',
    faseCurricular: 'Contextualización Normativa y Práctica (RAP 01)',
    criterioEvaluacion:
      'Liquida con precisión horas extras y recargos laborales aplicando los factores porcentuales vigentes.',
    evidencia: 'Desprendible y matriz de liquidación de novedades de nómina verificada.',
    instrumento: 'Cuestionario práctico y lista de chequeo de cálculo salarial.',
    ambiente: 'Ambiente polivalente SENA + Cartilla Código Sustantivo del Trabajo.',
  },
  'Aritmética y Porcentajes': {
    actividad: 'Refuerzo de Aritmética Comercial: Descuentos Encadenados, IVA (19%), Variación Porcentual e Interés Simple',
    descripcion:
      'Afianzamiento de bases gravables netas en facturación, cálculo de tasas de crecimiento trimestral y cuotas fijas en financiamiento comercial a corto plazo.',
    faseCurricular: 'Reflexión Inicial y Nivelación Básica (RAP 01)',
    criterioEvaluacion:
      'Aplica algoritmos de porcentajes encadenados, tasas de variación e interés simple en documentos comerciales.',
    evidencia: 'Taller resuelto de 10 facturas comerciales y tabla de amortización simple.',
    instrumento: 'Rúbrica de exactitud aritmética y prueba escrita corta.',
    ambiente: 'Ambiente SENA + Calculadora financiera y hoja de cálculo.',
  },
};

export function generarReporteGeneralInstructor(aprendices: Aprendiz[]): ReporteGeneralInstructor {
  const evaluados = aprendices.filter((a) => a.haRealizadoDiagnostico);
  const totalEvaluados = evaluados.length;
  const totalAprendicesFicha = aprendices.length;
  const pendientesPorEvaluar = totalAprendicesFicha - totalEvaluados;

  // Contadores de semaforización y estilos de aprendizaje
  let verde = 0;
  let amarillo = 0;
  let rojo = 0;

  let countLogico = 0; // >= 80%
  let countPractico = 0; // 50% - 79%
  let countReflexivo = 0; // < 50%

  let sumaPorcentajes = 0;

  // Acumuladores por categoría
  const statsCategoria: Record<
    string,
    {
      totalPreguntasRespondidas: number;
      totalFallos: number;
      aprendicesConFallo: Set<string>;
      preguntasAsociadas: Set<string>;
    }
  > = {};

  PREGUNTAS_DIAGNOSTICAS.forEach((p) => {
    if (!statsCategoria[p.categoria]) {
      statsCategoria[p.categoria] = {
        totalPreguntasRespondidas: 0,
        totalFallos: 0,
        aprendicesConFallo: new Set<string>(),
        preguntasAsociadas: new Set<string>(),
      };
    }
    statsCategoria[p.categoria].preguntasAsociadas.add(`P${p.id}: ${p.titulo}`);
  });

  evaluados.forEach((aprendiz) => {
    const pct = aprendiz.porcentajeDiagnostico ?? 0;
    sumaPorcentajes += pct;

    if (pct >= 70) verde += 1;
    else if (pct >= 50) amarillo += 1;
    else rojo += 1;

    if (pct >= 80) countLogico += 1;
    else if (pct >= 50) countPractico += 1;
    else countReflexivo += 1;

    const respuestas = obtenerRespuestasCoherentes(aprendiz);
    PREGUNTAS_DIAGNOSTICAS.forEach((p) => {
      const sel = respuestas[p.id];
      const catStat = statsCategoria[p.categoria];
      catStat.totalPreguntasRespondidas += 1;
      const esCorrecta = sel !== undefined && p.opciones[sel]?.esCorrecta;
      if (!esCorrecta) {
        catStat.totalFallos += 1;
        catStat.aprendicesConFallo.add(aprendiz.id);
      }
    });
  });

  const promedioGrupalPorcentaje =
    totalEvaluados > 0 ? Math.round(sumaPorcentajes / totalEvaluados) : 0;

  // Construir lista de actividades de fortalecimiento y ORDENAR DE MAYOR A MENOR prioridad (% brecha descendente)
  const prioridadesBrutas: Omit<PrioridadFortalecimientoGrupal, 'ordenPrioridad'>[] = Object.entries(
    statsCategoria
  ).map(([categoria, stat]) => {
    const porcentajeBrecha =
      stat.totalPreguntasRespondidas > 0
        ? Math.round((stat.totalFallos / stat.totalPreguntasRespondidas) * 100)
        : 0;
    const porcentajeDominio = 100 - porcentajeBrecha;
    const aprendicesConDificultad = stat.aprendicesConFallo.size;
    const info = CATALOGO_FORTALECIMIENTO_POR_CATEGORIA[categoria];

    let nivelUrgencia: PrioridadFortalecimientoGrupal['nivelUrgencia'] = 'Prioridad de Consolidación (Baja)';
    if (porcentajeBrecha >= 40) {
      nivelUrgencia = 'Prioridad Crítica (Alta)';
    } else if (porcentajeBrecha >= 20) {
      nivelUrgencia = 'Prioridad Media';
    }

    // Tiempo sugerido proporcional a la brecha (entre 6 y 14 horas dentro de las 48h del RAP 01)
    const tiempoSugeridoHoras =
      porcentajeBrecha >= 40 ? 12 : porcentajeBrecha >= 25 ? 10 : porcentajeBrecha >= 15 ? 8 : 6;

    return {
      nivelUrgencia,
      categoria,
      actividadFortalecimiento: info.actividad,
      descripcionOperativa: info.descripcion,
      aprendicesConDificultad,
      totalEvaluados,
      porcentajeBrecha,
      porcentajeDominio,
      preguntasAsociadas: Array.from(stat.preguntasAsociadas),
      tiempoSugeridoHoras,
    };
  });

  // Ordenar estrictamente de MAYOR a MENOR brecha (prioridad 1 = mayor dificultad del grupo)
  prioridadesBrutas.sort((a, b) => {
    if (b.porcentajeBrecha !== a.porcentajeBrecha) {
      return b.porcentajeBrecha - a.porcentajeBrecha;
    }
    return b.aprendicesConDificultad - a.aprendicesConDificultad;
  });

  const prioridadesFortalecimiento: PrioridadFortalecimientoGrupal[] = prioridadesBrutas.map(
    (item, idx) => ({
      ...item,
      ordenPrioridad: idx + 1,
    })
  );

  // Estrategias Pedagógicas SENA basadas en Estilos de Aprendizaje + Técnicas Didácticas Activas (TDA)
  const estrategiasPorEstilo: EstrategiaEstiloAprendizajeGrupal[] = [
    {
      estilo: 'Estilo Reflexivo - Visual y Guiado (Semáforo Rojo: < 50%)',
      descripcionEstilo:
        'Aprendices que requieren observación estructurada, modelamiento paso a paso, apoyo visual constante y acompañamiento cercano antes de ejecutar cálculos de forma autónoma.',
      cantidadAprendices: countReflexivo,
      porcentajeGrupo: totalEvaluados > 0 ? Math.round((countReflexivo / totalEvaluados) * 100) : 0,
      semaforoAsociado: 'rojo',
      estrategiaPedagogicaSena:
        'Formación Personalizada por Descubrimiento Guiado y Andamiaje Cognitivo (Modelo Pedagógico SENA - Enfoque por Competencias)',
      tecnicaDidacticaActiva:
        'Taller Demostrativo Paso a Paso con Mapas Mentales, Diagramas de Flujo y Tutoría Personalizada',
      fundamentacionTecnica:
        'Al desagregar cada operación administrativa (IVA, punto de equilibrio, nómina) en secuencias visuales y fichas nemotécnicas, se reduce la carga cognitiva y se consolida el aprendizaje significativo.',
      actividadesEnAmbiente: [
        'Elaboración de tarjetas nemotécnicas visuales con las fórmulas clave del asistente administrativo.',
        'Sesión de nivelación guiada con el instructor Fabio Enrique Moreno resolviendo ejercicios tipo espejo.',
        'Uso de diagramas de flujo para validar paso a paso el arqueo de caja menor.',
      ],
      recursosDidacticos: [
        'Guía de fórmulas ilustrada en PDF',
        'Tablero interactivo y mapas conceptuales',
        'Listas de chequeo de autoevaluación paso a paso',
      ],
    },
    {
      estilo: 'Estilo Práctico - Kinestésico / Aprender Haciendo (Semáforo Amarillo/Verde Básico: 50% - 79%)',
      descripcionEstilo:
        'Aprendices orientados a la experimentación activa que apropian el razonamiento cuantitativo mediante la manipulación de herramientas ofimáticas y resolución de casos empresariales reales.',
      cantidadAprendices: countPractico,
      porcentajeGrupo: totalEvaluados > 0 ? Math.round((countPractico / totalEvaluados) * 100) : 0,
      semaforoAsociado: 'amarillo',
      estrategiaPedagogicaSena:
        'Aprendizaje Basado en Problemas (ABP) y Metodología Design Thinking aplicada a Unidades Productivas',
      tecnicaDidacticaActiva:
        'Estudio de Casos Empresariales (Caso AndeTech S.A.S.) y Simulación de Puesto de Trabajo en Hoja de Cálculo',
      fundamentacionTecnica:
        'El enfoque SENA de "Aprender Haciendo" conecta la teoría matemática con la realidad operativa de una oficina, fortaleciendo la transferencia directa a la empresa del proyecto formativo.',
      actividadesEnAmbiente: [
        'Simulación de oficina administrativa parametrizando facturas, inventarios y nómina en Microsoft Excel.',
        'Desarrollo de prototipos funcionales de cálculo (Fase Prototipar de Design Thinking).',
        'Juego de roles comprador-proveedor-tesorero para validar arqueos y puntos de reorden.',
      ],
      recursosDidacticos: [
        'Simulador en Microsoft Excel / Google Sheets',
        'Documentos comerciales reales (facturas, vales, nómina)',
        'Malla receptora de información de Design Thinking',
      ],
    },
    {
      estilo: 'Estilo Lógico - Analítico y Conceptual (Semáforo Verde Consolidado: ≥ 80%)',
      descripcionEstilo:
        'Aprendices con alto pensamiento abstracto, facilidad para deducir modelos matemáticos, analizar indicadores estadísticos y optimizar procesos administrativos.',
      cantidadAprendices: countLogico,
      porcentajeGrupo: totalEvaluados > 0 ? Math.round((countLogico / totalEvaluados) * 100) : 0,
      semaforoAsociado: 'verde',
      estrategiaPedagogicaSena:
        'Formación por Proyectos Formativos y Aprendizaje Colaborativo Basado en Retos',
      tecnicaDidacticaActiva:
        'Aprendizaje entre Pares (Mentoría de Ficha), Panel de Discusión Gerencial y Retos de Optimización en Excel',
      fundamentacionTecnica:
        'Potencia las habilidades superiores de análisis y liderazgo, integrando a estos aprendices como monitores de apoyo colaborativo en las mesas de trabajo de la ficha 2874102.',
      actividadesEnAmbiente: [
        'Liderazgo de células de trabajo colaborativo apoyando a compañeros en semáforo rojo/amarillo.',
        'Diseño de tableros de control (Dashboards) de PQRS y Pareto con fórmulas condicionales avanzadas.',
        'Sustentación de propuestas financieras y escenarios de sensibilidad para AndeTech S.A.S.',
      ],
      recursosDidacticos: [
        'Casos gerenciales complejos con variables múltiples',
        'Rúbricas de coevaluación entre pares',
        'Hojas de cálculo avanzadas con gráficos dinámicos',
      ],
    },
  ];

  // Generar Planificación Pedagógica SENA completa ordenada de mayor a menor prioridad
  const planificacionPedagogica: ItemPlanificacionPedagogica[] = prioridadesFortalecimiento.map(
    (prio) => {
      const catInfo = CATALOGO_FORTALECIMIENTO_POR_CATEGORIA[prio.categoria];

      // Asociar estilo de aprendizaje, estrategia SENA y TDA según la criticidad de la prioridad
      let estiloObjetivo = 'Todos los estilos (Énfasis Práctico - Kinestésico)';
      let estrategiaSena =
        'Aprendizaje Basado en Problemas (ABP) articulado al Proyecto Formativo Ficha 2874102';
      let tecnicaDidacticaActiva =
        'Estudio de Caso Empresarial (AndeTech S.A.S.) + Taller Práctico en Excel';

      if (prio.ordenPrioridad === 1 || prio.porcentajeBrecha >= 40) {
        estiloObjetivo = 'Énfasis Reflexivo - Visual y Práctico (Atención Prioritaria Semáforo Rojo/Amarillo)';
        estrategiaSena =
          'Andamiaje Cognitivo Paso a Paso + Design Thinking (Fases Empatizar, Idear y Prototipar)';
        tecnicaDidacticaActiva =
          'Taller Demostrativo Guiado, Diagramas de Flujo Operativos y Mentoría entre Pares';
      } else if (prio.ordenPrioridad === 2 || prio.porcentajeBrecha >= 25) {
        estiloObjetivo = 'Práctico - Kinestésico y Lógico - Analítico';
        estrategiaSena =
          'Aprendizaje Basado en Problemas (ABP) y Simulación de Entornos Administrativos';
        tecnicaDidacticaActiva =
          'Simulación de Puesto de Trabajo, Juego de Roles y Laboratorio en Hoja de Cálculo';
      } else if (prio.ordenPrioridad >= 4) {
        estiloObjetivo = 'Lógico - Analítico y Práctico (Consolidación grupal)';
        estrategiaSena = 'Formación por Proyectos y Aprendizaje Colaborativo';
        tecnicaDidacticaActiva =
          'Aprendizaje Basado en Retos, Exposición Problémica y Coevaluación en Equipos';
      }

      return {
        prioridad: prio.ordenPrioridad,
        faseCurricular: catInfo.faseCurricular,
        actividadAprendizaje: prio.actividadFortalecimiento,
        estiloObjetivo,
        estrategiaSena,
        tecnicaDidacticaActiva,
        duracionHoras: prio.tiempoSugeridoHoras,
        ambienteYRecursos: catInfo.ambiente,
        criterioEvaluacion: catInfo.criterioEvaluacion,
        evidenciaYProducto: catInfo.evidencia,
        instrumentoEvaluacion: catInfo.instrumento,
      };
    }
  );

  return {
    fechaGeneracion: new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    ficha: INSTRUCTOR_DATOS.ficha,
    programa: INSTRUCTOR_DATOS.programa,
    instructor: INSTRUCTOR_DATOS.nombreCompleto,
    competencia: INSTRUCTOR_DATOS.competencia,
    resultadoAprendizaje: INSTRUCTOR_DATOS.resultadoAprendizaje,
    totalAprendicesFicha,
    totalEvaluados,
    pendientesPorEvaluar,
    promedioGrupalPorcentaje,
    distribucionSemaforo: {
      verde,
      amarillo,
      rojo,
    },
    prioridadesFortalecimiento,
    estrategiasPorEstilo,
    planificacionPedagogica,
  };
}

export function getNotificacionesInstructor(): NotificacionReporteInstructor[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICACIONES_INSTRUCTOR);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function registrarEnvioReporteInstructor(
  notificacion: NotificacionReporteInstructor
): NotificacionReporteInstructor[] {
  const actuales = getNotificacionesInstructor();
  const actualizadas = [notificacion, ...actuales].slice(0, 20);
  localStorage.setItem(STORAGE_KEY_NOTIFICACIONES_INSTRUCTOR, JSON.stringify(actualizadas));
  return actualizadas;
}

export function marcarNotificacionesLeidas(): NotificacionReporteInstructor[] {
  const actuales = getNotificacionesInstructor();
  const actualizadas = actuales.map((n) => ({ ...n, leido: true }));
  localStorage.setItem(STORAGE_KEY_NOTIFICACIONES_INSTRUCTOR, JSON.stringify(actualizadas));
  return actualizadas;
}
