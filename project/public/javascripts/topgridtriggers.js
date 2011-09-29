(function() {
  var TopGridTriggers, a;
  TopGridTriggers = (function() {
    function TopGridTriggers(name) {
      this.base_url = "/refinery/" + name;
      this.params = ["app_dialog=true", "dialog=true", "places_select=true", "src_id=:cat_id"];
      this.modal_div_params = ["id='modal_back'", "class='ui-widget-overlay'", "style='z-index: 1001; width: 1680px; height: 1337px;'"];
      this.modal_div = "<div " + (this.modal_div_params.join(" ")) + "></div>";
    }
    TopGridTriggers.prototype.set = function() {
      $(".search_btn".hover(this.on_search_over(), this.on_search_out()));
      $(".search_btn".click(this.on_search_opts_click()));
      $("#close_modal".click(this.on_close_modal_click()));
      $("#remove_slot".click(this.on_remove_click()));
      $(".id select".change(this.on_select_change()));
      return $(".new_fields select".change(this.on_select_change()));
    };
    TopGridTriggers.prototype.on_select_change = function(e) {
      var fields, i, key, new_fields, pos, src_id, src_relationship_id, this_src_id, value, _fn, _fn2, _ref, _ref2;
      fields = [];
      new_fields = [];
      this_src_id = $(this.attr("id".split("_")));
      src_relationship_id = this_src_id[2];
      i = this_src_id[1];
      src_id = $(("#position_" + i + " input").val());
      pos = $(("#position_" + i + " select").val());
      if (item.fields) {
        _ref = item.fields;
        _fn = function(key, value) {
          return fields.push($(("#" + key + "_" + i).text().trim()));
        };
        for (key in _ref) {
          value = _ref[key];
          _fn(key, value);
        }
      }
      if (item.new_fields) {
        _ref2 = item.new_fields;
        _fn2 = function(key, value) {
          return new_fields.push($(("#" + key + "_" + i + " select").val()));
        };
        for (key in _ref2) {
          value = _ref2[key];
          _fn2(key, value);
        }
      }
      return top_ten_grid.add(src_id, src_relationship_id, pos, fields, new_fields);
    };
    TopGridTriggers.prototype.on_remove_click = function() {
      var pos, src_id;
      pos = $(this.attr("id".split("_")));
      src_id = $(("#row_" + pos[1] + " .id #hidden_" + pos[1]).val());
      return top_ten_grid.remove(src_id);
    };
    TopGridTriggers.prototype.on_search_over = function() {
      return $(this.find(".search_btn".attr("style", "background-color : #62BEF2")));
    };
    TopGridTriggers.prototype.on_search_out = function() {
      return $(this.find(".search_btn".attr("style", "background-color : #22A7F2")));
    };
    TopGridTriggers.prototype.on_search_opts_click = function() {
      var src_relationship_id, url;
      src_relationship_id = $("sub_src_relationsip_id".val());
      url = this.format_url(src_relationship_id);
      console.log(url);
      $("#dialog_iframe".hide().attr("src", url.load(function() {
        return $("#dialog_iframe".fadeIn(250));
      })));
      $("#modal_order".attr("type_id", $(this.attr("id"))));
      $("#modal_order".fadeIn(500));
      $("body".css("overflow", "hidden"));
      return $(this.modal_div.appendTo("body"));
    };
    TopGridTriggers.prototype.on_close_modal_click = function() {
      $("modal_order".fadeOut(500));
      $("body".css("overflow", "auto"));
      return $("#modal_back".remove());
    };
    TopGridTriggers.prototype.format_url = function(src_relationship_id) {
      var url;
      src_relationship_id = src_relationship_id || "";
      url = "" + this.base_url + "?" + (this.params.join('&'));
      return url.replace(":src_relationship_id", cat_id);
    };
    return TopGridTriggers;
  })();
  a = new TopGridTriggers('lol');
  a.set();
}).call(this);
