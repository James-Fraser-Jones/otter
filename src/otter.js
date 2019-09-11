(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.ak.S === region.as.S)
	{
		return 'on line ' + region.ak.S;
	}
	return 'on lines ' + region.ak.S + ' through ' + region.as.S;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bq,
		impl.bS,
		impl.bM,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		s: func(record.s),
		al: record.al,
		aj: record.aj
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.s;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.al;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.aj) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bq,
		impl.bS,
		impl.bM,
		function(sendToApp, initialModel) {
			var view = impl.bU;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bq,
		impl.bS,
		impl.bM,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.U && impl.U(sendToApp)
			var view = impl.bU;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.a5);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.bQ) && (_VirtualDom_doc.title = title = doc.bQ);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.bz;
	var onUrlRequest = impl.bA;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		U: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.aQ === next.aQ
							&& curr.ay === next.ay
							&& curr.aM.a === next.aM.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		bq: function(flags)
		{
			return A3(impl.bq, flags, _Browser_getUrl(), key);
		},
		bU: impl.bU,
		bS: impl.bS,
		bM: impl.bM
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { bn: 'hidden', a7: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { bn: 'mozHidden', a7: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { bn: 'msHidden', a7: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { bn: 'webkitHidden', a7: 'webkitvisibilitychange' }
		: { bn: 'hidden', a7: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		aW: _Browser_getScene(),
		a0: {
			m: _Browser_window.pageXOffset,
			k: _Browser_window.pageYOffset,
			P: _Browser_doc.documentElement.clientWidth,
			bm: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		P: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		bm: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			aW: {
				P: node.scrollWidth,
				bm: node.scrollHeight
			},
			a0: {
				m: node.scrollLeft,
				k: node.scrollTop,
				P: node.clientWidth,
				bm: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			aW: _Browser_getScene(),
			a0: {
				m: x,
				k: y,
				P: _Browser_doc.documentElement.clientWidth,
				bm: _Browser_doc.documentElement.clientHeight
			},
			bh: {
				m: x + rect.left,
				k: y + rect.top,
				P: rect.width,
				bm: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2(elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2(elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}





// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var author$project$Otter$CursorPosition = F2(
	function (x, y) {
		return {m: x, k: y};
	});
var author$project$Otter$Model = function (sidePanelExpanded) {
	return function (filename) {
		return function (records) {
			return function (oldRecords) {
				return function (newRecord) {
					return function (suggested) {
						return function (cursorPosition) {
							return function (enableVirtualization) {
								return function (scrollLock) {
									return function (visibleStartIndex) {
										return function (visibleEndIndex) {
											return function (viewportHeight) {
												return function (viewportY) {
													return {n: cursorPosition, R: enableVirtualization, H: filename, t: newRecord, B: oldRecords, f: records, T: scrollLock, v: sidePanelExpanded, w: suggested, Z: viewportHeight, y: viewportY, _: visibleEndIndex, D: visibleStartIndex};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var author$project$Otter$VirViewportInfo = function (a) {
	return {$: 17, a: a};
};
var author$project$Otter$HandleErrorEvent = function (a) {
	return {$: 1, a: a};
};
var author$project$Otter$handleError = F2(
	function (onSuccess, result) {
		if (result.$ === 1) {
			var message = result.a;
			return author$project$Otter$HandleErrorEvent(message);
		} else {
			var value = result.a;
			return onSuccess(value);
		}
	});
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Basics$False = 1;
var elm$core$Basics$True = 0;
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$LT = 0;
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = 2;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.e) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.h),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.h);
		} else {
			var treeLen = builder.e * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.i) : builder.i;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.e);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.h) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.h);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{i: nodeList, e: (len / elm$core$Array$branchFactor) | 0, h: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {aw: fragment, ay: host, aK: path, aM: port_, aQ: protocol, aR: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Dom$getViewportOf = _Browser_getViewportOf;
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Task$onError = _Scheduler_onError;
var elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return elm$core$Task$command(
			A2(
				elm$core$Task$onError,
				A2(
					elm$core$Basics$composeL,
					A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
					elm$core$Result$Err),
				A2(
					elm$core$Task$andThen,
					A2(
						elm$core$Basics$composeL,
						A2(elm$core$Basics$composeL, elm$core$Task$succeed, resultToMessage),
						elm$core$Result$Ok),
					task)));
	});
var author$project$Otter$checkTableViewport = A2(
	elm$core$Task$attempt,
	author$project$Otter$handleError(author$project$Otter$VirViewportInfo),
	elm$browser$Browser$Dom$getViewportOf('table-viewport'));
var elm$json$Json$Encode$null = _Json_encodeNull;
var author$project$Ports$focusCursor = _Platform_outgoingPort(
	'focusCursor',
	function ($) {
		return elm$json$Json$Encode$null;
	});
var author$project$Otter$focusCursor = author$project$Ports$focusCursor(0);
var author$project$Records$Record = F5(
	function (oldLotNo, lotNo, vendor, description, reserve) {
		return {F: description, I: lotNo, ah: oldLotNo, L: reserve, N: vendor};
	});
var author$project$Records$emptyRecord = A5(author$project$Records$Record, '', '', '', '', '');
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{i: nodeList, e: nodeListSize, h: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var elm$core$Platform$Cmd$batch = _Platform_batch;
var author$project$Otter$init = function (_n0) {
	return _Utils_Tuple2(
		author$project$Otter$Model(true)('')(
			elm$core$Array$fromList(_List_Nil))(
			elm$core$Array$fromList(_List_Nil))(author$project$Records$emptyRecord)(elm$core$Maybe$Nothing)(
			A2(author$project$Otter$CursorPosition, 0, elm$core$Maybe$Nothing))(true)(false)(0)(0)(0)(0),
		elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[author$project$Otter$checkTableViewport, author$project$Otter$focusCursor])));
};
var author$project$Otter$VirResize = {$: 16};
var elm$browser$Browser$Events$Window = 1;
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {aL: pids, aZ: subs};
	});
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {at: event, bt: key};
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.aL,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.bt;
		var event = _n0.at;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.aZ);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			elm$json$Json$Decode$field,
			'target',
			A3(
				elm$json$Json$Decode$map2,
				func,
				A2(elm$json$Json$Decode$field, 'innerWidth', elm$json$Json$Decode$int),
				A2(elm$json$Json$Decode$field, 'innerHeight', elm$json$Json$Decode$int))));
};
var author$project$Otter$subscriptions = function (_n0) {
	return elm$browser$Browser$Events$onResize(
		F2(
			function (_n1, _n2) {
				return author$project$Otter$VirResize;
			}));
};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter = {$: 37};
var author$project$Otter$CsvLoaded = F3(
	function (a, b, c) {
		return {$: 9, a: a, b: b, c: c};
	});
var author$project$Otter$CsvSelected = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var author$project$Otter$CursorMoved = F2(
	function (a, b) {
		return {$: 20, a: a, b: b};
	});
var author$project$Otter$NoOp = {$: 0};
var author$project$Otter$VirScroll = F2(
	function (a, b) {
		return {$: 14, a: a, b: b};
	});
var author$project$Otter$VirUpdate = {$: 15};
var author$project$Otter$VirScrollbarInfo = function (a) {
	return {$: 13, a: a};
};
var author$project$Otter$checkScrollbar = A2(
	elm$core$Task$attempt,
	author$project$Otter$handleError(author$project$Otter$VirScrollbarInfo),
	elm$browser$Browser$Dom$getViewportOf('scrollbar'));
var author$project$Otter$csv_mime = 'text/csv';
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Prelude$getAt = F2(
	function (n, list) {
		return elm$core$List$head(
			A2(elm$core$List$drop, n, list));
	});
var author$project$Prelude$maybeAp = F2(
	function (mf, ma) {
		var _n0 = _Utils_Tuple2(mf, ma);
		if ((!_n0.a.$) && (!_n0.b.$)) {
			var f = _n0.a.a;
			var a = _n0.b.a;
			return elm$core$Maybe$Just(
				f(a));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Basics$not = _Basics_not;
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var author$project$Otter$filterEmptyAndSold = function (records) {
	var cond = function (elem) {
		return A2(
			elm$core$Maybe$withDefault,
			false,
			A2(
				author$project$Prelude$maybeAp,
				A2(
					elm$core$Maybe$map,
					elm$core$Basics$and,
					A2(
						elm$core$Maybe$map,
						A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
						A2(author$project$Prelude$getAt, 0, elem))),
				A2(
					elm$core$Maybe$map,
					elm$core$String$isEmpty,
					A2(author$project$Prelude$getAt, 6, elem))));
	};
	return A2(elm$core$List$filter, cond, records);
};
var author$project$Prelude$flip = F3(
	function (f, a, b) {
		return A2(f, b, a);
	});
var author$project$Prelude$pred = A2(author$project$Prelude$flip, elm$core$Basics$sub, 1);
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_n0.$) {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Array$length = function (_n0) {
	var len = _n0.a;
	return len;
};
var author$project$Prelude$findIndexFromEnd = F2(
	function (elem, array) {
		var findI = F3(
			function (i, e, a) {
				findI:
				while (true) {
					if (i < 0) {
						return elm$core$Maybe$Nothing;
					} else {
						if (_Utils_eq(
							A2(elm$core$Array$get, i, a),
							elm$core$Maybe$Just(e))) {
							return elm$core$Maybe$Just(i);
						} else {
							var $temp$i = author$project$Prelude$pred(i),
								$temp$e = e,
								$temp$a = a;
							i = $temp$i;
							e = $temp$e;
							a = $temp$a;
							continue findI;
						}
					}
				}
			});
		return A3(
			findI,
			elm$core$Array$length(array) - 1,
			elem,
			array);
	});
var author$project$Prelude$laast = function (array) {
	return A2(
		elm$core$Array$get,
		elm$core$Array$length(array) - 1,
		array);
};
var elm$core$Array$filter = F2(
	function (isGood, array) {
		return elm$core$Array$fromList(
			A3(
				elm$core$Array$foldr,
				F2(
					function (x, xs) {
						return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
					}),
				_List_Nil,
				array));
	});
var elm$core$Array$isEmpty = function (_n0) {
	var len = _n0.a;
	return !len;
};
var author$project$Prelude$mamber = function (x) {
	return A2(
		elm$core$Basics$composeL,
		A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$Array$isEmpty),
		elm$core$Array$filter(
			elm$core$Basics$eq(x)));
};
var author$project$Prelude$maybe = F3(
	function (b, f, ma) {
		return A2(
			elm$core$Maybe$withDefault,
			b,
			A2(elm$core$Maybe$map, f, ma));
	});
var author$project$Prelude$succ = elm$core$Basics$add(1);
var elm$core$Elm$JsArray$map = _JsArray_map;
var elm$core$Array$map = F2(
	function (func, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return elm$core$Array$SubTree(
					A2(elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return elm$core$Array$Leaf(
					A2(elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2(elm$core$Elm$JsArray$map, helper, tree),
			A2(elm$core$Elm$JsArray$map, func, tail));
	});
var elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var elm$core$Elm$JsArray$slice = _JsArray_slice;
var elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = elm$core$Elm$JsArray$length(tail);
		var notAppended = (elm$core$Array$branchFactor - elm$core$Elm$JsArray$length(builder.h)) - tailLen;
		var appended = A3(elm$core$Elm$JsArray$appendN, elm$core$Array$branchFactor, builder.h, tail);
		return (notAppended < 0) ? {
			i: A2(
				elm$core$List$cons,
				elm$core$Array$Leaf(appended),
				builder.i),
			e: builder.e + 1,
			h: A3(elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			i: A2(
				elm$core$List$cons,
				elm$core$Array$Leaf(appended),
				builder.i),
			e: builder.e + 1,
			h: elm$core$Elm$JsArray$empty
		} : {i: builder.i, e: builder.e, h: appended});
	});
var elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					elm$core$Array$Array_elm_builtin,
					len - from,
					elm$core$Array$shiftStep,
					elm$core$Elm$JsArray$empty,
					A3(
						elm$core$Elm$JsArray$slice,
						from - elm$core$Array$tailIndex(len),
						elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (!node.$) {
							var subTree = node.a;
							return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2(elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2(elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * elm$core$Array$branchFactor);
					var initialBuilder = {
						i: _List_Nil,
						e: 0,
						h: A3(
							elm$core$Elm$JsArray$slice,
							firstSlice,
							elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						elm$core$Array$builderToArray,
						true,
						A3(elm$core$List$foldl, elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = elm$core$Array$bitMask & (treeEnd >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_n0.$) {
				var sub = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _n0.a;
				return A3(elm$core$Elm$JsArray$slice, 0, elm$core$Array$bitMask & end, values);
			}
		}
	});
var elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (!_n0.$) {
					var sub = _n0.a;
					var $temp$oldShift = oldShift - elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = elm$core$Array$bitMask & (endIdx >>> shift);
		var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (!_n0.$) {
			var sub = _n0.a;
			var newSub = A3(elm$core$Array$sliceTree, shift - elm$core$Array$shiftStep, endIdx, sub);
			return (!elm$core$Elm$JsArray$length(newSub)) ? A3(elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				elm$core$Array$SubTree(newSub),
				A3(elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3(elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3(elm$core$Elm$JsArray$slice, 0, elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = elm$core$Array$tailIndex(end);
				var depth = elm$core$Basics$floor(
					A2(
						elm$core$Basics$logBase,
						elm$core$Array$branchFactor,
						A2(elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep);
				return A4(
					elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3(elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4(elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var elm$core$Array$translateIndex = F2(
	function (index, _n0) {
		var len = _n0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2(elm$core$Array$translateIndex, to, array);
		var correctFrom = A2(elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? elm$core$Array$empty : A2(
			elm$core$Array$sliceLeft,
			correctFrom,
			A2(elm$core$Array$sliceRight, correctTo, array));
	});
var author$project$Otter$genSuggestion = F2(
	function (oldRecords, records) {
		var usedSuggestions = A2(
			elm$core$Array$filter,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$String$isEmpty),
			A2(
				elm$core$Array$map,
				function ($) {
					return $.ah;
				},
				records));
		var allSuggestions = A2(
			elm$core$Array$map,
			function ($) {
				return $.I;
			},
			oldRecords);
		var freshIndex = A3(
			author$project$Prelude$maybe,
			elm$core$Maybe$Just(0),
			function (lSugg) {
				return A2(
					elm$core$Maybe$map,
					author$project$Prelude$succ,
					A2(author$project$Prelude$findIndexFromEnd, lSugg, allSuggestions));
			},
			author$project$Prelude$laast(usedSuggestions));
		var openSuggestions = A3(
			author$project$Prelude$maybe,
			elm$core$Array$fromList(_List_Nil),
			function (index) {
				return A3(
					elm$core$Array$slice,
					index,
					elm$core$Array$length(allSuggestions),
					allSuggestions);
			},
			freshIndex);
		var unusedSuggestions = A2(
			elm$core$Array$filter,
			A2(
				elm$core$Basics$composeL,
				elm$core$Basics$not,
				A2(author$project$Prelude$flip, author$project$Prelude$mamber, usedSuggestions)),
			openSuggestions);
		return A2(elm$core$Array$get, 0, unusedSuggestions);
	});
var author$project$Otter$getFreshLotNo = function (records) {
	return A3(
		author$project$Prelude$maybe,
		elm$core$Maybe$Just(1),
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				elm$core$Maybe$map(author$project$Prelude$succ),
				elm$core$String$toInt),
			function ($) {
				return $.I;
			}),
		author$project$Prelude$laast(records));
};
var author$project$Prelude$find = function (cond) {
	return A2(
		elm$core$Basics$composeL,
		elm$core$Array$get(0),
		elm$core$Array$filter(cond));
};
var author$project$Records$oldToNew = F2(
	function (oldLotNo, _n0) {
		var lotNo = _n0.I;
		var vendor = _n0.N;
		var description = _n0.F;
		var reserve = _n0.L;
		return A5(author$project$Records$Record, oldLotNo, lotNo, vendor, description, reserve);
	});
var author$project$Otter$getSuggestion = F3(
	function (suggestion, record, oldRecords) {
		var oldLotNo = A2(
			elm$core$Maybe$withDefault,
			'',
			_Utils_eq(
				_Utils_update(
					record,
					{I: ''}),
				author$project$Records$emptyRecord) ? suggestion : elm$core$Maybe$Just(record.ah));
		return A3(
			author$project$Prelude$maybe,
			_Utils_update(
				record,
				{ah: ''}),
			author$project$Records$oldToNew(oldLotNo),
			A2(
				author$project$Prelude$find,
				A2(
					elm$core$Basics$composeL,
					elm$core$Basics$eq(oldLotNo),
					function ($) {
						return $.I;
					}),
				oldRecords));
	});
var author$project$Otter$getNewRecord = function (model) {
	var newRecord = A3(author$project$Otter$getSuggestion, model.w, model.t, model.B);
	return (model.t.I === '') ? _Utils_update(
		newRecord,
		{
			I: A3(
				author$project$Prelude$maybe,
				'',
				elm$core$String$fromInt,
				author$project$Otter$getFreshLotNo(model.f))
		}) : newRecord;
};
var author$project$Otter$row_height = 34;
var elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var author$project$Otter$getVisibleRows = F3(
	function (numRecords, viewportHeight, viewportY) {
		var top = author$project$Prelude$pred(
			A2(
				elm$core$Basics$min,
				numRecords + 1,
				author$project$Prelude$pred(
					elm$core$Basics$ceiling((viewportY + viewportHeight) / author$project$Otter$row_height))));
		var bottom = author$project$Prelude$pred(
			A2(
				elm$core$Basics$max,
				1,
				elm$core$Basics$floor(viewportY / author$project$Otter$row_height)));
		return _Utils_Tuple2(bottom, top);
	});
var elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var author$project$Otter$maybeClamp = F3(
	function (recordNum, f, m) {
		var n = A2(elm$core$Maybe$withDefault, recordNum, m);
		var c = A3(
			elm$core$Basics$clamp,
			0,
			recordNum,
			f(n));
		return _Utils_eq(c, recordNum) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(c);
	});
var author$project$Otter$tableHeight = function (model) {
	return (elm$core$Array$length(model.f) + 2) * author$project$Otter$row_height;
};
var elm$browser$Browser$Dom$setViewportOf = _Browser_setViewportOf;
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var author$project$Otter$updateScrollBar = function (newViewportY) {
	return A2(
		elm$core$Task$attempt,
		author$project$Otter$handleError(
			elm$core$Basics$always(author$project$Otter$NoOp)),
		A3(elm$browser$Browser$Dom$setViewportOf, 'scrollbar', 0, newViewportY));
};
var author$project$Otter$scroll_wait = 100;
var elm$core$Process$sleep = _Process_sleep;
var author$project$Otter$updateVisibleRows = A2(
	elm$core$Task$perform,
	elm$core$Basics$always(author$project$Otter$VirUpdate),
	elm$core$Process$sleep(author$project$Otter$scroll_wait));
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Ports$example = _Platform_outgoingPort('example', elm$json$Json$Encode$string);
var author$project$Prelude$updateAt = F3(
	function (n, f, lst) {
		var _n0 = _Utils_Tuple2(n, lst);
		if (!_n0.b.b) {
			return _List_Nil;
		} else {
			if (!_n0.a) {
				var _n1 = _n0.b;
				var x = _n1.a;
				var xs = _n1.b;
				return A2(
					elm$core$List$cons,
					f(x),
					xs);
			} else {
				var nn = _n0.a;
				var _n2 = _n0.b;
				var x = _n2.a;
				var xs = _n2.b;
				return A2(
					elm$core$List$cons,
					x,
					A3(author$project$Prelude$updateAt, nn - 1, f, xs));
			}
		}
	});
var elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_n0.$) {
			var subTree = _n0.a;
			var newSub = A4(elm$core$Array$setHelp, shift - elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _n0.a;
			var newLeaf = A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, values);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, tail)) : A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4(elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var author$project$Prelude$updateAtt = F3(
	function (i, f, a) {
		return A4(
			author$project$Prelude$maybe,
			elm$core$Basics$identity,
			elm$core$Array$set(i),
			A2(
				elm$core$Maybe$map,
				f,
				A2(elm$core$Array$get, i, a)),
			a);
	});
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var author$project$Prelude$pad = F3(
	function (n, def, list) {
		return _Utils_ap(
			list,
			A2(
				elm$core$List$repeat,
				A2(
					elm$core$Basics$max,
					n - elm$core$List$length(list),
					0),
				def));
	});
var author$project$Records$OldRecord = F4(
	function (lotNo, vendor, description, reserve) {
		return {F: description, I: lotNo, L: reserve, N: vendor};
	});
var author$project$Records$errorOldRecord = A4(author$project$Records$OldRecord, 'ERROR', 'ERROR', 'ERROR', 'ERROR');
var author$project$Records$importListToOldRecord = function (list) {
	var _n0 = A3(author$project$Prelude$pad, 4, '', list);
	if (((_n0.b && _n0.b.b) && _n0.b.b.b) && _n0.b.b.b.b) {
		var a = _n0.a;
		var _n1 = _n0.b;
		var b = _n1.a;
		var _n2 = _n1.b;
		var c = _n2.a;
		var _n3 = _n2.b;
		var d = _n3.a;
		var xs = _n3.b;
		return A4(author$project$Records$OldRecord, b, a, c, d);
	} else {
		return author$project$Records$errorOldRecord;
	}
};
var author$project$Records$errorRecord = A5(author$project$Records$Record, 'ERROR', 'ERROR', 'ERROR', 'ERROR', 'ERROR');
var author$project$Records$importListToRecord = function (list) {
	var _n0 = A3(author$project$Prelude$pad, 4, '', list);
	if (((_n0.b && _n0.b.b) && _n0.b.b.b) && _n0.b.b.b.b) {
		var a = _n0.a;
		var _n1 = _n0.b;
		var b = _n1.a;
		var _n2 = _n1.b;
		var c = _n2.a;
		var _n3 = _n2.b;
		var d = _n3.a;
		var xs = _n3.b;
		return A5(author$project$Records$Record, '', b, a, c, d);
	} else {
		return author$project$Records$errorRecord;
	}
};
var author$project$Records$listToRecord = function (list) {
	var _n0 = A3(author$project$Prelude$pad, 5, '', list);
	if ((((_n0.b && _n0.b.b) && _n0.b.b.b) && _n0.b.b.b.b) && _n0.b.b.b.b.b) {
		var a = _n0.a;
		var _n1 = _n0.b;
		var b = _n1.a;
		var _n2 = _n1.b;
		var c = _n2.a;
		var _n3 = _n2.b;
		var d = _n3.a;
		var _n4 = _n3.b;
		var e = _n4.a;
		var xs = _n4.b;
		return A5(author$project$Records$Record, a, b, c, d, e);
	} else {
		return author$project$Records$errorRecord;
	}
};
var author$project$Records$recordToList = function (_n0) {
	var oldLotNo = _n0.ah;
	var lotNo = _n0.I;
	var vendor = _n0.N;
	var description = _n0.F;
	var reserve = _n0.L;
	return _List_fromArray(
		[oldLotNo, lotNo, vendor, description, reserve]);
};
var elm$core$String$append = _String_append;
var author$project$Records$recordsToCsv = function (records) {
	var recordToCsv = function (_n0) {
		var oldLotNo = _n0.ah;
		var lotNo = _n0.I;
		var vendor = _n0.N;
		var description = _n0.F;
		var reserve = _n0.L;
		return A2(
			elm$core$String$join,
			',',
			_List_fromArray(
				[vendor, lotNo, description, reserve]));
	};
	return A2(
		elm$core$String$append,
		'Vendor,Lot No.,Item Description,Reserve,Pre-Sale Bids,Sale Price,Purchaser,Sale ID\r\n',
		A2(
			elm$core$String$join,
			'\r\n',
			elm$core$Array$toList(
				A2(elm$core$Array$map, recordToCsv, records))));
};
var elm$core$Elm$JsArray$push = _JsArray_push;
var elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					elm$core$Elm$JsArray$push,
					elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = elm$core$Array$SubTree(
					A4(elm$core$Array$insertTailInTree, shift - elm$core$Array$shiftStep, index, tail, elm$core$Elm$JsArray$empty));
				return A2(elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!value.$) {
				var subTree = value.a;
				var newSub = elm$core$Array$SubTree(
					A4(elm$core$Array$insertTailInTree, shift - elm$core$Array$shiftStep, index, tail, subTree));
				return A3(elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = elm$core$Array$SubTree(
					A4(
						elm$core$Array$insertTailInTree,
						shift - elm$core$Array$shiftStep,
						index,
						tail,
						elm$core$Elm$JsArray$singleton(value)));
				return A3(elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var originalTailLen = elm$core$Elm$JsArray$length(tail);
		var newTailLen = elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + elm$core$Array$shiftStep;
				var newTree = A4(
					elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					elm$core$Elm$JsArray$singleton(
						elm$core$Array$SubTree(tree)));
				return A4(elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4(elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4(elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var elm$core$Array$appendHelpTree = F2(
	function (toAppend, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		var itemsToAppend = elm$core$Elm$JsArray$length(toAppend);
		var notAppended = (elm$core$Array$branchFactor - elm$core$Elm$JsArray$length(tail)) - itemsToAppend;
		var appended = A3(elm$core$Elm$JsArray$appendN, elm$core$Array$branchFactor, tail, toAppend);
		var newArray = A2(elm$core$Array$unsafeReplaceTail, appended, array);
		if (notAppended < 0) {
			var nextTail = A3(elm$core$Elm$JsArray$slice, notAppended, itemsToAppend, toAppend);
			return A2(elm$core$Array$unsafeReplaceTail, nextTail, newArray);
		} else {
			return newArray;
		}
	});
var elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var elm$core$Array$builderFromArray = function (_n0) {
	var len = _n0.a;
	var tree = _n0.c;
	var tail = _n0.d;
	var helper = F2(
		function (node, acc) {
			if (!node.$) {
				var subTree = node.a;
				return A3(elm$core$Elm$JsArray$foldl, helper, acc, subTree);
			} else {
				return A2(elm$core$List$cons, node, acc);
			}
		});
	return {
		i: A3(elm$core$Elm$JsArray$foldl, helper, _List_Nil, tree),
		e: (len / elm$core$Array$branchFactor) | 0,
		h: tail
	};
};
var elm$core$Array$append = F2(
	function (a, _n0) {
		var aTail = a.d;
		var bLen = _n0.a;
		var bTree = _n0.c;
		var bTail = _n0.d;
		if (_Utils_cmp(bLen, elm$core$Array$branchFactor * 4) < 1) {
			var foldHelper = F2(
				function (node, array) {
					if (!node.$) {
						var tree = node.a;
						return A3(elm$core$Elm$JsArray$foldl, foldHelper, array, tree);
					} else {
						var leaf = node.a;
						return A2(elm$core$Array$appendHelpTree, leaf, array);
					}
				});
			return A2(
				elm$core$Array$appendHelpTree,
				bTail,
				A3(elm$core$Elm$JsArray$foldl, foldHelper, a, bTree));
		} else {
			var foldHelper = F2(
				function (node, builder) {
					if (!node.$) {
						var tree = node.a;
						return A3(elm$core$Elm$JsArray$foldl, foldHelper, builder, tree);
					} else {
						var leaf = node.a;
						return A2(elm$core$Array$appendHelpBuilder, leaf, builder);
					}
				});
			return A2(
				elm$core$Array$builderToArray,
				true,
				A2(
					elm$core$Array$appendHelpBuilder,
					bTail,
					A3(
						elm$core$Elm$JsArray$foldl,
						foldHelper,
						elm$core$Array$builderFromArray(a),
						bTree)));
		}
	});
var elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			elm$core$Array$unsafeReplaceTail,
			A2(elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var elm$core$Basics$neq = _Utils_notEqual;
var elm$core$Basics$round = _Basics_round;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$time$Time$Posix = elm$core$Basics$identity;
var elm$time$Time$millisToPosix = elm$core$Basics$identity;
var elm$file$File$name = _File_name;
var elm$file$File$toString = _File_toString;
var elm$file$File$Download$string = F3(
	function (name, mime, content) {
		return A2(
			elm$core$Task$perform,
			elm$core$Basics$never,
			A3(_File_download, name, mime, content));
	});
var elm$file$File$Select$file = F2(
	function (mimes, toMsg) {
		return A2(
			elm$core$Task$perform,
			toMsg,
			_File_uploadOne(mimes));
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {ap: col, aN: problem, aV: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.aV, p.ap, p.aN);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0;
		var _n1 = parse(
			{ap: 1, c: _List_Nil, d: 1, b: 0, aV: 1, a: src});
		if (!_n1.$) {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (!_n0.$) {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var elm$core$String$endsWith = _String_endsWith;
var periodic$elm_csv$Csv$crs = '\u000d';
var periodic$elm_csv$Csv$addTrailingLineSep = function (str) {
	return (!(A2(elm$core$String$endsWith, '\n', str) || A2(elm$core$String$endsWith, periodic$elm_csv$Csv$crs, str))) ? (str + (periodic$elm_csv$Csv$crs + '\n')) : str;
};
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = elm$core$Basics$identity;
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0;
		var parseB = _n1;
		return function (s0) {
			var _n2 = parseA(s0);
			if (_n2.$ === 1) {
				var p = _n2.a;
				var x = _n2.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n2.a;
				var a = _n2.b;
				var s1 = _n2.c;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
					var p2 = _n3.a;
					var x = _n3.b;
					return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _n3.a;
					var b = _n3.b;
					var s2 = _n3.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return elm$parser$Parser$Advanced$Done(a);
	}
};
var elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _n0 = callback(state);
			var parse = _n0;
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p1 = _n1.a;
				var step = _n1.b;
				var s1 = _n1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3(elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4(elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					elm$parser$Parser$map,
					elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var periodic$elm_csv$Csv$Csv = F2(
	function (headers, records) {
		return {bl: headers, f: records};
	});
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$Advanced$backtrackable = function (_n0) {
	var parse = _n0;
	return function (s0) {
		var _n1 = parse(s0);
		if (_n1.$ === 1) {
			var x = _n1.b;
			return A2(elm$parser$Parser$Advanced$Bad, false, x);
		} else {
			var a = _n1.b;
			var s1 = _n1.c;
			return A3(elm$parser$Parser$Advanced$Good, false, a, s1);
		}
	};
};
var elm$parser$Parser$backtrackable = elm$parser$Parser$Advanced$backtrackable;
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Advanced$Empty = {$: 0};
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (!_n1.$) {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {ap: col, bb: contextStack, aN: problem, aV: row};
	});
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.aV, s.ap, x, s.c));
	});
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.b, s.aV, s.ap, s.a);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{ap: newCol, c: s.c, d: s.d, b: newOffset, aV: newRow, a: s.a});
	};
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var periodic$elm_csv$Csv$doubleQuote = elm$parser$Parser$symbol('\"');
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			elm$core$String$join,
			after,
			A2(elm$core$String$split, before, string));
	});
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3(elm$core$String$slice, s0.b, s1.b, s0.a),
						a),
					s1);
			}
		};
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var periodic$elm_csv$Csv$comma = elm$parser$Parser$symbol(',');
var periodic$elm_csv$Csv$cr = elm$parser$Parser$symbol(periodic$elm_csv$Csv$crs);
var periodic$elm_csv$Csv$doubleDoubleQuote = A2(elm$parser$Parser$ignorer, periodic$elm_csv$Csv$doubleQuote, periodic$elm_csv$Csv$doubleQuote);
var periodic$elm_csv$Csv$lf = elm$parser$Parser$symbol('\n');
var elm$parser$Parser$UnexpectedChar = {$: 11};
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.b, s.a);
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{ap: 1, c: s.c, d: s.d, b: s.b + 1, aV: s.aV + 1, a: s.a}) : A3(
				elm$parser$Parser$Advanced$Good,
				true,
				0,
				{ap: s.ap + 1, c: s.c, d: s.d, b: newOffset, aV: s.aV, a: s.a}));
		};
	});
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var periodic$elm_csv$Csv$crc = '\u000d';
var periodic$elm_csv$Csv$textChar = F2(
	function (sepChar, c) {
		return !A2(
			elm$core$List$member,
			c,
			_List_fromArray(
				['\"', sepChar, '\n', periodic$elm_csv$Csv$crc]));
	});
var periodic$elm_csv$Csv$textData = function (sepChar) {
	return elm$parser$Parser$chompIf(
		periodic$elm_csv$Csv$textChar(sepChar));
};
var periodic$elm_csv$Csv$innerChar = function (sepChar) {
	return A2(
		elm$parser$Parser$map,
		A2(elm$core$String$replace, '\"\"', '\"'),
		elm$parser$Parser$backtrackable(
			elm$parser$Parser$getChompedString(
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							periodic$elm_csv$Csv$textData(sepChar),
							periodic$elm_csv$Csv$comma,
							periodic$elm_csv$Csv$cr,
							periodic$elm_csv$Csv$lf,
							periodic$elm_csv$Csv$doubleDoubleQuote
						])))));
};
var periodic$elm_csv$Csv$innerString = F2(
	function (sepChar, strs) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						function (str) {
							return elm$parser$Parser$Loop(
								A2(elm$core$List$cons, str, strs));
						}),
					periodic$elm_csv$Csv$innerChar(sepChar)),
					A2(
					elm$parser$Parser$map,
					function (_n0) {
						return elm$parser$Parser$Done(
							elm$core$String$concat(
								elm$core$List$reverse(strs)));
					},
					elm$parser$Parser$succeed(0))
				]));
	});
var periodic$elm_csv$Csv$escaped = function (sepChar) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(elm$core$Basics$identity),
			periodic$elm_csv$Csv$doubleQuote),
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$loop,
				_List_Nil,
				periodic$elm_csv$Csv$innerString(sepChar)),
			periodic$elm_csv$Csv$doubleQuote));
};
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{ap: col, c: s0.c, d: s0.d, b: offset, aV: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.aV, s.ap, s);
	};
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var periodic$elm_csv$Csv$nonEscaped = function (sepChar) {
	return elm$parser$Parser$getChompedString(
		elm$parser$Parser$chompWhile(
			periodic$elm_csv$Csv$textChar(sepChar)));
};
var periodic$elm_csv$Csv$field = function (sepChar) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				periodic$elm_csv$Csv$escaped(sepChar),
				periodic$elm_csv$Csv$nonEscaped(sepChar)
			]));
};
var periodic$elm_csv$Csv$lineSep = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			elm$parser$Parser$backtrackable(
			A2(elm$parser$Parser$ignorer, periodic$elm_csv$Csv$cr, periodic$elm_csv$Csv$lf)),
			periodic$elm_csv$Csv$cr,
			periodic$elm_csv$Csv$lf
		]));
