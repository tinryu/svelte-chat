/* menuUser.html generated by Svelte v2.13.2 */
var MenuUser = (function() { "use strict";

	var socket = io();
function data() {
    return {
        count: 0
    };
};

	var methods = {
    renderList: function (data) {
        nameList.innerHTML = '';
        data.forEach(item => {
            nameList.innerHTML += `<li><p>` + item +`</p></li>`;
            // nameList.innerHTML += `<li>
            //     <small>` + item.id +
            //     `</small>
            //     <p>
            //         <i class="user circle icon" style="color: ` +
            //     item.color + `" ></i> 
            //         ` + item.name +
            //     `
            //     </p> 
            // </li>`;
        });
    }
};

	function oncreate() {
    let self = this;
    var nameFrom = document.getElementById('nameForm'),
        btnRes = document.getElementById('btnRes'),
        nameList = document.getElementById('nameList'),
        handle = document.getElementById('handle'),
        colorAva = document.getElementById('colorAva');

    socket.on('username', function (data) {
        console.log("data", data);
        if (data && data.length > 0) {
            // handle.value = data[data.length - 1].name;
            // colorAva.value = data[data.length - 1].color;
            self.set({
                count: data.length
            })
            self.renderList(data);
        } else
            console.log('miss data');
    });
};

	function ondestroy() {

};

	function create_main_fragment(component, ctx) {
		var div, div_1, p, text_1, span, text_2, text_4, ul, text_5, input;

		return {
			c() {
				div = createElement("div");
				div_1 = createElement("div");
				p = createElement("p");
				p.textContent = "User Online";
				text_1 = createText("\r\n        ");
				span = createElement("span");
				text_2 = createText(ctx.count);
				text_4 = createText("\r\n    ");
				ul = createElement("ul");
				text_5 = createText("\r\n    \r\n    ");
				input = createElement("input");
				span.className = "ui orange big circular label";
				div_1.className = "ui sixteen wide column text-center";
				ul.className = "chat";
				ul.id = "nameList";
				setAttribute(input, "type", "hidden");
				input.id = "colorAva";
				input.value = "#fff";
				div.className = "ui piled segment";
			},

			m(target, anchor) {
				insert(target, div, anchor);
				append(div, div_1);
				append(div_1, p);
				append(div_1, text_1);
				append(div_1, span);
				append(span, text_2);
				append(div, text_4);
				append(div, ul);
				append(div, text_5);
				append(div, input);
			},

			p(changed, ctx) {
				if (changed.count) {
					setData(text_2, ctx.count);
				}
			},

			d(detach) {
				if (detach) {
					detachNode(div);
				}
			}
		};
	}

	function MenuUser(options) {
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

	assign(MenuUser.prototype, {
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
	assign(MenuUser.prototype, methods);

	MenuUser.prototype._recompute = noop;

	function createElement(name) {
		return document.createElement(name);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function setAttribute(node, attribute, value) {
		node.setAttribute(attribute, value);
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
	return MenuUser;
}());