export const getTwoDigitHours = (date: { getHours: () => number; }) => date && (date.getHours() < 10 ? '0' : '') + date.getHours();

export const getTwoDigitMinutes = (date: { getMinutes: () => number; }) => date && (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

