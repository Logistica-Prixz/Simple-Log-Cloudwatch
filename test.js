const pr = require('./log4Cloudwatch');

(async function(){

    try{
        console.log('inicio')
        pr.config({
            aws:{
                accessKeyId: 'xx',
                secretAccessKey: 'xxx',
                region: 'us-east-1'
            },
            cw: {
                apiVersion: '2014-03-28'
            }
        })
        pr.setLogGroupName('xxx')

        //await pr.createLogStream("prueba-nombre")
        let a= await pr.updateLogEvent("prueba-nombre",["mensaje 1","mensaje 2", "mensaje 3"])
        console.log('final a',a)
    }catch(error){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",error)
    }


}())