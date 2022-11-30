var humidity_value;
var rainfall_value;
var temp_value;
var temp_BigWaveBay;
var temp_ClearWaterBaySecond;
var temp_DeepWaterBay;
var temp_Golden;
var temp_MiddleBay;
var temp_SilverMineBay;
var temp_Silverstrand;
var temp_StanleyMain;
var attendance_value;
var grade_new;
var web_url;

//import Chart from 'chart.js';


(function ($) {
    "use strict";
    // Api
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Worldwide Sales Chart colomn chart water quality
    
    //var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var ctx1 = document.getElementById('worldwide-sales').getContext('2d')
    //var Chart = require('chart.js')
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["1","2","3","4","5","6","7","8","9"],
            datasets: [{
                    label: "Water Quality",
                    data: [],
                    backgroundColor: "rgba(0, 156, 255, .7)"
                }
            ]
            },
        options: {
            scales: {
                y: {
                  min: 0,
                  max: 4,
                  ticks: {
                    stepSize: 1
                  }
                }
            }
        }
    });
 

    function ajaxCall(beach_name){
        $.ajax({
            //  Url to make request
            url:'http://18.163.77.3:8081/get_data',
            // Type of Request
            type: "POST",
            dataType: 'json',
            headers:{'content-Type': 'application/x-www-form-urlencoded'},
            data:{
                name : beach_name
            },
            // Function to call when to
            // request is ok
            success: function (result) {
               var data = JSON.stringify(result);
               localStorage.setItem("testJSON", data)
               let text = localStorage.getItem("testJSON");
               let obj = JSON.parse(text);
               // get the value for attendance
               attendance_value = parseInt(obj.attendance)/365;
               let attendacne_text = parseInt(attendance_value).toString();
               document.getElementById("attendacne_id").innerHTML = attendacne_text;
               // get the grade for today
               grade_new = obj.quality[0].grade;
               document.getElementById("grade_id").innerHTML = grade_new;
               var grade_time = obj.quality[0].guid;
               
               document.getElementById("grade_time").innerHTML =  new Date(grade_time).toDateString();
               // get the grade label list for today
               var label_list = [];
               for (let i = 0; i < 9; i++){
                var str = obj.quality[i].guid;
                str = new Date(str).toDateString();
                //var n = str.charAt(str.length-1);
                label_list.push(str);
               }
               
               var data_list = [];
               for (let i = 0; i < 9; i++){
                var str = obj.quality[i].grade;
                var n = str.charAt(str.length-1);
                data_list.push(n);
               }
               myChart1.data.labels = label_list;
               myChart1.data.datasets[0].data = data_list;
               myChart1.update();
               // get the value for address
               var address_text = obj.address + ', ' + obj.district;
               document.getElementById("address_text").innerHTML = address_text;
               // get the value for webiste
               web_url = obj.url;
               document.getElementById("website_text").innerHTML = obj.name;
               document.getElementById("website_text").href = obj.url;
               // get the value for phone
               document.getElementById("phone_text").innerHTML = obj.phone;

               document.getElementById("beach_list").innerHTML = obj.name;
            },
        });
    };

    
    // Beach List
    $("#updateBigWaveBay").click(function(){
        ajaxCall("Big Wave Bay Beach");
        document.getElementById("temp_id").innerHTML = temp_BigWaveBay;
        document.getElementById("framesrc").src = "https://maps.google.com/maps?q=Big%20Wave%20Bay&t=&z=13&ie=UTF8&iwloc=&output=embed";
    });
    $("#updateClearWater").click(function(){
        ajaxCall("Clear Water Bay Second Beach");
        document.getElementById("temp_id").innerHTML = temp_ClearWaterBaySecond;
        document.getElementById("framesrc").src = "https://maps.google.com/maps?q=Clear%20Water%20Bay&t=&z=13&ie=UTF8&iwloc=&output=embed";

    });
    $("#updateDeepWater").click(function(){
        ajaxCall("Deep Water Bay Beach");
        document.getElementById("temp_id").innerHTML = temp_DeepWaterBay;
        document.getElementById("framesrc").src = "https://maps.google.com/maps?q=Deep%20Water%20Bay&t=&z=13&ie=UTF8&iwloc=&output=embed";
    });
    $("#updateGolden").click(function(){
        ajaxCall("Golden Beach");
        document.getElementById("temp_id").innerHTML = temp_Golden;
        document.getElementById("framesrc").src = "https://maps.google.com/maps?q=Golden%20Beach&t=&z=13&ie=UTF8&iwloc=&output=embed";
    });
    $("#updateMiddle").click(function(){
        ajaxCall("Middle Bay Beach");
        document.getElementById("temp_id").innerHTML = temp_MiddleBay;
        document.getElementById("framesrc").src = "https://maps.google.com/maps?q=Middle%20Bay&t=&z=13&ie=UTF8&iwloc=&output=embed";
    });
    $("#updateSilverMine").click(function(){
        ajaxCall("Silver Mine Bay Beach");
        document.getElementById("temp_id").innerHTML = temp_SilverMineBay;
        document.getElementById("framesrc").src = "https://maps.google.com/maps?q=Silver%20Mine%20Bay&t=&z=13&ie=UTF8&iwloc=&output=embed";
    });
    $("#updateSilverstrand").click(function(){
        ajaxCall("Silverstrand Beach");
        document.getElementById("temp_id").innerHTML = temp_Silverstrand;
        document.getElementById("framesrc").src = "https://maps.google.com/maps?q=Silverstrand&t=&z=13&ie=UTF8&iwloc=&output=embed";
    });
    $("#updateStanleyMain").click(function(){
        ajaxCall("Stanley Main Beach");
        document.getElementById("temp_id").innerHTML = temp_StanleyMain;
        document.getElementById("framesrc").src = "https://maps.google.com/maps?q=Stanley%20Main&t=&z=13&ie=UTF8&iwloc=&output=embed";
    });

    // 
    $('#dropdown-beach').click(function() {
        
        
    });

    // Sidebar Toggler
    $('.sidebar-toggler').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });

    

    
})(jQuery);

