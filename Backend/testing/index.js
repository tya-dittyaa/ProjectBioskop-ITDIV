async function checkAPI() {
  // const url = "https://api-bioskop13.dittyaa.my.id/schedule/available";
  const url = "http://localhost:3431/film/available";

  const params = {
    filmId: "656ec3601deb898295ca71bc",
    theaterId: "656ed96094aaeb7c79256c44",
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
