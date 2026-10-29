import { getState, today } from '../state/store.js';

/** Descarga una copia del progreso en JSON. Devuelve false si no se pudo generar. */
export function downloadBackup(prefix = 'lunapy-progreso') {
  try {
    // La herramienta de demo «Simular el día siguiente» no forma parte del progreso del alumno.
    const { dayOffset, ...data } = getState();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${prefix}-${today()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    return true;
  } catch {
    return false;
  }
}
