async function discoverDevices(debug = false) {
    try {
        const options = {
            acceptAllDevices: true,
            optionalServices: ['95494af2-7100-441e-9ba1-b7d4c4a0253d'] // Replace with your service UUID
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

async function checkDeviceForService(device, serviceUuid, debug = false) {
    try {
        const server = await device.gatt.connect();
        if (debug) console.log('Connected to GATT server');
        
        const services = await server.getPrimaryServices();
        if (debug) console.log('Primary services: ', services.map(s => s.uuid));

        if (services.length === 0) {
            throw new Error('No services found in device.');
        }

        const serviceUUIDs = services.map(service => service.uuid);
        const hasService = serviceUUIDs.includes(serviceUuid);
        await server.disconnect();
        if (debug) console.log(`Device ${device.name} has services: ${serviceUUIDs.join(', ')}`);
        return { hasService, serviceUUIDs };
    } catch (error) {
        if (debug) console.error('Error checking for service: ', error);
        throw error;
    }
}


async function connectToDevice(device, debug = false) {
    try {
        if (debug) console.log('Connecting to device: ', device);
        const server = await device.gatt.connect();
        document.getElementById('status').innerText += '\nConnected to device';
        if (debug) console.log('Connected to device');
        await discoverServices(server, debug);
    } catch (error) {
        if (debug) console.error('Error connecting to device: ', error);
        throw error;
    }
}

async function discoverServices(server, debug = false) {
    try {
        const service = await server.getPrimaryService('95494af2-7100-441e-9ba1-b7d4c4a0253d'); // Replace with your service UUID
        if (debug) console.log('Discovered service: ', service);
        //const characteristic = await service.getCharacteristic('your-characteristic-uuid'); // Replace with your characteristic UUID
        //if (debug) console.log('Discovered characteristic: ', characteristic);
        document.getElementById('status').innerText += '\nService and characteristic discovered';
        await communicateWithDevice(characteristic, debug);
    } catch (error) {
        if (debug) console.error('Error discovering services: ', error);
        throw error;
    }
}

async function communicateWithDevice(characteristic, debug = false) {
    try {
        // Reading data
        const value = await characteristic.readValue();
        const decodedValue = new TextDecoder().decode(value);
        if (debug) console.log('Received value: ', decodedValue);
        document.getElementById('status').innerText += '\nReceived value: ' + decodedValue;

        // Writing data
        const data = new TextEncoder().encode('your-data');
        await characteristic.writeValue(data);
        if (debug) console.log('Data sent to device');
        document.getElementById('status').innerText += '\nData sent to device';
    } catch (error) {
        if (debug) console.error('Error communicating with device: ', error);
        throw error;
    }
}
