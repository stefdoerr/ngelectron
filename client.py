import grpc
from htmd.molecule.molecule import Molecule
import base64
from tempfile import TemporaryDirectory


import communication_pb2
import communication_pb2_grpc


def get_structure_blob(mol, binary=False):
    fname = 'tmp.pdb'
    with TemporaryDirectory():
        mol.write(fname)
        with open(fname) as fh:
            blob = fh.read()

    if binary:
        blob = base64.b64encode(blob).decode('utf8')
    return blob


def run():
    mol = Molecule('3PTB')
    blob = get_structure_blob(mol)
    print(mol.coords[0:2, :, 0], mol.coords.shape)
    # trajbytes = base64.b64encode(mol.coords.flatten())

    channel = grpc.insecure_channel('localhost:50051')
    stub = communication_pb2_grpc.MoleculeLoaderStub(channel)
    data = communication_pb2.MoleculeData(name=mol.viewname,
                                          structure=blob,
                                          repr_type='ball+stick',
                                          repr_selection='hetero',
                                          traj=mol.coords.flatten().tolist())

    response = stub.LoadMolecule(data)
    print("Greeter client received: " + response.message)


if __name__ == '__main__':
    run()