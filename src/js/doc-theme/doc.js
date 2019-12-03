/**
 * doc.js v1.0.0
 *
 * Funcionalidades para el layout doc, en el cual se genera la documentación del UI Kit
 */
;(function(document){

	var examples      = document.querySelectorAll('.language-html'),
			toc           = document.getElementById('DOC-toc-nav'),
			mainContainer = document.getElementById('DOC-container');
	//- Convierte el html en un string, necesario para prism	
	function htmlToString(_innerHtml,_replace){
		var string = _innerHtml.replace(/\s\s\s\s\s\s\s\s/g, '\n').replace(/\n\n\s/g, '\n').replace(/\n/,'');
		if( _replace.length > 0 ){
			for( var index = 0; index < _replace.length; index++ ){
				string = string.replace( _replace[index], '...' );
			}
		}
		return document.createTextNode( string );
	}
	//- Remplaza el contenido HTML del ejemplo por texto plano, necesario para prism	
	function buildExample(_examples){
		for (var i = 0; i < _examples.length; ++i) {
			var code = _examples[i].innerHTML, replace, arrayReplace = [];;
			if( _examples[i].getAttribute('data-replacetext') ){
				var replaceIn = _examples[i].querySelectorAll(_examples[i].getAttribute('data-replacetext'));
				for(var j = 0; j < replaceIn.length; j++ ){
					arrayReplace.push(replaceIn[j].innerHTML )
				}
			}
			_examples[i].innerHTML = '';
			_examples[i].appendChild( htmlToString(code, arrayReplace) );
		}
	}
	//- Genera la navegación interna, determinada por etiquetas H2 y H3
	function buildToc(){
		var anchors = mainContainer.querySelectorAll(":scope > h2, :scope > h3"), className = '';
		for (var i = 0; i < anchors.length; ++i) {
			var li = document.createElement('LI'),
			    a  = document.createElement('A'),
			    text = document.createTextNode(anchors[i].innerHTML);
			anchors[i].setAttribute('id', 'section_'+i.toString());
			if( anchors[i].nodeName == 'H2' ) className = 'DOC-toc__item--level1';
			if( anchors[i].nodeName == 'H3' ) className = 'DOC-toc__item--level2';
	    a.appendChild(text);
	    a.setAttribute('href','#section_'+i.toString());
	    li.appendChild(a);
	    li.setAttribute('class', className);
	    toc.appendChild(li);
		}
	}
	if(examples.length > 0) buildExample(examples);
	if(toc) buildToc();
})(document);