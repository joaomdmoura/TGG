function TopTenGrid ( username )
{
	var i;
	this.username = username
	console.log(this.username);
	this.data = [];
	this.start = 0;
	this.end = 5;
	this.times = 0;
	this.base_url = "/refinery/highlights/order";
	
	for( i = this.start; i < this.end; i++ )
		this.data.push( this.get_blank_item( i + 1 ) );
}

TopTenGrid.prototype.add = function ( id, category_id, position, color, align, title, skip_save )
{
	var index, item, from, is_new;
	
	id = parseInt( id );
	category_id = parseInt( category_id );
	position = parseInt( position );
	if( ! ( item = this.find_by_article_id( id ) ) )
	{
		is_new = true;
		item = {
			id: id,
			position: position,
			category_id: category_id,
			color: color,
			align: align,
			title: title
		};
	}
	item.color = color;
	item.align = align;
	if( item.position > position )
	{
		from = position;
		while( from <= item.position - 1 )
		{
			index = from++ - 1;
			this.data[ index ].position++;
		}
	}
	else if( item.position < position )
	{
		from = item.position + 1; 
		while( from <= position )
		{
			index = from++ - 1;
			this.data[ index ].position--;
		}
	}
	
	item.position = position;
	
	if( is_new )
	{
		console.log("is_new", is_new);
		console.log("data", this.data);
		console.log("item", item);
		this.data[ position - 1 ] = item;
	}
	
	
	this.render();
	if ( skip_save != true )
		this.save(category_id, this.username);
}

TopTenGrid.prototype.remove = function ( id, color, align )
{
	var from, item, index;
	
	item = this.find_by_article_id( id );
	index = this.find_index_by_article_id( id );
	from = item.position;
	
	while( from < this.data.length )
		this.data[from++].position--;
	
	this.data.splice(index, 1);
	
	this.data.push(this.get_blank_item(5));
	
	this.render();	
	
	this.save(item.category_id, this.username);
}

TopTenGrid.prototype.render = function()
{
	var i, item, ordered = [];
	var position, title, color, align, cat_id, tops;
	tops = "";
	for( i = 0; i < this.data.length; i++ )
		ordered[ ( item = this.data[ i ] ).position - 1 ] = item;
	
	this.data = ordered;
	for( i = 1; i <= this.data.length; i++ )
	{	
		item = this.data[ i - 1 ];
		if (item.color == "branco")
		{
			color = "branco";
		}
		else
		{
			color = "preto";
		}
		if (item.align == "esquerda")
		{
			align = 'esquerda';
		}
		else
		{
			align = 'direita';
		}

		$( "#position_" + i + " select" ).val( i );
		$( "#position_" + i + " select" ).attr( "disabled", !item.id );
		$( "#position_" + i + " input" ).val( item.id );
		$( "#color_" + i + " select" ).val( color );
		$( "#color_" + i + " select" ).attr( "disabled", !item.id );
		$( "#align_" + i + " select" ).val( align );
		$( "#align_" + i + " select" ).attr( "disabled", !item.id );
		$( "#title_" + i ).html( "<b>"+ item.title +"</b>" );
		$( "#action_" + i ).parent( ".actions" ).show();
	}
}

TopTenGrid.prototype.save = function( category_id, username )
{
	var i, item, tops;
	
	tops = "";
	for( i = 1; i <= this.data.length; i++ )
	{	
		item = this.data[ i - 1 ];
		item_id = item.id
		if ( item_id == null)
			item_id = i
		tops += i + "-" + item_id + "-" + item.color + "-" + item.align + "_";
		
		category_id = (item.category_id) ? item.category_id : category_id;
	}
	$.ajax( this.base_url + "/" + category_id + "?tops=" + tops + "&last_who=" + username );
}

TopTenGrid.prototype.find_by_article_id = function( id )
{
	for( i in this.data )
	{
		item = this.data[ i ]
		if( item.id == id )
		{
			return item;
		}
	}
	return false;
}

TopTenGrid.prototype.find_index_by_article_id = function( id )
{
	for( i in this.data )
	{
		item = this.data[ i ]
		if( item.id == id )
		{
			return i;
		}
	}
	
	return false;
}

TopTenGrid.prototype.get_blank_item = function ( position )
{
	return {
		id:null,
		category_id:null,
		position:position,
		color:"---",
		align:"---",
		title:"Vazio"
	};
}

// only for debug >>>
// var test = new TopTenGrid();
// test.add( 29, 39, 1, "destino", "Destino 29" );
// test.add( 28, 37, 2, "destino", "Destino 28" );
// test.add( 27, 38, 3, "destino", "Destino 27" );
// test.add( 26, 38, 4, "destino", "Destino 26" );
// test.add( 25, 38, 5, "destino", "Destino 25" );
// test.add( 24, 38, 6, "destino", "Destino 24" );
// 
// test.add( 29, 37, 3, "destino", "Destino 29" );
// 
// test.add( 29, 37, 10, "destino", "Destino 29" );
// 
// test.add( 28, 37, 7, "destino", "Destino 28" );
// 
// 
// test.add( 25, 37, 5, "destino", "Destino 28" );
// test.remove(25);

// // function debug ( text )
// {
// 	document.write( text +"<br/>" );
// }
