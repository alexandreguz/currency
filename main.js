document.getElementById('quote').addEventListener("click", callAjax)


$(document).ready(function () {
    callAjax();
    callMoreInfoAjax();

})

var ajax_arr;

function callAjax() {
    $.ajax({
        // url: "https://api.coingecko.com/api/v3/coins/list",
        url: "https://api.coingecko.com/api/v3/coins/list",
        // url: "coins_list2.json",

        dataType: "json",
        crossDomain: "true",
        success: function (data) {
            ajax_arr = data;
        }
    })

    for (let i = 0; i < 100; i++) {
        result =
            "<div class='card' style='width: 18rem;'>" +
                "<div class='card-body'>" +
                    "<div class='row'>" +
                        "<h5 class='card-title col-8'>" + ajax_arr[i].symbol + "</h5>" + "<br>" +
                        "<label class='switch'>" +
                        "<input type='checkbox'>" +
                        "<span class='slider round'>"+"</span>" +
                        "</label>" +
                    "</div>" +
                    "<h6 class='card-subtitle mb-2 text-muted'>" + ajax_arr[i].name + "</h6>" + "<br>" +
                        "<button onclick='callMoreInfoAjax()' class='btn btn-primary' data-toggle='collapse' data-target='#demo" + [i] + "'>" +
                        "More Info" + 
                        "</button>" +
                    "<div id='demo" + [i] + "'class='collapse'>" +
                        "Lorem ipsum dolor sit amet, consectetur adipisicing " +
                    "</div>"
                "</div>"
            "</div>"

        document.getElementById("row-card").innerHTML += result;
    }
}

var ajax_info_arr;
function callMoreInfoAjax(i) {


    $.ajax({
        url: `https://api.coingecko.com/api/v3/coins/${ajax_arr[i].id}`,
        dataType: "json",
        crossDomain: "true",
        success: function (data) {
            ajax_info_arr = data;
        }
    })
    for (let i = 0; i < 100; i++) {

        result2 =
            " <div id='demo" + [i] + "' class='collapse'>" +
            `${market_data.current_price.usd} <br>
             ${market_data.current_price.eur} <br>
             ${market_data.current_price.ils} <br>` +
            " </div>"



    }

}

