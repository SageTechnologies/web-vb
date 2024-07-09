document.getElementById('discover-button').addEventListener('click', async () => {
    const debug = document.getElementById('debug-checkbox').checked;
    try {
        const devices = await discoverDevices(debug);
        displayDevices(devices, debug);
    } catch (error) {
        console.error('Error: ', error);
        document.getElementById('status').innerText = `Error: ${error.message}`;
    }
});

async function displayDevices(devices, debug = false) {
    const deviceList = document.getElementById('device-list');
    deviceList.innerHTML = '';

    for (const device of devices) {
        const listItem = document.createElement('li');
        listItem.textContent = device.name || 'Unnamed Device';

        const checkMark = document.createElement('span');
        checkMark.textContent = ` (Services: ${device.uuids.join(', ')})`;
        listItem.appendChild(checkMark);
        
        deviceList.appendChild(listItem);

        if (debug) {
            console.log(`Device: ${device.name}, UUIDs: ${device.uuids.join(', ')}`);
        }
    }
}
