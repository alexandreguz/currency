var coinsList;
var coinsPrices;
var coinID;
var coinMoreInfo;
var values = []

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
                                "<input type='checkbox' id='checkId"+[i]+"'name='coin' value='coin"+[i]+"' >" +
                                "<span class='slider round'>"+"</span>" +
                                "</label>" +
                            "</div>" +
                                "<h6 class='card-subtitle mb-2 text-muted'>" + coinsList[i].name + "</h6>" + "<br>" +
                                "<button onclick='getMoreInfoForCoin(`"+ coinsList[i].id + "`)' class='btn btn-primary' data-toggle='collapse' data-target='#" + coinsList[i].id + "'>" +
                                "More Info" + 
                                "</button>" +
                            "<div id='" + coinsList[i].id + "'class='collapse'>" +  
                                 
                            "</div>"
                        "</div>"
                    "</div>"

                document.getElementById("row-card").innerHTML += result;


                $("input").on("click", function () {
                    var id = $(this).attr("id");
                    if ($(this).is(":checked")) {
                 
                      values.push(id);
                      if (values.length > 5) {
                        var mymodal = $("#exampleModal");
                        mymodal.find('.modal-body').html(`<label class='switch'>
                        <input type='checkbox' id='${values[5]}' name='coin' value='${values[5]}' >
                        <span class='slider round'></span>" 
                        "</label>`); // add here the coins
                        mymodal.modal('show');

                      }
                    }
                    else {
                      values.splice(values.indexOf(id), 1);
                    }
                  });

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
