// INITIALIZING ----------------------------------------------------------------
$( document ).ready( initialize );
function initialize()
{
	this.triggers = new TopTenTriggers();
	this.triggers.set();
}

// CONSTRUCTOR -----------------------------------------------------------------
function TopTenTriggers()
{
	this.base_url = "/refinery/highlights";
	this.params = [
		"app_dialog=true",
		"dialog=true",
		"places_select=true",
		"category_id=:cat_id"
	];
	
	this.modal_div_params = [
		"id='modal_back'",
		"class='ui-widget-overlay'",
		"style='z-index: 1001; width: 1680px; height: 1337px;'"
	]
	this.modal_div = "<div "+ this.modal_div_params.join( " " ) +" ></div>";
	
	TopTenTriggers.self = this;
}

// SET / UNSET TRIGGERS --------------------------------------------------------
TopTenTriggers.prototype.set = function()
{
	$('.procurar').hover( this.on_search_over, this.on_search_out );
	$('.procurar').click( this.on_search_opts_click );
	$('#close_modal').click( this.on_close_modal_click );
	$(".remove_slot").click( this.on_remove_click );
	$('.id select').change(this.on_select_change);
	$('.color select').change(this.on_color_change);
	$('.align select').change(this.on_align_change);
}

TopTenTriggers.prototype.unset = function()
{
}

// SELECT triggers -------------------------------------------------------------
TopTenTriggers.prototype.on_select_change = function(e)
{
	var index, id, cat_id, position, color, align, title, action
	
	// select index
	index = $( this ).attr("id").split("_")[1];
	
	// variables
	position = $( this ).val();
	color = $( "#color_" + index + " select" ).val();
	align = $( "#align_" + index + " select" ).val();
	title = $( "#title_" + index ).text().trim();
	id = $( "#position_" + index + " input" ).val();
	
	// page category
	cat_id = $( this ).attr("id").split("_")[2];
	
	// add!
	top_ten_grid.add( id, cat_id, position, color, align, title );
}

TopTenTriggers.prototype.on_color_change = function(e)
{
	var index, id, cat_id, position, color, align, title, action
	
	// select index
	index = $( this ).attr("id").split("_")[1];
	
	// variables
	position = index;
	color = $( this ).val();
	align = $( "#align_" + index + " select" ).val();
	title = $( "#title_" + index ).text().trim();
	id = $( "#position_" + index + " input" ).val();
	
	// page category
	cat_id = $(this).attr("id").split("_")[2];
	
	// add!
	top_ten_grid.add( id, cat_id, position, color, align, title );
}

TopTenTriggers.prototype.on_align_change = function(e)
{
	var index, id, cat_id, position, color, align, title, action
	
	// select index
	index = $( this ).attr("id").split("_")[1];
	
	// variables
	position = index;
	color = $( "#color_" + index + " select" ).val();
	align = $( this ).val();
	title = $( "#title_" + index ).text().trim();
	id = $( "#position_" + index + " input" ).val();
	
	// page category
	cat_id = $(this).attr("id").split("_")[2];
	
	// add!
	top_ten_grid.add( id, cat_id, position, color, align, title );
}

TopTenTriggers.prototype.on_remove_click = function()
{
	position = $(this).attr("id").split("_");
	id = $("#row_"+position[1]+" .id #hidden_"+position[1]).val();
	color = $("#row_"+position[1]+" .color select").html().trim();
	align = $("#row_"+position[1]+" .align select").html().trim();
	
	top_ten_grid.remove(id, color, align);	
}

// SEARCH triggers -------------------------------------------------------------
TopTenTriggers.prototype.on_search_over = function()
{
	$(this).find(".procurar_btn").attr("style", "background : #62BEF2");
}

TopTenTriggers.prototype.on_search_out = function()
{
	$(this).find(".procurar_btn").attr("style", "background : #22A7F2");
}

// SEARCH OPTs triggers --------------------------------------------------------
TopTenTriggers.prototype.on_search_opts_click = function()
{
	var url, cat_id, type_id, has_country;
	
	cat_id = $("#subcategory_category_id").val();

	url = TopTenTriggers.self.format_url( cat_id );
	
	console.log( url );
	
	$("#dialog_iframe").hide();
	$("#dialog_iframe").attr("src", url ).load(function()
	{
		$("#dialog_iframe").fadeIn(250);
	});
	
	type_id = $( this ).attr( "id" );
	$( "#modal_order" ).attr( "type_id", type_id );
	$( "#modal_order" ).fadeIn( 500 );
	$( "body" ).css( "overflow", "hidden" );
	$( TopTenTriggers.self.modal_div ).appendTo( "body" );
}

// MODAL triggers --------------------------------------------------------------
TopTenTriggers.prototype.on_close_modal_click = function()
{
	$( "#modal_order" ).fadeOut( 500 );
	$( "body" ).css( "overflow", "auto" );
	$( "#modal_back" ).remove();
}

// UTILS -----------------------------------------------------------------------
TopTenTriggers.prototype.format_url = function( cat_id )
{
	var url;
	
	cat_id = cat_id || "";
	url = this.base_url + "?" + this.params.join( "&" );
	return url.replace( ":cat_id", cat_id );
}