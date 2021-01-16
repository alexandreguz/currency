document.getElementById('quote').addEventListener("click", callAjax)

$(document).ready(function(){
    callAjax();
    
})

var ajax_arr;

function callAjax()
{
    $.ajax({ 
            // url: "https://api.coingecko.com/api/v3/coins/list",
            url: "https://api.coingecko.com/api/v3/coins/list",
            // url: "coins_list2.json",

            dataType: "json",
            crossDomain: "true",
            success: function(data){
            ajax_arr = data;
        }
        })
        
        // for (var i in ajax_arr) 
        for (let i = 0; i < 100; i++) 
            
            
        
        {

            result = 
      "<div class='card' style='width: 18rem;'>"+
        "<div class='card-body'>"+
          "<h5 class='card-title'>"+ajax_arr[i].symbol+"</h5>"+"<br>"+
          "<h6 class='card-subtitle mb-2 text-muted'>"+ajax_arr[i].name+"</h6>"+"<br>"+
          "<a href='#' class='btn btn-primary'>"+ "More Info" + "</a>" +
       " </div>"
     " </div>"
            
            document.getElementById("row-card").innerHTML += result;
        }
        
}