var periodic$elm_csv$Csv$recordHelper = F2(
	function (sepChar, strs) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					elm$parser$Parser$backtrackable(
					A2(
						elm$parser$Parser$keeper,
						elm$parser$Parser$succeed(
							function (str) {
								return elm$parser$Parser$Loop(
									A2(elm$core$List$cons, str, strs));
							}),
						A2(
							elm$parser$Parser$ignorer,
							periodic$elm_csv$Csv$field(sepChar),
							elm$parser$Parser$symbol(
								elm$core$String$fromChar(sepChar))))),
					A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						function (str) {
							return elm$parser$Parser$Done(
								elm$core$List$reverse(
									A2(elm$core$List$cons, str, strs)));
						}),
					A2(
						elm$parser$Parser$ignorer,
						periodic$elm_csv$Csv$field(sepChar),
						periodic$elm_csv$Csv$lineSep))
				]));
	});
var periodic$elm_csv$Csv$record = function (sepChar) {
	return A2(
		elm$parser$Parser$loop,
		_List_Nil,
		periodic$elm_csv$Csv$recordHelper(sepChar));
};
var periodic$elm_csv$Csv$recordsHelper = F2(
	function (sepChar, records) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(
						function (rec) {
							return elm$parser$Parser$Loop(
								A2(elm$core$List$cons, rec, records));
						}),
					periodic$elm_csv$Csv$record(sepChar)),
					A2(
					elm$parser$Parser$map,
					function (_n0) {
						return elm$parser$Parser$Done(
							elm$core$List$reverse(records));
					},
					elm$parser$Parser$succeed(0))
				]));
	});
