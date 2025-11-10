function haversineDistanceKm(a, b) {
  const R = 6371.0;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export function distanceReport(a, b) {
  if (!a || !b) throw new Error('Du måste välja två flygplatser');
  if (a.iata === b.iata)
    throw new Error('Du måste välja två olika flygplatser');
  const distanceKm = haversineDistanceKm(a, b);
  const haul = distanceKm >= 3700 ? 'långdistans' : 'kortdistans';
  return { distanceKm, haul };
}