$(document).ready(function(){
    //document.getElementById("grade_id").innerHTML = "2"
    var himidity_value = 0
    //$("#grade_id").html(himidity_value)
    $.getJSON('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en', function(json) {
        
        var data = JSON.stringify(json);
        localStorage.setItem("testJSON", data)
        let text = localStorage.getItem("testJSON");
        let obj = JSON.parse(text);
        //alert(obj.humidity.data[0].value);
        // return the value for humidity
        humidity_value = obj.humidity.data[0].value;
        document.getElementById("humidity_id").innerHTML = humidity_value + ' %';
        humidity_time =  obj.humidity.recordTime;
        document.getElementById("humidity_time").innerHTML = new Date(humidity_time).toDateString();

        // return the value for rainfall
        rainfall_value = obj.rainfall.data[0].max;
        document.getElementById("rainfall_id").innerHTML = rainfall_value + ' mm';
        rainfall_time = obj.rainfall.endTime;
        document.getElementById("rainfall_time").innerHTML = new Date(rainfall_time).toDateString();
        // return the value for temp
        temp_value = obj.temperature.data[1].value;
        document.getElementById("temp_id").innerHTML = temp_value + ' °C';
        temp_time = obj.temperature.recordTime;
        document.getElementById("temp_time").innerHTML = new Date(temp_time).toDateString();
        // Stanley
        temp_BigWaveBay = obj.temperature.data[21].value + ' °C';
        // Sai Kung
        temp_ClearWaterBaySecond = obj.temperature.data[9].value + ' °C';
        // 
        temp_DeepWaterBay = obj.temperature.data[1].value + ' °C';
        // Tuen Mun
        temp_Golden = obj.temperature.data[7].value + ' °C';
        //
        temp_MiddleBay = obj.temperature.data[1].value + ' °C';
        //
        temp_SilverMineBay = obj.temperature.data[1].value + ' °C';
        // Sai Kung
        temp_Silverstrand = obj.temperature.data[9].value + ' °C';
        // Stanley
        temp_StanleyMain = obj.temperature.data[21].value + ' °C';

    });

    
});



