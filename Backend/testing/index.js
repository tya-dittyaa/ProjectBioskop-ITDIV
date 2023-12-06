async function checkAPI() {
  // const url = "https://api-bioskop13.dittyaa.my.id/schedule/available";
  const url = "http://localhost:3431/seat/purchased";

  const params = {
    scheduleId: "656eede15bbb627f23951da7",
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer fredjefdrewkardit",
    },
    body: JSON.stringify(params),
  };

  const response = await fetch(url, options);

  console.log(response.status);
  console.log(await response.json());
}

checkAPI();
