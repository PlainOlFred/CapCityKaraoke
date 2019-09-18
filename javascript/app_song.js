$(document).ready(function () {


    $('.carousel').carousel();
    $('.sidenav').sidenav();
    $('#add-to-queue-modal').modal();

    //populate by song
   
    $('#song-search').on('change', function(){
        let songSearch = $(this)[0].value;
        callSongs(songSearch);
        $(this)[0].value = ' '
    })

    //get lyrics
    $('.lyricBtn').on('clicked', function(e){
        e.stopPropagation();
        console.log('lyrics')
    })
    
    $('body').on('click', '.lyricBtn', function(e){
        e.stopPropagation();    
      });

    //api request
    function callSongs(songSearch) {
        let search = songSearch
        let token = "0JAdOqbjDowpcohj8tFFZNaINIzaPLciE_i7JiXoaqzrvIMqMXtgTPZU87HJnuDn"
        let queryURL = "https://api.genius.com/search?access_token=" + token + `&q=${search}`;

        $.ajax({
            url:queryURL,
            method: "GET",
            dataType: 'json',
        }).then(function(response) {
            let hits =response.response['hits']
            console.log(hits)
            for(let i = 0; i<hits.length; i++){
                let song = hits[i].result['title'];
                let artist = hits[i].result['primary_artist']['name'];
                let cover = hits[i].result['song_art_image_thumbnail_url'];
                let lyrics =  hits[i].result['path'];
                
                //New Avatar
                let ava = new Avatar(song, artist, cover, lyrics);
                console.log(ava);
                let avaItem = ava.createAva();
                $('#song-collection').prepend(avaItem);
            }
        });
    };
    
    

    
   

    // open  add song modal
    $('#song-collection').on('click', '.addBtn', function(e){
        e.stopPropagation();
        let song = $(this).parent().attr('data-song');
        let artist = $(this).parent().attr('data-artist');
        let cover = $(this).parent().attr('data-cover');
        let lyrics = $(this).parent().attr('data-lyrics');
    

        //add to UpNext on close
        $('#add-to-queue-modal').modal({
            dismissible: false,
            onCloseEnd: function(){ 
            console.log(song) 
            }
        }); 
        $('#add-to-queue-modal').modal('open');
        
        $('#add-song').on('click', function(){
            console.log('firebase')
            console.log(song);
            console.log(artist);
            console.log(cover)
            console.log(lyrics)
            //
            //fire here with these varibles


        })
    }); 


    //Open Lyrics Modal
    $('#song-collection').on('click', '.lyricsBtn', function(){
       
        let song = $(this).parent().attr('data-song');
        let artist = $(this).parent().attr('data-artist');
        let cover = $(this).parent().attr('data-cover');
        let lyric = $(this).parent().attr('data-lyrics');
    

        
        $('#lyric-modal').modal({
            dismissible: false,     
        }); 
        $('#lyric-modal').modal('open');
        
        $('#lyric-modal-title').text(song);
        $('#lyric-modal-artist').text(artist);
        //use this link to display lyrics
        let lyricLink = $(`<a>${song}</a>`);
        lyricLink.attr('href','https://genius.com/'+lyric);
        $('#lyric-display').append(lyricLink);
        
        $('#add-song').on('click', function(){
            console.log('firebase')
            console.log(song);
            console.log(artist);
            console.log(cover)
            console.log(lyrics)
            //
            //fire here with these varibles


        })
    }); 
});
    
