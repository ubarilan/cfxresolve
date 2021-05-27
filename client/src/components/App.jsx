import React, { useState } from 'react';
import Input from '@bit/semantic-org.semantic-ui-react.input';
import '../App.css';

const center = {
    position: 'fixed',
    top: '50%',
    left: '50%',
};

const InputExampleActionIconButton = (props) => (
    <Input
        focus
        size="big"
        icon="user"
        placeholder="Type cfx.re address or code"
        label="Cfx.re address or code"
        onChange={props.onChange}
    />
);

async function getFivemServerData(codeOrLink) {
    codeOrLink = getFivemCode(codeOrLink);
    try {
        let httpData = await fetch(
            `${window.location.protocol}//${window.location.host}/api/fivemserver/${codeOrLink}`
        ).then((data) => data.json());

        return httpData;
    } catch {
        return { status: 404 };
    }
}

function getFivemCode(codeOrLink) {
    return codeOrLink.split('/')[codeOrLink.split('/').length - 1];
}

function getOSfromServer(serverString) {
    let brkDwnStr = serverString.split(' ');
    let os = brkDwnStr[brkDwnStr.length - 1];

    if (os === 'linux') return 'Linux';
    else if (os === 'win32') return 'Microsoft Windows';
    else return 'Unknown Operating System'; //Sorry BSD users
}

function displayFivemDetails(details) {
    let codeOrLink = document.getElementsByTagName?.('input')?.[0]?.value;
    if (!codeOrLink) return;
    if (getFivemCode(codeOrLink) !== details.EndPoint) return;
    if (!details || details.status === 404) return;
    let displayString = `Connection Endpoint: ${details.Data.connectEndPoints[0]}\n\n`;
    displayString += `Players: ${details.Data.clients}/${details.Data.sv_maxclients}\n\n`;
    displayString += `Hostname: ${details.Data.hostname}\n\n`;
    displayString += `Server Owner Profile: ${details.Data.ownerProfile}\n\n`;
    displayString += `Server OS: ${getOSfromServer(details.Data.server)}\n\n`;
    displayString += `OneSync Enabled: ${
        details.Data?.vars?.onesync_enabled ? 'Yes' : 'No'
    }\n\n`;
    console.log(displayString);
}

function App() {
    const [httpData, setHttpData] = useState({ status: 404 });
    displayFivemDetails(httpData);
    async function handleInputChange(event) {
        let codeOrLink = event.target.value;
        let data = await getFivemServerData(codeOrLink);
        httpData !== data && setHttpData(data);
        displayFivemDetails(httpData);
    }

    return (
        <div style={center}>
            <InputExampleActionIconButton onChange={handleInputChange} />
        </div>
    );
}

export default App;
