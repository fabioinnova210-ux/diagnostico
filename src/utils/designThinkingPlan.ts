import { EvaluacionResultado, PlanAccionDesignThinking, PreguntaDiagnostica } from '../types';
import { PREGUNTAS_DIAGNOSTICAS } from '../data/preguntasDiagnosticas';

export function generarResultadoDiagnostico(
  aprendizId: string,
  respuestas: Record<number, number>
): EvaluacionResultado {
  let aciertos = 0;
  const totalPreguntas = PREGUNTAS_DIAGNOSTICAS.length;
  const fallosPorCategoria: Record<string, number> = {};
  const totalPorCategoria: Record<string, number> = {};
  const aciertosPorCategoria: Record<string, number> = {};
  const preguntasFalladas: PreguntaDiagnostica[] = [];

  PREGUNTAS_DIAGNOSTICAS.forEach((p) => {
    const seleccion = respuestas[p.id];
    totalPorCategoria[p.categoria] = (totalPorCategoria[p.categoria] || 0) + 1;
    if (seleccion !== undefined && p.opciones[seleccion]?.esCorrecta) {
      aciertos += 1;
      aciertosPorCategoria[p.categoria] = (aciertosPorCategoria[p.categoria] || 0) + 1;
    } else {
      fallosPorCategoria[p.categoria] = (fallosPorCategoria[p.categoria] || 0) + 1;
      preguntasFalladas.push(p);
    }
  });

  const porcentaje = Math.round((aciertos / totalPreguntas) * 100);
  const aprobado = porcentaje >= 70; // Criterio SENA: 70% o superior

  // Desglose por categorías
  const desgloseCategorias = Object.keys(totalPorCategoria).map((cat) => {
    const tot = totalPorCategoria[cat] || 0;
    const ac = aciertosPorCategoria[cat] || 0;
    return {
      categoria: cat,
      total: tot,
      aciertos: ac,
      porcentaje: Math.round((ac / tot) * 100),
    };
  });

  // Generar recomendaciones de mejora personalizadas
  const recomendacionesMejora: string[] = [];

  if (aprobado) {
    recomendacionesMejora.push(
      'Ha demostrado un dominio técnico adecuado (>= 70%) de los conceptos matemáticos aplicados al rol de Asistente Administrativo.'
    );
  } else {
    recomendacionesMejora.push(
      'Su puntuación preliminar se encuentra por debajo del umbral de aprobación institucional (70%). Debe implementar el Plan de Acción Design Thinking para nivelar sus destrezas.'
    );
  }

  // Recomendaciones específicas por áreas
  if (fallosPorCategoria['Aritmética y Porcentajes']) {
    recomendacionesMejora.push(
      'Área de Aritmética y Porcentajes: Repasar el encadenamiento de porcentajes en facturación comercial (descuentos sucesivos y base gravable para IVA del 19%) y la fórmula de tasa de variación relativa: [(Valor Final - Valor Inicial) / Valor Inicial] * 100.'
    );
  }
  if (fallosPorCategoria['Costos y Presupuestos']) {
    recomendacionesMejora.push(
      'Área de Costos y Presupuestos: Afianzar la identificación de Costos Fijos vs. Variables y la ecuación del Punto de Equilibrio en Unidades [Q = Costos Fijos / (Precio de Venta - Costo Variable)]. Practicar el arqueo sistemático de caja menor.'
    );
  }
  if (fallosPorCategoria['Nómina y Horas Extras']) {
    recomendacionesMejora.push(
      'Área de Nómina Laboral: Revisar los factores de recargo según la legislación colombiana (Hora extra diurna = valor hora ordinaria * 1.25; nocturna = * 1.75; dominical/festiva = * 1.75 o * 2.00 con recargos adicionales).'
    );
  }
  if (fallosPorCategoria['Inventarios y Logística']) {
    recomendacionesMejora.push(
      'Área de Inventarios: Interiorizar la fórmula del Punto de Reorden (ROP = Consumo diario promedio * Tiempo de entrega del proveedor + Stock de seguridad) para evitar quiebres de inventario en la oficina.'
    );
  }
  if (fallosPorCategoria['Estadística Administrativa']) {
    recomendacionesMejora.push(
      'Área de Estadística: Fortalecer la construcción de tablas de frecuencias relativas y acumuladas, y la aplicación del Principio de Pareto (80/20) para priorizar las causas raíz en informes de servicio al cliente y PQRS.'
    );
  }

  // Recomendación general metodológica
  recomendacionesMejora.push(
    'Practicar el modelado en hojas de cálculo (Excel/Google Sheets) utilizando fórmulas auditables y referencias de celdas en lugar de cálculos manuales aislados.'
  );

  // Nivel alcanzado
  let nivelAlcanzado: 'Sobresaliente' | 'Aceptable' | 'Básico' | 'En Refuerzo Inicial' = 'En Refuerzo Inicial';
  if (porcentaje >= 90) nivelAlcanzado = 'Sobresaliente';
  else if (porcentaje >= 70) nivelAlcanzado = 'Aceptable';
  else if (porcentaje >= 50) nivelAlcanzado = 'Básico';

  // Construir Plan de Acción aplicando Design Thinking
  const planDesignThinking: PlanAccionDesignThinking = {
    diagnosticoGeneral: `El aprendiz obtuvo ${aciertos} aciertos de ${totalPreguntas} preguntas (${porcentaje}%), situándose en el nivel ${nivelAlcanzado}. ${
      aprobado
        ? 'El aprendiz cuenta con bases cuantitativas sólidas para avanzar directamente a la ejecución de la Guía 01.'
        : 'Se requiere una intervención pedagógica estructurada bajo la metodología Design Thinking para superar las brechas identificadas antes de las entregas de producto.'
    }`,
    nivelAlcanzado,
    fechaEmision: new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    acompanamientoInstructor:
      'El instructor Fabio Enrique Moreno orientará sesiones de tutoría sincrónica y revisará los prototipos en Excel en las sesiones 2 y 3 del plan de formación.',
    compromisosAprendiz: [
      'Dedicar al menos 4 horas semanales de estudio autónomo a los temas con falencias detectadas.',
      'Construir y mantener actualizada la libreta personal de fórmulas administrativas.',
      'Participar activamente en los foros de dudas de la plataforma Zajuna y en las sesiones del instructor.',
      'Entregar oportunamente las evidencias formativas programadas en la Guía 01.',
    ],
    fases: [
      {
        fase: '1. Empatizar',
        objetivo: 'Reconocer las barreras de comprensión matemática personal y cómo impactan las rutinas de la empresa AndeTech S.A.S.',
        accionesSugeridas: [
          'Llevar un diario de auto-observación de 3 días anotando cada vez que deba realizar una operación numérica (precios, horas, cantidades) y la sensación de seguridad.',
          'Entrevistar a un compañero o asistente administrativo en ejercicio sobre cuáles son los 3 cálculos más críticos y donde más ocurren errores en su jornada.',
          'Mapear los dolores del usuario final (clientes, gerencia y proveedores) cuando un cálculo administrativo falla.',
        ],
        herramientas: ['Mapa de Empatía del Asistente Administrativo', 'Matriz de Dolores y Necesidades Cuantitativas'],
        evidenciaEsperada: 'Mapa de empatía diligenciado en 1 página identificando sus 3 principales temores y oportunidades de mejora numérica.',
      },
      {
        fase: '2. Definir',
        objetivo: 'Formular con precisión el "Reto de Diseño Cuantitativo" enfocado en las competencias donde se presentaron errores.',
        accionesSugeridas: [
          `Sintetizar la brecha principal detectada en la evaluación: ${
            preguntasFalladas.length > 0
              ? `Especial atención en: ${preguntasFalladas.map((p) => p.titulo).slice(0, 3).join(', ')}.`
              : 'Perfeccionamiento y automatización avanzada de fórmulas en Excel.'
          }`,
          'Redactar la pregunta generadora con la estructura: "¿Cómo podríamos nosotros los aprendices simplificar el cálculo de variables administrativas para garantizar cero errores en AndeTech S.A.S.?"',
          'Establecer criterios de éxito medibles (ej. Reducir el tiempo de liquidación a la mitad con 100% de precisión).',
        ],
        herramientas: ['Técnica de los 5 Porqués', 'Declaración del Punto de Vista (POV - Point of View)'],
        evidenciaEsperada: 'Ficha de Definición del Problema con la pregunta reto redactada y aprobada por el instructor Fabio Enrique Moreno.',
      },
      {
        fase: '3. Idear',
        objetivo: 'Generar múltiples alternativas de solución y ayudas nemotécnicas para el modelado matemático en la oficina.',
        accionesSugeridas: [
          'Sesión de lluvia de ideas (Brainstorming) de recursos: plantillas prediseñadas en Excel con listas desplegables, tarjetas plastificadas de fórmulas de nómina, diagramas de flujo para arqueo de caja.',
          'Seleccionar las 2 mejores ideas usando la matriz de Impacto vs. Esfuerzo de implementación.',
          'Consultar repositorios SENA de herramientas ofimáticas y normatividad contable.',
        ],
        herramientas: ['Matriz Impacto vs. Esfuerzo', 'Técnica SCAMPER aplicada a formatos administrativos'],
        evidenciaEsperada: 'Matriz de selección de ideas con la justificación de la herramienta o artefacto elegido.',
      },
      {
        fase: '4. Prototipar',
        objetivo: 'Construir un artefacto de apoyo práctico y funcional que automatice o facilite los cálculos evaluados.',
        accionesSugeridas: [
          'Diseñar en Microsoft Excel / Google Sheets un "Simulador Rápido de Cálculos del Asistente Administrativo" que contenga pestañas para: 1. Facturación con IVA/Descuentos, 2. Punto de Reorden y Stock, 3. Punto de Equilibrio, 4. Liquidación de Horas Extras, 5. Arqueo de Caja Menor.',
          'Aplicar validación de datos, formato condicional tipo semáforo (Verde/Rojo) y fórmulas protegidas para evitar errores de digitación.',
          'Elaborar una guía rápida de usuario de 1 página con instrucciones de uso.',
        ],
        herramientas: ['Microsoft Excel (Fórmulas SI, BUSCARV, SUMAR.SI)', 'Plantilla de prototipo digital funcional'],
        evidenciaEsperada: 'Archivo en Excel parametrizado y probado con los 10 ejercicios del caso AndeTech S.A.S.',
      },
      {
        fase: '5. Evaluar',
        objetivo: 'Testear el prototipo con datos reales de la Mipyme del proyecto formativo y recibir retroalimentación del instructor.',
        accionesSugeridas: [
          'Simular 5 transacciones imprevistas con compañeros de ficha para verificar si el prototipo arroja los resultados correctos sin fallas.',
          'Presentar el simulador al instructor Fabio Enrique Moreno en sesión de asesoría técnica para recibir observaciones de ajuste.',
          'Efectuar los ajustes identificados en la malla de retroalimentación.',
        ],
        herramientas: ['Malla Receptora de Información (Cosas notables, Críticas constructivas, Preguntas, Nuevas ideas)', 'Rúbrica de Usabilidad'],
        evidenciaEsperada: 'Acta de testeo con observaciones del instructor y versión 2.0 final del prototipo incorporado a la Guía 01.',
      },
    ],
  };

  // Semaforización
  let semaforo: 'verde' | 'amarillo' | 'rojo' = 'rojo';
  if (porcentaje >= 70) semaforo = 'verde';
  else if (porcentaje >= 50) semaforo = 'amarillo';
  else semaforo = 'rojo';

  // Fortalecimiento personal
  const fortalecimientoPersonal: string[] = [
    'Desarrollo de la confianza analítica: Enfrentar los problemas numéricos de la oficina con metodologías paso a paso para reducir la ansiedad ante los números.',
    'Gestión rigurosa del tiempo y organización documental: Establecer rutinas quincenales para conciliaciones de caja y revisión de inventarios.',
    'Comunicación asertiva de informes: Traducir los datos cuantitativos y porcentuales en reportes claros y persuasivos para la gerencia y equipos de trabajo.',
    'Automotivación y mentalidad de crecimiento: Asumir cada error en cálculos como una oportunidad de aprendizaje dentro del ciclo formativo SENA.',
  ];

  // Estilo de aprendizaje identificado
  let estiloAprendizaje = {
    nombre: 'Estilo Práctico - Kinestésico y Aprender Haciendo',
    descripcion: 'El aprendiz comprende mejor los conceptos cuantitativos cuando los aplica directamente en simulaciones operativas, plantillas en Excel y casos empresariales reales como AndeTech S.A.S.',
    estrategias: [
      'Utilizar plantillas interactivas en Excel y simuladores de caja menor y nómina.',
      'Desarrollar diagramas de flujo y mapas mentales para visualizar procesos aritméticos.',
      'Trabajar en equipos colaborativos para debatir soluciones a los estudios de caso.',
    ],
  };

  if (porcentaje >= 80) {
    estiloAprendizaje = {
      nombre: 'Estilo Lógico - Analítico y Conceptual',
      descripcion: 'El aprendiz muestra facilidad para deducir fórmulas, relacionar magnitudes proporcionales y analizar variables estadísticas de forma estructurada.',
      estrategias: [
        'Abordar retos de modelado matemático avanzado y optimización de costos.',
        'Actuar como líder de equipo en talleres prácticos para guiar a otros compañeros.',
        'Explorar la automatización de macros y funciones avanzadas en hojas de cálculo.',
      ],
    };
  } else if (porcentaje < 50) {
    estiloAprendizaje = {
      nombre: 'Estilo Reflexivo - Visual y Guiado',
      descripcion: 'El aprendiz requiere apoyos visuales estructurados, explicaciones paso a paso y tutoría personalizada para consolidar las bases matemáticas.',
      estrategias: [
        'Emplear fichas nemotécnicas con fórmulas clave de porcentajes, IVA y punto de equilibrio.',
        'Programar sesiones de refuerzo sincrónico con el instructor Fabio Enrique Moreno.',
        'Desarrollar los ejercicios con acompañamiento de guías detalladas y procedimientos resueltos.',
      ],
    };
  }

  const codigoVerificacion = `SENA-AA3-${aprendizId.toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;

  return {
    aprendizId,
    totalPreguntas,
    aciertos,
    porcentaje,
    aprobado,
    fecha: new Date().toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    respuestas,
    semaforo,
    fortalecimientoPersonal,
    estiloAprendizaje,
    desgloseCategorias,
    recomendacionesMejora,
    planDesignThinking,
    codigoVerificacion,
  };
}
