import { jsPDF } from 'jspdf';
import { Aprendiz, EvaluacionResultado, ReporteGeneralInstructor } from '../types';
import { INSTRUCTOR_DATOS } from '../data/aprendicesData';

export function descargarInformePDF(
  aprendiz: Aprendiz,
  resultado: EvaluacionResultado
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  // Header SENA Banner
  doc.setFillColor(57, 169, 0); // SENA Green #39A900
  doc.rect(margin, y, contentWidth, 22, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SERVICIO NACIONAL DE APRENDIZAJE - SENA', margin + 6, y + 8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('REGIONAL DISTRITO CAPITAL | CENTRO DE GESTIÓN ADMINISTRATIVA', margin + 6, y + 14);
  doc.text('PROGRAMA: TÉCNICO EN ASISTENCIA ADMINISTRATIVA - VERSIÓN 3', margin + 6, y + 19);

  y += 28;

  // Title Box
  doc.setFillColor(243, 244, 246);
  doc.setDrawColor(209, 213, 219);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

  doc.setTextColor(17, 24, 39);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORME DE EVALUACIÓN DIAGNÓSTICA PRELIMINAR & PLAN DESIGN THINKING', margin + 4, y + 7);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);
  doc.text(
    'Competencia: Razonamiento Cuantitativo - Matemáticas | RAP 01: Identificar situaciones problemáticas',
    margin + 4,
    y + 13
  );

  y += 24;

  // Two columns: Datos Aprendiz & Instructor
  doc.setDrawColor(229, 231, 235);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(31, 41, 55);
  doc.text('DATOS DEL APRENDIZ (CONFIDENCIAL)', margin + 4, y + 6);
  doc.text('INSTRUCTOR RESPONSABLE', margin + contentWidth / 2 + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(55, 65, 81);

  // Columna 1
  doc.text(`Nombre: ${aprendiz.nombres} ${aprendiz.apellidos}`, margin + 4, y + 11);
  doc.text(`Documento: ${aprendiz.tipoDocumento} ${aprendiz.numeroDocumento}`, margin + 4, y + 16);
  doc.text(`Correo: ${aprendiz.correo}`, margin + 4, y + 21);
  doc.text(`Celular: ${aprendiz.celular} | Ciudad: ${aprendiz.ciudad}`, margin + 4, y + 26);

  // Columna 2
  doc.text(`Instructor: ${INSTRUCTOR_DATOS.nombreCompleto}`, margin + contentWidth / 2 + 4, y + 11);
  doc.text(`Rol: ${INSTRUCTOR_DATOS.cargo}`, margin + contentWidth / 2 + 4, y + 16);
  doc.text(`Ficha: ${INSTRUCTOR_DATOS.ficha}`, margin + contentWidth / 2 + 4, y + 21);
  doc.text(`Fecha Emisión: ${resultado.fecha}`, margin + contentWidth / 2 + 4, y + 26);

  y += 33;

  // Resultado Box
  const isApproved = resultado.aprobado;
  if (isApproved) {
    doc.setFillColor(240, 253, 244); // Green 50
    doc.setDrawColor(34, 197, 94);
  } else {
    doc.setFillColor(254, 242, 242); // Red 50
    doc.setDrawColor(239, 68, 68);
  }
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  if (isApproved) {
    doc.setTextColor(21, 128, 61); // Green 700
    doc.text('RESULTADO DIAGNÓSTICO: APROBADO (CUMPLE CON EL 70% O MÁS)', margin + 4, y + 7);
  } else {
    doc.setTextColor(185, 28, 28); // Red 700
    doc.text('RESULTADO DIAGNÓSTICO: EN REFUERZO INICIAL (PUNTAJE INFERIOR AL 70%)', margin + 4, y + 7);
  }

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(31, 41, 55);
  doc.text(
    `Aciertos: ${resultado.aciertos} de ${resultado.totalPreguntas} preguntas  |  Porcentaje obtenido: ${resultado.porcentaje}% (Umbral mínimo de aprobación: 70%)`,
    margin + 4,
    y + 13
  );

  doc.setFontSize(8);
  doc.setTextColor(75, 85, 99);
  doc.text(
    `Código de verificación institucional: ${resultado.codigoVerificacion}`,
    margin + 4,
    y + 19
  );

  y += 28;

  // SEMAFORIZACIÓN E IDENTIFICACIÓN DE ESTILO DE APRENDIZAJE
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(31, 41, 55);
  doc.text(`SEMAFORIZACIÓN INSTITUCIONAL: ${resultado.semaforo.toUpperCase()} (${resultado.porcentaje}%)`, margin, y);
  y += 5;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);
  const semaforoDesc = resultado.semaforo === 'verde'
    ? 'Nivel Óptimo y Consolidado. El aprendiz demuestra excelentes competencias cuantitativas para la gestión administrativa en AndeTech S.A.S.'
    : resultado.semaforo === 'amarillo'
    ? 'Nivel En Progreso. Requiere afianzar conceptos operativos de costos o nómina mediante el plan Design Thinking.'
    : 'Nivel En Refuerzo Inicial. Brechas significativas que exigen tutoría personalizada con el instructor Fabio Enrique Moreno.';
  const linesSem = doc.splitTextToSize(semaforoDesc, contentWidth - 4);
  doc.text(linesSem, margin + 2, y);
  y += linesSem.length * 3.5 + 4;

  // Estilo de aprendizaje
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text(`Estilo de Aprendizaje Identificado: ${resultado.estiloAprendizaje.nombre}`, margin, y);
  y += 4;
  doc.setFontSize(7.8);
  doc.setFont('helvetica', 'normal');
  const linesEstilo = doc.splitTextToSize(resultado.estiloAprendizaje.descripcion, contentWidth - 4);
  doc.text(linesEstilo, margin + 2, y);
  y += linesEstilo.length * 3.5 + 4;

  // Fortalecimiento personal
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('Recomendaciones de Fortalecimiento Personal:', margin, y);
  y += 4;
  doc.setFontSize(7.8);
  doc.setFont('helvetica', 'normal');
  resultado.fortalecimientoPersonal.forEach((fort) => {
    const linesFort = doc.splitTextToSize(`• ${fort}`, contentWidth - 6);
    doc.text(linesFort, margin + 3, y);
    y += linesFort.length * 3.5;
  });

  y += 4;

  // CONSTANCIA OFICIAL (Solo o destacada si aprobó, con texto oficial)
  if (isApproved) {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(57, 169, 0);
    doc.setLineWidth(0.8);
    doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'FD');
    doc.setLineWidth(0.2);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(57, 169, 0);
    doc.text('CONSTANCIA DE REALIZACIÓN DE LA ACTIVIDAD DIAGNÓSTICA PRELIMINAR', margin + 4, y + 6);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(31, 41, 55);
    const constanciaTexto = `El Servicio Nacional de Aprendizaje SENA y el Instructor Líder ${INSTRUCTOR_DATOS.nombreCompleto} hacen constar que el(la) aprendiz ${aprendiz.nombres} ${aprendiz.apellidos}, identificado(a) con ${aprendiz.tipoDocumento} No. ${aprendiz.numeroDocumento}, presentó satisfactoriamente la prueba diagnóstica basada en el estudio de caso empresarial AndeTech S.A.S., alcanzando una calificación del ${resultado.porcentaje}% (${resultado.aciertos}/10). Se autoriza el avance a la Guía de Aprendizaje No. 01.`;
    const lineasConstancia = doc.splitTextToSize(constanciaTexto, contentWidth - 8);
    doc.text(lineasConstancia, margin + 4, y + 12);

    y += 33;
  }

  // Recomendaciones de mejora
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(31, 41, 55);
  doc.text('RECOMENDACIONES DE MEJORA Y RETROALIMENTACIÓN FORMATIVA', margin, y);
  y += 5;

  doc.setFontSize(7.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 65, 81);

  resultado.recomendacionesMejora.forEach((rec) => {
    const lines = doc.splitTextToSize(`• ${rec}`, contentWidth - 6);
    doc.text(lines, margin + 3, y);
    y += lines.length * 3.8;
  });

  y += 4;

  // Plan de Acción Design Thinking
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(31, 41, 55);
  doc.text('PLAN DE ACCIÓN APLICANDO DESIGN THINKING (METODOLOGÍA SENA)', margin, y);
  y += 5;

  resultado.planDesignThinking.fases.forEach((fase) => {
    doc.setFillColor(243, 244, 246);
    doc.rect(margin, y, contentWidth, 5, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(`${fase.fase} - Objetivo: ${fase.objetivo}`, margin + 2, y + 3.8);
    y += 6.5;

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(75, 85, 99);
    const accionText = `Acciones sugeridas: ${fase.accionesSugeridas.slice(0, 2).join(' | ')}`;
    const lineasAccion = doc.splitTextToSize(accionText, contentWidth - 4);
    doc.text(lineasAccion, margin + 2, y);
    y += lineasAccion.length * 3.4;

    const entregaText = `Evidencia esperada: ${fase.evidenciaEsperada}`;
    const lineasEntrega = doc.splitTextToSize(entregaText, contentWidth - 4);
    doc.text(lineasEntrega, margin + 2, y);
    y += lineasEntrega.length * 3.4 + 2;

    // Check if new page is needed
    if (y > 260) {
      doc.addPage();
      y = 15;
    }
  });

  // Firmas al final
  if (y > 240) {
    doc.addPage();
    y = 20;
  } else {
    y += 6;
  }

  doc.setDrawColor(156, 163, 175);
  doc.line(margin + 10, y + 16, margin + 70, y + 16);
  doc.line(margin + contentWidth - 70, y + 16, margin + contentWidth - 10, y + 16);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(31, 41, 55);
  doc.text(INSTRUCTOR_DATOS.nombreCompleto, margin + 15, y + 20);
  doc.text(`${aprendiz.nombres} ${aprendiz.apellidos}`, margin + contentWidth - 65, y + 20);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(107, 114, 128);
  doc.text('Instructor Líder de Ficha SENA', margin + 18, y + 24);
  doc.text(`Aprendiz - ${aprendiz.tipoDocumento} ${aprendiz.numeroDocumento}`, margin + contentWidth - 62, y + 24);

  // Descarga
  const nombreArchivo = `SENA_Diagnostico_${aprendiz.nombres.replace(/\s+/g, '_')}_${aprendiz.numeroDocumento}.pdf`;
  doc.save(nombreArchivo);
}

export function descargarReporteGeneralInstructorPDF(reporte: ReporteGeneralInstructor) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = 14;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > 278) {
      doc.addPage();
      y = 16;
    }
  };

  // Encabezado Institucional SENA
  doc.setFillColor(57, 169, 0);
  doc.rect(margin, y, contentWidth, 22, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('SERVICIO NACIONAL DE APRENDIZAJE - SENA', margin + 5, y + 8);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('REPORTE GENERAL DE DIAGNÓSTICO GRUPAL & PLANIFICACIÓN PEDAGÓGICA', margin + 5, y + 14);
  doc.text(`${reporte.programa} | Ficha ${reporte.ficha}`, margin + 5, y + 19);

  y += 27;

  // Ficha Técnica del Reporte
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`Instructor Responsable: ${reporte.instructor}`, margin + 4, y + 6);
  doc.text(`Fecha de Corte: ${reporte.fechaGeneracion}`, margin + contentWidth / 2, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    `Evaluados: ${reporte.totalEvaluados} de ${reporte.totalAprendicesFicha} aprendices | Promedio Grupal: ${reporte.promedioGrupalPorcentaje}%`,
    margin + 4,
    y + 12
  );
  doc.text(
    `Semaforización Grupal -> Verde (>=70%): ${reporte.distribucionSemaforo.verde} | Amarillo (50-69%): ${reporte.distribucionSemaforo.amarillo} | Rojo (<50%): ${reporte.distribucionSemaforo.rojo}`,
    margin + 4,
    y + 17
  );
  const rapLines = doc.splitTextToSize(`RAP 01: ${reporte.resultadoAprendizaje}`, contentWidth - 8);
  doc.text(rapLines, margin + 4, y + 22);

  y += 32;

  // SECCIÓN 1: PRIORIZACIÓN DE ACTIVIDADES (MAYOR A MENOR)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(21, 128, 61);
  doc.text('1. PRIORIZACIÓN DE ACTIVIDADES DE FORTALECIMIENTO (DE MAYOR A MENOR BRECHA)', margin, y);
  y += 5;

  reporte.prioridadesFortalecimiento.forEach((prio) => {
    const descLines = doc.splitTextToSize(prio.descripcionOperativa, contentWidth - 8);
    const needed = 16 + descLines.length * 3.5;
    checkPageBreak(needed);

    doc.setFillColor(243, 244, 246);
    doc.setDrawColor(209, 213, 219);
    doc.roundedRect(margin, y, contentWidth, needed - 2, 1.5, 1.5, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(
      `Prioridad #${prio.ordenPrioridad} [${prio.nivelUrgencia}] - ${prio.categoria} (Brecha: ${prio.porcentajeBrecha}%)`,
      margin + 3,
      y + 5
    );

    doc.setFontSize(8);
    doc.setTextColor(21, 128, 61);
    doc.text(`Actividad: ${prio.actividadFortalecimiento} (${prio.tiempoSugeridoHoras}h)`, margin + 3, y + 10);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);
    doc.text(descLines, margin + 3, y + 14.5);

    y += needed + 1.5;
  });

  y += 4;

  // SECCIÓN 2: ESTRATEGIAS PEDAGÓGICAS SENA POR ESTILOS DE APRENDIZAJE Y TDA
  checkPageBreak(20);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138);
  doc.text('2. ESTRATEGIA PEDAGÓGICA SENA POR ESTILOS DE APRENDIZAJE Y TÉCNICA DIDÁCTICA ACTIVA', margin, y);
  y += 5;

  reporte.estrategiasPorEstilo.forEach((est) => {
    const estLines = doc.splitTextToSize(`Estrategia SENA: ${est.estrategiaPedagogicaSena}`, contentWidth - 6);
    const tdaLines = doc.splitTextToSize(`Técnica Didáctica Activa (TDA): ${est.tecnicaDidacticaActiva}`, contentWidth - 6);
    const needed = 11 + estLines.length * 3.6 + tdaLines.length * 3.6;
    checkPageBreak(needed);

    doc.setFillColor(239, 246, 255);
    doc.setDrawColor(191, 219, 254);
    doc.roundedRect(margin, y, contentWidth, needed, 1.5, 1.5, 'FD');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 138);
    doc.text(`${est.estilo} -> ${est.cantidadAprendices} aprendices (${est.porcentajeGrupo}%)`, margin + 3, y + 5);

    doc.setFontSize(7.8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(estLines, margin + 3, y + 9.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);
    doc.text(tdaLines, margin + 3, y + 9.5 + estLines.length * 3.6);

    y += needed + 3;
  });

  y += 4;

  // SECCIÓN 3: PLANIFICACIÓN PEDAGÓGICA SENA
  checkPageBreak(24);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('3. PLANIFICACIÓN PEDAGÓGICA DEL RAP 01 (ORDENADA POR PRIORIDAD)', margin, y);
  y += 5;

  reporte.planificacionPedagogica.forEach((item) => {
    const actLines = doc.splitTextToSize(`${item.prioridad}. ${item.actividadAprendizaje} (${item.duracionHoras}h)`, contentWidth - 6);
    const detailText = `Estilo: ${item.estiloObjetivo} | Estrategia: ${item.estrategiaSena} | TDA: ${item.tecnicaDidacticaActiva} | Evidencia: ${item.evidenciaYProducto} | Instrumento: ${item.instrumentoEvaluacion}`;
    const detLines = doc.splitTextToSize(detailText, contentWidth - 6);
    const needed = 7 + actLines.length * 3.8 + detLines.length * 3.4;

    checkPageBreak(needed);

    doc.setDrawColor(203, 213, 225);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, y, contentWidth, needed, 1.5, 1.5, 'FD');

    doc.setFontSize(8.2);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(21, 128, 61);
    doc.text(actLines, margin + 3, y + 5);

    doc.setFontSize(7.4);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(detLines, margin + 3, y + 5 + actLines.length * 3.8);

    y += needed + 2.5;
  });

  // Firma del Instructor
  checkPageBreak(26);
  y += 6;
  doc.setDrawColor(156, 163, 175);
  doc.line(margin + 55, y + 12, margin + contentWidth - 55, y + 12);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text(reporte.instructor, pageWidth / 2, y + 17, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Instructor Líder Técnico SENA - Ficha 2874102', pageWidth / 2, y + 21, { align: 'center' });

  doc.save(`SENA_Reporte_General_Planificacion_Ficha${reporte.ficha}.pdf`);
}

