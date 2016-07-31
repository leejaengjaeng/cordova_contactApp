/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

// $(document).ready(function()
// {
//     $("#loginbtn").click(function ()
//     {
//         var cellphone1 = document.getElementById('num1').value+"-"+document.getElementById('num2').value+"-"+document.getElementById('num3').value;
//         $.ajax(
//                 {
//                     method: 'GET',
//                     url: 'http://contact.attocube.co.kr/api/checkuser',
//                     data: {'cellphone':cellphone1, 'csrfmiddlewaretoken': '{{ csrf_token }}',},
//                     success: function (data) {
//                         alert("1");
//                         if(data.success==true){
//                             localStorage.setItem('cellphone1',document.getElementById("num1").value);
//                             localStorage.setItem('cellphone2',document.getElementById("num2").value);
//                             localStorage.setItem('cellphone3',document.getElementById("num3").value);
//
//                             var cellphone = data.current.cellphone;
//                             var name = data.current.name;
//                             var company = data.current.company;
//                             var member = data.current.member;
//                             var addr = data.current.address;
//                             var phone = data.current.phone;
//                             var fax = data.current.fax;
//                             var email = data.current.email;
//                             localStorage.setItem('name',name);
//                             localStorage.setItem('email',email);
//                             localStorage.setItem('company',company);
//                             localStorage.setItem('member',member);
//                             localStorage.setItem('address',addr);
//                             localStorage.setItem('fax',fax);
//                             localStorage.setItem('phone',phone);
//
//                             location.href="list.html";
//                         }
//                         else{
//                             alert("죄송합니다 접근할 수 없습니다.")
//                         }
//                     },
//                     error: function () {
//                         alert('error');
//                     }
//                 });
//     });
// });



//alert(localStorage.length)
function initial() {
    //localStorage.clear();
    if (localStorage.length != 0) {
        var a = localStorage.getItem('cellphone1');
        var b = localStorage.getItem('cellphone2');
        var c = localStorage.getItem('cellphone3');
        //alert(b);
        var selectlen = document.getElementById("num1").length;

        for (var i = 0; i < selectlen.length; i++) {
            if (selectlen.option[i].value == a) {
                selectlen.selected = 'selected';
            }
        }
        document.getElementById("num2").value = b;
        document.getElementById("num3").value = c;
        // document.getElementById("loginbtn").click();
    }

    document.getElementById("back").style.visibility = "hidden";
    document.getElementById("body2").style.visibility = "hidden";
}

function len_chk(){
    var num2=document.getElementById("num2");
    if(num2.value.length==4){
        document.getElementById("num3").focus();

    }
}

function changefocus(){
    var num2 = document.getElementById("num2");
    num2.focus();
}

function changenumber ( email ) {
    if(email == "1") {
        document.getElementById("email3").style.display = "block";
        document.frm.email3.value = "";
    } else {
        document.getElementById("email3").style.display = "none";
        document.form1.email3.value = email;
    }
}

function ClickSMS(){
    var cellphone1 = document.getElementById('num1').value+"-"+document.getElementById('num2').value+"-"+document.getElementById('num3').value;
    // $.ajax({
    //     method: 'GET',
    //     url: 'http://contact.attocube.co.kr/api/checkuser',
    //     data: {'cellphone':cellphone1, 'csrfmiddlewaretoken': '{{ csrf_token }}',},
    //     success: function (data) {
    //         if(data.success==true){
    //             localStorage.setItem('cellphone1',document.getElementById("num1").value);
    //             localStorage.setItem('cellphone2',document.getElementById("num2").value);
    //             localStorage.setItem('cellphone3',document.getElementById("num3").value);
    //
    //             var cellphone = data.current.cellphone;
    //             var name = data.current.name;
    //             var company = data.current.company;
    //             var member = data.current.member;
    //             var addr = data.current.address;
    //             var phone = data.current.phone;
    //             var fax = data.current.fax;
    //             var email = data.current.email;
    //             localStorage.setItem('name',name);
    //             localStorage.setItem('email',email);
    //             localStorage.setItem('company',company);
    //             localStorage.setItem('member',member);
    //             localStorage.setItem('address',addr);
    //             localStorage.setItem('fax',fax);
    //             localStorage.setItem('phone',phone);
    //
    //             // location.href="list.html";
    //         }
    //         else{
    //             alert("죄송합니다 접근할 수 없습니다.")
    //         }
    //     },
    //     error: function () {
    //         alert('error');
    //     }
    // });
    document.getElementById("phonenumber").innerHTML = cellphone1;
    document.getElementById("back").style.visibility = "visible";
    document.getElementById("body1").style.visibility = "hidden";
    document.getElementById("body2").style.visibility = "visible";
}

function ClickLogin(){

    var cellphone1 = document.getElementById('num1').value+"-"+document.getElementById('num2').value+"-"+document.getElementById('num3').value;
    alert(cellphone1);
    $.ajax({
        method: 'GET',
        url: 'http://contact.attocube.co.kr/api/checkuser',
        data: {'cellphone':cellphone1, 'csrfmiddlewaretoken': '{{ csrf_token }}',},
        success: function (data) {
            if(data.success==true){
                localStorage.setItem('cellphone1',document.getElementById("num1").value);
                localStorage.setItem('cellphone2',document.getElementById("num2").value);
                localStorage.setItem('cellphone3',document.getElementById("num3").value);

                var cellphone = data.current.cellphone;
                var name = data.current.name;
                var company = data.current.company;
                var member = data.current.member;
                var addr = data.current.address;
                var phone = data.current.phone;
                var fax = data.current.fax;
                var email = data.current.email;
                localStorage.setItem('name',name);
                localStorage.setItem('email',email);
                localStorage.setItem('company',company);
                localStorage.setItem('member',member);
                localStorage.setItem('address',addr);
                localStorage.setItem('fax',fax);
                localStorage.setItem('phone',phone);

                location.href="list.html";
            }
            else{
                alert("죄송합니다 접근할 수 없습니다.")
            }
        },
        error: function () {
            alert('error');
        }
    });
}