const REMOTE_URL =
  /* Låst, verifierad version (med commit-hash): 'https://gist.githubusercontent.com/eriobe/9e86b6e1cf69b52c6cad59963fdc2624/raw/3e25475edd3084bd93233ee80710a87a1dddb582/airports.json'; */
  // Alltid senaste versionen (så länge aktuell gist finns kvar):
  'https://gist.githubusercontent.com/eriobe/9e86b6e1cf69b52c6cad59963fdc2624/raw/airports.json';

// Fallback lösning (ovanstående commit-hash version har dessutom sparats lokalt):
const LOCAL_URL = 'airports.json';

async function getAirports(url) {
  const result = await fetch(url);
  const data = await result.json();
  return data;
}

export async function getAirportsFromUrl() {
  return await getAirports(REMOTE_URL);
}

export async function getAirportsFromLocalJson() {
  return await getAirports(LOCAL_URL);
}
