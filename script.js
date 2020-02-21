const TFL_API_URL =
  "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status";

async function getTflStatus(apiURL) {
  let response = await fetch(apiURL);
  return await response.json();
}

function filterNormalLines(data) {
  let normalLinesOnly = data.filter(function(lineInfo) {
    return lineInfo.lineStatuses[0].statusSeverity === 10;
  });
  return normalLinesOnly;
}

function filterNonNormalLines(data) {
  let nonNormalLinesOnly = data.filter(function(lineInfo) {
    return lineInfo.lineStatuses[0].statusSeverity !== 10;
  });
  return nonNormalLinesOnly;
}

function showTflStatus() {
  getTflStatus(TFL_API_URL).then(data => {
    console.log(data);

    let nonNormalLinesOnly = filterNonNormalLines(data);
    let normalLinesOnly = filterNormalLines(data);

    console.log(nonNormalLinesOnly);
    nonNormalLinesOnly.forEach(line => {
      let lineStatusOverallContainer = document.createElement("div");
      lineStatusOverallContainer.className =
        "flex flex-row justify-between p-1 sm:p-2 border-b border-gray";
      lineStatusOverallContainer.id = line.id;

      lineStatusOverallContainer.classList.add(line.id);

      let lineNameContainer = document.createElement("p");
      let lineName = document.createTextNode(line.name);
      lineNameContainer.appendChild(lineName);

      let lineStatusContainer = document.createElement("p");
      let lineStatus = document.createTextNode(
        line.lineStatuses[0].statusSeverityDescription
      );
      lineStatusContainer.appendChild(lineStatus);

      line.lineStatuses[0].statusSeverityDescription !== "Good Service"
        ? lineStatusContainer.classList.add("font-bold")
        : lineStatusContainer.classList.add("font-normal");

      lineStatusOverallContainer.append(lineNameContainer, lineStatusContainer);

      document.getElementById("status").appendChild(lineStatusOverallContainer);
    });

    normalLinesOnly.forEach(line => {
      let lineStatusOverallContainer = document.createElement("div");
      lineStatusOverallContainer.className =
        "flex flex-row justify-between p-1 sm:p-2 border-b border-gray";
      lineStatusOverallContainer.id = line.id;

      lineStatusOverallContainer.classList.add(line.id);

      let lineNameContainer = document.createElement("p");
      let lineName = document.createTextNode(line.name);
      lineNameContainer.appendChild(lineName);

      let lineStatusContainer = document.createElement("p");
      let lineStatus = document.createTextNode(
        line.lineStatuses[0].statusSeverityDescription
      );
      lineStatusContainer.appendChild(lineStatus);

      line.lineStatuses[0].statusSeverityDescription !== "Good Service"
        ? lineStatusContainer.classList.add("font-bold")
        : lineStatusContainer.classList.add("font-normal");

      lineStatusOverallContainer.append(lineNameContainer, lineStatusContainer);

      document.getElementById("status").appendChild(lineStatusOverallContainer);
    });
  });
}

document.addEventListener("DOMContentLoaded", event => {
  showTflStatus();
});
