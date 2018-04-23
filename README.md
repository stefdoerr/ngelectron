# ElectroNGL: Standalone NGL viewer

Uses Electron to convert the NGL viewer to a standalone application.

Based on the great [NGL](https://github.com/arose/ngl/) molecular viewer. 

## Install

```bash
git clone https://github.com/stefdoerr/ElectroNGL
cd ElectroNGL
npm install grpc --runtime=electron --target=1.8.4
npm install
bash compile_proto.sh
npm start
```