var periodic$elm_csv$Csv$file = function (sepChar) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(periodic$elm_csv$Csv$Csv),
			periodic$elm_csv$Csv$record(sepChar)),
		A2(
			elm$parser$Parser$loop,
			_List_Nil,
			periodic$elm_csv$Csv$recordsHelper(sepChar)));
};
var periodic$elm_csv$Csv$parseWith = function (c) {
	return A2(
		elm$core$Basics$composeR,
		periodic$elm_csv$Csv$addTrailingLineSep,
		elm$parser$Parser$run(
			periodic$elm_csv$Csv$file(c)));
};
var periodic$elm_csv$Csv$parse = function (s) {
	return A2(periodic$elm_csv$Csv$parseWith, ',', s);
};
var author$project$Otter$update = F2(
	function (msg, model) {
		update:
		while (true) {
			switch (msg.$) {
				case 0:
					return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
				case 1:
					var message = msg.a;
					return _Utils_Tuple2(
						A2(elm$core$Basics$always, model, message),
						elm$core$Platform$Cmd$none);
				case 4:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{v: !model.v}),
						elm$core$Platform$Cmd$none);
				case 6:
					var newText = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{H: newText}),
						elm$core$Platform$Cmd$none);
				case 21:
					return _Utils_Tuple2(
						model,
						author$project$Ports$example(model.H));
				case 22:
					return _Utils_Tuple2(
						model,
						A2(
							elm$core$Task$attempt,
							author$project$Otter$handleError(
								elm$core$Basics$always(author$project$Otter$NoOp)),
							A3(elm$browser$Browser$Dom$setViewportOf, 'table-viewport', 0, 0)));
				case 7:
					var suggestion = msg.a;
					return _Utils_Tuple2(
						model,
						A2(
							elm$file$File$Select$file,
							_List_fromArray(
								[author$project$Otter$csv_mime]),
							author$project$Otter$CsvSelected(suggestion)));
				case 8:
					var suggestion = msg.a;
					var file = msg.b;
					return _Utils_Tuple2(
						model,
						A2(
							elm$core$Task$perform,
							A2(
								author$project$Otter$CsvLoaded,
								suggestion,
								elm$file$File$name(file)),
							elm$file$File$toString(file)));
				case 10:
					return _Utils_Tuple2(
						model,
						A3(
							elm$file$File$Download$string,
							((model.H === '') ? 'export' : model.H) + '.csv',
							author$project$Otter$csv_mime,
							author$project$Records$recordsToCsv(model.f)));
				case 9:
					var suggestion = msg.a;
					var fileName = msg.b;
					var fileContent = msg.c;
					var _n1 = periodic$elm_csv$Csv$parse(fileContent);
					if (_n1.$ === 1) {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					} else {
						var csv = _n1.a;
						if (suggestion) {
							var newOldRecords = elm$core$Array$fromList(
								A2(
									elm$core$List$map,
									author$project$Records$importListToOldRecord,
									author$project$Otter$filterEmptyAndSold(csv.f)));
							return A3(
								author$project$Prelude$flip,
								elm$core$Basics$always,
								elm$core$Array$length(newOldRecords),
								_Utils_Tuple2(
									_Utils_update(
										model,
										{
											B: newOldRecords,
											w: A2(author$project$Otter$genSuggestion, newOldRecords, model.f)
										}),
									elm$core$Platform$Cmd$none));
						} else {
							var newNewRecords = A2(
								elm$core$Array$append,
								model.f,
								elm$core$Array$fromList(
									A2(elm$core$List$map, author$project$Records$importListToRecord, csv.f)));
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										f: newNewRecords,
										T: true,
										w: A2(author$project$Otter$genSuggestion, model.B, newNewRecords)
									}),
								author$project$Otter$updateVisibleRows);
						}
					}
				case 2:
					var event = msg.a;
					var recordNum = elm$core$Array$length(model.f);
					var cursorPosition = model.n;
					return A3(
						author$project$Prelude$flip,
						author$project$Otter$update,
						model,
						function () {
							var _n2 = event.aC;
							switch (_n2.$) {
								case 26:
									return A2(
										author$project$Otter$CursorMoved,
										false,
										_Utils_update(
											cursorPosition,
											{
												m: A2(
													elm$core$Basics$max,
													0,
													author$project$Prelude$pred(cursorPosition.m))
											}));
								case 27:
									return A2(
										author$project$Otter$CursorMoved,
										false,
										_Utils_update(
											cursorPosition,
											{
												m: A2(
													elm$core$Basics$min,
													4,
													author$project$Prelude$succ(cursorPosition.m))
											}));
								case 33:
									return A2(
										author$project$Otter$CursorMoved,
										false,
										_Utils_update(
											cursorPosition,
											{
												m: A2(
													elm$core$Basics$min,
													4,
													author$project$Prelude$succ(cursorPosition.m))
											}));
								case 28:
									return A2(
										author$project$Otter$CursorMoved,
										false,
										_Utils_update(
											cursorPosition,
											{
												k: A3(author$project$Otter$maybeClamp, recordNum, author$project$Prelude$pred, cursorPosition.k)
											}));
								case 29:
									return A2(
										author$project$Otter$CursorMoved,
										false,
										_Utils_update(
											cursorPosition,
											{
												k: A3(author$project$Otter$maybeClamp, recordNum, author$project$Prelude$succ, cursorPosition.k)
											}));
								case 37:
									return A2(
										author$project$Otter$CursorMoved,
										false,
										_Utils_update(
											cursorPosition,
											{
												k: A3(author$project$Otter$maybeClamp, recordNum, author$project$Prelude$succ, cursorPosition.k)
											}));
								default:
									return author$project$Otter$NoOp;
							}
						}());
				case 3:
					var event = msg.a;
					if (_Utils_eq(event.aC, SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter)) {
						var newNewRecords = A2(
							elm$core$Array$push,
							author$project$Otter$getNewRecord(model),
							model.f);
						var $temp$msg = author$project$Otter$VirUpdate,
							$temp$model = _Utils_update(
							model,
							{
								n: {m: 0, k: elm$core$Maybe$Nothing},
								t: author$project$Records$emptyRecord,
								f: newNewRecords,
								w: A2(author$project$Otter$genSuggestion, model.B, newNewRecords)
							});
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
					}
				case 5:
					var newNewRecords = elm$core$Array$fromList(_List_Nil);
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								n: A2(author$project$Otter$CursorPosition, 0, elm$core$Maybe$Nothing),
								t: author$project$Records$emptyRecord,
								f: newNewRecords,
								w: A2(author$project$Otter$genSuggestion, model.B, newNewRecords),
								y: 0,
								_: 0,
								D: 0
							}),
						author$project$Otter$focusCursor);
				case 11:
					var event = msg.a;
					var $temp$msg = A2(
						author$project$Otter$VirScroll,
						false,
						A2(
							author$project$Prelude$flip,
							(event.bg >= 0) ? elm$core$Basics$add : elm$core$Basics$sub,
							author$project$Otter$row_height)),
						$temp$model = model;
					msg = $temp$msg;
					model = $temp$model;
					continue update;
				case 12:
					return _Utils_Tuple2(model, author$project$Otter$checkScrollbar);
				case 13:
					var viewport = msg.a;
					var $temp$msg = A2(
						author$project$Otter$VirScroll,
						true,
						elm$core$Basics$always(
							elm$core$Basics$round(viewport.a0.k))),
						$temp$model = model;
					msg = $temp$msg;
					model = $temp$model;
					continue update;
				case 14:
					var fromScrollBar = msg.a;
					var modify = msg.b;
					var newViewportY = A3(
						elm$core$Basics$clamp,
						0,
						author$project$Otter$tableHeight(model) - model.Z,
						modify(model.y));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{T: true, y: newViewportY}),
						elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									model.T ? elm$core$Platform$Cmd$none : author$project$Otter$updateVisibleRows,
									fromScrollBar ? elm$core$Platform$Cmd$none : author$project$Otter$updateScrollBar(newViewportY)
								])));
				case 15:
					var numRecords = elm$core$Array$length(model.f);
					var _n3 = model.R ? A3(author$project$Otter$getVisibleRows, numRecords, model.Z, model.y) : _Utils_Tuple2(0, numRecords - 1);
					var bottom = _n3.a;
					var top = _n3.b;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{T: false, _: top, D: bottom}),
						author$project$Otter$focusCursor);
				case 16:
					return _Utils_Tuple2(model, author$project$Otter$checkTableViewport);
				case 17:
					var viewport = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								Z: elm$core$Basics$round(viewport.a0.bm)
							}),
						author$project$Otter$updateVisibleRows);
				case 18:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{R: !model.R}),
						elm$core$Platform$Cmd$none);
				case 19:
					var newText = msg.a;
					return _Utils_Tuple2(
						function () {
							var columnUpdate = A2(
								elm$core$Basics$composeL,
								A2(
									elm$core$Basics$composeL,
									author$project$Records$listToRecord,
									A2(
										author$project$Prelude$updateAt,
										model.n.m,
										elm$core$Basics$always(newText))),
								author$project$Records$recordToList);
							var rowUpdate = function (cursorY) {
								var newNewRecords = A3(author$project$Prelude$updateAtt, cursorY, columnUpdate, model.f);
								return _Utils_update(
									model,
									{
										f: newNewRecords,
										w: A2(author$project$Otter$genSuggestion, model.B, newNewRecords)
									});
							};
							return A3(
								author$project$Prelude$maybe,
								_Utils_update(
									model,
									{
										t: columnUpdate(model.t)
									}),
								rowUpdate,
								model.n.k);
						}(),
						elm$core$Platform$Cmd$none);
				default:
					var fromMouse = msg.a;
					var cursorPosition = msg.b;
					var realCursorY = A2(
						elm$core$Maybe$withDefault,
						elm$core$Array$length(model.f),
						cursorPosition.k);
					var topClamp = realCursorY * author$project$Otter$row_height;
					var newModel = _Utils_update(
						model,
						{n: cursorPosition});
					var bottomClamp = (topClamp + (3 * author$project$Otter$row_height)) - model.Z;
					var clampedViewportY = A3(elm$core$Basics$clamp, bottomClamp, topClamp, model.y);
					if ((!fromMouse) && (!_Utils_eq(clampedViewportY, model.y))) {
						var $temp$msg = A2(
							author$project$Otter$VirScroll,
							false,
							elm$core$Basics$always(clampedViewportY)),
							$temp$model = newModel;
						msg = $temp$msg;
						model = $temp$model;
						continue update;
					} else {
						return _Utils_Tuple2(newModel, author$project$Otter$focusCursor);
					}
			}
		}
	});
