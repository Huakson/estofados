const websocketServer = require('./ocppServer');
const IotAgent = require('@dojot/iotagent-nodejs');


/*const Chargepoint = require('./chargepoint');    
const chargepoint = new Chargepoint(callback2);
function callback2(message,command) {
  console.log(message,command);
}
*/

let iotAgent = new IotAgent.IoTAgent();

iotAgent.init().then( () => {
  console.log('Succeeded to start the HTTP IoT Agent');
  
  iotAgent.messenger.on('iotagent.device', 'device.create', (tenant, event) => {
    console.log(`Received device.create event ${JSON.stringify(event)} for tenant ${tenant}.`);
    let ao = JSON.parse(JSON.stringify(event));
    
    let deviceId = ao.data.id;
    //const tenantId= ao.data.tenant;

    function callback(message,command){
      iotAgent.updateAttrs(deviceId, 'admin',message,{});
    }

    const iotServer = new websocketServer(callback);
    try {
      iotServer.start();
    } catch (error) {
      console.log(error.toString());
    }

  });
    
  iotAgent.messenger.on('iotagent.device', 'device.update', (tenant, event) => { 
    console.log(`Received device.update event ${JSON.stringify(event)} for tenant ${tenant}.`);
  });

  iotAgent.messenger.on('iotagent.device', 'device.remove', (tenant, event) => {
    console.log(`Received device.update event ${JSON.stringify(event)} for tenant ${tenant}.`);  
  });

  iotAgent.messenger.generateDeviceCreateEventForActiveDevices();
  

  
}).catch( (error) => {
    console.error(`Failed to initialize the HTTP IoT Agent (${error})`);
    process.exit(1);
});

