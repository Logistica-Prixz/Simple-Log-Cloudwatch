#  Simple Log Cloudwatch
This library is useful to send logs to cloudwatch. 

## Getting Started

### Installation
Install via NPM:
```
npm install git+https://git@github.com/Logistica-Prixz/Simple-Log-Cloudwatch.git
```
 ---
### Using

 Import the package once it is installed

```
const  log4Cloudwatch  =  require('simple-log-cloudwatch');
```

Next step is to set the credentials

```
logs4cloudwatch.config({
    aws:{
        accessKeyId: 'xxxx',
        secretAccessKey: 'xxx',
        region: 'xxx'  
    },
    cw: {
        apiVersion: 'xxxx'
    }
})
```

You need to create the **Log Group** inside of [AWS](https://console.aws.amazon.com/).

The next thing that you have to do, it's set the **Log Group**  that you will send the **Logs**

```
log4Cloudwatch.setLogGroupName('xxxx')
```

Finally to save the logs in **Cloudwatch** you need to invoke the function **updateLogEvennt** and pass **two parameters**

##### Log Stream
*type*: String
*value*: Name of the Log Event 

##### Messages
*type*: Array of String
*value*: Messages that will be send it to Cloudwatch

```
log4Cloudwatch.updateLogEvent("01-01-2020",["test-message-1","test-message-2"])
```

---
#### Example
```
//import 
const  log4Cloudwatch  =  require('simple-log-cloudwatch');

//set the credentials of aws
logs4cloudwatch.config({
    aws:{
        accessKeyId: 'xxxx',
        secretAccessKey: 'xxx',
        region: 'xxx'  
    },
    cw: {
        apiVersion: 'xxxx'
    }
})

//set Log Group
log4Cloudwatch.setLogGroupName('xxxx')

//create the logs
log4Cloudwatch.updateLogEvent("01-01-2020",["test-message-1","test-message-2"])
```
---
### Additional Info

 - You need to have the permission to *create* **Log Stream** in **Cloudwatch**
 - You need to have the permission to *put* **Log Events** in **Cloudwatch**
 - You need to create **first** the **Log Group** inside of [AWS](https://console.aws.amazon.com/)
