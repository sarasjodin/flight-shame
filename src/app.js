import { distanceReport } from './geo.js';
import { messageBox } from './components/messageComponent.js';
import {
  getAirportsFromUrl,
  getAirportsFromLocalJson
} from './airportClient.js';
import { estimateEmissions } from './apiClimatiqClient.js';

const selectFrom = document.getElementById('from-airport');
const selectTo = document.getElementById('to-airport');
const btn = document.getElementById('btn-calculate');
const resultBox = document.getElementById('result');

let airports = [];
try {
  airports = await getAirportsFromUrl();
  console.log('Loaded airports from remote gist.');
} catch (error) {
  console.warn('Remote fetch failed, trying local JSON...', error);
  try {
    airports = await getAirportsFromLocalJson();
    console.log('Loaded airports from local file.');
  } catch (error) {
    console.error('Local file airports fetch failed:', error);
    throw error;
  }
}

const sortedAirports = [...airports].sort((a, b) =>
  a.iata.localeCompare(b.iata)
);

sortedAirports.forEach(({ name, iata }) => {
  selectFrom.append(new Option(`${iata} - ${name}`, iata));
  selectTo.append(new Option(`${iata} - ${name}`, iata));
});

async function onCalculateClick(e) {
  e?.preventDefault();
  const from = getAirportByIata(selectFrom.value);
  const to = getAirportByIata(selectTo.value);
  try {
    const { distanceKm, haul } = distanceReport(from, to);
    const estimation = await estimateEmissions(distanceKm);
    const co2e = estimation.co2e || estimation;
    const unit = estimation.co2e_unit || 'kg';
    resultBox.textContent = '';

    const infoBox = document.createElement('div');
    infoBox.classList.add('info');

    const text = document.createTextNode(
      `Från ${from.city} till ${to.city} = `
    );
    const strong = document.createElement('strong');
    strong.textContent = `${formatValue(distanceKm, haul)} km`;
    const haulText = document.createTextNode(` (${haul})
      vilket innebär ${formatValue(co2e)} ${unit} koldioxid`);

    infoBox.append(text, strong, haulText);

    resultBox.appendChild(infoBox);
  } catch (error) {
    resultBox.textContent = '';
    resultBox.append(messageBox(error.message, 'error'));
  }
}

function getAirportByIata(iata) {
  return airports.find((a) => a.iata === iata);
}

function formatValue(value) {
  return Math.round(value).toLocaleString();
}

btn.addEventListener('click', onCalculateClick);
