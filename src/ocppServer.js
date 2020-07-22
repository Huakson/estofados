const websocket = require('ws');
const REQ = require('./atributesReq');
const config = require('./config');


class ocppServer{

  constructor(callback){
    this.server=new websocket.Server({port:config.port});
    this.callback=callback;
  }

  start() {
    this.server.on('connection',(ws)=>{
      console.log("conectado com sucesso ")     
      ws.on('message',(message)=>{

        let type =this.converteArray(message)[0];

        switch (Number(type)) {
          case 2:
            try {
              this.reset(message);

            } catch (error){
              console.log(error)              
            }
            break;
          case 3:
            try {
              
            } catch (error){
              console.log(error)
            }
            break;
        }
      })
    })
  }
  
  converteArray(data){
    if(data){
      let array=JSON.parse(data);
      return array;
    };
  }

  reset(message){
    let [_,uuid,command,payload]=this.converteArray(message);
  
    let dojotData = new Object();
    let atribute=REQ[command];
    dojotData[atribute]={
      uuid,
      payload,
    };
    this.callback(dojotData,'')
  }
  
}

module.exports=ocppServer;