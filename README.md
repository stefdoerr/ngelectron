# ngelectron: Standalone NGL viewer

Uses Electron to convert the NGL viewer to a standalone application.

Based on the great [NGL](https://github.com/arose/ngl/) molecular viewer. 

## Install

```bash
git clone https://github.com/stefdoerr/ngelectron
cd ngelectron
npm install grpc --runtime=electron --target=1.8.4
npm install
pip install grpcio-tools
bash compile_proto.sh
npm start
```

## Release

```bash
npm install electron-packager -g
electron-packager . --all --asar
```


