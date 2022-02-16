// SET LOCAL STORAGE BASED IN THIS IF NON EXISTS, OTHERISE USE LOCALSTORAGE UNTIL RESET ON LOGIN. 
if (localStorage.getItem("../api/ex") == null){
      
  var JSONsettings = [
    {
      name: "Full Feed",
      id: "13",
      checked: true
    }, {
      name: "Trip Feed",
      id: "53",
      checked: false
    },
    {
      name: "Flight Feed",
      id: "27",
      checked: true
    }


  ];

  localStorage.setItem("fdsettings", JSON.stringify(JSONsettings));
  var myjson = JSON.parse(localStorage.getItem("fdsettings"));
} else {
  var myjson = JSON.parse(localStorage.getItem("fdsettings"));
}
if(myjson == null) //If there is no data, initialize an empty array
  myjson = [];

/*
0) $.getJson FROM SERVER DB
1) SET INCOMING JSON TO LOCAL STORAGE
2) SET UP THE CHECK BOX LIST FROM THE JSON IN LOCAL STORAGE
3) GATHER NEW JSON SETTINGS ON PRESS AND SAVE TO LOCAL STORAGE
*/
// myjson  // JSONsettings[feeds]
$.each(myjson, function (i, v) {
    var feedname = this.name
        $("#calsubscribe").append($("<label>").text(this.name).prepend(
            $("<input>").attr({
                'type': 'checkbox', 
                'class' : 'inp-checkbox', 
                'name':'subscribecal',
                "data-feed": feedname
            }).val(this.id)
               .prop('checked', this.checked)
        ));
    });

/* TEST THE HTML
$("#calsubscribe").click(function(){
alert(  $("#calsubscribe").html())
});
 */


// GATHER JUST THE VALUE OF THOSE CHECKED - CAN BE USED IN DATA SEND VIA AJAX
var array_values = [];
$('input[type=checkbox]').each( function() {
    if( $(this).is(':checked') ) {
        array_values.push( $(this).val() );
    }
});
// Now you can store your values in a comma separated list
var arrayValues = array_values.join(',');
/* Now just change your data: line in the Ajax
data: {
    'show_request': arrayValues
},
   
 alert(arrayValues)
 */ 
// ON CLICK SAVE THE SETTINGS TO LS OR USE TO UPDATE DB
$(document).on("click", "button.set", function (e) {
// make JSON from CHECKBOXES
// $('input[name=subscribecal]:checked')
var checkValues = $('input[name=subscribecal]').map(function() {
 
    return {
      name: $(this).data('feed'),
        id:  $(this).val(),
        checked: this.checked
    };
}).get();
// set to LocalStorage
$("code#code1 p").html(JSON.stringify(checkValues));
// Save the amended table to LocalStorage - overwrite
localStorage.setItem("fdsettings", JSON.stringify(checkValues));
});//end click


$("#calsubscribe").on('change', '[type=checkbox]', function () {
       console.log($(this).val());
    });