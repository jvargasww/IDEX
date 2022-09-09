(() => {
    var nt = Object.defineProperty;
    var it = (t, e, o) => e in t ? nt(t, e, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: o
    }) : t[e] = o;
    var F = (t, e, o) => (it(t, typeof e != "symbol" ? e + "" : e, o), o);
    var j = "@finsweet/attributes-cmscore";
    var l = class {
        static activateAlerts() {
            this.alertsActivated = !0
        }
        static alert(e, o) {
            if (this.alertsActivated && window.alert(e), o === "error") throw new Error(e)
        }
    };
    F(l, "alertsActivated", !1);
    var M = {
        wrapper: "w-dyn-list",
        list: "w-dyn-items",
        item: "w-dyn-item",
        paginationWrapper: "w-pagination-wrapper",
        paginationNext: "w-pagination-next",
        paginationPrevious: "w-pagination-previous",
        pageCount: "w-page-count",
        emptyState: "w-dyn-empty"
    };
    var L = (t, e = !0) => t.cloneNode(e);
    var {
        wrapper: at,
        list: pt,
        paginationWrapper: lt,
        paginationNext: mt,
        paginationPrevious: ut,
        emptyState: ft,
        pageCount: dt
    } = M;

    function w(t, e, o = document) {
        let n = typeof t == "string" ? o.querySelector(t) : t;
        if (!n) return;
        let s = n.closest(`.${at}`);
        if (!s) return;
        let r = s.querySelector(`.${pt}`);
        return e === "wrapper" ? s : e === "list" ? r : e === "items" ? [...(r == null ? void 0 : r.children) || []] : e === "pageCount" ? s.querySelector(`.${dt}`) : e === "empty" ? s.querySelector(`:scope > .${ft}`) : e === "pagination" ? s.querySelector(`.${lt}`) : s.querySelector(`.${e==="next"?mt:ut}`)
    }
    var B = (t, e = document) => {
        t = t.filter(r => r);
        let o = t.join(", ") || `.${M.wrapper}`;
        return [...e.querySelectorAll(o)].reduce((r, i) => {
            if (!i) return r;
            let c = w(i, "wrapper");
            return !c || r.includes(c) || r.push(c), r
        }, [])
    };

    function b(t) {
        return t == null ? void 0 : t.trim().toLowerCase()
    }
    var St = `https://cdn.jsdelivr.net/npm/${j}@1/cmscore.js`,
        A = async () => {
            let {
                fsAttributes: t
            } = window;
            t.cms || (t.cms = {});
            let {
                cms: e
            } = t;
            if (e.coreImport) return e.coreImport;
            try {
                let o = import(St);
                return e.coreImport = o, o.then(n => {
                    n && (e.coreVersion || (e.coreVersion = n.version))
                }), o
            } catch (o) {
                l.alert(`${o}`, "error");
                return
            }
        };
    var E = "fs-attributes";
    var u = "cmsnest";
    var Tt = `${E}-support`,
        wt = "https://cdn.jsdelivr.net/npm/@finsweet/attributes-support@1/support.js",
        q = async () => {
            let {
                fsAttributes: t,
                location: e
            } = window, {
                host: o,
                searchParams: n
            } = new URL(e.href);
            if (!o.includes("webflow.io") || !n.has(Tt)) return !1;
            if (t.supportImport) return t.supportImport;
            try {
                t.supportImport = new Promise((s, r) => {
                    let i = document.createElement("script");
                    i.src = wt, i.onload = () => s(!0), i.onerror = r, document.head.append(i)
                })
            } catch (s) {
                return !1
            }
            return t.supportImport
        };
    var v = t => {
        let e = (n, s, r) => {
            let i = t[n],
                {
                    key: c,
                    values: p
                } = i,
                m;
            if (!s) return `[${c}]`;
            let x = p == null ? void 0 : p[s];
            typeof x == "string" ? m = x : m = x(r && "instanceIndex" in r ? r.instanceIndex : void 0);
            let d = r && "caseInsensitive" in r && r.caseInsensitive ? "i" : "";
            if (!(r != null && r.operator)) return `[${c}="${m}"${d}]`;
            switch (r.operator) {
                case "prefixed":
                    return `[${c}^="${m}"${d}]`;
                case "suffixed":
                    return `[${c}$="${m}"${d}]`;
                case "contains":
                    return `[${c}*="${m}"${d}]`
            }
        };

        function o(n, s) {
            let r = e("element", n, s),
                i = (s == null ? void 0 : s.scope) || document;
            return s != null && s.all ? i.querySelectorAll(r) : i.querySelector(r)
        }
        return [e, o]
    };
    var C = {
            preventLoad: {
                key: `${E}-preventload`
            },
            debugMode: {
                key: `${E}-debug`
            },
            src: {
                key: "src",
                values: {
                    finsweet: "@finsweet/attributes"
                }
            },
            dev: {
                key: `${E}-dev`
            }
        },
        [k, le] = v(C);
    var W = () => {
        let {
            currentScript: t
        } = document, {
            preventLoad: e,
            debugMode: o
        } = C, n = typeof(t == null ? void 0 : t.getAttribute(e.key)) == "string";
        return typeof(t == null ? void 0 : t.getAttribute(o.key)) == "string" && l.activateAlerts(), {
            preventsLoad: n
        }
    };
    var H = () => {
            if (window.fsAttributes && !Array.isArray(window.fsAttributes)) return;
            let t = {
                cms: {},
                push(...e) {
                    var o, n;
                    for (let [s, r] of e)(n = (o = this[s]) == null ? void 0 : o.loading) == null || n.then(r)
                }
            };
            bt(t), Et(t), window.fsAttributes = t, window.FsAttributes = window.fsAttributes, q()
        },
        bt = t => {
            let e = k("src", "finsweet", {
                    operator: "contains"
                }),
                o = k("dev"),
                s = [...document.querySelectorAll(`script${e}, script${o}`)].reduce((r, i) => {
                    var p;
                    let c = i.getAttribute(C.dev.key) || ((p = i.src.match(/[\w-. ]+(?=(\.js)$)/)) == null ? void 0 : p[0]);
                    return c && !r.includes(c) && r.push(c), r
                }, []);
            for (let r of s) {
                t[r] = {};
                let i = t[r];
                i.loading = new Promise(c => {
                    i.resolve = p => {
                        c(p), delete i.resolve
                    }
                })
            }
        },
        Et = t => {
            let e = Array.isArray(window.fsAttributes) ? window.fsAttributes : [];
            t.push(...e)
        };
    var G = "1.6.8";
    var U = `fs-${u}`,
        yt = "list",
        At = "collection",
        Ct = "empty",
        g = {
            element: {
                key: `${U}-element`,
                values: {
                    list: yt
                }
            },
            collection: {
                key: `${U}-${At}`
            },
            empty: {
                key: `${U}-${Ct}`
            }
        },
        [f, Ie] = v(g);
    var {
        collection: {
            key: X
        },
        empty: {
            key: gt
        }
    } = g, z = ({
        createCMSListInstances: t
    }) => {
        let e = new Map,
            o = t([f("collection")]);
        for (let n of o) {
            let s = b(n.getAttribute(X));
            if (!s) continue;
            let r = document.querySelector(`[${gt}^="${s}"]`);
            r && (r.style.display = "none"), n.wrapper.style.display = "none", e.set(s, {
                listInstance: n,
                emptyElement: r
            })
        }
        return e
    }, Y = t => {
        let e = new Map,
            o = t.querySelectorAll(`${f("collection")}:not(a)`);
        for (let n of o) {
            let s = b(n.getAttribute(X));
            !s || e.set(s, n)
        }
        return e
    };
    var It = new DOMParser,
        Q = new Map,
        J = async t => {
            try {
                let e = Q.get(t);
                if (e) return e;
                let o = new Promise(async n => {
                    let r = await (await fetch(t)).text(),
                        i = It.parseFromString(r, "text/html");
                    n(i)
                });
                return Q.set(t, o), o
            } catch (e) {
                return null
            }
        };
    var I = async ({
        element: t,
        href: e
    }, o, n) => {
        if (!e) return;
        let {
            CMSList: s,
            CMSItem: r
        } = n, i = Y(t);
        if (!i.size) return;
        let c = await J(e);
        if (!c) return;
        let p = B([f("collection")], c),
            m = new Set;
        await Promise.all(p.map(async (x, d) => {
            let $ = new s(x, d),
                y = b($.getAttribute(g.collection.key));
            if (!y || m.has(y)) return;
            m.add(y);
            let V = o.get(y),
                _ = i.get(y);
            if (!V || !_) return;
            let D = _.parentElement;
            if (!D) return;
            let {
                listInstance: K,
                emptyElement: N
            } = V, P = $.items.reduce((a, {
                href: T
            }) => {
                if (!T) return a;
                let h = K.items.find(R => R.href && T === R.href);
                return h && a.push(h), a
            }, []);
            if (!P.length && !N) return;
            let S = L(K.wrapper),
                st = w(S, "items");
            if (S.style.display = "", P.length)
                for (let a of st) {
                    if (!!!P.find(({
                            element: R
                        }) => R.isEqualNode(a))) {
                        a.remove();
                        continue
                    }
                    let h = new r(a, S);
                    await I(h, o, n)
                } else if (N) {
                    let a = w(S, "list");
                    a == null || a.remove();
                    let T = L(N);
                    T.style.display = "", S.appendChild(T)
                } D.insertBefore(S, _), _.remove()
        }))
    };
    var Z = (t, e, o) => {
        t.on("shouldnest", async n => {
            await Promise.all(n.map(s => I(s, e, o)))
        })
    };
    var tt = async (t, e) => {
        let o = z(e);
        if (!o.size) {
            l.alert(`No collections to nest found for the list n\xBA ${t.index}`, "info");
            return
        }
        Z(t, o, e);
        let n = [...t.items];
        await Promise.all(n.map(s => I(s, o, e))), await t.emitSerial("nestinitialitems", n)
    };
    var O = async () => {
        var o, n;
        let t = await A();
        if (!t) return [];
        let e = t.createCMSListInstances([f("element", "list", {
            operator: "prefixed"
        })]);
        return await Promise.all(e.map(s => tt(s, t))), (n = (o = window.fsAttributes[u]).resolve) == null || n.call(o, e), e
    };
    H();
    A();
    var et, ot;
    (et = window.fsAttributes)[ot = u] || (et[ot] = {});
    var {
        preventsLoad: _t
    } = W(), rt = window.fsAttributes[u];
    rt.version = G;
    _t ? rt.init = O : (window.Webflow || (window.Webflow = []), window.Webflow.push(O));
})();
