const baseUrl = 'https://api.climatiq.io';

export async function handler(event) {
  const { km } =
    event.httpMethod === 'POST'
      ? JSON.parse(event.body || '{}')
      : Object.fromEntries(new URL(event.rawUrl).searchParams);

  const apiKey = process.env.CLIMATIQ_API_KEY;

  function choseActivityIdByKm(km) {
    if (km > 3700) {
      return 'passenger_flight-route_type_international-aircraft_type_na-distance_long_haul_gt_3700km-class_economy-rf_included-distance_uplift_included';
    }
    return 'passenger_flight-route_type_international-aircraft_type_na-distance_short_haul_lt_3700km-class_economy-rf_included-distance_uplift_included';
  }

  const activity_id = choseActivityIdByKm(Number(km));

  const res = await fetch(`${baseUrl}/data/v1/estimate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      emission_factor: {
        activity_id,
        data_version: '^27'
      },
      parameters: { distance: Number(km), distance_unit: 'km' }
    })
  });

  if (!res.ok) {
    const err = await res.text().catch(() => '');
    return {
      statusCode: res.status,
      body: JSON.stringify({ error: err || 'Climatiq error' })
    };
  }

  const data = await res.json();
  return {
    statusCode: 200,
    body: JSON.stringify({
      co2e: data.co2e,
      co2e_unit: data.co2e_unit
    })
  };
}
