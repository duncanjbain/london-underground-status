const TFL_API_URL ="https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status";

async function getTflStatus(apiURL) {
    let response = await fetch(apiURL);
    return await response.json();
}

function styleStatusElement(lineName,styledContainer) {
    switch(lineName) {
        case "bakerloo":
            styledContainer.classList.add('bakerloo');
            break;
        case "central":
            styledContainer.classList.add('central');
            break;
        case "circle":
            styledContainer.classList.add('circle');
            break;
        case "district":
            styledContainer.classList.add('district');
            break;
        case "dlr":
            styledContainer.classList.add('dlr');
            break;
        case "hammersmith-city":
            styledContainer.classList.add('hammersmith-city');
            break;
        case "jubilee":
            styledContainer.classList.add('jubilee');
            break;
        case "london-overground":
            styledContainer.classList.add('london-overground');
            break;
        case "metropolitan":
            styledContainer.classList.add('metropolitan');
            break;
        case "northern":
            styledContainer.classList.add('northern');
            break;
        case "piccadilly":
            styledContainer.classList.add('piccadilly');
            break;
        case "tfl-rail":
            styledContainer.classList.add('tfl-rail');
            break;
        case "victoria":
            styledContainer.classList.add('victoria');
            break;
        case "waterloo-city":
            styledContainer.classList.add('waterloo-city');
            break;
    }
}

function showTflStatus() {
getTflStatus(TFL_API_URL).then((data) => {
    data.forEach(line => {
        let lineStatusOverallContainer = document.createElement("div");
        lineStatusOverallContainer.className =
            "flex flex-row justify-between p-1 sm:p-2 border-b border-gray";
        lineStatusOverallContainer.id = line.id;

        styleStatusElement(line.id,lineStatusOverallContainer)

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