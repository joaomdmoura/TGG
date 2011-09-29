class TopGridTriggers
	
	constructor:( name )->
		@base_url = "/refinery/#{name}"
		@params = [ 
			"app_dialog=true",
			"dialog=true",
			"places_select=true",
			"src_id=:cat_id"
		]		
		@modal_div_params = [
			"id='modal_back'",
			"class='ui-widget-overlay'",
			"style='z-index: 1001; width: 1680px; height: 1337px;'"
		]
		@modal_div = "<div #{@modal_div_params.join " "}></div>"

	set:->
		$ ".search_btn".hover @on_search_over(), @on_search_out()
		$ ".search_btn".click @on_search_opts_click()
		$ "#close_modal".click @on_close_modal_click()
		$ "#remove_slot".click @on_remove_click()
		$ ".id select".change @on_select_change()
		$ ".new_fields select".change @on_select_change()
	
	on_select_change:( e )->
		fields = []
		new_fields = []
		this_src_id = $ this.attr "id".split "_"
		src_relationship_id = this_src_id[2]
		i = this_src_id[1]

		src_id = $ "#position_#{i} input".val()
		pos = $ "#position_#{i} select".val()
		if item.fields
				for key, value of item.fields
					do ( key, value ) ->
						fields.push $ "##{key}_#{i}".text().trim()
		if item.new_fields
				for key, value of item.new_fields
					do ( key, value ) ->
						new_fields.push $ "##{key}_#{i} select".val()
		
		top_ten_grid.add( src_id, src_relationship_id, pos, fields, new_fields )
		
	on_remove_click:->
		pos = $ this.attr "id".split "_"
		src_id = $ "#row_#{pos[1]} .id #hidden_#{pos[1]}".val()
		top_ten_grid.remove( src_id )
	
	on_search_over:->
		$ this.find ".search_btn".attr "style", "background-color : #62BEF2"

	on_search_out:->
		$ this.find ".search_btn".attr "style", "background-color : #22A7F2"

	on_search_opts_click:->
		src_relationship_id = $ "sub_src_relationsip_id".val()
		url = @format_url src_relationship_id
		console.log url
		$ "#dialog_iframe".hide().attr "src", url.load ->
			$ "#dialog_iframe".fadeIn 250
		$ "#modal_order".attr "type_id", $ this.attr "id"
		$ "#modal_order".fadeIn 500
		$ "body".css "overflow", "hidden"
		$ @modal_div.appendTo "body"
	
	on_close_modal_click:->
		$ "modal_order".fadeOut 500
		$ "body".css "overflow", "auto"
		$ "#modal_back".remove()

	format_url:( src_relationship_id )->
		src_relationship_id = src_relationship_id || ""
		url = "#{@base_url}?#{@params.join '&'}"
		return url.replace ":src_relationship_id", cat_id			


a = new TopGridTriggers 'lol'
a.set()