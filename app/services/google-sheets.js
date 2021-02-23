export function GetArticleData(from, to) {
  let url = `https://sheets.googleapis.com/v4/spreadsheets/1QBpMzYuiyCFXUXx56YL4kLaXtgUwsy5M9G4NBQaohow/values:batchGet?ranges=Sheet1!A${from}:D${to}&majorDimension=ROWS&key=AIzaSyDhVHAe21X1yrTsAQcBwdwoYGoy_53dbVg`;
  console.log(url);
  return fetch(url, {method: 'GET'})
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      },
    )
    .catch((error) => {
      console.log(error);
    });
}
