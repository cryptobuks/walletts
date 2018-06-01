/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/cycle-semantic-ui/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 221);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var symbol_observable_1 = __webpack_require__(143);
var NO = {};
exports.NO = NO;
function noop() { }
function cp(a) {
    var l = a.length;
    var b = Array(l);
    for (var i = 0; i < l; ++i)
        b[i] = a[i];
    return b;
}
function and(f1, f2) {
    return function andFn(t) {
        return f1(t) && f2(t);
    };
}
function _try(c, t, u) {
    try {
        return c.f(t);
    }
    catch (e) {
        u._e(e);
        return NO;
    }
}
var NO_IL = {
    _n: noop,
    _e: noop,
    _c: noop,
};
exports.NO_IL = NO_IL;
// mutates the input
function internalizeProducer(producer) {
    producer._start = function _start(il) {
        il.next = il._n;
        il.error = il._e;
        il.complete = il._c;
        this.start(il);
    };
    producer._stop = producer.stop;
}
var StreamSub = (function () {
    function StreamSub(_stream, _listener) {
        this._stream = _stream;
        this._listener = _listener;
    }
    StreamSub.prototype.unsubscribe = function () {
        this._stream.removeListener(this._listener);
    };
    return StreamSub;
}());
var Observer = (function () {
    function Observer(_listener) {
        this._listener = _listener;
    }
    Observer.prototype.next = function (value) {
        this._listener._n(value);
    };
    Observer.prototype.error = function (err) {
        this._listener._e(err);
    };
    Observer.prototype.complete = function () {
        this._listener._c();
    };
    return Observer;
}());
var FromObservable = (function () {
    function FromObservable(observable) {
        this.type = 'fromObservable';
        this.ins = observable;
        this.active = false;
    }
    FromObservable.prototype._start = function (out) {
        this.out = out;
        this.active = true;
        this._sub = this.ins.subscribe(new Observer(out));
        if (!this.active)
            this._sub.unsubscribe();
    };
    FromObservable.prototype._stop = function () {
        if (this._sub)
            this._sub.unsubscribe();
        this.active = false;
    };
    return FromObservable;
}());
var Merge = (function () {
    function Merge(insArr) {
        this.type = 'merge';
        this.insArr = insArr;
        this.out = NO;
        this.ac = 0;
    }
    Merge.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var L = s.length;
        this.ac = L;
        for (var i = 0; i < L; i++)
            s[i]._add(this);
    };
    Merge.prototype._stop = function () {
        var s = this.insArr;
        var L = s.length;
        for (var i = 0; i < L; i++)
            s[i]._remove(this);
        this.out = NO;
    };
    Merge.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    Merge.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Merge.prototype._c = function () {
        if (--this.ac <= 0) {
            var u = this.out;
            if (u === NO)
                return;
            u._c();
        }
    };
    return Merge;
}());
var CombineListener = (function () {
    function CombineListener(i, out, p) {
        this.i = i;
        this.out = out;
        this.p = p;
        p.ils.push(this);
    }
    CombineListener.prototype._n = function (t) {
        var p = this.p, out = this.out;
        if (out === NO)
            return;
        if (p.up(t, this.i)) {
            var a = p.vals;
            var l = a.length;
            var b = Array(l);
            for (var i = 0; i < l; ++i)
                b[i] = a[i];
            out._n(b);
        }
    };
    CombineListener.prototype._e = function (err) {
        var out = this.out;
        if (out === NO)
            return;
        out._e(err);
    };
    CombineListener.prototype._c = function () {
        var p = this.p;
        if (p.out === NO)
            return;
        if (--p.Nc === 0)
            p.out._c();
    };
    return CombineListener;
}());
var Combine = (function () {
    function Combine(insArr) {
        this.type = 'combine';
        this.insArr = insArr;
        this.out = NO;
        this.ils = [];
        this.Nc = this.Nn = 0;
        this.vals = [];
    }
    Combine.prototype.up = function (t, i) {
        var v = this.vals[i];
        var Nn = !this.Nn ? 0 : v === NO ? --this.Nn : this.Nn;
        this.vals[i] = t;
        return Nn === 0;
    };
    Combine.prototype._start = function (out) {
        this.out = out;
        var s = this.insArr;
        var n = this.Nc = this.Nn = s.length;
        var vals = this.vals = new Array(n);
        if (n === 0) {
            out._n([]);
            out._c();
        }
        else {
            for (var i = 0; i < n; i++) {
                vals[i] = NO;
                s[i]._add(new CombineListener(i, out, this));
            }
        }
    };
    Combine.prototype._stop = function () {
        var s = this.insArr;
        var n = s.length;
        var ils = this.ils;
        for (var i = 0; i < n; i++)
            s[i]._remove(ils[i]);
        this.out = NO;
        this.ils = [];
        this.vals = [];
    };
    return Combine;
}());
var FromArray = (function () {
    function FromArray(a) {
        this.type = 'fromArray';
        this.a = a;
    }
    FromArray.prototype._start = function (out) {
        var a = this.a;
        for (var i = 0, n = a.length; i < n; i++)
            out._n(a[i]);
        out._c();
    };
    FromArray.prototype._stop = function () {
    };
    return FromArray;
}());
var FromPromise = (function () {
    function FromPromise(p) {
        this.type = 'fromPromise';
        this.on = false;
        this.p = p;
    }
    FromPromise.prototype._start = function (out) {
        var prod = this;
        this.on = true;
        this.p.then(function (v) {
            if (prod.on) {
                out._n(v);
                out._c();
            }
        }, function (e) {
            out._e(e);
        }).then(noop, function (err) {
            setTimeout(function () { throw err; });
        });
    };
    FromPromise.prototype._stop = function () {
        this.on = false;
    };
    return FromPromise;
}());
var Periodic = (function () {
    function Periodic(period) {
        this.type = 'periodic';
        this.period = period;
        this.intervalID = -1;
        this.i = 0;
    }
    Periodic.prototype._start = function (out) {
        var self = this;
        function intervalHandler() { out._n(self.i++); }
        this.intervalID = setInterval(intervalHandler, this.period);
    };
    Periodic.prototype._stop = function () {
        if (this.intervalID !== -1)
            clearInterval(this.intervalID);
        this.intervalID = -1;
        this.i = 0;
    };
    return Periodic;
}());
var Debug = (function () {
    function Debug(ins, arg) {
        this.type = 'debug';
        this.ins = ins;
        this.out = NO;
        this.s = noop;
        this.l = '';
        if (typeof arg === 'string')
            this.l = arg;
        else if (typeof arg === 'function')
            this.s = arg;
    }
    Debug.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Debug.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Debug.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var s = this.s, l = this.l;
        if (s !== noop) {
            try {
                s(t);
            }
            catch (e) {
                u._e(e);
            }
        }
        else if (l)
            console.log(l + ':', t);
        else
            console.log(t);
        u._n(t);
    };
    Debug.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Debug.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Debug;
}());
var Drop = (function () {
    function Drop(max, ins) {
        this.type = 'drop';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.dropped = 0;
    }
    Drop.prototype._start = function (out) {
        this.out = out;
        this.dropped = 0;
        this.ins._add(this);
    };
    Drop.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Drop.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        if (this.dropped++ >= this.max)
            u._n(t);
    };
    Drop.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Drop.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Drop;
}());
var EndWhenListener = (function () {
    function EndWhenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    EndWhenListener.prototype._n = function () {
        this.op.end();
    };
    EndWhenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    EndWhenListener.prototype._c = function () {
        this.op.end();
    };
    return EndWhenListener;
}());
var EndWhen = (function () {
    function EndWhen(o, ins) {
        this.type = 'endWhen';
        this.ins = ins;
        this.out = NO;
        this.o = o;
        this.oil = NO_IL;
    }
    EndWhen.prototype._start = function (out) {
        this.out = out;
        this.o._add(this.oil = new EndWhenListener(out, this));
        this.ins._add(this);
    };
    EndWhen.prototype._stop = function () {
        this.ins._remove(this);
        this.o._remove(this.oil);
        this.out = NO;
        this.oil = NO_IL;
    };
    EndWhen.prototype.end = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    EndWhen.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    EndWhen.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    EndWhen.prototype._c = function () {
        this.end();
    };
    return EndWhen;
}());
var Filter = (function () {
    function Filter(passes, ins) {
        this.type = 'filter';
        this.ins = ins;
        this.out = NO;
        this.f = passes;
    }
    Filter.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    Filter.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Filter.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO || !r)
            return;
        u._n(t);
    };
    Filter.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Filter.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Filter;
}());
var FlattenListener = (function () {
    function FlattenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    FlattenListener.prototype._n = function (t) {
        this.out._n(t);
    };
    FlattenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    FlattenListener.prototype._c = function () {
        this.op.inner = NO;
        this.op.less();
    };
    return FlattenListener;
}());
var Flatten = (function () {
    function Flatten(ins) {
        this.type = 'flatten';
        this.ins = ins;
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    }
    Flatten.prototype._start = function (out) {
        this.out = out;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
        this.ins._add(this);
    };
    Flatten.prototype._stop = function () {
        this.ins._remove(this);
        if (this.inner !== NO)
            this.inner._remove(this.il);
        this.out = NO;
        this.open = true;
        this.inner = NO;
        this.il = NO_IL;
    };
    Flatten.prototype.less = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (!this.open && this.inner === NO)
            u._c();
    };
    Flatten.prototype._n = function (s) {
        var u = this.out;
        if (u === NO)
            return;
        var _a = this, inner = _a.inner, il = _a.il;
        if (inner !== NO && il !== NO_IL)
            inner._remove(il);
        (this.inner = s)._add(this.il = new FlattenListener(u, this));
    };
    Flatten.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Flatten.prototype._c = function () {
        this.open = false;
        this.less();
    };
    return Flatten;
}());
var Fold = (function () {
    function Fold(f, seed, ins) {
        var _this = this;
        this.type = 'fold';
        this.ins = ins;
        this.out = NO;
        this.f = function (t) { return f(_this.acc, t); };
        this.acc = this.seed = seed;
    }
    Fold.prototype._start = function (out) {
        this.out = out;
        this.acc = this.seed;
        out._n(this.acc);
        this.ins._add(this);
    };
    Fold.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.acc = this.seed;
    };
    Fold.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(this.acc = r);
    };
    Fold.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Fold.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Fold;
}());
var Last = (function () {
    function Last(ins) {
        this.type = 'last';
        this.ins = ins;
        this.out = NO;
        this.has = false;
        this.val = NO;
    }
    Last.prototype._start = function (out) {
        this.out = out;
        this.has = false;
        this.ins._add(this);
    };
    Last.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
        this.val = NO;
    };
    Last.prototype._n = function (t) {
        this.has = true;
        this.val = t;
    };
    Last.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Last.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        if (this.has) {
            u._n(this.val);
            u._c();
        }
        else
            u._e(new Error('last() failed because input stream completed'));
    };
    return Last;
}());
var MapFlattenListener = (function () {
    function MapFlattenListener(out, op) {
        this.out = out;
        this.op = op;
    }
    MapFlattenListener.prototype._n = function (r) {
        this.out._n(r);
    };
    MapFlattenListener.prototype._e = function (err) {
        this.out._e(err);
    };
    MapFlattenListener.prototype._c = function () {
        this.op.inner = NO;
        this.op.less();
    };
    return MapFlattenListener;
}());
var MapFlatten = (function () {
    function MapFlatten(mapOp) {
        this.type = mapOp.type + "+flatten";
        this.ins = mapOp.ins;
        this.out = NO;
        this.mapOp = mapOp;
        this.inner = NO;
        this.il = NO_IL;
        this.open = true;
    }
    MapFlatten.prototype._start = function (out) {
        this.out = out;
        this.inner = NO;
        this.il = NO_IL;
        this.open = true;
        this.mapOp.ins._add(this);
    };
    MapFlatten.prototype._stop = function () {
        this.mapOp.ins._remove(this);
        if (this.inner !== NO)
            this.inner._remove(this.il);
        this.out = NO;
        this.inner = NO;
        this.il = NO_IL;
    };
    MapFlatten.prototype.less = function () {
        if (!this.open && this.inner === NO) {
            var u = this.out;
            if (u === NO)
                return;
            u._c();
        }
    };
    MapFlatten.prototype._n = function (v) {
        var u = this.out;
        if (u === NO)
            return;
        var _a = this, inner = _a.inner, il = _a.il;
        var s = _try(this.mapOp, v, u);
        if (s === NO)
            return;
        if (inner !== NO && il !== NO_IL)
            inner._remove(il);
        (this.inner = s)._add(this.il = new MapFlattenListener(u, this));
    };
    MapFlatten.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    MapFlatten.prototype._c = function () {
        this.open = false;
        this.less();
    };
    return MapFlatten;
}());
var MapOp = (function () {
    function MapOp(project, ins) {
        this.type = 'map';
        this.ins = ins;
        this.out = NO;
        this.f = project;
    }
    MapOp.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    MapOp.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    MapOp.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(r);
    };
    MapOp.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    MapOp.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return MapOp;
}());
var FilterMapFusion = (function (_super) {
    __extends(FilterMapFusion, _super);
    function FilterMapFusion(passes, project, ins) {
        var _this = _super.call(this, project, ins) || this;
        _this.type = 'filter+map';
        _this.passes = passes;
        return _this;
    }
    FilterMapFusion.prototype._n = function (t) {
        if (!this.passes(t))
            return;
        var u = this.out;
        if (u === NO)
            return;
        var r = _try(this, t, u);
        if (r === NO)
            return;
        u._n(r);
    };
    return FilterMapFusion;
}(MapOp));
var Remember = (function () {
    function Remember(ins) {
        this.type = 'remember';
        this.ins = ins;
        this.out = NO;
    }
    Remember.prototype._start = function (out) {
        this.out = out;
        this.ins._add(out);
    };
    Remember.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return Remember;
}());
var ReplaceError = (function () {
    function ReplaceError(replacer, ins) {
        this.type = 'replaceError';
        this.ins = ins;
        this.out = NO;
        this.f = replacer;
    }
    ReplaceError.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    ReplaceError.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    ReplaceError.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        u._n(t);
    };
    ReplaceError.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        try {
            this.ins._remove(this);
            (this.ins = this.f(err))._add(this);
        }
        catch (e) {
            u._e(e);
        }
    };
    ReplaceError.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return ReplaceError;
}());
var StartWith = (function () {
    function StartWith(ins, val) {
        this.type = 'startWith';
        this.ins = ins;
        this.out = NO;
        this.val = val;
    }
    StartWith.prototype._start = function (out) {
        this.out = out;
        this.out._n(this.val);
        this.ins._add(out);
    };
    StartWith.prototype._stop = function () {
        this.ins._remove(this.out);
        this.out = NO;
    };
    return StartWith;
}());
var Take = (function () {
    function Take(max, ins) {
        this.type = 'take';
        this.ins = ins;
        this.out = NO;
        this.max = max;
        this.taken = 0;
    }
    Take.prototype._start = function (out) {
        this.out = out;
        this.taken = 0;
        if (this.max <= 0)
            out._c();
        else
            this.ins._add(this);
    };
    Take.prototype._stop = function () {
        this.ins._remove(this);
        this.out = NO;
    };
    Take.prototype._n = function (t) {
        var u = this.out;
        if (u === NO)
            return;
        var m = ++this.taken;
        if (m < this.max)
            u._n(t);
        else if (m === this.max) {
            u._n(t);
            u._c();
        }
    };
    Take.prototype._e = function (err) {
        var u = this.out;
        if (u === NO)
            return;
        u._e(err);
    };
    Take.prototype._c = function () {
        var u = this.out;
        if (u === NO)
            return;
        u._c();
    };
    return Take;
}());
var Stream = (function () {
    function Stream(producer) {
        this._prod = producer || NO;
        this._ils = [];
        this._stopID = NO;
        this._dl = NO;
        this._d = false;
        this._target = NO;
        this._err = NO;
    }
    Stream.prototype._n = function (t) {
        var a = this._ils;
        var L = a.length;
        if (this._d)
            this._dl._n(t);
        if (L == 1)
            a[0]._n(t);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._n(t);
        }
    };
    Stream.prototype._e = function (err) {
        if (this._err !== NO)
            return;
        this._err = err;
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._e(err);
        if (L == 1)
            a[0]._e(err);
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._e(err);
        }
        if (!this._d && L == 0)
            throw this._err;
    };
    Stream.prototype._c = function () {
        var a = this._ils;
        var L = a.length;
        this._x();
        if (this._d)
            this._dl._c();
        if (L == 1)
            a[0]._c();
        else if (L == 0)
            return;
        else {
            var b = cp(a);
            for (var i = 0; i < L; i++)
                b[i]._c();
        }
    };
    Stream.prototype._x = function () {
        if (this._ils.length === 0)
            return;
        if (this._prod !== NO)
            this._prod._stop();
        this._err = NO;
        this._ils = [];
    };
    Stream.prototype._stopNow = function () {
        // WARNING: code that calls this method should
        // first check if this._prod is valid (not `NO`)
        this._prod._stop();
        this._err = NO;
        this._stopID = NO;
    };
    Stream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1)
            return;
        if (this._stopID !== NO) {
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    Stream.prototype._remove = function (il) {
        var _this = this;
        var ta = this._target;
        if (ta !== NO)
            return ta._remove(il);
        var a = this._ils;
        var i = a.indexOf(il);
        if (i > -1) {
            a.splice(i, 1);
            if (this._prod !== NO && a.length <= 0) {
                this._err = NO;
                this._stopID = setTimeout(function () { return _this._stopNow(); });
            }
            else if (a.length === 1) {
                this._pruneCycles();
            }
        }
    };
    // If all paths stemming from `this` stream eventually end at `this`
    // stream, then we remove the single listener of `this` stream, to
    // force it to end its execution and dispose resources. This method
    // assumes as a precondition that this._ils has just one listener.
    Stream.prototype._pruneCycles = function () {
        if (this._hasNoSinks(this, []))
            this._remove(this._ils[0]);
    };
    // Checks whether *there is no* path starting from `x` that leads to an end
    // listener (sink) in the stream graph, following edges A->B where B is a
    // listener of A. This means these paths constitute a cycle somehow. Is given
    // a trace of all visited nodes so far.
    Stream.prototype._hasNoSinks = function (x, trace) {
        if (trace.indexOf(x) !== -1)
            return true;
        else if (x.out === this)
            return true;
        else if (x.out && x.out !== NO)
            return this._hasNoSinks(x.out, trace.concat(x));
        else if (x._ils) {
            for (var i = 0, N = x._ils.length; i < N; i++)
                if (!this._hasNoSinks(x._ils[i], trace.concat(x)))
                    return false;
            return true;
        }
        else
            return false;
    };
    Stream.prototype.ctor = function () {
        return this instanceof MemoryStream ? MemoryStream : Stream;
    };
    /**
     * Adds a Listener to the Stream.
     *
     * @param {Listener} listener
     */
    Stream.prototype.addListener = function (listener) {
        listener._n = listener.next || noop;
        listener._e = listener.error || noop;
        listener._c = listener.complete || noop;
        this._add(listener);
    };
    /**
     * Removes a Listener from the Stream, assuming the Listener was added to it.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.removeListener = function (listener) {
        this._remove(listener);
    };
    /**
     * Adds a Listener to the Stream returning a Subscription to remove that
     * listener.
     *
     * @param {Listener} listener
     * @returns {Subscription}
     */
    Stream.prototype.subscribe = function (listener) {
        this.addListener(listener);
        return new StreamSub(this, listener);
    };
    /**
     * Add interop between most.js and RxJS 5
     *
     * @returns {Stream}
     */
    Stream.prototype[symbol_observable_1.default] = function () {
        return this;
    };
    /**
     * Creates a new Stream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {Stream}
     */
    Stream.create = function (producer) {
        if (producer) {
            if (typeof producer.start !== 'function'
                || typeof producer.stop !== 'function')
                throw new Error('producer requires both start and stop functions');
            internalizeProducer(producer); // mutates the input
        }
        return new Stream(producer);
    };
    /**
     * Creates a new MemoryStream given a Producer.
     *
     * @factory true
     * @param {Producer} producer An optional Producer that dictates how to
     * start, generate events, and stop the Stream.
     * @return {MemoryStream}
     */
    Stream.createWithMemory = function (producer) {
        if (producer)
            internalizeProducer(producer); // mutates the input
        return new MemoryStream(producer);
    };
    /**
     * Creates a Stream that does nothing when started. It never emits any event.
     *
     * Marble diagram:
     *
     * ```text
     *          never
     * -----------------------
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.never = function () {
        return new Stream({ _start: noop, _stop: noop });
    };
    /**
     * Creates a Stream that immediately emits the "complete" notification when
     * started, and that's it.
     *
     * Marble diagram:
     *
     * ```text
     * empty
     * -|
     * ```
     *
     * @factory true
     * @return {Stream}
     */
    Stream.empty = function () {
        return new Stream({
            _start: function (il) { il._c(); },
            _stop: noop,
        });
    };
    /**
     * Creates a Stream that immediately emits an "error" notification with the
     * value you passed as the `error` argument when the stream starts, and that's
     * it.
     *
     * Marble diagram:
     *
     * ```text
     * throw(X)
     * -X
     * ```
     *
     * @factory true
     * @param error The error event to emit on the created stream.
     * @return {Stream}
     */
    Stream.throw = function (error) {
        return new Stream({
            _start: function (il) { il._e(error); },
            _stop: noop,
        });
    };
    /**
     * Creates a stream from an Array, Promise, or an Observable.
     *
     * @factory true
     * @param {Array|Promise|Observable} input The input to make a stream from.
     * @return {Stream}
     */
    Stream.from = function (input) {
        if (typeof input[symbol_observable_1.default] === 'function')
            return Stream.fromObservable(input);
        else if (typeof input.then === 'function')
            return Stream.fromPromise(input);
        else if (Array.isArray(input))
            return Stream.fromArray(input);
        throw new TypeError("Type of input to from() must be an Array, Promise, or Observable");
    };
    /**
     * Creates a Stream that immediately emits the arguments that you give to
     * *of*, then completes.
     *
     * Marble diagram:
     *
     * ```text
     * of(1,2,3)
     * 123|
     * ```
     *
     * @factory true
     * @param a The first value you want to emit as an event on the stream.
     * @param b The second value you want to emit as an event on the stream. One
     * or more of these values may be given as arguments.
     * @return {Stream}
     */
    Stream.of = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return Stream.fromArray(items);
    };
    /**
     * Converts an array to a stream. The returned stream will emit synchronously
     * all the items in the array, and then complete.
     *
     * Marble diagram:
     *
     * ```text
     * fromArray([1,2,3])
     * 123|
     * ```
     *
     * @factory true
     * @param {Array} array The array to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromArray = function (array) {
        return new Stream(new FromArray(array));
    };
    /**
     * Converts a promise to a stream. The returned stream will emit the resolved
     * value of the promise, and then complete. However, if the promise is
     * rejected, the stream will emit the corresponding error.
     *
     * Marble diagram:
     *
     * ```text
     * fromPromise( ----42 )
     * -----------------42|
     * ```
     *
     * @factory true
     * @param {Promise} promise The promise to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromPromise = function (promise) {
        return new Stream(new FromPromise(promise));
    };
    /**
     * Converts an Observable into a Stream.
     *
     * @factory true
     * @param {any} observable The observable to be converted as a stream.
     * @return {Stream}
     */
    Stream.fromObservable = function (obs) {
        if (obs.endWhen)
            return obs;
        return new Stream(new FromObservable(obs));
    };
    /**
     * Creates a stream that periodically emits incremental numbers, every
     * `period` milliseconds.
     *
     * Marble diagram:
     *
     * ```text
     *     periodic(1000)
     * ---0---1---2---3---4---...
     * ```
     *
     * @factory true
     * @param {number} period The interval in milliseconds to use as a rate of
     * emission.
     * @return {Stream}
     */
    Stream.periodic = function (period) {
        return new Stream(new Periodic(period));
    };
    Stream.prototype._map = function (project) {
        var p = this._prod;
        var ctor = this.ctor();
        if (p instanceof Filter)
            return new ctor(new FilterMapFusion(p.f, project, p.ins));
        return new ctor(new MapOp(project, this));
    };
    /**
     * Transforms each event from the input Stream through a `project` function,
     * to get a Stream that emits those transformed events.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7------
     *    map(i => i * 10)
     * --10--30-50----70-----
     * ```
     *
     * @param {Function} project A function of type `(t: T) => U` that takes event
     * `t` of type `T` from the input Stream and produces an event of type `U`, to
     * be emitted on the output Stream.
     * @return {Stream}
     */
    Stream.prototype.map = function (project) {
        return this._map(project);
    };
    /**
     * It's like `map`, but transforms each input event to always the same
     * constant value on the output Stream.
     *
     * Marble diagram:
     *
     * ```text
     * --1---3--5-----7-----
     *       mapTo(10)
     * --10--10-10----10----
     * ```
     *
     * @param projectedValue A value to emit on the output Stream whenever the
     * input Stream emits any value.
     * @return {Stream}
     */
    Stream.prototype.mapTo = function (projectedValue) {
        var s = this.map(function () { return projectedValue; });
        var op = s._prod;
        op.type = op.type.replace('map', 'mapTo');
        return s;
    };
    /**
     * Only allows events that pass the test given by the `passes` argument.
     *
     * Each event from the input stream is given to the `passes` function. If the
     * function returns `true`, the event is forwarded to the output stream,
     * otherwise it is ignored and not forwarded.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2--3-----4-----5---6--7-8--
     *     filter(i => i % 2 === 0)
     * ------2--------4---------6----8--
     * ```
     *
     * @param {Function} passes A function of type `(t: T) +> boolean` that takes
     * an event from the input stream and checks if it passes, by returning a
     * boolean.
     * @return {Stream}
     */
    Stream.prototype.filter = function (passes) {
        var p = this._prod;
        if (p instanceof Filter)
            return new Stream(new Filter(and(p.f, passes), p.ins));
        return new Stream(new Filter(passes, this));
    };
    /**
     * Lets the first `amount` many events from the input stream pass to the
     * output stream, then makes the output stream complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *    take(3)
     * --a---b--c|
     * ```
     *
     * @param {number} amount How many events to allow from the input stream
     * before completing the output stream.
     * @return {Stream}
     */
    Stream.prototype.take = function (amount) {
        return new (this.ctor())(new Take(amount, this));
    };
    /**
     * Ignores the first `amount` many events from the input stream, and then
     * after that starts forwarding events from the input stream to the output
     * stream.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c----d---e--
     *       drop(3)
     * --------------d---e--
     * ```
     *
     * @param {number} amount How many events to ignore from the input stream
     * before forwarding all events from the input stream to the output stream.
     * @return {Stream}
     */
    Stream.prototype.drop = function (amount) {
        return new Stream(new Drop(amount, this));
    };
    /**
     * When the input stream completes, the output stream will emit the last event
     * emitted by the input stream, and then will also complete.
     *
     * Marble diagram:
     *
     * ```text
     * --a---b--c--d----|
     *       last()
     * -----------------d|
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.last = function () {
        return new Stream(new Last(this));
    };
    /**
     * Prepends the given `initial` value to the sequence of events emitted by the
     * input stream. The returned stream is a MemoryStream, which means it is
     * already `remember()`'d.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3---
     *   startWith(0)
     * 0--1---2-----3---
     * ```
     *
     * @param initial The value or event to prepend.
     * @return {MemoryStream}
     */
    Stream.prototype.startWith = function (initial) {
        return new MemoryStream(new StartWith(this, initial));
    };
    /**
     * Uses another stream to determine when to complete the current stream.
     *
     * When the given `other` stream emits an event or completes, the output
     * stream will complete. Before that happens, the output stream will behaves
     * like the input stream.
     *
     * Marble diagram:
     *
     * ```text
     * ---1---2-----3--4----5----6---
     *   endWhen( --------a--b--| )
     * ---1---2-----3--4--|
     * ```
     *
     * @param other Some other stream that is used to know when should the output
     * stream of this operator complete.
     * @return {Stream}
     */
    Stream.prototype.endWhen = function (other) {
        return new (this.ctor())(new EndWhen(other, this));
    };
    /**
     * "Folds" the stream onto itself.
     *
     * Combines events from the past throughout
     * the entire execution of the input stream, allowing you to accumulate them
     * together. It's essentially like `Array.prototype.reduce`. The returned
     * stream is a MemoryStream, which means it is already `remember()`'d.
     *
     * The output stream starts by emitting the `seed` which you give as argument.
     * Then, when an event happens on the input stream, it is combined with that
     * seed value through the `accumulate` function, and the output value is
     * emitted on the output stream. `fold` remembers that output value as `acc`
     * ("accumulator"), and then when a new input event `t` happens, `acc` will be
     * combined with that to produce the new `acc` and so forth.
     *
     * Marble diagram:
     *
     * ```text
     * ------1-----1--2----1----1------
     *   fold((acc, x) => acc + x, 3)
     * 3-----4-----5--7----8----9------
     * ```
     *
     * @param {Function} accumulate A function of type `(acc: R, t: T) => R` that
     * takes the previous accumulated value `acc` and the incoming event from the
     * input stream and produces the new accumulated value.
     * @param seed The initial accumulated value, of type `R`.
     * @return {MemoryStream}
     */
    Stream.prototype.fold = function (accumulate, seed) {
        return new MemoryStream(new Fold(accumulate, seed, this));
    };
    /**
     * Replaces an error with another stream.
     *
     * When (and if) an error happens on the input stream, instead of forwarding
     * that error to the output stream, *replaceError* will call the `replace`
     * function which returns the stream that the output stream will replicate.
     * And, in case that new stream also emits an error, `replace` will be called
     * again to get another stream to start replicating.
     *
     * Marble diagram:
     *
     * ```text
     * --1---2-----3--4-----X
     *   replaceError( () => --10--| )
     * --1---2-----3--4--------10--|
     * ```
     *
     * @param {Function} replace A function of type `(err) => Stream` that takes
     * the error that occurred on the input stream or on the previous replacement
     * stream and returns a new stream. The output stream will behave like the
     * stream that this function returns.
     * @return {Stream}
     */
    Stream.prototype.replaceError = function (replace) {
        return new (this.ctor())(new ReplaceError(replace, this));
    };
    /**
     * Flattens a "stream of streams", handling only one nested stream at a time
     * (no concurrency).
     *
     * If the input stream is a stream that emits streams, then this operator will
     * return an output stream which is a flat stream: emits regular events. The
     * flattening happens without concurrency. It works like this: when the input
     * stream emits a nested stream, *flatten* will start imitating that nested
     * one. However, as soon as the next nested stream is emitted on the input
     * stream, *flatten* will forget the previous nested one it was imitating, and
     * will start imitating the new nested one.
     *
     * Marble diagram:
     *
     * ```text
     * --+--------+---------------
     *   \        \
     *    \       ----1----2---3--
     *    --a--b----c----d--------
     *           flatten
     * -----a--b------1----2---3--
     * ```
     *
     * @return {Stream}
     */
    Stream.prototype.flatten = function () {
        var p = this._prod;
        return new Stream(p instanceof MapOp && !(p instanceof FilterMapFusion) ?
            new MapFlatten(p) :
            new Flatten(this));
    };
    /**
     * Passes the input stream to a custom operator, to produce an output stream.
     *
     * *compose* is a handy way of using an existing function in a chained style.
     * Instead of writing `outStream = f(inStream)` you can write
     * `outStream = inStream.compose(f)`.
     *
     * @param {function} operator A function that takes a stream as input and
     * returns a stream as well.
     * @return {Stream}
     */
    Stream.prototype.compose = function (operator) {
        return operator(this);
    };
    /**
     * Returns an output stream that behaves like the input stream, but also
     * remembers the most recent event that happens on the input stream, so that a
     * newly added listener will immediately receive that memorised event.
     *
     * @return {MemoryStream}
     */
    Stream.prototype.remember = function () {
        return new MemoryStream(new Remember(this));
    };
    /**
     * Returns an output stream that identically behaves like the input stream,
     * but also runs a `spy` function fo each event, to help you debug your app.
     *
     * *debug* takes a `spy` function as argument, and runs that for each event
     * happening on the input stream. If you don't provide the `spy` argument,
     * then *debug* will just `console.log` each event. This helps you to
     * understand the flow of events through some operator chain.
     *
     * Please note that if the output stream has no listeners, then it will not
     * start, which means `spy` will never run because no actual event happens in
     * that case.
     *
     * Marble diagram:
     *
     * ```text
     * --1----2-----3-----4--
     *         debug
     * --1----2-----3-----4--
     * ```
     *
     * @param {function} labelOrSpy A string to use as the label when printing
     * debug information on the console, or a 'spy' function that takes an event
     * as argument, and does not need to return anything.
     * @return {Stream}
     */
    Stream.prototype.debug = function (labelOrSpy) {
        return new (this.ctor())(new Debug(this, labelOrSpy));
    };
    /**
     * *imitate* changes this current Stream to emit the same events that the
     * `other` given Stream does. This method returns nothing.
     *
     * This method exists to allow one thing: **circular dependency of streams**.
     * For instance, let's imagine that for some reason you need to create a
     * circular dependency where stream `first$` depends on stream `second$`
     * which in turn depends on `first$`:
     *
     * <!-- skip-example -->
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var first$ = second$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * ```
     *
     * However, that is invalid JavaScript, because `second$` is undefined
     * on the first line. This is how *imitate* can help solve it:
     *
     * ```js
     * import delay from 'xstream/extra/delay'
     *
     * var secondProxy$ = xs.create();
     * var first$ = secondProxy$.map(x => x * 10).take(3);
     * var second$ = first$.map(x => x + 1).startWith(1).compose(delay(100));
     * secondProxy$.imitate(second$);
     * ```
     *
     * We create `secondProxy$` before the others, so it can be used in the
     * declaration of `first$`. Then, after both `first$` and `second$` are
     * defined, we hook `secondProxy$` with `second$` with `imitate()` to tell
     * that they are "the same". `imitate` will not trigger the start of any
     * stream, it just binds `secondProxy$` and `second$` together.
     *
     * The following is an example where `imitate()` is important in Cycle.js
     * applications. A parent component contains some child components. A child
     * has an action stream which is given to the parent to define its state:
     *
     * <!-- skip-example -->
     * ```js
     * const childActionProxy$ = xs.create();
     * const parent = Parent({...sources, childAction$: childActionProxy$});
     * const childAction$ = parent.state$.map(s => s.child.action$).flatten();
     * childActionProxy$.imitate(childAction$);
     * ```
     *
     * Note, though, that **`imitate()` does not support MemoryStreams**. If we
     * would attempt to imitate a MemoryStream in a circular dependency, we would
     * either get a race condition (where the symptom would be "nothing happens")
     * or an infinite cyclic emission of values. It's useful to think about
     * MemoryStreams as cells in a spreadsheet. It doesn't make any sense to
     * define a spreadsheet cell `A1` with a formula that depends on `B1` and
     * cell `B1` defined with a formula that depends on `A1`.
     *
     * If you find yourself wanting to use `imitate()` with a
     * MemoryStream, you should rework your code around `imitate()` to use a
     * Stream instead. Look for the stream in the circular dependency that
     * represents an event stream, and that would be a candidate for creating a
     * proxy Stream which then imitates the target Stream.
     *
     * @param {Stream} target The other stream to imitate on the current one. Must
     * not be a MemoryStream.
     */
    Stream.prototype.imitate = function (target) {
        if (target instanceof MemoryStream)
            throw new Error('A MemoryStream was given to imitate(), but it only ' +
                'supports a Stream. Read more about this restriction here: ' +
                'https://github.com/staltz/xstream#faq');
        this._target = target;
        for (var ils = this._ils, N = ils.length, i = 0; i < N; i++)
            target._add(ils[i]);
        this._ils = [];
    };
    /**
     * Forces the Stream to emit the given value to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param value The "next" value you want to broadcast to all listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendNext = function (value) {
        this._n(value);
    };
    /**
     * Forces the Stream to emit the given error to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     *
     * @param {any} error The error you want to broadcast to all the listeners of
     * this Stream.
     */
    Stream.prototype.shamefullySendError = function (error) {
        this._e(error);
    };
    /**
     * Forces the Stream to emit the "completed" event to its listeners.
     *
     * As the name indicates, if you use this, you are most likely doing something
     * The Wrong Way. Please try to understand the reactive way before using this
     * method. Use it only when you know what you are doing.
     */
    Stream.prototype.shamefullySendComplete = function () {
        this._c();
    };
    /**
     * Adds a "debug" listener to the stream. There can only be one debug
     * listener, that's why this is 'setDebugListener'. To remove the debug
     * listener, just call setDebugListener(null).
     *
     * A debug listener is like any other listener. The only difference is that a
     * debug listener is "stealthy": its presence/absence does not trigger the
     * start/stop of the stream (or the producer inside the stream). This is
     * useful so you can inspect what is going on without changing the behavior
     * of the program. If you have an idle stream and you add a normal listener to
     * it, the stream will start executing. But if you set a debug listener on an
     * idle stream, it won't start executing (not until the first normal listener
     * is added).
     *
     * As the name indicates, we don't recommend using this method to build app
     * logic. In fact, in most cases the debug operator works just fine. Only use
     * this one if you know what you're doing.
     *
     * @param {Listener<T>} listener
     */
    Stream.prototype.setDebugListener = function (listener) {
        if (!listener) {
            this._d = false;
            this._dl = NO;
        }
        else {
            this._d = true;
            listener._n = listener.next || noop;
            listener._e = listener.error || noop;
            listener._c = listener.complete || noop;
            this._dl = listener;
        }
    };
    return Stream;
}());
/**
 * Blends multiple streams together, emitting events from all of them
 * concurrently.
 *
 * *merge* takes multiple streams as arguments, and creates a stream that
 * behaves like each of the argument streams, in parallel.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b----c---d------
 *            merge
 * --1-a--2--b--3-c---d--4---
 * ```
 *
 * @factory true
 * @param {Stream} stream1 A stream to merge together with other streams.
 * @param {Stream} stream2 A stream to merge together with other streams. Two
 * or more streams may be given as arguments.
 * @return {Stream}
 */
Stream.merge = function merge() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return new Stream(new Merge(streams));
};
/**
 * Combines multiple input streams together to return a stream whose events
 * are arrays that collect the latest events from each input stream.
 *
 * *combine* internally remembers the most recent event from each of the input
 * streams. When any of the input streams emits an event, that event together
 * with all the other saved events are combined into an array. That array will
 * be emitted on the output stream. It's essentially a way of joining together
 * the events from multiple streams.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2-----3--------4---
 * ----a-----b-----c--d------
 *          combine
 * ----1a-2a-2b-3b-3c-3d-4d--
 * ```
 *
 * Note: to minimize garbage collection, *combine* uses the same array
 * instance for each emission.  If you need to compare emissions over time,
 * cache the values with `map` first:
 *
 * ```js
 * import pairwise from 'xstream/extra/pairwise'
 *
 * const stream1 = xs.of(1);
 * const stream2 = xs.of(2);
 *
 * xs.combine(stream1, stream2).map(
 *   combinedEmissions => ([ ...combinedEmissions ])
 * ).compose(pairwise)
 * ```
 *
 * @factory true
 * @param {Stream} stream1 A stream to combine together with other streams.
 * @param {Stream} stream2 A stream to combine together with other streams.
 * Multiple streams, not just two, may be given as arguments.
 * @return {Stream}
 */
Stream.combine = function combine() {
    var streams = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        streams[_i] = arguments[_i];
    }
    return new Stream(new Combine(streams));
};
exports.Stream = Stream;
var MemoryStream = (function (_super) {
    __extends(MemoryStream, _super);
    function MemoryStream(producer) {
        var _this = _super.call(this, producer) || this;
        _this._has = false;
        return _this;
    }
    MemoryStream.prototype._n = function (x) {
        this._v = x;
        this._has = true;
        _super.prototype._n.call(this, x);
    };
    MemoryStream.prototype._add = function (il) {
        var ta = this._target;
        if (ta !== NO)
            return ta._add(il);
        var a = this._ils;
        a.push(il);
        if (a.length > 1) {
            if (this._has)
                il._n(this._v);
            return;
        }
        if (this._stopID !== NO) {
            if (this._has)
                il._n(this._v);
            clearTimeout(this._stopID);
            this._stopID = NO;
        }
        else if (this._has)
            il._n(this._v);
        else {
            var p = this._prod;
            if (p !== NO)
                p._start(this);
        }
    };
    MemoryStream.prototype._stopNow = function () {
        this._has = false;
        _super.prototype._stopNow.call(this);
    };
    MemoryStream.prototype._x = function () {
        this._has = false;
        _super.prototype._x.call(this);
    };
    MemoryStream.prototype.map = function (project) {
        return this._map(project);
    };
    MemoryStream.prototype.mapTo = function (projectedValue) {
        return _super.prototype.mapTo.call(this, projectedValue);
    };
    MemoryStream.prototype.take = function (amount) {
        return _super.prototype.take.call(this, amount);
    };
    MemoryStream.prototype.endWhen = function (other) {
        return _super.prototype.endWhen.call(this, other);
    };
    MemoryStream.prototype.replaceError = function (replace) {
        return _super.prototype.replaceError.call(this, replace);
    };
    MemoryStream.prototype.remember = function () {
        return this;
    };
    MemoryStream.prototype.debug = function (labelOrSpy) {
        return _super.prototype.debug.call(this, labelOrSpy);
    };
    return MemoryStream;
}(Stream));
exports.MemoryStream = MemoryStream;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stream;
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var thunk_1 = __webpack_require__(55);
exports.thunk = thunk_1.thunk;
var MainDOMSource_1 = __webpack_require__(39);
exports.MainDOMSource = MainDOMSource_1.MainDOMSource;
var HTMLSource_1 = __webpack_require__(38);
exports.HTMLSource = HTMLSource_1.HTMLSource;
/**
 * A factory for the DOM driver function.
 *
 * Takes a `container` to define the target on the existing DOM which this
 * driver will operate on, and an `options` object as the second argument. The
 * input to this driver is a stream of virtual DOM objects, or in other words,
 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
 * collection of Observables queried with the methods `select()` and `events()`.
 *
 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
 * the element(s) that matches the CSS `selector` given.
 *
 * `DOMSource.events(eventType, options)` returns a stream of events of
 * `eventType` happening on the elements that match the current DOMSource. The
 * event object contains the `ownerTarget` property that behaves exactly like
 * `currentTarget`. The reason for this is that some browsers doesn't allow
 * `currentTarget` property to be mutated, hence a new property is created. The
 * returned stream is an *xstream* Stream if you use `@cycle/xstream-run` to run
 * your app with this driver, or it is an RxJS Observable if you use
 * `@cycle/rxjs-run`, and so forth. The `options` parameter can have the
 * property `useCapture`, which is by default `false`, except it is `true` for
 * event types that do not bubble. Read more here
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * about the `useCapture` and its purpose.
 *
 * `DOMSource.elements()` returns a stream of the DOM element(s) matched by the
 * selectors in the DOMSource. Also, `DOMSource.select(':root').elements()`
 * returns a stream of DOM element corresponding to the root (or container) of
 * the app on the DOM.
 *
 * @param {(String|HTMLElement)} container the DOM selector for the element
 * (or the element itself) to contain the rendering of the VTrees.
 * @param {DOMDriverOptions} options an object with two optional properties:
 *
 *   - `modules: array` overrides `@cycle/dom`'s default Snabbdom modules as
 *     as defined in [`src/modules.ts`](./src/modules.ts).
 *   - `transposition: boolean` enables/disables transposition of inner streams
 *     in the virtual DOM tree.
 * @return {Function} the DOM driver function. The function expects a stream of
 * VNode as input, and outputs the DOMSource object.
 * @function makeDOMDriver
 */
var makeDOMDriver_1 = __webpack_require__(70);
exports.makeDOMDriver = makeDOMDriver_1.makeDOMDriver;
/**
 * A factory for the HTML driver function.
 *
 * Takes an `effect` callback function and an `options` object as arguments. The
 * input to this driver is a stream of virtual DOM objects, or in other words,
 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
 * collection of Observables queried with the methods `select()` and `events()`.
 *
 * The HTML Driver is supplementary to the DOM Driver. Instead of producing
 * elements on the DOM, it generates HTML as strings and does a side effect on
 * those HTML strings. That side effect is described by the `effect` callback
 * function. So, if you want to use the HTML Driver on the server-side to render
 * your application as HTML and send as a response (which is the typical use
 * case for the HTML Driver), you need to pass something like the
 * `html => response.send(html)` function as the `effect` argument. This way,
 * the driver knows what side effect to cause based on the HTML string it just
 * rendered.
 *
 * The HTML driver is useful only for that side effect in the `effect` callback.
 * It can be considered a sink-only driver. However, in order to serve as a
 * transparent replacement to the DOM Driver when rendering from the server, the
 * HTML driver returns a source object that behaves just like the DOMSource.
 * This helps reuse the same application that is written for the DOM Driver.
 * This fake DOMSource returns empty streams when you query it, because there
 * are no user events on the server.
 *
 * `DOMSource.select(selector)` returns a new DOMSource with scope restricted to
 * the element(s) that matches the CSS `selector` given.
 *
 * `DOMSource.events(eventType, options)` returns an empty stream. The returned
 * stream is an *xstream* Stream if you use `@cycle/xstream-run` to run your app
 * with this driver, or it is an RxJS Observable if you use `@cycle/rxjs-run`,
 * and so forth.
 *
 * `DOMSource.elements()` returns the stream of HTML string rendered from your
 * sink virtual DOM stream.
 *
 * @param {Function} effect a callback function that takes a string of rendered
 * HTML as input and should run a side effect, returning nothing.
 * @param {HTMLDriverOptions} options an object with one optional property:
 * `transposition: boolean` enables/disables transposition of inner streams in
 * the virtual DOM tree.
 * @return {Function} the HTML driver function. The function expects a stream of
 * VNode as input, and outputs the DOMSource object.
 * @function makeHTMLDriver
 */
var makeHTMLDriver_1 = __webpack_require__(71);
exports.makeHTMLDriver = makeHTMLDriver_1.makeHTMLDriver;
/**
 * A factory function to create mocked DOMSource objects, for testing purposes.
 *
 * Takes a `streamAdapter` and a `mockConfig` object as arguments, and returns
 * a DOMSource that can be given to any Cycle.js app that expects a DOMSource in
 * the sources, for testing.
 *
 * The `streamAdapter` parameter is a package such as `@cycle/xstream-adapter`,
 * `@cycle/rxjs-adapter`, etc. Import it as `import a from '@cycle/rx-adapter`,
 * then provide it to `mockDOMSource. This is important so the DOMSource created
 * knows which stream library should it use to export its streams when you call
 * `DOMSource.events()` for instance.
 *
 * The `mockConfig` parameter is an object specifying selectors, eventTypes and
 * their streams. Example:
 *
 * ```js
 * const domSource = mockDOMSource(RxAdapter, {
 *   '.foo': {
 *     'click': Rx.Observable.of({target: {}}),
 *     'mouseover': Rx.Observable.of({target: {}}),
 *   },
 *   '.bar': {
 *     'scroll': Rx.Observable.of({target: {}}),
 *     elements: Rx.Observable.of({tagName: 'div'}),
 *   }
 * });
 *
 * // Usage
 * const click$ = domSource.select('.foo').events('click');
 * const element$ = domSource.select('.bar').elements();
 * ```
 *
 * The mocked DOM Source supports isolation. It has the functions `isolateSink`
 * and `isolateSource` attached to it, and performs simple isolation using
 * classNames. *isolateSink* with scope `foo` will append the class `___foo` to
 * the stream of virtual DOM nodes, and *isolateSource* with scope `foo` will
 * perform a conventional `mockedDOMSource.select('.__foo')` call.
 *
 * @param {Object} mockConfig an object where keys are selector strings
 * and values are objects. Those nested objects have `eventType` strings as keys
 * and values are streams you created.
 * @return {Object} fake DOM source object, with an API containing `select()`
 * and `events()` and `elements()` which can be used just like the DOM Driver's
 * DOMSource.
 *
 * @function mockDOMSource
 */
var mockDOMSource_1 = __webpack_require__(72);
exports.mockDOMSource = mockDOMSource_1.mockDOMSource;
exports.MockedDOMSource = mockDOMSource_1.MockedDOMSource;
/**
 * The hyperscript function `h()` is a function to create virtual DOM objects,
 * also known as VNodes. Call
 *
 * ```js
 * h('div.myClass', {style: {color: 'red'}}, [])
 * ```
 *
 * to create a VNode that represents a `DIV` element with className `myClass`,
 * styled with red color, and no children because the `[]` array was passed. The
 * API is `h(tagOrSelector, optionalData, optionalChildrenOrText)`.
 *
 * However, usually you should use "hyperscript helpers", which are shortcut
 * functions based on hyperscript. There is one hyperscript helper function for
 * each DOM tagName, such as `h1()`, `h2()`, `div()`, `span()`, `label()`,
 * `input()`. For instance, the previous example could have been written
 * as:
 *
 * ```js
 * div('.myClass', {style: {color: 'red'}}, [])
 * ```
 *
 * There are also SVG helper functions, which apply the appropriate SVG
 * namespace to the resulting elements. `svg()` function creates the top-most
 * SVG element, and `svg.g`, `svg.polygon`, `svg.circle`, `svg.path` are for
 * SVG-specific child elements. Example:
 *
 * ```js
 * svg({width: 150, height: 150}, [
 *   svg.polygon({
 *     attrs: {
 *       class: 'triangle',
 *       points: '20 0 20 150 150 20'
 *     }
 *   })
 * ])
 * ```
 *
 * @function h
 */
var h_1 = __webpack_require__(18);
exports.h = h_1.h;
var hyperscript_helpers_1 = __webpack_require__(68);
exports.svg = hyperscript_helpers_1.default.svg;
exports.a = hyperscript_helpers_1.default.a;
exports.abbr = hyperscript_helpers_1.default.abbr;
exports.address = hyperscript_helpers_1.default.address;
exports.area = hyperscript_helpers_1.default.area;
exports.article = hyperscript_helpers_1.default.article;
exports.aside = hyperscript_helpers_1.default.aside;
exports.audio = hyperscript_helpers_1.default.audio;
exports.b = hyperscript_helpers_1.default.b;
exports.base = hyperscript_helpers_1.default.base;
exports.bdi = hyperscript_helpers_1.default.bdi;
exports.bdo = hyperscript_helpers_1.default.bdo;
exports.blockquote = hyperscript_helpers_1.default.blockquote;
exports.body = hyperscript_helpers_1.default.body;
exports.br = hyperscript_helpers_1.default.br;
exports.button = hyperscript_helpers_1.default.button;
exports.canvas = hyperscript_helpers_1.default.canvas;
exports.caption = hyperscript_helpers_1.default.caption;
exports.cite = hyperscript_helpers_1.default.cite;
exports.code = hyperscript_helpers_1.default.code;
exports.col = hyperscript_helpers_1.default.col;
exports.colgroup = hyperscript_helpers_1.default.colgroup;
exports.dd = hyperscript_helpers_1.default.dd;
exports.del = hyperscript_helpers_1.default.del;
exports.dfn = hyperscript_helpers_1.default.dfn;
exports.dir = hyperscript_helpers_1.default.dir;
exports.div = hyperscript_helpers_1.default.div;
exports.dl = hyperscript_helpers_1.default.dl;
exports.dt = hyperscript_helpers_1.default.dt;
exports.em = hyperscript_helpers_1.default.em;
exports.embed = hyperscript_helpers_1.default.embed;
exports.fieldset = hyperscript_helpers_1.default.fieldset;
exports.figcaption = hyperscript_helpers_1.default.figcaption;
exports.figure = hyperscript_helpers_1.default.figure;
exports.footer = hyperscript_helpers_1.default.footer;
exports.form = hyperscript_helpers_1.default.form;
exports.h1 = hyperscript_helpers_1.default.h1;
exports.h2 = hyperscript_helpers_1.default.h2;
exports.h3 = hyperscript_helpers_1.default.h3;
exports.h4 = hyperscript_helpers_1.default.h4;
exports.h5 = hyperscript_helpers_1.default.h5;
exports.h6 = hyperscript_helpers_1.default.h6;
exports.head = hyperscript_helpers_1.default.head;
exports.header = hyperscript_helpers_1.default.header;
exports.hgroup = hyperscript_helpers_1.default.hgroup;
exports.hr = hyperscript_helpers_1.default.hr;
exports.html = hyperscript_helpers_1.default.html;
exports.i = hyperscript_helpers_1.default.i;
exports.iframe = hyperscript_helpers_1.default.iframe;
exports.img = hyperscript_helpers_1.default.img;
exports.input = hyperscript_helpers_1.default.input;
exports.ins = hyperscript_helpers_1.default.ins;
exports.kbd = hyperscript_helpers_1.default.kbd;
exports.keygen = hyperscript_helpers_1.default.keygen;
exports.label = hyperscript_helpers_1.default.label;
exports.legend = hyperscript_helpers_1.default.legend;
exports.li = hyperscript_helpers_1.default.li;
exports.link = hyperscript_helpers_1.default.link;
exports.main = hyperscript_helpers_1.default.main;
exports.map = hyperscript_helpers_1.default.map;
exports.mark = hyperscript_helpers_1.default.mark;
exports.menu = hyperscript_helpers_1.default.menu;
exports.meta = hyperscript_helpers_1.default.meta;
exports.nav = hyperscript_helpers_1.default.nav;
exports.noscript = hyperscript_helpers_1.default.noscript;
exports.object = hyperscript_helpers_1.default.object;
exports.ol = hyperscript_helpers_1.default.ol;
exports.optgroup = hyperscript_helpers_1.default.optgroup;
exports.option = hyperscript_helpers_1.default.option;
exports.p = hyperscript_helpers_1.default.p;
exports.param = hyperscript_helpers_1.default.param;
exports.pre = hyperscript_helpers_1.default.pre;
exports.progress = hyperscript_helpers_1.default.progress;
exports.q = hyperscript_helpers_1.default.q;
exports.rp = hyperscript_helpers_1.default.rp;
exports.rt = hyperscript_helpers_1.default.rt;
exports.ruby = hyperscript_helpers_1.default.ruby;
exports.s = hyperscript_helpers_1.default.s;
exports.samp = hyperscript_helpers_1.default.samp;
exports.script = hyperscript_helpers_1.default.script;
exports.section = hyperscript_helpers_1.default.section;
exports.select = hyperscript_helpers_1.default.select;
exports.small = hyperscript_helpers_1.default.small;
exports.source = hyperscript_helpers_1.default.source;
exports.span = hyperscript_helpers_1.default.span;
exports.strong = hyperscript_helpers_1.default.strong;
exports.style = hyperscript_helpers_1.default.style;
exports.sub = hyperscript_helpers_1.default.sub;
exports.sup = hyperscript_helpers_1.default.sup;
exports.table = hyperscript_helpers_1.default.table;
exports.tbody = hyperscript_helpers_1.default.tbody;
exports.td = hyperscript_helpers_1.default.td;
exports.textarea = hyperscript_helpers_1.default.textarea;
exports.tfoot = hyperscript_helpers_1.default.tfoot;
exports.th = hyperscript_helpers_1.default.th;
exports.thead = hyperscript_helpers_1.default.thead;
exports.title = hyperscript_helpers_1.default.title;
exports.tr = hyperscript_helpers_1.default.tr;
exports.u = hyperscript_helpers_1.default.u;
exports.ul = hyperscript_helpers_1.default.ul;
exports.video = hyperscript_helpers_1.default.video;
//# sourceMappingURL=index.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var counter = 0;
function getScope() {
    return "cs-ui" + ++counter;
}
exports.getScope = getScope;
function capitalize(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : string;
}
exports.capitalize = capitalize;
function patchClassList(target, classes, classesToAdd) {
    var className = "";
    if (target.data) {
        var props = target.data.props ? target.data.props : { className: target.sel.split(".").join(" ") };
        var classList = props.className.split(" ");
        classList.forEach(function (item) {
            if (classes.indexOf(item) === -1) {
                className += item + " ";
            }
        });
    }
    className += classesToAdd;
    return Object.assign({}, target.data, {
        "props": {
            className: className
        }
    });
}
exports.patchClassList = patchClassList;
/**
 * Adds one VNode to another and handles updates for stream by replacing based on the identifier class.
 * @param  {VNode}  element    The element to be added.
 * @param  {VNode}  target     The target for the element
 * @param  {string} identifier The identifying class for the element to be added.
 * @return {Array} The target element's children with the element added.
 */
function addElement(element, target, identifier) {
    var c = [];
    if (target.children) {
        c = target.children;
    }
    if (target.text) {
        c.push(target.text);
    }
    for (var i = 0; i < c.length; i++) {
        var child = c[i];
        var cProps = child.data ? child.data.props ? child.data.props : {} : {};
        if (typeof (child) !== "undefined" && typeof (cProps.className) !== "undefined") {
            var classList = child.data.props.className.split(" ");
            for (var _i = 0, classList_1 = classList; _i < classList_1.length; _i++) {
                var s = classList_1[_i];
                if (s === identifier) {
                    c.splice(i, 1);
                }
            }
        }
    }
    c.push(element);
    return c;
}
exports.addElement = addElement;
/**
 * Converts a natural number between 1-16 to text.
 * @param  {number} num The number to convert.
 * @return {string}     That number as text.
 */
function numToText(num) {
    switch (num) {
        case 1: return " one";
        case 2: return " two";
        case 3: return " three";
        case 4: return " four";
        case 5: return " five";
        case 6: return " six";
        case 7: return " seven";
        case 8: return " eight";
        case 9: return " nine";
        case 10: return " ten";
        case 11: return " eleven";
        case 12: return " twelve";
        case 13: return " thirteen";
        case 14: return " fourteen";
        case 15: return " fifteen";
        case 16: return " sixteen";
        default: return " one";
    }
}
exports.numToText = numToText;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(56));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(2);
__export(__webpack_require__(207));
var Size;
(function (Size) {
    Size[Size["Mini"] = 0] = "Mini";
    Size[Size["Tiny"] = 1] = "Tiny";
    Size[Size["Small"] = 2] = "Small";
    Size[Size["Medium"] = 3] = "Medium";
    Size[Size["Large"] = 4] = "Large";
    Size[Size["Big"] = 5] = "Big";
    Size[Size["Huge"] = 6] = "Huge";
    Size[Size["Massive"] = 7] = "Massive";
    Size[Size["Fluid"] = 8] = "Fluid";
})(Size = exports.Size || (exports.Size = {}));
(function (Size) {
    function ToEnum(sizeOrString) {
        return typeof (sizeOrString) === "number"
            ? sizeOrString
            : Size[utils_1.capitalize(sizeOrString)];
    }
    Size.ToEnum = ToEnum;
    function ToClassname(size) {
        size = ToEnum(size);
        switch (size) {
            case Size.Mini: return " mini";
            case Size.Tiny: return " tiny";
            case Size.Small: return " small";
            case Size.Medium: return " medium";
            case Size.Large: return " large";
            case Size.Big: return " big";
            case Size.Huge: return " huge";
            case Size.Massive: return " massive";
            case Size.Fluid: return " fluid";
            default: return "";
        }
    }
    Size.ToClassname = ToClassname;
})(Size = exports.Size || (exports.Size = {}));
var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
    VerticalAlignment[VerticalAlignment["Middle"] = 1] = "Middle";
    VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
})(VerticalAlignment = exports.VerticalAlignment || (exports.VerticalAlignment = {}));
(function (VerticalAlignment) {
    function ToEnum(vAlignmentOrString) {
        return typeof (vAlignmentOrString) === "number"
            ? vAlignmentOrString
            : VerticalAlignment[utils_1.capitalize(vAlignmentOrString)];
    }
    VerticalAlignment.ToEnum = ToEnum;
    function ToClassname(alignment) {
        alignment = VerticalAlignment.ToEnum(alignment);
        switch (alignment) {
            case VerticalAlignment.Top: return " top aligned";
            case VerticalAlignment.Middle: return " middle aligned";
            case VerticalAlignment.Bottom: return " bottom aligned";
            default: return "";
        }
    }
    VerticalAlignment.ToClassname = ToClassname;
})(VerticalAlignment = exports.VerticalAlignment || (exports.VerticalAlignment = {}));
var TextAlignment;
(function (TextAlignment) {
    TextAlignment[TextAlignment["Left"] = 0] = "Left";
    TextAlignment[TextAlignment["Right"] = 1] = "Right";
    TextAlignment[TextAlignment["Center"] = 2] = "Center";
    TextAlignment[TextAlignment["Justified"] = 3] = "Justified";
})(TextAlignment = exports.TextAlignment || (exports.TextAlignment = {}));
(function (TextAlignment) {
    function ToEnum(tAlignmentOrString) {
        return typeof (tAlignmentOrString) === "number"
            ? tAlignmentOrString
            : TextAlignment[utils_1.capitalize(tAlignmentOrString)];
    }
    TextAlignment.ToEnum = ToEnum;
    function ToClassname(alignment) {
        alignment = TextAlignment.ToEnum(alignment);
        switch (alignment) {
            case TextAlignment.Left: return " left aligned";
            case TextAlignment.Right: return " right aligned";
            case TextAlignment.Center: return " center aligned";
            case TextAlignment.Justified: return " justified";
            default: return "";
        }
    }
    TextAlignment.ToClassname = ToClassname;
})(TextAlignment = exports.TextAlignment || (exports.TextAlignment = {}));
var Float;
(function (Float) {
    Float[Float["None"] = 0] = "None";
    Float[Float["Right"] = 1] = "Right";
    Float[Float["Left"] = 2] = "Left";
})(Float = exports.Float || (exports.Float = {}));
(function (Float) {
    function ToEnum(floatOrString) {
        return typeof (floatOrString) === "number"
            ? floatOrString
            : Float[utils_1.capitalize(floatOrString)];
    }
    Float.ToEnum = ToEnum;
    function ToClassname(float) {
        float = Float.ToEnum(float);
        switch (float) {
            case Float.Left: return " left floated";
            case Float.Right: return " right floated";
            default: return "";
        }
    }
    Float.ToClassname = ToClassname;
})(Float = exports.Float || (exports.Float = {}));
var Attachment;
(function (Attachment) {
    Attachment[Attachment["None"] = 0] = "None";
    Attachment[Attachment["Top"] = 1] = "Top";
    Attachment[Attachment["Bottom"] = 2] = "Bottom";
})(Attachment = exports.Attachment || (exports.Attachment = {}));
(function (Attachment) {
    function ToEnum(attachmentOrString) {
        return typeof (attachmentOrString) === "number"
            ? attachmentOrString
            : Attachment[utils_1.capitalize(attachmentOrString)];
    }
    Attachment.ToEnum = ToEnum;
    function ToClassname(attachment) {
        attachment = Attachment.ToEnum(attachment);
        switch (attachment) {
            case Attachment.None: return " attached";
            case Attachment.Top: return " top attached";
            case Attachment.Bottom: return " bottom attached";
            default: return "";
        }
    }
    Attachment.ToClassname = ToClassname;
})(Attachment = exports.Attachment || (exports.Attachment = {}));
var Color;
(function (Color) {
    Color[Color["None"] = 0] = "None";
    Color[Color["Primary"] = 1] = "Primary";
    Color[Color["Secondary"] = 2] = "Secondary";
    Color[Color["Success"] = 3] = "Success";
    Color[Color["Info"] = 4] = "Info";
    Color[Color["Warning"] = 5] = "Warning";
    Color[Color["Error"] = 6] = "Error";
})(Color = exports.Color || (exports.Color = {}));
(function (Color) {
    function ToEnum(colorOrString) {
        return typeof (colorOrString) === "number"
            ? colorOrString
            : Color[utils_1.capitalize(colorOrString)];
    }
    Color.ToEnum = ToEnum;
    function ToClassname(color) {
        color = Color.ToEnum(color);
        switch (color) {
            case Color.Primary: return " primaryColored";
            case Color.Secondary: return " secondaryColored";
            case Color.Success: return " successColored";
            case Color.Info: return " infoColored";
            case Color.Warning: return " warningColored";
            case Color.Error: return " errorColored ";
            default: return "";
        }
    }
    Color.ToClassname = ToClassname;
})(Color = exports.Color || (exports.Color = {}));
var Animation;
(function (Animation) {
    Animation[Animation["Browse"] = 0] = "Browse";
    Animation[Animation["Drop"] = 1] = "Drop";
    Animation[Animation["Fade"] = 2] = "Fade";
    Animation[Animation["Flip"] = 3] = "Flip";
    Animation[Animation["Scale"] = 4] = "Scale";
    Animation[Animation["Fly"] = 5] = "Fly";
    Animation[Animation["Slide"] = 6] = "Slide";
    Animation[Animation["Swing"] = 7] = "Swing";
    Animation[Animation["Flash"] = 8] = "Flash";
    Animation[Animation["Shake"] = 9] = "Shake";
    Animation[Animation["Bounce"] = 10] = "Bounce";
    Animation[Animation["Tada"] = 11] = "Tada";
    Animation[Animation["Pulse"] = 12] = "Pulse";
    Animation[Animation["Jiggle"] = 13] = "Jiggle";
    Animation[Animation["None"] = 14] = "None";
})(Animation = exports.Animation || (exports.Animation = {}));
(function (Animation) {
    function ToEnum(animationOrString) {
        return typeof (animationOrString) === "number"
            ? animationOrString
            : Animation[utils_1.capitalize(animationOrString)];
    }
    Animation.ToEnum = ToEnum;
    function ToClassname(anim) {
        anim = Animation.ToEnum(anim);
        switch (anim) {
            case Animation.Browse: return " browse";
            case Animation.Drop: return " drop";
            case Animation.Fade: return " fade";
            case Animation.Flip: return " flip";
            case Animation.Scale: return " scale";
            case Animation.Fly: return " fly";
            case Animation.Slide: return " slide";
            case Animation.Swing: return " swing";
            case Animation.Flash: return " flash";
            case Animation.Shake: return " shake";
            case Animation.Bounce: return " bounce";
            case Animation.Tada: return " tada";
            case Animation.Pulse: return " pulse";
            case Animation.Jiggle: return " jiggle";
        }
    }
    Animation.ToClassname = ToClassname;
    var staticAnimations = [Animation.Flash, Animation.Shake,
        Animation.Bounce, Animation.Tada, Animation.Pulse, Animation.Jiggle];
    function isStatic(anim) {
        return staticAnimations.indexOf(Animation.ToEnum(anim)) !== -1;
    }
    Animation.isStatic = isStatic;
    var directionAnimations = [Animation.Browse, Animation.Fade,
        Animation.Fly, Animation.Slide, Animation.Swing];
    function isDirectional(anim) {
        return directionAnimations.indexOf(Animation.ToEnum(anim)) !== -1;
    }
    Animation.isDirectional = isDirectional;
})(Animation = exports.Animation || (exports.Animation = {}));
var Direction;
(function (Direction) {
    Direction[Direction["In"] = 0] = "In";
    Direction[Direction["Out"] = 1] = "Out";
    Direction[Direction["None"] = 2] = "None";
})(Direction = exports.Direction || (exports.Direction = {}));
(function (Direction) {
    function ToEnum(directionOrString) {
        return typeof (directionOrString) === "number"
            ? directionOrString
            : Direction[utils_1.capitalize(directionOrString)];
    }
    Direction.ToEnum = ToEnum;
    function ToClassname(direction) {
        direction = Direction.ToEnum(direction);
        return direction === Direction.In ? " in" : " out";
    }
    Direction.ToClassname = ToClassname;
})(Direction = exports.Direction || (exports.Direction = {}));
var AnimationDirection;
(function (AnimationDirection) {
    AnimationDirection[AnimationDirection["Up"] = 0] = "Up";
    AnimationDirection[AnimationDirection["Down"] = 1] = "Down";
    AnimationDirection[AnimationDirection["Left"] = 2] = "Left";
    AnimationDirection[AnimationDirection["Right"] = 3] = "Right";
})(AnimationDirection = exports.AnimationDirection || (exports.AnimationDirection = {}));
(function (AnimationDirection) {
    function ToEnum(animationDirectionOrString) {
        return typeof (animationDirectionOrString) === "number"
            ? animationDirectionOrString
            : AnimationDirection[utils_1.capitalize(animationDirectionOrString)];
    }
    AnimationDirection.ToEnum = ToEnum;
    function ToClassname(dir) {
        dir = AnimationDirection.ToEnum(dir);
        switch (dir) {
            case AnimationDirection.Up: return " up";
            case AnimationDirection.Down: return " down";
            case AnimationDirection.Left: return " left";
            case AnimationDirection.Right: return " right";
            default: return "";
        }
    }
    AnimationDirection.ToClassname = ToClassname;
})(AnimationDirection = exports.AnimationDirection || (exports.AnimationDirection = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(8);
//Common render function for all basic Components
//Reformats the various syntaxes into StyleAndContentArgs 
function renderPropsAndContent(renderFn, isArgs, isB, arg1, arg2) {
    if (isArgs(arg1)) {
        return renderFn(arg1);
    }
    var args = {};
    if (isB(arg1)) {
        args.props = {};
        args.content = arg1;
    }
    else {
        args.props = arg1 || {};
        args.content = arg2;
    }
    return renderFn(args);
}
exports.renderPropsAndContent = renderPropsAndContent;
//Common run function for all basic Components
//Isolates the rendered component and exposes events
function runPropsAndContent(sources, render, selector, scope) {
    function main(sources) {
        sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
        sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of(undefined);
        var vTree$ = xstream_1.default.combine(sources.props$, sources.content$)
            .map(function (_a) {
            var props = _a[0], content = _a[1];
            return render({ props: props, content: content });
        });
        return {
            DOM: vTree$,
            events: function (type) { return sources.DOM.select(selector).events(type); },
        };
    }
    if (scope === null) {
        return main(sources);
    }
    var isolatedMain = isolate_1.default(main, scope);
    return isolatedMain(sources);
}
exports.runPropsAndContent = runPropsAndContent;
function makeIsArgs(isB) {
    return (function (obj) { return isArgs(obj, isB); });
}
exports.makeIsArgs = makeIsArgs;
function isArgs(obj, isB) {
    return obj && (typeof (obj.props) !== "undefined" ||
        (typeof (obj.content) !== "undefined" && (isB(obj.content) || isB(obj.content.main))));
}
exports.isArgs = isArgs;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(217));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(177));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function checkIsolateArgs(dataflowComponent, scope) {
    if (typeof dataflowComponent !== "function") {
        throw new Error("First argument given to isolate() must be a " +
            "'dataflowComponent' function");
    }
    if (scope === null) {
        throw new Error("Second argument given to isolate() must not be null");
    }
}
function normalizeScopes(sources, scopes, randomScope) {
    var perChannel = {};
    Object.keys(sources).forEach(function (channel) {
        if (typeof scopes === 'string') {
            perChannel[channel] = scopes;
            return;
        }
        var candidate = scopes[channel];
        if (typeof candidate !== 'undefined') {
            perChannel[channel] = candidate;
            return;
        }
        var wildcard = scopes['*'];
        if (typeof wildcard !== 'undefined') {
            perChannel[channel] = wildcard;
            return;
        }
        perChannel[channel] = randomScope;
    });
    return perChannel;
}
function isolateAllSources(outerSources, scopes) {
    var innerSources = {};
    for (var channel in outerSources) {
        var outerSource = outerSources[channel];
        if (outerSources.hasOwnProperty(channel)
            && outerSource
            && typeof outerSource.isolateSource === 'function') {
            innerSources[channel] = outerSource.isolateSource(outerSource, scopes[channel]);
        }
        else if (outerSources.hasOwnProperty(channel)) {
            innerSources[channel] = outerSources[channel];
        }
    }
    return innerSources;
}
function isolateAllSinks(sources, innerSinks, scopes) {
    var outerSinks = {};
    for (var channel in innerSinks) {
        var source = sources[channel];
        var innerSink = innerSinks[channel];
        if (innerSinks.hasOwnProperty(channel)
            && source
            && typeof source.isolateSink === 'function') {
            outerSinks[channel] = source.isolateSink(innerSink, scopes[channel]);
        }
        else if (innerSinks.hasOwnProperty(channel)) {
            outerSinks[channel] = innerSinks[channel];
        }
    }
    return outerSinks;
}
var counter = 0;
function newScope() {
    return "cycle" + ++counter;
}
/**
 * Takes a `component` function and an optional `scope` string, and returns a
 * scoped version of the `component` function.
 *
 * When the scoped component is invoked, each source provided to the scoped
 * component is isolated to the given `scope` using
 * `source.isolateSource(source, scope)`, if possible. Likewise, the sinks
 * returned from the scoped component are isolated to the `scope` using
 * `source.isolateSink(sink, scope)`.
 *
 * If the `scope` is not provided, a new scope will be automatically created.
 * This means that while **`isolate(component, scope)` is pure**
 * (referentially transparent), **`isolate(component)` is impure**
 * (not referentially transparent). Two calls to `isolate(Foo, bar)` will
 * generate the same component. But, two calls to `isolate(Foo)` will generate
 * two distinct components.
 *
 * Note that both `isolateSource()` and `isolateSink()` are static members of
 * `source`. The reason for this is that drivers produce `source` while the
 * application produces `sink`, and it's the driver's responsibility to
 * implement `isolateSource()` and `isolateSink()`.
 *
 * @param {Function} component a function that takes `sources` as input
 * and outputs a collection of `sinks`.
 * @param {String} scope an optional string that is used to isolate each
 * `sources` and `sinks` when the returned scoped component is invoked.
 * @return {Function} the scoped component function that, as the original
 * `component` function, takes `sources` and returns `sinks`.
 * @function isolate
 */
function isolate(component, scope) {
    if (scope === void 0) { scope = newScope(); }
    checkIsolateArgs(component, scope);
    var randomScope = typeof scope === 'object' ? newScope() : '';
    var scopes = typeof scope === 'string' || typeof scope === 'object' ?
        scope :
        scope.toString();
    return function wrappedComponent(outerSources) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var scopesPerChannel = normalizeScopes(outerSources, scopes, randomScope);
        var innerSources = isolateAllSources(outerSources, scopesPerChannel);
        var innerSinks = component.apply(void 0, [innerSources].concat(rest));
        var outerSinks = isolateAllSinks(outerSources, innerSinks, scopesPerChannel);
        return outerSinks;
    };
}
isolate.reset = function () { return counter = 0; };
exports.default = isolate;
//# sourceMappingURL=index.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(29)
  , normalizeOpts = __webpack_require__(98)
  , isCallable    = __webpack_require__(92)
  , contains      = __webpack_require__(45)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(1);
var enums_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(2);
var Transition;
(function (Transition) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        function main(sources) {
            var evt = function (type) { return sources.DOM.select(".transition").events(type); };
            var animationEnd$ = evt("animationend").map(function (evt) { return ({
                animation: enums_1.Animation.None,
                direction: evt.currentTarget.classList.contains("out") ? enums_1.Direction.Out : enums_1.Direction.In
            }); });
            var animation$ = xstream_1.default.merge(sources.transition$, animationEnd$);
            var vTree$ = xstream_1.default.combine(animation$, sources.target$).map(function (_a) {
                var transition = _a[0], target = _a[1];
                return render(target, transition);
            });
            return {
                DOM: vTree$,
                events: evt
            };
        }
        if (scope === null) {
            return main(sources);
        }
        var isolatedMain = isolate_1.default(main, scope);
        return isolatedMain(sources);
    }
    Transition.run = run;
    function render(target, args) {
        if (args === void 0) { args = { animation: enums_1.Animation.None }; }
        var c;
        var data = utils_1.patchClassList(target, ["hidden", "visible", "animating", "transition"], getClassName(args));
        if (target.children) {
            c = target.children;
        }
        if (target.text) {
            c = target.text;
        }
        return dom_1.h(target.sel, data, c);
    }
    Transition.render = render;
    function getClassName(transition) {
        if (transition.animation === enums_1.Animation.None) {
            return transition.direction === enums_1.Direction.Out ? "transition hidden" : "transition visible";
        }
        var animation = enums_1.Animation.ToClassname(transition.animation);
        if (enums_1.Animation.isStatic(transition.animation)) {
            return "visible animating transition " + animation;
        }
        var direction = enums_1.Direction.ToClassname(transition.direction);
        if (enums_1.Animation.isDirectional(transition.animation)) {
            animation += enums_1.AnimationDirection.ToClassname(transition.animationDirection);
        }
        return "visible transition animating " + direction + animation;
    }
})(Transition = exports.Transition || (exports.Transition = {}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var adaptStream = function (x) { return x; };
function setAdapt(f) {
    adaptStream = f;
}
exports.setAdapt = setAdapt;
function adapt(stream) {
    return adaptStream(stream);
}
exports.adapt = adapt;
//# sourceMappingURL=adapt.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isElement(obj) {
    var ELEM_TYPE = 1;
    var FRAG_TYPE = 11;
    return typeof HTMLElement === 'object' ?
        obj instanceof HTMLElement || obj instanceof DocumentFragment :
        obj && typeof obj === 'object' && obj !== null &&
            (obj.nodeType === ELEM_TYPE || obj.nodeType === FRAG_TYPE) &&
            typeof obj.nodeName === 'string';
}
function isClassOrId(str) {
    return str.length > 1 && (str[0] === '.' || str[0] === '#');
}
exports.isClassOrId = isClassOrId;
exports.SCOPE_PREFIX = '$$CYCLEDOM$$-';
function getElement(selectors) {
    var domElement = typeof selectors === 'string' ?
        document.querySelector(selectors) :
        selectors;
    if (typeof selectors === 'string' && domElement === null) {
        throw new Error("Cannot render into unknown element `" + selectors + "`");
    }
    else if (!isElement(domElement)) {
        throw new Error('Given container is not a DOM element neither a ' +
            'selector string.');
    }
    return domElement;
}
exports.getElement = getElement;
/**
 * The full scope of a namespace is the "absolute path" of scopes from
 * parent to child. This is extracted from the namespace, filter only for
 * scopes in the namespace.
 */
function getFullScope(namespace) {
    return namespace
        .filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) > -1; })
        .map(function (c) { return c.replace(exports.SCOPE_PREFIX, ''); })
        .join('-');
}
exports.getFullScope = getFullScope;
function getSelectors(namespace) {
    return namespace.filter(function (c) { return c.indexOf(exports.SCOPE_PREFIX) === -1; }).join(' ');
}
exports.getSelectors = getSelectors;
//# sourceMappingURL=utils.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(112)() ? Symbol : __webpack_require__(114);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
};

var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
};

var stripPrefix = exports.stripPrefix = function stripPrefix(path, prefix) {
  return path.indexOf(prefix) === 0 ? path.substr(prefix.length) : path;
};

var parsePath = exports.parsePath = function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
};

var createPath = exports.createPath = function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;


  var path = pathname || '/';

  if (search && search !== '?') path += search.charAt(0) === '?' ? search : '?' + search;

  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : '#' + hash;

  return path;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var vnode_1 = __webpack_require__(24);
var is = __webpack_require__(54);
function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {}, children, text, i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = c;
        }
        else if (c && c.sel) {
            children = [c];
        }
    }
    else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = b;
        }
        else if (b && b.sel) {
            children = [b];
        }
        else {
            data = b;
        }
    }
    if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i]))
                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i]);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return vnode_1.vnode(sel, data, children, text, undefined);
}
exports.h = h;
;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = h;
//# sourceMappingURL=h.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Icon;
(function (Icon) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, icon, ".icon", scope);
    }
    Icon.run = run;
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(icon, common_1.makeIsArgs(isIconType), isIconType, arg1, arg2);
    }
    Icon.render = render;
    function icon(args) {
        var props = args.props ? args.props : {};
        var content = typeof (args.content) !== "undefined" ? isIconType(args.content) ? args.content : args.content.main : -1;
        var className = getClassname(props, content).substring(1);
        return className !== "icon" ? dom_1.i({ props: { className: className } }) : undefined;
    }
    function getClassname(props, content) {
        var className = "";
        if (props.button) {
            className += " button";
        }
        if (props.bordered) {
            className += " bordered";
        }
        if (props.circular) {
            className += " circular";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.loading) {
            className += " loading";
        }
        if (props.fitted) {
            className += " fitted";
        }
        if (props.link) {
            className += " link";
        }
        if (props.flipped) {
            className += " flipped";
        }
        if (props.rotated) {
            className += " rotated";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += enums_1.IconType.ToClassname(content);
        return className + " icon";
    }
    function isIconType(obj) {
        return typeof (obj) === "string" || typeof (obj) === "number";
    }
})(Icon = exports.Icon || (exports.Icon = {}));


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(43)()
	? Object.setPrototypeOf
	: __webpack_require__(44);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.locationsAreEqual = exports.createLocation = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _resolvePathname = __webpack_require__(126);

var _resolvePathname2 = _interopRequireDefault(_resolvePathname);

var _valueEqual = __webpack_require__(220);

var _valueEqual2 = _interopRequireDefault(_valueEqual);

var _PathUtils = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
  var location = void 0;
  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = (0, _PathUtils.parsePath)(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);

    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
    }
  }

  return location;
};

var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property. The iteratee is invoked with three
 * arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forOwnRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forOwn(object, iteratee) {
  return object && baseForOwn(object, typeof iteratee == 'function' ? iteratee : identity);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = forOwn;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.vnode = vnode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = vnode;
//# sourceMappingURL=vnode.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
function fromEvent(element, eventName, useCapture) {
    if (useCapture === void 0) { useCapture = false; }
    return xstream_1.Stream.create({
        element: element,
        next: null,
        start: function start(listener) {
            this.next = function next(event) { listener.next(event); };
            this.element.addEventListener(eventName, this.next, useCapture);
        },
        stop: function stop() {
            this.element.removeEventListener(eventName, this.next, useCapture);
        },
    });
}
exports.fromEvent = fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var history_1 = __webpack_require__(120);
var createHistory_1 = __webpack_require__(75);
function makeHistoryDriver(options) {
    var history = history_1.createBrowserHistory(options);
    return function historyDriver(sink$) {
        return createHistory_1.createHistory$(history, sink$);
    };
}
exports.makeHistoryDriver = makeHistoryDriver;
function makeServerHistoryDriver(options) {
    var history = history_1.createMemoryHistory(options);
    return function serverHistoryDriver(sink$) {
        return createHistory_1.createHistory$(history, sink$);
    };
}
exports.makeServerHistoryDriver = makeServerHistoryDriver;
function makeHashHistoryDriver(options) {
    var history = history_1.createHashHistory(options);
    return function hashHistoryDriver(sink$) {
        return createHistory_1.createHistory$(history, sink$);
    };
}
exports.makeHashHistoryDriver = makeHashHistoryDriver;
//# sourceMappingURL=drivers.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

  , id = toString.call((function () { return arguments; }()));

module.exports = function (x) { return (toString.call(x) === id); };


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(87)()
	? Object.assign
	: __webpack_require__(88);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

  , id = toString.call('');

module.exports = function (x) {
	return (typeof x === 'string') || (x && (typeof x === 'object') &&
		((x instanceof String) || (toString.call(x) === id))) || false;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear    = __webpack_require__(42)
  , assign   = __webpack_require__(29)
  , callable = __webpack_require__(11)
  , value    = __webpack_require__(9)
  , d        = __webpack_require__(10)
  , autoBind = __webpack_require__(79)
  , Symbol   = __webpack_require__(16)

  , defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) return new Iterator(list, context);
	defineProperties(this, {
		__list__: d('w', value(list)),
		__context__: d('w', context),
		__nextIndex__: d('w', 0)
	});
	if (!context) return;
	callable(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties(Iterator.prototype, assign({
	constructor: d(Iterator),
	_next: d(function () {
		var i;
		if (!this.__list__) return;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
	}),
	next: d(function () { return this._createResult(this._next()); }),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) { return this.__list__[i]; }),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () { return '[object Iterator]'; })
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, '__redo__', d('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) this.__redo__[i] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
	return this;
}));
defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _warning = __webpack_require__(25);

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTransitionManager = function createTransitionManager() {
  var prompt = null;

  var setPrompt = function setPrompt(nextPrompt) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time') : void 0;

    prompt = nextPrompt;

    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  };

  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : void 0;

          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  };

  var listeners = [];

  var appendListener = function appendListener(fn) {
    var isActive = true;

    var listener = function listener() {
      if (isActive) fn.apply(undefined, arguments);
    };

    listeners.push(listener);

    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  };

  var notifyListeners = function notifyListeners() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(undefined, args);
    });
  };

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
};

exports.default = createTransitionManager;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match HTML entities and HTML characters. */
var reUnescapedHtml = /[&<>"'`]/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/** Used to map characters to HTML entities. */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
var escapeHtmlChar = basePropertyOf(htmlEscapes);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
 * their corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * Backticks are escaped because in IE < 9, they can break out of
 * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
 * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
 * [#133](https://html5sec.org/#133) of the
 * [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  string = toString(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = escape;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var isolate_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(1);
var xstream_1 = __webpack_require__(0);
var Menu;
(function (Menu) {
    function render(arg1, arg2) {
        if (arg2 === void 0) { arg2 = []; }
        return common_1.renderPropsAndContent(menu, common_1.makeIsArgs(isContent), isContent, arg1, arg2);
    }
    Menu.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        function main(sources) {
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of([]);
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            var click$ = sources.DOM.select(".menu > .item").events("click");
            var items$ = sources.content$.map(function (c) { return isContent(c) ? c : c.main; }).remember();
            var clickedId$ = click$.map(function (ev) { return parseInt(ev.currentTarget.id); })
                .filter(function (n) { return !isNaN(n) && typeof (n) !== "undefined"; });
            var clickedItem$ = items$.map(function (items) { return clickedId$.map(function (id) { return items[id]; }); }).flatten()
                .filter(function (item) { return !item.disabled; });
            var vtree$ = xstream_1.default.combine(sources.props$, items$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return menu({ props: props, content: content });
            });
            return {
                DOM: vtree$,
                events: function (type) { return sources.DOM.select(".menu").events(type); },
                value$: clickedItem$
            };
        }
        if (scope === null) {
            return main(sources);
        }
        var isolatedMain = isolate_1.default(main, scope);
        return isolatedMain(sources);
    }
    Menu.run = run;
    function menu(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? isContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: getClassname(props, content.length) } }, content.map(renderItem));
    }
    function getClassname(props, length) {
        var className = "ui";
        if (props.secondary) {
            className += " secondary";
        }
        if (props.fluid) {
            className += " fluid";
        }
        if (props.right) {
            className += " right";
        }
        if (props.pointing) {
            className += " pointing";
        }
        if (props.tabular) {
            className += " tabular";
        }
        if (props.text) {
            className += " text";
        }
        if (props.vertical) {
            className += " vertical";
        }
        if (props.pagination) {
            className += " pagination";
        }
        if (props.fixed) {
            className += " fixed";
        }
        if (props.stackable) {
            className += " stackable";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.icon) {
            className += " icon";
        }
        if (props.labeledIcons) {
            className += " labeled icon";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.borderless) {
            className += " borderless";
        }
        if (props.equalWidth) {
            className += utils_1.numToText(length) + " item";
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        className += " menu";
        if (props.submenu) {
            className = className.substring(3);
        }
        return className;
    }
    function getItemClassname(item) {
        var className = "";
        if (item.active) {
            className += " active";
        }
        if (item.header) {
            className += " header";
        }
        if (item.fitted) {
            className += " fitted";
        }
        if (item.verticallyFitted) {
            className += " vertically fitted";
        }
        if (item.horizontallyFitted) {
            className += " horizontally fitted";
        }
        if (item.link) {
            className += " link";
        }
        if (item.icon) {
            className += " icon";
        }
        if (item.disabled) {
            className += " disabled";
        }
        if (typeof (item.float) !== "undefined") {
            className += enums_1.Float.ToClassname(item.float);
        }
        if (typeof (item.color) !== "undefined") {
            className += enums_1.Color.ToClassname(item.color);
        }
        className += " item";
        className = className.substring(1);
        return className;
    }
    function renderItem(item, id) {
        if (item.divider) {
            return dom_1.div({ props: { className: "divider" } });
        }
        if (item.headerOnly) {
            return dom_1.div({ props: { className: "header" } }, item.main);
        }
        if (item.rightMenu) {
            return dom_1.div({ props: { className: "right menu" } }, item.main.map(renderItem));
        }
        if (item.dropdown) {
            var content = item.main;
            content.data.props.className += " " + getItemClassname(item);
            return content;
        }
        if (item.href) {
            return dom_1.a({ props: { className: getItemClassname(item), id: id, href: item.href } }, item.main);
        }
        return dom_1.div({ props: { className: getItemClassname(item), id: id } }, item.main);
    }
    function isContent(obj) {
        return obj instanceof Array && (obj.length === 0 ||
            typeof (obj[0].main) !== "undefined" ||
            typeof (obj[0].divider) !== "undefined" ||
            typeof (obj[0].headerOnly) !== "undefined");
    }
})(Menu = exports.Menu || (exports.Menu = {}));


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isolate_1 = __webpack_require__(8);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var transition_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(2);
var enums_1 = __webpack_require__(4);
var types_1 = __webpack_require__(6);
var Dimmer;
(function (Dimmer) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        function main(sources) {
            var evt = function (type) { return sources.DOM.select(".dimmable").events(type); };
            var props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            var content$ = sources.content$ ? sources.content$.map(function (c) { return types_1.isDOMContent(c) ? c : c.main; }) : xstream_1.default.of([]);
            /*** Create animation$ ***/
            var on$ = sources.args && sources.args.on$ ? sources.args.on$.remember() : onHover(evt);
            var target$ = sources.args && sources.args.target$ ? sources.args.target$.remember() : xstream_1.default.of("page");
            var transition$ = on$
                .fold(function (prevAnim, active) { return prevAnim.direction === enums_1.Direction.None
                ? ({ animation: enums_1.Animation.None, direction: active ? enums_1.Direction.In : enums_1.Direction.Out })
                : {
                    animation: enums_1.Animation.Fade, direction: active ? enums_1.Direction.In : enums_1.Direction.Out
                }; }, ({ animation: enums_1.Animation.None, direction: enums_1.Direction.None }));
            /*** Animate content ***/
            var children$ = xstream_1.default.combine(content$, props$, target$)
                .map(function (_a) {
                var content = _a[0], props = _a[1], target = _a[2];
                return dimmer(content, props, target);
            });
            var animatedContent = transition_1.Transition.run({ DOM: sources.DOM, transition$: transition$, target$: children$ }, scope);
            /*** Render view ***/
            var vTree$ = xstream_1.default.combine(target$, animatedContent.DOM, on$)
                .map(function (_a) {
                var target = _a[0], content = _a[1], active = _a[2];
                return dimElement(target, content, active);
            });
            return {
                DOM: vTree$,
                events: function (type) { return xstream_1.default.merge(sources.DOM.select(".dimmer").events(type), animatedContent.events(type)); }
            };
        }
        if (scope === null) {
            return main(sources);
        }
        var isolatedMain = isolate_1.default(main, scope);
        return isolatedMain(sources);
    }
    Dimmer.run = run;
    function dimmer(content, props, target) {
        if (target === void 0) { target = "page"; }
        return target === "page"
            ? dom_1.div({ props: { className: "ui " + (props.inverted ? "inverted " : "") + "dimmer modals page dimmer" } }, content)
            : dom_1.div({ props: { className: "ui " + (props.inverted ? "inverted " : "") + "targetted dimmer" } }, [
                dom_1.div({ props: { className: "content" } }, [
                    dom_1.div({ props: { className: "center" } }, content)
                ])
            ]);
    }
    function dimElement(targetOrString, content, active) {
        var isPage = typeof (targetOrString) === "string";
        var target = isPage ? content : targetOrString;
        var className = isPage ? "" : "dimmable", c;
        if (active) {
            className += isPage ? "active" : " dimmed";
        }
        var data = utils_1.patchClassList(target, ["dimmable", "dimmed", "inverted", "active"], className);
        if (isPage) {
            if (target.children) {
                c = target.children;
            }
            else if (target.text) {
                c = target.text;
            }
        }
        else {
            c = utils_1.addElement(content, target, "targetted");
        }
        return dom_1.h(target.sel, data, c);
    }
    function onHover(events) {
        return xstream_1.default.merge(events("mouseenter"), events("mouseleave"))
            .map(function (evt) { return evt.type === "mouseenter"; }).startWith(false);
    }
})(Dimmer = exports.Dimmer || (exports.Dimmer = {}));


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(0);
var DelayOperator = (function () {
    function DelayOperator(dt, ins) {
        this.dt = dt;
        this.ins = ins;
        this.type = 'delay';
        this.out = null;
    }
    DelayOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DelayOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
    };
    DelayOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        var id = setInterval(function () {
            u._n(t);
            clearInterval(id);
        }, this.dt);
    };
    DelayOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        var id = setInterval(function () {
            u._e(err);
            clearInterval(id);
        }, this.dt);
    };
    DelayOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        var id = setInterval(function () {
            u._c();
            clearInterval(id);
        }, this.dt);
    };
    return DelayOperator;
}());
/**
 * Delays periodic events by a given time period.
 *
 * Marble diagram:
 *
 * ```text
 * 1----2--3--4----5|
 *     delay(60)
 * ---1----2--3--4----5|
 * ```
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 * import delay from 'xstream/extra/delay'
 *
 * const stream = fromDiagram('1----2--3--4----5|')
 *  .compose(delay(60))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 1  (after 60 ms)
 * > 2  (after 160 ms)
 * > 3  (after 220 ms)
 * > 4  (after 280 ms)
 * > 5  (after 380 ms)
 * > completed
 * ```
 *
 * @param {number} period The amount of silence required in milliseconds.
 * @return {Stream}
 */
function delay(period) {
    return function delayOperator(ins) {
        return new index_1.Stream(new DelayOperator(period, ins));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = delay;
//# sourceMappingURL=delay.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(0);
var empty = {};
var DropRepeatsOperator = (function () {
    function DropRepeatsOperator(ins, fn) {
        this.ins = ins;
        this.fn = fn;
        this.type = 'dropRepeats';
        this.out = null;
        this.v = empty;
    }
    DropRepeatsOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DropRepeatsOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.v = empty;
    };
    DropRepeatsOperator.prototype.isEq = function (x, y) {
        return this.fn ? this.fn(x, y) : x === y;
    };
    DropRepeatsOperator.prototype._n = function (t) {
        var u = this.out;
        if (!u)
            return;
        var v = this.v;
        if (v !== empty && this.isEq(t, v))
            return;
        this.v = t;
        u._n(t);
    };
    DropRepeatsOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        u._e(err);
    };
    DropRepeatsOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        u._c();
    };
    return DropRepeatsOperator;
}());
exports.DropRepeatsOperator = DropRepeatsOperator;
/**
 * Drops consecutive duplicate values in a stream.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--1--1--1--2--3--4--3--3|
 *     dropRepeats
 * --1--2--1--------2--3--4--3---|
 * ```
 *
 * Example:
 *
 * ```js
 * import dropRepeats from 'xstream/extra/dropRepeats'
 *
 * const stream = xs.of(1, 2, 1, 1, 1, 2, 3, 4, 3, 3)
 *   .compose(dropRepeats())
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 1
 * > 2
 * > 1
 * > 2
 * > 3
 * > 4
 * > 3
 * > completed
 * ```
 *
 * Example with a custom isEqual function:
 *
 * ```js
 * import dropRepeats from 'xstream/extra/dropRepeats'
 *
 * const stream = xs.of('a', 'b', 'a', 'A', 'B', 'b')
 *   .compose(dropRepeats((x, y) => x.toLowerCase() === y.toLowerCase()))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > a
 * > b
 * > a
 * > B
 * > completed
 * ```
 *
 * @param {Function} isEqual An optional function of type
 * `(x: T, y: T) => boolean` that takes an event from the input stream and
 * checks if it is equal to previous event, by returning a boolean.
 * @return {Stream}
 */
function dropRepeats(isEqual) {
    if (isEqual === void 0) { isEqual = void 0; }
    return function dropRepeatsOperator(ins) {
        return new index_1.Stream(new DropRepeatsOperator(ins, isEqual));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dropRepeats;
//# sourceMappingURL=dropRepeats.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var adapt_1 = __webpack_require__(13);
var HTMLSource = (function () {
    function HTMLSource(html$, _name) {
        this._name = _name;
        this._html$ = html$;
        this._empty$ = adapt_1.adapt(xstream_1.default.empty());
    }
    HTMLSource.prototype.elements = function () {
        var out = adapt_1.adapt(this._html$);
        out._isCycleSource = this._name;
        return out;
    };
    HTMLSource.prototype.select = function (selector) {
        return new HTMLSource(xstream_1.default.empty(), this._name);
    };
    HTMLSource.prototype.events = function (eventType, options) {
        var out = this._empty$;
        out._isCycleSource = this._name;
        return out;
    };
    return HTMLSource;
}());
exports.HTMLSource = HTMLSource;
//# sourceMappingURL=HTMLSource.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var adapt_1 = __webpack_require__(13);
var DocumentDOMSource_1 = __webpack_require__(63);
var BodyDOMSource_1 = __webpack_require__(62);
var ElementFinder_1 = __webpack_require__(64);
var fromEvent_1 = __webpack_require__(26);
var isolate_1 = __webpack_require__(69);
var EventDelegator_1 = __webpack_require__(65);
var utils_1 = __webpack_require__(15);
var eventTypesThatDontBubble = [
    "blur",
    "canplay",
    "canplaythrough",
    "change",
    "durationchange",
    "emptied",
    "ended",
    "focus",
    "load",
    "loadeddata",
    "loadedmetadata",
    "mouseenter",
    "mouseleave",
    "pause",
    "play",
    "playing",
    "ratechange",
    "reset",
    "scroll",
    "seeked",
    "seeking",
    "stalled",
    "submit",
    "suspend",
    "timeupdate",
    "unload",
    "volumechange",
    "waiting",
];
function determineUseCapture(eventType, options) {
    var result = false;
    if (typeof options.useCapture === 'boolean') {
        result = options.useCapture;
    }
    if (eventTypesThatDontBubble.indexOf(eventType) !== -1) {
        result = true;
    }
    return result;
}
function filterBasedOnIsolation(domSource, fullScope) {
    return function filterBasedOnIsolationOperator(rootElement$) {
        var initialState = {
            wasIsolated: false,
            shouldPass: false,
            element: null,
        };
        return rootElement$
            .fold(function checkIfShouldPass(state, element) {
            var isIsolated = !!domSource._isolateModule.getElement(fullScope);
            var shouldPass = isIsolated && !state.wasIsolated;
            return { wasIsolated: isIsolated, shouldPass: shouldPass, element: element };
        }, initialState)
            .drop(1)
            .filter(function (s) { return s.shouldPass; })
            .map(function (s) { return s.element; });
    };
}
var MainDOMSource = (function () {
    function MainDOMSource(_rootElement$, _sanitation$, _namespace, _isolateModule, _delegators, _name) {
        if (_namespace === void 0) { _namespace = []; }
        var _this = this;
        this._rootElement$ = _rootElement$;
        this._sanitation$ = _sanitation$;
        this._namespace = _namespace;
        this._isolateModule = _isolateModule;
        this._delegators = _delegators;
        this._name = _name;
        this.isolateSource = isolate_1.isolateSource;
        this.isolateSink = function (sink, scope) {
            if (scope === ':root') {
                return sink;
            }
            else if (utils_1.isClassOrId(scope)) {
                return isolate_1.siblingIsolateSink(sink, scope);
            }
            else {
                var prevFullScope = utils_1.getFullScope(_this._namespace);
                var nextFullScope = [prevFullScope, scope].filter(function (x) { return !!x; }).join('-');
                return isolate_1.totalIsolateSink(sink, nextFullScope);
            }
        };
    }
    MainDOMSource.prototype.elements = function () {
        var output$;
        if (this._namespace.length === 0) {
            output$ = this._rootElement$;
        }
        else {
            var elementFinder_1 = new ElementFinder_1.ElementFinder(this._namespace, this._isolateModule);
            output$ = this._rootElement$.map(function (el) { return elementFinder_1.call(el); });
        }
        var out = adapt_1.adapt(output$.remember());
        out._isCycleSource = this._name;
        return out;
    };
    Object.defineProperty(MainDOMSource.prototype, "namespace", {
        get: function () {
            return this._namespace;
        },
        enumerable: true,
        configurable: true
    });
    MainDOMSource.prototype.select = function (selector) {
        if (typeof selector !== 'string') {
            throw new Error("DOM driver's select() expects the argument to be a " +
                "string as a CSS selector");
        }
        if (selector === 'document') {
            return new DocumentDOMSource_1.DocumentDOMSource(this._name);
        }
        if (selector === 'body') {
            return new BodyDOMSource_1.BodyDOMSource(this._name);
        }
        var trimmedSelector = selector.trim();
        var childNamespace = trimmedSelector === ":root" ?
            this._namespace :
            this._namespace.concat(trimmedSelector);
        return new MainDOMSource(this._rootElement$, this._sanitation$, childNamespace, this._isolateModule, this._delegators, this._name);
    };
    MainDOMSource.prototype.events = function (eventType, options) {
        if (options === void 0) { options = {}; }
        if (typeof eventType !== "string") {
            throw new Error("DOM driver's events() expects argument to be a " +
                "string representing the event type to listen for.");
        }
        var useCapture = determineUseCapture(eventType, options);
        var namespace = this._namespace;
        var fullScope = utils_1.getFullScope(namespace);
        var keyParts = [eventType, useCapture];
        if (fullScope) {
            keyParts.push(fullScope);
        }
        var key = keyParts.join('~');
        var domSource = this;
        var rootElement$;
        if (fullScope) {
            rootElement$ = this._rootElement$
                .compose(filterBasedOnIsolation(domSource, fullScope));
        }
        else {
            rootElement$ = this._rootElement$.take(2);
        }
        var event$ = rootElement$
            .map(function setupEventDelegatorOnTopElement(rootElement) {
            // Event listener just for the root element
            if (!namespace || namespace.length === 0) {
                return fromEvent_1.fromEvent(rootElement, eventType, useCapture);
            }
            // Event listener on the origin element as an EventDelegator
            var delegators = domSource._delegators;
            var origin = domSource._isolateModule.getElement(fullScope) || rootElement;
            var delegator;
            if (delegators.has(key)) {
                delegator = delegators.get(key);
                delegator.updateOrigin(origin);
            }
            else {
                delegator = new EventDelegator_1.EventDelegator(origin, eventType, useCapture, domSource._isolateModule);
                delegators.set(key, delegator);
            }
            if (fullScope) {
                domSource._isolateModule.addEventDelegator(fullScope, delegator);
            }
            var subject = delegator.createDestination(namespace);
            return subject;
        })
            .flatten();
        var out = adapt_1.adapt(event$);
        out._isCycleSource = domSource._name;
        return out;
    };
    MainDOMSource.prototype.dispose = function () {
        this._sanitation$.shamefullySendNext(null);
        this._isolateModule.reset();
    };
    return MainDOMSource;
}());
exports.MainDOMSource = MainDOMSource;
//# sourceMappingURL=MainDOMSource.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScopeChecker = (function () {
    function ScopeChecker(fullScope, isolateModule) {
        this.fullScope = fullScope;
        this.isolateModule = isolateModule;
    }
    /**
     * Checks whether the given element is *directly* in the scope of this
     * scope checker. Being contained *indirectly* through other scopes
     * is not valid. This is crucial for implementing parent-child isolation,
     * so that the parent selectors don't search inside a child scope.
     */
    ScopeChecker.prototype.isDirectlyInScope = function (leaf) {
        for (var el = leaf; el; el = el.parentElement) {
            var fullScope = this.isolateModule.getFullScope(el);
            if (fullScope && fullScope !== this.fullScope) {
                return false;
            }
            if (fullScope) {
                return true;
            }
        }
        return true;
    };
    return ScopeChecker;
}());
exports.ScopeChecker = ScopeChecker;
//# sourceMappingURL=ScopeChecker.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createMatchesSelector() {
    var vendor;
    try {
        var proto = Element.prototype;
        vendor = proto.matches
            || proto.matchesSelector
            || proto.webkitMatchesSelector
            || proto.mozMatchesSelector
            || proto.msMatchesSelector
            || proto.oMatchesSelector;
    }
    catch (err) {
        vendor = null;
    }
    return function match(elem, selector) {
        if (vendor) {
            return vendor.call(elem, selector);
        }
        var nodes = elem.parentNode.querySelectorAll(selector);
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i] === elem) {
                return true;
            }
        }
        return false;
    };
}
exports.matchesSelector = createMatchesSelector();
//# sourceMappingURL=matchesSelector.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear



var value = __webpack_require__(9);

module.exports = function () {
	value(this).length = 0;
	return this;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = Object.create, getPrototypeOf = Object.getPrototypeOf
  , x = {};

module.exports = function (/*customCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf
	  , customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== 'function') return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554



var isObject      = __webpack_require__(93)
  , value         = __webpack_require__(9)

  , isPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty = Object.defineProperty
  , nullDesc = { configurable: true, enumerable: false, writable: true,
		value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if ((prototype === null) || isObject(prototype)) return obj;
	throw new TypeError('Prototype must be null or an object');
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, 'level', { configurable: false,
		enumerable: false, writable: false, value: status.level });
}((function () {
	var x = Object.create(null), y = {}, set
	  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(x, y);
		} catch (ignore) { }
		if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
	}

	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 2 };

	x = {};
	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 1 };

	return false;
}())));

__webpack_require__(90);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(100)()
	? String.prototype.contains
	: __webpack_require__(101);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIterable = __webpack_require__(105);

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(107)() ? Map : __webpack_require__(111);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
};

var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
};

var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
  return callback(window.confirm(message));
}; // eslint-disable-line no-alert

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */
var supportsHistory = exports.supportsHistory = function supportsHistory() {
  var ua = window.navigator.userAgent;

  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;

  return window.history && 'pushState' in window.history;
};

/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */
var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
};

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
};

/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */
var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function selectorParser(_a) {
    var sel = _a.sel;
    var hashIdx = sel.indexOf('#');
    var dotIdx = sel.indexOf('.', hashIdx);
    var hash = hashIdx > 0 ? hashIdx : sel.length;
    var dot = dotIdx > 0 ? dotIdx : sel.length;
    var tagName = hashIdx !== -1 || dotIdx !== -1 ?
        sel.slice(0, Math.min(hash, dot)) :
        sel;
    var id = hash < dot ? sel.slice(hash + 1, dot) : void 0;
    var className = dotIdx > 0 ? sel.slice(dot + 1).replace(/\./g, ' ') : void 0;
    return {
        tagName: tagName,
        id: id,
        className: className,
    };
}
exports.selectorParser = selectorParser;
//# sourceMappingURL=selectorParser.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports) {


// All SVG children elements, not in this list, should self-close

exports.CONTAINER = {
  // http://www.w3.org/TR/SVG/intro.html#TermContainerElement
  'a': true,
  'defs': true,
  'glyph': true,
  'g': true,
  'marker': true,
  'mask': true,
  'missing-glyph': true,
  'pattern': true,
  'svg': true,
  'switch': true,
  'symbol': true,

  // http://www.w3.org/TR/SVG/intro.html#TermDescriptiveElement
  'desc': true,
  'metadata': true,
  'title': true
}

// http://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements

exports.VOID = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
}


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment,
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.htmlDomApi;
//# sourceMappingURL=htmldomapi.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}
exports.primitive = primitive;
//# sourceMappingURL=is.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var h_1 = __webpack_require__(18);
function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i, old = oldVnode.data, cur = thunk.data;
    var oldArgs = old.args, args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
exports.thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return h_1.h(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.thunk;
//# sourceMappingURL=thunk.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(192));
__export(__webpack_require__(200));
__export(__webpack_require__(212));
__export(__webpack_require__(218));
__export(__webpack_require__(6));
__export(__webpack_require__(4));


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var xstream_1 = __webpack_require__(0);
var dropRepeats_1 = __webpack_require__(37);
var debounce_1 = __webpack_require__(59);
var dom_1 = __webpack_require__(1);
function getClassName(className, props) {
    if (props.rightAligned) {
        className += " right";
    }
    if (props.selection) {
        className += " selection";
    }
    if (props.inline) {
        className += " inline";
    }
    if (props.floating) {
        className += " floating";
    }
    if (props.loading) {
        className += " loading";
    }
    if (props.disabled) {
        className += " disabled";
    }
    if (props.scrolling) {
        className += " scrolling";
    }
    if (props.compact) {
        className += " compact";
    }
    if (props.pointing) {
        className += " pointing";
    }
    if (typeof (props.size) !== "undefined") {
        className += enums_1.Size.ToClassname(props.size);
    }
    if (typeof (props.color) !== "undefined") {
        className += enums_1.Color.ToClassname(props.color);
    }
    return className + " dropdown";
}
exports.getClassName = getClassName;
function createTransition$(evt, args) {
    var itemClick$ = evt("click").filter(function (evt) { return evt.srcElement.classList.contains("item") && !evt.srcElement.classList.contains("dropdown"); });
    var dropdownClick$ = evt("click")
        .filter(function (evt) {
        return !evt.srcElement.classList.contains("item") ||
            evt.srcElement.classList.contains("dropdown");
    })
        .mapTo(enums_1.Direction.In);
    var mouseleave$ = xstream_1.default.merge(evt("mouseleave").filter(function (evt) { return !isDropdownIcon(evt) && !searchIsActive(args); }), evt("mouseenter"))
        .map(function (evt) { return evt.type === "mouseenter" ? enums_1.Direction.In : enums_1.Direction.Out; })
        .compose(debounce_1.default(250))
        .filter(function (dir) { return dir === enums_1.Direction.Out; });
    var inputEnter$ = evt("keypress").map(function (evt) { return (evt.charCode === 13 || evt.charCode === 9) ? enums_1.Direction.Out : enums_1.Direction.In; });
    return xstream_1.default.merge(dropdownClick$, itemClick$.mapTo(enums_1.Direction.Out), mouseleave$, inputEnter$)
        .startWith(enums_1.Direction.Out)
        .map(function (dir) { return ({
        animation: enums_1.Animation.Fade,
        direction: dir
    }); })
        .compose(dropRepeats_1.default(function (a, b) { return a.direction === b.direction && a.animation === b.animation; }))
        .drop(1)
        .startWith({ animation: enums_1.Animation.None, direction: enums_1.Direction.Out });
}
exports.createTransition$ = createTransition$;
function getText(item, props, stat, filter) {
    if (typeof (stat) !== "undefined") {
        if (types_1.isVNode(props.default)) {
            return props.default;
        }
        return dom_1.div({ props: { className: "text" } }, props.default);
    }
    if (item === null || typeof (item) === "undefined") {
        if (types_1.isVNode(props.default)) {
            return props.default;
        }
        return dom_1.div({ props: { className: "default text" } }, props.default);
    }
    if (filter && filter.length > 0) {
        if (types_1.isVNode(item.main)) {
            return item.main;
        }
        return dom_1.div({ props: { className: "filtered text" } }, item.main);
    }
    if (types_1.isVNode(item.main)) {
        return item.main;
    }
    return dom_1.div({ props: { className: "text" } }, item.main);
}
exports.getText = getText;
function isMenuItem(obj) {
    return obj && obj.main;
}
exports.isMenuItem = isMenuItem;
function isDropdownIcon(evt) {
    return evt.srcElement.className.indexOf("dropdown icon") !== -1 && !evt.srcElement.classList.contains("ui");
}
function searchIsActive(args) {
    return (args && args.search && typeof (document) !== "undefined" && document.activeElement.classList.contains("search"));
}


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var index_1 = __webpack_require__(0);
var DebounceOperator = (function () {
    function DebounceOperator(dt, ins) {
        this.dt = dt;
        this.ins = ins;
        this.type = 'debounce';
        this.out = null;
        this.id = null;
    }
    DebounceOperator.prototype._start = function (out) {
        this.out = out;
        this.ins._add(this);
    };
    DebounceOperator.prototype._stop = function () {
        this.ins._remove(this);
        this.out = null;
        this.id = null;
    };
    DebounceOperator.prototype.clearInterval = function () {
        var id = this.id;
        if (id !== null) {
            clearInterval(id);
        }
        this.id = null;
    };
    DebounceOperator.prototype._n = function (t) {
        var _this = this;
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        this.id = setInterval(function () {
            _this.clearInterval();
            u._n(t);
        }, this.dt);
    };
    DebounceOperator.prototype._e = function (err) {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._e(err);
    };
    DebounceOperator.prototype._c = function () {
        var u = this.out;
        if (!u)
            return;
        this.clearInterval();
        u._c();
    };
    return DebounceOperator;
}());
/**
 * Delays events until a certain amount of silence has passed. If that timespan
 * of silence is not met the event is dropped.
 *
 * Marble diagram:
 *
 * ```text
 * --1----2--3--4----5|
 *     debounce(60)
 * -----1----------4--|
 * ```
 *
 * Example:
 *
 * ```js
 * import fromDiagram from 'xstream/extra/fromDiagram'
 * import debounce from 'xstream/extra/debounce'
 *
 * const stream = fromDiagram('--1----2--3--4----5|')
 *  .compose(debounce(60))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 1
 * > 4
 * > completed
 * ```
 *
 * @param {number} period The amount of silence required in milliseconds.
 * @return {Stream}
 */
function debounce(period) {
    return function debounceOperator(ins) {
        return new index_1.Stream(new DebounceOperator(period, ins));
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = debounce;
//# sourceMappingURL=debounce.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var run_1 = __webpack_require__(77);
var dom_1 = __webpack_require__(1);
var history_1 = __webpack_require__(76);
var xstream_1 = __webpack_require__(0);
var router_1 = __webpack_require__(181);
var routes_1 = __webpack_require__(182);
var layout_1 = __webpack_require__(179);
function app(drivers) {
    var page = router_1.default(Object.assign({}, drivers, { routes: routes_1.default }));
    var layout = layout_1.Layout.run(drivers, page);
    var sinks = {
        DOM: layout.DOM.map(function (layout) { return dom_1.div("#app.app", layout); }),
        router: xstream_1.default.merge(page.router, layout.router),
    };
    return sinks;
}
run_1.run(app, {
    DOM: dom_1.makeDOMDriver(".app"),
    router: history_1.captureClicks(history_1.makeHistoryDriver())
});


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var adapt_1 = __webpack_require__(13);
var fromEvent_1 = __webpack_require__(26);
var BodyDOMSource = (function () {
    function BodyDOMSource(_name) {
        this._name = _name;
    }
    BodyDOMSource.prototype.select = function (selector) {
        // This functionality is still undefined/undecided.
        return this;
    };
    BodyDOMSource.prototype.elements = function () {
        var out = adapt_1.adapt(xstream_1.default.of(document.body));
        out._isCycleSource = this._name;
        return out;
    };
    BodyDOMSource.prototype.events = function (eventType, options) {
        if (options === void 0) { options = {}; }
        var stream;
        if (options && typeof options.useCapture === 'boolean') {
            stream = fromEvent_1.fromEvent(document.body, eventType, options.useCapture);
        }
        else {
            stream = fromEvent_1.fromEvent(document.body, eventType);
        }
        var out = adapt_1.adapt(stream);
        out._isCycleSource = this._name;
        return out;
    };
    return BodyDOMSource;
}());
exports.BodyDOMSource = BodyDOMSource;
//# sourceMappingURL=BodyDOMSource.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var adapt_1 = __webpack_require__(13);
var fromEvent_1 = __webpack_require__(26);
var DocumentDOMSource = (function () {
    function DocumentDOMSource(_name) {
        this._name = _name;
    }
    DocumentDOMSource.prototype.select = function (selector) {
        // This functionality is still undefined/undecided.
        return this;
    };
    DocumentDOMSource.prototype.elements = function () {
        var out = adapt_1.adapt(xstream_1.default.of(document));
        out._isCycleSource = this._name;
        return out;
    };
    DocumentDOMSource.prototype.events = function (eventType, options) {
        if (options === void 0) { options = {}; }
        var stream;
        if (options && typeof options.useCapture === 'boolean') {
            stream = fromEvent_1.fromEvent(document, eventType, options.useCapture);
        }
        else {
            stream = fromEvent_1.fromEvent(document, eventType);
        }
        var out = adapt_1.adapt(stream);
        out._isCycleSource = this._name;
        return out;
    };
    return DocumentDOMSource;
}());
exports.DocumentDOMSource = DocumentDOMSource;
//# sourceMappingURL=DocumentDOMSource.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ScopeChecker_1 = __webpack_require__(40);
var utils_1 = __webpack_require__(15);
var matchesSelector_1 = __webpack_require__(41);
function toElArray(input) {
    return Array.prototype.slice.call(input);
}
var ElementFinder = (function () {
    function ElementFinder(namespace, isolateModule) {
        this.namespace = namespace;
        this.isolateModule = isolateModule;
    }
    ElementFinder.prototype.call = function (rootElement) {
        var namespace = this.namespace;
        var selector = utils_1.getSelectors(namespace);
        if (!selector) {
            return rootElement;
        }
        var fullScope = utils_1.getFullScope(namespace);
        var scopeChecker = new ScopeChecker_1.ScopeChecker(fullScope, this.isolateModule);
        var topNode = fullScope ?
            this.isolateModule.getElement(fullScope) || rootElement :
            rootElement;
        var topNodeMatchesSelector = !!fullScope && !!selector && matchesSelector_1.matchesSelector(topNode, selector);
        return toElArray(topNode.querySelectorAll(selector))
            .filter(scopeChecker.isDirectlyInScope, scopeChecker)
            .concat(topNodeMatchesSelector ? [topNode] : []);
    };
    return ElementFinder;
}());
exports.ElementFinder = ElementFinder;
//# sourceMappingURL=ElementFinder.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var ScopeChecker_1 = __webpack_require__(40);
var utils_1 = __webpack_require__(15);
var matchesSelector_1 = __webpack_require__(41);
/**
 * Finds (with binary search) index of the destination that id equal to searchId
 * among the destinations in the given array.
 */
function indexOf(arr, searchId) {
    var minIndex = 0;
    var maxIndex = arr.length - 1;
    var currentIndex;
    var current;
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0; // tslint:disable-line:no-bitwise
        current = arr[currentIndex];
        var currentId = current.id;
        if (currentId < searchId) {
            minIndex = currentIndex + 1;
        }
        else if (currentId > searchId) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
    return -1;
}
/**
 * Manages "Event delegation", by connecting an origin with multiple
 * destinations.
 *
 * Attaches a DOM event listener to the DOM element called the "origin",
 * and delegates events to "destinations", which are subjects as outputs
 * for the DOMSource. Simulates bubbling or capturing, with regards to
 * isolation boundaries too.
 */
var EventDelegator = (function () {
    function EventDelegator(origin, eventType, useCapture, isolateModule) {
        var _this = this;
        this.origin = origin;
        this.eventType = eventType;
        this.useCapture = useCapture;
        this.isolateModule = isolateModule;
        this.destinations = [];
        this._lastId = 0;
        if (useCapture) {
            this.listener = function (ev) { return _this.capture(ev); };
        }
        else {
            this.listener = function (ev) { return _this.bubble(ev); };
        }
        origin.addEventListener(eventType, this.listener, useCapture);
    }
    EventDelegator.prototype.updateOrigin = function (newOrigin) {
        this.origin.removeEventListener(this.eventType, this.listener, this.useCapture);
        newOrigin.addEventListener(this.eventType, this.listener, this.useCapture);
        this.origin = newOrigin;
    };
    /**
     * Creates a *new* destination given the namespace and returns the subject
     * representing the destination of events. Is not referentially transparent,
     * will always return a different output for the same input.
     */
    EventDelegator.prototype.createDestination = function (namespace) {
        var _this = this;
        var id = this._lastId++;
        var selector = utils_1.getSelectors(namespace);
        var scopeChecker = new ScopeChecker_1.ScopeChecker(utils_1.getFullScope(namespace), this.isolateModule);
        var subject = xstream_1.default.create({
            start: function () { },
            stop: function () {
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(function () {
                        _this.removeDestination(id);
                    });
                }
                else {
                    _this.removeDestination(id);
                }
            },
        });
        var destination = { id: id, selector: selector, scopeChecker: scopeChecker, subject: subject };
        this.destinations.push(destination);
        return subject;
    };
    /**
     * Removes the destination that has the given id.
     */
    EventDelegator.prototype.removeDestination = function (id) {
        var i = indexOf(this.destinations, id);
        i >= 0 && this.destinations.splice(i, 1); // tslint:disable-line:no-unused-expression
    };
    EventDelegator.prototype.capture = function (ev) {
        var n = this.destinations.length;
        for (var i = 0; i < n; i++) {
            var dest = this.destinations[i];
            if (matchesSelector_1.matchesSelector(ev.target, dest.selector)) {
                dest.subject._n(ev);
            }
        }
    };
    EventDelegator.prototype.bubble = function (rawEvent) {
        var origin = this.origin;
        if (!origin.contains(rawEvent.currentTarget)) {
            return;
        }
        var roof = origin.parentElement;
        var ev = this.patchEvent(rawEvent);
        for (var el = ev.target; el && el !== roof; el = el.parentElement) {
            if (!origin.contains(el)) {
                ev.stopPropagation();
            }
            if (ev.propagationHasBeenStopped) {
                return;
            }
            this.matchEventAgainstDestinations(el, ev);
        }
    };
    EventDelegator.prototype.patchEvent = function (event) {
        var pEvent = event;
        pEvent.propagationHasBeenStopped = false;
        var oldStopPropagation = pEvent.stopPropagation;
        pEvent.stopPropagation = function stopPropagation() {
            oldStopPropagation.call(this);
            this.propagationHasBeenStopped = true;
        };
        return pEvent;
    };
    EventDelegator.prototype.matchEventAgainstDestinations = function (el, ev) {
        var n = this.destinations.length;
        for (var i = 0; i < n; i++) {
            var dest = this.destinations[i];
            if (!dest.scopeChecker.isDirectlyInScope(el)) {
                continue;
            }
            if (matchesSelector_1.matchesSelector(el, dest.selector)) {
                this.mutateEventCurrentTarget(ev, el);
                dest.subject._n(ev);
            }
        }
    };
    EventDelegator.prototype.mutateEventCurrentTarget = function (event, currentTargetElement) {
        try {
            Object.defineProperty(event, "currentTarget", {
                value: currentTargetElement,
                configurable: true,
            });
        }
        catch (err) {
            console.log("please use event.ownerTarget");
        }
        event.ownerTarget = currentTargetElement;
    };
    return EventDelegator;
}());
exports.EventDelegator = EventDelegator;
//# sourceMappingURL=EventDelegator.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MapPolyfill = __webpack_require__(47);
var IsolateModule = (function () {
    function IsolateModule() {
        this.elementsByFullScope = new MapPolyfill();
        this.delegatorsByFullScope = new MapPolyfill();
        this.fullScopesBeingUpdated = [];
    }
    IsolateModule.prototype.cleanupVNode = function (_a) {
        var data = _a.data, elm = _a.elm;
        var fullScope = (data || {}).isolate || '';
        var isCurrentElm = this.elementsByFullScope.get(fullScope) === elm;
        var isScopeBeingUpdated = this.fullScopesBeingUpdated.indexOf(fullScope) >= 0;
        if (fullScope && isCurrentElm && !isScopeBeingUpdated) {
            this.elementsByFullScope.delete(fullScope);
            this.delegatorsByFullScope.delete(fullScope);
        }
    };
    IsolateModule.prototype.getElement = function (fullScope) {
        return this.elementsByFullScope.get(fullScope);
    };
    IsolateModule.prototype.getFullScope = function (elm) {
        var iterator = this.elementsByFullScope.entries();
        for (var result = iterator.next(); !!result.value; result = iterator.next()) {
            var _a = result.value, fullScope = _a[0], element = _a[1];
            if (elm === element) {
                return fullScope;
            }
        }
        return '';
    };
    IsolateModule.prototype.addEventDelegator = function (fullScope, eventDelegator) {
        var delegators = this.delegatorsByFullScope.get(fullScope);
        if (!delegators) {
            delegators = [];
            this.delegatorsByFullScope.set(fullScope, delegators);
        }
        delegators[delegators.length] = eventDelegator;
    };
    IsolateModule.prototype.reset = function () {
        this.elementsByFullScope.clear();
        this.delegatorsByFullScope.clear();
        this.fullScopesBeingUpdated = [];
    };
    IsolateModule.prototype.createModule = function () {
        var self = this;
        return {
            create: function (oldVNode, vNode) {
                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
                var oldFullScope = oldData.isolate || '';
                var fullScope = data.isolate || '';
                // Update data structures with the newly-created element
                if (fullScope) {
                    self.fullScopesBeingUpdated.push(fullScope);
                    if (oldFullScope) {
                        self.elementsByFullScope.delete(oldFullScope);
                    }
                    self.elementsByFullScope.set(fullScope, elm);
                    // Update delegators for this scope
                    var delegators = self.delegatorsByFullScope.get(fullScope);
                    if (delegators) {
                        var len = delegators.length;
                        for (var i = 0; i < len; ++i) {
                            delegators[i].updateOrigin(elm);
                        }
                    }
                }
                if (oldFullScope && !fullScope) {
                    self.elementsByFullScope.delete(fullScope);
                }
            },
            update: function (oldVNode, vNode) {
                var _a = oldVNode.data, oldData = _a === void 0 ? {} : _a;
                var elm = vNode.elm, _b = vNode.data, data = _b === void 0 ? {} : _b;
                var oldFullScope = oldData.isolate || '';
                var fullScope = data.isolate || '';
                // Same element, but different scope, so update the data structures
                if (fullScope && fullScope !== oldFullScope) {
                    if (oldFullScope) {
                        self.elementsByFullScope.delete(oldFullScope);
                    }
                    self.elementsByFullScope.set(fullScope, elm);
                    var delegators = self.delegatorsByFullScope.get(oldFullScope);
                    if (delegators) {
                        self.delegatorsByFullScope.delete(oldFullScope);
                        self.delegatorsByFullScope.set(fullScope, delegators);
                    }
                }
                // Same element, but lost the scope, so update the data structures
                if (oldFullScope && !fullScope) {
                    self.elementsByFullScope.delete(oldFullScope);
                    self.delegatorsByFullScope.delete(oldFullScope);
                }
            },
            destroy: function (vNode) {
                self.cleanupVNode(vNode);
            },
            remove: function (vNode, cb) {
                self.cleanupVNode(vNode);
                cb();
            },
            post: function () {
                self.fullScopesBeingUpdated = [];
            },
        };
    };
    return IsolateModule;
}());
exports.IsolateModule = IsolateModule;
//# sourceMappingURL=IsolateModule.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var h_1 = __webpack_require__(18);
var classNameFromVNode_1 = __webpack_require__(127);
var selectorParser_1 = __webpack_require__(51);
var VNodeWrapper = (function () {
    function VNodeWrapper(rootElement) {
        this.rootElement = rootElement;
    }
    VNodeWrapper.prototype.call = function (vnode) {
        if (vnode === null) {
            return this.wrap([]);
        }
        var _a = selectorParser_1.selectorParser(vnode), selTagName = _a.tagName, selId = _a.id;
        var vNodeClassName = classNameFromVNode_1.classNameFromVNode(vnode);
        var vNodeData = vnode.data || {};
        var vNodeDataProps = vNodeData.props || {};
        var _b = vNodeDataProps.id, vNodeId = _b === void 0 ? selId : _b;
        var isVNodeAndRootElementIdentical = typeof vNodeId === 'string' &&
            vNodeId.toUpperCase() === this.rootElement.id.toUpperCase() &&
            selTagName.toUpperCase() === this.rootElement.tagName.toUpperCase() &&
            vNodeClassName.toUpperCase() === this.rootElement.className.toUpperCase();
        if (isVNodeAndRootElementIdentical) {
            return vnode;
        }
        return this.wrap([vnode]);
    };
    VNodeWrapper.prototype.wrap = function (children) {
        var _a = this.rootElement, tagName = _a.tagName, id = _a.id, className = _a.className;
        var selId = id ? "#" + id : '';
        var selClass = className ?
            "." + className.split(" ").join(".") : '';
        return h_1.h("" + tagName.toLowerCase() + selId + selClass, {}, children);
    };
    return VNodeWrapper;
}());
exports.VNodeWrapper = VNodeWrapper;
//# sourceMappingURL=VNodeWrapper.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var h_1 = __webpack_require__(18);
function isValidString(param) {
    return typeof param === 'string' && param.length > 0;
}
function isSelector(param) {
    return isValidString(param) && (param[0] === '.' || param[0] === '#');
}
function createTagFunction(tagName) {
    return function hyperscript(a, b, c) {
        var hasA = typeof a !== 'undefined';
        var hasB = typeof b !== 'undefined';
        var hasC = typeof c !== 'undefined';
        if (isSelector(a)) {
            if (hasB && hasC) {
                return h_1.h(tagName + a, b, c);
            }
            else if (hasB) {
                return h_1.h(tagName + a, b);
            }
            else {
                return h_1.h(tagName + a, {});
            }
        }
        else if (hasC) {
            return h_1.h(tagName + a, b, c);
        }
        else if (hasB) {
            return h_1.h(tagName, a, b);
        }
        else if (hasA) {
            return h_1.h(tagName, a);
        }
        else {
            return h_1.h(tagName, {});
        }
    };
}
var SVG_TAG_NAMES = [
    'a', 'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
    'animateMotion', 'animateTransform', 'circle', 'clipPath', 'colorProfile',
    'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
    'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
    'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
    'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
    'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
    'feSpotlight', 'feTile', 'feTurbulence', 'filter', 'font', 'fontFace',
    'fontFaceFormat', 'fontFaceName', 'fontFaceSrc', 'fontFaceUri',
    'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
    'linearGradient', 'marker', 'mask', 'metadata', 'missingGlyph', 'mpath',
    'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'script',
    'set', 'stop', 'style', 'switch', 'symbol', 'text', 'textPath', 'title',
    'tref', 'tspan', 'use', 'view', 'vkern',
];
var svg = createTagFunction('svg');
SVG_TAG_NAMES.forEach(function (tag) {
    svg[tag] = createTagFunction(tag);
});
var TAG_NAMES = [
    'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
    'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
    'cite', 'code', 'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl',
    'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html',
    'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend',
    'li', 'link', 'main', 'map', 'mark', 'menu', 'meta', 'nav', 'noscript',
    'object', 'ol', 'optgroup', 'option', 'p', 'param', 'pre', 'progress', 'q',
    'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small',
    'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td',
    'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'u', 'ul', 'video',
];
var exported = { SVG_TAG_NAMES: SVG_TAG_NAMES, TAG_NAMES: TAG_NAMES, svg: svg, isSelector: isSelector, createTagFunction: createTagFunction };
TAG_NAMES.forEach(function (n) {
    exported[n] = createTagFunction(n);
});
exports.default = exported;
//# sourceMappingURL=hyperscript-helpers.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vnode_1 = __webpack_require__(24);
var utils_1 = __webpack_require__(15);
function totalIsolateSource(source, scope) {
    return source.select(utils_1.SCOPE_PREFIX + scope);
}
function siblingIsolateSource(source, scope) {
    return source.select(scope);
}
function isolateSource(source, scope) {
    if (scope === ':root') {
        return source;
    }
    else if (utils_1.isClassOrId(scope)) {
        return siblingIsolateSource(source, scope);
    }
    else {
        return totalIsolateSource(source, scope);
    }
}
exports.isolateSource = isolateSource;
function siblingIsolateSink(sink, scope) {
    return sink.map(function (node) {
        return vnode_1.vnode(node.sel + scope, node.data, node.children, node.text, node.elm);
    });
}
exports.siblingIsolateSink = siblingIsolateSink;
function totalIsolateSink(sink, fullScope) {
    return sink.map(function (node) {
        // Ignore if already had up-to-date full scope in vnode.data.isolate
        if (node.data && node.data.isolate) {
            var isolateData = node.data.isolate;
            var prevFullScopeNum = isolateData.replace(/(cycle|\-)/g, '');
            var fullScopeNum = fullScope.replace(/(cycle|\-)/g, '');
            if (isNaN(parseInt(prevFullScopeNum))
                || isNaN(parseInt(fullScopeNum))
                || prevFullScopeNum > fullScopeNum) {
                return node;
            }
        }
        // Insert up-to-date full scope in vnode.data.isolate, and also a key if needed
        node.data = node.data || {};
        node.data.isolate = fullScope;
        if (typeof node.key === 'undefined') {
            node.key = utils_1.SCOPE_PREFIX + fullScope;
        }
        return node;
    });
}
exports.totalIsolateSink = totalIsolateSink;
//# sourceMappingURL=isolate.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var snabbdom_1 = __webpack_require__(139);
var xstream_1 = __webpack_require__(0);
var MainDOMSource_1 = __webpack_require__(39);
var tovnode_1 = __webpack_require__(140);
var VNodeWrapper_1 = __webpack_require__(67);
var utils_1 = __webpack_require__(15);
var modules_1 = __webpack_require__(73);
var IsolateModule_1 = __webpack_require__(66);
var MapPolyfill = __webpack_require__(47);
function makeDOMDriverInputGuard(modules) {
    if (!Array.isArray(modules)) {
        throw new Error("Optional modules option must be " +
            "an array for snabbdom modules");
    }
}
function domDriverInputGuard(view$) {
    if (!view$
        || typeof view$.addListener !== "function"
        || typeof view$.fold !== "function") {
        throw new Error("The DOM driver function expects as input a Stream of " +
            "virtual DOM elements");
    }
}
function dropCompletion(input) {
    return xstream_1.default.merge(input, xstream_1.default.never());
}
function unwrapElementFromVNode(vnode) {
    return vnode.elm;
}
function reportSnabbdomError(err) {
    (console.error || console.log)(err);
}
function makeDOMDriver(container, options) {
    if (!options) {
        options = {};
    }
    var modules = options.modules || modules_1.default;
    var isolateModule = new IsolateModule_1.IsolateModule();
    var patch = snabbdom_1.init([isolateModule.createModule()].concat(modules));
    var rootElement = utils_1.getElement(container) || document.body;
    var vnodeWrapper = new VNodeWrapper_1.VNodeWrapper(rootElement);
    var delegators = new MapPolyfill();
    makeDOMDriverInputGuard(modules);
    function DOMDriver(vnode$, name) {
        if (name === void 0) { name = 'DOM'; }
        domDriverInputGuard(vnode$);
        var sanitation$ = xstream_1.default.create();
        var rootElement$ = xstream_1.default.merge(vnode$.endWhen(sanitation$), sanitation$)
            .map(function (vnode) { return vnodeWrapper.call(vnode); })
            .fold(patch, tovnode_1.toVNode(rootElement))
            .drop(1)
            .map(unwrapElementFromVNode)
            .compose(dropCompletion) // don't complete this stream
            .startWith(rootElement);
        // Start the snabbdom patching, over time
        var listener = { error: reportSnabbdomError };
        if (document.readyState === 'loading') {
            document.addEventListener('readystatechange', function () {
                if (document.readyState === 'interactive') {
                    rootElement$.addListener(listener);
                }
            });
        }
        else {
            rootElement$.addListener(listener);
        }
        return new MainDOMSource_1.MainDOMSource(rootElement$, sanitation$, [], isolateModule, delegators, name);
    }
    ;
    return DOMDriver;
}
exports.makeDOMDriver = makeDOMDriver;
//# sourceMappingURL=makeDOMDriver.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HTMLSource_1 = __webpack_require__(38);
var init = __webpack_require__(128);
var modulesForHTML = __webpack_require__(131);
var defaultModules = [
    modulesForHTML.attributes,
    modulesForHTML.props,
    modulesForHTML.class,
    modulesForHTML.style,
];
var noop = function () { };
function makeHTMLDriver(effect, options) {
    if (!options) {
        options = {};
    }
    var modules = options.modules || defaultModules;
    var toHTML = init(modules);
    function htmlDriver(vnode$, name) {
        var html$ = vnode$.map(toHTML);
        html$.addListener({
            next: effect || noop,
            error: noop,
            complete: noop,
        });
        return new HTMLSource_1.HTMLSource(html$, name);
    }
    ;
    return htmlDriver;
}
exports.makeHTMLDriver = makeHTMLDriver;
//# sourceMappingURL=makeHTMLDriver.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var adapt_1 = __webpack_require__(13);
var SCOPE_PREFIX = '___';
var MockedDOMSource = (function () {
    function MockedDOMSource(_mockConfig) {
        this._mockConfig = _mockConfig;
        if (_mockConfig['elements']) {
            this._elements = _mockConfig['elements'];
        }
        else {
            this._elements = adapt_1.adapt(xstream_1.default.empty());
        }
    }
    MockedDOMSource.prototype.elements = function () {
        var out = this._elements;
        out._isCycleSource = 'MockedDOM';
        return out;
    };
    MockedDOMSource.prototype.events = function (eventType, options) {
        var streamForEventType = this._mockConfig[eventType];
        var out = adapt_1.adapt(streamForEventType || xstream_1.default.empty());
        out._isCycleSource = 'MockedDOM';
        return out;
    };
    MockedDOMSource.prototype.select = function (selector) {
        var mockConfigForSelector = this._mockConfig[selector] || {};
        return new MockedDOMSource(mockConfigForSelector);
    };
    MockedDOMSource.prototype.isolateSource = function (source, scope) {
        return source.select('.' + SCOPE_PREFIX + scope);
    };
    MockedDOMSource.prototype.isolateSink = function (sink, scope) {
        return sink.map(function (vnode) {
            if (vnode.sel && vnode.sel.indexOf(SCOPE_PREFIX + scope) !== -1) {
                return vnode;
            }
            else {
                vnode.sel += "." + SCOPE_PREFIX + scope;
                return vnode;
            }
        });
    };
    return MockedDOMSource;
}());
exports.MockedDOMSource = MockedDOMSource;
function mockDOMSource(mockConfig) {
    return new MockedDOMSource(mockConfig);
}
exports.mockDOMSource = mockDOMSource;
//# sourceMappingURL=mockDOMSource.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = __webpack_require__(135);
exports.ClassModule = class_1.default;
var props_1 = __webpack_require__(137);
exports.PropsModule = props_1.default;
var attributes_1 = __webpack_require__(134);
exports.AttrsModule = attributes_1.default;
var style_1 = __webpack_require__(138);
exports.StyleModule = style_1.default;
var dataset_1 = __webpack_require__(136);
exports.DatasetModule = dataset_1.default;
var modules = [style_1.default, class_1.default, props_1.default, attributes_1.default, dataset_1.default];
exports.default = modules;
//# sourceMappingURL=modules.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_1 = __webpack_require__(0);
var CLICK_EVENT = typeof document !== 'undefined' && document.ontouchstart ?
    'touchstart' :
    'click';
function which(ev) {
    if (typeof window === 'undefined') {
        return false;
    }
    var e = ev || window.event;
    return e.which === null ? e.button : e.which;
}
function sameOrigin(href) {
    if (typeof window === 'undefined') {
        return false;
    }
    return href && href.indexOf(window.location.origin) === 0;
}
function makeClickListener(push) {
    return function clickListener(event) {
        if (which(event) !== 1) {
            return;
        }
        if (event.metaKey || event.ctrlKey || event.shiftKey) {
            return;
        }
        if (event.defaultPrevented) {
            return;
        }
        var element = event.target;
        while (element && element.nodeName !== 'A') {
            element = element.parentNode;
        }
        if (!element || element.nodeName !== 'A') {
            return;
        }
        if (element.hasAttribute('download') ||
            element.getAttribute('rel') === 'external') {
            return;
        }
        if (element.target) {
            return;
        }
        var link = element.getAttribute('href');
        if (link && link.indexOf('mailto:') > -1 || link.charAt(0) === '#') {
            return;
        }
        if (!sameOrigin(element.href)) {
            return;
        }
        event.preventDefault();
        var pathname = element.pathname, search = element.search, _a = element.hash, hash = _a === void 0 ? '' : _a;
        push(pathname + search + hash);
    };
}
function captureAnchorClicks(push) {
    var listener = makeClickListener(push);
    if (typeof window !== 'undefined') {
        document.addEventListener(CLICK_EVENT, listener, false);
    }
}
function captureClicks(historyDriver) {
    return function historyDriverWithClickCapture(sink$) {
        var internalSink$ = xstream_1.default.create();
        captureAnchorClicks(function (pathname) {
            internalSink$._n({ type: 'push', pathname: pathname });
        });
        sink$._add(internalSink$);
        return historyDriver(internalSink$);
    };
}
exports.captureClicks = captureClicks;
//# sourceMappingURL=captureClicks.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var xstream_1 = __webpack_require__(0);
function createHistory$(history, sink$) {
    var history$ = xstream_1.default.createWithMemory().startWith(history.location);
    var call = makeCallOnHistory(history);
    var unlisten = history.listen(function (loc) { history$._n(loc); });
    var sub = sink$.subscribe(createObserver(call, unlisten));
    history$.dispose = function () { sub.unsubscribe(); unlisten(); };
    return history$;
}
exports.createHistory$ = createHistory$;
;
function makeCallOnHistory(history) {
    return function call(input) {
        if (input.type === 'push') {
            history.push(input.pathname, input.state);
        }
        if (input.type === 'replace') {
            history.replace(input.pathname, input.state);
        }
        if (input.type === 'go') {
            history.go(input.amount);
        }
        if (input.type === 'goBack') {
            history.goBack();
        }
        if (input.type === 'goForward') {
            history.goForward();
        }
    };
}
function createObserver(call, unlisten) {
    return {
        next: function (input) {
            if (typeof input === 'string') {
                call({ type: 'push', pathname: input });
            }
            else {
                call(input);
            }
        },
        error: function (err) { unlisten(); },
        complete: function () { setTimeout(unlisten); },
    };
}
//# sourceMappingURL=createHistory$.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Wraps a History Driver to add "click capturing" functionality.
 *
 * If you want to intercept and handle any click event that leads to a link,
 * like on an `<a>` element, you pass your existing driver (e.g. created from
 * `makeHistoryDriver()`) as argument and this function will return another
 * driver of the same nature, but including click capturing logic.
 *
 * @param {Function} driver an existing History Driver function.
 * @return {Function} a History Driver function
 * @function captureClicks
 */
var captureClicks_1 = __webpack_require__(74);
exports.captureClicks = captureClicks_1.captureClicks;
/**
 * Create a History Driver to be used in the browser.
 *
 * This is a function which, when called, returns a History Driver for Cycle.js
 * apps. The driver is also a function, and it takes a stream of new locations
 * (strings representing pathnames or location objects) as input, and outputs
 * another stream of locations that were applied.
 *
 * @param {object} options an object with some options specific to
 * this driver. These options are the same as for the corresponding
 * `createBrowserHistory()` function in History v4. Check its
 * [docs](https://github.com/mjackson/history/tree/v4.5.1#usage) for a good
 * description on the options.
 * @return {Function} the History Driver function
 * @function makeHistoryDriver
 */
var drivers_1 = __webpack_require__(27);
exports.makeHistoryDriver = drivers_1.makeHistoryDriver;
/**
 * Create a History Driver for older browsers using hash routing.
 *
 * This is a function which, when called, returns a History Driver for Cycle.js
 * apps. The driver is also a function, and it takes a stream of new locations
 * (strings representing pathnames or location objects) as input, and outputs
 * another stream of locations that were applied.
 *
 * @param {object} options an object with some options specific to
 * this driver. These options are the same as for the corresponding
 * `createHashHistory()` function in History v4. Check its
 * [docs](https://github.com/mjackson/history/tree/v4.5.1#usage) for a good
 * description on the options.
 * @return {Function} the History Driver function
 * @function makeHashHistoryDriver
 */
var drivers_2 = __webpack_require__(27);
exports.makeHashHistoryDriver = drivers_2.makeHashHistoryDriver;
/**
 * Create a History Driver to be used in non-browser enviroments such as
 * server-side Node.js.
 *
 * This is a function which, when called, returns a History Driver for Cycle.js
 * apps. The driver is also a function, and it takes a stream of new locations
 * (strings representing pathnames or location objects) as input, and outputs
 * another stream of locations that were applied.
 *
 * @param {object} options an object with some options specific to
 * this driver. These options are the same as for the corresponding
 * `createMemoryHistory()` function in History v4. Check its
 * [docs](https://github.com/mjackson/history/tree/v4.5.1#usage) for a good
 * description on the options.
 * @return {Function} the History Driver function
 * @function makeHashHistoryDriver
 */
var drivers_3 = __webpack_require__(27);
exports.makeServerHistoryDriver = drivers_3.makeServerHistoryDriver;
//# sourceMappingURL=index.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var adapt_1 = __webpack_require__(13);
function logToConsoleError(err) {
    var target = err.stack || err;
    if (console && console.error) {
        console.error(target);
    }
    else if (console && console.log) {
        console.log(target);
    }
}
function makeSinkProxies(drivers) {
    var sinkProxies = {};
    for (var name_1 in drivers) {
        if (drivers.hasOwnProperty(name_1)) {
            sinkProxies[name_1] = xstream_1.default.createWithMemory();
        }
    }
    return sinkProxies;
}
function callDrivers(drivers, sinkProxies) {
    var sources = {};
    for (var name_2 in drivers) {
        if (drivers.hasOwnProperty(name_2)) {
            sources[name_2] = drivers[name_2](sinkProxies[name_2], name_2);
            if (sources[name_2] && typeof sources[name_2] === 'object') {
                sources[name_2]._isCycleSource = name_2;
            }
        }
    }
    return sources;
}
// NOTE: this will mutate `sources`.
function adaptSources(sources) {
    for (var name_3 in sources) {
        if (sources.hasOwnProperty(name_3)
            && sources[name_3]
            && typeof sources[name_3]['shamefullySendNext'] === 'function') {
            sources[name_3] = adapt_1.adapt(sources[name_3]);
        }
    }
    return sources;
}
function replicateMany(sinks, sinkProxies) {
    var sinkNames = Object.keys(sinks).filter(function (name) { return !!sinkProxies[name]; });
    var buffers = {};
    var replicators = {};
    sinkNames.forEach(function (name) {
        buffers[name] = { _n: [], _e: [] };
        replicators[name] = {
            next: function (x) { return buffers[name]._n.push(x); },
            error: function (err) { return buffers[name]._e.push(err); },
            complete: function () { },
        };
    });
    var subscriptions = sinkNames
        .map(function (name) { return xstream_1.default.fromObservable(sinks[name]).subscribe(replicators[name]); });
    sinkNames.forEach(function (name) {
        var listener = sinkProxies[name];
        var next = function (x) { listener._n(x); };
        var error = function (err) { logToConsoleError(err); listener._e(err); };
        buffers[name]._n.forEach(next);
        buffers[name]._e.forEach(error);
        replicators[name].next = next;
        replicators[name].error = error;
        // because sink.subscribe(replicator) had mutated replicator to add
        // _n, _e, _c, we must also update these:
        replicators[name]._n = next;
        replicators[name]._e = error;
    });
    buffers = null; // free up for GC
    return function disposeReplication() {
        subscriptions.forEach(function (s) { return s.unsubscribe(); });
        sinkNames.forEach(function (name) { return sinkProxies[name]._c(); });
    };
}
function disposeSources(sources) {
    for (var k in sources) {
        if (sources.hasOwnProperty(k) && sources[k] && sources[k].dispose) {
            sources[k].dispose();
        }
    }
}
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}
/**
 * A function that prepares the Cycle application to be executed. Takes a `main`
 * function and prepares to circularly connects it to the given collection of
 * driver functions. As an output, `setup()` returns an object with three
 * properties: `sources`, `sinks` and `run`. Only when `run()` is called will
 * the application actually execute. Refer to the documentation of `run()` for
 * more details.
 *
 * **Example:**
 * ```js
 * import {setup} from '@cycle/run';
 * const {sources, sinks, run} = setup(main, drivers);
 * // ...
 * const dispose = run(); // Executes the application
 * // ...
 * dispose();
 * ```
 *
 * @param {Function} main a function that takes `sources` as input and outputs
 * `sinks`.
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Object} an object with three properties: `sources`, `sinks` and
 * `run`. `sources` is the collection of driver sources, `sinks` is the
 * collection of driver sinks, these can be used for debugging or testing. `run`
 * is the function that once called will execute the application.
 * @function setup
 */
function setup(main, drivers) {
    if (typeof main !== "function") {
        throw new Error("First argument given to Cycle must be the 'main' " +
            "function.");
    }
    if (typeof drivers !== "object" || drivers === null) {
        throw new Error("Second argument given to Cycle must be an object " +
            "with driver functions as properties.");
    }
    if (isObjectEmpty(drivers)) {
        throw new Error("Second argument given to Cycle must be an object " +
            "with at least one driver function declared as a property.");
    }
    var sinkProxies = makeSinkProxies(drivers);
    var sources = callDrivers(drivers, sinkProxies);
    var adaptedSources = adaptSources(sources);
    var sinks = main(adaptedSources);
    if (typeof window !== 'undefined') {
        window.Cyclejs = window.Cyclejs || {};
        window.Cyclejs.sinks = sinks;
    }
    function run() {
        var disposeReplication = replicateMany(sinks, sinkProxies);
        return function dispose() {
            disposeSources(sources);
            disposeReplication();
        };
    }
    ;
    return { sinks: sinks, sources: sources, run: run };
}
exports.setup = setup;
/**
 * Takes a `main` function and circularly connects it to the given collection
 * of driver functions.
 *
 * **Example:**
 * ```js
 * import run from '@cycle/run';
 * const dispose = run(main, drivers);
 * // ...
 * dispose();
 * ```
 *
 * The `main` function expects a collection of "source" streams (returned from
 * drivers) as input, and should return a collection of "sink" streams (to be
 * given to drivers). A "collection of streams" is a JavaScript object where
 * keys match the driver names registered by the `drivers` object, and values
 * are the streams. Refer to the documentation of each driver to see more
 * details on what types of sources it outputs and sinks it receives.
 *
 * @param {Function} main a function that takes `sources` as input and outputs
 * `sinks`.
 * @param {Object} drivers an object where keys are driver names and values
 * are driver functions.
 * @return {Function} a dispose function, used to terminate the execution of the
 * Cycle.js program, cleaning up resources used.
 * @function run
 */
function run(main, drivers) {
    var _a = setup(main, drivers), run = _a.run, sinks = _a.sinks;
    if (typeof window !== 'undefined' && window['CyclejsDevTool_startGraphSerializer']) {
        window['CyclejsDevTool_startGraphSerializer'](sinks);
    }
    return run();
}
exports.run = run;
exports.default = run;
//# sourceMappingURL=index.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports) {

/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copy       = __webpack_require__(89)
  , map        = __webpack_require__(97)
  , callable   = __webpack_require__(11)
  , validValue = __webpack_require__(9)

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, bindTo) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, (bindTo == null) ? this : this[bindTo]);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, bindTo*/) {
	var bindTo = arguments[1];
	return map(props, function (desc, name) {
		return define(name, desc, bindTo);
	});
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toPosInt = __webpack_require__(85)
  , value    = __webpack_require__(9)

  , indexOf = Array.prototype.indexOf
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , abs = Math.abs, floor = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, l, fromIndex, val;
	if (searchElement === searchElement) { //jslint: ignore
		return indexOf.apply(this, arguments);
	}

	l = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < l; ++i) {
		if (hasOwnProperty.call(this, i)) {
			val = this[i];
			if (val !== val) return i; //jslint: ignore
		}
	}
	return -1;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(82)()
	? Math.sign
	: __webpack_require__(83);


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== 'function') return false;
	return ((sign(10) === 1) && (sign(-20) === -1));
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) return value;
	return (value > 0) ? 1 : -1;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sign = __webpack_require__(81)

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if ((value === 0) || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(84)

  , max = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable = __webpack_require__(11)
  , value    = __webpack_require__(9)

  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== 'function') method = list[method];
		return call.call(method, list, function (key, index) {
			if (!propertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(94)
  , value = __webpack_require__(9)

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(29)
  , value  = __webpack_require__(9);

module.exports = function (obj) {
	var copy = Object(value(obj));
	if (copy !== obj) return copy;
	return assign({}, obj);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804



var create = Object.create, shim;

if (!__webpack_require__(43)()) {
	shim = __webpack_require__(44);
}

module.exports = (function () {
	var nullObject, props, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	props = {};
	desc = { configurable: false, enumerable: false, writable: true,
		value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === '__proto__') {
			props[name] = { configurable: true, enumerable: false, writable: true,
				value: undefined };
			return;
		}
		props[name] = desc;
	});
	Object.defineProperties(nullObject, props);

	Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
		enumerable: false, writable: false, value: nullObject });

	return function (prototype, props) {
		return create((prototype === null) ? nullObject : prototype, props);
	};
}());


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(86)('forEach');


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) { return typeof obj === 'function'; };


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = { 'function': true, object: true };

module.exports = function (x) {
	return ((x != null) && map[typeof x]) || false;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(95)()
	? Object.keys
	: __webpack_require__(96);


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callable = __webpack_require__(11)
  , forEach  = __webpack_require__(91)

  , call = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var o = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, obj, index) {
		o[key] = call.call(cb, thisArg, value, key, obj, index);
	});
	return o;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach, create = Object.create;

module.exports = function (arg/*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) { set[name] = true; });
	return set;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf = __webpack_require__(21)
  , contains       = __webpack_require__(45)
  , d              = __webpack_require__(10)
  , Iterator       = __webpack_require__(31)

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
	Iterator.call(this, arr);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else if (contains.call(kind, 'key')) kind = 'key';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
		return i;
	}),
	toString: d(function () { return '[object Array Iterator]'; })
});


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(28)
  , callable    = __webpack_require__(11)
  , isString    = __webpack_require__(30)
  , get         = __webpack_require__(104)

  , isArray = Array.isArray, call = Function.prototype.call
  , some = Array.prototype.some;

module.exports = function (iterable, cb/*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = 'array';
	else if (isString(iterable)) mode = 'string';
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () { broken = true; };
	if (mode === 'array') {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			if (broken) return true;
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if ((i + 1) < l) {
				code = char.charCodeAt(0);
				if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments    = __webpack_require__(28)
  , isString       = __webpack_require__(30)
  , ArrayIterator  = __webpack_require__(102)
  , StringIterator = __webpack_require__(106)
  , iterable       = __webpack_require__(46)
  , iteratorSymbol = __webpack_require__(16).iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments    = __webpack_require__(28)
  , isString       = __webpack_require__(30)
  , iteratorSymbol = __webpack_require__(16).iterator

  , isArray = Array.isArray;

module.exports = function (value) {
	if (value == null) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return (typeof value[iteratorSymbol] === 'function');
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols



var setPrototypeOf = __webpack_require__(21)
  , d              = __webpack_require__(10)
  , Iterator       = __webpack_require__(31)

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) return new StringIterator(str);
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) return;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
		return char;
	}),
	toString: d(function () { return '[object String Iterator]'; })
});


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var map, iterator, result;
	if (typeof Map !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
	} catch (e) {
		return false;
	}
	if (String(map) !== '[object Map]') return false;
	if (map.size !== 3) return false;
	if (typeof map.clear !== 'function') return false;
	if (typeof map.delete !== 'function') return false;
	if (typeof map.entries !== 'function') return false;
	if (typeof map.forEach !== 'function') return false;
	if (typeof map.get !== 'function') return false;
	if (typeof map.has !== 'function') return false;
	if (typeof map.keys !== 'function') return false;
	if (typeof map.set !== 'function') return false;
	if (typeof map.values !== 'function') return false;

	iterator = map.entries();
	result = iterator.next();
	if (result.done !== false) return false;
	if (!result.value) return false;
	if (result.value[0] !== 'raz') return false;
	if (result.value[1] !== 'one') return false;

	return true;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Exports true if environment provides native `Map` implementation,
// whatever that is.



module.exports = (function () {
	if (typeof Map === 'undefined') return false;
	return (Object.prototype.toString.call(new Map()) === '[object Map]');
}());


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(99)('key',
	'value', 'key+value');


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf    = __webpack_require__(21)
  , d                 = __webpack_require__(10)
  , Iterator          = __webpack_require__(31)
  , toStringTagSymbol = __webpack_require__(16).toStringTag
  , kinds             = __webpack_require__(109)

  , defineProperties = Object.defineProperties
  , unBind = Iterator.prototype._unBind
  , MapIterator;

MapIterator = module.exports = function (map, kind) {
	if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
	Iterator.call(this, map.__mapKeysData__, map);
	if (!kind || !kinds[kind]) kind = 'key+value';
	defineProperties(this, {
		__kind__: d('', kind),
		__values__: d('w', map.__mapValuesData__)
	});
};
if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

MapIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(MapIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__values__[i];
		if (this.__kind__ === 'key') return this.__list__[i];
		return [this.__list__[i], this.__values__[i]];
	}),
	_unBind: d(function () {
		this.__values__ = null;
		unBind.call(this);
	}),
	toString: d(function () { return '[object Map Iterator]'; })
});
Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
	d('c', 'Map Iterator'));


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear          = __webpack_require__(42)
  , eIndexOf       = __webpack_require__(80)
  , setPrototypeOf = __webpack_require__(21)
  , callable       = __webpack_require__(11)
  , validValue     = __webpack_require__(9)
  , d              = __webpack_require__(10)
  , ee             = __webpack_require__(116)
  , Symbol         = __webpack_require__(16)
  , iterator       = __webpack_require__(46)
  , forOf          = __webpack_require__(103)
  , Iterator       = __webpack_require__(110)
  , isNative       = __webpack_require__(108)

  , call = Function.prototype.call
  , defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf
  , MapPoly;

module.exports = MapPoly = function (/*iterable*/) {
	var iterable = arguments[0], keys, values, self;
	if (!(this instanceof MapPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf && (Map !== MapPoly)) {
		self = setPrototypeOf(new Map(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) iterator(iterable);
	defineProperties(self, {
		__mapKeysData__: d('c', keys = []),
		__mapValuesData__: d('c', values = [])
	});
	if (!iterable) return self;
	forOf(iterable, function (value) {
		var key = validValue(value)[0];
		value = value[1];
		if (eIndexOf.call(keys, key) !== -1) return;
		keys.push(key);
		values.push(value);
	}, self);
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
	MapPoly.prototype = Object.create(Map.prototype, {
		constructor: d(MapPoly)
	});
}

ee(defineProperties(MapPoly.prototype, {
	clear: d(function () {
		if (!this.__mapKeysData__.length) return;
		clear.call(this.__mapKeysData__);
		clear.call(this.__mapValuesData__);
		this.emit('_clear');
	}),
	delete: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return false;
		this.__mapKeysData__.splice(index, 1);
		this.__mapValuesData__.splice(index, 1);
		this.emit('_delete', index, key);
		return true;
	}),
	entries: d(function () { return new Iterator(this, 'key+value'); }),
	forEach: d(function (cb/*, thisArg*/) {
		var thisArg = arguments[1], iterator, result;
		callable(cb);
		iterator = this.entries();
		result = iterator._next();
		while (result !== undefined) {
			call.call(cb, thisArg, this.__mapValuesData__[result],
				this.__mapKeysData__[result], this);
			result = iterator._next();
		}
	}),
	get: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return;
		return this.__mapValuesData__[index];
	}),
	has: d(function (key) {
		return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
	}),
	keys: d(function () { return new Iterator(this, 'key'); }),
	set: d(function (key, value) {
		var index = eIndexOf.call(this.__mapKeysData__, key), emit;
		if (index === -1) {
			index = this.__mapKeysData__.push(key) - 1;
			emit = true;
		}
		this.__mapValuesData__[index] = value;
		if (emit) this.emit('_add', index, key);
		return this;
	}),
	size: d.gs(function () { return this.__mapKeysData__.length; }),
	values: d(function () { return new Iterator(this, 'value'); }),
	toString: d(function () { return '[object Map]'; })
}));
Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
	return this.entries();
}));
Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not support it (or partially support it)



var d              = __webpack_require__(10)
  , validateSymbol = __webpack_require__(115)

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// If there's native implementation of given symbol, let's fallback to it
	// to ensure proper interoperability with other native functions e.g. Array.from
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(113);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d        = __webpack_require__(10)
  , callable = __webpack_require__(11)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(25);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(50);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(22);

var _PathUtils = __webpack_require__(17);

var _createTransitionManager = __webpack_require__(32);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _ExecutionEnvironment = __webpack_require__(49);

var _DOMUtils = __webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

var getHistoryState = function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/mjackson/history/pull/289
    return {};
  }
};

/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
var createBrowserHistory = function createBrowserHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Browser history needs a DOM') : (0, _invariant2.default)(false) : void 0;

  var globalHistory = window.history;
  var canUseHistory = (0, _DOMUtils.supportsHistory)();
  var needsHashChangeListener = !(0, _DOMUtils.supportsPopStateOnHashChange)();

  var _props$basename = props.basename,
      basename = _props$basename === undefined ? '' : _props$basename,
      _props$forceRefresh = props.forceRefresh,
      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


  var getDOMLocation = function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;


    var path = pathname + search + hash;

    if (basename) path = (0, _PathUtils.stripPrefix)(path, basename);

    return _extends({}, (0, _PathUtils.parsePath)(path), {
      state: state,
      key: key
    });
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var handlePopState = function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if ((0, _DOMUtils.isExtraneousPopstateEvent)(event)) return;

    handlePop(getDOMLocation(event.state));
  };

  var handleHashChange = function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  };

  var forceNextPop = false;

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      (function () {
        var action = 'POP';

        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
          if (ok) {
            setState({ action: action, location: location });
          } else {
            revertPop(location);
          }
        });
      })();
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allKeys.indexOf(fromLocation.key);

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key];

  // Public interface

  var createHref = function createHref(location) {
    return basename + (0, _PathUtils.createPath)(location);
  };

  var push = function push(path, state) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.pushState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

          nextKeys.push(location.key);
          allKeys = nextKeys;

          setState({ action: action, location: location });
        }
      } else {
        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : void 0;

        window.location.href = href;
      }
    });
  };

  var replace = function replace(path, state) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var href = createHref(location);
      var key = location.key,
          state = location.state;


      if (canUseHistory) {
        globalHistory.replaceState({ key: key, state: state }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);

          if (prevIndex !== -1) allKeys[prevIndex] = location.key;

          setState({ action: action, location: location });
        }
      } else {
        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : void 0;

        window.location.replace(href);
      }
    });
  };

  var go = function go(n) {
    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

      if (needsHashChangeListener) (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      return unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createBrowserHistory;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(25);

var _warning2 = _interopRequireDefault(_warning);

var _invariant = __webpack_require__(50);

var _invariant2 = _interopRequireDefault(_invariant);

var _LocationUtils = __webpack_require__(22);

var _PathUtils = __webpack_require__(17);

var _createTransitionManager = __webpack_require__(32);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

var _ExecutionEnvironment = __webpack_require__(49);

var _DOMUtils = __webpack_require__(48);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HashChangeEvent = 'hashchange';

var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + (0, _PathUtils.stripLeadingSlash)(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: _PathUtils.stripLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  },
  slash: {
    encodePath: _PathUtils.addLeadingSlash,
    decodePath: _PathUtils.addLeadingSlash
  }
};

var getHashPath = function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};

var pushHashPath = function pushHashPath(path) {
  return window.location.hash = path;
};

var replaceHashPath = function replaceHashPath(path) {
  var hashIndex = window.location.href.indexOf('#');

  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
};

var createHashHistory = function createHashHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Hash history needs a DOM') : (0, _invariant2.default)(false) : void 0;

  var globalHistory = window.history;
  var canGoWithoutReload = (0, _DOMUtils.supportsGoWithoutReloadUsingHash)();

  var _props$basename = props.basename,
      basename = _props$basename === undefined ? '' : _props$basename,
      _props$getUserConfirm = props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === undefined ? _DOMUtils.getConfirmation : _props$getUserConfirm,
      _props$hashType = props.hashType,
      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;


  var getDOMLocation = function getDOMLocation() {
    var path = decodePath(getHashPath());

    if (basename) path = (0, _PathUtils.stripPrefix)(path, basename);

    return (0, _PathUtils.parsePath)(path);
  };

  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var forceNextPop = false;
  var ignorePath = null;

  var handleHashChange = function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;

      if (!forceNextPop && (0, _LocationUtils.locationsAreEqual)(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === (0, _PathUtils.createPath)(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;

      handlePop(location);
    }
  };

  var handlePop = function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      (function () {
        var action = 'POP';

        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
          if (ok) {
            setState({ action: action, location: location });
          } else {
            revertPop(location);
          }
        });
      })();
    }
  };

  var revertPop = function revertPop(fromLocation) {
    var toLocation = history.location;

    // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(toLocation));

    if (toIndex === -1) toIndex = 0;

    var fromIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(fromLocation));

    if (fromIndex === -1) fromIndex = 0;

    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  };

  // Ensure the hash is encoded properly before doing anything else.
  var path = getHashPath();
  var encodedPath = encodePath(path);

  if (path !== encodedPath) replaceHashPath(encodedPath);

  var initialLocation = getDOMLocation();
  var allPaths = [(0, _PathUtils.createPath)(initialLocation)];

  // Public interface

  var createHref = function createHref(location) {
    return '#' + encodePath(basename + (0, _PathUtils.createPath)(location));
  };

  var push = function push(path, state) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored') : void 0;

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);

        var prevIndex = allPaths.lastIndexOf((0, _PathUtils.createPath)(history.location));
        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

        nextPaths.push(path);
        allPaths = nextPaths;

        setState({ action: action, location: location });
      } else {
        process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack') : void 0;

        setState();
      }
    });
  };

  var replace = function replace(path, state) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored') : void 0;

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, undefined, undefined, history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var path = (0, _PathUtils.createPath)(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf((0, _PathUtils.createPath)(history.location));

      if (prevIndex !== -1) allPaths[prevIndex] = path;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : void 0;

    globalHistory.go(n);
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var listenerCount = 0;

  var checkDOMListeners = function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1) {
      (0, _DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      (0, _DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
    }
  };

  var isBlocked = false;

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  };

  var listen = function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return function () {
      checkDOMListeners(-1);
      return unlisten();
    };
  };

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createHashHistory;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _warning = __webpack_require__(25);

var _warning2 = _interopRequireDefault(_warning);

var _PathUtils = __webpack_require__(17);

var _LocationUtils = __webpack_require__(22);

var _createTransitionManager = __webpack_require__(32);

var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clamp = function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
};

/**
 * Creates a history object that stores locations in memory.
 */
var createMemoryHistory = function createMemoryHistory() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getUserConfirmation = props.getUserConfirmation,
      _props$initialEntries = props.initialEntries,
      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
      _props$initialIndex = props.initialIndex,
      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
      _props$keyLength = props.keyLength,
      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


  var transitionManager = (0, _createTransitionManager2.default)();

  var setState = function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;

    transitionManager.notifyListeners(history.location, history.action);
  };

  var createKey = function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  };

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry, index) {
    return typeof entry === 'string' ? (0, _LocationUtils.createLocation)(entry, undefined, index ? createKey() : undefined) : (0, _LocationUtils.createLocation)(entry, undefined, index ? entry.key || createKey() : undefined);
  });

  // Public interface

  var createHref = _PathUtils.createPath;

  var push = function push(path, state) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;

    var action = 'PUSH';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;

      var nextEntries = history.entries.slice(0);
      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  };

  var replace = function replace(path, state) {
    process.env.NODE_ENV !== 'production' ? (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;

    var action = 'REPLACE';
    var location = (0, _LocationUtils.createLocation)(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;

      history.entries[history.index] = location;

      setState({ action: action, location: location });
    });
  };

  var go = function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

    var action = 'POP';
    var location = history.entries[nextIndex];

    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  };

  var goBack = function goBack() {
    return go(-1);
  };

  var goForward = function goForward() {
    return go(1);
  };

  var canGo = function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  };

  var block = function block() {
    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return transitionManager.setPrompt(prompt);
  };

  var listen = function listen(listener) {
    return transitionManager.appendListener(listener);
  };

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };

  return history;
};

exports.default = createMemoryHistory;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createPath = exports.parsePath = exports.locationsAreEqual = exports.createLocation = exports.createMemoryHistory = exports.createHashHistory = exports.createBrowserHistory = undefined;

var _LocationUtils = __webpack_require__(22);

Object.defineProperty(exports, 'createLocation', {
  enumerable: true,
  get: function get() {
    return _LocationUtils.createLocation;
  }
});
Object.defineProperty(exports, 'locationsAreEqual', {
  enumerable: true,
  get: function get() {
    return _LocationUtils.locationsAreEqual;
  }
});

var _PathUtils = __webpack_require__(17);

Object.defineProperty(exports, 'parsePath', {
  enumerable: true,
  get: function get() {
    return _PathUtils.parsePath;
  }
});
Object.defineProperty(exports, 'createPath', {
  enumerable: true,
  get: function get() {
    return _PathUtils.createPath;
  }
});

var _createBrowserHistory2 = __webpack_require__(117);

var _createBrowserHistory3 = _interopRequireDefault(_createBrowserHistory2);

var _createHashHistory2 = __webpack_require__(118);

var _createHashHistory3 = _interopRequireDefault(_createHashHistory2);

var _createMemoryHistory2 = __webpack_require__(119);

var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.createBrowserHistory = _createBrowserHistory3.default;
exports.createHashHistory = _createHashHistory3.default;
exports.createMemoryHistory = _createMemoryHistory3.default;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
  rsUpper + '+' + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var kebabCase = createCompounder(function(result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = kebabCase;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */
function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0,
      lastIndex = length - 1;

  while (length--) {
    var index = indexes[length];
    if (length == lastIndex || index !== previous) {
      var previous = index;
      if (isIndex(index)) {
        splice.call(array, index, 1);
      }
      else if (!isKey(index, array)) {
        var path = castPath(index),
            object = parent(array, path);

        if (object != null) {
          delete object[toKey(last(path))];
        }
      }
      else {
        delete array[toKey(index)];
      }
    }
  }
  return array;
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
 * to pull elements from an array by value.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [1, 2, 3, 4];
 * var evens = _.remove(array, function(n) {
 *   return n % 2 == 0;
 * });
 *
 * console.log(array);
 * // => [1, 3]
 *
 * console.log(evens);
 * // => [2, 4]
 */
function remove(array, predicate) {
  var result = [];
  if (!(array && array.length)) {
    return result;
  }
  var index = -1,
      indexes = [],
      length = array.length;

  predicate = baseIteratee(predicate, 3);
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result.push(value);
      indexes.push(index);
    }
  }
  basePullAt(array, indexes);
  return result;
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = remove;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), __webpack_require__(58)(module)))

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return baseFindIndex(array, baseIsNaN, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    Set = getNative(root, 'Set'),
    nativeCreate = getNative(Object, 'create');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each
 * element is kept.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length)
    ? baseUniq(array)
    : [];
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = uniq;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {


// https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/parse-tag.js

var split = __webpack_require__(78)

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/
var notClassId = /^\.|#/

module.exports = function parseSelector (selector, upper) {
  selector = selector || ''
  var tagName
  var id = ''
  var classes = []

  var tagParts = split(selector, classIdSplit)

  if (notClassId.test(tagParts[1]) || selector === '') {
    tagName = 'div'
  }

  var part, type, i

  for (i = 0; i < tagParts.length; i++) {
    part = tagParts[i]

    if (!part) {
      continue
    }

    type = part.charAt(0)

    if (!tagName) {
      tagName = part
    } else if (type === '.') {
      classes.push(part.substring(1, part.length))
    } else if (type === '#') {
      id = part.substring(1, part.length)
    }
  }

  return {
    tagName: upper === true ? tagName.toUpperCase() : tagName,
    id: id,
    className: classes.join(' ')
  }
}


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsolute = function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
};

// About 1.5x faster than the two-arg version of Array#splice()
var spliceOne = function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }list.pop();
};

// This implementation is based heavily on node's url.parse
var resolvePathname = function resolvePathname(to) {
  var from = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash = void 0;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) {
    fromParts.unshift('..');
  }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
};

module.exports = resolvePathname;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var selectorParser_1 = __webpack_require__(51);
function classNameFromVNode(vNode) {
    var _a = selectorParser_1.selectorParser(vNode).className, cn = _a === void 0 ? '' : _a;
    if (!vNode.data) {
        return cn;
    }
    var _b = vNode.data, dataClass = _b.class, props = _b.props;
    if (dataClass) {
        var c = Object.keys(dataClass)
            .filter(function (cl) { return dataClass[cl]; });
        cn += " " + c.join(" ");
    }
    if (props && props.className) {
        cn += " " + props.className;
    }
    return cn && cn.trim();
}
exports.classNameFromVNode = classNameFromVNode;
//# sourceMappingURL=classNameFromVNode.js.map

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {


var parseSelector = __webpack_require__(125)
var VOID_ELEMENTS = __webpack_require__(52).VOID
var CONTAINER_ELEMENTS = __webpack_require__(52).CONTAINER

module.exports = function init (modules) {
  function parse (vnode, node) {
    var result = []
    var attributes = new Map([
      // These can be overwritten because that’s what happens in snabbdom
      ['id', node.id],
      ['class', node.className]
    ])

    modules.forEach(function (fn, index) {
      fn(vnode, attributes)
    })
    attributes.forEach(function (value, key) {
      if (value && value !== '') {
        result.push(key + '="' + value + '"')
      }
    })

    return result.join(' ')
  }

  return function renderToString (vnode) {
    if (!vnode.sel && vnode.text) {
      return vnode.text
    }

    vnode.data = vnode.data || {}

    // Support thunks
    if (vnode.data.hook &&
      typeof vnode.data.hook.init === 'function' &&
      typeof vnode.data.fn === 'function') {
      vnode.data.hook.init(vnode)
    }

    var node = parseSelector(vnode.sel)
    var tagName = node.tagName
    var attributes = parse(vnode, node)
    var svg = vnode.data.ns === 'http://www.w3.org/2000/svg'
    var tag = []

    // Open tag
    tag.push('<' + tagName)
    if (attributes.length) {
      tag.push(' ' + attributes)
    }
    if (svg && CONTAINER_ELEMENTS[tagName] !== true) {
      tag.push(' /')
    }
    tag.push('>')

    // Close tag, if needed
    if ((VOID_ELEMENTS[tagName] !== true && !svg) ||
        (svg && CONTAINER_ELEMENTS[tagName] === true)) {
      if (vnode.data.props && vnode.data.props.innerHTML) {
        tag.push(vnode.data.props.innerHTML)
      } else if (vnode.text) {
        tag.push(vnode.text)
      } else if (vnode.children) {
        vnode.children.forEach(function (child) {
          tag.push(renderToString(child))
        })
      }
      tag.push('</' + tagName + '>')
    }

    return tag.join('')
  }
}


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {


var forOwn = __webpack_require__(23)
var escape = __webpack_require__(33)

// data.attrs

module.exports = function attrsModule (vnode, attributes) {
  var attrs = vnode.data.attrs || {}

  forOwn(attrs, function (value, key) {
    attributes.set(key, escape(value))
  })
}


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {


var forOwn = __webpack_require__(23)
var remove = __webpack_require__(122)
var uniq = __webpack_require__(123)

// data.class

module.exports = function classModule (vnode, attributes) {
  var values
  var _add = []
  var _remove = []
  var classes = vnode.data.class || {}
  var existing = attributes.get('class')
  existing = existing.length > 0 ? existing.split(' ') : []

  forOwn(classes, function (value, key) {
    if (value === true) {
      _add.push(key)
    } else {
      _remove.push(key)
    }
  })

  values = remove(uniq(existing.concat(_add)), function (value) {
    return _remove.indexOf(value) < 0
  })

  if (values.length) {
    attributes.set('class', values.join(' '))
  }
}


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = {
  class: __webpack_require__(130),
  props: __webpack_require__(132),
  attributes: __webpack_require__(129),
  style: __webpack_require__(133)
}


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {


var forOwn = __webpack_require__(23)
var escape = __webpack_require__(33)

// https://developer.mozilla.org/en-US/docs/Web/API/element
var omit = [
  'attributes',
  'childElementCount',
  'children',
  'classList',
  'clientHeight',
  'clientLeft',
  'clientTop',
  'clientWidth',
  'currentStyle',
  'firstElementChild',
  'innerHTML',
  'lastElementChild',
  'nextElementSibling',
  'ongotpointercapture',
  'onlostpointercapture',
  'onwheel',
  'outerHTML',
  'previousElementSibling',
  'runtimeStyle',
  'scrollHeight',
  'scrollLeft',
  'scrollLeftMax',
  'scrollTop',
  'scrollTopMax',
  'scrollWidth',
  'tabStop',
  'tagName'
]

// data.props

module.exports = function propsModule (vnode, attributes) {
  var props = vnode.data.props || {}

  forOwn(props, function (value, key) {
    if (omit.indexOf(key) > -1) {
      return
    }
    if (key === 'htmlFor') {
      key = 'for'
    }
    if (key === 'className') {
      key = 'class'
    }

    attributes.set(key.toLowerCase(), escape(value))
  })
}


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {


var assign = __webpack_require__(124)
var forOwn = __webpack_require__(23)
var escape = __webpack_require__(33)
var kebabCase = __webpack_require__(121)

// data.style

module.exports = function styleModule (vnode, attributes) {
  var values = []
  var style = vnode.data.style || {}

  // merge in `delayed` properties
  if (style.delayed) {
    assign(style, style.delayed)
  }

  forOwn(style, function (value, key) {
    // omit hook objects
    if (typeof value === 'string' || typeof value === 'number') {
      values.push(kebabCase(key) + ': ' + escape(value))
    }
  })

  if (values.length) {
    attributes.set('style', values.join('; '))
  }
}


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var NamespaceURIs = {
    "xlink": "http://www.w3.org/1999/xlink"
};
var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare",
    "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable",
    "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple",
    "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly",
    "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate",
    "truespeed", "typemustmatch", "visible"];
var booleanAttrsDict = Object.create(null);
for (var i = 0, len = booleanAttrs.length; i < len; i++) {
    booleanAttrsDict[booleanAttrs[i]] = true;
}
function updateAttrs(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs, namespaceSplit;
    if (!oldAttrs && !attrs)
        return;
    if (oldAttrs === attrs)
        return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        cur = attrs[key];
        old = oldAttrs[key];
        if (old !== cur) {
            if (!cur && booleanAttrsDict[key])
                elm.removeAttribute(key);
            else {
                namespaceSplit = key.split(":");
                if (namespaceSplit.length > 1 && NamespaceURIs.hasOwnProperty(namespaceSplit[0]))
                    elm.setAttributeNS(NamespaceURIs[namespaceSplit[0]], key, cur);
                else
                    elm.setAttribute(key, cur);
            }
        }
    }
    //remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
exports.attributesModule = { create: updateAttrs, update: updateAttrs };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.attributesModule;
//# sourceMappingURL=attributes.js.map

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function updateClass(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldClass = oldVnode.data.class, klass = vnode.data.class;
    if (!oldClass && !klass)
        return;
    if (oldClass === klass)
        return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
exports.classModule = { create: updateClass, update: updateClass };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.classModule;
//# sourceMappingURL=class.js.map

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var CAPS_REGEX = /[A-Z]/g;
function updateDataset(oldVnode, vnode) {
    var elm = vnode.elm, oldDataset = oldVnode.data.dataset, dataset = vnode.data.dataset, key;
    if (!oldDataset && !dataset)
        return;
    if (oldDataset === dataset)
        return;
    oldDataset = oldDataset || {};
    dataset = dataset || {};
    var d = elm.dataset;
    for (key in oldDataset) {
        if (!dataset[key]) {
            if (d) {
                delete d[key];
            }
            else {
                elm.removeAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase());
            }
        }
    }
    for (key in dataset) {
        if (oldDataset[key] !== dataset[key]) {
            if (d) {
                d[key] = dataset[key];
            }
            else {
                elm.setAttribute('data-' + key.replace(CAPS_REGEX, '-$&').toLowerCase(), dataset[key]);
            }
        }
    }
}
exports.datasetModule = { create: updateDataset, update: updateDataset };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.datasetModule;
//# sourceMappingURL=dataset.js.map

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function updateProps(oldVnode, vnode) {
    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
    if (!oldProps && !props)
        return;
    if (oldProps === props)
        return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
exports.propsModule = { create: updateProps, update: updateProps };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.propsModule;
//# sourceMappingURL=props.js.map

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function (fn) { raf(function () { raf(fn); }); };
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
}
function updateStyle(oldVnode, vnode) {
    var cur, name, elm = vnode.elm, oldStyle = oldVnode.data.style, style = vnode.data.style;
    if (!oldStyle && !style)
        return;
    if (oldStyle === style)
        return;
    oldStyle = oldStyle || {};
    style = style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.removeProperty(name);
            }
            else {
                elm.style[name] = '';
            }
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed') {
            for (name in style.delayed) {
                cur = style.delayed[name];
                if (!oldHasDel || cur !== oldStyle.delayed[name]) {
                    setNextFrame(elm.style, name, cur);
                }
            }
        }
        else if (name !== 'remove' && cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.setProperty(name, cur);
            }
            else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    var style, name, elm = vnode.elm, s = vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    var name, elm = vnode.elm, i = 0, compStyle, style = s.remove, amount = 0, applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
    });
}
exports.styleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.styleModule;
//# sourceMappingURL=style.js.map

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var vnode_1 = __webpack_require__(24);
var is = __webpack_require__(54);
var htmldomapi_1 = __webpack_require__(53);
function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
var emptyNode = vnode_1.default('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i, map = {}, key, ch;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined)
                map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
var h_1 = __webpack_require__(18);
exports.h = h_1.h;
var thunk_1 = __webpack_require__(55);
exports.thunk = thunk_1.thunk;
function init(modules, domApi) {
    var i, j, cbs = {};
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return vnode_1.default(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent_1 = api.parentNode(childElm);
                api.removeChild(parent_1, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children, sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        }
        else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.id = sel.slice(hash + 1, dot);
            if (dotIdx > 0)
                elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](emptyNode, vnode);
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            }
            else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create)
                    i.create(emptyNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i, j, data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    }
                    else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i, hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i, elm, parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        }
        else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i)
            cbs.post[i]();
        return vnode;
    };
}
exports.init = init;
//# sourceMappingURL=snabbdom.js.map

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var vnode_1 = __webpack_require__(24);
var htmldomapi_1 = __webpack_require__(53);
function toVNode(node, domApi) {
    var api = domApi !== undefined ? domApi : htmldomapi_1.default;
    var text;
    if (api.isElement(node)) {
        var id = node.id ? '#' + node.id : '';
        var cn = node.getAttribute('class');
        var c = cn ? '.' + cn.split(' ').join('.') : '';
        var sel = api.tagName(node).toLowerCase() + id + c;
        var attrs = {};
        var children = [];
        var name_1;
        var i = void 0, n = void 0;
        var elmAttrs = node.attributes;
        var elmChildren = node.childNodes;
        for (i = 0, n = elmAttrs.length; i < n; i++) {
            name_1 = elmAttrs[i].nodeName;
            if (name_1 !== 'id' && name_1 !== 'class') {
                attrs[name_1] = elmAttrs[i].nodeValue;
            }
        }
        for (i = 0, n = elmChildren.length; i < n; i++) {
            children.push(toVNode(elmChildren[i]));
        }
        return vnode_1.default(sel, { attrs: attrs }, children, undefined, node);
    }
    else if (api.isText(node)) {
        text = api.getTextContent(node);
        return vnode_1.default(undefined, undefined, undefined, text, node);
    }
    else if (api.isComment(node)) {
        text = api.getTextContent(node);
        return vnode_1.default('!', undefined, undefined, text, undefined);
    }
    else {
        return vnode_1.default('', {}, [], undefined, undefined);
    }
}
exports.toVNode = toVNode;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = toVNode;
//# sourceMappingURL=tovnode.js.map

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(142);
/* harmony export (immutable) */ __webpack_exports__["default"] = switchPath;

function switchPathInputGuard(path, routes) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* isPattern */])(path)) {
        throw new Error("First parameter to switchPath must be a route path.");
    }
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isRouteDefinition */])(routes)) {
        throw new Error("Second parameter to switchPath must be an object " +
            "containing route patterns.");
    }
}
function validatePath(sourcePath, matchedPath) {
    var sourceParts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* splitPath */])(sourcePath);
    var matchedParts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* splitPath */])(matchedPath);
    for (var i = 0; i < matchedParts.length; ++i) {
        if (matchedParts[i] !== sourceParts[i]) {
            return null;
        }
    }
    return "/" + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* extractPartial */])(sourcePath, matchedPath);
}
function betterMatch(candidate, reference) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* isNotNull */])(candidate)) {
        return false;
    }
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* isNotNull */])(reference)) {
        return true;
    }
    if (!validatePath(candidate, reference)) {
        return false;
    }
    return candidate.length >= reference.length;
}
function matchesWithParams(sourcePath, pattern) {
    var sourceParts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* splitPath */])(sourcePath);
    var patternParts = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* splitPath */])(pattern);
    var params = patternParts
        .map(function (part, i) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* isParam */])(part) ? sourceParts[i] : null; })
        .filter(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* isNotNull */]);
    var matched = patternParts
        .every(function (part, i) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* isParam */])(part) || part === sourceParts[i]; });
    return matched ? params : [];
}
function getParamFnValue(paramFn, params) {
    var _paramFn = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isRouteDefinition */])(paramFn) ? paramFn["/"] : paramFn;
    return typeof _paramFn === "function" ? _paramFn.apply(void 0, params) : _paramFn;
}
function validate(_a) {
    var sourcePath = _a.sourcePath, matchedPath = _a.matchedPath, matchedValue = _a.matchedValue, routes = _a.routes;
    var path = matchedPath ? validatePath(sourcePath, matchedPath) : null;
    var value = matchedValue;
    if (!path) {
        path = routes["*"] ? sourcePath : null;
        value = path ? routes["*"] : null;
    }
    return { path: path, value: value };
}
function switchPath(sourcePath, routes) {
    switchPathInputGuard(sourcePath, routes);
    var matchedPath = null;
    var matchedValue = null;
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* traverseRoutes */])(routes, function matchPattern(pattern) {
        if (sourcePath.search(pattern) === 0 && betterMatch(pattern, matchedPath)) {
            matchedPath = pattern;
            matchedValue = routes[pattern];
        }
        var params = matchesWithParams(sourcePath, pattern).filter(Boolean);
        if (params.length > 0 && betterMatch(sourcePath, matchedPath)) {
            matchedPath = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* extractPartial */])(sourcePath, pattern);
            matchedValue = getParamFnValue(routes[pattern], params);
        }
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* isRouteDefinition */])(routes[pattern]) && params.length === 0) {
            if (sourcePath !== "/") {
                var child = switchPath(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["h" /* unprefixed */])(sourcePath, pattern) || "/", routes[pattern]);
                var nestedPath = pattern + child.path;
                if (child.path !== null &&
                    betterMatch(nestedPath, matchedPath)) {
                    matchedPath = nestedPath;
                    matchedValue = child.value;
                }
            }
        }
    });
    return validate({ sourcePath: sourcePath, matchedPath: matchedPath, matchedValue: matchedValue, routes: routes });
}
//# sourceMappingURL=index.js.map

/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isPattern;
/* harmony export (immutable) */ __webpack_exports__["b"] = isRouteDefinition;
/* harmony export (immutable) */ __webpack_exports__["g"] = traverseRoutes;
/* harmony export (immutable) */ __webpack_exports__["e"] = isNotNull;
/* harmony export (immutable) */ __webpack_exports__["c"] = splitPath;
/* harmony export (immutable) */ __webpack_exports__["f"] = isParam;
/* harmony export (immutable) */ __webpack_exports__["d"] = extractPartial;
/* harmony export (immutable) */ __webpack_exports__["h"] = unprefixed;
function isPattern(candidate) {
    return candidate.charAt(0) === "/" || candidate === "*";
}
function isRouteDefinition(candidate) {
    return !candidate || typeof candidate !== "object" ?
        false : isPattern(Object.keys(candidate)[0]);
}
function traverseRoutes(routes, callback) {
    var keys = Object.keys(routes);
    for (var i = 0; i < keys.length; ++i) {
        var pattern = keys[i];
        if (pattern === "*")
            continue;
        callback(pattern);
    }
}
function isNotNull(candidate) {
    return candidate !== null;
}
function splitPath(path) {
    return path.split("/").filter(function (s) { return !!s; });
}
function isParam(candidate) {
    return candidate.match(/:\w+/) !== null;
}
function extractPartial(sourcePath, pattern) {
    var patternParts = splitPath(pattern);
    var sourceParts = splitPath(sourcePath);
    var matchedParts = [];
    for (var i = 0; i < patternParts.length; ++i) {
        matchedParts.push(sourceParts[i]);
    }
    return matchedParts.filter(isNotNull).join("/");
}
function unprefixed(fullString, prefix) {
    return fullString.split(prefix)[1];
}
//# sourceMappingURL=util.js.map

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(144);


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(145);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), __webpack_require__(58)(module)))

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.4.0 */

(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.Tether = factory();
  }
}(this, function(require, exports, module) {

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TetherBase = undefined;
if (typeof TetherBase === 'undefined') {
  TetherBase = { modules: [] };
}

var zeroElement = null;

// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
// if the element lies within a nested document (<frame> or <iframe>-like).
function getActualBoundingClientRect(node) {
  var boundingRect = node.getBoundingClientRect();

  // The original object returned by getBoundingClientRect is immutable, so we clone it
  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
  var rect = {};
  for (var k in boundingRect) {
    rect[k] = boundingRect[k];
  }

  if (node.ownerDocument !== document) {
    var _frameElement = node.ownerDocument.defaultView.frameElement;
    if (_frameElement) {
      var frameRect = getActualBoundingClientRect(_frameElement);
      rect.top += frameRect.top;
      rect.bottom += frameRect.top;
      rect.left += frameRect.left;
      rect.right += frameRect.left;
    }
  }

  return rect;
}

function getScrollParents(el) {
  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
  var computedStyle = getComputedStyle(el) || {};
  var position = computedStyle.position;
  var parents = [];

  if (position === 'fixed') {
    return [el];
  }

  var parent = el;
  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
    var style = undefined;
    try {
      style = getComputedStyle(parent);
    } catch (err) {}

    if (typeof style === 'undefined' || style === null) {
      parents.push(parent);
      return parents;
    }

    var _style = style;
    var overflow = _style.overflow;
    var overflowX = _style.overflowX;
    var overflowY = _style.overflowY;

    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
        parents.push(parent);
      }
    }
  }

  parents.push(el.ownerDocument.body);

  // If the node is within a frame, account for the parent window scroll
  if (el.ownerDocument !== document) {
    parents.push(el.ownerDocument.defaultView);
  }

  return parents;
}

var uniqueId = (function () {
  var id = 0;
  return function () {
    return ++id;
  };
})();

var zeroPosCache = {};
var getOrigin = function getOrigin() {
  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
  // jitter as the user scrolls that messes with our ability to detect if two positions
  // are equivilant or not.  We place an element at the top left of the page that will
  // get the same jitter, so we can cancel the two out.
  var node = zeroElement;
  if (!node || !document.body.contains(node)) {
    node = document.createElement('div');
    node.setAttribute('data-tether-id', uniqueId());
    extend(node.style, {
      top: 0,
      left: 0,
      position: 'absolute'
    });

    document.body.appendChild(node);

    zeroElement = node;
  }

  var id = node.getAttribute('data-tether-id');
  if (typeof zeroPosCache[id] === 'undefined') {
    zeroPosCache[id] = getActualBoundingClientRect(node);

    // Clear the cache when this position call is done
    defer(function () {
      delete zeroPosCache[id];
    });
  }

  return zeroPosCache[id];
};

function removeUtilElements() {
  if (zeroElement) {
    document.body.removeChild(zeroElement);
  }
  zeroElement = null;
};

function getBounds(el) {
  var doc = undefined;
  if (el === document) {
    doc = document;
    el = document.documentElement;
  } else {
    doc = el.ownerDocument;
  }

  var docEl = doc.documentElement;

  var box = getActualBoundingClientRect(el);

  var origin = getOrigin();

  box.top -= origin.top;
  box.left -= origin.left;

  if (typeof box.width === 'undefined') {
    box.width = document.body.scrollWidth - box.left - box.right;
  }
  if (typeof box.height === 'undefined') {
    box.height = document.body.scrollHeight - box.top - box.bottom;
  }

  box.top = box.top - docEl.clientTop;
  box.left = box.left - docEl.clientLeft;
  box.right = doc.body.clientWidth - box.width - box.left;
  box.bottom = doc.body.clientHeight - box.height - box.top;

  return box;
}

function getOffsetParent(el) {
  return el.offsetParent || document.documentElement;
}

var _scrollBarSize = null;
function getScrollBarSize() {
  if (_scrollBarSize) {
    return _scrollBarSize;
  }
  var inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  extend(outer.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var widthContained = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var widthScroll = inner.offsetWidth;

  if (widthContained === widthScroll) {
    widthScroll = outer.clientWidth;
  }

  document.body.removeChild(outer);

  var width = widthContained - widthScroll;

  _scrollBarSize = { width: width, height: width };
  return _scrollBarSize;
}

function extend() {
  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var args = [];

  Array.prototype.push.apply(args, arguments);

  args.slice(1).forEach(function (obj) {
    if (obj) {
      for (var key in obj) {
        if (({}).hasOwnProperty.call(obj, key)) {
          out[key] = obj[key];
        }
      }
    }
  });

  return out;
}

function removeClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  } else {
    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
    var className = getClassName(el).replace(regex, ' ');
    setClassName(el, className);
  }
}

function addClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  } else {
    removeClass(el, name);
    var cls = getClassName(el) + (' ' + name);
    setClassName(el, cls);
  }
}

function hasClass(el, name) {
  if (typeof el.classList !== 'undefined') {
    return el.classList.contains(name);
  }
  var className = getClassName(el);
  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
}

function getClassName(el) {
  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
  // completely separately SVGAnimatedString base classes
  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
    return el.className.baseVal;
  }
  return el.className;
}

function setClassName(el, className) {
  el.setAttribute('class', className);
}

function updateClasses(el, add, all) {
  // Of the set of 'all' classes, we need the 'add' classes, and only the
  // 'add' classes to be set.
  all.forEach(function (cls) {
    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
      removeClass(el, cls);
    }
  });

  add.forEach(function (cls) {
    if (!hasClass(el, cls)) {
      addClass(el, cls);
    }
  });
}

var deferred = [];

var defer = function defer(fn) {
  deferred.push(fn);
};

var flush = function flush() {
  var fn = undefined;
  while (fn = deferred.pop()) {
    fn();
  }
};

var Evented = (function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var i = 0;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;

          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
})();

TetherBase.Utils = {
  getActualBoundingClientRect: getActualBoundingClientRect,
  getScrollParents: getScrollParents,
  getBounds: getBounds,
  getOffsetParent: getOffsetParent,
  extend: extend,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  updateClasses: updateClasses,
  defer: defer,
  flush: flush,
  uniqueId: uniqueId,
  Evented: Evented,
  getScrollBarSize: getScrollBarSize,
  removeUtilElements: removeUtilElements
};
/* globals TetherBase, performance */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof TetherBase === 'undefined') {
  throw new Error('You must include the utils.js file before tether.js');
}

var _TetherBase$Utils = TetherBase.Utils;
var getScrollParents = _TetherBase$Utils.getScrollParents;
var getBounds = _TetherBase$Utils.getBounds;
var getOffsetParent = _TetherBase$Utils.getOffsetParent;
var extend = _TetherBase$Utils.extend;
var addClass = _TetherBase$Utils.addClass;
var removeClass = _TetherBase$Utils.removeClass;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;
var flush = _TetherBase$Utils.flush;
var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
var removeUtilElements = _TetherBase$Utils.removeUtilElements;

function within(a, b) {
  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

  return a + diff >= b && b >= a - diff;
}

var transformKey = (function () {
  if (typeof document === 'undefined') {
    return '';
  }
  var el = document.createElement('div');

  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
  for (var i = 0; i < transforms.length; ++i) {
    var key = transforms[i];
    if (el.style[key] !== undefined) {
      return key;
    }
  }
})();

var tethers = [];

var position = function position() {
  tethers.forEach(function (tether) {
    tether.position(false);
  });
  flush();
};

function now() {
  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
    return performance.now();
  }
  return +new Date();
}

(function () {
  var lastCall = null;
  var lastDuration = null;
  var pendingTimeout = null;

  var tick = function tick() {
    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
      // We voluntarily throttle ourselves if we can't manage 60fps
      lastDuration = Math.min(lastDuration - 16, 250);

      // Just in case this is the last event, remember to position just once more
      pendingTimeout = setTimeout(tick, 250);
      return;
    }

    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
      // Some browsers call events a little too frequently, refuse to run more than is reasonable
      return;
    }

    if (pendingTimeout != null) {
      clearTimeout(pendingTimeout);
      pendingTimeout = null;
    }

    lastCall = now();
    position();
    lastDuration = now() - lastCall;
  };

  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
      window.addEventListener(event, tick);
    });
  }
})();

var MIRROR_LR = {
  center: 'center',
  left: 'right',
  right: 'left'
};

var MIRROR_TB = {
  middle: 'middle',
  top: 'bottom',
  bottom: 'top'
};

var OFFSET_MAP = {
  top: 0,
  left: 0,
  middle: '50%',
  center: '50%',
  bottom: '100%',
  right: '100%'
};

var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (left === 'auto') {
    left = MIRROR_LR[relativeToAttachment.left];
  }

  if (top === 'auto') {
    top = MIRROR_TB[relativeToAttachment.top];
  }

  return { left: left, top: top };
};

var attachmentToOffset = function attachmentToOffset(attachment) {
  var left = attachment.left;
  var top = attachment.top;

  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
    left = OFFSET_MAP[attachment.left];
  }

  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
    top = OFFSET_MAP[attachment.top];
  }

  return { left: left, top: top };
};

function addOffset() {
  var out = { top: 0, left: 0 };

  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
    offsets[_key] = arguments[_key];
  }

  offsets.forEach(function (_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (typeof top === 'string') {
      top = parseFloat(top, 10);
    }
    if (typeof left === 'string') {
      left = parseFloat(left, 10);
    }

    out.top += top;
    out.left += left;
  });

  return out;
}

function offsetToPx(offset, size) {
  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
  }
  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
  }

  return offset;
}

var parseOffset = function parseOffset(value) {
  var _value$split = value.split(' ');

  var _value$split2 = _slicedToArray(_value$split, 2);

  var top = _value$split2[0];
  var left = _value$split2[1];

  return { top: top, left: left };
};
var parseAttachment = parseOffset;

var TetherClass = (function (_Evented) {
  _inherits(TetherClass, _Evented);

  function TetherClass(options) {
    var _this = this;

    _classCallCheck(this, TetherClass);

    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
    this.position = this.position.bind(this);

    tethers.push(this);

    this.history = [];

    this.setOptions(options, false);

    TetherBase.modules.forEach(function (module) {
      if (typeof module.initialize !== 'undefined') {
        module.initialize.call(_this);
      }
    });

    this.position();
  }

  _createClass(TetherClass, [{
    key: 'getClass',
    value: function getClass() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
      var classes = this.options.classes;

      if (typeof classes !== 'undefined' && classes[key]) {
        return this.options.classes[key];
      } else if (this.options.classPrefix) {
        return this.options.classPrefix + '-' + key;
      } else {
        return key;
      }
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      var _this2 = this;

      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };

      this.options = extend(defaults, options);

      var _options = this.options;
      var element = _options.element;
      var target = _options.target;
      var targetModifier = _options.targetModifier;

      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (typeof _this2[key] === 'undefined') {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (typeof _this2[key].jquery !== 'undefined') {
          _this2[key] = _this2[key][0];
        } else if (typeof _this2[key] === 'string') {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      addClass(this.element, this.getClass('element'));
      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('target'));
      }

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);

      if (typeof this.scrollParents !== 'undefined') {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParents = [this.target];
      } else {
        this.scrollParents = getScrollParents(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    }
  }, {
    key: 'getTargetBounds',
    value: function getTargetBounds() {
      if (typeof this.targetModifier !== 'undefined') {
        if (this.targetModifier === 'visible') {
          if (this.target === document.body) {
            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
          } else {
            var bounds = getBounds(this.target);

            var out = {
              height: bounds.height,
              width: bounds.width,
              top: bounds.top,
              left: bounds.left
            };

            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
            out.height = Math.min(innerHeight, out.height);
            out.height -= 2;

            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
            out.width = Math.min(innerWidth, out.width);
            out.width -= 2;

            if (out.top < pageYOffset) {
              out.top = pageYOffset;
            }
            if (out.left < pageXOffset) {
              out.left = pageXOffset;
            }

            return out;
          }
        } else if (this.targetModifier === 'scroll-handle') {
          var bounds = undefined;
          var target = this.target;
          if (target === document.body) {
            target = document.documentElement;

            bounds = {
              left: pageXOffset,
              top: pageYOffset,
              height: innerHeight,
              width: innerWidth
            };
          } else {
            bounds = getBounds(target);
          }

          var style = getComputedStyle(target);

          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

          var scrollBottom = 0;
          if (hasBottomScroll) {
            scrollBottom = 15;
          }

          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

          var out = {
            width: 15,
            height: height * 0.975 * (height / target.scrollHeight),
            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
          };

          var fitAdj = 0;
          if (height < 408 && this.target === document.body) {
            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
          }

          if (this.target !== document.body) {
            out.height = Math.max(out.height, 24);
          }

          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

          if (this.target === document.body) {
            out.height = Math.max(out.height, 24);
          }

          return out;
        }
      } else {
        return getBounds(this.target);
      }
    }
  }, {
    key: 'clearCache',
    value: function clearCache() {
      this._cache = {};
    }
  }, {
    key: 'cache',
    value: function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (typeof this._cache === 'undefined') {
        this._cache = {};
      }

      if (typeof this._cache[k] === 'undefined') {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    }
  }, {
    key: 'enable',
    value: function enable() {
      var _this3 = this;

      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, this.getClass('enabled'));
      }
      addClass(this.element, this.getClass('enabled'));
      this.enabled = true;

      this.scrollParents.forEach(function (parent) {
        if (parent !== _this3.target.ownerDocument) {
          parent.addEventListener('scroll', _this3.position);
        }
      });

      if (pos) {
        this.position();
      }
    }
  }, {
    key: 'disable',
    value: function disable() {
      var _this4 = this;

      removeClass(this.target, this.getClass('enabled'));
      removeClass(this.element, this.getClass('enabled'));
      this.enabled = false;

      if (typeof this.scrollParents !== 'undefined') {
        this.scrollParents.forEach(function (parent) {
          parent.removeEventListener('scroll', _this4.position);
        });
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this5 = this;

      this.disable();

      tethers.forEach(function (tether, i) {
        if (tether === _this5) {
          tethers.splice(i, 1);
        }
      });

      // Remove any elements we were using for convenience from the DOM
      if (tethers.length === 0) {
        removeUtilElements();
      }
    }
  }, {
    key: 'updateAttachClasses',
    value: function updateAttachClasses(elementAttach, targetAttach) {
      var _this6 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (typeof this._addAttachClasses === 'undefined') {
        this._addAttachClasses = [];
      }
      var add = this._addAttachClasses;

      if (elementAttach.top) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
      }
      if (elementAttach.left) {
        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
      }
      if (targetAttach.top) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
      }
      if (targetAttach.left) {
        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
      }

      var all = [];
      sides.forEach(function (side) {
        all.push(_this6.getClass('element-attached') + '-' + side);
        all.push(_this6.getClass('target-attached') + '-' + side);
      });

      defer(function () {
        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
          return;
        }

        updateClasses(_this6.element, _this6._addAttachClasses, all);
        if (!(_this6.options.addTargetClasses === false)) {
          updateClasses(_this6.target, _this6._addAttachClasses, all);
        }

        delete _this6._addAttachClasses;
      });
    }
  }, {
    key: 'position',
    value: function position() {
      var _this7 = this;

      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)

      if (!this.enabled) {
        return;
      }

      this.clearCache();

      // Turn 'auto' attachments into the appropriate corner or edge
      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

      this.updateAttachClasses(this.attachment, targetAttachment);

      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this7.element);
      });

      var width = elementPos.width;
      var height = elementPos.height;

      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
        var _lastSize = this.lastSize;

        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        width = _lastSize.width;
        height = _lastSize.height;
      } else {
        this.lastSize = { width: width, height: height };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this7.getTargetBounds();
      });
      var targetSize = targetPos;

      // Get an actual px offset from the attachment
      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

      // Add the manually provided offset
      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset);

      // It's now our goal to make (element position + offset) == (target position + target offset)
      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var _module2 = TetherBase.modules[i];
        var ret = _module2.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      }

      // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.
      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },

        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };

      var doc = this.target.ownerDocument;
      var win = doc.defaultView;

      var scrollbarSize = undefined;
      if (win.innerHeight > doc.documentElement.clientHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (win.innerWidth > doc.documentElement.clientWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = doc.body.scrollHeight - top - height;
        next.page.right = doc.body.scrollWidth - left - width;
      }

      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
        (function () {
          var offsetParent = _this7.cache('target-offsetparent', function () {
            return getOffsetParent(_this7.target);
          });
          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
            return getBounds(offsetParent);
          });
          var offsetParentStyle = getComputedStyle(offsetParent);
          var offsetParentSize = offsetPosition;

          var offsetBorder = {};
          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
          });

          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
              // We're within the visible part of the target's scroll parent
              var scrollTop = offsetParent.scrollTop;
              var scrollLeft = offsetParent.scrollLeft;

              // It's position relative to the target's offset parent (absolute positioning when
              // the element is moved to be a child of the target's offset parent).
              next.offset = {
                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
              };
            }
          }
        })();
      }

      // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.

      this.move(next);

      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    }

    // THE ISSUE
  }, {
    key: 'move',
    value: function move(pos) {
      var _this8 = this;

      if (!(typeof this.element.parentNode !== 'undefined')) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];
            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = { top: '', left: '', right: '', bottom: '' };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
        if (gpu !== false) {
          var yPos = undefined,
              xPos = undefined;
          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          if (window.matchMedia) {
            // HubSpot/tether#207
            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
            if (!retina) {
              xPos = Math.round(xPos);
              yPos = Math.round(yPos);
            }
          }

          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += " translateZ(0)";
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + 'px';
          } else {
            css.bottom = _pos.bottom + 'px';
          }

          if (_same.left) {
            css.left = _pos.left + 'px';
          } else {
            css.right = _pos.right + 'px';
          }
        }
      };

      var moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
        (function () {
          css.position = 'absolute';
          var offsetParent = _this8.cache('target-offsetparent', function () {
            return getOffsetParent(_this8.target);
          });

          if (getOffsetParent(_this8.element) !== offsetParent) {
            defer(function () {
              _this8.element.parentNode.removeChild(_this8.element);
              offsetParent.appendChild(_this8.element);
            });
          }

          transcribe(same.offset, pos.offset);
          moved = true;
        })();
      } else {
        css.position = 'absolute';
        transcribe({ top: true, left: true }, pos.page);
      }

      if (!moved) {
        if (this.options.bodyElement) {
          this.options.bodyElement.appendChild(this.element);
        } else {
          var offsetParentIsBody = true;
          var currentNode = this.element.parentNode;
          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
            if (getComputedStyle(currentNode).position !== 'static') {
              offsetParentIsBody = false;
              break;
            }

            currentNode = currentNode.parentNode;
          }

          if (!offsetParentIsBody) {
            this.element.parentNode.removeChild(this.element);
            this.element.ownerDocument.body.appendChild(this.element);
          }
        }
      }

      // Any css change will trigger a repaint, so let's avoid one if nothing changed
      var writeCSS = {};
      var write = false;
      for (var key in css) {
        var val = css[key];
        var elVal = this.element.style[key];

        if (elVal !== val) {
          write = true;
          writeCSS[key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this8.element.style, writeCSS);
          _this8.trigger('repositioned');
        });
      }
    }
  }]);

  return TetherClass;
})(Evented);

TetherClass.modules = [];

TetherBase.position = position;

var Tether = extend(TetherClass, TetherBase);
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var extend = _TetherBase$Utils.extend;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

function getBoundingRect(tether, to) {
  if (to === 'scrollParent') {
    to = tether.scrollParents[0];
  } else if (to === 'window') {
    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
  }

  if (to === document) {
    to = to.documentElement;
  }

  if (typeof to.nodeType !== 'undefined') {
    (function () {
      var node = to;
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);

      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

      // Account any parent Frames scroll offset
      if (node.ownerDocument !== document) {
        var win = node.ownerDocument.defaultView;
        to[0] += win.pageXOffset;
        to[1] += win.pageYOffset;
        to[2] += win.pageXOffset;
        to[3] += win.pageYOffset;
      }

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);
        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style['border' + side + 'Width']);
        } else {
          to[i] -= parseFloat(style['border' + side + 'Width']);
        }
      });
    })();
  }

  return to;
}

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;
    var targetAttachment = _ref.targetAttachment;

    if (!this.options.constraints) {
      return true;
    }

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
      var _lastSize = this.lastSize;

      // Handle the item getting hidden as a result of our positioning without glitching
      // the classes in and out
      width = _lastSize.width;
      height = _lastSize.height;
    }

    var targetSize = this.cache('target-bounds', function () {
      return _this.getTargetBounds();
    });

    var targetHeight = targetSize.height;
    var targetWidth = targetSize.width;

    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

    this.options.constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass;
      var pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }
      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });

    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + '-' + side);
      });
    });

    var addClasses = [];

    var tAttachment = extend({}, targetAttachment);
    var eAttachment = extend({}, this.attachment);

    this.options.constraints.forEach(function (constraint) {
      var to = constraint.to;
      var attachment = constraint.attachment;
      var pin = constraint.pin;

      if (typeof attachment === 'undefined') {
        attachment = '';
      }

      var changeAttachX = undefined,
          changeAttachY = undefined;
      if (attachment.indexOf(' ') >= 0) {
        var _attachment$split = attachment.split(' ');

        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

        changeAttachY = _attachment$split2[0];
        changeAttachX = _attachment$split2[1];
      } else {
        changeAttachX = changeAttachY = attachment;
      }

      var bounds = getBoundingRect(_this, to);

      if (changeAttachY === 'target' || changeAttachY === 'both') {
        if (top < bounds[1] && tAttachment.top === 'top') {
          top += targetHeight;
          tAttachment.top = 'bottom';
        }

        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
          top -= targetHeight;
          tAttachment.top = 'top';
        }
      }

      if (changeAttachY === 'together') {
        if (tAttachment.top === 'top') {
          if (eAttachment.top === 'bottom' && top < bounds[1]) {
            top += targetHeight;
            tAttachment.top = 'bottom';

            top += height;
            eAttachment.top = 'top';
          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
            top -= height - targetHeight;
            tAttachment.top = 'bottom';

            eAttachment.top = 'bottom';
          }
        }

        if (tAttachment.top === 'bottom') {
          if (eAttachment.top === 'top' && top + height > bounds[3]) {
            top -= targetHeight;
            tAttachment.top = 'top';

            top -= height;
            eAttachment.top = 'bottom';
          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
            top += height - targetHeight;
            tAttachment.top = 'top';

            eAttachment.top = 'top';
          }
        }

        if (tAttachment.top === 'middle') {
          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }
        }
      }

      if (changeAttachX === 'target' || changeAttachX === 'both') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          left += targetWidth;
          tAttachment.left = 'right';
        }

        if (left + width > bounds[2] && tAttachment.left === 'right') {
          left -= targetWidth;
          tAttachment.left = 'left';
        }
      }

      if (changeAttachX === 'together') {
        if (left < bounds[0] && tAttachment.left === 'left') {
          if (eAttachment.left === 'right') {
            left += targetWidth;
            tAttachment.left = 'right';

            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';

            left -= width;
            eAttachment.left = 'right';
          }
        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
          if (eAttachment.left === 'left') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';

            left += width;
            eAttachment.left = 'left';
          }
        } else if (tAttachment.left === 'center') {
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
        }
      }

      if (changeAttachY === 'element' || changeAttachY === 'both') {
        if (top < bounds[1] && eAttachment.top === 'bottom') {
          top += height;
          eAttachment.top = 'top';
        }

        if (top + height > bounds[3] && eAttachment.top === 'top') {
          top -= height;
          eAttachment.top = 'bottom';
        }
      }

      if (changeAttachX === 'element' || changeAttachX === 'both') {
        if (left < bounds[0]) {
          if (eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          } else if (eAttachment.left === 'center') {
            left += width / 2;
            eAttachment.left = 'left';
          }
        }

        if (left + width > bounds[2]) {
          if (eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          } else if (eAttachment.left === 'center') {
            left -= width / 2;
            eAttachment.left = 'right';
          }
        }
      }

      if (typeof pin === 'string') {
        pin = pin.split(',').map(function (p) {
          return p.trim();
        });
      } else if (pin === true) {
        pin = ['top', 'left', 'right', 'bottom'];
      }

      pin = pin || [];

      var pinned = [];
      var oob = [];

      if (top < bounds[1]) {
        if (pin.indexOf('top') >= 0) {
          top = bounds[1];
          pinned.push('top');
        } else {
          oob.push('top');
        }
      }

      if (top + height > bounds[3]) {
        if (pin.indexOf('bottom') >= 0) {
          top = bounds[3] - height;
          pinned.push('bottom');
        } else {
          oob.push('bottom');
        }
      }

      if (left < bounds[0]) {
        if (pin.indexOf('left') >= 0) {
          left = bounds[0];
          pinned.push('left');
        } else {
          oob.push('left');
        }
      }

      if (left + width > bounds[2]) {
        if (pin.indexOf('right') >= 0) {
          left = bounds[2] - width;
          pinned.push('right');
        } else {
          oob.push('right');
        }
      }

      if (pinned.length) {
        (function () {
          var pinnedClass = undefined;
          if (typeof _this.options.pinnedClass !== 'undefined') {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = _this.getClass('pinned');
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + '-' + side);
          });
        })();
      }

      if (oob.length) {
        (function () {
          var oobClass = undefined;
          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
            oobClass = _this.options.outOfBoundsClass;
          } else {
            oobClass = _this.getClass('out-of-bounds');
          }

          addClasses.push(oobClass);
          oob.forEach(function (side) {
            addClasses.push(oobClass + '-' + side);
          });
        })();
      }

      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
        eAttachment.left = tAttachment.left = false;
      }
      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
        eAttachment.top = tAttachment.top = false;
      }

      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
        _this.updateAttachClasses(eAttachment, tAttachment);
        _this.trigger('update', {
          attachment: eAttachment,
          targetAttachment: tAttachment
        });
      }
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return { top: top, left: left };
  }
});
/* globals TetherBase */

'use strict';

var _TetherBase$Utils = TetherBase.Utils;
var getBounds = _TetherBase$Utils.getBounds;
var updateClasses = _TetherBase$Utils.updateClasses;
var defer = _TetherBase$Utils.defer;

TetherBase.modules.push({
  position: function position(_ref) {
    var _this = this;

    var top = _ref.top;
    var left = _ref.left;

    var _cache = this.cache('element-bounds', function () {
      return getBounds(_this.element);
    });

    var height = _cache.height;
    var width = _cache.width;

    var targetPos = this.getTargetBounds();

    var bottom = top + height;
    var right = left + width;

    var abutted = [];
    if (top <= targetPos.bottom && bottom >= targetPos.top) {
      ['left', 'right'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === left || targetPosSide === right) {
          abutted.push(side);
        }
      });
    }

    if (left <= targetPos.right && right >= targetPos.left) {
      ['top', 'bottom'].forEach(function (side) {
        var targetPosSide = targetPos[side];
        if (targetPosSide === top || targetPosSide === bottom) {
          abutted.push(side);
        }
      });
    }

    var allClasses = [];
    var addClasses = [];

    var sides = ['left', 'top', 'right', 'bottom'];
    allClasses.push(this.getClass('abutted'));
    sides.forEach(function (side) {
      allClasses.push(_this.getClass('abutted') + '-' + side);
    });

    if (abutted.length) {
      addClasses.push(this.getClass('abutted'));
    }

    abutted.forEach(function (side) {
      addClasses.push(_this.getClass('abutted') + '-' + side);
    });

    defer(function () {
      if (!(_this.options.addTargetClasses === false)) {
        updateClasses(_this.target, addClasses, allClasses);
      }
      updateClasses(_this.element, addClasses, allClasses);
    });

    return true;
  }
});
/* globals TetherBase */

'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

TetherBase.modules.push({
  position: function position(_ref) {
    var top = _ref.top;
    var left = _ref.left;

    if (!this.options.shift) {
      return;
    }

    var shift = this.options.shift;
    if (typeof this.options.shift === 'function') {
      shift = this.options.shift.call(this, { top: top, left: left });
    }

    var shiftTop = undefined,
        shiftLeft = undefined;
    if (typeof shift === 'string') {
      shift = shift.split(' ');
      shift[1] = shift[1] || shift[0];

      var _shift = shift;

      var _shift2 = _slicedToArray(_shift, 2);

      shiftTop = _shift2[0];
      shiftLeft = _shift2[1];

      shiftTop = parseFloat(shiftTop, 10);
      shiftLeft = parseFloat(shiftLeft, 10);
    } else {
      shiftTop = shift.top;
      shiftLeft = shift.left;
    }

    top += shiftTop;
    left += shiftLeft;

    return { top: top, left: left };
  }
});
return Tether;

}));


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var Breadcrumb;
(function (Breadcrumb) {
    function run(sources) {
        var basics = createBasicExamples(sources);
        var content = createContentExamples(sources);
        var variations = createVariationExamples(sources);
        var vTree$ = xstream_1.default.combine(basics, content, variations).map(function (_a) {
            var basics = _a[0], content = _a[1], variations = _a[2];
            return dom_1.div({ props: { className: "article" } }, [
                UI.Segment.render({ vertical: true }, [
                    UI.Container.render([
                        UI.Header.render({
                            props: { size: UI.Size.Huge },
                            content: {
                                main: "Breadcrumb",
                                subtext: "A breadcrumb is used to show hierarchy between content"
                            }
                        }),
                    ]),
                ]),
                UI.Container.render([
                    UI.Segment.render({ basic: true }, [UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Types")].concat(basics)),
                    UI.Segment.render({ basic: true }, [UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Content")].concat(content)),
                    UI.Segment.render({ basic: true }, [UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Variations")].concat(variations))
                ]),
            ]);
        });
        return {
            DOM: vTree$,
            router: xstream_1.default.never()
        };
    }
    Breadcrumb.run = run;
    function createBasicExamples(sources) {
        var ex1 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Breadcrumb.render([
                { text: "Home", href: "#" },
                { text: "Store", href: "#" },
                { text: "T-Shirt", active: true }
            ])),
            code: "UI.Breadcrumb.render([\n        { text: \"Home\", href: \"#\" },\n        { text: \"Store\", href: \"#\" },\n        { text: \"T-Shirt\", active: true }\n      ])",
            header: "Breadcrumb",
            description: "A standard breadcrumb."
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { divider: UI.Icon.render(UI.IconType.AngleRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Store", href: "#" },
                    { text: "T-Shirt", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { divider: UI.Icon.render(UI.IconType.AngleRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Store\", href: \"#\" },\n          { text: \"T-Shirt\", active: true }\n        ]\n      })"
        });
        return xstream_1.default.combine(ex1.DOM, ex2.DOM);
    }
    function createContentExamples(sources) {
        var ex1 = components_1.Example.run(sources, {
            header: "Divider",
            description: "A breadcrumb can contain a divider to show the relationship between sections, this can be formatted as an icon or text.",
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { divider: UI.Icon.render(UI.IconType.ArrowRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Registration", href: "#" },
                    { text: "Personal Information", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { divider: UI.Icon.render(UI.IconType.ArrowRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Registration\", href: \"#\" },\n          { text: \"Personal Information\", active: true }\n        ]\n      })"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { divider: "|" },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Registration", href: "#" },
                    { text: "Personal Information", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { divider: \"|\" },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Registration\", href: \"#\" },\n          { text: \"Personal Information\", active: true }\n        ]\n      })"
        });
        var ex3 = components_1.Example.run(sources, {
            header: "Section",
            description: "A breadcrumb can contain sections that can either be formatted as a link or text.",
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { divider: UI.Icon.render(UI.IconType.AngleRight) },
                content: [
                    { text: "Home" },
                    { text: "Search", active: true },
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { divider: UI.Icon.render(UI.IconType.AngleRight) },\n        content: [\n          { text: \"Home\" },\n          { text: \"Search\", active: true },\n        ]\n      })"
        });
        var ex4 = components_1.Example.run(sources, {
            header: "Link",
            description: "A section may be linkable or contain a link.",
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { divider: UI.Icon.render(UI.IconType.AngleRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: ["Search for: ", dom_1.a("paper towels")], active: true },
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { divider: UI.Icon.render(UI.IconType.AngleRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: [\"Search for: \", a(\"paper towels\")], active: true },\n        ]\n      })"
        });
        return xstream_1.default.combine(ex1.DOM, ex2.DOM, ex3.DOM, ex4.DOM);
    }
    function createVariationExamples(sources) {
        var ex1 = components_1.Example.run(sources, {
            header: "Size",
            description: "A breadcrumb can vary in size.",
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { size: UI.Size.Mini, divider: UI.Icon.render(UI.IconType.ArrowRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Registration", href: "#" },
                    { text: "Personal Information", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { size: UI.Size.Mini, divider: UI.Icon.render(UI.IconType.ArrowRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Registration\", href: \"#\" },\n          { text: \"Personal Information\", active: true }\n        ]\n      })"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { size: UI.Size.Tiny, divider: UI.Icon.render(UI.IconType.ArrowRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Registration", href: "#" },
                    { text: "Personal Information", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { size: UI.Size.Tiny, divider: UI.Icon.render(UI.IconType.ArrowRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Registration\", href: \"#\" },\n          { text: \"Personal Information\", active: true }\n        ]\n      })"
        });
        var ex3 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { size: UI.Size.Small, divider: UI.Icon.render(UI.IconType.ArrowRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Registration", href: "#" },
                    { text: "Personal Information", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { size: UI.Size.Small, divider: UI.Icon.render(UI.IconType.ArrowRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Registration\", href: \"#\" },\n          { text: \"Personal Information\", active: true }\n        ]\n      })"
        });
        var ex4 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { size: UI.Size.Medium, divider: UI.Icon.render(UI.IconType.ArrowRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Registration", href: "#" },
                    { text: "Personal Information", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { size: UI.Size.Medium, divider: UI.Icon.render(UI.IconType.ArrowRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Registration\", href: \"#\" },\n          { text: \"Personal Information\", active: true }\n        ]\n      })"
        });
        var ex5 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { size: UI.Size.Large, divider: UI.Icon.render(UI.IconType.ArrowRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Registration", href: "#" },
                    { text: "Personal Information", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { size: UI.Size.Large, divider: UI.Icon.render(UI.IconType.ArrowRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Registration\", href: \"#\" },\n          { text: \"Personal Information\", active: true }\n        ]\n      })"
        });
        var ex6 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { size: UI.Size.Big, divider: UI.Icon.render(UI.IconType.ArrowRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Registration", href: "#" },
                    { text: "Personal Information", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { size: UI.Size.Big, divider: UI.Icon.render(UI.IconType.ArrowRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Registration\", href: \"#\" },\n          { text: \"Personal Information\", active: true }\n        ]\n      })"
        });
        var ex7 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { size: UI.Size.Huge, divider: UI.Icon.render(UI.IconType.ArrowRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Registration", href: "#" },
                    { text: "Personal Information", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { size: UI.Size.Huge, divider: UI.Icon.render(UI.IconType.ArrowRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Registration\", href: \"#\" },\n          { text: \"Personal Information\", active: true }\n        ]\n      })"
        });
        var ex8 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Breadcrumb.render({
                props: { size: UI.Size.Massive, divider: UI.Icon.render(UI.IconType.ArrowRight) },
                content: [
                    { text: "Home", href: "#" },
                    { text: "Registration", href: "#" },
                    { text: "Personal Information", active: true }
                ]
            })),
            code: "UI.Breadcrumb.render({\n        props: { size: UI.Size.Massive, divider: UI.Icon.render(UI.IconType.ArrowRight) },\n        content: [\n          { text: \"Home\", href: \"#\" },\n          { text: \"Registration\", href: \"#\" },\n          { text: \"Personal Information\", active: true }\n        ]\n      })"
        });
        return xstream_1.default.combine(ex1.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM, ex6.DOM, ex7.DOM, ex8.DOM);
    }
})(Breadcrumb = exports.Breadcrumb || (exports.Breadcrumb = {}));


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var components_1 = __webpack_require__(7);
var Content;
(function (Content) {
    function run(sources) {
        var fieldExamples = createFieldExamples(sources);
        var fieldsExamples = createFieldsExamples(sources);
        var textareaExamples = createTextAreaExamples(sources);
        var checkboxExamples = createCheckboxExamples(sources);
        var radioCheckboxExamples = createRadioCheckboxExamples(sources);
        var dropdownExamples = createDropdownExamples(sources);
        var multipleSelectExamples = createMultipleSelectExamples(sources);
        var messageExamples = createMessageExamples(sources);
        return xstream_1.default.combine.apply(null, [].concat(fieldExamples, fieldsExamples, textareaExamples, checkboxExamples, radioCheckboxExamples, dropdownExamples, multipleSelectExamples, messageExamples).map(function (x) { return x.DOM; }));
    }
    Content.run = run;
    function createFieldExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Field",
            description: "A field is a form element containing a label and an input",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Field.render({ content: { label: "User Input", main: [UI.Textbox.render()] } })
            ])),
            code: "UI.Form.render([\n        UI.Field.render({ content: { label: \"User Input\", main: [UI.Textbox.render()]}})\n      ])"
        });
        return [ex];
    }
    function createFieldsExamples(sources) {
        var ex1 = components_1.Example.run(sources, {
            header: "Fields",
            description: "A set of fields can appear grouped together",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Fields.render([
                    UI.Field.render({ content: { label: "First name", main: [UI.Textbox.render({ placeholder: "First Name" })] } }),
                    UI.Field.render({ content: { label: "Middle name", main: [UI.Textbox.render({ placeholder: "Middle Name" })] } }),
                    UI.Field.render({ content: { label: "Last name", main: [UI.Textbox.render({ placeholder: "Last Name" })] } })
                ])
            ])),
            code: "UI.Form.render([\n        UI.Fields.render([\n          UI.Field.render({content: { label: \"First name\", main: [UI.Textbox.render({placeholder: \"First Name\"})]}}),\n          UI.Field.render({content: { label: \"Middle name\", main: [UI.Textbox.render({placeholder: \"Middle Name\"})]}}),\n          UI.Field.render({content: { label: \"Last name\", main: [UI.Textbox.render({placeholder: \"Last Name\"})]}})\n        ])\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Fields.render({ equalWidth: true }, [
                    UI.Field.render({ content: { label: "First name", main: [UI.Textbox.render({ placeholder: "First Name" })] } }),
                    UI.Field.render({ content: { label: "Middle name", main: [UI.Textbox.render({ placeholder: "Middle Name" })] } }),
                    UI.Field.render({ content: { label: "Last name", main: [UI.Textbox.render({ placeholder: "Last Name" })] } })
                ])
            ])),
            code: "UI.Form.render([\n        UI.Fields.render({equalWidth: true}, [\n          UI.Field.render({content: { label: \"First name\", main: [UI.Textbox.render({placeholder: \"First Name\"})]}}),\n          UI.Field.render({content: { label: \"Middle name\", main: [UI.Textbox.render({placeholder: \"Middle Name\"})]}}),\n          UI.Field.render({content: { label: \"Last name\", main: [UI.Textbox.render({placeholder: \"Last Name\"})]}})\n        ])\n      ])"
        });
        var ex3 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Fields.render({ inline: true }, [
                    UI.Field.render({
                        props: { width: 8 },
                        content: { label: "Name", main: [UI.Textbox.render({ placeholder: "First Name" })] }
                    }),
                    UI.Field.render({
                        props: { width: 3 },
                        content: [UI.Textbox.render({ placeholder: "Middle Name" })]
                    }),
                    UI.Field.render({
                        props: { width: 5 },
                        content: [UI.Textbox.render({ placeholder: "Last Name" })]
                    })
                ])
            ])),
            code: "UI.Form.render([\n        UI.Fields.render({inline: true}, [\n          UI.Field.render({\n            props: {width: 8},\n            content: { label: \"Name\", main: [UI.Textbox.render({placeholder: \"First Name\"})]}\n          }),\n          UI.Field.render({\n            props: {width: 3},\n            content: [UI.Textbox.render({placeholder: \"Middle Name\"})]\n          }),\n          UI.Field.render({\n            props: {width: 5},\n            content: [UI.Textbox.render({placeholder: \"Last Name\"})]\n          })\n        ])\n      ])"
        });
        return [ex1, ex2, ex3];
    }
    function createTextAreaExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Text Area",
            description: "A textarea can be used to allow for extended user input.",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Field.render({
                    content: {
                        label: "Text",
                        main: [UI.Textbox.render({ rows: 10 })]
                    }
                }),
                UI.Field.render({
                    content: {
                        label: "Short text",
                        main: [UI.Textbox.render({ rows: 2 })]
                    }
                })
            ])),
            code: "UI.Form.render([\n        UI.Field.render({content: { \n          label: \"Text\",\n          main: [UI.Textbox.render({rows: 10})]\n        }}),\n        UI.Field.render({content: { \n          label: \"Short text\",\n          main: [UI.Textbox.render({rows: 2})]\n        }})\n      ])"
        });
        return [ex];
    }
    function createCheckboxExamples(sources) {
        var example = components_1.Example.run(sources, {
            header: "Checkbox",
            description: "A form can contain a checkbox",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Field.render({ inline: true }, [UI.Checkbox.render("Checkbox")]),
                UI.Field.render({ inline: true }, [UI.Checkbox.render({ slider: true }, "Slider")]),
                UI.Field.render({ inline: true }, [UI.Checkbox.render({ toggle: true }, "Toggle")])
            ])),
            code: "UI.Form.render([\n        UI.Field.render({inline: true}, [UI.Checkbox.render(\"Checkbox\")]),\n        UI.Field.render({inline: true}, [UI.Checkbox.render({slider: true}, \"Slider\")]),\n        UI.Field.render({inline: true}, [UI.Checkbox.render({toggle: true}, \"Toggle\")])\n      ])"
        });
        return [example];
    }
    function createRadioCheckboxExamples(sources) {
        var example = components_1.Example.run(sources, {
            header: "Radio Checkbox",
            description: "A form can contain a radio checkbox",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Fields.render({
                    props: { inline: true },
                    content: {
                        label: "Select your favourite fruit:",
                        main: [
                            UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Apples")]),
                            UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Oranges")]),
                            UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Pears")]),
                            UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Grapefruit")])
                        ]
                    }
                }),
                UI.Fields.render({
                    props: { grouped: true },
                    content: {
                        label: "Select your favourite fruit:",
                        main: [
                            UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Apples")]),
                            UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Oranges")]),
                            UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Pears")]),
                            UI.Field.render([UI.Checkbox.render({ radio: true, name: "fruit" }, "Grapefruit")])
                        ]
                    }
                })
            ])),
            code: "UI.Form.render([\n        UI.Fields.render({\n          props: { inline: true },\n          content: {\n            label: \"Select your favourite fruit:\",\n            main: [\n              UI.Field.render([UI.Checkbox.render({radio: true, name: \"fruit\"}, \"Apples\")]),\n              UI.Field.render([UI.Checkbox.render({radio: true, name: \"fruit\"}, \"Oranges\")]),\n              UI.Field.render([UI.Checkbox.render({radio: true, name: \"fruit\"}, \"Pears\")]),\n              UI.Field.render([UI.Checkbox.render({radio: true, name: \"fruit\"}, \"Grapefruit\")])\n            ]\n          }\n        }),\n        UI.Fields.render({\n          props: { grouped: true },\n          content: {\n            label: \"Select your favourite fruit:\",\n            main: [\n              UI.Field.render([UI.Checkbox.render({radio: true, name: \"fruit\"}, \"Apples\")]),\n              UI.Field.render([UI.Checkbox.render({radio: true, name: \"fruit\"}, \"Oranges\")]),\n              UI.Field.render([UI.Checkbox.render({radio: true, name: \"fruit\"}, \"Pears\")]),\n              UI.Field.render([UI.Checkbox.render({radio: true, name: \"fruit\"}, \"Grapefruit\")])\n            ]\n          }\n        })\n      ])"
        });
        return [example];
    }
    function createDropdownExamples(sources) {
        var ddlGender = UI.Dropdown.run({
            DOM: sources.DOM,
            props$: xstream_1.default.of({ default: "Gender", selection: true }),
            content$: xstream_1.default.of([
                { main: "Male", value: "Male" },
                { main: "Female", value: "Female" }
            ])
        });
        var ex1 = components_1.Example.run(sources, {
            header: "Dropdown",
            description: "A form can contain a dropdown",
            VNode$: ddlGender.DOM.map(function (ddlGender) { return UI.Form.render([
                UI.Field.render({ content: { label: "Gender", main: ddlGender } })
            ]); }),
            code: "let ddlGender = UI.Dropdown.run({\n      DOM: sources.DOM,\n      props$: xs.of({default: \"Gender\", selection: true}),\n      content$: xs.of([\n        {main: \"Male\", value: \"Male\"},\n        {main: \"Female\", value: \"Female\"}\n      ])\n    });\n    let vTree$ = ddlGender.DOM.map(\n        ddlGender => UI.Form.render([\n        UI.Field.render({content: {label: \"Gender\", main: ddlGender}})\n      ])\n    );"
        });
        var countries = ["United States", "The Netherlands", "Belgium", "Germany", "France"];
        var ddlCountries = UI.Dropdown.run({
            DOM: sources.DOM,
            props$: xstream_1.default.of({ selection: true, search: true }),
            content$: xstream_1.default.of(countries.map(function (country) { return ({ main: country, value: country }); }))
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: ddlCountries.DOM.map(function (ddlCountries) { return UI.Form.render([
                UI.Field.render({ content: { label: "Country", main: ddlCountries } })
            ]); }),
            code: "let countries = [\"United States\", \"The Netherlands\", \"Belgium\", \"Germany\", \"France\"];\n    let ddlCountries = UI.Dropdown.run({\n      DOM: sources.DOM,\n      props$: xs.of({ selection: true, search: true }),\n      content$: xs.of(countries.map(country => ({ main: country, value: country })))\n    })\n    let vTree$: ddlCountries.DOM.map(\n      ddlCountries => UI.Form.render([\n        UI.Field.render({content: { label: \"Country\", main: ddlCountries}})\n      ])\n    )"
        });
        return [ex1, ex2];
    }
    function createMultipleSelectExamples(sources) {
        return [];
    }
    function createMessageExamples(sources) {
        var example = components_1.Example.run(sources, {
            header: "Message",
            description: "A form can contain a message",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Message.render({
                    props: { color: UI.Color.Error },
                    content: {
                        header: "We had some issues",
                        body: [UI.List.render({ bulleted: true }, [
                                { main: "Please enter your first name" },
                                { main: "Please enter your last name" }
                            ])]
                    }
                })
            ])),
            code: "UI.Form.render([\n        UI.Message.render({\n          props: { color: UI.Color.Error },\n          content: {\n            header: \"We had some issues\",\n            body: [UI.List.render({ bulleted: true }, [\n              { main: \"Please enter your first name\" },\n              { main: \"Please enter your last name\" }\n            ])]\n          }\n        })\n      ])"
        });
        return [example];
    }
})(Content = exports.Content || (exports.Content = {}));


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var components_1 = __webpack_require__(7);
var FieldsVariations;
(function (FieldsVariations) {
    function run(sources) {
        var equalWidthEx = components_1.Example.run(sources, {
            header: "Evenly Divided",
            description: "Fields can have their widths divided evenly",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Fields.render({ equalWidth: true }, [
                    UI.Field.render({
                        content: {
                            label: "First name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Middle name",
                            main: [UI.Textbox.render({ placeholder: "Middle Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ])
            ])),
            code: "UI.Form.render([\n        UI.Fields.render({ equalWidth: true }, [\n          UI.Field.render({\n            content: {\n              label: \"First name\",\n              main: [UI.Textbox.render({ placeholder: \"First Name\" })]\n            }\n          }),\n          UI.Field.render({\n            content: {\n              label: \"Middle name\",\n              main: [UI.Textbox.render({ placeholder: \"Middle Name\" })]\n            }\n          }),\n          UI.Field.render({\n            content: {\n              label: \"Last name\",\n              main: [UI.Textbox.render({ placeholder: \"Last Name\" })]\n            }\n          })\n        ])\n      ])"
        });
        var groupedEx = components_1.Example.run(sources, {
            header: "Grouped fields",
            description: "Fields can show related choices",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Fields.render({ grouped: true }, [
                    UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Apples")]),
                    UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Oranges")]),
                    UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Pears")]),
                    UI.Field.render([UI.Checkbox.render({ name: "fruit", radio: true }, "Grapefruit")])
                ])
            ])),
            code: "UI.Form.render([\n        UI.Fields.render({ grouped: true }, [\n          UI.Field.render([UI.Checkbox.render({ name: \"fruit\", radio: true }, \"Apples\")]),\n          UI.Field.render([UI.Checkbox.render({ name: \"fruit\", radio: true }, \"Oranges\")]),\n          UI.Field.render([UI.Checkbox.render({ name: \"fruit\", radio: true }, \"Pears\")]),\n          UI.Field.render([UI.Checkbox.render({ name: \"fruit\", radio: true }, \"Grapefruit\")])\n        ])\n      ])"
        });
        var inlineEx = components_1.Example.run(sources, {
            header: "Inline",
            description: "Multiple fields may be inline in a row",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Fields.render({
                    props: { inline: true },
                    content: {
                        label: "Phone Number",
                        main: [
                            UI.Field.render([UI.Textbox.render({ placeholder: "(xxx)" })]),
                            UI.Field.render([UI.Textbox.render({ placeholder: "xxx" })]),
                            UI.Field.render([UI.Textbox.render({ placeholder: "xxxx" })])
                        ]
                    }
                })
            ])),
            code: "UI.Form.render([\n        UI.Fields.render({\n          props: { inline: true },\n          content: {\n            label: \"Phone Number\",\n            main: [\n              UI.Field.render([UI.Textbox.render({placeholder: \"(xxx)\"})]),\n              UI.Field.render([UI.Textbox.render({placeholder: \"xxx\"})]),\n              UI.Field.render([UI.Textbox.render({placeholder: \"xxxx\"})])\n            ]\n          }\n        })\n      ])"
        });
        return xstream_1.default.combine(equalWidthEx.DOM, groupedEx.DOM, inlineEx.DOM);
    }
    FieldsVariations.run = run;
})(FieldsVariations = exports.FieldsVariations || (exports.FieldsVariations = {}));


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var components_1 = __webpack_require__(7);
var FieldVariations;
(function (FieldVariations) {
    function run(sources) {
        var inlineEx = components_1.Example.run(sources, {
            header: "Inline",
            description: "A field can have its label next to instead of above it.",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Field.render({
                    props: { inline: true },
                    content: {
                        label: "Full name",
                        main: [UI.Textbox.render({ placeholder: "Full Name" })]
                    }
                })
            ])),
            code: "UI.Form.render([\n        UI.Field.render({\n          props: {inline: true},\n          content: {\n            label: \"Full name\",\n            main: [UI.Textbox.render({placeholder: \"Full Name\"})]\n          }\n        })\n      ])"
        });
        var widthEx = components_1.Example.run(sources, {
            header: "Width",
            description: "A field can specify its width in grid columns",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Fields.render([
                    UI.Field.render({
                        props: { width: 6 },
                        content: {
                            label: "First name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        props: { width: 4 },
                        content: {
                            label: "Middle",
                            main: [UI.Textbox.render({ placeholder: "Middle Name" })]
                        }
                    }),
                    UI.Field.render({
                        props: { width: 6 },
                        content: {
                            label: "Last name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ]),
                UI.Fields.render([
                    UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: "2 Wide" })]),
                    UI.Field.render({ width: 12 }, [UI.Textbox.render({ placeholder: "12 Wide" })]),
                    UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: "2 Wide" })])
                ]),
                UI.Fields.render([
                    UI.Field.render({ width: 8 }, [UI.Textbox.render({ placeholder: "8 Wide" })]),
                    UI.Field.render({ width: 6 }, [UI.Textbox.render({ placeholder: "6 Wide" })]),
                    UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: "2 Wide" })])
                ])
            ])),
            code: "UI.Form.render([\n        UI.Fields.render([\n          UI.Field.render({\n            props: { width: 6 },\n            content: {\n              label: \"First name\",\n              main: [UI.Textbox.render({ placeholder: \"First Name\" })]\n            }\n          }),\n          UI.Field.render({\n            props: { width: 4 },\n            content: {\n              label: \"Middle\",\n              main: [UI.Textbox.render({ placeholder: \"Middle Name\" })]\n            }\n          }),\n          UI.Field.render({\n            props: { width: 6 },\n            content: {\n              label: \"Last name\",\n              main: [UI.Textbox.render({ placeholder: \"Last Name\" })]\n            }\n          })\n        ]),\n        UI.Fields.render([\n          UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: \"2 Wide\" })]),\n          UI.Field.render({ width: 12 }, [UI.Textbox.render({ placeholder: \"12 Wide\" })]),\n          UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: \"2 Wide\" })])\n        ]),\n        UI.Fields.render([\n          UI.Field.render({ width: 8 }, [UI.Textbox.render({ placeholder: \"8 Wide\" })]),\n          UI.Field.render({ width: 6 }, [UI.Textbox.render({ placeholder: \"6 Wide\" })]),\n          UI.Field.render({ width: 2 }, [UI.Textbox.render({ placeholder: \"2 Wide\" })])\n        ])\n      ])"
        });
        var requiredEx = components_1.Example.run(sources, {
            header: "Required",
            description: "A field can show that input is mandetory",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Field.render({
                    props: { required: true },
                    content: {
                        label: "Full name",
                        main: [UI.Textbox.render({ placeholder: "Full Name" })]
                    }
                }),
                UI.Field.render([UI.Checkbox.render("I agree to the Terms and Conditions")])
            ])),
            code: "UI.Form.render([\n        UI.Field.render({\n          props: {required: true},\n          content: {\n            label: \"Full name\",\n            main: [UI.Textbox.render({placeholder: \"Full Name\"})]\n          }\n        }),\n        UI.Field.render([UI.Checkbox.render(\"I agree to the Terms and Conditions\")])\n      ])"
        });
        return xstream_1.default.combine(inlineEx.DOM, widthEx.DOM, requiredEx.DOM);
    }
    FieldVariations.run = run;
})(FieldVariations = exports.FieldVariations || (exports.FieldVariations = {}));


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var components_1 = __webpack_require__(7);
var FormVariations;
(function (FormVariations) {
    function run(sources) {
        var equalWidthExample = components_1.Example.run(sources, {
            header: "Equal Width",
            description: "Forms can automatically divide fields to be equal width",
            VNode$: xstream_1.default.of(UI.Form.render({ equalWidth: true }, [
                UI.Fields.render([
                    UI.Field.render({
                        content: {
                            label: "Username",
                            main: [UI.Textbox.render({ placeholder: "Username" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Password",
                            main: [UI.Textbox.render({ type: "password", placeholder: "Password" })]
                        }
                    })
                ]),
                UI.Fields.render([
                    UI.Field.render({
                        content: {
                            label: "First name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Middle name",
                            main: [UI.Textbox.render({ placeholder: "Middle Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ])
            ])),
            code: "UI.Form.render({ equalWidth: true}, [\n        UI.Fields.render([\n          UI.Field.render({content: {\n            label: \"Username\",\n            main: [UI.Textbox.render({placeholder: \"Username\"})]\n          }}),\n          UI.Field.render({content: {\n            label: \"Password\",\n            main: [UI.Textbox.render({type: \"password\", placeholder: \"Password\"})]\n          }})\n        ]),\n        UI.Fields.render([\n          UI.Field.render({content: {\n            label: \"First name\",\n            main: [UI.Textbox.render({placeholder: \"First Name\"})]\n          }}),\n          UI.Field.render({content: {\n            label: \"Middle name\",\n            main: [UI.Textbox.render({placeholder: \"Middle Name\"})]\n          }}),\n          UI.Field.render({content: {\n            label: \"Last name\",\n            main: [UI.Textbox.render({placeholder: \"Last Name\"})]\n          }})\n        ])\n      ])"
        });
        var invertedEx = components_1.Example.run(sources, {
            header: "Inverted",
            description: "A form on a dark background may have to invert its color scheme",
            VNode$: xstream_1.default.of(UI.Segment.render({ inverted: true }, [
                UI.Form.render({ inverted: true }, [
                    UI.Fields.render({ equalWidth: true }, [
                        UI.Field.render({
                            content: {
                                label: "First Name",
                                main: [UI.Textbox.render({ placeholder: "First Name" })]
                            }
                        }),
                        UI.Field.render({
                            content: {
                                label: "Last name",
                                main: [UI.Textbox.render({ placeholder: "Last Name" })]
                            }
                        })
                    ]),
                    UI.Field.render({ inline: true }, [UI.Checkbox.render("I agree to the Terms and Conditions")]),
                    UI.Button.render("Submit")
                ])
            ])),
            code: "UI.Segment.render({ inverted: true }, [\n        UI.Form.render({ inverted: true }, [\n          UI.Fields.render({ equalWidth: true }, [\n            UI.Field.render({\n              content: {\n                label: \"First Name\",\n                main: [UI.Textbox.render({ placeholder: \"First Name\" })]\n              }\n            }),\n            UI.Field.render({\n              content: {\n                label: \"Last name\",\n                main: [UI.Textbox.render({ placeholder: \"Last Name\" })]\n              }\n            })\n          ]),\n          UI.Field.render({inline: true}, [UI.Checkbox.render(\"I agree to the Terms and Conditions\")]),\n          UI.Button.render(\"Submit\")\n        ])\n      ])"
        });
        var examples = [].concat(createSizeVariations(sources), equalWidthExample, invertedEx);
        return xstream_1.default.combine.apply(null, examples.map(function (ex) { return ex.DOM; }));
    }
    FormVariations.run = run;
    function createSizeVariations(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Size",
            description: "A form can vary in size",
            VNode$: xstream_1.default.of(UI.Form.render({ size: "mini" }, [
                UI.Fields.render([
                    UI.Field.render({
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ]),
                UI.Button.render("Submit")
            ])),
            code: "UI.Form.render({size: \"mini\"}, [\n        UI.Fields.render([\n          UI.Field.render({\n            content: { \n              label: \"First Name\",\n              main: [UI.Textbox.render({placeholder: \"First Name\"})]\n            }\n          }),\n          UI.Field.render({\n            content: { \n              label: \"Last Name\",\n              main: [UI.Textbox.render({placeholder: \"Last Name\"})]\n            }\n          })\n        ]),\n        UI.Button.render(\"Submit\")\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Form.render({ size: "tiny" }, [
                UI.Fields.render([
                    UI.Field.render({
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ]),
                UI.Button.render("Submit")
            ])),
            code: "UI.Form.render({size: \"tiny\"}, [\n        UI.Fields.render([\n          UI.Field.render({\n            content: { \n              label: \"First Name\",\n              main: [UI.Textbox.render({placeholder: \"First Name\"})]\n            }\n          }),\n          UI.Field.render({\n            content: { \n              label: \"Last Name\",\n              main: [UI.Textbox.render({placeholder: \"Last Name\"})]\n            }\n          })\n        ]),\n        UI.Button.render(\"Submit\")\n      ])"
        });
        var ex3 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Form.render({ size: "small" }, [
                UI.Fields.render([
                    UI.Field.render({
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ]),
                UI.Button.render("Submit")
            ])),
            code: "UI.Form.render({size: \"small\"}, [\n        UI.Fields.render([\n          UI.Field.render({\n            content: { \n              label: \"First Name\",\n              main: [UI.Textbox.render({placeholder: \"First Name\"})]\n            }\n          }),\n          UI.Field.render({\n            content: { \n              label: \"Last Name\",\n              main: [UI.Textbox.render({placeholder: \"Last Name\"})]\n            }\n          })\n        ]),\n        UI.Button.render(\"Submit\")\n      ])"
        });
        var ex4 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Form.render({ size: "medium" }, [
                UI.Fields.render([
                    UI.Field.render({
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ]),
                UI.Button.render("Submit")
            ])),
            code: "medium"
        });
        var ex5 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Form.render({ size: "large" }, [
                UI.Fields.render([
                    UI.Field.render({
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ]),
                UI.Button.render("Submit")
            ])),
            code: "UI.Form.render({size: \"large\"}, [\n        UI.Fields.render([\n          UI.Field.render({\n            content: { \n              label: \"First Name\",\n              main: [UI.Textbox.render({placeholder: \"First Name\"})]\n            }\n          }),\n          UI.Field.render({\n            content: { \n              label: \"Last Name\",\n              main: [UI.Textbox.render({placeholder: \"Last Name\"})]\n            }\n          })\n        ]),\n        UI.Button.render(\"Submit\")\n      ])"
        });
        var ex6 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Form.render({ size: "big" }, [
                UI.Fields.render([
                    UI.Field.render({
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ]),
                UI.Button.render("Submit")
            ])),
            code: "UI.Form.render({size: \"big\"}, [\n        UI.Fields.render([\n          UI.Field.render({\n            content: { \n              label: \"First Name\",\n              main: [UI.Textbox.render({placeholder: \"First Name\"})]\n            }\n          }),\n          UI.Field.render({\n            content: { \n              label: \"Last Name\",\n              main: [UI.Textbox.render({placeholder: \"Last Name\"})]\n            }\n          })\n        ]),\n        UI.Button.render(\"Submit\")\n      ])"
        });
        var ex7 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Form.render({ size: "huge" }, [
                UI.Fields.render([
                    UI.Field.render({
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ]),
                UI.Button.render("Submit")
            ])),
            code: "UI.Form.render({size: \"huge\"}, [\n        UI.Fields.render([\n          UI.Field.render({\n            content: { \n              label: \"First Name\",\n              main: [UI.Textbox.render({placeholder: \"First Name\"})]\n            }\n          }),\n          UI.Field.render({\n            content: { \n              label: \"Last Name\",\n              main: [UI.Textbox.render({placeholder: \"Last Name\"})]\n            }\n          })\n        ]),\n        UI.Button.render(\"Submit\")\n      ])"
        });
        var ex8 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Form.render({ size: "massive" }, [
                UI.Fields.render([
                    UI.Field.render({
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ]),
                UI.Button.render("Submit")
            ])),
            code: "UI.Form.render({size: \"massive\"}, [\n        UI.Fields.render([\n          UI.Field.render({\n            content: { \n              label: \"First Name\",\n              main: [UI.Textbox.render({placeholder: \"First Name\"})]\n            }\n          }),\n          UI.Field.render({\n            content: { \n              label: \"Last Name\",\n              main: [UI.Textbox.render({placeholder: \"Last Name\"})]\n            }\n          })\n        ]),\n        UI.Button.render(\"Submit\")\n      ])"
        });
        return [ex, ex2, ex3, ex4, ex5, ex6, ex7, ex8];
    }
})(FormVariations = exports.FormVariations || (exports.FormVariations = {}));


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(154);
var content_1 = __webpack_require__(148);
var states_1 = __webpack_require__(153);
var formvariations_1 = __webpack_require__(151);
var fieldvariations_1 = __webpack_require__(150);
var fieldsvariations_1 = __webpack_require__(149);
var Form;
(function (Form) {
    function run(sources) {
        var types = types_1.Types.run(sources);
        var content = content_1.Content.run(sources);
        var states = states_1.States.run(sources);
        var formVariations = formvariations_1.FormVariations.run(sources);
        var fieldVariations = fieldvariations_1.FieldVariations.run(sources);
        var fieldsVariations = fieldsvariations_1.FieldsVariations.run(sources);
        var vTree$ = xstream_1.default.combine(types, content, states, formVariations, fieldVariations, fieldsVariations).map(function (_a) {
            var types = _a[0], content = _a[1], states = _a[2], formVariations = _a[3], fieldVariations = _a[4], fieldsVariations = _a[5];
            return dom_1.div({ props: { className: "article" } }, [
                UI.Segment.render({ vertical: true }, [
                    UI.Container.render([
                        UI.Header.render({
                            props: { size: UI.Size.Huge },
                            content: {
                                main: "Form",
                                subtext: "A form displays a set of related user input fields in a structured way"
                            }
                        }),
                    ]),
                ]),
                UI.Container.render([
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Types")
                    ]
                        .concat(types)),
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Content")
                    ]
                        .concat(content)),
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "States")
                    ]
                        .concat(states)),
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Form Variations")
                    ]
                        .concat(formVariations)),
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Field Variations")
                    ]
                        .concat(fieldVariations)),
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Group Variations")
                    ]
                        .concat(fieldsVariations))
                ]),
            ]);
        });
        return {
            DOM: vTree$,
            router: xstream_1.default.never()
        };
    }
    Form.run = run;
})(Form = exports.Form || (exports.Form = {}));


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var components_1 = __webpack_require__(7);
var States;
(function (States) {
    function run(sources) {
        var loadingEx = components_1.Example.run(sources, {
            header: "Loading",
            description: "If a form is in loading state, it will automatically show a loading indicator.",
            VNode$: xstream_1.default.of(UI.Form.render({ loading: true }, [
                UI.Field.render({ content: { label: "Email", main: [UI.Textbox.render()] } }),
                UI.Button.render("Submit")
            ])),
            code: "UI.Form.render({loading: true}, [\n        UI.Field.render({ content: { label: \"Email\", main: [UI.Textbox.render()] } }),\n        UI.Button.render(\"Submit\")\n      ])"
        });
        var ddlGender = UI.Dropdown.run({
            DOM: sources.DOM,
            props$: xstream_1.default.of({ default: "Gender", selection: true }),
            content$: xstream_1.default.of([
                { main: "Male", value: "Male" },
                { main: "Female", value: "Female" }
            ])
        });
        var fieldErrorEx = components_1.Example.run(sources, {
            header: "Field Error",
            description: "Individual fields may display an error state",
            VNode$: ddlGender.DOM.map(function (ddlGender) { return UI.Form.render([
                UI.Fields.render({ equalWidth: true }, [
                    UI.Field.render({
                        props: { error: true },
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ placeholder: "First Name" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ placeholder: "Last Name" })]
                        }
                    })
                ]),
                UI.Field.render({
                    props: { error: true },
                    content: { label: "Gender", main: ddlGender }
                }),
                UI.Field.render({
                    props: { error: true },
                    content: [UI.Checkbox.render("I agree to the Terms and Conditions")]
                }),
            ]); }),
            code: "let ddlGender = UI.Dropdown.run({\n      DOM: sources.DOM,\n      props$: xs.of({ default: \"Gender\", selection: true }),\n      content$: xs.of([\n        { main: \"Male\", value: \"Male\" },\n        { main: \"Female\", value: \"Female\" }\n      ])\n    });\n    let vTree$ = ddlGender.DOM.map(\n      ddlGender => UI.Form.render([\n        UI.Fields.render({equalWidth: true}, [\n          UI.Field.render({\n            props: {error: true},\n            content: {\n              label: \"First Name\",\n              main: [UI.Textbox.render({placeholder: \"First Name\"})]\n            }\n          }),\n          UI.Field.render({\n            content: {\n              label: \"Last Name\",\n              main: [UI.Textbox.render({placeholder: \"Last Name\"})]\n            }\n          })\n        ]),\n        UI.Field.render({\n          props: {error: true},\n          content: {label: \"Gender\", main: ddlGender}\n        }),\n        UI.Field.render({\n          props: {error: true},\n          content: [UI.Checkbox.render(\"I agree to the Terms and Conditions\")]\n        }),\n      ])\n    )"
        });
        var disabledFieldEx = components_1.Example.run(sources, {
            header: "Disabled Field",
            description: "Individual fields may be disabled",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Fields.render({ equalWidth: true }, [
                    UI.Field.render({
                        props: { disabled: true },
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ disabled: true, placeholder: "Disabled" })]
                        }
                    }),
                    UI.Field.render({
                        props: { disabled: true },
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ disabled: true, placeholder: "Disabled" })]
                        }
                    })
                ])
            ])),
            code: "UI.Form.render([\n        UI.Fields.render({equalWidth: true}, [\n          UI.Field.render({\n            props: { disabled: true},\n            content: { \n              label: \"First Name\",\n              main: [UI.Textbox.render({disabled: true, placeholder: \"Disabled\"})]\n            }\n          }),\n          UI.Field.render({\n            props: { disabled: true},\n            content: { \n              label: \"Last Name\",\n              main: [UI.Textbox.render({disabled: true, placeholder: \"Disabled\"})]\n            }\n          })\n        ])\n      ])"
        });
        var readOnlyEx = components_1.Example.run(sources, {
            header: "Read-Only Field",
            description: "Invidual fields may be read only",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Fields.render({ equalWidth: true }, [
                    UI.Field.render({
                        content: {
                            label: "First Name",
                            main: [UI.Textbox.render({ readonly: true, placeholder: "Read Only" })]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Last Name",
                            main: [UI.Textbox.render({ readonly: true, placeholder: "Read Only" })]
                        }
                    })
                ])
            ])),
            code: "UI.Form.render([\n        UI.Fields.render({equalWidth: true}, [\n          UI.Field.render({\n            content: { \n              label: \"First Name\",\n              main: [UI.Textbox.render({readonly: true, placeholder: \"Read Only\"})]\n            }\n          }),\n          UI.Field.render({\n            content: { \n              label: \"Last Name\",\n              main: [UI.Textbox.render({readonly: true, placeholder: \"Read Only\"})]\n            }\n          })\n        ])\n      ])"
        });
        return xstream_1.default.combine(loadingEx.DOM, fieldErrorEx.DOM, disabledFieldEx.DOM, readOnlyEx.DOM);
    }
    States.run = run;
})(States = exports.States || (exports.States = {}));


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var components_1 = __webpack_require__(7);
var Types;
(function (Types) {
    function run(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Form",
            description: "A form",
            VNode$: xstream_1.default.of(UI.Form.render([
                UI.Field.render({ content: { label: "First Name", main: UI.Textbox.render({ placeholder: "First Name" }) } }),
                UI.Field.render({ content: { label: "Last Name", main: UI.Textbox.render({ placeholder: "Last Name" }) } }),
                UI.Field.render([UI.Checkbox.render("I agree to the Terms and Conditions")]),
                UI.Button.render("Submit")
            ])),
            code: "UI.Form.render([\n        UI.Field.render({ content: { label: \"First Name\", main: UI.Textbox.render({ placeholder: \"First Name\" }) } }),\n        UI.Field.render({ content: { label: \"Last Name\", main: UI.Textbox.render({ placeholder: \"Last Name\" }) } }),\n        UI.Field.render([UI.Checkbox.render(\"I agree to the Terms and Conditions\")]),\n        UI.Button.render(\"Submit\")\n      ])"
        });
        var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware"];
        var ddlStates = UI.Dropdown.run({
            DOM: sources.DOM,
            props$: xstream_1.default.of({ selection: true }),
            content$: xstream_1.default.of(states.map(function (state) { return ({ main: state, value: state }); }))
        });
        var countries = ["United States", "The Netherlands", "Belgium", "Germany", "France"];
        var ddlCountries = UI.Dropdown.run({
            DOM: sources.DOM,
            props$: xstream_1.default.of({ selection: true, search: true }),
            content$: xstream_1.default.of(countries.map(function (country) { return ({ main: country, value: country }); }))
        });
        var cards = ["Visa", "American Express", "Discover"];
        var ddlCards = UI.Dropdown.run({
            DOM: sources.DOM,
            props$: xstream_1.default.of({ selection: true }),
            content$: xstream_1.default.of(cards.map(function (card) { return ({ main: card, value: card }); }))
        });
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var ddlMonths = UI.Dropdown.run({
            DOM: sources.DOM,
            props$: xstream_1.default.of({ selection: true, search: true, size: UI.Size.Fluid }),
            content$: xstream_1.default.of(months.map(function (month) { return ({ main: month, value: month }); }))
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.combine(ddlStates.DOM, ddlCountries.DOM, ddlCards.DOM, ddlMonths.DOM).map(function (_a) {
                var ddlStates = _a[0], ddlCountries = _a[1], ddlCards = _a[2], ddlMonths = _a[3];
                return UI.Form.render([
                    UI.Header.render({ dividing: true }, "Shipping Information"),
                    UI.Field.render({
                        content: {
                            label: "Name", main: [
                                UI.Fields.render({ equalWidth: true }, [
                                    UI.Field.render(UI.Textbox.render({ placeholder: "First Name" })),
                                    UI.Field.render(UI.Textbox.render({ placeholder: "Last Name" }))
                                ])
                            ]
                        }
                    }),
                    UI.Field.render({
                        content: {
                            label: "Billing adress", main: [
                                UI.Fields.render([
                                    UI.Field.render({ width: 12 }, [UI.Textbox.render({ placeholder: "Street Adress" })]),
                                    UI.Field.render({ width: 4 }, [UI.Textbox.render({ placeholder: "Apt #" })])
                                ])
                            ]
                        }
                    }),
                    UI.Fields.render({ equalWidth: true }, [
                        UI.Field.render({ content: { label: "State", main: ddlStates } }),
                        UI.Field.render({ content: { label: "Country", main: ddlCountries } })
                    ]),
                    UI.Header.render({ dividing: true }, "Billing Information"),
                    UI.Field.render({ content: { label: "Card Type", main: ddlCards } }),
                    UI.Fields.render([
                        UI.Field.render({ props: { width: 7 }, content: { label: "Card Number", main: [UI.Textbox.render({ placeholder: "Card #" })] } }),
                        UI.Field.render({ props: { width: 3 }, content: { label: "CVC", main: [UI.Textbox.render({ placeholder: "CVC" })] } }),
                        UI.Field.render({
                            props: { width: 6 }, content: {
                                label: "Expiration", main: [
                                    UI.Fields.render({ equalWidth: true }, [
                                        UI.Field.render([ddlMonths]),
                                        UI.Field.render([UI.Textbox.render({ placeholder: "Year" })])
                                    ])
                                ]
                            }
                        })
                    ]),
                    UI.Header.render({ dividing: true }, "Receipt"),
                    //TODO Multiple dropdown example,
                    UI.Segment.render([
                        UI.Checkbox.render({ toggle: true }, "Do not include a receipt in the package")
                    ]),
                    UI.Button.render("Submit order")
                ]);
            }),
            code: "let states = [\"Alabama\", \"Alaska\", \"Arizona\", \"Arkansas\", \"California\", \"Colorado\", \"Connecticut\", \"Delaware\"];\n      let ddlStates = UI.Dropdown.run({\n        DOM: sources.DOM,\n        props$: xs.of({selection: true}),\n        content$: xs.of(states.map(state => ({main: state, value: state})))\n      });\n      let countries = [\"United States\", \"The Netherlands\", \"Belgium\", \"Germany\", \"France\"];\n      let ddlCountries = UI.Dropdown.run({\n        DOM: sources.DOM,\n        props$: xs.of({selection: true, search: true}),\n        content$: xs.of(countries.map(country => ({main: country, value: country})))\n      });\n      let cards = [\"Visa\", \"American Express\", \"Discover\"];\n      let ddlCards = UI.Dropdown.run({\n        DOM: sources.DOM,\n        props$: xs.of({selection: true}),\n        content$: xs.of(cards.map(card => ({main: card, value: card})))\n      });\n      let months = [\"January\", \"February\", \"March\", \"April\", \"May\", \"June\", \"July\", \"August\", \"September\", \"October\", \"November\", \"December\"];\n      let ddlMonths = UI.Dropdown.run({\n        DOM: sources.DOM,\n        props$: xs.of({selection: true, search: true, size: UI.Size.Fluid}),\n        content$: xs.of(months.map(month => ({main: month, value: month})))\n      });\n      let vTree$: xs.combine(ddlStates.DOM, ddlCountries.DOM, ddlCards.DOM, ddlMonths.DOM).map(\n        ([ddlStates, ddlCountries, ddlCards, ddlMonths]) => UI.Form.render([\n          UI.Header.render({dividing: true}, \"Shipping Information\"),\n          UI.Field.render({ content: { label: \"Name\", main: [\n            UI.Fields.render({equalWidth: true}, [\n              UI.Field.render(UI.Textbox.render({placeholder: \"First Name\"})),\n              UI.Field.render(UI.Textbox.render({placeholder: \"Last Name\"}))\n            ])\n          ]}}),\n          UI.Field.render({ content: { label: \"Billing adress\", main: [\n            UI.Fields.render([\n              UI.Field.render({ width: 12}, [UI.Textbox.render({placeholder: \"Street Adress\"})]),\n              UI.Field.render({ width: 4}, [UI.Textbox.render({placeholder: \"Apt #\"})])\n            ])\n          ]}}),\n          UI.Fields.render({equalWidth: true}, [\n            UI.Field.render({content: {label: \"State\", main: ddlStates}}),\n            UI.Field.render({content: {label: \"Country\", main: ddlCountries}})\n          ]),\n          UI.Header.render({dividing: true}, \"Billing Information\"),\n          UI.Field.render({content: { label: \"Card Type\", main: ddlCards}}),\n          UI.Fields.render([\n            UI.Field.render({props: {width: 7}, content: { label: \"Card Number\", main: [UI.Textbox.render({placeholder: \"Card #\"})]}}),\n            UI.Field.render({props: {width: 3}, content: { label: \"CVC\", main: [UI.Textbox.render({placeholder: \"CVC\"})]}}),\n            UI.Field.render({props: {width: 6}, content: { label: \"Expiration\", main: [\n              UI.Fields.render({equalWidth: true}, [\n                UI.Field.render([ddlMonths]),\n                UI.Field.render([UI.Textbox.render({placeholder: \"Year\"})])\n              ])\n            ]}})\n          ]),\n          UI.Header.render({dividing: true}, \"Receipt\"),\n          //TODO Multiple dropdown example,\n          UI.Segment.render([\n            UI.Checkbox.render({toggle: true}, \"Do not include a receipt in the package\")\n          ]),\n          UI.Button.render(\"Submit order\")\n        ])\n      )"
        });
        return xstream_1.default.combine(ex.DOM, ex2.DOM);
    }
    Types.run = run;
})(Types = exports.Types || (exports.Types = {}));


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var Content;
(function (Content) {
    function run(sources) {
        var rowsEx = components_1.Example.run(sources, {
            header: "Rows",
            description: "A row is a horizontal grouping of columns",
            VNode$: xstream_1.default.of(UI.Grid.render({ width: 3 }, [
                UI.Row.render([
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
                ]),
                UI.Row.render([
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
                ])
            ])),
            code: "UI.Grid.render({ width: 3 }, [\n        UI.Row.render([\n          UI.Column.render(),\n          UI.Column.render()\n        ]),\n        UI.Row.render([\n          UI.Column.render(), \n          UI.Column.render(), \n          UI.Column.render()\n        ])\n      ])"
        });
        var columnsEx = components_1.Example.run(sources, {
            header: "Columns",
            description: "Columns each contain gutters giving them equal spacing from other columns.",
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ width: 8 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                UI.Column.render({ width: 8 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                UI.Column.render({ width: 8 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                UI.Column.render({ width: 8 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
            ])),
            code: "UI.Grid.render([\n        UI.Column.render({width: 8}),\n        UI.Column.render({width: 8}),\n        UI.Column.render({width: 8}),\n        UI.Column.render({width: 8})\n      ])"
        });
        return xstream_1.default.combine(rowsEx.DOM, columnsEx.DOM);
    }
    Content.run = run;
})(Content = exports.Content || (exports.Content = {}));


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var types_1 = __webpack_require__(158);
var content_1 = __webpack_require__(155);
var variations_1 = __webpack_require__(159);
var responsiveVariations_1 = __webpack_require__(157);
var Definition;
(function (Definition) {
    function run(sources) {
        var types = types_1.Types.run(sources);
        var content = content_1.Content.run(sources);
        var variations = variations_1.Variations.run(sources);
        var responsive = responsiveVariations_1.ResponsiveVariations.run(sources);
        var vTree$ = xstream_1.default.combine(types, content, variations, responsive).map(function (_a) {
            var types = _a[0], content = _a[1], variations = _a[2], responsive = _a[3];
            return UI.Container.render([
                UI.Segment.render({ basic: true }, [
                    UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Types")
                ]
                    .concat(types)),
                UI.Segment.render({ basic: true }, [
                    UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Content")
                ]
                    .concat(content)),
                UI.Segment.render({ basic: true }, [
                    UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Variations")
                ]
                    .concat(variations)),
                UI.Segment.render({ basic: true }, [
                    UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Responsive Variants")
                ]
                    .concat(responsive)),
            ]);
        });
        return vTree$;
    }
    Definition.run = run;
})(Definition = exports.Definition || (exports.Definition = {}));


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var ResponsiveVariations;
(function (ResponsiveVariations) {
    function run(sources) {
        var doublingEx = createDoublingExamples(sources);
        var stackableEx = createStackableExamples(sources);
        var reversedEx = createReversedExamples(sources);
        var deviceVisibilityEx = createDeviceVisiblityExamples(sources);
        var responsiveWidthEx = createResponsiveWithExamples(sources);
        var examples = [].concat(doublingEx, stackableEx, reversedEx, deviceVisibilityEx, responsiveWidthEx);
        return xstream_1.default.combine.apply(null, examples);
    }
    ResponsiveVariations.run = run;
    function createDoublingExamples(sources) {
        var doublingEx = components_1.Example.run(sources, {
            header: "Doubling",
            description: [
                dom_1.p("A grid can double its column width on tablet and mobile sizes"),
                UI.Message.render({ color: UI.Color.Info }, "A grid will round its columns to the closest reasonable value when doubling, for example a five column grid will use 2 mobile, 3 tablet, 5 desktop. To force 1 column on mobile you can add stackable")
            ],
            VNode$: xstream_1.default.of(UI.Grid.render({ width: 5, doubling: true }, [
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ])
            ])),
            code: "UI.Grid.render({width: 5, doubling: true}, [\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render()\n      ])"
        });
        return [doublingEx.DOM];
    }
    function createStackableExamples(sources) {
        var stackableEx = components_1.Example.run(sources, {
            header: "Stackable",
            description: [
                dom_1.p("A grid can have its columns stack on-top of each other after reaching mobile breakpoints"),
                UI.Message.render({ color: UI.Color.Info }, "To see a grid stack, try resizing your browser to a small width")
            ],
            VNode$: xstream_1.default.of(UI.Grid.render({ width: 2, stackable: true }, [
                UI.Column.render([
                    UI.Segment.render([
                        dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                    ])
                ]),
                UI.Column.render([
                    UI.Segment.render([
                        dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                    ])
                ])
            ])),
            code: "UI.Grid.render({ width: 2, stackable: true }, [\n        UI.Column.render([\n          UI.Segment.render([\n\n          ])\n        ]),\n        UI.Column.render([\n          UI.Segment.render([\n\n          ])\n        ])\n      ])"
        });
        return [stackableEx.DOM];
    }
    function createReversedExamples(sources) {
        var reversedEx = components_1.Example.run(sources, {
            header: "Reversed",
            description: [
                dom_1.p("A grid or row can specify that its columns should reverse order at different device sizes"),
                UI.Message.render({ color: UI.Color.Info }, "Reversed grids are compatible with divided grids and other complex grid types.")
            ],
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Grid.render({ reversedComputer: true, equalWidth: true }, [
                    UI.Row.render([
                        UI.Column.render("Computer A Fourth"),
                        UI.Column.render("Computer A Third"),
                        UI.Column.render("Computer A Second"),
                        UI.Column.render("Computer A First")
                    ]),
                    UI.Row.render([
                        UI.Column.render("Computer B Fourth"),
                        UI.Column.render("Computer B Third"),
                        UI.Column.render("Computer B Second"),
                        UI.Column.render("Computer B First")
                    ]),
                ]),
                UI.Grid.render({ reversedTablet: true, equalWidth: true }, [
                    UI.Row.render([
                        UI.Column.render("Tablet A Fourth"),
                        UI.Column.render("Tablet A Third"),
                        UI.Column.render("Tablet A Second"),
                        UI.Column.render("Tablet A First")
                    ])
                ]),
                UI.Grid.render({ reversedMobile: true, equalWidth: true }, [
                    UI.Row.render([
                        UI.Column.render("Mobile A Fourth"),
                        UI.Column.render("Mobile A Third"),
                        UI.Column.render("Mobile A Second"),
                        UI.Column.render("Mobile A First")
                    ])
                ]),
            ])),
            code: "UI.Grid.render({ reversedComputer: true, equalWidth: true }, [\n          UI.Row.render([\n            UI.Column.render(\"Computer A Fourth\"),\n            UI.Column.render(\"Computer A Third\"),\n            UI.Column.render(\"Computer A Second\"),\n            UI.Column.render(\"Computer A First\")\n          ]),\n          UI.Row.render([\n            UI.Column.render(\"Computer B Fourth\"),\n            UI.Column.render(\"Computer B Third\"),\n            UI.Column.render(\"Computer B Second\"),\n            UI.Column.render(\"Computer B First\")\n          ]),\n        ]),\n        UI.Grid.render({ reversedTablet: true, equalWidth: true }, [\n          UI.Row.render([\n            UI.Column.render(\"Tablet A Fourth\"),\n            UI.Column.render(\"Tablet A Third\"),\n            UI.Column.render(\"Tablet A Second\"),\n            UI.Column.render(\"Tablet A First\")\n          ])\n        ]),\n        UI.Grid.render({ reversedMobile: true, equalWidth: true }, [\n          UI.Row.render([\n            UI.Column.render(\"Mobile A Fourth\"),\n            UI.Column.render(\"Mobile A Third\"),\n            UI.Column.render(\"Mobile A Second\"),\n            UI.Column.render(\"Mobile A First\")\n          ])\n        ])"
        });
        var reversedEx2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render({ vertReversedComputer: true, equalWidth: true }, [
                UI.Row.render([
                    UI.Column.render("Computer Row 4")
                ]),
                UI.Row.render([
                    UI.Column.render("Computer Row 3")
                ]),
                UI.Row.render([
                    UI.Column.render("Computer Row 2")
                ]),
                UI.Row.render([
                    UI.Column.render("Computer Row 1")
                ])
            ])),
            code: "UI.Grid.render({ vertReversedComputer: true, equalWidth: true }, [\n        UI.Row.render([\n          UI.Column.render(\"Computer Row 4\")\n        ]),\n        UI.Row.render([\n          UI.Column.render(\"Computer Row 3\")\n        ]),\n        UI.Row.render([\n          UI.Column.render(\"Computer Row 2\")\n        ]),\n        UI.Row.render([\n          UI.Column.render(\"Computer Row 1\")\n        ])\n      ])"
        });
        var reversedEx3 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render({ vertReversedTablet: true, equalWidth: true }, [
                UI.Row.render([
                    UI.Column.render("Tablet Row 4")
                ]),
                UI.Row.render([
                    UI.Column.render("Tablet Row 3")
                ]),
                UI.Row.render([
                    UI.Column.render("Tablet Row 2")
                ]),
                UI.Row.render([
                    UI.Column.render("Tablet Row 1")
                ])
            ])),
            code: "UI.Grid.render({ vertReversedTablet: true, equalWidth: true }, [\n        UI.Row.render([\n          UI.Column.render(\"Tablet Row 4\")\n        ]),\n        UI.Row.render([\n          UI.Column.render(\"Tablet Row 3\")\n        ]),\n        UI.Row.render([\n          UI.Column.render(\"Tablet Row 2\")\n        ]),\n        UI.Row.render([\n          UI.Column.render(\"Tablet Row 1\")\n        ])\n      ])"
        });
        var reversedEx4 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render({ vertReversedMobile: true, equalWidth: true }, [
                UI.Row.render([
                    UI.Column.render("Mobile Row 4")
                ]),
                UI.Row.render([
                    UI.Column.render("Mobile Row 3")
                ]),
                UI.Row.render([
                    UI.Column.render("Mobile Row 2")
                ]),
                UI.Row.render([
                    UI.Column.render("Mobile Row 1")
                ])
            ])),
            code: "UI.Grid.render({ vertReversedMobile: true, equalWidth: true }, [\n        UI.Row.render([\n          UI.Column.render(\"Mobile Row 4\")\n        ]),\n        UI.Row.render([\n          UI.Column.render(\"Mobile Row 3\")\n        ]),\n        UI.Row.render([\n          UI.Column.render(\"Mobile Row 2\")\n        ]),\n        UI.Row.render([\n          UI.Column.render(\"Mobile Row 1\")\n        ])\n      ])"
        });
        return [reversedEx.DOM, reversedEx2.DOM, reversedEx3.DOM, reversedEx4.DOM];
    }
    function createDeviceVisiblityExamples(sources) {
        var visibilityEx = components_1.Example.run(sources, {
            header: "Device Visibility",
            description: [
                dom_1.p("A columns or row can appear only for a specific device, or screen sizes"),
                UI.Message.render({ color: UI.Color.Info }, "See container documentation for information on breakpoint calculations")
            ],
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Row.render({ width: 2, largescreenOnly: true }, [
                    UI.Column.render([
                        UI.Segment.render("Large Screen")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("Large Screen")
                    ])
                ]),
                UI.Row.render({ width: 2, mobileOnly: true }, [
                    UI.Column.render([
                        UI.Segment.render("Mobile")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("Mobile")
                    ])
                ]),
                UI.Row.render({ width: 3 }, [
                    UI.Column.render({ computerOnly: true }, [
                        UI.Segment.render("Computer")
                    ]),
                    UI.Column.render({ mobileOnly: true }, [
                        UI.Segment.render("Tablet and Mobile")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("All Sizes")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("All Sizes")
                    ])
                ]),
                UI.Row.render({ width: 4, computerOnly: true }, [
                    UI.Column.render([
                        UI.Segment.render("Computer")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("Computer")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("Computer")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("Computer")
                    ])
                ]),
                UI.Row.render({ width: 3, tabletOnly: true }, [
                    UI.Column.render([
                        UI.Segment.render("Tablet")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("Tablet")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("Tablet")
                    ])
                ]),
            ])),
            code: "UI.Grid.render([\n        UI.Row.render({ width: 2, largescreenOnly: true }, [\n          UI.Column.render([\n            UI.Segment.render(\"Large Screen\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"Large Screen\")\n          ])\n        ]),\n        UI.Row.render({ width: 2, mobileOnly: true }, [\n          UI.Column.render([\n            UI.Segment.render(\"Mobile\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"Mobile\")\n          ])\n        ]),\n        UI.Row.render({ width: 3 }, [\n          UI.Column.render({ computerOnly: true }, [\n            UI.Segment.render(\"Computer\")\n          ]),\n          UI.Column.render({ mobileOnly: true }, [\n            UI.Segment.render(\"Tablet and Mobile\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"All Sizes\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"All Sizes\")\n          ])\n        ]),\n        UI.Row.render({ width: 4, computerOnly: true }, [\n          UI.Column.render([\n            UI.Segment.render(\"Computer\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"Computer\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"Computer\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"Computer\")\n          ])\n        ]),\n        UI.Row.render({ width: 3, tabletOnly: true }, [\n          UI.Column.render([\n            UI.Segment.render(\"Tablet\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"Tablet\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"Tablet\")\n          ])\n        ]),\n      ])"
        });
        return [visibilityEx.DOM];
    }
    function createResponsiveWithExamples(sources) {
        var widthEx = components_1.Example.run(sources, {
            header: "Responsive Width",
            description: [
                dom_1.p("A column can specify a width for a specific device"),
                UI.Message.render({ color: UI.Color.Info }, "It's recommended to use a responsive pattern like doubling or stackable to reduce complexity when designing responsively, however in some circumstances specifying exact widths for screen sizes may be necessary.")
            ],
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ mobile: 16, tablet: 8, computer: 4 }, [
                    dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                ]),
                UI.Column.render({ mobile: 16, tablet: 8, computer: 4 }, [
                    dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                ]),
                UI.Column.render({ mobile: 16, tablet: 8, computer: 4 }, [
                    dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                ]),
                UI.Column.render({ mobile: 16, tablet: 8, computer: 4 }, [
                    dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                ]),
                UI.Column.render({ mobile: 16, tablet: 8, computer: 4 }, [
                    dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                ]),
            ])),
            code: "UI.Grid.render([\n        UI.Column.render({mobile: 16, tablet: 8, computer: 4}),\n        UI.Column.render({mobile: 16, tablet: 8, computer: 4}),\n        UI.Column.render({mobile: 16, tablet: 8, computer: 4}),\n        UI.Column.render({mobile: 16, tablet: 8, computer: 4}),\n        UI.Column.render({mobile: 16, tablet: 8, computer: 4})\n      ])"
        });
        var widthEx2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ width: 4, largescreen: 2 }, [
                    dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                ]),
                UI.Column.render({ width: 4, largescreen: 2 }, [
                    dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                ]),
                UI.Column.render({ width: 4, largescreen: 2 }, [
                    dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                ]),
                UI.Column.render({ width: 4, largescreen: 2 }, [
                    dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")
                ]),
            ])),
            code: "UI.Grid.render([\n        UI.Column.render({width: 4, largescreen: 2}),\n        UI.Column.render({width: 4, largescreen: 2}),\n        UI.Column.render({width: 4, largescreen: 2}),\n        UI.Column.render({width: 4, largescreen: 2}),\n      ])"
        });
        return [widthEx.DOM, widthEx2.DOM];
    }
})(ResponsiveVariations = exports.ResponsiveVariations || (exports.ResponsiveVariations = {}));


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var Types;
(function (Types) {
    function run(sources) {
        var basicEx = components_1.Example.run(sources, {
            highlighted: true,
            header: ["Grid", UI.Label.render({ color: UI.Color.Primary }, "Flexbox")],
            description: "A basic grid",
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render()
            ])),
            code: "UI.Grid.render([\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render()\n      ])"
        });
        var dividedEx = components_1.Example.run(sources, {
            header: ["Divided", UI.Label.render({ color: UI.Color.Secondary }, "Requires rows")],
            description: "A grid can have dividers between its columns",
            VNode$: xstream_1.default.of(UI.Grid.render({ width: 3, divided: true }, [
                UI.Row.render([
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                ]),
                UI.Row.render([
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                ])
            ])),
            code: "UI.Grid.render({width: 3, divided: true}, [\n        UI.Row.render([\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ]),\n        UI.Row.render([\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ])\n      ])"
        });
        var verticalEx = components_1.Example.run(sources, {
            header: ["Vertical Divided", UI.Label.render({ color: UI.Color.Secondary }, "Requires Rows")],
            description: "A grid can have dividers between rows",
            VNode$: xstream_1.default.of(UI.Grid.render({ verticallyDivided: true }, [
                UI.Row.render({ width: 2 }, [
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                ]),
                UI.Row.render({ width: 3 }, [
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
                ])
            ])),
            code: "UI.Grid.render({ verticallyDivided: true }, [\n        UI.Row.render({ width: 2 }, [\n          UI.Column.render(),\n          UI.Column.render()\n        ]),\n        UI.Row.render({ width: 3 }, [\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ])\n      ])"
        });
        var celledEx = components_1.Example.run(sources, {
            header: ["Celled", UI.Label.render({ color: UI.Color.Secondary }, "Requires Rows")],
            description: "A grid can have rows divided into cells",
            VNode$: xstream_1.default.of(UI.Grid.render({ celled: true }, [
                UI.Row.render([
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render({ width: 13 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
                ]),
                UI.Row.render([
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render({ width: 10 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ]),
            ])),
            code: "UI.Grid.render({celled: true}, [\n        UI.Row.render([\n          UI.Column.render({width: 3}),\n          UI.Column.render({width: 13})\n        ]),\n        UI.Row.render([\n          UI.Column.render({width: 3}),\n          UI.Column.render({width: 10}),\n          UI.Column.render({width: 3})\n        ]),\n      ])"
        });
        var intCelledEx = components_1.Example.run(sources, {
            header: ["Internally Celled", UI.Label.render({ color: UI.Color.Secondary }, "Requires Rows")],
            description: "A grid can have rows divisions only between internal rows",
            VNode$: xstream_1.default.of(UI.Grid.render({ intCelled: true }, [
                UI.Row.render([
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render({ width: 10 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ]),
                UI.Row.render([
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render({ width: 10 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ])
            ])),
            code: "UI.Grid.render({ intCelled: true }, [\n        UI.Row.render([\n          UI.Column.render({ width: 3 }),\n          UI.Column.render({ width: 10 }),\n          UI.Column.render({ width: 3 })\n        ]),\n        UI.Row.render([\n          UI.Column.render({ width: 3 }),\n          UI.Column.render({ width: 10 }),\n          UI.Column.render({ width: 3 })\n        ])\n      ])"
        });
        return xstream_1.default.combine(basicEx.DOM, dividedEx.DOM, verticalEx.DOM, celledEx.DOM, intCelledEx.DOM);
    }
    Types.run = run;
})(Types = exports.Types || (exports.Types = {}));


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var Variations;
(function (Variations) {
    function run(sources) {
        var floatedEx = createFloatedExamples(sources);
        var widthEx = createWidthExamples(sources);
        var countEx = createCountExamples(sources);
        var equalWidthEx = createEqualWidthExamples(sources);
        var stretchedEx = createStretchedExamples(sources);
        var paddedEx = createPaddedExamples(sources);
        var relaxedEx = createRelaxedExamples(sources);
        var centeredEx = createCenteredExamples(sources);
        var textEx = createTextAlignmentExamples(sources);
        var alignmentEx = createAlignmentExamples(sources);
        var examples = [].concat(floatedEx, widthEx, countEx, equalWidthEx, stretchedEx, paddedEx, relaxedEx, centeredEx, textEx, alignmentEx);
        return xstream_1.default.combine.apply(null, examples);
    }
    Variations.run = run;
    function createFloatedExamples(sources) {
        var floatedEx = components_1.Example.run(sources, {
            header: "Floated",
            description: "A column can sit flush against the left or right edge of a row",
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ float: "left", width: 5 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                UI.Column.render({ float: "right", width: 5 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
            ])),
            code: "UI.Grid.render([\n        UI.Column.render({float: \"left\", width: 5}),\n        UI.Column.render({float: \"right\", width: 5}),\n      ])"
        });
        return [floatedEx.DOM];
    }
    function createWidthExamples(sources) {
        var widthEx = components_1.Example.run(sources, {
            header: "Column Width",
            description: "A column can vary in width taking up more than a single grid column.",
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ width: 4 }, [
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render({ width: 9 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                UI.Column.render({ width: 3 }, [dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
            ])),
            code: "UI.Grid.render([\n        UI.Column.render({width: 4}),\n        UI.Column.render({width: 9}),\n        UI.Column.render({width: 3})\n      ])"
        });
        return [widthEx.DOM];
    }
    function createCountExamples(sources) {
        var countEx = components_1.Example.run(sources, {
            header: "Column Count",
            description: "A grid can have a different number of columns per row",
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Row.render({ width: 3 }, [
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ]),
                UI.Row.render({ width: 4 }, [
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ]),
                UI.Row.render({ width: 5 }, [
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ])
            ])),
            code: "UI.Grid.render([\n        UI.Row.render({ width: 3 }, [\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ]),\n        UI.Row.render({ width: 4 }, [\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ]),\n        UI.Row.render({ width: 5 }, [\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ])\n      ])"
        });
        return [countEx.DOM];
    }
    function createEqualWidthExamples(sources) {
        var equalWidthEx = components_1.Example.run(sources, {
            header: "Equal Width",
            description: "A grid can automatically resize all elements to split the available width evenly",
            VNode$: xstream_1.default.of(UI.Grid.render({ equalWidth: true }, [
                UI.Column.render([
                    UI.Segment.render("1")
                ]),
                UI.Column.render({ width: 8 }, [
                    UI.Segment.render("2")
                ]),
                UI.Column.render([
                    UI.Segment.render("3")
                ])
            ])),
            code: "UI.Grid.render({ equalWidth: true }, [\n        UI.Column.render([\n          UI.Segment.render(\"1\")\n        ]), \n        UI.Column.render({width: 8}, [\n          UI.Segment.render(\"2\")\n        ]), \n        UI.Column.render([\n          UI.Segment.render(\"3\")\n        ])\n      ])"
        });
        var equalWidthEx2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render({ equalWidth: true }, [
                UI.Row.render([
                    UI.Column.render([
                        UI.Segment.render("1")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("2")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("3")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("4")
                    ])
                ]),
                UI.Row.render([
                    UI.Column.render([
                        UI.Segment.render("1")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("2")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("3")
                    ])
                ]),
                UI.Row.render([
                    UI.Column.render([
                        UI.Segment.render("1")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("2")
                    ])
                ])
            ])),
            code: "UI.Grid.render({ equalWidth: true }, [\n        UI.Row.render([\n          UI.Column.render([\n            UI.Segment.render(\"1\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"2\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"3\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"4\")\n          ])\n        ]),\n        UI.Row.render([\n          UI.Column.render([\n            UI.Segment.render(\"1\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"2\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"3\")\n          ])\n        ]),\n        UI.Row.render([\n          UI.Column.render([\n            UI.Segment.render(\"1\")\n          ]),\n          UI.Column.render( [\n            UI.Segment.render(\"2\")\n          ])\n        ])\n      ])"
        });
        return [equalWidthEx.DOM, equalWidthEx2.DOM];
    }
    function createStretchedExamples(sources) {
        var stretchedEx = components_1.Example.run(sources, {
            header: "Stretched",
            description: "A row can stretch its contents to take up the entire column height",
            VNode$: xstream_1.default.of(UI.Grid.render({ width: 3, divided: true }, [
                UI.Row.render({ stretched: true }, [
                    UI.Column.render([
                        UI.Segment.render("1")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("1"),
                        UI.Segment.render("2")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("1"),
                        UI.Segment.render("2"),
                        UI.Segment.render("3")
                    ])
                ])
            ])),
            code: "UI.Grid.render({width: 3, divided: true}, [\n        UI.Row.render({ stretched: true }, [\n          UI.Column.render([\n            UI.Segment.render(\"1\")\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"1\"),\n            UI.Segment.render(\"2\")\n          ]), \n          UI.Column.render([\n            UI.Segment.render(\"1\"),\n            UI.Segment.render(\"2\"),\n            UI.Segment.render(\"3\")\n          ])\n        ])\n      ])"
        });
        var stretchedEx2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render({ equalWidth: true }, [
                UI.Row.render({ stretched: true }, [
                    UI.Column.render([
                        UI.Segment.render("1"),
                        UI.Segment.render("2")
                    ]),
                    UI.Column.render({ width: 6 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("1"),
                        UI.Segment.render("2")
                    ])
                ]),
                UI.Row.render([
                    UI.Column.render([
                        UI.Segment.render("1"),
                        UI.Segment.render("2")
                    ]),
                    UI.Column.render({ width: 6 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Segment.render("1"),
                        UI.Segment.render("2")
                    ])
                ])
            ])),
            code: "UI.Grid.render({ equalWidth: true }, [\n        UI.Row.render({ stretched: true }, [\n          UI.Column.render([\n            UI.Segment.render(\"1\"),\n            UI.Segment.render(\"2\")\n          ]),\n          UI.Column.render({ width: 6 }, [\n            UI.Image.render({ size: UI.Size.Fluid })\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"1\"),\n            UI.Segment.render(\"2\")\n          ])\n        ]),\n        UI.Row.render([\n          UI.Column.render([\n            UI.Segment.render(\"1\"),\n            UI.Segment.render(\"2\")\n          ]),\n          UI.Column.render({ width: 6 }, [\n            UI.Image.render({ size: UI.Size.Fluid })\n          ]),\n          UI.Column.render([\n            UI.Segment.render(\"1\"),\n            UI.Segment.render(\"2\")\n          ])\n        ])\n      ])"
        });
        return [stretchedEx.DOM, stretchedEx2.DOM];
    }
    function createPaddedExamples(sources) {
        var paddedEx = components_1.Example.run(sources, {
            header: "Padded",
            description: [
                dom_1.p("A grid can preserve its vertical and horizontal gutters on first and last columns"),
                dom_1.p("The following grid has vertical and horizontal gutters")
            ],
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Divider.render(),
                UI.Grid.render({ width: 2, padded: true }, [
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
                ])
            ])),
            code: "UI.Divider.render(),\n        UI.Grid.render({ width: 2, padded: true }, [\n          UI.Column.render(),\n          UI.Column.render()\n        ])"
        });
        var paddedEx2 = components_1.Example.run(sources, {
            description: "The following grid has vertical gutters.",
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Divider.render(),
                UI.Grid.render({ width: 2, verticallyPadded: true }, [
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
                ])
            ])),
            code: "UI.Divider.render(),\n        UI.Grid.render({ width: 2, verticallyPadded: true }, [\n          UI.Column.render(),\n          UI.Column.render()\n        ])"
        });
        var paddedEx3 = components_1.Example.run(sources, {
            description: "The following grid has horizontal gutters.",
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Divider.render(),
                UI.Grid.render({ width: 2, horizontallyPadded: true }, [
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")]),
                    UI.Column.render([dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuius quidem, quoniam Stoicus fuit, sententia condemnata mihi videtur esse inanitas ista verborum. Istam voluptatem perpetuam quis potest praestare sapienti?")])
                ])
            ])),
            code: "UI.Divider.render(),\n        UI.Grid.render({ width: 2, horizontallyPadded: true }, [\n          UI.Column.render(),\n          UI.Column.render()\n        ])"
        });
        return [paddedEx.DOM, paddedEx2.DOM, paddedEx3.DOM];
    }
    function createRelaxedExamples(sources) {
        var relaxedEx = components_1.Example.run(sources, {
            header: "Relaxed",
            description: "A grid can increase its gutters to allow for more negative space",
            VNode$: xstream_1.default.of(UI.Grid.render({ relaxed: true, width: 4 }, [
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ])
            ])),
            code: "UI.Grid.render({relaxed: true, width: 4}, [\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render()\n      ])"
        });
        var relaxedEx2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render({ veryRelaxed: true, width: 4 }, [
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ])
            ])),
            code: "UI.Grid.render({veryRelaxed: true, width: 4}, [\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render()\n      ])"
        });
        return [relaxedEx.DOM, relaxedEx2.DOM];
    }
    function createCenteredExamples(sources) {
        var centeredEx = components_1.Example.run(sources, {
            header: "Centered",
            description: "A grid can have its columns centered",
            VNode$: xstream_1.default.of(UI.Grid.render({ width: 2, centered: true }, [
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Row.render({ width: 4, centered: true }, [
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ]),
                UI.Row.render({ width: 4 }, [
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ])
            ])),
            code: "UI.Grid.render({width: 2, centered: true}, [\n        UI.Column.render(),\n        UI.Row.render({width:4, centered: true}, [\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ]),        \n        UI.Row.render({width:4}, [\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ])\n      ])"
        });
        return [centeredEx.DOM];
    }
    function createTextAlignmentExamples(sources) {
        var textEx = components_1.Example.run(sources, {
            header: "Text Alignment",
            description: "A grid, row, or column can specify its text alignment",
            VNode$: xstream_1.default.of(UI.Grid.render({ textAlignment: "center" }, [
                UI.Row.render({ width: 3 }, [
                    UI.Column.render([
                        UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
                            { header: true, main: "Cats" }
                        ])
                    ]),
                    UI.Column.render([
                        UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
                            { header: true, main: "Dogs" },
                            { main: "Poodle" },
                            { main: "Cockerspaniel" }
                        ])
                    ]),
                    UI.Column.render([
                        UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
                            { header: true, main: "Monkeys" }
                        ])
                    ])
                ])
            ])),
            code: "UI.Grid.render({ textAlignment: \"center\"}, [\n        UI.Row.render({width: 3}, [\n          UI.Column.render([\n            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [\n              { header: true, main: \"Cats\" }\n            ])\n          ]),\n          UI.Column.render([\n            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [\n              { header: true, main: \"Dogs\" },\n              { main: \"Poodle\" },\n              { main: \"Cockerspaniel\" }\n            ])\n          ]),\n          UI.Column.render([\n            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [\n              { header: true, main: \"Monkeys\" }\n            ])\n          ])\n        ])\n      ])"
        });
        var textEx2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render({ textAlignment: "center" }, [
                UI.Row.render({ width: 3 }, [
                    UI.Column.render([
                        UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
                            { header: true, main: "Cats" }
                        ])
                    ]),
                    UI.Column.render({ textAlignment: "left" }, [
                        UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
                            { header: true, main: "Dogs" },
                            { main: "Poodle" },
                            { main: "Cockerspaniel" }
                        ])
                    ]),
                    UI.Column.render([
                        UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
                            { header: true, main: "Monkeys" }
                        ])
                    ])
                ]),
                UI.Row.render({ textAlignment: "justified" }, [
                    UI.Column.render("Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other.")
                ])
            ])),
            code: "UI.Grid.render({ textAlignment: \"center\"}, [\n        UI.Row.render({width: 3}, [\n          UI.Column.render([\n            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [\n              { header: true, main: \"Cats\" }\n            ])\n          ]),\n          UI.Column.render({textAlignment: \"left\"}, [\n            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [\n              { header: true, main: \"Dogs\" },\n              { main: \"Poodle\" },\n              { main: \"Cockerspaniel\" }\n            ])\n          ]),\n          UI.Column.render([\n            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [\n              { header: true, main: \"Monkeys\" }\n            ])\n          ])\n        ]), \n        UI.Row.render({textAlignment: \"justified\"}, [\n          UI.Column.render(\"Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other. Justified content fits exactly inside the grid column, taking up the entire width from one side to the other.\")\n        ])\n      ])"
        });
        var textEx3 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render({ textAlignment: "right", width: 3 }, [
                UI.Row.render([
                    UI.Column.render([
                        UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
                            { header: true, main: "Cats" }
                        ])
                    ]),
                    UI.Column.render([
                        UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
                            { header: true, main: "Dogs" },
                            { main: "Poodle" },
                            { main: "Cockerspaniel" }
                        ])
                    ]),
                    UI.Column.render([
                        UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [
                            { header: true, main: "Monkeys" }
                        ])
                    ])
                ])
            ])),
            code: "UI.Grid.render({ textAlignment: \"right\", width: 3 }, [\n        UI.Row.render([\n          UI.Column.render([\n            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [\n              { header: true, main: \"Cats\" }\n            ])\n          ]),\n          UI.Column.render([\n            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [\n              { header: true, main: \"Dogs\" },\n              { main: \"Poodle\" },\n              { main: \"Cockerspaniel\" }\n            ])\n          ]), \n          UI.Column.render([\n            UI.Menu.render({ size: UI.Size.Fluid, vertical: true }, [\n              { header: true, main: \"Monkeys\" }\n            ])\n          ])\n        ])\n      ])"
        });
        return [textEx.DOM, textEx2.DOM, textEx3.DOM];
    }
    function createAlignmentExamples(sources) {
        var alignmentEx = components_1.Example.run(sources, {
            header: "Vertical Alignment",
            description: "A grid, row, or column can specify its vertical alignment to have all its columns vertically centered.",
            VNode$: xstream_1.default.of(UI.Grid.render({ alignment: "middle", centered: true, width: 4 }, [
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000"),
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ]),
                UI.Column.render([
                    UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                ])
            ])),
            code: "UI.Grid.render({ alignment: \"middle\", centered: true, width: 4 }, [\n        UI.Column.render([\n          UI.Image.render({ size: UI.Size.Fluid }, \"\")\n        ]),\n        UI.Column.render([\n          UI.Image.render({ size: UI.Size.Fluid }, \"\"),\n          UI.Image.render({ size: UI.Size.Fluid }, \"\")\n        ]),\n        UI.Column.render([\n          UI.Image.render({ size: UI.Size.Fluid }, \"\")\n        ])\n      ])"
        });
        var alignmentEx2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render({ centered: true, width: 4 }, [
                UI.Row.render({ alignment: "top" }, [
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000"),
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ]),
                UI.Row.render({ alignment: "middle" }, [
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000"),
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ]),
                UI.Row.render({ alignment: "bottom" }, [
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000"),
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ])
            ])),
            code: "UI.Grid.render({ centered: true, width: 4 }, [\n        UI.Row.render({ alignment: \"top\" }, [\n          UI.Column.render([\n            UI.Image.render({ size: UI.Size.Fluid }, \"\")\n          ]),\n          UI.Column.render([\n            UI.Image.render({ size: UI.Size.Fluid }, \"\"),\n            UI.Image.render({ size: UI.Size.Fluid }, \"\")\n          ]),\n          UI.Column.render([\n            UI.Image.render({ size: UI.Size.Fluid }, \"\")\n          ])\n        ]),\n        UI.Row.render({ alignment: \"middle\" }, [\n          UI.Column.render([\n            UI.Image.render({ size: UI.Size.Fluid }, \"\")\n          ]),\n          UI.Column.render([\n            UI.Image.render({ size: UI.Size.Fluid }, \"\"),\n            UI.Image.render({ size: UI.Size.Fluid }, \"\")\n          ]),\n          UI.Column.render([\n            UI.Image.render({ size: UI.Size.Fluid }, \"\")\n          ])\n        ]),\n        UI.Row.render({ alignment: \"bottom\" }, [\n          UI.Column.render([\n            UI.Image.render({ size: UI.Size.Fluid }, \"\")\n          ]),\n          UI.Column.render([\n            UI.Image.render({ size: UI.Size.Fluid }, \"\"),\n            UI.Image.render({ size: UI.Size.Fluid }, \"\")\n          ]),\n          UI.Column.render([\n            UI.Image.render({ size: UI.Size.Fluid }, \"\")\n          ])\n        ])\n      ])"
        });
        return [alignmentEx.DOM, alignmentEx2.DOM];
    }
})(Variations = exports.Variations || (exports.Variations = {}));


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var overview_1 = __webpack_require__(162);
var definition_1 = __webpack_require__(156);
var Grid;
(function (Grid) {
    function run(sources) {
        var overview = overview_1.Overview.run(sources);
        var definition = definition_1.Definition.run(sources);
        var tabs = UI.Tabs.run({
            DOM: sources.DOM,
            labels: ["Overview", "Definition"],
            content: [overview.map(function (o) { return [o]; }), definition.map(function (o) { return [o]; })],
            menuProps$: xstream_1.default.of({ equalWidth: true }),
            segmentProps$: xstream_1.default.of({ basic: true })
        });
        var vTree$ = xstream_1.default.combine(tabs.DOM).map(function (_a) {
            var tabs = _a[0];
            return dom_1.div({ props: { className: "article" } }, [
                UI.Segment.render({ vertical: true }, [
                    UI.Container.render([
                        UI.Header.render({
                            props: { size: UI.Size.Huge },
                            content: {
                                main: "Grid",
                                subtext: "A grid is used to harmonize negative space in a layout"
                            }
                        })
                    ])
                ]),
                UI.Container.render([
                    UI.Divider.render({ hidden: true }),
                    tabs
                ])
            ]);
        });
        return {
            DOM: vTree$,
            router: xstream_1.default.never()
        };
    }
    Grid.run = run;
})(Grid = exports.Grid || (exports.Grid = {}));


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var components_1 = __webpack_require__(7);
var Columns;
(function (Columns) {
    function run(sources) {
        var flowEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Automatic Flow",
            description: "Most grids do not need to specify rows. Content will automatically flow to the next row when all the grid columns are taken in the current row.",
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 })
            ])),
            code: "UI.Grid.render([\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 })\n      ])"
        });
        var contentEx = components_1.Example.run(sources, {
            header: "Column Content",
            description: "Since columns use padding to create gutters, content stylings should not be applied directly to columns, but to elements inside of columns.",
            VNode$: xstream_1.default.of(UI.Grid.render({ width: 3 }, [
                UI.Column.render([
                    UI.Segment.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ]),
                UI.Column.render([
                    UI.Segment.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ]),
                UI.Column.render([
                    UI.Segment.render([
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ])
            ])),
            code: "UI.Grid.render([\n        UI.Column.render([\n          UI.Segment.render([\n            UI.Image.render(\"\")\n          ])\n        ]),\n        UI.Column.render([\n          UI.Segment.render([\n            UI.Image.render(\"\")\n          ])\n        ]),\n        UI.Column.render([\n          UI.Segment.render([\n            UI.Image.render(\"\")\n          ])\n        ])\n      ])"
        });
        var widthEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Column Widths",
            description: "Column widths can be specified using the width property. If a column cannot fit in a row it will automatically flow to the next row",
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ width: 8 }),
                UI.Column.render({ width: 8 }),
                UI.Column.render({ width: 10 }),
                UI.Column.render({ width: 6 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 12 }),
                UI.Column.render({ width: 2 }),
                UI.Column.render({ width: 14 }),
                UI.Column.render({ width: 16 })
            ])),
            code: "UI.Grid.render([\n       UI.Column.render({ width: 8 }),\n        UI.Column.render({ width: 8 }),\n        UI.Column.render({ width: 10 }),\n        UI.Column.render({ width: 6 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 12 }),\n        UI.Column.render({ width: 2}),\n        UI.Column.render({ width: 14 }),\n        UI.Column.render({ width: 16})\n      ])"
        });
        return xstream_1.default.combine(flowEx.DOM, contentEx.DOM, widthEx.DOM);
    }
    Columns.run = run;
})(Columns = exports.Columns || (exports.Columns = {}));


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var introduction_1 = __webpack_require__(163);
var columns_1 = __webpack_require__(161);
var rows_1 = __webpack_require__(165);
var varyingGrids_1 = __webpack_require__(166);
var responsiveGrids_1 = __webpack_require__(164);
var Overview;
(function (Overview) {
    function run(sources) {
        var intro = introduction_1.Introduction.run(sources);
        var columns = columns_1.Columns.run(sources);
        var rows = rows_1.Rows.run(sources);
        var varyingGrids = varyingGrids_1.VaryingGrids.run(sources);
        var responsiveGrids = responsiveGrids_1.ResponsiveGrids.run(sources);
        var vTree$ = xstream_1.default.combine(intro, columns, rows, varyingGrids, responsiveGrids).map(function (_a) {
            var intro = _a[0], columns = _a[1], rows = _a[2], varyingGrids = _a[3], responsiveGrids = _a[4];
            return UI.Container.render([
                UI.Segment.render({ basic: true }, [
                    UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Introduction")
                ]
                    .concat(intro)),
                UI.Segment.render({ basic: true }, [
                    UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Columns")
                ]
                    .concat(columns)),
                UI.Segment.render({ basic: true }, [
                    UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Rows")
                ]
                    .concat(rows)),
                UI.Segment.render({ basic: true }, [
                    UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Varying Grids")
                ]
                    .concat(varyingGrids)),
                UI.Segment.render({ basic: true }, [
                    UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Responsive Grids")
                ]
                    .concat(responsiveGrids))
            ]);
        });
        return vTree$;
    }
    Overview.run = run;
})(Overview = exports.Overview || (exports.Overview = {}));


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var Introduction;
(function (Introduction) {
    function run(sources) {
        var gridEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Grids",
            description: [dom_1.p(["A grid is a structure with a ", dom_1.a({ attrs: { href: "http://99designs.com/designer-blog/2013/03/21/history-of-the-grid-part-1/" } }, "long history"), " used to align negative space in designs."]),
                dom_1.p("Using a grid makes content appear to flow more naturally on your page.")
            ],
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 })
            ])),
            code: "UI.Grid.render([\n        UI.Column.render({width: 4}),\n        UI.Column.render({width: 4}),\n        UI.Column.render({width: 4}),\n        UI.Column.render({width: 4})\n      ])"
        });
        var columnsEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Columns",
            description: [
                dom_1.p("Grids divide horizontal space into indivisible units called \"columns\". All columns in a grid must specify their width as proportion of the total available row width."),
                dom_1.p("All grid systems chooses an arbitrary column count to allow per row. Semantic's default theme uses 16 columns."),
                dom_1.p(["The example below shows four four wide columns will fit in the first row, ", dom_1.code("16 / 4 = 4"), " and three various sized columns in the second row. ", dom_1.code("2 + 8 + 6 = 16")]),
                dom_1.p("The default column count, and other arbitrary features of grids can be changed by adjusting Semantic UI's underlying theming variables.")
            ],
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 2 }),
                UI.Column.render({ width: 8 }),
                UI.Column.render({ width: 6 }),
            ])),
            code: "UI.Grid.render([\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 2 }),\n        UI.Column.render({ width: 8 }),\n        UI.Column.render({ width: 6 }),\n      ])"
        });
        var rowsEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Rows",
            description: [
                dom_1.p("Rows are groups of columns which are aligned horizontally."),
                dom_1.p(["Rows can either be ", dom_1.i("explicit"), " marked with an additional row element, or ", dom_1.i("implicit"), ", automatically occurring when no more space is left in a previous row."])
            ],
            VNode$: xstream_1.default.of(UI.Grid.render({ width: 4 }, [
                UI.Row.render([
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render()
                ]),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
            ])),
            code: "UI.Grid.render({ width: 4 }, [\n        UI.Row.render([\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ]),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n      ])"
        });
        var guttersEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Gutters",
            description: [
                dom_1.p(["Grid columns are separated by areas of white space referred to as \"gutters\". Gutters improve legibility by providing, ",
                    dom_1.a({ attrs: { href: "https://en.wikipedia.org/wiki/Negative_space" } }, "negative space"), " between page elements."]),
                dom_1.p("Gutters remain a constant size regardless of the width of the grid, or how many columns are in a row. To increase the size of gutters in a particular grid, you can use a relaxed grid variation.")
            ],
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Grid.render([
                    UI.Row.render({ equalWidth: true }, [
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                    ]),
                    UI.Row.render({ equalWidth: true }, [
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render()
                    ])
                ]),
                UI.Grid.render({ relaxed: true }, [
                    UI.Row.render({ equalWidth: true }, [
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                    ]),
                    UI.Row.render({ equalWidth: true }, [
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render()
                    ])
                ])
            ])),
            code: "UI.Grid.render([\n          UI.Row.render({ equalWidth: true }, [\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n          ]),\n          UI.Row.render({ equalWidth: true }, [\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render()\n          ])\n        ]),\n        UI.Grid.render({relaxed: true}, [\n          UI.Row.render({ equalWidth: true }, [\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n          ]),\n          UI.Row.render({ equalWidth: true }, [\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render()\n          ])\n        ])"
        });
        var negMarginsEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Negative margins",
            description: [dom_1.p(["Since all grid columns include gutters, grids use ", dom_1.a({ attrs: { href: "https://csswizardry.com/2011/08/building-better-grid-systems/" } }, "negative margins"),
                    " to make sure that the first and last columns sit flush with content outside the grid."]),
                dom_1.p("In the following example, you can see even though the top row has padding, the attached button still sits flush with the edge of the grid."),
                dom_1.p("In some cases you may want to avoid using negative margins. You can do this by using a padded grid variation.")
            ],
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Button.render({ attachment: UI.Attachment.Top }, "Button before grid"),
                UI.Grid.render([
                    UI.Column.render({ width: 16 }),
                    UI.Column.render({ width: 10 }),
                    UI.Column.render({ width: 6 })
                ]),
                UI.Grid.render([
                    UI.Column.render({ width: 16 }),
                ]),
                UI.Button.render({ attachment: UI.Attachment.Bottom }, "Button after grid")
            ])),
            code: "UI.Button.render({attachment: UI.Attachment.Top}, \"Button before grid\"),\n        UI.Grid.render([\n          UI.Column.render({width: 16}),\n          UI.Column.render({width: 10}),\n          UI.Column.render({width: 6})\n        ]),\n        UI.Grid.render([\n          UI.Column.render({width: 16}),\n        ]),\n        UI.Button.render({attachment: UI.Attachment.Bottom}, \"Button after grid\")"
        });
        var containerEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Container grids",
            description: [
                dom_1.p("Grids are fluid and will automatically flow in size to take the maximum available width."),
                dom_1.p("Containers are elements designed to limit page content to a reasonable maximum width for display based on the size of the user's screen."),
                dom_1.p("Using a grid container is the best way to include top-level page content inside a grid.")
            ],
            VNode$: xstream_1.default.of(UI.Grid.render({ container: true }, [
                UI.Column.render({ width: 16 })
            ])),
            code: "UI.Grid.render({container: true}, [\n        UI.Column.render({width: 16})\n      ])"
        });
        return xstream_1.default.combine(gridEx.DOM, columnsEx.DOM, rowsEx.DOM, guttersEx.DOM, negMarginsEx.DOM, containerEx.DOM);
    }
    Introduction.run = run;
})(Introduction = exports.Introduction || (exports.Introduction = {}));


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var components_1 = __webpack_require__(7);
var ResponsiveGrids;
(function (ResponsiveGrids) {
    function run(sources) {
        var containerEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Containers",
            description: "A grid container variant can be used to provide a responsive, fixed width container for wrapping the contents of a page.",
            VNode$: xstream_1.default.of(UI.Grid.render({ container: true }, [
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 }),
                UI.Column.render({ width: 4 })
            ])),
            code: "UI.Grid.render({container: true}, [\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 }),\n        UI.Column.render({ width: 4 })\n      ])"
        });
        var stackableEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Stackable",
            description: "A stackable grid will automatically stack rows to a single columns on mobile devices",
            VNode$: xstream_1.default.of(UI.Grid.render({ stackable: true, width: 4 }, [
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render()
            ])),
            code: "UI.Grid.render({ stackable: true, width: 4 }, [\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render()\n      ])"
        });
        var reverseEx = components_1.Example.run(sources, {
            header: "Reverse Order",
            description: "Semantic includes special reversed variations that allow you to reverse the order of columns or rows by device",
            VNode$: xstream_1.default.of(UI.Grid.render({ reversedMobile: true, equalWidth: true }, [
                UI.Column.render("First"),
                UI.Column.render("Second"),
                UI.Column.render("Third"),
            ])),
            code: "UI.Grid.render({ reversedMobile: true, equalWidth: true }, [\n        UI.Column.render(\"First\"),\n        UI.Column.render(\"Second\"),\n        UI.Column.render(\"Third\"),\n      ])"
        });
        var doublingEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Doubling",
            description: "A doubling grid will double column widths for each device jump.",
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Row.render({ doubling: true, width: 8 }, [
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render()
                ]),
                UI.Row.render({ doubling: true, width: 6 }, [
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render()
                ]),
                UI.Row.render({ doubling: true, width: 4 }, [
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render(),
                    UI.Column.render()
                ])
            ])),
            code: "UI.Grid.render([\n        UI.Row.render({ doubling: true, width: 8 }, [\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ]),\n        UI.Row.render({ doubling: true, width: 6 }, [\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ]),\n        UI.Row.render({ doubling: true, width: 4 }, [\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render(),\n          UI.Column.render()\n        ])\n      ])"
        });
        var manualEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Manual Tweaks",
            description: "Although design patterns like doubling or stackable are useful at simplifying responsive styling, you can also manually tweak device presentation by specifying the width for a devicetype on columns or setting the device only properties on grids, rows or columns.",
            VNode$: xstream_1.default.of(UI.Grid.render({ centered: true }, [
                UI.Row.render({ computerOnly: true }, [
                    UI.Column.render()
                ]),
                UI.Column.render({ tablet: 6, computer: 8 }),
                UI.Column.render({ tablet: 6, computer: 8 }),
                UI.Column.render({ tablet: 6, computer: 8 }),
                UI.Column.render({ tablet: 6, computer: 8 }),
                UI.Column.render({ tablet: 6, computer: 8 }),
            ])),
            code: "UI.Grid.render({centered: true}, [\n        UI.Row.render({computerOnly: true}, [\n          UI.Column.render()\n        ]),\n        UI.Column.render({tablet: 6, computer: 8}),\n        UI.Column.render({tablet: 6, computer: 8}),\n        UI.Column.render({tablet: 6, computer: 8}),\n        UI.Column.render({tablet: 6, computer: 8}),\n        UI.Column.render({tablet: 6, computer: 8}),\n      ])"
        });
        return xstream_1.default.combine(containerEx.DOM, stackableEx.DOM, reverseEx.DOM, doublingEx.DOM, manualEx.DOM);
    }
    ResponsiveGrids.run = run;
})(ResponsiveGrids = exports.ResponsiveGrids || (exports.ResponsiveGrids = {}));


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var Rows;
(function (Rows) {
    function run(sources) {
        var groupingEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Grouping",
            description: "Row wrappers allow you to apply variations to a group of columns.",
            VNode$: xstream_1.default.of(UI.Grid.render({ width: 4 }, [
                UI.Row.render({ width: 2 }, [
                    UI.Column.render()
                ]),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render()
            ])),
            code: "UI.Grid.render({width: 4}, [\n        UI.Row.render({width: 2}, [\n          UI.Column.render()\n        ]),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render()\n      ])"
        });
        var clearEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Clearing Content",
            description: "Row wrappers will automatically clear previous columns, making them useful when using floated variations.",
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Row.render({ width: 4 }, [
                    UI.Column.render({ float: "left" }),
                    UI.Column.render({ float: "right" })
                ]),
                UI.Row.render([
                    UI.Column.render({ width: 3 }),
                    UI.Column.render({ width: 8 }),
                    UI.Column.render({ width: 5 })
                ])
            ])),
            code: "UI.Grid.render([\n        UI.Row.render({ width: 4 }, [\n          UI.Column.render({ float: \"left\" }),\n          UI.Column.render({ float: \"right\" })\n        ]),\n        UI.Row.render([\n          UI.Column.render({width: 3}),\n          UI.Column.render({width: 8}),\n          UI.Column.render({width: 5})\n        ])\n      ])"
        });
        var specialEx = components_1.Example.run(sources, {
            header: "Special Grids",
            description: "Additionally, some types of grids, like divided or celled require row wrappers to apply formatting correctly.",
            VNode$: xstream_1.default.of(UI.Grid.render({ intCelled: true }, [
                UI.Row.render([
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render({ width: 10 }, [
                        dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at purus nibh. Cras metus nulla, vestibulum in auctor ac, fermentum vitae tellus. Donec sed aliquam nisl. Sed eu leo id est pretium euismod. Nulla id justo at mi venenatis volutpat. Fusce nisi leo, placerat id condimentum a, accumsan vitae tortor. Nunc magna nunc, venenatis nec elementum eu, ultrices in sem. Maecenas tincidunt semper molestie. Nulla nec neque sit amet libero molestie feugiat. Cras id metus velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis arcu non leo porta ut euismod ante luctus. Praesent elementum sodales dolor id scelerisque.")
                    ]),
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ]),
                UI.Row.render([
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ]),
                    UI.Column.render({ width: 10 }, [
                        dom_1.p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at purus nibh. Cras metus nulla, vestibulum in auctor ac, fermentum vitae tellus. Donec sed aliquam nisl. Sed eu leo id est pretium euismod. Nulla id justo at mi venenatis volutpat. Fusce nisi leo, placerat id condimentum a, accumsan vitae tortor. Nunc magna nunc, venenatis nec elementum eu, ultrices in sem. Maecenas tincidunt semper molestie. Nulla nec neque sit amet libero molestie feugiat. Cras id metus velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis arcu non leo porta ut euismod ante luctus. Praesent elementum sodales dolor id scelerisque.")
                    ]),
                    UI.Column.render({ width: 3 }, [
                        UI.Image.render({ size: UI.Size.Fluid }, "https://placeholdit.imgix.net/~text?txtsize=330&txt=Placeholder&w=1000&h=1000")
                    ])
                ])
            ])),
            code: "UI.Grid.render({intCelled: true}, [\n        UI.Row.render([\n          UI.Column.render({width: 3}),\n          UI.Column.render({width: 10}),\n          UI.Column.render({width: 3})\n        ]),\n        UI.Row.render([\n          UI.Column.render({width: 3}),\n          UI.Column.render({width: 10}),\n          UI.Column.render({width: 3})\n        ])\n      ])"
        });
        return xstream_1.default.combine(groupingEx.DOM, clearEx.DOM, specialEx.DOM);
    }
    Rows.run = run;
})(Rows = exports.Rows || (exports.Rows = {}));


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var VaryingGrids;
(function (VaryingGrids) {
    function run(sources) {
        var nestedEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Nesting Grids",
            description: "Grids can be placed inside of other grids, letting you sub-divide columns.",
            VNode$: xstream_1.default.of(UI.Grid.render({ width: 2 }, [
                UI.Column.render([
                    UI.Grid.render({ width: 3 }, [
                        UI.Column.render(),
                        UI.Column.render(),
                        UI.Column.render(),
                    ])
                ]),
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render([
                    UI.Grid.render([
                        UI.Column.render({ width: 10 }),
                        UI.Column.render({ width: 6 }),
                    ])
                ]),
            ])),
            code: "UI.Grid.render({ width: 2}, [\n        UI.Column.render({\n          UI.Grid.render({width: 3}, [\n            UI.Column.render(),\n            UI.Column.render(),\n            UI.Column.render(),\n          ])\n        }),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render([\n          UI.Grid.render([\n            UI.Column.render({width: 10}),\n            UI.Column.render({width: 6}),\n          ])\n        ]),\n      ])"
        }).DOM.map(function (ex) { return dom_1.div(".special", [ex]); });
        var colCountEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Automatic Column Count",
            description: "The equalWidth variation will automatically divide column width evenly. This is useful with dynamic content where you do not know the column count in advance.",
            VNode$: xstream_1.default.of(UI.Grid.render({ equalWidth: true }, [
                UI.Column.render(),
                UI.Column.render(),
                UI.Column.render(),
                UI.Row.render({ equalWidth: true }, [
                    UI.Column.render(),
                    UI.Column.render()
                ])
            ])),
            code: "UI.Grid.render({ equalWidth: true }, [\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Column.render(),\n        UI.Row.render({ equalWidth: true }, [\n          UI.Column.render(),\n          UI.Column.render()\n        ])\n      ])"
        });
        var centeringEx = components_1.Example.run(sources, {
            highlighted: true,
            header: "Centering Content",
            description: "If a row does not take up all sixteen grid columns, you can use a centered variation to center the column contents inside the grid.",
            VNode$: xstream_1.default.of(UI.Grid.render({ centered: true, width: 2 }, [
                UI.Column.render(),
                UI.Row.render({ width: 4 }, [
                    UI.Column.render(),
                    UI.Column.render(),
                ])
            ])),
            code: "UI.Grid.render({ centered: true, width: 2 }, [\n        UI.Column.render(),\n        UI.Row.render({ width: 4 }, [\n          UI.Column.render(),\n          UI.Column.render(),\n        ])\n      ])"
        });
        return xstream_1.default.combine(nestedEx, colCountEx.DOM, centeringEx.DOM);
    }
    VaryingGrids.run = run;
})(VaryingGrids = exports.VaryingGrids || (exports.VaryingGrids = {}));


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(147));
__export(__webpack_require__(152));
__export(__webpack_require__(160));
__export(__webpack_require__(169));
__export(__webpack_require__(173));


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var Content;
(function (Content) {
    function run(sources) {
        var headerEx = createHeaderExamples(sources);
        var textEx = createTextExamples(sources);
        var inputEx = createInputExamples(sources);
        var buttonEx = createButtonExamples(sources);
        var linkEx = createLinkExamples(sources);
        var dropdownEx = createDropdownExamples(sources);
        var popupEx = createPopupExamples(sources);
        var searchEx = createSearchExamples(sources);
        var menuEx = createMenuExamples(sources);
        var subMenuEx = createSubMenuExamples(sources);
        var examples = [].concat(headerEx, textEx, inputEx, buttonEx, linkEx, dropdownEx, popupEx, searchEx, menuEx, subMenuEx);
        return xstream_1.default.combine.apply(null, examples);
    }
    Content.run = run;
    function createHeaderExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Header",
            description: "A menu item may include a header or may itself be a header",
            VNode$: xstream_1.default.of(UI.Menu.render([
                { header: true, main: "Our company" },
                { main: "About us" },
                { main: "Jobs" },
                { main: "Locations" }
            ])),
            code: "UI.Menu.render([\n        {header: true, main: \"Our company\"},\n        {main: \"About us\"},\n        {main: \"Jobs\"},\n        {main: \"Locations\"}\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ vertical: true }, [
                {
                    header: true,
                    main: [
                        "Products",
                        UI.Menu.render({ submenu: true }, [
                            { main: "Enterprise" },
                            { main: "Consumer" }
                        ])
                    ]
                },
                {
                    header: true,
                    main: [
                        "CMS Solutions",
                        UI.Menu.render({ submenu: true }, [
                            { main: "Rails" },
                            { main: "Python" },
                            { main: "PHP" }
                        ])
                    ]
                }, {
                    header: true,
                    main: [
                        "Hosting",
                        UI.Menu.render({ submenu: true }, [
                            { main: "Shared" },
                            { main: "Dedicated" }
                        ])
                    ]
                }, {
                    header: true,
                    main: [
                        "Support",
                        UI.Menu.render({ submenu: true }, [
                            { main: "E-mail Support" },
                            { main: "FAQs" }
                        ])
                    ]
                }
            ])),
            code: "UI.Menu.render({ vertical: true }, [\n        {\n          header: true,\n          main: [\n            \"Products\",\n            UI.Menu.render({ submenu: true }, [\n              { main: \"Enterprise\" },\n              { main: \"Consumer\" }\n            ])\n          ]\n        },\n        {\n          header: true,\n          main: [\n            \"CMS Solutions\",\n            UI.Menu.render({ submenu: true }, [\n              { main: \"Rails\" },\n              { main: \"Python\" },\n              { main: \"PHP\" }\n            ])\n          ]\n        }, {\n          header: true,\n          main: [\n            \"Hosting\",\n            UI.Menu.render({ submenu: true }, [\n              { main: \"Shared\" },\n              { main: \"Dedicated\" }\n            ])\n          ]\n        }, {\n          header: true,\n          main: [\n            \"Support\",\n            UI.Menu.render({ submenu: true }, [\n              { main: \"E-mail Support\" },\n              { main: \"FAQs\" }\n            ])\n          ]\n        }\n      ])"
        });
        return [ex.DOM, ex2.DOM];
    }
    function createTextExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Text",
            description: "A vertical menu item can include any type of text content.",
            VNode$: xstream_1.default.of(UI.Menu.render({ vertical: true }, [
                {
                    main: [
                        UI.Header.render("Promotions"),
                        dom_1.p("Check out our new promotions"),
                    ]
                },
                {
                    main: [
                        UI.Header.render("Coupons"),
                        dom_1.p("Check out our collection of coupons"),
                    ]
                },
                {
                    main: [
                        UI.Header.render("Rebates"),
                        dom_1.p("Visit our rebate forum for information on claiming rebates"),
                    ]
                }
            ])),
            code: "UI.Menu.render({ vertical: true }, [\n        {\n          main: [\n            UI.Header.render(\"Promotions\"),\n            p(\"Check out our new promotions\"),\n          ]\n        },\n        {\n          main: [\n            UI.Header.render(\"Coupons\"),\n            p(\"Check out our collection of coupons\"),\n          ]\n        },\n        {\n          main: [\n            UI.Header.render(\"Rebates\"),\n            p(\"Visit our rebate forum for information on claiming rebates\"),\n          ]\n        }\n      ])"
        });
        return [ex.DOM];
    }
    function createInputExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Input",
            description: "A menu item can contain an input inside of it",
            VNode$: xstream_1.default.of(UI.Menu.render([
                {
                    main: [
                        UI.Textbox.render({ placeholder: "Search..", icon: true }, [
                            UI.Icon.render(UI.IconType.Search)
                        ])
                    ]
                }, {
                    float: "right", main: [
                        UI.Textbox.render({ placeholder: "Navigate to..", rightContent: true, action: true }, [
                            UI.Button.render("Go")
                        ])
                    ]
                }
            ])),
            code: "UI.Menu.render([\n        {main: [\n          UI.Textbox.render({placeholder: \"Search..\", icon: true}, [\n            UI.Icon.render(UI.IconType.Search)\n          ])\n        ]}, {float: \"right\", main: [\n          UI.Textbox.render({placeholder: \"Navigate to..\", rightContent: true, action: true}, [\n            UI.Button.render(\"Go\")\n          ])\n        ]}\n      ])"
        });
        return [ex.DOM];
    }
    function createButtonExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Button",
            description: "A menu item can contain a button inside of it",
            VNode$: xstream_1.default.of(UI.Menu.render([
                { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] },
                { main: [UI.Button.render("Log-in")] }
            ])),
            code: "UI.Menu.render([\n        {main: [UI.Button.render({color: UI.Color.Primary}, \"Sign up\")]},\n        {main: [UI.Button.render(\"Log-in\")]}\n      ])"
        });
        return [ex.DOM];
    }
    function createLinkExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Link Item",
            description: "A menu may contain a link item, or an item formatted as if it is a link.",
            VNode$: xstream_1.default.of(UI.Menu.render({ vertical: true }, [
                { href: "#", main: "Visit google" },
                { link: true, main: "Javascript link" }
            ])),
            code: "UI.Menu.render({vertical: true}, [\n        {href: \"#\", main: \"Visit google\"},\n        {link: true, main: \"Javascript link\"}\n      ])"
        });
        return [ex.DOM];
    }
    function createDropdownExamples(sources) {
        // let ex = Example.run(sources, {
        //   header: "",
        //   description: "",
        //   VNode$: xs.of(),
        //   code: ``
        // });
        return [];
    }
    function createPopupExamples(sources) {
        // let ex = Example.run(sources, {
        //   header: "",
        //   description: "",
        //   VNode$: xs.of(),
        //   code: ``
        // });
        return [];
    }
    function createSearchExamples(sources) {
        // let ex = Example.run(sources, {
        //   header: "",
        //   description: "",
        //   VNode$: xs.of(),
        //   code: ``
        // });
        return [];
    }
    function createMenuExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Menu",
            description: "A menu may contain another menu group in the same level as menu items.",
            VNode$: xstream_1.default.of(UI.Menu.render([
                { main: "Browse" },
                { main: "Submit" },
                {
                    rightMenu: true, main: [
                        { main: "Sign Up" },
                        { main: "Help" }
                    ]
                }
            ])),
            code: "UI.Menu.render([\n        { main: \"Browse\" },\n        { main: \"Submit\" },\n        {\n          rightMenu: true, main: [\n            { main: \"Sign Up\" },\n            { main: \"Help\" }\n          ]\n        }\n      ])"
        });
        return [ex.DOM];
    }
    function createSubMenuExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Sub Menu",
            description: "A menu item may contain another menu nested inside that acts as a grouped sub-menu.",
            VNode$: xstream_1.default.of(UI.Menu.render({ vertical: true }, [
                {
                    main: [
                        UI.Textbox.render({ placeholder: "Search..." })
                    ]
                },
                {
                    main: [
                        "Home",
                        UI.Menu.render({ submenu: true }, [
                            { active: true, main: "Search" },
                            { main: "Add" },
                            { main: "Remove" }
                        ])
                    ]
                },
                { main: [UI.Icon.render(UI.IconType.GridLayout), "Browse"] },
                { main: "Messages" },
                { main: "More" }
            ])),
            code: "UI.Menu.render({ vertical: true }, [\n        {\n          main: [\n            UI.Textbox.render({ placeholder: \"Search...\" })\n          ]\n        },\n        {\n          main: [\n            \"Home\",\n            UI.Menu.render({submenu: true}, [\n              { active: true, main: \"Search\" },\n              { main: \"Add\" },\n              { main: \"Remove\" }\n            ])\n          ]\n        },\n        { main: [UI.Icon.render(UI.IconType.GridLayout), \"Browse\"] },\n        { main: \"Messages\" },\n        { main: \"More\" }\n      ])"
        });
        return [ex.DOM];
    }
})(Content = exports.Content || (exports.Content = {}));


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(171);
var content_1 = __webpack_require__(168);
var states_1 = __webpack_require__(170);
var variations_1 = __webpack_require__(172);
var Menu;
(function (Menu) {
    function run(sources) {
        var types = types_1.Types.run(sources);
        var content = content_1.Content.run(sources);
        var states = states_1.States.run(sources);
        var variations = variations_1.Variations.run(sources);
        var vTree$ = xstream_1.default.combine(types, content, states, variations).map(function (_a) {
            var types = _a[0], content = _a[1], states = _a[2], variations = _a[3];
            return dom_1.div({ props: { className: "article" } }, [
                UI.Segment.render({ vertical: true }, [
                    UI.Container.render([
                        UI.Header.render({
                            props: { size: UI.Size.Huge },
                            content: {
                                main: "Menu",
                                subtext: "A menu displays grouped navigation actions"
                            }
                        }),
                    ]),
                ]),
                UI.Container.render([
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Types")
                    ]
                        .concat(types)),
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Content")
                    ]
                        .concat(content)),
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "States")
                    ]
                        .concat(states)),
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Variations")
                    ]
                        .concat(variations)),
                ]),
            ]);
        });
        return {
            DOM: vTree$,
            router: xstream_1.default.never()
        };
    }
    Menu.run = run;
})(Menu = exports.Menu || (exports.Menu = {}));


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var States;
(function (States) {
    function run(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Hover",
            description: [
                dom_1.p("A menu item can be hovered"),
                UI.Message.render({ color: UI.Color.Warning }, "Menu items are only hoverable if they have the href or link property.")
            ],
            VNode$: xstream_1.default.of(UI.Menu.render({ compact: true }, [
                { href: "#", main: "A link" },
                { link: true, main: "div link" }
            ])),
            code: "UI.Menu.render({compact: true}, [\n        {href: \"#\", main: \"A link\"},\n        {link: true, main: \"div link\"}\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            header: "Active",
            description: "A menu item can be active",
            VNode$: xstream_1.default.of(UI.Menu.render({ compact: true }, [
                { active: true, main: "Link" }
            ])),
            code: "UI.Menu.render({compact: true}, [\n        {active: true, main: \"Link\"}\n      ])"
        });
        return xstream_1.default.combine(ex.DOM, ex2.DOM);
    }
    States.run = run;
})(States = exports.States || (exports.States = {}));


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var Types;
(function (Types) {
    function run(sources) {
        var basicEx = createBasicExamples(sources);
        var secondaryEx = createSecondaryExamples(sources);
        var pointingEx = createPointingExamples(sources);
        var tabularEx = createTabularExamples(sources);
        var textEx = createTextExamples(sources);
        var verticalEx = createVerticalExamples(sources);
        var paginationEx = createPaginationExamples(sources);
        var examples = [].concat(basicEx, secondaryEx, pointingEx, tabularEx, textEx, verticalEx, paginationEx);
        return xstream_1.default.combine.apply(null, examples);
    }
    Types.run = run;
    function createBasicExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Menu",
            description: "A menu",
            VNode$: xstream_1.default.of(UI.Menu.render({ equalWidth: true }, [
                { active: true, main: "Editorials" },
                { main: "Reviews" },
                { main: "Upcoming Events" }
            ])),
            code: "UI.Menu.render({equalWidth: true}, [\n        {active: true, main: \"Editorials\"},\n        {main: \"Reviews\"},\n        {main: \"Upcoming Events\"}\n      ])"
        });
        //Todo add popup example
        var ddlNavigation = UI.Dropdown.run({
            DOM: sources.DOM,
            props$: xstream_1.default.of({ static: "More" }),
            content$: xstream_1.default.of([
                { main: "Applications", value: "applications" },
                { main: "International Students", value: "international" },
                { main: "Scholarships", value: "scholarships" }
            ])
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.combine(ddlNavigation.DOM).map(function (_a) {
                var ddlNavigation = _a[0];
                return UI.Menu.render({ text: true }, [
                    { main: [UI.Image.render("https://placeholdit.imgix.net/~text?txtsize=33&txt=Logo&w=80&h=80")] },
                    { float: "right", main: [ddlNavigation] }
                ]);
            }),
            code: "let ddlNavigation = UI.Dropdown.run({\n      DOM: sources.DOM,\n      props$: xs.of({static: \"More\"}),\n      content$: xs.of([\n        { main: \"Applications\", value: \"applications\" },\n        { main: \"International Students\", value: \"international\" },\n        { main: \"Scholarships\", value: \"scholarships\" }\n      ])\n    });\n    let vTree$ = xs.combine(ddlNavigation.DOM).map(\n      ([ddlNavigation]) => UI.Menu.render({text: true}, [\n        {main: [UI.Image.render(\"\")]},\n        {float: \"right\", main: [ddlNavigation]}\n      ])\n    )"
        });
        //Todo dropdown menu's
        var ddlNavigation2 = UI.Dropdown.run({
            DOM: sources.DOM,
            props$: xstream_1.default.of({ simple: true, default: UI.Icon.render(UI.IconType.Wrench) }),
            content$: xstream_1.default.of([
                { main: "New...", value: "new" },
                { main: "Open...", value: "open" },
                { main: "Save...", value: "save" },
                { main: "Edit permissions...", value: "permissions" },
                { divider: true },
                { main: "Export", headerOnly: true },
                { main: "Share...", value: "" }
            ]),
            args: {
                static: true
            }
        });
        var ex3 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.combine(ddlNavigation2.DOM).map(function (_a) {
                var ddlNavigation = _a[0];
                return dom_1.div([
                    UI.Menu.render({ attachment: "top" }, [
                        { icon: true, dropdown: true, main: ddlNavigation },
                        {
                            float: "right", main: [UI.Textbox.render({ icon: true, transparent: true }, [
                                    UI.Icon.render(UI.IconType.Search)
                                ])]
                        }
                    ]),
                    UI.Segment.render({ attachment: UI.Attachment.Bottom })
                ]);
            }),
            code: "let ddlNavigation2 = UI.Dropdown.run({\n      DOM: sources.DOM,\n      props$: xs.of({ simple: true, default: [UI.Icon.render(UI.IconType.Wrench)] }),\n      content$: xs.of([\n        { main: \"New...\", value: \"new\" },\n        { main: \"Open...\", value: \"open\" },\n        { main: \"Save...\", value: \"save\" },\n        { main: \"Edit permissions...\", value: \"permissions\" },\n        { divider: true },\n        { main: \"Export\", headerOnly: true },\n        { main: \"Share...\", value: \"\" }\n      ]),\n      args: {\n        static: true\n      }\n    });\n    let vTree$ = xs.combine(ddlNavigation2.DOM).map(\n      ([ddlNavigation]) => div([\n        UI.Menu.render({ attachment: \"top\" }, [\n          { icon: true, dropdown: true, main: ddlNavigation },\n          {\n            float: \"right\", main: [UI.Textbox.render({ icon: true, transparent: true }, [\n              UI.Icon.render(UI.IconType.Search)\n            ])]\n          }\n        ]),\n        UI.Segment.render({ attachment: UI.Attachment.Bottom })\n      ])"
        });
        return [ex.DOM, ex2.DOM, ex3.DOM];
    }
    function createSecondaryExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Secondary Menu",
            description: "A menu can adjust its appearance to de-emphasize its contents",
            VNode$: xstream_1.default.of(UI.Menu.render({ secondary: true }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                { main: "Friends" },
                {
                    float: "right", main: [
                        UI.Textbox.render({ placeholder: "Search...", icon: true }, [
                            UI.Icon.render(UI.IconType.Search)
                        ])
                    ]
                },
                { float: "right", main: "Logout" }
            ])),
            code: "UI.Menu.render({ secondary: true }, [\n        { active: true, main: \"Home\" },\n        { main: \"Messages\" },\n        { main: \"Friends\" },\n        { float: \"right\", main: [\n          UI.Textbox.render({placeholder: \"Search...\", icon: true}, [\n            UI.Icon.render(UI.IconType.Search)\n          ])\n        ]},\n        { float: \"right\", main: \"Logout\"}\n      ])"
        });
        return [ex.DOM];
    }
    function createPointingExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Pointing",
            description: "A menu can point to show its relationship to nearby content",
            VNode$: xstream_1.default.of(dom_1.div([UI.Menu.render({ pointing: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" },
                    {
                        float: "right", main: [
                            UI.Textbox.render({ placeholder: "Search...", icon: true }, [
                                UI.Icon.render(UI.IconType.Search)
                            ])
                        ]
                    }
                ]),
                UI.Segment.render()
            ])),
            code: "UI.Menu.render({ pointing: true }, [\n        { active: true, main: \"Home\" },\n        { main: \"Messages\" },\n        { main: \"Friends\" },\n        {\n          float: \"right\", main: [\n            UI.Textbox.render({ placeholder: \"Search...\", icon: true }, [\n              UI.Icon.render(UI.IconType.Search)\n            ])\n          ]\n        }\n      ]),\n      UI.Segment.render()"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(dom_1.div([UI.Menu.render({ pointing: true, secondary: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" },
                    { float: "right", main: "Logout" }
                ]),
                UI.Segment.render()
            ])),
            code: "UI.Menu.render({ pointing: true, secondary: true }, [\n        { active: true, main: \"Home\" },\n        { main: \"Messages\" },\n        { main: \"Friends\" },\n        { float: \"right\", main: \"Logout\" }\n      ]),\n      UI.Segment.render()"
        });
        return [ex.DOM, ex2.DOM];
    }
    function createTabularExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Tabular",
            description: "A menu can be formatted to show tabs of information",
            VNode$: xstream_1.default.of(UI.Menu.render({ tabular: true }, [
                { main: "Bio", active: true },
                { main: "Photos" }
            ])),
            code: "UI.Menu.render({ tabular: true }, [\n        { main: \"Bio\", active: true },\n        { main: \"Photos\" }\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Menu.render({ tabular: true, attachment: "top" }, [
                    { main: "Bio", active: true },
                    { main: "Photos" }
                ]),
                UI.Segment.render({ attachment: UI.Attachment.Bottom })
            ])),
            code: "UI.Menu.render({ tabular: true, attachment: \"top\" }, [\n          { main: \"Bio\", active: true },\n          { main: \"Photos\" }\n        ]),\n        UI.Segment.render({attachment: UI.Attachment.Bottom})"
        });
        var ex3 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Segment.render({ attachment: UI.Attachment.Top }),
                UI.Menu.render({ tabular: true, attachment: "bottom" }, [
                    { main: "Active project", active: true },
                    { main: "Project #2" },
                    { main: "Project #3" },
                    { float: "right", main: [UI.Icon.render(UI.IconType.Plus), "New Tab"] }
                ]),
            ])),
            code: "UI.Segment.render({ attachment: UI.Attachment.Top }),\n        UI.Menu.render({ tabular: true, attachment: \"bottom\" }, [\n          { main: \"Active project\", active: true },\n          { main: \"Project #2\" },\n          { main: \"Project #3\" },\n          { float: \"right\", main: [UI.Icon.render(UI.IconType.Plus), \"New Tab\"]}\n        ])"
        });
        var ex4 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ width: 4 }, [
                    UI.Menu.render({ vertical: true, size: "fluid", tabular: true }, [
                        { main: "Bio", active: true },
                        { main: "Pics" },
                        { main: "Companies" },
                        { main: "Links" }
                    ])
                ]),
                UI.Column.render({ width: 12, stretched: true }, [
                    UI.Segment.render("This is an stretched grid column. This segment will always match the tab height")
                ])
            ])),
            code: "UI.Grid.render([\n        UI.Column.render({ width: 4 }, [\n          UI.Menu.render({ vertical: true, size: \"fluid\", tabular: true }, [\n            { main: \"Bio\", active: true },\n            { main: \"Pics\" },\n            { main: \"Companies\" },\n            { main: \"Links\" }\n          ])\n        ]),\n        UI.Column.render({width: 12, stretched: true}, [\n          UI.Segment.render(\"This is an stretched grid column. This segment will always match the tab height\")\n        ])\n      ])"
        });
        var ex5 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Grid.render([
                UI.Column.render({ width: 12, stretched: true }, [
                    UI.Segment.render("This is an stretched grid column. This segment will always match the tab height")
                ]),
                UI.Column.render({ width: 4 }, [
                    UI.Menu.render({ vertical: true, size: "fluid", tabular: true, right: true }, [
                        { main: "Bio", active: true },
                        { main: "Pics" },
                        { main: "Companies" },
                        { main: "Links" }
                    ])
                ])
            ])),
            code: "UI.Grid.render([\n        UI.Column.render({width: 12, stretched: true}, [\n          UI.Segment.render(\"This is an stretched grid column. This segment will always match the tab height\")\n        ]),\n        UI.Column.render({ width: 4 }, [\n          UI.Menu.render({ vertical: true, size: \"fluid\", tabular: true, right: true }, [\n            { main: \"Bio\", active: true },\n            { main: \"Pics\" },\n            { main: \"Companies\" },\n            { main: \"Links\" }\n          ])\n        ])\n      ])"
        });
        return [ex.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM];
    }
    function createTextExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Text",
            description: "A menu can be formatted for text content",
            VNode$: xstream_1.default.of(UI.Menu.render({ text: true }, [
                { header: true, main: "Sort by" },
                { active: true, main: "Closest" },
                { main: "Most Comments" },
                { main: "Most Popular" }
            ])),
            code: "UI.Menu.render({ text: true }, [\n        { header: true, main: \"Editorials\" },\n        { active: true, main: \"Closest\" },\n        { main: \"Most Comments\" },\n        { main: \"Most Popular\"}\n      ])"
        });
        return [ex.DOM];
    }
    function createVerticalExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Vertical Menu",
            description: "A vertical menu displays elements vertically.",
            VNode$: xstream_1.default.of(UI.Menu.render({ vertical: true }, [
                {
                    active: true, color: "primary", main: [
                        "Inbox", UI.Label.render({ leftPointing: true, color: UI.Color.Primary }, "1")
                    ]
                }, {
                    main: [
                        "Spam", UI.Label.render("51")
                    ]
                }, {
                    main: [
                        "Updates", UI.Label.render("1")
                    ]
                }, {
                    main: [
                        UI.Textbox.render({ transparent: true, icon: true, placeholder: "Search mail..." }, [
                            UI.Icon.render(UI.IconType.Search)
                        ])
                    ]
                }
            ])),
            code: "UI.Menu.render({ vertical: true }, [\n        {\n          active: true, color: \"primary\", main: [\n            \"Inbox\", UI.Label.render({ leftPointing: true, color: UI.Color.Primary }, \"1\")\n          ]\n        }, {\n          main: [\n            \"Spam\", UI.Label.render(\"51\")\n          ]\n        },{\n          main: [\n            \"Updates\", UI.Label.render(\"1\")\n          ]\n        }, {\n          main: [\n            UI.Textbox.render({transparent: true, icon: true, placeholder: \"Search mail...\"}, [\n              UI.Icon.render(UI.IconType.Search)\n            ])\n          ]\n        }\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ secondary: true, vertical: true }, [
                { active: true, main: "Account" },
                { main: "Settings" },
                { main: "Display Options" },
            ])),
            code: "UI.Menu.render({ secondary: true, vertical: true }, [\n        { active: true, main: \"Account\" },\n        { main: \"Settings\" },\n        { main: \"Display Options\" },\n      ])"
        });
        var ex3 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ vertical: true, text: true }, [
                { header: true, main: "Sort by" },
                { active: true, main: "Closest" },
                { main: "Most Comments" },
                { main: "Most Popular" }
            ])),
            code: "UI.Menu.render({ vertical: true, text: true }, [\n        { header: true, main: \"Editorials\" },\n        { active: true, main: \"Closest\" },\n        { main: \"Most Comments\" },\n        { main: \"Most Popular\"}\n      ])"
        });
        var ex4 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ vertical: true, pointing: true }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                { main: "Friends" },
            ])),
            code: "UI.Menu.render({ vertical: true, pointing: true }, [\n        { active: true, main: \"Home\" },\n        { main: \"Messages\" },\n        { main: \"Friends\" },\n      ])"
        });
        var ex5 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ secondary: true, vertical: true, pointing: true }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                { main: "Friends" },
            ])),
            code: "UI.Menu.render({ secondary: true, vertical: true, pointing: true }, [\n        { active: true, main: \"Home\" },\n        { main: \"Messages\" },\n        { main: \"Friends\" },\n      ])"
        });
        return [ex.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM];
    }
    function createPaginationExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Pagination",
            description: "A pagination menu is specially formatted to present links to pages of content",
            VNode$: xstream_1.default.of(UI.Menu.render({ pagination: true }, [
                { active: true, main: "1" },
                { disabled: true, main: "..." },
                { main: "10" },
                { main: "11" },
                { main: "12" }
            ])),
            code: "UI.Menu.render({ pagination: true }, [\n        { active: true, main: \"1\" },\n        { disabled: true, main: \"...\" },\n        { main: \"10\" },\n        { main: \"11\" },\n        { main: \"12\" }\n      ])"
        });
        return [ex.DOM];
    }
})(Types = exports.Types || (exports.Types = {}));


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var Variations;
(function (Variations) {
    function run(sources) {
        var stackableEx = createStackableExamples(sources);
        var invertedEx = createInvertedExamples(sources);
        var coloredEx = createColoredExamples(sources);
        var iconsEx = createIconsExamples(sources);
        var labelledIconsEx = createLabeledIconsExamples(sources);
        var fluidEx = createFluidExamples(sources);
        var compactEx = createCompactExamples(sources);
        var equalWidthEx = createEqualWidthExamples(sources);
        var pointingEx = createPointingExamples(sources);
        var attachedEx = createAttachedExamples(sources);
        var sizeEx = createSizeExamples(sources);
        var fittedEx = createFittedExamples(sources);
        var borderlessEx = createBorderlessExamples(sources);
        var examples = [].concat(stackableEx, invertedEx, coloredEx, iconsEx, labelledIconsEx, fluidEx, compactEx, equalWidthEx, pointingEx, attachedEx, sizeEx, fittedEx, borderlessEx);
        return xstream_1.default.combine.apply(null, examples);
    }
    Variations.run = run;
    function createStackableExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Stackable",
            description: [
                dom_1.p("A menu can stack at mobile resolutions"),
                UI.Message.render({ color: UI.Color.Info }, "Stackable menus are intended to be used with only simple menu content. Stacked menus will not replicate all additional stylings for vertical menus like adjusting dropdown position.")
            ],
            VNode$: xstream_1.default.of(UI.Menu.render([
                { main: "Features" },
                { main: "Testimonials" },
                { main: "Sign-in" }
            ])),
            code: "UI.Menu.render([\n        {main: \"Features\"},\n        {main: \"Testimonials\"},\n        {main: \"Sign-in\"}\n      ])"
        });
        return [ex.DOM];
    }
    function createInvertedExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Inverted",
            description: "A menu may have its colors inverted to show greater contrast",
            VNode$: xstream_1.default.of(UI.Menu.render({ inverted: true }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                { main: "Friends" }
            ])),
            code: "UI.Menu.render({inverted: true}, [\n        {active: true, main: \"Home\"},\n        {main: \"Messages\"},\n        {main: \"Friends\"}\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ inverted: true, vertical: true }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                { main: "Friends" }
            ])),
            code: "UI.Menu.render({inverted: true, vertical: true}, [\n        {active: true, main: \"Home\"},\n        {main: \"Messages\"},\n        {main: \"Friends\"}\n      ])"
        });
        var ex3 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ inverted: true, pointing: true, vertical: true }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                { main: "Friends" }
            ])),
            code: "UI.Menu.render({inverted: true, pointing: true, vertical: true}, [\n        {active: true, main: \"Home\"},\n        {main: \"Messages\"},\n        {main: \"Friends\"}\n      ])"
        });
        var ex4 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Segment.render({ inverted: true }, [
                UI.Menu.render({ inverted: true, secondary: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ])
            ])),
            code: "UI.Segment.render({ inverted: true }, [\n        UI.Menu.render({ inverted: true, secondary: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ])\n      ])"
        });
        var ex5 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Segment.render({ inverted: true }, [
                UI.Menu.render({ inverted: true, secondary: true, pointing: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ])
            ])),
            code: "UI.Segment.render({ inverted: true }, [\n        UI.Menu.render({ inverted: true, secondary: true, pointing: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ])\n      ])"
        });
        return [ex.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM];
    }
    function createColoredExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Colored",
            description: "Additional colors can be specified",
            VNode$: xstream_1.default.of(UI.Menu.render([
                { active: true, color: "primary", main: "Primary" },
                { color: "secondary", main: "Secondary" },
                { color: "success", main: "Success" },
                { color: "info", main: "Info" },
                { color: "warning", main: "Warning" },
                { color: "error", main: "Error" }
            ])),
            code: "UI.Menu.render([\n        {active: true, color: \"primary\", main: \"Primary\"},\n        {color: \"secondary\", main: \"Secondary\"},\n        {color: \"success\", main: \"Success\"},\n        {color: \"info\", main: \"Info\"},\n        {color: \"warning\", main: \"Warning\"},\n        {color: \"error\", main: \"Error\"}\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Menu.render({ color: "primary", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ]),
                UI.Menu.render({ color: "secondary", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ]),
                UI.Menu.render({ color: "success", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ]),
                UI.Menu.render({ color: "info", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ]),
                UI.Menu.render({ color: "warning", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ]),
                UI.Menu.render({ color: "error", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ])
            ])),
            code: "UI.Menu.render({ color: \"primary\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ]),\n        UI.Menu.render({ color: \"secondary\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ]),\n        UI.Menu.render({ color: \"success\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ]),\n        UI.Menu.render({ color: \"info\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ]),\n        UI.Menu.render({ color: \"warning\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ]),\n        UI.Menu.render({ color: \"error\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ])"
        });
        var ex3 = components_1.Example.run(sources, {
            description: "These colors can also be inverted",
            VNode$: xstream_1.default.of(UI.Menu.render({ inverted: true }, [
                { active: true, color: "primary", main: "Primary" },
                { color: "secondary", main: "Secondary" },
                { color: "success", main: "Success" },
                { color: "info", main: "Info" },
                { color: "warning", main: "Warning" },
                { color: "error", main: "Error" }
            ])),
            code: "UI.Menu.render({inverted: true}, [\n        { active: true, color: \"primary\", main: \"Primary\" },\n        { color: \"secondary\", main: \"Secondary\" },\n        { color: \"success\", main: \"Success\" },\n        { color: \"info\", main: \"Info\" },\n        { color: \"warning\", main: \"Warning\" },\n        { color: \"error\", main: \"Error\" }\n      ])"
        });
        var ex4 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Menu.render({ inverted: true, color: "primary", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ]),
                UI.Menu.render({ inverted: true, color: "secondary", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ]),
                UI.Menu.render({ inverted: true, color: "success", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ]),
                UI.Menu.render({ inverted: true, color: "info", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ]),
                UI.Menu.render({ inverted: true, color: "warning", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ]),
                UI.Menu.render({ inverted: true, color: "error", equalWidth: true }, [
                    { active: true, main: "Home" },
                    { main: "Messages" },
                    { main: "Friends" }
                ])
            ])),
            code: "        UI.Menu.render({ inverted: true, color: \"primary\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ]),\n        UI.Menu.render({ inverted: true, color: \"secondary\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ]),\n        UI.Menu.render({ inverted: true, color: \"success\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ]),\n        UI.Menu.render({ inverted: true, color: \"info\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ]),\n        UI.Menu.render({ inverted: true, color: \"warning\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ]),\n        UI.Menu.render({ inverted: true, color: \"error\", equalWidth: true }, [\n          { active: true, main: \"Home\" },\n          { main: \"Messages\" },\n          { main: \"Friends\" }\n        ])"
        });
        return [ex.DOM, ex2.DOM, ex3.DOM, ex4.DOM];
    }
    function createIconsExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Icons",
            description: "A menu may have just icons",
            VNode$: xstream_1.default.of(UI.Menu.render({ icon: true }, [
                { main: [UI.Icon.render(UI.IconType.Gamepad)] },
                { main: [UI.Icon.render(UI.IconType.VideoCamera)] },
                { main: [UI.Icon.render(UI.IconType.Play)] }
            ])),
            code: "UI.Menu.render({icon: true}, [\n        {main: [UI.Icon.render(UI.IconType.Gamepad)]},\n        {main: [UI.Icon.render(UI.IconType.VideoCamera)]},\n        {main: [UI.Icon.render(UI.IconType.Play)]}\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ icon: true, vertical: true }, [
                { main: [UI.Icon.render(UI.IconType.Gamepad)] },
                { main: [UI.Icon.render(UI.IconType.VideoCamera)] },
                { main: [UI.Icon.render(UI.IconType.Play)] }
            ])),
            code: "UI.Menu.render({ icon: true, vertical: true }, [\n        { main: [UI.Icon.render(UI.IconType.Gamepad)] },\n        { main: [UI.Icon.render(UI.IconType.VideoCamera)] },\n        { main: [UI.Icon.render(UI.IconType.Play)] }\n      ])"
        });
        return [ex.DOM, ex2.DOM];
    }
    function createLabeledIconsExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Labeled Icon",
            description: "A menu may have labeled icons",
            VNode$: xstream_1.default.of(UI.Menu.render({ labeledIcons: true }, [
                { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
                { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
                { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
            ])),
            code: "UI.Menu.render({labeledIcons: true}, [\n        { main: [UI.Icon.render(UI.IconType.Gamepad), \"Games\"] },\n        { main: [UI.Icon.render(UI.IconType.VideoCamera), \"Channels\"] },\n        { main: [UI.Icon.render(UI.IconType.Play), \"Videos\"] }\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ labeledIcons: true, vertical: true }, [
                { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
                { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
                { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
            ])),
            code: "UI.Menu.render({ labeledIcons: true, vertical: true }, [\n        { main: [UI.Icon.render(UI.IconType.Gamepad), \"Games\"] },\n        { main: [UI.Icon.render(UI.IconType.VideoCamera), \"Channels\"] },\n        { main: [UI.Icon.render(UI.IconType.Play), \"Videos\"] }\n      ])"
        });
        return [ex.DOM, ex2.DOM];
    }
    function createFluidExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Fluid",
            description: "A vertical menu may take the size of its container.",
            VNode$: xstream_1.default.of(UI.Menu.render({ fluid: true }, [
                { main: "Run" },
                { main: "Walk" },
                { main: "Bike" }
            ])),
            code: "UI.Menu.render({fluid: true}, [\n        {main: \"Run\"},\n        {main: \"Walk\"},\n        {main: \"Bike\"}\n      ])"
        });
        return [ex.DOM];
    }
    function createCompactExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Compact",
            description: "A menu can take up only the space necessary to fit its content",
            VNode$: xstream_1.default.of(UI.Menu.render({ labeledIcons: true, compact: true }, [
                { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
                { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
                { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
            ])),
            code: "UI.Menu.render({labeledIcons: true, compact: true}, [\n        { main: [UI.Icon.render(UI.IconType.Gamepad), \"Games\"] },\n        { main: [UI.Icon.render(UI.IconType.VideoCamera), \"Channels\"] },\n        { main: [UI.Icon.render(UI.IconType.Play), \"Videos\"] }\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ labeledIcons: true, compact: true, vertical: true }, [
                { main: [UI.Icon.render(UI.IconType.Gamepad), "Games"] },
                { main: [UI.Icon.render(UI.IconType.VideoCamera), "Channels"] },
                { main: [UI.Icon.render(UI.IconType.Play), "Videos"] }
            ])),
            code: "UI.Menu.render({labeledIcons: true, compact: true, vertical: true}, [\n        { main: [UI.Icon.render(UI.IconType.Gamepad), \"Games\"] },\n        { main: [UI.Icon.render(UI.IconType.VideoCamera), \"Channels\"] },\n        { main: [UI.Icon.render(UI.IconType.Play), \"Videos\"] }\n      ])"
        });
        return [ex.DOM, ex2.DOM];
    }
    function createEqualWidthExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Equal Width",
            description: "A menu may divide its items evenly",
            VNode$: xstream_1.default.of(UI.Menu.render({ equalWidth: true }, [
                { main: "Buy" },
                { main: "Sell" },
                { main: "Rent" }
            ])),
            code: "UI.Menu.render({equalWidth: true}, [\n        {main: \"Buy\"},\n        {main: \"Sell\"},\n        {main: \"Rent\"}\n      ])"
        });
        return [ex.DOM];
    }
    function createPointingExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Pointing",
            description: "A vertical menu can point to content adjacent to itself to show ownership",
            VNode$: xstream_1.default.of(UI.Menu.render({ vertical: true, pointing: true }, [
                { main: "Site Title" },
                {
                    header: true, main: ["Grouped Section", UI.Menu.render({ submenu: true }, [
                            { main: "Subsection 1" },
                            { main: "Subsection 2", active: true },
                            { main: "Subsection 3" }
                        ])]
                }
            ])),
            code: "UI.Menu.render({ vertical: true, pointing: true }, [\n        { main: \"Site Title\" },\n        {\n          header: true, main: [\"Grouped Section\", UI.Menu.render({ submenu: true }, [\n            { main: \"Subsection 1\" },\n            { main: \"Subsection 2\", active: true },\n            { main: \"Subsection 3\" }\n          ])]\n        }\n      ])"
        });
        return [ex.DOM];
    }
    function createAttachedExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Attached",
            description: "A menu may be attached to other content segments",
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Menu.render({ attachment: "top", tabular: true }, [
                    { active: true, main: "Tab 1" },
                    { main: "Tab 2" }
                ]),
                UI.Segment.render({ attachment: UI.Attachment.Bottom }, [
                    dom_1.p("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.")
                ])
            ])),
            code: "UI.Menu.render({ attachment: \"top\", tabular: true }, [\n          { active: true, main: \"Tab 1\" },\n          { main: \"Tab 2\" }\n        ]),\n        UI.Segment.render({ attachment: UI.Attachment.Bottom })"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Menu.render({ attachment: "top" }, [
                    { active: true, main: "Section 1" },
                    { main: "Section 2" }
                ]),
                UI.Segment.render({ attachment: UI.Attachment.None }, [
                    dom_1.p("There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.")
                ]),
                UI.Menu.render({ attachment: "bottom" }, [
                    { active: true, main: "Section 1" },
                    { main: "Section 2" }
                ])
            ])),
            code: "UI.Menu.render({ attachment: \"top\" }, [\n          { active: true, main: \"Section 1\" },\n          { main: \"Section 2\" }\n        ]),\n        UI.Segment.render({ attachment: UI.Attachment.None }),\n        UI.Menu.render({ attachment: \"bottom\" }, [\n          { active: true, main: \"Section 1\" },\n          { main: \"Section 2\" }\n        ])"
        });
        return [ex.DOM, ex2.DOM];
    }
    function createSizeExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Size",
            description: "A menu can vary in size",
            VNode$: xstream_1.default.of(UI.Menu.render({ size: "mini" }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                {
                    rightMenu: true, main: [
                        { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
                    ]
                }
            ])),
            code: "UI.Menu.render({size: \"mini\"}, [\n        {active: true, main: \"Home\"},\n        {main: \"Messages\"},\n        {rightMenu: true, main: [\n          {main: [UI.Button.render({color: UI.Color.Primary}, \"Sign up\")]}\n        ]}\n      ])"
        });
        var ex2 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ size: "tiny" }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                {
                    rightMenu: true, main: [
                        { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
                    ]
                }
            ])),
            code: "UI.Menu.render({size: \"tiny\"}, [\n        {active: true, main: \"Home\"},\n        {main: \"Messages\"},\n        {rightMenu: true, main: [\n          {main: [UI.Button.render({color: UI.Color.Primary}, \"Sign up\")]}\n        ]}\n      ])"
        });
        var ex3 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ size: "small" }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                {
                    rightMenu: true, main: [
                        { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
                    ]
                }
            ])),
            code: "UI.Menu.render({size: \"small\"}, [\n        {active: true, main: \"Home\"},\n        {main: \"Messages\"},\n        {rightMenu: true, main: [\n          {main: [UI.Button.render({color: UI.Color.Primary}, \"Sign up\")]}\n        ]}\n      ])"
        });
        var ex4 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ size: "medium" }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                {
                    rightMenu: true, main: [
                        { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
                    ]
                }
            ])),
            code: "UI.Menu.render({size: \"medium\"}, [\n        {active: true, main: \"Home\"},\n        {main: \"Messages\"},\n        {rightMenu: true, main: [\n          {main: [UI.Button.render({color: UI.Color.Primary}, \"Sign up\")]}\n        ]}\n      ])"
        });
        var ex5 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ size: "large" }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                {
                    rightMenu: true, main: [
                        { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
                    ]
                }
            ])),
            code: "UI.Menu.render({size: \"large\"}, [\n        {active: true, main: \"Home\"},\n        {main: \"Messages\"},\n        {rightMenu: true, main: [\n          {main: [UI.Button.render({color: UI.Color.Primary}, \"Sign up\")]}\n        ]}\n      ])"
        });
        var ex7 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ size: "huge" }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                {
                    rightMenu: true, main: [
                        { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
                    ]
                }
            ])),
            code: "UI.Menu.render({size: \"huge\"}, [\n        {active: true, main: \"Home\"},\n        {main: \"Messages\"},\n        {rightMenu: true, main: [\n          {main: [UI.Button.render({color: UI.Color.Primary}, \"Sign up\")]}\n        ]}\n      ])"
        });
        var ex8 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Menu.render({ size: "massive" }, [
                { active: true, main: "Home" },
                { main: "Messages" },
                {
                    rightMenu: true, main: [
                        { main: [UI.Button.render({ color: UI.Color.Primary }, "Sign up")] }
                    ]
                }
            ])),
            code: "UI.Menu.render({size: \"massive\"}, [\n        {active: true, main: \"Home\"},\n        {main: \"Messages\"},\n        {rightMenu: true, main: [\n          {main: [UI.Button.render({color: UI.Color.Primary}, \"Sign up\")]}\n        ]}\n      ])"
        });
        return [ex.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM, ex7.DOM, ex8.DOM];
    }
    function createFittedExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Fitted",
            description: "A menu item or menu can remove element padding, vertically or horizontally",
            VNode$: xstream_1.default.of(UI.Menu.render([
                { fitted: true, main: "No padding whatsoever" },
                { horizontallyFitted: true, main: "No horizontal padding" },
                { verticallyFitted: true, main: "No vertical padding" }
            ])),
            code: "UI.Menu.render([\n        {fitted: true, main: \"No padding whatsoever\"},\n        {horizontallyFitted: true, main: \"No horizontal padding\"},\n        {verticallyFitted: true, main: \"No vertical padding\"}\n      ])"
        });
        return [ex.DOM];
    }
    function createBorderlessExamples(sources) {
        var ex = components_1.Example.run(sources, {
            header: "Borderless",
            description: "A menu or menu item can have no borders",
            VNode$: xstream_1.default.of(UI.Menu.render({ borderless: true }, [
                { main: "1" },
                { main: "2" },
                { main: "3" },
                { main: "4" },
                { main: "5" },
                { main: "6" }
            ])),
            code: "UI.Menu.render({borderless: true}, [\n        {main: \"1\"},\n        {main: \"2\"},\n        {main: \"3\"},\n        {main: \"4\"},\n        {main: \"5\"},\n        {main: \"6\"}\n      ])"
        });
        return [ex.DOM];
    }
})(Variations = exports.Variations || (exports.Variations = {}));


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(175);
var states_1 = __webpack_require__(174);
var variations_1 = __webpack_require__(176);
var Message;
(function (Message) {
    function run(sources) {
        var types = types_1.Types.run(sources);
        var states = states_1.States.run(sources);
        var variations = variations_1.Variations.run(sources);
        var vTree$ = xstream_1.default.combine(types, states, variations).map(function (_a) {
            var types = _a[0], states = _a[1], variations = _a[2];
            return dom_1.div({ props: { className: "article" } }, [
                UI.Segment.render({ vertical: true }, [
                    UI.Container.render([
                        UI.Header.render({
                            props: { size: UI.Size.Huge },
                            content: {
                                main: "Message",
                                subtext: "A message displays information that explains nearby content"
                            }
                        }),
                    ]),
                ]),
                UI.Container.render([
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Types")
                    ]
                        .concat(types)),
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "States")
                    ]
                        .concat(states)),
                    UI.Segment.render({ basic: true }, [
                        UI.Header.render({ dividing: true, size: UI.Size.Huge }, "Variations")
                    ]
                        .concat(variations))
                ]),
            ]);
        });
        return {
            DOM: vTree$,
            router: xstream_1.default.never()
        };
    }
    Message.run = run;
})(Message = exports.Message || (exports.Message = {}));


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var components_1 = __webpack_require__(7);
var States;
(function (States) {
    function run(sources) {
        var ex1 = components_1.Example.run(sources, {
            header: "Hidden",
            description: "A message can be hidden",
            VNode$: xstream_1.default.of(UI.Message.render({ hidden: true }, "You can't see me!")),
            code: "UI.Message.render({hidden: true}, \"You can't see me!\")"
        });
        var ex2 = components_1.Example.run(sources, {
            header: "Visible",
            description: "A message can be set to visible to force itself to be shown.",
            VNode$: xstream_1.default.of(UI.Message.render({ forceVisible: true }, "You can always see me.")),
            code: "UI.Message.render({forceVisible: true}, \"You can always see me.\")"
        });
        return xstream_1.default.combine(ex1.DOM, ex2.DOM);
    }
    States.run = run;
})(States = exports.States || (exports.States = {}));


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var components_1 = __webpack_require__(7);
var Types;
(function (Types) {
    function run(sources) {
        var ex1 = components_1.Example.run(sources, {
            header: "Message",
            description: "A basic message",
            VNode$: xstream_1.default.of(UI.Message.render({
                content: {
                    header: "Changes in Service",
                    main: "We just updated our privacy policy here to better service our customers. We recommend reviewing the changes."
                }
            })),
            code: "UI.Message.render({\n        content: {\n          header: \"Changes in Service\",\n          main: \"We just updated our privacy policy here to better service our customers. We recommend reviewing the changes.\"\n        }\n      })"
        });
        var ex2 = components_1.Example.run(sources, {
            header: "List message",
            description: "A message with a list",
            VNode$: xstream_1.default.of(UI.Message.render({
                content: {
                    header: "New Site Features",
                    main: [
                        UI.List.render({ bulleted: true }, [
                            { main: "You can now have cover images on blog pages" },
                            { main: "Drafts will now auto-save while writing" }
                        ])
                    ]
                }
            })),
            code: "UI.Message.render({\n        content: {\n          header: \"New Site Features\",\n          main: [\n            UI.List.render({bulleted: true}, [\n              {main: \"You can now have cover images on blog pages\"},\n              {main: \"Drafts will now auto-save while writing\"}\n            ])\n          ]\n        }\n      })"
        });
        var ex3 = components_1.Example.run(sources, {
            header: ["Icon Message", UI.Label.render({ color: "primary" }, "flexbox")],
            description: "A message can contain an icon.",
            VNode$: xstream_1.default.of(UI.Message.render({
                content: {
                    icon: [UI.Icon.render("inbox")],
                    header: "Have you heard about our mailing list?",
                    main: "Get the best news in your e-mail every day."
                }
            })),
            code: "UI.Message.render({\n        content: {\n          icon: [UI.Icon.render(\"inbox\")],\n          header: \"Have you heard about our mailing list?\",\n          main: \"Get the best news in your e-mail every day.\"\n        }\n      })"
        });
        var ex4 = components_1.Example.run(sources, {
            VNode$: xstream_1.default.of(UI.Message.render({
                content: {
                    icon: [UI.Icon.render({ loading: true }, "notched circle")],
                    header: "Just one second",
                    main: "We're fetching that content for you."
                }
            })),
            code: "UI.Message.render({\n        content: {\n          icon: [UI.Icon.render({loading: true}, \"notched circle\")],\n          header: \"Just one second\",\n          main: \"We're fetching that content for you.\"\n        }\n      })"
        });
        var msg = UI.Message.run({
            DOM: sources.DOM,
            content$: xstream_1.default.of({
                header: "Welcome back!",
                main: "This is a special notification which you can dismiss if you're bored with it."
            }), args: {
                closeable: true
            }
        });
        var ex5 = components_1.Example.run(sources, {
            header: "Dismissable Block",
            description: "A message that the user can choose to hide",
            VNode$: msg.DOM,
            code: "let msg = UI.Message.run({\n        DOM: sources.DOM,\n        content$: xs.of({\n          header: \"Welcome back!\",\n          main: \"This is a special notification which you can dismiss if you're bored with it.\"\n        }), args: {\n          closeable: true\n        }\n      });"
        });
        return xstream_1.default.combine(ex1.DOM, ex2.DOM, ex3.DOM, ex4.DOM, ex5.DOM);
    }
    Types.run = run;
})(Types = exports.Types || (exports.Types = {}));


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var components_1 = __webpack_require__(7);
var Variations;
(function (Variations) {
    function run(sources) {
        var floatingEx = makeFloatingExamples(sources);
        var compactEx = makeCompactExamples(sources);
        var attachedEx = makeAttachedExamples(sources);
        var coloredEx = makeColoredExamples(sources);
        var sizeEx = makeSizeExamples(sources);
        var examples = [].concat(floatingEx, compactEx, attachedEx, coloredEx, sizeEx);
        return xstream_1.default.combine.apply(null, examples);
    }
    Variations.run = run;
    function makeFloatingExamples(sources) {
        var ex1 = components_1.Example.run(sources, {
            header: "Floating",
            description: "A message can float above content that it is related to",
            VNode$: xstream_1.default.of(UI.Message.render({ floating: true }, "Way to go!")),
            code: "UI.Message.render({floating: true}, \"Way to go!\")"
        });
        return [ex1.DOM];
    }
    function makeCompactExamples(sources) {
        var ex1 = components_1.Example.run(sources, {
            header: "Compact",
            description: "A message can only take up the width of its content.",
            VNode$: xstream_1.default.of(UI.Message.render({ compact: true }, "Get all the best inventions in your e-mail every day. Sign up now!")),
            code: "UI.Message.render({hidden: true}, \"Get all the best inventions in your e-mail every day. Sign up now!\")"
        });
        return [ex1.DOM];
    }
    function makeAttachedExamples(sources) {
        var ex1 = components_1.Example.run(sources, {
            header: "Attached",
            description: "A message can be formatted to attach itself to other content",
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Message.render({
                    props: { attachment: "top" },
                    content: {
                        header: "Welcome to our site!",
                        main: "Fill out the form below to sign-up for a new account"
                    }
                }),
                UI.Segment.render({ attachment: "none" }, [
                    UI.Form.render([
                        UI.Fields.render({ equalWidth: true }, [
                            UI.Field.render({
                                content: {
                                    label: "First Name",
                                    main: UI.Textbox.render({ placeholder: "First Name" })
                                }
                            }),
                            UI.Field.render({
                                content: {
                                    label: "Last Name",
                                    main: UI.Textbox.render({ placeholder: "Last Name" })
                                }
                            })
                        ]),
                        UI.Field.render({
                            content: {
                                label: "Username",
                                main: UI.Textbox.render({ placeholder: "Username" })
                            }
                        }),
                        UI.Field.render({
                            content: {
                                label: "Password",
                                main: UI.Textbox.render({ type: "password" })
                            }
                        }),
                        UI.Field.render({ inline: true }, [UI.Checkbox.render("I agree to the terms and conditions.")]),
                        UI.Button.render({ color: "primary" }, "Submit")
                    ])
                ]),
                UI.Message.render({
                    props: { attachment: "bottom", color: "warning" },
                    content: {
                        icon: [UI.Icon.render("help")],
                        main: ["Already signed up? ", dom_1.a({ attrs: { href: "#" } }, "Login here"), " instead"]
                    }
                })
            ])),
            code: "UI.Message.render({\n          props: { attachment: \"top\" },\n          content: {\n            header: \"Welcome to our site!\",\n            main: \"Fill out the form below to sign-up for a new account\"\n          }\n        }),\n        UI.Segment.render({ attachment: \"none\" }, [\n          UI.Form.render([\n            UI.Fields.render({ equalWidth: true }, [\n              UI.Field.render({\n                content: {\n                  label: \"First Name\",\n                  main: UI.Textbox.render({ placeholder: \"First Name\" })\n                }\n              }),\n              UI.Field.render({\n                content: {\n                  label: \"Last Name\",\n                  main: UI.Textbox.render({ placeholder: \"Last Name\" })\n                }\n              })\n            ]),\n            UI.Field.render({\n              content: {\n                label: \"Username\",\n                main: UI.Textbox.render({ placeholder: \"Username\" })\n              }\n            }),\n            UI.Field.render({\n              content: {\n                label: \"Password\",\n                main: UI.Textbox.render({ type: \"password\" })\n              }\n            }),\n            UI.Field.render({inline: true}, [UI.Checkbox.render(\"I agree to the terms and conditions.\")]),\n            UI.Button.render({color: \"primary\"}, \"Submit\")\n          ])\n        ]),\n        UI.Message.render({\n          props : {attachment: \"bottom\", color: \"warning\"},\n          content: {\n            icon: [UI.Icon.render(\"help\")],\n            main: [\"Already signed up?\", a({attrs: {href: \"#\"}}, \"Login here\"), \" instead\"]\n          }\n        })\n      ])"
        });
        return [ex1.DOM];
    }
    function makeColoredExamples(sources) {
        var ex1 = components_1.Example.run(sources, {
            header: "Colored",
            description: "A message can be formatted to be different colors",
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Message.render({ color: "primary" }, "Primary"),
                UI.Message.render({ color: "secondary" }, "Secondary"),
                UI.Message.render({ color: "success" }, "Success"),
                UI.Message.render({ color: "info" }, "Info"),
                UI.Message.render({ color: "warning" }, "Warning"),
                UI.Message.render({ color: "error" }, "Error")
            ])),
            code: "\n        UI.Message.render({ color: \"primary\" }, \"Primary\"),\n        UI.Message.render({ color: \"secondary\" }, \"Secondary\"),\n        UI.Message.render({ color: \"success\" }, \"Success\"),\n        UI.Message.render({ color: \"info\" }, \"Info\"),\n        UI.Message.render({ color: \"warning\" }, \"Warning\"),\n        UI.Message.render({ color: \"error\" }, \"Error\")"
        });
        return [ex1.DOM];
    }
    function makeSizeExamples(sources) {
        var ex1 = components_1.Example.run(sources, {
            header: "Size",
            description: "A message can have different sizes",
            VNode$: xstream_1.default.of(dom_1.div([
                UI.Message.render({ size: "mini" }, "This is a mini message"),
                UI.Message.render({ size: "tiny" }, "This is a tiny message"),
                UI.Message.render({ size: "small" }, "This is a small message"),
                UI.Message.render({ size: "medium" }, "This is a medium message"),
                UI.Message.render({ size: "large" }, "This is a large message"),
                UI.Message.render({ size: "big" }, "This is a big message"),
                UI.Message.render({ size: "huge" }, "This is a huge message"),
                UI.Message.render({ size: "massive" }, "This is a massive message")
            ])),
            code: "\n        UI.Message.render({ size: \"mini\" }, \"This is a mini message\"),\n        UI.Message.render({ size: \"tiny\" }, \"This is a tiny message\"),\n        UI.Message.render({ size: \"small\" }, \"This is a small message\"),\n        UI.Message.render({ size: \"medium\" }, \"This is a medium message\"),\n        UI.Message.render({ size: \"large\" }, \"This is a large message\"),\n        UI.Message.render({ size: \"big\" }, \"This is a big message\"),\n        UI.Message.render({ size: \"huge\" }, \"This is a huge message\"),\n        UI.Message.render({ size: \"massive\" }, \"This is a massive message\")"
        });
        return [ex1.DOM];
    }
})(Variations = exports.Variations || (exports.Variations = {}));


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var isolate_1 = __webpack_require__(8);
var Example;
(function (Example) {
    function run(sources, args) {
        function main(sources) {
            //Show code icon
            var btnShow = UI.Icon.run({
                DOM: sources.DOM,
                content$: xstream_1.default.of(UI.IconType.Code)
            });
            var transition$ = btnShow.events("click").fold(function (prev, n) { return !prev; }, false).drop(1).map(function (n) { return ({
                animation: UI.Animation.Slide,
                direction: n ? UI.Direction.In : UI.Direction.Out
            }); }).startWith({
                animation: UI.Animation.None,
                direction: UI.Direction.Out
            });
            //Sliding code view
            var codelines = args.code.split(/\r?\n/);
            //Trim leading whitespace
            var baseWhitespace = codelines.length > 1 ? countLeadingWhitespace(codelines[1]) - 2 : 0;
            codelines = codelines.map(function (line, i) { return i === 0 ? line : line.substring(baseWhitespace); });
            var code$ = xstream_1.default.of(UI.Segment.render({ attachment: UI.Attachment.Bottom }, [dom_1.pre([
                    dom_1.code({
                        props: { className: "javascript" }, hook: {
                            insert: function (vnode) { hljs.highlightBlock(vnode.elm); }
                        }
                    }, codelines.map(function (line) { return [line, dom_1.br()]; }).reduce(function (acc, n) { return acc.concat(n); }, []))
                ])
            ]));
            var animatedCode$ = UI.Transition.run({
                DOM: sources.DOM,
                target$: code$,
                transition$: transition$
            });
            //Example bar
            var top$ = xstream_1.default.combine(transition$, args.VNode$).map(function (_a) {
                var animation = _a[0], obj = _a[1];
                var isActive = animation.direction === UI.Direction.In;
                var elem = dom_1.div({ props: { className: isActive ? "ui top attached segment code" : "code" } }, [
                    isActive ? UI.Label.render({ attachment: UI.Attachment.Top }, [
                        "Example"
                    ]) : dom_1.div({ style: { display: "none" }, props: { className: "" } }),
                    obj
                ]);
                return elem;
            });
            var vTree$ = xstream_1.default.combine(btnShow.DOM, animatedCode$.DOM, top$).map(function (_a) {
                var btnShow = _a[0], code = _a[1], top = _a[2];
                var content = [btnShow, top, code];
                if (typeof (args.description) !== "undefined") {
                    content = typeof (args.description) === "string" ? [dom_1.p(args.description)].concat(content) : [].concat(args.description, content);
                }
                if (typeof (args.header) !== "undefined") {
                    content = [UI.Header.render(args.header)].concat(content);
                }
                return dom_1.div({ props: { className: args.highlighted ? "highlighted example" : "example" } }, content);
            });
            return {
                DOM: vTree$
            };
        }
        var isolatedMain = isolate_1.default(main);
        return isolatedMain(sources);
    }
    Example.run = run;
    function countLeadingWhitespace(string) {
        for (var i = 0; i < string.length; i++) {
            if (string[i] !== " " && string[i] !== "\t") {
                return (i);
            }
        }
        return (string.length);
    }
})(Example = exports.Example || (exports.Example = {}));


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
// tslint:disable-next-line:no-unused-variable
var dom_1 = __webpack_require__(1);
var Index;
(function (Index) {
    function run(sources) {
        var vTree$ = xstream_1.default.of(dom_1.div(".centered", [
            UI.Container.render([
                UI.Grid.render({ centered: true }, [
                    UI.Row.render([
                        UI.Header.render({
                            props: { size: UI.Size.Huge },
                            content: {
                                main: "Welcome.",
                                subtext: "At the moment the docs are a WIP. Planned pages are scaffolded in the sidemenu."
                            }
                        }),
                    ])
                ])
            ])
        ]));
        return {
            DOM: vTree$,
            router: xstream_1.default.never()
        };
    }
    Index.run = run;
})(Index = exports.Index || (exports.Index = {}));


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-unused-variable
var xstream_1 = __webpack_require__(0);
// tslint:disable-next-line:no-unused-variable
var dom_1 = __webpack_require__(1);
var sidebar_1 = __webpack_require__(180);
var Layout;
(function (Layout) {
    function run(sources, page) {
        /*** Create components ***/
        var sidebar = sidebar_1.Sidebar.run(sources);
        /*** Compose view ***/
        var vTree$ = xstream_1.default.combine(sidebar.DOM, page.DOM)
            .map(function (_a) {
            var sidebar = _a[0], page = _a[1];
            return dom_1.div(".full.height", [
                dom_1.div(".content.pusher", [
                    sidebar,
                    page
                ]),
            ]);
        });
        return {
            DOM: vTree$,
            router: page.router
        };
    }
    Layout.run = run;
})(Layout = exports.Layout || (exports.Layout = {}));


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UI = __webpack_require__(3);
var xstream_1 = __webpack_require__(0);
var dom_1 = __webpack_require__(1);
var Sidebar;
(function (Sidebar) {
    function run(sources) {
        var currentPage$ = sources.router.map(function (x) { return x.pathname; });
        var prefix = "/cycle-semantic-ui";
        var vTree$ = currentPage$.map(function (page) {
            return dom_1.div(".left.menu", [
                dom_1.div(".fixed", [
                    UI.Menu.render({
                        vertical: true, inverted: true,
                        attachment: UI.Attachment.None, size: UI.Size.Fluid
                    }, [{
                            header: true,
                            main: ["Introduction", UI.Menu.render({ submenu: true, }, [{
                                        link: true, href: prefix + "/", active: page === prefix + "/" || page === prefix + "/home",
                                        main: "About"
                                    }])]
                        },
                        {
                            header: true,
                            main: ["Elements", UI.Menu.render({ submenu: true, }, [{
                                        link: true, href: prefix + "/elements/button", active: page === prefix + "/elements/button",
                                        main: "Button"
                                    }, {
                                        link: true, href: prefix + "/elements/container", active: page === prefix + "/elements/container",
                                        main: "Container"
                                    }, {
                                        link: true, href: prefix + "/elements/divider", active: page === prefix + "/elements/divider",
                                        main: "Divider"
                                    }, {
                                        link: true, href: prefix + "/elements/header", active: page === prefix + "/elements/header",
                                        main: "Header"
                                    }, {
                                        link: true, href: prefix + "/elements/icon", active: page === prefix + "/elements/icon",
                                        main: "Icon"
                                    }, {
                                        link: true, href: prefix + "/elements/image", active: page === prefix + "/elements/image",
                                        main: "Image"
                                    }, {
                                        link: true, href: prefix + "/elements/label", active: page === prefix + "/elements/label",
                                        main: "Label"
                                    }, {
                                        link: true, href: prefix + "/elements/list", active: page === prefix + "/elements/list",
                                        main: "List"
                                    }, {
                                        link: true, href: prefix + "/elements/loader", active: page === prefix + "/elements/loader",
                                        main: "Loader"
                                    }, {
                                        link: true, href: prefix + "/elements/segment", active: page === prefix + "/elements/segment",
                                        main: "Segment"
                                    }, {
                                        link: true, href: prefix + "/elements/step", active: page === prefix + "/elements/step",
                                        main: "Step"
                                    }, {
                                        link: true, href: prefix + "/elements/textbox", active: page === prefix + "/elements/textbox",
                                        main: "Textbox"
                                    }])]
                        },
                        {
                            header: true,
                            main: ["Collections", UI.Menu.render({ submenu: true, }, [{
                                        link: true, href: prefix + "/collections/breadcrumb", active: page === prefix + "/collections/breadcrumb",
                                        main: "Breadcrumb"
                                    }, {
                                        link: true, href: prefix + "/collections/form", active: page === prefix + "/collections/form",
                                        main: "Form"
                                    }, {
                                        link: true, href: prefix + "/collections/grid", active: page === prefix + "/collections/grid",
                                        main: "Grid"
                                    }, {
                                        link: true, href: prefix + "/collections/menu", active: page === prefix + "/collections/menu",
                                        main: "Menu"
                                    }, {
                                        link: true, href: prefix + "/collections/message", active: page === prefix + "/collections/message",
                                        main: "Message"
                                    }, {
                                        link: true, href: prefix + "/collections/table", active: page === prefix + "/collections/table",
                                        main: "Table"
                                    }])]
                        },
                        {
                            header: true,
                            main: ["Modules", UI.Menu.render({ submenu: true, }, [{
                                        link: true, href: prefix + "/modules/checkbox", active: page === prefix + "/modules/checkbox",
                                        main: "Checkbox"
                                    }, {
                                        link: true, href: prefix + "/modules/dimmer", active: page === prefix + "/modules/dimmer",
                                        main: "Dimmer"
                                    }, {
                                        link: true, href: prefix + "/modules/dropdown", active: page === prefix + "/modules/dropdown",
                                        main: "Dropdown"
                                    }, {
                                        link: true, href: prefix + "/modules/modal", active: page === prefix + "/modules/modal",
                                        main: "Modal"
                                    }, {
                                        link: true, href: prefix + "/modules/popup", active: page === prefix + "/modules/popup",
                                        main: "Popup"
                                    }, {
                                        link: true, href: prefix + "/modules/progress", active: page === prefix + "/modules/progress",
                                        main: "Progress"
                                    }, {
                                        link: true, href: prefix + "/modules/transition", active: page === prefix + "/modules/transition",
                                        main: "Transition"
                                    }])]
                        },
                        {
                            header: true,
                            main: ["Views", UI.Menu.render({ submenu: true, }, [{
                                        link: true, href: prefix + "/views/statistic", active: page === prefix + "/views/statistic",
                                        main: "Statistic"
                                    }])]
                        }])
                ])
            ]);
        });
        return {
            DOM: vTree$,
            router: xstream_1.default.never()
        };
    }
    Sidebar.run = run;
})(Sidebar = exports.Sidebar || (exports.Sidebar = {}));


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isolate_1 = __webpack_require__(8);
var xstream_1 = __webpack_require__(0);
var switch_path_1 = __webpack_require__(141);
var callPage = function (sources) {
    return function (_a) {
        var value = _a.value;
        var isolatedPage = isolate_1.default(value)(sources);
        return isolatedPage;
    };
};
function propOrNever(key, x) {
    if (x.hasOwnProperty(key)) {
        return x[key];
    }
    return xstream_1.default.never();
}
function flattenByKey(key, stream) {
    return stream.map(function (x) { return propOrNever(key, x); }).flatten();
}
function ComponentRouter(sources) {
    var component$ = sources.router.map(function (l) { return switch_path_1.default(l.pathname, sources.routes); })
        .map(function (route) { return callPage(sources)(route); })
        .remember();
    var pluck = function (key) { return flattenByKey(key, component$); };
    var sinks = {
        pluck: pluck,
        DOM: pluck("DOM"),
        router: pluck("router"),
    };
    return sinks;
}
exports.default = function (sources) { return isolate_1.default(ComponentRouter)(sources); };


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(178);
var collections_1 = __webpack_require__(167);
var prefix = "/cycle-semantic-ui";
var routes = {
    "/": index_1.Index.run,
};
routes[prefix + "/"] = index_1.Index.run;
routes[prefix + "/collections/breadcrumb"] = collections_1.Breadcrumb.run;
routes[prefix + "/collections/form"] = collections_1.Form.run;
routes[prefix + "/collections/grid"] = collections_1.Grid.run;
routes[prefix + "/collections/menu"] = collections_1.Menu.run;
routes[prefix + "/collections/message"] = collections_1.Message.run;
exports.default = routes;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Breadcrumb;
(function (Breadcrumb) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(breadcrumb, common_1.makeIsArgs(isContent), isContent, arg1, arg2);
    }
    Breadcrumb.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, breadcrumb, ".breadcrumb", scope);
    }
    Breadcrumb.run = run;
    function breadcrumb(args) {
        var props = args.props ? args.props : { divider: "/" };
        var content = [];
        if (args.content) {
            if (isContent(args.content)) {
                content = args.content;
            }
            else if (isContent(args.content.main)) {
                content = args.content.main;
            }
        }
        if (!props.divider) {
            props.divider = "/";
        }
        var children = content.map(function (c) { return [
            section(c), divider(props)
        ]; }).reduce(function (a, n) { return a.concat(n); }, []);
        children.splice(-1, 1);
        return dom_1.div({ props: { className: getClassName(props) } }, children);
    }
    function getClassName(props) {
        var className = "ui";
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        return className + " breadcrumb";
    }
    function section(section) {
        return section.active
            ? dom_1.div({ props: { className: "active section" } }, section.text)
            : section.href
                ? dom_1.a({ props: { className: "section", href: section.href } }, section.text)
                : dom_1.div({ props: { className: "section" } }, section.text);
    }
    function divider(props) {
        if (typeof (props.divider) === "string") {
            return dom_1.span({ props: { className: "divider" } }, props.divider);
        }
        if (props.divider.data.props.className.indexOf("ui") !== -1) {
            props.divider.data.props.className = props.divider.data.props.className.substring(3);
        }
        if (props.divider.data.props.className.indexOf("divider") === -1) {
            props.divider.data.props.className += " divider";
        }
        return props.divider;
    }
    function isContent(obj) {
        return obj instanceof Array;
    }
})(Breadcrumb = exports.Breadcrumb || (exports.Breadcrumb = {}));


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(2);
var common_1 = __webpack_require__(5);
var Field;
(function (Field) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(field, isArgs, types_1.isDOMContent, arg1, arg2);
    }
    Field.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, field, ".field", scope);
    }
    Field.run = run;
    function field(args) {
        var props = typeof (args.props) === "undefined" ? {} : args.props;
        var lbl = "";
        var content = [];
        if (typeof (args.content) !== "undefined") {
            if (types_1.isDOMContent(args.content)) {
                content = args.content;
            }
            else {
                lbl = args.content.label ? args.content.label : "";
                content = args.content.main ? args.content.main : [];
            }
        }
        return dom_1.div({ props: { className: getClassname(props) } }, [].concat(lbl ? dom_1.label(lbl) : [], content));
    }
    function getClassname(props) {
        var className = "ui";
        if (props.width) {
            className += utils_1.numToText(props.width) + " wide";
        }
        if (props.inline) {
            className += " inline";
        }
        if (props.centered) {
            className += " centered";
        }
        if (props.error) {
            className += " error";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.required) {
            className += " required";
        }
        className += " field";
        return className;
    }
    function isArgs(obj) {
        return obj && (typeof (obj.props) !== "undefined" ||
            (typeof (obj.content) !== "undefined" &&
                (types_1.isDOMContent(obj.content) || types_1.isDOMContent(obj.content.main) || types_1.isDOMContent(obj.content.label))));
    }
})(Field = exports.Field || (exports.Field = {}));


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(2);
var common_1 = __webpack_require__(5);
var Fields;
(function (Fields) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(fields, isArgs, types_1.isDOMContent, arg1, arg2);
    }
    Fields.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, fields, ".fields", scope);
    }
    Fields.run = run;
    function fields(args) {
        var props = typeof (args.props) === "undefined" ? {} : args.props;
        var lbl = "";
        var content = [];
        if (typeof (args.content) !== "undefined") {
            if (types_1.isDOMContent(args.content)) {
                content = args.content;
            }
            else {
                lbl = args.content.label ? args.content.label : "";
                content = args.content.main ? args.content.main : [];
            }
        }
        return dom_1.div({ props: { className: getClassname(props, content) } }, [].concat(lbl ? dom_1.label(lbl) : [], content));
    }
    function getClassname(props, content) {
        var className = "ui";
        if (props.equalWidth && content.length) {
            className += utils_1.numToText(content.length);
        }
        if (props.inline) {
            className += " inline";
        }
        if (props.grouped) {
            className += " grouped";
        }
        if (props.required) {
            className += " required";
        }
        className += " fields";
        return className;
    }
    function isArgs(obj) {
        return obj && (typeof (obj.props) !== "undefined" ||
            (typeof (obj.content) !== "undefined" &&
                (types_1.isDOMContent(obj.content) || types_1.isDOMContent(obj.content.main) || types_1.isDOMContent(obj.content.label))));
    }
})(Fields = exports.Fields || (exports.Fields = {}));


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = __webpack_require__(4);
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Form;
(function (Form) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(form, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1, arg2);
    }
    Form.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, form, ".form", scope);
    }
    Form.run = run;
    function form(args) {
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        var props = typeof (args.props) !== "undefined" ? args.props : {};
        return dom_1.div({ props: { className: getClassname(props) } }, content);
    }
    function getClassname(props) {
        var className = "ui";
        if (props.loading) {
            className += " loading";
        }
        if (props.equalWidth) {
            className += " equal width";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        className += " form";
        return className;
    }
})(Form = exports.Form || (exports.Form = {}));


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(186));
__export(__webpack_require__(184));
__export(__webpack_require__(185));


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var common_1 = __webpack_require__(5);
var enums_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(2);
var Column;
(function (Column) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(column, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1, arg2);
    }
    Column.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, column, ".column", scope);
    }
    Column.run = run;
    function column(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: getClassname(props) } }, content);
    }
    function getClassname(props) {
        var className = "ui";
        if (props.width) {
            className += utils_1.numToText(props.width) + " wide";
        }
        if (props.mobile) {
            className += utils_1.numToText(props.mobile) + " wide mobile";
        }
        if (props.tablet) {
            className += utils_1.numToText(props.tablet) + " wide tablet";
        }
        if (props.computer) {
            className += utils_1.numToText(props.computer) + " wide computer";
        }
        if (props.largescreen) {
            className += utils_1.numToText(props.largescreen) + " wide large screen";
        }
        if (props.mobileOnly) {
            className += " mobile only";
        }
        if (props.tabletOnly) {
            className += " tablet only";
        }
        if (props.computerOnly) {
            className += " computer only";
        }
        if (props.largescreenOnly) {
            className += " large screen only";
        }
        if (props.stretched) {
            className += " stretched";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.alignment) !== "undefined") {
            className += enums_1.VerticalAlignment.ToClassname(props.alignment);
        }
        if (typeof (props.textAlignment) !== "undefined") {
            className += enums_1.TextAlignment.ToClassname(props.textAlignment);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        className += " column";
        return className;
    }
})(Column = exports.Column || (exports.Column = {}));


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var common_1 = __webpack_require__(5);
var enums_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(2);
var Grid;
(function (Grid) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(grid, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1, arg2);
    }
    Grid.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, grid, ".grid", scope);
    }
    Grid.run = run;
    function grid(args) {
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        var props = typeof (args.props) !== "undefined" ? args.props : {};
        return dom_1.div({ props: { className: getClassname(props, content) } }, content);
    }
    Grid.grid = grid;
    function getClassname(props, content) {
        var className = "ui";
        if (props.equalWidth) {
            className += " equal width";
        }
        if (props.divided) {
            className += " divided";
        }
        if (props.verticallyDivided) {
            className += " vertically divided";
        }
        if (props.container) {
            className += " container";
        }
        if (props.celled) {
            className += " celled";
        }
        if (props.intCelled) {
            className += " internally celled";
        }
        if (props.padded) {
            className += " padded";
        }
        if (props.verticallyPadded) {
            className += " vertically padded";
        }
        if (props.horizontallyPadded) {
            className += " horizontally padded";
        }
        if (props.relaxed) {
            className += " relaxed";
        }
        if (props.veryRelaxed) {
            className += " very relaxed";
        }
        if (props.centered) {
            className += " centered";
        }
        if (props.stackable) {
            className += " stackable";
        }
        if (props.doubling) {
            className += " doubling";
        }
        if (props.reversedMobile) {
            className += " mobile reversed";
        }
        if (props.reversedTablet) {
            className += " tablet reversed";
        }
        if (props.reversedComputer) {
            className += " computer reversed";
        }
        if (props.reversedLargescreen) {
            className += " large screen reversed";
        }
        if (props.vertReversedMobile) {
            className += " mobile vertically reversed";
        }
        if (props.vertReversedTablet) {
            className += " tablet vertically reversed";
        }
        if (props.vertReversedComputer) {
            className += " computer vertically reversed";
        }
        if (props.vertReversedLargescreen) {
            className += " large screen vertically reversed";
        }
        if (props.mobileOnly) {
            className += " mobile only";
        }
        if (props.tabletOnly) {
            className += " tablet only";
        }
        if (props.computerOnly) {
            className += " computer only";
        }
        if (props.largescreenOnly) {
            className += " large screen only";
        }
        if (typeof (props.alignment) !== "undefined") {
            className += enums_1.VerticalAlignment.ToClassname(props.alignment);
        }
        if (typeof (props.textAlignment) !== "undefined") {
            className += enums_1.TextAlignment.ToClassname(props.textAlignment);
        }
        if (props.width) {
            className += utils_1.numToText(props.width) + " column";
        }
        className += " grid";
        return className;
    }
    Grid.getClassname = getClassname;
})(Grid = exports.Grid || (exports.Grid = {}));


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(189));
__export(__webpack_require__(191));
__export(__webpack_require__(188));


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var common_1 = __webpack_require__(5);
var enums_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(2);
var Row;
(function (Row) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(row, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1, arg2);
    }
    Row.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, row, ".row", scope);
    }
    Row.run = run;
    function row(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: getClassname(props, content) } }, content);
    }
    Row.row = row;
    function getClassname(props, content) {
        var className = "ui";
        if (props.doubling) {
            className += " doubling";
        }
        if (props.centered) {
            className += " centered";
        }
        if (props.stretched) {
            className += " stretched";
        }
        if (props.mobileOnly) {
            className += " mobile only";
        }
        if (props.tabletOnly) {
            className += " tablet only";
        }
        if (props.computerOnly) {
            className += " computer only";
        }
        if (props.largescreenOnly) {
            className += " large screen only";
        }
        if (props.equalWidth) {
            className += " equal width";
        }
        if (props.width) {
            className += utils_1.numToText(props.width) + " column";
        }
        if (typeof (props.textAlignment) !== "undefined") {
            className += enums_1.TextAlignment.ToClassname(props.textAlignment);
        }
        if (typeof (props.alignment) !== "undefined") {
            className += enums_1.VerticalAlignment.ToClassname(props.alignment);
        }
        className += " row";
        return className;
    }
})(Row = exports.Row || (exports.Row = {}));


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(183));
__export(__webpack_require__(187));
__export(__webpack_require__(190));
__export(__webpack_require__(34));
__export(__webpack_require__(193));
__export(__webpack_require__(194));


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(1);
var icon_1 = __webpack_require__(19);
var transition_1 = __webpack_require__(12);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Message;
(function (Message) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(message, isArgs, types_1.isDOMContent, arg1, arg2);
    }
    Message.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        function main(sources) {
            var props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            var content$ = sources.content$ ? sources.content$.map(function (c) { return types_1.isDOMContent(c) ? { main: c } : c; }) : xstream_1.default.of({ main: [] });
            var on$ = sources.args && sources.args.on$ ? sources.args.on$ : xstream_1.default.of(true);
            var vTree$, active$, icon;
            if (sources.args && sources.args.closeable) {
                icon = icon_1.Icon.run({ DOM: sources.DOM, content$: xstream_1.default.of(enums_1.IconType.Close) }, scope);
                var close$ = icon.events("click").mapTo(false);
                vTree$ = xstream_1.default.combine(props$, content$, icon.DOM)
                    .map(function (_a) {
                    var props = _a[0], content = _a[1], closeIcon = _a[2];
                    return message({ props: props, content: content }, closeIcon);
                });
                active$ = xstream_1.default.merge(on$, close$);
            }
            else {
                vTree$ = xstream_1.default.combine(props$, content$).map(function (_a) {
                    var props = _a[0], content = _a[1];
                    return message({ props: props, content: content });
                });
                active$ = on$;
            }
            var transition$ = active$.fold(function (prevAnim, active) { return prevAnim.direction === enums_1.Direction.None
                ? { animation: enums_1.Animation.None, direction: active ? enums_1.Direction.In : enums_1.Direction.Out }
                : { animation: enums_1.Animation.Fade, direction: active ? enums_1.Direction.In : enums_1.Direction.Out }; }, { animation: enums_1.Animation.None, direction: enums_1.Direction.None });
            var animation = transition_1.Transition.run({ DOM: sources.DOM, target$: vTree$, transition$: transition$ }, scope);
            var evt;
            if (sources.args && sources.args.closeable) {
                evt = function (type) { return xstream_1.default.merge(sources.DOM.select(".message").events(type), icon.events(type), animation.events(type)); };
            }
            else {
                evt = function (type) { return sources.DOM.select(".message").events(type); };
            }
            return {
                DOM: animation.DOM,
                events: evt
            };
        }
        if (scope === null) {
            return main(sources);
        }
        var isolatedMain = isolate_1.default(main, scope);
        return isolatedMain(sources);
    }
    Message.run = run;
    function message(args, closeIcon) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? { main: args.content } : args.content : { main: [] };
        if (content.icon) {
            props.icon = true;
        }
        if (typeof (content.main) === "string") {
            content.main = [dom_1.p(content.main)];
        }
        return dom_1.div({ props: { className: getClassname(props) } }, [].concat(content.icon ? content.icon : [], closeIcon ? closeIcon : [], dom_1.div({ props: { className: "content" } }, [].concat(content.header ? dom_1.div({ props: { className: "header" } }, content.header) : [], content.main))));
    }
    function getClassname(props) {
        var className = "ui";
        if (props.icon) {
            className += " icon";
        }
        if (props.floating) {
            className += " floating";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.forceVisible) {
            className += " visible";
        }
        if (props.hidden) {
            className += " hidden";
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " message";
        return className;
    }
    function isArgs(obj) {
        return typeof (obj) !== "undefined" && (typeof (obj.props) !== "undefined" || isContent(obj.content) || types_1.isDOMContent(obj.content));
    }
    function isContent(content) {
        return content !== undefined && (types_1.isDOMContent(content.icon) || types_1.isDOMContent(content.header) || types_1.isDOMContent(content.main));
    }
})(Message = exports.Message || (exports.Message = {}));


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Table;
(function (Table) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(tableR, isArgs, isMain, arg1, arg2);
    }
    Table.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, tableR, ".table", scope);
    }
    Table.run = run;
    function tableR(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? isContent(args.content) ? args.content : { main: args.content } : { main: [] };
        var header = content.header ? dom_1.thead([dom_1.tr(content.header.map(function (h) { return dom_1.th(h); }))]) : [];
        var footer;
        if (types_1.isDOMContent(content.footer)) {
            footer = dom_1.tfoot(content.footer);
        }
        else {
            footer = content.footer ? dom_1.tfoot([dom_1.tr(content.footer.map(function (f) { return dom_1.th(f); }))]) : [];
        }
        return dom_1.table({ props: { className: getClassname(props) } }, [].concat(header, dom_1.tbody(content.main.map(function (r) { return dom_1.tr(r.map(function (c) { return dom_1.td(c); })); })), footer));
    }
    function getClassname(props) {
        var className = "ui";
        if (props.singleLine) {
            className += " single line";
        }
        if (props.fixed) {
            className += " fixed";
        }
        if (props.selectable) {
            className += " selectable";
        }
        if (props.striped) {
            className += " striped";
        }
        if (props.celled) {
            className += " celled";
        }
        if (props.basic) {
            className += " basic";
        }
        if (props.veryBasic) {
            className += " very basic";
        }
        if (props.collapsing) {
            className += " collapsing";
        }
        if (props.padded) {
            className += " padded";
        }
        if (props.veryPadded) {
            className += " very padded";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.veryCompact) {
            className += " very compact";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " table";
        return className;
    }
    function isArgs(obj) {
        return typeof (obj) !== "undefined" && (typeof (obj.props) !== "undefined" ||
            (typeof (obj.content) !== "undefined" && (isContent(obj.content) || isMain(obj.content))));
    }
    function isContent(content) {
        return content !== undefined && (content.main !== undefined ||
            (content.header !== undefined ||
                content.footer !== undefined));
    }
    function isMain(obj) {
        return typeof (obj) !== "undefined" && obj instanceof Array;
    }
})(Table = exports.Table || (exports.Table = {}));


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Button;
(function (Button) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(button, isArgs, types_1.isDOMContent, arg1, arg2);
    }
    Button.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, button, ".button", scope);
    }
    Button.run = run;
    function button(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? { main: args.content } : args.content : { main: [] };
        var children = content.hidden
            ? [dom_1.div({ props: { className: "visible content" } }, content.main),
                dom_1.div({ props: { className: "hidden content" } }, content.hidden)]
            : content.main;
        return props.href
            ? dom_1.a({ props: { href: props.href, className: getClassname(props) } }, children)
            : dom_1.div({ props: { className: getClassname(props) } }, children);
    }
    function getClassname(props) {
        var className = "ui";
        if (props.animated) {
            className += " animated";
        }
        if (props.verticalAnimated) {
            className += " vertical animated";
        }
        if (props.labeled) {
            className += " labeled";
        }
        if (props.rightlabeled) {
            className += " right labeled";
        }
        if (props.icon) {
            className += " icon";
        }
        if (props.basic) {
            className += " basic";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.active) {
            className += " active";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.loading) {
            className += " loading";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.circular) {
            className += " circular";
        }
        if (props.fluid) {
            className += " fluid";
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " button";
        return className;
    }
    function isArgs(obj) {
        return typeof (obj) !== "undefined" && (typeof (obj.props) !== "undefined" ||
            types_1.isDOMContent(obj.content) || (typeof (obj.content) !== "undefined" && (types_1.isDOMContent(obj.content.main) || types_1.isDOMContent(obj.content.hidden))));
    }
})(Button = exports.Button || (exports.Button = {}));


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Container;
(function (Container) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, container, ".container", scope);
    }
    Container.run = run;
    function render(arg1) {
        return common_1.renderPropsAndContent(container, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1);
    }
    Container.render = render;
    function container(args) {
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: "ui container" } }, content);
    }
})(Container = exports.Container || (exports.Container = {}));


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Divider;
(function (Divider) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, divider, ".divider", scope);
    }
    Divider.run = run;
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(divider, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1, arg2);
    }
    Divider.render = render;
    function divider(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: getClassName(props) } }, content);
    }
    function getClassName(props) {
        var className = "ui";
        if (props.vertical) {
            className += " vertical";
        }
        else if (props.horizontal) {
            className += " horizontal";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.fitted) {
            className += " fitted";
        }
        if (props.hidden) {
            className += " hidden";
        }
        if (props.section) {
            className += " section";
        }
        if (props.clearing) {
            className += " clearing";
        }
        if (props.header) {
            className += " header";
        }
        className += " divider";
        return className;
    }
})(Divider = exports.Divider || (exports.Divider = {}));


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Header;
(function (Header) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, header, ".header", scope);
    }
    Header.run = run;
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(header, isArgs, types_1.isDOMContent, arg1, arg2);
    }
    Header.render = render;
    function header(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? { main: args.content } : args.content : { main: [] };
        var children = [].concat(content.main ? content.main : [], content.subtext ? dom_1.div({ props: { className: "sub header" } }, content.subtext) : []);
        return dom_1.div({ props: { className: getClassname(props) } }, content.icon
            ? [].concat(content.icon, dom_1.div({ props: { className: "content" } }, children))
            : children);
    }
    function getClassname(props) {
        var className = "ui";
        if (props.icon) {
            className += " icon";
        }
        if (props.dividing) {
            className += " dividing";
        }
        if (props.divider) {
            className += " divider";
        }
        if (props.block) {
            className += " block";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        if (typeof (props.textAlignment) !== "undefined") {
            className += enums_1.TextAlignment.ToClassname(props.textAlignment);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " header";
        return className;
    }
    function isArgs(obj) {
        return (typeof (obj) !== "undefined") && (typeof (obj.props) !== "undefined" ||
            types_1.isDOMContent(obj.content) || (typeof (obj.content) !== "undefined" && (types_1.isDOMContent(obj.content.main) ||
            types_1.isDOMContent(obj.content.icon) ||
            types_1.isDOMContent(obj.content.subtext))));
    }
})(Header = exports.Header || (exports.Header = {}));


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Image;
(function (Image) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, image, ".image", scope);
    }
    Image.run = run;
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(image, common_1.makeIsArgs(isUrl), isUrl, arg1, arg2);
    }
    Image.render = render;
    function image(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? isUrl(args.content) ? args.content : args.content.main : "";
        var image = dom_1.img({ props: { className: getClassname(props), src: content } });
        return props.href ? dom_1.a({ props: { href: props.href } }, image) : image;
    }
    Image.image = image;
    function getClassname(props) {
        var className = "ui";
        if (props.href) {
            className += " link";
        }
        if (props.hidden) {
            className += " hidden";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.avatar) {
            className += " avatar";
        }
        if (props.bordered) {
            className += " bordered";
        }
        if (props.spaced) {
            className += " spaced";
        }
        if (props.circular) {
            className += " circular";
        }
        if (props.rounded) {
            className += " rounded";
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.alignment) !== "undefined") {
            className += enums_1.VerticalAlignment.ToClassname(props.alignment);
        }
        return className + " image";
    }
    function isUrl(obj) {
        return typeof (obj) === "string";
    }
})(Image = exports.Image || (exports.Image = {}));


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(195));
__export(__webpack_require__(196));
__export(__webpack_require__(197));
__export(__webpack_require__(198));
__export(__webpack_require__(19));
__export(__webpack_require__(199));
__export(__webpack_require__(201));
__export(__webpack_require__(202));
__export(__webpack_require__(203));
__export(__webpack_require__(204));
__export(__webpack_require__(205));
__export(__webpack_require__(206));


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = __webpack_require__(4);
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Label;
(function (Label) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, label, ".label", scope);
    }
    Label.run = run;
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(label, isArgs, types_1.isDOMContent, arg1, arg2);
    }
    Label.render = render;
    function label(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? { main: args.content } : args.content : { main: [] };
        var children = [].concat(content.main ? content.main : [], content.detail ? dom_1.div({ props: { className: "detail" } }, content.detail) : []);
        return dom_1.div({ props: { className: getClassname(props) } }, children);
    }
    function getClassname(props) {
        var className = "ui";
        if (props.circular) {
            className += " circular";
        }
        if (props.empty) {
            className += " empty";
        }
        if (props.pointing) {
            className += " pointing";
        }
        if (props.leftPointing) {
            className += " left pointing";
        }
        if (props.rightPointing) {
            className += " right pointing";
        }
        if (props.basic) {
            className += " basic";
        }
        if (props.leftCorner) {
            className += " left corner";
        }
        if (props.rightCorner) {
            className += " right corner";
        }
        if (props.tag) {
            className += " tag";
        }
        if (props.ribbon) {
            className += " ribbon";
        }
        if (props.rightRibbon) {
            className += " right ribbon";
        }
        if (props.horizontal) {
            className += " horizontal";
        }
        if (props.floating) {
            className += " floating";
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " label";
        return className;
    }
    function isArgs(obj) {
        return typeof (obj) !== "undefined" && (typeof (obj.props) !== "undefined" ||
            typeof (obj.content) !== "undefined" && (types_1.isDOMContent(obj.content) || (types_1.isDOMContent(obj.content.main) || types_1.isDOMContent(obj.content.detail))));
    }
})(Label = exports.Label || (exports.Label = {}));


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var List;
(function (List) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(list, common_1.makeIsArgs(isContent), isContent, arg1, arg2);
    }
    List.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, list, ".list", scope);
    }
    List.run = run;
    function list(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? isContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: getClassname(props) } }, content.map(function (_a) {
            var header = _a.header, icon = _a.icon, main = _a.main, description = _a.description, href = _a.href, left = _a.left, right = _a.right;
            var l = left ? dom_1.div({ props: { className: "left floated content" } }, left) : [];
            var r = right ? dom_1.div({ props: { className: "right floated content" } }, right) : [];
            var h = header ? dom_1.div({ props: { className: "header" } }, header) : [];
            var d = description ? dom_1.div({ props: { className: "description" } }, description) : [];
            var i = icon ? icon : [];
            var c = (header || description) ? dom_1.div({ props: { className: "content" } }, [].concat(h, d, main)) : main;
            var children = [].concat(l, i, c, r);
            return href
                ? dom_1.a({ props: { className: "item", href: href } }, children)
                : dom_1.div({ props: { className: "item" } }, children);
        }));
    }
    List.list = list;
    function getClassname(props) {
        var className = "ui";
        if (props.bulleted) {
            className += " bulleted";
        }
        if (props.ordered) {
            className += " ordered";
        }
        if (props.horizontal) {
            className += " horizontal";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.selection) {
            className += " selection";
        }
        if (props.animated) {
            className += " animated";
        }
        if (props.relaxed) {
            className += " relaxed";
        }
        if (props.divided) {
            className += " divided";
        }
        if (props.celled) {
            className += " celled";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.alignment) !== "undefined") {
            className += enums_1.VerticalAlignment.ToClassname(props.alignment);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        className += " list";
        return className;
    }
    function isContent(obj) {
        return obj instanceof Array;
    }
})(List = exports.List || (exports.List = {}));


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(1);
var dimmer_1 = __webpack_require__(35);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Loader;
(function (Loader) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(loader, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1, arg2);
    }
    Loader.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({ type: LoaderType.Page });
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of(undefined);
            var on$ = sources.args && sources.args.on$ ? sources.args.on$ : xstream_1.default.of(true);
            var props$ = sources.props$.remember();
            var vTree$ = xstream_1.default.combine(props$, sources.content$)
                .map(function (_a) {
                var props = _a[0], content = _a[1];
                return loader({ props: props, content: content });
            });
            var target$ = props$.map(function (props) { return props.type === LoaderType.Page ? xstream_1.default.of("page") : sources.args.element$; }).flatten();
            var dimmer = dimmer_1.Dimmer.run({
                DOM: sources.DOM,
                props$: props$.map(function (props) { return ({ inverted: props.inverted }); }),
                content$: vTree$.map(function (v) { return [v]; }),
                args: { on$: on$, target$: target$ }
            }, scope);
            var result$ = props$.map(function (props) { return props.type === LoaderType.Inline ? vTree$ : dimmer.DOM; }).flatten();
            return {
                DOM: result$,
                events: function (type) { return xstream_1.default.merge(sources.DOM.select(".loader").events(type), dimmer.events(type)); }
            };
        }
        if (scope === null) {
            return main(sources);
        }
        var isolatedMain = isolate_1.default(main, scope);
        return isolatedMain(sources);
    }
    Loader.run = run;
    function loader(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: getClassname(props) } }, content);
    }
    function getClassname(props) {
        var className = "ui";
        if (props.active) {
            className += " active";
        }
        if (props.centered) {
            className += " centered";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.indeterminate) {
            className += " indeterminate";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.text) {
            className += " text";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        className += LoaderType.ToClassname(typeof (props.type) !== "undefined" ? props.type : LoaderType.Page);
        return className;
    }
    var LoaderType;
    (function (LoaderType) {
        LoaderType[LoaderType["Inline"] = 0] = "Inline";
        LoaderType[LoaderType["Page"] = 1] = "Page";
        LoaderType[LoaderType["Content"] = 2] = "Content";
    })(LoaderType = Loader.LoaderType || (Loader.LoaderType = {}));
    (function (LoaderType) {
        function ToEnum(attachmentstring) {
            return typeof (attachmentstring) === "number"
                ? attachmentstring
                : LoaderType[utils_1.capitalize(attachmentstring)];
        }
        LoaderType.ToEnum = ToEnum;
        function ToClassname(type) {
            type = LoaderType.ToEnum(type);
            switch (type) {
                case LoaderType.Inline: return " inline loader";
                case LoaderType.Page: return " loader";
                case LoaderType.Content: return " loader";
            }
        }
        LoaderType.ToClassname = ToClassname;
    })(LoaderType = Loader.LoaderType || (Loader.LoaderType = {}));
})(Loader = exports.Loader || (exports.Loader = {}));


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Segment;
(function (Segment) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(segment, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1, arg2);
    }
    Segment.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, segment, ".segment", scope);
    }
    Segment.run = run;
    function segment(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: getClassname(props) } }, content);
    }
    function getClassname(props) {
        var className = "ui";
        if (props.raised) {
            className += " raised";
        }
        if (props.stacked) {
            className += " stacked";
        }
        if (props.tallStacked) {
            className += " tall stacked";
        }
        if (props.piled) {
            className += " piled";
        }
        if (props.vertical) {
            className += " vertical";
        }
        if (props.loading) {
            className += " loading";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.padded) {
            className += " padded";
        }
        if (props.veryPadded) {
            className += " very padded";
        }
        if (props.compact) {
            className += " compact";
        }
        if (props.circular) {
            className += " circular";
        }
        if (props.clearing) {
            className += " clearing";
        }
        if (props.basic) {
            className += " basic";
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        if (typeof (props.textAlignment) !== "undefined") {
            className += enums_1.TextAlignment.ToClassname(props.textAlignment);
        }
        className += " segment";
        return className;
    }
})(Segment = exports.Segment || (exports.Segment = {}));


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var enums_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(2);
var common_1 = __webpack_require__(5);
var Steps;
(function (Steps) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(steps, common_1.makeIsArgs(isContent), isContent, arg1, arg2);
    }
    Steps.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, steps, ".steps", scope);
    }
    Steps.run = run;
    function steps(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? isContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: getClassname(props, content.length) } }, content.map(stepItem));
    }
    function stepItem(item, i) {
        var icon = item.icon ? item.icon : [];
        var header = item.header ? dom_1.div({ props: { className: "title" } }, item.header) : [];
        var description = item.description ? dom_1.div({ props: { className: "description" } }, item.description) : [];
        var content = [].concat(header, description);
        var children = [].concat(icon, content.length > 0 ? [dom_1.div({ props: { className: "content" } }, content)] : []);
        return item.href
            ? dom_1.a({ props: { id: i, className: getStepClassname(item), href: item.href } }, children)
            : dom_1.div({ props: { id: i, className: getStepClassname(item) } }, children);
    }
    function getClassname(props, length) {
        var className = "ui";
        if (props.vertical) {
            className += " vertical";
        }
        if (props.stackable) {
            className += " stackable";
        }
        if (props.fluid) {
            className += " fluid";
        }
        if (props.equalWidth) {
            className += utils_1.numToText(length);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        className += " steps";
        return className;
    }
    function getStepClassname(item) {
        var className = "";
        if (item.active) {
            className += "active";
        }
        if (item.completed) {
            className += " completed";
        }
        if (item.disabled) {
            className += " disabled";
        }
        if (item.link) {
            className += " link";
        }
        className += " step";
        return className;
    }
    function isContent(obj) {
        return obj instanceof Array;
    }
})(Steps = exports.Steps || (exports.Steps = {}));


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var isolate_1 = __webpack_require__(8);
var xstream_1 = __webpack_require__(0);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Textbox;
(function (Textbox) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(textbox, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1, arg2);
    }
    Textbox.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of([]);
            var evt = function (type) { return sources.DOM.select(".input").events(type); };
            var props$ = sources.props$.remember();
            var value$ = evt("input").map(function (ev) { return ev.target.value; });
            var vtree$ = xstream_1.default.combine(props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return textbox({ props: props, content: content });
            });
            return {
                DOM: vtree$,
                events: evt,
                value$: value$
            };
        }
        if (scope === null) {
            return main(sources);
        }
        var isolatedMain = isolate_1.default(main, scope);
        return isolatedMain(sources);
    }
    Textbox.run = run;
    function textbox(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        var textbox = props.rows
            ? dom_1.textarea({ attrs: { rows: props.rows, readonly: props.readonly, placeholder: props.placeholder }, props: { value: props.value } })
            : dom_1.input({ attrs: { readonly: props.readonly, type: props.type ? props.type : "text", placeholder: props.placeholder }, props: { value: props.value } });
        return props.rightContent
            ? dom_1.div({ props: { className: getClassname(props) } }, [].concat(textbox, content))
            : dom_1.div({ props: { className: getClassname(props) } }, [].concat(content, textbox));
    }
    function getClassname(props) {
        var className = "ui";
        if (props.leftContent) {
            className += " left";
        }
        if (props.rightContent) {
            className += " right";
        }
        if (props.icon) {
            className += " icon";
        }
        if (props.labeled) {
            className += " labeled";
        }
        if (props.action) {
            className += " action";
        }
        if (props.transparent) {
            className += " transparent";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (props.focus) {
            className += " focus";
        }
        if (props.loading) {
            className += " loading";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        className += " input";
        return className;
    }
})(Textbox = exports.Textbox || (exports.Textbox = {}));


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IconType;
(function (IconType) {
    function ToClassname(type) {
        if (typeof (type) === "string") {
            return " " + type;
        }
        if (type < 0) {
            return "";
        }
        var name = IconType[type];
        return " " + name.match(/[A-Z][a-z]+/g).join(" ").toLowerCase();
    }
    IconType.ToClassname = ToClassname;
})(IconType = exports.IconType || (exports.IconType = {}));
(function (IconType) {
    IconType[IconType["Search"] = 0] = "Search";
    IconType[IconType["MailOutline"] = 1] = "MailOutline";
    IconType[IconType["External"] = 2] = "External";
    IconType[IconType["Signal"] = 3] = "Signal";
    IconType[IconType["Setting"] = 4] = "Setting";
    IconType[IconType["Home"] = 5] = "Home";
    IconType[IconType["Inbox"] = 6] = "Inbox";
    IconType[IconType["Browser"] = 7] = "Browser";
    IconType[IconType["Tag"] = 8] = "Tag";
    IconType[IconType["Tags"] = 9] = "Tags";
    IconType[IconType["Calendar"] = 10] = "Calendar";
    IconType[IconType["Comment"] = 11] = "Comment";
    IconType[IconType["Comments"] = 12] = "Comments";
    IconType[IconType["Shop"] = 13] = "Shop";
    IconType[IconType["Privacy"] = 14] = "Privacy";
    IconType[IconType["Settings"] = 15] = "Settings";
    IconType[IconType["Trophy"] = 16] = "Trophy";
    IconType[IconType["Payment"] = 17] = "Payment";
    IconType[IconType["Feed"] = 18] = "Feed";
    IconType[IconType["AlarmOutline"] = 19] = "AlarmOutline";
    IconType[IconType["Tasks"] = 20] = "Tasks";
    IconType[IconType["Cloud"] = 21] = "Cloud";
    IconType[IconType["Lab"] = 22] = "Lab";
    IconType[IconType["Mail"] = 23] = "Mail";
    IconType[IconType["Idea"] = 24] = "Idea";
    IconType[IconType["Dashboard"] = 25] = "Dashboard";
    IconType[IconType["Sitemap"] = 26] = "Sitemap";
    IconType[IconType["Alarm"] = 27] = "Alarm";
    IconType[IconType["Terminal"] = 28] = "Terminal";
    IconType[IconType["Code"] = 29] = "Code";
    IconType[IconType["Protect"] = 30] = "Protect";
    IconType[IconType["CalendarOutline"] = 31] = "CalendarOutline";
    IconType[IconType["Ticket"] = 32] = "Ticket";
    IconType[IconType["ExternalSquare"] = 33] = "ExternalSquare";
    IconType[IconType["Map"] = 34] = "Map";
    IconType[IconType["Bug"] = 35] = "Bug";
    IconType[IconType["MailSquare"] = 36] = "MailSquare";
    IconType[IconType["History"] = 37] = "History";
    IconType[IconType["Options"] = 38] = "Options";
    IconType[IconType["CommentOutline"] = 39] = "CommentOutline";
    IconType[IconType["CommentsOutline"] = 40] = "CommentsOutline";
    IconType[IconType["TextTelephone"] = 41] = "TextTelephone";
    IconType[IconType["Find"] = 42] = "Find";
    IconType[IconType["Wifi"] = 43] = "Wifi";
    IconType[IconType["AlarmSlash"] = 44] = "AlarmSlash";
    IconType[IconType["AlarmSlashOutline"] = 45] = "AlarmSlashOutline";
    IconType[IconType["Copyright"] = 46] = "Copyright";
    IconType[IconType["At"] = 47] = "At";
    IconType[IconType["Eyedropper"] = 48] = "Eyedropper";
    IconType[IconType["PaintBrush"] = 49] = "PaintBrush";
    IconType[IconType["Heartbeat"] = 50] = "Heartbeat";
    IconType[IconType["Download"] = 51] = "Download";
    IconType[IconType["Repeat"] = 52] = "Repeat";
    IconType[IconType["Refresh"] = 53] = "Refresh";
    IconType[IconType["Lock"] = 54] = "Lock";
    IconType[IconType["Bookmark"] = 55] = "Bookmark";
    IconType[IconType["Print"] = 56] = "Print";
    IconType[IconType["Write"] = 57] = "Write";
    IconType[IconType["Theme"] = 58] = "Theme";
    IconType[IconType["Adjust"] = 59] = "Adjust";
    IconType[IconType["Edit"] = 60] = "Edit";
    IconType[IconType["ExternalShare"] = 61] = "ExternalShare";
    IconType[IconType["Ban"] = 62] = "Ban";
    IconType[IconType["MailForward"] = 63] = "MailForward";
    IconType[IconType["Share"] = 64] = "Share";
    IconType[IconType["Expand"] = 65] = "Expand";
    IconType[IconType["Compress"] = 66] = "Compress";
    IconType[IconType["Unhide"] = 67] = "Unhide";
    IconType[IconType["Hide"] = 68] = "Hide";
    IconType[IconType["Random"] = 69] = "Random";
    IconType[IconType["Retweet"] = 70] = "Retweet";
    IconType[IconType["SignOut"] = 71] = "SignOut";
    IconType[IconType["Pin"] = 72] = "Pin";
    IconType[IconType["SignIn"] = 73] = "SignIn";
    IconType[IconType["Upload"] = 74] = "Upload";
    IconType[IconType["Call"] = 75] = "Call";
    IconType[IconType["CallSquare"] = 76] = "CallSquare";
    IconType[IconType["RemoveBookmark"] = 77] = "RemoveBookmark";
    IconType[IconType["Unlock"] = 78] = "Unlock";
    IconType[IconType["Configure"] = 79] = "Configure";
    IconType[IconType["Filter"] = 80] = "Filter";
    IconType[IconType["Wizard"] = 81] = "Wizard";
    IconType[IconType["Undo"] = 82] = "Undo";
    IconType[IconType["Exchange"] = 83] = "Exchange";
    IconType[IconType["CloudDownload"] = 84] = "CloudDownload";
    IconType[IconType["CloudUpload"] = 85] = "CloudUpload";
    IconType[IconType["Reply"] = 86] = "Reply";
    IconType[IconType["ReplyAll"] = 87] = "ReplyAll";
    IconType[IconType["Erase"] = 88] = "Erase";
    IconType[IconType["UnlockAlternate"] = 89] = "UnlockAlternate";
    IconType[IconType["Archive"] = 90] = "Archive";
    IconType[IconType["Translate"] = 91] = "Translate";
    IconType[IconType["Recycle"] = 92] = "Recycle";
    IconType[IconType["Send"] = 93] = "Send";
    IconType[IconType["SendOutline"] = 94] = "SendOutline";
    IconType[IconType["ShareAlternate"] = 95] = "ShareAlternate";
    IconType[IconType["ShareAlternateSquare"] = 96] = "ShareAlternateSquare";
    IconType[IconType["Wait"] = 97] = "Wait";
    IconType[IconType["WriteSquare"] = 98] = "WriteSquare";
    IconType[IconType["ShareSquare"] = 99] = "ShareSquare";
    IconType[IconType["AddToCart"] = 100] = "AddToCart";
    IconType[IconType["InCart"] = 101] = "InCart";
    IconType[IconType["AddUser"] = 102] = "AddUser";
    IconType[IconType["RemoveUser"] = 103] = "RemoveUser";
    IconType[IconType["HelpCircle"] = 104] = "HelpCircle";
    IconType[IconType["InfoCircle"] = 105] = "InfoCircle";
    IconType[IconType["Warning"] = 106] = "Warning";
    IconType[IconType["WarningCircle"] = 107] = "WarningCircle";
    IconType[IconType["WarningSign"] = 108] = "WarningSign";
    IconType[IconType["Help"] = 109] = "Help";
    IconType[IconType["Info"] = 110] = "Info";
    IconType[IconType["Announcement"] = 111] = "Announcement";
    IconType[IconType["Birthday"] = 112] = "Birthday";
    IconType[IconType["Users"] = 113] = "Users";
    IconType[IconType["Doctor"] = 114] = "Doctor";
    IconType[IconType["Child"] = 115] = "Child";
    IconType[IconType["User"] = 116] = "User";
    IconType[IconType["Handicap"] = 117] = "Handicap";
    IconType[IconType["Student"] = 118] = "Student";
    IconType[IconType["Spy"] = 119] = "Spy";
    IconType[IconType["GridLayout"] = 120] = "GridLayout";
    IconType[IconType["ListLayout"] = 121] = "ListLayout";
    IconType[IconType["BlockLayout"] = 122] = "BlockLayout";
    IconType[IconType["Zoom"] = 123] = "Zoom";
    IconType[IconType["ZoomOut"] = 124] = "ZoomOut";
    IconType[IconType["ResizeVertical"] = 125] = "ResizeVertical";
    IconType[IconType["ResizeHorizontal"] = 126] = "ResizeHorizontal";
    IconType[IconType["Maximize"] = 127] = "Maximize";
    IconType[IconType["Crop"] = 128] = "Crop";
    IconType[IconType["Female"] = 129] = "Female";
    IconType[IconType["Male"] = 130] = "Male";
    IconType[IconType["Woman"] = 131] = "Woman";
    IconType[IconType["Man"] = 132] = "Man";
    IconType[IconType["NonBinaryTransgender"] = 133] = "NonBinaryTransgender";
    IconType[IconType["Intergender"] = 134] = "Intergender";
    IconType[IconType["Transgender"] = 135] = "Transgender";
    IconType[IconType["Lesbian"] = 136] = "Lesbian";
    IconType[IconType["Gay"] = 137] = "Gay";
    IconType[IconType["Heterosexual"] = 138] = "Heterosexual";
    IconType[IconType["OtherGender"] = 139] = "OtherGender";
    IconType[IconType["OtherGenderVertical"] = 140] = "OtherGenderVertical";
    IconType[IconType["OtherGenderHorizontal"] = 141] = "OtherGenderHorizontal";
    IconType[IconType["Neuter"] = 142] = "Neuter";
    IconType[IconType["Cocktail"] = 143] = "Cocktail";
    IconType[IconType["Road"] = 144] = "Road";
    IconType[IconType["Flag"] = 145] = "Flag";
    IconType[IconType["Book"] = 146] = "Book";
    IconType[IconType["Gift"] = 147] = "Gift";
    IconType[IconType["Leaf"] = 148] = "Leaf";
    IconType[IconType["Fire"] = 149] = "Fire";
    IconType[IconType["Plane"] = 150] = "Plane";
    IconType[IconType["Magnet"] = 151] = "Magnet";
    IconType[IconType["Legal"] = 152] = "Legal";
    IconType[IconType["Lemon"] = 153] = "Lemon";
    IconType[IconType["World"] = 154] = "World";
    IconType[IconType["Travel"] = 155] = "Travel";
    IconType[IconType["Shipping"] = 156] = "Shipping";
    IconType[IconType["Money"] = 157] = "Money";
    IconType[IconType["Lightning"] = 158] = "Lightning";
    IconType[IconType["Rain"] = 159] = "Rain";
    IconType[IconType["Treatment"] = 160] = "Treatment";
    IconType[IconType["Suitcase"] = 161] = "Suitcase";
    IconType[IconType["Bar"] = 162] = "Bar";
    IconType[IconType["FlagOutline"] = 163] = "FlagOutline";
    IconType[IconType["FlagCheckered"] = 164] = "FlagCheckered";
    IconType[IconType["Puzzle"] = 165] = "Puzzle";
    IconType[IconType["FireExtinguisher"] = 166] = "FireExtinguisher";
    IconType[IconType["Rocket"] = 167] = "Rocket";
    IconType[IconType["Anchor"] = 168] = "Anchor";
    IconType[IconType["Bullseye"] = 169] = "Bullseye";
    IconType[IconType["Sun"] = 170] = "Sun";
    IconType[IconType["Moon"] = 171] = "Moon";
    IconType[IconType["Fax"] = 172] = "Fax";
    IconType[IconType["LifeRing"] = 173] = "LifeRing";
    IconType[IconType["Bomb"] = 174] = "Bomb";
    IconType[IconType["Soccer"] = 175] = "Soccer";
    IconType[IconType["Calculator"] = 176] = "Calculator";
    IconType[IconType["Diamond"] = 177] = "Diamond";
    IconType[IconType["Crosshairs"] = 178] = "Crosshairs";
    IconType[IconType["Asterisk"] = 179] = "Asterisk";
    IconType[IconType["Certificate"] = 180] = "Certificate";
    IconType[IconType["Circle"] = 181] = "Circle";
    IconType[IconType["QuoteLeft"] = 182] = "QuoteLeft";
    IconType[IconType["QuoteRight"] = 183] = "QuoteRight";
    IconType[IconType["EllipsisHorizontal"] = 184] = "EllipsisHorizontal";
    IconType[IconType["EllipsisVertical"] = 185] = "EllipsisVertical";
    IconType[IconType["Cube"] = 186] = "Cube";
    IconType[IconType["Cubes"] = 187] = "Cubes";
    IconType[IconType["CircleNotched"] = 188] = "CircleNotched";
    IconType[IconType["CircleThin"] = 189] = "CircleThin";
    IconType[IconType["SquareOutline"] = 190] = "SquareOutline";
    IconType[IconType["Square"] = 191] = "Square";
    IconType[IconType["Checkmark"] = 192] = "Checkmark";
    IconType[IconType["Remove"] = 193] = "Remove";
    IconType[IconType["CheckmarkBox"] = 194] = "CheckmarkBox";
    IconType[IconType["Move"] = 195] = "Move";
    IconType[IconType["AddCircle"] = 196] = "AddCircle";
    IconType[IconType["MinusCircle"] = 197] = "MinusCircle";
    IconType[IconType["RemoveCircle"] = 198] = "RemoveCircle";
    IconType[IconType["CheckCircle"] = 199] = "CheckCircle";
    IconType[IconType["RemoveCircleOutline"] = 200] = "RemoveCircleOutline";
    IconType[IconType["CheckCircleOutline"] = 201] = "CheckCircleOutline";
    IconType[IconType["Plus"] = 202] = "Plus";
    IconType[IconType["Minus"] = 203] = "Minus";
    IconType[IconType["AddSquare"] = 204] = "AddSquare";
    IconType[IconType["Radio"] = 205] = "Radio";
    IconType[IconType["SelectedRadio"] = 206] = "SelectedRadio";
    IconType[IconType["MinusSquare"] = 207] = "MinusSquare";
    IconType[IconType["MinusSquareOutline"] = 208] = "MinusSquareOutline";
    IconType[IconType["CheckSquare"] = 209] = "CheckSquare";
    IconType[IconType["PlusSquareOutline"] = 210] = "PlusSquareOutline";
    IconType[IconType["ToggleOff"] = 211] = "ToggleOff";
    IconType[IconType["ToggleOn"] = 212] = "ToggleOn";
    IconType[IconType["Film"] = 213] = "Film";
    IconType[IconType["Sound"] = 214] = "Sound";
    IconType[IconType["Photo"] = 215] = "Photo";
    IconType[IconType["BarChart"] = 216] = "BarChart";
    IconType[IconType["CameraRetro"] = 217] = "CameraRetro";
    IconType[IconType["Newspaper"] = 218] = "Newspaper";
    IconType[IconType["AreaChart"] = 219] = "AreaChart";
    IconType[IconType["PieChart"] = 220] = "PieChart";
    IconType[IconType["LineChart"] = 221] = "LineChart";
    IconType[IconType["ArrowCircleOutlineDown"] = 222] = "ArrowCircleOutlineDown";
    IconType[IconType["ArrowCircleOutlineUp"] = 223] = "ArrowCircleOutlineUp";
    IconType[IconType["ChevronLeft"] = 224] = "ChevronLeft";
    IconType[IconType["ChevronRight"] = 225] = "ChevronRight";
    IconType[IconType["ArrowLeft"] = 226] = "ArrowLeft";
    IconType[IconType["ArrowRight"] = 227] = "ArrowRight";
    IconType[IconType["ArrowUp"] = 228] = "ArrowUp";
    IconType[IconType["ArrowDown"] = 229] = "ArrowDown";
    IconType[IconType["ChevronUp"] = 230] = "ChevronUp";
    IconType[IconType["ChevronDown"] = 231] = "ChevronDown";
    IconType[IconType["PointingRight"] = 232] = "PointingRight";
    IconType[IconType["PointingLeft"] = 233] = "PointingLeft";
    IconType[IconType["PointingUp"] = 234] = "PointingUp";
    IconType[IconType["PointingDown"] = 235] = "PointingDown";
    IconType[IconType["ArrowCircleLeft"] = 236] = "ArrowCircleLeft";
    IconType[IconType["ArrowCircleRight"] = 237] = "ArrowCircleRight";
    IconType[IconType["ArrowCircleUp"] = 238] = "ArrowCircleUp";
    IconType[IconType["ArrowCircleDown"] = 239] = "ArrowCircleDown";
    IconType[IconType["CaretDown"] = 240] = "CaretDown";
    IconType[IconType["CaretUp"] = 241] = "CaretUp";
    IconType[IconType["CaretLeft"] = 242] = "CaretLeft";
    IconType[IconType["CaretRight"] = 243] = "CaretRight";
    IconType[IconType["AngleDoubleLeft"] = 244] = "AngleDoubleLeft";
    IconType[IconType["AngleDoubleRight"] = 245] = "AngleDoubleRight";
    IconType[IconType["AngleDoubleUp"] = 246] = "AngleDoubleUp";
    IconType[IconType["AngleDoubleDown"] = 247] = "AngleDoubleDown";
    IconType[IconType["AngleLeft"] = 248] = "AngleLeft";
    IconType[IconType["AngleRight"] = 249] = "AngleRight";
    IconType[IconType["AngleUp"] = 250] = "AngleUp";
    IconType[IconType["AngleDown"] = 251] = "AngleDown";
    IconType[IconType["ChevronCircleLeft"] = 252] = "ChevronCircleLeft";
    IconType[IconType["ChevronCircleRight"] = 253] = "ChevronCircleRight";
    IconType[IconType["ChevronCircleUp"] = 254] = "ChevronCircleUp";
    IconType[IconType["ChevronCircleDown"] = 255] = "ChevronCircleDown";
    IconType[IconType["ToggleDown"] = 256] = "ToggleDown";
    IconType[IconType["ToggleUp"] = 257] = "ToggleUp";
    IconType[IconType["ToggleRight"] = 258] = "ToggleRight";
    IconType[IconType["LongArrowDown"] = 259] = "LongArrowDown";
    IconType[IconType["LongArrowUp"] = 260] = "LongArrowUp";
    IconType[IconType["LongArrowLeft"] = 261] = "LongArrowLeft";
    IconType[IconType["LongArrowRight"] = 262] = "LongArrowRight";
    IconType[IconType["ArrowCircleOutlineRight"] = 263] = "ArrowCircleOutlineRight";
    IconType[IconType["ArrowCircleOutlineLeft"] = 264] = "ArrowCircleOutlineLeft";
    IconType[IconType["ToggleLeft"] = 265] = "ToggleLeft";
    IconType[IconType["Power"] = 266] = "Power";
    IconType[IconType["Trash"] = 267] = "Trash";
    IconType[IconType["TrashOutline"] = 268] = "TrashOutline";
    IconType[IconType["DiskOutline"] = 269] = "DiskOutline";
    IconType[IconType["Desktop"] = 270] = "Desktop";
    IconType[IconType["Laptop"] = 271] = "Laptop";
    IconType[IconType["Tablet"] = 272] = "Tablet";
    IconType[IconType["Mobile"] = 273] = "Mobile";
    IconType[IconType["Game"] = 274] = "Game";
    IconType[IconType["Keyboard"] = 275] = "Keyboard";
    IconType[IconType["Plug"] = 276] = "Plug";
    IconType[IconType["Folder"] = 277] = "Folder";
    IconType[IconType["FolderOpen"] = 278] = "FolderOpen";
    IconType[IconType["LevelUp"] = 279] = "LevelUp";
    IconType[IconType["LevelDown"] = 280] = "LevelDown";
    IconType[IconType["File"] = 281] = "File";
    IconType[IconType["FileOutline"] = 282] = "FileOutline";
    IconType[IconType["FileText"] = 283] = "FileText";
    IconType[IconType["FileTextOutline"] = 284] = "FileTextOutline";
    IconType[IconType["FolderOutline"] = 285] = "FolderOutline";
    IconType[IconType["FolderOpenOutline"] = 286] = "FolderOpenOutline";
    IconType[IconType["FilePdfOutline"] = 287] = "FilePdfOutline";
    IconType[IconType["FileWordOutline"] = 288] = "FileWordOutline";
    IconType[IconType["FileExcelOutline"] = 289] = "FileExcelOutline";
    IconType[IconType["FilePowerpointOutline"] = 290] = "FilePowerpointOutline";
    IconType[IconType["FileImageOutline"] = 291] = "FileImageOutline";
    IconType[IconType["FileArchiveOutline"] = 292] = "FileArchiveOutline";
    IconType[IconType["FileAudioOutline"] = 293] = "FileAudioOutline";
    IconType[IconType["FileVideoOutline"] = 294] = "FileVideoOutline";
    IconType[IconType["FileCodeOutline"] = 295] = "FileCodeOutline";
    IconType[IconType["Barcode"] = 296] = "Barcode";
    IconType[IconType["Qrcode"] = 297] = "Qrcode";
    IconType[IconType["Fork"] = 298] = "Fork";
    IconType[IconType["Html5"] = 299] = "Html5";
    IconType[IconType["Css3"] = 300] = "Css3";
    IconType[IconType["Rss"] = 301] = "Rss";
    IconType[IconType["RssSquare"] = 302] = "RssSquare";
    IconType[IconType["Openid"] = 303] = "Openid";
    IconType[IconType["Database"] = 304] = "Database";
    IconType[IconType["Server"] = 305] = "Server";
    IconType[IconType["Heart"] = 306] = "Heart";
    IconType[IconType["Star"] = 307] = "Star";
    IconType[IconType["EmptyStar"] = 308] = "EmptyStar";
    IconType[IconType["ThumbsOutlineUp"] = 309] = "ThumbsOutlineUp";
    IconType[IconType["ThumbsOutlineDown"] = 310] = "ThumbsOutlineDown";
    IconType[IconType["StarHalf"] = 311] = "StarHalf";
    IconType[IconType["EmptyHeart"] = 312] = "EmptyHeart";
    IconType[IconType["Smile"] = 313] = "Smile";
    IconType[IconType["Frown"] = 314] = "Frown";
    IconType[IconType["Meh"] = 315] = "Meh";
    IconType[IconType["StarHalfEmpty"] = 316] = "StarHalfEmpty";
    IconType[IconType["ThumbsUp"] = 317] = "ThumbsUp";
    IconType[IconType["ThumbsDown"] = 318] = "ThumbsDown";
    IconType[IconType["Music"] = 319] = "Music";
    IconType[IconType["VideoPlayOutline"] = 320] = "VideoPlayOutline";
    IconType[IconType["VolumeOff"] = 321] = "VolumeOff";
    IconType[IconType["VolumeDown"] = 322] = "VolumeDown";
    IconType[IconType["VolumeUp"] = 323] = "VolumeUp";
    IconType[IconType["Record"] = 324] = "Record";
    IconType[IconType["StepBackward"] = 325] = "StepBackward";
    IconType[IconType["FastBackward"] = 326] = "FastBackward";
    IconType[IconType["Backward"] = 327] = "Backward";
    IconType[IconType["Play"] = 328] = "Play";
    IconType[IconType["Pause"] = 329] = "Pause";
    IconType[IconType["Stop"] = 330] = "Stop";
    IconType[IconType["Forward"] = 331] = "Forward";
    IconType[IconType["FastForward"] = 332] = "FastForward";
    IconType[IconType["StepForward"] = 333] = "StepForward";
    IconType[IconType["Eject"] = 334] = "Eject";
    IconType[IconType["Unmute"] = 335] = "Unmute";
    IconType[IconType["Mute"] = 336] = "Mute";
    IconType[IconType["VideoPlay"] = 337] = "VideoPlay";
    IconType[IconType["ClosedCaptioning"] = 338] = "ClosedCaptioning";
    IconType[IconType["Marker"] = 339] = "Marker";
    IconType[IconType["Coffee"] = 340] = "Coffee";
    IconType[IconType["Food"] = 341] = "Food";
    IconType[IconType["BuildingOutline"] = 342] = "BuildingOutline";
    IconType[IconType["Hospital"] = 343] = "Hospital";
    IconType[IconType["Emergency"] = 344] = "Emergency";
    IconType[IconType["FirstAid"] = 345] = "FirstAid";
    IconType[IconType["Military"] = 346] = "Military";
    IconType[IconType["H"] = 347] = "H";
    IconType[IconType["LocationArrow"] = 348] = "LocationArrow";
    IconType[IconType["SpaceShuttle"] = 349] = "SpaceShuttle";
    IconType[IconType["University"] = 350] = "University";
    IconType[IconType["Building"] = 351] = "Building";
    IconType[IconType["Paw"] = 352] = "Paw";
    IconType[IconType["Spoon"] = 353] = "Spoon";
    IconType[IconType["Car"] = 354] = "Car";
    IconType[IconType["Taxi"] = 355] = "Taxi";
    IconType[IconType["Tree"] = 356] = "Tree";
    IconType[IconType["Bicycle"] = 357] = "Bicycle";
    IconType[IconType["Bus"] = 358] = "Bus";
    IconType[IconType["Ship"] = 359] = "Ship";
    IconType[IconType["Motorcycle"] = 360] = "Motorcycle";
    IconType[IconType["StreetView"] = 361] = "StreetView";
    IconType[IconType["Hotel"] = 362] = "Hotel";
    IconType[IconType["Train"] = 363] = "Train";
    IconType[IconType["Subway"] = 364] = "Subway";
    IconType[IconType["Table"] = 365] = "Table";
    IconType[IconType["Columns"] = 366] = "Columns";
    IconType[IconType["Sort"] = 367] = "Sort";
    IconType[IconType["SortAscending"] = 368] = "SortAscending";
    IconType[IconType["SortDescending"] = 369] = "SortDescending";
    IconType[IconType["SortAlphabetAscending"] = 370] = "SortAlphabetAscending";
    IconType[IconType["SortAlphabetDescending"] = 371] = "SortAlphabetDescending";
    IconType[IconType["SortContentAscending"] = 372] = "SortContentAscending";
    IconType[IconType["SortContentDescending"] = 373] = "SortContentDescending";
    IconType[IconType["SortNumericAscending"] = 374] = "SortNumericAscending";
    IconType[IconType["SortNumericDescending"] = 375] = "SortNumericDescending";
    IconType[IconType["Font"] = 376] = "Font";
    IconType[IconType["Bold"] = 377] = "Bold";
    IconType[IconType["Italic"] = 378] = "Italic";
    IconType[IconType["TextHeight"] = 379] = "TextHeight";
    IconType[IconType["TextWidth"] = 380] = "TextWidth";
    IconType[IconType["AlignLeft"] = 381] = "AlignLeft";
    IconType[IconType["AlignCenter"] = 382] = "AlignCenter";
    IconType[IconType["AlignRight"] = 383] = "AlignRight";
    IconType[IconType["AlignJustify"] = 384] = "AlignJustify";
    IconType[IconType["List"] = 385] = "List";
    IconType[IconType["Outdent"] = 386] = "Outdent";
    IconType[IconType["Indent"] = 387] = "Indent";
    IconType[IconType["Linkify"] = 388] = "Linkify";
    IconType[IconType["Cut"] = 389] = "Cut";
    IconType[IconType["Copy"] = 390] = "Copy";
    IconType[IconType["Attach"] = 391] = "Attach";
    IconType[IconType["Save"] = 392] = "Save";
    IconType[IconType["Content"] = 393] = "Content";
    IconType[IconType["UnorderedList"] = 394] = "UnorderedList";
    IconType[IconType["OrderedList"] = 395] = "OrderedList";
    IconType[IconType["Strikethrough"] = 396] = "Strikethrough";
    IconType[IconType["Underline"] = 397] = "Underline";
    IconType[IconType["Paste"] = 398] = "Paste";
    IconType[IconType["Unlink"] = 399] = "Unlink";
    IconType[IconType["Superscript"] = 400] = "Superscript";
    IconType[IconType["Subscript"] = 401] = "Subscript";
    IconType[IconType["Header"] = 402] = "Header";
    IconType[IconType["Paragraph"] = 403] = "Paragraph";
    IconType[IconType["Euro"] = 404] = "Euro";
    IconType[IconType["Pound"] = 405] = "Pound";
    IconType[IconType["Dollar"] = 406] = "Dollar";
    IconType[IconType["Rupee"] = 407] = "Rupee";
    IconType[IconType["Yen"] = 408] = "Yen";
    IconType[IconType["Ruble"] = 409] = "Ruble";
    IconType[IconType["Won"] = 410] = "Won";
    IconType[IconType["Lira"] = 411] = "Lira";
    IconType[IconType["Shekel"] = 412] = "Shekel";
    IconType[IconType["Paypal"] = 413] = "Paypal";
    IconType[IconType["PaypalCard"] = 414] = "PaypalCard";
    IconType[IconType["GoogleWallet"] = 415] = "GoogleWallet";
    IconType[IconType["Visa"] = 416] = "Visa";
    IconType[IconType["Mastercard"] = 417] = "Mastercard";
    IconType[IconType["Discover"] = 418] = "Discover";
    IconType[IconType["AmericanExpress"] = 419] = "AmericanExpress";
    IconType[IconType["Stripe"] = 420] = "Stripe";
    IconType[IconType["TwitterSquare"] = 421] = "TwitterSquare";
    IconType[IconType["FacebookSquare"] = 422] = "FacebookSquare";
    IconType[IconType["LinkedinSquare"] = 423] = "LinkedinSquare";
    IconType[IconType["GithubSquare"] = 424] = "GithubSquare";
    IconType[IconType["Twitter"] = 425] = "Twitter";
    IconType[IconType["Facebook"] = 426] = "Facebook";
    IconType[IconType["Github"] = 427] = "Github";
    IconType[IconType["Pinterest"] = 428] = "Pinterest";
    IconType[IconType["PinterestSquare"] = 429] = "PinterestSquare";
    IconType[IconType["GooglePlusSquare"] = 430] = "GooglePlusSquare";
    IconType[IconType["GooglePlus"] = 431] = "GooglePlus";
    IconType[IconType["Linkedin"] = 432] = "Linkedin";
    IconType[IconType["GithubAlternate"] = 433] = "GithubAlternate";
    IconType[IconType["Maxcdn"] = 434] = "Maxcdn";
    IconType[IconType["Bitcoin"] = 435] = "Bitcoin";
    IconType[IconType["YoutubeSquare"] = 436] = "YoutubeSquare";
    IconType[IconType["Youtube"] = 437] = "Youtube";
    IconType[IconType["Xing"] = 438] = "Xing";
    IconType[IconType["XingSquare"] = 439] = "XingSquare";
    IconType[IconType["YoutubePlay"] = 440] = "YoutubePlay";
    IconType[IconType["Dropbox"] = 441] = "Dropbox";
    IconType[IconType["StackOverflow"] = 442] = "StackOverflow";
    IconType[IconType["Instagram"] = 443] = "Instagram";
    IconType[IconType["Flickr"] = 444] = "Flickr";
    IconType[IconType["Adn"] = 445] = "Adn";
    IconType[IconType["Bitbucket"] = 446] = "Bitbucket";
    IconType[IconType["BitbucketSquare"] = 447] = "BitbucketSquare";
    IconType[IconType["Tumblr"] = 448] = "Tumblr";
    IconType[IconType["TumblrSquare"] = 449] = "TumblrSquare";
    IconType[IconType["Apple"] = 450] = "Apple";
    IconType[IconType["Windows"] = 451] = "Windows";
    IconType[IconType["Android"] = 452] = "Android";
    IconType[IconType["Linux"] = 453] = "Linux";
    IconType[IconType["Dribbble"] = 454] = "Dribbble";
    IconType[IconType["Skype"] = 455] = "Skype";
    IconType[IconType["Foursquare"] = 456] = "Foursquare";
    IconType[IconType["Trello"] = 457] = "Trello";
    IconType[IconType["Gittip"] = 458] = "Gittip";
    IconType[IconType["Vk"] = 459] = "Vk";
    IconType[IconType["Weibo"] = 460] = "Weibo";
    IconType[IconType["Renren"] = 461] = "Renren";
    IconType[IconType["Pagelines"] = 462] = "Pagelines";
    IconType[IconType["StackExchange"] = 463] = "StackExchange";
    IconType[IconType["Vimeo"] = 464] = "Vimeo";
    IconType[IconType["Slack"] = 465] = "Slack";
    IconType[IconType["Wordpress"] = 466] = "Wordpress";
    IconType[IconType["Yahoo"] = 467] = "Yahoo";
    IconType[IconType["Google"] = 468] = "Google";
    IconType[IconType["Reddit"] = 469] = "Reddit";
    IconType[IconType["RedditSquare"] = 470] = "RedditSquare";
    IconType[IconType["StumbleuponCircle"] = 471] = "StumbleuponCircle";
    IconType[IconType["Stumbleupon"] = 472] = "Stumbleupon";
    IconType[IconType["Delicious"] = 473] = "Delicious";
    IconType[IconType["Digg"] = 474] = "Digg";
    IconType[IconType["PiedPiper"] = 475] = "PiedPiper";
    IconType[IconType["PiedPiperAlternate"] = 476] = "PiedPiperAlternate";
    IconType[IconType["Drupal"] = 477] = "Drupal";
    IconType[IconType["Joomla"] = 478] = "Joomla";
    IconType[IconType["Behance"] = 479] = "Behance";
    IconType[IconType["BehanceSquare"] = 480] = "BehanceSquare";
    IconType[IconType["Steam"] = 481] = "Steam";
    IconType[IconType["SteamSquare"] = 482] = "SteamSquare";
    IconType[IconType["Spotify"] = 483] = "Spotify";
    IconType[IconType["Deviantart"] = 484] = "Deviantart";
    IconType[IconType["Soundcloud"] = 485] = "Soundcloud";
    IconType[IconType["Vine"] = 486] = "Vine";
    IconType[IconType["Codepen"] = 487] = "Codepen";
    IconType[IconType["Jsfiddle"] = 488] = "Jsfiddle";
    IconType[IconType["Rebel"] = 489] = "Rebel";
    IconType[IconType["Empire"] = 490] = "Empire";
    IconType[IconType["GitSquare"] = 491] = "GitSquare";
    IconType[IconType["Git"] = 492] = "Git";
    IconType[IconType["HackerNews"] = 493] = "HackerNews";
    IconType[IconType["TencentWeibo"] = 494] = "TencentWeibo";
    IconType[IconType["Qq"] = 495] = "Qq";
    IconType[IconType["Wechat"] = 496] = "Wechat";
    IconType[IconType["Slideshare"] = 497] = "Slideshare";
    IconType[IconType["Twitch"] = 498] = "Twitch";
    IconType[IconType["Yelp"] = 499] = "Yelp";
    IconType[IconType["Lastfm"] = 500] = "Lastfm";
    IconType[IconType["LastfmSquare"] = 501] = "LastfmSquare";
    IconType[IconType["Ioxhost"] = 502] = "Ioxhost";
    IconType[IconType["Angellist"] = 503] = "Angellist";
    IconType[IconType["Meanpath"] = 504] = "Meanpath";
    IconType[IconType["Buysellads"] = 505] = "Buysellads";
    IconType[IconType["Connectdevelop"] = 506] = "Connectdevelop";
    IconType[IconType["Dashcube"] = 507] = "Dashcube";
    IconType[IconType["Forumbee"] = 508] = "Forumbee";
    IconType[IconType["Leanpub"] = 509] = "Leanpub";
    IconType[IconType["Sellsy"] = 510] = "Sellsy";
    IconType[IconType["Shirtsinbulk"] = 511] = "Shirtsinbulk";
    IconType[IconType["Simplybuilt"] = 512] = "Simplybuilt";
    IconType[IconType["Skyatlas"] = 513] = "Skyatlas";
    IconType[IconType["Whatsapp"] = 514] = "Whatsapp";
    IconType[IconType["Viacoin"] = 515] = "Viacoin";
    IconType[IconType["Medium"] = 516] = "Medium";
    IconType[IconType["Like"] = 517] = "Like";
    IconType[IconType["Favorite"] = 518] = "Favorite";
    IconType[IconType["Video"] = 519] = "Video";
    IconType[IconType["Check"] = 520] = "Check";
    IconType[IconType["Close"] = 521] = "Close";
    IconType[IconType["Cancel"] = 522] = "Cancel";
    IconType[IconType["Delete"] = 523] = "Delete";
    IconType[IconType["X"] = 524] = "X";
    IconType[IconType["UserTimes"] = 525] = "UserTimes";
    IconType[IconType["UserClose"] = 526] = "UserClose";
    IconType[IconType["UserCancel"] = 527] = "UserCancel";
    IconType[IconType["UserDelete"] = 528] = "UserDelete";
    IconType[IconType["UserX"] = 529] = "UserX";
    IconType[IconType["ZoomIn"] = 530] = "ZoomIn";
    IconType[IconType["Magnify"] = 531] = "Magnify";
    IconType[IconType["Shutdown"] = 532] = "Shutdown";
    IconType[IconType["Clock"] = 533] = "Clock";
    IconType[IconType["Time"] = 534] = "Time";
    IconType[IconType["PlayCircleOutline"] = 535] = "PlayCircleOutline";
    IconType[IconType["Headphone"] = 536] = "Headphone";
    IconType[IconType["Camera"] = 537] = "Camera";
    IconType[IconType["VideoCamera"] = 538] = "VideoCamera";
    IconType[IconType["Picture"] = 539] = "Picture";
    IconType[IconType["Pencil"] = 540] = "Pencil";
    IconType[IconType["Compose"] = 541] = "Compose";
    IconType[IconType["Point"] = 542] = "Point";
    IconType[IconType["Tint"] = 543] = "Tint";
    IconType[IconType["Signup"] = 544] = "Signup";
    IconType[IconType["PlusCircle"] = 545] = "PlusCircle";
    IconType[IconType["Dont"] = 546] = "Dont";
    IconType[IconType["Minimize"] = 547] = "Minimize";
    IconType[IconType["Add"] = 548] = "Add";
    IconType[IconType["Eye"] = 549] = "Eye";
    IconType[IconType["Attention"] = 550] = "Attention";
    IconType[IconType["Cart"] = 551] = "Cart";
    IconType[IconType["Shuffle"] = 552] = "Shuffle";
    IconType[IconType["Talk"] = 553] = "Talk";
    IconType[IconType["Chat"] = 554] = "Chat";
    IconType[IconType["ShoppingCart"] = 555] = "ShoppingCart";
    IconType[IconType["BarGraph"] = 556] = "BarGraph";
    IconType[IconType["AreaGraph"] = 557] = "AreaGraph";
    IconType[IconType["PieGraph"] = 558] = "PieGraph";
    IconType[IconType["LineGraph"] = 559] = "LineGraph";
    IconType[IconType["Key"] = 560] = "Key";
    IconType[IconType["Cogs"] = 561] = "Cogs";
    IconType[IconType["Discussions"] = 562] = "Discussions";
    IconType[IconType["LikeOutline"] = 563] = "LikeOutline";
    IconType[IconType["DislikeOutline"] = 564] = "DislikeOutline";
    IconType[IconType["HeartOutline"] = 565] = "HeartOutline";
    IconType[IconType["LogOut"] = 566] = "LogOut";
    IconType[IconType["ThumbTack"] = 567] = "ThumbTack";
    IconType[IconType["Winner"] = 568] = "Winner";
    IconType[IconType["BookmarkOutline"] = 569] = "BookmarkOutline";
    IconType[IconType["Phone"] = 570] = "Phone";
    IconType[IconType["PhoneSquare"] = 571] = "PhoneSquare";
    IconType[IconType["CreditCard"] = 572] = "CreditCard";
    IconType[IconType["HddOutline"] = 573] = "HddOutline";
    IconType[IconType["Bullhorn"] = 574] = "Bullhorn";
    IconType[IconType["Bell"] = 575] = "Bell";
    IconType[IconType["BellOutline"] = 576] = "BellOutline";
    IconType[IconType["BellSlash"] = 577] = "BellSlash";
    IconType[IconType["BellSlashOutline"] = 578] = "BellSlashOutline";
    IconType[IconType["HandOutlineRight"] = 579] = "HandOutlineRight";
    IconType[IconType["HandOutlineLeft"] = 580] = "HandOutlineLeft";
    IconType[IconType["HandOutlineUp"] = 581] = "HandOutlineUp";
    IconType[IconType["HandOutlineDown"] = 582] = "HandOutlineDown";
    IconType[IconType["Globe"] = 583] = "Globe";
    IconType[IconType["Wrench"] = 584] = "Wrench";
    IconType[IconType["Briefcase"] = 585] = "Briefcase";
    IconType[IconType["Group"] = 586] = "Group";
    IconType[IconType["Flask"] = 587] = "Flask";
    IconType[IconType["Sidebar"] = 588] = "Sidebar";
    IconType[IconType["Bars"] = 589] = "Bars";
    IconType[IconType["ListUl"] = 590] = "ListUl";
    IconType[IconType["ListOl"] = 591] = "ListOl";
    IconType[IconType["NumberedList"] = 592] = "NumberedList";
    IconType[IconType["Magic"] = 593] = "Magic";
    IconType[IconType["Truck"] = 594] = "Truck";
    IconType[IconType["Currency"] = 595] = "Currency";
    IconType[IconType["TriangleDown"] = 596] = "TriangleDown";
    IconType[IconType["Dropdown"] = 597] = "Dropdown";
    IconType[IconType["TriangleUp"] = 598] = "TriangleUp";
    IconType[IconType["TriangleLeft"] = 599] = "TriangleLeft";
    IconType[IconType["TriangleRight"] = 600] = "TriangleRight";
    IconType[IconType["Envelope"] = 601] = "Envelope";
    IconType[IconType["Conversation"] = 602] = "Conversation";
    IconType[IconType["Umbrella"] = 603] = "Umbrella";
    IconType[IconType["Clipboard"] = 604] = "Clipboard";
    IconType[IconType["Lightbulb"] = 605] = "Lightbulb";
    IconType[IconType["Ambulance"] = 606] = "Ambulance";
    IconType[IconType["Medkit"] = 607] = "Medkit";
    IconType[IconType["FighterJet"] = 608] = "FighterJet";
    IconType[IconType["Beer"] = 609] = "Beer";
    IconType[IconType["PlusSquare"] = 610] = "PlusSquare";
    IconType[IconType["Computer"] = 611] = "Computer";
    IconType[IconType["CircleOutline"] = 612] = "CircleOutline";
    IconType[IconType["Intersex"] = 613] = "Intersex";
    IconType[IconType["Asexual"] = 614] = "Asexual";
    IconType[IconType["Spinner"] = 615] = "Spinner";
    IconType[IconType["Gamepad"] = 616] = "Gamepad";
    IconType[IconType["StarHalfFull"] = 617] = "StarHalfFull";
    IconType[IconType["Question"] = 618] = "Question";
    IconType[IconType["Eraser"] = 619] = "Eraser";
    IconType[IconType["Microphone"] = 620] = "Microphone";
    IconType[IconType["MicrophoneSlash"] = 621] = "MicrophoneSlash";
    IconType[IconType["Shield"] = 622] = "Shield";
    IconType[IconType["Target"] = 623] = "Target";
    IconType[IconType["PlayCircle"] = 624] = "PlayCircle";
    IconType[IconType["PencilSquare"] = 625] = "PencilSquare";
    IconType[IconType["Compass"] = 626] = "Compass";
    IconType[IconType["Amex"] = 627] = "Amex";
    IconType[IconType["Eur"] = 628] = "Eur";
    IconType[IconType["Gbp"] = 629] = "Gbp";
    IconType[IconType["Usd"] = 630] = "Usd";
    IconType[IconType["Inr"] = 631] = "Inr";
    IconType[IconType["Cny"] = 632] = "Cny";
    IconType[IconType["Rmb"] = 633] = "Rmb";
    IconType[IconType["Jpy"] = 634] = "Jpy";
    IconType[IconType["Rouble"] = 635] = "Rouble";
    IconType[IconType["Rub"] = 636] = "Rub";
    IconType[IconType["Krw"] = 637] = "Krw";
    IconType[IconType["Btc"] = 638] = "Btc";
    IconType[IconType["Sheqel"] = 639] = "Sheqel";
    IconType[IconType["Ils"] = 640] = "Ils";
    IconType[IconType["Try"] = 641] = "Try";
    IconType[IconType["Zip"] = 642] = "Zip";
    IconType[IconType["DotCircleOutline"] = 643] = "DotCircleOutline";
    IconType[IconType["Sliders"] = 644] = "Sliders";
    IconType[IconType["Wi"] = 645] = "Wi";
    IconType[IconType["Graduation"] = 646] = "Graduation";
    IconType[IconType["Weixin"] = 647] = "Weixin";
    IconType[IconType["Binoculars"] = 648] = "Binoculars";
    IconType[IconType["Gratipay"] = 649] = "Gratipay";
    IconType[IconType["Genderless"] = 650] = "Genderless";
    IconType[IconType["Teletype"] = 651] = "Teletype";
    IconType[IconType["PowerCord"] = 652] = "PowerCord";
    IconType[IconType["Tty"] = 653] = "Tty";
    IconType[IconType["Cc"] = 654] = "Cc";
    IconType[IconType["PlusCart"] = 655] = "PlusCart";
    IconType[IconType["ArrowDownCart"] = 656] = "ArrowDownCart";
    IconType[IconType["Detective"] = 657] = "Detective";
    IconType[IconType["Venus"] = 658] = "Venus";
    IconType[IconType["Mars"] = 659] = "Mars";
    IconType[IconType["Mercury"] = 660] = "Mercury";
    IconType[IconType["VenusDouble"] = 661] = "VenusDouble";
    IconType[IconType["FemaleHomosexual"] = 662] = "FemaleHomosexual";
    IconType[IconType["MarsDouble"] = 663] = "MarsDouble";
    IconType[IconType["MaleHomosexual"] = 664] = "MaleHomosexual";
    IconType[IconType["VenusMars"] = 665] = "VenusMars";
    IconType[IconType["MarsStroke"] = 666] = "MarsStroke";
    IconType[IconType["MarsAlternate"] = 667] = "MarsAlternate";
    IconType[IconType["MarsVertical"] = 668] = "MarsVertical";
    IconType[IconType["MarsHorizontal"] = 669] = "MarsHorizontal";
    IconType[IconType["MarsStrokeVertical"] = 670] = "MarsStrokeVertical";
    IconType[IconType["MarsStrokeHorizontal"] = 671] = "MarsStrokeHorizontal";
    IconType[IconType["FacebookOfficial"] = 672] = "FacebookOfficial";
    IconType[IconType["PinterestOfficial"] = 673] = "PinterestOfficial";
    IconType[IconType["Bed"] = 674] = "Bed";
})(IconType = exports.IconType || (exports.IconType = {}));


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Checkbox;
(function (Checkbox) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(checkbox, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1, arg2);
    }
    Checkbox.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        function main(sources) {
            sources.props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            sources.content$ = sources.content$ ? sources.content$ : xstream_1.default.of("");
            var evt = function (type) { return sources.DOM.select(".checkbox").events(type); };
            var props$ = sources.props$.remember();
            var vTree$ = xstream_1.default.combine(props$, sources.content$).map(function (_a) {
                var props = _a[0], content = _a[1];
                return checkbox({ props: props, content: content });
            });
            var value$ = evt("click").map(function (evt) { return evt.srcElement.checked; });
            return {
                DOM: vTree$,
                events: evt,
                value$: value$
            };
        }
        if (scope === null) {
            return main(sources);
        }
        var isolatedMain = isolate_1.default(main, scope);
        return isolatedMain(sources);
    }
    Checkbox.run = run;
    function checkbox(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: getClassName(props) } }, [
            dom_1.input({
                props: {
                    type: props.radio ? "radio" : "checkbox",
                    name: props.name,
                    checked: props.checked,
                    disabled: props.readonly || props.disabled
                }
            }),
            dom_1.label({ props: { for: props.name } }, props.fitted ? "" : content)
        ]);
    }
    function getClassName(props) {
        var className = "ui";
        if (props.readonly) {
            className += " read-only";
        }
        if (props.checked) {
            className += " checked";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.fitted) {
            className += " fitted";
        }
        if (props.radio) {
            className += " radio";
        }
        if (props.toggle) {
            className += " toggle";
        }
        if (props.slider) {
            className += " slider";
        }
        return className + " checkbox";
    }
})(Checkbox = exports.Checkbox || (exports.Checkbox = {}));


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(8);
var delay_1 = __webpack_require__(36);
var dom_1 = __webpack_require__(1);
var common_1 = __webpack_require__(57);
var menu_1 = __webpack_require__(34);
var icon_1 = __webpack_require__(19);
var transition_1 = __webpack_require__(12);
var enums_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(2);
function run(sources, scope) {
    if (scope === void 0) { scope = utils_1.getScope(); }
    function main(sources) {
        /*** Main streams ***/
        var evt = function (type) { return sources.DOM.select(".dropdown").events(type); };
        var content$ = sources.content$ ? sources.content$.map(function (c) { return c instanceof Array ? c : c.main; }) : xstream_1.default.of([]);
        var props$ = sources.props$ ? sources.props$.remember() : xstream_1.default.of({});
        var value$proxy = xstream_1.default.create();
        var initialValue$ = props$.map(function (props) { return props.initial; }).remember();
        var value$ = initialValue$.map(function (value) { return value$proxy.startWith(value); }).flatten().remember();
        var menuItems$ = xstream_1.default.combine(content$, value$).map(function (_a) {
            var content = _a[0], value = _a[1];
            return content.map(function (item) { return item.value === value ? Object.assign({}, item, { active: true }) : item; });
        }).remember();
        var activeItem$ = menuItems$.map(function (content) { return content.filter(function (item) { return item.active; })[0]; });
        var menu = menu_1.Menu.run({ DOM: sources.DOM, props$: xstream_1.default.of({ submenu: true }), content$: menuItems$ }, scope);
        value$proxy.imitate(menu.value$.map(function (item) { return item.value; }));
        var transition$ = common_1.createTransition$(evt, sources.args);
        var active$ = xstream_1.default.merge(transition$.filter(function (x) { return x.direction === enums_1.Direction.In; }).mapTo(true), transition$.filter(function (x) { return x.direction === enums_1.Direction.Out; }).compose(delay_1.default(250)).mapTo(false));
        var animatedMenu = transition_1.Transition.run({ DOM: sources.DOM, target$: menu.DOM, transition$: transition$ }, scope);
        var vTree$ = xstream_1.default.combine(props$, active$, animatedMenu.DOM, activeItem$).map(function (_a) {
            var props = _a[0], isActive = _a[1], menu = _a[2], activeItem = _a[3];
            return dom_1.div({ props: { className: common_1.getClassName(isActive ? "ui active" : "ui", props) } }, [].concat(common_1.getText(activeItem, props, sources.args && sources.args.static), !props.simple ? icon_1.Icon.render(enums_1.IconType.Dropdown) : [], menu));
        });
        return {
            DOM: vTree$,
            events: function (type) { return xstream_1.default.merge(evt(type), menu.events(type), animatedMenu.events(type)); },
            value$: menu.value$.map(function (item) { return item.value; })
        };
    }
    if (scope === null) {
        return main(sources);
    }
    var isolatedMain = isolate_1.default(main, scope);
    return isolatedMain(sources);
}
exports.default = run;


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(2);
var searchdropdown_1 = __webpack_require__(211);
var dropdown_1 = __webpack_require__(209);
var Dropdown;
(function (Dropdown) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        if (sources.args && sources.args.search) {
            return searchdropdown_1.default(sources, scope);
        }
        else {
            return dropdown_1.default(sources, scope);
        }
    }
    Dropdown.run = run;
})(Dropdown = exports.Dropdown || (exports.Dropdown = {}));


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(8);
var delay_1 = __webpack_require__(36);
var dom_1 = __webpack_require__(1);
var common_1 = __webpack_require__(57);
var menu_1 = __webpack_require__(34);
var icon_1 = __webpack_require__(19);
var transition_1 = __webpack_require__(12);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(2);
function run(sources, scope) {
    if (scope === void 0) { scope = utils_1.getScope(); }
    function main(sources) {
        /*** Main streams ***/
        var evt = function (type) { return sources.DOM.select(".dropdown").events(type); };
        var content$ = (sources.content$ ? sources.content$.map(function (c) { return c instanceof Array ? c : c.main; }) : xstream_1.default.of([]));
        var props$ = (sources.props$ ? sources.props$.remember() : xstream_1.default.of({}));
        var value$proxy = xstream_1.default.create();
        var initialValue$ = props$.map(function (props) { return props.initial; }).remember();
        var value$ = initialValue$.map(function (value) { return value$proxy.startWith(value); }).flatten().remember();
        var input$ = sources.DOM.select("input").events("keyup")
            .map(function (ev) { return ev.target.value; });
        var filter$ = xstream_1.default.merge(input$, value$proxy.map(function (v) { return ""; })).startWith("");
        /** Create menu component **/
        var menuItems$ = xstream_1.default.combine(content$, value$).map(function (_a) {
            var content = _a[0], value = _a[1];
            return content.map(function (item) { return item.value === value ? Object.assign({}, item, { active: true }) : item; });
        }).remember();
        var activeItem$ = menuItems$.map(function (content) { return content.filter(function (item) { return item.active; })[0]; });
        var filteredItems$ = xstream_1.default.combine(content$, filter$).map(function (_a) {
            var content = _a[0], filter = _a[1];
            return content.filter(function (c) { return filterContent(c, filter); });
        }).remember();
        var menu = menu_1.Menu.run({ DOM: sources.DOM, props$: xstream_1.default.of({ submenu: true }), content$: filteredItems$ }, scope);
        var inputEnter$ = sources.DOM.select("input").events("keypress");
        var enterValue$ = inputEnter$.map(function (evt) {
            return (evt.charCode === 13 || evt.charCode === 9) ? filteredItems$.map(function (items) { return items[0]; }).take(1) : xstream_1.default.never();
        }).flatten();
        value$proxy.imitate(xstream_1.default.merge(menu.value$, enterValue$).map(function (item) { return item.value; }));
        var transition$ = common_1.createTransition$(evt, sources.args);
        var active$ = xstream_1.default.merge(transition$.filter(function (x) { return x.direction === enums_1.Direction.In; }).mapTo(true), transition$.filter(function (x) { return x.direction === enums_1.Direction.Out; }).compose(delay_1.default(250)).mapTo(false));
        var animatedMenu = transition_1.Transition.run({ DOM: sources.DOM, target$: menu.DOM, transition$: transition$ }, scope);
        var vTree$ = xstream_1.default.combine(props$, active$, animatedMenu.DOM, filter$, activeItem$).map(function (_a) {
            var props = _a[0], isActive = _a[1], menu = _a[2], filter = _a[3], activeItem = _a[4];
            return dom_1.div({ props: { className: common_1.getClassName(isActive ? "ui active search " : "ui search", props) } }, [].concat(dom_1.input({ props: { className: "search", value: filter } }), common_1.getText(activeItem, props, sources.args && sources.args.static, filter), !props.simple ? icon_1.Icon.render(enums_1.IconType.Dropdown) : [], menu));
        });
        return {
            DOM: vTree$,
            events: function (type) { return xstream_1.default.merge(evt(type), menu.events(type), animatedMenu.events(type)); },
            value$: value$proxy
        };
    }
    if (scope === null) {
        return main(sources);
    }
    var isolatedMain = isolate_1.default(main, scope);
    return isolatedMain(sources);
}
exports.default = run;
function filterContent(item, filter) {
    function f(node) {
        if (typeof (node) === "string") {
            return node === filter;
        }
        if (node.text) {
            return node.text.indexOf(filter) !== -1 || !filter;
        }
        else {
            for (var c in node.children) {
                if (f(c)) {
                    return true;
                }
            }
            return false;
        }
    }
    if (typeof (item.main) === "undefined") {
        return true;
    }
    else if (typeof (item.main) === "string") {
        return item.main.indexOf(filter) !== -1 || !filter;
    }
    else if (types_1.isVNode(item.main)) {
        return f(item.main);
    }
    else if (item.main instanceof Array) {
        for (var _i = 0, _a = item.main; _i < _a.length; _i++) {
            var c = _a[_i];
            if (common_1.isMenuItem(c)) {
                return filterContent(c, filter);
            }
            if (f(c)) {
                return true;
            }
        }
    }
    return false;
}


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(208));
__export(__webpack_require__(35));
__export(__webpack_require__(210));
__export(__webpack_require__(213));
__export(__webpack_require__(214));
__export(__webpack_require__(215));
__export(__webpack_require__(12));
__export(__webpack_require__(216));


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isolate_1 = __webpack_require__(8);
var dom_1 = __webpack_require__(1);
var xstream_1 = __webpack_require__(0);
var enums_1 = __webpack_require__(4);
var dimmer_1 = __webpack_require__(35);
var icon_1 = __webpack_require__(19);
var transition_1 = __webpack_require__(12);
var types_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(2);
var Modal;
(function (Modal) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        function main(sources) {
            var props$ = sources.props$ ? sources.props$ : xstream_1.default.of({});
            var content$ = sources.content$ ? sources.content$.map(function (c) { return types_1.isDOMContent(c) ? { main: c } : c; }) : xstream_1.default.of({ main: [] });
            var target$ = sources.args && sources.args.target$ ? sources.args.target$ : xstream_1.default.of("page");
            var show$ = sources.args && sources.args.on$ ? sources.args.on$ : xstream_1.default.of(true);
            var closeIcon = icon_1.Icon.run({ DOM: sources.DOM, props$: xstream_1.default.of({ link: true }), content$: xstream_1.default.of(enums_1.IconType.Close) }, scope);
            var close$ = closeIcon.events("click").mapTo(false);
            /*** Render modal ***/
            var dimmerclick$proxy = xstream_1.default.create();
            var on$ = xstream_1.default.merge(show$, dimmerclick$proxy, close$).remember();
            var modal$ = xstream_1.default.combine(content$, closeIcon.DOM).map(function (_a) {
                var content = _a[0], icon = _a[1];
                return dom_1.div({ props: { className: "ui scrolling active modal" } }, [].concat(icon, content.header ? dom_1.div({ props: { className: "header" } }, content.header) : [], dom_1.div({ props: { className: "content" } }, content.main), content.actions ? dom_1.div({ props: { className: "actions" } }, content.actions) : []));
            }).remember();
            /*** Animation ***/
            var transition$ = on$
                .fold(function (prevAnim, active) { return prevAnim.direction === enums_1.Direction.None
                ? ({ animation: enums_1.Animation.None, direction: active ? enums_1.Direction.In : enums_1.Direction.Out })
                : {
                    animation: enums_1.Animation.Scale, direction: active ? enums_1.Direction.In : enums_1.Direction.Out
                }; }, ({ animation: enums_1.Animation.None, direction: enums_1.Direction.None }));
            var animatedContent = transition_1.Transition.run({ DOM: sources.DOM, target$: modal$, transition$: transition$ }, scope === null ? "transition" : scope + "_transition");
            /*** Activate dimmer ***/
            var dimmerContent$ = animatedContent.DOM.map(function (x) { return [x]; });
            var dimmer = dimmer_1.Dimmer.run({
                DOM: sources.DOM,
                props$: props$.map(function (x) { return ({ inverted: x.inverted }); }),
                content$: dimmerContent$,
                args: { target$: target$, on$: on$ }
            }, scope);
            var dimmerclick$ = dimmer.events("mousedown")
                .filter(function (evt) { return evt.srcElement === evt.currentTarget; })
                .mapTo(false);
            dimmerclick$proxy.imitate(dimmerclick$);
            return {
                DOM: dimmer.DOM,
                events: function (type) { return xstream_1.default.merge(sources.DOM.select(".modal").events(type), dimmer.events(type), closeIcon.events(type)); }
            };
        }
        if (scope === null) {
            return main(sources);
        }
        var isolatedMain = isolate_1.default(main, scope);
        return isolatedMain(sources);
    }
    Modal.run = run;
})(Modal = exports.Modal || (exports.Modal = {}));


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var xstream_1 = __webpack_require__(0);
var isolate_1 = __webpack_require__(8);
var debounce_1 = __webpack_require__(59);
var dropRepeats_1 = __webpack_require__(37);
var delay_1 = __webpack_require__(36);
var Tether = __webpack_require__(146);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var transition_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(2);
var Popup;
(function (Popup) {
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        function main(sources) {
            if (!(sources.args && sources.args.target$)) {
                throw ("Popups must be attached to an element");
            }
            var props$ = sources.props$ ? sources.props$ : xstream_1.default.of({ attachment: Attachment.BottomLeft });
            var content$ = sources.content$ ? sources.content$.map(function (c) { return types_1.isDOMContent(c) ? { main: c } : c; }) : xstream_1.default.of({ main: [] });
            var on$ = sources.args.on$ ? sources.args.on$ : xstream_1.default.of(true);
            var timeout = sources.args.timeout === void 0 ? 1000 : sources.args.timeout;
            var evt = function (type) { return sources.DOM.select(".popup").events(type); };
            var vTree$ = xstream_1.default.combine(props$, content$, sources.args.target$).map(function (_a) {
                var props = _a[0], content = _a[1], target = _a[2];
                return popup(props, content, target);
            });
            var mouseenter$proxy = xstream_1.default.create();
            var mouseleave$proxy = xstream_1.default.create();
            var mouserInteract$ = xstream_1.default.merge(mouseleave$proxy, mouseenter$proxy)
                .map(function (evt) { return evt.type === "mouseenter" ? enums_1.Direction.In : enums_1.Direction.Out; })
                .compose(debounce_1.default(200))
                .filter(function (dir) { return dir === enums_1.Direction.Out; });
            var active$ = on$.map(function (active) { return active ? enums_1.Direction.In : enums_1.Direction.Out; }).drop(1);
            var timer$ = active$.map(function (dir) { return dir === enums_1.Direction.Out ? xstream_1.default.never()
                : timeout === null ? xstream_1.default.never() : xstream_1.default.of(enums_1.Direction.Out).compose(delay_1.default(timeout)).endWhen(mouseenter$proxy); }).flatten();
            var transition$ = xstream_1.default.merge(active$, mouserInteract$, timer$)
                .map(function (dir) { return ({
                animation: enums_1.Animation.Fade,
                direction: dir
            }); })
                .compose(dropRepeats_1.default(function (a, b) { return a.direction === b.direction
                && a.animation === b.animation; }))
                .startWith({ animation: enums_1.Animation.None, direction: enums_1.Direction.Out });
            var animatedPopup = transition_1.Transition.run({ DOM: sources.DOM, target$: vTree$, transition$: transition$ }, scope);
            mouseenter$proxy.imitate(animatedPopup.events("mouseenter"));
            mouseleave$proxy.imitate(animatedPopup.events("mouseleave"));
            return {
                DOM: animatedPopup.DOM,
                events: function (type) { return xstream_1.default.merge(evt(type), animatedPopup.events(type)); }
            };
        }
        if (scope === null) {
            return main(sources);
        }
        var isolatedMain = isolate_1.default(main, scope);
        return isolatedMain(sources);
    }
    Popup.run = run;
    function popup(props, content, target) {
        return dom_1.div({
            props: { className: getClassname(props) }, hook: {
                insert: function (vnode) {
                    new Tether({
                        element: vnode.elm,
                        target: target.hasOwnProperty("elm") ? target["elm"] : target,
                        attachment: Attachment.ToOppositeTether(props.attachment),
                        targetAttachment: Attachment.ToTether(props.attachment)
                    });
                }
            }
        }, [].concat(content.header ? dom_1.div({ props: { className: "header" } }, content.header) : [], content.main));
    }
    function getClassname(props) {
        var className = "ui";
        if (props.wide) {
            className += " wide";
        }
        if (props.veryWide) {
            className += " very wide";
        }
        if (props.flowing) {
            className += " flowing";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += Attachment.ToClassname(props.attachment) + " popup";
        return className;
    }
    var Attachment;
    (function (Attachment) {
        Attachment[Attachment["TopLeft"] = 0] = "TopLeft";
        Attachment[Attachment["TopMiddle"] = 1] = "TopMiddle";
        Attachment[Attachment["TopRight"] = 2] = "TopRight";
        Attachment[Attachment["LeftCenter"] = 3] = "LeftCenter";
        Attachment[Attachment["RightCenter"] = 4] = "RightCenter";
        Attachment[Attachment["BottomLeft"] = 5] = "BottomLeft";
        Attachment[Attachment["BottomMiddle"] = 6] = "BottomMiddle";
        Attachment[Attachment["BottomRight"] = 7] = "BottomRight";
        Attachment[Attachment["Center"] = 8] = "Center";
    })(Attachment = Popup.Attachment || (Popup.Attachment = {}));
    (function (Attachment) {
        function ToEnum(attachmentstring) {
            if (typeof (attachmentstring) === "number") {
                return attachmentstring;
            }
            return Attachment[attachmentstring.split(" ").map(utils_1.capitalize).join("")];
        }
        Attachment.ToEnum = ToEnum;
        function ToClassname(attachment) {
            attachment = Attachment.ToEnum(attachment);
            switch (attachment) {
                case Attachment.TopLeft: return " top left";
                case Attachment.TopMiddle: return " top center";
                case Attachment.TopRight: return " top right";
                case Attachment.LeftCenter: return " left center";
                case Attachment.RightCenter: return " right center";
                case Attachment.BottomLeft: return " bottom left";
                case Attachment.BottomMiddle: return " bottom center";
                case Attachment.BottomRight: return " bottom right";
                case Attachment.Center: return " center";
                default: return " bottom left";
            }
        }
        Attachment.ToClassname = ToClassname;
        function ToTether(attachment) {
            attachment = Attachment.ToEnum(attachment);
            switch (attachment) {
                case Attachment.TopLeft: return "top left";
                case Attachment.TopMiddle: return "top center";
                case Attachment.TopRight: return "top right";
                case Attachment.LeftCenter: return "left middle";
                case Attachment.RightCenter: return "right middle";
                case Attachment.BottomLeft: return "bottom left";
                case Attachment.BottomMiddle: return "bottom center";
                case Attachment.BottomRight: return "bottom right";
                case Attachment.Center: return "center";
                default: return "bottom left";
            }
        }
        Attachment.ToTether = ToTether;
        function ToOppositeTether(attachment) {
            attachment = Attachment.ToEnum(attachment);
            switch (attachment) {
                case Attachment.TopLeft: return "bottom right";
                case Attachment.TopMiddle: return "bottom center";
                case Attachment.TopRight: return "bottom left";
                case Attachment.LeftCenter: return "right middle";
                case Attachment.RightCenter: return "left middle";
                case Attachment.BottomLeft: return "top right";
                case Attachment.BottomMiddle: return "top center";
                case Attachment.BottomRight: return "top left";
                case Attachment.Center: return "center";
                default: return "bottom left";
            }
        }
        Attachment.ToOppositeTether = ToOppositeTether;
    })(Attachment = Popup.Attachment || (Popup.Attachment = {}));
})(Popup = exports.Popup || (exports.Popup = {}));


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Progress;
(function (Progress) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(progress, common_1.makeIsArgs(types_1.isDOMContent), types_1.isDOMContent, arg1, arg2);
    }
    Progress.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, progress, ".progress", scope);
    }
    Progress.run = run;
    function progress(args) {
        var props = args.props ? args.props : { progress: 0 };
        var content = args.content ? types_1.isDOMContent(args.content) ? args.content : args.content.main : [];
        return dom_1.div({ props: { className: getClassname(props) } }, [
            dom_1.div({ props: { className: "bar" }, style: { width: props.progress + "%" } }, [
                dom_1.div({ props: { className: "progress" } }, [props.progress + "%"])
            ]),
            dom_1.div({ props: { className: "label" } }, content)
        ]);
    }
    function getClassname(props) {
        var className = "ui";
        if (props.active) {
            className += " active";
        }
        if (props.disabled) {
            className += " disabled";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.attachment) !== "undefined") {
            className += enums_1.Attachment.ToClassname(props.attachment);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        className += " progress";
        return className;
    }
})(Progress = exports.Progress || (exports.Progress = {}));


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xstream_1 = __webpack_require__(0);
var dropRepeats_1 = __webpack_require__(37);
var dom_1 = __webpack_require__(1);
var index_1 = __webpack_require__(56);
var Tabs;
(function (Tabs) {
    function run(sources) {
        var menuProps$ = sources.menuProps$ ? sources.menuProps$ : xstream_1.default.of({ tabular: true, attachment: index_1.Attachment.Top });
        var segmentProps$ = sources.segmentProps$ ? sources.segmentProps$ : xstream_1.default.of({ attachment: index_1.Attachment.Bottom });
        var menuValue$ = xstream_1.default.create();
        var activeTab$ = menuValue$.startWith(sources.active ? sources.active : sources.labels[0]).compose(dropRepeats_1.default()).remember();
        var menu = index_1.Menu.run({
            DOM: sources.DOM,
            props$: menuProps$,
            content$: activeTab$.map(function (activeTab) {
                return sources.labels.map(function (label) {
                    return ({
                        link: true,
                        active: activeTab === label,
                        main: label
                    });
                });
            })
        });
        menuValue$.imitate(menu.value$.map(function (x) { return x.body; }));
        var tabContent$ = activeTab$.map(function (tab) { return xstream_1.default.merge(xstream_1.default.of([dom_1.div()]), sources.content[sources.labels.indexOf(tab)]); }).flatten();
        var vTree$ = xstream_1.default.combine(menu.DOM, tabContent$, segmentProps$).map(function (_a) {
            var menu = _a[0], tabcontent = _a[1], segmentProps = _a[2];
            return dom_1.div([
                menu,
                index_1.Segment.render(segmentProps, tabcontent)
            ]);
        });
        return {
            DOM: vTree$,
            active$: activeTab$
        };
    }
    Tabs.run = run;
})(Tabs = exports.Tabs || (exports.Tabs = {}));


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isDOMContent(content) {
    if (!content) {
        return false;
    }
    if (typeof (content) === "string") {
        return true;
    }
    if (isVNode(content)) {
        return true;
    }
    if (content instanceof Array) {
        if (content.length === 0) {
            return true;
        }
        else {
            return isVNode(content[0]) || typeof (content[0]) === "string";
        }
        ;
    }
    return false;
}
exports.isDOMContent = isDOMContent;
function isVNode(obj) {
    return obj && obj.sel !== undefined;
}
exports.isVNode = isVNode;


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(219));


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(1);
var types_1 = __webpack_require__(6);
var enums_1 = __webpack_require__(4);
var common_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(2);
var Statistic;
(function (Statistic) {
    function render(arg1, arg2) {
        return common_1.renderPropsAndContent(statistic, isArgs, types_1.isDOMContent, arg1, arg2);
    }
    Statistic.render = render;
    function run(sources, scope) {
        if (scope === void 0) { scope = utils_1.getScope(); }
        return common_1.runPropsAndContent(sources, statistic, ".statistic", scope);
    }
    Statistic.run = run;
    function statistic(args) {
        var props = args.props ? args.props : {};
        var content = args.content ? types_1.isDOMContent(args.content) ? { main: args.content } : args.content : { main: [] };
        return dom_1.div({ props: { className: getClassname(props) } }, [].concat(dom_1.div({ props: { className: props.text ? "text value" : "value" } }, content.main), content.label ? dom_1.div({ props: { className: "label" } }, content.label) : []));
    }
    function getClassname(props) {
        var className = "ui";
        if (props.horizontal) {
            className += " horizontal";
        }
        if (props.text) {
            className += " text";
        }
        if (props.inverted) {
            className += " inverted";
        }
        if (typeof (props.color) !== "undefined") {
            className += enums_1.Color.ToClassname(props.color);
        }
        if (typeof (props.size) !== "undefined") {
            className += enums_1.Size.ToClassname(props.size);
        }
        if (typeof (props.float) !== "undefined") {
            className += enums_1.Float.ToClassname(props.float);
        }
        className += " statistic";
        return className;
    }
    function isArgs(obj) {
        return typeof (obj) !== "undefined" && (typeof (obj.props) !== "undefined" ||
            typeof (obj.content) !== "undefined" && (types_1.isDOMContent(obj.content) ||
                types_1.isDOMContent(obj.content.main) || types_1.isDOMContent(obj.content.label)));
    }
})(Statistic = exports.Statistic || (exports.Statistic = {}));


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var valueEqual = function valueEqual(a, b) {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;

    return a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

  if (aType !== bType) return false;

  if (aType === 'object') {
    var aValue = a.valueOf();
    var bValue = b.valueOf();

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
};

exports.default = valueEqual;

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
module.exports = __webpack_require__(60);


/***/ })
/******/ ]);