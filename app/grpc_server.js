var PROTO_PATH = __dirname + '/../communication.proto';
var grpc = require('grpc');
var comm_proto = grpc.load(PROTO_PATH).communication;


function loadStructure(call, callback){
    var stringBlob = new Blob( [ call.request.structure ], { type: 'text/plain'} );
    console.log(stringBlob);
    stage.loadFile( stringBlob, { ext: "pdb", name: call.request.name, defaultRepresentation: true } );
    callback(null, {message: 'Loaded file!'});
}

function loadCoordinates(call, callback){

}


function main() {
  var server = new grpc.Server();
  server.addService(comm_proto.StructureLoader.service, {loadStructure: loadStructure});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();