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
        checkMark.textContent = ' (checking...)';
        listItem.appendChild(checkMark);
        
        deviceList.appendChild(listItem);

        try {
            const { hasService, serviceUUIDs } = await checkDeviceForService(device, '95494af2-7100-441e-9ba1-b7d4c4a0253d', debug); // Replace with your service UUID
            checkMark.textContent = ` (${hasService ? '✓' : '✗'}, Services: ${serviceUUIDs.join(', ')})`;
            checkMark.classList.add(hasService ? 'checkmark' : 'crossmark');
            listItem.addEventListener('click', async () => {
                await handleDevice(device, debug);
            });
        } catch (error) {
            checkMark.textContent = ' ✗';
            console.error('Error checking service: ', error);
        }
    }
}
