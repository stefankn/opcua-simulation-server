const opcua = require("node-opcua")
const config = require('./config')

const server = new opcua.OPCUAServer({
  port: config.port,
  resourcePath: config.resourcePath
})

server.initialize(() => {
  console.log("Server initialized...")
  const addressSpace = server.engine.addressSpace
  const namespace = addressSpace.getOwnNamespace()

  
  const device = namespace.addObject({
    organizedBy: addressSpace.rootFolder.objects,
    browseName: config.deviceName
  })

  console.log(`Added device "${device.browseName} (${device.nodeId})"...`)

  config.variables.forEach(variable => {
    const v = namespace.addVariable({
      componentOf: device,
      nodeId: variable.nodeId,
      browseName: variable.name,
      dataType: variable.dataType,
      value: { get: variable.value }
    })
    console.log(`Added variable "${v.browseName} (${v.nodeId})"...`)
  })

  server.start(() => {
    console.log("OPCUA simulation server started...")
    const endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
    console.log(`Endpoint: ${endpointUrl}`);
  })
})
