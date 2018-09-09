/* login.html generated by Svelte v2.13.2 */
var Login = (function() { "use strict";

	var socket = io();
function data() {
    return {
        messError: ''
    };
};

	var methods = {

};

	function oncreate() {
    $('#messError').hide();
    var btn = document.getElementById('go'),
        input = document.getElementById('yourname');

    btn.addEventListener('click', function () {
        if(input.value === ''){
            this.set({messError: 'Missing Name dude!!' });
            $('#messError').show();
        } else {
            $("#app").show();
            $("#login").hide();
            socket.emit('new user', input.value);
        }
    }.bind(this));
};

	function ondestroy() {
    btn.removeEventListener("click", function () {});
};

	function create_main_fragment(component, ctx) {
		var div, form, div_1, text_6, button, text_8, div_3, i_2, text_9, text_10;

		return {
			c() {
				div = createElement("div");
				form = createElement("form");
				div_1 = createElement("div");
				div_1.innerHTML = "<span class=\"ui ribbon label\">Login Chat</span>\r\n            <div class=\"ui right labeled left icon input\"><i class=\"wifi icon\"></i>\r\n                <input type=\"text\" name=\"your name\" placeholder=\"Your Name\" id=\"yourname\">\r\n                <span class=\"ui tag label\"><i class=\"keyboard icon\" style=\"margin: 0\"></i></span></div>";
				text_6 = createText("\r\n        ");
				button = createElement("button");
				button.textContent = "Go chat";
				text_8 = createText("\r\n        ");
				div_3 = createElement("div");
				i_2 = createElement("i");
				text_9 = createText(" ");
				text_10 = createText(ctx.messError);
				div_1.className = "field";
				button.className = "mini ui button fluid grey";
				button.type = "button";
				button.id = "go";
				i_2.className = "user outline icon";
				div_3.className = "ui label fluid text-center";
				setStyle(div_3, "margin", "0");
				div_3.id = "messError";
				form.className = "ui form tall stacked segment";
				div.className = "column";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, form);
				append(form, div_1);
				append(form, text_6);
				append(form, button);
				append(form, text_8);
				append(form, div_3);
				append(div_3, i_2);
				append(div_3, text_9);
				append(div_3, text_10);
			},

			p(changed, ctx) {
				if (changed.messError) {
					setData(text_10, ctx.messError);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	function Login(options) {
		init(this, options);
		this._state = assign(data(), options.data);
		this._intro = true;

		this._handlers.destroy = [ondestroy];

		this._fragment = create_main_fragment(this, this._state);

		this.root._oncreate.push(() => {
			oncreate.call(this);
			this.fire("update", { changed: assignTrue({}, this._state), current: this._state });
		});

		if (options.target) {
			this._fragment.c();
			this._mount(options.target, options.anchor);

			flush(this);
		}
	}

	assign(Login.prototype, {
	 	destroy: destroy,
	 	get: get,
	 	fire: fire,
	 	on: on,
	 	set: set,
	 	_set: _set,
	 	_stage: _stage,
	 	_mount: _mount,
	 	_differs: _differs
	 });
	assign(Login.prototype, methods);

	Login.prototype._recompute = noop;

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function setStyle(node, key, value) {
		node.style.setProperty(key, value);
	}

	function insert(target, node, anchor) {
		target.insertBefore(node, anchor);
	}

	function append(target, node) {
		target.appendChild(node);
	}

	function setData(text, data) {
		text.data = '' + data;
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function init(component, options) {
		component._handlers = blankObject();
		component._slots = blankObject();
		component._bind = options._bind;
		component._staged = {};

		component.options = options;
		component.root = options.root || component;
		component.store = options.store || component.root.store;

		if (!options.root) {
			component._beforecreate = [];
			component._oncreate = [];
			component._aftercreate = [];
		}
	}

	function assign(tar, src) {
		for (var k in src) tar[k] = src[k];
		return tar;
	}

	function assignTrue(tar, src) {
		for (var k in src) tar[k] = 1;
		return tar;
	}

	function flush(component) {
		component._lock = true;
		callAll(component._beforecreate);
		callAll(component._oncreate);
		callAll(component._aftercreate);
		component._lock = false;
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = noop;

		this._fragment.d(detach !== false);
		this._fragment = null;
		this._state = {};
	}

	function get() {
		return this._state;
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			var handler = handlers[i];

			if (!handler.__calling) {
				try {
					handler.__calling = true;
					handler.call(this, data);
				} finally {
					handler.__calling = false;
				}
			}
		}
	}

	function on(eventName, handler) {
		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this.root._lock) return;
		flush(this.root);
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		newState = assign(this._staged, newState);
		this._staged = {};

		for (var key in newState) {
			if (this._differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign(assign({}, oldState), newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);

		if (this._fragment) {
			this.fire("state", { changed: changed, current: this._state, previous: oldState });
			this._fragment.p(changed, this._state);
			this.fire("update", { changed: changed, current: this._state, previous: oldState });
		}
	}

	function _stage(newState) {
		assign(this._staged, newState);
	}

	function _mount(target, anchor) {
		this._fragment[this._fragment.i ? 'i' : 'm'](target, anchor || null);
	}

	function _differs(a, b) {
		return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function noop() {}

	function blankObject() {
		return Object.create(null);
	}

	function callAll(fns) {
		while (fns && fns.length) fns.shift()();
	}
	return Login;
}());