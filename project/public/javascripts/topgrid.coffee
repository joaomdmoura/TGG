class TopGrid
	
	constructor:( name, size )->
		@start = 1
		@end = size
		@base_url = "/refinery/#{name}/order"
		@data = []
		@data.push @get_blank_item num for num in [@start..@end]
		console.log "constructor", @data
	
	add:( src_id, src_relationship_id, pos, fields, new_fields, skip_save )->
		id = parseInt src_id,  10 
		category_id = parseInt src_relationship_id,  10
		pos = parseInt pos,  10
		if ! item = @find_by_src_id id
			is_new = true
			item = {
				id: id,
				pos: pos,
				fields: fields,
				new_fields: new_fields,
				src_relationship_id: src_relationship_id,
			}
		from = pos
		if item.pos > pos
			while pos <= item.pos
				@data[ from ].pos++
				from++
		else if item.pos < pos
			from++
			while from <= pos
				@data[ from ].pos--
				from++
		
		item.pos = pos

		@data[ pos - 1 ] = item if is_new
		console.log "add", @data
		@render()
		@save src_relationship_id if !skip_save
	
	remove:( src_id )->
		item = @find_by_src_id src_id
		index = @find_index_by_src_id src_id
		from = item.pos
		@data[ from++ ].pos-- while from < @data.length
		@data.splice index, 1
		@data.push @get_blank_item 5
		@render()
		@save item.src_relationship_id

	render:->
		ordered = []
		for i in @data
			ordered[ i.pos - 1 ] = i
		@data = ordered
		for i in @data.length
			item = @data[ i - 1 ]
			$ "#position_#{i} select".val i 
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

		console.log "render", @data

	save:( src_relationship_id )->
		console.log "save", @data
		tops = []
		new_fields = []
		for i in [@start..@end]
			item = @data[ i - 1 ]
			if item.new_fields
				for key, value of item.new_fields
  					do (value) ->
  						new_fields.push( value )
			new_fields.join "-"
			tops.push "#{i}-#{item.id}-#{new_fields}"
			new_fields = []
			src_r_id = item.src_relationship_id
			src_r_id_old = src_relationship_id
			src_relationship_id = if src_r_id then src_r_id else src_r_id_old
		tops.join "_"
		console.log "#{@base_url}/#{src_relationship_id}?tops=#{tops}"
		$.ajax "#{@base_url}/#{src_relationship_id}?tops=#{tops}"

	find_by_src_id:( id )->
		for i in @data 
			return if i.id == id then i
	
	find_index_by_src_id:( id )->
		for i in @data.length
			return if @data[ i ].id == id then i	

	get_blank_item:(pos)->
		return {
			id: null,
			pos: pos,
			fields: null,
			new_fields: null,
			src_relationship_id: null,
		}

top_ten_grid = new TopGrid 'lol', 10
top_ten_grid.add 1, 1, 1, {'title' : 'lol'}, {'color': 'black', 'align': 'right'}, false