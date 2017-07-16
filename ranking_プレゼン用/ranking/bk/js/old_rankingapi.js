 (function(){
        var i_target ='たけのこの里';  // input 情報
        var o_itemgenre;  // output情報
        var o_ranking;  // output情報

        var APPID='1017123979372307141';
        var rakuurl='https://app.rakuten.co.jp/services/api/IchibaItem/Search/20140222?applicationId='+APPID+'&keyword='+i_target;
    console.log(rakuurl);
        $.ajax({
            type:'GET',
            url:rakuurl,
            dataType:'json',
        })
        .done(function(res){
            
            console.log(res);
             var result = '';
                  // success
                 var item = res.Items[0].Item; 
                 if( item.itemName.indexOf(i_target)){
                     console.log('get' , 'index =', item.itemName.indexOf(i_target));
                     result += item.itemName + 'のジャンルはＩＤ' + item.genreId + 'です<br>';
                 }
                 o_itemgenre= item.genreID;  // outputジャンル名をセット
    
             var rankingurl='https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20120927?format=json&applicationId='+APPID+'&genreId='+item.genreId;
             $.ajax({
                 type:'GET',
                 url:rankingurl,
                 dataType:'json',
             })
             .done(function(res2){
                 var foundit = -1;  // 見つけたフラグ
                 console.log("res2",res2);
                 console.log("res2 item",res2.Items.length);
                 for(var i = 0; i < res2.Items.length; i++) {
                     var item2 = res2.Items[i].Item; 
                     console.log('list ',i_target, ' in ', item2.itemName, 'index=',item2.itemName.indexOf(i_target));
                     if( item2.itemName.indexOf(i_target) >0 ){
                         console.log('found ',i_target, ' in ', item2.itemName, 'index=',item2.itemName.indexOf(i_target));
                         result += i_target + ' のランクは ' + item2.rank + 'です<br>';
                         o_ranking= item2.rank;
                         foundit = 1;
                         break;
                     }
                 }
                 if( foundit <0 ){
                     result += i_target + ' はランク外' + '<br>';
                     o_ranking= 999;
                 }
                console.log('result',result);
                 document.getElementById('ResultList').innerHTML = result; 
             })
             .fail(function(jqXHR){
                 alert('geterr  ranking');
             });
        })
        .fail(function(jqXHR){
            alert('geterr search');
        });
 })();
