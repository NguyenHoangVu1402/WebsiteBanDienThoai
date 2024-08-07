window.MagicZoom = function() {
    var e, c;
    (function(o) {
        if (!o) throw "MagicJS not found";
        var n = o.$,
            s = window.URL || window.webkitURL || null;
        e.ImageLoader = new o.Class({
            img: null,
            ready: !1,
            options: {
                onprogress: o.$F,
                onload: o.$F,
                onabort: o.$F,
                onerror: o.$F,
                oncomplete: o.$F,
                onxhrerror: o.$F,
                xhr: !1,
                progressiveLoad: !0
            },
            size: null,
            _timer: null,
            loadedBytes: 0,
            _handlers: {
                onprogress: function(t) {
                    t.target && (200 === t.target.status || 304 === t.target.status) && t.lengthComputable && (this.options.onprogress.jBind(null, (t.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / t.total).jDelay(1), this.loadedBytes = t.loaded)
                },
                onload: function(t) {
                    t && n(t).stop(), this._unbind(), this.ready || (this.ready = !0, this._cleanup(), this.options.xhr || this.options.onprogress.jBind(null, 1).jDelay(1), this.options.onload.jBind(null, this).jDelay(1), this.options.oncomplete.jBind(null, this).jDelay(1))
                },
                onabort: function(t) {
                    t && n(t).stop(), this._unbind(), this.ready = !1, this._cleanup(), this.options.onabort.jBind(null, this).jDelay(1), this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onerror: function(t) {
                    t && n(t).stop(), this._unbind(), this.ready = !1, this._cleanup(), this.options.onerror.jBind(null, this).jDelay(1), this.options.oncomplete.jBind(null, this).jDelay(1)
                }
            },
            _bind: function() {
                n(["load", "abort", "error"]).jEach(function(t) {
                    this.img.jAddEvent(t, this._handlers["on" + t].jBindAsEvent(this).jDefer(1))
                }, this)
            },
            _unbind: function() {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer)
                    } catch (t) {}
                    this._timer = null
                }
                n(["load", "abort", "error"]).jEach(function(t) {
                    this.img.jRemoveEvent(t)
                }, this)
            },
            _cleanup: function() {
                if (this.jGetSize(), this.img.jFetch("new")) {
                    var t = this.img.parentNode;
                    this.img.jRemove().jDel("new").jSetCss({
                        position: "static",
                        top: "auto"
                    }), t.kill()
                }
            },
            loadBlob: function(t) {
                var e, i = new XMLHttpRequest;
                n(["abort", "progress"]).jEach(function(e) {
                    i["on" + e] = n(function(t) {
                        this._handlers["on" + e].call(this, t)
                    }).jBind(this)
                }, this), i.onerror = n(function() {
                    this.options.onxhrerror.jBind(null, this).jDelay(1), this.options.xhr = !1, this._bind(), this.img.src = t
                }).jBind(this), i.onload = n(function() {
                    200 === i.status || 304 === i.status ? (e = i.response, this._bind(), !s || o.browser.trident || "ios" === o.browser.platform && o.browser.version < 537 ? this.img.src = t : this.img.setAttribute("src", s.createObjectURL(e))) : this._handlers.onerror.call(this)
                }).jBind(this), i.open("GET", t), i.responseType = "blob", i.send()
            },
            init: function(t, e) {
                if (this.options = o.extend(this.options, e), this.img = n(t) || o.$new("img", {}, {
                        "max-width": "none",
                        "max-height": "none"
                    }).jAppendTo(o.$new("div").jAddClass("magic-temporary-img").jSetCss({
                        position: "absolute",
                        top: -1e4,
                        width: 10,
                        height: 10,
                        overflow: "hidden"
                    }).jAppendTo(document.body)).jStore("new", !0), o.browser.features.xhr2 && this.options.xhr && "string" == o.jTypeOf(t)) this.loadBlob(t);
                else {
                    var i = function() {
                        this.isReady() ? this._handlers.onload.call(this) : this._handlers.onerror.call(this), i = null
                    }.jBind(this);
                    this._bind(), "string" == o.jTypeOf(t) ? this.img.src = t : (o.browser.trident && 5 == o.browser.version && o.browser.ieMode < 9 && (this.img.onreadystatechange = function() {
                        /loaded|complete/.test(this.img.readyState) && (this.img.onreadystatechange = null, i && i())
                    }.jBind(this)), this.img.src = t.getAttribute("src")), this.img && this.img.complete && i && (this._timer = i.jDelay(100))
                }
            },
            destroy: function() {
                return this._unbind(), this._cleanup(), this.ready = !1, this
            },
            isReady: function() {
                var t = this.img;
                return t.naturalWidth ? 0 < t.naturalWidth : t.readyState ? "complete" == t.readyState : 0 < t.width
            },
            jGetSize: function() {
                return this.size || (this.size = {
                    width: this.img.naturalWidth || this.img.width,
                    height: this.img.naturalHeight || this.img.height
                })
            }
        })
    })(e = c = function() {
        var e, t = {
                version: "v3.3.4",
                UUID: 0,
                storage: {},
                $uuid: function(t) {
                    return t.$J_UUID || (t.$J_UUID = ++d.UUID)
                },
                getStorage: function(t) {
                    return d.storage[t] || (d.storage[t] = {})
                },
                $F: function() {},
                $false: function() {
                    return !1
                },
                $true: function() {
                    return !0
                },
                stylesId: "mjs-" + Math.floor(Math.random() * (new Date).getTime()),
                defined: function(t) {
                    return null != t
                },
                ifndef: function(t, e) {
                    return null != t ? t : e
                },
                exists: function(t) {
                    return !!t
                },
                jTypeOf: function(t) {
                    if (!d.defined(t)) return !1;
                    if (t.$J_TYPE) return t.$J_TYPE;
                    if (t.nodeType) {
                        if (1 == t.nodeType) return "element";
                        if (3 == t.nodeType) return "textnode"
                    }
                    if (t.length && t.item) return "collection";
                    if (t.length && t.callee) return "arguments";
                    if ((t instanceof window.Object || t instanceof window.Function) && t.constructor === d.Class) return "class";
                    if (t instanceof window.Array) return "array";
                    if (t instanceof window.Function) return "function";
                    if (t instanceof window.String) return "string";
                    if (d.browser.trident) {
                        if (d.defined(t.cancelBubble)) return "event"
                    } else if (t === window.event || t.constructor == window.Event || t.constructor == window.MouseEvent || t.constructor == window.UIEvent || t.constructor == window.KeyboardEvent || t.constructor == window.KeyEvent) return "event";
                    return t instanceof window.Date ? "date" : t instanceof window.RegExp ? "regexp" : t === window ? "window" : t === document ? "document" : typeof t
                },
                extend: function(t, e) {
                    if (t instanceof window.Array || (t = [t]), !e) return t[0];
                    for (var i = 0, o = t.length; i < o; i++)
                        if (d.defined(t))
                            for (var n in e)
                                if (Object.prototype.hasOwnProperty.call(e, n)) try {
                                    t[i][n] = e[n]
                                } catch (t) {}
                    return t[0]
                },
                implement: function(t, e) {
                    t instanceof window.Array || (t = [t]);
                    for (var i = 0, o = t.length; i < o; i++)
                        if (d.defined(t[i]) && t[i].prototype)
                            for (var n in e || {}) t[i].prototype[n] || (t[i].prototype[n] = e[n]);
                    return t[0]
                },
                nativize: function(t, e) {
                    if (!d.defined(t)) return t;
                    for (var i in e || {}) t[i] || (t[i] = e[i]);
                    return t
                },
                $try: function() {
                    for (var t = 0, e = arguments.length; t < e; t++) try {
                        return arguments[t]()
                    } catch (t) {}
                    return null
                },
                $A: function(t) {
                    if (!d.defined(t)) return d.$([]);
                    if (t.toArray) return d.$(t.toArray());
                    if (t.item) {
                        for (var e = t.length || 0, i = new Array(e); e--;) i[e] = t[e];
                        return d.$(i)
                    }
                    return d.$(Array.prototype.slice.call(t))
                },
                now: function() {
                    return (new Date).getTime()
                },
                detach: function(t) {
                    var e;
                    switch (d.jTypeOf(t)) {
                        case "object":
                            for (var i in e = {}, t) e[i] = d.detach(t[i]);
                            break;
                        case "array":
                            e = [];
                            for (var o = 0, n = t.length; o < n; o++) e[o] = d.detach(t[o]);
                            break;
                        default:
                            return t
                    }
                    return d.$(e)
                },
                $: function(t) {
                    var e = !0;
                    if (!d.defined(t)) return null;
                    if (t.$J_EXT) return t;
                    switch (d.jTypeOf(t)) {
                        case "array":
                            return (t = d.nativize(t, d.extend(d.Array, {
                                $J_EXT: d.$F
                            }))).jEach = t.forEach, t.contains = d.Array.contains, t;
                        case "string":
                            var i = document.getElementById(t);
                            return d.defined(i) ? d.$(i) : null;
                        case "window":
                        case "document":
                            d.$uuid(t), t = d.extend(t, d.Doc);
                            break;
                        case "element":
                            d.$uuid(t), t = d.extend(t, d.Element);
                            break;
                        case "event":
                            t = d.extend(t, d.Event);
                            break;
                        case "textnode":
                        case "function":
                        case "array":
                        case "date":
                        default:
                            e = !1
                    }
                    return e ? d.extend(t, {
                        $J_EXT: d.$F
                    }) : t
                },
                $new: function(t, e, i) {
                    return d.$(d.doc.createElement(t)).setProps(e || {}).jSetCss(i || {})
                },
                addCSS: function(t, e, i) {
                    var o, n, s = [],
                        a = -1;
                    if (i = i || d.stylesId, n = (o = d.$(i) || d.$new("style", {
                            id: i,
                            type: "text/css"
                        }).jAppendTo(document.head || document.body, "top")).sheet || o.styleSheet, "string" != d.jTypeOf(e)) {
                        for (var h in e) s.push(h + ":" + e[h]);
                        e = s.join(";")
                    }
                    if (n.insertRule) a = n.insertRule(t + " {" + e + "}", n.cssRules.length);
                    else try {
                        a = n.addRule(t, e, n.rules.length)
                    } catch (t) {}
                    return a
                },
                removeCSS: function(t, e) {
                    var i, o;
                    i = d.$(t), "element" === d.jTypeOf(i) && ((o = i.sheet || i.styleSheet).deleteRule ? o.deleteRule(e) : o.removeRule && o.removeRule(e))
                },
                generateUUID: function() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                        var e = 16 * Math.random() | 0;
                        return ("x" == t ? e : 3 & e | 8).toString(16)
                    }).toUpperCase()
                },
                getAbsoluteURL: function(t) {
                    return (e = e || document.createElement("a")).setAttribute("href", t), ("!!" + e.href).replace("!!", "")
                },
                getHashCode: function(t) {
                    for (var e = 0, i = t.length, o = 0; o < i; ++o) e = 31 * e + t.charCodeAt(o), e %= 4294967296;
                    return e
                }
            },
            d = t;
        t.$;
        window.magicJS || (window.magicJS = t, window.$mjs = t.$), d.Array = {
            $J_TYPE: "array",
            indexOf: function(t, e) {
                this.length;
                for (var i = this.length, o = e < 0 ? Math.max(0, i + e) : e || 0; o < i; o++)
                    if (this[o] === t) return o;
                return -1
            },
            contains: function(t, e) {
                return -1 != this.indexOf(t, e)
            },
            forEach: function(t, e) {
                for (var i = 0, o = this.length; i < o; i++) i in this && t.call(e, this[i], i, this)
            },
            filter: function(t, e) {
                for (var i = [], o = 0, n = this.length; o < n; o++)
                    if (o in this) {
                        var s = this[o];
                        t.call(e, this[o], o, this) && i.push(s)
                    }
                return i
            },
            map: function(t, e) {
                for (var i = [], o = 0, n = this.length; o < n; o++) o in this && (i[o] = t.call(e, this[o], o, this));
                return i
            }
        }, d.implement(String, {
            $J_TYPE: "string",
            jTrim: function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            eq: function(t, e) {
                return e ? this.toString() === t.toString() : this.toLowerCase().toString() === t.toLowerCase().toString()
            },
            jCamelize: function() {
                return this.replace(/-\D/g, function(t) {
                    return t.charAt(1).toUpperCase()
                })
            },
            dashize: function() {
                return this.replace(/[A-Z]/g, function(t) {
                    return "-" + t.charAt(0).toLowerCase()
                })
            },
            jToInt: function(t) {
                return parseInt(this, t || 10)
            },
            toFloat: function() {
                return parseFloat(this)
            },
            jToBool: function() {
                return !this.replace(/true/i, "").jTrim()
            },
            has: function(t, e) {
                return -1 < ((e = e || "") + this + e).indexOf(e + t + e)
            }
        }), t.implement(Function, {
            $J_TYPE: "function",
            jBind: function() {
                var t = d.$A(arguments),
                    e = this,
                    i = t.shift();
                return function() {
                    return e.apply(i || null, t.concat(d.$A(arguments)))
                }
            },
            jBindAsEvent: function() {
                var e = d.$A(arguments),
                    i = this,
                    o = e.shift();
                return function(t) {
                    return i.apply(o || null, d.$([t || (d.browser.ieMode ? window.event : null)]).concat(e))
                }
            },
            jDelay: function() {
                var t = d.$A(arguments),
                    e = this,
                    i = t.shift();
                return window.setTimeout(function() {
                    return e.apply(e, t)
                }, i || 0)
            },
            jDefer: function() {
                var t = d.$A(arguments),
                    e = this;
                return function() {
                    return e.jDelay.apply(e, t)
                }
            },
            interval: function() {
                var t = d.$A(arguments),
                    e = this,
                    i = t.shift();
                return window.setInterval(function() {
                    return e.apply(e, t)
                }, i || 0)
            }
        });
        var l = {},
            i = navigator.userAgent.toLowerCase(),
            o = i.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i),
            n = i.match(/(edge|opr)\/(\d+\.?\d*)/i) || i.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i),
            s = i.match(/version\/(\d+\.?\d*)/i),
            a = document.documentElement.style;

        function h(t) {
            var e = t.charAt(0).toUpperCase() + t.slice(1);
            return t in a || "Webkit" + e in a || "Moz" + e in a || "ms" + e in a || "O" + e in a
        }
        d.browser = {
                features: {
                    xpath: !!document.evaluate,
                    air: !!window.runtime,
                    query: !!document.querySelector,
                    fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
                    xhr2: !!window.ProgressEvent && !!window.FormData && window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest,
                    transition: h("transition"),
                    transform: h("transform"),
                    perspective: h("perspective"),
                    animation: h("animation"),
                    requestAnimationFrame: !1,
                    multibackground: !1,
                    cssFilters: !1,
                    canvas: !1,
                    svg: document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
                },
                touchScreen: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints,
                mobile: !!i.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/),
                engine: o && o[1] ? o[1].toLowerCase() : window.opera ? "presto" : window.ActiveXObject ? "trident" : void 0 !== document.getBoxObjectFor || null !== window.mozInnerScreenY ? "gecko" : null === window.WebKitPoint && navigator.taintEnabled ? "unknown" : "webkit",
                version: o && o[2] ? parseFloat(o[2]) : 0,
                uaName: n && n[1] ? n[1].toLowerCase() : "",
                uaVersion: n && n[2] ? parseFloat(n[2]) : 0,
                cssPrefix: "",
                cssDomPrefix: "",
                domPrefix: "",
                ieMode: 0,
                platform: i.match(/ip(?:ad|od|hone)/) ? "ios" : (i.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
                backCompat: document.compatMode && "backcompat" === document.compatMode.toLowerCase(),
                scrollbarsWidth: 0,
                getDoc: function() {
                    return document.compatMode && "backcompat" === document.compatMode.toLowerCase() ? document.body : document.documentElement
                },
                requestAnimationFrame: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || void 0,
                cancelAnimationFrame: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || void 0,
                ready: !1,
                onready: function() {
                    if (!d.browser.ready) {
                        var t, e, i;
                        d.browser.ready = !0, d.body = d.$(document.body), d.win = d.$(window);
                        try {
                            var o = d.$new("div").jSetCss({
                                width: 100,
                                height: 100,
                                overflow: "scroll",
                                position: "absolute",
                                top: -9999
                            }).jAppendTo(document.body);
                            d.browser.scrollbarsWidth = o.offsetWidth - o.clientWidth, o.jRemove()
                        } catch (t) {}
                        try {
                            (e = (t = d.$new("div")).style).cssText = "background:url(https://),url(https://),red url(https://)", d.browser.features.multibackground = /(url\s*\(.*?){3}/.test(e.background), t = e = null
                        } catch (t) {}
                        d.browser.cssTransformProp || (d.browser.cssTransformProp = d.normalizeCSS("transform").dashize());
                        try {
                            (t = d.$new("div")).style.cssText = d.normalizeCSS("filter").dashize() + ":blur(2px);", d.browser.features.cssFilters = !!t.style.length && (!d.browser.ieMode || 9 < d.browser.ieMode), t = null
                        } catch (t) {}
                        d.browser.features.cssFilters || d.$(document.documentElement).jAddClass("no-cssfilters-magic");
                        try {
                            d.browser.features.canvas = !(!(i = d.$new("canvas")).getContext || !i.getContext("2d"))
                        } catch (t) {}
                        void 0 === window.TransitionEvent && void 0 !== window.WebKitTransitionEvent && (l.transitionend = "webkitTransitionEnd"), d.Doc.jCallEvent.call(d.$(document), "domready")
                    }
                }
            },
            function() {
                var t, e, i, o = [];
                switch (d.browser.engine) {
                    case "trident":
                        d.browser.version || (d.browser.version = window.XMLHttpRequest ? 3 : 2);
                        break;
                    case "gecko":
                        d.browser.version = n && n[2] ? parseFloat(n[2]) : 0
                }
                if (d.browser[d.browser.engine] = !0, n && "crios" === n[1] && (d.browser.uaName = "chrome"), window.chrome && (d.browser.chrome = !0), n && "opr" === n[1] && (d.browser.uaName = "opera", d.browser.opera = !0), "safari" === d.browser.uaName && s && s[1] && (d.browser.uaVersion = parseFloat(s[1])), "android" === d.browser.platform && d.browser.webkit && s && s[1] && (d.browser.androidBrowser = !0), t = {
                        gecko: ["-moz-", "Moz", "moz"],
                        webkit: ["-webkit-", "Webkit", "webkit"],
                        trident: ["-ms-", "ms", "ms"],
                        presto: ["-o-", "O", "o"]
                    }[d.browser.engine] || ["", "", ""], d.browser.cssPrefix = t[0], d.browser.cssDomPrefix = t[1], d.browser.domPrefix = t[2], d.browser.ieMode = d.browser.trident ? document.documentMode ? document.documentMode : function() {
                        var t = 0;
                        if (d.browser.backCompat) return 5;
                        switch (d.browser.version) {
                            case 2:
                                t = 6;
                                break;
                            case 3:
                                t = 7
                        }
                        return t
                    }() : void 0, !d.browser.mobile && "mac" === d.browser.platform && d.browser.touchScreen && (d.browser.mobile = !0, d.browser.platform = "ios"), o.push(d.browser.platform + "-magic"), d.browser.mobile && o.push("mobile-magic"), d.browser.androidBrowser && o.push("android-browser-magic"), d.browser.ieMode)
                    for (d.browser.uaName = "ie", d.browser.uaVersion = d.browser.ieMode, o.push("ie" + d.browser.ieMode + "-magic"), e = 11; e > d.browser.ieMode; e--) o.push("lt-ie" + e + "-magic");
                d.browser.webkit && d.browser.version < 536 && (d.browser.features.fullScreen = !1), d.browser.requestAnimationFrame && d.browser.requestAnimationFrame.call(window, function() {
                    d.browser.features.requestAnimationFrame = !0
                }), d.browser.features.svg ? o.push("svg-magic") : o.push("no-svg-magic"), i = (document.documentElement.className || "").match(/\S+/g) || [], document.documentElement.className = d.$(i).concat(o).join(" ");
                try {
                    document.documentElement.setAttribute("data-magic-ua", d.browser.uaName), document.documentElement.setAttribute("data-magic-ua-ver", d.browser.uaVersion), document.documentElement.setAttribute("data-magic-engine", d.browser.engine), document.documentElement.setAttribute("data-magic-engine-ver", d.browser.version)
                } catch (t) {}
                d.browser.ieMode && d.browser.ieMode < 9 && (document.createElement("figure"), document.createElement("figcaption")), window.navigator.pointerEnabled || d.$(["Down", "Up", "Move", "Over", "Out"]).jEach(function(t) {
                    l["pointer" + t.toLowerCase()] = window.navigator.msPointerEnabled ? "MSPointer" + t : -1
                })
            }(), d.browser.fullScreen = {
                capable: d.browser.features.fullScreen,
                enabled: function() {
                    return !!(document.fullscreenElement || document[d.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[d.browser.domPrefix + "FullScreen"])
                },
                request: function(t, e) {
                    e = e || {}, this.capable ? (d.$(document).jAddEvent(this.changeEventName, this.onchange = function(t) {
                        this.enabled() ? e.onEnter && e.onEnter() : (d.$(document).jRemoveEvent(this.changeEventName, this.onchange), e.onExit && e.onExit())
                    }.jBindAsEvent(this)), d.$(document).jAddEvent(this.errorEventName, this.onerror = function(t) {
                        e.fallback && e.fallback(), d.$(document).jRemoveEvent(this.errorEventName, this.onerror)
                    }.jBindAsEvent(this)), (t.requestFullscreen || t[d.browser.domPrefix + "RequestFullscreen"] || t[d.browser.domPrefix + "RequestFullScreen"] || function() {}).call(t)) : e.fallback && e.fallback()
                },
                cancel: (document.exitFullscreen || document.cancelFullScreen || document[d.browser.domPrefix + "ExitFullscreen"] || document[d.browser.domPrefix + "CancelFullScreen"] || function() {}).jBind(document),
                changeEventName: document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : d.browser.domPrefix) + "fullscreenchange",
                errorEventName: document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : d.browser.domPrefix) + "fullscreenerror",
                prefix: d.browser.domPrefix,
                activeElement: null
            };
        var r, m, c, u, p, g, v, f = /\S+/g,
            x = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
            w = {
                float: void 0 === a.styleFloat ? "cssFloat" : "styleFloat"
            },
            z = {
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                zIndex: !0,
                zoom: !0
            },
            b = window.getComputedStyle ? function(t, e) {
                var i = window.getComputedStyle(t, null);
                return i ? i.getPropertyValue(e) || i[e] : null
            } : function(t, e) {
                var i = t.currentStyle,
                    o = null;
                return null == (o = i ? i[e] : null) && t.style && t.style[e] && (o = t.style[e]), o
            };

        function j(t) {
            var e;
            return !((!d.browser.webkit || "filter" != t) && t in a) && (e = d.browser.cssDomPrefix + t.charAt(0).toUpperCase() + t.slice(1)) in a ? e : t
        }

        function y(t, e) {
            var i = e.x - t.x,
                o = e.y - t.y;
            return Math.sqrt(i * i + o * o)
        }

        function C(t, e) {
            var i;
            return t.targetTouches && t.changedTouches ? (i = t.targetTouches ? t.targetTouches : t.changedTouches, i = Array.prototype.slice.call(i)) : (i = [], e && e.forEach(function(t) {
                i.push(t)
            })), i
        }

        function S(t, e, i) {
            var o = !1;
            return !t.pointerId || "touch" !== t.pointerType || i && !e.has(t.pointerId) || (e.set(t.pointerId, t), o = !0), o
        }

        function E(t) {
            return t.pointerId && "touch" === t.pointerType ? t.pointerId : t.identifier
        }

        function B(t, e) {
            var i, o, n = !1;
            for (i = 0; i < t.length && 2 !== e.length; i++) o = E(t[i]), e.contains(o) || (e.push(o), n = !0);
            return n
        }

        function T(t, e) {
            var i, o, n, s, a = !1;
            if (e)
                for (n = t, s = g([]), n.forEach(function(t) {
                        s.push(E(t))
                    }), o = s, i = 0; i < e.length; i++)
                    if (!o.contains(e[i])) {
                        e.splice(i, 1), a = !0;
                        break
                    }
            return a
        }

        function A(t, e) {
            var i, o = g([]);
            for (i = 0; i < t.length && (!e.contains(E(t[i])) || (o.push(t[i]), 2 !== o.length)); i++);
            return o
        }
        return d.normalizeCSS = j, d.Element = {
                jHasClass: function(t) {
                    return !(t || "").has(" ") && (this.className || "").has(t, " ")
                },
                jAddClass: function(t) {
                    for (var e = (this.className || "").match(f) || [], i = (t || "").match(f) || [], o = i.length, n = 0; n < o; n++) d.$(e).contains(i[n]) || e.push(i[n]);
                    return this.className = e.join(" "), this
                },
                jRemoveClass: function(t) {
                    for (var e, i = (this.className || "").match(f) || [], o = (t || "").match(f) || [], n = o.length, s = 0; s < n; s++) - 1 < (e = d.$(i).indexOf(o[s])) && i.splice(e, 1);
                    return this.className = t ? i.join(" ") : "", this
                },
                jToggleClass: function(t) {
                    return this.jHasClass(t) ? this.jRemoveClass(t) : this.jAddClass(t)
                },
                jGetCss: function(t) {
                    var e = t.jCamelize(),
                        i = null;
                    if (t = w[e] || (w[e] = j(e)), "auto" === (i = b(this, t)) && (i = null), null !== i) {
                        if ("opacity" == t) return d.defined(i) ? parseFloat(i) : 1;
                        x.test(t) && (i = parseInt(i, 10) ? i : "0px")
                    }
                    return i
                },
                jSetCssProp: function(t, e) {
                    var i = t.jCamelize();
                    try {
                        if ("opacity" == t) return this.jSetOpacity(e), this;
                        t = w[i] || (w[i] = j(i)), this.style[t] = e + ("number" != d.jTypeOf(e) || z[i] ? "" : "px")
                    } catch (t) {}
                    return this
                },
                jSetCss: function(t) {
                    for (var e in t) this.jSetCssProp(e, t[e]);
                    return this
                },
                jGetStyles: function() {
                    var e = {};
                    return d.$A(arguments).jEach(function(t) {
                        e[t] = this.jGetCss(t)
                    }, this), e
                },
                jSetOpacity: function(t, e) {
                    return e = e || !1, this.style.opacity = t, t = parseInt(100 * parseFloat(t)), e && (0 === t ? "hidden" != this.style.visibility && (this.style.visibility = "hidden") : "visible" != this.style.visibility && (this.style.visibility = "visible")), d.browser.ieMode && d.browser.ieMode < 9 && (isNaN(t) ? (this.style.filter = this.style.filter.replace(/progid:DXImageTransform.Microsoft.Alpha\(Opacity=\d*\)/i, "").jTrim(), "" === this.style.filter && this.style.removeAttribute("filter")) : ~this.style.filter.indexOf("Alpha") ? this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + t) : this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + t + ")"), this
                },
                setProps: function(t) {
                    for (var e in t) "class" === e ? this.jAddClass("" + t[e]) : this.setAttribute(e, "" + t[e]);
                    return this
                },
                jGetTransitionDuration: function() {
                    var t = 0,
                        e = 0;
                    return t = this.jGetCss("transition-duration"), e = this.jGetCss("transition-delay"), (t = -1 < t.indexOf("ms") ? parseFloat(t) : -1 < t.indexOf("s") ? 1e3 * parseFloat(t) : 0) + (e = -1 < e.indexOf("ms") ? parseFloat(e) : -1 < e.indexOf("s") ? 1e3 * parseFloat(e) : 0)
                },
                hide: function() {
                    return this.jSetCss({
                        display: "none",
                        visibility: "hidden"
                    })
                },
                show: function() {
                    return this.jSetCss({
                        display: "",
                        visibility: "visible"
                    })
                },
                jGetSize: function() {
                    return {
                        width: this.offsetWidth,
                        height: this.offsetHeight
                    }
                },
                getInnerSize: function(t) {
                    var e = this.jGetSize();
                    return e.width -= parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0), e.height -= parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0), t || (e.width -= parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0), e.height -= parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0)), e
                },
                jGetScroll: function() {
                    return {
                        top: this.scrollTop,
                        left: this.scrollLeft
                    }
                },
                jGetFullScroll: function() {
                    for (var t = this, e = {
                            top: 0,
                            left: 0
                        }; e.left += t.scrollLeft || 0, e.top += t.scrollTop || 0, t = t.parentNode;);
                    return e
                },
                jGetPosition: function() {
                    var t = this,
                        e = 0,
                        i = 0;
                    if (d.defined(document.documentElement.getBoundingClientRect)) {
                        var o = this.getBoundingClientRect(),
                            n = d.$(document).jGetScroll(),
                            s = d.browser.getDoc();
                        return {
                            top: o.top + n.y - s.clientTop,
                            left: o.left + n.x - s.clientLeft
                        }
                    }
                    for (; e += t.offsetLeft || 0, i += t.offsetTop || 0, (t = t.offsetParent) && !/^(?:body|html)$/i.test(t.tagName););
                    return {
                        top: i,
                        left: e
                    }
                },
                jGetRect: function() {
                    var t = this.jGetPosition(),
                        e = this.jGetSize();
                    return {
                        top: t.top,
                        bottom: t.top + e.height,
                        left: t.left,
                        right: t.left + e.width
                    }
                },
                changeContent: function(e) {
                    try {
                        this.innerHTML = e
                    } catch (t) {
                        this.innerText = e
                    }
                    return this
                },
                jRemove: function() {
                    return this.parentNode ? this.parentNode.removeChild(this) : this
                },
                kill: function() {
                    return d.$A(this.childNodes).jEach(function(t) {
                        3 != t.nodeType && 8 != t.nodeType && d.$(t).kill()
                    }), this.jRemove(), this.jClearEvents(), this.$J_UUID && (d.storage[this.$J_UUID] = null, delete d.storage[this.$J_UUID]), null
                },
                append: function(t, e) {
                    e = e || "bottom";
                    var i = this.firstChild;
                    return "top" == e && i ? this.insertBefore(t, i) : this.appendChild(t), this
                },
                jAppendTo: function(t, e) {
                    d.$(t).append(this, e);
                    return this
                },
                enclose: function(t) {
                    return this.append(t.parentNode.replaceChild(this, t)), this
                },
                hasChild: function(t) {
                    return "element" === d.jTypeOf("string" == d.jTypeOf(t) ? t = document.getElementById(t) : t) && (this != t && (this.contains && !d.browser.webkit419 ? this.contains(t) : this.compareDocumentPosition ? !!(16 & this.compareDocumentPosition(t)) : d.$A(this.byTag(t.tagName)).contains(t)))
                }
            }, d.Element.jGetStyle = d.Element.jGetCss, d.Element.jSetStyle = d.Element.jSetCss, window.Element || (window.Element = d.$F, d.browser.engine.webkit && window.document.createElement("iframe"), window.Element.prototype = d.browser.engine.webkit ? window["[[DOMElement.prototype]]"] : {}), d.implement(window.Element, {
                $J_TYPE: "element"
            }), d.Doc = {
                jGetSize: function() {
                    return d.browser.touchScreen || d.browser.presto925 || d.browser.webkit419 ? {
                        width: window.innerWidth,
                        height: window.innerHeight
                    } : {
                        width: d.browser.getDoc().clientWidth,
                        height: d.browser.getDoc().clientHeight
                    }
                },
                jGetScroll: function() {
                    return {
                        x: window.pageXOffset || d.browser.getDoc().scrollLeft,
                        y: window.pageYOffset || d.browser.getDoc().scrollTop
                    }
                },
                jGetFullSize: function() {
                    var t = this.jGetSize();
                    return {
                        width: Math.max(d.browser.getDoc().scrollWidth, t.width),
                        height: Math.max(d.browser.getDoc().scrollHeight, t.height)
                    }
                }
            }, d.extend(document, {
                $J_TYPE: "document"
            }), d.extend(window, {
                $J_TYPE: "window"
            }), d.extend([d.Element, d.Doc], {
                jFetch: function(t, e) {
                    var i = d.getStorage(this.$J_UUID),
                        o = i[t];
                    return void 0 !== e && void 0 === o && (o = i[t] = e), d.defined(o) ? o : null
                },
                jStore: function(t, e) {
                    return d.getStorage(this.$J_UUID)[t] = e, this
                },
                jDel: function(t) {
                    return delete d.getStorage(this.$J_UUID)[t], this
                }
            }), window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName || d.extend([d.Element, d.Doc], {
                getElementsByClassName: function(e) {
                    return d.$A(this.getElementsByTagName("*")).filter(function(t) {
                        try {
                            return 1 == t.nodeType && t.className.has(e, " ")
                        } catch (t) {}
                    })
                }
            }), d.extend([d.Element, d.Doc], {
                byClass: function() {
                    return this.getElementsByClassName(arguments[0])
                },
                byTag: function() {
                    return this.getElementsByTagName(arguments[0])
                }
            }), d.browser.fullScreen.capable && !document.requestFullScreen && (d.Element.requestFullScreen = function() {
                d.browser.fullScreen.request(this)
            }), d.Event = {
                $J_TYPE: "event",
                isQueueStopped: d.$false,
                stop: function() {
                    return this.stopDistribution().stopDefaults()
                },
                stopDistribution: function() {
                    return this.stopPropagation ? this.stopPropagation() : this.cancelBubble = !0, this
                },
                stopDefaults: function() {
                    return this.preventDefault ? this.preventDefault() : this.returnValue = !1, this
                },
                stopQueue: function() {
                    return this.isQueueStopped = d.$true, this
                },
                getClientXY: function() {
                    var t = /touch/i.test(this.type) ? this.changedTouches[0] : this;
                    return d.defined(t) ? {
                        x: t.clientX,
                        y: t.clientY
                    } : {
                        x: 0,
                        y: 0
                    }
                },
                jGetPageXY: function() {
                    var t = /touch/i.test(this.type) ? this.changedTouches[0] : this;
                    return d.defined(t) ? {
                        x: t.pageX || t.clientX + d.browser.getDoc().scrollLeft,
                        y: t.pageY || t.clientY + d.browser.getDoc().scrollTop
                    } : {
                        x: 0,
                        y: 0
                    }
                },
                getTarget: function() {
                    for (var t = this.target || this.srcElement; t && 3 === t.nodeType;) t = t.parentNode;
                    return t
                },
                getRelated: function() {
                    var e = null;
                    switch (this.type) {
                        case "mouseover":
                        case "pointerover":
                        case "MSPointerOver":
                            e = this.relatedTarget || this.fromElement;
                            break;
                        case "mouseout":
                        case "pointerout":
                        case "MSPointerOut":
                            e = this.relatedTarget || this.toElement;
                            break;
                        default:
                            return e
                    }
                    try {
                        for (; e && 3 === e.nodeType;) e = e.parentNode
                    } catch (t) {
                        e = null
                    }
                    return e
                },
                getButton: function() {
                    return this.which || void 0 === this.button ? this.which : 1 & this.button ? 1 : 2 & this.button ? 3 : 4 & this.button ? 2 : 0
                },
                isTouchEvent: function() {
                    return this.pointerType && ("touch" === this.pointerType || this.pointerType === this.MSPOINTER_TYPE_TOUCH) || /touch/i.test(this.type)
                },
                isPrimaryTouch: function() {
                    return this.pointerType ? ("touch" === this.pointerType || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary : this instanceof window.TouchEvent && (1 === this.changedTouches.length && (!this.targetTouches.length || 1 === this.targetTouches.length && this.targetTouches[0].identifier === this.changedTouches[0].identifier))
                },
                getPrimaryTouch: function() {
                    return this.pointerType ? !this.isPrimary || "touch" !== this.pointerType && this.MSPOINTER_TYPE_TOUCH !== this.pointerType ? null : this : this instanceof window.TouchEvent ? this.changedTouches[0] : null
                },
                getPrimaryTouchId: function() {
                    return this.pointerType ? !this.isPrimary || "touch" !== this.pointerType && this.MSPOINTER_TYPE_TOUCH !== this.pointerType ? null : this.pointerId : this instanceof window.TouchEvent ? this.changedTouches[0].identifier : null
                }
            }, d._event_add_ = "addEventListener", d._event_del_ = "removeEventListener", d._event_prefix_ = "", document.addEventListener || (d._event_add_ = "attachEvent", d._event_del_ = "detachEvent", d._event_prefix_ = "on"), d.Event.Custom = {
                type: "",
                x: null,
                y: null,
                timeStamp: null,
                button: null,
                target: null,
                relatedTarget: null,
                $J_TYPE: "event.custom",
                isQueueStopped: d.$false,
                events: d.$([]),
                pushToEvents: function(t) {
                    var e = t;
                    this.events.push(e)
                },
                stop: function() {
                    return this.stopDistribution().stopDefaults()
                },
                stopDistribution: function() {
                    return this.events.jEach(function(t) {
                        try {
                            t.stopDistribution()
                        } catch (t) {}
                    }), this
                },
                stopDefaults: function() {
                    return this.events.jEach(function(t) {
                        try {
                            t.stopDefaults()
                        } catch (t) {}
                    }), this
                },
                stopQueue: function() {
                    return this.isQueueStopped = d.$true, this
                },
                getClientXY: function() {
                    return {
                        x: this.clientX,
                        y: this.clientY
                    }
                },
                jGetPageXY: function() {
                    return {
                        x: this.x,
                        y: this.y
                    }
                },
                getTarget: function() {
                    return this.target
                },
                getRelated: function() {
                    return this.relatedTarget
                },
                getButton: function() {
                    return this.button
                },
                getOriginalTarget: function() {
                    return 0 < this.events.length ? this.events[0].getTarget() : void 0
                },
                isTouchEvent: function() {
                    return this.pointerType && ("touch" === this.pointerType || this.pointerType === this.MSPOINTER_TYPE_TOUCH) || /touch/i.test(this.type)
                },
                isPrimaryTouch: function() {
                    return this.pointerType ? ("touch" === this.pointerType || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary : this instanceof window.TouchEvent && (1 === this.changedTouches.length && (!this.targetTouches.length || this.targetTouches[0].identifier === this.changedTouches[0].identifier))
                },
                getPrimaryTouch: function() {
                    return this.pointerType ? !this.isPrimary || "touch" !== this.pointerType && this.MSPOINTER_TYPE_TOUCH !== this.pointerType ? null : this : this instanceof window.TouchEvent ? this.changedTouches[0] : null
                },
                getPrimaryTouchId: function() {
                    return this.pointerType ? !this.isPrimary || "touch" !== this.pointerType && this.MSPOINTER_TYPE_TOUCH !== this.pointerType ? null : this.pointerId : this instanceof window.TouchEvent ? this.changedTouches[0].identifier : null
                }
            }, d.extend([d.Element, d.Doc], {
                jAddEvent: function(e, t, i, o) {
                    var n, s, a, h, r;
                    return "string" === d.jTypeOf(e) && 1 < (r = e.split(" ")).length && (e = r), "array" === d.jTypeOf(e) ? d.$(e).jEach(this.jAddEvent.jBindAsEvent(this, t, i, o)) : (e = l[e] || e) && t && "string" === d.jTypeOf(e) && "function" === d.jTypeOf(t) && ("domready" === e && d.browser.ready ? t.call(this) : (i = parseInt(i || 50, 10), t.$J_EUID || (t.$J_EUID = Math.floor(Math.random() * d.now())), (s = (n = d.Doc.jFetch.call(this, "_EVENTS_", {}))[e]) || (n[e] = s = d.$([]), a = this, d.Event.Custom[e] ? d.Event.Custom[e].handler.add.call(this, o) : (s.handle = function(t) {
                        t = d.extend(t || window.e, {
                            $J_TYPE: "event"
                        }), d.Doc.jCallEvent.call(a, e, d.$(t))
                    }, this[d._event_add_](d._event_prefix_ + e, s.handle, !1))), h = {
                        type: e,
                        fn: t,
                        priority: i,
                        euid: t.$J_EUID
                    }, s.push(h), s.sort(function(t, e) {
                        return t.priority - e.priority
                    }))), this
                },
                jRemoveEvent: function(t) {
                    var e, i, o, n, s, a = d.Doc.jFetch.call(this, "_EVENTS_", {});
                    if (n = 1 < arguments.length ? arguments[1] : -100, "string" === d.jTypeOf(t) && 1 < (s = t.split(" ")).length && (t = s), "array" === d.jTypeOf(t)) return d.$(t).jEach(this.jRemoveEvent.jBindAsEvent(this, n)), this;
                    if (!(t = l[t] || t) || "string" !== d.jTypeOf(t) || !a || !a[t]) return this;
                    for (e = a[t] || [], o = 0; o < e.length; o++) i = e[o], (-100 === n || n && n.$J_EUID === i.euid) && e.splice(o--, 1);
                    return 0 === e.length && (d.Event.Custom[t] ? d.Event.Custom[t].handler.jRemove.call(this) : this[d._event_del_](d._event_prefix_ + t, e.handle, !1), delete a[t]), this
                },
                jCallEvent: function(t, e) {
                    var i, o, n = d.Doc.jFetch.call(this, "_EVENTS_", {});
                    if (!(t = l[t] || t) || "string" !== d.jTypeOf(t) || !n || !n[t]) return this;
                    try {
                        e = d.extend(e || {}, {
                            type: t
                        })
                    } catch (t) {}
                    for (void 0 === e.timeStamp && (e.timeStamp = d.now()), i = n[t] || [], o = 0; o < i.length && (!e.isQueueStopped || !e.isQueueStopped()); o++) i[o].fn.call(this, e)
                },
                jRaiseEvent: function(t, e) {
                    var i, o = "domready" !== t,
                        n = this;
                    return t = l[t] || t, o ? (n === document && document.createEvent && !n.dispatchEvent && (n = document.documentElement), document.createEvent ? (i = document.createEvent(t)).initEvent(e, !0, !0) : (i = document.createEventObject()).eventType = t, document.createEvent ? n.dispatchEvent(i) : n.fireEvent("on" + e, i), i) : (d.Doc.jCallEvent.call(this, t), this)
                },
                jClearEvents: function() {
                    var t = d.Doc.jFetch.call(this, "_EVENTS_");
                    if (!t) return this;
                    for (var e in t) d.Doc.jRemoveEvent.call(this, e);
                    return d.Doc.jDel.call(this, "_EVENTS_"), this
                }
            }),
            function(t) {
                if ("complete" === document.readyState) return t.browser.onready.jDelay(1);
                t.browser.webkit && t.browser.version < 420 ? function() {
                    t.$(["loaded", "complete"]).contains(document.readyState) ? t.browser.onready() : arguments.callee.jDelay(50)
                }() : t.browser.trident && t.browser.ieMode < 9 && window === top ? function() {
                    t.$try(function() {
                        return t.browser.getDoc().doScroll("left"), !0
                    }) ? t.browser.onready() : arguments.callee.jDelay(50)
                }() : (t.Doc.jAddEvent.call(t.$(document), "DOMContentLoaded", t.browser.onready), t.Doc.jAddEvent.call(t.$(window), "load", t.browser.onready))
            }(t), d.Class = function() {
                var t = null,
                    e = d.$A(arguments);
                "class" == d.jTypeOf(e[0]) && (t = e.shift());

                function i() {
                    for (var t in this) this[t] = d.detach(this[t]);
                    if (this.constructor.$parent) {
                        this.$parent = {};
                        var e = this.constructor.$parent;
                        for (var i in e) {
                            var o = e[i];
                            switch (d.jTypeOf(o)) {
                                case "function":
                                    this.$parent[i] = d.Class.wrap(this, o);
                                    break;
                                case "object":
                                case "array":
                                    this.$parent[i] = d.detach(o)
                            }
                        }
                    }
                    var n = this.init ? this.init.apply(this, arguments) : this;
                    return delete this.caller, n
                }
                if (i.prototype.init || (i.prototype.init = d.$F), t) {
                    function o() {}
                    for (var n in o.prototype = t.prototype, i.prototype = new o, i.$parent = {}, t.prototype) i.$parent[n] = t.prototype[n]
                } else i.$parent = null;
                return i.constructor = d.Class, i.prototype.constructor = i, d.extend(i.prototype, e[0]), d.extend(i, {
                    $J_TYPE: "class"
                }), i
            }, t.Class.wrap = function(t, e) {
                return function() {
                    this.caller;
                    return e.apply(t, arguments)
                }
            },
            function(n) {
                n.$;
                n.Event.Custom.btnclick = new n.Class(n.extend(n.Event.Custom, {
                    type: "btnclick",
                    init: function(t, e) {
                        var i = e.jGetPageXY();
                        this.x = i.x, this.y = i.y, this.clientX = e.clientX, this.clientY = e.clientY, this.timeStamp = e.timeStamp, this.button = e.getButton(), this.target = t, this.pushToEvents(e)
                    }
                })), n.Event.Custom.btnclick.handler = {
                    options: {
                        threshold: 300,
                        button: 1
                    },
                    add: function(t) {
                        this.jStore("event:btnclick:options", n.extend(n.detach(n.Event.Custom.btnclick.handler.options), t || {})), this.jAddEvent("mousedown", n.Event.Custom.btnclick.handler.handle, 1), this.jAddEvent("mouseup", n.Event.Custom.btnclick.handler.handle, 1), this.jAddEvent("click", n.Event.Custom.btnclick.handler.onclick, 1), n.browser.trident && n.browser.ieMode < 9 && this.jAddEvent("dblclick", n.Event.Custom.btnclick.handler.handle, 1)
                    },
                    jRemove: function() {
                        this.jRemoveEvent("mousedown", n.Event.Custom.btnclick.handler.handle), this.jRemoveEvent("mouseup", n.Event.Custom.btnclick.handler.handle), this.jRemoveEvent("click", n.Event.Custom.btnclick.handler.onclick), n.browser.trident && n.browser.ieMode < 9 && this.jRemoveEvent("dblclick", n.Event.Custom.btnclick.handler.handle)
                    },
                    onclick: function(t) {
                        t.stopDefaults()
                    },
                    handle: function(t) {
                        var e, i, o;
                        if (i = this.jFetch("event:btnclick:options"), "dblclick" == t.type || t.getButton() == i.button)
                            if (this.jFetch("event:btnclick:ignore")) this.jDel("event:btnclick:ignore");
                            else if ("mousedown" == t.type) e = new n.Event.Custom.btnclick(this, t), this.jStore("event:btnclick:btnclickEvent", e);
                        else if ("mouseup" == t.type) {
                            if (!(e = this.jFetch("event:btnclick:btnclickEvent"))) return;
                            o = t.jGetPageXY(), this.jDel("event:btnclick:btnclickEvent"), e.pushToEvents(t), t.timeStamp - e.timeStamp <= i.threshold && Math.sqrt(Math.pow(o.x - e.x, 2) + Math.pow(o.y - e.y, 2)) <= 5 && this.jCallEvent("btnclick", e), document.jCallEvent("mouseup", t)
                        } else "dblclick" == t.type && (e = new n.Event.Custom.btnclick(this, t), this.jCallEvent("btnclick", e))
                    }
                }
            }(t), m = (r = t).$, r.Event.Custom.mousedrag = new r.Class(r.extend(r.Event.Custom, {
                type: "mousedrag",
                state: "dragstart",
                dragged: !1,
                init: function(t, e, i) {
                    var o = e.jGetPageXY();
                    this.x = o.x, this.y = o.y, this.clientX = e.clientX, this.clientY = e.clientY, this.timeStamp = e.timeStamp, this.button = e.getButton(), this.target = t, this.pushToEvents(e), this.state = i
                }
            })), r.Event.Custom.mousedrag.handler = {
                add: function() {
                    var t = r.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this),
                        e = r.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
                    this.jAddEvent("mousedown", r.Event.Custom.mousedrag.handler.handleMouseDown, 1), this.jAddEvent("mouseup", r.Event.Custom.mousedrag.handler.handleMouseUp, 1), document.jAddEvent("mousemove", t, 1), document.jAddEvent("mouseup", e, 1), this.jStore("event:mousedrag:listeners:document:move", t), this.jStore("event:mousedrag:listeners:document:end", e)
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", r.Event.Custom.mousedrag.handler.handleMouseDown), this.jRemoveEvent("mouseup", r.Event.Custom.mousedrag.handler.handleMouseUp), m(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || r.$F), m(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || r.$F), this.jDel("event:mousedrag:listeners:document:move"), this.jDel("event:mousedrag:listeners:document:end")
                },
                handleMouseDown: function(t) {
                    var e;
                    1 === t.getButton() && (e = new r.Event.Custom.mousedrag(this, t, "dragstart"), this.jStore("event:mousedrag:dragstart", e))
                },
                handleMouseUp: function(t) {
                    var e;
                    (e = this.jFetch("event:mousedrag:dragstart")) && (e.dragged && t.stopDefaults(), e = new r.Event.Custom.mousedrag(this, t, "dragend"), this.jDel("event:mousedrag:dragstart"), this.jCallEvent("mousedrag", e))
                },
                handleMouseMove: function(t) {
                    var e;
                    (e = this.jFetch("event:mousedrag:dragstart")) && (t.stopDefaults(), e.dragged || (e.dragged = !0, this.jCallEvent("mousedrag", e)), e = new r.Event.Custom.mousedrag(this, t, "dragmove"), this.jCallEvent("mousedrag", e))
                }
            },
            function(o) {
                o.$;
                o.Event.Custom.dblbtnclick = new o.Class(o.extend(o.Event.Custom, {
                    type: "dblbtnclick",
                    timedout: !1,
                    tm: null,
                    init: function(t, e) {
                        var i = e.jGetPageXY();
                        this.x = i.x, this.y = i.y, this.clientX = e.clientX, this.clientY = e.clientY, this.timeStamp = e.timeStamp, this.button = e.getButton(), this.target = t, this.pushToEvents(e)
                    }
                })), o.Event.Custom.dblbtnclick.handler = {
                    options: {
                        threshold: 200
                    },
                    add: function(t) {
                        this.jStore("event:dblbtnclick:options", o.extend(o.detach(o.Event.Custom.dblbtnclick.handler.options), t || {})), this.jAddEvent("btnclick", o.Event.Custom.dblbtnclick.handler.handle, 1)
                    },
                    jRemove: function() {
                        this.jRemoveEvent("btnclick", o.Event.Custom.dblbtnclick.handler.handle)
                    },
                    handle: function(t) {
                        var e, i;
                        e = this.jFetch("event:dblbtnclick:event"), i = this.jFetch("event:dblbtnclick:options"), e ? (clearTimeout(e.tm), this.jDel("event:dblbtnclick:event"), e.timedout || (e.pushToEvents(t), t.stopQueue().stop(), this.jCallEvent("dblbtnclick", e))) : ((e = new o.Event.Custom.dblbtnclick(this, t)).tm = setTimeout(function() {
                            e.timedout = !0, t.isQueueStopped = o.$false, this.jCallEvent("btnclick", t), this.jDel("event:dblbtnclick:event")
                        }.jBind(this), i.threshold + 10), this.jStore("event:dblbtnclick:event", e), t.stopQueue())
                    }
                }
            }(t),
            function(i) {
                i.$;
                i.Event.Custom.tap = new i.Class(i.extend(i.Event.Custom, {
                    type: "tap",
                    id: null,
                    init: function(t, e) {
                        var i = e.getPrimaryTouch();
                        this.id = i.pointerId || i.identifier, this.x = i.pageX, this.y = i.pageY, this.pageX = i.pageX, this.pageY = i.pageY, this.clientX = i.clientX, this.clientY = i.clientY, this.timeStamp = e.timeStamp, this.button = 0, this.target = t, this.pushToEvents(e)
                    }
                })), i.Event.Custom.tap.handler = {
                    add: function(t) {
                        this.jAddEvent(["touchstart", "pointerdown"], i.Event.Custom.tap.handler.onTouchStart, 1), this.jAddEvent(["touchend", "pointerup"], i.Event.Custom.tap.handler.onTouchEnd, 1), this.jAddEvent("click", i.Event.Custom.tap.handler.onClick, 1)
                    },
                    jRemove: function() {
                        this.jRemoveEvent(["touchstart", "pointerdown"], i.Event.Custom.tap.handler.onTouchStart), this.jRemoveEvent(["touchend", "pointerup"], i.Event.Custom.tap.handler.onTouchEnd), this.jRemoveEvent("click", i.Event.Custom.tap.handler.onClick)
                    },
                    onClick: function(t) {
                        t.stopDefaults()
                    },
                    onTouchStart: function(t) {
                        t.isPrimaryTouch() ? (this.jStore("event:tap:event", new i.Event.Custom.tap(this, t)), this.jStore("event:btnclick:ignore", !0)) : this.jDel("event:tap:event")
                    },
                    onTouchEnd: function(t) {
                        i.now();
                        var e = this.jFetch("event:tap:event");
                        this.jFetch("event:tap:options");
                        e && t.isPrimaryTouch() && (this.jDel("event:tap:event"), e.id === t.getPrimaryTouchId() && t.timeStamp - e.timeStamp <= 200 && Math.sqrt(Math.pow(t.getPrimaryTouch().pageX - e.x, 2) + Math.pow(t.getPrimaryTouch().pageY - e.y, 2)) <= 10 && (this.jDel("event:btnclick:btnclickEvent"), t.stop(), e.pushToEvents(t), this.jCallEvent("tap", e)))
                    }
                }
            }(t), d.Event.Custom.dbltap = new d.Class(d.extend(d.Event.Custom, {
                type: "dbltap",
                timedout: !1,
                tm: null,
                init: function(t, e) {
                    this.x = e.x, this.y = e.y, this.clientX = e.clientX, this.clientY = e.clientY, this.timeStamp = e.timeStamp, this.button = 0, this.target = t, this.pushToEvents(e)
                }
            })), d.Event.Custom.dbltap.handler = {
                options: {
                    threshold: 300
                },
                add: function(t) {
                    this.jStore("event:dbltap:options", d.extend(d.detach(d.Event.Custom.dbltap.handler.options), t || {})), this.jAddEvent("tap", d.Event.Custom.dbltap.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent("tap", d.Event.Custom.dbltap.handler.handle)
                },
                handle: function(t) {
                    var e, i;
                    e = this.jFetch("event:dbltap:event"), i = this.jFetch("event:dbltap:options"), e ? (clearTimeout(e.tm), this.jDel("event:dbltap:event"), e.timedout || (e.pushToEvents(t), t.stopQueue().stop(), this.jCallEvent("dbltap", e))) : ((e = new d.Event.Custom.dbltap(this, t)).tm = setTimeout(function() {
                        e.timedout = !0, t.isQueueStopped = d.$false, this.jCallEvent("tap", t)
                    }.jBind(this), i.threshold + 10), this.jStore("event:dbltap:event", e), t.stopQueue())
                }
            }, u = (c = t).$, c.Event.Custom.touchdrag = new c.Class(c.extend(c.Event.Custom, {
                type: "touchdrag",
                state: "dragstart",
                id: null,
                dragged: !1,
                init: function(t, e, i) {
                    var o = e.getPrimaryTouch();
                    this.id = o.pointerId || o.identifier, this.clientX = o.clientX, this.clientY = o.clientY, this.pageX = o.pageX, this.pageY = o.pageY, this.x = o.pageX, this.y = o.pageY, this.timeStamp = e.timeStamp, this.button = 0, this.target = t, this.pushToEvents(e), this.state = i
                }
            })), c.Event.Custom.touchdrag.handler = {
                add: function() {
                    var t = c.Event.Custom.touchdrag.handler.onTouchMove.jBind(this),
                        e = c.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
                    this.jAddEvent(["touchstart", "pointerdown"], c.Event.Custom.touchdrag.handler.onTouchStart, 1), this.jAddEvent(["touchend", "pointerup"], c.Event.Custom.touchdrag.handler.onTouchEnd, 1), this.jAddEvent(["touchmove", "pointermove"], c.Event.Custom.touchdrag.handler.onTouchMove, 1), this.jStore("event:touchdrag:listeners:document:move", t), this.jStore("event:touchdrag:listeners:document:end", e), u(document).jAddEvent("pointermove", t, 1), u(document).jAddEvent("pointerup", e, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", "pointerdown"], c.Event.Custom.touchdrag.handler.onTouchStart), this.jRemoveEvent(["touchend", "pointerup"], c.Event.Custom.touchdrag.handler.onTouchEnd), this.jRemoveEvent(["touchmove", "pointermove"], c.Event.Custom.touchdrag.handler.onTouchMove), u(document).jRemoveEvent("pointermove", this.jFetch("event:touchdrag:listeners:document:move") || c.$F, 1), u(document).jRemoveEvent("pointerup", this.jFetch("event:touchdrag:listeners:document:end") || c.$F, 1), this.jDel("event:touchdrag:listeners:document:move"), this.jDel("event:touchdrag:listeners:document:end")
                },
                onTouchStart: function(t) {
                    var e;
                    t.isPrimaryTouch() && (e = new c.Event.Custom.touchdrag(this, t, "dragstart"), this.jStore("event:touchdrag:dragstart", e))
                },
                onTouchEnd: function(t) {
                    var e;
                    (e = this.jFetch("event:touchdrag:dragstart")) && e.dragged && e.id === t.getPrimaryTouchId() && (e = new c.Event.Custom.touchdrag(this, t, "dragend"), this.jDel("event:touchdrag:dragstart"), this.jCallEvent("touchdrag", e))
                },
                onTouchMove: function(t) {
                    var e;
                    (e = this.jFetch("event:touchdrag:dragstart")) && t.isPrimaryTouch() && (e.id === t.getPrimaryTouchId() ? (!e.dragged && 10 < Math.sqrt(Math.pow(t.getPrimaryTouch().pageX - e.x, 2) + Math.pow(t.getPrimaryTouch().pageY - e.y, 2)) && (e.dragged = !0, this.jCallEvent("touchdrag", e)), e.dragged && (e = new c.Event.Custom.touchdrag(this, t, "dragmove"), this.jCallEvent("touchdrag", e))) : this.jDel("event:touchdrag:dragstart"))
                }
            }, g = (p = t).$, v = null, p.Event.Custom.pinch = new p.Class(p.extend(p.Event.Custom, {
                type: "pinch",
                state: "pinchstart",
                init: function(t, e, i, o) {
                    this.target = t, this.state = i, this.x = o.x, this.y = o.y, this.timeStamp = e.timeStamp, this.scale = o.scale, this.space = o.space, this.zoom = o.zoom, this.state = i, this.centerPoint = o.centerPoint, this.points = o.points, this.pushToEvents(e)
                }
            })), p.Event.Custom.pinch.handler = {
                variables: {
                    x: 0,
                    y: 0,
                    space: 0,
                    scale: 1,
                    zoom: 0,
                    startSpace: 0,
                    startScale: 1,
                    started: !1,
                    dragged: !1,
                    points: [],
                    centerPoint: {
                        x: 0,
                        y: 0
                    }
                },
                add: function(t) {
                    var e;
                    v || ((e = g(window).jGetSize()).width = Math.min(e.width, e.height), e.height = e.width, v = Math.pow(y({
                        x: 0,
                        y: 0
                    }, {
                        x: e.width,
                        y: e.height
                    }), 2));
                    var i = p.Event.Custom.pinch.handler.onTouchMove.jBind(this),
                        o = p.Event.Custom.pinch.handler.onTouchEnd.jBind(this);
                    this.jAddEvent(["click", "tap"], p.Event.Custom.pinch.handler.onClick, 1), this.jAddEvent(["touchstart", "pointerdown"], p.Event.Custom.pinch.handler.onTouchStart, 1), this.jAddEvent(["touchend", "pointerup"], p.Event.Custom.pinch.handler.onTouchEnd, 1), this.jAddEvent(["touchmove", "pointermove"], p.Event.Custom.pinch.handler.onTouchMove, 1), this.jStore("event:pinch:listeners:touchmove", i), this.jStore("event:pinch:listeners:touchend", o), p.doc.jAddEvent("pointermove", i, 1), p.doc.jAddEvent("pointerup", o, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["click", "tap"], p.Event.Custom.pinch.handler.onClick), this.jRemoveEvent(["touchstart", "pointerdown"], p.Event.Custom.pinch.handler.onTouchStart), this.jRemoveEvent(["touchend", "pointerup"], p.Event.Custom.pinch.handler.onTouchEnd), this.jRemoveEvent(["touchmove", "pointermove"], p.Event.Custom.pinch.handler.onTouchMove), p.doc.jRemoveEvent("pointermove", this.jFetch("event:pinch:listeners:touchmove")), p.doc.jRemoveEvent("pointerup", this.jFetch("event:pinch:listeners:touchend")), this.jDel("event:pinch:listeners:touchmove"), this.jDel("event:pinch:listeners:touchend"), this.jDel("event:pinch:pinchstart"), this.jDel("event:pinch:variables"), this.jDel("event:pinch:activepoints");
                    var t = this.jFetch("event:pinch:cache");
                    t && t.clear(), this.jDel("event:pinch:cache")
                },
                onClick: function(t) {
                    t.stop()
                },
                setVariables: function(t, e) {
                    var i, o, n, s, a, h, r, d, l = e.space;
                    1 < t.length ? (e.space = (i = t, o = e, s = Array.prototype.slice.call(i), a = Math.abs(s[1].pageX - s[0].pageX), h = Math.abs(s[1].pageY - s[0].pageY), r = Math.min(s[1].pageX, s[0].pageX) + a / 2, d = Math.min(s[1].pageY, s[0].pageY) + h / 2, o.points = [s[0], s[1]], n = Math.pow(y({
                        x: s[0].pageX,
                        y: s[0].pageY
                    }, {
                        x: s[1].pageX,
                        y: s[1].pageY
                    }), 2), o.centerPoint = {
                        x: r,
                        y: d
                    }, o.x = o.centerPoint.x, o.y = o.centerPoint.y, n), e.startSpace || (e.startSpace = e.space), l > e.space ? e.zoom = -1 : l < e.space ? e.zoom = 1 : e.zoom = 0, e.scale = e.space / v) : e.points = Array.prototype.slice.call(t, 0, 2)
                },
                onTouchMove: function(t) {
                    var e, i = this.jFetch("event:pinch:cache"),
                        o = this.jFetch("event:pinch:variables") || p.extend({}, p.Event.Custom.pinch.handler.variables),
                        n = this.jFetch("event:pinch:activepoints");
                    if (o.started) {
                        if (t.pointerId && !S(t, i, !0)) return;
                        t.stop(), p.Event.Custom.pinch.handler.setVariables(A(C(t, i), n), o), e = new p.Event.Custom.pinch(this, t, "pinchmove", o), this.jCallEvent("pinch", e)
                    }
                },
                onTouchStart: function(t) {
                    var e, i, o, n = this.jFetch("event:pinch:cache"),
                        s = this.jFetch("event:pinch:activepoints");
                    "mouse" !== t.pointerType && (s || (s = g([]), this.jStore("event:pinch:activepoints", s)), s.length || g(t.target).jAddEvent(["touchend", "pointerup"], this.jFetch("event:pinch:listeners:touchend"), 1), n || (n = new Map, this.jStore("event:pinch:cache", n)), S(t, n), B(o = C(t, n), s), 2 === o.length && (e = this.jFetch("event:pinch:pinchstart"), i = this.jFetch("event:pinch:variables") || p.extend({}, p.Event.Custom.pinch.handler.variables), p.Event.Custom.pinch.handler.setVariables(A(o, s), i), e || (e = new p.Event.Custom.pinch(this, t, "pinchstart", i), this.jStore("event:pinch:pinchstart", e), this.jStore("event:pinch:variables", i), v = i.space, this.jCallEvent("pinch", e), i.started = !0)))
                },
                onTouchEnd: function(t) {
                    var e, i, o, n, s, a, h, r, d = this.jFetch("event:pinch:cache");
                    "mouse" !== t.pointerType && (!t.pointerId || d && d.has(t.pointerId)) && (i = this.jFetch("event:pinch:pinchstart"), o = this.jFetch("event:pinch:variables"), s = this.jFetch("event:pinch:activepoints"), e = C(t, d), r = d, (h = t).pointerId && "touch" === h.pointerType && r && r.has(h.pointerId) && r.delete(h.pointerId), a = T(e, s), i && o && o.started && a && s && (a && B(e, s), n = "pinchend", 1 < e.length ? n = "pinchresize" : (t.target.jRemoveEvent(["touchend", "pointerup"], this.jFetch("event:pinch:listeners:touchend")), d && d.clear(), this.jDel("event:pinch:pinchstart"), this.jDel("event:pinch:variables"), this.jDel("event:pinch:cache"), this.jDel("event:pinch:activepoints")), p.Event.Custom.pinch.handler.setVariables(A(e, s), o), i = new p.Event.Custom.pinch(this, t, n, o), this.jCallEvent("pinch", i)))
                }
            },
            function(d) {
                var l, m;
                d.$;

                function c() {
                    l = null
                }
                d.Event.Custom.mousescroll = new d.Class(d.extend(d.Event.Custom, {
                    type: "mousescroll",
                    init: function(t, e, i, o, n, s, a) {
                        var h = e.jGetPageXY();
                        this.x = h.x, this.y = h.y, this.timeStamp = e.timeStamp, this.target = t, this.delta = i || 0, this.deltaX = o || 0, this.deltaY = n || 0, this.deltaZ = s || 0, this.deltaFactor = a || 0, this.deltaMode = e.deltaMode || 0, this.isMouse = !1, this.pushToEvents(e)
                    }
                })), d.Event.Custom.mousescroll.handler = {
                    eventType: "onwheel" in document || 8 < d.browser.ieMode ? "wheel" : "mousewheel",
                    add: function() {
                        this.jAddEvent(d.Event.Custom.mousescroll.handler.eventType, d.Event.Custom.mousescroll.handler.handle, 1)
                    },
                    jRemove: function() {
                        this.jRemoveEvent(d.Event.Custom.mousescroll.handler.eventType, d.Event.Custom.mousescroll.handler.handle, 1)
                    },
                    handle: function(t) {
                        var e, i, o, n, s, a = 0,
                            h = 0,
                            r = 0;
                        t.detail && (r = -1 * t.detail), void 0 !== t.wheelDelta && (r = t.wheelDelta), void 0 !== t.wheelDeltaY && (r = t.wheelDeltaY), void 0 !== t.wheelDeltaX && (h = -1 * t.wheelDeltaX), t.deltaY && (r = -1 * t.deltaY), t.deltaX && (h = t.deltaX), 0 === r && 0 === h || (a = 0 === r ? h : r, e = Math.max(Math.abs(r), Math.abs(h)), (!l || e < l) && (l = e), i = 0 < a ? "floor" : "ceil", a = Math[i](a / l), h = Math[i](h / l), r = Math[i](r / l), m && clearTimeout(m), m = setTimeout(c, 200), (o = new d.Event.Custom.mousescroll(this, t, a, h, r, 0, l)).isMouse = (n = l, s = t.deltaMode || 0, 50 < n || 1 === s && !("win" == d.browser.platform && n < 1) || 0 == n % 12 || 0 == n % 4.000244140625), this.jCallEvent("mousescroll", o))
                    }
                }
            }(t), d.win = d.$(window), d.doc = d.$(document), t
    }()),
    function(n) {
        if (!n) throw "MagicJS not found";
        if (!n.FX) {
            var o = n.$;
            n.FX = new n.Class({
                init: function(t, e) {
                    var i;
                    this.el = n.$(t), this.options = n.extend(this.options, e), this.timer = !1, this.easeFn = this.cubicBezierAtTime, i = n.FX.Transition[this.options.transition] || this.options.transition, "function" === n.jTypeOf(i) ? this.easeFn = i : this.cubicBezier = this.parseCubicBezier(i) || this.parseCubicBezier("ease"), "string" == n.jTypeOf(this.options.cycles) && (this.options.cycles = "infinite" === this.options.cycles ? 1 / 0 : parseInt(this.options.cycles) || 1)
                },
                options: {
                    fps: 60,
                    duration: 600,
                    transition: "ease",
                    cycles: 1,
                    direction: "normal",
                    onStart: n.$F,
                    onComplete: n.$F,
                    onBeforeRender: n.$F,
                    onAfterRender: n.$F,
                    forceAnimation: !1,
                    roundCss: !1
                },
                styles: null,
                cubicBezier: null,
                easeFn: null,
                setTransition: function(t) {
                    this.options.transition = t, t = n.FX.Transition[this.options.transition] || this.options.transition, "function" === n.jTypeOf(t) ? this.easeFn = t : (this.easeFn = this.cubicBezierAtTime, this.cubicBezier = this.parseCubicBezier(t) || this.parseCubicBezier("ease"))
                },
                start: function(t) {
                    var e, i = /\%$/;
                    for (e in this.styles = t || {}, this.cycle = 0, this.state = 0, this.curFrame = 0, this.pStyles = {}, this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction, this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction, this.styles) i.test(this.styles[e][0]) && (this.pStyles[e] = !0), "reverse" !== this.options.direction && "alternate-reverse" !== this.options.direction && "continuous-reverse" !== this.options.direction || this.styles[e].reverse();
                    return this.startTime = n.now(), this.finishTime = this.startTime + this.options.duration, this.options.onStart.call(), 0 === this.options.duration ? (this.render(1), this.options.onComplete.call()) : (this.loopBind = this.loop.jBind(this), !this.options.forceAnimation && n.browser.features.requestAnimationFrame ? this.timer = n.browser.requestAnimationFrame.call(window, this.loopBind) : this.timer = this.loopBind.interval(Math.round(1e3 / this.options.fps))), this
                },
                stopAnimation: function() {
                    this.timer && (!this.options.forceAnimation && n.browser.features.requestAnimationFrame && n.browser.cancelAnimationFrame ? n.browser.cancelAnimationFrame.call(window, this.timer) : clearInterval(this.timer), this.timer = !1)
                },
                stop: function(t) {
                    return t = !!n.defined(t) && t, this.stopAnimation(), t && (this.render(1), this.options.onComplete.jDelay(10)), this
                },
                calc: function(t, e, i) {
                    return t = parseFloat(t), ((e = parseFloat(e)) - t) * i + t
                },
                loop: function() {
                    var t = n.now(),
                        e = (t - this.startTime) / this.options.duration,
                        i = Math.floor(e);
                    if (t >= this.finishTime && i >= this.options.cycles) return this.stopAnimation(), this.render(1), this.options.onComplete.jDelay(10), this;
                    if (this.alternate && this.cycle < i)
                        for (var o in this.styles) this.styles[o].reverse();
                    this.cycle = i, !this.options.forceAnimation && n.browser.features.requestAnimationFrame && (this.timer = n.browser.requestAnimationFrame.call(window, this.loopBind)), this.render((this.continuous ? i : 0) + this.easeFn(e % 1))
                },
                render: function(t) {
                    var e = {};
                    for (var i in this.styles) "opacity" === i ? e[i] = Math.round(100 * this.calc(this.styles[i][0], this.styles[i][1], t)) / 100 : (e[i] = this.calc(this.styles[i][0], this.styles[i][1], t), this.pStyles[i] && (e[i] += "%"));
                    this.options.onBeforeRender(e, this.el), this.set(e), this.options.onAfterRender(e, this.el)
                },
                set: function(t) {
                    return this.el.jSetCss(t)
                },
                parseCubicBezier: function(t) {
                    var e, i = null;
                    if ("string" !== n.jTypeOf(t)) return null;
                    switch (t) {
                        case "linear":
                            i = o([0, 0, 1, 1]);
                            break;
                        case "ease":
                            i = o([.25, .1, .25, 1]);
                            break;
                        case "ease-in":
                            i = o([.42, 0, 1, 1]);
                            break;
                        case "ease-out":
                            i = o([0, 0, .58, 1]);
                            break;
                        case "ease-in-out":
                            i = o([.42, 0, .58, 1]);
                            break;
                        case "easeInSine":
                            i = o([.47, 0, .745, .715]);
                            break;
                        case "easeOutSine":
                            i = o([.39, .575, .565, 1]);
                            break;
                        case "easeInOutSine":
                            i = o([.445, .05, .55, .95]);
                            break;
                        case "easeInQuad":
                            i = o([.55, .085, .68, .53]);
                            break;
                        case "easeOutQuad":
                            i = o([.25, .46, .45, .94]);
                            break;
                        case "easeInOutQuad":
                            i = o([.455, .03, .515, .955]);
                            break;
                        case "easeInCubic":
                            i = o([.55, .055, .675, .19]);
                            break;
                        case "easeOutCubic":
                            i = o([.215, .61, .355, 1]);
                            break;
                        case "easeInOutCubic":
                            i = o([.645, .045, .355, 1]);
                            break;
                        case "easeInQuart":
                            i = o([.895, .03, .685, .22]);
                            break;
                        case "easeOutQuart":
                            i = o([.165, .84, .44, 1]);
                            break;
                        case "easeInOutQuart":
                            i = o([.77, 0, .175, 1]);
                            break;
                        case "easeInQuint":
                            i = o([.755, .05, .855, .06]);
                            break;
                        case "easeOutQuint":
                            i = o([.23, 1, .32, 1]);
                            break;
                        case "easeInOutQuint":
                            i = o([.86, 0, .07, 1]);
                            break;
                        case "easeInExpo":
                            i = o([.95, .05, .795, .035]);
                            break;
                        case "easeOutExpo":
                            i = o([.19, 1, .22, 1]);
                            break;
                        case "easeInOutExpo":
                            i = o([1, 0, 0, 1]);
                            break;
                        case "easeInCirc":
                            i = o([.6, .04, .98, .335]);
                            break;
                        case "easeOutCirc":
                            i = o([.075, .82, .165, 1]);
                            break;
                        case "easeInOutCirc":
                            i = o([.785, .135, .15, .86]);
                            break;
                        case "easeInBack":
                            i = o([.6, -.28, .735, .045]);
                            break;
                        case "easeOutBack":
                            i = o([.175, .885, .32, 1.275]);
                            break;
                        case "easeInOutBack":
                            i = o([.68, -.55, .265, 1.55]);
                            break;
                        default:
                            if ((t = t.replace(/\s/g, "")).match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/))
                                for (e = (i = t.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",")).length - 1; 0 <= e; e--) i[e] = parseFloat(i[e])
                    }
                    return o(i)
                },
                cubicBezierAtTime: function(t) {
                    var e, l = 0,
                        m = 0,
                        c = 0,
                        i = 0,
                        o = 0,
                        n = 0,
                        s = this.options.duration;

                    function u(t) {
                        return ((l * t + m) * t + c) * t
                    }
                    return c = 3 * this.cubicBezier[0], m = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - c, l = 1 - c - m, n = 3 * this.cubicBezier[1], o = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - n, i = 1 - n - o, e = function(t, e) {
                        var i, o, n, s, a, h, r;

                        function d(t) {
                            return 0 <= t ? t : 0 - t
                        }
                        for (n = t, h = 0; h < 8; h++) {
                            if (d(s = u(n) - t) < e) return n;
                            if (d(a = (3 * l * (r = n) + 2 * m) * r + c) < 1e-6) break;
                            n -= s / a
                        }
                        if (o = 1, (n = t) < (i = 0)) return i;
                        if (o < n) return o;
                        for (; i < o;) {
                            if (d((s = u(n)) - t) < e) return n;
                            s < t ? i = n : o = n, n = .5 * (o - i) + i
                        }
                        return n
                    }(t, 1 / (200 * s)), ((i * e + o) * e + n) * e
                }
            }), n.FX.Transition = {
                linear: "linear",
                sineIn: "easeInSine",
                sineOut: "easeOutSine",
                expoIn: "easeInExpo",
                expoOut: "easeOutExpo",
                quadIn: "easeInQuad",
                quadOut: "easeOutQuad",
                cubicIn: "easeInCubic",
                cubicOut: "easeOutCubic",
                backIn: "easeInBack",
                backOut: "easeOutBack",
                elasticIn: function(t, e) {
                    return e = e || [], Math.pow(2, 10 * --t) * Math.cos(20 * t * Math.PI * (e[0] || 1) / 3)
                },
                elasticOut: function(t, e) {
                    return 1 - n.FX.Transition.elasticIn(1 - t, e)
                },
                bounceIn: function(t) {
                    for (var e = 0, i = 1;; e += i, i /= 2)
                        if ((7 - 4 * e) / 11 <= t) return i * i - Math.pow((11 - 6 * e - 11 * t) / 4, 2)
                },
                bounceOut: function(t) {
                    return 1 - n.FX.Transition.bounceIn(1 - t)
                },
                none: function(t) {
                    return 0
                }
            }
        }
    }(e),
    function(i) {
        if (!i) throw "MagicJS not found";
        if (!i.PFX) {
            i.$;
            i.PFX = new i.Class(i.FX, {
                init: function(t, e) {
                    this.el_arr = t, this.options = i.extend(this.options, e), this.timer = !1, this.$parent.init()
                },
                start: function(t) {
                    var e, i, o = /\%$/,
                        n = t.length;
                    for (this.styles_arr = t, this.pStyles_arr = new Array(n), i = 0; i < n; i++)
                        for (e in this.pStyles_arr[i] = {}, t[i]) o.test(t[i][e][0]) && (this.pStyles_arr[i][e] = !0), "reverse" !== this.options.direction && "alternate-reverse" !== this.options.direction && "continuous-reverse" !== this.options.direction || this.styles_arr[i][e].reverse();
                    return this.$parent.start({}), this
                },
                render: function(t) {
                    for (var e = 0; e < this.el_arr.length; e++) this.el = i.$(this.el_arr[e]), this.styles = this.styles_arr[e], this.pStyles = this.pStyles_arr[e], this.$parent.render(t)
                }
            })
        }
    }(e),
    function(h) {
        if (!h) throw "MagicJS not found";
        if (!h.Tooltip) {
            h.$;
            h.Tooltip = function(t, e) {
                var a = this.tooltip = h.$new("div", null, {
                    position: "absolute",
                    "z-index": 999
                }).jAddClass("MagicToolboxTooltip");
                h.$(t).jAddEvent("mouseover", function() {
                    a.jAppendTo(document.body)
                }), h.$(t).jAddEvent("mouseout", function() {
                    a.jRemove()
                }), h.$(t).jAddEvent("mousemove", function(t) {
                    var e = h.$(t).jGetPageXY(),
                        i = a.jGetSize(),
                        o = h.$(window).jGetSize(),
                        n = h.$(window).jGetScroll();

                    function s(t, e, i) {
                        return i < (t - e) / 2 ? i : (t + e) / 2 < i ? i - e : (t - e) / 2
                    }
                    a.jSetCss({
                        left: n.x + s(o.width, i.width + 40, e.x - n.x) + 20,
                        top: n.y + s(o.height, i.height + 40, e.y - n.y) + 20
                    })
                }), this.text(e)
            }, h.Tooltip.prototype.text = function(t) {
                this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild), this.tooltip.append(document.createTextNode(t))
            }
        }
    }(e),
    function(n) {
        if (!n) throw "MagicJS not found";
        if (!n.MessageBox) {
            n.$;
            n.Message = function(t, e, i, o) {
                this.hideTimer = null, this.messageBox = n.$new("span", null, {
                    position: "absolute",
                    "z-index": 999,
                    visibility: "hidden",
                    opacity: .8
                }).jAddClass(o || "").jAppendTo(i || document.body), this.setMessage(t), this.show(e)
            }, n.Message.prototype.show = function(t) {
                this.messageBox.show(), this.hideTimer = this.hide.jBind(this).jDelay(n.ifndef(t, 5e3))
            }, n.Message.prototype.hide = function(t) {
                clearTimeout(this.hideTimer), this.hideTimer = null, this.messageBox && !this.hideFX && (this.hideFX = new e.FX(this.messageBox, {
                    duration: n.ifndef(t, 500),
                    onComplete: function() {
                        this.messageBox.kill(), delete this.messageBox, this.hideFX = null
                    }.jBind(this)
                }).start({
                    opacity: [this.messageBox.jGetCss("opacity"), 0]
                }))
            }, n.Message.prototype.setMessage = function(t) {
                this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild), this.messageBox.append(document.createTextNode(t))
            }
        }
    }(e),
    function(a) {
        if (!a) throw "MagicJS not found";
        if (!a.Options) {
            function n(t, e, i) {
                var o;
                if (o = t.hasOwnProperty("oneOf") ? t.oneOf : [t], "array" != a.jTypeOf(o)) return !1;
                for (var n = 0, s = o.length - 1; n <= s; n++)
                    if (l[o[n].type](o[n], e, i)) return !0;
                return !1
            }

            function o(t) {
                var e, i, o, n;
                if (t.hasOwnProperty("oneOf"))
                    for (o = t.oneOf.length, e = 0; e < o; e++)
                        for (i = e + 1; i < o; i++) d[t.oneOf[e].type] > d[t.oneOf[i].type] && (n = t.oneOf[e], t.oneOf[e] = t.oneOf[i], t.oneOf[i] = n);
                return t
            }

            function s(t) {
                var e;
                if (e = t.hasOwnProperty("oneOf") ? t.oneOf : [t], "array" != a.jTypeOf(e)) return !1;
                for (var i = e.length - 1; 0 <= i; i--) {
                    if (!e[i].type || !d.hasOwnProperty(e[i].type)) return !1;
                    if (a.defined(e[i].enum)) {
                        if ("array" !== a.jTypeOf(e[i].enum)) return !1;
                        for (var o = e[i].enum.length - 1; 0 <= o; o--)
                            if (!l[e[i].type]({
                                    type: e[i].type
                                }, e[i].enum[o], !0)) return !1
                    }
                }
                return !(t.hasOwnProperty("default") && !n(t, t.default, !0))
            }

            function t(t) {
                this.schema = {}, this.options = {}, this.parseSchema(t)
            }
            var h = a.$,
                r = null,
                d = {
                    boolean: 1,
                    array: 2,
                    number: 3,
                    function: 4,
                    string: 100
                },
                l = {
                    boolean: function(t, e, i) {
                        if ("boolean" != a.jTypeOf(e)) {
                            if (i || "string" != a.jTypeOf(e)) return !1;
                            if (!/^(true|false)$/.test(e)) return !1;
                            e = e.jToBool()
                        }
                        return !(t.hasOwnProperty("enum") && !h(t.enum).contains(e)) && (r = e, !0)
                    },
                    string: function(t, e, i) {
                        return "string" === a.jTypeOf(e) && (!(t.hasOwnProperty("enum") && !h(t.enum).contains(e)) && (r = "" + e, !0))
                    },
                    number: function(t, e, i) {
                        var o = "string" == a.jTypeOf(e) && /%$/.test(e);
                        return (!i || 0 != typeof e) && (e = parseFloat(e), !isNaN(e) && (isNaN(t.minimum) && (t.minimum = Number.NEGATIVE_INFINITY), isNaN(t.maximum) && (t.maximum = Number.POSITIVE_INFINITY), !(t.hasOwnProperty("enum") && !h(t.enum).contains(e)) && (!(t.minimum > e || e > t.maximum) && (r = o ? e + "%" : e, !0))))
                    },
                    array: function(t, e, i) {
                        if ("string" === a.jTypeOf(e)) try {
                            e = window.JSON.parse(e)
                        } catch (t) {
                            return !1
                        }
                        return "array" === a.jTypeOf(e) && (r = e, !0)
                    },
                    function: function(t, e, i) {
                        return "function" === a.jTypeOf(e) && (r = e, !0)
                    }
                };
            a.extend(t.prototype, {
                parseSchema: function(t) {
                    var e, i;
                    for (e in t)
                        if (t.hasOwnProperty(e) && (i = (e + "").jTrim().jCamelize(), !this.schema.hasOwnProperty(i))) {
                            if (this.schema[i] = o(t[e]), !s(this.schema[i])) throw "Incorrect definition of the '" + e + "' parameter in " + t;
                            this.options[i] = void 0
                        }
                },
                set: function(t, e) {
                    t = (t + "").jTrim().jCamelize(), "string" == a.jTypeOf(e) && (e = e.jTrim()), this.schema.hasOwnProperty(t) && (r = e, n(this.schema[t], e) && (this.options[t] = r), r = null)
                },
                get: function(t) {
                    if (t = (t + "").jTrim().jCamelize(), this.schema.hasOwnProperty(t)) return a.defined(this.options[t]) ? this.options[t] : this.schema[t].default
                },
                fromJSON: function(t) {
                    for (var e in t) this.set(e, t[e])
                },
                getJSON: function() {
                    var t = a.extend({}, this.options);
                    for (var e in t) void 0 === t[e] && void 0 !== this.schema[e].default && (t[e] = this.schema[e].default);
                    return t
                },
                fromString: function(t) {
                    h(t.split(";")).jEach(h(function(t) {
                        t = t.split(":"), this.set(t.shift().jTrim(), t.join(":"))
                    }).jBind(this))
                },
                exists: function(t) {
                    return t = (t + "").jTrim().jCamelize(), this.schema.hasOwnProperty(t)
                },
                isset: function(t) {
                    return t = (t + "").jTrim().jCamelize(), this.exists(t) && a.defined(this.options[t])
                },
                jRemove: function(t) {
                    t = (t + "").jTrim().jCamelize(), this.exists(t) && (delete this.options[t], delete this.schema[t])
                }
            }), a.Options = t
        }
    }(e),
    function(t) {
        if (!t) throw "MagicJS not found";
        var e = t.$;
        if (!t.SVGImage) {
            function i(t) {
                this.filters = {}, this.originalImage = e(t), this.canvas = e(document.createElementNS(o, "svg")), this.canvas.setAttribute("width", this.originalImage.naturalWidth || this.originalImage.width), this.canvas.setAttribute("height", this.originalImage.naturalHeight || this.originalImage.height), this.image = e(document.createElementNS(o, "image")), this.image.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.originalImage.getAttribute("src")), this.image.setAttribute("width", "100%"), this.image.setAttribute("height", "100%"), this.image.jAppendTo(this.canvas)
            }
            var o = "http://www.w3.org/2000/svg";
            i.prototype.getNode = function() {
                return this.canvas
            }, i.prototype.blur = function(t) {
                if (!(Math.round(t) < 1)) return this.filters.blur ? this.filters.blur.firstChild.setAttribute("stdDeviation", t) : (this.filters.blur = e(document.createElementNS(o, "filter")), this.filters.blur.setAttribute("id", "filterBlur"), this.filters.blur.appendChild(e(document.createElementNS(o, "feGaussianBlur")).setProps({ in: "SourceGraphic",
                    stdDeviation: t
                })), this.filters.blur.jAppendTo(this.canvas), this.image.setAttribute("filter", "url(#filterBlur)")), this
            }, t.SVGImage = i
        }
    }(e);
    var p, g, i = (g = (p = e).$, t.prototype = {
        setupContent: function() {
            this.root = p.$new("div").jAddClass(this.rootCSS).jAddClass(this.rootCSS + "-" + this.settings.orientation).jSetCss({
                visibility: "hidden"
            }), this.wrapper = p.$new("div").jAddClass(this.rootCSS + "-wrapper").jAppendTo(this.root), this.root.jAppendTo(this.parent), g(["prev", "next"]).jEach(function(t) {
                this.buttons[t] = p.$new("button").jAddClass(this.rootCSS + "-button").jAddClass(this.rootCSS + "-button-" + t).jAppendTo(this.root).jAddEvent("btnclick tap", function(t, e) {
                    g(t).events[0].stop().stopQueue(), g(t).stopDistribution(), this.scroll(e)
                }.jBindAsEvent(this, t))
            }.jBind(this)), this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled"), this.context = p.$new("ul").jAddEvent("btnclick tap", function(t) {
                t.stop()
            })
        },
        addItem: function(t) {
            var e = p.$new("li").jAddClass(this.itemCSS).append(t).jAppendTo(this.context);
            return new p.ImageLoader(t, {
                oncomplete: this.reflow.jBind(this)
            }), this.items.push(e), e
        },
        selectItem: function(t) {
            var e = this.selectedItem || this.context.byClass(this.itemCSS + "-selected")[0];
            e && g(e).jRemoveClass(this.itemCSS + "-selected"), this.selectedItem = g(t), this.selectedItem && (this.selectedItem.jAddClass(this.itemCSS + "-selected"), this.scroll(this.selectedItem))
        },
        run: function() {
            if (this.wrapper !== this.context.parentNode) return g(this.context).jAppendTo(this.wrapper), this.initDrag(), g(window).jAddEvent("resize", this.resizeCallback = this.reflow.jBind(this)), void this.run.jBind(this).jDelay(1);
            var t = this.parent.jGetSize();
            0 < t.height && t.height > t.width ? this.setOrientation("vertical") : this.setOrientation("horizontal"), this.reflow(), this.root.jSetCss({
                visibility: ""
            })
        },
        stop: function() {
            this.resizeCallback && g(window).jRemoveEvent("resize", this.resizeCallback), this.root.kill()
        },
        scroll: function(t, e) {
            var i, o, n, s, a = {
                    x: 0,
                    y: 0
                },
                h = "vertical" == this.settings.orientation ? "top" : "left",
                r = "vertical" == this.settings.orientation ? "height" : "width",
                d = "vertical" == this.settings.orientation ? "y" : "x",
                l = this.context.parentNode.jGetSize()[r],
                m = this.context.parentNode.jGetPosition(),
                c = this.context.jGetSize()[r],
                u = [];
            if (this.scrollFX ? this.scrollFX.stop() : this.context.jSetCss("transition", p.browser.cssTransformProp + String.fromCharCode(32) + "0s"), void 0 === e && (e = 600), i = this.context.jGetPosition(), "string" == p.jTypeOf(t)) a[d] = "next" == t ? Math.max(i[h] - m[h] - l, l - c) : Math.min(i[h] - m[h] + l, 0);
            else {
                if ("element" != p.jTypeOf(t)) return;
                o = t.jGetSize(), n = t.jGetPosition(), a[d] = Math.min(0, Math.max(l - c, i[h] + l / 2 - n[h] - o[r] / 2))
            }
            0 <= (s = p.browser.gecko && "android" == p.browser.platform || p.browser.ieMode && p.browser.ieMode < 10 ? ("string" == p.jTypeOf(t) && a[d] == i[h] - m[h] && (i[h] += 0 == i[h] - m[h] ? 30 : -30), a["margin-" + h] = [c <= l ? 0 : i[h] - m[h], a[d]], delete a.x, delete a.y, this.selectorsMoveFX || (this.selectorsMoveFX = new p.PFX([this.context], {
                duration: 500
            })), u.push(a), this.selectorsMoveFX.start(u), a["margin-" + h][1]) : (this.context.jSetCss({
                transition: p.browser.cssTransformProp + String.fromCharCode(32) + e + "ms ease",
                transform: "translate3d(" + a.x + "px, " + a.y + "px, 0)"
            }), a[d])) ? (this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled"), this.buttons.prev.disabled = !0) : (this.buttons.prev.jRemoveClass(this.rootCSS + "-button-disabled"), this.buttons.prev.disabled = !1), s <= l - c ? (this.buttons.next.jAddClass(this.rootCSS + "-button-disabled"), this.buttons.next.disabled = !0) : (this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled"), this.buttons.next.disabled = !1), s = null
        },
        initDrag: function() {
            var e, i, o, t, n, s, a, h, r, d, l, m, c, u = {
                x: 0,
                y: 0
            };
            t = g(function(t) {
                if (u = {
                        x: 0,
                        y: 0
                    }, this.settings.orientation, c = "vertical" == this.settings.orientation ? "height" : "width", e = "vertical" == this.settings.orientation ? "y" : "x", l = this.context.parentNode.jGetSize()[c], d = this.context.jGetSize()[c], !(0 <= (i = l - d)))
                    if ("dragstart" == t.state) void 0 === m && (m = 0), this.context.jSetCssProp("transition", p.browser.cssTransformProp + String.fromCharCode(32) + "0ms"), n = t[e], h = t.y, a = t.x, r = !1;
                    else {
                        if ("dragend" == t.state) {
                            if (r) return;
                            s = function(t) {
                                var e, i = 0;
                                for (e = 1.5; e <= 90; e += 1.5) i += t * Math.cos(e / Math.PI / 2);
                                return o < 0 && (i *= -1), i
                            }(Math.abs(o)), (m += s) <= i && (m = i), 0 <= m && (m = 0), u[e] = m, this.context.jSetCssProp("transition", p.browser.cssTransformProp + String.fromCharCode(32) + 300 + "ms  cubic-bezier(.0, .0, .0, 1)"), this.context.jSetCssProp("transform", "translate3d(" + u.x + "px, " + u.y + "px, 0px)"), o = 0
                        } else {
                            if (r) return;
                            "horizontal" == this.settings.orientation && Math.abs(t.x - a) > Math.abs(t.y - h) || "vertical" == this.settings.orientation && Math.abs(t.x - a) < Math.abs(t.y - h) ? (t.stop(), o = t[e] - n, m += o, u[e] = m, this.context.jSetCssProp("transform", "translate3d(" + u.x + "px, " + u.y + "px, 0px)"), 0 <= m ? this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled") : this.buttons.prev.jRemoveClass(this.rootCSS + "-button-disabled"), m <= i ? this.buttons.next.jAddClass(this.rootCSS + "-button-disabled") : this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")) : r = !0
                        }
                        n = t[e]
                    }
            }).jBind(this), this.context.jAddEvent("touchdrag", t)
        },
        reflow: function() {
            var t, e = this.parent.jGetSize();
            0 < e.height && e.height > e.width ? this.setOrientation("vertical") : this.setOrientation("horizontal"), t = "vertical" == this.settings.orientation ? "height" : "width", this.context.jGetSize()[t] <= this.root.jGetSize()[t] ? (this.root.jAddClass("no-buttons"), this.context.jSetCssProp("transition", "").jGetSize(), this.context.jSetCssProp("transform", "translate3d(0,0,0)"), this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled"), this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")) : this.root.jRemoveClass("no-buttons"), this.selectedItem && this.scroll(this.selectedItem, 0)
        },
        setOrientation: function(t) {
            "vertical" !== t && "horizontal" !== t || t == this.settings.orientation || (this.root.jRemoveClass(this.rootCSS + "-" + this.settings.orientation), this.settings.orientation = t, this.root.jAddClass(this.rootCSS + "-" + this.settings.orientation), this.context.jSetCssProp("transition", "none").jGetSize(), this.context.jSetCssProp("transform", "").jSetCssProp("margin", ""))
        }
    }, t);

    function t(t, e) {
        this.settings = {
            cssPrefix: "magic",
            orientation: "horizontal",
            position: "bottom",
            size: {
                units: "px",
                width: "auto",
                height: "auto"
            },
            sides: ["height", "width"]
        }, this.parent = t, this.root = null, this.wrapper = null, this.context = null, this.buttons = {}, this.items = [], this.selectedItem = null, this.scrollFX = null, this.resizeCallback = null, this.settings = p.extend(this.settings, e), this.rootCSS = this.settings.cssPrefix + "-thumbs", this.itemCSS = this.settings.cssPrefix + "-thumb", this.setupContent()
    }
    var u = c.$;
    "function" != typeof Object.assign && (Object.assign = function(t) {
        if (null == t) throw new TypeError("Cannot convert undefined or null to object");
        t = Object(t);
        for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            if (null != i)
                for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
        }
        return t
    }), c.browser.cssTransform || (c.browser.cssTransform = c.normalizeCSS("transform").dashize());
    var o, h, n, s, a = {
            zoomOn: {
                type: "string",
                enum: ["click", "hover"],
                default: "hover"
            },
            zoomMode: {
                oneOf: [{
                    type: "string",
                    enum: ["zoom", "magnifier", "preview", "off"],
                    default: "zoom"
                }, {
                    type: "boolean",
                    enum: [!1]
                }],
                default: "zoom"
            },
            zoomWidth: {
                oneOf: [{
                    type: "string",
                    enum: ["auto"]
                }, {
                    type: "number",
                    minimum: 1
                }],
                default: "auto"
            },
            zoomHeight: {
                oneOf: [{
                    type: "string",
                    enum: ["auto"]
                }, {
                    type: "number",
                    minimum: 1
                }],
                default: "auto"
            },
            zoomPosition: {
                type: "string",
                default: "right"
            },
            zoomDistance: {
                type: "number",
                minimum: 0,
                default: 15
            },
            zoomCaption: {
                oneOf: [{
                    type: "string",
                    enum: ["bottom", "top", "off"],
                    default: "off"
                }, {
                    type: "boolean",
                    enum: [!1]
                }],
                default: "off"
            },
            expand: {
                oneOf: [{
                    type: "string",
                    enum: ["window", "fullscreen", "off"]
                }, {
                    type: "boolean",
                    enum: [!1]
                }],
                default: "window"
            },
            expandZoomMode: {
                oneOf: [{
                    type: "string",
                    enum: ["zoom", "magnifier", "off"],
                    default: "zoom"
                }, {
                    type: "boolean",
                    enum: [!1]
                }],
                default: "zoom"
            },
            expandZoomOn: {
                type: "string",
                enum: ["click", "always"],
                default: "click"
            },
            expandCaption: {
                type: "boolean",
                default: !0
            },
            closeOnClickOutside: {
                type: "boolean",
                default: !0
            },
            history: {
                type: "boolean",
                default: !0
            },
            hint: {
                oneOf: [{
                    type: "string",
                    enum: ["once", "always", "off"]
                }, {
                    type: "boolean",
                    enum: [!1]
                }],
                default: "once"
            },
            smoothing: {
                type: "boolean",
                default: !0
            },
            upscale: {
                type: "boolean",
                default: !0
            },
            variableZoom: {
                type: "boolean",
                default: !1
            },
            lazyZoom: {
                type: "boolean",
                default: !1
            },
            autostart: {
                type: "boolean",
                default: !0
            },
            rightClick: {
                type: "boolean",
                default: !1
            },
            transitionEffect: {
                type: "boolean",
                default: !0
            },
            selectorTrigger: {
                type: "string",
                enum: ["click", "hover"],
                default: "click"
            },
            cssClass: {
                type: "string"
            },
            forceTouch: {
                type: "boolean",
                default: !1
            },
            textHoverZoomHint: {
                type: "string",
                default: "Hover to zoom"
            },
            textClickZoomHint: {
                type: "string",
                default: "Click to zoom"
            },
            textBtnNext: {
                type: "string",
                default: "Next"
            },
            textBtnPrev: {
                type: "string",
                default: "Previous"
            },
            textBtnClose: {
                type: "string",
                default: "Close"
            },
            textExpandHint: {
                type: "string",
                default: "Click to expand"
            }
        },
        r = {
            zoomMode: {
                oneOf: [{
                    type: "string",
                    enum: ["zoom", "magnifier", "off"],
                    default: "zoom"
                }, {
                    type: "boolean",
                    enum: [!1]
                }],
                default: "zoom"
            },
            expandZoomOn: {
                type: "string",
                enum: ["click", "always"],
                default: "click"
            },
            textExpandHint: {
                type: "string",
                default: "Tap or pinch to expand"
            },
            textHoverZoomHint: {
                type: "string",
                default: "Touch to zoom"
            },
            textClickZoomHint: {
                type: "string",
                default: "Double tap or pinch to zoom"
            }
        },
        d = ["onZoomReady", "onUpdate", "onZoomIn", "onZoomOut", "onExpandOpen", "onExpandClose"],
        l = {},
        m = u([]),
        v = window.devicePixelRatio || 1,
        f = !0,
        x = c.browser.features.perspective ? "translate3d(" : "translate(",
        w = c.browser.features.perspective ? ",0)" : ")",
        z = null,
        b = function() {
            return "mgctlbxN$MZ" + "p".toUpperCase() + " mgctlbxV$" + "v5.3.4".replace("v", "") + " mgctlbxL$" + "t".toUpperCase() + (window.mgctlbx$Pltm && "string" === c.jTypeOf(window.mgctlbx$Pltm) ? " mgctlbxP$" + window.mgctlbx$Pltm.toLowerCase() : "")
        };

    function j(t) {
        var e = [],
            i = null;
        return t && (i = u(t)) && (e = m.filter(function(t) {
            return t.placeholder === i
        })), e.length ? e[0] : null
    }

    function y(t) {
        return Object.assign({}, t, {
            type: t.type,
            pageX: t.pageX,
            pageY: t.pageY,
            screenX: t.screenX,
            screenY: t.screenY,
            clientX: t.clientX,
            clientY: t.clientY,
            cloned: !0
        })
    }

    function C() {
        var t = c.$A(arguments),
            e = t.shift(),
            i = l[e];
        if (i)
            for (var o = 0; o < i.length; o++) i[o].apply(null, t)
    }

    function S(t, e, i, o, n) {
        this.small = {
            src: null,
            url: null,
            dppx: 1,
            node: null,
            state: 0,
            size: {
                width: 0,
                height: 0
            },
            loaded: !1
        }, this.zoom = {
            src: null,
            url: null,
            dppx: 1,
            node: null,
            state: 0,
            size: {
                width: 0,
                height: 0
            },
            loaded: !1
        }, "object" === c.jTypeOf(t) ? this.small = t : "string" === c.jTypeOf(t) && (this.small.url = c.getAbsoluteURL(t)), "object" === c.jTypeOf(e) ? this.zoom = e : "string" === c.jTypeOf(e) && (this.zoom.url = c.getAbsoluteURL(e)), this.caption = i, this.options = o, this.origin = n, this.callback = null, this.link = null, this.node = null
    }
    S.prototype = {
        parseNode: function(t, e, i) {
            var o = t.byTag("img")[0];
            return i && (this.small.node = o || c.$new("img").jAppendTo(t)), 1 < v && (this.small.url = t.getAttribute("data-image-2x"), this.small.url && (this.small.dppx = 2), this.zoom.url = t.getAttribute("data-zoom-image-2x"), this.zoom.url && (this.zoom.dppx = 2)), this.small.src = t.getAttribute("data-image") || t.getAttribute("rev") || (o ? o.currentSrc || o.getAttribute("src") : null), this.small.src && (this.small.src = c.getAbsoluteURL(this.small.src)), this.small.url = this.small.url || this.small.src, this.small.url && (this.small.url = c.getAbsoluteURL(this.small.url)), this.zoom.src = t.getAttribute("data-zoom-image") || t.getAttribute("href"), this.zoom.src && (this.zoom.src = c.getAbsoluteURL(this.zoom.src)), this.zoom.url = this.zoom.url || this.zoom.src, this.zoom.url && (this.zoom.url = c.getAbsoluteURL(this.zoom.url)), this.caption = t.getAttribute("data-caption") || t.getAttribute("title") || e, this.link = t.getAttribute("data-link"), this.origin = t, this
        },
        loadImg: function(e) {
            var i = null;
            1 < arguments.length && "function" === c.jTypeOf(arguments[1]) && (i = arguments[1]), 0 === this[e].state ? (this[e].url && this[e].node && !this[e].node.getAttribute("src") && !this[e].node.getAttribute("srcset") && this[e].node.setAttribute("src", this[e].url), this[e].state = 1, new c.ImageLoader(this[e].node || this[e].url, {
                oncomplete: u(function(t) {
                    this[e].loaded = !0, this[e].state = t.ready ? 2 : -1, t.ready && (0 === this[e].size.width && 0 === this[e].size.height && (this[e].size = t.jGetSize()), this[e].node ? (this[e].node.jSetCss({
                        maxWidth: this[e].size.width,
                        maxHeight: this[e].size.height
                    }), this[e].node.currentSrc && this[e].node.currentSrc !== this[e].node.src ? this[e].url = this[e].node.currentSrc : c.getAbsoluteURL(this[e].node.getAttribute("src") || "") !== this[e].url && this[e].node.setAttribute("src", this[e].url)) : (this[e].node = u(t.img), this[e].node.getAttribute("style"), this[e].node.removeAttribute("style"), this[e].size.width /= this[e].dppx, this[e].size.height /= this[e].dppx)), this.onload(i)
                }).jBind(this)
            })) : this[e].loaded && this.onload(i)
        },
        loadSmall: function() {
            this.loadImg("small", arguments[0])
        },
        loadZoom: function() {
            this.loadImg("zoom", arguments[0])
        },
        load: function() {
            this.callback = null, 0 < arguments.length && "function" === c.jTypeOf(arguments[0]) && (this.callback = arguments[0]), this.loadSmall(), this.loadZoom()
        },
        onload: function(t) {
            if (t && t.call(null, this), this.callback && this.small.loaded && this.zoom.loaded) return this.callback.call(null, this), void(this.callback = null)
        },
        loaded: function() {
            return this.small.loaded && this.zoom.loaded
        },
        ready: function() {
            return 2 === this.small.state && 2 === this.zoom.state
        },
        getURL: function(t) {
            var e = "small" === t ? "zoom" : "small";
            return !this[t].loaded || this[t].loaded && 2 === this[t].state ? this[t].url : !this[e].loaded || this[e].loaded && 2 === this[e].state ? this[e].url : null
        },
        getNode: function(t) {
            var e = "small" === t ? "zoom" : "small";
            return !this[t].loaded || this[t].loaded && 2 === this[t].state ? this[t].node : !this[e].loaded || this[e].loaded && 2 === this[e].state ? this[e].node : null
        },
        jGetSize: function(t) {
            var e = "small" === t ? "zoom" : "small";
            return !this[t].loaded || this[t].loaded && 2 === this[t].state ? this[t].size : !this[e].loaded || this[e].loaded && 2 === this[e].state ? this[e].size : {
                width: 0,
                height: 0
            }
        },
        setSize: function(t, e) {
            this[t].size = e
        },
        getRatio: function(t) {
            var e = "small" === t ? "zoom" : "small";
            return !this[t].loaded || this[t].loaded && 2 === this[t].state ? this[t].dppx : !this[e].loaded || this[e].loaded && 2 === this[e].state ? this[e].dppx : 1
        },
        setCurNode: function(t) {
            this.node = this.getNode(t)
        }
    };

    function E(t, e) {
        this.options = new c.Options(a), this.option = u(function() {
            return 1 < arguments.length ? this.set(arguments[0], arguments[1]) : this.get(arguments[0])
        }).jBind(this.options), this.touchOptions = new c.Options(r), this.additionalImages = [], this.image = null, this.primaryImage = null, this.placeholder = u(t).jAddEvent("dragstart selectstart click", function(t) {
            t.stop()
        }), this.id = null, this.node = null, this.stubNode = null, this.originalImg = null, this.originalImgSrc = null, this.originalTitle = null, this.normalSize = {
            width: 0,
            height: 0
        }, this.size = {
            width: 0,
            height: 0
        }, this.zoomSize = {
            width: 0,
            height: 0
        }, this.zoomSizeOrigin = {
            width: 0,
            height: 0
        }, this.boundaries = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }, this.ready = !1, this.expanded = !1, this.activateTimer = null, this.resizeTimer = null, this.resizeCallback = u(function() {
            this.expanded && (s && this.expandBox.jSetCss({
                height: window.innerHeight,
                top: Math.abs(s.getBoundingClientRect().top)
            }), this.image.node.jSetCss({
                "max-height": Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
            }), this.image.node.jSetCss({
                "max-width": Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
            })), this.reflowZoom(arguments[0])
        }).jBind(this), this.onResize = u(function(t) {
            clearTimeout(this.resizeTimer), this.resizeTimer = u(this.resizeCallback).jDelay(10, "scroll" === t.type)
        }).jBindAsEvent(this), this.onHistoryStateChange = u(function(t) {
            !t.state && this.expanded && this.close(), t.state && t.state.mzId === this.id && !this.expanded && this.expand()
        }).jBindAsEvent(this), b && (h.append(c.$new("div", {}, {
            display: "none",
            visibility: "hidden"
        }).append(document.createTextNode(b))), b = void 0), this.lens = null, this.zoomBox = null, this.hint = null, this.hintMessage = null, this.hintRuns = 0, this.mobileZoomHint = !0, this.loadingBox = null, this.loadTimer = null, this.thumb = null, this.expandBox = null, this.expandBg = null, this.expandCaption = null, this.expandStage = null, this.expandImageStage = null, this.expandFigure = null, this.navControlsLayer = null, this.expandNav = null, this.expandThumbs = null, this.expandGallery = [], this.buttons = {}, this.startAttempts = 0, this.startTimer = null, this.start(e)
    }
    return E.prototype = {
        loadOptions: function(t) {
            switch (this.options.fromJSON(window.mzOptions || {}), this.options.fromString(this.placeholder.getAttribute("data-options") || ""), c.browser.touchScreen || this.option("forceTouch", !1), (c.browser.mobile || this.option("forceTouch")) && (this.options.fromJSON(this.touchOptions.getJSON()), this.options.fromJSON(window.mzMobileOptions || {}), this.options.fromString(this.placeholder.getAttribute("data-mobile-options") || "")), "string" === c.jTypeOf(t) ? this.options.fromString(t || "") : this.options.fromJSON(t || {}), this.option("cssClass") && this.option("cssClass", this.option("cssClass").replace(",", " ")), !1 === this.option("zoomCaption") && this.option("zoomCaption", "off"), !1 === this.option("hint") && this.option("hint", "off"), this.option("hint")) {
                case "off":
                    this.hintRuns = 0;
                    break;
                case "always":
                    this.hintRuns = 1 / 0;
                    break;
                case "once":
                default:
                    this.hintRuns = 2
            }
            "off" === this.option("zoomMode") && this.option("zoomMode", !1), "off" === this.option("expand") && this.option("expand", !1), "off" === this.option("expandZoomMode") && this.option("expandZoomMode", !1), c.browser.mobile && "zoom" === this.option("zoomMode") && "inner" === this.option("zoomPosition") && (this.option("expand") ? this.option("zoomMode", !1) : this.option("zoomOn", "click"))
        },
        start: function(t) {
            var e, i, o = this;
            if (this.startAttempts < 1) {
                if (this.loadOptions(t), f && !this.option("autostart")) return;
                if (this.originalImg = this.placeholder.querySelector("img"), this.originalImgSrc = this.originalImg ? this.originalImg.getAttribute("src") : null, this.originalTitle = u(this.placeholder).getAttribute("title"), u(this.placeholder).removeAttribute("title"), this.originalImg && "PICTURE" === this.originalImg.parentNode.tagName) {
                    this.originalImgSrc = null;
                    var n = c.$new("div").jAddClass("magic-temporary-img").jAppendTo(document.body),
                        s = this.originalImg.parentNode.cloneNode(!0);
                    s.getAttribute("style"), s.removeAttribute("style");
                    var a = s.querySelector("img");
                    return a.getAttribute("style"), a.removeAttribute("style"), u(a).jAddEvent("load", function() {
                        o.size = u(a).jGetSize(), n.kill();
                        var t = o.originalImg.cloneNode(!1);
                        u(t).jSetCss({
                            maxWidth: o.size.width,
                            maxHeight: o.size.height
                        }).setAttribute("src", o.originalImg.currentSrc || o.originalImg.src), o.originalImg = o.placeholder.replaceChild(t, o.originalImg.parentNode), o.start()
                    }), n.append(s), void++this.startAttempts
                }
            }(i = (new S).parseNode(this.placeholder, this.originalTitle, !0)).setSize("small", this.size), i.small.url ? (this.primaryImage = i, this.image = this.primaryImage, function(t) {
                var e, i, o = t,
                    n = [];
                try {
                    for (; i = o.tagName, /^[A-Za-z]*$/.test(i) && ((e = o.getAttribute("id")) && /^[A-Za-z][-A-Za-z0-9_]*/.test(e) && (i += "#" + e), n.push(i)), (o = o.parentNode) && o !== document.documentElement;);
                    n = n.reverse(), c.addCSS(n.join(" ") + "> .mz-figure > img", {
                        transition: "none",
                        transform: "none"
                    }, "mz-runtime-css", !0), c.addCSS(n.join(" ") + ":not(.mz-no-rt-width-css)> .mz-figure:not(.mz-no-rt-width-css) > img", {
                        width: "100% !important;"
                    }, "mz-runtime-css", !0)
                } catch (t) {}
            }(this.placeholder), this.id = this.placeholder.getAttribute("id") || "mz-" + Math.floor(Math.random() * c.now()), this.placeholder.setAttribute("id", this.id), this.node = c.$new("figure").jAddClass("mz-figure"), this.node.enclose(this.image.small.node).jAddClass(this.option("cssClass")), !0 !== this.option("rightClick") && this.node.jAddEvent("contextmenu", function(t) {
                return t.stop(), !1
            }), this.node.jAddClass("mz-" + this.option("zoomOn") + "-zoom"), this.option("expand") || this.node.jAddClass("mz-no-expand"), this.lens = {
                node: c.$new("div", {
                    class: "mz-lens"
                }, {
                    top: 0
                }).jAppendTo(this.node),
                image: c.$new("img", {
                    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }, {
                    position: "absolute",
                    top: 0,
                    left: 0
                }),
                width: 0,
                height: 0,
                pos: {
                    x: 0,
                    y: 0
                },
                spos: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                border: {
                    x: 0,
                    y: 0
                },
                dx: 0,
                dy: 0,
                innertouch: !1,
                hide: function() {
                    c.browser.features.transform ? this.node.jSetCss({
                        transform: "translate(-10000px, -10000px)"
                    }) : this.node.jSetCss({
                        top: -1e4
                    })
                }
            }, this.lens.hide(), this.lens.node.append(this.lens.image), this.zoomBox = {
                node: c.$new("div", {
                    class: "mz-zoom-window"
                }, {
                    top: -1e5
                }).jAddClass(this.option("cssClass")).jAppendTo(h),
                image: c.$new("img", {
                    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }, {
                    position: "absolute"
                }),
                aspectRatio: 0,
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                size: {
                    width: "auto",
                    wunits: "px",
                    height: "auto",
                    hunits: "px"
                },
                mode: this.option("zoomMode"),
                position: this.option("zoomPosition"),
                trigger: this.option("zoomOn"),
                custom: !1,
                active: !1,
                activating: !1,
                enabled: !1,
                enable: u(function() {
                    this.zoomBox.enabled = !1 !== arguments[0], this.node[this.zoomBox.enabled ? "jRemoveClass" : "jAddClass"]("mz-no-zoom")
                }).jBind(this),
                hide: u(function() {
                    var t = u(this.node).jFetch("cr");
                    this.zoomBox.node.jRemoveEvent("transitionend"), this.zoomBox.node.jSetCss({
                        top: -1e5
                    }).jAppendTo(h), this.zoomBox.node.jRemoveClass("mz-deactivating mz-p-" + ("zoom" === this.zoomBox.mode ? this.zoomBox.position : this.zoomBox.mode)), !this.expanded && t && t.jRemove(), this.zoomBox.image.getAttribute("style"), this.zoomBox.image.removeAttribute("style")
                }).jBind(this),
                setMode: u(function(t) {
                    this.node[!1 === t ? "jAddClass" : "jRemoveClass"]("mz-no-zoom"), this.node["magnifier" === t ? "jAddClass" : "jRemoveClass"]("mz-magnifier-zoom"), this.zoomBox.node["magnifier" === t ? "jAddClass" : "jRemoveClass"]("mz-magnifier"), this.zoomBox.node["preview" === t ? "jAddClass" : "jRemoveClass"]("mz-preview"), "zoom" !== t && (this.node.jRemoveClass("mz-inner-zoom"), this.zoomBox.node.jRemoveClass("mz-inner")), !1 === (this.zoomBox.mode = t) && this.zoomBox.enable(!1)
                }).jBind(this)
            }, this.zoomBox.node.append(this.zoomBox.image), this.zoomBox.setMode(this.option("zoomMode")), this.zoomBox.image.removeAttribute("width"), this.zoomBox.image.removeAttribute("height"), (e = ("" + this.option("zoomWidth")).match(/^([0-9]+)?(px|%)?$/)) && (this.zoomBox.size.wunits = e[2] || "px", this.zoomBox.size.width = parseFloat(e[1]) || "auto"), (e = ("" + this.option("zoomHeight")).match(/^([0-9]+)?(px|%)?$/)) && (this.zoomBox.size.hunits = e[2] || "px", this.zoomBox.size.height = parseFloat(e[1]) || "auto"), "magnifier" === this.zoomBox.mode ? (this.node.jAddClass("mz-magnifier-zoom"), this.zoomBox.node.jAddClass("mz-magnifier"), "auto" === this.zoomBox.size.width && (this.zoomBox.size.wunits = "%", this.zoomBox.size.width = 70), "auto" === this.zoomBox.size.height && (this.zoomBox.size.hunits = "%")) : (this.option("zoom-position").match(/^#/) && ((this.zoomBox.custom = u(this.option("zoom-position").replace(/^#/, ""))) ? 50 < u(this.zoomBox.custom).jGetSize().height && ("auto" === this.zoomBox.size.width && (this.zoomBox.size.wunits = "%", this.zoomBox.size.width = 100), "auto" === this.zoomBox.size.height && (this.zoomBox.size.hunits = "%", this.zoomBox.size.height = 100)) : this.option("zoom-position", "right")), "preview" === this.zoomBox.mode && ("auto" === this.zoomBox.size.width && (this.zoomBox.size.wunits = "px"), "auto" === this.zoomBox.size.height && (this.zoomBox.size.hunits = "px")), "zoom" === this.zoomBox.mode && ("auto" !== this.zoomBox.size.width && "inner" !== this.option("zoom-position") || (this.zoomBox.size.wunits = "%", this.zoomBox.size.width = 100), "auto" !== this.zoomBox.size.height && "inner" !== this.option("zoom-position") || (this.zoomBox.size.hunits = "%", this.zoomBox.size.height = 100)), "inner" === this.option("zoom-position") && this.node.jAddClass("mz-inner-zoom")), this.zoomBox.position = this.zoomBox.custom ? "custom" : this.option("zoom-position"), this.lens.border.x = parseFloat(this.lens.node.jGetCss("border-left-width") || "0"), this.lens.border.y = parseFloat(this.lens.node.jGetCss("border-top-width") || "0"), this.image.loadSmall(function() {
                2 === this.image.small.state && (this.image.setCurNode("small"), this.size = this.image.node.jGetSize(), this.registerEvents(), (this.ready = !0) === this.option("lazyZoom") && (C("onZoomReady", this.id), c.browser.mobile ? this.reflowZoom() : this.showHint()))
            }.jBind(this)), !0 === this.option("lazyZoom") && "always" !== this.option("zoomOn") || (this.image.load(u(function(t) {
                this.setupZoom(t, !0)
            }).jBind(this)), this.loadTimer = u(this.showLoading).jBind(this).jDelay(400)), this.setupSelectors(), this.setupButtons()) : ++this.startAttempts <= 600 && (this.startTimer = setTimeout(function() {
                o.start()
            }, 100))
        },
        stop: function() {
            clearTimeout(this.startTimer), this.unregisterEvents(), this.zoomBox && this.zoomBox.node.kill(), this.expandThumbs && (this.expandThumbs.stop(), this.expandThumbs = null), this.expandBox && this.expandBox.kill(), this.expanded && u(c.browser.getDoc()).jSetCss({
                overflow: ""
            }), u(this.additionalImages).jEach(function(t) {
                u(t.origin).jRemoveClass("mz-thumb-selected").jRemoveClass(this.option("cssClass") || "mz-$dummy-css-class-to-jRemove$")
            }, this), this.originalImg && (this.placeholder.append(this.originalImg), this.originalImgSrc && this.originalImg.setAttribute("src", this.originalImgSrc)), this.originalTitle && this.placeholder.setAttribute("title", this.originalTitle), this.node && this.node.kill()
        },
        setupZoom: function(t, i) {
            var o = this.image;
            if (2 !== t.zoom.state) return this.image = t, this.ready = !0, void this.zoomBox.enable(!1);
            this.image = t, this.image.setCurNode(this.expanded ? "zoom" : "small"), this.zoomBox.image.src = this.image.getURL("zoom"), this.zoomBox.node.jRemoveClass("mz-preview"), this.zoomBox.image.getAttribute("style"), this.zoomBox.image.removeAttribute("style"), this.zoomBox.node.jGetSize(), setTimeout(u(function() {
                var t, e = this.zoomBox.image.jGetSize();
                this.zoomSizeOrigin = this.image.jGetSize("zoom"), 1 < e.width * e.height && e.width * e.height < this.zoomSizeOrigin.width * this.zoomSizeOrigin.height && (this.zoomSizeOrigin = e), this.zoomSize = c.detach(this.zoomSizeOrigin), "preview" === this.zoomBox.mode && this.zoomBox.node.jAddClass("mz-preview"), this.setCaption(), this.lens.image.src = this.image.node.currentSrc || this.image.node.src, this.zoomBox.enable(this.zoomBox.mode && !(this.expanded && "preview" === this.zoomBox.mode)), this.ready = !0, this.activateTimer = null, this.resizeCallback(), this.node.jAddClass("mz-ready"), this.hideLoading(), o !== this.image ? (C("onUpdate", this.id, o.origin, this.image.origin), this.nextImage && (t = this.nextImage, this.nextImage = null, this.update(t.image, t.onswipe))) : i && C("onZoomReady", this.id), this.initEvent ? this.node.jCallEvent(this.initEvent.type, this.initEvent) : this.expanded && "always" === this.option("expandZoomOn") ? this.activate() : i && this.showHint()
            }).jBind(this), 256)
        },
        setupSelectors: function() {
            var t, e, i = this.id;
            e = new RegExp("zoom\\-id(\\s+)?:(\\s+)?" + i + "($|;)"), t = c.browser.features.query ? (t = c.$A(document.querySelectorAll('[data-zoom-id="' + this.id + '"]')), u(t).concat(c.$A(document.querySelectorAll('[rel*="zoom-id"]')).filter(function(t) {
                return e.test(t.getAttribute("rel") || "")
            }))) : c.$A(document.getElementsByTagName("A")).filter(function(t) {
                return i === t.getAttribute("data-zoom-id") || e.test(t.getAttribute("rel") || "")
            }), u(t).jEach(function(t) {
                var e, i;
                u(t).jAddEvent("click", function(t) {
                    t.stopDefaults()
                }), e = (new S).parseNode(t, this.originalTitle), (this.image.zoom.src.has(e.zoom.url) || this.image.zoom.url.has(e.zoom.url)) && (this.image.small.src.has(e.small.url) || this.image.small.url.has(e.small.url)) && (u(e.origin).jAddClass("mz-thumb-selected"), (e = this.image).origin = t), !e.link && this.image.link && (e.link = this.image.link), i = u(function() {
                    this.update(e)
                }).jBind(this), u(t).jAddEvent("mousedown", function(t) {
                    "stopImmediatePropagation" in t && t.stopImmediatePropagation()
                }, 5), u(t).jAddEvent("tap " + ("hover" === this.option("selectorTrigger") ? "mouseover mouseout" : "btnclick"), u(function(t, e) {
                    this.updateTimer && clearTimeout(this.updateTimer), this.updateTimer = !1, "mouseover" === t.type ? this.updateTimer = u(i).jDelay(e) : "tap" !== t.type && "btnclick" !== t.type || i()
                }).jBindAsEvent(this, 60)).jAddClass(this.option("cssClass")).jAddClass("mz-thumb"), !0 !== this.option("lazyZoom") && (e.loadSmall(), e.loadZoom()), this.additionalImages.push(e)
            }, this)
        },
        update: function(t, r) {
            if (this.ready) {
                if (!t || t === this.image) return !1;
                this.deactivate(null, !0), this.ready = !1, this.node.jRemoveClass("mz-ready"), this.loadTimer = u(this.showLoading).jBind(this).jDelay(400);
                var e = u(function(t) {
                    var e, i, o, n, s, a, h = c.browser.ieMode < 10 ? "jGetSize" : "getBoundingClientRect";
                    if (this.hideLoading(), t.setCurNode("small"), !t.node) return this.ready = !0, void this.node.jAddClass("mz-ready");
                    this.setActiveThumb(t), e = this.image.node[h](), this.expanded && (t.setCurNode("zoom"), o = c.$new("div").jAddClass("mz-expand-bg"), c.browser.features.cssFilters || c.browser.ieMode < 10 ? o.append(c.$new("img", {
                        srcset: t.getURL("zoom") + " " + t.getRatio("zoom") + "x",
                        src: t.getURL("zoom")
                    }).jSetCss({
                        opacity: 0
                    })) : o.append(new c.SVGImage(t.node).blur(20).getNode().jSetCss({
                        opacity: 0
                    })), u(o).jSetCss({
                        "z-index": -99
                    }).jAppendTo(this.expandBox)), this.expanded && "zoom" === this.zoomBox.mode && "always" === this.option("expandZoomOn") ? (u(t.node).jSetCss({
                        opacity: 0
                    }).jAppendTo(this.node), i = e, s = [t.node, this.image.node], a = [{
                        opacity: [0, 1]
                    }, {
                        opacity: [1, 0]
                    }], u(t.node).jSetCss({
                        "max-width": Math.min(t.jGetSize("zoom").width, this.expandMaxWidth()),
                        "max-height": Math.min(t.jGetSize("zoom").height, this.expandMaxHeight())
                    })) : (this.node.jSetCss({
                        height: this.node[h]().height
                    }), this.image.node.jSetCss({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: "100%",
                        height: "100%",
                        "max-width": "",
                        "max-height": ""
                    }), u(t.node).jSetCss({
                        "max-width": Math.min(t.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : 1 / 0),
                        "max-height": Math.min(t.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : 1 / 0),
                        position: "relative",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        transform: ""
                    }).jAppendTo(this.node), i = u(t.node)[h](), r || u(t.node).jSetCss({
                        "min-width": e.width,
                        height: e.height,
                        "max-width": e.width,
                        "max-height": ""
                    }), this.node.jSetCss({
                        height: "",
                        overflow: ""
                    }).jGetSize(), u(t.node).jGetSize(), s = [t.node, this.image.node], a = [c.extend({
                        opacity: [0, 1]
                    }, r ? {
                        scale: [.6, 1]
                    } : {
                        "min-width": [e.width, i.width],
                        "max-width": [e.width, i.width],
                        height: [e.height, i.height]
                    }), {
                        opacity: [1, 0]
                    }]), this.expanded && this.expandBg.firstChild && o.firstChild && (n = u(this.expandBg.firstChild).jGetCss("opacity"), a = c.browser.gecko ? (s = s.concat([o.firstChild]), a.concat([{
                        opacity: [1e-4, n]
                    }])) : (s = s.concat([o.firstChild, this.expandBg.firstChild]), a.concat([{
                        opacity: [1e-4, n]
                    }, {
                        opacity: [n, 1e-4]
                    }]))), new c.PFX(s, {
                        duration: r || this.option("transitionEffect") ? r ? 160 : 350 : 0,
                        transition: r ? "cubic-bezier(0.175, 0.885, 0.320, 1)" : e.width === i.width ? "linear" : "cubic-bezier(0.25, .1, .1, 1)",
                        onComplete: u(function() {
                            this.image.node.jRemove().getAttribute("style"), this.image.node.removeAttribute("style"), u(t.node).jSetCss(this.expanded ? {
                                width: "auto",
                                height: "auto"
                            } : {
                                width: "",
                                height: ""
                            }).jSetCss({
                                "min-width": "",
                                "min-height": "",
                                opacity: "",
                                "max-width": Math.min(t.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : 1 / 0),
                                "max-height": Math.min(t.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : 1 / 0)
                            }), this.expanded && (this.expandBg.jRemove(), this.expandBg = void 0, this.expandBg = o.jSetCssProp("z-index", -100), u(this.expandBg.firstChild).jSetCss({
                                opacity: ""
                            }), this.expandCaption && (t.caption ? t.link ? this.expandCaption.changeContent("").append(c.$new("a", {
                                href: t.link
                            }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(t.caption)) : this.expandCaption.changeContent(t.caption).jAddClass("mz-show") : this.expandCaption.jRemoveClass("mz-show"))), this.setupZoom(t)
                        }).jBind(this),
                        onBeforeRender: u(function(t, e) {
                            void 0 !== t.scale && e.jSetCssProp("transform", "scale(" + t.scale + ")")
                        })
                    }).start(a)
                }).jBind(this);
                this.expanded ? t.load(e) : t.loadSmall(e)
            } else this.nextImage = {
                image: t,
                onswipe: r
            }
        },
        setActiveThumb: function(e) {
            var i = !1;
            u(this.additionalImages).jEach(function(t) {
                u(t.origin).jRemoveClass("mz-thumb-selected"), t === e && (i = !0)
            }), i && e.origin && u(e.origin).jAddClass("mz-thumb-selected"), this.expandThumbs && this.expandThumbs.selectItem(e.selector)
        },
        setCaption: function(t) {
            this.image.caption && "off" !== this.option("zoomCaption") && "magnifier" !== this.zoomBox.mode && (this.zoomBox.caption || (this.zoomBox.caption = c.$new("div", {
                class: "mz-caption"
            }).jAppendTo(this.zoomBox.node.jAddClass("caption-" + this.option("zoomCaption")))), this.zoomBox.caption.changeContent(this.image.caption))
        },
        showHint: function(t, e, i) {
            var o;
            if (!this.expanded) {
                if (this.hintRuns <= 0) return;
                !0 !== i && this.hintRuns--
            }
            null == e && (this.zoomBox.active || this.zoomBox.activating || !this.option("zoomMode") || !this.zoomBox.enabled && this.image.loaded() || c.browser.mobile && this.option("expand") && "zoom" === this.zoomBox.mode && "inner" === this.zoomBox.position ? e = this.option("expand") ? this.option("textExpandHint") : "" : "hover" === this.zoomBox.trigger ? e = this.option("textHoverZoomHint") : "click" === this.zoomBox.trigger && (e = this.option("textClickZoomHint"))), e ? (o = this.node, this.hint ? u(this.hintMessage).changeContent(e) : (this.hint = c.$new("div", {
                class: "mz-hint"
            }), this.hintMessage = c.$new("span", {
                class: "mz-hint-message"
            }).append(document.createTextNode(e)).jAppendTo(this.hint), u(this.hint).jAppendTo(this.node)), this.hint.jSetCss({
                "transition-delay": ""
            }).jRemoveClass("mz-hint-hidden"), this.expanded ? o = this.expandFigure : (this.zoomBox.active || this.zoomBox.activating) && "magnifier" !== this.zoomBox.mode && "inner" === this.zoomBox.position && (o = this.zoomBox.node), !0 === t && setTimeout(u(function() {
                this.hint.jAddClass("mz-hint-hidden")
            }).jBind(this), 16), this.hint.jAppendTo(o)) : this.hideHint()
        },
        hideHint: function() {
            this.hint && this.hint.jSetCss({
                "transition-delay": "0ms"
            }).jAddClass("mz-hint-hidden")
        },
        showLoading: function() {
            this.loadingBox || (this.loadingBox = c.$new("div", {
                class: "mz-loading"
            }), this.node.append(this.loadingBox), this.loadingBox.jGetSize()), this.loadingBox.jAddClass("shown")
        },
        hideLoading: function() {
            clearTimeout(this.loadTimer), this.loadTimer = null, this.loadingBox && u(this.loadingBox).jRemoveClass("shown")
        },
        setSize: function(t, e) {
            var i, o, n = c.detach(this.zoomBox.size),
                s = !this.expanded && this.zoomBox.custom ? u(this.zoomBox.custom).jGetSize() : {
                    width: 0,
                    height: 0
                },
                a = this.size,
                h = {
                    x: 0,
                    y: 0
                };
            e = e || this.zoomBox.position, this.normalSize = this.image.node.jGetSize(), this.size = this.image.node.jGetSize(), this.boundaries = this.image.node.getBoundingClientRect(), s.height || (s = this.size), !1 !== this.option("upscale") && !1 !== this.zoomBox.mode && "preview" !== this.zoomBox.mode || (t = !1), "preview" === this.zoomBox.mode && ("auto" === n.width && (n.width = this.zoomSizeOrigin.width), "auto" === n.height && (n.height = this.zoomSizeOrigin.height)), this.expanded && "magnifier" === this.zoomBox.mode && (n.width = 70, n.height = "auto"), "magnifier" === this.zoomBox.mode && "auto" === n.height ? (this.zoomBox.width = parseFloat(n.width / 100) * Math.min(s.width, s.height), this.zoomBox.height = this.zoomBox.width) : "zoom" === this.zoomBox.mode && "inner" === e ? (this.size = this.node.jGetSize(), s = this.size, this.boundaries = this.node.getBoundingClientRect(), this.zoomBox.width = s.width, this.zoomBox.height = s.height) : (this.zoomBox.width = "%" === n.wunits ? parseFloat(n.width / 100) * s.width : parseInt(n.width), this.zoomBox.height = "%" === n.hunits ? parseFloat(n.height / 100) * s.height : parseInt(n.height)), "preview" === this.zoomBox.mode && (o = Math.min(Math.min(this.zoomBox.width / this.zoomSizeOrigin.width, this.zoomBox.height / this.zoomSizeOrigin.height), 1), this.zoomBox.width = this.zoomSizeOrigin.width * o, this.zoomBox.height = this.zoomSizeOrigin.height * o), this.zoomBox.width = Math.ceil(this.zoomBox.width), this.zoomBox.height = Math.ceil(this.zoomBox.height), this.zoomBox.aspectRatio = this.zoomBox.width / this.zoomBox.height, this.zoomBox.node.jSetCss({
                width: this.zoomBox.width,
                height: this.zoomBox.height
            }), t && (s = this.expanded ? this.expandBox.jGetSize() : this.zoomBox.node.jGetSize(), !this.expanded && .8 < this.normalSize.width * this.normalSize.height / (this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) ? (this.zoomSize.width = 1.5 * this.zoomSizeOrigin.width, this.zoomSize.height = 1.5 * this.zoomSizeOrigin.height) : this.zoomSize = c.detach(this.zoomSizeOrigin)), !1 === this.zoomBox.mode || this.zoomBox.active || this.expanded && "always" === this.option("expandZoomOn") || (.8 < this.normalSize.width * this.normalSize.height / (this.zoomSize.width * this.zoomSize.height) ? (this.zoomSize = c.detach(this.zoomSizeOrigin), this.zoomBox.enable(!1)) : this.zoomBox.enable(!0)), this.zoomBox.image.jSetCss({
                width: this.zoomSize.width,
                height: this.zoomSize.height
            }), this.zoomSize.maxWidth = this.zoomSize.width, this.zoomSize.maxHeight = this.zoomSize.height, i = this.zoomBox.node.getInnerSize(), this.zoomBox.innerWidth = Math.ceil(i.width), this.zoomBox.innerHeight = Math.ceil(i.height), this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width)), this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height)), this.lens.node.jSetCss({
                width: this.lens.width,
                height: this.lens.height
            }), this.lens.image.jSetCss(this.size), c.extend(this.lens, this.lens.node.jGetSize()), this.zoomBox.active && (clearTimeout(this.moveTimer), this.moveTimer = null, this.lens.innertouch ? (this.lens.pos.x *= this.size.width / a.width, this.lens.pos.y *= this.size.height / a.height, h.x = this.lens.spos.x, h.y = this.lens.spos.y) : (h.x = this.boundaries.left + this.lens.width / 2 + this.lens.pos.x * (this.size.width / a.width), h.y = this.boundaries.top + this.lens.height / 2 + this.lens.pos.y * (this.size.height / a.height)), this.animate(null, h))
        },
        reflowZoom: function(t) {
            var e, i, o, n, s, a, h, r, d = u(this.node).jFetch("cr");
            if (a = 5, h = u(window).jGetSize(), r = u(window).jGetScroll(), o = {
                    left: a = a || 0,
                    right: h.width - a,
                    top: a,
                    bottom: h.height - a,
                    x: r.x,
                    y: r.y
                }, this.zoomBox.position, n = this.expanded ? "inner" : this.zoomBox.custom ? "custom" : this.option("zoom-position"), s = this.expanded && "zoom" === this.zoomBox.mode ? this.expandImageStage : document.body, this.expanded && (o.y = 0, o.x = 0), t || this.setSize(!0, n), e = this.boundaries.top, "magnifier" !== this.zoomBox.mode) {
                if (t) return void this.setSize(!1);
                switch (n) {
                    case "inner":
                    case "custom":
                        i = e = 0;
                        break;
                    case "top":
                        e = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance"), o.top > e && (e = this.boundaries.bottom + this.option("zoom-distance"), n = "bottom"), i = this.boundaries.left;
                        break;
                    case "bottom":
                        e = this.boundaries.bottom + this.option("zoom-distance"), o.bottom < e + this.zoomBox.height && (e = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance"), n = "top"), i = this.boundaries.left;
                        break;
                    case "left":
                        i = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance"), o.left > i && o.right >= this.boundaries.right + this.option("zoom-distance") + this.zoomBox.width && (i = this.boundaries.right + this.option("zoom-distance"), n = "right");
                        break;
                    case "right":
                    default:
                        i = this.boundaries.right + this.option("zoom-distance"), o.right < i + this.zoomBox.width && o.left <= this.boundaries.left - this.zoomBox.width - this.option("zoom-distance") && (i = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance"), n = "left")
                }
                switch (this.option("zoom-position")) {
                    case "top":
                    case "bottom":
                        (o.top > e || o.bottom < e + this.zoomBox.height) && (n = "inner");
                        break;
                    case "left":
                    case "right":
                        (o.left > i || o.right < i + this.zoomBox.width) && (n = "inner")
                }
                if (this.zoomBox.position = n, !this.zoomBox.activating && !this.zoomBox.active) return void(c.browser.mobile && !this.expanded && ("zoom" === this.zoomBox.mode || !1 === this.zoomBox.mode && this.option("expand")) && (this.option("expand") ? this.zoomBox.enable("inner" !== n) : "click" !== this.option("zoomOn") && (this.zoomBox.trigger = "inner" === n ? "click" : this.option("zoomOn"), this.unregisterActivateEvent(), this.unregisterDeactivateEvent(), this.registerActivateEvent("click" === this.zoomBox.trigger), this.registerDeactivateEvent("click" === this.zoomBox.trigger && !this.option("expand"))), this.showHint(!1, null, !this.image.loaded())));
                if (this.setSize(!1), t) return;
                "custom" === n && (s = this.zoomBox.custom, o.y = 0, o.x = 0), "inner" === n ? ("preview" !== this.zoomBox.mode && (this.zoomBox.node.jAddClass("mz-inner"), this.node.jAddClass("mz-inner-zoom")), this.lens.hide(), e = this.boundaries.top + o.y, i = this.boundaries.left + o.x, i = e = 0, this.expanded || (s = this.node)) : (e += o.y, i += o.x, this.node.jRemoveClass("mz-inner-zoom"), this.zoomBox.node.jRemoveClass("mz-inner")), this.zoomBox.node.jSetCss({
                    top: e,
                    left: i
                })
            } else this.setSize(!1), s = this.node, !c.browser.mobile || this.expanded || this.zoomBox.activating || this.zoomBox.active || this.showHint(!1, null, !(this.option("lazyZoom") && this.image.loaded()));
            this.zoomBox.node[this.expanded ? "jAddClass" : "jRemoveClass"]("mz-expanded"), !this.expanded && d && d.jAppendTo("zoom" === this.zoomBox.mode && "inner" === n ? this.zoomBox.node : this.node, (Math.floor(101 * Math.random()) + 1) % 2 ? "top" : "bottom"), this.zoomBox.node.jAppendTo(s)
        },
        changeZoomLevel: function(t) {
            var e, i, o, n, s = !1,
                a = t.isMouse ? 5 : 3 / 54;
            if (this.zoomBox.active) {
                if (u(t).stop(), a = (100 + a * Math.abs(t.deltaY)) / 100, t.deltaY < 0 && (a = 1 / a), "magnifier" === this.zoomBox.mode) i = Math.max(100, Math.round(this.zoomBox.width * a)), o = (i = Math.min(i, .9 * this.size.width)) / this.zoomBox.aspectRatio, this.zoomBox.width = Math.ceil(i), this.zoomBox.height = Math.ceil(o), this.zoomBox.node.jSetCss({
                    width: this.zoomBox.width,
                    height: this.zoomBox.height
                }), e = this.zoomBox.node.getInnerSize(), this.zoomBox.innerWidth = Math.ceil(e.width), this.zoomBox.innerHeight = Math.ceil(e.height), s = !0;
                else {
                    if (this.expanded || "zoom" !== this.zoomBox.mode) return;
                    i = Math.max(this.size.width, Math.round(this.zoomSize.width * a)), o = (i = Math.min(i, this.zoomSize.maxWidth)) / (this.zoomSize.maxWidth / this.zoomSize.maxHeight), this.zoomSize.width = Math.ceil(i), this.zoomSize.height = Math.ceil(o)
                }
                n = u(window).jGetScroll(), this.lens.width = this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width), this.lens.height = this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height), this.lens.node.jSetCss({
                    width: this.lens.width,
                    height: this.lens.height
                }), c.extend(this.lens, this.lens.node.jGetSize()), this.zoomBox.active && (clearTimeout(this.moveTimer), this.moveTimer = null, s && (this.moveTimer = !0), this.animate(null, {
                    x: t.x - n.x,
                    y: t.y - n.y
                }), s && (this.moveTimer = null))
            }
        },
        registerActivateEvent: function(t) {
            var e, i = t ? "dbltap btnclick" : "touchstart" + (window.navigator.pointerEnabled ? " pointerdown" : window.navigator.msPointerEnabled ? " MSPointerDown" : "") + (window.navigator.pointerEnabled ? " pointermove" : window.navigator.msPointerEnabled ? " MSPointerMove" : " mousemove"),
                o = this.node.jFetch("mz:handlers:activate:fn", t ? u(this.activate).jBindAsEvent(this) : u(function(t) {
                    t.isTouchEvent() && !t.isPrimaryTouch() || t && "touch" === t.pointerType && "pointerdown" !== t.type || (e = c.browser.ieMode < 9 ? c.extend({}, t) : t, this.activateTimer || (clearTimeout(this.activateTimer), this.activateTimer = setTimeout(u(function() {
                        this.activate(e)
                    }).jBind(this), 120)))
                }).jBindAsEvent(this));
            this.node.jStore("mz:handlers:activate:event", i).jAddEvent(i, o, 10)
        },
        unregisterActivateEvent: function() {
            var t = this.node.jFetch("mz:handlers:activate:event"),
                e = this.node.jFetch("mz:handlers:activate:fn");
            this.node.jRemoveEvent(t, e), this.node.jDel("mz:handlers:activate:fn")
        },
        registerDeactivateEvent: function(t) {
            var e = "touchend";
            window.navigator.pointerEnabled ? e += " pointerup pointerout pointermove" : window.navigator.msPointerEnabled ? e += " MSPointerUp MSPointerOut MSPointerMove" : e += " mouseout mousemove", t && (this.expanded || c.browser.mobile ? e = "dbltap btnclick" : e += " dbltap btnclick");
            var i = this.node.jFetch("mz:handlers:deactivate:fn", u(function(t) {
                if ((!t.isTouchEvent() || t.isPrimaryTouch()) && (!t || "pointerup" !== t.type || "touch" === t.pointerType))
                    if (!t || "pointermove" !== t.type && "MSPointerMove" !== t.type && "mousemove" !== t.type) {
                        if (this.zoomBox.node !== t.getRelated() && ("inner" !== this.zoomBox.position && "magnifier" !== this.zoomBox.mode || !this.zoomBox.node.hasChild(t.getRelated())) && !this.node.hasChild(t.getRelated())) return void this.deactivate(t)
                    } else {
                        if (!this.ready || !this.zoomBox.enabled || !this.zoomBox.active) return;
                        var e = t.getClientXY();
                        if (e.x < this.boundaries.left || e.x > this.boundaries.right || e.y < this.boundaries.top || e.y > this.boundaries.bottom) return void this.deactivate(t)
                    }
            }).jBindAsEvent(this));
            this.node.jStore("mz:handlers:deactivate:event", e).jAddEvent(e, i, 20)
        },
        unregisterDeactivateEvent: function() {
            var t = this.node.jFetch("mz:handlers:deactivate:event"),
                e = this.node.jFetch("mz:handlers:deactivate:fn");
            this.node.jRemoveEvent(t, e), this.node.jDel("mz:handlers:deactivate:fn")
        },
        registerAnimateEvent: function() {
            var t = "touchmove";
            "android" !== c.browser.platform && (window.navigator.pointerEnabled ? t += " pointermove" : window.navigator.msPointerEnabled ? t += " MSPointerMove" : t += " mousemove");
            var e = this.node.jFetch("mz:handlers:animate:fn", u(this.animate).jBindAsEvent(this));
            this.node.jStore("mz:handlers:animate:event", t).jAddEvent(t, e)
        },
        unregisterAnimateEvent: function() {
            var t = this.node.jFetch("mz:handlers:animate:event"),
                e = this.node.jFetch("mz:handlers:animate:fn");
            this.node.jRemoveEvent(t, e)
        },
        registerEvents: function() {
            this.moveBind = this.move.jBind(this), this.node.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], u(function(t) {
                c.browser.androidBrowser && this.option("zoomMode") && "click" !== this.option("zoomOn") && "touchstart" === t.type && (t.stopDefaults(), c.browser.gecko && t.stopDistribution()), this.zoomBox.active && "inner" === this.zoomBox.position && t.isPrimaryTouch() && (this.lens.spos = t.getClientXY())
            }).jBindAsEvent(this), 10), this.node.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], u(function(t) {
                t.isTouchEvent() && t.isPrimaryTouch() && (this.lens.touchmovement = !1)
            }).jBindAsEvent(this), 10), this.registerAnimateEvent(), this.option("zoomMode") && (this.registerActivateEvent("click" === this.option("zoomOn")), this.registerDeactivateEvent("click" === this.option("zoomOn"))), this.node.jAddEvent("mousedown", function(t) {
                t.stopDistribution()
            }, 10).jAddEvent("btnclick", u(function(t) {
                this.node.jRaiseEvent("MouseEvent", "click"), this.expanded && this.expandBox.jCallEvent("btnclick", t)
            }).jBind(this), 15), this.option("expand") ? this.node.jAddEvent("tap btnclick", u(this.expand).jBindAsEvent(this), 15) : this.node.jAddEvent("tap btnclick", u(this.openLink).jBindAsEvent(this), 15), 1 < this.additionalImages.length && this.swipe(), !c.browser.mobile && this.option("variableZoom") && this.node.jAddEvent("mousescroll", this.changeZoomLevel.jBindAsEvent(this)), c.browser.mobile && this.pinchToZoom(), u(window).jAddEvent(c.browser.mobile ? "resize" : "resize scroll", this.onResize), this.option("history") && u(window).jAddEvent("popstate", this.onHistoryStateChange)
        },
        unregisterEvents: function() {
            this.node && this.node.jRemoveEvent("mousescroll"), u(window).jRemoveEvent("resize scroll", this.onResize), this.option("history") && u(window).jRemoveEvent("popstate", this.onHistoryStateChange), u(this.additionalImages).jEach(function(t) {
                u(t.origin).jClearEvents()
            })
        },
        activate: function(t) {
            var e, i, o, n, s, a = 0,
                h = 0;
            this.image.loaded() && this.ready && this.zoomBox.enabled && !this.zoomBox.active && !this.zoomBox.activating ? t && "pointermove" === t.type && "touch" === t.pointerType || (this.option("zoomMode") || !this.option("expand") || this.expanded ? (this.zoomBox.activating = !0, this.expanded && "zoom" === this.zoomBox.mode && (n = this.image.node.jGetRect(), this.expandStage.jAddClass("mz-zoom-in"), s = this.expandFigure.jGetRect(), h = (n.left + n.right) / 2 - (s.left + s.right) / 2, a = (n.top + n.bottom) / 2 - (s.top + s.bottom) / 2), this.zoomBox.image.jRemoveEvent("transitionend"), this.zoomBox.node.jRemoveClass("mz-deactivating").jRemoveEvent("transitionend"), this.zoomBox.node.jAddClass("mz-activating"), this.node.jAddClass("mz-activating"), this.reflowZoom(), i = "zoom" === this.zoomBox.mode ? this.zoomBox.position : this.zoomBox.mode, !c.browser.features.transition || this.expanded && "always" === this.option("expandZoomOn") ? (this.zoomBox.node.jRemoveClass("mz-activating"), this.zoomBox.activating = !1, this.zoomBox.active = !0) : "inner" === i ? (o = this.image.node.jGetSize(), this.zoomBox.image.jSetCss({
                transform: "translate3d(0," + a + "px, 0) scale(" + o.width / this.zoomSize.width + ", " + o.height / this.zoomSize.height + ")"
            }).jGetSize(), this.zoomBox.image.jAddEvent("transitionend", u(function() {
                this.zoomBox.image.jRemoveEvent("transitionend"), this.zoomBox.node.jRemoveClass("mz-activating mz-p-" + i), this.zoomBox.activating = !1, this.zoomBox.active = !0
            }).jBind(this)), this.zoomBox.node.jAddClass("mz-p-" + i).jGetSize(), c.browser.mobile || !c.browser.chrome || "chrome" !== c.browser.uaName && "opera" !== c.browser.uaName || (this.zoomBox.activating = !1, this.zoomBox.active = !0)) : (this.zoomBox.node.jAddEvent("transitionend", u(function() {
                this.zoomBox.node.jRemoveEvent("transitionend"), this.zoomBox.node.jRemoveClass("mz-activating mz-p-" + i)
            }).jBind(this)), this.zoomBox.node.jSetCss({
                transition: "none"
            }), this.zoomBox.node.jAddClass("mz-p-" + i).jGetSize(), this.zoomBox.node.jSetCss({
                transition: ""
            }).jGetSize(), this.zoomBox.node.jRemoveClass("mz-p-" + i), this.zoomBox.activating = !1, this.zoomBox.active = !0), this.expanded || this.showHint(!0), t ? (t.stop().stopQueue(), e = t.getClientXY(), "magnifier" === this.zoomBox.mode && /tap/i.test(t.type) && (e.y -= this.zoomBox.height / 2 + 10), "inner" === i && (/tap/i.test(t.type) || t.isTouchEvent()) && (this.lens.pos = {
                x: 0,
                y: 0
            }, e.x = -(e.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width), e.y = -(e.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height))) : (e = {
                x: this.boundaries.left + (this.boundaries.right - this.boundaries.left) / 2,
                y: this.boundaries.top + (this.boundaries.bottom - this.boundaries.top) / 2
            }, c.browser.mobile && this.expanded && "always" === this.option("expandZoomOn") && (this.lens.innertouch = !0, this.lens.pos = {
                x: 0,
                y: 0
            }, e.x = -(e.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width), e.y = -(e.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height))), this.node.jRemoveClass("mz-activating").jAddClass("mz-active"), e.x += -h, e.y += -a, this.lens.spos = {
                x: 0,
                y: 0
            }, this.lens.dx = 0, this.lens.dy = 0, this.animate(t, e, !0), C("onZoomIn", this.id)) : this.zoomBox.active = !0) : this.image.loaded() || this.initEvent || (t && (this.initEvent = y(t), t.stopQueue()), this.image.load(this.setupZoom.jBind(this)), this.loadTimer || (this.loadTimer = u(this.showLoading).jBind(this).jDelay(400)))
        },
        deactivate: function(t, e) {
            var i, o, n, s, a = 0,
                h = this.zoomBox.active;
            this.initEvent = null, this.ready && (t && "pointerout" === t.type && "touch" === t.pointerType || (clearTimeout(this.moveTimer), this.moveTimer = null, clearTimeout(this.activateTimer), this.activateTimer = null, this.zoomBox.activating = !1, !(this.zoomBox.active = !1) === e || this.expanded || h && (c.browser.mobile && !this.expanded && "zoom" === this.zoomBox.mode ? this.reflowZoom() : this.showHint()), this.zoomBox.enabled && (t && t.stop(), this.zoomBox.image.jRemoveEvent("transitionend"), this.zoomBox.node.jRemoveClass("mz-activating").jRemoveEvent("transitionend"), this.expanded && (s = this.expandFigure.jGetRect(), "always" !== this.option("expandZoomOn") && this.expandStage.jRemoveClass("mz-zoom-in"), this.image.node.jSetCss({
                "max-height": this.expandMaxHeight()
            }), (n = this.image.node.jGetRect()).left, n.right, s.left, s.right, a = (n.top + n.bottom) / 2 - (s.top + s.bottom) / 2), i = "zoom" === this.zoomBox.mode ? this.zoomBox.position : this.zoomBox.mode, !c.browser.features.transition || !t || this.expanded && "always" === this.option("expandZoomOn") ? (this.zoomBox.hide(), this.node.jRemoveClass("mz-active")) : "inner" === i ? (this.zoomBox.image.jAddEvent("transitionend", u(function() {
                this.zoomBox.image.jRemoveEvent("transitionend"), this.node.jRemoveClass("mz-active"), setTimeout(u(function() {
                    this.zoomBox.hide()
                }).jBind(this), 32)
            }).jBind(this)), o = this.image.node.jGetSize(), this.zoomBox.node.jAddClass("mz-deactivating mz-p-" + i).jGetSize(), this.zoomBox.image.jSetCss({
                transform: "translate3d(0," + a + "px,0) scale(" + o.width / this.zoomSize.maxWidth + ", " + o.height / this.zoomSize.maxHeight + ")"
            })) : (this.zoomBox.node.jAddEvent("transitionend", u(function() {
                this.zoomBox.hide(), this.node.jRemoveClass("mz-active")
            }).jBind(this)), this.zoomBox.node.jGetCss("opacity"), this.zoomBox.node.jAddClass("mz-deactivating mz-p-" + i), this.node.jRemoveClass("mz-active")), this.lens.dx = 0, this.lens.dy = 0, this.lens.spos = {
                x: 0,
                y: 0
            }, this.lens.hide(), h && C("onZoomOut", this.id))))
        },
        animate: function(t, e, i) {
            var o, n, s, a, h = e,
                r = 0,
                d = 0,
                l = !1;
            if (this.zoomBox.active || i) {
                if (t) {
                    if (u(t).stopDefaults().stopDistribution(), t.isTouchEvent() && !t.isPrimaryTouch()) return;
                    (l = /tap/i.test(t.type) || t.isTouchEvent()) && !this.lens.touchmovement && (this.lens.touchmovement = l), h = h || t.getClientXY()
                }
                "preview" !== this.zoomBox.mode && ("zoom" === this.zoomBox.mode && "inner" === this.zoomBox.position && (t && l || !t && this.lens.innertouch) ? (this.lens.innertouch = !0, o = this.lens.pos.x + (h.x - this.lens.spos.x), n = this.lens.pos.y + (h.y - this.lens.spos.y), this.lens.spos = h, s = -(r = Math.min(0, this.zoomBox.innerWidth - this.zoomSize.width) / 2), a = -(d = Math.min(0, this.zoomBox.innerHeight - this.zoomSize.height) / 2)) : (this.lens.innertouch = !1, "magnifier" === this.zoomBox.mode && (h.y = Math.max(this.boundaries.top, Math.min(h.y, this.boundaries.bottom)), h.x = Math.max(this.boundaries.left, Math.min(h.x, this.boundaries.right))), o = h.x - this.boundaries.left, n = h.y - this.boundaries.top, s = this.size.width - this.lens.width, a = this.size.height - this.lens.height, o -= this.lens.width / 2, n -= this.lens.height / 2), "magnifier" !== this.zoomBox.mode && (o = Math.max(r, Math.min(o, s)), n = Math.max(d, Math.min(n, a))), this.lens.pos.x = o, this.lens.pos.y = n, "zoom" === this.zoomBox.mode && (c.browser.features.transform ? (this.lens.node.jSetCss({
                    transform: "translate(" + this.lens.pos.x + "px," + this.lens.pos.y + "px)"
                }), this.lens.image.jSetCss({
                    transform: "translate(" + -(this.lens.pos.x + this.lens.border.x) + "px, " + -(this.lens.pos.y + this.lens.border.y) + "px)"
                })) : (this.lens.node.jSetCss({
                    top: this.lens.pos.y,
                    left: this.lens.pos.x
                }), this.lens.image.jSetCss({
                    top: -(this.lens.pos.y + this.lens.border.y),
                    left: -(this.lens.pos.x + this.lens.border.x)
                }))), "magnifier" === this.zoomBox.mode && (!this.lens.touchmovement || t && "dbltap" === t.type || (h.y -= this.zoomBox.height / 2 + 10), this.zoomBox.node.jSetCss({
                    top: h.y - this.boundaries.top - this.zoomBox.height / 2,
                    left: h.x - this.boundaries.left - this.zoomBox.width / 2
                })), this.moveTimer || (this.lens.dx = 0, this.lens.dy = 0, this.move(1)))
            }
        },
        move: function(t) {
            var e, i, o, n, s, a;
            isFinite(t) || (t = this.lens.innertouch ? this.lens.touchmovement ? .4 : .16 : this.option("smoothing") ? .2 : this.lens.touchmovement ? .4 : .8), e = (this.lens.pos.x - this.lens.dx) * t, i = (this.lens.pos.y - this.lens.dy) * t, this.lens.dx += e, this.lens.dy += i, (!this.moveTimer || 1e-6 < Math.abs(e) || 1e-6 < Math.abs(i)) && (n = this.lens.innertouch ? (o = this.lens.dx, this.lens.dy) : (o = this.lens.dx * (this.zoomSize.width / this.size.width) - Math.max(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2, n = this.lens.dy * (this.zoomSize.height / this.size.height) - Math.max(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2, "magnifier" === this.zoomBox.mode && (o = Math.round(o), n = Math.round(n)), o = -o, -n), s = this.zoomSize.width / this.zoomSize.maxWidth, a = this.zoomSize.height / this.zoomSize.maxHeight, this.zoomBox.image.jSetCss(c.browser.features.transform ? {
                transform: x + o + "px," + n + "px" + w + " scale(" + s + "," + a + ")"
            } : {
                width: this.zoomSize.width,
                height: this.zoomSize.height,
                left: -(this.lens.dx * (this.zoomSize.width / this.size.width) + Math.min(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2),
                top: -(this.lens.dy * (this.zoomSize.height / this.size.height) + Math.min(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2)
            })), "magnifier" !== this.zoomBox.mode && (this.moveTimer = setTimeout(this.moveBind, 16))
        },
        swipe: function() {
            var e, i, o, n, s, a, h, r = "",
                d = {},
                l = 0,
                m = {
                    transition: c.browser.cssTransform + String.fromCharCode(32) + "300ms cubic-bezier(.18,.35,.58,1)"
                },
                t = u(function(t) {
                    if (this.ready && !this.zoomBox.active)
                        if ("dragstart" === t.state) clearTimeout(this.activateTimer), this.activateTimer = null, l = 0, d = {
                            x: t.x,
                            y: t.y,
                            ts: t.timeStamp
                        }, e = this.size.width, i = e / 2, this.image.node.jRemoveEvent("transitionend"), this.image.node.jSetCssProp("transition", ""), this.image.node.jSetCssProp("transform", "translate3d(0, 0, 0)"), h = null;
                        else {
                            if (n = t.x - d.x, s = {
                                    x: 0,
                                    y: 0,
                                    z: 0
                                }, null === h && (h = Math.abs(t.x - d.x) < Math.abs(t.y - d.y)), h) return;
                            if (t.stop(), "dragend" === t.state) return l = 0, a = null, o = t.timeStamp - d.ts, (Math.abs(n) > i || o < 201 && 30 < Math.abs(n)) && (r = 0 < n ? "backward" : n <= 0 ? "forward" : "") && ("backward" === r ? (a = this.getPrev(), l += 10 * e) : (a = this.getNext(), l -= 10 * e)), s.x = l, s.deg = s.x / e * -90, this.image.node.jAddEvent("transitionend", u(function(t) {
                                this.image.node.jRemoveEvent("transitionend"), this.image.node.jSetCssProp("transition", ""), a && (this.image.node.jSetCss({
                                    transform: "translate3d(" + s.x + "px, 0px, 0px)"
                                }), this.update(a, !0))
                            }).jBind(this)), this.image.node.jSetCss(m), this.image.node.jSetCss({
                                "transition-duration": s.x ? "100ms" : "300ms",
                                opacity: 1 - .2 * Math.abs(s.x / e),
                                transform: "translate3d(" + s.x + "px, 0px, 0px)"
                            }), void(n = 0);
                            s.x = n, s.z = -50 * Math.abs(s.x / i), s.deg = s.x / i * -60, this.image.node.jSetCss({
                                opacity: 1 - .2 * Math.abs(s.x / i),
                                transform: "translate3d(" + s.x + "px, 0px, " + s.z + "px)"
                            })
                        }
                }).jBind(this);
            this.node.jAddEvent("touchdrag", t)
        },
        pinchToZoom: function() {
            var a, h = {
                    width: 0,
                    height: 0
                },
                n = !1,
                s = u(function(t, e, i) {
                    var o, n;
                    if (this.zoomBox.active || i) {
                        var s = c.detach(this.zoomSize);
                        o = Math.max(a.width, Math.round(h.width * t)), n = (o = Math.min(o, this.zoomSize.maxWidth)) / (this.zoomSize.maxWidth / this.zoomSize.maxHeight), this.zoomSize.width = Math.floor(o), this.zoomSize.height = Math.floor(n), this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / a.width)), this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / a.height)), this.lens.node.jSetCss({
                            width: this.lens.width,
                            height: this.lens.height
                        }), c.extend(this.lens, this.lens.node.jGetSize()), clearTimeout(this.moveTimer), this.moveTimer = null, e.x = this.lens.spos.x * (this.zoomSize.width / s.width) + (e.x - this.boundaries.left - this.size.width / 2) * (1 - this.zoomSize.width / s.width), e.y = this.lens.spos.y * (this.zoomSize.height / s.height) + (e.y - this.boundaries.top - this.size.height / 2) * (1 - this.zoomSize.height / s.height), this.lens.spos = {
                            x: 0,
                            y: 0
                        }, this.lens.pos = {
                            x: 0,
                            y: 0
                        }, this.lens.innertouch = !0, this.animate(null, {
                            x: e.x,
                            y: e.y
                        }), clearTimeout(this.moveTimer), this.moveTimer = null
                    }
                }).jBind(this),
                t = u(function(t) {
                    if (n || "pinchstart" === t.state || t.cloned) {
                        t.stop();
                        var e = u(window).jGetScroll(),
                            i = !1,
                            o = {
                                x: t.centerPoint.x - e.x,
                                y: t.centerPoint.y - e.y
                            };
                        switch (t.state) {
                            case "pinchstart":
                                this.unregisterAnimateEvent(), h = c.detach(this.zoomSize), a = this.expanded ? this.image.node.jGetSize() : this.size, clearTimeout(this.moveTimer), this.moveTimer = null, this.zoomBox.active && (this.lens.spos = c.detach(this.lens.pos)), n = !0;
                                break;
                            case "pinchend":
                                n = !1, this.zoomBox.active && ("always" !== this.option("expandZoomOn") && this.zoomSize.width <= a.width && this.zoomSize.height <= a.height ? (n = !1, this.deactivate(null)) : 0 < t.points.length && (this.lens.spos = {
                                    x: t.points[0].clientX,
                                    y: t.points[0].clientY
                                })), this.registerAnimateEvent();
                                break;
                            case "pinchresize":
                                break;
                            case "pinchmove":
                                if (!this.expanded || -1 !== t.zoom || this.zoomBox.active && "always" !== this.option("expandZoomOn")) {
                                    if (!this.expanded || 1 !== t.zoom || "always" !== this.option("expandZoomOn"))
                                        if (this.option("expand") && !this.expanded) {
                                            if (1.1 < t.scale) return n = !1, this.registerAnimateEvent(), void this.expand(t)
                                        } else {
                                            if (1 === t.zoom && !this.zoomBox.active) {
                                                if (!this.image.loaded() || !this.ready || !this.zoomBox.enabled) return void(this.image.loaded() || this.initEvent || (t && (this.initEvent = y(t), t.stopQueue()), this.image.load(this.setupZoom.jBind(this)), this.loadTimer || (this.loadTimer = u(this.showLoading).jBind(this).jDelay(400))));
                                                this.zoomBox.activating = !0, this.expanded && "zoom" === this.zoomBox.mode && this.expandStage.jAddClass("mz-zoom-in"), this.zoomBox.image.jRemoveEvent("transitionend"), this.zoomBox.node.jRemoveClass("mz-deactivating").jRemoveEvent("transitionend"), this.zoomBox.node.jAddClass("mz-activating"), this.node.jAddClass("mz-activating"), this.reflowZoom(), this.zoomSize.width = a.width, this.zoomSize.height = a.height, this.zoomBox.activating = !1, this.zoomBox.active = !0, h = c.detach(this.zoomSize), this.zoomBox.node.jRemoveClass("mz-activating"), this.node.jRemoveClass("mz-activating").jAddClass("mz-active"), this.lens.spos = {
                                                    x: 0,
                                                    y: 0
                                                }, this.lens.pos = {
                                                    x: 0,
                                                    y: 0
                                                }, i = !0
                                            }
                                            s(t.scale, o, i), i && C("onZoomIn", this.id)
                                        }
                                } else t.scale < .5 && this.close()
                        }
                    }
                }).jBind(this);
            this.node.jAddEvent("pinch", t)
        },
        setupButtons: function() {
            var i = document.createDocumentFragment();
            u(["prev", "next", "close"]).jEach(function(t) {
                var e = "mz-button";
                switch (this.buttons[t] = c.$new("button", {
                    type: "button",
                    title: this.option("text-btn-" + t)
                }).jAddClass(e).jAddClass(e + "-" + t), i.appendChild(this.buttons[t]), t) {
                    case "prev":
                        this.buttons[t].jAddEvent("tap btnclick", function(t) {
                            t.stop(), this.update(this.getPrev())
                        }.jBindAsEvent(this));
                        break;
                    case "next":
                        this.buttons[t].jAddEvent("tap btnclick", function(t) {
                            t.stop(), this.update(this.getNext())
                        }.jBindAsEvent(this));
                        break;
                    case "close":
                        this.buttons[t].jAddEvent("tap btnclick", function(t) {
                            t.stop(), this.close()
                        }.jBindAsEvent(this)).hide()
                }
            }, this), this.toggleNavButtons(1 < this.additionalImages.length), this.navControlsLayer = c.$new("div").jAddClass("mz-nav-controls").append(i).jAppendTo(this.node)
        },
        toggleNavButtons: function(t) {
            t ? (this.buttons.next.show(), this.buttons.prev.show()) : (this.buttons.next.hide(), this.buttons.prev.hide())
        },
        setupExpandGallery: function() {
            var e, t;
            this.additionalImages.length ? this.expandGallery = this.additionalImages : (e = this.placeholder.getAttribute("data-gallery")) && (t = c.browser.features.query ? c.$A(document.querySelectorAll('.MagicZoom[data-gallery="' + e + '"], .MagicZoomPlus[data-gallery="' + e + '"]')) : c.$A(document.getElementsByTagName("A")).filter(function(t) {
                return e === t.getAttribute("data-gallery")
            }), u(t).jEach(function(t) {
                var e, i;
                (e = j(t)) && 0 < e.additionalImages.length || (e ? (i = new S(e.image.small.url, e.image.zoom.url, e.image.caption, null, e.image.origin)).link = e.image.link : i = (new S).parseNode(t, e ? e.originalTitle : null), (this.image.zoom.src.has(i.zoom.url) || this.image.zoom.url.has(i.zoom.url)) && (this.image.small.src.has(i.small.url) || this.image.small.url.has(i.small.url)) && (i = this.image), this.expandGallery.push(i))
            }, this), this.primaryImage = this.image), this.expandedViewId || (this.expandedViewId = Math.floor(Math.random() * c.now())), 1 < this.expandGallery.length ? (this.expandStage.jAddClass("with-thumbs"), this.expandNav = c.$new("div", {
                class: "mz-expand-thumbnails"
            }).jAppendTo(this.expandStage), this.expandThumbs = new i(this.expandNav), u(this.expandGallery).jEach(function(e) {
                var i = u(function(t) {
                    this.setActiveThumb(e), this.update(e)
                }).jBind(this);
                e.selector = this.expandThumbs.addItem(c.$new("img", {
                    src: e.getURL("small")
                }).jAddEvent("tap btnclick", function(t) {
                    t.stop()
                }).jAddEvent("tap " + ("hover" === this.option("selectorTrigger") ? "mouseover mouseout" : "btnclick"), u(function(t, e) {
                    this.updateTimer && clearTimeout(this.updateTimer), this.updateTimer = !1, "mouseover" === t.type ? this.updateTimer = u(i).jDelay(e) : "tap" !== t.type && "btnclick" !== t.type || i()
                }).jBindAsEvent(this, 60)))
            }, this)) : this.expandStage.jRemoveClass("with-thumbs"), this.toggleNavButtons(1 < this.expandGallery.length), this.buttons.close.show()
        },
        destroyExpandGallery: function() {
            var t;
            if (this.expandThumbs && (this.expandThumbs.stop(), this.expandThumbs = null), this.expandNav && (this.expandNav.jRemove(), this.expandNav = null), this.toggleNavButtons(1 < this.additionalImages.length), this.buttons.close.hide(), 1 < this.expandGallery.length && !this.additionalImages.length)
                for (this.node.jRemoveEvent("touchdrag"), this.image.node.jRemove().getAttribute("style"), this.image.node.removeAttribute("style"), this.primaryImage.node.jAppendTo(this.node), this.setupZoom(this.primaryImage); t = this.expandGallery.pop();) t !== this.primaryImage && (t.small.node && (t.small.node.kill(), t.small.node = null), t.zoom.node && (t.zoom.node.kill(), t.zoom.node = null), t = null);
            this.expandGallery = []
        },
        close: function() {
            this.ready && this.expanded && ("ios" === c.browser.platform && "safari" === c.browser.uaName && 7 === parseInt(c.browser.uaVersion) && (clearInterval(z), z = null), u(document).jRemoveEvent("keydown", this.keyboardCallback), this.deactivate(null, !0), this.ready = !1, c.browser.fullScreen.capable && c.browser.fullScreen.enabled() ? c.browser.fullScreen.cancel() : c.browser.features.transition ? (this.node.jRemoveEvent("transitionend").jSetCss({
                transition: ""
            }), this.node.jAddEvent("transitionend", this.onClose), c.browser.webkit && setTimeout(u(function() {
                this.onClose()
            }).jBind(this), 260), this.expandBg.jRemoveEvent("transitionend").jSetCss({
                transition: ""
            }), this.expandBg.jSetCss({
                transition: "all 0.6s cubic-bezier(0.895, 0.030, 0.685, 0.220) 0.0s"
            }).jGetSize(), this.node.jSetCss({
                transition: "all .3s cubic-bezier(0.600, 0, 0.735, 0.045) 0s"
            }).jGetSize(), !1 !== this.zoomBox.mode && "always" === this.option("expandZoomOn") && "magnifier" !== this.option("expandZoomMode") && (this.image.node.jSetCss({
                "max-height": this.image.jGetSize("zoom").height
            }), this.image.node.jSetCss({
                "max-width": this.image.jGetSize("zoom").width
            })), this.expandBg.jSetCss({
                opacity: .4
            }), this.node.jSetCss({
                opacity: .01,
                transform: "scale(0.4)"
            })) : this.onClose())
        },
        expand: function(t) {
            if (this.image.loaded() && this.ready && !this.expanded) {
                t && t.stopQueue();
                var e = u(this.node).jFetch("cr");
                this.hideHint(), this.hintRuns--, this.deactivate(null, !0), this.unregisterActivateEvent(), this.unregisterDeactivateEvent(), this.ready = !1, this.expandBox || (this.expandBox = c.$new("div").jAddClass("mz-expand").jAddClass(this.option("cssClass")).jSetCss({
                    opacity: 0
                }), this.expandStage = c.$new("div").jAddClass("mz-expand-stage").jAppendTo(this.expandBox), this.expandBox.jAddEvent("mousescroll touchstart dbltap", u(function(t) {
                    u(t).stop()
                })), this.option("closeOnClickOutside") && this.expandBox.jAddEvent("tap btnclick", function(t) {
                    var e = t.jGetPageXY(),
                        i = u("magnifier" === this.option("expandZoomMode") ? this.zoomBox.node : this.zoomBox.image).jGetRect();
                    if ("always" !== this.option("expandZoomOn") && i.top <= e.y && e.y <= i.bottom && i.left <= e.x && e.x <= i.right) return t.stopQueue(), void this.deactivate(t);
                    "always" !== this.option("expandZoomOn") && this.node.hasChild(t.getOriginalTarget()) || (t.stop(), this.close())
                }.jBindAsEvent(this)), this.keyboardCallback = u(function(t) {
                    var e = null;
                    27 !== t.keyCode && 37 !== t.keyCode && 39 !== t.keyCode || (u(t).stop(), 27 === t.keyCode ? this.close() : (e = 37 === t.keyCode ? this.getPrev() : this.getNext()) && this.update(e))
                }).jBindAsEvent(this), this.onExpand = u(function() {
                    if (this.node.jRemoveEvent("transitionend").jSetCss({
                            transition: "",
                            transform: "translate3d(0, 0, 0)"
                        }), !this.expanded) {
                        if (this.expanded = !0, this.option("history")) try {
                            var t = "#mz-expanded-view-" + this.expandedViewId;
                            window.location.hash !== t && (history.state && history.state.expandedView && history.state.mzId ? history.replaceState({
                                expandedView: this.expandedViewId,
                                mzId: this.id
                            }, document.title, t) : history.pushState({
                                expandedView: this.expandedViewId,
                                mzId: this.id
                            }, document.title, t))
                        } catch (t) {}
                        var o;
                        this.expandBox.jRemoveClass("mz-expand-opening").jSetCss({
                            opacity: 1
                        }), this.zoomBox.setMode(this.option("expandZoomMode")), this.zoomSize = c.detach(this.zoomSizeOrigin), this.resizeCallback(), this.expandCaption && this.image.caption && this.expandCaption.jAddClass("mz-show"), "always" !== this.option("expandZoomOn") && (this.registerActivateEvent(!0), this.registerDeactivateEvent(!0)), this.ready = !0, "always" === this.option("expandZoomOn") && (!1 !== this.zoomBox.mode && this.zoomBox.enable(!0), c.browser.mobile && this.mobileZoomHint && (this.mobileZoomHint = !1), this.activate()), (c.browser.mobile || this.option("forceTouch")) && this.mobileZoomHint && this.zoomBox.enabled && (this.showHint(!0, this.option("textClickZoomHint")), this.hintRuns !== 1 / 0 && (this.mobileZoomHint = !1)), this.navControlsLayer.jRemoveClass("mz-hidden").jAddClass("mz-fade mz-visible"), this.expandNav && this.expandNav.jRemoveClass("mz-hidden").jAddClass("mz-fade mz-visible"), this.expandThumbs && (this.expandThumbs.run(), this.setActiveThumb(this.image)), e && e.jAppendTo(this.expandBox, (Math.floor(101 * Math.random()) + 1) % 2 ? "top" : "bottom"), 1 < this.expandGallery.length && !this.additionalImages.length && this.swipe(), u(document).jAddEvent("keydown", this.keyboardCallback), "ios" === c.browser.platform && "safari" === c.browser.uaName && 7 === parseInt(c.browser.uaVersion) && (o = null, z = setInterval(function() {
                            var t = 90 === window.orientation || -90 === window.orientation,
                                e = window.innerHeight,
                                i = .85 * (t ? screen.availWidth : screen.availHeight);
                            null !== o && !1 !== o || !(t && e < i || !t && e < i) ? null !== o && !0 !== o || !(t && i < e || !t && i < e) || (o = !1, n()) : (o = !0, n())
                        }, 250)), C("onExpandOpen", this.id)
                    }

                    function n() {
                        window.scrollTo(document.body.scrollLeft, document.body.scrollTop), window.dispatchEvent(new Event("resize"))
                    }
                }).jBind(this), this.onClose = u(function() {
                    this.node.jRemoveEvent("transitionend"), this.expanded && (this.expanded && (u(document).jRemoveEvent("keydown", this.keyboardCallback), this.deactivate(null, !0)), this.setSize(!0), this.destroyExpandGallery(), this.expanded = !1, this.option("history") && window.location.hash === "#mz-expanded-view-" + this.expandedViewId && history.back(), this.zoomBox.setMode(this.option("zoomMode")), this.node.replaceChild(this.image.getNode("small"), this.image.node), this.image.setCurNode("small"), u(this.image.node).jSetCss({
                        width: "",
                        height: "",
                        "max-width": Math.min(this.image.jGetSize("small").width),
                        "max-height": Math.min(this.image.jGetSize("small").height)
                    }), this.lens.image.src = this.image.getURL("small"), this.node.jSetCss({
                        opacity: "",
                        transition: ""
                    }), this.node.jSetCss({
                        transform: "translate3d(0, 0, 0)"
                    }), u(this.placeholder).replaceChild(this.node, this.stubNode), this.navControlsLayer.jRemoveClass("mz-expand-controls").jRemoveClass("mz-hidden").jAddClass("mz-fade mz-visible").jAppendTo(this.node), this.setSize(!0), this.expandCaption && (this.expandCaption.jRemove(), this.expandCaption = null), this.unregisterActivateEvent(), this.unregisterDeactivateEvent(), "always" === this.option("zoomOn") ? this.activate() : !1 !== this.option("zoomMode") && (this.registerActivateEvent("click" === this.option("zoomOn")), this.registerDeactivateEvent("click" === this.option("zoomOn"))), this.showHint(), this.expandBg.jRemoveEvent("transitionend"), this.expandBox.jRemove(), this.expandBg.jRemove(), this.expandBg = null, s && s.jRemove(), u(c.browser.getDoc()).jRemoveClass("mz-expanded-view-open"), this.ready = !0, c.browser.ieMode < 10 ? this.resizeCallback() : u(window).jRaiseEvent("UIEvent", "resize"), C("onExpandClose", this.id))
                }).jBind(this), this.expandImageStage = c.$new("div", {
                    class: "mz-image-stage"
                }).jAppendTo(this.expandStage), this.expandFigure = c.$new("figure").jAppendTo(this.expandImageStage), this.stubNode = this.node.cloneNode(!1)), this.navControlsLayer.jAddClass("mz-expand-controls").jAppendTo(this.expandImageStage), this.setupExpandGallery(), s && s.jAppendTo(document.body), u(c.browser.getDoc()).jAddClass("mz-expanded-view-open"), u(document.body).jGetSize(), "fullscreen" === this.option("expand") ? (this.prepareExpandedView(), c.browser.fullScreen.request(this.expandBox, {
                    onEnter: u(function() {
                        this.onExpand()
                    }).jBind(this),
                    onExit: this.onClose,
                    fallback: u(function() {
                        this.expandToWindow()
                    }).jBind(this)
                })) : setTimeout(u(function() {
                    this.prepareExpandedView(), this.expandToWindow()
                }).jBind(this), 96)
            } else this.image.loaded() || this.initEvent || (t && (this.initEvent = y(t), t.stopQueue(), "tap" === t.type && t.events[1].stopQueue()), this.image.load(this.setupZoom.jBind(this)), this.loadTimer || (this.loadTimer = u(this.showLoading).jBind(this).jDelay(400)))
        },
        prepareExpandedView: function() {
            var t, e;
            t = c.$new("img", {
                srcset: this.image.getURL("zoom") + " " + this.image.getRatio("zoom") + "x",
                src: this.image.getURL("zoom")
            }), this.expandBg = c.$new("div").jAddClass("mz-expand-bg").append(c.browser.features.cssFilters || c.browser.ieMode < 10 ? t : new c.SVGImage(t).blur(20).getNode()).jAppendTo(this.expandBox), "always" === this.option("expandZoomOn") && !1 !== this.option("expandZoomMode") && this.expandStage.jAddClass("mz-always-zoom" + ("zoom" === this.option("expandZoomMode") ? " mz-zoom-in" : "")).jGetSize(), e = u(this.node)[c.browser.ieMode < 10 ? "jGetSize" : "getBoundingClientRect"](), u(this.stubNode).jSetCss({
                width: e.width,
                height: e.height
            }), this.node.replaceChild(this.image.getNode("zoom"), this.image.node), this.image.setCurNode("zoom"), this.expandBox.jAppendTo(document.body), s && this.expandBox.jSetCss({
                height: window.innerHeight,
                maxHeight: "100vh",
                top: Math.abs(s.getBoundingClientRect().top)
            }), this.expandMaxWidth = function() {
                var t = this.expandImageStage;
                return 50 < u(this.expandFigure).jGetSize().width && (t = this.expandFigure),
                    function() {
                        return "always" === this.option("expandZoomOn") && !1 !== this.option("expandZoomMode") && "magnifier" !== this.option("expandZoomMode") ? 1 / 0 : Math.round(u(t).getInnerSize().width)
                    }
            }.call(this), this.expandMaxHeight = function() {
                var t = this.expandImageStage;
                return 50 < u(this.expandFigure).jGetSize().height && (t = this.expandFigure),
                    function() {
                        return "always" === this.option("expandZoomOn") && !1 !== this.option("expandZoomMode") && "magnifier" !== this.option("expandZoomMode") ? 1 / 0 : Math.round(u(t).getInnerSize().height)
                    }
            }.call(this), this.navControlsLayer.jRemoveClass("mz-fade mz-visible").jAddClass("mz-hidden"), this.expandNav && this.expandNav.jRemoveClass("mz-fade mz-visible").jAddClass("mz-hidden"), this.option("expandCaption") && (this.expandCaption = c.$new("figcaption", {
                class: "mz-caption"
            }).jAppendTo(this.expandImageStage), this.expandCaption && this.image.caption && (this.image.link ? this.expandCaption.append(c.$new("a", {
                href: this.image.link
            }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(this.image.caption)) : this.expandCaption.changeContent(this.image.caption))), this.image.node.jSetCss({
                "max-height": Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
            }), this.image.node.jSetCss({
                "max-width": Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
            }), this.expandFigure.append(u(this.placeholder).replaceChild(this.stubNode, this.node))
        },
        expandToWindow: function() {
            this.node.jSetCss({
                transition: ""
            }), this.node.jSetCss({
                transform: "scale(0.6)"
            }).jGetSize(), this.node.jSetCss({
                transition: c.browser.cssTransform + " 0.4s cubic-bezier(0.175, 0.885, 0.320, 1) 0s"
            }), c.browser.features.transition ? (this.node.jAddEvent("transitionend", this.onExpand), !c.browser.chrome || "chrome" !== c.browser.uaName && "opera" !== c.browser.uaName || setTimeout(u(function() {
                this.onExpand()
            }).jBind(this), 500)) : this.onExpand.jDelay(16, this), this.expandBox.jSetCss({
                opacity: 1
            }), this.node.jSetCss({
                transform: "scale(1)"
            })
        },
        openLink: function() {
            this.image.link && window.open(this.image.link, "_self")
        },
        getNext: function() {
            var t = (this.expanded ? this.expandGallery : this.additionalImages).filter(function(t) {
                    return -1 !== t.small.state || -1 !== t.zoom.state
                }),
                e = t.length,
                i = u(t).indexOf(this.image) + 1;
            return e <= 1 ? null : t[e <= i ? 0 : i]
        },
        getPrev: function() {
            var t = (this.expanded ? this.expandGallery : this.additionalImages).filter(function(t) {
                    return -1 !== t.small.state || -1 !== t.zoom.state
                }),
                e = t.length,
                i = u(t).indexOf(this.image) - 1;
            return e <= 1 ? null : t[i < 0 ? e - 1 : i]
        },
        imageByURL: function(e, i) {
            return (this.additionalImages.filter(function(t) {
                return (t.zoom.src.has(e) || t.zoom.url.has(e)) && (t.small.src.has(i) || t.small.url.has(i))
            }) || [])[0] || (i && e && "string" === c.jTypeOf(i) && "string" === c.jTypeOf(e) ? new S(i, e) : null)
        },
        imageByOrigin: function(e) {
            return (this.additionalImages.filter(function(t) {
                return t.origin === e
            }) || [])[0]
        },
        imageByIndex: function(t) {
            return this.additionalImages[t]
        }
    }, o = {
        version: "v5.3.4 (Plus) DEMO",
        start: function(t, e) {
            var i = null,
                o = [];
            return c.$A(t ? [u(t)] : c.$A(document.byClass("MagicZoom")).concat(c.$A(document.byClass("MagicZoomPlus")))).jEach(u(function(t) {
                u(t) && (j(t) || (i = new E(t, e), f && !i.option("autostart") ? (i.stop(), i = null) : (m.push(i), o.push(i))))
            }).jBind(this)), t ? o[0] : o
        },
        stop: function(t) {
            var e, i;
            if (t)(i = j(t)) && (i = m.splice(m.indexOf(i), 1)) && i[0].stop() && delete i[0];
            else
                for (; e = m.length;)(i = m.splice(e - 1, 1))[0].stop(), delete i[0]
        },
        refresh: function(t) {
            return this.stop(t), this.start(t)
        },
        update: function(t, e, i, o) {
            var n, s = j(t);
            s && (n = "element" === c.jTypeOf(e) ? s.imageByOrigin(e) : s.imageByURL(e, i)) && s.update(n)
        },
        switchTo: function(t, e) {
            var i, o = j(t);
            if (o) {
                switch (c.jTypeOf(e)) {
                    case "element":
                        i = o.imageByOrigin(e);
                        break;
                    case "number":
                        i = o.imageByIndex(e)
                }
                i && o.update(i)
            }
        },
        prev: function(t) {
            var e;
            (e = j(t)) && e.update(e.getPrev())
        },
        next: function(t) {
            var e;
            (e = j(t)) && e.update(e.getNext())
        },
        zoomIn: function(t) {
            var e;
            (e = j(t)) && e.activate()
        },
        zoomOut: function(t) {
            var e;
            (e = j(t)) && e.deactivate()
        },
        expand: function(t) {
            var e;
            (e = j(t)) && e.expand()
        },
        close: function(t) {
            var e;
            (e = j(t)) && e.close()
        },
        registerCallback: function(t, e) {
            l[t] || (l[t] = []), "function" === c.jTypeOf(e) && l[t].push(e)
        },
        running: function(t) {
            return !!j(t)
        }
    }, u(document).jAddEvent("domready", function() {
        var t = window.mzOptions || {};
        b = b(), c.addCSS(".magic-hidden-wrapper, .magic-temporary-img", {
            display: "block !important",
            "min-height": "0 !important",
            "min-width": "0 !important",
            "max-height": "none !important",
            "max-width": "none !important",
            width: "10px !important",
            height: "10px !important",
            position: "absolute !important",
            top: "-10000px !important",
            left: "0 !important",
            overflow: "hidden !important",
            "-webkit-transform": "none !important",
            transform: "none !important",
            "-webkit-transition": "none !important",
            transition: "none !important"
        }, "magiczoom-reset-css"), c.addCSS(".magic-temporary-img img, .magic-temporary-img picture", {
            display: "inline-block !important",
            border: "0 !important",
            padding: "0 !important",
            "min-height": "0 !important",
            "min-width": "0 !important",
            "max-height": "none !important",
            "max-width": "none !important",
            "-webkit-transform": "none !important",
            transform: "none !important",
            "-webkit-transition": "none !important",
            transition: "none !important"
        }, "magiczoom-reset-css"), c.addCSS(".magic-temporary-img picture, .magic-temporary-img picture > img", {
            width: "auto !important",
            height: "auto !important"
        }, "magiczoom-reset-css"), c.browser.androidBrowser && c.addCSS(".mobile-magic .mz-expand .mz-expand-bg", {
            display: "none !important"
        }, "magiczoom-reset-css"), !c.browser.androidBrowser || "chrome" === c.browser.uaName && 44 !== c.browser.uaVersion || c.addCSS(".mobile-magic .mz-zoom-window.mz-magnifier, .mobile-magic .mz-zoom-window.mz-magnifier:before", {
            "border-radius": "0 !important"
        }, "magiczoom-reset-css"), h = c.$new("div", {
            class: "magic-hidden-wrapper"
        }).jAppendTo(document.body), n = c.browser.mobile && window.matchMedia && window.matchMedia("(max-device-width: 767px), (max-device-height: 767px)").matches, c.browser.mobile && c.extend(a, r), n && "ios" === c.browser.platform && (s = c.$new("div").jSetCss({
            position: "fixed",
            top: 0,
            width: 0,
            height: "100vh"
        }));
        for (var e = 0; e < d.length; e++) t[d[e]] && c.$F !== t[d[e]] && o.registerCallback(d[e], t[d[e]]);
        o.start(), f = !1
    }), window.MagicZoomPlus = window.MagicZoomPlus || {}, o
}();