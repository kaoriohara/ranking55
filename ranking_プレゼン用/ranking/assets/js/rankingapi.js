function getRanking(i_target) {
    var o_itemgenre;  // output情報
    var o_ranking;    // output情報

    var APPID='1017123979372307141';
    
    // get genre
    const request = new XMLHttpRequest();
    var rakuurl='https://app.rakuten.co.jp/services/api/IchibaItem/Search/20140222?applicationId='+APPID+'&keyword='+encodeURI(i_target);
    console.log('url=', rakuurl);
    request.open("GET", rakuurl);
    request.addEventListener("load", function (event) {
        if (event.target.status !== 200) {
            console.log('reserr');
            return;
        }
        var res = JSON.parse(event.target.responseText);
        var item = res.Items[0].Item; 
        
        // get ranking 
        const request2 = new XMLHttpRequest();
        var rankingurl='https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20120927?format=json&applicationId='+APPID+'&genreId='+item.genreId;
        console.log('url2=', rankingurl);
        request2.open('GET', rankingurl);
        request2.addEventListener("load", function (event) {
            var foundit = -1;
            if (event.target.status !== 200) {
                console.log('reserr');
                return;
            }
            var res2 = JSON.parse(event.target.responseText);
            
            for(var i = 0; i < res2.Items.length; i++) {
                var item2 = res2.Items[i].Item; 
                if( item2.itemName.indexOf(i_target) >0 ){
                    console.log('found ',i_target, ' in ', item2.itemName, 'index=',item2.itemName.indexOf(i_target));
                    o_ranking= item2.rank;// outputランキングをセット
                    foundit = 1;
                    break;
                }
            }
            if( foundit <0 ){
                console.log('out of rank');
                o_ranking= 'ランク外';
            }
            
            // get genre name
            const request3 = new XMLHttpRequest();
            var genreurl='https://app.rakuten.co.jp/services/api/IchibaGenre/Search/20140222?format=json&applicationId='+APPID+'&genreId='+item.genreId;
            console.log('url3=', genreurl);
            request3.open("GET", genreurl);
            request3.addEventListener("load", function (event) {
                if (event.target.status != 200) {
                    console.log('reserr');
                    return;
                }
             //console.log('res1=', event.target.responseText);
                var res = JSON.parse(event.target.responseText);
                o_itemgenre= res.current.genreName;  // outputジャンル名をセット
                document.getElementById('ItemGenreName').innerHTML = o_itemgenre;
            });
            request3.addEventListener("error3", function () {
                console.error("Network Error3");
            });
            request3.send();
                    
            // data set
            document.getElementById('Ranking').innerHTML = o_ranking;       
        });
        request2.addEventListener("error2", function () {
            console.error("Network Error2");
        });
        request2.send();
    
    });
    request.addEventListener("error1", function () {
        console.error("Network Error1");
    });
    request.send();
    return {"genre":o_itemgenre, "rank":o_ranking};
}






