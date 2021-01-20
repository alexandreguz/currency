var coinsList;
var coinsPrices;
var coinID;
var coinMoreInfo;

$(function () {
    getAllCoins();

})

function getAllCoins() {
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list",
        dataType: "json",
        crossDomain: "true",
        success: function (data) { 
            coinsList = data;

            for (let i = 0; i < 100; i++) {
                result =

                    "<div class='card' style='width: 18rem;'>" +
                        "<div class='card-body'>" +
                            "<div class='row'>" +
                                "<h5 class='card-title col-8'>" + coinsList[i].symbol + "</h5>" + "<br>" +
                                "<label class='switch'>" +
                                "<input type='checkbox'>" +
                                "<span class='slider round'>"+"</span>" +
                                "</label>" +
                            "</div>" +
                                "<h6 class='card-subtitle mb-2 text-muted'>" + coinsList[i].name + "</h6>" + "<br>" +
                                "<button onclick='getMoreInfoForCoin(`"+ coinsList[i].id + "`)' class='btn btn-primary' data-toggle='collapse' data-target='#" + coinsList[i].id + "'>" +
                                "More Info" + 
                                "</button>" +
                            "<div id='" + coinsList[i].id + "'class='collapse'>" +  // problem is the ID
                                 
                            "</div>"
                        "</div>"
                    "</div>"

                document.getElementById("row-card").innerHTML += result;
            }
        }
    })
}

function getMoreInfoForCoin(coinID) { 
    $.ajax({ 
        url: `https://api.coingecko.com/api/v3/coins/${coinID}`,
        dataType: "json",
        crossDomain: "true",
        success: function (coinMoreInfo) { debugger;

                     document.getElementById(coinID).innerHTML =
            
                    `USD ${coinMoreInfo.market_data.current_price.usd} <br>
                     EUR ${coinMoreInfo.market_data.current_price.eur} <br>
                     ILS ${coinMoreInfo.market_data.current_price.ils} <br>` 

                    $("#" + coinID).collapse('toggle')

        }
    })
}

