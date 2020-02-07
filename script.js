'use strict';

//data GLOBAL_QUOTE
/*01. symbol: "AMZN"
      02. open: "1885.1100"
      03. high: "1889.9700"
      04. low: "1872.7600"
      05. price: "1884.5800"
      06. volume: "2472260"
      07. latest trading day: "2020-01-23"
      08. previous close: "1887.4600"
      09. change: "-2.8800"
      10. change percent: "-0.1526%"*/

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

//responseJson aka res
//reject aka rej


function displayResults(res){
      const quote = res["Global Quote"];
      console.log(quote);
      const symbolDisplay = quote["01. symbol"]
      const price = quote["05. price"]; 
      const open = quote["02. open"];
      const change = quote["10. change percent"]
     
      
        //clear results
        $('.js-results-list').empty();
        //unhide
        $('.js-results').removeClass('hidden'); 
        
        //how to target data?
        $('.js-results-list').html(`<h3>Stock Symbol: ${symbolDisplay}</h3><br>Current: $${price}<br> <br>Opened at: $${open}<br><br>Change: ${change} <br><br> <a href="https://www.marketwatch.com/investing/stock/${symbolDisplay}" target="blank">${symbolDisplay}'s Profile Snapshot</a>`);
}
             
    
    
function getInstantQuote(baseUrl, symbol, apiKey){
    console.log("getParks ran");
    //parameters
    const params ={
        symbol: symbol,
        apikey: apiKey
        
    }
    console.log(params);
    //url string
    const queryString = formatQueryParams(params);
    const url = baseUrl + '&' + queryString;
    console.log(url);  
        fetch(url)
            .then(res => {
                return res.json();
           })
            .then(res => displayResults(res))
            //the catch intiates the error
            .catch(err => alert(`unable to process request, try again.`));
             
       };

function watchForm(){
    $('#js-form').submit(event => {
        event.preventDefault();
        console.log('watchForm ran');
        const baseUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE';
        const symbol = $('#js-symbol-quote').val()
        const apiKey = `PJZSMJXAOZVC92GB`; 
        getInstantQuote(baseUrl, symbol, apiKey);

        });
    };
    
    $(function() {
        console.log('App loaded! Waiting for submit!');
        watchForm();
    })