var author$project$Otter$CsvExported = {$: 10};
var author$project$Otter$CsvRequested = function (a) {
	return {$: 7, a: a};
};
var author$project$Otter$DontScrollViewport = {$: 22};
var author$project$Otter$FilenameEdited = function (a) {
	return {$: 6, a: a};
};
var author$project$Otter$PortExample = {$: 21};
var author$project$Otter$TableViewport = function (a) {
	return {$: 2, a: a};
};
var author$project$Otter$ToggleSidePanel = {$: 4};
var author$project$Otter$VirScrollbarScroll = {$: 12};
var author$project$Otter$VirToggle = {$: 18};
var author$project$Otter$VirWheelScroll = function (a) {
	return {$: 11, a: a};
};
var author$project$Otter$debug = false;
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var author$project$Otter$html_empty = elm$html$Html$text('');
var Gizra$elm_keyboard_event$Keyboard$Event$KeyboardEvent = F7(
	function (altKey, ctrlKey, key, keyCode, metaKey, repeat, shiftKey) {
		return {a3: altKey, bd: ctrlKey, bt: key, aC: keyCode, bv: metaKey, bH: repeat, bL: shiftKey};
	});
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var elm$json$Json$Decode$string = _Json_decodeString;
var Gizra$elm_keyboard_event$Keyboard$Event$decodeKey = elm$json$Json$Decode$maybe(
	A2(
		elm$json$Json$Decode$andThen,
		function (key) {
			return elm$core$String$isEmpty(key) ? elm$json$Json$Decode$fail('empty key') : elm$json$Json$Decode$succeed(key);
		},
		A2(elm$json$Json$Decode$field, 'key', elm$json$Json$Decode$string)));
var Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero = A2(
	elm$json$Json$Decode$andThen,
	function (code) {
		return (!code) ? elm$json$Json$Decode$fail('code was zero') : elm$json$Json$Decode$succeed(code);
	},
	elm$json$Json$Decode$int);
var Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyCode = elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(elm$json$Json$Decode$field, 'keyCode', Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			A2(elm$json$Json$Decode$field, 'which', Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			A2(elm$json$Json$Decode$field, 'charCode', Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			elm$json$Json$Decode$succeed(0)
		]));
var SwiftsNamesake$proper_keyboard$Keyboard$Key$A = {$: 0};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Add = {$: 85};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Alt = {$: 32};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Ambiguous = function (a) {
	return {$: 89, a: a};
};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$B = {$: 1};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Backspace = {$: 38};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$C = {$: 2};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$CapsLock = {$: 34};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$ChromeSearch = {$: 59};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Command = {$: 58};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Ctrl = function (a) {
	return {$: 31, a: a};
};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$D = {$: 3};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Decimal = {$: 87};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Delete = {$: 39};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Divide = {$: 88};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Down = {$: 29};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$E = {$: 4};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Eight = {$: 52};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$End = {$: 42};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Escape = {$: 36};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F = {$: 5};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F1 = {$: 62};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F10 = {$: 71};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F11 = {$: 72};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F12 = {$: 73};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F2 = {$: 63};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F3 = {$: 64};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F4 = {$: 65};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F5 = {$: 66};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F6 = {$: 67};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F7 = {$: 68};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F8 = {$: 69};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$F9 = {$: 70};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Five = {$: 49};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Four = {$: 48};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$G = {$: 6};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$H = {$: 7};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Home = {$: 43};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$I = {$: 8};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Insert = {$: 54};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$J = {$: 9};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$K = {$: 10};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$L = {$: 11};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Left = {$: 26};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$M = {$: 12};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Multiply = {$: 84};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$N = {$: 13};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Nine = {$: 53};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumLock = {$: 60};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadEight = {$: 82};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFive = {$: 79};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFour = {$: 78};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadNine = {$: 83};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadOne = {$: 75};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSeven = {$: 81};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSix = {$: 80};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadThree = {$: 77};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadTwo = {$: 76};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadZero = {$: 74};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$O = {$: 14};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$One = {$: 45};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$P = {$: 15};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$PageDown = {$: 41};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$PageUp = {$: 40};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$PauseBreak = {$: 56};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$PrintScreen = {$: 55};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Q = {$: 16};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$R = {$: 17};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Right = {$: 27};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$S = {$: 18};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$ScrollLock = {$: 61};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Seven = {$: 51};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Shift = function (a) {
	return {$: 30, a: a};
};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Six = {$: 50};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Spacebar = {$: 35};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Subtract = {$: 86};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$T = {$: 19};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Tab = {$: 33};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Three = {$: 47};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Two = {$: 46};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$U = {$: 20};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Unknown = function (a) {
	return {$: 90, a: a};
};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Up = {$: 28};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$V = {$: 21};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$W = {$: 22};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Windows = {$: 57};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$X = {$: 23};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Y = {$: 24};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Z = {$: 25};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$Zero = {$: 44};
var SwiftsNamesake$proper_keyboard$Keyboard$Key$fromCode = function (keyCode) {
	switch (keyCode) {
		case 8:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Backspace;
		case 9:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Tab;
		case 13:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter;
		case 16:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Shift(elm$core$Maybe$Nothing);
		case 17:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Ctrl(elm$core$Maybe$Nothing);
		case 18:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Alt;
		case 19:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$PauseBreak;
		case 20:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$CapsLock;
		case 27:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Escape;
		case 32:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Spacebar;
		case 33:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$PageUp;
		case 34:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$PageDown;
		case 35:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$End;
		case 36:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Home;
		case 37:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Left;
		case 38:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Up;
		case 39:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Right;
		case 40:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Down;
		case 44:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$PrintScreen;
		case 45:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Insert;
		case 46:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Delete;
		case 48:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Zero;
		case 49:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$One;
		case 50:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Two;
		case 51:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Three;
		case 52:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Four;
		case 53:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Five;
		case 54:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Six;
		case 55:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Seven;
		case 56:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Eight;
		case 57:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Nine;
		case 65:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$A;
		case 66:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$B;
		case 67:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$C;
		case 68:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$D;
		case 69:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$E;
		case 70:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F;
		case 71:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$G;
		case 72:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$H;
		case 73:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$I;
		case 74:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$J;
		case 75:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$K;
		case 76:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$L;
		case 77:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$M;
		case 78:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$N;
		case 79:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$O;
		case 80:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$P;
		case 81:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Q;
		case 82:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$R;
		case 83:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$S;
		case 84:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$T;
		case 85:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$U;
		case 86:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$V;
		case 87:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$W;
		case 88:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$X;
		case 89:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Y;
		case 90:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Z;
		case 91:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Ambiguous(
				_List_fromArray(
					[SwiftsNamesake$proper_keyboard$Keyboard$Key$Windows, SwiftsNamesake$proper_keyboard$Keyboard$Key$Command, SwiftsNamesake$proper_keyboard$Keyboard$Key$ChromeSearch]));
		case 96:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadZero;
		case 97:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadOne;
		case 98:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadTwo;
		case 99:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadThree;
		case 100:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFour;
		case 101:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFive;
		case 102:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSix;
		case 103:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSeven;
		case 104:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadEight;
		case 105:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadNine;
		case 106:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Multiply;
		case 107:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Add;
		case 109:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Subtract;
		case 110:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Decimal;
		case 111:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Divide;
		case 112:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F1;
		case 113:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F2;
		case 114:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F3;
		case 115:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F4;
		case 116:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F5;
		case 117:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F6;
		case 118:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F7;
		case 119:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F8;
		case 120:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F9;
		case 121:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F10;
		case 122:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F11;
		case 123:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$F12;
		case 144:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$NumLock;
		case 145:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$ScrollLock;
		default:
			return SwiftsNamesake$proper_keyboard$Keyboard$Key$Unknown(keyCode);
	}
};
var elm$json$Json$Decode$bool = _Json_decodeBool;
var elm$json$Json$Decode$map7 = _Json_map7;
var Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyboardEvent = A8(
	elm$json$Json$Decode$map7,
	Gizra$elm_keyboard_event$Keyboard$Event$KeyboardEvent,
	A2(elm$json$Json$Decode$field, 'altKey', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'ctrlKey', elm$json$Json$Decode$bool),
	Gizra$elm_keyboard_event$Keyboard$Event$decodeKey,
	A2(elm$json$Json$Decode$map, SwiftsNamesake$proper_keyboard$Keyboard$Key$fromCode, Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyCode),
	A2(elm$json$Json$Decode$field, 'metaKey', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'repeat', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'shiftKey', elm$json$Json$Decode$bool));
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var author$project$Otter$onKeydown = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'keydown',
		A2(elm$json$Json$Decode$map, msg, Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyboardEvent));
};
var author$project$Otter$onScroll = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'scroll',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Otter$NewRow = function (a) {
	return {$: 3, a: a};
};
var author$project$Otter$CursorEdited = function (a) {
	return {$: 19, a: a};
};
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$input = _VirtualDom_node('input');
var elm$html$Html$td = _VirtualDom_node('td');
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var elm$html$Html$Attributes$type_ = elm$html$Html$Attributes$stringProperty('type');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var author$project$Otter$elemToCell = F2(
	function (mCursorPosition, content) {
		if (mCursorPosition.$ === 1) {
			return A2(
				elm$html$Html$td,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('cursor')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('ui fluid input focus')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$input,
								_List_fromArray(
									[
										elm$html$Html$Attributes$id('cursor-input'),
										elm$html$Html$Attributes$type_('text'),
										elm$html$Html$Attributes$value(content),
										elm$html$Html$Events$onInput(author$project$Otter$CursorEdited)
									]),
								_List_Nil)
							]))
					]));
		} else {
			var cursorPosition = mCursorPosition.a;
			return A2(
				elm$html$Html$td,
				_List_fromArray(
					[
						elm$html$Html$Events$onClick(
						A2(author$project$Otter$CursorMoved, true, cursorPosition))
					]),
				_List_fromArray(
					[
						elm$html$Html$text(content)
					]));
		}
	});
