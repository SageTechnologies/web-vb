document.getElementById('discover-button').addEventListener('click', () => {
    const debug = document.getElementById('debug-checkbox').checked;
    discoverDevices(debug);
});

function displayDevices(devices, debug = false) {
    const deviceList = document.getElementById('device-list');
    deviceList.innerHTML = '';

    for (const device of devices) {
        const listItem = document.createElement('li');
        listItem.textContent = device.name || 'Unnamed Device';

        const uuids = device.uuids ? device.uuids.join(', ') : 'No UUIDs available';
        const checkMark = document.createElement('span');
        checkMark.textContent = ` (Services: ${uuids})`;
        listItem.appendChild(checkMark);
        
        deviceList.appendChild(listItem);

        if (debug) {
            console.log(`Device: ${device.name}, UUIDs: ${uuids}`);
        }
    }
}
