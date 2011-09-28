(function() {
  var TopGrid, a;
  TopGrid = (function() {
    function TopGrid(name, size) {
      var num, _ref, _ref2;
      this.start = 1;
      this.end = size;
      this.base_url = "/refinery/" + name + "/order";
      this.data = [];
      for (num = _ref = this.start, _ref2 = this.end; _ref <= _ref2 ? num <= _ref2 : num >= _ref2; _ref <= _ref2 ? num++ : num--) {
        this.data.push(this.get_blank_item(num));
      }
      console.log("constructor", this.data);
    }
    TopGrid.prototype.add = function(src_id, src_relationship_id, pos, fields, new_fields, skip_save) {
      var category_id, from, id, is_new, item;
      id = parseInt(src_id, 10);
      category_id = parseInt(src_relationship_id, 10);
      pos = parseInt(pos, 10);
      if (!(item = this.find_by_src_id(id))) {
        is_new = true;
        item = {
          id: id,
          pos: pos,
          fields: fields,
          new_fields: new_fields,
          src_relationship_id: src_relationship_id
        };
      }
      from = pos;
      if (item.pos > pos) {
        while (pos <= item.pos) {
          this.data[from].pos++;
          from++;
        }
      } else if (item.pos < pos) {
        from++;
        while (from <= pos) {
          this.data[from].pos--;
          from++;
        }
      }
      item.pos = pos;
      if (is_new) {
        this.data[pos - 1] = item;
      }
      console.log("add", this.data);
      this.render();
      if (!skip_save) {
        return this.save(src_relationship_id);
      }
    };
    TopGrid.prototype.remove = function(src_id) {
      var from, index, item;
      item = this.find_by_src_id(id);
      index = this.find_index_by_src_id(id);
      from = item.pos;
      while (from < this.data.length) {
        this.data[from++].pos--;
      }
      this.data.splice(index, 1);
      this.data.push(this.get_blank_item(5));
      this.render();
      return this.save(item.src_relationship_id);
    };
    TopGrid.prototype.render = function() {
      var i, item, key, ordered, value, _fn, _fn2, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4;
      ordered = [];
      _ref = this.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        ordered[i.pos - 1] = i;
      }
      this.data = ordered;
      _ref2 = this.data.length;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        i = _ref2[_j];
        item = this.data[i - 1];
        $(("#position_" + i + " select").val(i));
        $(("#position_" + i + " select").attr("disabled", !item.id));
        $(("#position_" + i + " input").val(item.id));
        $(("#action_" + i).parent(".actions".show()));
        if (item.fields) {
          _ref3 = item.new_fields;
          _fn = function(key, value) {
            $(("#" + key + "_" + i + " select").val(value));
            return $(("#" + key + "_" + i + " select").attr("disabled", !item.id));
          };
          for (key in _ref3) {
            value = _ref3[key];
            _fn(key, value);
          }
        }
        if (item.new_fields) {
          _ref4 = item.new_fields;
          _fn2 = function(key, value) {
            $(("#" + key + "_" + i + " select").val(value));
            return $(("#" + key + "_" + i + " select").attr("disabled", !item.id));
          };
          for (key in _ref4) {
            value = _ref4[key];
            _fn2(key, value);
          }
        }
      }
      return console.log("render", this.data);
    };
    TopGrid.prototype.save = function(src_relationship_id) {
      var i, item, key, new_fields, src_r_id, src_r_id_old, tops, value, _fn, _ref, _ref2, _ref3;
      console.log("save", this.data);
      tops = [];
      new_fields = [];
      for (i = _ref = this.start, _ref2 = this.end; _ref <= _ref2 ? i <= _ref2 : i >= _ref2; _ref <= _ref2 ? i++ : i--) {
        item = this.data[i - 1];
        if (item.new_fields) {
          _ref3 = item.new_fields;
          _fn = function(value) {
            return new_fields.push(value);
          };
          for (key in _ref3) {
            value = _ref3[key];
            _fn(value);
          }
        }
        new_fields.join("-");
        tops.push("" + i + "-" + item.id + "-" + new_fields);
        new_fields = [];
        src_r_id = item.src_relationship_id;
        src_r_id_old = src_relationship_id;
        src_relationship_id = src_r_id ? src_r_id : src_r_id_old;
      }
      tops.join("_");
      console.log("" + this.base_url + "/" + src_relationship_id + "?tops=" + tops);
      return $.ajax("" + this.base_url + "/" + src_relationship_id + "?tops=" + tops);
    };
    TopGrid.prototype.find_by_src_id = function(id) {
      var i, _i, _len, _ref;
      _ref = this.data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (i.id === id) {
          return i;
        }
      }
    };
    TopGrid.prototype.find_index_by_src_id = function(id) {
      var i, _i, _len, _ref;
      _ref = this.data.length;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (this.data[i].id === id) {
          return i;
        }
      }
    };
    TopGrid.prototype.get_blank_item = function(pos) {
      return {
        id: null,
        pos: pos,
        fields: null,
        new_fields: null,
        src_relationship_id: null
      };
    };
    return TopGrid;
  })();
  a = new TopGrid('lol', 10);
  a.add(1, 1, 1, {
    'title': 'lol'
  }, {
    'color': 'black',
    'align': 'right'
  }, false);
}).call(this);
