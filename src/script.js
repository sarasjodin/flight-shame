import {
  AIRPORTS,
  getAirportByIata,
  haversineDistanceKm
} from './airports.db.js';
import { messageBox } from './components/messageComponent.js';

const selectFrom = document.getElementById('from-airport');
const selectTo = document.getElementById('to-airport');
const btn = document.getElementById('btn-calculate');
const resultBox = document.getElementById('result');

const sortedAirports = [...AIRPORTS].sort((a, b) =>
  a.iata.localeCompare(b.iata)
);

sortedAirports.forEach(({ name, iata }) => {
  selectFrom.append(new Option(`${iata} - ${name}`, iata));
  selectTo.append(new Option(`${iata} - ${name}`, iata));
});

function onCalculateClick(e) {
  e?.preventDefault();
  const from = getAirportByIata(selectFrom.value);
  const to = getAirportByIata(selectTo.value);
  try {
    const { distanceKm, haul } = distanceReport(from, to);

    resultBox.textContent = '';

    const infoBox = document.createElement('div');
    infoBox.classList.add('info');

    const text = document.createTextNode(
      `Från ${from.city} till ${to.city} = `
    );
    const strong = document.createElement('strong');
    strong.textContent = `${formatValue(distanceKm)} km`;
    const haulText = document.createTextNode(` (${haul})`);

    infoBox.append(text, strong, haulText);

    resultBox.appendChild(infoBox);
  } catch (error) {
    resultBox.textContent = '';
    resultBox.append(messageBox(error.message, 'error'));
  }
}

function formatValue(value) {
  return Math.round(value).toLocaleString();
}

function distanceReport(a, b) {
  if (!a || !b) throw new Error('Du måste välja två flygplatser');
  if (a.iata === b.iata)
    throw new Error('Du måste välja två olika flygplatser');
  const distanceKm = haversineDistanceKm(a, b);
  const haul = distanceKm >= 3700 ? 'långdistans' : 'kortdistans';
  return { distanceKm, haul };
}

btn.addEventListener('click', onCalculateClick);
