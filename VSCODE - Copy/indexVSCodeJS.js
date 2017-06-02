// Write your Javascript code.
//Javascript File:indexVSCode.js

if ($("body").data("title") === "indexVSCode" || $("body").data("title") === "newQuickToolsVS" || $("body").data("title") === "contactVSCode") {


    var $sidebarAndWrapper = $("#sidebar,#wrapper");
    var $icon = $("#sideBarToggle i.glyphicon");

    $("#sideBarToggle").on("click", function() {
        $sidebarAndWrapper.toggleClass("hide-sidebar");
    });

    $("#sidebar").mouseleave(function() {
        $sidebarAndWrapper.removeClass("hide-sidebar");
    });

    /*$(document).scroll(function() {
        if ($(document).scrollTop() > 15) {
            $("nav").css({ "width": "100%", "position": "fixed", 'height': '80px', "top": "0", "margin-bottom": "20px", "opactiy": "1" });
            $("#sideBarToggle").css({ "display": "none" });
            $("#sideBar")
        } else {
            $("nav").css({ "width": "100%", "position": "relative", 'height': '50px', "top": "0", "margin-bottom": "20px" });
            $("#sideBarToggle").css({ "display": "block" });
        }
    });*/

}



//QuickTools JS Below
if ($("body").data("title") === "newQuickToolsVS") {


    document.getElementById('wordCountArea').innerHTML = "";


    function formatData() {
        var data = document.getElementById("myText").value;
        var replacing = data.toString().replace(/[()]/g, "");
        document.getElementById('wordCountArea').innerHTML = "";
        var newData = replacing.split(/[,#;\s]/);
        for (i = 0; i < newData.length; i++) {
            var clean = newData.filter(function(dataVal) {
                return dataVal != "";

            });

        }



        var totalDataUnits = document.getElementById('dataTotal').innerHTML = clean.length + " data unit(s)";

        console.log("Clean array " + clean);
        console.log("OLD array " + newData);

        for (i = 0; i < clean.length; i++) {

            if (clean.length == 1) {
                document.getElementById('wordCountArea').innerHTML += "'" + clean[i] + "'";

            } else if (i != (clean.length - 1)) {
                document.getElementById('wordCountArea').innerHTML += "'" + clean[i] + "',<br>";

            } else if (i == (clean.length - 1)) {
                document.getElementById('wordCountArea').innerHTML += "'" + clean[i] + "'";
            }
        }

    } //end function formatData


    function createQuery(cartons) {

        cartons = document.getElementById("wordCountArea").innerHTML;
        var tables = document.getElementById("tables").value;
        var serviceNow = document.getElementById("serviceNow").value;
        var templates = document.getElementById("serviceNowTemplates").value;
        var arraySplit = cartons.split(/[,#\s]/);
        var i;

        if (tables == 'RMS_SSN_DETAILS' || tables == 'RMS_SSN_HEADERS') {


            document.getElementById("query").innerHTML = "Select * FROM " + tables + "<br>WHERE BUSINESS_UNIT_ID='30'<br>AND CARTON_ID IN (" + arraySplit + ")<br>--AND PO_ID IN (' ')<br>--AND TRACKING_ID LIKE ' '<br>--AND SITE_ID = ' '";
        } else if (tables == 'PURCHASE_ORDERS') {
            document.getElementById("query").innerHTML = "Select * FROM " + tables + "<br>WHERE BUSINESS_UNIT_ID='30'<br>AND PO_ID IN (" + arraySplit + ")<br>--AND SITE_ID = ' '";
        }


        //For SERVICE NOW CODE
        for (i = 0; i < arraySplit.length; i++) {
            if (serviceNow == 'g_form.getValue' || serviceNow == 'g_form.setValue') {
                document.getElementById("query").innerHTML += serviceNow + "(" + arraySplit[i] + ");<br>";
                console.log(serviceNow);

            }
        } //END For SERVICE NOW FOR LOOP


        if (templates == 'Script Include Ajax Template') {
            document.getElementById("query").innerHTML = "var NAMEOFINCLUDE  = Class.create();<br>NAMEOFINCLUDE.prototype = Object.extendsObject(AbstractAjaxProcessor, {<br>functionNameHere:function(){<br><br>var getParam1 = this.getParameter('sysparm_NAMEOFPARAMETER');//REPEAT AS NEEDED<br><br>var tableToQuery = new GlideRecord('TableNameHere');<br><br>tableToQuery.addQuery(' ');<br><br>tableToQuery.query();<br><br>// if(){};<br>//while(tableToQuery.next()){};<br>//function(){}<br>//return ENTER VALUE HERE;<br>},<br><br>type:'  '<br><br>});"
        }




    }; //end function createQuery


    //Both Clear Buttons 

    var clearFormatter = document.getElementById("clearFormatter");
    clearFormatter.onclick = function() {
        document.getElementById("myText").value = "";
        document.getElementById("wordCountArea").innerHTML = "";
        document.getElementById('dataTotal').innerHTML = "0 data unit(s)";
    }

    var clearQuery = document.getElementById("clearQuery");
    clearQuery.onclick = function() {
        document.getElementById("query").innerHTML = "";

    }

    //END BOTH CLEAR BUTTONS



    //Start Tracking Number script

    var linkButton = document.getElementById('trackingSubmit');

    linkButton.onclick = function() {
            var track = document.getElementById("trackingNumber");
            var carrier = document.getElementById("carrier");
            if (carrier.value == 'UPS') {
                linkButton.setAttribute("href", "http://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=" + track.value);
                track.value = "";
            } else if (carrier.value == 'Fedex') {
                linkButton.setAttribute("href", "https://www.fedex.com/apps/fedextrack/?action=track&action=track&language=english&cntry_code=us&tracknumbers=" + track.value);
                track.value = "";

            }
        }
        //End tracking number script

    //Start Google Search script

    var searchEngine = document.getElementById('searchEngine'); //button search
    var engine = document.getElementById('engine'); //select field

    searchEngine.onclick = function google() {
        var searchInfo = document.getElementById("searchInfo");
        if (engine.value == 'Google') {
            var win = window.open("https://www.google.com/search?q=" + searchInfo.value,
                "mywindow", "menubar=1,resizable=1,width=800,height=600,top=300,left=300");
            searchInfo.value = "";
            return false;
        } else if (engine.value == 'Yahoo') {
            var win = window.open("https://search.yahoo.com/search?q=" + searchInfo.value,
                "mywindow", "menubar=1,resizable=1,width=800,height=600,top=300,left=300");
            searchInfo.value = "";
            return false;
        } else if (engine.value == 'Bing') {
            var win = window.open("https://www.bing.com/search?q=" + searchInfo.value,
                "mywindow", "menubar=1,resizable=1,width=800,height=600,top=300,left=300");
            searchInfo.value = "";
            console.log(win);
            return false;

        }


    }

    //End Google Search script


} //END QUICK TOOLS JS

//Start Contact Form Code
if ($("body").data("title") === "contactVSCode") {

    //Start Ajax requests and posts to Google Spreadsheet
    var $name = $('#name');
    var $comments = $('#comments');
    var $email = $('#email');




    $("#submitContactForm").on("click", function() {
        if ($name.val() == "" || $comments.val() == "" || $email.val() == "") {
            return false;
        } else {

            var toDo = {
                'entry.1399516880': $name.val(),
                'entry.1548214041': $comments.val(),
                'entry.1835749748': $email.val()
            };


            $.ajax({
                type: 'POST',
                url: 'https://docs.google.com/forms/d/e/1FAIpQLScWwiepACaliI6l7r8zw-JZMBoBNo_W4SkO-g4_qs0XJubFzg/formResponse',
                data: toDo,
                success: function() {


                },
                error: function() {

                }
            })

            document.getElementById("contactForm").reset();
            $("#submittedSuccessfullyMessage").html("Your comment was successfully submitted");

            //function end

        }
    })



}

//End Contact Form