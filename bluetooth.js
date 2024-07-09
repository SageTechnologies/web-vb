async function discoverDevices(debug = false) {
    try {
        const options = {
            acceptAllDevices: true
        };
        if (debug) console.log('Requesting devices with options: ', options);
        const device = await navigator.bluetooth.requestDevice(options);
        if (debug) console.log('Discovered device: ', device);
        return [device];
    } catch (error) {
        if (debug) console.error('Error discovering devices: ', error);
        throw error;
    }
}
