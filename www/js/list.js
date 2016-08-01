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

function SearchLocation(){
    $.ajax({
        method:'GET',
        url:'http://contact.attocube.co.kr/api/searchlocation',
        data: {
            'do' : document.getElementById('do').value,
            'si' : document.getElementById('si').value,
            'csrfmiddlewaretoken': "{{ csrf_token }}" },
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
            <div class="container-fluid row resultview">\
                <div class="col-xs-3">\
                    <img src="img/a1.png" class="img-rounded img-responsive" alt="Responsive image">\
                </div>\
                <div class="col-xs-9">\
                    <ul class="list-unstyled">\
                        <li style="font-size: x-large;">\
                            <b>' + directors[director].name + '</b>\
                        </li>\
                        <li style="font-size: large;">\
                        ' + directors[director].company + '\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        ');
    }
    return true;
}