if (localStorage.getItem('startz-items') == null) { localStorage.setItem('startz-items','[]'); }
if (localStorage.getItem('startz-settings') == null) { localStorage.setItem('startz-settings',JSON.stringify({'avatar':'','username':'','searchEngine':''})); }

var settings = JSON.parse(localStorage.getItem('startz-settings'));
var items = JSON.parse(localStorage.getItem('startz-items'));

var engines = [
	{'name':'google','search':'http://www.google.com/search','queryVar':'q'},
	{'name':'bing','search':'https://www.bing.com/search','queryVar':'q'},
	{'name':'yahoo','search':'https://es.search.yahoo.com/search','queryVar':'p'},
	{'name':'DuckDuckGo','search':'https://duckduckgo.com','queryVar':'q'}
];

$(function() {
	cont = 0;
	box = '<table border="0"><thead><tr><th>Título</th><th>Logotipo</th><th>Enlace</th><th></th><th></th><th></th></tr></thead><tbody>';
	for (i in items) {
		if (items[i]['count'] == undefined) {
			items[i]['count'] = 0;
		}
		box += '<tr class="tablerow">';
			box += '<td><input class="title" type="text" name="title' + i + '" value="' + items[i]['tit'] + '" /></td>';
			box += '<td><input class="logo" type="text" name="logo' + i + '" value="' + items[i]['logo'] + '" /></td>';
			box += '<td><input class="link" type="text" name="link' + i + '" value="' + items[i]['link'] + '" /><input class="count" type="hidden" name="count" value="' + items[i]['count'] + '" /></td>';
			box += '<td><svg class="upRow" fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/><path d="M0 0h24v24H0z" fill="none"/></svg></td>';
			box += '<td><svg class="downRow" fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/><path d="M0-.75h24v24H0z" fill="none"/></svg></td>';
			box += '<td><svg class="deleteRow" fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg></td>';
		box += '</tr>';
		cont++;
	}
	if (items.length == 0) {
		box += '<tr id="noResults"><td colspan="4" align=center>No hay enlaces todavía</td></tr>';
	}
	box += '</tbody></table>';

	$('#tablaCuadros').html(box);

	// botón para añadir nuevos enlaces
	$('#addLink').on('click',function() {
		newRow = '<tr class="tablerow">';
			newRow += '<td><input class="title" type="text" placeholder="nuevo título" /></td>';
			newRow += '<td><input class="logo" type="text" placeholder="nuevo logotipo" /></td>';
			newRow += '<td><input class="link" type="text" placeholder="nuevo enlace" /><input class="count" type="hidden" name="count" value="0" /></td>';
			newRow += '<td><svg class="upRow" fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/><path d="M0 0h24v24H0z" fill="none"/></svg></td>';
			newRow += '<td><svg class="downRow" fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/><path d="M0-.75h24v24H0z" fill="none"/></svg></td>';
			newRow += '<td><svg class="deleteRow" fill="#333" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg></td>';
		newRow += '</tr>';
		$('tr#noResults').hide();
		$('#tablaCuadros').find('table').find('tbody').append(newRow);
		boton();
	});

	$('#configUsername').val(settings.username);
	$('#configAvatar').val(settings.avatar);
	$('.searchEngine').find('select').val('google').change();

	for (i in engines) {
		if (engines[i]['name'] == settings.searchEngine) {
			$('header').find('form').attr('action',engines[i].search);
			$('#searchBox').attr('name',engines[i].queryVar);
			$('#searchBox').attr('placeholder','buscar con ' + engines[i].name);
			$('.searchEngine').find('select').val(settings.searchEngine).change();
		}
	}

	// botón para guardar cambios
	$('#saveButton').on('click',function() {
		var title = Array();
		var logo = Array();
		var link = Array();
		var count = Array();

		$('.tablerow').each(function(e) {
			title.push($(this).find('td').find('.title').val());
			logo.push($(this).find('td').find('.logo').val());
			link.push($(this).find('td').find('.link').val());
			count.push($(this).find('td').find('.count').val());
		});

		var items = [];
		for (i in title) {
			if (title[i] != '') {
				items.push({'tit':title[i],'logo':logo[i],'link':link[i],'count':count[i]});
			}
		}

		var newSettings = {
			'avatar': $('#configAvatar').val(),
			'username': $('#configUsername').val(),
			'searchEngine': $('.searchEngine').find('select').val()
		};

		localStorage.setItem('startz-settings',JSON.stringify(newSettings));
		localStorage.setItem('startz-items',JSON.stringify(items));

		window.location = '../index.html';
	});

	// activar los botones de desplazamiento y borrado de los items
	boton();

	function boton() {
		$('.upRow').on('click',function(e) {
			console.log('mover para arriba');
			var mover = $(this).parent().parent();
			console.log(mover);
			console.log(mover.prev());

			$(mover.prev()).fadeOut(200).before(mover).fadeIn(200);
			$(mover).fadeOut(200).fadeIn(200);
		});

		$('.downRow').on('click',function(e) {
			console.log('mover para abajo');
			var mover = $(this).parent().parent();
			console.log(mover);
			console.log(mover.next());

			$(mover).fadeOut(200).before(mover.next()).fadeIn(200);
			$(mover.prev()).fadeOut(200).fadeIn(200);
		});

		$('.deleteRow').on('click',function(e) {
			console.log('eliminar');
			var parentDelete = $(this).parent().parent();
			console.log(parentDelete);
			parentDelete.animate({
				opacity: 0
			},400, function(parentDelete) {
				console.log(parentDelete);
				parentDelete.remove();
			});
		});
	}
});
