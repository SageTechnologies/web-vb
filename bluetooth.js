async function discoverDevices(debug = false) {
    try {
        const options = {
            filters: [{ namePrefix: '' }],
            optionalServices: ['generic_access'] // Include generic_access to discover all devices
        };
        const deviceList = [];

        if (debug) console.log('Requesting devices with options: ', options);
        
        // Navigator bluetooth scan returns a promise
        navigator.bluetooth.requestLEScan(options).then(scan => {
            navigator.bluetooth.addEventListener('advertisementreceived', event => {
                const device = {
                    name: event.device.name,
                    uuids: event.uuids || [],
                };
                if (debug) {
                    console.log('Advertisement received:', device);
                }
                deviceList.push(device);
                displayDevices(deviceList, debug);
            });
        });
    } catch (error) {
        if (debug) console.error('Error discovering devices: ', error);
        document.getElementById('status').innerText = `Error: ${error.message}`;
    }
}
