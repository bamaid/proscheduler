const getData = require('./scr.controller');
// const open = require('open');

class startUpServerTimer{
    constructor(){
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async startFirstTimer() {
        try {
            var date = new Date
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            // await open("https://www.youtube.com/watch?v=em9lziI07M4&ab_channel=Movieclips", {app: ['google chrome']});
            const gotData = await getData.getData()
            const promiseData = Promise.all([gotData])
            .then(res=>{
                this.startTimer()
            })
            console.log("started at:", strTime);
            return 
        } catch (error) {
            console.log("error apc",error)
        }   
    }

    async startTimer() {
    //10min check sleep is in MS
        await this.sleep(600000)
        try {
            var date = new Date
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            const gotData = await getData.getData()
            const promiseData = Promise.all([gotData])
            .then(res=>{
                this.startTimer()
            })
            console.log("called at:", strTime);
            return 
        } catch (error) {
            console.log("error apc",error)
        }   
    }
}
module.exports = startUpServerTimer