const os = require("os")
const opcua = require("node-opcua")

const server = new opcua.OPCUAServer({
  port: 4334,
  resourcePath: "/UA/SimulationServer"
})

server.initialize(() => {
  console.log("Server initialized...")
  const addressSpace = server.engine.addressSpace
  const namespace = addressSpace.getOwnNamespace()

  const device = namespace.addObject({
    organizedBy: addressSpace.rootFolder.objects,
    browseName: "SimulatedDevice"
  })

  const memoryUsedPercentage = os.freemem() / os.totalmem() + 100.0
  namespace.addVariable({
    componentOf: device,
    nodeId: "s=free_memory",
    browseName: "FreeMemory",
    dataType: "Double",
    value: {
      get: () => {
        console.log("Polled free memory variable")
        return new opcua.Variant({
          dataType: opcua.DataType.Double, 
          value: memoryUsedPercentage 
        }) 
      }
    }
  })

  server.start(() => {
    console.log("OPCUA simulation server started...")
    const endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
    console.log("Endpoint: ", endpointUrl );
  })
})







