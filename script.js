const TFL_API_URL ="https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status";

async function getTflStatus(apiURL) {
    let response = await fetch(apiURL);
    return await response.json();
}

function showTflStatus() {
getTflStatus(TFL_API_URL).then((data) => {
    data.forEach(line => {
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

        lineStatusOverallContainer.append(lineNameContainer, lineStatusContainer);

        document.getElementById("status").appendChild(lineStatusOverallContainer);
    });
})
}

document.addEventListener('DOMContentLoaded', event => {
    showTflStatus() 
  })