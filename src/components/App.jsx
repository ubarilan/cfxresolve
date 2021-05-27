import React, { useState } from 'react';
import Input from '@bit/semantic-org.semantic-ui-react.input';
import CFXInfoCard from './CFXInfoCard';
import '../App.css';

async function getFivemServerData(codeOrLink) {
    codeOrLink = getLastURLSlash(codeOrLink);
    try {
        let httpData = (
            await fetch(
                `/corsproxy.php?url=https://servers-live.fivem.net/api/servers/single/${codeOrLink}`
            ).then((data) => data.json())
        ).contents;

        return httpData;
    } catch {
        return { status: 404 };
    }
}

function getLastURLSlash(codeOrLink) {
    return codeOrLink.toLocaleLowerCase().split('/')[
        codeOrLink.split('/').length - 1
    ];
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
    if (getLastURLSlash(codeOrLink) !== details.EndPoint) return;
    if (!details || !details.Data || details.status === 404) return;
    let displayString = `Connection Endpoint: ${details.Data.connectEndPoints[0]}\n\n`;
    displayString += `Players: ${details.Data.clients}/${details.Data.sv_maxclients}\n\n`;
    displayString += `Hostname: ${details.Data.hostname}\n\n`;
    displayString += `Server Owner Profile: ${details.Data.ownerProfile}\n\n`;
    displayString += `Server OS: ${getOSfromServer(details.Data.server)}\n\n`;
    displayString += `OneSync Enabled: ${
        details.Data?.vars?.onesync_enabled ? 'Yes' : 'No'
    }\n\n`;
    console.clear();
    console.log(displayString);
}

function App() {
    const [httpData, setHttpData] = useState({ status: 404 });
    const [isLoading, setLoading] = useState(false);
    displayFivemDetails(httpData);
    async function handleInputChange(event) {
        let codeOrLink = event.target.value;

        setLoading(true);
        let data = await getFivemServerData(codeOrLink);
        httpData !== data && setHttpData(data);
        displayFivemDetails(httpData);
        setLoading(false);
    }

    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <Input
                loading={isLoading}
                focus
                size="big"
                icon="user"
                placeholder="Type cfx.re link or code"
                label="Cfx.re link or code"
                onChange={handleInputChange}
            />
            <div style={{ marginTop: '5%' }}>
                {httpData && httpData.status !== 404 && httpData.Data && (
                    <CFXInfoCard
                        ip={httpData.Data.connectEndPoints[0]}
                        clients={httpData.Data.clients}
                        maxclients={httpData.Data.sv_maxclients}
                        os={getOSfromServer(httpData.Data.server)}
                        onesync={
                            httpData.Data?.vars?.onesync_enabled ? 'Yes' : 'No'
                        }
                        profileurl={httpData.Data.ownerProfile}
                        profilename={httpData.Data.ownerName}
                        profilepic={httpData.Data.ownerAvatar}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
