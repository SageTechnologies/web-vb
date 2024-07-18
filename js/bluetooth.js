async function discoverDevices(debug = false) {
    try {
        const options = {
            filters: [{ namePrefix: 'GEOPH' }],
            optionalServices: ['generic_access'] // Include generic_access to discover all devices

            // Here, we use a simple options object without 'namePrefix'
            //filters: []
        };
        const deviceList = [];

        if (debug) console.log('Requesting devices with options: ', options);
        
        const scan = await navigator.bluetooth.requestLEScan(options);

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

        if (debug) console.log('Scanning for advertisements...');
        
    } catch (error) {
        if (debug) console.error('Error discovering devices: ', error);
        document.getElementById('status').innerText = `Error: ${error.message}`;
    }
}
