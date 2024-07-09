document.getElementById('discover-button').addEventListener('click', async () => {
    const debug = document.getElementById('debug-checkbox').checked;
    try {
        const device = await discoverDevice(debug);
        handleDevice(device, debug);
    } catch (error) {
        console.error('Error: ', error);
        document.getElementById('status').innerText = `Error: ${error.message}`;
    }
});

async function handleDevice(device, debug = false) {
    document.getElementById('status').innerText = `Selected device: ${device.name}`;
    if (debug) console.log('Selected device: ', device);
    await connectToDevice(device, debug);
}
