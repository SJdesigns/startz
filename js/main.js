// fondos automáticos de bing
//http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=en-US

// detectar favicon de un dominio
//http://s2.googleusercontent.com/s2/favicons?domain_url=openmedicaldesigns.hol.es

// items de la página
/*var itemsAntiguos = [
	{'tit':'Google','logo':'google.png','link':'http://google.es','count':'0'},
	{'tit':'Youtube','logo':'youtube.png','link':'http://youtube.com','count':'0'},
	{'tit':'Outlook','logo':'outlook.ico','link':'https://outlook.live.com/owa/?mkt=es-us&path=/mail/inbox','count':'0'},
	{'tit':'Drive','logo':'drive.png','link':'https://drive.google.com/drive/my-drive','count':'0'},
	{'tit':'Wikipedia','logo':'wikipedia.png','link':'https://es.wikipedia.org/wiki/Wikipedia:Portada','count':'0'},
	{'tit':'Maps','logo':'maps.png','link':'https://www.google.es/maps?hl=es','count':'0'},
	{'tit':'Memrise','logo':'memrise.jpg','link':'https://memrise.com','count':'0'},
	{'tit':'Marca','logo':'marca.png','link':'https://marca.com','count':'0'},
	{'tit':'Duolingo','logo':'duolingo.svg','link':'https://duolingo.com','count':'0'},
	{'tit':'Gmail','logo':'gmail.ico','link':'https://mail.google.com','count':'0'},
	{'tit':'El Mundo','logo':'elmundo.png','link':'https://elmundo.es','count':'0'},
	{'tit':'Bing','logo':'bing.ico','link':'https://bing.com','count':'0'},
	{'tit':'Translate','logo':'translate.png','link':'https://translate.google.com','count':'0'},
	{'tit':'localhost','logo':'localhost.png','link':'https://localhost','count':'0'},
	{'tit':'Spotify','logo':'spotify.jpg','link':'https://open.spotify.com','count':'0'},
	{'tit':'Github','logo':'github.png','link':'https://github.io','count':'0'},
	{'tit':'ytPlayer','logo':'ytPlayer.png','link':'https://sergioalvarezweb.hol.es','count':'0'},
	{'tit':'Twitter','logo':'twitter.png','link':'https://twitter.com','count':'0'},
	{'tit':'Atresplayer','logo':'atresplayer.png','link':'http://www.atresplayer.com/','count':'0'},
];*/

/*var userSettings = {
	'avatar':'img/avatar.jpg',
	'username':'Sergio',
	'searchEngine':'google'
};*/

if (localStorage.getItem('startz-items') == null) { localStorage.setItem('startz-items','[]'); }
if (localStorage.getItem('startz-settings') == null) { localStorage.setItem('startz-settings',JSON.stringify({'avatar':'','username':'','searchEngine':''})); }

var engines = [
	{'name':'google','search':'http://www.google.com/search','queryVar':'q'},
	{'name':'bing','search':'https://www.bing.com/search','queryVar':'q'},
	{'name':'yahoo','search':'https://es.search.yahoo.com/search','queryVar':'p'},
	{'name':'DuckDuckGo','search':'https://duckduckgo.com','queryVar':'q'}
];

var items = JSON.parse(localStorage.getItem('startz-items'));

$(function() {
	// mostrar los items
	var box = '';
	for (var i in items) {
		box += '<div class="col-xs-12 col-sm-6 col-md-3 col-lg-2">';
        	box += '<a class="link" href="' + items[i]['link'] + '"><article class="totalVisitas' + items[i]['count'] + '">';
				if (items[i]['logo'].substring(0,7) == 'https:/' || items[i]['logo'].substring(0,7) == 'http://') {
					box += '<img src="' + items[i]['logo'] + '" />';
				} else {
					box += '<img src="img/' + items[i]['logo'] + '" />';
				}
                box += '<p>' + items[i]['tit'] + '</p>';
            box += '</article></a>';
        box += '</div>';
	}

	if (items.length==0) {
		box += '<div id="noResults"><p class="noResults">Todavía no has añadido enlaces a esta página</p></div>';
		$('#editCircle').addClass('editCircleAnimation');
	}
	$('#itemContainer').html(box);

	// detectar datos de configuración
	if (localStorage.getItem('startz-settings') != null) {
		var userSettings = JSON.parse(localStorage.getItem('startz-settings'));

		$('#session').find('img').attr('src',userSettings.avatar);
		$('#session').find('img').attr('title',userSettings.username);
		$('#session').find('img').attr('alt',userSettings.username);

		for (i in engines) {
			if (engines[i]['name'] == userSettings.searchEngine) {
				$('header').find('form').attr('action',engines[i].search);
				$('#searchBox').attr('name',engines[i].queryVar);
				$('#searchBox').attr('placeholder','buscar con ' + engines[i].name);
			}
		}
	}

	// botón eliminar texto cuadro de búsqueda
	$('#deleteSearch').on('click', function() {
		$('#searchBox').val('');
	});

	// aumenta el contador de visitas a un item
	$('article').on('click', function() {
		var items = JSON.parse(localStorage.getItem('startz-items'));
		var tit = $(this).find('p').html();
		var count = $(this).attr('class').substring(12);

		for (var i in items) {
			if (items[i]['tit']==tit) {
				items[i]['count']++;
			}
		};

		localStorage.setItem('startz-items',JSON.stringify(items));
	});
});
