const key =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMDc0YzBkN2U0MThmNzQwZmVlN2UwZjFkN2ZmZTAzMDVmYjMxZWNkYWQ1OTZlMmE4NTEyZTkzNDNmOWRmNzEyN2YzN2YzYTE0YmU4N2RhNTYiLCJpYXQiOjE2NjUzNTUxODEsIm5iZiI6MTY2NTM1NTE4MSwiZXhwIjoxNjk2ODkxMTgxLCJzdWIiOiIxNDc0NCIsInNjb3BlcyI6W119.c4-Lr5o2P81-6CnBj2htVE_caCb00c6eur0g-T_wMr7Ts4AKzm580eifC1-jziiymagidu_FMM9VzXPXkmrL4Q";
export const fetchFlights = async ({
  originText,
  destinationText,
  departureDate,
  returnDate,
  isRoundTrip,
  setData,
}) => {
    const data = null;
  await fetch(
    `https://app.goflightlabs.com/search-best-flights?access_key=${key}&adults=1&origin=${originText}&destination=${destinationText}&departureDate=${departureDate}${
      isRoundTrip ? `&returnDate=${returnDate}` : ``
    }`
  )
    .then((response) => response.json())
    .then((json) => {
      setData(json)
    })
    .catch((error) => console.error(error));
    return data;
};
