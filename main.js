var coinsList;
var coinsPrices;
var coinID;
var coinMoreInfo;
var clickedCoins = []
var coinsFromApi = []

$(function () {
    getAllCoins();
})

function getAllCoins() {
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list",
        dataType: "json",
        crossDomain: "true",
        success: function (data) { 
            coinsList = data.map(coin => {return {...coin, checked: false}});
            renderCoins(coinsList);

            $("input").on("click", function () {
                var id = $(this).attr("value");
                if ($(this).is(":checked")) {
                
                    var clickedCoin = coinsList.find(coin => coin.id == id)

                    clickedCoins.push(clickedCoin);
                    coinsList = coinsList.map(coin => {return coin.id == id ? {...coin, checked: true} : coin})
                    if (coinsList.filter(c=> c.checked).length > 5) { 
                        var modalHtml = clickedCoins.map(coin => {return `<div><div class='row'><h5 class='col-8'>${coin.symbol}</h5>
                        <label class='switch'> 
                        <input type='checkbox' id='${coin.id}' name='coin' class='' checked onclick='unclickFromModal("${coin.id}")'>
                        <span class='slider round'></span>" 
                        "</label></div></div>`})
                    var mymodal = $("#exampleModal");
                    mymodal.find('.modal-body').html(modalHtml.join('')); 
                    mymodal.modal('show');
                    }
                }
                else {
                    clickedCoins.splice(clickedCoins.indexOf(id), 1);
                }
            });
        }
    })
}

function unclickFromModal(coinId) {
    //descheckar essa coin
    coinsList = coinsList.map(coin => {return coin.id == coinId ? {...coin, checked: false} : coin})
    //re-renderizar coins
    renderCoins(coinsList);
    //fechar modal
    $("#exampleModal").modal('hide');
}

function renderCoins(coinsList) {
    document.getElementById("row-card").innerHTML = ""
    for (let i = 0; i < 100; i++) {
        result = `<div class='card' style='width: 18rem;'>
        <div class='card-body'>
            <div class='row'>
                <h5 class='card-title col-8'> ${coinsList[i].symbol} </h5><br>
                <label class='switch'>
                <input type='checkbox' id='checkId${[i]}' name='coin' value='${coinsList[i].id}' ${coinsList[i].checked ? 'checked' : ''}>
                <span class='slider round'></span>
                </label>
            </div>
                <h6 class='card-subtitle mb-2 text-muted'> ${coinsList[i].name}</h6><br>
                <button onclick='getMoreInfoForCoin("${coinsList[i].id}")' class='btn btn-primary' data-toggle='collapse' data-target='#${coinsList[i].id}'>
                "More Info" 
                </button>
            <div id='${coinsList[i].id}'class='collapse'></div>
        </div>
    </div>`

    document.getElementById("row-card").innerHTML += result;
    }
}

function getMoreInfoForCoin(coinID) { 
    $.ajax({ 
        url: `https://api.coingecko.com/api/v3/coins/${coinID}`,
        dataType: "json",
        crossDomain: "true",
        success: function (coinMoreInfo) { 

                     document.getElementById(coinID).innerHTML =
            
                    `USD ${coinMoreInfo.market_data.current_price.usd} <br>
                     EUR ${coinMoreInfo.market_data.current_price.eur} <br>
                     ILS ${coinMoreInfo.market_data.current_price.ils} <br>` 

                    $("#" + coinID).collapse('toggle')

        }
    })
}




