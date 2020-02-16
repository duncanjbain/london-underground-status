const TFL_URL =
  "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status";

fetch(TFL_URL)
  .then(resp => resp.json()) // Transform the data into json
  .then(data => {
    console.log(data);
    data.forEach(line => {
      let lineStatusOverallContainer = document.createElement("div");
      lineStatusOverallContainer.className =
        "flex flex-row justify-between py-2";

      let lineNameContainer = document.createElement("p");
      let lineName = document.createTextNode(line.name);
      lineNameContainer.appendChild(lineName);

      let lineStatusContainer = document.createElement("p");
      let lineStatus = document.createTextNode(
        line.lineStatuses[0].statusSeverityDescription
      );
      lineStatusContainer.appendChild(lineStatus);

      lineStatusOverallContainer.append(lineNameContainer, lineStatusContainer);

      document.getElementById("status").appendChild(lineStatusOverallContainer);
    });
  });
