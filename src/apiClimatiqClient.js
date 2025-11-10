export async function estimateEmissions(km) {
  const res = await fetch('/.netlify/functions/estimate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ km })
  });
  if (!res.ok) throw new Error(`Serverfel ${res.status}`);
  const data = await res.json();
  return data;
}