var elm$html$Html$Attributes$placeholder = elm$html$Html$Attributes$stringProperty('placeholder');
var author$project$Otter$elemToCelll = F3(
	function (suggested, mCursorPosition, content) {
		if (mCursorPosition.$ === 1) {
			return A2(
				elm$html$Html$td,
				_List_fromArray(
					[
						elm$html$Html$Attributes$id('cursor')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class('ui fluid input focus')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$input,
								_List_fromArray(
									[
										elm$html$Html$Attributes$id('cursor-input'),
										elm$html$Html$Attributes$type_('text'),
										elm$html$Html$Attributes$value(content),
										elm$html$Html$Events$onInput(author$project$Otter$CursorEdited),
										elm$html$Html$Attributes$placeholder(
										A2(elm$core$Maybe$withDefault, '', suggested))
									]),
								_List_Nil)
							]))
					]));
		} else {
			var cursorPosition = mCursorPosition.a;
			return A2(
				elm$html$Html$td,
				_List_fromArray(
					[
						elm$html$Html$Events$onClick(
						A2(author$project$Otter$CursorMoved, true, cursorPosition))
					]),
				_List_fromArray(
					[
						elm$html$Html$text(
						(content === '') ? A2(elm$core$Maybe$withDefault, '', suggested) : content)
					]));
		}
	});
var author$project$Prelude$isJust = function (m) {
	if (!m.$) {
		return true;
	} else {
		return false;
	}
};
var author$project$Prelude$listZipAp = F2(
	function (f, a) {
		var _n0 = _Utils_Tuple2(f, a);
		if (!_n0.a.b) {
			return _List_Nil;
		} else {
			if (!_n0.b.b) {
				return _List_Nil;
			} else {
				var _n1 = _n0.a;
				var x = _n1.a;
				var xs = _n1.b;
				var _n2 = _n0.b;
				var y = _n2.a;
				var ys = _n2.b;
				return A2(
					elm$core$List$cons,
					x(y),
					A2(author$project$Prelude$listZipAp, xs, ys));
			}
		}
	});
