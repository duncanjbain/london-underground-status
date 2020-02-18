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

        switch(line.id) {
            case "bakerloo":
                lineStatusOverallContainer.classList.add('bakerloo-line');
                break;
            case "central":
                lineStatusOverallContainer.classList.add('central-line');
                break;
            case "circle":
                lineStatusOverallContainer.classList.add('circle-line');
                break;
            case "district":
                lineStatusOverallContainer.classList.add('district-line');
                break;
            case "dlr":
                lineStatusOverallContainer.classList.add('dlr');
                break;
            case "hammersmith-city":
                lineStatusOverallContainer.classList.add('hammersmith-city-line');
                break;
            case "jubilee":
                lineStatusOverallContainer.classList.add('jubilee-line');
                break;
            case "london-overground":
                lineStatusOverallContainer.classList.add('overground');
                break;
            case "metropolitan":
                lineStatusOverallContainer.classList.add('metropolitan-line');
                break;
            case "northern":
                lineStatusOverallContainer.classList.add('northern-line');
                break;
            case "piccadilly":
                lineStatusOverallContainer.classList.add('piccadilly-line');
                break;
            case "tfl-rail":
                lineStatusOverallContainer.classList.add('tfl-rail');
                break;
            case "victoria":
                lineStatusOverallContainer.classList.add('victoria-line');
                break;
            case "waterloo-city":
                lineStatusOverallContainer.classList.add('waterloo-city-line');
                break;
        }

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