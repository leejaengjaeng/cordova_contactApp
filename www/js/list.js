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
                <div class="col-xs-3 userimgDiv">\
                    <img src="img/a1.png" class="img-rounded img-responsive userImg" alt="Responsive image">\
                </div>\
                <div class="col-xs-6">\
                    <ul class="list-unstyled">\
                        <li style="font-size: x-large;">\
                            <b>' + directors[director].name + '</b>\
                        </li>\
                        <li style="font-size: large;">\
                            ' + directors[director].company + '\
                        </li>\
                    </ul>\
                </div>\
                <div class="col-xs-3">\
                    <button onclick="showDetail($(this))">\
                            보기\
                    </button>\
                    <input type="hidden" name="member" value='+directors[director].member+' >\
                    <input type="hidden" name="cellphone" value='+directors[director].cellphone+' >\
                    <input type="hidden" name="fax" value='+directors[director].fax+' >\
                    <input type="hidden" name="name" value='+directors[director].name+' >\
                    <input type="hidden" name="do" value='+directors[director].do+' >\
                    <input type="hidden" name="address" value='+directors[director].address+' >\
                    <input type="hidden" name="si" value='+directors[director].si+' >\
                    <input type="hidden" name="company" value='+directors[director].company+' >\
                    <input type="hidden" name="email" value='+directors[director].email+' >\
                    <input type="hidden" name="phone" value='+directors[director].phone+' >\
                </div>\
            </div>\
        ');
    }
    return true;
}

function showDetail(selectedBtn)
{
    $('#listView').hide();
    $('#detailView').show();
    $('#detailPage').empty();
    
    $('#detailPage').append('\
        <img class="img-rounded img-responsive" src="'+selectedBtn.parent('div').parent('div').children('.userimgDiv').children('img').attr('src')+'">\
        <h1>'+selectedBtn.closest('div').children('input[name="member"]').attr('value')+'</h1>\
        <h1>'+selectedBtn.closest('div').children('input[name="cellphone"]').attr('value')+'</h1>\
        <h1>'+selectedBtn.closest('div').children('input[name="fax"]').attr('value')+'</h1>\
        <h1>'+selectedBtn.closest('div').children('input[name="name"]').attr('value')+'</h1>\
        <h1>'+selectedBtn.closest('div').children('input[name="do"]').attr('value')+'</h1>\
        <h1>'+selectedBtn.closest('div').children('input[name="address"]').attr('value')+'</h1>\
        <h1>'+selectedBtn.closest('div').children('input[name="si"]').attr('value')+'</h1>\
        <h1>'+selectedBtn.closest('div').children('input[name="company"]').attr('value')+'</h1>\
        <h1>'+selectedBtn.closest('div').children('input[name="email"]').attr('value')+'</h1>\
        <h1>'+selectedBtn.closest('div').children('input[name="phone"]').attr('value')+'</h1>\
    ')
    $('#detailHeaderTxt').text(selectedBtn.closest('div').children('input[name="name"]').attr('value')+"님의 상세정보");
    $('#detailHeaderTxt').css('font-size','8vw')
}

function backToList()
{
    $('#detailView').hide();
    $('#listView').show();
}