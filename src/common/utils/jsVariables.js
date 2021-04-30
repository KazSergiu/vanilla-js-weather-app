// Variables

export const currentDate = new Date().toDateString();
export const currentTimestamp = Math.floor(Date.now() / 1000.0);
export const dayNum = new Date(currentTimestamp * 1000).getDay();
export const storeLatLon = {};
export const storeTimestampTimezone = {};
export const oneHour = 3600;
