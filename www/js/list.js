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
        data: {'index':currentIndex, 'name' : document.getElementById('search').value, 'csrfmiddlewaretoken': "{{ csrf_token }}"},
        success: function(directors)
        {
            $('#resultList').empty();
            currentIndex +=20;
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

function SearchLocation(doname,siname){

    $.ajax({
        method:'GET',
        url:'http://contact.attocube.co.kr/api/searchlocation',
        data: {
            'index':currentIndex,
            'do' : doname,
            'si' : siname,
            'csrfmiddlewaretoken': "{{ csrf_token }}" },
        success: function(directors)
        {
            $('#resultList').empty();
            currentIndex +=20;
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
                    <button class="btn btn-default" onclick="showDetail($(this))">\
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
    $('.detailPages').empty();
    
    $('.detailPages').append('\
        <table class="table">\
            <tr>\
                <td colspan="2" rowspan="2" ><img class="img-rounded img-responsive" src="'+selectedBtn.parent('div').parent('div').children('.userimgDiv').children('img').attr('src')+'"></td>\
                <td colspan="2"><font size="3">'+selectedBtn.closest('div').children('input[name="name"]').attr('value')+'</font></td>\
            </tr>\
            <tr>\
                <td><font size="3">'+selectedBtn.closest('div').children('input[name="company"]').attr('value')+'</font></td>\
            </tr>\
            <tr>\
                <td><a href="tel:'+selectedBtn.closest('div').children('input[name="cellphone"]').attr('value')+'"><img src="img/icon_info1_mobile.png" class="imgsize img-responsive"></a></td>\
                <td><font size="3">핸드폰</font></td>\
               <td><font size="3">'+selectedBtn.closest('div').children('input[name="cellphone"]').attr('value')+'</font></td>\
            </tr>\
            <tr>\
                <td><a href="mailto:'+selectedBtn.closest('div').children('input[name="email"]').attr('value')+'"><img src="img/icon_info2_email.png" class="imgsize img-responsive"></a></td>\
                <td><font size="3">이메일</font></td>\
                <td><font size="3">'+selectedBtn.closest('div').children('input[name="email"]').attr('value')+'</font></td>\
            </tr>\
            <tr>\
                <td><img src="img/icon_info3_workin.png" class="imgsize img-responsive"></td>\
                <td><font size="3">소속</font></td>\
                <td><font size="3">'+selectedBtn.closest('div').children('input[name="company"]').attr('value')+'</font></td>\
            </tr>\
            <tr>\
                <td><a href="tel:'+selectedBtn.closest('div').children('input[name="phone"]').attr('value')+'"><img src="img/icon_info4_tel.png" class="imgsize img-responsive"></a></td>\
                <td><font size="3">전화번호</font></td>\
                <td colsapn="2"><font size="3">'+selectedBtn.closest('div').children('input[name="phone"]').attr('value')+'</font></td>\
            </tr>\
            <tr>\
                <td><img src="img/icon_info5_fax.png" class="imgsize img-responsive"></td>\
                <td><font size="3">팩스</font></td>\
                <td colsapn="2"><font size="3">'+selectedBtn.closest('div').children('input[name="fax"]').attr('value')+'</font></td>\
            </tr>\
            <tr>\
                <td><img src="img/icon_info6_num.png" class="imgsize img-responsive"></td>\
                <td><font size="3">규모</font></td>\
                <td colsapn="2"><font size="3">'+selectedBtn.closest('div').children('input[name="member"]').attr('value')+'</font></td>\
            </tr>\
            <tr>\
                <td><img src="img/icon_info7_address.png" class="imgsize img-responsive"></td>\
                <td><font size="3">주소</font></td>\
                <td colsapn="2"><font size="3">'+selectedBtn.closest('div').children('input[name="address"]').attr('value')+'</font></td>\
            </tr>\
        </table>\
    ')
    $('#detailHeaderTxt').text(selectedBtn.closest('div').children('input[name="name"]').attr('value')+"님의 상세정보");
    $('#detailHeaderTxt').css('font-size','8vw')
}

function backToList()
{
    $('#detailView').hide();
    $('#listView').show();
}

function changeview(localname){
    if(localname=="경기"){
        document.getElementById("ggddiv").style.display="block";
        document.getElementById("ggdbtn").style.backgroundColor="#00D8FF";
    }
    else if(localname=="인천"){

    }
}

function calllocalsearch() {

    document.getElementById("localsearchdiv").style.display="block";
    document.getElementById("topdiv").style.display="none";
    document.getElementById("mainname").innerHTML="<b class=\"maintext\">지역검색</b>"
    document.getElementById("back").style.display="block";
}
function selectlocal(localname){
    
        var doname="경기";
        var siname=localname;
    SearchLocation(doname,siname);
    document.getElementById("localsearchdiv").style.display="none";
    document.getElementById("topdiv").style.display="block";
    document.getElementById("mainname").innerHTML="<b class=\"maintext\">지역검색-"+siname+"</b>"
}
function ClickBack2(){
    currentIndex =0;
    moreFlag = true;
    document.getElementById("localsearchdiv").style.display="none";
    document.getElementById("topdiv").style.display="block";
    document.getElementById("mainname").innerHTML="<b class=\"maintext\">주소록</b>"
    document.getElementById("back").style.display="none";
    initCall();

}