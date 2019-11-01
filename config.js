const os = require("os")
const opcua = require("node-opcua")

const config = {
  resourcePath: "/UA/SimulationServer",
  port: 4334,
  deviceName: "SimulatedDevice",

  variables: [
    { 
      name: "Free nemory", 
      nodeId: "s=free_memory",
      dataType: "Int64",
      value: () => { 
        return new opcua.Variant({
          dataType: opcua.DataType.Int64, 
          value: os.freemem()
        })
      }
    },

    { 
      name: "Uptime", 
      nodeId: "s=uptime",
      dataType: "Int64",
      value: () => { 
        return new opcua.Variant({
          dataType: opcua.DataType.Int64, 
          value: os.uptime()
        })
      }
    },

    { 
      name: "Load average (1m)", 
      nodeId: "s=loadavg1",
      dataType: "Double",
      value: () => { 
        return new opcua.Variant({
          dataType: opcua.DataType.Double, 
          value: os.loadavg()[0]
        })
      }
    },

    { 
      name: "Load average (5m)", 
      nodeId: "s=loadavg5",
      dataType: "Double",
      value: () => { 
        return new opcua.Variant({
          dataType: opcua.DataType.Double, 
          value: os.loadavg()[1]
        })
      }
    },

    { 
      name: "Load average (15m)", 
      nodeId: "s=loadavg15",
      dataType: "Double",
      value: () => { 
        return new opcua.Variant({
          dataType: opcua.DataType.Double, 
          value: os.loadavg()[2]
        })
      }
    }

  ]
}

module.exports = config