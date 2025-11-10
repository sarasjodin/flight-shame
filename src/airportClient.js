export async function getAirportsFromUrl() {
  const url =
    'https://gist.githubusercontent.com/eriobe/9e86b6e1cf69b52c6cad59963fdc2624/raw/3e25475edd3084bd93233ee80710a87a1dddb582/airports.json';
  const result = await fetch(url);
  const data = await result.json();
  return data;
}