var elm$html$Html$tr = _VirtualDom_node('tr');
var author$project$Otter$recordToRoww = F4(
	function (suggested, mCursorX, cursorY, record) {
		var updateFunc = function (cursorX) {
			return A2(
				author$project$Prelude$updateAt,
				cursorX,
				elm$core$Basics$always(elm$core$Maybe$Nothing));
		};
		var cursorPositions = A2(
			elm$core$List$map,
			A2(author$project$Prelude$flip, author$project$Otter$CursorPosition, cursorY),
			A2(elm$core$List$range, 0, 4));
		var mCursorPositions = A4(
			author$project$Prelude$maybe,
			elm$core$Basics$identity,
			updateFunc,
			mCursorX,
			A2(elm$core$List$map, elm$core$Maybe$Just, cursorPositions));
		var cells = A2(
			author$project$Prelude$listZipAp,
			A2(
				author$project$Prelude$listZipAp,
				A2(
					elm$core$List$cons,
					author$project$Otter$elemToCelll(suggested),
					A2(elm$core$List$repeat, 4, author$project$Otter$elemToCell)),
				mCursorPositions),
			author$project$Records$recordToList(record));
		return A2(
			elm$html$Html$tr,
			author$project$Prelude$isJust(cursorY) ? _List_Nil : _List_fromArray(
				[
					elm$html$Html$Attributes$class('positive'),
					author$project$Otter$onKeydown(author$project$Otter$NewRow)
				]),
			cells);
	});
var elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var elm$core$Array$indexedMap = F2(
	function (func, _n0) {
		var len = _n0.a;
		var tree = _n0.c;
		var tail = _n0.d;
		var initialBuilder = {
			i: _List_Nil,
			e: 0,
			h: A3(
				elm$core$Elm$JsArray$indexedMap,
				func,
				elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.e * elm$core$Array$branchFactor;
					var mappedLeaf = elm$core$Array$Leaf(
						A3(elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						i: A2(elm$core$List$cons, mappedLeaf, builder.i),
						e: builder.e + 1,
						h: builder.h
					};
				}
			});
		return A2(
			elm$core$Array$builderToArray,
			true,
			A3(elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var author$project$Otter$filterVisible = F3(
	function (start, end, list) {
		var filterRange = F2(
			function (index, elem) {
				return ((_Utils_cmp(index, start) > -1) && (_Utils_cmp(index, end) < 1)) ? elm$core$Maybe$Just(elem) : elm$core$Maybe$Nothing;
			});
		return elm$core$Array$toList(
			A2(
				elm$core$Array$map,
				elm$core$Maybe$withDefault(author$project$Records$errorRecord),
				A2(
					elm$core$Array$filter,
					author$project$Prelude$isJust,
					A2(elm$core$Array$indexedMap, filterRange, list))));
	});
var author$project$Prelude$zipWith = F3(
	function (f, a, b) {
		var _n0 = _Utils_Tuple2(a, b);
		if (!_n0.a.b) {
			return _List_Nil;
		} else {
			if (!_n0.b.b) {
				return _List_Nil;
			} else {
				var _n1 = _n0.a;
				var x = _n1.a;
				var xs = _n1.b;
				var _n2 = _n0.b;
				var y = _n2.a;
				var ys = _n2.b;
				return A2(
					elm$core$List$cons,
					A2(f, x, y),
					A3(author$project$Prelude$zipWith, f, xs, ys));
			}
		}
	});
var author$project$Otter$recordToRow = F3(
	function (mCursorX, cursorY, record) {
		var updateFunc = function (cursorX) {
			return A2(
				author$project$Prelude$updateAt,
				cursorX,
				elm$core$Basics$always(elm$core$Maybe$Nothing));
		};
		var cursorPositions = A2(
			elm$core$List$map,
			A2(author$project$Prelude$flip, author$project$Otter$CursorPosition, cursorY),
			A2(elm$core$List$range, 0, 4));
		var mCursorPositions = A4(
			author$project$Prelude$maybe,
			elm$core$Basics$identity,
			updateFunc,
			mCursorX,
			A2(elm$core$List$map, elm$core$Maybe$Just, cursorPositions));
		var cells = A3(
			author$project$Prelude$zipWith,
			author$project$Otter$elemToCell,
			mCursorPositions,
			author$project$Records$recordToList(record));
		return A2(
			elm$html$Html$tr,
			author$project$Prelude$isJust(cursorY) ? _List_Nil : _List_fromArray(
				[
					elm$html$Html$Attributes$class('positive'),
					author$project$Otter$onKeydown(author$project$Otter$NewRow)
				]),
			cells);
	});
var author$project$Otter$recordsToRows = F3(
	function (visibleStartIndex, cursorPosition, records) {
		var cursorRowNum = A2(elm$core$Maybe$withDefault, -1, cursorPosition.k) - visibleStartIndex;
		var createRow = F2(
			function (rowNum, record) {
				return A3(
					author$project$Otter$recordToRow,
					_Utils_eq(rowNum, cursorRowNum) ? elm$core$Maybe$Just(cursorPosition.m) : elm$core$Maybe$Nothing,
					elm$core$Maybe$Just(rowNum + visibleStartIndex),
					record);
			});
		return A2(elm$core$List$indexedMap, createRow, records);
	});
var author$project$Otter$renderedRows = function (model) {
	return A3(
		author$project$Otter$recordsToRows,
		model.D,
		model.n,
		A3(author$project$Otter$filterVisible, model.D, model._, model.f));
};
var elm$core$Basics$modBy = _Basics_modBy;
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$col = _VirtualDom_node('col');
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$html$Html$i = _VirtualDom_node('i');
var elm$html$Html$table = _VirtualDom_node('table');
var elm$html$Html$tbody = _VirtualDom_node('tbody');
var elm$html$Html$th = _VirtualDom_node('th');
var elm$html$Html$thead = _VirtualDom_node('thead');
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$defaultOptions = {aj: true, al: false};
var elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var elm$json$Json$Decode$float = _Json_decodeFloat;
var elm$json$Json$Decode$map3 = _Json_map3;
var elm$json$Json$Decode$map6 = _Json_map6;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$Event = F6(
	function (keys, button, clientPos, offsetPos, pagePos, screenPos) {
		return {a6: button, a9: clientPos, bu: keys, by: offsetPos, bC: pagePos, bJ: screenPos};
	});
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$BackButton = 4;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$ErrorButton = 0;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$ForwardButton = 5;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$MainButton = 1;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$MiddleButton = 2;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$SecondButton = 3;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonFromId = function (id) {
	switch (id) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		default:
			return 0;
	}
};
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonDecoder = A2(
	elm$json$Json$Decode$map,
	mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonFromId,
	A2(elm$json$Json$Decode$field, 'button', elm$json$Json$Decode$int));
var mpizenberg$elm_pointer_events$Internal$Decode$clientPos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'clientX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'clientY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Internal$Decode$Keys = F3(
	function (alt, ctrl, shift) {
		return {a2: alt, bc: ctrl, bK: shift};
	});
var mpizenberg$elm_pointer_events$Internal$Decode$keys = A4(
	elm$json$Json$Decode$map3,
	mpizenberg$elm_pointer_events$Internal$Decode$Keys,
	A2(elm$json$Json$Decode$field, 'altKey', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'ctrlKey', elm$json$Json$Decode$bool),
	A2(elm$json$Json$Decode$field, 'shiftKey', elm$json$Json$Decode$bool));
var mpizenberg$elm_pointer_events$Internal$Decode$offsetPos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'offsetX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'offsetY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Internal$Decode$pagePos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'pageX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'pageY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Internal$Decode$screenPos = A3(
	elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2(elm$json$Json$Decode$field, 'screenX', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'screenY', elm$json$Json$Decode$float));
var mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$eventDecoder = A7(elm$json$Json$Decode$map6, mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$Event, mpizenberg$elm_pointer_events$Internal$Decode$keys, mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonDecoder, mpizenberg$elm_pointer_events$Internal$Decode$clientPos, mpizenberg$elm_pointer_events$Internal$Decode$offsetPos, mpizenberg$elm_pointer_events$Internal$Decode$pagePos, mpizenberg$elm_pointer_events$Internal$Decode$screenPos);
var mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$Event = F3(
	function (mouseEvent, deltaY, deltaMode) {
		return {bf: deltaMode, bg: deltaY, bw: mouseEvent};
	});
var mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$DeltaLine = 1;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$DeltaPage = 2;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$DeltaPixel = 0;
var mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$deltaModeDecoder = function () {
	var intToMode = function (_int) {
		switch (_int) {
			case 1:
				return 1;
			case 2:
				return 2;
			default:
				return 0;
		}
	};
	return A2(elm$json$Json$Decode$map, intToMode, elm$json$Json$Decode$int);
}();
var mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$eventDecoder = A4(
	elm$json$Json$Decode$map3,
	mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$Event,
	mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$eventDecoder,
	A2(elm$json$Json$Decode$field, 'deltaY', elm$json$Json$Decode$float),
	A2(elm$json$Json$Decode$field, 'deltaMode', mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$deltaModeDecoder));
var mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$onWithOptions = F2(
	function (options, tag) {
		return A2(
			elm$html$Html$Events$custom,
			'wheel',
			A2(
				elm$json$Json$Decode$map,
				function (ev) {
					return {
						s: tag(ev),
						aj: options.aj,
						al: options.al
					};
				},
				mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$eventDecoder));
	});
var mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$onWheel = mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$onWithOptions(mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$defaultOptions);
var author$project$Otter$vieww = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$id('grid'),
				elm$html$Html$Attributes$class('ui two column grid')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('row')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class(
								(model.v ? 'thirteen' : 'fifteen') + ' wide column')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$id('table-viewport'),
										author$project$Otter$onKeydown(author$project$Otter$TableViewport),
										mpizenberg$elm_pointer_events$Html$Events$Extra$Wheel$onWheel(author$project$Otter$VirWheelScroll),
										author$project$Otter$onScroll(author$project$Otter$DontScrollViewport)
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$table,
										_List_fromArray(
											[
												elm$html$Html$Attributes$id('table'),
												elm$html$Html$Attributes$class('ui single line fixed unstackable celled striped compact table'),
												A2(
												elm$html$Html$Attributes$style,
												'top',
												'-' + (elm$core$String$fromInt(model.y) + 'px'))
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$col,
												_List_fromArray(
													[
														A2(elm$html$Html$Attributes$attribute, 'width', '100px')
													]),
												_List_Nil),
												A2(
												elm$html$Html$col,
												_List_fromArray(
													[
														A2(elm$html$Html$Attributes$attribute, 'width', '100px')
													]),
												_List_Nil),
												A2(
												elm$html$Html$col,
												_List_fromArray(
													[
														A2(elm$html$Html$Attributes$attribute, 'width', '100px')
													]),
												_List_Nil),
												A2(
												elm$html$Html$col,
												_List_fromArray(
													[
														A2(elm$html$Html$Attributes$attribute, 'width', '300px')
													]),
												_List_Nil),
												A2(
												elm$html$Html$col,
												_List_fromArray(
													[
														A2(elm$html$Html$Attributes$attribute, 'width', '100px')
													]),
												_List_Nil),
												A2(
												elm$html$Html$thead,
												_List_Nil,
												_List_fromArray(
													[
														A2(
														elm$html$Html$tr,
														_List_Nil,
														_List_fromArray(
															[
																A2(
																elm$html$Html$th,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Old Lot No.')
																	])),
																A2(
																elm$html$Html$th,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Lot No.')
																	])),
																A2(
																elm$html$Html$th,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Vendor')
																	])),
																A2(
																elm$html$Html$th,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Item Description')
																	])),
																A2(
																elm$html$Html$th,
																_List_Nil,
																_List_fromArray(
																	[
																		elm$html$Html$text('Reserve')
																	]))
															]))
													])),
												A2(
												elm$html$Html$tbody,
												_List_Nil,
												_Utils_ap(
													_List_fromArray(
														[
															((A2(elm$core$Basics$modBy, 2, model.D) === 1) && model.R) ? A2(elm$html$Html$tr, _List_Nil, _List_Nil) : author$project$Otter$html_empty,
															A2(
															elm$html$Html$tr,
															_List_Nil,
															_List_fromArray(
																[
																	A2(
																	elm$html$Html$div,
																	_List_fromArray(
																		[
																			A2(
																			elm$html$Html$Attributes$style,
																			'height',
																			elm$core$String$fromInt(model.D * author$project$Otter$row_height) + 'px')
																		]),
																	_List_Nil)
																]))
														]),
													_Utils_ap(
														author$project$Otter$renderedRows(model),
														_List_fromArray(
															[
																A2(
																elm$html$Html$tr,
																_List_Nil,
																_List_fromArray(
																	[
																		A2(
																		elm$html$Html$div,
																		_List_fromArray(
																			[
																				A2(
																				elm$html$Html$Attributes$style,
																				'height',
																				elm$core$String$fromInt(
																					((elm$core$Array$length(model.f) - 1) - model._) * author$project$Otter$row_height) + 'px')
																			]),
																		_List_Nil)
																	])),
																A4(
																author$project$Otter$recordToRoww,
																model.w,
																author$project$Prelude$isJust(model.n.k) ? elm$core$Maybe$Nothing : elm$core$Maybe$Just(model.n.m),
																elm$core$Maybe$Nothing,
																model.t)
															]))))
											]))
									])),
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$id('scrollbar'),
										author$project$Otter$onScroll(author$project$Otter$VirScrollbarScroll)
									]),
								_List_fromArray(
									[
										A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												A2(
												elm$html$Html$Attributes$style,
												'height',
												elm$core$String$fromInt(
													author$project$Otter$tableHeight(model)) + 'px')
											]),
										_List_Nil)
									]))
							])),
						A2(
						elm$html$Html$div,
						_List_fromArray(
							[
								elm$html$Html$Attributes$class(
								(model.v ? 'three' : 'one') + ' wide column')
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$div,
								_List_fromArray(
									[
										elm$html$Html$Attributes$class('ui segments')
									]),
								_List_fromArray(
									[
										model.v ? A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('ui segment')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$h1,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('ui header horizontal-center')
													]),
												_List_fromArray(
													[
														elm$html$Html$text('Otter')
													])),
												A2(
												elm$html$Html$div,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('ui form')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$div,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('field')
															]),
														_List_fromArray(
															[
																A2(
																elm$html$Html$div,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$class('ui right labeled input')
																	]),
																_List_fromArray(
																	[
																		A2(
																		elm$html$Html$input,
																		_List_fromArray(
																			[
																				elm$html$Html$Attributes$placeholder('Filename'),
																				elm$html$Html$Events$onInput(author$project$Otter$FilenameEdited),
																				elm$html$Html$Attributes$type_('text'),
																				elm$html$Html$Attributes$value(model.H)
																			]),
																		_List_Nil),
																		A2(
																		elm$html$Html$div,
																		_List_fromArray(
																			[
																				elm$html$Html$Attributes$class('ui label')
																			]),
																		_List_fromArray(
																			[
																				elm$html$Html$text('.csv')
																			]))
																	]))
															])),
														A2(
														elm$html$Html$div,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('field')
															]),
														_List_fromArray(
															[
																A2(
																elm$html$Html$div,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$class('ui vertical fluid buttons')
																	]),
																_List_fromArray(
																	[
																		A2(
																		elm$html$Html$button,
																		_List_fromArray(
																			[
																				elm$html$Html$Attributes$class('ui button yellow'),
																				elm$html$Html$Events$onClick(
																				author$project$Otter$CsvRequested(true))
																			]),
																		_List_fromArray(
																			[
																				A2(
																				elm$html$Html$i,
																				_List_fromArray(
																					[
																						elm$html$Html$Attributes$class('certificate icon')
																					]),
																				_List_Nil),
																				elm$html$Html$text('Add Suggestions')
																			])),
																		A2(
																		elm$html$Html$button,
																		_List_fromArray(
																			[
																				elm$html$Html$Attributes$class('ui button green'),
																				elm$html$Html$Events$onClick(author$project$Otter$CsvExported)
																			]),
																		_List_fromArray(
																			[
																				A2(
																				elm$html$Html$i,
																				_List_fromArray(
																					[
																						elm$html$Html$Attributes$class('file export icon')
																					]),
																				_List_Nil),
																				elm$html$Html$text('Save')
																			])),
																		A2(
																		elm$html$Html$button,
																		_List_fromArray(
																			[
																				elm$html$Html$Attributes$class('ui button purple'),
																				elm$html$Html$Events$onClick(
																				author$project$Otter$CsvRequested(false))
																			]),
																		_List_fromArray(
																			[
																				A2(
																				elm$html$Html$i,
																				_List_fromArray(
																					[
																						elm$html$Html$Attributes$class('file import icon')
																					]),
																				_List_Nil),
																				elm$html$Html$text('Import')
																			]))
																	]))
															]))
													]))
											])) : author$project$Otter$html_empty,
										(model.v && author$project$Otter$debug) ? A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('ui segment')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$div,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('ui form')
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$div,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class('field')
															]),
														_List_fromArray(
															[
																A2(
																elm$html$Html$div,
																_List_fromArray(
																	[
																		elm$html$Html$Attributes$class('ui vertical fluid buttons')
																	]),
																_List_fromArray(
																	[
																		A2(
																		elm$html$Html$button,
																		_List_fromArray(
																			[
																				elm$html$Html$Attributes$class('ui button blue'),
																				elm$html$Html$Events$onClick(author$project$Otter$VirToggle)
																			]),
																		_List_fromArray(
																			[
																				elm$html$Html$text('Toggle Virtualization')
																			])),
																		A2(
																		elm$html$Html$button,
																		_List_fromArray(
																			[
																				elm$html$Html$Attributes$class('ui button blue'),
																				elm$html$Html$Events$onClick(author$project$Otter$PortExample)
																			]),
																		_List_fromArray(
																			[
																				elm$html$Html$text('Port Example')
																			]))
																	]))
															]))
													]))
											])) : author$project$Otter$html_empty,
										A2(
										elm$html$Html$div,
										_List_fromArray(
											[
												elm$html$Html$Attributes$class('ui segment horizontal-center')
											]),
										_List_fromArray(
											[
												A2(
												elm$html$Html$button,
												_List_fromArray(
													[
														elm$html$Html$Attributes$class('huge circular blue ui icon button'),
														elm$html$Html$Events$onClick(author$project$Otter$ToggleSidePanel)
													]),
												_List_fromArray(
													[
														A2(
														elm$html$Html$i,
														_List_fromArray(
															[
																elm$html$Html$Attributes$class(
																'angle ' + ((model.v ? 'right' : 'left') + ' icon'))
															]),
														_List_Nil)
													]))
											]))
									]))
							]))
					]))
			]));
};
var elm$browser$Browser$Document = F2(
	function (title, body) {
		return {a5: body, bQ: title};
	});
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var elm$virtual_dom$VirtualDom$lazy = _VirtualDom_lazy;
var elm$html$Html$Lazy$lazy = elm$virtual_dom$VirtualDom$lazy;
var author$project$Otter$view = A2(
	elm$core$Basics$composeR,
	elm$html$Html$Lazy$lazy(author$project$Otter$vieww),
	A2(
		elm$core$Basics$composeR,
		elm$core$List$singleton,
		elm$browser$Browser$Document('Otter')));
var elm$browser$Browser$document = _Browser_document;
var author$project$Otter$main = elm$browser$Browser$document(
	{bq: author$project$Otter$init, bM: author$project$Otter$subscriptions, bS: author$project$Otter$update, bU: author$project$Otter$view});
_Platform_export({'Otter':{'init':author$project$Otter$main(
	elm$json$Json$Decode$succeed(0))(0)}});}(this));