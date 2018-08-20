var PROTO_PATH = __dirname + '/../communication.proto';
var grpc = require('grpc');
var comm_proto = grpc.load(PROTO_PATH).communication;



function trajToFrames(traj){
    var natoms = traj[0];
    var nframes = traj[1];
    var frames = new NGL.Frames('trajectory', 'b');
    var coords = [];

    for (f = 0; f < nframes; f += 1){
        coords.push(traj.slice(2 + f*natoms*3));  // Skip the two first numbers which are natoms, nframes
    }
    frames.coordinates = coords;
    return frames;
}

function loadStructure(call, callback){

    if (call.request.structure) {
        var stringBlob = new Blob( [ call.request.structure ], { type: 'text/plain'} );
        stage.loadFile(stringBlob, {
            ext: "pdb",
            name: call.request.name
        }).then(function(structureComponent) {
            var reqdata = call.request
            if (reqdata.repr_type){
                if (reqdata.repr_selection) {
                    structureComponent.addRepresentation(reqdata.repr_type, {sele: reqdata.repr_selection})
                } else {
                    structureComponent.addRepresentation(reqdata.repr_type)
                }
            } else {
                stage.defaultFileRepresentation(structureComponent)
            }
            if (reqdata.traj && (reqdata.traj.length != 0)){
                frames = trajToFrames(call.request.traj);
                structureComponent.addTrajectory(frames);
            }
        })
    }

    // stage.loadFile( stringBlob, { ext: "pdb", name: call.request.name, defaultRepresentation: true } );
    callback(null, {message: 'Loaded file!'});
}



function main() {
  var server = new grpc.Server();
  server.addService(comm_proto.MoleculeLoader.service, {loadMolecule: loadStructure});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();