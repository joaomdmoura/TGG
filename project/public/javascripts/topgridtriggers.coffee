class TopGridTriggers
	
	constructor:->
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
		
		
		$ "#position_#{i} select".attr "disabled", !item.id
		$ "#position_#{i} input".val item.id
		$ "#action_#{i}".parent ".actions".show()
		if item.fields
			for key, value of item.new_fields
				do (key, value) ->
					$ "##{key}_#{i} select".val value
					$ "##{key}_#{i} select".attr "disabled", !item.id
		if item.new_fields
			for key, value of item.new_fields
				do (key, value) ->
					$ "##{key}_#{i} select".val value
					$ "##{key}_#{i} select".attr "disabled", !item.id

a = new TopGridTriggers
a.set()