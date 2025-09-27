const moment = require('moment-timezone');

// Zona horaria de Venezuela (GMT-4)
const VENEZUELA_TIMEZONE = 'America/Caracas';

/**
 * Convierte una fecha/hora a la zona horaria de Venezuela
 * @param {Date|string} date - Fecha a convertir
 * @param {string} format - Formato de salida (opcional)
 * @returns {string} Fecha formateada en zona horaria de Venezuela
 */
function toVenezuelaTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return null;
  return moment(date).tz(VENEZUELA_TIMEZONE).format(format);
}

/**
 * Obtiene la fecha actual en zona horaria de Venezuela
 * @param {string} format - Formato de salida (opcional)
 * @returns {string} Fecha actual en zona horaria de Venezuela
 */
function getCurrentVenezuelaTime(format = 'YYYY-MM-DD HH:mm:ss') {
  return moment().tz(VENEZUELA_TIMEZONE).format(format);
}

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD para Venezuela
 * @returns {string} Fecha actual en formato YYYY-MM-DD
 */
function getCurrentVenezuelaDate() {
  return moment().tz(VENEZUELA_TIMEZONE).format('YYYY-MM-DD');
}

/**
 * Convierte una fecha a formato ISO para Venezuela
 * @param {Date|string} date - Fecha a convertir
 * @returns {string} Fecha en formato ISO para Venezuela
 */
function toVenezuelaISO(date) {
  if (!date) return null;
  return moment(date).tz(VENEZUELA_TIMEZONE).toISOString();
}

/**
 * Formatea una fecha para mostrar en la interfaz (formato legible)
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada para mostrar
 */
function formatForDisplay(date) {
  if (!date) return 'No registrada';
  return moment(date).tz(VENEZUELA_TIMEZONE).format('DD/MM/YYYY HH:mm:ss');
}

/**
 * Formatea solo la fecha para mostrar (sin hora)
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada para mostrar
 */
function formatDateForDisplay(date) {
  if (!date) return 'N/A';
  return moment(date).tz(VENEZUELA_TIMEZONE).format('DD/MM/YYYY');
}

module.exports = {
  toVenezuelaTime,
  getCurrentVenezuelaTime,
  getCurrentVenezuelaDate,
  toVenezuelaISO,
  formatForDisplay,
  formatDateForDisplay,
  VENEZUELA_TIMEZONE
};
