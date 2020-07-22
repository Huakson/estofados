//classe responsavel em ouvir mensagens
//da central, não terminada pois não ultilizaremos
//mais o Steve, a Dojot tera a funcionalidade da central system


const websocket = require('ws');
const config = require('./config');

class chargepoint{

  constructor(url,callback){
    this.client=new websocket(url);
    this.callback=callback;
  };

  init(){

    this.client.onmessage=message=>{
      console.log(message)
      this.callback(message);
    };
  }

  reset(message){
    let msg={

    }
    
    this.enviar(msg)
  }


  enviar(message){
    this.client.send(message); 
    }
}

module.exports=chargepoint;