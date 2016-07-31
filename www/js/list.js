/**
 * Created by Zudog on 2016. 7. 31..
 */
var currentIndex =0;
var moreFlag = true;

function initCall()
{
    console.log(moreFlag);
    $.ajax(
    {
        method:'GET',
        url:'http://contact.attocube.co.kr/api/getdirector',
        data: {'index' : currentIndex, 'csrfmiddlewaretoken': "{{ csrf_token }}"},
        success: function(directors)
        {
            currentIndex+=20;
            moreFlag = MakeList(directors);
            console.log(currentIndex);
            $('#more').toggle(moreFlag);
        },
        error: function()
        {
            alert('list get error');
        }
    });
}

function Search(){
    if(document.getElementById('search').value=="" || document.getElementById('search').value=="undefind"){
        currentIndex=0;
        $('#resultList').empty();
        initCall();
        return;
    }
    $.ajax({
        method:'GET',
        url:'http://contact.attocube.co.kr/api/search',
        data: {'name' : document.getElementById('search').value, 'csrfmiddlewaretoken': "{{ csrf_token }}"},
        success: function(directors)
        {
            $('#resultList').empty();
            currentIndex =0;
            moreFlag = MakeList(directors);
            console.log(currentIndex);
            $('#more').toggle(moreFlag);
        },
        error: function()
        {
            alert('list get error');
        }
    });
}

function MakeList(directors){
    if(directors.length==0) return false;
    for(var director in directors)
    {
        $('#resultList').append('\
            <div class="friends-grids" style="width:100%;">\
                <div class="grids-left" style="float:left; width:20%; text-align:center;">\
                    <img src="img/a1.png" />\
                </div>\
                <div role="main" class="grids-right" style="float:left; width:80%"><h4>\
                    <ul data-role="listview" data-count-theme="b" data-inset="true">\
                        <li>이름 : '+directors[director].name+' | 핸드폰 : <a href="tel:'+directors[director].cellphone+'">'+directors[director].cellphone+'</a></li>\
                        <li>소속 : '+directors[director].company+' | 규모 : '+directors[director].member+'명</li>\
                        <li>전화번호 : <a href="tel:'+directors[director].phone+'">'+directors[director].phone+'</a> | 팩스 : '+directors[director].fax+'</li>\
                        <li>이메일 : <a href="mailto:'+directors[director].email+'">'+directors[director].email+'</a>\
                        <li>주소 : '+directors[director].address+'</li>\
                    </h4></ul>\
                </div>\
                <div class="clear"></div>\
            </div>\
        ');
    }
    return true;
}