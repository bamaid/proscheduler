const puppeteer = require("puppeteer");
const open = require('open');

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

const checkSponsor =  async (page, url) => {
    try{
        await page.waitForSelector('#test_sponsor')

        await page.evaluate(()=> {
          $("#test_sponsor option:contains('National Board of Medical Examiners')")[0].selected = true
          const event = new Event('change', {bubbles: true});
          event.simulated = true;
          document.querySelector('select#test_sponsor').dispatchEvent(event);
        });

        await page.waitForSelector('#testProgram')

        await page.evaluate(()=> {
          $("#testProgram option:contains('STEP1')")[0].selected = true
          const event = new Event('change', {bubbles: true});
          event.simulated = true;
          document.querySelector('select#testProgram').dispatchEvent(event);
        });

        await page.waitForSelector('#testSelector')

        await page.evaluate(()=> {
          $("#testSelector option:contains('Step 1 - United States Medical Licensing Examination')")[0].selected = true
          const event = new Event('change', {bubbles: true});
          event.simulated = true;
          document.querySelector('select#testSelector').dispatchEvent(event);
        });
        
        await delay(1000)

        await page.click('button[id="nextBtn"]');

        await delay(2000)

        await page.type('input[typeaheadoptionfield="formatted_address"]', 'San Jose, CA', {delay: 2})
        const inputElements = await page.$$('input[name="mydate"]');
        await inputElements[0].type("08/13/2021");
        await delay(1000)
        // await page.type('input[name="mydate"]', '08/01/2021', {delay: 2})
        const inputElements2 = await page.$$('input[aria-describedby="endDateDescribedBy"]');
        await inputElements2[0].click({ clickCount: 3 })
        await inputElements2[0].type("08/27/2021");
        await delay(1000)
        await page.click('button[id="nextBtn"]');
        await delay(2000)
        await page.waitForSelector('#mi', {visible: true});
        await delay(3000)
        var linkTexts = await page.$$eval("strong",
        elements=> elements.map(item=>item.textContent))
        return linkTexts


    }catch(err){
        console.log(err)
    }
}

const getSchedules = async () => {
    try{
        const url = "https://proscheduler.prometric.com/scheduling/searchAvailability";

        // puppeteer.use(pluginStealth());
        const browser = await puppeteer.launch({
          headless: true,
          slowMo: 150,
          args:[
            '--no-sandbox',
            '--no-zygote',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36'
        ],
        });
        const page = await browser.newPage();
        // try catch to close browser incase page breaks
        // browser will hang if we do not close it properly
        try{
          page.setUserAgent(`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36`);
          
          await page.setViewport({ width: 1366, height: 768});
          await page.goto(url,{ waitUntil: 'networkidle0' });
          const getData = await checkSponsor(page)
          return getData
        }catch{
          // catch when brower errors and so we can close properly
          await page.close()
          await browser.close()
          console.log("err1",err)
        }finally{
          await page.close();
          await browser.close()
        }
       
    }catch (err){
      
        console.log("err.",err)
    }
}

const getData = async (req, res) => {
  try{
    const dataRes = await getSchedules()

    if (dataRes){
      var c = []
      const b = dataRes.forEach((res)=>{
        const lres = res.toLowerCase()
        if(lres.includes("ca")){
          if(lres.includes("fair oaks")){
            // console.log("fairoaks")
          }else if(lres.includes("fresno")){
            // console.log("fresno")
          }else if(lres.includes("san bruno")){
            // console.log("sf")
          }else if(lres.includes("alameda")){
            // console.log("alameda")
          }else{
            c.push(res)
          }
        }
      })
      if(c.length > 0){
        console.log("~~~~~~~~~", c,"~~~~~~~~~", new Date())
        await open("https://www.youtube.com/watch?v=em9lziI07M4&ab_channel=Movieclips", {app: ['google chrome']});
        return 
      }else{
        return 
      }
    }
  }catch (err){
    console.log("error getData",err)  
    // res.status(500).send({error:err, message:"init fail"});
  }
}

module.exports =  {
    getData,
    getSchedules
}
