var webMB=0;
var socialMB=0;
var emailMB=0;
var appMB=0;
var musicMB=0;
var videoMB=0;
var totalMB=0;
var totalGB=0;

$(function() {
    $(".webSliderC, .socialSliderC, .emailSliderC, .appSliderC, .musicSliderC, .videoSliderC").hide(); //Hide all sliders 
});

// WEB
var slider = document.getElementById("webRange");
var output = document.getElementById("webValue");
//output.innerHTML = slider.value+" minutes a day"; //Display the default slider value

slider.oninput = function() { //Update the current slider value each time you drag the slider handle
    output.innerHTML = this.value+" minutes a day (BROWSING, ONLINE GAMING)"; //Display slider value
    webMB=(this.value/60)*15*28;
    createChart();
}

$(function() { 
    $(".webBtn").click(function() {
        $(this).toggleClass("active"); //Add 'active' class to clicked button
        //Remove 'active' class from all other buttons
        $(".socialBtn, .emailBtn, .appBtn, .musicBtn, .videoBtn").toggleClass("active",false); 
        $(".socialSliderC, .emailSliderC, .appSliderC, .musicSliderC, .videoSliderC").hide();   
        $(".webSliderC").slideToggle(); //Jquery script to toggle slider
    });
});

//SOCIAL
var slider1 = document.getElementById("socialRange");
var output1 = document.getElementById("socialValue");

slider1.oninput = function() {
    output1.innerHTML = this.value+" minutes a day (FACEBOOK, TWITTER, VIBER, WHATSAPP, INSTAGRAM)"; 
    socialMB=(this.value/60)*20*28;
    createChart();
}

$(function() {
    $(".socialBtn").click(function() {
        $(this).toggleClass("active");
        $(".webBtn, .emailBtn, .appBtn, .musicBtn, .videoBtn").toggleClass("active",false); 
        $(".webSliderC, .emailSliderC, .appSliderC, .musicSliderC, .videoSliderC").hide();   
        $(".socialSliderC").slideToggle();
    });
});

//EMAIL
var slider2 = document.getElementById("emailRange");
var output2 = document.getElementById("emailValue"); 

slider2.oninput = function() {
    output2.innerHTML = this.value+" emails a week (SENT/RECEIVED WITH ATTACHMENTS)";
    emailMB=this.value*0.3*4;
    createChart();
}

$(function() {
    $(".emailBtn").click(function() {
        $(this).toggleClass("active");
        $(".webBtn, .socialBtn, .appBtn, .musicBtn, .videoBtn").toggleClass("active",false); 
        $(".webSliderC, .socialSliderC, .appSliderC, .musicSliderC, .videoSliderC").hide();   
        $(".emailSliderC").slideToggle();
    });
});

//APP
var slider3 = document.getElementById("appRange");
var output3 = document.getElementById("appValue");
 
slider3.oninput = function() {
    output3.innerHTML = this.value+" downloads a week (PLAYSTORE, ITUNES)";  
    appMB=this.value*12*4;
    createChart();
}

$(function() {
    $(".appBtn").click(function() {
        $(this).toggleClass("active");
        $(".webBtn, .socialBtn, .emailBtn, .musicBtn, .videoBtn").toggleClass("active",false); 
        $(".webSliderC, .socialSliderC, .emailSliderC, .musicSliderC, .videoSliderC").hide();      
        $(".appSliderC").slideToggle();
    });
});

//MUSIC
var slider4 = document.getElementById("musicRange");
var output4 = document.getElementById("musicValue");

slider4.oninput = function() {
    output4.innerHTML = this.value+" minutes of streaming a day (SPOTIFY, SOUNDCLOUD)";  
    musicMB=(this.value/60)*80*28;
    createChart();
}

$(function() {
    $(".musicBtn").click(function() {
        $(this).toggleClass("active");
        $(".webBtn, .socialBtn, .emailBtn, .appBtn, .videoBtn").toggleClass("active",false); 
        $(".webSliderC, .socialSliderC, .emailSliderC, .appSliderC, .videoSliderC").hide();   
        $(".musicSliderC").slideToggle();
    });
});

//VIDEO
var slider5 = document.getElementById("videoRange");
var output5 = document.getElementById("videoValue");

slider5.oninput = function() {
    output5.innerHTML = this.value+" minutes of streaming a day (YOUTUBE, NETFLIX)";  
    videoMB=(this.value/60)*350*28;
    createChart();
}

$(function() {
    $(".videoBtn").click(function() {
        $(this).toggleClass("active");
        $(".webBtn, .socialBtn, .emailBtn, .appBtn, .musicBtn").toggleClass("active",false); 
        $(".webSliderC, .socialSliderC, .emailSliderC, .appSliderC, .musicSliderC").hide();   
        $(".videoSliderC").slideToggle();
    });
});

var event1=document.getElementById("resultBtn");
event1.addEventListener("click", calculate, false);

function calculate() {
    totalMB=webMB+socialMB+musicMB+videoMB+emailMB+appMB;
    totalGB=totalMB/1000;
    document.getElementById("dataResult").innerHTML=totalGB.toFixed(3)+" GB a month";
    createPie();
}

//CHART
function createChart() {
    var chart = new CanvasJS.Chart("chartContainer", {
	theme: "light1", 
	animationEnabled: true, 	
	title: {
		text: "Your mobile data usage per month"
	},
    axisY: {
		title: "Data(MB)"
    },
	data: [ {
		type: "column",
		dataPoints: [
			{ label: "Web",  y: webMB },
			{ label: "Social", y: socialMB },
			{ label: "Email", y: emailMB },
			{ label: "App",  y: appMB },
			{ label: "Music",  y: musicMB },
            { label: "Video",  y: videoMB },
		]
	}]
    });
chart.render();
}

function createPie() {
    var chart = new CanvasJS.Chart("pieContainer", {
    theme: "light1",
	animationEnabled: true,
	title: {
		text: "Your mobile data usage per month in percentage"
	},
	data: [{
		type: "pie",
		startAngle: 240,
		yValueFormatString: "##0.00\"%\"",
		indexLabel: "{label} {y}",
		dataPoints: [
			{y: (webMB/totalMB)*100, label: "Web"},
			{y: (socialMB/totalMB)*100, label: "Social"},
			{y: (emailMB/totalMB)*100, label: "Email"},
			{y: (appMB/totalMB)*100, label: "App"},
			{y: (musicMB/totalMB)*100, label: "Music"},
            {y: (videoMB/totalMB)*100, label: "Video"}
		]
	}]
});
chart.render();  
}



