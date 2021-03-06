const AWS = require('aws-sdk');
let cloudwatchlogs = "";
let status = false
let logGroupName = false

function config(config){
    if(!config.aws || !config.cw){
        throw new Error("You need to stablish the credentials");
    }
    AWS.config.update(config.aws)
    //{apiVersion: {a.cw}}
    cloudwatchlogs = new AWS.CloudWatchLogs({apiVersion: config.cw.apiVersion });
}

function setLogGroupName(logGroupName){
    this.logGroupName = logGroupName
}

function _createLogStream(...params){
    return new Promise((resolve, reject) => {

        let parametersCW = {
            logGroupName: params[0],
            logStreamName: params[1]
        }

        cloudwatchlogs.createLogStream(parametersCW, async function(err, data) {
            if (err){
                if(err.code==="ResourceAlreadyExistsException"){
                    status=true
                    return resolve(true)
                }
                return reject(err)
            }
            return resolve(true)
        })
    })
}

async function updateLogEvent(logStream,messages){
    //await createLogStream(logStream)
    return new Promise(async (resolve, reject) => {
        if(!this.logGroupName){
            return reject(_errors(1))
        }
        if(messages.length==0){
            return reject(_errors(3))
        }
        if(logStream===null || logStream===''){
            return reject(_errors(1))
        }
        
        try{
            await _createLogStream(this.logGroupName,logStream)
        }catch(error){
            return reject(error)
        }
        let arrayMessages = []
        //with this foreach iterate all string messages passing in the parameters and we add the timestamp and we pushed in a new array
        messages.forEach((message) => { arrayMessages.push({message,timestamp: new Date().getTime()}) })

        let paramsEvent = {
            logEvents: arrayMessages,
            logGroupName: this.logGroupName,
            logStreamName: logStream
        };
        
        try{
            await _putLogEventsCW(paramsEvent,0)
            return resolve(true)
        }catch(error){
            return reject(error)
        }
    })
}

async function _putLogEventsCW(paramsEvent,tryNumbers,token){
    return new Promise(async (resolve, reject) => {
        cloudwatchlogs.putLogEvents(paramsEvent, async function(err, data) {
            if (err){
                if(tryNumbers>=2){
                    return reject(err)
                }
                if(err.code && (err.code ==="InvalidSequenceTokenException" || err.code==='DataAlreadyAcceptedException')){
                    let numberToken = err.message.match(/\d+/)
                    try{
                        paramsEvent.sequenceToken = String(numberToken)
                        await _putLogEventsCW(paramsEvent,tryNumbers=tryNumbers+1,numberToken)
                        return resolve(true)
                    }catch(error){
                        return reject(error)
                    }
                }
                return reject(err)
            }else {
                return resolve(true)
            }
        });
    })
}


function _errors(numberError){
    switch(numberError){
        case 1:
            return new Error('You need send the log name')
        case 2:
            return new Error('You need to establish the log group name')
        case 3:
            return new Error('You need to send one message at least')
    }
}



module.exports = {
    config,
    setLogGroupName,
    updateLogEvent
}