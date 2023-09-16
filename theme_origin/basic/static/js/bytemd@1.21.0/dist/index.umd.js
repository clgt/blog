(function (Or, qo) {
	typeof exports == 'object' && typeof module != 'undefined'
		? qo(exports)
		: typeof define == 'function' && define.amd
		? define(['exports'], qo)
		: ((Or = typeof globalThis != 'undefined' ? globalThis : Or || self),
		  qo((Or.bytemd = {})));
})(this, function (Or) {
	'use strict';
	const qo = '';
	function En() {}
	function uc(e) {
		return e();
	}
	function cc() {
		return Object.create(null);
	}
	function Qn(e) {
		e.forEach(uc);
	}
	function fc(e) {
		return typeof e == 'function';
	}
	function hc(e, t) {
		return e != e
			? t == t
			: e !== t || (e && typeof e == 'object') || typeof e == 'function';
	}
	function Xo(e, t) {
		return e != e ? t == t : e !== t;
	}
	function m5(e) {
		return Object.keys(e).length === 0;
	}
	function we(e, t) {
		e.appendChild(t);
	}
	function Ct(e, t, r) {
		e.insertBefore(t, r || null);
	}
	function vt(e) {
		e.parentNode && e.parentNode.removeChild(e);
	}
	function w1(e, t) {
		for (let r = 0; r < e.length; r += 1) e[r] && e[r].d(t);
	}
	function Re(e) {
		return document.createElement(e);
	}
	function St(e) {
		return document.createTextNode(e);
	}
	function L1() {
		return St('');
	}
	function vn(e, t, r, o) {
		return e.addEventListener(t, r, o), () => e.removeEventListener(t, r, o);
	}
	function Ii(e) {
		return function (t) {
			t.target === this && e.call(this, t);
		};
	}
	function Ke(e, t, r) {
		r == null
			? e.removeAttribute(t)
			: e.getAttribute(t) !== r && e.setAttribute(t, r);
	}
	function T5(e) {
		return Array.from(e.childNodes);
	}
	function Kt(e, t) {
		(t = '' + t), e.wholeText !== t && (e.data = t);
	}
	function bt(e, t, r) {
		e.classList[r ? 'add' : 'remove'](t);
	}
	function E5(e, t, { bubbles: r = !1, cancelable: o = !1 } = {}) {
		const u = document.createEvent('CustomEvent');
		return u.initCustomEvent(e, r, o, t), u;
	}
	let I1;
	function M1(e) {
		I1 = e;
	}
	function Qo() {
		if (!I1)
			throw new Error('Function called outside component initialization');
		return I1;
	}
	function wa(e) {
		Qo().$$.on_mount.push(e);
	}
	function v5(e) {
		Qo().$$.after_update.push(e);
	}
	function dc(e) {
		Qo().$$.on_destroy.push(e);
	}
	function R1() {
		const e = Qo();
		return (t, r, { cancelable: o = !1 } = {}) => {
			const u = e.$$.callbacks[t];
			if (u) {
				const c = E5(t, r, {
					cancelable: o,
				});
				return (
					u.slice().forEach((f) => {
						f.call(e, c);
					}),
					!c.defaultPrevented
				);
			}
			return !0;
		};
	}
	const Mi = [],
		ei = [];
	let Ri = [];
	const pc = [],
		gc = Promise.resolve();
	let La = !1;
	function mc() {
		La || ((La = !0), gc.then(Tc));
	}
	function Vo() {
		return mc(), gc;
	}
	function Ia(e) {
		Ri.push(e);
	}
	const Ma = new Set();
	let Di = 0;
	function Tc() {
		if (Di !== 0) return;
		const e = I1;
		do {
			try {
				for (; Di < Mi.length; ) {
					const t = Mi[Di];
					Di++, M1(t), y5(t.$$);
				}
			} catch (t) {
				throw ((Mi.length = 0), (Di = 0), t);
			}
			for (M1(null), Mi.length = 0, Di = 0; ei.length; ) ei.pop()();
			for (let t = 0; t < Ri.length; t += 1) {
				const r = Ri[t];
				Ma.has(r) || (Ma.add(r), r());
			}
			Ri.length = 0;
		} while (Mi.length);
		for (; pc.length; ) pc.pop()();
		(La = !1), Ma.clear(), M1(e);
	}
	function y5(e) {
		if (e.fragment !== null) {
			e.update(), Qn(e.before_update);
			const t = e.dirty;
			(e.dirty = [-1]),
				e.fragment && e.fragment.p(e.ctx, t),
				e.after_update.forEach(Ia);
		}
	}
	function A5(e) {
		const t = [],
			r = [];
		Ri.forEach((o) => (e.indexOf(o) === -1 ? t.push(o) : r.push(o))),
			r.forEach((o) => o()),
			(Ri = t);
	}
	const Zo = new Set();
	let ti;
	function _5() {
		ti = {
			r: 0,
			c: [],
			p: ti,
		};
	}
	function C5() {
		ti.r || Qn(ti.c), (ti = ti.p);
	}
	function cr(e, t) {
		e && e.i && (Zo.delete(e), e.i(t));
	}
	function ni(e, t, r, o) {
		if (e && e.o) {
			if (Zo.has(e)) return;
			Zo.add(e),
				ti.c.push(() => {
					Zo.delete(e), o && (r && e.d(1), o());
				}),
				e.o(t);
		} else o && o();
	}
	function D1(e) {
		e && e.c();
	}
	function Pi(e, t, r, o) {
		const { fragment: u, after_update: c } = e.$$;
		u && u.m(t, r),
			o ||
				Ia(() => {
					const f = e.$$.on_mount.map(uc).filter(fc);
					e.$$.on_destroy ? e.$$.on_destroy.push(...f) : Qn(f),
						(e.$$.on_mount = []);
				}),
			c.forEach(Ia);
	}
	function Fi(e, t) {
		const r = e.$$;
		r.fragment !== null &&
			(A5(r.after_update),
			Qn(r.on_destroy),
			r.fragment && r.fragment.d(t),
			(r.on_destroy = r.fragment = null),
			(r.ctx = []));
	}
	function S5(e, t) {
		e.$$.dirty[0] === -1 && (Mi.push(e), mc(), e.$$.dirty.fill(0)),
			(e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
	}
	function Hi(e, t, r, o, u, c, f, d = [-1]) {
		const g = I1;
		M1(e);
		const T = (e.$$ = {
			fragment: null,
			ctx: [],
			props: c,
			update: En,
			not_equal: u,
			bound: cc(),
			on_mount: [],
			on_destroy: [],
			on_disconnect: [],
			before_update: [],
			after_update: [],
			context: new Map(t.context || (g ? g.$$.context : [])),
			callbacks: cc(),
			dirty: d,
			skip_bound: !1,
			root: t.target || g.$$.root,
		});
		f && f(T.root);
		let A = !1;
		if (
			((T.ctx = r
				? r(e, t.props || {}, (C, M, ...x) => {
						const S = x.length ? x[0] : M;
						return (
							T.ctx &&
								u(T.ctx[C], (T.ctx[C] = S)) &&
								(!T.skip_bound && T.bound[C] && T.bound[C](S), A && S5(e, C)),
							M
						);
				  })
				: []),
			T.update(),
			(A = !0),
			Qn(T.before_update),
			(T.fragment = o ? o(T.ctx) : !1),
			t.target)
		) {
			if (t.hydrate) {
				const C = T5(t.target);
				T.fragment && T.fragment.l(C), C.forEach(vt);
			} else T.fragment && T.fragment.c();
			t.intro && cr(e.$$.fragment),
				Pi(e, t.target, t.anchor, t.customElement),
				Tc();
		}
		M1(g);
	}
	class Bi {
		$destroy() {
			Fi(this, 1), (this.$destroy = En);
		}
		$on(t, r) {
			if (!fc(r)) return En;
			const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
			return (
				o.push(r),
				() => {
					const u = o.indexOf(r);
					u !== -1 && o.splice(u, 1);
				}
			);
		}
		$set(t) {
			this.$$set &&
				!m5(t) &&
				((this.$$.skip_bound = !0), this.$$set(t), (this.$$.skip_bound = !1));
		}
	}
	const b5 = {
			bold: 'Bold',
			boldText: 'bold text',
			cheatsheet: 'Markdown Cheatsheet',
			closeHelp: 'Close help',
			closeToc: 'Close table of contents',
			code: 'Code',
			codeBlock: 'Code block',
			codeLang: 'lang',
			codeText: 'code',
			exitFullscreen: 'Exit fullscreen',
			exitPreviewOnly: 'Exit preview only',
			exitWriteOnly: 'Exit write only',
			fullscreen: 'Fullscreen',
			h1: 'Heading 1',
			h2: 'Heading 2',
			h3: 'Heading 3',
			h4: 'Heading 4',
			h5: 'Heading 5',
			h6: 'Heading 6',
			headingText: 'heading',
			help: 'Help',
			hr: 'Horizontal rule',
			image: 'Image',
			imageAlt: 'alt',
			imageTitle: 'title',
			italic: 'Italic',
			italicText: 'italic text',
			limited: 'The maximum character limit has been reached',
			lines: 'Lines',
			link: 'Link',
			linkText: 'link text',
			ol: 'Ordered list',
			olItem: 'item',
			preview: 'Preview',
			previewOnly: 'Preview only',
			quote: 'Quote',
			quotedText: 'quoted text',
			shortcuts: 'Shortcuts',
			source: 'Source code',
			sync: 'Scroll sync',
			toc: 'Table of contents',
			top: 'Scroll to top',
			ul: 'Unordered list',
			ulItem: 'item',
			words: 'Words',
			write: 'Write',
			writeOnly: 'Write only',
		},
		ct = {
			Close:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m8 8 32 32M8 40 40 8"/></svg>',
			H: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M12 5v38M36 5v38M12 24h24"/></svg>',
			H1: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 8v32M25 8v32M6 24h19M34.226 24 39 19.017V40"/></svg>',
			H2: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 8v32M24 8v32M7 24h16M32 25c0-3.167 2.667-5 5-5s5 1.833 5 5c0 5.7-10 9.933-10 15h10"/></svg>',
			H3: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 8v32M24 8v32M7 24h16M32 20h10l-7 9c4 0 7 2 7 6s-3 5-5 5c-2.381 0-4-1-5-2.1"/></svg>',
			LevelFourTitle:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 8v32M24 8v32M7 24h16M39.977 40V20L31 32.997v2.023h12"/></svg>',
			LevelFiveTitle:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 8v32M24 8v32M7 24h16M40 21.01h-8v7.024C32 28 34 27 37 27s4 2.534 4 6.5-1 6.5-5 6.5c-3 0-4-2-4-3.992"/></svg>',
			LevelSixTitle:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 8v32M24 8v32M7 24h16"/><path stroke="currentColor" stroke-width="4" d="M36.5 40a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M41.596 24.74C40.778 22.545 38.804 21 36.5 21c-3.038 0-5.5 2.686-5.5 6v7"/></svg>',
			TextBold:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24 24c5.506 0 9.969-4.477 9.969-10S29.506 4 24 4H11v20h13ZM28.031 44C33.537 44 38 39.523 38 34s-4.463-10-9.969-10H11v20h17.031Z" clip-rule="evenodd"/></svg>',
			TextItalic:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M20 6h16M12 42h16M29 5.952 19 42"/></svg>',
			Quote:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M18.853 9.116C11.323 13.952 7.14 19.58 6.303 26.003 5 36 13.94 40.893 18.47 36.497 23 32.1 20.285 26.52 17.005 24.994c-3.28-1.525-5.286-.994-4.936-3.033.35-2.038 5.016-7.69 9.116-10.322a.749.749 0 0 0 .114-1.02L20.285 9.3c-.44-.572-.862-.55-1.432-.185ZM38.679 9.116c-7.53 4.836-11.714 10.465-12.55 16.887-1.303 9.997 7.637 14.89 12.167 10.494 4.53-4.397 1.815-9.977-1.466-11.503-3.28-1.525-5.286-.994-4.936-3.033.35-2.038 5.017-7.69 9.117-10.322a.749.749 0 0 0 .113-1.02L40.11 9.3c-.44-.572-.862-.55-1.431-.185Z" clip-rule="evenodd"/></svg>',
			LinkOne:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m26.24 16.373-9.14-9.14c-2.661-2.661-7.035-2.603-9.768.131-2.734 2.734-2.793 7.107-.131 9.768l7.935 7.936M32.903 23.003l7.935 7.935c2.661 2.662 2.603 7.035-.13 9.769-2.735 2.734-7.108 2.792-9.77.13l-9.14-9.14"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M26.11 26.142c2.733-2.734 2.792-7.108.13-9.769M21.799 21.798c-2.734 2.734-2.792 7.108-.131 9.769"/></svg>',
			Pic: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 10a2 2 0 0 1 2-2h34a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10Z" clip-rule="evenodd"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M14.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd"/><path stroke="currentColor" stroke-linejoin="round" stroke-width="4" d="m15 24 5 4 6-7 17 13v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4l10-10Z"/></svg>',
			Code: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M16 13 4 25.432 16 37M32 13l12 12.432L32 37"/><path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="m28 4-7 40"/></svg>',
			CodeBrackets:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M16 4c-2 0-5 1-5 5v9c0 3-5 5-5 5s5 2 5 5v11c0 4 3 5 5 5M32 4c2 0 5 1 5 5v9c0 3 5 5 5 5s-5 2-5 5v11c0 4-3 5-5 5"/></svg>',
			ListTwo:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linejoin="round" stroke-width="4" d="M9 42a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM9 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM9 28a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M21 24h22M21 38h22M21 10h22"/></svg>',
			OrderedList:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M9 4v9M12 13H6M12 27H6M6 20s3-3 5 0-5 7-5 7M6 34.5s2-3 5-1 0 4.5 0 4.5 3 2.5 0 4.5-5-1-5-1M11 38H9M9 4 6 6M21 24h22M21 38h22M21 10h22"/></svg>',
			DividingLine:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 24h38M21 38h6M37 38h6M21 10h6M5 38h6M5 10h6M37 10h6"/></svg>',
			AlignTextLeftOne:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linejoin="round" stroke-width="4" d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M26 24H14M34 15H14M32 33H14"/></svg>',
			Helpcenter:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linejoin="round" stroke-width="4" d="M39 6H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24 28.625v-4a6 6 0 1 0-6-6"/><path fill="currentColor" fill-rule="evenodd" d="M24 37.625a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" clip-rule="evenodd"/></svg>',
			LeftExpand:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><rect width="28" height="36" x="6" y="6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" rx="2"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M42 6v36"/></svg>',
			RightExpand:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><rect width="28" height="36" x="14" y="6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" rx="2"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 6v36"/></svg>',
			OffScreen:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M33 6v9h9M15 6v9H6M15 42v-9H6M33 42v-9h8.9"/></svg>',
			FullScreen:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M33 6h9v9M42 33v9h-9M15 42H6v-9M6 15V6h9"/></svg>',
			GithubOne:
				'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 48 48"><path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M29.344 30.477c2.404-.5 4.585-1.366 6.28-2.638C38.52 25.668 40 22.314 40 19c0-2.324-.881-4.494-2.407-6.332-.85-1.024 1.636-8.667-.573-7.638-2.21 1.03-5.45 3.308-7.147 2.805A20.712 20.712 0 0 0 24 7c-1.8 0-3.532.223-5.147.634C16.505 8.232 14.259 6 12 5.03c-2.26-.97-1.026 6.934-1.697 7.765C8.84 14.605 8 16.73 8 19c0 3.314 1.79 6.668 4.686 8.84 1.93 1.446 4.348 2.368 7.054 2.822M19.74 30.662c-1.159 1.275-1.738 2.486-1.738 3.632v8.717M29.345 30.477c1.097 1.44 1.646 2.734 1.646 3.88v8.654M6 31.215c.899.11 1.566.524 2 1.24.652 1.075 3.074 5.063 5.825 5.063h4.177"/></svg>',
		},
		N5 = function () {
			var e = navigator.userAgent,
				t = navigator.platform,
				r = /gecko\/\d/i.test(e),
				o = /MSIE \d/.test(e),
				u = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
				c = /Edge\/(\d+)/.exec(e),
				f = o || u || c,
				d = f && (o ? document.documentMode || 6 : +(c || u)[1]),
				g = !c && /WebKit\//.test(e),
				T = g && /Qt\/\d+\.\d+/.test(e),
				A = !c && /Chrome\//.test(e),
				C = /Opera\//.test(e),
				M = /Apple Computer/.test(navigator.vendor),
				x = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
				S = /PhantomJS/.test(e),
				D = M && (/Mobile\/\w+/.test(e) || navigator.maxTouchPoints > 2),
				P = /Android/.test(e),
				I =
					D || P || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
				z = D || /Mac/.test(t),
				K = /\bCrOS\b/.test(e),
				w = /win/i.test(t),
				Z = C && e.match(/Version\/(\d*\.\d*)/);
			Z && (Z = Number(Z[1])), Z && Z >= 15 && ((C = !1), (g = !0));
			var L = z && (T || (C && (Z == null || Z < 12.11))),
				W = r || (f && d >= 9);
			function te(n) {
				return new RegExp('(^|\\s)' + n + '(?:$|\\s)\\s*');
			}
			var V = function (n, i) {
				var a = n.className,
					s = te(i).exec(a);
				if (s) {
					var l = a.slice(s.index + s[0].length);
					n.className = a.slice(0, s.index) + (l ? s[1] + l : '');
				}
			};
			function ae(n) {
				for (var i = n.childNodes.length; i > 0; --i)
					n.removeChild(n.firstChild);
				return n;
			}
			function X(n, i) {
				return ae(n).appendChild(i);
			}
			function G(n, i, a, s) {
				var l = document.createElement(n);
				if (
					(a && (l.className = a),
					s && (l.style.cssText = s),
					typeof i == 'string')
				)
					l.appendChild(document.createTextNode(i));
				else if (i) for (var h = 0; h < i.length; ++h) l.appendChild(i[h]);
				return l;
			}
			function H(n, i, a, s) {
				var l = G(n, i, a, s);
				return l.setAttribute('role', 'presentation'), l;
			}
			var J;
			document.createRange
				? (J = function (n, i, a, s) {
						var l = document.createRange();
						return l.setEnd(s || n, a), l.setStart(n, i), l;
				  })
				: (J = function (n, i, a) {
						var s = document.body.createTextRange();
						try {
							s.moveToElementText(n.parentNode);
						} catch {
							return s;
						}
						return (
							s.collapse(!0),
							s.moveEnd('character', a),
							s.moveStart('character', i),
							s
						);
				  });
			function Q(n, i) {
				if ((i.nodeType == 3 && (i = i.parentNode), n.contains))
					return n.contains(i);
				do if ((i.nodeType == 11 && (i = i.host), i == n)) return !0;
				while ((i = i.parentNode));
			}
			function se() {
				var n;
				try {
					n = document.activeElement;
				} catch {
					n = document.body || null;
				}
				for (; n && n.shadowRoot && n.shadowRoot.activeElement; )
					n = n.shadowRoot.activeElement;
				return n;
			}
			function Ae(n, i) {
				var a = n.className;
				te(i).test(a) || (n.className += (a ? ' ' : '') + i);
			}
			function _e(n, i) {
				for (var a = n.split(' '), s = 0; s < a.length; s++)
					a[s] && !te(a[s]).test(i) && (i += ' ' + a[s]);
				return i;
			}
			var Oe = function (n) {
				n.select();
			};
			D
				? (Oe = function (n) {
						(n.selectionStart = 0), (n.selectionEnd = n.value.length);
				  })
				: f &&
				  (Oe = function (n) {
						try {
							n.select();
						} catch {}
				  });
			function O(n) {
				var i = Array.prototype.slice.call(arguments, 1);
				return function () {
					return n.apply(null, i);
				};
			}
			function E(n, i, a) {
				i || (i = {});
				for (var s in n)
					n.hasOwnProperty(s) &&
						(a !== !1 || !i.hasOwnProperty(s)) &&
						(i[s] = n[s]);
				return i;
			}
			function b(n, i, a, s, l) {
				i == null && ((i = n.search(/[^\s\u00a0]/)), i == -1 && (i = n.length));
				for (var h = s || 0, p = l || 0; ; ) {
					var m = n.indexOf('	', h);
					if (m < 0 || m >= i) return p + (i - h);
					(p += m - h), (p += a - (p % a)), (h = m + 1);
				}
			}
			var Ce = function () {
				(this.id = null),
					(this.f = null),
					(this.time = 0),
					(this.handler = O(this.onTimeout, this));
			};
			(Ce.prototype.onTimeout = function (n) {
				(n.id = 0),
					n.time <= +new Date()
						? n.f()
						: setTimeout(n.handler, n.time - +new Date());
			}),
				(Ce.prototype.set = function (n, i) {
					this.f = i;
					var a = +new Date() + n;
					(!this.id || a < this.time) &&
						(clearTimeout(this.id),
						(this.id = setTimeout(this.handler, n)),
						(this.time = a));
				});
			function fe(n, i) {
				for (var a = 0; a < n.length; ++a) if (n[a] == i) return a;
				return -1;
			}
			var Ue = 50,
				Pe = {
					toString: function () {
						return 'CodeMirror.Pass';
					},
				},
				Ge = {
					scroll: !1,
				},
				Ve = {
					origin: '*mouse',
				},
				rt = {
					origin: '+move',
				};
			function Fe(n, i, a) {
				for (var s = 0, l = 0; ; ) {
					var h = n.indexOf('	', s);
					h == -1 && (h = n.length);
					var p = h - s;
					if (h == n.length || l + p >= i) return s + Math.min(p, i - l);
					if (((l += h - s), (l += a - (l % a)), (s = h + 1), l >= i)) return s;
				}
			}
			var Ze = [''];
			function qt(n) {
				for (; Ze.length <= n; ) Ze.push(De(Ze) + ' ');
				return Ze[n];
			}
			function De(n) {
				return n[n.length - 1];
			}
			function Gt(n, i) {
				for (var a = [], s = 0; s < n.length; s++) a[s] = i(n[s], s);
				return a;
			}
			function Xt(n, i, a) {
				for (var s = 0, l = a(i); s < n.length && a(n[s]) <= l; ) s++;
				n.splice(s, 0, i);
			}
			function Rt() {}
			function zt(n, i) {
				var a;
				return (
					Object.create
						? (a = Object.create(n))
						: ((Rt.prototype = n), (a = new Rt())),
					i && E(i, a),
					a
				);
			}
			var $t =
				/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
			function Ot(n) {
				return (
					/\w/.test(n) ||
					(n > '' && (n.toUpperCase() != n.toLowerCase() || $t.test(n)))
				);
			}
			function ie(n, i) {
				return i
					? i.source.indexOf('\\w') > -1 && Ot(n)
						? !0
						: i.test(n)
					: Ot(n);
			}
			function Je(n) {
				for (var i in n) if (n.hasOwnProperty(i) && n[i]) return !1;
				return !0;
			}
			var Pn =
				/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
			function en(n) {
				return n.charCodeAt(0) >= 768 && Pn.test(n);
			}
			function lt(n, i, a) {
				for (; (a < 0 ? i > 0 : i < n.length) && en(n.charAt(i)); ) i += a;
				return i;
			}
			function qe(n, i, a) {
				for (var s = i > a ? -1 : 1; ; ) {
					if (i == a) return i;
					var l = (i + a) / 2,
						h = s < 0 ? Math.ceil(l) : Math.floor(l);
					if (h == i) return n(h) ? i : a;
					n(h) ? (a = h) : (i = h + s);
				}
			}
			function et(n, i, a, s) {
				if (!n) return s(i, a, 'ltr', 0);
				for (var l = !1, h = 0; h < n.length; ++h) {
					var p = n[h];
					((p.from < a && p.to > i) || (i == a && p.to == i)) &&
						(s(
							Math.max(p.from, i),
							Math.min(p.to, a),
							p.level == 1 ? 'rtl' : 'ltr',
							h
						),
						(l = !0));
				}
				l || s(i, a, 'ltr');
			}
			var pt = null;
			function Y(n, i, a) {
				var s;
				pt = null;
				for (var l = 0; l < n.length; ++l) {
					var h = n[l];
					if (h.from < i && h.to > i) return l;
					h.to == i && (h.from != h.to && a == 'before' ? (s = l) : (pt = l)),
						h.from == i &&
							(h.from != h.to && a != 'before' ? (s = l) : (pt = l));
				}
				return s != null ? s : pt;
			}
			var pe = (function () {
				var n =
						'bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN',
					i =
						'nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111';
				function a(_) {
					return _ <= 247
						? n.charAt(_)
						: 1424 <= _ && _ <= 1524
						? 'R'
						: 1536 <= _ && _ <= 1785
						? i.charAt(_ - 1536)
						: 1774 <= _ && _ <= 2220
						? 'r'
						: 8192 <= _ && _ <= 8203
						? 'w'
						: _ == 8204
						? 'b'
						: 'L';
				}
				var s = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
					l = /[stwN]/,
					h = /[LRr]/,
					p = /[Lb1n]/,
					m = /[1n]/;
				function y(_, N, k) {
					(this.level = _), (this.from = N), (this.to = k);
				}
				return function (_, N) {
					var k = N == 'ltr' ? 'L' : 'R';
					if (_.length == 0 || (N == 'ltr' && !s.test(_))) return !1;
					for (var U = _.length, B = [], q = 0; q < U; ++q)
						B.push(a(_.charCodeAt(q)));
					for (var $ = 0, oe = k; $ < U; ++$) {
						var he = B[$];
						he == 'm' ? (B[$] = oe) : (oe = he);
					}
					for (var ge = 0, de = k; ge < U; ++ge) {
						var Te = B[ge];
						Te == '1' && de == 'r'
							? (B[ge] = 'n')
							: h.test(Te) && ((de = Te), Te == 'r' && (B[ge] = 'R'));
					}
					for (var xe = 1, be = B[0]; xe < U - 1; ++xe) {
						var He = B[xe];
						He == '+' && be == '1' && B[xe + 1] == '1'
							? (B[xe] = '1')
							: He == ',' &&
							  be == B[xe + 1] &&
							  (be == '1' || be == 'n') &&
							  (B[xe] = be),
							(be = He);
					}
					for (var st = 0; st < U; ++st) {
						var Ht = B[st];
						if (Ht == ',') B[st] = 'N';
						else if (Ht == '%') {
							var gt = void 0;
							for (gt = st + 1; gt < U && B[gt] == '%'; ++gt);
							for (
								var mn =
										(st && B[st - 1] == '!') || (gt < U && B[gt] == '1')
											? '1'
											: 'N',
									an = st;
								an < gt;
								++an
							)
								B[an] = mn;
							st = gt - 1;
						}
					}
					for (var At = 0, ln = k; At < U; ++At) {
						var Wt = B[At];
						ln == 'L' && Wt == '1' ? (B[At] = 'L') : h.test(Wt) && (ln = Wt);
					}
					for (var wt = 0; wt < U; ++wt)
						if (l.test(B[wt])) {
							var _t = void 0;
							for (_t = wt + 1; _t < U && l.test(B[_t]); ++_t);
							for (
								var mt = (wt ? B[wt - 1] : k) == 'L',
									un = (_t < U ? B[_t] : k) == 'L',
									k1 = mt == un ? (mt ? 'L' : 'R') : k,
									Jr = wt;
								Jr < _t;
								++Jr
							)
								B[Jr] = k1;
							wt = _t - 1;
						}
					for (var Vt = [], ur, Bt = 0; Bt < U; )
						if (p.test(B[Bt])) {
							var ac = Bt;
							for (++Bt; Bt < U && p.test(B[Bt]); ++Bt);
							Vt.push(new y(0, ac, Bt));
						} else {
							var kr = Bt,
								wi = Vt.length,
								Li = N == 'rtl' ? 1 : 0;
							for (++Bt; Bt < U && B[Bt] != 'L'; ++Bt);
							for (var nn = kr; nn < Bt; )
								if (m.test(B[nn])) {
									kr < nn && (Vt.splice(wi, 0, new y(1, kr, nn)), (wi += Li));
									var O1 = nn;
									for (++nn; nn < Bt && m.test(B[nn]); ++nn);
									Vt.splice(wi, 0, new y(2, O1, nn)), (wi += Li), (kr = nn);
								} else ++nn;
							kr < Bt && Vt.splice(wi, 0, new y(1, kr, Bt));
						}
					return (
						N == 'ltr' &&
							(Vt[0].level == 1 &&
								(ur = _.match(/^\s+/)) &&
								((Vt[0].from = ur[0].length),
								Vt.unshift(new y(0, 0, ur[0].length))),
							De(Vt).level == 1 &&
								(ur = _.match(/\s+$/)) &&
								((De(Vt).to -= ur[0].length),
								Vt.push(new y(0, U - ur[0].length, U)))),
						N == 'rtl' ? Vt.reverse() : Vt
					);
				};
			})();
			function Ne(n, i) {
				var a = n.order;
				return a == null && (a = n.order = pe(n.text, i)), a;
			}
			var Xe = [],
				Ee = function (n, i, a) {
					if (n.addEventListener) n.addEventListener(i, a, !1);
					else if (n.attachEvent) n.attachEvent('on' + i, a);
					else {
						var s = n._handlers || (n._handlers = {});
						s[i] = (s[i] || Xe).concat(a);
					}
				};
			function Kn(n, i) {
				return (n._handlers && n._handlers[i]) || Xe;
			}
			function j(n, i, a) {
				if (n.removeEventListener) n.removeEventListener(i, a, !1);
				else if (n.detachEvent) n.detachEvent('on' + i, a);
				else {
					var s = n._handlers,
						l = s && s[i];
					if (l) {
						var h = fe(l, a);
						h > -1 && (s[i] = l.slice(0, h).concat(l.slice(h + 1)));
					}
				}
			}
			function re(n, i) {
				var a = Kn(n, i);
				if (a.length)
					for (
						var s = Array.prototype.slice.call(arguments, 2), l = 0;
						l < a.length;
						++l
					)
						a[l].apply(null, s);
			}
			function me(n, i, a) {
				return (
					typeof i == 'string' &&
						(i = {
							type: i,
							preventDefault: function () {
								this.defaultPrevented = !0;
							},
						}),
					re(n, a || i.type, n, i),
					l1(i) || i.codemirrorIgnore
				);
			}
			function ze(n) {
				var i = n._handlers && n._handlers.cursorActivity;
				if (i)
					for (
						var a =
								n.curOp.cursorActivityHandlers ||
								(n.curOp.cursorActivityHandlers = []),
							s = 0;
						s < i.length;
						++s
					)
						fe(a, i[s]) == -1 && a.push(i[s]);
			}
			function ve(n, i) {
				return Kn(n, i).length > 0;
			}
			function ut(n) {
				(n.prototype.on = function (i, a) {
					Ee(this, i, a);
				}),
					(n.prototype.off = function (i, a) {
						j(this, i, a);
					});
			}
			function We(n) {
				n.preventDefault ? n.preventDefault() : (n.returnValue = !1);
			}
			function _r(n) {
				n.stopPropagation ? n.stopPropagation() : (n.cancelBubble = !0);
			}
			function l1(n) {
				return n.defaultPrevented != null
					? n.defaultPrevented
					: n.returnValue == !1;
			}
			function Sn(n) {
				We(n), _r(n);
			}
			function Ti(n) {
				return n.target || n.srcElement;
			}
			function Ei(n) {
				var i = n.which;
				return (
					i == null &&
						(n.button & 1
							? (i = 1)
							: n.button & 2
							? (i = 3)
							: n.button & 4 && (i = 2)),
					z && n.ctrlKey && i == 1 && (i = 3),
					i
				);
			}
			var zr = (function () {
					if (f && d < 9) return !1;
					var n = G('div');
					return 'draggable' in n || 'dragDrop' in n;
				})(),
				To;
			function Eo(n) {
				if (To == null) {
					var i = G('span', '​');
					X(n, G('span', [i, document.createTextNode('x')])),
						n.firstChild.offsetHeight != 0 &&
							(To = i.offsetWidth <= 1 && i.offsetHeight > 2 && !(f && d < 8));
				}
				var a = To
					? G('span', '​')
					: G(
							'span',
							' ',
							null,
							'display: inline-block; width: 1px; margin-right: -1px'
					  );
				return a.setAttribute('cm-text', ''), a;
			}
			var Wr;
			function R7(n) {
				if (Wr != null) return Wr;
				var i = X(n, document.createTextNode('AخA')),
					a = J(i, 0, 1).getBoundingClientRect(),
					s = J(i, 1, 2).getBoundingClientRect();
				return (
					ae(n), !a || a.left == a.right ? !1 : (Wr = s.right - a.right < 3)
				);
			}
			var lu =
					`

b`.split(/\n/).length != 3
						? function (n) {
								for (var i = 0, a = [], s = n.length; i <= s; ) {
									var l = n.indexOf(
										`
`,
										i
									);
									l == -1 && (l = n.length);
									var h = n.slice(i, n.charAt(l - 1) == '\r' ? l - 1 : l),
										p = h.indexOf('\r');
									p != -1
										? (a.push(h.slice(0, p)), (i += p + 1))
										: (a.push(h), (i = l + 1));
								}
								return a;
						  }
						: function (n) {
								return n.split(/\r\n?|\n/);
						  },
				D7 = window.getSelection
					? function (n) {
							try {
								return n.selectionStart != n.selectionEnd;
							} catch {
								return !1;
							}
					  }
					: function (n) {
							var i;
							try {
								i = n.ownerDocument.selection.createRange();
							} catch {}
							return !i || i.parentElement() != n
								? !1
								: i.compareEndPoints('StartToEnd', i) != 0;
					  },
				P7 = (function () {
					var n = G('div');
					return 'oncopy' in n
						? !0
						: (n.setAttribute('oncopy', 'return;'),
						  typeof n.oncopy == 'function');
				})(),
				uu = null;
			function F7(n) {
				if (uu != null) return uu;
				var i = X(n, G('span', 'x')),
					a = i.getBoundingClientRect(),
					s = J(i, 0, 1).getBoundingClientRect();
				return (uu = Math.abs(a.left - s.left) > 1);
			}
			var cu = {},
				u1 = {};
			function H7(n, i) {
				arguments.length > 2 &&
					(i.dependencies = Array.prototype.slice.call(arguments, 2)),
					(cu[n] = i);
			}
			function B7(n, i) {
				u1[n] = i;
			}
			function Zs(n) {
				if (typeof n == 'string' && u1.hasOwnProperty(n)) n = u1[n];
				else if (n && typeof n.name == 'string' && u1.hasOwnProperty(n.name)) {
					var i = u1[n.name];
					typeof i == 'string' &&
						(i = {
							name: i,
						}),
						(n = zt(i, n)),
						(n.name = i.name);
				} else {
					if (typeof n == 'string' && /^[\w\-]+\/[\w\-]+\+xml$/.test(n))
						return Zs('application/xml');
					if (typeof n == 'string' && /^[\w\-]+\/[\w\-]+\+json$/.test(n))
						return Zs('application/json');
				}
				return typeof n == 'string'
					? {
							name: n,
					  }
					: n || {
							name: 'null',
					  };
			}
			function fu(n, i) {
				i = Zs(i);
				var a = cu[i.name];
				if (!a) return fu(n, 'text/plain');
				var s = a(n, i);
				if (c1.hasOwnProperty(i.name)) {
					var l = c1[i.name];
					for (var h in l)
						l.hasOwnProperty(h) &&
							(s.hasOwnProperty(h) && (s['_' + h] = s[h]), (s[h] = l[h]));
				}
				if (
					((s.name = i.name),
					i.helperType && (s.helperType = i.helperType),
					i.modeProps)
				)
					for (var p in i.modeProps) s[p] = i.modeProps[p];
				return s;
			}
			var c1 = {};
			function U7(n, i) {
				var a = c1.hasOwnProperty(n) ? c1[n] : (c1[n] = {});
				E(i, a);
			}
			function vi(n, i) {
				if (i === !0) return i;
				if (n.copyState) return n.copyState(i);
				var a = {};
				for (var s in i) {
					var l = i[s];
					l instanceof Array && (l = l.concat([])), (a[s] = l);
				}
				return a;
			}
			function hu(n, i) {
				for (
					var a;
					n.innerMode && ((a = n.innerMode(i)), !(!a || a.mode == n));

				)
					(i = a.state), (n = a.mode);
				return (
					a || {
						mode: n,
						state: i,
					}
				);
			}
			function gp(n, i, a) {
				return n.startState ? n.startState(i, a) : !0;
			}
			var yt = function (n, i, a) {
				(this.pos = this.start = 0),
					(this.string = n),
					(this.tabSize = i || 8),
					(this.lastColumnPos = this.lastColumnValue = 0),
					(this.lineStart = 0),
					(this.lineOracle = a);
			};
			(yt.prototype.eol = function () {
				return this.pos >= this.string.length;
			}),
				(yt.prototype.sol = function () {
					return this.pos == this.lineStart;
				}),
				(yt.prototype.peek = function () {
					return this.string.charAt(this.pos) || void 0;
				}),
				(yt.prototype.next = function () {
					if (this.pos < this.string.length)
						return this.string.charAt(this.pos++);
				}),
				(yt.prototype.eat = function (n) {
					var i = this.string.charAt(this.pos),
						a;
					if (
						(typeof n == 'string'
							? (a = i == n)
							: (a = i && (n.test ? n.test(i) : n(i))),
						a)
					)
						return ++this.pos, i;
				}),
				(yt.prototype.eatWhile = function (n) {
					for (var i = this.pos; this.eat(n); );
					return this.pos > i;
				}),
				(yt.prototype.eatSpace = function () {
					for (
						var n = this.pos;
						/[\s\u00a0]/.test(this.string.charAt(this.pos));

					)
						++this.pos;
					return this.pos > n;
				}),
				(yt.prototype.skipToEnd = function () {
					this.pos = this.string.length;
				}),
				(yt.prototype.skipTo = function (n) {
					var i = this.string.indexOf(n, this.pos);
					if (i > -1) return (this.pos = i), !0;
				}),
				(yt.prototype.backUp = function (n) {
					this.pos -= n;
				}),
				(yt.prototype.column = function () {
					return (
						this.lastColumnPos < this.start &&
							((this.lastColumnValue = b(
								this.string,
								this.start,
								this.tabSize,
								this.lastColumnPos,
								this.lastColumnValue
							)),
							(this.lastColumnPos = this.start)),
						this.lastColumnValue -
							(this.lineStart
								? b(this.string, this.lineStart, this.tabSize)
								: 0)
					);
				}),
				(yt.prototype.indentation = function () {
					return (
						b(this.string, null, this.tabSize) -
						(this.lineStart ? b(this.string, this.lineStart, this.tabSize) : 0)
					);
				}),
				(yt.prototype.match = function (n, i, a) {
					if (typeof n == 'string') {
						var s = function (p) {
								return a ? p.toLowerCase() : p;
							},
							l = this.string.substr(this.pos, n.length);
						if (s(l) == s(n)) return i !== !1 && (this.pos += n.length), !0;
					} else {
						var h = this.string.slice(this.pos).match(n);
						return h && h.index > 0
							? null
							: (h && i !== !1 && (this.pos += h[0].length), h);
					}
				}),
				(yt.prototype.current = function () {
					return this.string.slice(this.start, this.pos);
				}),
				(yt.prototype.hideFirstChars = function (n, i) {
					this.lineStart += n;
					try {
						return i();
					} finally {
						this.lineStart -= n;
					}
				}),
				(yt.prototype.lookAhead = function (n) {
					var i = this.lineOracle;
					return i && i.lookAhead(n);
				}),
				(yt.prototype.baseToken = function () {
					var n = this.lineOracle;
					return n && n.baseToken(this.pos);
				});
			function Se(n, i) {
				if (((i -= n.first), i < 0 || i >= n.size))
					throw new Error(
						'There is no line ' + (i + n.first) + ' in the document.'
					);
				for (var a = n; !a.lines; )
					for (var s = 0; ; ++s) {
						var l = a.children[s],
							h = l.chunkSize();
						if (i < h) {
							a = l;
							break;
						}
						i -= h;
					}
				return a.lines[i];
			}
			function yi(n, i, a) {
				var s = [],
					l = i.line;
				return (
					n.iter(i.line, a.line + 1, function (h) {
						var p = h.text;
						l == a.line && (p = p.slice(0, a.ch)),
							l == i.line && (p = p.slice(i.ch)),
							s.push(p),
							++l;
					}),
					s
				);
			}
			function du(n, i, a) {
				var s = [];
				return (
					n.iter(i, a, function (l) {
						s.push(l.text);
					}),
					s
				);
			}
			function or(n, i) {
				var a = i - n.height;
				if (a) for (var s = n; s; s = s.parent) s.height += a;
			}
			function tt(n) {
				if (n.parent == null) return null;
				for (
					var i = n.parent, a = fe(i.lines, n), s = i.parent;
					s;
					i = s, s = s.parent
				)
					for (var l = 0; s.children[l] != i; ++l)
						a += s.children[l].chunkSize();
				return a + i.first;
			}
			function Ai(n, i) {
				var a = n.first;
				e: do {
					for (var s = 0; s < n.children.length; ++s) {
						var l = n.children[s],
							h = l.height;
						if (i < h) {
							n = l;
							continue e;
						}
						(i -= h), (a += l.chunkSize());
					}
					return a;
				} while (!n.lines);
				for (var p = 0; p < n.lines.length; ++p) {
					var m = n.lines[p],
						y = m.height;
					if (i < y) break;
					i -= y;
				}
				return a + p;
			}
			function vo(n, i) {
				return i >= n.first && i < n.first + n.size;
			}
			function pu(n, i) {
				return String(n.lineNumberFormatter(i + n.firstLineNumber));
			}
			function ne(n, i, a) {
				if ((a === void 0 && (a = null), !(this instanceof ne)))
					return new ne(n, i, a);
				(this.line = n), (this.ch = i), (this.sticky = a);
			}
			function Le(n, i) {
				return n.line - i.line || n.ch - i.ch;
			}
			function gu(n, i) {
				return n.sticky == i.sticky && Le(n, i) == 0;
			}
			function mu(n) {
				return ne(n.line, n.ch);
			}
			function Js(n, i) {
				return Le(n, i) < 0 ? i : n;
			}
			function $s(n, i) {
				return Le(n, i) < 0 ? n : i;
			}
			function mp(n, i) {
				return Math.max(n.first, Math.min(i, n.first + n.size - 1));
			}
			function Ie(n, i) {
				if (i.line < n.first) return ne(n.first, 0);
				var a = n.first + n.size - 1;
				return i.line > a
					? ne(a, Se(n, a).text.length)
					: G7(i, Se(n, i.line).text.length);
			}
			function G7(n, i) {
				var a = n.ch;
				return a == null || a > i ? ne(n.line, i) : a < 0 ? ne(n.line, 0) : n;
			}
			function Tp(n, i) {
				for (var a = [], s = 0; s < i.length; s++) a[s] = Ie(n, i[s]);
				return a;
			}
			var ea = function (n, i) {
					(this.state = n), (this.lookAhead = i);
				},
				sr = function (n, i, a, s) {
					(this.state = i),
						(this.doc = n),
						(this.line = a),
						(this.maxLookAhead = s || 0),
						(this.baseTokens = null),
						(this.baseTokenPos = 1);
				};
			(sr.prototype.lookAhead = function (n) {
				var i = this.doc.getLine(this.line + n);
				return i != null && n > this.maxLookAhead && (this.maxLookAhead = n), i;
			}),
				(sr.prototype.baseToken = function (n) {
					if (!this.baseTokens) return null;
					for (; this.baseTokens[this.baseTokenPos] <= n; )
						this.baseTokenPos += 2;
					var i = this.baseTokens[this.baseTokenPos + 1];
					return {
						type: i && i.replace(/( |^)overlay .*/, ''),
						size: this.baseTokens[this.baseTokenPos] - n,
					};
				}),
				(sr.prototype.nextLine = function () {
					this.line++, this.maxLookAhead > 0 && this.maxLookAhead--;
				}),
				(sr.fromSaved = function (n, i, a) {
					return i instanceof ea
						? new sr(n, vi(n.mode, i.state), a, i.lookAhead)
						: new sr(n, vi(n.mode, i), a);
				}),
				(sr.prototype.save = function (n) {
					var i = n !== !1 ? vi(this.doc.mode, this.state) : this.state;
					return this.maxLookAhead > 0 ? new ea(i, this.maxLookAhead) : i;
				});
			function Ep(n, i, a, s) {
				var l = [n.state.modeGen],
					h = {};
				Sp(
					n,
					i.text,
					n.doc.mode,
					a,
					function (_, N) {
						return l.push(_, N);
					},
					h,
					s
				);
				for (
					var p = a.state,
						m = function (_) {
							a.baseTokens = l;
							var N = n.state.overlays[_],
								k = 1,
								U = 0;
							(a.state = !0),
								Sp(
									n,
									i.text,
									N.mode,
									a,
									function (B, q) {
										for (var $ = k; U < B; ) {
											var oe = l[k];
											oe > B && l.splice(k, 1, B, l[k + 1], oe),
												(k += 2),
												(U = Math.min(B, oe));
										}
										if (q)
											if (N.opaque)
												l.splice($, k - $, B, 'overlay ' + q), (k = $ + 2);
											else
												for (; $ < k; $ += 2) {
													var he = l[$ + 1];
													l[$ + 1] = (he ? he + ' ' : '') + 'overlay ' + q;
												}
									},
									h
								),
								(a.state = p),
								(a.baseTokens = null),
								(a.baseTokenPos = 1);
						},
						y = 0;
					y < n.state.overlays.length;
					++y
				)
					m(y);
				return {
					styles: l,
					classes: h.bgClass || h.textClass ? h : null,
				};
			}
			function vp(n, i, a) {
				if (!i.styles || i.styles[0] != n.state.modeGen) {
					var s = yo(n, tt(i)),
						l =
							i.text.length > n.options.maxHighlightLength &&
							vi(n.doc.mode, s.state),
						h = Ep(n, i, s);
					l && (s.state = l),
						(i.stateAfter = s.save(!l)),
						(i.styles = h.styles),
						h.classes
							? (i.styleClasses = h.classes)
							: i.styleClasses && (i.styleClasses = null),
						a === n.doc.highlightFrontier &&
							(n.doc.modeFrontier = Math.max(
								n.doc.modeFrontier,
								++n.doc.highlightFrontier
							));
				}
				return i.styles;
			}
			function yo(n, i, a) {
				var s = n.doc,
					l = n.display;
				if (!s.mode.startState) return new sr(s, !0, i);
				var h = z7(n, i, a),
					p = h > s.first && Se(s, h - 1).stateAfter,
					m = p ? sr.fromSaved(s, p, h) : new sr(s, gp(s.mode), h);
				return (
					s.iter(h, i, function (y) {
						Tu(n, y.text, m);
						var _ = m.line;
						(y.stateAfter =
							_ == i - 1 || _ % 5 == 0 || (_ >= l.viewFrom && _ < l.viewTo)
								? m.save()
								: null),
							m.nextLine();
					}),
					a && (s.modeFrontier = m.line),
					m
				);
			}
			function Tu(n, i, a, s) {
				var l = n.doc.mode,
					h = new yt(i, n.options.tabSize, a);
				for (h.start = h.pos = s || 0, i == '' && yp(l, a.state); !h.eol(); )
					Eu(l, h, a.state), (h.start = h.pos);
			}
			function yp(n, i) {
				if (n.blankLine) return n.blankLine(i);
				if (n.innerMode) {
					var a = hu(n, i);
					if (a.mode.blankLine) return a.mode.blankLine(a.state);
				}
			}
			function Eu(n, i, a, s) {
				for (var l = 0; l < 10; l++) {
					s && (s[0] = hu(n, a).mode);
					var h = n.token(i, a);
					if (i.pos > i.start) return h;
				}
				throw new Error('Mode ' + n.name + ' failed to advance stream.');
			}
			var Ap = function (n, i, a) {
				(this.start = n.start),
					(this.end = n.pos),
					(this.string = n.current()),
					(this.type = i || null),
					(this.state = a);
			};
			function _p(n, i, a, s) {
				var l = n.doc,
					h = l.mode,
					p;
				i = Ie(l, i);
				var m = Se(l, i.line),
					y = yo(n, i.line, a),
					_ = new yt(m.text, n.options.tabSize, y),
					N;
				for (s && (N = []); (s || _.pos < i.ch) && !_.eol(); )
					(_.start = _.pos),
						(p = Eu(h, _, y.state)),
						s && N.push(new Ap(_, p, vi(l.mode, y.state)));
				return s ? N : new Ap(_, p, y.state);
			}
			function Cp(n, i) {
				if (n)
					for (;;) {
						var a = n.match(/(?:^|\s+)line-(background-)?(\S+)/);
						if (!a) break;
						n = n.slice(0, a.index) + n.slice(a.index + a[0].length);
						var s = a[1] ? 'bgClass' : 'textClass';
						i[s] == null
							? (i[s] = a[2])
							: new RegExp('(?:^|\\s)' + a[2] + '(?:$|\\s)').test(i[s]) ||
							  (i[s] += ' ' + a[2]);
					}
				return n;
			}
			function Sp(n, i, a, s, l, h, p) {
				var m = a.flattenSpans;
				m == null && (m = n.options.flattenSpans);
				var y = 0,
					_ = null,
					N = new yt(i, n.options.tabSize, s),
					k,
					U = n.options.addModeClass && [null];
				for (i == '' && Cp(yp(a, s.state), h); !N.eol(); ) {
					if (
						(N.pos > n.options.maxHighlightLength
							? ((m = !1),
							  p && Tu(n, i, s, N.pos),
							  (N.pos = i.length),
							  (k = null))
							: (k = Cp(Eu(a, N, s.state, U), h)),
						U)
					) {
						var B = U[0].name;
						B && (k = 'm-' + (k ? B + ' ' + k : B));
					}
					if (!m || _ != k) {
						for (; y < N.start; ) (y = Math.min(N.start, y + 5e3)), l(y, _);
						_ = k;
					}
					N.start = N.pos;
				}
				for (; y < N.pos; ) {
					var q = Math.min(N.pos, y + 5e3);
					l(q, _), (y = q);
				}
			}
			function z7(n, i, a) {
				for (
					var s,
						l,
						h = n.doc,
						p = a ? -1 : i - (n.doc.mode.innerMode ? 1e3 : 100),
						m = i;
					m > p;
					--m
				) {
					if (m <= h.first) return h.first;
					var y = Se(h, m - 1),
						_ = y.stateAfter;
					if (
						_ &&
						(!a || m + (_ instanceof ea ? _.lookAhead : 0) <= h.modeFrontier)
					)
						return m;
					var N = b(y.text, null, n.options.tabSize);
					(l == null || s > N) && ((l = m - 1), (s = N));
				}
				return l;
			}
			function W7(n, i) {
				if (
					((n.modeFrontier = Math.min(n.modeFrontier, i)),
					!(n.highlightFrontier < i - 10))
				) {
					for (var a = n.first, s = i - 1; s > a; s--) {
						var l = Se(n, s).stateAfter;
						if (l && (!(l instanceof ea) || s + l.lookAhead < i)) {
							a = s + 1;
							break;
						}
					}
					n.highlightFrontier = Math.min(n.highlightFrontier, a);
				}
			}
			var bp = !1,
				Cr = !1;
			function K7() {
				bp = !0;
			}
			function j7() {
				Cr = !0;
			}
			function ta(n, i, a) {
				(this.marker = n), (this.from = i), (this.to = a);
			}
			function Ao(n, i) {
				if (n)
					for (var a = 0; a < n.length; ++a) {
						var s = n[a];
						if (s.marker == i) return s;
					}
			}
			function Y7(n, i) {
				for (var a, s = 0; s < n.length; ++s)
					n[s] != i && (a || (a = [])).push(n[s]);
				return a;
			}
			function q7(n, i, a) {
				var s =
					a &&
					window.WeakSet &&
					(a.markedSpans || (a.markedSpans = new WeakSet()));
				s && n.markedSpans && s.has(n.markedSpans)
					? n.markedSpans.push(i)
					: ((n.markedSpans = n.markedSpans ? n.markedSpans.concat([i]) : [i]),
					  s && s.add(n.markedSpans)),
					i.marker.attachLine(n);
			}
			function X7(n, i, a) {
				var s;
				if (n)
					for (var l = 0; l < n.length; ++l) {
						var h = n[l],
							p = h.marker,
							m =
								h.from == null || (p.inclusiveLeft ? h.from <= i : h.from < i);
						if (
							m ||
							(h.from == i &&
								p.type == 'bookmark' &&
								(!a || !h.marker.insertLeft))
						) {
							var y = h.to == null || (p.inclusiveRight ? h.to >= i : h.to > i);
							(s || (s = [])).push(new ta(p, h.from, y ? null : h.to));
						}
					}
				return s;
			}
			function Q7(n, i, a) {
				var s;
				if (n)
					for (var l = 0; l < n.length; ++l) {
						var h = n[l],
							p = h.marker,
							m = h.to == null || (p.inclusiveRight ? h.to >= i : h.to > i);
						if (
							m ||
							(h.from == i &&
								p.type == 'bookmark' &&
								(!a || h.marker.insertLeft))
						) {
							var y =
								h.from == null || (p.inclusiveLeft ? h.from <= i : h.from < i);
							(s || (s = [])).push(
								new ta(p, y ? null : h.from - i, h.to == null ? null : h.to - i)
							);
						}
					}
				return s;
			}
			function vu(n, i) {
				if (i.full) return null;
				var a = vo(n, i.from.line) && Se(n, i.from.line).markedSpans,
					s = vo(n, i.to.line) && Se(n, i.to.line).markedSpans;
				if (!a && !s) return null;
				var l = i.from.ch,
					h = i.to.ch,
					p = Le(i.from, i.to) == 0,
					m = X7(a, l, p),
					y = Q7(s, h, p),
					_ = i.text.length == 1,
					N = De(i.text).length + (_ ? l : 0);
				if (m)
					for (var k = 0; k < m.length; ++k) {
						var U = m[k];
						if (U.to == null) {
							var B = Ao(y, U.marker);
							B ? _ && (U.to = B.to == null ? null : B.to + N) : (U.to = l);
						}
					}
				if (y)
					for (var q = 0; q < y.length; ++q) {
						var $ = y[q];
						if (($.to != null && ($.to += N), $.from == null)) {
							var oe = Ao(m, $.marker);
							oe || (($.from = N), _ && (m || (m = [])).push($));
						} else ($.from += N), _ && (m || (m = [])).push($);
					}
				m && (m = Np(m)), y && y != m && (y = Np(y));
				var he = [m];
				if (!_) {
					var ge = i.text.length - 2,
						de;
					if (ge > 0 && m)
						for (var Te = 0; Te < m.length; ++Te)
							m[Te].to == null &&
								(de || (de = [])).push(new ta(m[Te].marker, null, null));
					for (var xe = 0; xe < ge; ++xe) he.push(de);
					he.push(y);
				}
				return he;
			}
			function Np(n) {
				for (var i = 0; i < n.length; ++i) {
					var a = n[i];
					a.from != null &&
						a.from == a.to &&
						a.marker.clearWhenEmpty !== !1 &&
						n.splice(i--, 1);
				}
				return n.length ? n : null;
			}
			function V7(n, i, a) {
				var s = null;
				if (
					(n.iter(i.line, a.line + 1, function (B) {
						if (B.markedSpans)
							for (var q = 0; q < B.markedSpans.length; ++q) {
								var $ = B.markedSpans[q].marker;
								$.readOnly && (!s || fe(s, $) == -1) && (s || (s = [])).push($);
							}
					}),
					!s)
				)
					return null;
				for (
					var l = [
							{
								from: i,
								to: a,
							},
						],
						h = 0;
					h < s.length;
					++h
				)
					for (var p = s[h], m = p.find(0), y = 0; y < l.length; ++y) {
						var _ = l[y];
						if (!(Le(_.to, m.from) < 0 || Le(_.from, m.to) > 0)) {
							var N = [y, 1],
								k = Le(_.from, m.from),
								U = Le(_.to, m.to);
							(k < 0 || (!p.inclusiveLeft && !k)) &&
								N.push({
									from: _.from,
									to: m.from,
								}),
								(U > 0 || (!p.inclusiveRight && !U)) &&
									N.push({
										from: m.to,
										to: _.to,
									}),
								l.splice.apply(l, N),
								(y += N.length - 3);
						}
					}
				return l;
			}
			function xp(n) {
				var i = n.markedSpans;
				if (i) {
					for (var a = 0; a < i.length; ++a) i[a].marker.detachLine(n);
					n.markedSpans = null;
				}
			}
			function kp(n, i) {
				if (i) {
					for (var a = 0; a < i.length; ++a) i[a].marker.attachLine(n);
					n.markedSpans = i;
				}
			}
			function na(n) {
				return n.inclusiveLeft ? -1 : 0;
			}
			function ra(n) {
				return n.inclusiveRight ? 1 : 0;
			}
			function yu(n, i) {
				var a = n.lines.length - i.lines.length;
				if (a != 0) return a;
				var s = n.find(),
					l = i.find(),
					h = Le(s.from, l.from) || na(n) - na(i);
				if (h) return -h;
				var p = Le(s.to, l.to) || ra(n) - ra(i);
				return p || i.id - n.id;
			}
			function Op(n, i) {
				var a = Cr && n.markedSpans,
					s;
				if (a)
					for (var l = void 0, h = 0; h < a.length; ++h)
						(l = a[h]),
							l.marker.collapsed &&
								(i ? l.from : l.to) == null &&
								(!s || yu(s, l.marker) < 0) &&
								(s = l.marker);
				return s;
			}
			function wp(n) {
				return Op(n, !0);
			}
			function ia(n) {
				return Op(n, !1);
			}
			function Z7(n, i) {
				var a = Cr && n.markedSpans,
					s;
				if (a)
					for (var l = 0; l < a.length; ++l) {
						var h = a[l];
						h.marker.collapsed &&
							(h.from == null || h.from < i) &&
							(h.to == null || h.to > i) &&
							(!s || yu(s, h.marker) < 0) &&
							(s = h.marker);
					}
				return s;
			}
			function Lp(n, i, a, s, l) {
				var h = Se(n, i),
					p = Cr && h.markedSpans;
				if (p)
					for (var m = 0; m < p.length; ++m) {
						var y = p[m];
						if (y.marker.collapsed) {
							var _ = y.marker.find(0),
								N = Le(_.from, a) || na(y.marker) - na(l),
								k = Le(_.to, s) || ra(y.marker) - ra(l);
							if (
								!((N >= 0 && k <= 0) || (N <= 0 && k >= 0)) &&
								((N <= 0 &&
									(y.marker.inclusiveRight && l.inclusiveLeft
										? Le(_.to, a) >= 0
										: Le(_.to, a) > 0)) ||
									(N >= 0 &&
										(y.marker.inclusiveRight && l.inclusiveLeft
											? Le(_.from, s) <= 0
											: Le(_.from, s) < 0)))
							)
								return !0;
						}
					}
			}
			function jn(n) {
				for (var i; (i = wp(n)); ) n = i.find(-1, !0).line;
				return n;
			}
			function J7(n) {
				for (var i; (i = ia(n)); ) n = i.find(1, !0).line;
				return n;
			}
			function $7(n) {
				for (var i, a; (i = ia(n)); )
					(n = i.find(1, !0).line), (a || (a = [])).push(n);
				return a;
			}
			function Au(n, i) {
				var a = Se(n, i),
					s = jn(a);
				return a == s ? i : tt(s);
			}
			function Ip(n, i) {
				if (i > n.lastLine()) return i;
				var a = Se(n, i),
					s;
				if (!Kr(n, a)) return i;
				for (; (s = ia(a)); ) a = s.find(1, !0).line;
				return tt(a) + 1;
			}
			function Kr(n, i) {
				var a = Cr && i.markedSpans;
				if (a) {
					for (var s = void 0, l = 0; l < a.length; ++l)
						if (((s = a[l]), !!s.marker.collapsed)) {
							if (s.from == null) return !0;
							if (
								!s.marker.widgetNode &&
								s.from == 0 &&
								s.marker.inclusiveLeft &&
								_u(n, i, s)
							)
								return !0;
						}
				}
			}
			function _u(n, i, a) {
				if (a.to == null) {
					var s = a.marker.find(1, !0);
					return _u(n, s.line, Ao(s.line.markedSpans, a.marker));
				}
				if (a.marker.inclusiveRight && a.to == i.text.length) return !0;
				for (var l = void 0, h = 0; h < i.markedSpans.length; ++h)
					if (
						((l = i.markedSpans[h]),
						l.marker.collapsed &&
							!l.marker.widgetNode &&
							l.from == a.to &&
							(l.to == null || l.to != a.from) &&
							(l.marker.inclusiveLeft || a.marker.inclusiveRight) &&
							_u(n, i, l))
					)
						return !0;
			}
			function Sr(n) {
				n = jn(n);
				for (var i = 0, a = n.parent, s = 0; s < a.lines.length; ++s) {
					var l = a.lines[s];
					if (l == n) break;
					i += l.height;
				}
				for (var h = a.parent; h; a = h, h = a.parent)
					for (var p = 0; p < h.children.length; ++p) {
						var m = h.children[p];
						if (m == a) break;
						i += m.height;
					}
				return i;
			}
			function oa(n) {
				if (n.height == 0) return 0;
				for (var i = n.text.length, a, s = n; (a = wp(s)); ) {
					var l = a.find(0, !0);
					(s = l.from.line), (i += l.from.ch - l.to.ch);
				}
				for (s = n; (a = ia(s)); ) {
					var h = a.find(0, !0);
					(i -= s.text.length - h.from.ch),
						(s = h.to.line),
						(i += s.text.length - h.to.ch);
				}
				return i;
			}
			function Cu(n) {
				var i = n.display,
					a = n.doc;
				(i.maxLine = Se(a, a.first)),
					(i.maxLineLength = oa(i.maxLine)),
					(i.maxLineChanged = !0),
					a.iter(function (s) {
						var l = oa(s);
						l > i.maxLineLength && ((i.maxLineLength = l), (i.maxLine = s));
					});
			}
			var f1 = function (n, i, a) {
				(this.text = n), kp(this, i), (this.height = a ? a(this) : 1);
			};
			(f1.prototype.lineNo = function () {
				return tt(this);
			}),
				ut(f1);
			function ey(n, i, a, s) {
				(n.text = i),
					n.stateAfter && (n.stateAfter = null),
					n.styles && (n.styles = null),
					n.order != null && (n.order = null),
					xp(n),
					kp(n, a);
				var l = s ? s(n) : 1;
				l != n.height && or(n, l);
			}
			function ty(n) {
				(n.parent = null), xp(n);
			}
			var ny = {},
				ry = {};
			function Mp(n, i) {
				if (!n || /^\s*$/.test(n)) return null;
				var a = i.addModeClass ? ry : ny;
				return a[n] || (a[n] = n.replace(/\S+/g, 'cm-$&'));
			}
			function Rp(n, i) {
				var a = H('span', null, null, g ? 'padding-right: .1px' : null),
					s = {
						pre: H('pre', [a], 'CodeMirror-line'),
						content: a,
						col: 0,
						pos: 0,
						cm: n,
						trailingSpace: !1,
						splitSpaces: n.getOption('lineWrapping'),
					};
				i.measure = {};
				for (var l = 0; l <= (i.rest ? i.rest.length : 0); l++) {
					var h = l ? i.rest[l - 1] : i.line,
						p = void 0;
					(s.pos = 0),
						(s.addToken = oy),
						R7(n.display.measure) &&
							(p = Ne(h, n.doc.direction)) &&
							(s.addToken = ay(s.addToken, p)),
						(s.map = []);
					var m = i != n.display.externalMeasured && tt(h);
					ly(h, s, vp(n, h, m)),
						h.styleClasses &&
							(h.styleClasses.bgClass &&
								(s.bgClass = _e(h.styleClasses.bgClass, s.bgClass || '')),
							h.styleClasses.textClass &&
								(s.textClass = _e(
									h.styleClasses.textClass,
									s.textClass || ''
								))),
						s.map.length == 0 &&
							s.map.push(0, 0, s.content.appendChild(Eo(n.display.measure))),
						l == 0
							? ((i.measure.map = s.map), (i.measure.cache = {}))
							: ((i.measure.maps || (i.measure.maps = [])).push(s.map),
							  (i.measure.caches || (i.measure.caches = [])).push({}));
				}
				if (g) {
					var y = s.content.lastChild;
					(/\bcm-tab\b/.test(y.className) ||
						(y.querySelector && y.querySelector('.cm-tab'))) &&
						(s.content.className = 'cm-tab-wrap-hack');
				}
				return (
					re(n, 'renderLine', n, i.line, s.pre),
					s.pre.className &&
						(s.textClass = _e(s.pre.className, s.textClass || '')),
					s
				);
			}
			function iy(n) {
				var i = G('span', '•', 'cm-invalidchar');
				return (
					(i.title = '\\u' + n.charCodeAt(0).toString(16)),
					i.setAttribute('aria-label', i.title),
					i
				);
			}
			function oy(n, i, a, s, l, h, p) {
				if (i) {
					var m = n.splitSpaces ? sy(i, n.trailingSpace) : i,
						y = n.cm.state.specialChars,
						_ = !1,
						N;
					if (!y.test(i))
						(n.col += i.length),
							(N = document.createTextNode(m)),
							n.map.push(n.pos, n.pos + i.length, N),
							f && d < 9 && (_ = !0),
							(n.pos += i.length);
					else {
						N = document.createDocumentFragment();
						for (var k = 0; ; ) {
							y.lastIndex = k;
							var U = y.exec(i),
								B = U ? U.index - k : i.length - k;
							if (B) {
								var q = document.createTextNode(m.slice(k, k + B));
								f && d < 9 ? N.appendChild(G('span', [q])) : N.appendChild(q),
									n.map.push(n.pos, n.pos + B, q),
									(n.col += B),
									(n.pos += B);
							}
							if (!U) break;
							k += B + 1;
							var $ = void 0;
							if (U[0] == '	') {
								var oe = n.cm.options.tabSize,
									he = oe - (n.col % oe);
								($ = N.appendChild(G('span', qt(he), 'cm-tab'))),
									$.setAttribute('role', 'presentation'),
									$.setAttribute('cm-text', '	'),
									(n.col += he);
							} else
								U[0] == '\r' ||
								U[0] ==
									`
`
									? (($ = N.appendChild(
											G('span', U[0] == '\r' ? '␍' : '␤', 'cm-invalidchar')
									  )),
									  $.setAttribute('cm-text', U[0]),
									  (n.col += 1))
									: (($ = n.cm.options.specialCharPlaceholder(U[0])),
									  $.setAttribute('cm-text', U[0]),
									  f && d < 9
											? N.appendChild(G('span', [$]))
											: N.appendChild($),
									  (n.col += 1));
							n.map.push(n.pos, n.pos + 1, $), n.pos++;
						}
					}
					if (
						((n.trailingSpace = m.charCodeAt(i.length - 1) == 32),
						a || s || l || _ || h || p)
					) {
						var ge = a || '';
						s && (ge += s), l && (ge += l);
						var de = G('span', [N], ge, h);
						if (p)
							for (var Te in p)
								p.hasOwnProperty(Te) &&
									Te != 'style' &&
									Te != 'class' &&
									de.setAttribute(Te, p[Te]);
						return n.content.appendChild(de);
					}
					n.content.appendChild(N);
				}
			}
			function sy(n, i) {
				if (n.length > 1 && !/  /.test(n)) return n;
				for (var a = i, s = '', l = 0; l < n.length; l++) {
					var h = n.charAt(l);
					h == ' ' &&
						a &&
						(l == n.length - 1 || n.charCodeAt(l + 1) == 32) &&
						(h = ' '),
						(s += h),
						(a = h == ' ');
				}
				return s;
			}
			function ay(n, i) {
				return function (a, s, l, h, p, m, y) {
					l = l ? l + ' cm-force-border' : 'cm-force-border';
					for (var _ = a.pos, N = _ + s.length; ; ) {
						for (
							var k = void 0, U = 0;
							U < i.length && ((k = i[U]), !(k.to > _ && k.from <= _));
							U++
						);
						if (k.to >= N) return n(a, s, l, h, p, m, y);
						n(a, s.slice(0, k.to - _), l, h, null, m, y),
							(h = null),
							(s = s.slice(k.to - _)),
							(_ = k.to);
					}
				};
			}
			function Dp(n, i, a, s) {
				var l = !s && a.widgetNode;
				l && n.map.push(n.pos, n.pos + i, l),
					!s &&
						n.cm.display.input.needsContentAttribute &&
						(l || (l = n.content.appendChild(document.createElement('span'))),
						l.setAttribute('cm-marker', a.id)),
					l && (n.cm.display.input.setUneditable(l), n.content.appendChild(l)),
					(n.pos += i),
					(n.trailingSpace = !1);
			}
			function ly(n, i, a) {
				var s = n.markedSpans,
					l = n.text,
					h = 0;
				if (!s) {
					for (var p = 1; p < a.length; p += 2)
						i.addToken(i, l.slice(h, (h = a[p])), Mp(a[p + 1], i.cm.options));
					return;
				}
				for (
					var m = l.length, y = 0, _ = 1, N = '', k, U, B = 0, q, $, oe, he, ge;
					;

				) {
					if (B == y) {
						(q = $ = oe = U = ''), (ge = null), (he = null), (B = 1 / 0);
						for (var de = [], Te = void 0, xe = 0; xe < s.length; ++xe) {
							var be = s[xe],
								He = be.marker;
							if (He.type == 'bookmark' && be.from == y && He.widgetNode)
								de.push(He);
							else if (
								be.from <= y &&
								(be.to == null ||
									be.to > y ||
									(He.collapsed && be.to == y && be.from == y))
							) {
								if (
									(be.to != null &&
										be.to != y &&
										B > be.to &&
										((B = be.to), ($ = '')),
									He.className && (q += ' ' + He.className),
									He.css && (U = (U ? U + ';' : '') + He.css),
									He.startStyle && be.from == y && (oe += ' ' + He.startStyle),
									He.endStyle &&
										be.to == B &&
										(Te || (Te = [])).push(He.endStyle, be.to),
									He.title && ((ge || (ge = {})).title = He.title),
									He.attributes)
								)
									for (var st in He.attributes)
										(ge || (ge = {}))[st] = He.attributes[st];
								He.collapsed && (!he || yu(he.marker, He) < 0) && (he = be);
							} else be.from > y && B > be.from && (B = be.from);
						}
						if (Te)
							for (var Ht = 0; Ht < Te.length; Ht += 2)
								Te[Ht + 1] == B && ($ += ' ' + Te[Ht]);
						if (!he || he.from == y)
							for (var gt = 0; gt < de.length; ++gt) Dp(i, 0, de[gt]);
						if (he && (he.from || 0) == y) {
							if (
								(Dp(
									i,
									(he.to == null ? m + 1 : he.to) - y,
									he.marker,
									he.from == null
								),
								he.to == null)
							)
								return;
							he.to == y && (he = !1);
						}
					}
					if (y >= m) break;
					for (var mn = Math.min(m, B); ; ) {
						if (N) {
							var an = y + N.length;
							if (!he) {
								var At = an > mn ? N.slice(0, mn - y) : N;
								i.addToken(
									i,
									At,
									k ? k + q : q,
									oe,
									y + At.length == B ? $ : '',
									U,
									ge
								);
							}
							if (an >= mn) {
								(N = N.slice(mn - y)), (y = mn);
								break;
							}
							(y = an), (oe = '');
						}
						(N = l.slice(h, (h = a[_++]))), (k = Mp(a[_++], i.cm.options));
					}
				}
			}
			function Pp(n, i, a) {
				(this.line = i),
					(this.rest = $7(i)),
					(this.size = this.rest ? tt(De(this.rest)) - a + 1 : 1),
					(this.node = this.text = null),
					(this.hidden = Kr(n, i));
			}
			function sa(n, i, a) {
				for (var s = [], l, h = i; h < a; h = l) {
					var p = new Pp(n.doc, Se(n.doc, h), h);
					(l = h + p.size), s.push(p);
				}
				return s;
			}
			var h1 = null;
			function uy(n) {
				h1
					? h1.ops.push(n)
					: (n.ownsGroup = h1 =
							{
								ops: [n],
								delayedCallbacks: [],
							});
			}
			function cy(n) {
				var i = n.delayedCallbacks,
					a = 0;
				do {
					for (; a < i.length; a++) i[a].call(null);
					for (var s = 0; s < n.ops.length; s++) {
						var l = n.ops[s];
						if (l.cursorActivityHandlers)
							for (; l.cursorActivityCalled < l.cursorActivityHandlers.length; )
								l.cursorActivityHandlers[l.cursorActivityCalled++].call(
									null,
									l.cm
								);
					}
				} while (a < i.length);
			}
			function fy(n, i) {
				var a = n.ownsGroup;
				if (a)
					try {
						cy(a);
					} finally {
						(h1 = null), i(a);
					}
			}
			var _o = null;
			function Dt(n, i) {
				var a = Kn(n, i);
				if (a.length) {
					var s = Array.prototype.slice.call(arguments, 2),
						l;
					h1
						? (l = h1.delayedCallbacks)
						: _o
						? (l = _o)
						: ((l = _o = []), setTimeout(hy, 0));
					for (
						var h = function (m) {
								l.push(function () {
									return a[m].apply(null, s);
								});
							},
							p = 0;
						p < a.length;
						++p
					)
						h(p);
				}
			}
			function hy() {
				var n = _o;
				_o = null;
				for (var i = 0; i < n.length; ++i) n[i]();
			}
			function Fp(n, i, a, s) {
				for (var l = 0; l < i.changes.length; l++) {
					var h = i.changes[l];
					h == 'text'
						? py(n, i)
						: h == 'gutter'
						? Bp(n, i, a, s)
						: h == 'class'
						? Su(n, i)
						: h == 'widget' && gy(n, i, s);
				}
				i.changes = null;
			}
			function Co(n) {
				return (
					n.node == n.text &&
						((n.node = G('div', null, null, 'position: relative')),
						n.text.parentNode && n.text.parentNode.replaceChild(n.node, n.text),
						n.node.appendChild(n.text),
						f && d < 8 && (n.node.style.zIndex = 2)),
					n.node
				);
			}
			function dy(n, i) {
				var a = i.bgClass
					? i.bgClass + ' ' + (i.line.bgClass || '')
					: i.line.bgClass;
				if ((a && (a += ' CodeMirror-linebackground'), i.background))
					a
						? (i.background.className = a)
						: (i.background.parentNode.removeChild(i.background),
						  (i.background = null));
				else if (a) {
					var s = Co(i);
					(i.background = s.insertBefore(G('div', null, a), s.firstChild)),
						n.display.input.setUneditable(i.background);
				}
			}
			function Hp(n, i) {
				var a = n.display.externalMeasured;
				return a && a.line == i.line
					? ((n.display.externalMeasured = null),
					  (i.measure = a.measure),
					  a.built)
					: Rp(n, i);
			}
			function py(n, i) {
				var a = i.text.className,
					s = Hp(n, i);
				i.text == i.node && (i.node = s.pre),
					i.text.parentNode.replaceChild(s.pre, i.text),
					(i.text = s.pre),
					s.bgClass != i.bgClass || s.textClass != i.textClass
						? ((i.bgClass = s.bgClass), (i.textClass = s.textClass), Su(n, i))
						: a && (i.text.className = a);
			}
			function Su(n, i) {
				dy(n, i),
					i.line.wrapClass
						? (Co(i).className = i.line.wrapClass)
						: i.node != i.text && (i.node.className = '');
				var a = i.textClass
					? i.textClass + ' ' + (i.line.textClass || '')
					: i.line.textClass;
				i.text.className = a || '';
			}
			function Bp(n, i, a, s) {
				if (
					(i.gutter && (i.node.removeChild(i.gutter), (i.gutter = null)),
					i.gutterBackground &&
						(i.node.removeChild(i.gutterBackground),
						(i.gutterBackground = null)),
					i.line.gutterClass)
				) {
					var l = Co(i);
					(i.gutterBackground = G(
						'div',
						null,
						'CodeMirror-gutter-background ' + i.line.gutterClass,
						'left: ' +
							(n.options.fixedGutter ? s.fixedPos : -s.gutterTotalWidth) +
							'px; width: ' +
							s.gutterTotalWidth +
							'px'
					)),
						n.display.input.setUneditable(i.gutterBackground),
						l.insertBefore(i.gutterBackground, i.text);
				}
				var h = i.line.gutterMarkers;
				if (n.options.lineNumbers || h) {
					var p = Co(i),
						m = (i.gutter = G(
							'div',
							null,
							'CodeMirror-gutter-wrapper',
							'left: ' +
								(n.options.fixedGutter ? s.fixedPos : -s.gutterTotalWidth) +
								'px'
						));
					if (
						(m.setAttribute('aria-hidden', 'true'),
						n.display.input.setUneditable(m),
						p.insertBefore(m, i.text),
						i.line.gutterClass && (m.className += ' ' + i.line.gutterClass),
						n.options.lineNumbers &&
							(!h || !h['CodeMirror-linenumbers']) &&
							(i.lineNumber = m.appendChild(
								G(
									'div',
									pu(n.options, a),
									'CodeMirror-linenumber CodeMirror-gutter-elt',
									'left: ' +
										s.gutterLeft['CodeMirror-linenumbers'] +
										'px; width: ' +
										n.display.lineNumInnerWidth +
										'px'
								)
							)),
						h)
					)
						for (var y = 0; y < n.display.gutterSpecs.length; ++y) {
							var _ = n.display.gutterSpecs[y].className,
								N = h.hasOwnProperty(_) && h[_];
							N &&
								m.appendChild(
									G(
										'div',
										[N],
										'CodeMirror-gutter-elt',
										'left: ' +
											s.gutterLeft[_] +
											'px; width: ' +
											s.gutterWidth[_] +
											'px'
									)
								);
						}
				}
			}
			function gy(n, i, a) {
				i.alignable && (i.alignable = null);
				for (
					var s = te('CodeMirror-linewidget'),
						l = i.node.firstChild,
						h = void 0;
					l;
					l = h
				)
					(h = l.nextSibling), s.test(l.className) && i.node.removeChild(l);
				Up(n, i, a);
			}
			function my(n, i, a, s) {
				var l = Hp(n, i);
				return (
					(i.text = i.node = l.pre),
					l.bgClass && (i.bgClass = l.bgClass),
					l.textClass && (i.textClass = l.textClass),
					Su(n, i),
					Bp(n, i, a, s),
					Up(n, i, s),
					i.node
				);
			}
			function Up(n, i, a) {
				if ((Gp(n, i.line, i, a, !0), i.rest))
					for (var s = 0; s < i.rest.length; s++) Gp(n, i.rest[s], i, a, !1);
			}
			function Gp(n, i, a, s, l) {
				if (i.widgets)
					for (var h = Co(a), p = 0, m = i.widgets; p < m.length; ++p) {
						var y = m[p],
							_ = G(
								'div',
								[y.node],
								'CodeMirror-linewidget' + (y.className ? ' ' + y.className : '')
							);
						y.handleMouseEvents || _.setAttribute('cm-ignore-events', 'true'),
							Ty(y, _, a, s),
							n.display.input.setUneditable(_),
							l && y.above
								? h.insertBefore(_, a.gutter || a.text)
								: h.appendChild(_),
							Dt(y, 'redraw');
					}
			}
			function Ty(n, i, a, s) {
				if (n.noHScroll) {
					(a.alignable || (a.alignable = [])).push(i);
					var l = s.wrapperWidth;
					(i.style.left = s.fixedPos + 'px'),
						n.coverGutter ||
							((l -= s.gutterTotalWidth),
							(i.style.paddingLeft = s.gutterTotalWidth + 'px')),
						(i.style.width = l + 'px');
				}
				n.coverGutter &&
					((i.style.zIndex = 5),
					(i.style.position = 'relative'),
					n.noHScroll || (i.style.marginLeft = -s.gutterTotalWidth + 'px'));
			}
			function So(n) {
				if (n.height != null) return n.height;
				var i = n.doc.cm;
				if (!i) return 0;
				if (!Q(document.body, n.node)) {
					var a = 'position: relative;';
					n.coverGutter &&
						(a += 'margin-left: -' + i.display.gutters.offsetWidth + 'px;'),
						n.noHScroll &&
							(a += 'width: ' + i.display.wrapper.clientWidth + 'px;'),
						X(i.display.measure, G('div', [n.node], null, a));
				}
				return (n.height = n.node.parentNode.offsetHeight);
			}
			function br(n, i) {
				for (var a = Ti(i); a != n.wrapper; a = a.parentNode)
					if (
						!a ||
						(a.nodeType == 1 && a.getAttribute('cm-ignore-events') == 'true') ||
						(a.parentNode == n.sizer && a != n.mover)
					)
						return !0;
			}
			function aa(n) {
				return n.lineSpace.offsetTop;
			}
			function bu(n) {
				return n.mover.offsetHeight - n.lineSpace.offsetHeight;
			}
			function zp(n) {
				if (n.cachedPaddingH) return n.cachedPaddingH;
				var i = X(n.measure, G('pre', 'x', 'CodeMirror-line-like')),
					a = window.getComputedStyle
						? window.getComputedStyle(i)
						: i.currentStyle,
					s = {
						left: parseInt(a.paddingLeft),
						right: parseInt(a.paddingRight),
					};
				return !isNaN(s.left) && !isNaN(s.right) && (n.cachedPaddingH = s), s;
			}
			function ar(n) {
				return Ue - n.display.nativeBarWidth;
			}
			function _i(n) {
				return n.display.scroller.clientWidth - ar(n) - n.display.barWidth;
			}
			function Nu(n) {
				return n.display.scroller.clientHeight - ar(n) - n.display.barHeight;
			}
			function Ey(n, i, a) {
				var s = n.options.lineWrapping,
					l = s && _i(n);
				if (!i.measure.heights || (s && i.measure.width != l)) {
					var h = (i.measure.heights = []);
					if (s) {
						i.measure.width = l;
						for (
							var p = i.text.firstChild.getClientRects(), m = 0;
							m < p.length - 1;
							m++
						) {
							var y = p[m],
								_ = p[m + 1];
							Math.abs(y.bottom - _.bottom) > 2 &&
								h.push((y.bottom + _.top) / 2 - a.top);
						}
					}
					h.push(a.bottom - a.top);
				}
			}
			function Wp(n, i, a) {
				if (n.line == i)
					return {
						map: n.measure.map,
						cache: n.measure.cache,
					};
				if (n.rest) {
					for (var s = 0; s < n.rest.length; s++)
						if (n.rest[s] == i)
							return {
								map: n.measure.maps[s],
								cache: n.measure.caches[s],
							};
					for (var l = 0; l < n.rest.length; l++)
						if (tt(n.rest[l]) > a)
							return {
								map: n.measure.maps[l],
								cache: n.measure.caches[l],
								before: !0,
							};
				}
			}
			function vy(n, i) {
				i = jn(i);
				var a = tt(i),
					s = (n.display.externalMeasured = new Pp(n.doc, i, a));
				s.lineN = a;
				var l = (s.built = Rp(n, s));
				return (s.text = l.pre), X(n.display.lineMeasure, l.pre), s;
			}
			function Kp(n, i, a, s) {
				return lr(n, d1(n, i), a, s);
			}
			function xu(n, i) {
				if (i >= n.display.viewFrom && i < n.display.viewTo)
					return n.display.view[bi(n, i)];
				var a = n.display.externalMeasured;
				if (a && i >= a.lineN && i < a.lineN + a.size) return a;
			}
			function d1(n, i) {
				var a = tt(i),
					s = xu(n, a);
				s && !s.text
					? (s = null)
					: s && s.changes && (Fp(n, s, a, Iu(n)), (n.curOp.forceUpdate = !0)),
					s || (s = vy(n, i));
				var l = Wp(s, i, a);
				return {
					line: i,
					view: s,
					rect: null,
					map: l.map,
					cache: l.cache,
					before: l.before,
					hasHeights: !1,
				};
			}
			function lr(n, i, a, s, l) {
				i.before && (a = -1);
				var h = a + (s || ''),
					p;
				return (
					i.cache.hasOwnProperty(h)
						? (p = i.cache[h])
						: (i.rect || (i.rect = i.view.text.getBoundingClientRect()),
						  i.hasHeights || (Ey(n, i.view, i.rect), (i.hasHeights = !0)),
						  (p = Ay(n, i, a, s)),
						  p.bogus || (i.cache[h] = p)),
					{
						left: p.left,
						right: p.right,
						top: l ? p.rtop : p.top,
						bottom: l ? p.rbottom : p.bottom,
					}
				);
			}
			var jp = {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			};
			function Yp(n, i, a) {
				for (var s, l, h, p, m, y, _ = 0; _ < n.length; _ += 3)
					if (
						((m = n[_]),
						(y = n[_ + 1]),
						i < m
							? ((l = 0), (h = 1), (p = 'left'))
							: i < y
							? ((l = i - m), (h = l + 1))
							: (_ == n.length - 3 || (i == y && n[_ + 3] > i)) &&
							  ((h = y - m), (l = h - 1), i >= y && (p = 'right')),
						l != null)
					) {
						if (
							((s = n[_ + 2]),
							m == y && a == (s.insertLeft ? 'left' : 'right') && (p = a),
							a == 'left' && l == 0)
						)
							for (; _ && n[_ - 2] == n[_ - 3] && n[_ - 1].insertLeft; )
								(s = n[(_ -= 3) + 2]), (p = 'left');
						if (a == 'right' && l == y - m)
							for (
								;
								_ < n.length - 3 &&
								n[_ + 3] == n[_ + 4] &&
								!n[_ + 5].insertLeft;

							)
								(s = n[(_ += 3) + 2]), (p = 'right');
						break;
					}
				return {
					node: s,
					start: l,
					end: h,
					collapse: p,
					coverStart: m,
					coverEnd: y,
				};
			}
			function yy(n, i) {
				var a = jp;
				if (i == 'left')
					for (var s = 0; s < n.length && (a = n[s]).left == a.right; s++);
				else
					for (var l = n.length - 1; l >= 0 && (a = n[l]).left == a.right; l--);
				return a;
			}
			function Ay(n, i, a, s) {
				var l = Yp(i.map, a, s),
					h = l.node,
					p = l.start,
					m = l.end,
					y = l.collapse,
					_;
				if (h.nodeType == 3) {
					for (var N = 0; N < 4; N++) {
						for (; p && en(i.line.text.charAt(l.coverStart + p)); ) --p;
						for (
							;
							l.coverStart + m < l.coverEnd &&
							en(i.line.text.charAt(l.coverStart + m));

						)
							++m;
						if (
							(f && d < 9 && p == 0 && m == l.coverEnd - l.coverStart
								? (_ = h.parentNode.getBoundingClientRect())
								: (_ = yy(J(h, p, m).getClientRects(), s)),
							_.left || _.right || p == 0)
						)
							break;
						(m = p), (p = p - 1), (y = 'right');
					}
					f && d < 11 && (_ = _y(n.display.measure, _));
				} else {
					p > 0 && (y = s = 'right');
					var k;
					n.options.lineWrapping && (k = h.getClientRects()).length > 1
						? (_ = k[s == 'right' ? k.length - 1 : 0])
						: (_ = h.getBoundingClientRect());
				}
				if (f && d < 9 && !p && (!_ || (!_.left && !_.right))) {
					var U = h.parentNode.getClientRects()[0];
					U
						? (_ = {
								left: U.left,
								right: U.left + g1(n.display),
								top: U.top,
								bottom: U.bottom,
						  })
						: (_ = jp);
				}
				for (
					var B = _.top - i.rect.top,
						q = _.bottom - i.rect.top,
						$ = (B + q) / 2,
						oe = i.view.measure.heights,
						he = 0;
					he < oe.length - 1 && !($ < oe[he]);
					he++
				);
				var ge = he ? oe[he - 1] : 0,
					de = oe[he],
					Te = {
						left: (y == 'right' ? _.right : _.left) - i.rect.left,
						right: (y == 'left' ? _.left : _.right) - i.rect.left,
						top: ge,
						bottom: de,
					};
				return (
					!_.left && !_.right && (Te.bogus = !0),
					n.options.singleCursorHeightPerLine ||
						((Te.rtop = B), (Te.rbottom = q)),
					Te
				);
			}
			function _y(n, i) {
				if (
					!window.screen ||
					screen.logicalXDPI == null ||
					screen.logicalXDPI == screen.deviceXDPI ||
					!F7(n)
				)
					return i;
				var a = screen.logicalXDPI / screen.deviceXDPI,
					s = screen.logicalYDPI / screen.deviceYDPI;
				return {
					left: i.left * a,
					right: i.right * a,
					top: i.top * s,
					bottom: i.bottom * s,
				};
			}
			function qp(n) {
				if (
					n.measure &&
					((n.measure.cache = {}), (n.measure.heights = null), n.rest)
				)
					for (var i = 0; i < n.rest.length; i++) n.measure.caches[i] = {};
			}
			function Xp(n) {
				(n.display.externalMeasure = null), ae(n.display.lineMeasure);
				for (var i = 0; i < n.display.view.length; i++) qp(n.display.view[i]);
			}
			function bo(n) {
				Xp(n),
					(n.display.cachedCharWidth =
						n.display.cachedTextHeight =
						n.display.cachedPaddingH =
							null),
					n.options.lineWrapping || (n.display.maxLineChanged = !0),
					(n.display.lineNumChars = null);
			}
			function Qp() {
				return A && P
					? -(
							document.body.getBoundingClientRect().left -
							parseInt(getComputedStyle(document.body).marginLeft)
					  )
					: window.pageXOffset ||
							(document.documentElement || document.body).scrollLeft;
			}
			function Vp() {
				return A && P
					? -(
							document.body.getBoundingClientRect().top -
							parseInt(getComputedStyle(document.body).marginTop)
					  )
					: window.pageYOffset ||
							(document.documentElement || document.body).scrollTop;
			}
			function ku(n) {
				var i = jn(n),
					a = i.widgets,
					s = 0;
				if (a) for (var l = 0; l < a.length; ++l) a[l].above && (s += So(a[l]));
				return s;
			}
			function la(n, i, a, s, l) {
				if (!l) {
					var h = ku(i);
					(a.top += h), (a.bottom += h);
				}
				if (s == 'line') return a;
				s || (s = 'local');
				var p = Sr(i);
				if (
					(s == 'local' ? (p += aa(n.display)) : (p -= n.display.viewOffset),
					s == 'page' || s == 'window')
				) {
					var m = n.display.lineSpace.getBoundingClientRect();
					p += m.top + (s == 'window' ? 0 : Vp());
					var y = m.left + (s == 'window' ? 0 : Qp());
					(a.left += y), (a.right += y);
				}
				return (a.top += p), (a.bottom += p), a;
			}
			function Zp(n, i, a) {
				if (a == 'div') return i;
				var s = i.left,
					l = i.top;
				if (a == 'page') (s -= Qp()), (l -= Vp());
				else if (a == 'local' || !a) {
					var h = n.display.sizer.getBoundingClientRect();
					(s += h.left), (l += h.top);
				}
				var p = n.display.lineSpace.getBoundingClientRect();
				return {
					left: s - p.left,
					top: l - p.top,
				};
			}
			function ua(n, i, a, s, l) {
				return s || (s = Se(n.doc, i.line)), la(n, s, Kp(n, s, i.ch, l), a);
			}
			function Yn(n, i, a, s, l, h) {
				(s = s || Se(n.doc, i.line)), l || (l = d1(n, s));
				function p(q, $) {
					var oe = lr(n, l, q, $ ? 'right' : 'left', h);
					return (
						$ ? (oe.left = oe.right) : (oe.right = oe.left), la(n, s, oe, a)
					);
				}
				var m = Ne(s, n.doc.direction),
					y = i.ch,
					_ = i.sticky;
				if (
					(y >= s.text.length
						? ((y = s.text.length), (_ = 'before'))
						: y <= 0 && ((y = 0), (_ = 'after')),
					!m)
				)
					return p(_ == 'before' ? y - 1 : y, _ == 'before');
				function N(q, $, oe) {
					var he = m[$],
						ge = he.level == 1;
					return p(oe ? q - 1 : q, ge != oe);
				}
				var k = Y(m, y, _),
					U = pt,
					B = N(y, k, _ == 'before');
				return U != null && (B.other = N(y, U, _ != 'before')), B;
			}
			function Jp(n, i) {
				var a = 0;
				(i = Ie(n.doc, i)),
					n.options.lineWrapping || (a = g1(n.display) * i.ch);
				var s = Se(n.doc, i.line),
					l = Sr(s) + aa(n.display);
				return {
					left: a,
					right: a,
					top: l,
					bottom: l + s.height,
				};
			}
			function Ou(n, i, a, s, l) {
				var h = ne(n, i, a);
				return (h.xRel = l), s && (h.outside = s), h;
			}
			function wu(n, i, a) {
				var s = n.doc;
				if (((a += n.display.viewOffset), a < 0))
					return Ou(s.first, 0, null, -1, -1);
				var l = Ai(s, a),
					h = s.first + s.size - 1;
				if (l > h)
					return Ou(s.first + s.size - 1, Se(s, h).text.length, null, 1, 1);
				i < 0 && (i = 0);
				for (var p = Se(s, l); ; ) {
					var m = Cy(n, p, l, i, a),
						y = Z7(p, m.ch + (m.xRel > 0 || m.outside > 0 ? 1 : 0));
					if (!y) return m;
					var _ = y.find(1);
					if (_.line == l) return _;
					p = Se(s, (l = _.line));
				}
			}
			function $p(n, i, a, s) {
				s -= ku(i);
				var l = i.text.length,
					h = qe(
						function (p) {
							return lr(n, a, p - 1).bottom <= s;
						},
						l,
						0
					);
				return (
					(l = qe(
						function (p) {
							return lr(n, a, p).top > s;
						},
						h,
						l
					)),
					{
						begin: h,
						end: l,
					}
				);
			}
			function e9(n, i, a, s) {
				a || (a = d1(n, i));
				var l = la(n, i, lr(n, a, s), 'line').top;
				return $p(n, i, a, l);
			}
			function Lu(n, i, a, s) {
				return n.bottom <= a ? !1 : n.top > a ? !0 : (s ? n.left : n.right) > i;
			}
			function Cy(n, i, a, s, l) {
				l -= Sr(i);
				var h = d1(n, i),
					p = ku(i),
					m = 0,
					y = i.text.length,
					_ = !0,
					N = Ne(i, n.doc.direction);
				if (N) {
					var k = (n.options.lineWrapping ? by : Sy)(n, i, a, h, N, s, l);
					(_ = k.level != 1),
						(m = _ ? k.from : k.to - 1),
						(y = _ ? k.to : k.from - 1);
				}
				var U = null,
					B = null,
					q = qe(
						function (xe) {
							var be = lr(n, h, xe);
							return (
								(be.top += p),
								(be.bottom += p),
								Lu(be, s, l, !1)
									? (be.top <= l && be.left <= s && ((U = xe), (B = be)), !0)
									: !1
							);
						},
						m,
						y
					),
					$,
					oe,
					he = !1;
				if (B) {
					var ge = s - B.left < B.right - s,
						de = ge == _;
					(q = U + (de ? 0 : 1)),
						(oe = de ? 'after' : 'before'),
						($ = ge ? B.left : B.right);
				} else {
					!_ && (q == y || q == m) && q++,
						(oe =
							q == 0
								? 'after'
								: q == i.text.length
								? 'before'
								: lr(n, h, q - (_ ? 1 : 0)).bottom + p <= l == _
								? 'after'
								: 'before');
					var Te = Yn(n, ne(a, q, oe), 'line', i, h);
					($ = Te.left), (he = l < Te.top ? -1 : l >= Te.bottom ? 1 : 0);
				}
				return (q = lt(i.text, q, 1)), Ou(a, q, oe, he, s - $);
			}
			function Sy(n, i, a, s, l, h, p) {
				var m = qe(
						function (k) {
							var U = l[k],
								B = U.level != 1;
							return Lu(
								Yn(
									n,
									ne(a, B ? U.to : U.from, B ? 'before' : 'after'),
									'line',
									i,
									s
								),
								h,
								p,
								!0
							);
						},
						0,
						l.length - 1
					),
					y = l[m];
				if (m > 0) {
					var _ = y.level != 1,
						N = Yn(
							n,
							ne(a, _ ? y.from : y.to, _ ? 'after' : 'before'),
							'line',
							i,
							s
						);
					Lu(N, h, p, !0) && N.top > p && (y = l[m - 1]);
				}
				return y;
			}
			function by(n, i, a, s, l, h, p) {
				var m = $p(n, i, s, p),
					y = m.begin,
					_ = m.end;
				/\s/.test(i.text.charAt(_ - 1)) && _--;
				for (var N = null, k = null, U = 0; U < l.length; U++) {
					var B = l[U];
					if (!(B.from >= _ || B.to <= y)) {
						var q = B.level != 1,
							$ = lr(
								n,
								s,
								q ? Math.min(_, B.to) - 1 : Math.max(y, B.from)
							).right,
							oe = $ < h ? h - $ + 1e9 : $ - h;
						(!N || k > oe) && ((N = B), (k = oe));
					}
				}
				return (
					N || (N = l[l.length - 1]),
					N.from < y &&
						(N = {
							from: y,
							to: N.to,
							level: N.level,
						}),
					N.to > _ &&
						(N = {
							from: N.from,
							to: _,
							level: N.level,
						}),
					N
				);
			}
			var Ci;
			function p1(n) {
				if (n.cachedTextHeight != null) return n.cachedTextHeight;
				if (Ci == null) {
					Ci = G('pre', null, 'CodeMirror-line-like');
					for (var i = 0; i < 49; ++i)
						Ci.appendChild(document.createTextNode('x')),
							Ci.appendChild(G('br'));
					Ci.appendChild(document.createTextNode('x'));
				}
				X(n.measure, Ci);
				var a = Ci.offsetHeight / 50;
				return a > 3 && (n.cachedTextHeight = a), ae(n.measure), a || 1;
			}
			function g1(n) {
				if (n.cachedCharWidth != null) return n.cachedCharWidth;
				var i = G('span', 'xxxxxxxxxx'),
					a = G('pre', [i], 'CodeMirror-line-like');
				X(n.measure, a);
				var s = i.getBoundingClientRect(),
					l = (s.right - s.left) / 10;
				return l > 2 && (n.cachedCharWidth = l), l || 10;
			}
			function Iu(n) {
				for (
					var i = n.display,
						a = {},
						s = {},
						l = i.gutters.clientLeft,
						h = i.gutters.firstChild,
						p = 0;
					h;
					h = h.nextSibling, ++p
				) {
					var m = n.display.gutterSpecs[p].className;
					(a[m] = h.offsetLeft + h.clientLeft + l), (s[m] = h.clientWidth);
				}
				return {
					fixedPos: Mu(i),
					gutterTotalWidth: i.gutters.offsetWidth,
					gutterLeft: a,
					gutterWidth: s,
					wrapperWidth: i.wrapper.clientWidth,
				};
			}
			function Mu(n) {
				return (
					n.scroller.getBoundingClientRect().left -
					n.sizer.getBoundingClientRect().left
				);
			}
			function t9(n) {
				var i = p1(n.display),
					a = n.options.lineWrapping,
					s =
						a &&
						Math.max(5, n.display.scroller.clientWidth / g1(n.display) - 3);
				return function (l) {
					if (Kr(n.doc, l)) return 0;
					var h = 0;
					if (l.widgets)
						for (var p = 0; p < l.widgets.length; p++)
							l.widgets[p].height && (h += l.widgets[p].height);
					return a ? h + (Math.ceil(l.text.length / s) || 1) * i : h + i;
				};
			}
			function Ru(n) {
				var i = n.doc,
					a = t9(n);
				i.iter(function (s) {
					var l = a(s);
					l != s.height && or(s, l);
				});
			}
			function Si(n, i, a, s) {
				var l = n.display;
				if (!a && Ti(i).getAttribute('cm-not-content') == 'true') return null;
				var h,
					p,
					m = l.lineSpace.getBoundingClientRect();
				try {
					(h = i.clientX - m.left), (p = i.clientY - m.top);
				} catch {
					return null;
				}
				var y = wu(n, h, p),
					_;
				if (s && y.xRel > 0 && (_ = Se(n.doc, y.line).text).length == y.ch) {
					var N = b(_, _.length, n.options.tabSize) - _.length;
					y = ne(
						y.line,
						Math.max(
							0,
							Math.round((h - zp(n.display).left) / g1(n.display)) - N
						)
					);
				}
				return y;
			}
			function bi(n, i) {
				if (i >= n.display.viewTo || ((i -= n.display.viewFrom), i < 0))
					return null;
				for (var a = n.display.view, s = 0; s < a.length; s++)
					if (((i -= a[s].size), i < 0)) return s;
			}
			function on(n, i, a, s) {
				i == null && (i = n.doc.first),
					a == null && (a = n.doc.first + n.doc.size),
					s || (s = 0);
				var l = n.display;
				if (
					(s &&
						a < l.viewTo &&
						(l.updateLineNumbers == null || l.updateLineNumbers > i) &&
						(l.updateLineNumbers = i),
					(n.curOp.viewChanged = !0),
					i >= l.viewTo)
				)
					Cr && Au(n.doc, i) < l.viewTo && Yr(n);
				else if (a <= l.viewFrom)
					Cr && Ip(n.doc, a + s) > l.viewFrom
						? Yr(n)
						: ((l.viewFrom += s), (l.viewTo += s));
				else if (i <= l.viewFrom && a >= l.viewTo) Yr(n);
				else if (i <= l.viewFrom) {
					var h = ca(n, a, a + s, 1);
					h
						? ((l.view = l.view.slice(h.index)),
						  (l.viewFrom = h.lineN),
						  (l.viewTo += s))
						: Yr(n);
				} else if (a >= l.viewTo) {
					var p = ca(n, i, i, -1);
					p
						? ((l.view = l.view.slice(0, p.index)), (l.viewTo = p.lineN))
						: Yr(n);
				} else {
					var m = ca(n, i, i, -1),
						y = ca(n, a, a + s, 1);
					m && y
						? ((l.view = l.view
								.slice(0, m.index)
								.concat(sa(n, m.lineN, y.lineN))
								.concat(l.view.slice(y.index))),
						  (l.viewTo += s))
						: Yr(n);
				}
				var _ = l.externalMeasured;
				_ &&
					(a < _.lineN
						? (_.lineN += s)
						: i < _.lineN + _.size && (l.externalMeasured = null));
			}
			function jr(n, i, a) {
				n.curOp.viewChanged = !0;
				var s = n.display,
					l = n.display.externalMeasured;
				if (
					(l &&
						i >= l.lineN &&
						i < l.lineN + l.size &&
						(s.externalMeasured = null),
					!(i < s.viewFrom || i >= s.viewTo))
				) {
					var h = s.view[bi(n, i)];
					if (h.node != null) {
						var p = h.changes || (h.changes = []);
						fe(p, a) == -1 && p.push(a);
					}
				}
			}
			function Yr(n) {
				(n.display.viewFrom = n.display.viewTo = n.doc.first),
					(n.display.view = []),
					(n.display.viewOffset = 0);
			}
			function ca(n, i, a, s) {
				var l = bi(n, i),
					h,
					p = n.display.view;
				if (!Cr || a == n.doc.first + n.doc.size)
					return {
						index: l,
						lineN: a,
					};
				for (var m = n.display.viewFrom, y = 0; y < l; y++) m += p[y].size;
				if (m != i) {
					if (s > 0) {
						if (l == p.length - 1) return null;
						(h = m + p[l].size - i), l++;
					} else h = m - i;
					(i += h), (a += h);
				}
				for (; Au(n.doc, a) != a; ) {
					if (l == (s < 0 ? 0 : p.length - 1)) return null;
					(a += s * p[l - (s < 0 ? 1 : 0)].size), (l += s);
				}
				return {
					index: l,
					lineN: a,
				};
			}
			function Ny(n, i, a) {
				var s = n.display,
					l = s.view;
				l.length == 0 || i >= s.viewTo || a <= s.viewFrom
					? ((s.view = sa(n, i, a)), (s.viewFrom = i))
					: (s.viewFrom > i
							? (s.view = sa(n, i, s.viewFrom).concat(s.view))
							: s.viewFrom < i && (s.view = s.view.slice(bi(n, i))),
					  (s.viewFrom = i),
					  s.viewTo < a
							? (s.view = s.view.concat(sa(n, s.viewTo, a)))
							: s.viewTo > a && (s.view = s.view.slice(0, bi(n, a)))),
					(s.viewTo = a);
			}
			function n9(n) {
				for (var i = n.display.view, a = 0, s = 0; s < i.length; s++) {
					var l = i[s];
					!l.hidden && (!l.node || l.changes) && ++a;
				}
				return a;
			}
			function No(n) {
				n.display.input.showSelection(n.display.input.prepareSelection());
			}
			function r9(n, i) {
				i === void 0 && (i = !0);
				var a = n.doc,
					s = {},
					l = (s.cursors = document.createDocumentFragment()),
					h = (s.selection = document.createDocumentFragment()),
					p = n.options.$customCursor;
				p && (i = !0);
				for (var m = 0; m < a.sel.ranges.length; m++)
					if (!(!i && m == a.sel.primIndex)) {
						var y = a.sel.ranges[m];
						if (
							!(
								y.from().line >= n.display.viewTo ||
								y.to().line < n.display.viewFrom
							)
						) {
							var _ = y.empty();
							if (p) {
								var N = p(n, y);
								N && Du(n, N, l);
							} else
								(_ || n.options.showCursorWhenSelecting) && Du(n, y.head, l);
							_ || xy(n, y, h);
						}
					}
				return s;
			}
			function Du(n, i, a) {
				var s = Yn(
						n,
						i,
						'div',
						null,
						null,
						!n.options.singleCursorHeightPerLine
					),
					l = a.appendChild(G('div', ' ', 'CodeMirror-cursor'));
				if (
					((l.style.left = s.left + 'px'),
					(l.style.top = s.top + 'px'),
					(l.style.height =
						Math.max(0, s.bottom - s.top) * n.options.cursorHeight + 'px'),
					/\bcm-fat-cursor\b/.test(n.getWrapperElement().className))
				) {
					var h = ua(n, i, 'div', null, null),
						p = h.right - h.left;
					l.style.width = (p > 0 ? p : n.defaultCharWidth()) + 'px';
				}
				if (s.other) {
					var m = a.appendChild(
						G('div', ' ', 'CodeMirror-cursor CodeMirror-secondarycursor')
					);
					(m.style.display = ''),
						(m.style.left = s.other.left + 'px'),
						(m.style.top = s.other.top + 'px'),
						(m.style.height = (s.other.bottom - s.other.top) * 0.85 + 'px');
				}
			}
			function fa(n, i) {
				return n.top - i.top || n.left - i.left;
			}
			function xy(n, i, a) {
				var s = n.display,
					l = n.doc,
					h = document.createDocumentFragment(),
					p = zp(n.display),
					m = p.left,
					y = Math.max(s.sizerWidth, _i(n) - s.sizer.offsetLeft) - p.right,
					_ = l.direction == 'ltr';
				function N(de, Te, xe, be) {
					Te < 0 && (Te = 0),
						(Te = Math.round(Te)),
						(be = Math.round(be)),
						h.appendChild(
							G(
								'div',
								null,
								'CodeMirror-selected',
								'position: absolute; left: ' +
									de +
									`px;
                             top: ` +
									Te +
									'px; width: ' +
									(xe == null ? y - de : xe) +
									`px;
                             height: ` +
									(be - Te) +
									'px'
							)
						);
				}
				function k(de, Te, xe) {
					var be = Se(l, de),
						He = be.text.length,
						st,
						Ht;
					function gt(At, ln) {
						return ua(n, ne(de, At), 'div', be, ln);
					}
					function mn(At, ln, Wt) {
						var wt = e9(n, be, null, At),
							_t = (ln == 'ltr') == (Wt == 'after') ? 'left' : 'right',
							mt =
								Wt == 'after'
									? wt.begin
									: wt.end - (/\s/.test(be.text.charAt(wt.end - 1)) ? 2 : 1);
						return gt(mt, _t)[_t];
					}
					var an = Ne(be, l.direction);
					return (
						et(an, Te || 0, xe == null ? He : xe, function (At, ln, Wt, wt) {
							var _t = Wt == 'ltr',
								mt = gt(At, _t ? 'left' : 'right'),
								un = gt(ln - 1, _t ? 'right' : 'left'),
								k1 = Te == null && At == 0,
								Jr = xe == null && ln == He,
								Vt = wt == 0,
								ur = !an || wt == an.length - 1;
							if (un.top - mt.top <= 3) {
								var Bt = (_ ? k1 : Jr) && Vt,
									ac = (_ ? Jr : k1) && ur,
									kr = Bt ? m : (_t ? mt : un).left,
									wi = ac ? y : (_t ? un : mt).right;
								N(kr, mt.top, wi - kr, mt.bottom);
							} else {
								var Li, nn, O1, lc;
								_t
									? ((Li = _ && k1 && Vt ? m : mt.left),
									  (nn = _ ? y : mn(At, Wt, 'before')),
									  (O1 = _ ? m : mn(ln, Wt, 'after')),
									  (lc = _ && Jr && ur ? y : un.right))
									: ((Li = _ ? mn(At, Wt, 'before') : m),
									  (nn = !_ && k1 && Vt ? y : mt.right),
									  (O1 = !_ && Jr && ur ? m : un.left),
									  (lc = _ ? mn(ln, Wt, 'after') : y)),
									N(Li, mt.top, nn - Li, mt.bottom),
									mt.bottom < un.top && N(m, mt.bottom, null, un.top),
									N(O1, un.top, lc - O1, un.bottom);
							}
							(!st || fa(mt, st) < 0) && (st = mt),
								fa(un, st) < 0 && (st = un),
								(!Ht || fa(mt, Ht) < 0) && (Ht = mt),
								fa(un, Ht) < 0 && (Ht = un);
						}),
						{
							start: st,
							end: Ht,
						}
					);
				}
				var U = i.from(),
					B = i.to();
				if (U.line == B.line) k(U.line, U.ch, B.ch);
				else {
					var q = Se(l, U.line),
						$ = Se(l, B.line),
						oe = jn(q) == jn($),
						he = k(U.line, U.ch, oe ? q.text.length + 1 : null).end,
						ge = k(B.line, oe ? 0 : null, B.ch).start;
					oe &&
						(he.top < ge.top - 2
							? (N(he.right, he.top, null, he.bottom),
							  N(m, ge.top, ge.left, ge.bottom))
							: N(he.right, he.top, ge.left - he.right, he.bottom)),
						he.bottom < ge.top && N(m, he.bottom, null, ge.top);
				}
				a.appendChild(h);
			}
			function Pu(n) {
				if (n.state.focused) {
					var i = n.display;
					clearInterval(i.blinker);
					var a = !0;
					(i.cursorDiv.style.visibility = ''),
						n.options.cursorBlinkRate > 0
							? (i.blinker = setInterval(function () {
									n.hasFocus() || m1(n),
										(i.cursorDiv.style.visibility = (a = !a) ? '' : 'hidden');
							  }, n.options.cursorBlinkRate))
							: n.options.cursorBlinkRate < 0 &&
							  (i.cursorDiv.style.visibility = 'hidden');
				}
			}
			function i9(n) {
				n.hasFocus() || (n.display.input.focus(), n.state.focused || Hu(n));
			}
			function Fu(n) {
				(n.state.delayingBlurEvent = !0),
					setTimeout(function () {
						n.state.delayingBlurEvent &&
							((n.state.delayingBlurEvent = !1), n.state.focused && m1(n));
					}, 100);
			}
			function Hu(n, i) {
				n.state.delayingBlurEvent &&
					!n.state.draggingText &&
					(n.state.delayingBlurEvent = !1),
					n.options.readOnly != 'nocursor' &&
						(n.state.focused ||
							(re(n, 'focus', n, i),
							(n.state.focused = !0),
							Ae(n.display.wrapper, 'CodeMirror-focused'),
							!n.curOp &&
								n.display.selForContextMenu != n.doc.sel &&
								(n.display.input.reset(),
								g &&
									setTimeout(function () {
										return n.display.input.reset(!0);
									}, 20)),
							n.display.input.receivedFocus()),
						Pu(n));
			}
			function m1(n, i) {
				n.state.delayingBlurEvent ||
					(n.state.focused &&
						(re(n, 'blur', n, i),
						(n.state.focused = !1),
						V(n.display.wrapper, 'CodeMirror-focused')),
					clearInterval(n.display.blinker),
					setTimeout(function () {
						n.state.focused || (n.display.shift = !1);
					}, 150));
			}
			function ha(n) {
				for (
					var i = n.display,
						a = i.lineDiv.offsetTop,
						s = Math.max(0, i.scroller.getBoundingClientRect().top),
						l = i.lineDiv.getBoundingClientRect().top,
						h = 0,
						p = 0;
					p < i.view.length;
					p++
				) {
					var m = i.view[p],
						y = n.options.lineWrapping,
						_ = void 0,
						N = 0;
					if (!m.hidden) {
						if (((l += m.line.height), f && d < 8)) {
							var k = m.node.offsetTop + m.node.offsetHeight;
							(_ = k - a), (a = k);
						} else {
							var U = m.node.getBoundingClientRect();
							(_ = U.bottom - U.top),
								!y &&
									m.text.firstChild &&
									(N =
										m.text.firstChild.getBoundingClientRect().right -
										U.left -
										1);
						}
						var B = m.line.height - _;
						if (
							(B > 0.005 || B < -0.005) &&
							(l < s && (h -= B), or(m.line, _), o9(m.line), m.rest)
						)
							for (var q = 0; q < m.rest.length; q++) o9(m.rest[q]);
						if (N > n.display.sizerWidth) {
							var $ = Math.ceil(N / g1(n.display));
							$ > n.display.maxLineLength &&
								((n.display.maxLineLength = $),
								(n.display.maxLine = m.line),
								(n.display.maxLineChanged = !0));
						}
					}
				}
				Math.abs(h) > 2 && (i.scroller.scrollTop += h);
			}
			function o9(n) {
				if (n.widgets)
					for (var i = 0; i < n.widgets.length; ++i) {
						var a = n.widgets[i],
							s = a.node.parentNode;
						s && (a.height = s.offsetHeight);
					}
			}
			function da(n, i, a) {
				var s = a && a.top != null ? Math.max(0, a.top) : n.scroller.scrollTop;
				s = Math.floor(s - aa(n));
				var l = a && a.bottom != null ? a.bottom : s + n.wrapper.clientHeight,
					h = Ai(i, s),
					p = Ai(i, l);
				if (a && a.ensure) {
					var m = a.ensure.from.line,
						y = a.ensure.to.line;
					m < h
						? ((h = m), (p = Ai(i, Sr(Se(i, m)) + n.wrapper.clientHeight)))
						: Math.min(y, i.lastLine()) >= p &&
						  ((h = Ai(i, Sr(Se(i, y)) - n.wrapper.clientHeight)), (p = y));
				}
				return {
					from: h,
					to: Math.max(p, h + 1),
				};
			}
			function ky(n, i) {
				if (!me(n, 'scrollCursorIntoView')) {
					var a = n.display,
						s = a.sizer.getBoundingClientRect(),
						l = null;
					if (
						(i.top + s.top < 0
							? (l = !0)
							: i.bottom + s.top >
									(window.innerHeight ||
										document.documentElement.clientHeight) && (l = !1),
						l != null && !S)
					) {
						var h = G(
							'div',
							'​',
							null,
							`position: absolute;
                         top: ` +
								(i.top - a.viewOffset - aa(n.display)) +
								`px;
                         height: ` +
								(i.bottom - i.top + ar(n) + a.barHeight) +
								`px;
                         left: ` +
								i.left +
								'px; width: ' +
								Math.max(2, i.right - i.left) +
								'px;'
						);
						n.display.lineSpace.appendChild(h),
							h.scrollIntoView(l),
							n.display.lineSpace.removeChild(h);
					}
				}
			}
			function Oy(n, i, a, s) {
				s == null && (s = 0);
				var l;
				!n.options.lineWrapping &&
					i == a &&
					((a = i.sticky == 'before' ? ne(i.line, i.ch + 1, 'before') : i),
					(i = i.ch
						? ne(i.line, i.sticky == 'before' ? i.ch - 1 : i.ch, 'after')
						: i));
				for (var h = 0; h < 5; h++) {
					var p = !1,
						m = Yn(n, i),
						y = !a || a == i ? m : Yn(n, a);
					l = {
						left: Math.min(m.left, y.left),
						top: Math.min(m.top, y.top) - s,
						right: Math.max(m.left, y.left),
						bottom: Math.max(m.bottom, y.bottom) + s,
					};
					var _ = Bu(n, l),
						N = n.doc.scrollTop,
						k = n.doc.scrollLeft;
					if (
						(_.scrollTop != null &&
							(ko(n, _.scrollTop),
							Math.abs(n.doc.scrollTop - N) > 1 && (p = !0)),
						_.scrollLeft != null &&
							(Ni(n, _.scrollLeft),
							Math.abs(n.doc.scrollLeft - k) > 1 && (p = !0)),
						!p)
					)
						break;
				}
				return l;
			}
			function wy(n, i) {
				var a = Bu(n, i);
				a.scrollTop != null && ko(n, a.scrollTop),
					a.scrollLeft != null && Ni(n, a.scrollLeft);
			}
			function Bu(n, i) {
				var a = n.display,
					s = p1(n.display);
				i.top < 0 && (i.top = 0);
				var l =
						n.curOp && n.curOp.scrollTop != null
							? n.curOp.scrollTop
							: a.scroller.scrollTop,
					h = Nu(n),
					p = {};
				i.bottom - i.top > h && (i.bottom = i.top + h);
				var m = n.doc.height + bu(a),
					y = i.top < s,
					_ = i.bottom > m - s;
				if (i.top < l) p.scrollTop = y ? 0 : i.top;
				else if (i.bottom > l + h) {
					var N = Math.min(i.top, (_ ? m : i.bottom) - h);
					N != l && (p.scrollTop = N);
				}
				var k = n.options.fixedGutter ? 0 : a.gutters.offsetWidth,
					U =
						n.curOp && n.curOp.scrollLeft != null
							? n.curOp.scrollLeft
							: a.scroller.scrollLeft - k,
					B = _i(n) - a.gutters.offsetWidth,
					q = i.right - i.left > B;
				return (
					q && (i.right = i.left + B),
					i.left < 10
						? (p.scrollLeft = 0)
						: i.left < U
						? (p.scrollLeft = Math.max(0, i.left + k - (q ? 0 : 10)))
						: i.right > B + U - 3 &&
						  (p.scrollLeft = i.right + (q ? 0 : 10) - B),
					p
				);
			}
			function Uu(n, i) {
				i != null &&
					(pa(n),
					(n.curOp.scrollTop =
						(n.curOp.scrollTop == null ? n.doc.scrollTop : n.curOp.scrollTop) +
						i));
			}
			function T1(n) {
				pa(n);
				var i = n.getCursor();
				n.curOp.scrollToPos = {
					from: i,
					to: i,
					margin: n.options.cursorScrollMargin,
				};
			}
			function xo(n, i, a) {
				(i != null || a != null) && pa(n),
					i != null && (n.curOp.scrollLeft = i),
					a != null && (n.curOp.scrollTop = a);
			}
			function Ly(n, i) {
				pa(n), (n.curOp.scrollToPos = i);
			}
			function pa(n) {
				var i = n.curOp.scrollToPos;
				if (i) {
					n.curOp.scrollToPos = null;
					var a = Jp(n, i.from),
						s = Jp(n, i.to);
					s9(n, a, s, i.margin);
				}
			}
			function s9(n, i, a, s) {
				var l = Bu(n, {
					left: Math.min(i.left, a.left),
					top: Math.min(i.top, a.top) - s,
					right: Math.max(i.right, a.right),
					bottom: Math.max(i.bottom, a.bottom) + s,
				});
				xo(n, l.scrollLeft, l.scrollTop);
			}
			function ko(n, i) {
				Math.abs(n.doc.scrollTop - i) < 2 ||
					(r ||
						zu(n, {
							top: i,
						}),
					a9(n, i, !0),
					r && zu(n),
					Lo(n, 100));
			}
			function a9(n, i, a) {
				(i = Math.max(
					0,
					Math.min(
						n.display.scroller.scrollHeight - n.display.scroller.clientHeight,
						i
					)
				)),
					!(n.display.scroller.scrollTop == i && !a) &&
						((n.doc.scrollTop = i),
						n.display.scrollbars.setScrollTop(i),
						n.display.scroller.scrollTop != i &&
							(n.display.scroller.scrollTop = i));
			}
			function Ni(n, i, a, s) {
				(i = Math.max(
					0,
					Math.min(
						i,
						n.display.scroller.scrollWidth - n.display.scroller.clientWidth
					)
				)),
					!(
						(a ? i == n.doc.scrollLeft : Math.abs(n.doc.scrollLeft - i) < 2) &&
						!s
					) &&
						((n.doc.scrollLeft = i),
						h9(n),
						n.display.scroller.scrollLeft != i &&
							(n.display.scroller.scrollLeft = i),
						n.display.scrollbars.setScrollLeft(i));
			}
			function Oo(n) {
				var i = n.display,
					a = i.gutters.offsetWidth,
					s = Math.round(n.doc.height + bu(n.display));
				return {
					clientHeight: i.scroller.clientHeight,
					viewHeight: i.wrapper.clientHeight,
					scrollWidth: i.scroller.scrollWidth,
					clientWidth: i.scroller.clientWidth,
					viewWidth: i.wrapper.clientWidth,
					barLeft: n.options.fixedGutter ? a : 0,
					docHeight: s,
					scrollHeight: s + ar(n) + i.barHeight,
					nativeBarWidth: i.nativeBarWidth,
					gutterWidth: a,
				};
			}
			var xi = function (n, i, a) {
				this.cm = a;
				var s = (this.vert = G(
						'div',
						[G('div', null, null, 'min-width: 1px')],
						'CodeMirror-vscrollbar'
					)),
					l = (this.horiz = G(
						'div',
						[G('div', null, null, 'height: 100%; min-height: 1px')],
						'CodeMirror-hscrollbar'
					));
				(s.tabIndex = l.tabIndex = -1),
					n(s),
					n(l),
					Ee(s, 'scroll', function () {
						s.clientHeight && i(s.scrollTop, 'vertical');
					}),
					Ee(l, 'scroll', function () {
						l.clientWidth && i(l.scrollLeft, 'horizontal');
					}),
					(this.checkedZeroWidth = !1),
					f &&
						d < 8 &&
						(this.horiz.style.minHeight = this.vert.style.minWidth = '18px');
			};
			(xi.prototype.update = function (n) {
				var i = n.scrollWidth > n.clientWidth + 1,
					a = n.scrollHeight > n.clientHeight + 1,
					s = n.nativeBarWidth;
				if (a) {
					(this.vert.style.display = 'block'),
						(this.vert.style.bottom = i ? s + 'px' : '0');
					var l = n.viewHeight - (i ? s : 0);
					this.vert.firstChild.style.height =
						Math.max(0, n.scrollHeight - n.clientHeight + l) + 'px';
				} else
					(this.vert.scrollTop = 0),
						(this.vert.style.display = ''),
						(this.vert.firstChild.style.height = '0');
				if (i) {
					(this.horiz.style.display = 'block'),
						(this.horiz.style.right = a ? s + 'px' : '0'),
						(this.horiz.style.left = n.barLeft + 'px');
					var h = n.viewWidth - n.barLeft - (a ? s : 0);
					this.horiz.firstChild.style.width =
						Math.max(0, n.scrollWidth - n.clientWidth + h) + 'px';
				} else
					(this.horiz.style.display = ''),
						(this.horiz.firstChild.style.width = '0');
				return (
					!this.checkedZeroWidth &&
						n.clientHeight > 0 &&
						(s == 0 && this.zeroWidthHack(), (this.checkedZeroWidth = !0)),
					{
						right: a ? s : 0,
						bottom: i ? s : 0,
					}
				);
			}),
				(xi.prototype.setScrollLeft = function (n) {
					this.horiz.scrollLeft != n && (this.horiz.scrollLeft = n),
						this.disableHoriz &&
							this.enableZeroWidthBar(this.horiz, this.disableHoriz, 'horiz');
				}),
				(xi.prototype.setScrollTop = function (n) {
					this.vert.scrollTop != n && (this.vert.scrollTop = n),
						this.disableVert &&
							this.enableZeroWidthBar(this.vert, this.disableVert, 'vert');
				}),
				(xi.prototype.zeroWidthHack = function () {
					var n = z && !x ? '12px' : '18px';
					(this.horiz.style.height = this.vert.style.width = n),
						(this.horiz.style.pointerEvents = this.vert.style.pointerEvents =
							'none'),
						(this.disableHoriz = new Ce()),
						(this.disableVert = new Ce());
				}),
				(xi.prototype.enableZeroWidthBar = function (n, i, a) {
					n.style.pointerEvents = 'auto';
					function s() {
						var l = n.getBoundingClientRect(),
							h =
								a == 'vert'
									? document.elementFromPoint(
											l.right - 1,
											(l.top + l.bottom) / 2
									  )
									: document.elementFromPoint(
											(l.right + l.left) / 2,
											l.bottom - 1
									  );
						h != n ? (n.style.pointerEvents = 'none') : i.set(1e3, s);
					}
					i.set(1e3, s);
				}),
				(xi.prototype.clear = function () {
					var n = this.horiz.parentNode;
					n.removeChild(this.horiz), n.removeChild(this.vert);
				});
			var wo = function () {};
			(wo.prototype.update = function () {
				return {
					bottom: 0,
					right: 0,
				};
			}),
				(wo.prototype.setScrollLeft = function () {}),
				(wo.prototype.setScrollTop = function () {}),
				(wo.prototype.clear = function () {});
			function E1(n, i) {
				i || (i = Oo(n));
				var a = n.display.barWidth,
					s = n.display.barHeight;
				l9(n, i);
				for (
					var l = 0;
					(l < 4 && a != n.display.barWidth) || s != n.display.barHeight;
					l++
				)
					a != n.display.barWidth && n.options.lineWrapping && ha(n),
						l9(n, Oo(n)),
						(a = n.display.barWidth),
						(s = n.display.barHeight);
			}
			function l9(n, i) {
				var a = n.display,
					s = a.scrollbars.update(i);
				(a.sizer.style.paddingRight = (a.barWidth = s.right) + 'px'),
					(a.sizer.style.paddingBottom = (a.barHeight = s.bottom) + 'px'),
					(a.heightForcer.style.borderBottom =
						s.bottom + 'px solid transparent'),
					s.right && s.bottom
						? ((a.scrollbarFiller.style.display = 'block'),
						  (a.scrollbarFiller.style.height = s.bottom + 'px'),
						  (a.scrollbarFiller.style.width = s.right + 'px'))
						: (a.scrollbarFiller.style.display = ''),
					s.bottom &&
					n.options.coverGutterNextToScrollbar &&
					n.options.fixedGutter
						? ((a.gutterFiller.style.display = 'block'),
						  (a.gutterFiller.style.height = s.bottom + 'px'),
						  (a.gutterFiller.style.width = i.gutterWidth + 'px'))
						: (a.gutterFiller.style.display = '');
			}
			var u9 = {
				native: xi,
				null: wo,
			};
			function c9(n) {
				n.display.scrollbars &&
					(n.display.scrollbars.clear(),
					n.display.scrollbars.addClass &&
						V(n.display.wrapper, n.display.scrollbars.addClass)),
					(n.display.scrollbars = new u9[n.options.scrollbarStyle](
						function (i) {
							n.display.wrapper.insertBefore(i, n.display.scrollbarFiller),
								Ee(i, 'mousedown', function () {
									n.state.focused &&
										setTimeout(function () {
											return n.display.input.focus();
										}, 0);
								}),
								i.setAttribute('cm-not-content', 'true');
						},
						function (i, a) {
							a == 'horizontal' ? Ni(n, i) : ko(n, i);
						},
						n
					)),
					n.display.scrollbars.addClass &&
						Ae(n.display.wrapper, n.display.scrollbars.addClass);
			}
			var Iy = 0;
			function ki(n) {
				(n.curOp = {
					cm: n,
					viewChanged: !1,
					startHeight: n.doc.height,
					forceUpdate: !1,
					updateInput: 0,
					typing: !1,
					changeObjs: null,
					cursorActivityHandlers: null,
					cursorActivityCalled: 0,
					selectionChanged: !1,
					updateMaxLine: !1,
					scrollLeft: null,
					scrollTop: null,
					scrollToPos: null,
					focus: !1,
					id: ++Iy,
					markArrays: null,
				}),
					uy(n.curOp);
			}
			function Oi(n) {
				var i = n.curOp;
				i &&
					fy(i, function (a) {
						for (var s = 0; s < a.ops.length; s++) a.ops[s].cm.curOp = null;
						My(a);
					});
			}
			function My(n) {
				for (var i = n.ops, a = 0; a < i.length; a++) Ry(i[a]);
				for (var s = 0; s < i.length; s++) Dy(i[s]);
				for (var l = 0; l < i.length; l++) Py(i[l]);
				for (var h = 0; h < i.length; h++) Fy(i[h]);
				for (var p = 0; p < i.length; p++) Hy(i[p]);
			}
			function Ry(n) {
				var i = n.cm,
					a = i.display;
				Uy(i),
					n.updateMaxLine && Cu(i),
					(n.mustUpdate =
						n.viewChanged ||
						n.forceUpdate ||
						n.scrollTop != null ||
						(n.scrollToPos &&
							(n.scrollToPos.from.line < a.viewFrom ||
								n.scrollToPos.to.line >= a.viewTo)) ||
						(a.maxLineChanged && i.options.lineWrapping)),
					(n.update =
						n.mustUpdate &&
						new ga(
							i,
							n.mustUpdate && {
								top: n.scrollTop,
								ensure: n.scrollToPos,
							},
							n.forceUpdate
						));
			}
			function Dy(n) {
				n.updatedDisplay = n.mustUpdate && Gu(n.cm, n.update);
			}
			function Py(n) {
				var i = n.cm,
					a = i.display;
				n.updatedDisplay && ha(i),
					(n.barMeasure = Oo(i)),
					a.maxLineChanged &&
						!i.options.lineWrapping &&
						((n.adjustWidthTo =
							Kp(i, a.maxLine, a.maxLine.text.length).left + 3),
						(i.display.sizerWidth = n.adjustWidthTo),
						(n.barMeasure.scrollWidth = Math.max(
							a.scroller.clientWidth,
							a.sizer.offsetLeft + n.adjustWidthTo + ar(i) + i.display.barWidth
						)),
						(n.maxScrollLeft = Math.max(
							0,
							a.sizer.offsetLeft + n.adjustWidthTo - _i(i)
						))),
					(n.updatedDisplay || n.selectionChanged) &&
						(n.preparedSelection = a.input.prepareSelection());
			}
			function Fy(n) {
				var i = n.cm;
				n.adjustWidthTo != null &&
					((i.display.sizer.style.minWidth = n.adjustWidthTo + 'px'),
					n.maxScrollLeft < i.doc.scrollLeft &&
						Ni(i, Math.min(i.display.scroller.scrollLeft, n.maxScrollLeft), !0),
					(i.display.maxLineChanged = !1));
				var a = n.focus && n.focus == se();
				n.preparedSelection &&
					i.display.input.showSelection(n.preparedSelection, a),
					(n.updatedDisplay || n.startHeight != i.doc.height) &&
						E1(i, n.barMeasure),
					n.updatedDisplay && Ku(i, n.barMeasure),
					n.selectionChanged && Pu(i),
					i.state.focused && n.updateInput && i.display.input.reset(n.typing),
					a && i9(n.cm);
			}
			function Hy(n) {
				var i = n.cm,
					a = i.display,
					s = i.doc;
				if (
					(n.updatedDisplay && f9(i, n.update),
					a.wheelStartX != null &&
						(n.scrollTop != null || n.scrollLeft != null || n.scrollToPos) &&
						(a.wheelStartX = a.wheelStartY = null),
					n.scrollTop != null && a9(i, n.scrollTop, n.forceScroll),
					n.scrollLeft != null && Ni(i, n.scrollLeft, !0, !0),
					n.scrollToPos)
				) {
					var l = Oy(
						i,
						Ie(s, n.scrollToPos.from),
						Ie(s, n.scrollToPos.to),
						n.scrollToPos.margin
					);
					ky(i, l);
				}
				var h = n.maybeHiddenMarkers,
					p = n.maybeUnhiddenMarkers;
				if (h)
					for (var m = 0; m < h.length; ++m)
						h[m].lines.length || re(h[m], 'hide');
				if (p)
					for (var y = 0; y < p.length; ++y)
						p[y].lines.length && re(p[y], 'unhide');
				a.wrapper.offsetHeight && (s.scrollTop = i.display.scroller.scrollTop),
					n.changeObjs && re(i, 'changes', i, n.changeObjs),
					n.update && n.update.finish();
			}
			function gn(n, i) {
				if (n.curOp) return i();
				ki(n);
				try {
					return i();
				} finally {
					Oi(n);
				}
			}
			function Pt(n, i) {
				return function () {
					if (n.curOp) return i.apply(n, arguments);
					ki(n);
					try {
						return i.apply(n, arguments);
					} finally {
						Oi(n);
					}
				};
			}
			function tn(n) {
				return function () {
					if (this.curOp) return n.apply(this, arguments);
					ki(this);
					try {
						return n.apply(this, arguments);
					} finally {
						Oi(this);
					}
				};
			}
			function Ft(n) {
				return function () {
					var i = this.cm;
					if (!i || i.curOp) return n.apply(this, arguments);
					ki(i);
					try {
						return n.apply(this, arguments);
					} finally {
						Oi(i);
					}
				};
			}
			function Lo(n, i) {
				n.doc.highlightFrontier < n.display.viewTo &&
					n.state.highlight.set(i, O(By, n));
			}
			function By(n) {
				var i = n.doc;
				if (!(i.highlightFrontier >= n.display.viewTo)) {
					var a = +new Date() + n.options.workTime,
						s = yo(n, i.highlightFrontier),
						l = [];
					i.iter(
						s.line,
						Math.min(i.first + i.size, n.display.viewTo + 500),
						function (h) {
							if (s.line >= n.display.viewFrom) {
								var p = h.styles,
									m =
										h.text.length > n.options.maxHighlightLength
											? vi(i.mode, s.state)
											: null,
									y = Ep(n, h, s, !0);
								m && (s.state = m), (h.styles = y.styles);
								var _ = h.styleClasses,
									N = y.classes;
								N ? (h.styleClasses = N) : _ && (h.styleClasses = null);
								for (
									var k =
											!p ||
											p.length != h.styles.length ||
											(_ != N &&
												(!_ ||
													!N ||
													_.bgClass != N.bgClass ||
													_.textClass != N.textClass)),
										U = 0;
									!k && U < p.length;
									++U
								)
									k = p[U] != h.styles[U];
								k && l.push(s.line), (h.stateAfter = s.save()), s.nextLine();
							} else
								h.text.length <= n.options.maxHighlightLength &&
									Tu(n, h.text, s),
									(h.stateAfter = s.line % 5 == 0 ? s.save() : null),
									s.nextLine();
							if (+new Date() > a) return Lo(n, n.options.workDelay), !0;
						}
					),
						(i.highlightFrontier = s.line),
						(i.modeFrontier = Math.max(i.modeFrontier, s.line)),
						l.length &&
							gn(n, function () {
								for (var h = 0; h < l.length; h++) jr(n, l[h], 'text');
							});
				}
			}
			var ga = function (n, i, a) {
				var s = n.display;
				(this.viewport = i),
					(this.visible = da(s, n.doc, i)),
					(this.editorIsHidden = !s.wrapper.offsetWidth),
					(this.wrapperHeight = s.wrapper.clientHeight),
					(this.wrapperWidth = s.wrapper.clientWidth),
					(this.oldDisplayWidth = _i(n)),
					(this.force = a),
					(this.dims = Iu(n)),
					(this.events = []);
			};
			(ga.prototype.signal = function (n, i) {
				ve(n, i) && this.events.push(arguments);
			}),
				(ga.prototype.finish = function () {
					for (var n = 0; n < this.events.length; n++)
						re.apply(null, this.events[n]);
				});
			function Uy(n) {
				var i = n.display;
				!i.scrollbarsClipped &&
					i.scroller.offsetWidth &&
					((i.nativeBarWidth = i.scroller.offsetWidth - i.scroller.clientWidth),
					(i.heightForcer.style.height = ar(n) + 'px'),
					(i.sizer.style.marginBottom = -i.nativeBarWidth + 'px'),
					(i.sizer.style.borderRightWidth = ar(n) + 'px'),
					(i.scrollbarsClipped = !0));
			}
			function Gy(n) {
				if (n.hasFocus()) return null;
				var i = se();
				if (!i || !Q(n.display.lineDiv, i)) return null;
				var a = {
					activeElt: i,
				};
				if (window.getSelection) {
					var s = window.getSelection();
					s.anchorNode &&
						s.extend &&
						Q(n.display.lineDiv, s.anchorNode) &&
						((a.anchorNode = s.anchorNode),
						(a.anchorOffset = s.anchorOffset),
						(a.focusNode = s.focusNode),
						(a.focusOffset = s.focusOffset));
				}
				return a;
			}
			function zy(n) {
				if (
					!(!n || !n.activeElt || n.activeElt == se()) &&
					(n.activeElt.focus(),
					!/^(INPUT|TEXTAREA)$/.test(n.activeElt.nodeName) &&
						n.anchorNode &&
						Q(document.body, n.anchorNode) &&
						Q(document.body, n.focusNode))
				) {
					var i = window.getSelection(),
						a = document.createRange();
					a.setEnd(n.anchorNode, n.anchorOffset),
						a.collapse(!1),
						i.removeAllRanges(),
						i.addRange(a),
						i.extend(n.focusNode, n.focusOffset);
				}
			}
			function Gu(n, i) {
				var a = n.display,
					s = n.doc;
				if (i.editorIsHidden) return Yr(n), !1;
				if (
					!i.force &&
					i.visible.from >= a.viewFrom &&
					i.visible.to <= a.viewTo &&
					(a.updateLineNumbers == null || a.updateLineNumbers >= a.viewTo) &&
					a.renderedView == a.view &&
					n9(n) == 0
				)
					return !1;
				d9(n) && (Yr(n), (i.dims = Iu(n)));
				var l = s.first + s.size,
					h = Math.max(i.visible.from - n.options.viewportMargin, s.first),
					p = Math.min(l, i.visible.to + n.options.viewportMargin);
				a.viewFrom < h &&
					h - a.viewFrom < 20 &&
					(h = Math.max(s.first, a.viewFrom)),
					a.viewTo > p && a.viewTo - p < 20 && (p = Math.min(l, a.viewTo)),
					Cr && ((h = Au(n.doc, h)), (p = Ip(n.doc, p)));
				var m =
					h != a.viewFrom ||
					p != a.viewTo ||
					a.lastWrapHeight != i.wrapperHeight ||
					a.lastWrapWidth != i.wrapperWidth;
				Ny(n, h, p),
					(a.viewOffset = Sr(Se(n.doc, a.viewFrom))),
					(n.display.mover.style.top = a.viewOffset + 'px');
				var y = n9(n);
				if (
					!m &&
					y == 0 &&
					!i.force &&
					a.renderedView == a.view &&
					(a.updateLineNumbers == null || a.updateLineNumbers >= a.viewTo)
				)
					return !1;
				var _ = Gy(n);
				return (
					y > 4 && (a.lineDiv.style.display = 'none'),
					Wy(n, a.updateLineNumbers, i.dims),
					y > 4 && (a.lineDiv.style.display = ''),
					(a.renderedView = a.view),
					zy(_),
					ae(a.cursorDiv),
					ae(a.selectionDiv),
					(a.gutters.style.height = a.sizer.style.minHeight = 0),
					m &&
						((a.lastWrapHeight = i.wrapperHeight),
						(a.lastWrapWidth = i.wrapperWidth),
						Lo(n, 400)),
					(a.updateLineNumbers = null),
					!0
				);
			}
			function f9(n, i) {
				for (var a = i.viewport, s = !0; ; s = !1) {
					if (!s || !n.options.lineWrapping || i.oldDisplayWidth == _i(n)) {
						if (
							(a &&
								a.top != null &&
								(a = {
									top: Math.min(n.doc.height + bu(n.display) - Nu(n), a.top),
								}),
							(i.visible = da(n.display, n.doc, a)),
							i.visible.from >= n.display.viewFrom &&
								i.visible.to <= n.display.viewTo)
						)
							break;
					} else s && (i.visible = da(n.display, n.doc, a));
					if (!Gu(n, i)) break;
					ha(n);
					var l = Oo(n);
					No(n), E1(n, l), Ku(n, l), (i.force = !1);
				}
				i.signal(n, 'update', n),
					(n.display.viewFrom != n.display.reportedViewFrom ||
						n.display.viewTo != n.display.reportedViewTo) &&
						(i.signal(
							n,
							'viewportChange',
							n,
							n.display.viewFrom,
							n.display.viewTo
						),
						(n.display.reportedViewFrom = n.display.viewFrom),
						(n.display.reportedViewTo = n.display.viewTo));
			}
			function zu(n, i) {
				var a = new ga(n, i);
				if (Gu(n, a)) {
					ha(n), f9(n, a);
					var s = Oo(n);
					No(n), E1(n, s), Ku(n, s), a.finish();
				}
			}
			function Wy(n, i, a) {
				var s = n.display,
					l = n.options.lineNumbers,
					h = s.lineDiv,
					p = h.firstChild;
				function m(q) {
					var $ = q.nextSibling;
					return (
						g && z && n.display.currentWheelTarget == q
							? (q.style.display = 'none')
							: q.parentNode.removeChild(q),
						$
					);
				}
				for (var y = s.view, _ = s.viewFrom, N = 0; N < y.length; N++) {
					var k = y[N];
					if (!k.hidden)
						if (!k.node || k.node.parentNode != h) {
							var U = my(n, k, _, a);
							h.insertBefore(U, p);
						} else {
							for (; p != k.node; ) p = m(p);
							var B = l && i != null && i <= _ && k.lineNumber;
							k.changes &&
								(fe(k.changes, 'gutter') > -1 && (B = !1), Fp(n, k, _, a)),
								B &&
									(ae(k.lineNumber),
									k.lineNumber.appendChild(
										document.createTextNode(pu(n.options, _))
									)),
								(p = k.node.nextSibling);
						}
					_ += k.size;
				}
				for (; p; ) p = m(p);
			}
			function Wu(n) {
				var i = n.gutters.offsetWidth;
				(n.sizer.style.marginLeft = i + 'px'), Dt(n, 'gutterChanged', n);
			}
			function Ku(n, i) {
				(n.display.sizer.style.minHeight = i.docHeight + 'px'),
					(n.display.heightForcer.style.top = i.docHeight + 'px'),
					(n.display.gutters.style.height =
						i.docHeight + n.display.barHeight + ar(n) + 'px');
			}
			function h9(n) {
				var i = n.display,
					a = i.view;
				if (
					!(
						!i.alignWidgets &&
						(!i.gutters.firstChild || !n.options.fixedGutter)
					)
				) {
					for (
						var s = Mu(i) - i.scroller.scrollLeft + n.doc.scrollLeft,
							l = i.gutters.offsetWidth,
							h = s + 'px',
							p = 0;
						p < a.length;
						p++
					)
						if (!a[p].hidden) {
							n.options.fixedGutter &&
								(a[p].gutter && (a[p].gutter.style.left = h),
								a[p].gutterBackground &&
									(a[p].gutterBackground.style.left = h));
							var m = a[p].alignable;
							if (m) for (var y = 0; y < m.length; y++) m[y].style.left = h;
						}
					n.options.fixedGutter && (i.gutters.style.left = s + l + 'px');
				}
			}
			function d9(n) {
				if (!n.options.lineNumbers) return !1;
				var i = n.doc,
					a = pu(n.options, i.first + i.size - 1),
					s = n.display;
				if (a.length != s.lineNumChars) {
					var l = s.measure.appendChild(
							G(
								'div',
								[G('div', a)],
								'CodeMirror-linenumber CodeMirror-gutter-elt'
							)
						),
						h = l.firstChild.offsetWidth,
						p = l.offsetWidth - h;
					return (
						(s.lineGutter.style.width = ''),
						(s.lineNumInnerWidth =
							Math.max(h, s.lineGutter.offsetWidth - p) + 1),
						(s.lineNumWidth = s.lineNumInnerWidth + p),
						(s.lineNumChars = s.lineNumInnerWidth ? a.length : -1),
						(s.lineGutter.style.width = s.lineNumWidth + 'px'),
						Wu(n.display),
						!0
					);
				}
				return !1;
			}
			function ju(n, i) {
				for (var a = [], s = !1, l = 0; l < n.length; l++) {
					var h = n[l],
						p = null;
					if (
						(typeof h != 'string' && ((p = h.style), (h = h.className)),
						h == 'CodeMirror-linenumbers')
					)
						if (i) s = !0;
						else continue;
					a.push({
						className: h,
						style: p,
					});
				}
				return (
					i &&
						!s &&
						a.push({
							className: 'CodeMirror-linenumbers',
							style: null,
						}),
					a
				);
			}
			function p9(n) {
				var i = n.gutters,
					a = n.gutterSpecs;
				ae(i), (n.lineGutter = null);
				for (var s = 0; s < a.length; ++s) {
					var l = a[s],
						h = l.className,
						p = l.style,
						m = i.appendChild(G('div', null, 'CodeMirror-gutter ' + h));
					p && (m.style.cssText = p),
						h == 'CodeMirror-linenumbers' &&
							((n.lineGutter = m),
							(m.style.width = (n.lineNumWidth || 1) + 'px'));
				}
				(i.style.display = a.length ? '' : 'none'), Wu(n);
			}
			function Io(n) {
				p9(n.display), on(n), h9(n);
			}
			function Ky(n, i, a, s) {
				var l = this;
				(this.input = a),
					(l.scrollbarFiller = G('div', null, 'CodeMirror-scrollbar-filler')),
					l.scrollbarFiller.setAttribute('cm-not-content', 'true'),
					(l.gutterFiller = G('div', null, 'CodeMirror-gutter-filler')),
					l.gutterFiller.setAttribute('cm-not-content', 'true'),
					(l.lineDiv = H('div', null, 'CodeMirror-code')),
					(l.selectionDiv = G(
						'div',
						null,
						null,
						'position: relative; z-index: 1'
					)),
					(l.cursorDiv = G('div', null, 'CodeMirror-cursors')),
					(l.measure = G('div', null, 'CodeMirror-measure')),
					(l.lineMeasure = G('div', null, 'CodeMirror-measure')),
					(l.lineSpace = H(
						'div',
						[l.measure, l.lineMeasure, l.selectionDiv, l.cursorDiv, l.lineDiv],
						null,
						'position: relative; outline: none'
					));
				var h = H('div', [l.lineSpace], 'CodeMirror-lines');
				(l.mover = G('div', [h], null, 'position: relative')),
					(l.sizer = G('div', [l.mover], 'CodeMirror-sizer')),
					(l.sizerWidth = null),
					(l.heightForcer = G(
						'div',
						null,
						null,
						'position: absolute; height: ' + Ue + 'px; width: 1px;'
					)),
					(l.gutters = G('div', null, 'CodeMirror-gutters')),
					(l.lineGutter = null),
					(l.scroller = G(
						'div',
						[l.sizer, l.heightForcer, l.gutters],
						'CodeMirror-scroll'
					)),
					l.scroller.setAttribute('tabIndex', '-1'),
					(l.wrapper = G(
						'div',
						[l.scrollbarFiller, l.gutterFiller, l.scroller],
						'CodeMirror'
					)),
					l.wrapper.setAttribute('translate', 'no'),
					f &&
						d < 8 &&
						((l.gutters.style.zIndex = -1),
						(l.scroller.style.paddingRight = 0)),
					!g && !(r && I) && (l.scroller.draggable = !0),
					n && (n.appendChild ? n.appendChild(l.wrapper) : n(l.wrapper)),
					(l.viewFrom = l.viewTo = i.first),
					(l.reportedViewFrom = l.reportedViewTo = i.first),
					(l.view = []),
					(l.renderedView = null),
					(l.externalMeasured = null),
					(l.viewOffset = 0),
					(l.lastWrapHeight = l.lastWrapWidth = 0),
					(l.updateLineNumbers = null),
					(l.nativeBarWidth = l.barHeight = l.barWidth = 0),
					(l.scrollbarsClipped = !1),
					(l.lineNumWidth = l.lineNumInnerWidth = l.lineNumChars = null),
					(l.alignWidgets = !1),
					(l.cachedCharWidth = l.cachedTextHeight = l.cachedPaddingH = null),
					(l.maxLine = null),
					(l.maxLineLength = 0),
					(l.maxLineChanged = !1),
					(l.wheelDX = l.wheelDY = l.wheelStartX = l.wheelStartY = null),
					(l.shift = !1),
					(l.selForContextMenu = null),
					(l.activeTouch = null),
					(l.gutterSpecs = ju(s.gutters, s.lineNumbers)),
					p9(l),
					a.init(l);
			}
			var ma = 0,
				Nr = null;
			f ? (Nr = -0.53) : r ? (Nr = 15) : A ? (Nr = -0.7) : M && (Nr = -1 / 3);
			function g9(n) {
				var i = n.wheelDeltaX,
					a = n.wheelDeltaY;
				return (
					i == null &&
						n.detail &&
						n.axis == n.HORIZONTAL_AXIS &&
						(i = n.detail),
					a == null && n.detail && n.axis == n.VERTICAL_AXIS
						? (a = n.detail)
						: a == null && (a = n.wheelDelta),
					{
						x: i,
						y: a,
					}
				);
			}
			function jy(n) {
				var i = g9(n);
				return (i.x *= Nr), (i.y *= Nr), i;
			}
			function m9(n, i) {
				var a = g9(i),
					s = a.x,
					l = a.y,
					h = Nr;
				i.deltaMode === 0 && ((s = i.deltaX), (l = i.deltaY), (h = 1));
				var p = n.display,
					m = p.scroller,
					y = m.scrollWidth > m.clientWidth,
					_ = m.scrollHeight > m.clientHeight;
				if ((s && y) || (l && _)) {
					if (l && z && g) {
						e: for (var N = i.target, k = p.view; N != m; N = N.parentNode)
							for (var U = 0; U < k.length; U++)
								if (k[U].node == N) {
									n.display.currentWheelTarget = N;
									break e;
								}
					}
					if (s && !r && !C && h != null) {
						l && _ && ko(n, Math.max(0, m.scrollTop + l * h)),
							Ni(n, Math.max(0, m.scrollLeft + s * h)),
							(!l || (l && _)) && We(i),
							(p.wheelStartX = null);
						return;
					}
					if (l && h != null) {
						var B = l * h,
							q = n.doc.scrollTop,
							$ = q + p.wrapper.clientHeight;
						B < 0
							? (q = Math.max(0, q + B - 50))
							: ($ = Math.min(n.doc.height, $ + B + 50)),
							zu(n, {
								top: q,
								bottom: $,
							});
					}
					ma < 20 &&
						i.deltaMode !== 0 &&
						(p.wheelStartX == null
							? ((p.wheelStartX = m.scrollLeft),
							  (p.wheelStartY = m.scrollTop),
							  (p.wheelDX = s),
							  (p.wheelDY = l),
							  setTimeout(function () {
									if (p.wheelStartX != null) {
										var oe = m.scrollLeft - p.wheelStartX,
											he = m.scrollTop - p.wheelStartY,
											ge =
												(he && p.wheelDY && he / p.wheelDY) ||
												(oe && p.wheelDX && oe / p.wheelDX);
										(p.wheelStartX = p.wheelStartY = null),
											ge && ((Nr = (Nr * ma + ge) / (ma + 1)), ++ma);
									}
							  }, 200))
							: ((p.wheelDX += s), (p.wheelDY += l)));
				}
			}
			var bn = function (n, i) {
				(this.ranges = n), (this.primIndex = i);
			};
			(bn.prototype.primary = function () {
				return this.ranges[this.primIndex];
			}),
				(bn.prototype.equals = function (n) {
					if (n == this) return !0;
					if (
						n.primIndex != this.primIndex ||
						n.ranges.length != this.ranges.length
					)
						return !1;
					for (var i = 0; i < this.ranges.length; i++) {
						var a = this.ranges[i],
							s = n.ranges[i];
						if (!gu(a.anchor, s.anchor) || !gu(a.head, s.head)) return !1;
					}
					return !0;
				}),
				(bn.prototype.deepCopy = function () {
					for (var n = [], i = 0; i < this.ranges.length; i++)
						n[i] = new $e(mu(this.ranges[i].anchor), mu(this.ranges[i].head));
					return new bn(n, this.primIndex);
				}),
				(bn.prototype.somethingSelected = function () {
					for (var n = 0; n < this.ranges.length; n++)
						if (!this.ranges[n].empty()) return !0;
					return !1;
				}),
				(bn.prototype.contains = function (n, i) {
					i || (i = n);
					for (var a = 0; a < this.ranges.length; a++) {
						var s = this.ranges[a];
						if (Le(i, s.from()) >= 0 && Le(n, s.to()) <= 0) return a;
					}
					return -1;
				});
			var $e = function (n, i) {
				(this.anchor = n), (this.head = i);
			};
			($e.prototype.from = function () {
				return $s(this.anchor, this.head);
			}),
				($e.prototype.to = function () {
					return Js(this.anchor, this.head);
				}),
				($e.prototype.empty = function () {
					return (
						this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
					);
				});
			function qn(n, i, a) {
				var s = n && n.options.selectionsMayTouch,
					l = i[a];
				i.sort(function (U, B) {
					return Le(U.from(), B.from());
				}),
					(a = fe(i, l));
				for (var h = 1; h < i.length; h++) {
					var p = i[h],
						m = i[h - 1],
						y = Le(m.to(), p.from());
					if (s && !p.empty() ? y > 0 : y >= 0) {
						var _ = $s(m.from(), p.from()),
							N = Js(m.to(), p.to()),
							k = m.empty() ? p.from() == p.head : m.from() == m.head;
						h <= a && --a, i.splice(--h, 2, new $e(k ? N : _, k ? _ : N));
					}
				}
				return new bn(i, a);
			}
			function qr(n, i) {
				return new bn([new $e(n, i || n)], 0);
			}
			function Xr(n) {
				return n.text
					? ne(
							n.from.line + n.text.length - 1,
							De(n.text).length + (n.text.length == 1 ? n.from.ch : 0)
					  )
					: n.to;
			}
			function T9(n, i) {
				if (Le(n, i.from) < 0) return n;
				if (Le(n, i.to) <= 0) return Xr(i);
				var a = n.line + i.text.length - (i.to.line - i.from.line) - 1,
					s = n.ch;
				return n.line == i.to.line && (s += Xr(i).ch - i.to.ch), ne(a, s);
			}
			function Yu(n, i) {
				for (var a = [], s = 0; s < n.sel.ranges.length; s++) {
					var l = n.sel.ranges[s];
					a.push(new $e(T9(l.anchor, i), T9(l.head, i)));
				}
				return qn(n.cm, a, n.sel.primIndex);
			}
			function E9(n, i, a) {
				return n.line == i.line
					? ne(a.line, n.ch - i.ch + a.ch)
					: ne(a.line + (n.line - i.line), n.ch);
			}
			function Yy(n, i, a) {
				for (var s = [], l = ne(n.first, 0), h = l, p = 0; p < i.length; p++) {
					var m = i[p],
						y = E9(m.from, l, h),
						_ = E9(Xr(m), l, h);
					if (((l = m.to), (h = _), a == 'around')) {
						var N = n.sel.ranges[p],
							k = Le(N.head, N.anchor) < 0;
						s[p] = new $e(k ? _ : y, k ? y : _);
					} else s[p] = new $e(y, y);
				}
				return new bn(s, n.sel.primIndex);
			}
			function qu(n) {
				(n.doc.mode = fu(n.options, n.doc.modeOption)), Mo(n);
			}
			function Mo(n) {
				n.doc.iter(function (i) {
					i.stateAfter && (i.stateAfter = null), i.styles && (i.styles = null);
				}),
					(n.doc.modeFrontier = n.doc.highlightFrontier = n.doc.first),
					Lo(n, 100),
					n.state.modeGen++,
					n.curOp && on(n);
			}
			function v9(n, i) {
				return (
					i.from.ch == 0 &&
					i.to.ch == 0 &&
					De(i.text) == '' &&
					(!n.cm || n.cm.options.wholeLineUpdateBefore)
				);
			}
			function Xu(n, i, a, s) {
				function l(ge) {
					return a ? a[ge] : null;
				}
				function h(ge, de, Te) {
					ey(ge, de, Te, s), Dt(ge, 'change', ge, i);
				}
				function p(ge, de) {
					for (var Te = [], xe = ge; xe < de; ++xe)
						Te.push(new f1(_[xe], l(xe), s));
					return Te;
				}
				var m = i.from,
					y = i.to,
					_ = i.text,
					N = Se(n, m.line),
					k = Se(n, y.line),
					U = De(_),
					B = l(_.length - 1),
					q = y.line - m.line;
				if (i.full)
					n.insert(0, p(0, _.length)), n.remove(_.length, n.size - _.length);
				else if (v9(n, i)) {
					var $ = p(0, _.length - 1);
					h(k, k.text, B),
						q && n.remove(m.line, q),
						$.length && n.insert(m.line, $);
				} else if (N == k)
					if (_.length == 1)
						h(N, N.text.slice(0, m.ch) + U + N.text.slice(y.ch), B);
					else {
						var oe = p(1, _.length - 1);
						oe.push(new f1(U + N.text.slice(y.ch), B, s)),
							h(N, N.text.slice(0, m.ch) + _[0], l(0)),
							n.insert(m.line + 1, oe);
					}
				else if (_.length == 1)
					h(N, N.text.slice(0, m.ch) + _[0] + k.text.slice(y.ch), l(0)),
						n.remove(m.line + 1, q);
				else {
					h(N, N.text.slice(0, m.ch) + _[0], l(0)),
						h(k, U + k.text.slice(y.ch), B);
					var he = p(1, _.length - 1);
					q > 1 && n.remove(m.line + 1, q - 1), n.insert(m.line + 1, he);
				}
				Dt(n, 'change', n, i);
			}
			function Qr(n, i, a) {
				function s(l, h, p) {
					if (l.linked)
						for (var m = 0; m < l.linked.length; ++m) {
							var y = l.linked[m];
							if (y.doc != h) {
								var _ = p && y.sharedHist;
								(a && !_) || (i(y.doc, _), s(y.doc, l, _));
							}
						}
				}
				s(n, null, !0);
			}
			function y9(n, i) {
				if (i.cm) throw new Error('This document is already in use.');
				(n.doc = i),
					(i.cm = n),
					Ru(n),
					qu(n),
					A9(n),
					(n.options.direction = i.direction),
					n.options.lineWrapping || Cu(n),
					(n.options.mode = i.modeOption),
					on(n);
			}
			function A9(n) {
				(n.doc.direction == 'rtl' ? Ae : V)(
					n.display.lineDiv,
					'CodeMirror-rtl'
				);
			}
			function qy(n) {
				gn(n, function () {
					A9(n), on(n);
				});
			}
			function Ta(n) {
				(this.done = []),
					(this.undone = []),
					(this.undoDepth = n ? n.undoDepth : 1 / 0),
					(this.lastModTime = this.lastSelTime = 0),
					(this.lastOp = this.lastSelOp = null),
					(this.lastOrigin = this.lastSelOrigin = null),
					(this.generation = this.maxGeneration = n ? n.maxGeneration : 1);
			}
			function Qu(n, i) {
				var a = {
					from: mu(i.from),
					to: Xr(i),
					text: yi(n, i.from, i.to),
				};
				return (
					S9(n, a, i.from.line, i.to.line + 1),
					Qr(
						n,
						function (s) {
							return S9(s, a, i.from.line, i.to.line + 1);
						},
						!0
					),
					a
				);
			}
			function _9(n) {
				for (; n.length; ) {
					var i = De(n);
					if (i.ranges) n.pop();
					else break;
				}
			}
			function Xy(n, i) {
				if (i) return _9(n.done), De(n.done);
				if (n.done.length && !De(n.done).ranges) return De(n.done);
				if (n.done.length > 1 && !n.done[n.done.length - 2].ranges)
					return n.done.pop(), De(n.done);
			}
			function C9(n, i, a, s) {
				var l = n.history;
				l.undone.length = 0;
				var h = +new Date(),
					p,
					m;
				if (
					(l.lastOp == s ||
						(l.lastOrigin == i.origin &&
							i.origin &&
							((i.origin.charAt(0) == '+' &&
								l.lastModTime >
									h - (n.cm ? n.cm.options.historyEventDelay : 500)) ||
								i.origin.charAt(0) == '*'))) &&
					(p = Xy(l, l.lastOp == s))
				)
					(m = De(p.changes)),
						Le(i.from, i.to) == 0 && Le(i.from, m.to) == 0
							? (m.to = Xr(i))
							: p.changes.push(Qu(n, i));
				else {
					var y = De(l.done);
					for (
						(!y || !y.ranges) && Ea(n.sel, l.done),
							p = {
								changes: [Qu(n, i)],
								generation: l.generation,
							},
							l.done.push(p);
						l.done.length > l.undoDepth;

					)
						l.done.shift(), l.done[0].ranges || l.done.shift();
				}
				l.done.push(a),
					(l.generation = ++l.maxGeneration),
					(l.lastModTime = l.lastSelTime = h),
					(l.lastOp = l.lastSelOp = s),
					(l.lastOrigin = l.lastSelOrigin = i.origin),
					m || re(n, 'historyAdded');
			}
			function Qy(n, i, a, s) {
				var l = i.charAt(0);
				return (
					l == '*' ||
					(l == '+' &&
						a.ranges.length == s.ranges.length &&
						a.somethingSelected() == s.somethingSelected() &&
						new Date() - n.history.lastSelTime <=
							(n.cm ? n.cm.options.historyEventDelay : 500))
				);
			}
			function Vy(n, i, a, s) {
				var l = n.history,
					h = s && s.origin;
				a == l.lastSelOp ||
				(h &&
					l.lastSelOrigin == h &&
					((l.lastModTime == l.lastSelTime && l.lastOrigin == h) ||
						Qy(n, h, De(l.done), i)))
					? (l.done[l.done.length - 1] = i)
					: Ea(i, l.done),
					(l.lastSelTime = +new Date()),
					(l.lastSelOrigin = h),
					(l.lastSelOp = a),
					s && s.clearRedo !== !1 && _9(l.undone);
			}
			function Ea(n, i) {
				var a = De(i);
				(a && a.ranges && a.equals(n)) || i.push(n);
			}
			function S9(n, i, a, s) {
				var l = i['spans_' + n.id],
					h = 0;
				n.iter(
					Math.max(n.first, a),
					Math.min(n.first + n.size, s),
					function (p) {
						p.markedSpans &&
							((l || (l = i['spans_' + n.id] = {}))[h] = p.markedSpans),
							++h;
					}
				);
			}
			function Zy(n) {
				if (!n) return null;
				for (var i, a = 0; a < n.length; ++a)
					n[a].marker.explicitlyCleared
						? i || (i = n.slice(0, a))
						: i && i.push(n[a]);
				return i ? (i.length ? i : null) : n;
			}
			function Jy(n, i) {
				var a = i['spans_' + n.id];
				if (!a) return null;
				for (var s = [], l = 0; l < i.text.length; ++l) s.push(Zy(a[l]));
				return s;
			}
			function b9(n, i) {
				var a = Jy(n, i),
					s = vu(n, i);
				if (!a) return s;
				if (!s) return a;
				for (var l = 0; l < a.length; ++l) {
					var h = a[l],
						p = s[l];
					if (h && p)
						e: for (var m = 0; m < p.length; ++m) {
							for (var y = p[m], _ = 0; _ < h.length; ++_)
								if (h[_].marker == y.marker) continue e;
							h.push(y);
						}
					else p && (a[l] = p);
				}
				return a;
			}
			function v1(n, i, a) {
				for (var s = [], l = 0; l < n.length; ++l) {
					var h = n[l];
					if (h.ranges) {
						s.push(a ? bn.prototype.deepCopy.call(h) : h);
						continue;
					}
					var p = h.changes,
						m = [];
					s.push({
						changes: m,
					});
					for (var y = 0; y < p.length; ++y) {
						var _ = p[y],
							N = void 0;
						if (
							(m.push({
								from: _.from,
								to: _.to,
								text: _.text,
							}),
							i)
						)
							for (var k in _)
								(N = k.match(/^spans_(\d+)$/)) &&
									fe(i, Number(N[1])) > -1 &&
									((De(m)[k] = _[k]), delete _[k]);
					}
				}
				return s;
			}
			function Vu(n, i, a, s) {
				if (s) {
					var l = n.anchor;
					if (a) {
						var h = Le(i, l) < 0;
						h != Le(a, l) < 0
							? ((l = i), (i = a))
							: h != Le(i, a) < 0 && (i = a);
					}
					return new $e(l, i);
				} else return new $e(a || i, i);
			}
			function va(n, i, a, s, l) {
				l == null && (l = n.cm && (n.cm.display.shift || n.extend)),
					Qt(n, new bn([Vu(n.sel.primary(), i, a, l)], 0), s);
			}
			function N9(n, i, a) {
				for (
					var s = [], l = n.cm && (n.cm.display.shift || n.extend), h = 0;
					h < n.sel.ranges.length;
					h++
				)
					s[h] = Vu(n.sel.ranges[h], i[h], null, l);
				var p = qn(n.cm, s, n.sel.primIndex);
				Qt(n, p, a);
			}
			function Zu(n, i, a, s) {
				var l = n.sel.ranges.slice(0);
				(l[i] = a), Qt(n, qn(n.cm, l, n.sel.primIndex), s);
			}
			function x9(n, i, a, s) {
				Qt(n, qr(i, a), s);
			}
			function $y(n, i, a) {
				var s = {
					ranges: i.ranges,
					update: function (l) {
						this.ranges = [];
						for (var h = 0; h < l.length; h++)
							this.ranges[h] = new $e(Ie(n, l[h].anchor), Ie(n, l[h].head));
					},
					origin: a && a.origin,
				};
				return (
					re(n, 'beforeSelectionChange', n, s),
					n.cm && re(n.cm, 'beforeSelectionChange', n.cm, s),
					s.ranges != i.ranges ? qn(n.cm, s.ranges, s.ranges.length - 1) : i
				);
			}
			function k9(n, i, a) {
				var s = n.history.done,
					l = De(s);
				l && l.ranges ? ((s[s.length - 1] = i), ya(n, i, a)) : Qt(n, i, a);
			}
			function Qt(n, i, a) {
				ya(n, i, a), Vy(n, n.sel, n.cm ? n.cm.curOp.id : NaN, a);
			}
			function ya(n, i, a) {
				(ve(n, 'beforeSelectionChange') ||
					(n.cm && ve(n.cm, 'beforeSelectionChange'))) &&
					(i = $y(n, i, a));
				var s =
					(a && a.bias) ||
					(Le(i.primary().head, n.sel.primary().head) < 0 ? -1 : 1);
				O9(n, L9(n, i, s, !0)),
					!(a && a.scroll === !1) &&
						n.cm &&
						n.cm.getOption('readOnly') != 'nocursor' &&
						T1(n.cm);
			}
			function O9(n, i) {
				i.equals(n.sel) ||
					((n.sel = i),
					n.cm &&
						((n.cm.curOp.updateInput = 1),
						(n.cm.curOp.selectionChanged = !0),
						ze(n.cm)),
					Dt(n, 'cursorActivity', n));
			}
			function w9(n) {
				O9(n, L9(n, n.sel, null, !1));
			}
			function L9(n, i, a, s) {
				for (var l, h = 0; h < i.ranges.length; h++) {
					var p = i.ranges[h],
						m = i.ranges.length == n.sel.ranges.length && n.sel.ranges[h],
						y = Aa(n, p.anchor, m && m.anchor, a, s),
						_ = Aa(n, p.head, m && m.head, a, s);
					(l || y != p.anchor || _ != p.head) &&
						(l || (l = i.ranges.slice(0, h)), (l[h] = new $e(y, _)));
				}
				return l ? qn(n.cm, l, i.primIndex) : i;
			}
			function y1(n, i, a, s, l) {
				var h = Se(n, i.line);
				if (h.markedSpans)
					for (var p = 0; p < h.markedSpans.length; ++p) {
						var m = h.markedSpans[p],
							y = m.marker,
							_ = 'selectLeft' in y ? !y.selectLeft : y.inclusiveLeft,
							N = 'selectRight' in y ? !y.selectRight : y.inclusiveRight;
						if (
							(m.from == null || (_ ? m.from <= i.ch : m.from < i.ch)) &&
							(m.to == null || (N ? m.to >= i.ch : m.to > i.ch))
						) {
							if (l && (re(y, 'beforeCursorEnter'), y.explicitlyCleared))
								if (h.markedSpans) {
									--p;
									continue;
								} else break;
							if (!y.atomic) continue;
							if (a) {
								var k = y.find(s < 0 ? 1 : -1),
									U = void 0;
								if (
									((s < 0 ? N : _) &&
										(k = I9(n, k, -s, k && k.line == i.line ? h : null)),
									k &&
										k.line == i.line &&
										(U = Le(k, a)) &&
										(s < 0 ? U < 0 : U > 0))
								)
									return y1(n, k, i, s, l);
							}
							var B = y.find(s < 0 ? -1 : 1);
							return (
								(s < 0 ? _ : N) &&
									(B = I9(n, B, s, B.line == i.line ? h : null)),
								B ? y1(n, B, i, s, l) : null
							);
						}
					}
				return i;
			}
			function Aa(n, i, a, s, l) {
				var h = s || 1,
					p =
						y1(n, i, a, h, l) ||
						(!l && y1(n, i, a, h, !0)) ||
						y1(n, i, a, -h, l) ||
						(!l && y1(n, i, a, -h, !0));
				return p || ((n.cantEdit = !0), ne(n.first, 0));
			}
			function I9(n, i, a, s) {
				return a < 0 && i.ch == 0
					? i.line > n.first
						? Ie(n, ne(i.line - 1))
						: null
					: a > 0 && i.ch == (s || Se(n, i.line)).text.length
					? i.line < n.first + n.size - 1
						? ne(i.line + 1, 0)
						: null
					: new ne(i.line, i.ch + a);
			}
			function M9(n) {
				n.setSelection(ne(n.firstLine(), 0), ne(n.lastLine()), Ge);
			}
			function R9(n, i, a) {
				var s = {
					canceled: !1,
					from: i.from,
					to: i.to,
					text: i.text,
					origin: i.origin,
					cancel: function () {
						return (s.canceled = !0);
					},
				};
				return (
					a &&
						(s.update = function (l, h, p, m) {
							l && (s.from = Ie(n, l)),
								h && (s.to = Ie(n, h)),
								p && (s.text = p),
								m !== void 0 && (s.origin = m);
						}),
					re(n, 'beforeChange', n, s),
					n.cm && re(n.cm, 'beforeChange', n.cm, s),
					s.canceled
						? (n.cm && (n.cm.curOp.updateInput = 2), null)
						: {
								from: s.from,
								to: s.to,
								text: s.text,
								origin: s.origin,
						  }
				);
			}
			function A1(n, i, a) {
				if (n.cm) {
					if (!n.cm.curOp) return Pt(n.cm, A1)(n, i, a);
					if (n.cm.state.suppressEdits) return;
				}
				if (
					!(
						(ve(n, 'beforeChange') || (n.cm && ve(n.cm, 'beforeChange'))) &&
						((i = R9(n, i, !0)), !i)
					)
				) {
					var s = bp && !a && V7(n, i.from, i.to);
					if (s)
						for (var l = s.length - 1; l >= 0; --l)
							D9(n, {
								from: s[l].from,
								to: s[l].to,
								text: l ? [''] : i.text,
								origin: i.origin,
							});
					else D9(n, i);
				}
			}
			function D9(n, i) {
				if (!(i.text.length == 1 && i.text[0] == '' && Le(i.from, i.to) == 0)) {
					var a = Yu(n, i);
					C9(n, i, a, n.cm ? n.cm.curOp.id : NaN), Ro(n, i, a, vu(n, i));
					var s = [];
					Qr(n, function (l, h) {
						!h &&
							fe(s, l.history) == -1 &&
							(B9(l.history, i), s.push(l.history)),
							Ro(l, i, null, vu(l, i));
					});
				}
			}
			function _a(n, i, a) {
				var s = n.cm && n.cm.state.suppressEdits;
				if (!(s && !a)) {
					for (
						var l = n.history,
							h,
							p = n.sel,
							m = i == 'undo' ? l.done : l.undone,
							y = i == 'undo' ? l.undone : l.done,
							_ = 0;
						_ < m.length &&
						((h = m[_]), !(a ? h.ranges && !h.equals(n.sel) : !h.ranges));
						_++
					);
					if (_ != m.length) {
						for (l.lastOrigin = l.lastSelOrigin = null; ; )
							if (((h = m.pop()), h.ranges)) {
								if ((Ea(h, y), a && !h.equals(n.sel))) {
									Qt(n, h, {
										clearRedo: !1,
									});
									return;
								}
								p = h;
							} else if (s) {
								m.push(h);
								return;
							} else break;
						var N = [];
						Ea(p, y),
							y.push({
								changes: N,
								generation: l.generation,
							}),
							(l.generation = h.generation || ++l.maxGeneration);
						for (
							var k =
									ve(n, 'beforeChange') || (n.cm && ve(n.cm, 'beforeChange')),
								U = function ($) {
									var oe = h.changes[$];
									if (((oe.origin = i), k && !R9(n, oe, !1)))
										return (m.length = 0), {};
									N.push(Qu(n, oe));
									var he = $ ? Yu(n, oe) : De(m);
									Ro(n, oe, he, b9(n, oe)),
										!$ &&
											n.cm &&
											n.cm.scrollIntoView({
												from: oe.from,
												to: Xr(oe),
											});
									var ge = [];
									Qr(n, function (de, Te) {
										!Te &&
											fe(ge, de.history) == -1 &&
											(B9(de.history, oe), ge.push(de.history)),
											Ro(de, oe, null, b9(de, oe));
									});
								},
								B = h.changes.length - 1;
							B >= 0;
							--B
						) {
							var q = U(B);
							if (q) return q.v;
						}
					}
				}
			}
			function P9(n, i) {
				if (
					i != 0 &&
					((n.first += i),
					(n.sel = new bn(
						Gt(n.sel.ranges, function (l) {
							return new $e(
								ne(l.anchor.line + i, l.anchor.ch),
								ne(l.head.line + i, l.head.ch)
							);
						}),
						n.sel.primIndex
					)),
					n.cm)
				) {
					on(n.cm, n.first, n.first - i, i);
					for (var a = n.cm.display, s = a.viewFrom; s < a.viewTo; s++)
						jr(n.cm, s, 'gutter');
				}
			}
			function Ro(n, i, a, s) {
				if (n.cm && !n.cm.curOp) return Pt(n.cm, Ro)(n, i, a, s);
				if (i.to.line < n.first) {
					P9(n, i.text.length - 1 - (i.to.line - i.from.line));
					return;
				}
				if (!(i.from.line > n.lastLine())) {
					if (i.from.line < n.first) {
						var l = i.text.length - 1 - (n.first - i.from.line);
						P9(n, l),
							(i = {
								from: ne(n.first, 0),
								to: ne(i.to.line + l, i.to.ch),
								text: [De(i.text)],
								origin: i.origin,
							});
					}
					var h = n.lastLine();
					i.to.line > h &&
						(i = {
							from: i.from,
							to: ne(h, Se(n, h).text.length),
							text: [i.text[0]],
							origin: i.origin,
						}),
						(i.removed = yi(n, i.from, i.to)),
						a || (a = Yu(n, i)),
						n.cm ? eA(n.cm, i, s) : Xu(n, i, s),
						ya(n, a, Ge),
						n.cantEdit && Aa(n, ne(n.firstLine(), 0)) && (n.cantEdit = !1);
				}
			}
			function eA(n, i, a) {
				var s = n.doc,
					l = n.display,
					h = i.from,
					p = i.to,
					m = !1,
					y = h.line;
				n.options.lineWrapping ||
					((y = tt(jn(Se(s, h.line)))),
					s.iter(y, p.line + 1, function (B) {
						if (B == l.maxLine) return (m = !0), !0;
					})),
					s.sel.contains(i.from, i.to) > -1 && ze(n),
					Xu(s, i, a, t9(n)),
					n.options.lineWrapping ||
						(s.iter(y, h.line + i.text.length, function (B) {
							var q = oa(B);
							q > l.maxLineLength &&
								((l.maxLine = B),
								(l.maxLineLength = q),
								(l.maxLineChanged = !0),
								(m = !1));
						}),
						m && (n.curOp.updateMaxLine = !0)),
					W7(s, h.line),
					Lo(n, 400);
				var _ = i.text.length - (p.line - h.line) - 1;
				i.full
					? on(n)
					: h.line == p.line && i.text.length == 1 && !v9(n.doc, i)
					? jr(n, h.line, 'text')
					: on(n, h.line, p.line + 1, _);
				var N = ve(n, 'changes'),
					k = ve(n, 'change');
				if (k || N) {
					var U = {
						from: h,
						to: p,
						text: i.text,
						removed: i.removed,
						origin: i.origin,
					};
					k && Dt(n, 'change', n, U),
						N && (n.curOp.changeObjs || (n.curOp.changeObjs = [])).push(U);
				}
				n.display.selForContextMenu = null;
			}
			function _1(n, i, a, s, l) {
				var h;
				s || (s = a),
					Le(s, a) < 0 && ((h = [s, a]), (a = h[0]), (s = h[1])),
					typeof i == 'string' && (i = n.splitLines(i)),
					A1(n, {
						from: a,
						to: s,
						text: i,
						origin: l,
					});
			}
			function F9(n, i, a, s) {
				a < n.line ? (n.line += s) : i < n.line && ((n.line = i), (n.ch = 0));
			}
			function H9(n, i, a, s) {
				for (var l = 0; l < n.length; ++l) {
					var h = n[l],
						p = !0;
					if (h.ranges) {
						h.copied || ((h = n[l] = h.deepCopy()), (h.copied = !0));
						for (var m = 0; m < h.ranges.length; m++)
							F9(h.ranges[m].anchor, i, a, s), F9(h.ranges[m].head, i, a, s);
						continue;
					}
					for (var y = 0; y < h.changes.length; ++y) {
						var _ = h.changes[y];
						if (a < _.from.line)
							(_.from = ne(_.from.line + s, _.from.ch)),
								(_.to = ne(_.to.line + s, _.to.ch));
						else if (i <= _.to.line) {
							p = !1;
							break;
						}
					}
					p || (n.splice(0, l + 1), (l = 0));
				}
			}
			function B9(n, i) {
				var a = i.from.line,
					s = i.to.line,
					l = i.text.length - (s - a) - 1;
				H9(n.done, a, s, l), H9(n.undone, a, s, l);
			}
			function Do(n, i, a, s) {
				var l = i,
					h = i;
				return (
					typeof i == 'number' ? (h = Se(n, mp(n, i))) : (l = tt(i)),
					l == null ? null : (s(h, l) && n.cm && jr(n.cm, l, a), h)
				);
			}
			function Po(n) {
				(this.lines = n), (this.parent = null);
				for (var i = 0, a = 0; a < n.length; ++a)
					(n[a].parent = this), (i += n[a].height);
				this.height = i;
			}
			Po.prototype = {
				chunkSize: function () {
					return this.lines.length;
				},
				removeInner: function (n, i) {
					for (var a = n, s = n + i; a < s; ++a) {
						var l = this.lines[a];
						(this.height -= l.height), ty(l), Dt(l, 'delete');
					}
					this.lines.splice(n, i);
				},
				collapse: function (n) {
					n.push.apply(n, this.lines);
				},
				insertInner: function (n, i, a) {
					(this.height += a),
						(this.lines = this.lines
							.slice(0, n)
							.concat(i)
							.concat(this.lines.slice(n)));
					for (var s = 0; s < i.length; ++s) i[s].parent = this;
				},
				iterN: function (n, i, a) {
					for (var s = n + i; n < s; ++n) if (a(this.lines[n])) return !0;
				},
			};
			function Fo(n) {
				this.children = n;
				for (var i = 0, a = 0, s = 0; s < n.length; ++s) {
					var l = n[s];
					(i += l.chunkSize()), (a += l.height), (l.parent = this);
				}
				(this.size = i), (this.height = a), (this.parent = null);
			}
			Fo.prototype = {
				chunkSize: function () {
					return this.size;
				},
				removeInner: function (n, i) {
					this.size -= i;
					for (var a = 0; a < this.children.length; ++a) {
						var s = this.children[a],
							l = s.chunkSize();
						if (n < l) {
							var h = Math.min(i, l - n),
								p = s.height;
							if (
								(s.removeInner(n, h),
								(this.height -= p - s.height),
								l == h && (this.children.splice(a--, 1), (s.parent = null)),
								(i -= h) == 0)
							)
								break;
							n = 0;
						} else n -= l;
					}
					if (
						this.size - i < 25 &&
						(this.children.length > 1 || !(this.children[0] instanceof Po))
					) {
						var m = [];
						this.collapse(m),
							(this.children = [new Po(m)]),
							(this.children[0].parent = this);
					}
				},
				collapse: function (n) {
					for (var i = 0; i < this.children.length; ++i)
						this.children[i].collapse(n);
				},
				insertInner: function (n, i, a) {
					(this.size += i.length), (this.height += a);
					for (var s = 0; s < this.children.length; ++s) {
						var l = this.children[s],
							h = l.chunkSize();
						if (n <= h) {
							if ((l.insertInner(n, i, a), l.lines && l.lines.length > 50)) {
								for (
									var p = (l.lines.length % 25) + 25, m = p;
									m < l.lines.length;

								) {
									var y = new Po(l.lines.slice(m, (m += 25)));
									(l.height -= y.height),
										this.children.splice(++s, 0, y),
										(y.parent = this);
								}
								(l.lines = l.lines.slice(0, p)), this.maybeSpill();
							}
							break;
						}
						n -= h;
					}
				},
				maybeSpill: function () {
					if (!(this.children.length <= 10)) {
						var n = this;
						do {
							var i = n.children.splice(n.children.length - 5, 5),
								a = new Fo(i);
							if (n.parent) {
								(n.size -= a.size), (n.height -= a.height);
								var l = fe(n.parent.children, n);
								n.parent.children.splice(l + 1, 0, a);
							} else {
								var s = new Fo(n.children);
								(s.parent = n), (n.children = [s, a]), (n = s);
							}
							a.parent = n.parent;
						} while (n.children.length > 10);
						n.parent.maybeSpill();
					}
				},
				iterN: function (n, i, a) {
					for (var s = 0; s < this.children.length; ++s) {
						var l = this.children[s],
							h = l.chunkSize();
						if (n < h) {
							var p = Math.min(i, h - n);
							if (l.iterN(n, p, a)) return !0;
							if ((i -= p) == 0) break;
							n = 0;
						} else n -= h;
					}
				},
			};
			var Ho = function (n, i, a) {
				if (a) for (var s in a) a.hasOwnProperty(s) && (this[s] = a[s]);
				(this.doc = n), (this.node = i);
			};
			(Ho.prototype.clear = function () {
				var n = this.doc.cm,
					i = this.line.widgets,
					a = this.line,
					s = tt(a);
				if (!(s == null || !i)) {
					for (var l = 0; l < i.length; ++l) i[l] == this && i.splice(l--, 1);
					i.length || (a.widgets = null);
					var h = So(this);
					or(a, Math.max(0, a.height - h)),
						n &&
							(gn(n, function () {
								U9(n, a, -h), jr(n, s, 'widget');
							}),
							Dt(n, 'lineWidgetCleared', n, this, s));
				}
			}),
				(Ho.prototype.changed = function () {
					var n = this,
						i = this.height,
						a = this.doc.cm,
						s = this.line;
					this.height = null;
					var l = So(this) - i;
					l &&
						(Kr(this.doc, s) || or(s, s.height + l),
						a &&
							gn(a, function () {
								(a.curOp.forceUpdate = !0),
									U9(a, s, l),
									Dt(a, 'lineWidgetChanged', a, n, tt(s));
							}));
				}),
				ut(Ho);
			function U9(n, i, a) {
				Sr(i) < ((n.curOp && n.curOp.scrollTop) || n.doc.scrollTop) && Uu(n, a);
			}
			function tA(n, i, a, s) {
				var l = new Ho(n, a, s),
					h = n.cm;
				return (
					h && l.noHScroll && (h.display.alignWidgets = !0),
					Do(n, i, 'widget', function (p) {
						var m = p.widgets || (p.widgets = []);
						if (
							(l.insertAt == null
								? m.push(l)
								: m.splice(Math.min(m.length, Math.max(0, l.insertAt)), 0, l),
							(l.line = p),
							h && !Kr(n, p))
						) {
							var y = Sr(p) < n.scrollTop;
							or(p, p.height + So(l)),
								y && Uu(h, l.height),
								(h.curOp.forceUpdate = !0);
						}
						return !0;
					}),
					h && Dt(h, 'lineWidgetAdded', h, l, typeof i == 'number' ? i : tt(i)),
					l
				);
			}
			var G9 = 0,
				Vr = function (n, i) {
					(this.lines = []), (this.type = i), (this.doc = n), (this.id = ++G9);
				};
			(Vr.prototype.clear = function () {
				if (!this.explicitlyCleared) {
					var n = this.doc.cm,
						i = n && !n.curOp;
					if ((i && ki(n), ve(this, 'clear'))) {
						var a = this.find();
						a && Dt(this, 'clear', a.from, a.to);
					}
					for (var s = null, l = null, h = 0; h < this.lines.length; ++h) {
						var p = this.lines[h],
							m = Ao(p.markedSpans, this);
						n && !this.collapsed
							? jr(n, tt(p), 'text')
							: n &&
							  (m.to != null && (l = tt(p)), m.from != null && (s = tt(p))),
							(p.markedSpans = Y7(p.markedSpans, m)),
							m.from == null &&
								this.collapsed &&
								!Kr(this.doc, p) &&
								n &&
								or(p, p1(n.display));
					}
					if (n && this.collapsed && !n.options.lineWrapping)
						for (var y = 0; y < this.lines.length; ++y) {
							var _ = jn(this.lines[y]),
								N = oa(_);
							N > n.display.maxLineLength &&
								((n.display.maxLine = _),
								(n.display.maxLineLength = N),
								(n.display.maxLineChanged = !0));
						}
					s != null && n && this.collapsed && on(n, s, l + 1),
						(this.lines.length = 0),
						(this.explicitlyCleared = !0),
						this.atomic &&
							this.doc.cantEdit &&
							((this.doc.cantEdit = !1), n && w9(n.doc)),
						n && Dt(n, 'markerCleared', n, this, s, l),
						i && Oi(n),
						this.parent && this.parent.clear();
				}
			}),
				(Vr.prototype.find = function (n, i) {
					n == null && this.type == 'bookmark' && (n = 1);
					for (var a, s, l = 0; l < this.lines.length; ++l) {
						var h = this.lines[l],
							p = Ao(h.markedSpans, this);
						if (p.from != null && ((a = ne(i ? h : tt(h), p.from)), n == -1))
							return a;
						if (p.to != null && ((s = ne(i ? h : tt(h), p.to)), n == 1))
							return s;
					}
					return (
						a && {
							from: a,
							to: s,
						}
					);
				}),
				(Vr.prototype.changed = function () {
					var n = this,
						i = this.find(-1, !0),
						a = this,
						s = this.doc.cm;
					!i ||
						!s ||
						gn(s, function () {
							var l = i.line,
								h = tt(i.line),
								p = xu(s, h);
							if (
								(p &&
									(qp(p),
									(s.curOp.selectionChanged = s.curOp.forceUpdate = !0)),
								(s.curOp.updateMaxLine = !0),
								!Kr(a.doc, l) && a.height != null)
							) {
								var m = a.height;
								a.height = null;
								var y = So(a) - m;
								y && or(l, l.height + y);
							}
							Dt(s, 'markerChanged', s, n);
						});
				}),
				(Vr.prototype.attachLine = function (n) {
					if (!this.lines.length && this.doc.cm) {
						var i = this.doc.cm.curOp;
						(!i.maybeHiddenMarkers || fe(i.maybeHiddenMarkers, this) == -1) &&
							(i.maybeUnhiddenMarkers || (i.maybeUnhiddenMarkers = [])).push(
								this
							);
					}
					this.lines.push(n);
				}),
				(Vr.prototype.detachLine = function (n) {
					if (
						(this.lines.splice(fe(this.lines, n), 1),
						!this.lines.length && this.doc.cm)
					) {
						var i = this.doc.cm.curOp;
						(i.maybeHiddenMarkers || (i.maybeHiddenMarkers = [])).push(this);
					}
				}),
				ut(Vr);
			function C1(n, i, a, s, l) {
				if (s && s.shared) return nA(n, i, a, s, l);
				if (n.cm && !n.cm.curOp) return Pt(n.cm, C1)(n, i, a, s, l);
				var h = new Vr(n, l),
					p = Le(i, a);
				if ((s && E(s, h, !1), p > 0 || (p == 0 && h.clearWhenEmpty !== !1)))
					return h;
				if (
					(h.replacedWith &&
						((h.collapsed = !0),
						(h.widgetNode = H('span', [h.replacedWith], 'CodeMirror-widget')),
						s.handleMouseEvents ||
							h.widgetNode.setAttribute('cm-ignore-events', 'true'),
						s.insertLeft && (h.widgetNode.insertLeft = !0)),
					h.collapsed)
				) {
					if (
						Lp(n, i.line, i, a, h) ||
						(i.line != a.line && Lp(n, a.line, i, a, h))
					)
						throw new Error(
							'Inserting collapsed marker partially overlapping an existing one'
						);
					j7();
				}
				h.addToHistory &&
					C9(
						n,
						{
							from: i,
							to: a,
							origin: 'markText',
						},
						n.sel,
						NaN
					);
				var m = i.line,
					y = n.cm,
					_;
				if (
					(n.iter(m, a.line + 1, function (k) {
						y &&
							h.collapsed &&
							!y.options.lineWrapping &&
							jn(k) == y.display.maxLine &&
							(_ = !0),
							h.collapsed && m != i.line && or(k, 0),
							q7(
								k,
								new ta(h, m == i.line ? i.ch : null, m == a.line ? a.ch : null),
								n.cm && n.cm.curOp
							),
							++m;
					}),
					h.collapsed &&
						n.iter(i.line, a.line + 1, function (k) {
							Kr(n, k) && or(k, 0);
						}),
					h.clearOnEnter &&
						Ee(h, 'beforeCursorEnter', function () {
							return h.clear();
						}),
					h.readOnly &&
						(K7(),
						(n.history.done.length || n.history.undone.length) &&
							n.clearHistory()),
					h.collapsed && ((h.id = ++G9), (h.atomic = !0)),
					y)
				) {
					if ((_ && (y.curOp.updateMaxLine = !0), h.collapsed))
						on(y, i.line, a.line + 1);
					else if (
						h.className ||
						h.startStyle ||
						h.endStyle ||
						h.css ||
						h.attributes ||
						h.title
					)
						for (var N = i.line; N <= a.line; N++) jr(y, N, 'text');
					h.atomic && w9(y.doc), Dt(y, 'markerAdded', y, h);
				}
				return h;
			}
			var Bo = function (n, i) {
				(this.markers = n), (this.primary = i);
				for (var a = 0; a < n.length; ++a) n[a].parent = this;
			};
			(Bo.prototype.clear = function () {
				if (!this.explicitlyCleared) {
					this.explicitlyCleared = !0;
					for (var n = 0; n < this.markers.length; ++n) this.markers[n].clear();
					Dt(this, 'clear');
				}
			}),
				(Bo.prototype.find = function (n, i) {
					return this.primary.find(n, i);
				}),
				ut(Bo);
			function nA(n, i, a, s, l) {
				(s = E(s)), (s.shared = !1);
				var h = [C1(n, i, a, s, l)],
					p = h[0],
					m = s.widgetNode;
				return (
					Qr(n, function (y) {
						m && (s.widgetNode = m.cloneNode(!0)),
							h.push(C1(y, Ie(y, i), Ie(y, a), s, l));
						for (var _ = 0; _ < y.linked.length; ++_)
							if (y.linked[_].isParent) return;
						p = De(h);
					}),
					new Bo(h, p)
				);
			}
			function z9(n) {
				return n.findMarks(
					ne(n.first, 0),
					n.clipPos(ne(n.lastLine())),
					function (i) {
						return i.parent;
					}
				);
			}
			function rA(n, i) {
				for (var a = 0; a < i.length; a++) {
					var s = i[a],
						l = s.find(),
						h = n.clipPos(l.from),
						p = n.clipPos(l.to);
					if (Le(h, p)) {
						var m = C1(n, h, p, s.primary, s.primary.type);
						s.markers.push(m), (m.parent = s);
					}
				}
			}
			function iA(n) {
				for (
					var i = function (s) {
							var l = n[s],
								h = [l.primary.doc];
							Qr(l.primary.doc, function (y) {
								return h.push(y);
							});
							for (var p = 0; p < l.markers.length; p++) {
								var m = l.markers[p];
								fe(h, m.doc) == -1 &&
									((m.parent = null), l.markers.splice(p--, 1));
							}
						},
						a = 0;
					a < n.length;
					a++
				)
					i(a);
			}
			var oA = 0,
				sn = function (n, i, a, s, l) {
					if (!(this instanceof sn)) return new sn(n, i, a, s, l);
					a == null && (a = 0),
						Fo.call(this, [new Po([new f1('', null)])]),
						(this.first = a),
						(this.scrollTop = this.scrollLeft = 0),
						(this.cantEdit = !1),
						(this.cleanGeneration = 1),
						(this.modeFrontier = this.highlightFrontier = a);
					var h = ne(a, 0);
					(this.sel = qr(h)),
						(this.history = new Ta(null)),
						(this.id = ++oA),
						(this.modeOption = i),
						(this.lineSep = s),
						(this.direction = l == 'rtl' ? 'rtl' : 'ltr'),
						(this.extend = !1),
						typeof n == 'string' && (n = this.splitLines(n)),
						Xu(this, {
							from: h,
							to: h,
							text: n,
						}),
						Qt(this, qr(h), Ge);
				};
			(sn.prototype = zt(Fo.prototype, {
				constructor: sn,
				iter: function (n, i, a) {
					a
						? this.iterN(n - this.first, i - n, a)
						: this.iterN(this.first, this.first + this.size, n);
				},
				insert: function (n, i) {
					for (var a = 0, s = 0; s < i.length; ++s) a += i[s].height;
					this.insertInner(n - this.first, i, a);
				},
				remove: function (n, i) {
					this.removeInner(n - this.first, i);
				},
				getValue: function (n) {
					var i = du(this, this.first, this.first + this.size);
					return n === !1 ? i : i.join(n || this.lineSeparator());
				},
				setValue: Ft(function (n) {
					var i = ne(this.first, 0),
						a = this.first + this.size - 1;
					A1(
						this,
						{
							from: i,
							to: ne(a, Se(this, a).text.length),
							text: this.splitLines(n),
							origin: 'setValue',
							full: !0,
						},
						!0
					),
						this.cm && xo(this.cm, 0, 0),
						Qt(this, qr(i), Ge);
				}),
				replaceRange: function (n, i, a, s) {
					(i = Ie(this, i)), (a = a ? Ie(this, a) : i), _1(this, n, i, a, s);
				},
				getRange: function (n, i, a) {
					var s = yi(this, Ie(this, n), Ie(this, i));
					return a === !1
						? s
						: a === ''
						? s.join('')
						: s.join(a || this.lineSeparator());
				},
				getLine: function (n) {
					var i = this.getLineHandle(n);
					return i && i.text;
				},
				getLineHandle: function (n) {
					if (vo(this, n)) return Se(this, n);
				},
				getLineNumber: function (n) {
					return tt(n);
				},
				getLineHandleVisualStart: function (n) {
					return typeof n == 'number' && (n = Se(this, n)), jn(n);
				},
				lineCount: function () {
					return this.size;
				},
				firstLine: function () {
					return this.first;
				},
				lastLine: function () {
					return this.first + this.size - 1;
				},
				clipPos: function (n) {
					return Ie(this, n);
				},
				getCursor: function (n) {
					var i = this.sel.primary(),
						a;
					return (
						n == null || n == 'head'
							? (a = i.head)
							: n == 'anchor'
							? (a = i.anchor)
							: n == 'end' || n == 'to' || n === !1
							? (a = i.to())
							: (a = i.from()),
						a
					);
				},
				listSelections: function () {
					return this.sel.ranges;
				},
				somethingSelected: function () {
					return this.sel.somethingSelected();
				},
				setCursor: Ft(function (n, i, a) {
					x9(this, Ie(this, typeof n == 'number' ? ne(n, i || 0) : n), null, a);
				}),
				setSelection: Ft(function (n, i, a) {
					x9(this, Ie(this, n), Ie(this, i || n), a);
				}),
				extendSelection: Ft(function (n, i, a) {
					va(this, Ie(this, n), i && Ie(this, i), a);
				}),
				extendSelections: Ft(function (n, i) {
					N9(this, Tp(this, n), i);
				}),
				extendSelectionsBy: Ft(function (n, i) {
					var a = Gt(this.sel.ranges, n);
					N9(this, Tp(this, a), i);
				}),
				setSelections: Ft(function (n, i, a) {
					if (n.length) {
						for (var s = [], l = 0; l < n.length; l++)
							s[l] = new $e(
								Ie(this, n[l].anchor),
								Ie(this, n[l].head || n[l].anchor)
							);
						i == null && (i = Math.min(n.length - 1, this.sel.primIndex)),
							Qt(this, qn(this.cm, s, i), a);
					}
				}),
				addSelection: Ft(function (n, i, a) {
					var s = this.sel.ranges.slice(0);
					s.push(new $e(Ie(this, n), Ie(this, i || n))),
						Qt(this, qn(this.cm, s, s.length - 1), a);
				}),
				getSelection: function (n) {
					for (var i = this.sel.ranges, a, s = 0; s < i.length; s++) {
						var l = yi(this, i[s].from(), i[s].to());
						a = a ? a.concat(l) : l;
					}
					return n === !1 ? a : a.join(n || this.lineSeparator());
				},
				getSelections: function (n) {
					for (var i = [], a = this.sel.ranges, s = 0; s < a.length; s++) {
						var l = yi(this, a[s].from(), a[s].to());
						n !== !1 && (l = l.join(n || this.lineSeparator())), (i[s] = l);
					}
					return i;
				},
				replaceSelection: function (n, i, a) {
					for (var s = [], l = 0; l < this.sel.ranges.length; l++) s[l] = n;
					this.replaceSelections(s, i, a || '+input');
				},
				replaceSelections: Ft(function (n, i, a) {
					for (var s = [], l = this.sel, h = 0; h < l.ranges.length; h++) {
						var p = l.ranges[h];
						s[h] = {
							from: p.from(),
							to: p.to(),
							text: this.splitLines(n[h]),
							origin: a,
						};
					}
					for (
						var m = i && i != 'end' && Yy(this, s, i), y = s.length - 1;
						y >= 0;
						y--
					)
						A1(this, s[y]);
					m ? k9(this, m) : this.cm && T1(this.cm);
				}),
				undo: Ft(function () {
					_a(this, 'undo');
				}),
				redo: Ft(function () {
					_a(this, 'redo');
				}),
				undoSelection: Ft(function () {
					_a(this, 'undo', !0);
				}),
				redoSelection: Ft(function () {
					_a(this, 'redo', !0);
				}),
				setExtending: function (n) {
					this.extend = n;
				},
				getExtending: function () {
					return this.extend;
				},
				historySize: function () {
					for (
						var n = this.history, i = 0, a = 0, s = 0;
						s < n.done.length;
						s++
					)
						n.done[s].ranges || ++i;
					for (var l = 0; l < n.undone.length; l++) n.undone[l].ranges || ++a;
					return {
						undo: i,
						redo: a,
					};
				},
				clearHistory: function () {
					var n = this;
					(this.history = new Ta(this.history)),
						Qr(
							this,
							function (i) {
								return (i.history = n.history);
							},
							!0
						);
				},
				markClean: function () {
					this.cleanGeneration = this.changeGeneration(!0);
				},
				changeGeneration: function (n) {
					return (
						n &&
							(this.history.lastOp =
								this.history.lastSelOp =
								this.history.lastOrigin =
									null),
						this.history.generation
					);
				},
				isClean: function (n) {
					return this.history.generation == (n || this.cleanGeneration);
				},
				getHistory: function () {
					return {
						done: v1(this.history.done),
						undone: v1(this.history.undone),
					};
				},
				setHistory: function (n) {
					var i = (this.history = new Ta(this.history));
					(i.done = v1(n.done.slice(0), null, !0)),
						(i.undone = v1(n.undone.slice(0), null, !0));
				},
				setGutterMarker: Ft(function (n, i, a) {
					return Do(this, n, 'gutter', function (s) {
						var l = s.gutterMarkers || (s.gutterMarkers = {});
						return (l[i] = a), !a && Je(l) && (s.gutterMarkers = null), !0;
					});
				}),
				clearGutter: Ft(function (n) {
					var i = this;
					this.iter(function (a) {
						a.gutterMarkers &&
							a.gutterMarkers[n] &&
							Do(i, a, 'gutter', function () {
								return (
									(a.gutterMarkers[n] = null),
									Je(a.gutterMarkers) && (a.gutterMarkers = null),
									!0
								);
							});
					});
				}),
				lineInfo: function (n) {
					var i;
					if (typeof n == 'number') {
						if (!vo(this, n) || ((i = n), (n = Se(this, n)), !n)) return null;
					} else if (((i = tt(n)), i == null)) return null;
					return {
						line: i,
						handle: n,
						text: n.text,
						gutterMarkers: n.gutterMarkers,
						textClass: n.textClass,
						bgClass: n.bgClass,
						wrapClass: n.wrapClass,
						widgets: n.widgets,
					};
				},
				addLineClass: Ft(function (n, i, a) {
					return Do(this, n, i == 'gutter' ? 'gutter' : 'class', function (s) {
						var l =
							i == 'text'
								? 'textClass'
								: i == 'background'
								? 'bgClass'
								: i == 'gutter'
								? 'gutterClass'
								: 'wrapClass';
						if (!s[l]) s[l] = a;
						else {
							if (te(a).test(s[l])) return !1;
							s[l] += ' ' + a;
						}
						return !0;
					});
				}),
				removeLineClass: Ft(function (n, i, a) {
					return Do(this, n, i == 'gutter' ? 'gutter' : 'class', function (s) {
						var l =
								i == 'text'
									? 'textClass'
									: i == 'background'
									? 'bgClass'
									: i == 'gutter'
									? 'gutterClass'
									: 'wrapClass',
							h = s[l];
						if (h)
							if (a == null) s[l] = null;
							else {
								var p = h.match(te(a));
								if (!p) return !1;
								var m = p.index + p[0].length;
								s[l] =
									h.slice(0, p.index) +
										(!p.index || m == h.length ? '' : ' ') +
										h.slice(m) || null;
							}
						else return !1;
						return !0;
					});
				}),
				addLineWidget: Ft(function (n, i, a) {
					return tA(this, n, i, a);
				}),
				removeLineWidget: function (n) {
					n.clear();
				},
				markText: function (n, i, a) {
					return C1(
						this,
						Ie(this, n),
						Ie(this, i),
						a,
						(a && a.type) || 'range'
					);
				},
				setBookmark: function (n, i) {
					var a = {
						replacedWith: i && (i.nodeType == null ? i.widget : i),
						insertLeft: i && i.insertLeft,
						clearWhenEmpty: !1,
						shared: i && i.shared,
						handleMouseEvents: i && i.handleMouseEvents,
					};
					return (n = Ie(this, n)), C1(this, n, n, a, 'bookmark');
				},
				findMarksAt: function (n) {
					n = Ie(this, n);
					var i = [],
						a = Se(this, n.line).markedSpans;
					if (a)
						for (var s = 0; s < a.length; ++s) {
							var l = a[s];
							(l.from == null || l.from <= n.ch) &&
								(l.to == null || l.to >= n.ch) &&
								i.push(l.marker.parent || l.marker);
						}
					return i;
				},
				findMarks: function (n, i, a) {
					(n = Ie(this, n)), (i = Ie(this, i));
					var s = [],
						l = n.line;
					return (
						this.iter(n.line, i.line + 1, function (h) {
							var p = h.markedSpans;
							if (p)
								for (var m = 0; m < p.length; m++) {
									var y = p[m];
									!(
										(y.to != null && l == n.line && n.ch >= y.to) ||
										(y.from == null && l != n.line) ||
										(y.from != null && l == i.line && y.from >= i.ch)
									) &&
										(!a || a(y.marker)) &&
										s.push(y.marker.parent || y.marker);
								}
							++l;
						}),
						s
					);
				},
				getAllMarks: function () {
					var n = [];
					return (
						this.iter(function (i) {
							var a = i.markedSpans;
							if (a)
								for (var s = 0; s < a.length; ++s)
									a[s].from != null && n.push(a[s].marker);
						}),
						n
					);
				},
				posFromIndex: function (n) {
					var i,
						a = this.first,
						s = this.lineSeparator().length;
					return (
						this.iter(function (l) {
							var h = l.text.length + s;
							if (h > n) return (i = n), !0;
							(n -= h), ++a;
						}),
						Ie(this, ne(a, i))
					);
				},
				indexFromPos: function (n) {
					n = Ie(this, n);
					var i = n.ch;
					if (n.line < this.first || n.ch < 0) return 0;
					var a = this.lineSeparator().length;
					return (
						this.iter(this.first, n.line, function (s) {
							i += s.text.length + a;
						}),
						i
					);
				},
				copy: function (n) {
					var i = new sn(
						du(this, this.first, this.first + this.size),
						this.modeOption,
						this.first,
						this.lineSep,
						this.direction
					);
					return (
						(i.scrollTop = this.scrollTop),
						(i.scrollLeft = this.scrollLeft),
						(i.sel = this.sel),
						(i.extend = !1),
						n &&
							((i.history.undoDepth = this.history.undoDepth),
							i.setHistory(this.getHistory())),
						i
					);
				},
				linkedDoc: function (n) {
					n || (n = {});
					var i = this.first,
						a = this.first + this.size;
					n.from != null && n.from > i && (i = n.from),
						n.to != null && n.to < a && (a = n.to);
					var s = new sn(
						du(this, i, a),
						n.mode || this.modeOption,
						i,
						this.lineSep,
						this.direction
					);
					return (
						n.sharedHist && (s.history = this.history),
						(this.linked || (this.linked = [])).push({
							doc: s,
							sharedHist: n.sharedHist,
						}),
						(s.linked = [
							{
								doc: this,
								isParent: !0,
								sharedHist: n.sharedHist,
							},
						]),
						rA(s, z9(this)),
						s
					);
				},
				unlinkDoc: function (n) {
					if ((n instanceof dt && (n = n.doc), this.linked))
						for (var i = 0; i < this.linked.length; ++i) {
							var a = this.linked[i];
							if (a.doc == n) {
								this.linked.splice(i, 1), n.unlinkDoc(this), iA(z9(this));
								break;
							}
						}
					if (n.history == this.history) {
						var s = [n.id];
						Qr(
							n,
							function (l) {
								return s.push(l.id);
							},
							!0
						),
							(n.history = new Ta(null)),
							(n.history.done = v1(this.history.done, s)),
							(n.history.undone = v1(this.history.undone, s));
					}
				},
				iterLinkedDocs: function (n) {
					Qr(this, n);
				},
				getMode: function () {
					return this.mode;
				},
				getEditor: function () {
					return this.cm;
				},
				splitLines: function (n) {
					return this.lineSep ? n.split(this.lineSep) : lu(n);
				},
				lineSeparator: function () {
					return (
						this.lineSep ||
						`
`
					);
				},
				setDirection: Ft(function (n) {
					n != 'rtl' && (n = 'ltr'),
						n != this.direction &&
							((this.direction = n),
							this.iter(function (i) {
								return (i.order = null);
							}),
							this.cm && qy(this.cm));
				}),
			})),
				(sn.prototype.eachLine = sn.prototype.iter);
			var W9 = 0;
			function sA(n) {
				var i = this;
				if ((K9(i), !(me(i, n) || br(i.display, n)))) {
					We(n), f && (W9 = +new Date());
					var a = Si(i, n, !0),
						s = n.dataTransfer.files;
					if (!(!a || i.isReadOnly()))
						if (s && s.length && window.FileReader && window.File)
							for (
								var l = s.length,
									h = Array(l),
									p = 0,
									m = function () {
										++p == l &&
											Pt(i, function () {
												a = Ie(i.doc, a);
												var B = {
													from: a,
													to: a,
													text: i.doc.splitLines(
														h
															.filter(function (q) {
																return q != null;
															})
															.join(i.doc.lineSeparator())
													),
													origin: 'paste',
												};
												A1(i.doc, B),
													k9(i.doc, qr(Ie(i.doc, a), Ie(i.doc, Xr(B))));
											})();
									},
									y = function (B, q) {
										if (
											i.options.allowDropFileTypes &&
											fe(i.options.allowDropFileTypes, B.type) == -1
										) {
											m();
											return;
										}
										var $ = new FileReader();
										($.onerror = function () {
											return m();
										}),
											($.onload = function () {
												var oe = $.result;
												if (/[\x00-\x08\x0e-\x1f]{2}/.test(oe)) {
													m();
													return;
												}
												(h[q] = oe), m();
											}),
											$.readAsText(B);
									},
									_ = 0;
								_ < s.length;
								_++
							)
								y(s[_], _);
						else {
							if (i.state.draggingText && i.doc.sel.contains(a) > -1) {
								i.state.draggingText(n),
									setTimeout(function () {
										return i.display.input.focus();
									}, 20);
								return;
							}
							try {
								var N = n.dataTransfer.getData('Text');
								if (N) {
									var k;
									if (
										(i.state.draggingText &&
											!i.state.draggingText.copy &&
											(k = i.listSelections()),
										ya(i.doc, qr(a, a)),
										k)
									)
										for (var U = 0; U < k.length; ++U)
											_1(i.doc, '', k[U].anchor, k[U].head, 'drag');
									i.replaceSelection(N, 'around', 'paste'),
										i.display.input.focus();
								}
							} catch {}
						}
				}
			}
			function aA(n, i) {
				if (f && (!n.state.draggingText || +new Date() - W9 < 100)) {
					Sn(i);
					return;
				}
				if (
					!(me(n, i) || br(n.display, i)) &&
					(i.dataTransfer.setData('Text', n.getSelection()),
					(i.dataTransfer.effectAllowed = 'copyMove'),
					i.dataTransfer.setDragImage && !M)
				) {
					var a = G('img', null, null, 'position: fixed; left: 0; top: 0;');
					(a.src =
						'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='),
						C &&
							((a.width = a.height = 1),
							n.display.wrapper.appendChild(a),
							(a._top = a.offsetTop)),
						i.dataTransfer.setDragImage(a, 0, 0),
						C && a.parentNode.removeChild(a);
				}
			}
			function lA(n, i) {
				var a = Si(n, i);
				if (a) {
					var s = document.createDocumentFragment();
					Du(n, a, s),
						n.display.dragCursor ||
							((n.display.dragCursor = G(
								'div',
								null,
								'CodeMirror-cursors CodeMirror-dragcursors'
							)),
							n.display.lineSpace.insertBefore(
								n.display.dragCursor,
								n.display.cursorDiv
							)),
						X(n.display.dragCursor, s);
				}
			}
			function K9(n) {
				n.display.dragCursor &&
					(n.display.lineSpace.removeChild(n.display.dragCursor),
					(n.display.dragCursor = null));
			}
			function j9(n) {
				if (document.getElementsByClassName) {
					for (
						var i = document.getElementsByClassName('CodeMirror'),
							a = [],
							s = 0;
						s < i.length;
						s++
					) {
						var l = i[s].CodeMirror;
						l && a.push(l);
					}
					a.length &&
						a[0].operation(function () {
							for (var h = 0; h < a.length; h++) n(a[h]);
						});
				}
			}
			var Y9 = !1;
			function uA() {
				Y9 || (cA(), (Y9 = !0));
			}
			function cA() {
				var n;
				Ee(window, 'resize', function () {
					n == null &&
						(n = setTimeout(function () {
							(n = null), j9(fA);
						}, 100));
				}),
					Ee(window, 'blur', function () {
						return j9(m1);
					});
			}
			function fA(n) {
				var i = n.display;
				(i.cachedCharWidth = i.cachedTextHeight = i.cachedPaddingH = null),
					(i.scrollbarsClipped = !1),
					n.setSize();
			}
			for (
				var Zr = {
						3: 'Pause',
						8: 'Backspace',
						9: 'Tab',
						13: 'Enter',
						16: 'Shift',
						17: 'Ctrl',
						18: 'Alt',
						19: 'Pause',
						20: 'CapsLock',
						27: 'Esc',
						32: 'Space',
						33: 'PageUp',
						34: 'PageDown',
						35: 'End',
						36: 'Home',
						37: 'Left',
						38: 'Up',
						39: 'Right',
						40: 'Down',
						44: 'PrintScrn',
						45: 'Insert',
						46: 'Delete',
						59: ';',
						61: '=',
						91: 'Mod',
						92: 'Mod',
						93: 'Mod',
						106: '*',
						107: '=',
						109: '-',
						110: '.',
						111: '/',
						145: 'ScrollLock',
						173: '-',
						186: ';',
						187: '=',
						188: ',',
						189: '-',
						190: '.',
						191: '/',
						192: '`',
						219: '[',
						220: '\\',
						221: ']',
						222: "'",
						224: 'Mod',
						63232: 'Up',
						63233: 'Down',
						63234: 'Left',
						63235: 'Right',
						63272: 'Delete',
						63273: 'Home',
						63275: 'End',
						63276: 'PageUp',
						63277: 'PageDown',
						63302: 'Insert',
					},
					Uo = 0;
				Uo < 10;
				Uo++
			)
				Zr[Uo + 48] = Zr[Uo + 96] = String(Uo);
			for (var Ca = 65; Ca <= 90; Ca++) Zr[Ca] = String.fromCharCode(Ca);
			for (var Go = 1; Go <= 12; Go++) Zr[Go + 111] = Zr[Go + 63235] = 'F' + Go;
			var xr = {};
			(xr.basic = {
				Left: 'goCharLeft',
				Right: 'goCharRight',
				Up: 'goLineUp',
				Down: 'goLineDown',
				End: 'goLineEnd',
				Home: 'goLineStartSmart',
				PageUp: 'goPageUp',
				PageDown: 'goPageDown',
				Delete: 'delCharAfter',
				Backspace: 'delCharBefore',
				'Shift-Backspace': 'delCharBefore',
				Tab: 'defaultTab',
				'Shift-Tab': 'indentAuto',
				Enter: 'newlineAndIndent',
				Insert: 'toggleOverwrite',
				Esc: 'singleSelection',
			}),
				(xr.pcDefault = {
					'Ctrl-A': 'selectAll',
					'Ctrl-D': 'deleteLine',
					'Ctrl-Z': 'undo',
					'Shift-Ctrl-Z': 'redo',
					'Ctrl-Y': 'redo',
					'Ctrl-Home': 'goDocStart',
					'Ctrl-End': 'goDocEnd',
					'Ctrl-Up': 'goLineUp',
					'Ctrl-Down': 'goLineDown',
					'Ctrl-Left': 'goGroupLeft',
					'Ctrl-Right': 'goGroupRight',
					'Alt-Left': 'goLineStart',
					'Alt-Right': 'goLineEnd',
					'Ctrl-Backspace': 'delGroupBefore',
					'Ctrl-Delete': 'delGroupAfter',
					'Ctrl-S': 'save',
					'Ctrl-F': 'find',
					'Ctrl-G': 'findNext',
					'Shift-Ctrl-G': 'findPrev',
					'Shift-Ctrl-F': 'replace',
					'Shift-Ctrl-R': 'replaceAll',
					'Ctrl-[': 'indentLess',
					'Ctrl-]': 'indentMore',
					'Ctrl-U': 'undoSelection',
					'Shift-Ctrl-U': 'redoSelection',
					'Alt-U': 'redoSelection',
					fallthrough: 'basic',
				}),
				(xr.emacsy = {
					'Ctrl-F': 'goCharRight',
					'Ctrl-B': 'goCharLeft',
					'Ctrl-P': 'goLineUp',
					'Ctrl-N': 'goLineDown',
					'Ctrl-A': 'goLineStart',
					'Ctrl-E': 'goLineEnd',
					'Ctrl-V': 'goPageDown',
					'Shift-Ctrl-V': 'goPageUp',
					'Ctrl-D': 'delCharAfter',
					'Ctrl-H': 'delCharBefore',
					'Alt-Backspace': 'delWordBefore',
					'Ctrl-K': 'killLine',
					'Ctrl-T': 'transposeChars',
					'Ctrl-O': 'openLine',
				}),
				(xr.macDefault = {
					'Cmd-A': 'selectAll',
					'Cmd-D': 'deleteLine',
					'Cmd-Z': 'undo',
					'Shift-Cmd-Z': 'redo',
					'Cmd-Y': 'redo',
					'Cmd-Home': 'goDocStart',
					'Cmd-Up': 'goDocStart',
					'Cmd-End': 'goDocEnd',
					'Cmd-Down': 'goDocEnd',
					'Alt-Left': 'goGroupLeft',
					'Alt-Right': 'goGroupRight',
					'Cmd-Left': 'goLineLeft',
					'Cmd-Right': 'goLineRight',
					'Alt-Backspace': 'delGroupBefore',
					'Ctrl-Alt-Backspace': 'delGroupAfter',
					'Alt-Delete': 'delGroupAfter',
					'Cmd-S': 'save',
					'Cmd-F': 'find',
					'Cmd-G': 'findNext',
					'Shift-Cmd-G': 'findPrev',
					'Cmd-Alt-F': 'replace',
					'Shift-Cmd-Alt-F': 'replaceAll',
					'Cmd-[': 'indentLess',
					'Cmd-]': 'indentMore',
					'Cmd-Backspace': 'delWrappedLineLeft',
					'Cmd-Delete': 'delWrappedLineRight',
					'Cmd-U': 'undoSelection',
					'Shift-Cmd-U': 'redoSelection',
					'Ctrl-Up': 'goDocStart',
					'Ctrl-Down': 'goDocEnd',
					fallthrough: ['basic', 'emacsy'],
				}),
				(xr.default = z ? xr.macDefault : xr.pcDefault);
			function hA(n) {
				var i = n.split(/-(?!$)/);
				n = i[i.length - 1];
				for (var a, s, l, h, p = 0; p < i.length - 1; p++) {
					var m = i[p];
					if (/^(cmd|meta|m)$/i.test(m)) h = !0;
					else if (/^a(lt)?$/i.test(m)) a = !0;
					else if (/^(c|ctrl|control)$/i.test(m)) s = !0;
					else if (/^s(hift)?$/i.test(m)) l = !0;
					else throw new Error('Unrecognized modifier name: ' + m);
				}
				return (
					a && (n = 'Alt-' + n),
					s && (n = 'Ctrl-' + n),
					h && (n = 'Cmd-' + n),
					l && (n = 'Shift-' + n),
					n
				);
			}
			function dA(n) {
				var i = {};
				for (var a in n)
					if (n.hasOwnProperty(a)) {
						var s = n[a];
						if (/^(name|fallthrough|(de|at)tach)$/.test(a)) continue;
						if (s == '...') {
							delete n[a];
							continue;
						}
						for (var l = Gt(a.split(' '), hA), h = 0; h < l.length; h++) {
							var p = void 0,
								m = void 0;
							h == l.length - 1
								? ((m = l.join(' ')), (p = s))
								: ((m = l.slice(0, h + 1).join(' ')), (p = '...'));
							var y = i[m];
							if (!y) i[m] = p;
							else if (y != p)
								throw new Error('Inconsistent bindings for ' + m);
						}
						delete n[a];
					}
				for (var _ in i) n[_] = i[_];
				return n;
			}
			function S1(n, i, a, s) {
				i = Sa(i);
				var l = i.call ? i.call(n, s) : i[n];
				if (l === !1) return 'nothing';
				if (l === '...') return 'multi';
				if (l != null && a(l)) return 'handled';
				if (i.fallthrough) {
					if (Object.prototype.toString.call(i.fallthrough) != '[object Array]')
						return S1(n, i.fallthrough, a, s);
					for (var h = 0; h < i.fallthrough.length; h++) {
						var p = S1(n, i.fallthrough[h], a, s);
						if (p) return p;
					}
				}
			}
			function q9(n) {
				var i = typeof n == 'string' ? n : Zr[n.keyCode];
				return i == 'Ctrl' || i == 'Alt' || i == 'Shift' || i == 'Mod';
			}
			function X9(n, i, a) {
				var s = n;
				return (
					i.altKey && s != 'Alt' && (n = 'Alt-' + n),
					(L ? i.metaKey : i.ctrlKey) && s != 'Ctrl' && (n = 'Ctrl-' + n),
					(L ? i.ctrlKey : i.metaKey) && s != 'Mod' && (n = 'Cmd-' + n),
					!a && i.shiftKey && s != 'Shift' && (n = 'Shift-' + n),
					n
				);
			}
			function Q9(n, i) {
				if (C && n.keyCode == 34 && n.char) return !1;
				var a = Zr[n.keyCode];
				return a == null || n.altGraphKey
					? !1
					: (n.keyCode == 3 && n.code && (a = n.code), X9(a, n, i));
			}
			function Sa(n) {
				return typeof n == 'string' ? xr[n] : n;
			}
			function b1(n, i) {
				for (var a = n.doc.sel.ranges, s = [], l = 0; l < a.length; l++) {
					for (var h = i(a[l]); s.length && Le(h.from, De(s).to) <= 0; ) {
						var p = s.pop();
						if (Le(p.from, h.from) < 0) {
							h.from = p.from;
							break;
						}
					}
					s.push(h);
				}
				gn(n, function () {
					for (var m = s.length - 1; m >= 0; m--)
						_1(n.doc, '', s[m].from, s[m].to, '+delete');
					T1(n);
				});
			}
			function Ju(n, i, a) {
				var s = lt(n.text, i + a, a);
				return s < 0 || s > n.text.length ? null : s;
			}
			function $u(n, i, a) {
				var s = Ju(n, i.ch, a);
				return s == null ? null : new ne(i.line, s, a < 0 ? 'after' : 'before');
			}
			function ec(n, i, a, s, l) {
				if (n) {
					i.doc.direction == 'rtl' && (l = -l);
					var h = Ne(a, i.doc.direction);
					if (h) {
						var p = l < 0 ? De(h) : h[0],
							m = l < 0 == (p.level == 1),
							y = m ? 'after' : 'before',
							_;
						if (p.level > 0 || i.doc.direction == 'rtl') {
							var N = d1(i, a);
							_ = l < 0 ? a.text.length - 1 : 0;
							var k = lr(i, N, _).top;
							(_ = qe(
								function (U) {
									return lr(i, N, U).top == k;
								},
								l < 0 == (p.level == 1) ? p.from : p.to - 1,
								_
							)),
								y == 'before' && (_ = Ju(a, _, 1));
						} else _ = l < 0 ? p.to : p.from;
						return new ne(s, _, y);
					}
				}
				return new ne(s, l < 0 ? a.text.length : 0, l < 0 ? 'before' : 'after');
			}
			function pA(n, i, a, s) {
				var l = Ne(i, n.doc.direction);
				if (!l) return $u(i, a, s);
				a.ch >= i.text.length
					? ((a.ch = i.text.length), (a.sticky = 'before'))
					: a.ch <= 0 && ((a.ch = 0), (a.sticky = 'after'));
				var h = Y(l, a.ch, a.sticky),
					p = l[h];
				if (
					n.doc.direction == 'ltr' &&
					p.level % 2 == 0 &&
					(s > 0 ? p.to > a.ch : p.from < a.ch)
				)
					return $u(i, a, s);
				var m = function (he, ge) {
						return Ju(i, he instanceof ne ? he.ch : he, ge);
					},
					y,
					_ = function (he) {
						return n.options.lineWrapping
							? ((y = y || d1(n, i)), e9(n, i, y, he))
							: {
									begin: 0,
									end: i.text.length,
							  };
					},
					N = _(a.sticky == 'before' ? m(a, -1) : a.ch);
				if (n.doc.direction == 'rtl' || p.level == 1) {
					var k = (p.level == 1) == s < 0,
						U = m(a, k ? 1 : -1);
					if (
						U != null &&
						(k ? U <= p.to && U <= N.end : U >= p.from && U >= N.begin)
					) {
						var B = k ? 'before' : 'after';
						return new ne(a.line, U, B);
					}
				}
				var q = function (he, ge, de) {
						for (
							var Te = function (st, Ht) {
								return Ht
									? new ne(a.line, m(st, 1), 'before')
									: new ne(a.line, st, 'after');
							};
							he >= 0 && he < l.length;
							he += ge
						) {
							var xe = l[he],
								be = ge > 0 == (xe.level != 1),
								He = be ? de.begin : m(de.end, -1);
							if (
								(xe.from <= He && He < xe.to) ||
								((He = be ? xe.from : m(xe.to, -1)),
								de.begin <= He && He < de.end)
							)
								return Te(He, be);
						}
					},
					$ = q(h + s, s, N);
				if ($) return $;
				var oe = s > 0 ? N.end : m(N.begin, -1);
				return oe != null &&
					!(s > 0 && oe == i.text.length) &&
					(($ = q(s > 0 ? 0 : l.length - 1, s, _(oe))), $)
					? $
					: null;
			}
			var zo = {
				selectAll: M9,
				singleSelection: function (n) {
					return n.setSelection(n.getCursor('anchor'), n.getCursor('head'), Ge);
				},
				killLine: function (n) {
					return b1(n, function (i) {
						if (i.empty()) {
							var a = Se(n.doc, i.head.line).text.length;
							return i.head.ch == a && i.head.line < n.lastLine()
								? {
										from: i.head,
										to: ne(i.head.line + 1, 0),
								  }
								: {
										from: i.head,
										to: ne(i.head.line, a),
								  };
						} else
							return {
								from: i.from(),
								to: i.to(),
							};
					});
				},
				deleteLine: function (n) {
					return b1(n, function (i) {
						return {
							from: ne(i.from().line, 0),
							to: Ie(n.doc, ne(i.to().line + 1, 0)),
						};
					});
				},
				delLineLeft: function (n) {
					return b1(n, function (i) {
						return {
							from: ne(i.from().line, 0),
							to: i.from(),
						};
					});
				},
				delWrappedLineLeft: function (n) {
					return b1(n, function (i) {
						var a = n.charCoords(i.head, 'div').top + 5,
							s = n.coordsChar(
								{
									left: 0,
									top: a,
								},
								'div'
							);
						return {
							from: s,
							to: i.from(),
						};
					});
				},
				delWrappedLineRight: function (n) {
					return b1(n, function (i) {
						var a = n.charCoords(i.head, 'div').top + 5,
							s = n.coordsChar(
								{
									left: n.display.lineDiv.offsetWidth + 100,
									top: a,
								},
								'div'
							);
						return {
							from: i.from(),
							to: s,
						};
					});
				},
				undo: function (n) {
					return n.undo();
				},
				redo: function (n) {
					return n.redo();
				},
				undoSelection: function (n) {
					return n.undoSelection();
				},
				redoSelection: function (n) {
					return n.redoSelection();
				},
				goDocStart: function (n) {
					return n.extendSelection(ne(n.firstLine(), 0));
				},
				goDocEnd: function (n) {
					return n.extendSelection(ne(n.lastLine()));
				},
				goLineStart: function (n) {
					return n.extendSelectionsBy(
						function (i) {
							return V9(n, i.head.line);
						},
						{
							origin: '+move',
							bias: 1,
						}
					);
				},
				goLineStartSmart: function (n) {
					return n.extendSelectionsBy(
						function (i) {
							return Z9(n, i.head);
						},
						{
							origin: '+move',
							bias: 1,
						}
					);
				},
				goLineEnd: function (n) {
					return n.extendSelectionsBy(
						function (i) {
							return gA(n, i.head.line);
						},
						{
							origin: '+move',
							bias: -1,
						}
					);
				},
				goLineRight: function (n) {
					return n.extendSelectionsBy(function (i) {
						var a = n.cursorCoords(i.head, 'div').top + 5;
						return n.coordsChar(
							{
								left: n.display.lineDiv.offsetWidth + 100,
								top: a,
							},
							'div'
						);
					}, rt);
				},
				goLineLeft: function (n) {
					return n.extendSelectionsBy(function (i) {
						var a = n.cursorCoords(i.head, 'div').top + 5;
						return n.coordsChar(
							{
								left: 0,
								top: a,
							},
							'div'
						);
					}, rt);
				},
				goLineLeftSmart: function (n) {
					return n.extendSelectionsBy(function (i) {
						var a = n.cursorCoords(i.head, 'div').top + 5,
							s = n.coordsChar(
								{
									left: 0,
									top: a,
								},
								'div'
							);
						return s.ch < n.getLine(s.line).search(/\S/) ? Z9(n, i.head) : s;
					}, rt);
				},
				goLineUp: function (n) {
					return n.moveV(-1, 'line');
				},
				goLineDown: function (n) {
					return n.moveV(1, 'line');
				},
				goPageUp: function (n) {
					return n.moveV(-1, 'page');
				},
				goPageDown: function (n) {
					return n.moveV(1, 'page');
				},
				goCharLeft: function (n) {
					return n.moveH(-1, 'char');
				},
				goCharRight: function (n) {
					return n.moveH(1, 'char');
				},
				goColumnLeft: function (n) {
					return n.moveH(-1, 'column');
				},
				goColumnRight: function (n) {
					return n.moveH(1, 'column');
				},
				goWordLeft: function (n) {
					return n.moveH(-1, 'word');
				},
				goGroupRight: function (n) {
					return n.moveH(1, 'group');
				},
				goGroupLeft: function (n) {
					return n.moveH(-1, 'group');
				},
				goWordRight: function (n) {
					return n.moveH(1, 'word');
				},
				delCharBefore: function (n) {
					return n.deleteH(-1, 'codepoint');
				},
				delCharAfter: function (n) {
					return n.deleteH(1, 'char');
				},
				delWordBefore: function (n) {
					return n.deleteH(-1, 'word');
				},
				delWordAfter: function (n) {
					return n.deleteH(1, 'word');
				},
				delGroupBefore: function (n) {
					return n.deleteH(-1, 'group');
				},
				delGroupAfter: function (n) {
					return n.deleteH(1, 'group');
				},
				indentAuto: function (n) {
					return n.indentSelection('smart');
				},
				indentMore: function (n) {
					return n.indentSelection('add');
				},
				indentLess: function (n) {
					return n.indentSelection('subtract');
				},
				insertTab: function (n) {
					return n.replaceSelection('	');
				},
				insertSoftTab: function (n) {
					for (
						var i = [], a = n.listSelections(), s = n.options.tabSize, l = 0;
						l < a.length;
						l++
					) {
						var h = a[l].from(),
							p = b(n.getLine(h.line), h.ch, s);
						i.push(qt(s - (p % s)));
					}
					n.replaceSelections(i);
				},
				defaultTab: function (n) {
					n.somethingSelected()
						? n.indentSelection('add')
						: n.execCommand('insertTab');
				},
				transposeChars: function (n) {
					return gn(n, function () {
						for (var i = n.listSelections(), a = [], s = 0; s < i.length; s++)
							if (i[s].empty()) {
								var l = i[s].head,
									h = Se(n.doc, l.line).text;
								if (h) {
									if (
										(l.ch == h.length && (l = new ne(l.line, l.ch - 1)),
										l.ch > 0)
									)
										(l = new ne(l.line, l.ch + 1)),
											n.replaceRange(
												h.charAt(l.ch - 1) + h.charAt(l.ch - 2),
												ne(l.line, l.ch - 2),
												l,
												'+transpose'
											);
									else if (l.line > n.doc.first) {
										var p = Se(n.doc, l.line - 1).text;
										p &&
											((l = new ne(l.line, 1)),
											n.replaceRange(
												h.charAt(0) +
													n.doc.lineSeparator() +
													p.charAt(p.length - 1),
												ne(l.line - 1, p.length - 1),
												l,
												'+transpose'
											));
									}
								}
								a.push(new $e(l, l));
							}
						n.setSelections(a);
					});
				},
				newlineAndIndent: function (n) {
					return gn(n, function () {
						for (var i = n.listSelections(), a = i.length - 1; a >= 0; a--)
							n.replaceRange(
								n.doc.lineSeparator(),
								i[a].anchor,
								i[a].head,
								'+input'
							);
						i = n.listSelections();
						for (var s = 0; s < i.length; s++)
							n.indentLine(i[s].from().line, null, !0);
						T1(n);
					});
				},
				openLine: function (n) {
					return n.replaceSelection(
						`
`,
						'start'
					);
				},
				toggleOverwrite: function (n) {
					return n.toggleOverwrite();
				},
			};
			function V9(n, i) {
				var a = Se(n.doc, i),
					s = jn(a);
				return s != a && (i = tt(s)), ec(!0, n, s, i, 1);
			}
			function gA(n, i) {
				var a = Se(n.doc, i),
					s = J7(a);
				return s != a && (i = tt(s)), ec(!0, n, a, i, -1);
			}
			function Z9(n, i) {
				var a = V9(n, i.line),
					s = Se(n.doc, a.line),
					l = Ne(s, n.doc.direction);
				if (!l || l[0].level == 0) {
					var h = Math.max(a.ch, s.text.search(/\S/)),
						p = i.line == a.line && i.ch <= h && i.ch;
					return ne(a.line, p ? 0 : h, a.sticky);
				}
				return a;
			}
			function ba(n, i, a) {
				if (typeof i == 'string' && ((i = zo[i]), !i)) return !1;
				n.display.input.ensurePolled();
				var s = n.display.shift,
					l = !1;
				try {
					n.isReadOnly() && (n.state.suppressEdits = !0),
						a && (n.display.shift = !1),
						(l = i(n) != Pe);
				} finally {
					(n.display.shift = s), (n.state.suppressEdits = !1);
				}
				return l;
			}
			function mA(n, i, a) {
				for (var s = 0; s < n.state.keyMaps.length; s++) {
					var l = S1(i, n.state.keyMaps[s], a, n);
					if (l) return l;
				}
				return (
					(n.options.extraKeys && S1(i, n.options.extraKeys, a, n)) ||
					S1(i, n.options.keyMap, a, n)
				);
			}
			var TA = new Ce();
			function Wo(n, i, a, s) {
				var l = n.state.keySeq;
				if (l) {
					if (q9(i)) return 'handled';
					if (
						(/\'$/.test(i)
							? (n.state.keySeq = null)
							: TA.set(50, function () {
									n.state.keySeq == l &&
										((n.state.keySeq = null), n.display.input.reset());
							  }),
						J9(n, l + ' ' + i, a, s))
					)
						return !0;
				}
				return J9(n, i, a, s);
			}
			function J9(n, i, a, s) {
				var l = mA(n, i, s);
				return (
					l == 'multi' && (n.state.keySeq = i),
					l == 'handled' && Dt(n, 'keyHandled', n, i, a),
					(l == 'handled' || l == 'multi') && (We(a), Pu(n)),
					!!l
				);
			}
			function $9(n, i) {
				var a = Q9(i, !0);
				return a
					? i.shiftKey && !n.state.keySeq
						? Wo(n, 'Shift-' + a, i, function (s) {
								return ba(n, s, !0);
						  }) ||
						  Wo(n, a, i, function (s) {
								if (typeof s == 'string' ? /^go[A-Z]/.test(s) : s.motion)
									return ba(n, s);
						  })
						: Wo(n, a, i, function (s) {
								return ba(n, s);
						  })
					: !1;
			}
			function EA(n, i, a) {
				return Wo(n, "'" + a + "'", i, function (s) {
					return ba(n, s, !0);
				});
			}
			var tc = null;
			function e5(n) {
				var i = this;
				if (
					!(n.target && n.target != i.display.input.getField()) &&
					((i.curOp.focus = se()), !me(i, n))
				) {
					f && d < 11 && n.keyCode == 27 && (n.returnValue = !1);
					var a = n.keyCode;
					i.display.shift = a == 16 || n.shiftKey;
					var s = $9(i, n);
					C &&
						((tc = s ? a : null),
						!s &&
							a == 88 &&
							!P7 &&
							(z ? n.metaKey : n.ctrlKey) &&
							i.replaceSelection('', null, 'cut')),
						r &&
							!z &&
							!s &&
							a == 46 &&
							n.shiftKey &&
							!n.ctrlKey &&
							document.execCommand &&
							document.execCommand('cut'),
						a == 18 &&
							!/\bCodeMirror-crosshair\b/.test(i.display.lineDiv.className) &&
							vA(i);
				}
			}
			function vA(n) {
				var i = n.display.lineDiv;
				Ae(i, 'CodeMirror-crosshair');
				function a(s) {
					(s.keyCode == 18 || !s.altKey) &&
						(V(i, 'CodeMirror-crosshair'),
						j(document, 'keyup', a),
						j(document, 'mouseover', a));
				}
				Ee(document, 'keyup', a), Ee(document, 'mouseover', a);
			}
			function t5(n) {
				n.keyCode == 16 && (this.doc.sel.shift = !1), me(this, n);
			}
			function n5(n) {
				var i = this;
				if (
					!(n.target && n.target != i.display.input.getField()) &&
					!(
						br(i.display, n) ||
						me(i, n) ||
						(n.ctrlKey && !n.altKey) ||
						(z && n.metaKey)
					)
				) {
					var a = n.keyCode,
						s = n.charCode;
					if (C && a == tc) {
						(tc = null), We(n);
						return;
					}
					if (!(C && (!n.which || n.which < 10) && $9(i, n))) {
						var l = String.fromCharCode(s == null ? a : s);
						l != '\b' && (EA(i, n, l) || i.display.input.onKeyPress(n));
					}
				}
			}
			var yA = 400,
				nc = function (n, i, a) {
					(this.time = n), (this.pos = i), (this.button = a);
				};
			nc.prototype.compare = function (n, i, a) {
				return this.time + yA > n && Le(i, this.pos) == 0 && a == this.button;
			};
			var Ko, jo;
			function AA(n, i) {
				var a = +new Date();
				return jo && jo.compare(a, n, i)
					? ((Ko = jo = null), 'triple')
					: Ko && Ko.compare(a, n, i)
					? ((jo = new nc(a, n, i)), (Ko = null), 'double')
					: ((Ko = new nc(a, n, i)), (jo = null), 'single');
			}
			function r5(n) {
				var i = this,
					a = i.display;
				if (!(me(i, n) || (a.activeTouch && a.input.supportsTouch()))) {
					if ((a.input.ensurePolled(), (a.shift = n.shiftKey), br(a, n))) {
						g ||
							((a.scroller.draggable = !1),
							setTimeout(function () {
								return (a.scroller.draggable = !0);
							}, 100));
						return;
					}
					if (!rc(i, n)) {
						var s = Si(i, n),
							l = Ei(n),
							h = s ? AA(s, l) : 'single';
						window.focus(),
							l == 1 && i.state.selectingText && i.state.selectingText(n),
							!(s && _A(i, l, s, h, n)) &&
								(l == 1
									? s
										? SA(i, s, h, n)
										: Ti(n) == a.scroller && We(n)
									: l == 2
									? (s && va(i.doc, s),
									  setTimeout(function () {
											return a.input.focus();
									  }, 20))
									: l == 3 && (W ? i.display.input.onContextMenu(n) : Fu(i)));
					}
				}
			}
			function _A(n, i, a, s, l) {
				var h = 'Click';
				return (
					s == 'double'
						? (h = 'Double' + h)
						: s == 'triple' && (h = 'Triple' + h),
					(h = (i == 1 ? 'Left' : i == 2 ? 'Middle' : 'Right') + h),
					Wo(n, X9(h, l), l, function (p) {
						if ((typeof p == 'string' && (p = zo[p]), !p)) return !1;
						var m = !1;
						try {
							n.isReadOnly() && (n.state.suppressEdits = !0),
								(m = p(n, a) != Pe);
						} finally {
							n.state.suppressEdits = !1;
						}
						return m;
					})
				);
			}
			function CA(n, i, a) {
				var s = n.getOption('configureMouse'),
					l = s ? s(n, i, a) : {};
				if (l.unit == null) {
					var h = K ? a.shiftKey && a.metaKey : a.altKey;
					l.unit = h
						? 'rectangle'
						: i == 'single'
						? 'char'
						: i == 'double'
						? 'word'
						: 'line';
				}
				return (
					(l.extend == null || n.doc.extend) &&
						(l.extend = n.doc.extend || a.shiftKey),
					l.addNew == null && (l.addNew = z ? a.metaKey : a.ctrlKey),
					l.moveOnDrag == null && (l.moveOnDrag = !(z ? a.altKey : a.ctrlKey)),
					l
				);
			}
			function SA(n, i, a, s) {
				f ? setTimeout(O(i9, n), 0) : (n.curOp.focus = se());
				var l = CA(n, a, s),
					h = n.doc.sel,
					p;
				n.options.dragDrop &&
				zr &&
				!n.isReadOnly() &&
				a == 'single' &&
				(p = h.contains(i)) > -1 &&
				(Le((p = h.ranges[p]).from(), i) < 0 || i.xRel > 0) &&
				(Le(p.to(), i) > 0 || i.xRel < 0)
					? bA(n, s, i, l)
					: NA(n, s, i, l);
			}
			function bA(n, i, a, s) {
				var l = n.display,
					h = !1,
					p = Pt(n, function (_) {
						g && (l.scroller.draggable = !1),
							(n.state.draggingText = !1),
							n.state.delayingBlurEvent &&
								(n.hasFocus() ? (n.state.delayingBlurEvent = !1) : Fu(n)),
							j(l.wrapper.ownerDocument, 'mouseup', p),
							j(l.wrapper.ownerDocument, 'mousemove', m),
							j(l.scroller, 'dragstart', y),
							j(l.scroller, 'drop', p),
							h ||
								(We(_),
								s.addNew || va(n.doc, a, null, null, s.extend),
								(g && !M) || (f && d == 9)
									? setTimeout(function () {
											l.wrapper.ownerDocument.body.focus({
												preventScroll: !0,
											}),
												l.input.focus();
									  }, 20)
									: l.input.focus());
					}),
					m = function (_) {
						h =
							h ||
							Math.abs(i.clientX - _.clientX) +
								Math.abs(i.clientY - _.clientY) >=
								10;
					},
					y = function () {
						return (h = !0);
					};
				g && (l.scroller.draggable = !0),
					(n.state.draggingText = p),
					(p.copy = !s.moveOnDrag),
					Ee(l.wrapper.ownerDocument, 'mouseup', p),
					Ee(l.wrapper.ownerDocument, 'mousemove', m),
					Ee(l.scroller, 'dragstart', y),
					Ee(l.scroller, 'drop', p),
					(n.state.delayingBlurEvent = !0),
					setTimeout(function () {
						return l.input.focus();
					}, 20),
					l.scroller.dragDrop && l.scroller.dragDrop();
			}
			function i5(n, i, a) {
				if (a == 'char') return new $e(i, i);
				if (a == 'word') return n.findWordAt(i);
				if (a == 'line')
					return new $e(ne(i.line, 0), Ie(n.doc, ne(i.line + 1, 0)));
				var s = a(n, i);
				return new $e(s.from, s.to);
			}
			function NA(n, i, a, s) {
				f && Fu(n);
				var l = n.display,
					h = n.doc;
				We(i);
				var p,
					m,
					y = h.sel,
					_ = y.ranges;
				if (
					(s.addNew && !s.extend
						? ((m = h.sel.contains(a)),
						  m > -1 ? (p = _[m]) : (p = new $e(a, a)))
						: ((p = h.sel.primary()), (m = h.sel.primIndex)),
					s.unit == 'rectangle')
				)
					s.addNew || (p = new $e(a, a)), (a = Si(n, i, !0, !0)), (m = -1);
				else {
					var N = i5(n, a, s.unit);
					s.extend ? (p = Vu(p, N.anchor, N.head, s.extend)) : (p = N);
				}
				s.addNew
					? m == -1
						? ((m = _.length),
						  Qt(h, qn(n, _.concat([p]), m), {
								scroll: !1,
								origin: '*mouse',
						  }))
						: _.length > 1 && _[m].empty() && s.unit == 'char' && !s.extend
						? (Qt(h, qn(n, _.slice(0, m).concat(_.slice(m + 1)), 0), {
								scroll: !1,
								origin: '*mouse',
						  }),
						  (y = h.sel))
						: Zu(h, m, p, Ve)
					: ((m = 0), Qt(h, new bn([p], 0), Ve), (y = h.sel));
				var k = a;
				function U(de) {
					if (Le(k, de) != 0)
						if (((k = de), s.unit == 'rectangle')) {
							for (
								var Te = [],
									xe = n.options.tabSize,
									be = b(Se(h, a.line).text, a.ch, xe),
									He = b(Se(h, de.line).text, de.ch, xe),
									st = Math.min(be, He),
									Ht = Math.max(be, He),
									gt = Math.min(a.line, de.line),
									mn = Math.min(n.lastLine(), Math.max(a.line, de.line));
								gt <= mn;
								gt++
							) {
								var an = Se(h, gt).text,
									At = Fe(an, st, xe);
								st == Ht
									? Te.push(new $e(ne(gt, At), ne(gt, At)))
									: an.length > At &&
									  Te.push(new $e(ne(gt, At), ne(gt, Fe(an, Ht, xe))));
							}
							Te.length || Te.push(new $e(a, a)),
								Qt(h, qn(n, y.ranges.slice(0, m).concat(Te), m), {
									origin: '*mouse',
									scroll: !1,
								}),
								n.scrollIntoView(de);
						} else {
							var ln = p,
								Wt = i5(n, de, s.unit),
								wt = ln.anchor,
								_t;
							Le(Wt.anchor, wt) > 0
								? ((_t = Wt.head), (wt = $s(ln.from(), Wt.anchor)))
								: ((_t = Wt.anchor), (wt = Js(ln.to(), Wt.head)));
							var mt = y.ranges.slice(0);
							(mt[m] = xA(n, new $e(Ie(h, wt), _t))), Qt(h, qn(n, mt, m), Ve);
						}
				}
				var B = l.wrapper.getBoundingClientRect(),
					q = 0;
				function $(de) {
					var Te = ++q,
						xe = Si(n, de, !0, s.unit == 'rectangle');
					if (xe)
						if (Le(xe, k) != 0) {
							(n.curOp.focus = se()), U(xe);
							var be = da(l, h);
							(xe.line >= be.to || xe.line < be.from) &&
								setTimeout(
									Pt(n, function () {
										q == Te && $(de);
									}),
									150
								);
						} else {
							var He =
								de.clientY < B.top ? -20 : de.clientY > B.bottom ? 20 : 0;
							He &&
								setTimeout(
									Pt(n, function () {
										q == Te && ((l.scroller.scrollTop += He), $(de));
									}),
									50
								);
						}
				}
				function oe(de) {
					(n.state.selectingText = !1),
						(q = 1 / 0),
						de && (We(de), l.input.focus()),
						j(l.wrapper.ownerDocument, 'mousemove', he),
						j(l.wrapper.ownerDocument, 'mouseup', ge),
						(h.history.lastSelOrigin = null);
				}
				var he = Pt(n, function (de) {
						de.buttons === 0 || !Ei(de) ? oe(de) : $(de);
					}),
					ge = Pt(n, oe);
				(n.state.selectingText = ge),
					Ee(l.wrapper.ownerDocument, 'mousemove', he),
					Ee(l.wrapper.ownerDocument, 'mouseup', ge);
			}
			function xA(n, i) {
				var a = i.anchor,
					s = i.head,
					l = Se(n.doc, a.line);
				if (Le(a, s) == 0 && a.sticky == s.sticky) return i;
				var h = Ne(l);
				if (!h) return i;
				var p = Y(h, a.ch, a.sticky),
					m = h[p];
				if (m.from != a.ch && m.to != a.ch) return i;
				var y = p + ((m.from == a.ch) == (m.level != 1) ? 0 : 1);
				if (y == 0 || y == h.length) return i;
				var _;
				if (s.line != a.line)
					_ = (s.line - a.line) * (n.doc.direction == 'ltr' ? 1 : -1) > 0;
				else {
					var N = Y(h, s.ch, s.sticky),
						k = N - p || (s.ch - a.ch) * (m.level == 1 ? -1 : 1);
					N == y - 1 || N == y ? (_ = k < 0) : (_ = k > 0);
				}
				var U = h[y + (_ ? -1 : 0)],
					B = _ == (U.level == 1),
					q = B ? U.from : U.to,
					$ = B ? 'after' : 'before';
				return a.ch == q && a.sticky == $ ? i : new $e(new ne(a.line, q, $), s);
			}
			function o5(n, i, a, s) {
				var l, h;
				if (i.touches) (l = i.touches[0].clientX), (h = i.touches[0].clientY);
				else
					try {
						(l = i.clientX), (h = i.clientY);
					} catch {
						return !1;
					}
				if (l >= Math.floor(n.display.gutters.getBoundingClientRect().right))
					return !1;
				s && We(i);
				var p = n.display,
					m = p.lineDiv.getBoundingClientRect();
				if (h > m.bottom || !ve(n, a)) return l1(i);
				h -= m.top - p.viewOffset;
				for (var y = 0; y < n.display.gutterSpecs.length; ++y) {
					var _ = p.gutters.childNodes[y];
					if (_ && _.getBoundingClientRect().right >= l) {
						var N = Ai(n.doc, h),
							k = n.display.gutterSpecs[y];
						return re(n, a, n, N, k.className, i), l1(i);
					}
				}
			}
			function rc(n, i) {
				return o5(n, i, 'gutterClick', !0);
			}
			function s5(n, i) {
				br(n.display, i) ||
					kA(n, i) ||
					me(n, i, 'contextmenu') ||
					W ||
					n.display.input.onContextMenu(i);
			}
			function kA(n, i) {
				return ve(n, 'gutterContextMenu')
					? o5(n, i, 'gutterContextMenu', !1)
					: !1;
			}
			function a5(n) {
				(n.display.wrapper.className =
					n.display.wrapper.className.replace(/\s*cm-s-\S+/g, '') +
					n.options.theme.replace(/(^|\s)\s*/g, ' cm-s-')),
					bo(n);
			}
			var N1 = {
					toString: function () {
						return 'CodeMirror.Init';
					},
				},
				l5 = {},
				Na = {};
			function OA(n) {
				var i = n.optionHandlers;
				function a(s, l, h, p) {
					(n.defaults[s] = l),
						h &&
							(i[s] = p
								? function (m, y, _) {
										_ != N1 && h(m, y, _);
								  }
								: h);
				}
				(n.defineOption = a),
					(n.Init = N1),
					a(
						'value',
						'',
						function (s, l) {
							return s.setValue(l);
						},
						!0
					),
					a(
						'mode',
						null,
						function (s, l) {
							(s.doc.modeOption = l), qu(s);
						},
						!0
					),
					a('indentUnit', 2, qu, !0),
					a('indentWithTabs', !1),
					a('smartIndent', !0),
					a(
						'tabSize',
						4,
						function (s) {
							Mo(s), bo(s), on(s);
						},
						!0
					),
					a('lineSeparator', null, function (s, l) {
						if (((s.doc.lineSep = l), !!l)) {
							var h = [],
								p = s.doc.first;
							s.doc.iter(function (y) {
								for (var _ = 0; ; ) {
									var N = y.text.indexOf(l, _);
									if (N == -1) break;
									(_ = N + l.length), h.push(ne(p, N));
								}
								p++;
							});
							for (var m = h.length - 1; m >= 0; m--)
								_1(s.doc, l, h[m], ne(h[m].line, h[m].ch + l.length));
						}
					}),
					a(
						'specialChars',
						/[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g,
						function (s, l, h) {
							(s.state.specialChars = new RegExp(
								l.source + (l.test('	') ? '' : '|	'),
								'g'
							)),
								h != N1 && s.refresh();
						}
					),
					a(
						'specialCharPlaceholder',
						iy,
						function (s) {
							return s.refresh();
						},
						!0
					),
					a('electricChars', !0),
					a(
						'inputStyle',
						I ? 'contenteditable' : 'textarea',
						function () {
							throw new Error(
								'inputStyle can not (yet) be changed in a running editor'
							);
						},
						!0
					),
					a(
						'spellcheck',
						!1,
						function (s, l) {
							return (s.getInputField().spellcheck = l);
						},
						!0
					),
					a(
						'autocorrect',
						!1,
						function (s, l) {
							return (s.getInputField().autocorrect = l);
						},
						!0
					),
					a(
						'autocapitalize',
						!1,
						function (s, l) {
							return (s.getInputField().autocapitalize = l);
						},
						!0
					),
					a('rtlMoveVisually', !w),
					a('wholeLineUpdateBefore', !0),
					a(
						'theme',
						'default',
						function (s) {
							a5(s), Io(s);
						},
						!0
					),
					a('keyMap', 'default', function (s, l, h) {
						var p = Sa(l),
							m = h != N1 && Sa(h);
						m && m.detach && m.detach(s, p), p.attach && p.attach(s, m || null);
					}),
					a('extraKeys', null),
					a('configureMouse', null),
					a('lineWrapping', !1, LA, !0),
					a(
						'gutters',
						[],
						function (s, l) {
							(s.display.gutterSpecs = ju(l, s.options.lineNumbers)), Io(s);
						},
						!0
					),
					a(
						'fixedGutter',
						!0,
						function (s, l) {
							(s.display.gutters.style.left = l ? Mu(s.display) + 'px' : '0'),
								s.refresh();
						},
						!0
					),
					a(
						'coverGutterNextToScrollbar',
						!1,
						function (s) {
							return E1(s);
						},
						!0
					),
					a(
						'scrollbarStyle',
						'native',
						function (s) {
							c9(s),
								E1(s),
								s.display.scrollbars.setScrollTop(s.doc.scrollTop),
								s.display.scrollbars.setScrollLeft(s.doc.scrollLeft);
						},
						!0
					),
					a(
						'lineNumbers',
						!1,
						function (s, l) {
							(s.display.gutterSpecs = ju(s.options.gutters, l)), Io(s);
						},
						!0
					),
					a('firstLineNumber', 1, Io, !0),
					a(
						'lineNumberFormatter',
						function (s) {
							return s;
						},
						Io,
						!0
					),
					a('showCursorWhenSelecting', !1, No, !0),
					a('resetSelectionOnContextMenu', !0),
					a('lineWiseCopyCut', !0),
					a('pasteLinesPerSelection', !0),
					a('selectionsMayTouch', !1),
					a('readOnly', !1, function (s, l) {
						l == 'nocursor' && (m1(s), s.display.input.blur()),
							s.display.input.readOnlyChanged(l);
					}),
					a('screenReaderLabel', null, function (s, l) {
						(l = l === '' ? null : l),
							s.display.input.screenReaderLabelChanged(l);
					}),
					a(
						'disableInput',
						!1,
						function (s, l) {
							l || s.display.input.reset();
						},
						!0
					),
					a('dragDrop', !0, wA),
					a('allowDropFileTypes', null),
					a('cursorBlinkRate', 530),
					a('cursorScrollMargin', 0),
					a('cursorHeight', 1, No, !0),
					a('singleCursorHeightPerLine', !0, No, !0),
					a('workTime', 100),
					a('workDelay', 100),
					a('flattenSpans', !0, Mo, !0),
					a('addModeClass', !1, Mo, !0),
					a('pollInterval', 100),
					a('undoDepth', 200, function (s, l) {
						return (s.doc.history.undoDepth = l);
					}),
					a('historyEventDelay', 1250),
					a(
						'viewportMargin',
						10,
						function (s) {
							return s.refresh();
						},
						!0
					),
					a('maxHighlightLength', 1e4, Mo, !0),
					a('moveInputWithCursor', !0, function (s, l) {
						l || s.display.input.resetPosition();
					}),
					a('tabindex', null, function (s, l) {
						return (s.display.input.getField().tabIndex = l || '');
					}),
					a('autofocus', null),
					a(
						'direction',
						'ltr',
						function (s, l) {
							return s.doc.setDirection(l);
						},
						!0
					),
					a('phrases', null);
			}
			function wA(n, i, a) {
				var s = a && a != N1;
				if (!i != !s) {
					var l = n.display.dragFunctions,
						h = i ? Ee : j;
					h(n.display.scroller, 'dragstart', l.start),
						h(n.display.scroller, 'dragenter', l.enter),
						h(n.display.scroller, 'dragover', l.over),
						h(n.display.scroller, 'dragleave', l.leave),
						h(n.display.scroller, 'drop', l.drop);
				}
			}
			function LA(n) {
				n.options.lineWrapping
					? (Ae(n.display.wrapper, 'CodeMirror-wrap'),
					  (n.display.sizer.style.minWidth = ''),
					  (n.display.sizerWidth = null))
					: (V(n.display.wrapper, 'CodeMirror-wrap'), Cu(n)),
					Ru(n),
					on(n),
					bo(n),
					setTimeout(function () {
						return E1(n);
					}, 100);
			}
			function dt(n, i) {
				var a = this;
				if (!(this instanceof dt)) return new dt(n, i);
				(this.options = i = i ? E(i) : {}), E(l5, i, !1);
				var s = i.value;
				typeof s == 'string'
					? (s = new sn(s, i.mode, null, i.lineSeparator, i.direction))
					: i.mode && (s.modeOption = i.mode),
					(this.doc = s);
				var l = new dt.inputStyles[i.inputStyle](this),
					h = (this.display = new Ky(n, s, l, i));
				(h.wrapper.CodeMirror = this),
					a5(this),
					i.lineWrapping &&
						(this.display.wrapper.className += ' CodeMirror-wrap'),
					c9(this),
					(this.state = {
						keyMaps: [],
						overlays: [],
						modeGen: 0,
						overwrite: !1,
						delayingBlurEvent: !1,
						focused: !1,
						suppressEdits: !1,
						pasteIncoming: -1,
						cutIncoming: -1,
						selectingText: !1,
						draggingText: !1,
						highlight: new Ce(),
						keySeq: null,
						specialChars: null,
					}),
					i.autofocus && !I && h.input.focus(),
					f &&
						d < 11 &&
						setTimeout(function () {
							return a.display.input.reset(!0);
						}, 20),
					IA(this),
					uA(),
					ki(this),
					(this.curOp.forceUpdate = !0),
					y9(this, s),
					(i.autofocus && !I) || this.hasFocus()
						? setTimeout(function () {
								a.hasFocus() && !a.state.focused && Hu(a);
						  }, 20)
						: m1(this);
				for (var p in Na) Na.hasOwnProperty(p) && Na[p](this, i[p], N1);
				d9(this), i.finishInit && i.finishInit(this);
				for (var m = 0; m < ic.length; ++m) ic[m](this);
				Oi(this),
					g &&
						i.lineWrapping &&
						getComputedStyle(h.lineDiv).textRendering == 'optimizelegibility' &&
						(h.lineDiv.style.textRendering = 'auto');
			}
			(dt.defaults = l5), (dt.optionHandlers = Na);
			function IA(n) {
				var i = n.display;
				Ee(i.scroller, 'mousedown', Pt(n, r5)),
					f && d < 11
						? Ee(
								i.scroller,
								'dblclick',
								Pt(n, function (y) {
									if (!me(n, y)) {
										var _ = Si(n, y);
										if (!(!_ || rc(n, y) || br(n.display, y))) {
											We(y);
											var N = n.findWordAt(_);
											va(n.doc, N.anchor, N.head);
										}
									}
								})
						  )
						: Ee(i.scroller, 'dblclick', function (y) {
								return me(n, y) || We(y);
						  }),
					Ee(i.scroller, 'contextmenu', function (y) {
						return s5(n, y);
					}),
					Ee(i.input.getField(), 'contextmenu', function (y) {
						i.scroller.contains(y.target) || s5(n, y);
					});
				var a,
					s = {
						end: 0,
					};
				function l() {
					i.activeTouch &&
						((a = setTimeout(function () {
							return (i.activeTouch = null);
						}, 1e3)),
						(s = i.activeTouch),
						(s.end = +new Date()));
				}
				function h(y) {
					if (y.touches.length != 1) return !1;
					var _ = y.touches[0];
					return _.radiusX <= 1 && _.radiusY <= 1;
				}
				function p(y, _) {
					if (_.left == null) return !0;
					var N = _.left - y.left,
						k = _.top - y.top;
					return N * N + k * k > 20 * 20;
				}
				Ee(i.scroller, 'touchstart', function (y) {
					if (!me(n, y) && !h(y) && !rc(n, y)) {
						i.input.ensurePolled(), clearTimeout(a);
						var _ = +new Date();
						(i.activeTouch = {
							start: _,
							moved: !1,
							prev: _ - s.end <= 300 ? s : null,
						}),
							y.touches.length == 1 &&
								((i.activeTouch.left = y.touches[0].pageX),
								(i.activeTouch.top = y.touches[0].pageY));
					}
				}),
					Ee(i.scroller, 'touchmove', function () {
						i.activeTouch && (i.activeTouch.moved = !0);
					}),
					Ee(i.scroller, 'touchend', function (y) {
						var _ = i.activeTouch;
						if (
							_ &&
							!br(i, y) &&
							_.left != null &&
							!_.moved &&
							new Date() - _.start < 300
						) {
							var N = n.coordsChar(i.activeTouch, 'page'),
								k;
							!_.prev || p(_, _.prev)
								? (k = new $e(N, N))
								: !_.prev.prev || p(_, _.prev.prev)
								? (k = n.findWordAt(N))
								: (k = new $e(ne(N.line, 0), Ie(n.doc, ne(N.line + 1, 0)))),
								n.setSelection(k.anchor, k.head),
								n.focus(),
								We(y);
						}
						l();
					}),
					Ee(i.scroller, 'touchcancel', l),
					Ee(i.scroller, 'scroll', function () {
						i.scroller.clientHeight &&
							(ko(n, i.scroller.scrollTop),
							Ni(n, i.scroller.scrollLeft, !0),
							re(n, 'scroll', n));
					}),
					Ee(i.scroller, 'mousewheel', function (y) {
						return m9(n, y);
					}),
					Ee(i.scroller, 'DOMMouseScroll', function (y) {
						return m9(n, y);
					}),
					Ee(i.wrapper, 'scroll', function () {
						return (i.wrapper.scrollTop = i.wrapper.scrollLeft = 0);
					}),
					(i.dragFunctions = {
						enter: function (y) {
							me(n, y) || Sn(y);
						},
						over: function (y) {
							me(n, y) || (lA(n, y), Sn(y));
						},
						start: function (y) {
							return aA(n, y);
						},
						drop: Pt(n, sA),
						leave: function (y) {
							me(n, y) || K9(n);
						},
					});
				var m = i.input.getField();
				Ee(m, 'keyup', function (y) {
					return t5.call(n, y);
				}),
					Ee(m, 'keydown', Pt(n, e5)),
					Ee(m, 'keypress', Pt(n, n5)),
					Ee(m, 'focus', function (y) {
						return Hu(n, y);
					}),
					Ee(m, 'blur', function (y) {
						return m1(n, y);
					});
			}
			var ic = [];
			dt.defineInitHook = function (n) {
				return ic.push(n);
			};
			function Yo(n, i, a, s) {
				var l = n.doc,
					h;
				a == null && (a = 'add'),
					a == 'smart' && (l.mode.indent ? (h = yo(n, i).state) : (a = 'prev'));
				var p = n.options.tabSize,
					m = Se(l, i),
					y = b(m.text, null, p);
				m.stateAfter && (m.stateAfter = null);
				var _ = m.text.match(/^\s*/)[0],
					N;
				if (!s && !/\S/.test(m.text)) (N = 0), (a = 'not');
				else if (
					a == 'smart' &&
					((N = l.mode.indent(h, m.text.slice(_.length), m.text)),
					N == Pe || N > 150)
				) {
					if (!s) return;
					a = 'prev';
				}
				a == 'prev'
					? i > l.first
						? (N = b(Se(l, i - 1).text, null, p))
						: (N = 0)
					: a == 'add'
					? (N = y + n.options.indentUnit)
					: a == 'subtract'
					? (N = y - n.options.indentUnit)
					: typeof a == 'number' && (N = y + a),
					(N = Math.max(0, N));
				var k = '',
					U = 0;
				if (n.options.indentWithTabs)
					for (var B = Math.floor(N / p); B; --B) (U += p), (k += '	');
				if ((U < N && (k += qt(N - U)), k != _))
					return (
						_1(l, k, ne(i, 0), ne(i, _.length), '+input'),
						(m.stateAfter = null),
						!0
					);
				for (var q = 0; q < l.sel.ranges.length; q++) {
					var $ = l.sel.ranges[q];
					if ($.head.line == i && $.head.ch < _.length) {
						var oe = ne(i, _.length);
						Zu(l, q, new $e(oe, oe));
						break;
					}
				}
			}
			var Xn = null;
			function xa(n) {
				Xn = n;
			}
			function oc(n, i, a, s, l) {
				var h = n.doc;
				(n.display.shift = !1), s || (s = h.sel);
				var p = +new Date() - 200,
					m = l == 'paste' || n.state.pasteIncoming > p,
					y = lu(i),
					_ = null;
				if (m && s.ranges.length > 1)
					if (
						Xn &&
						Xn.text.join(`
`) == i
					) {
						if (s.ranges.length % Xn.text.length == 0) {
							_ = [];
							for (var N = 0; N < Xn.text.length; N++)
								_.push(h.splitLines(Xn.text[N]));
						}
					} else
						y.length == s.ranges.length &&
							n.options.pasteLinesPerSelection &&
							(_ = Gt(y, function (he) {
								return [he];
							}));
				for (
					var k = n.curOp.updateInput, U = s.ranges.length - 1;
					U >= 0;
					U--
				) {
					var B = s.ranges[U],
						q = B.from(),
						$ = B.to();
					B.empty() &&
						(a && a > 0
							? (q = ne(q.line, q.ch - a))
							: n.state.overwrite && !m
							? ($ = ne(
									$.line,
									Math.min(Se(h, $.line).text.length, $.ch + De(y).length)
							  ))
							: m &&
							  Xn &&
							  Xn.lineWise &&
							  Xn.text.join(`
`) ==
									y.join(`
`) &&
							  (q = $ = ne(q.line, 0)));
					var oe = {
						from: q,
						to: $,
						text: _ ? _[U % _.length] : y,
						origin:
							l || (m ? 'paste' : n.state.cutIncoming > p ? 'cut' : '+input'),
					};
					A1(n.doc, oe), Dt(n, 'inputRead', n, oe);
				}
				i && !m && c5(n, i),
					T1(n),
					n.curOp.updateInput < 2 && (n.curOp.updateInput = k),
					(n.curOp.typing = !0),
					(n.state.pasteIncoming = n.state.cutIncoming = -1);
			}
			function u5(n, i) {
				var a = n.clipboardData && n.clipboardData.getData('Text');
				if (a)
					return (
						n.preventDefault(),
						!i.isReadOnly() &&
							!i.options.disableInput &&
							gn(i, function () {
								return oc(i, a, 0, null, 'paste');
							}),
						!0
					);
			}
			function c5(n, i) {
				if (!(!n.options.electricChars || !n.options.smartIndent))
					for (var a = n.doc.sel, s = a.ranges.length - 1; s >= 0; s--) {
						var l = a.ranges[s];
						if (
							!(
								l.head.ch > 100 ||
								(s && a.ranges[s - 1].head.line == l.head.line)
							)
						) {
							var h = n.getModeAt(l.head),
								p = !1;
							if (h.electricChars) {
								for (var m = 0; m < h.electricChars.length; m++)
									if (i.indexOf(h.electricChars.charAt(m)) > -1) {
										p = Yo(n, l.head.line, 'smart');
										break;
									}
							} else
								h.electricInput &&
									h.electricInput.test(
										Se(n.doc, l.head.line).text.slice(0, l.head.ch)
									) &&
									(p = Yo(n, l.head.line, 'smart'));
							p && Dt(n, 'electricInput', n, l.head.line);
						}
					}
			}
			function f5(n) {
				for (var i = [], a = [], s = 0; s < n.doc.sel.ranges.length; s++) {
					var l = n.doc.sel.ranges[s].head.line,
						h = {
							anchor: ne(l, 0),
							head: ne(l + 1, 0),
						};
					a.push(h), i.push(n.getRange(h.anchor, h.head));
				}
				return {
					text: i,
					ranges: a,
				};
			}
			function h5(n, i, a, s) {
				n.setAttribute('autocorrect', a ? '' : 'off'),
					n.setAttribute('autocapitalize', s ? '' : 'off'),
					n.setAttribute('spellcheck', !!i);
			}
			function d5() {
				var n = G(
						'textarea',
						null,
						null,
						'position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none'
					),
					i = G(
						'div',
						[n],
						null,
						'overflow: hidden; position: relative; width: 3px; height: 0px;'
					);
				return (
					g ? (n.style.width = '1000px') : n.setAttribute('wrap', 'off'),
					D && (n.style.border = '1px solid black'),
					h5(n),
					i
				);
			}
			function MA(n) {
				var i = n.optionHandlers,
					a = (n.helpers = {});
				(n.prototype = {
					constructor: n,
					focus: function () {
						window.focus(), this.display.input.focus();
					},
					setOption: function (s, l) {
						var h = this.options,
							p = h[s];
						(h[s] == l && s != 'mode') ||
							((h[s] = l),
							i.hasOwnProperty(s) && Pt(this, i[s])(this, l, p),
							re(this, 'optionChange', this, s));
					},
					getOption: function (s) {
						return this.options[s];
					},
					getDoc: function () {
						return this.doc;
					},
					addKeyMap: function (s, l) {
						this.state.keyMaps[l ? 'push' : 'unshift'](Sa(s));
					},
					removeKeyMap: function (s) {
						for (var l = this.state.keyMaps, h = 0; h < l.length; ++h)
							if (l[h] == s || l[h].name == s) return l.splice(h, 1), !0;
					},
					addOverlay: tn(function (s, l) {
						var h = s.token ? s : n.getMode(this.options, s);
						if (h.startState) throw new Error('Overlays may not be stateful.');
						Xt(
							this.state.overlays,
							{
								mode: h,
								modeSpec: s,
								opaque: l && l.opaque,
								priority: (l && l.priority) || 0,
							},
							function (p) {
								return p.priority;
							}
						),
							this.state.modeGen++,
							on(this);
					}),
					removeOverlay: tn(function (s) {
						for (var l = this.state.overlays, h = 0; h < l.length; ++h) {
							var p = l[h].modeSpec;
							if (p == s || (typeof s == 'string' && p.name == s)) {
								l.splice(h, 1), this.state.modeGen++, on(this);
								return;
							}
						}
					}),
					indentLine: tn(function (s, l, h) {
						typeof l != 'string' &&
							typeof l != 'number' &&
							(l == null
								? (l = this.options.smartIndent ? 'smart' : 'prev')
								: (l = l ? 'add' : 'subtract')),
							vo(this.doc, s) && Yo(this, s, l, h);
					}),
					indentSelection: tn(function (s) {
						for (
							var l = this.doc.sel.ranges, h = -1, p = 0;
							p < l.length;
							p++
						) {
							var m = l[p];
							if (m.empty())
								m.head.line > h &&
									(Yo(this, m.head.line, s, !0),
									(h = m.head.line),
									p == this.doc.sel.primIndex && T1(this));
							else {
								var y = m.from(),
									_ = m.to(),
									N = Math.max(h, y.line);
								h = Math.min(this.lastLine(), _.line - (_.ch ? 0 : 1)) + 1;
								for (var k = N; k < h; ++k) Yo(this, k, s);
								var U = this.doc.sel.ranges;
								y.ch == 0 &&
									l.length == U.length &&
									U[p].from().ch > 0 &&
									Zu(this.doc, p, new $e(y, U[p].to()), Ge);
							}
						}
					}),
					getTokenAt: function (s, l) {
						return _p(this, s, l);
					},
					getLineTokens: function (s, l) {
						return _p(this, ne(s), l, !0);
					},
					getTokenTypeAt: function (s) {
						s = Ie(this.doc, s);
						var l = vp(this, Se(this.doc, s.line)),
							h = 0,
							p = (l.length - 1) / 2,
							m = s.ch,
							y;
						if (m == 0) y = l[2];
						else
							for (;;) {
								var _ = (h + p) >> 1;
								if ((_ ? l[_ * 2 - 1] : 0) >= m) p = _;
								else if (l[_ * 2 + 1] < m) h = _ + 1;
								else {
									y = l[_ * 2 + 2];
									break;
								}
							}
						var N = y ? y.indexOf('overlay ') : -1;
						return N < 0 ? y : N == 0 ? null : y.slice(0, N - 1);
					},
					getModeAt: function (s) {
						var l = this.doc.mode;
						return l.innerMode
							? n.innerMode(l, this.getTokenAt(s).state).mode
							: l;
					},
					getHelper: function (s, l) {
						return this.getHelpers(s, l)[0];
					},
					getHelpers: function (s, l) {
						var h = [];
						if (!a.hasOwnProperty(l)) return h;
						var p = a[l],
							m = this.getModeAt(s);
						if (typeof m[l] == 'string') p[m[l]] && h.push(p[m[l]]);
						else if (m[l])
							for (var y = 0; y < m[l].length; y++) {
								var _ = p[m[l][y]];
								_ && h.push(_);
							}
						else
							m.helperType && p[m.helperType]
								? h.push(p[m.helperType])
								: p[m.name] && h.push(p[m.name]);
						for (var N = 0; N < p._global.length; N++) {
							var k = p._global[N];
							k.pred(m, this) && fe(h, k.val) == -1 && h.push(k.val);
						}
						return h;
					},
					getStateAfter: function (s, l) {
						var h = this.doc;
						return (
							(s = mp(h, s == null ? h.first + h.size - 1 : s)),
							yo(this, s + 1, l).state
						);
					},
					cursorCoords: function (s, l) {
						var h,
							p = this.doc.sel.primary();
						return (
							s == null
								? (h = p.head)
								: typeof s == 'object'
								? (h = Ie(this.doc, s))
								: (h = s ? p.from() : p.to()),
							Yn(this, h, l || 'page')
						);
					},
					charCoords: function (s, l) {
						return ua(this, Ie(this.doc, s), l || 'page');
					},
					coordsChar: function (s, l) {
						return (s = Zp(this, s, l || 'page')), wu(this, s.left, s.top);
					},
					lineAtHeight: function (s, l) {
						return (
							(s = Zp(
								this,
								{
									top: s,
									left: 0,
								},
								l || 'page'
							).top),
							Ai(this.doc, s + this.display.viewOffset)
						);
					},
					heightAtLine: function (s, l, h) {
						var p = !1,
							m;
						if (typeof s == 'number') {
							var y = this.doc.first + this.doc.size - 1;
							s < this.doc.first
								? (s = this.doc.first)
								: s > y && ((s = y), (p = !0)),
								(m = Se(this.doc, s));
						} else m = s;
						return (
							la(
								this,
								m,
								{
									top: 0,
									left: 0,
								},
								l || 'page',
								h || p
							).top + (p ? this.doc.height - Sr(m) : 0)
						);
					},
					defaultTextHeight: function () {
						return p1(this.display);
					},
					defaultCharWidth: function () {
						return g1(this.display);
					},
					getViewport: function () {
						return {
							from: this.display.viewFrom,
							to: this.display.viewTo,
						};
					},
					addWidget: function (s, l, h, p, m) {
						var y = this.display;
						s = Yn(this, Ie(this.doc, s));
						var _ = s.bottom,
							N = s.left;
						if (
							((l.style.position = 'absolute'),
							l.setAttribute('cm-ignore-events', 'true'),
							this.display.input.setUneditable(l),
							y.sizer.appendChild(l),
							p == 'over')
						)
							_ = s.top;
						else if (p == 'above' || p == 'near') {
							var k = Math.max(y.wrapper.clientHeight, this.doc.height),
								U = Math.max(y.sizer.clientWidth, y.lineSpace.clientWidth);
							(p == 'above' || s.bottom + l.offsetHeight > k) &&
							s.top > l.offsetHeight
								? (_ = s.top - l.offsetHeight)
								: s.bottom + l.offsetHeight <= k && (_ = s.bottom),
								N + l.offsetWidth > U && (N = U - l.offsetWidth);
						}
						(l.style.top = _ + 'px'),
							(l.style.left = l.style.right = ''),
							m == 'right'
								? ((N = y.sizer.clientWidth - l.offsetWidth),
								  (l.style.right = '0px'))
								: (m == 'left'
										? (N = 0)
										: m == 'middle' &&
										  (N = (y.sizer.clientWidth - l.offsetWidth) / 2),
								  (l.style.left = N + 'px')),
							h &&
								wy(this, {
									left: N,
									top: _,
									right: N + l.offsetWidth,
									bottom: _ + l.offsetHeight,
								});
					},
					triggerOnKeyDown: tn(e5),
					triggerOnKeyPress: tn(n5),
					triggerOnKeyUp: t5,
					triggerOnMouseDown: tn(r5),
					execCommand: function (s) {
						if (zo.hasOwnProperty(s)) return zo[s].call(null, this);
					},
					triggerElectric: tn(function (s) {
						c5(this, s);
					}),
					findPosH: function (s, l, h, p) {
						var m = 1;
						l < 0 && ((m = -1), (l = -l));
						for (
							var y = Ie(this.doc, s), _ = 0;
							_ < l && ((y = sc(this.doc, y, m, h, p)), !y.hitSide);
							++_
						);
						return y;
					},
					moveH: tn(function (s, l) {
						var h = this;
						this.extendSelectionsBy(function (p) {
							return h.display.shift || h.doc.extend || p.empty()
								? sc(h.doc, p.head, s, l, h.options.rtlMoveVisually)
								: s < 0
								? p.from()
								: p.to();
						}, rt);
					}),
					deleteH: tn(function (s, l) {
						var h = this.doc.sel,
							p = this.doc;
						h.somethingSelected()
							? p.replaceSelection('', null, '+delete')
							: b1(this, function (m) {
									var y = sc(p, m.head, s, l, !1);
									return s < 0
										? {
												from: y,
												to: m.head,
										  }
										: {
												from: m.head,
												to: y,
										  };
							  });
					}),
					findPosV: function (s, l, h, p) {
						var m = 1,
							y = p;
						l < 0 && ((m = -1), (l = -l));
						for (var _ = Ie(this.doc, s), N = 0; N < l; ++N) {
							var k = Yn(this, _, 'div');
							if (
								(y == null ? (y = k.left) : (k.left = y),
								(_ = p5(this, k, m, h)),
								_.hitSide)
							)
								break;
						}
						return _;
					},
					moveV: tn(function (s, l) {
						var h = this,
							p = this.doc,
							m = [],
							y = !this.display.shift && !p.extend && p.sel.somethingSelected();
						if (
							(p.extendSelectionsBy(function (N) {
								if (y) return s < 0 ? N.from() : N.to();
								var k = Yn(h, N.head, 'div');
								N.goalColumn != null && (k.left = N.goalColumn), m.push(k.left);
								var U = p5(h, k, s, l);
								return (
									l == 'page' &&
										N == p.sel.primary() &&
										Uu(h, ua(h, U, 'div').top - k.top),
									U
								);
							}, rt),
							m.length)
						)
							for (var _ = 0; _ < p.sel.ranges.length; _++)
								p.sel.ranges[_].goalColumn = m[_];
					}),
					findWordAt: function (s) {
						var l = this.doc,
							h = Se(l, s.line).text,
							p = s.ch,
							m = s.ch;
						if (h) {
							var y = this.getHelper(s, 'wordChars');
							(s.sticky == 'before' || m == h.length) && p ? --p : ++m;
							for (
								var _ = h.charAt(p),
									N = ie(_, y)
										? function (k) {
												return ie(k, y);
										  }
										: /\s/.test(_)
										? function (k) {
												return /\s/.test(k);
										  }
										: function (k) {
												return !/\s/.test(k) && !ie(k);
										  };
								p > 0 && N(h.charAt(p - 1));

							)
								--p;
							for (; m < h.length && N(h.charAt(m)); ) ++m;
						}
						return new $e(ne(s.line, p), ne(s.line, m));
					},
					toggleOverwrite: function (s) {
						(s != null && s == this.state.overwrite) ||
							((this.state.overwrite = !this.state.overwrite)
								? Ae(this.display.cursorDiv, 'CodeMirror-overwrite')
								: V(this.display.cursorDiv, 'CodeMirror-overwrite'),
							re(this, 'overwriteToggle', this, this.state.overwrite));
					},
					hasFocus: function () {
						return this.display.input.getField() == se();
					},
					isReadOnly: function () {
						return !!(this.options.readOnly || this.doc.cantEdit);
					},
					scrollTo: tn(function (s, l) {
						xo(this, s, l);
					}),
					getScrollInfo: function () {
						var s = this.display.scroller;
						return {
							left: s.scrollLeft,
							top: s.scrollTop,
							height: s.scrollHeight - ar(this) - this.display.barHeight,
							width: s.scrollWidth - ar(this) - this.display.barWidth,
							clientHeight: Nu(this),
							clientWidth: _i(this),
						};
					},
					scrollIntoView: tn(function (s, l) {
						s == null
							? ((s = {
									from: this.doc.sel.primary().head,
									to: null,
							  }),
							  l == null && (l = this.options.cursorScrollMargin))
							: typeof s == 'number'
							? (s = {
									from: ne(s, 0),
									to: null,
							  })
							: s.from == null &&
							  (s = {
									from: s,
									to: null,
							  }),
							s.to || (s.to = s.from),
							(s.margin = l || 0),
							s.from.line != null
								? Ly(this, s)
								: s9(this, s.from, s.to, s.margin);
					}),
					setSize: tn(function (s, l) {
						var h = this,
							p = function (y) {
								return typeof y == 'number' || /^\d+$/.test(String(y))
									? y + 'px'
									: y;
							};
						s != null && (this.display.wrapper.style.width = p(s)),
							l != null && (this.display.wrapper.style.height = p(l)),
							this.options.lineWrapping && Xp(this);
						var m = this.display.viewFrom;
						this.doc.iter(m, this.display.viewTo, function (y) {
							if (y.widgets) {
								for (var _ = 0; _ < y.widgets.length; _++)
									if (y.widgets[_].noHScroll) {
										jr(h, m, 'widget');
										break;
									}
							}
							++m;
						}),
							(this.curOp.forceUpdate = !0),
							re(this, 'refresh', this);
					}),
					operation: function (s) {
						return gn(this, s);
					},
					startOperation: function () {
						return ki(this);
					},
					endOperation: function () {
						return Oi(this);
					},
					refresh: tn(function () {
						var s = this.display.cachedTextHeight;
						on(this),
							(this.curOp.forceUpdate = !0),
							bo(this),
							xo(this, this.doc.scrollLeft, this.doc.scrollTop),
							Wu(this.display),
							(s == null ||
								Math.abs(s - p1(this.display)) > 0.5 ||
								this.options.lineWrapping) &&
								Ru(this),
							re(this, 'refresh', this);
					}),
					swapDoc: tn(function (s) {
						var l = this.doc;
						return (
							(l.cm = null),
							this.state.selectingText && this.state.selectingText(),
							y9(this, s),
							bo(this),
							this.display.input.reset(),
							xo(this, s.scrollLeft, s.scrollTop),
							(this.curOp.forceScroll = !0),
							Dt(this, 'swapDoc', this, l),
							l
						);
					}),
					phrase: function (s) {
						var l = this.options.phrases;
						return l && Object.prototype.hasOwnProperty.call(l, s) ? l[s] : s;
					},
					getInputField: function () {
						return this.display.input.getField();
					},
					getWrapperElement: function () {
						return this.display.wrapper;
					},
					getScrollerElement: function () {
						return this.display.scroller;
					},
					getGutterElement: function () {
						return this.display.gutters;
					},
				}),
					ut(n),
					(n.registerHelper = function (s, l, h) {
						a.hasOwnProperty(s) ||
							(a[s] = n[s] =
								{
									_global: [],
								}),
							(a[s][l] = h);
					}),
					(n.registerGlobalHelper = function (s, l, h, p) {
						n.registerHelper(s, l, p),
							a[s]._global.push({
								pred: h,
								val: p,
							});
					});
			}
			function sc(n, i, a, s, l) {
				var h = i,
					p = a,
					m = Se(n, i.line),
					y = l && n.direction == 'rtl' ? -a : a;
				function _() {
					var ge = i.line + y;
					return ge < n.first || ge >= n.first + n.size
						? !1
						: ((i = new ne(ge, i.ch, i.sticky)), (m = Se(n, ge)));
				}
				function N(ge) {
					var de;
					if (s == 'codepoint') {
						var Te = m.text.charCodeAt(i.ch + (a > 0 ? 0 : -1));
						if (isNaN(Te)) de = null;
						else {
							var xe =
								a > 0 ? Te >= 55296 && Te < 56320 : Te >= 56320 && Te < 57343;
							de = new ne(
								i.line,
								Math.max(0, Math.min(m.text.length, i.ch + a * (xe ? 2 : 1))),
								-a
							);
						}
					} else l ? (de = pA(n.cm, m, i, a)) : (de = $u(m, i, a));
					if (de == null)
						if (!ge && _()) i = ec(l, n.cm, m, i.line, y);
						else return !1;
					else i = de;
					return !0;
				}
				if (s == 'char' || s == 'codepoint') N();
				else if (s == 'column') N(!0);
				else if (s == 'word' || s == 'group')
					for (
						var k = null,
							U = s == 'group',
							B = n.cm && n.cm.getHelper(i, 'wordChars'),
							q = !0;
						!(a < 0 && !N(!q));
						q = !1
					) {
						var $ =
								m.text.charAt(i.ch) ||
								`
`,
							oe = ie($, B)
								? 'w'
								: U &&
								  $ ==
										`
`
								? 'n'
								: !U || /\s/.test($)
								? null
								: 'p';
						if ((U && !q && !oe && (oe = 's'), k && k != oe)) {
							a < 0 && ((a = 1), N(), (i.sticky = 'after'));
							break;
						}
						if ((oe && (k = oe), a > 0 && !N(!q))) break;
					}
				var he = Aa(n, i, h, p, !0);
				return gu(h, he) && (he.hitSide = !0), he;
			}
			function p5(n, i, a, s) {
				var l = n.doc,
					h = i.left,
					p;
				if (s == 'page') {
					var m = Math.min(
							n.display.wrapper.clientHeight,
							window.innerHeight || document.documentElement.clientHeight
						),
						y = Math.max(m - 0.5 * p1(n.display), 3);
					p = (a > 0 ? i.bottom : i.top) + a * y;
				} else s == 'line' && (p = a > 0 ? i.bottom + 3 : i.top - 3);
				for (var _; (_ = wu(n, h, p)), !!_.outside; ) {
					if (a < 0 ? p <= 0 : p >= l.height) {
						_.hitSide = !0;
						break;
					}
					p += a * 5;
				}
				return _;
			}
			var nt = function (n) {
				(this.cm = n),
					(this.lastAnchorNode =
						this.lastAnchorOffset =
						this.lastFocusNode =
						this.lastFocusOffset =
							null),
					(this.polling = new Ce()),
					(this.composing = null),
					(this.gracePeriod = !1),
					(this.readDOMTimeout = null);
			};
			(nt.prototype.init = function (n) {
				var i = this,
					a = this,
					s = a.cm,
					l = (a.div = n.lineDiv);
				(l.contentEditable = !0),
					h5(
						l,
						s.options.spellcheck,
						s.options.autocorrect,
						s.options.autocapitalize
					);
				function h(m) {
					for (var y = m.target; y; y = y.parentNode) {
						if (y == l) return !0;
						if (/\bCodeMirror-(?:line)?widget\b/.test(y.className)) break;
					}
					return !1;
				}
				Ee(l, 'paste', function (m) {
					!h(m) ||
						me(s, m) ||
						u5(m, s) ||
						(d <= 11 &&
							setTimeout(
								Pt(s, function () {
									return i.updateFromDOM();
								}),
								20
							));
				}),
					Ee(l, 'compositionstart', function (m) {
						i.composing = {
							data: m.data,
							done: !1,
						};
					}),
					Ee(l, 'compositionupdate', function (m) {
						i.composing ||
							(i.composing = {
								data: m.data,
								done: !1,
							});
					}),
					Ee(l, 'compositionend', function (m) {
						i.composing &&
							(m.data != i.composing.data && i.readFromDOMSoon(),
							(i.composing.done = !0));
					}),
					Ee(l, 'touchstart', function () {
						return a.forceCompositionEnd();
					}),
					Ee(l, 'input', function () {
						i.composing || i.readFromDOMSoon();
					});
				function p(m) {
					if (!(!h(m) || me(s, m))) {
						if (s.somethingSelected())
							xa({
								lineWise: !1,
								text: s.getSelections(),
							}),
								m.type == 'cut' && s.replaceSelection('', null, 'cut');
						else if (s.options.lineWiseCopyCut) {
							var y = f5(s);
							xa({
								lineWise: !0,
								text: y.text,
							}),
								m.type == 'cut' &&
									s.operation(function () {
										s.setSelections(y.ranges, 0, Ge),
											s.replaceSelection('', null, 'cut');
									});
						} else return;
						if (m.clipboardData) {
							m.clipboardData.clearData();
							var _ = Xn.text.join(`
`);
							if (
								(m.clipboardData.setData('Text', _),
								m.clipboardData.getData('Text') == _)
							) {
								m.preventDefault();
								return;
							}
						}
						var N = d5(),
							k = N.firstChild;
						s.display.lineSpace.insertBefore(N, s.display.lineSpace.firstChild),
							(k.value = Xn.text.join(`
`));
						var U = se();
						Oe(k),
							setTimeout(function () {
								s.display.lineSpace.removeChild(N),
									U.focus(),
									U == l && a.showPrimarySelection();
							}, 50);
					}
				}
				Ee(l, 'copy', p), Ee(l, 'cut', p);
			}),
				(nt.prototype.screenReaderLabelChanged = function (n) {
					n
						? this.div.setAttribute('aria-label', n)
						: this.div.removeAttribute('aria-label');
				}),
				(nt.prototype.prepareSelection = function () {
					var n = r9(this.cm, !1);
					return (n.focus = se() == this.div), n;
				}),
				(nt.prototype.showSelection = function (n, i) {
					!n ||
						!this.cm.display.view.length ||
						((n.focus || i) && this.showPrimarySelection(),
						this.showMultipleSelections(n));
				}),
				(nt.prototype.getSelection = function () {
					return this.cm.display.wrapper.ownerDocument.getSelection();
				}),
				(nt.prototype.showPrimarySelection = function () {
					var n = this.getSelection(),
						i = this.cm,
						a = i.doc.sel.primary(),
						s = a.from(),
						l = a.to();
					if (
						i.display.viewTo == i.display.viewFrom ||
						s.line >= i.display.viewTo ||
						l.line < i.display.viewFrom
					) {
						n.removeAllRanges();
						return;
					}
					var h = ka(i, n.anchorNode, n.anchorOffset),
						p = ka(i, n.focusNode, n.focusOffset);
					if (
						!(
							h &&
							!h.bad &&
							p &&
							!p.bad &&
							Le($s(h, p), s) == 0 &&
							Le(Js(h, p), l) == 0
						)
					) {
						var m = i.display.view,
							y = (s.line >= i.display.viewFrom && g5(i, s)) || {
								node: m[0].measure.map[2],
								offset: 0,
							},
							_ = l.line < i.display.viewTo && g5(i, l);
						if (!_) {
							var N = m[m.length - 1].measure,
								k = N.maps ? N.maps[N.maps.length - 1] : N.map;
							_ = {
								node: k[k.length - 1],
								offset: k[k.length - 2] - k[k.length - 3],
							};
						}
						if (!y || !_) {
							n.removeAllRanges();
							return;
						}
						var U = n.rangeCount && n.getRangeAt(0),
							B;
						try {
							B = J(y.node, y.offset, _.offset, _.node);
						} catch {}
						B &&
							(!r && i.state.focused
								? (n.collapse(y.node, y.offset),
								  B.collapsed || (n.removeAllRanges(), n.addRange(B)))
								: (n.removeAllRanges(), n.addRange(B)),
							U && n.anchorNode == null
								? n.addRange(U)
								: r && this.startGracePeriod()),
							this.rememberSelection();
					}
				}),
				(nt.prototype.startGracePeriod = function () {
					var n = this;
					clearTimeout(this.gracePeriod),
						(this.gracePeriod = setTimeout(function () {
							(n.gracePeriod = !1),
								n.selectionChanged() &&
									n.cm.operation(function () {
										return (n.cm.curOp.selectionChanged = !0);
									});
						}, 20));
				}),
				(nt.prototype.showMultipleSelections = function (n) {
					X(this.cm.display.cursorDiv, n.cursors),
						X(this.cm.display.selectionDiv, n.selection);
				}),
				(nt.prototype.rememberSelection = function () {
					var n = this.getSelection();
					(this.lastAnchorNode = n.anchorNode),
						(this.lastAnchorOffset = n.anchorOffset),
						(this.lastFocusNode = n.focusNode),
						(this.lastFocusOffset = n.focusOffset);
				}),
				(nt.prototype.selectionInEditor = function () {
					var n = this.getSelection();
					if (!n.rangeCount) return !1;
					var i = n.getRangeAt(0).commonAncestorContainer;
					return Q(this.div, i);
				}),
				(nt.prototype.focus = function () {
					this.cm.options.readOnly != 'nocursor' &&
						((!this.selectionInEditor() || se() != this.div) &&
							this.showSelection(this.prepareSelection(), !0),
						this.div.focus());
				}),
				(nt.prototype.blur = function () {
					this.div.blur();
				}),
				(nt.prototype.getField = function () {
					return this.div;
				}),
				(nt.prototype.supportsTouch = function () {
					return !0;
				}),
				(nt.prototype.receivedFocus = function () {
					var n = this,
						i = this;
					this.selectionInEditor()
						? setTimeout(function () {
								return n.pollSelection();
						  }, 20)
						: gn(this.cm, function () {
								return (i.cm.curOp.selectionChanged = !0);
						  });
					function a() {
						i.cm.state.focused &&
							(i.pollSelection(), i.polling.set(i.cm.options.pollInterval, a));
					}
					this.polling.set(this.cm.options.pollInterval, a);
				}),
				(nt.prototype.selectionChanged = function () {
					var n = this.getSelection();
					return (
						n.anchorNode != this.lastAnchorNode ||
						n.anchorOffset != this.lastAnchorOffset ||
						n.focusNode != this.lastFocusNode ||
						n.focusOffset != this.lastFocusOffset
					);
				}),
				(nt.prototype.pollSelection = function () {
					if (
						!(
							this.readDOMTimeout != null ||
							this.gracePeriod ||
							!this.selectionChanged()
						)
					) {
						var n = this.getSelection(),
							i = this.cm;
						if (
							P &&
							A &&
							this.cm.display.gutterSpecs.length &&
							RA(n.anchorNode)
						) {
							this.cm.triggerOnKeyDown({
								type: 'keydown',
								keyCode: 8,
								preventDefault: Math.abs,
							}),
								this.blur(),
								this.focus();
							return;
						}
						if (!this.composing) {
							this.rememberSelection();
							var a = ka(i, n.anchorNode, n.anchorOffset),
								s = ka(i, n.focusNode, n.focusOffset);
							a &&
								s &&
								gn(i, function () {
									Qt(i.doc, qr(a, s), Ge),
										(a.bad || s.bad) && (i.curOp.selectionChanged = !0);
								});
						}
					}
				}),
				(nt.prototype.pollContent = function () {
					this.readDOMTimeout != null &&
						(clearTimeout(this.readDOMTimeout), (this.readDOMTimeout = null));
					var n = this.cm,
						i = n.display,
						a = n.doc.sel.primary(),
						s = a.from(),
						l = a.to();
					if (
						(s.ch == 0 &&
							s.line > n.firstLine() &&
							(s = ne(s.line - 1, Se(n.doc, s.line - 1).length)),
						l.ch == Se(n.doc, l.line).text.length &&
							l.line < n.lastLine() &&
							(l = ne(l.line + 1, 0)),
						s.line < i.viewFrom || l.line > i.viewTo - 1)
					)
						return !1;
					var h, p, m;
					s.line == i.viewFrom || (h = bi(n, s.line)) == 0
						? ((p = tt(i.view[0].line)), (m = i.view[0].node))
						: ((p = tt(i.view[h].line)), (m = i.view[h - 1].node.nextSibling));
					var y = bi(n, l.line),
						_,
						N;
					if (
						(y == i.view.length - 1
							? ((_ = i.viewTo - 1), (N = i.lineDiv.lastChild))
							: ((_ = tt(i.view[y + 1].line) - 1),
							  (N = i.view[y + 1].node.previousSibling)),
						!m)
					)
						return !1;
					for (
						var k = n.doc.splitLines(DA(n, m, N, p, _)),
							U = yi(n.doc, ne(p, 0), ne(_, Se(n.doc, _).text.length));
						k.length > 1 && U.length > 1;

					)
						if (De(k) == De(U)) k.pop(), U.pop(), _--;
						else if (k[0] == U[0]) k.shift(), U.shift(), p++;
						else break;
					for (
						var B = 0,
							q = 0,
							$ = k[0],
							oe = U[0],
							he = Math.min($.length, oe.length);
						B < he && $.charCodeAt(B) == oe.charCodeAt(B);

					)
						++B;
					for (
						var ge = De(k),
							de = De(U),
							Te = Math.min(
								ge.length - (k.length == 1 ? B : 0),
								de.length - (U.length == 1 ? B : 0)
							);
						q < Te &&
						ge.charCodeAt(ge.length - q - 1) ==
							de.charCodeAt(de.length - q - 1);

					)
						++q;
					if (k.length == 1 && U.length == 1 && p == s.line)
						for (
							;
							B &&
							B > s.ch &&
							ge.charCodeAt(ge.length - q - 1) ==
								de.charCodeAt(de.length - q - 1);

						)
							B--, q++;
					(k[k.length - 1] = ge
						.slice(0, ge.length - q)
						.replace(/^\u200b+/, '')),
						(k[0] = k[0].slice(B).replace(/\u200b+$/, ''));
					var xe = ne(p, B),
						be = ne(_, U.length ? De(U).length - q : 0);
					if (k.length > 1 || k[0] || Le(xe, be))
						return _1(n.doc, k, xe, be, '+input'), !0;
				}),
				(nt.prototype.ensurePolled = function () {
					this.forceCompositionEnd();
				}),
				(nt.prototype.reset = function () {
					this.forceCompositionEnd();
				}),
				(nt.prototype.forceCompositionEnd = function () {
					this.composing &&
						(clearTimeout(this.readDOMTimeout),
						(this.composing = null),
						this.updateFromDOM(),
						this.div.blur(),
						this.div.focus());
				}),
				(nt.prototype.readFromDOMSoon = function () {
					var n = this;
					this.readDOMTimeout == null &&
						(this.readDOMTimeout = setTimeout(function () {
							if (((n.readDOMTimeout = null), n.composing))
								if (n.composing.done) n.composing = null;
								else return;
							n.updateFromDOM();
						}, 80));
				}),
				(nt.prototype.updateFromDOM = function () {
					var n = this;
					(this.cm.isReadOnly() || !this.pollContent()) &&
						gn(this.cm, function () {
							return on(n.cm);
						});
				}),
				(nt.prototype.setUneditable = function (n) {
					n.contentEditable = 'false';
				}),
				(nt.prototype.onKeyPress = function (n) {
					n.charCode == 0 ||
						this.composing ||
						(n.preventDefault(),
						this.cm.isReadOnly() ||
							Pt(this.cm, oc)(
								this.cm,
								String.fromCharCode(
									n.charCode == null ? n.keyCode : n.charCode
								),
								0
							));
				}),
				(nt.prototype.readOnlyChanged = function (n) {
					this.div.contentEditable = String(n != 'nocursor');
				}),
				(nt.prototype.onContextMenu = function () {}),
				(nt.prototype.resetPosition = function () {}),
				(nt.prototype.needsContentAttribute = !0);
			function g5(n, i) {
				var a = xu(n, i.line);
				if (!a || a.hidden) return null;
				var s = Se(n.doc, i.line),
					l = Wp(a, s, i.line),
					h = Ne(s, n.doc.direction),
					p = 'left';
				if (h) {
					var m = Y(h, i.ch);
					p = m % 2 ? 'right' : 'left';
				}
				var y = Yp(l.map, i.ch, p);
				return (y.offset = y.collapse == 'right' ? y.end : y.start), y;
			}
			function RA(n) {
				for (var i = n; i; i = i.parentNode)
					if (/CodeMirror-gutter-wrapper/.test(i.className)) return !0;
				return !1;
			}
			function x1(n, i) {
				return i && (n.bad = !0), n;
			}
			function DA(n, i, a, s, l) {
				var h = '',
					p = !1,
					m = n.doc.lineSeparator(),
					y = !1;
				function _(B) {
					return function (q) {
						return q.id == B;
					};
				}
				function N() {
					p && ((h += m), y && (h += m), (p = y = !1));
				}
				function k(B) {
					B && (N(), (h += B));
				}
				function U(B) {
					if (B.nodeType == 1) {
						var q = B.getAttribute('cm-text');
						if (q) {
							k(q);
							return;
						}
						var $ = B.getAttribute('cm-marker'),
							oe;
						if ($) {
							var he = n.findMarks(ne(s, 0), ne(l + 1, 0), _(+$));
							he.length &&
								(oe = he[0].find(0)) &&
								k(yi(n.doc, oe.from, oe.to).join(m));
							return;
						}
						if (B.getAttribute('contenteditable') == 'false') return;
						var ge = /^(pre|div|p|li|table|br)$/i.test(B.nodeName);
						if (!/^br$/i.test(B.nodeName) && B.textContent.length == 0) return;
						ge && N();
						for (var de = 0; de < B.childNodes.length; de++)
							U(B.childNodes[de]);
						/^(pre|p)$/i.test(B.nodeName) && (y = !0), ge && (p = !0);
					} else
						B.nodeType == 3 &&
							k(B.nodeValue.replace(/\u200b/g, '').replace(/\u00a0/g, ' '));
				}
				for (; U(i), i != a; ) (i = i.nextSibling), (y = !1);
				return h;
			}
			function ka(n, i, a) {
				var s;
				if (i == n.display.lineDiv) {
					if (((s = n.display.lineDiv.childNodes[a]), !s))
						return x1(n.clipPos(ne(n.display.viewTo - 1)), !0);
					(i = null), (a = 0);
				} else
					for (s = i; ; s = s.parentNode) {
						if (!s || s == n.display.lineDiv) return null;
						if (s.parentNode && s.parentNode == n.display.lineDiv) break;
					}
				for (var l = 0; l < n.display.view.length; l++) {
					var h = n.display.view[l];
					if (h.node == s) return PA(h, i, a);
				}
			}
			function PA(n, i, a) {
				var s = n.text.firstChild,
					l = !1;
				if (!i || !Q(s, i)) return x1(ne(tt(n.line), 0), !0);
				if (i == s && ((l = !0), (i = s.childNodes[a]), (a = 0), !i)) {
					var h = n.rest ? De(n.rest) : n.line;
					return x1(ne(tt(h), h.text.length), l);
				}
				var p = i.nodeType == 3 ? i : null,
					m = i;
				for (
					!p &&
					i.childNodes.length == 1 &&
					i.firstChild.nodeType == 3 &&
					((p = i.firstChild), a && (a = p.nodeValue.length));
					m.parentNode != s;

				)
					m = m.parentNode;
				var y = n.measure,
					_ = y.maps;
				function N(oe, he, ge) {
					for (var de = -1; de < (_ ? _.length : 0); de++)
						for (
							var Te = de < 0 ? y.map : _[de], xe = 0;
							xe < Te.length;
							xe += 3
						) {
							var be = Te[xe + 2];
							if (be == oe || be == he) {
								var He = tt(de < 0 ? n.line : n.rest[de]),
									st = Te[xe] + ge;
								return (
									(ge < 0 || be != oe) && (st = Te[xe + (ge ? 1 : 0)]),
									ne(He, st)
								);
							}
						}
				}
				var k = N(p, m, a);
				if (k) return x1(k, l);
				for (
					var U = m.nextSibling, B = p ? p.nodeValue.length - a : 0;
					U;
					U = U.nextSibling
				) {
					if (((k = N(U, U.firstChild, 0)), k))
						return x1(ne(k.line, k.ch - B), l);
					B += U.textContent.length;
				}
				for (var q = m.previousSibling, $ = a; q; q = q.previousSibling) {
					if (((k = N(q, q.firstChild, -1)), k))
						return x1(ne(k.line, k.ch + $), l);
					$ += q.textContent.length;
				}
			}
			var Et = function (n) {
				(this.cm = n),
					(this.prevInput = ''),
					(this.pollingFast = !1),
					(this.polling = new Ce()),
					(this.hasSelection = !1),
					(this.composing = null);
			};
			(Et.prototype.init = function (n) {
				var i = this,
					a = this,
					s = this.cm;
				this.createField(n);
				var l = this.textarea;
				n.wrapper.insertBefore(this.wrapper, n.wrapper.firstChild),
					D && (l.style.width = '0px'),
					Ee(l, 'input', function () {
						f && d >= 9 && i.hasSelection && (i.hasSelection = null), a.poll();
					}),
					Ee(l, 'paste', function (p) {
						me(s, p) ||
							u5(p, s) ||
							((s.state.pasteIncoming = +new Date()), a.fastPoll());
					});
				function h(p) {
					if (!me(s, p)) {
						if (s.somethingSelected())
							xa({
								lineWise: !1,
								text: s.getSelections(),
							});
						else if (s.options.lineWiseCopyCut) {
							var m = f5(s);
							xa({
								lineWise: !0,
								text: m.text,
							}),
								p.type == 'cut'
									? s.setSelections(m.ranges, null, Ge)
									: ((a.prevInput = ''),
									  (l.value = m.text.join(`
`)),
									  Oe(l));
						} else return;
						p.type == 'cut' && (s.state.cutIncoming = +new Date());
					}
				}
				Ee(l, 'cut', h),
					Ee(l, 'copy', h),
					Ee(n.scroller, 'paste', function (p) {
						if (!(br(n, p) || me(s, p))) {
							if (!l.dispatchEvent) {
								(s.state.pasteIncoming = +new Date()), a.focus();
								return;
							}
							var m = new Event('paste');
							(m.clipboardData = p.clipboardData), l.dispatchEvent(m);
						}
					}),
					Ee(n.lineSpace, 'selectstart', function (p) {
						br(n, p) || We(p);
					}),
					Ee(l, 'compositionstart', function () {
						var p = s.getCursor('from');
						a.composing && a.composing.range.clear(),
							(a.composing = {
								start: p,
								range: s.markText(p, s.getCursor('to'), {
									className: 'CodeMirror-composing',
								}),
							});
					}),
					Ee(l, 'compositionend', function () {
						a.composing &&
							(a.poll(), a.composing.range.clear(), (a.composing = null));
					});
			}),
				(Et.prototype.createField = function (n) {
					(this.wrapper = d5()), (this.textarea = this.wrapper.firstChild);
				}),
				(Et.prototype.screenReaderLabelChanged = function (n) {
					n
						? this.textarea.setAttribute('aria-label', n)
						: this.textarea.removeAttribute('aria-label');
				}),
				(Et.prototype.prepareSelection = function () {
					var n = this.cm,
						i = n.display,
						a = n.doc,
						s = r9(n);
					if (n.options.moveInputWithCursor) {
						var l = Yn(n, a.sel.primary().head, 'div'),
							h = i.wrapper.getBoundingClientRect(),
							p = i.lineDiv.getBoundingClientRect();
						(s.teTop = Math.max(
							0,
							Math.min(i.wrapper.clientHeight - 10, l.top + p.top - h.top)
						)),
							(s.teLeft = Math.max(
								0,
								Math.min(i.wrapper.clientWidth - 10, l.left + p.left - h.left)
							));
					}
					return s;
				}),
				(Et.prototype.showSelection = function (n) {
					var i = this.cm,
						a = i.display;
					X(a.cursorDiv, n.cursors),
						X(a.selectionDiv, n.selection),
						n.teTop != null &&
							((this.wrapper.style.top = n.teTop + 'px'),
							(this.wrapper.style.left = n.teLeft + 'px'));
				}),
				(Et.prototype.reset = function (n) {
					if (!(this.contextMenuPending || this.composing)) {
						var i = this.cm;
						if (i.somethingSelected()) {
							this.prevInput = '';
							var a = i.getSelection();
							(this.textarea.value = a),
								i.state.focused && Oe(this.textarea),
								f && d >= 9 && (this.hasSelection = a);
						} else
							n ||
								((this.prevInput = this.textarea.value = ''),
								f && d >= 9 && (this.hasSelection = null));
					}
				}),
				(Et.prototype.getField = function () {
					return this.textarea;
				}),
				(Et.prototype.supportsTouch = function () {
					return !1;
				}),
				(Et.prototype.focus = function () {
					if (
						this.cm.options.readOnly != 'nocursor' &&
						(!I || se() != this.textarea)
					)
						try {
							this.textarea.focus();
						} catch {}
				}),
				(Et.prototype.blur = function () {
					this.textarea.blur();
				}),
				(Et.prototype.resetPosition = function () {
					this.wrapper.style.top = this.wrapper.style.left = 0;
				}),
				(Et.prototype.receivedFocus = function () {
					this.slowPoll();
				}),
				(Et.prototype.slowPoll = function () {
					var n = this;
					this.pollingFast ||
						this.polling.set(this.cm.options.pollInterval, function () {
							n.poll(), n.cm.state.focused && n.slowPoll();
						});
				}),
				(Et.prototype.fastPoll = function () {
					var n = !1,
						i = this;
					i.pollingFast = !0;
					function a() {
						var s = i.poll();
						!s && !n
							? ((n = !0), i.polling.set(60, a))
							: ((i.pollingFast = !1), i.slowPoll());
					}
					i.polling.set(20, a);
				}),
				(Et.prototype.poll = function () {
					var n = this,
						i = this.cm,
						a = this.textarea,
						s = this.prevInput;
					if (
						this.contextMenuPending ||
						!i.state.focused ||
						(D7(a) && !s && !this.composing) ||
						i.isReadOnly() ||
						i.options.disableInput ||
						i.state.keySeq
					)
						return !1;
					var l = a.value;
					if (l == s && !i.somethingSelected()) return !1;
					if (
						(f && d >= 9 && this.hasSelection === l) ||
						(z && /[\uf700-\uf7ff]/.test(l))
					)
						return i.display.input.reset(), !1;
					if (i.doc.sel == i.display.selForContextMenu) {
						var h = l.charCodeAt(0);
						if ((h == 8203 && !s && (s = '​'), h == 8666))
							return this.reset(), this.cm.execCommand('undo');
					}
					for (
						var p = 0, m = Math.min(s.length, l.length);
						p < m && s.charCodeAt(p) == l.charCodeAt(p);

					)
						++p;
					return (
						gn(i, function () {
							oc(
								i,
								l.slice(p),
								s.length - p,
								null,
								n.composing ? '*compose' : null
							),
								l.length > 1e3 ||
								l.indexOf(`
`) > -1
									? (a.value = n.prevInput = '')
									: (n.prevInput = l),
								n.composing &&
									(n.composing.range.clear(),
									(n.composing.range = i.markText(
										n.composing.start,
										i.getCursor('to'),
										{
											className: 'CodeMirror-composing',
										}
									)));
						}),
						!0
					);
				}),
				(Et.prototype.ensurePolled = function () {
					this.pollingFast && this.poll() && (this.pollingFast = !1);
				}),
				(Et.prototype.onKeyPress = function () {
					f && d >= 9 && (this.hasSelection = null), this.fastPoll();
				}),
				(Et.prototype.onContextMenu = function (n) {
					var i = this,
						a = i.cm,
						s = a.display,
						l = i.textarea;
					i.contextMenuPending && i.contextMenuPending();
					var h = Si(a, n),
						p = s.scroller.scrollTop;
					if (!h || C) return;
					var m = a.options.resetSelectionOnContextMenu;
					m && a.doc.sel.contains(h) == -1 && Pt(a, Qt)(a.doc, qr(h), Ge);
					var y = l.style.cssText,
						_ = i.wrapper.style.cssText,
						N = i.wrapper.offsetParent.getBoundingClientRect();
					(i.wrapper.style.cssText = 'position: static'),
						(l.style.cssText =
							`position: absolute; width: 30px; height: 30px;
      top: ` +
							(n.clientY - N.top - 5) +
							'px; left: ' +
							(n.clientX - N.left - 5) +
							`px;
      z-index: 1000; background: ` +
							(f ? 'rgba(255, 255, 255, .05)' : 'transparent') +
							`;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`);
					var k;
					g && (k = window.scrollY),
						s.input.focus(),
						g && window.scrollTo(null, k),
						s.input.reset(),
						a.somethingSelected() || (l.value = i.prevInput = ' '),
						(i.contextMenuPending = B),
						(s.selForContextMenu = a.doc.sel),
						clearTimeout(s.detectingSelectAll);
					function U() {
						if (l.selectionStart != null) {
							var $ = a.somethingSelected(),
								oe = '​' + ($ ? l.value : '');
							(l.value = '⇚'),
								(l.value = oe),
								(i.prevInput = $ ? '' : '​'),
								(l.selectionStart = 1),
								(l.selectionEnd = oe.length),
								(s.selForContextMenu = a.doc.sel);
						}
					}
					function B() {
						if (
							i.contextMenuPending == B &&
							((i.contextMenuPending = !1),
							(i.wrapper.style.cssText = _),
							(l.style.cssText = y),
							f &&
								d < 9 &&
								s.scrollbars.setScrollTop((s.scroller.scrollTop = p)),
							l.selectionStart != null)
						) {
							(!f || (f && d < 9)) && U();
							var $ = 0,
								oe = function () {
									s.selForContextMenu == a.doc.sel &&
									l.selectionStart == 0 &&
									l.selectionEnd > 0 &&
									i.prevInput == '​'
										? Pt(a, M9)(a)
										: $++ < 10
										? (s.detectingSelectAll = setTimeout(oe, 500))
										: ((s.selForContextMenu = null), s.input.reset());
								};
							s.detectingSelectAll = setTimeout(oe, 200);
						}
					}
					if ((f && d >= 9 && U(), W)) {
						Sn(n);
						var q = function () {
							j(window, 'mouseup', q), setTimeout(B, 20);
						};
						Ee(window, 'mouseup', q);
					} else setTimeout(B, 50);
				}),
				(Et.prototype.readOnlyChanged = function (n) {
					n || this.reset(),
						(this.textarea.disabled = n == 'nocursor'),
						(this.textarea.readOnly = !!n);
				}),
				(Et.prototype.setUneditable = function () {}),
				(Et.prototype.needsContentAttribute = !1);
			function FA(n, i) {
				if (
					((i = i ? E(i) : {}),
					(i.value = n.value),
					!i.tabindex && n.tabIndex && (i.tabindex = n.tabIndex),
					!i.placeholder && n.placeholder && (i.placeholder = n.placeholder),
					i.autofocus == null)
				) {
					var a = se();
					i.autofocus =
						a == n ||
						(n.getAttribute('autofocus') != null && a == document.body);
				}
				function s() {
					n.value = m.getValue();
				}
				var l;
				if (n.form && (Ee(n.form, 'submit', s), !i.leaveSubmitMethodAlone)) {
					var h = n.form;
					l = h.submit;
					try {
						var p = (h.submit = function () {
							s(), (h.submit = l), h.submit(), (h.submit = p);
						});
					} catch {}
				}
				(i.finishInit = function (y) {
					(y.save = s),
						(y.getTextArea = function () {
							return n;
						}),
						(y.toTextArea = function () {
							(y.toTextArea = isNaN),
								s(),
								n.parentNode.removeChild(y.getWrapperElement()),
								(n.style.display = ''),
								n.form &&
									(j(n.form, 'submit', s),
									!i.leaveSubmitMethodAlone &&
										typeof n.form.submit == 'function' &&
										(n.form.submit = l));
						});
				}),
					(n.style.display = 'none');
				var m = dt(function (y) {
					return n.parentNode.insertBefore(y, n.nextSibling);
				}, i);
				return m;
			}
			function HA(n) {
				(n.off = j),
					(n.on = Ee),
					(n.wheelEventPixels = jy),
					(n.Doc = sn),
					(n.splitLines = lu),
					(n.countColumn = b),
					(n.findColumn = Fe),
					(n.isWordChar = Ot),
					(n.Pass = Pe),
					(n.signal = re),
					(n.Line = f1),
					(n.changeEnd = Xr),
					(n.scrollbarModel = u9),
					(n.Pos = ne),
					(n.cmpPos = Le),
					(n.modes = cu),
					(n.mimeModes = u1),
					(n.resolveMode = Zs),
					(n.getMode = fu),
					(n.modeExtensions = c1),
					(n.extendMode = U7),
					(n.copyState = vi),
					(n.startState = gp),
					(n.innerMode = hu),
					(n.commands = zo),
					(n.keyMap = xr),
					(n.keyName = Q9),
					(n.isModifierKey = q9),
					(n.lookupKey = S1),
					(n.normalizeKeyMap = dA),
					(n.StringStream = yt),
					(n.SharedTextMarker = Bo),
					(n.TextMarker = Vr),
					(n.LineWidget = Ho),
					(n.e_preventDefault = We),
					(n.e_stopPropagation = _r),
					(n.e_stop = Sn),
					(n.addClass = Ae),
					(n.contains = Q),
					(n.rmClass = V),
					(n.keyNames = Zr);
			}
			OA(dt), MA(dt);
			var BA = 'iter insert remove copy getEditor constructor'.split(' ');
			for (var Oa in sn.prototype)
				sn.prototype.hasOwnProperty(Oa) &&
					fe(BA, Oa) < 0 &&
					(dt.prototype[Oa] = (function (n) {
						return function () {
							return n.apply(this.doc, arguments);
						};
					})(sn.prototype[Oa]));
			return (
				ut(sn),
				(dt.inputStyles = {
					textarea: Et,
					contenteditable: nt,
				}),
				(dt.defineMode = function (n) {
					!dt.defaults.mode && n != 'null' && (dt.defaults.mode = n),
						H7.apply(this, arguments);
				}),
				(dt.defineMIME = B7),
				dt.defineMode('null', function () {
					return {
						token: function (n) {
							return n.skipToEnd();
						},
					};
				}),
				dt.defineMIME('text/plain', 'null'),
				(dt.defineExtension = function (n, i) {
					dt.prototype[n] = i;
				}),
				(dt.defineDocExtension = function (n, i) {
					sn.prototype[n] = i;
				}),
				(dt.fromTextArea = FA),
				HA(dt),
				(dt.version = '5.65.3'),
				dt
			);
		},
		x5 = function (e) {
			e.defineOption('placeholder', '', function (d, g, T) {
				var A = T && T != e.Init;
				if (g && !A)
					d.on('blur', u),
						d.on('change', c),
						d.on('swapDoc', c),
						e.on(
							d.getInputField(),
							'compositionupdate',
							(d.state.placeholderCompose = function () {
								o(d);
							})
						),
						c(d);
				else if (!g && A) {
					d.off('blur', u),
						d.off('change', c),
						d.off('swapDoc', c),
						e.off(
							d.getInputField(),
							'compositionupdate',
							d.state.placeholderCompose
						),
						t(d);
					var C = d.getWrapperElement();
					C.className = C.className.replace(' CodeMirror-empty', '');
				}
				g && !d.hasFocus() && u(d);
			});
			function t(d) {
				d.state.placeholder &&
					(d.state.placeholder.parentNode.removeChild(d.state.placeholder),
					(d.state.placeholder = null));
			}
			function r(d) {
				t(d);
				var g = (d.state.placeholder = document.createElement('pre'));
				(g.style.cssText = 'height: 0; overflow: visible'),
					(g.style.direction = d.getOption('direction')),
					(g.className = 'CodeMirror-placeholder CodeMirror-line-like');
				var T = d.getOption('placeholder');
				typeof T == 'string' && (T = document.createTextNode(T)),
					g.appendChild(T),
					d.display.lineSpace.insertBefore(g, d.display.lineSpace.firstChild);
			}
			function o(d) {
				setTimeout(function () {
					var g = !1;
					if (d.lineCount() == 1) {
						var T = d.getInputField();
						g =
							T.nodeName == 'TEXTAREA'
								? !d.getLine(0).length
								: !/[^\u200b]/.test(
										T.querySelector('.CodeMirror-line').textContent
								  );
					}
					g ? r(d) : t(d);
				}, 20);
			}
			function u(d) {
				f(d) && r(d);
			}
			function c(d) {
				var g = d.getWrapperElement(),
					T = f(d);
				(g.className =
					g.className.replace(' CodeMirror-empty', '') +
					(T ? ' CodeMirror-empty' : '')),
					T ? r(d) : t(d);
			}
			function f(d) {
				return d.lineCount() === 1 && d.getLine(0) === '';
			}
		},
		k5 = function (e) {
			var t = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/,
				r = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/,
				o = /[*+-]\s/;
			e.commands.newlineAndIndentContinueMarkdownList = function (c) {
				if (c.getOption('disableInput')) return e.Pass;
				for (var f = c.listSelections(), d = [], g = 0; g < f.length; g++) {
					var T = f[g].head,
						A = c.getStateAfter(T.line),
						C = e.innerMode(c.getMode(), A);
					if (C.mode.name !== 'markdown' && C.mode.helperType !== 'markdown') {
						c.execCommand('newlineAndIndent');
						return;
					} else A = C.state;
					var M = A.list !== !1,
						x = A.quote !== 0,
						S = c.getLine(T.line),
						D = t.exec(S),
						P = /^\s*$/.test(S.slice(0, T.ch));
					if (!f[g].empty() || (!M && !x) || !D || P) {
						c.execCommand('newlineAndIndent');
						return;
					}
					if (r.test(S)) {
						var I = x && />\s*$/.test(S),
							z = !/>\s*$/.test(S);
						(I || z) &&
							c.replaceRange(
								'',
								{
									line: T.line,
									ch: 0,
								},
								{
									line: T.line,
									ch: T.ch + 1,
								}
							),
							(d[g] = `
`);
					} else {
						var K = D[1],
							w = D[5],
							Z = !(o.test(D[2]) || D[2].indexOf('>') >= 0),
							L = Z ? parseInt(D[3], 10) + 1 + D[4] : D[2].replace('x', ' ');
						(d[g] =
							`
` +
							K +
							L +
							w),
							Z && u(c, T);
					}
				}
				c.replaceSelections(d);
			};
			function u(c, f) {
				var d = f.line,
					g = 0,
					T = 0,
					A = t.exec(c.getLine(d)),
					C = A[1];
				do {
					g += 1;
					var M = d + g,
						x = c.getLine(M),
						S = t.exec(x);
					if (S) {
						var D = S[1],
							P = parseInt(A[3], 10) + g - T,
							I = parseInt(S[3], 10),
							z = I;
						if (C === D && !isNaN(I))
							P === I && (z = I + 1),
								P > I && (z = P + 1),
								c.replaceRange(
									x.replace(t, D + z + S[4] + S[5]),
									{
										line: M,
										ch: 0,
									},
									{
										line: M,
										ch: x.length,
									}
								);
						else {
							if (C.length > D.length || (C.length < D.length && g === 1))
								return;
							T += 1;
						}
					}
				} while (S);
			}
		},
		O5 = function (e) {
			e.overlayMode = function (t, r, o) {
				return {
					startState: function () {
						return {
							base: e.startState(t),
							overlay: e.startState(r),
							basePos: 0,
							baseCur: null,
							overlayPos: 0,
							overlayCur: null,
							streamSeen: null,
						};
					},
					copyState: function (u) {
						return {
							base: e.copyState(t, u.base),
							overlay: e.copyState(r, u.overlay),
							basePos: u.basePos,
							baseCur: null,
							overlayPos: u.overlayPos,
							overlayCur: null,
						};
					},
					token: function (u, c) {
						return (
							(u != c.streamSeen ||
								Math.min(c.basePos, c.overlayPos) < u.start) &&
								((c.streamSeen = u), (c.basePos = c.overlayPos = u.start)),
							u.start == c.basePos &&
								((c.baseCur = t.token(u, c.base)), (c.basePos = u.pos)),
							u.start == c.overlayPos &&
								((u.pos = u.start),
								(c.overlayCur = r.token(u, c.overlay)),
								(c.overlayPos = u.pos)),
							(u.pos = Math.min(c.basePos, c.overlayPos)),
							c.overlayCur == null
								? c.baseCur
								: (c.baseCur != null && c.overlay.combineTokens) ||
								  (o && c.overlay.combineTokens == null)
								? c.baseCur + ' ' + c.overlayCur
								: c.overlayCur
						);
					},
					indent:
						t.indent &&
						function (u, c, f) {
							return t.indent(u.base, c, f);
						},
					electricChars: t.electricChars,
					innerMode: function (u) {
						return {
							state: u.base,
							mode: t,
						};
					},
					blankLine: function (u) {
						var c, f;
						return (
							t.blankLine && (c = t.blankLine(u.base)),
							r.blankLine && (f = r.blankLine(u.overlay)),
							f == null ? c : o && c != null ? c + ' ' + f : f
						);
					},
				};
			};
		},
		w5 = function (e) {
			var t =
				/^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i;
			e.defineMode(
				'gfm',
				function (r, o) {
					var u = 0;
					function c(T) {
						return (T.code = !1), null;
					}
					var f = {
							startState: function () {
								return {
									code: !1,
									codeBlock: !1,
									ateSpace: !1,
								};
							},
							copyState: function (T) {
								return {
									code: T.code,
									codeBlock: T.codeBlock,
									ateSpace: T.ateSpace,
								};
							},
							token: function (T, A) {
								if (((A.combineTokens = null), A.codeBlock))
									return T.match(/^```+/)
										? ((A.codeBlock = !1), null)
										: (T.skipToEnd(), null);
								if ((T.sol() && (A.code = !1), T.sol() && T.match(/^```+/)))
									return T.skipToEnd(), (A.codeBlock = !0), null;
								if (T.peek() === '`') {
									T.next();
									var C = T.pos;
									T.eatWhile('`');
									var M = 1 + T.pos - C;
									return (
										A.code
											? M === u && (A.code = !1)
											: ((u = M), (A.code = !0)),
										null
									);
								} else if (A.code) return T.next(), null;
								if (T.eatSpace()) return (A.ateSpace = !0), null;
								if (
									(T.sol() || A.ateSpace) &&
									((A.ateSpace = !1), o.gitHubSpice !== !1)
								) {
									if (
										T.match(
											/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?=.{0,6}\d)(?:[a-f0-9]{7,40}\b)/
										)
									)
										return (A.combineTokens = !0), 'link';
									if (
										T.match(
											/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/
										)
									)
										return (A.combineTokens = !0), 'link';
								}
								return T.match(t) &&
									T.string.slice(T.start - 2, T.start) != '](' &&
									(T.start == 0 || /\W/.test(T.string.charAt(T.start - 1)))
									? ((A.combineTokens = !0), 'link')
									: (T.next(), null);
							},
							blankLine: c,
						},
						d = {
							taskLists: !0,
							strikethrough: !0,
							emoji: !0,
						};
					for (var g in o) d[g] = o[g];
					return (d.name = 'markdown'), e.overlayMode(e.getMode(r, d), f);
				},
				'markdown'
			),
				e.defineMIME('text/x-gfm', 'gfm');
		},
		L5 = function (e) {
			e.defineMode(
				'markdown',
				function (t, r) {
					var o = e.getMode(t, 'text/html'),
						u = o.name == 'null';
					function c(O) {
						if (e.findModeByName) {
							var E = e.findModeByName(O);
							E && (O = E.mime || E.mimes[0]);
						}
						var b = e.getMode(t, O);
						return b.name == 'null' ? null : b;
					}
					r.highlightFormatting === void 0 && (r.highlightFormatting = !1),
						r.maxBlockquoteDepth === void 0 && (r.maxBlockquoteDepth = 0),
						r.taskLists === void 0 && (r.taskLists = !1),
						r.strikethrough === void 0 && (r.strikethrough = !1),
						r.emoji === void 0 && (r.emoji = !1),
						r.fencedCodeBlockHighlighting === void 0 &&
							(r.fencedCodeBlockHighlighting = !0),
						r.fencedCodeBlockDefaultMode === void 0 &&
							(r.fencedCodeBlockDefaultMode = 'text/plain'),
						r.xml === void 0 && (r.xml = !0),
						r.tokenTypeOverrides === void 0 && (r.tokenTypeOverrides = {});
					var f = {
						header: 'header',
						code: 'comment',
						quote: 'quote',
						list1: 'variable-2',
						list2: 'variable-3',
						list3: 'keyword',
						hr: 'hr',
						image: 'image',
						imageAltText: 'image-alt-text',
						imageMarker: 'image-marker',
						formatting: 'formatting',
						linkInline: 'link',
						linkEmail: 'link',
						linkText: 'link',
						linkHref: 'string',
						em: 'em',
						strong: 'strong',
						strikethrough: 'strikethrough',
						emoji: 'builtin',
					};
					for (var d in f)
						f.hasOwnProperty(d) &&
							r.tokenTypeOverrides[d] &&
							(f[d] = r.tokenTypeOverrides[d]);
					var g = /^([*\-_])(?:\s*\1){2,}\s*$/,
						T = /^(?:[*\-+]|^[0-9]+([.)]))\s+/,
						A = /^\[(x| )\](?=\s)/i,
						C = r.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/,
						M = /^ {0,3}(?:\={1,}|-{2,})\s*$/,
						x = /^[^#!\[\]*_\\<>` "'(~:]+/,
						S = /^(~~~+|```+)[ \t]*([\w\/+#-]*)[^\n`]*$/,
						D = /^\s*\[[^\]]+?\]:.*$/,
						P =
							/[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/,
						I = '    ';
					function z(O, E, b) {
						return (E.f = E.inline = b), b(O, E);
					}
					function K(O, E, b) {
						return (E.f = E.block = b), b(O, E);
					}
					function w(O) {
						return !O || !/\S/.test(O.string);
					}
					function Z(O) {
						if (
							((O.linkTitle = !1),
							(O.linkHref = !1),
							(O.linkText = !1),
							(O.em = !1),
							(O.strong = !1),
							(O.strikethrough = !1),
							(O.quote = 0),
							(O.indentedCode = !1),
							O.f == W)
						) {
							var E = u;
							if (!E) {
								var b = e.innerMode(o, O.htmlState);
								E =
									b.mode.name == 'xml' &&
									b.state.tagStart === null &&
									!b.state.context &&
									b.state.tokenize.isInText;
							}
							E && ((O.f = X), (O.block = L), (O.htmlState = null));
						}
						return (
							(O.trailingSpace = 0),
							(O.trailingSpaceNewLine = !1),
							(O.prevLine = O.thisLine),
							(O.thisLine = {
								stream: null,
							}),
							null
						);
					}
					function L(O, E) {
						var b = O.column() === E.indentation,
							Ce = w(E.prevLine.stream),
							fe = E.indentedCode,
							Ue = E.prevLine.hr,
							Pe = E.list !== !1,
							Ge = (E.listStack[E.listStack.length - 1] || 0) + 3;
						E.indentedCode = !1;
						var Ve = E.indentation;
						if (
							E.indentationDiff === null &&
							((E.indentationDiff = E.indentation), Pe)
						) {
							for (E.list = null; Ve < E.listStack[E.listStack.length - 1]; )
								E.listStack.pop(),
									E.listStack.length
										? (E.indentation = E.listStack[E.listStack.length - 1])
										: (E.list = !1);
							E.list !== !1 &&
								(E.indentationDiff = Ve - E.listStack[E.listStack.length - 1]);
						}
						var rt =
								!Ce &&
								!Ue &&
								!E.prevLine.header &&
								(!Pe || !fe) &&
								!E.prevLine.fencedCodeEnd,
							Fe =
								(E.list === !1 || Ue || Ce) &&
								E.indentation <= Ge &&
								O.match(g),
							Ze = null;
						if (
							E.indentationDiff >= 4 &&
							(fe || E.prevLine.fencedCodeEnd || E.prevLine.header || Ce)
						)
							return O.skipToEnd(), (E.indentedCode = !0), f.code;
						if (O.eatSpace()) return null;
						if (
							b &&
							E.indentation <= Ge &&
							(Ze = O.match(C)) &&
							Ze[1].length <= 6
						)
							return (
								(E.quote = 0),
								(E.header = Ze[1].length),
								(E.thisLine.header = !0),
								r.highlightFormatting && (E.formatting = 'header'),
								(E.f = E.inline),
								V(E)
							);
						if (E.indentation <= Ge && O.eat('>'))
							return (
								(E.quote = b ? 1 : E.quote + 1),
								r.highlightFormatting && (E.formatting = 'quote'),
								O.eatSpace(),
								V(E)
							);
						if (
							!Fe &&
							!E.setext &&
							b &&
							E.indentation <= Ge &&
							(Ze = O.match(T))
						) {
							var qt = Ze[1] ? 'ol' : 'ul';
							return (
								(E.indentation = Ve + O.current().length),
								(E.list = !0),
								(E.quote = 0),
								E.listStack.push(E.indentation),
								(E.em = !1),
								(E.strong = !1),
								(E.code = !1),
								(E.strikethrough = !1),
								r.taskLists && O.match(A, !1) && (E.taskList = !0),
								(E.f = E.inline),
								r.highlightFormatting &&
									(E.formatting = ['list', 'list-' + qt]),
								V(E)
							);
						} else {
							if (b && E.indentation <= Ge && (Ze = O.match(S, !0)))
								return (
									(E.quote = 0),
									(E.fencedEndRE = new RegExp(Ze[1] + '+ *$')),
									(E.localMode =
										r.fencedCodeBlockHighlighting &&
										c(Ze[2] || r.fencedCodeBlockDefaultMode)),
									E.localMode && (E.localState = e.startState(E.localMode)),
									(E.f = E.block = te),
									r.highlightFormatting && (E.formatting = 'code-block'),
									(E.code = -1),
									V(E)
								);
							if (
								E.setext ||
								((!rt || !Pe) &&
									!E.quote &&
									E.list === !1 &&
									!E.code &&
									!Fe &&
									!D.test(O.string) &&
									(Ze = O.lookAhead(1)) &&
									(Ze = Ze.match(M)))
							)
								return (
									E.setext
										? ((E.header = E.setext),
										  (E.setext = 0),
										  O.skipToEnd(),
										  r.highlightFormatting && (E.formatting = 'header'))
										: ((E.header = Ze[0].charAt(0) == '=' ? 1 : 2),
										  (E.setext = E.header)),
									(E.thisLine.header = !0),
									(E.f = E.inline),
									V(E)
								);
							if (Fe)
								return O.skipToEnd(), (E.hr = !0), (E.thisLine.hr = !0), f.hr;
							if (O.peek() === '[') return z(O, E, se);
						}
						return z(O, E, E.inline);
					}
					function W(O, E) {
						var b = o.token(O, E.htmlState);
						if (!u) {
							var Ce = e.innerMode(o, E.htmlState);
							((Ce.mode.name == 'xml' &&
								Ce.state.tagStart === null &&
								!Ce.state.context &&
								Ce.state.tokenize.isInText) ||
								(E.md_inside && O.current().indexOf('>') > -1)) &&
								((E.f = X), (E.block = L), (E.htmlState = null));
						}
						return b;
					}
					function te(O, E) {
						var b = E.listStack[E.listStack.length - 1] || 0,
							Ce = E.indentation < b,
							fe = b + 3;
						if (
							E.fencedEndRE &&
							E.indentation <= fe &&
							(Ce || O.match(E.fencedEndRE))
						) {
							r.highlightFormatting && (E.formatting = 'code-block');
							var Ue;
							return (
								Ce || (Ue = V(E)),
								(E.localMode = E.localState = null),
								(E.block = L),
								(E.f = X),
								(E.fencedEndRE = null),
								(E.code = 0),
								(E.thisLine.fencedCodeEnd = !0),
								Ce ? K(O, E, E.block) : Ue
							);
						} else
							return E.localMode
								? E.localMode.token(O, E.localState)
								: (O.skipToEnd(), f.code);
					}
					function V(O) {
						var E = [];
						if (O.formatting) {
							E.push(f.formatting),
								typeof O.formatting == 'string' &&
									(O.formatting = [O.formatting]);
							for (var b = 0; b < O.formatting.length; b++)
								E.push(f.formatting + '-' + O.formatting[b]),
									O.formatting[b] === 'header' &&
										E.push(
											f.formatting + '-' + O.formatting[b] + '-' + O.header
										),
									O.formatting[b] === 'quote' &&
										(!r.maxBlockquoteDepth || r.maxBlockquoteDepth >= O.quote
											? E.push(
													f.formatting + '-' + O.formatting[b] + '-' + O.quote
											  )
											: E.push('error'));
						}
						if (O.taskOpen)
							return E.push('meta'), E.length ? E.join(' ') : null;
						if (O.taskClosed)
							return E.push('property'), E.length ? E.join(' ') : null;
						if (
							(O.linkHref
								? E.push(f.linkHref, 'url')
								: (O.strong && E.push(f.strong),
								  O.em && E.push(f.em),
								  O.strikethrough && E.push(f.strikethrough),
								  O.emoji && E.push(f.emoji),
								  O.linkText && E.push(f.linkText),
								  O.code && E.push(f.code),
								  O.image && E.push(f.image),
								  O.imageAltText && E.push(f.imageAltText, 'link'),
								  O.imageMarker && E.push(f.imageMarker)),
							O.header && E.push(f.header, f.header + '-' + O.header),
							O.quote &&
								(E.push(f.quote),
								!r.maxBlockquoteDepth || r.maxBlockquoteDepth >= O.quote
									? E.push(f.quote + '-' + O.quote)
									: E.push(f.quote + '-' + r.maxBlockquoteDepth)),
							O.list !== !1)
						) {
							var Ce = (O.listStack.length - 1) % 3;
							Ce
								? Ce === 1
									? E.push(f.list2)
									: E.push(f.list3)
								: E.push(f.list1);
						}
						return (
							O.trailingSpaceNewLine
								? E.push('trailing-space-new-line')
								: O.trailingSpace &&
								  E.push('trailing-space-' + (O.trailingSpace % 2 ? 'a' : 'b')),
							E.length ? E.join(' ') : null
						);
					}
					function ae(O, E) {
						if (O.match(x, !0)) return V(E);
					}
					function X(O, E) {
						var b = E.text(O, E);
						if (typeof b != 'undefined') return b;
						if (E.list) return (E.list = null), V(E);
						if (E.taskList) {
							var Ce = O.match(A, !0)[1] === ' ';
							return (
								Ce ? (E.taskOpen = !0) : (E.taskClosed = !0),
								r.highlightFormatting && (E.formatting = 'task'),
								(E.taskList = !1),
								V(E)
							);
						}
						if (
							((E.taskOpen = !1),
							(E.taskClosed = !1),
							E.header && O.match(/^#+$/, !0))
						)
							return r.highlightFormatting && (E.formatting = 'header'), V(E);
						var fe = O.next();
						if (E.linkTitle) {
							E.linkTitle = !1;
							var Ue = fe;
							fe === '(' && (Ue = ')'),
								(Ue = (Ue + '').replace(/([.?*+^\[\]\\(){}|-])/g, '\\$1'));
							var Pe = '^\\s*(?:[^' + Ue + '\\\\]+|\\\\\\\\|\\\\.)' + Ue;
							if (O.match(new RegExp(Pe), !0)) return f.linkHref;
						}
						if (fe === '`') {
							var Ge = E.formatting;
							r.highlightFormatting && (E.formatting = 'code'), O.eatWhile('`');
							var Ve = O.current().length;
							if (E.code == 0 && (!E.quote || Ve == 1))
								return (E.code = Ve), V(E);
							if (Ve == E.code) {
								var rt = V(E);
								return (E.code = 0), rt;
							} else return (E.formatting = Ge), V(E);
						} else if (E.code) return V(E);
						if (fe === '\\' && (O.next(), r.highlightFormatting)) {
							var Fe = V(E),
								Ze = f.formatting + '-escape';
							return Fe ? Fe + ' ' + Ze : Ze;
						}
						if (fe === '!' && O.match(/\[[^\]]*\] ?(?:\(|\[)/, !1))
							return (
								(E.imageMarker = !0),
								(E.image = !0),
								r.highlightFormatting && (E.formatting = 'image'),
								V(E)
							);
						if (
							fe === '[' &&
							E.imageMarker &&
							O.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, !1)
						)
							return (
								(E.imageMarker = !1),
								(E.imageAltText = !0),
								r.highlightFormatting && (E.formatting = 'image'),
								V(E)
							);
						if (fe === ']' && E.imageAltText) {
							r.highlightFormatting && (E.formatting = 'image');
							var Fe = V(E);
							return (
								(E.imageAltText = !1), (E.image = !1), (E.inline = E.f = H), Fe
							);
						}
						if (fe === '[' && !E.image)
							return (
								(E.linkText && O.match(/^.*?\]/)) ||
									((E.linkText = !0),
									r.highlightFormatting && (E.formatting = 'link')),
								V(E)
							);
						if (fe === ']' && E.linkText) {
							r.highlightFormatting && (E.formatting = 'link');
							var Fe = V(E);
							return (
								(E.linkText = !1),
								(E.inline = E.f = O.match(/\(.*?\)| ?\[.*?\]/, !1) ? H : X),
								Fe
							);
						}
						if (
							fe === '<' &&
							O.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, !1)
						) {
							(E.f = E.inline = G),
								r.highlightFormatting && (E.formatting = 'link');
							var Fe = V(E);
							return Fe ? (Fe += ' ') : (Fe = ''), Fe + f.linkInline;
						}
						if (fe === '<' && O.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, !1)) {
							(E.f = E.inline = G),
								r.highlightFormatting && (E.formatting = 'link');
							var Fe = V(E);
							return Fe ? (Fe += ' ') : (Fe = ''), Fe + f.linkEmail;
						}
						if (
							r.xml &&
							fe === '<' &&
							O.match(
								/^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i,
								!1
							)
						) {
							var qt = O.string.indexOf('>', O.pos);
							if (qt != -1) {
								var De = O.string.substring(O.start, qt);
								/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(De) &&
									(E.md_inside = !0);
							}
							return O.backUp(1), (E.htmlState = e.startState(o)), K(O, E, W);
						}
						if (r.xml && fe === '<' && O.match(/^\/\w*?>/))
							return (E.md_inside = !1), 'tag';
						if (fe === '*' || fe === '_') {
							for (
								var Gt = 1, Xt = O.pos == 1 ? ' ' : O.string.charAt(O.pos - 2);
								Gt < 3 && O.eat(fe);

							)
								Gt++;
							var Rt = O.peek() || ' ',
								zt =
									!/\s/.test(Rt) &&
									(!P.test(Rt) || /\s/.test(Xt) || P.test(Xt)),
								$t =
									!/\s/.test(Xt) &&
									(!P.test(Xt) || /\s/.test(Rt) || P.test(Rt)),
								Ot = null,
								ie = null;
							if (
								(Gt % 2 &&
									(!E.em && zt && (fe === '*' || !$t || P.test(Xt))
										? (Ot = !0)
										: E.em == fe &&
										  $t &&
										  (fe === '*' || !zt || P.test(Rt)) &&
										  (Ot = !1)),
								Gt > 1 &&
									(!E.strong && zt && (fe === '*' || !$t || P.test(Xt))
										? (ie = !0)
										: E.strong == fe &&
										  $t &&
										  (fe === '*' || !zt || P.test(Rt)) &&
										  (ie = !1)),
								ie != null || Ot != null)
							) {
								r.highlightFormatting &&
									(E.formatting =
										Ot == null ? 'strong' : ie == null ? 'em' : 'strong em'),
									Ot === !0 && (E.em = fe),
									ie === !0 && (E.strong = fe);
								var rt = V(E);
								return (
									Ot === !1 && (E.em = !1), ie === !1 && (E.strong = !1), rt
								);
							}
						} else if (fe === ' ' && (O.eat('*') || O.eat('_'))) {
							if (O.peek() === ' ') return V(E);
							O.backUp(1);
						}
						if (r.strikethrough) {
							if (fe === '~' && O.eatWhile(fe)) {
								if (E.strikethrough) {
									r.highlightFormatting && (E.formatting = 'strikethrough');
									var rt = V(E);
									return (E.strikethrough = !1), rt;
								} else if (O.match(/^[^\s]/, !1))
									return (
										(E.strikethrough = !0),
										r.highlightFormatting && (E.formatting = 'strikethrough'),
										V(E)
									);
							} else if (fe === ' ' && O.match('~~', !0)) {
								if (O.peek() === ' ') return V(E);
								O.backUp(2);
							}
						}
						if (
							r.emoji &&
							fe === ':' &&
							O.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/)
						) {
							(E.emoji = !0), r.highlightFormatting && (E.formatting = 'emoji');
							var Je = V(E);
							return (E.emoji = !1), Je;
						}
						return (
							fe === ' ' &&
								(O.match(/^ +$/, !1)
									? E.trailingSpace++
									: E.trailingSpace && (E.trailingSpaceNewLine = !0)),
							V(E)
						);
					}
					function G(O, E) {
						var b = O.next();
						if (b === '>') {
							(E.f = E.inline = X),
								r.highlightFormatting && (E.formatting = 'link');
							var Ce = V(E);
							return Ce ? (Ce += ' ') : (Ce = ''), Ce + f.linkInline;
						}
						return O.match(/^[^>]+/, !0), f.linkInline;
					}
					function H(O, E) {
						if (O.eatSpace()) return null;
						var b = O.next();
						return b === '(' || b === '['
							? ((E.f = E.inline = Q(b === '(' ? ')' : ']')),
							  r.highlightFormatting && (E.formatting = 'link-string'),
							  (E.linkHref = !0),
							  V(E))
							: 'error';
					}
					var J = {
						')': /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
						']': /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/,
					};
					function Q(O) {
						return function (E, b) {
							var Ce = E.next();
							if (Ce === O) {
								(b.f = b.inline = X),
									r.highlightFormatting && (b.formatting = 'link-string');
								var fe = V(b);
								return (b.linkHref = !1), fe;
							}
							return E.match(J[O]), (b.linkHref = !0), V(b);
						};
					}
					function se(O, E) {
						return O.match(/^([^\]\\]|\\.)*\]:/, !1)
							? ((E.f = Ae),
							  O.next(),
							  r.highlightFormatting && (E.formatting = 'link'),
							  (E.linkText = !0),
							  V(E))
							: z(O, E, X);
					}
					function Ae(O, E) {
						if (O.match(']:', !0)) {
							(E.f = E.inline = _e),
								r.highlightFormatting && (E.formatting = 'link');
							var b = V(E);
							return (E.linkText = !1), b;
						}
						return O.match(/^([^\]\\]|\\.)+/, !0), f.linkText;
					}
					function _e(O, E) {
						return O.eatSpace()
							? null
							: (O.match(/^[^\s]+/, !0),
							  O.peek() === void 0
									? (E.linkTitle = !0)
									: O.match(
											/^(?:\s+(?:"(?:[^"\\]|\\.)+"|'(?:[^'\\]|\\.)+'|\((?:[^)\\]|\\.)+\)))?/,
											!0
									  ),
							  (E.f = E.inline = X),
							  f.linkHref + ' url');
					}
					var Oe = {
						startState: function () {
							return {
								f: L,
								prevLine: {
									stream: null,
								},
								thisLine: {
									stream: null,
								},
								block: L,
								htmlState: null,
								indentation: 0,
								inline: X,
								text: ae,
								formatting: !1,
								linkText: !1,
								linkHref: !1,
								linkTitle: !1,
								code: 0,
								em: !1,
								strong: !1,
								header: 0,
								setext: 0,
								hr: !1,
								taskList: !1,
								list: !1,
								listStack: [],
								quote: 0,
								trailingSpace: 0,
								trailingSpaceNewLine: !1,
								strikethrough: !1,
								emoji: !1,
								fencedEndRE: null,
							};
						},
						copyState: function (O) {
							return {
								f: O.f,
								prevLine: O.prevLine,
								thisLine: O.thisLine,
								block: O.block,
								htmlState: O.htmlState && e.copyState(o, O.htmlState),
								indentation: O.indentation,
								localMode: O.localMode,
								localState: O.localMode
									? e.copyState(O.localMode, O.localState)
									: null,
								inline: O.inline,
								text: O.text,
								formatting: !1,
								linkText: O.linkText,
								linkTitle: O.linkTitle,
								linkHref: O.linkHref,
								code: O.code,
								em: O.em,
								strong: O.strong,
								strikethrough: O.strikethrough,
								emoji: O.emoji,
								header: O.header,
								setext: O.setext,
								hr: O.hr,
								taskList: O.taskList,
								list: O.list,
								listStack: O.listStack.slice(0),
								quote: O.quote,
								indentedCode: O.indentedCode,
								trailingSpace: O.trailingSpace,
								trailingSpaceNewLine: O.trailingSpaceNewLine,
								md_inside: O.md_inside,
								fencedEndRE: O.fencedEndRE,
							};
						},
						token: function (O, E) {
							if (((E.formatting = !1), O != E.thisLine.stream)) {
								if (((E.header = 0), (E.hr = !1), O.match(/^\s*$/, !0)))
									return Z(E), null;
								if (
									((E.prevLine = E.thisLine),
									(E.thisLine = {
										stream: O,
									}),
									(E.taskList = !1),
									(E.trailingSpace = 0),
									(E.trailingSpaceNewLine = !1),
									!E.localState && ((E.f = E.block), E.f != W))
								) {
									var b = O.match(/^\s*/, !0)[0].replace(/\t/g, I).length;
									if (((E.indentation = b), (E.indentationDiff = null), b > 0))
										return null;
								}
							}
							return E.f(O, E);
						},
						innerMode: function (O) {
							return O.block == W
								? {
										state: O.htmlState,
										mode: o,
								  }
								: O.localState
								? {
										state: O.localState,
										mode: O.localMode,
								  }
								: {
										state: O,
										mode: Oe,
								  };
						},
						indent: function (O, E, b) {
							return O.block == W && o.indent
								? o.indent(O.htmlState, E, b)
								: O.localState && O.localMode.indent
								? O.localMode.indent(O.localState, E, b)
								: e.Pass;
						},
						blankLine: Z,
						getType: V,
						blockCommentStart: '<!--',
						blockCommentEnd: '-->',
						closeBrackets: '()[]{}\'\'""``',
						fold: 'markdown',
					};
					return Oe;
				},
				'xml'
			),
				e.defineMIME('text/markdown', 'markdown'),
				e.defineMIME('text/x-markdown', 'markdown');
		},
		I5 = function (e) {
			var t = {
					autoSelfClosers: {
						area: !0,
						base: !0,
						br: !0,
						col: !0,
						command: !0,
						embed: !0,
						frame: !0,
						hr: !0,
						img: !0,
						input: !0,
						keygen: !0,
						link: !0,
						meta: !0,
						param: !0,
						source: !0,
						track: !0,
						wbr: !0,
						menuitem: !0,
					},
					implicitlyClosed: {
						dd: !0,
						li: !0,
						optgroup: !0,
						option: !0,
						p: !0,
						rp: !0,
						rt: !0,
						tbody: !0,
						td: !0,
						tfoot: !0,
						th: !0,
						tr: !0,
					},
					contextGrabbers: {
						dd: {
							dd: !0,
							dt: !0,
						},
						dt: {
							dd: !0,
							dt: !0,
						},
						li: {
							li: !0,
						},
						option: {
							option: !0,
							optgroup: !0,
						},
						optgroup: {
							optgroup: !0,
						},
						p: {
							address: !0,
							article: !0,
							aside: !0,
							blockquote: !0,
							dir: !0,
							div: !0,
							dl: !0,
							fieldset: !0,
							footer: !0,
							form: !0,
							h1: !0,
							h2: !0,
							h3: !0,
							h4: !0,
							h5: !0,
							h6: !0,
							header: !0,
							hgroup: !0,
							hr: !0,
							menu: !0,
							nav: !0,
							ol: !0,
							p: !0,
							pre: !0,
							section: !0,
							table: !0,
							ul: !0,
						},
						rp: {
							rp: !0,
							rt: !0,
						},
						rt: {
							rp: !0,
							rt: !0,
						},
						tbody: {
							tbody: !0,
							tfoot: !0,
						},
						td: {
							td: !0,
							th: !0,
						},
						tfoot: {
							tbody: !0,
						},
						th: {
							td: !0,
							th: !0,
						},
						thead: {
							tbody: !0,
							tfoot: !0,
						},
						tr: {
							tr: !0,
						},
					},
					doNotIndent: {
						pre: !0,
					},
					allowUnquoted: !0,
					allowMissing: !0,
					caseFold: !0,
				},
				r = {
					autoSelfClosers: {},
					implicitlyClosed: {},
					contextGrabbers: {},
					doNotIndent: {},
					allowUnquoted: !1,
					allowMissing: !1,
					allowMissingTagName: !1,
					caseFold: !1,
				};
			e.defineMode('xml', function (o, u) {
				var c = o.indentUnit,
					f = {},
					d = u.htmlMode ? t : r;
				for (var g in d) f[g] = d[g];
				for (var g in u) f[g] = u[g];
				var T, A;
				function C(H, J) {
					function Q(_e) {
						return (J.tokenize = _e), _e(H, J);
					}
					var se = H.next();
					if (se == '<')
						return H.eat('!')
							? H.eat('[')
								? H.match('CDATA[')
									? Q(S('atom', ']]>'))
									: null
								: H.match('--')
								? Q(S('comment', '-->'))
								: H.match('DOCTYPE', !0, !0)
								? (H.eatWhile(/[\w\._\-]/), Q(D(1)))
								: null
							: H.eat('?')
							? (H.eatWhile(/[\w\._\-]/),
							  (J.tokenize = S('meta', '?>')),
							  'meta')
							: ((T = H.eat('/') ? 'closeTag' : 'openTag'),
							  (J.tokenize = M),
							  'tag bracket');
					if (se == '&') {
						var Ae;
						return (
							H.eat('#')
								? H.eat('x')
									? (Ae = H.eatWhile(/[a-fA-F\d]/) && H.eat(';'))
									: (Ae = H.eatWhile(/[\d]/) && H.eat(';'))
								: (Ae = H.eatWhile(/[\w\.\-:]/) && H.eat(';')),
							Ae ? 'atom' : 'error'
						);
					} else return H.eatWhile(/[^&<]/), null;
				}
				C.isInText = !0;
				function M(H, J) {
					var Q = H.next();
					if (Q == '>' || (Q == '/' && H.eat('>')))
						return (
							(J.tokenize = C),
							(T = Q == '>' ? 'endTag' : 'selfcloseTag'),
							'tag bracket'
						);
					if (Q == '=') return (T = 'equals'), null;
					if (Q == '<') {
						(J.tokenize = C), (J.state = w), (J.tagName = J.tagStart = null);
						var se = J.tokenize(H, J);
						return se ? se + ' tag error' : 'tag error';
					} else return /[\'\"]/.test(Q) ? ((J.tokenize = x(Q)), (J.stringStartCol = H.column()), J.tokenize(H, J)) : (H.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), 'word');
				}
				function x(H) {
					var J = function (Q, se) {
						for (; !Q.eol(); )
							if (Q.next() == H) {
								se.tokenize = M;
								break;
							}
						return 'string';
					};
					return (J.isInAttribute = !0), J;
				}
				function S(H, J) {
					return function (Q, se) {
						for (; !Q.eol(); ) {
							if (Q.match(J)) {
								se.tokenize = C;
								break;
							}
							Q.next();
						}
						return H;
					};
				}
				function D(H) {
					return function (J, Q) {
						for (var se; (se = J.next()) != null; ) {
							if (se == '<') return (Q.tokenize = D(H + 1)), Q.tokenize(J, Q);
							if (se == '>')
								if (H == 1) {
									Q.tokenize = C;
									break;
								} else return (Q.tokenize = D(H - 1)), Q.tokenize(J, Q);
						}
						return 'meta';
					};
				}
				function P(H) {
					return H && H.toLowerCase();
				}
				function I(H, J, Q) {
					(this.prev = H.context),
						(this.tagName = J || ''),
						(this.indent = H.indented),
						(this.startOfLine = Q),
						(f.doNotIndent.hasOwnProperty(J) ||
							(H.context && H.context.noIndent)) &&
							(this.noIndent = !0);
				}
				function z(H) {
					H.context && (H.context = H.context.prev);
				}
				function K(H, J) {
					for (var Q; ; ) {
						if (
							!H.context ||
							((Q = H.context.tagName),
							!f.contextGrabbers.hasOwnProperty(P(Q)) ||
								!f.contextGrabbers[P(Q)].hasOwnProperty(P(J)))
						)
							return;
						z(H);
					}
				}
				function w(H, J, Q) {
					return H == 'openTag'
						? ((Q.tagStart = J.column()), Z)
						: H == 'closeTag'
						? L
						: w;
				}
				function Z(H, J, Q) {
					return H == 'word'
						? ((Q.tagName = J.current()), (A = 'tag'), V)
						: f.allowMissingTagName && H == 'endTag'
						? ((A = 'tag bracket'), V(H, J, Q))
						: ((A = 'error'), Z);
				}
				function L(H, J, Q) {
					if (H == 'word') {
						var se = J.current();
						return (
							Q.context &&
								Q.context.tagName != se &&
								f.implicitlyClosed.hasOwnProperty(P(Q.context.tagName)) &&
								z(Q),
							(Q.context && Q.context.tagName == se) || f.matchClosing === !1
								? ((A = 'tag'), W)
								: ((A = 'tag error'), te)
						);
					} else return f.allowMissingTagName && H == 'endTag' ? ((A = 'tag bracket'), W(H, J, Q)) : ((A = 'error'), te);
				}
				function W(H, J, Q) {
					return H != 'endTag' ? ((A = 'error'), W) : (z(Q), w);
				}
				function te(H, J, Q) {
					return (A = 'error'), W(H, J, Q);
				}
				function V(H, J, Q) {
					if (H == 'word') return (A = 'attribute'), ae;
					if (H == 'endTag' || H == 'selfcloseTag') {
						var se = Q.tagName,
							Ae = Q.tagStart;
						return (
							(Q.tagName = Q.tagStart = null),
							H == 'selfcloseTag' || f.autoSelfClosers.hasOwnProperty(P(se))
								? K(Q, se)
								: (K(Q, se), (Q.context = new I(Q, se, Ae == Q.indented))),
							w
						);
					}
					return (A = 'error'), V;
				}
				function ae(H, J, Q) {
					return H == 'equals'
						? X
						: (f.allowMissing || (A = 'error'), V(H, J, Q));
				}
				function X(H, J, Q) {
					return H == 'string'
						? G
						: H == 'word' && f.allowUnquoted
						? ((A = 'string'), V)
						: ((A = 'error'), V(H, J, Q));
				}
				function G(H, J, Q) {
					return H == 'string' ? G : V(H, J, Q);
				}
				return {
					startState: function (H) {
						var J = {
							tokenize: C,
							state: w,
							indented: H || 0,
							tagName: null,
							tagStart: null,
							context: null,
						};
						return H != null && (J.baseIndent = H), J;
					},
					token: function (H, J) {
						if (
							(!J.tagName && H.sol() && (J.indented = H.indentation()),
							H.eatSpace())
						)
							return null;
						T = null;
						var Q = J.tokenize(H, J);
						return (
							(Q || T) &&
								Q != 'comment' &&
								((A = null),
								(J.state = J.state(T || Q, H, J)),
								A && (Q = A == 'error' ? Q + ' error' : A)),
							Q
						);
					},
					indent: function (H, J, Q) {
						var se = H.context;
						if (H.tokenize.isInAttribute)
							return H.tagStart == H.indented
								? H.stringStartCol + 1
								: H.indented + c;
						if (se && se.noIndent) return e.Pass;
						if (H.tokenize != M && H.tokenize != C)
							return Q ? Q.match(/^(\s*)/)[0].length : 0;
						if (H.tagName)
							return f.multilineTagIndentPastTag !== !1
								? H.tagStart + H.tagName.length + 2
								: H.tagStart + c * (f.multilineTagIndentFactor || 1);
						if (f.alignCDATA && /<!\[CDATA\[/.test(J)) return 0;
						var Ae = J && /^<(\/)?([\w_:\.-]*)/.exec(J);
						if (Ae && Ae[1])
							for (; se; )
								if (se.tagName == Ae[2]) {
									se = se.prev;
									break;
								} else if (f.implicitlyClosed.hasOwnProperty(P(se.tagName)))
									se = se.prev;
								else break;
						else if (Ae)
							for (; se; ) {
								var _e = f.contextGrabbers[P(se.tagName)];
								if (_e && _e.hasOwnProperty(P(Ae[2]))) se = se.prev;
								else break;
							}
						for (; se && se.prev && !se.startOfLine; ) se = se.prev;
						return se ? se.indent + c : H.baseIndent || 0;
					},
					electricInput: /<\/[\s\w:]+>$/,
					blockCommentStart: '<!--',
					blockCommentEnd: '-->',
					configuration: f.htmlMode ? 'html' : 'xml',
					helperType: f.htmlMode ? 'html' : 'xml',
					skipAttribute: function (H) {
						H.state == X && (H.state = V);
					},
					xmlCurrentTag: function (H) {
						return H.tagName
							? {
									name: H.tagName,
									close: H.type == 'closeTag',
							  }
							: null;
					},
					xmlCurrentContext: function (H) {
						for (var J = [], Q = H.context; Q; Q = Q.prev) J.push(Q.tagName);
						return J.reverse();
					},
				};
			}),
				e.defineMIME('text/xml', 'xml'),
				e.defineMIME('application/xml', 'xml'),
				e.mimeModes.hasOwnProperty('text/html') ||
					e.defineMIME('text/html', {
						name: 'xml',
						htmlMode: !0,
					});
		},
		M5 = function (e) {
			var t = 0,
				r = 1,
				o = 2;
			e.defineMode('yaml-frontmatter', function (u, c) {
				var f = e.getMode(u, 'yaml'),
					d = e.getMode(u, (c && c.base) || 'gfm');
				function g(T) {
					return T.state == r
						? {
								mode: f,
								state: T.yaml,
						  }
						: {
								mode: d,
								state: T.inner,
						  };
				}
				return {
					startState: function () {
						return {
							state: t,
							yaml: null,
							inner: e.startState(d),
						};
					},
					copyState: function (T) {
						return {
							state: T.state,
							yaml: T.yaml && e.copyState(f, T.yaml),
							inner: e.copyState(d, T.inner),
						};
					},
					token: function (T, A) {
						if (A.state == t)
							return T.match('---', !1)
								? ((A.state = r),
								  (A.yaml = e.startState(f)),
								  f.token(T, A.yaml))
								: ((A.state = o), d.token(T, A.inner));
						if (A.state == r) {
							var C = T.sol() && T.match(/(---|\.\.\.)/, !1),
								M = f.token(T, A.yaml);
							return C && ((A.state = o), (A.yaml = null)), M;
						} else return d.token(T, A.inner);
					},
					innerMode: g,
					indent: function (T, A, C) {
						var M = g(T);
						return M.mode.indent ? M.mode.indent(M.state, A, C) : e.Pass;
					},
					blankLine: function (T) {
						var A = g(T);
						if (A.mode.blankLine) return A.mode.blankLine(A.state);
					},
				};
			});
		},
		R5 = function (e) {
			e.defineMode('yaml', function () {
				var t = ['true', 'false', 'on', 'off', 'yes', 'no'],
					r = new RegExp('\\b((' + t.join(')|(') + '))$', 'i');
				return {
					token: function (o, u) {
						var c = o.peek(),
							f = u.escaped;
						if (
							((u.escaped = !1),
							c == '#' && (o.pos == 0 || /\s/.test(o.string.charAt(o.pos - 1))))
						)
							return o.skipToEnd(), 'comment';
						if (o.match(/^('([^']|\\.)*'?|"([^"]|\\.)*"?)/)) return 'string';
						if (u.literal && o.indentation() > u.keyCol)
							return o.skipToEnd(), 'string';
						if ((u.literal && (u.literal = !1), o.sol())) {
							if (
								((u.keyCol = 0),
								(u.pair = !1),
								(u.pairStart = !1),
								o.match('---') || o.match('...'))
							)
								return 'def';
							if (o.match(/\s*-\s+/)) return 'meta';
						}
						if (o.match(/^(\{|\}|\[|\])/))
							return (
								c == '{'
									? u.inlinePairs++
									: c == '}'
									? u.inlinePairs--
									: c == '['
									? u.inlineList++
									: u.inlineList--,
								'meta'
							);
						if (u.inlineList > 0 && !f && c == ',') return o.next(), 'meta';
						if (u.inlinePairs > 0 && !f && c == ',')
							return (
								(u.keyCol = 0),
								(u.pair = !1),
								(u.pairStart = !1),
								o.next(),
								'meta'
							);
						if (u.pairStart) {
							if (o.match(/^\s*(\||\>)\s*/)) return (u.literal = !0), 'meta';
							if (o.match(/^\s*(\&|\*)[a-z0-9\._-]+\b/i)) return 'variable-2';
							if (
								(u.inlinePairs == 0 && o.match(/^\s*-?[0-9\.\,]+\s?$/)) ||
								(u.inlinePairs > 0 && o.match(/^\s*-?[0-9\.\,]+\s?(?=(,|}))/))
							)
								return 'number';
							if (o.match(r)) return 'keyword';
						}
						return !u.pair &&
							o.match(
								/^\s*(?:[,\[\]{}&*!|>'"%@`][^\s'":]|[^,\[\]{}#&*!|>'"%@`])[^#]*?(?=\s*:($|\s))/
							)
							? ((u.pair = !0), (u.keyCol = o.indentation()), 'atom')
							: u.pair && o.match(/^:\s*/)
							? ((u.pairStart = !0), 'meta')
							: ((u.pairStart = !1), (u.escaped = c == '\\'), o.next(), null);
					},
					startState: function () {
						return {
							pair: !1,
							pairStart: !1,
							keyCol: 0,
							inlinePairs: 0,
							inlineList: 0,
							literal: !1,
							escaped: !1,
						};
					},
					lineComment: '#',
					fold: 'indent',
				};
			}),
				e.defineMIME('text/x-yaml', 'yaml'),
				e.defineMIME('text/yaml', 'yaml');
		};
	var D5 = function (e) {
			e === void 0 && (e = {});
			var t = e.accept;
			t === void 0 && (t = '');
			var r = e.capture;
			r === void 0 && (r = !1);
			var o = e.multiple;
			o === void 0 && (o = !1);
			var u = document.createElement('input');
			return (
				(u.type = 'file'), (u.accept = t), (u.capture = r), (u.multiple = o), u
			);
		},
		Ec = function (e) {
			return new Promise(function (t) {
				var r = D5(e);
				r.addEventListener('change', function () {
					return t(r.files || null);
				}),
					setTimeout(function () {
						var o = new MouseEvent('click');
						r.dispatchEvent(o);
					}, 0);
			});
		};
	function P5() {
		const e = N5();
		return x5(e), O5(e), I5(e), L5(e), w5(e), R5(e), M5(e), k5(e), e;
	}
	function F5(e, t) {
		return {
			wrapText(r, o = r) {
				const u = t.somethingSelected()
						? t.listSelections()[0]
						: t.findWordAt(t.getCursor()),
					c = u.from(),
					f = u.to(),
					d = t.getRange(c, f),
					g = e.Pos(c.line, c.ch - r.length),
					T = e.Pos(f.line, f.ch + o.length);
				if (t.getRange(g, c) === r && t.getRange(f, T) === o)
					t.replaceRange(d, g, T),
						t.setSelection(g, e.Pos(g.line, g.ch + d.length));
				else {
					t.replaceRange(r + d + o, c, f);
					const A = t.getCursor();
					t.setSelection(
						e.Pos(A.line, A.ch - o.length - d.length),
						e.Pos(A.line, A.ch - o.length)
					);
				}
			},
			replaceLines(r) {
				const [o] = t.listSelections(),
					u = [e.Pos(o.from().line, 0), e.Pos(o.to().line)],
					c = t.getRange(...u).split(`
`);
				t.replaceRange(
					c.map(r).join(`
`),
					...u
				),
					t.setSelection(...u);
			},
			appendBlock(r) {
				const o = t.getCursor();
				let u = -1;
				for (let c = o.line; c < t.lineCount(); c++)
					if (!t.getLine(c).trim()) {
						u = c;
						break;
					}
				return (
					u === -1 &&
						(t.replaceRange(
							`
`,
							e.Pos(t.lineCount())
						),
						(u = t.lineCount())),
					t.replaceRange(
						`
` + r,
						e.Pos(u)
					),
					e.Pos(u + 1, 0)
				);
			},
			selectFiles: Ec,
		};
	}
	function Ra(e, t) {
		let r = t.length - 2;
		for (let o = 0; o < t.length; o++)
			if (e < t[o]) {
				r = o - 1;
				break;
			}
		return (r = Math.max(r, 0)), r;
	}
	const wr = (e, t = !1) => {
		const r = t ? 'Shift-' : '',
			o =
				typeof navigator != 'undefined' && /Mac/.test(navigator.platform)
					? 'Cmd-'
					: 'Ctrl-';
		return r + o + e;
	};
	async function vc({ editor: e, appendBlock: t, codemirror: r }, o, u) {
		const c = await o(u),
			f = t(
				c.map(
					({ url: d, alt: g, title: T }, A) => (
						(g = g != null ? g : u[A].name),
						`![${g}](${d}${T ? ` "${T}"` : ''})`
					)
				).join(`

`)
			);
		e.setSelection(f, r.Pos(f.line + c.length * 2 - 2)), e.focus();
	}
	function H5(e, t, r) {
		const o = [
				{
					icon: ct.H,
					handler: {
						type: 'dropdown',
						actions: [1, 2, 3, 4, 5, 6].map((c) => ({
							title: e[`h ${c}`],
							icon: [
								ct.H1,
								ct.H2,
								ct.H3,
								ct.LevelFourTitle,
								ct.LevelFiveTitle,
								ct.LevelSixTitle,
							][c - 1],
							cheatsheet: c <= 3 ? `${'#'.repeat(c)} ${e.headingText}` : void 0,
							handler: {
								type: 'action',
								click({ replaceLines: f, editor: d }) {
									f(
										(g) => (
											(g = g.trim().replace(/^#*/, '').trim()),
											(g = '#'.repeat(c) + ' ' + g),
											g
										)
									),
										d.focus();
								},
							},
						})),
					},
				},
				{
					title: e.bold,
					icon: ct.TextBold,
					cheatsheet: `**${e.boldText}**`,
					handler: {
						type: 'action',
						shortcut: wr('B'),
						click({ wrapText: c, editor: f }) {
							c('**'), f.focus();
						},
					},
				},
				{
					title: e.italic,
					icon: ct.TextItalic,
					cheatsheet: `*${e.italicText}*`,
					handler: {
						type: 'action',
						shortcut: wr('I'),
						click({ wrapText: c, editor: f }) {
							c('*'), f.focus();
						},
					},
				},
				{
					title: e.quote,
					icon: ct.Quote,
					cheatsheet: `> ${e.quotedText}`,
					handler: {
						type: 'action',
						click({ replaceLines: c, editor: f }) {
							c((d) => '> ' + d), f.focus();
						},
					},
				},
				{
					title: e.link,
					icon: ct.LinkOne,
					cheatsheet: `[${e.linkText}](url)`,
					handler: {
						type: 'action',
						shortcut: wr('K'),
						click({ editor: c, wrapText: f, codemirror: d }) {
							f('[', '](url)');
							const g = c.getCursor();
							c.setSelection(d.Pos(g.line, g.ch + 2), d.Pos(g.line, g.ch + 5)),
								c.focus();
						},
					},
				},
				{
					title: e.image,
					icon: ct.Pic,
					cheatsheet: `![${e.imageAlt}](url "${e.imageTitle}")`,
					handler: r
						? {
								type: 'action',
								shortcut: wr('I', !0),
								async click(c) {
									const f = await Ec({
										accept: 'image/*',
										multiple: !0,
									});
									f != null && f.length && (await vc(c, r, Array.from(f)));
								},
						  }
						: void 0,
				},
				{
					title: e.code,
					icon: ct.Code,
					cheatsheet: '`' + e.codeText + '`',
					handler: {
						type: 'action',
						shortcut: wr('K', !0),
						click({ wrapText: c, editor: f }) {
							c('`'), f.focus();
						},
					},
				},
				{
					title: e.codeBlock,
					icon: ct.CodeBrackets,
					cheatsheet: '```' + e.codeLang + '↵',
					handler: {
						type: 'action',
						shortcut: wr('C', !0),
						click({ editor: c, appendBlock: f, codemirror: d }) {
							const g = f('```js\n```');
							c.setSelection(d.Pos(g.line, 3), d.Pos(g.line, 5)), c.focus();
						},
					},
				},
				{
					title: e.ul,
					icon: ct.ListTwo,
					cheatsheet: `- ${e.ulItem}`,
					handler: {
						type: 'action',
						shortcut: wr('U', !0),
						click({ replaceLines: c, editor: f }) {
							c((d) => '- ' + d), f.focus();
						},
					},
				},
				{
					title: e.ol,
					icon: ct.OrderedList,
					cheatsheet: `1. ${e.olItem}`,
					handler: {
						type: 'action',
						shortcut: wr('O', !0),
						click({ replaceLines: c, editor: f }) {
							c((d, g) => `${g + 1}. ${d}`), f.focus();
						},
					},
				},
				{
					title: e.hr,
					icon: ct.DividingLine,
					cheatsheet: '---',
				},
			],
			u = [];
		return (
			t.forEach(({ actions: c }) => {
				c &&
					c.forEach((f) => {
						!f.position || f.position !== 'right' ? o.push(f) : u.unshift(f);
					});
			}),
			{
				leftActions: o,
				rightActions: u,
			}
		);
	}
	function yc(e, t, r) {
		const o = e.slice();
		return (o[5] = t[r]), o;
	}
	function Ac(e, t, r) {
		const o = e.slice();
		return (o[5] = t[r]), o;
	}
	function _c(e) {
		let t,
			r,
			o = e[5].icon + '',
			u,
			c = e[5].title + '',
			f,
			d,
			g,
			T = e[5].cheatsheet + '',
			A;
		return {
			c() {
				(t = Re('li')),
					(r = Re('div')),
					(u = Re('div')),
					(f = St(c)),
					(d = Re('div')),
					(g = Re('code')),
					(A = St(T)),
					Ke(r, 'class', 'bytemd-help-icon'),
					Ke(u, 'class', 'bytemd-help-title'),
					Ke(d, 'class', 'bytemd-help-content');
			},
			m(C, M) {
				Ct(C, t, M),
					we(t, r),
					(r.innerHTML = o),
					we(t, u),
					we(u, f),
					we(t, d),
					we(d, g),
					we(g, A);
			},
			p(C, M) {
				M & 4 && o !== (o = C[5].icon + '') && (r.innerHTML = o),
					M & 4 && c !== (c = C[5].title + '') && Kt(f, c),
					M & 4 && T !== (T = C[5].cheatsheet + '') && Kt(A, T);
			},
			d(C) {
				C && vt(t);
			},
		};
	}
	function Cc(e) {
		let t,
			r = e[5].cheatsheet && _c(e);
		return {
			c() {
				r && r.c(), (t = L1());
			},
			m(o, u) {
				r && r.m(o, u), Ct(o, t, u);
			},
			p(o, u) {
				o[5].cheatsheet
					? r
						? r.p(o, u)
						: ((r = _c(o)), r.c(), r.m(t.parentNode, t))
					: r && (r.d(1), (r = null));
			},
			d(o) {
				r && r.d(o), o && vt(t);
			},
		};
	}
	function Sc(e) {
		let t,
			r,
			o = e[5].icon + '',
			u,
			c = e[5].title + '',
			f,
			d,
			g,
			T = e[5].handler.shortcut + '',
			A;
		return {
			c() {
				(t = Re('li')),
					(r = Re('div')),
					(u = Re('div')),
					(f = St(c)),
					(d = Re('div')),
					(g = Re('kbd')),
					(A = St(T)),
					Ke(r, 'class', 'bytemd-help-icon'),
					Ke(u, 'class', 'bytemd-help-title'),
					Ke(d, 'class', 'bytemd-help-content');
			},
			m(C, M) {
				Ct(C, t, M),
					we(t, r),
					(r.innerHTML = o),
					we(t, u),
					we(u, f),
					we(t, d),
					we(d, g),
					we(g, A);
			},
			p(C, M) {
				M & 4 && o !== (o = C[5].icon + '') && (r.innerHTML = o),
					M & 4 && c !== (c = C[5].title + '') && Kt(f, c),
					M & 4 && T !== (T = C[5].handler.shortcut + '') && Kt(A, T);
			},
			d(C) {
				C && vt(t);
			},
		};
	}
	function bc(e) {
		let t,
			r =
				e[5].handler &&
				e[5].handler.type === 'action' &&
				e[5].handler.shortcut &&
				Sc(e);
		return {
			c() {
				r && r.c(), (t = L1());
			},
			m(o, u) {
				r && r.m(o, u), Ct(o, t, u);
			},
			p(o, u) {
				o[5].handler && o[5].handler.type === 'action' && o[5].handler.shortcut
					? r
						? r.p(o, u)
						: ((r = Sc(o)), r.c(), r.m(t.parentNode, t))
					: r && (r.d(1), (r = null));
			},
			d(o) {
				r && r.d(o), o && vt(t);
			},
		};
	}
	function B5(e) {
		let t,
			r,
			o = e[0].cheatsheet + '',
			u,
			c,
			f,
			d = e[0].shortcuts + '',
			g,
			T,
			A = e[2],
			C = [];
		for (let S = 0; S < A.length; S += 1) C[S] = Cc(Ac(e, A, S));
		let M = e[2],
			x = [];
		for (let S = 0; S < M.length; S += 1) x[S] = bc(yc(e, M, S));
		return {
			c() {
				(t = Re('div')), (r = Re('h2')), (u = St(o)), (c = Re('ul'));
				for (let S = 0; S < C.length; S += 1) C[S].c();
				(f = Re('h2')), (g = St(d)), (T = Re('ul'));
				for (let S = 0; S < x.length; S += 1) x[S].c();
				Ke(t, 'class', 'bytemd-help'), bt(t, 'bytemd-hidden', !e[1]);
			},
			m(S, D) {
				Ct(S, t, D), we(t, r), we(r, u), we(t, c);
				for (let P = 0; P < C.length; P += 1) C[P] && C[P].m(c, null);
				we(t, f), we(f, g), we(t, T);
				for (let P = 0; P < x.length; P += 1) x[P] && x[P].m(T, null);
			},
			p(S, [D]) {
				if ((D & 1 && o !== (o = S[0].cheatsheet + '') && Kt(u, o), D & 4)) {
					A = S[2];
					let P;
					for (P = 0; P < A.length; P += 1) {
						const I = Ac(S, A, P);
						C[P] ? C[P].p(I, D) : ((C[P] = Cc(I)), C[P].c(), C[P].m(c, null));
					}
					for (; P < C.length; P += 1) C[P].d(1);
					C.length = A.length;
				}
				if ((D & 1 && d !== (d = S[0].shortcuts + '') && Kt(g, d), D & 4)) {
					M = S[2];
					let P;
					for (P = 0; P < M.length; P += 1) {
						const I = yc(S, M, P);
						x[P] ? x[P].p(I, D) : ((x[P] = bc(I)), x[P].c(), x[P].m(T, null));
					}
					for (; P < x.length; P += 1) x[P].d(1);
					x.length = M.length;
				}
				D & 2 && bt(t, 'bytemd-hidden', !S[1]);
			},
			i: En,
			o: En,
			d(S) {
				S && vt(t), w1(C, S), w1(x, S);
			},
		};
	}
	function U5(e, t, r) {
		let o,
			{ actions: u } = t,
			{ locale: c } = t,
			{ visible: f } = t;
		function d(g) {
			let T = [];
			return (
				g.forEach((A) => {
					const { handler: C, cheatsheet: M } = A;
					(C == null ? void 0 : C.type) === 'dropdown' &&
						T.push(...d(C.actions)),
						M && T.push(A);
				}),
				T
			);
		}
		return (
			(e.$$set = (g) => {
				'actions' in g && r(3, (u = g.actions)),
					'locale' in g && r(0, (c = g.locale)),
					'visible' in g && r(1, (f = g.visible));
			}),
			(e.$$.update = () => {
				e.$$.dirty & 8 && r(2, (o = d(u)));
			}),
			[c, f, o, u]
		);
	}
	class G5 extends Bi {
		constructor(t) {
			super(),
				Hi(this, t, U5, B5, hc, {
					actions: 3,
					locale: 0,
					visible: 1,
				});
		}
	}
	var z5 =
			/[a-zA-Z0-9_\u0392-\u03c9\u00c0-\u00ff\u0600-\u06ff]+|[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g,
		W5 = function (e) {
			var t = e.match(z5),
				r = 0;
			if (!t) return 0;
			for (var o = 0; o < t.length; o++)
				t[o].charCodeAt(0) >= 19968 ? (r += t[o].length) : (r += 1);
			return r;
		};
	function Nc(e) {
		let t,
			r = e[2].limited + '',
			o;
		return {
			c() {
				(t = Re('span')), (o = St(r)), Ke(t, 'class', 'bytemd-status-error');
			},
			m(u, c) {
				Ct(u, t, c), we(t, o);
			},
			p(u, c) {
				c & 4 && r !== (r = u[2].limited + '') && Kt(o, r);
			},
			d(u) {
				u && vt(t);
			},
		};
	}
	function xc(e) {
		let t,
			r,
			o = e[2].sync + '',
			u,
			c,
			f;
		return {
			c() {
				(t = Re('label')),
					(r = Re('input')),
					(u = St(o)),
					Ke(r, 'type', 'checkbox'),
					(r.checked = e[1]);
			},
			m(d, g) {
				Ct(d, t, g),
					we(t, r),
					we(t, u),
					c || ((f = vn(r, 'change', e[8])), (c = !0));
			},
			p(d, g) {
				g & 2 && (r.checked = d[1]),
					g & 4 && o !== (o = d[2].sync + '') && Kt(u, o);
			},
			d(d) {
				d && vt(t), (c = !1), f();
			},
		};
	}
	function K5(e) {
		let t,
			r,
			o,
			u = e[2].words + '',
			c,
			f,
			d,
			g,
			T,
			A = e[2].lines + '',
			C,
			M,
			x,
			S,
			D,
			P,
			I = e[2].top + '',
			z,
			K,
			w,
			Z = e[3] && Nc(e),
			L = e[0] && xc(e);
		return {
			c() {
				(t = Re('div')),
					(r = Re('div')),
					(o = Re('span')),
					(c = St(u)),
					(f = St(': ')),
					(d = Re('strong')),
					(g = St(e[5])),
					(T = Re('span')),
					(C = St(A)),
					(M = St(': ')),
					(x = Re('strong')),
					(S = St(e[4])),
					Z && Z.c(),
					(D = Re('div')),
					L && L.c(),
					(P = Re('span')),
					(z = St(I)),
					Ke(r, 'class', 'bytemd-status-left'),
					Ke(D, 'class', 'bytemd-status-right'),
					Ke(t, 'class', 'bytemd-status');
			},
			m(W, te) {
				Ct(W, t, te),
					we(t, r),
					we(r, o),
					we(o, c),
					we(o, f),
					we(o, d),
					we(d, g),
					we(r, T),
					we(T, C),
					we(T, M),
					we(T, x),
					we(x, S),
					Z && Z.m(r, null),
					we(t, D),
					L && L.m(D, null),
					we(D, P),
					we(P, z),
					K ||
						((w = [vn(P, 'click', e[9]), vn(P, 'keydown', Ii(e[10]))]),
						(K = !0));
			},
			p(W, [te]) {
				te & 4 && u !== (u = W[2].words + '') && Kt(c, u),
					te & 32 && Kt(g, W[5]),
					te & 4 && A !== (A = W[2].lines + '') && Kt(C, A),
					te & 16 && Kt(S, W[4]),
					W[3]
						? Z
							? Z.p(W, te)
							: ((Z = Nc(W)), Z.c(), Z.m(r, null))
						: Z && (Z.d(1), (Z = null)),
					W[0]
						? L
							? L.p(W, te)
							: ((L = xc(W)), L.c(), L.m(D, P))
						: L && (L.d(1), (L = null)),
					te & 4 && I !== (I = W[2].top + '') && Kt(z, I);
			},
			i: En,
			o: En,
			d(W) {
				W && vt(t), Z && Z.d(), L && L.d(), (K = !1), Qn(w);
			},
		};
	}
	function j5(e, t, r) {
		let o,
			u,
			{ showSync: c } = t,
			{ value: f } = t,
			{ syncEnabled: d } = t,
			{ locale: g } = t,
			{ islimited: T } = t;
		const A = R1(),
			C = () => A('sync', !d),
			M = () => A('top'),
			x = (S) => ['Enter', 'Space'].includes(S.code) && A('top');
		return (
			(e.$$set = (S) => {
				'showSync' in S && r(0, (c = S.showSync)),
					'value' in S && r(7, (f = S.value)),
					'syncEnabled' in S && r(1, (d = S.syncEnabled)),
					'locale' in S && r(2, (g = S.locale)),
					'islimited' in S && r(3, (T = S.islimited));
			}),
			(e.$$.update = () => {
				e.$$.dirty & 128 && r(5, (o = W5(f))),
					e.$$.dirty & 128 &&
						r(
							4,
							(u = f.split(`
`).length)
						);
			}),
			[c, d, g, T, u, o, A, f, C, M, x]
		);
	}
	class Y5 extends Bi {
		constructor(t) {
			super(),
				Hi(this, t, j5, K5, hc, {
					showSync: 0,
					value: 7,
					syncEnabled: 1,
					locale: 2,
					islimited: 3,
				});
		}
	}
	const Ui = function (e) {
		if (e == null) return V5;
		if (typeof e == 'string') return Q5(e);
		if (typeof e == 'object') return Array.isArray(e) ? q5(e) : X5(e);
		if (typeof e == 'function') return Jo(e);
		throw new Error('Expected function, string, or object as test');
	};
	function q5(e) {
		const t = [];
		let r = -1;
		for (; ++r < e.length; ) t[r] = Ui(e[r]);
		return Jo(o);
		function o(...u) {
			let c = -1;
			for (; ++c < t.length; ) if (t[c].call(this, ...u)) return !0;
			return !1;
		}
	}
	function X5(e) {
		return Jo(t);
		function t(r) {
			let o;
			for (o in e) if (r[o] !== e[o]) return !1;
			return !0;
		}
	}
	function Q5(e) {
		return Jo(t);
		function t(r) {
			return r && r.type === e;
		}
	}
	function Jo(e) {
		return t;
		function t(r, ...o) {
			return !!(
				r &&
				typeof r == 'object' &&
				'type' in r &&
				e.call(this, r, ...o)
			);
		}
	}
	function V5() {
		return !0;
	}
	function M_(e) {
		return e;
	}
	const Z5 = !0,
		kc = !1,
		J5 = 'skip',
		$5 = function (e, t, r, o) {
			typeof t == 'function' &&
				typeof r != 'function' &&
				((o = r), (r = t), (t = null));
			const u = Ui(t),
				c = o ? -1 : 1;
			f(e, void 0, [])();
			function f(d, g, T) {
				const A = d && typeof d == 'object' ? d : {};
				if (typeof A.type == 'string') {
					const M =
						typeof A.tagName == 'string'
							? A.tagName
							: typeof A.name == 'string'
							? A.name
							: void 0;
					Object.defineProperty(C, 'name', {
						value: 'node (' + (d.type + (M ? '<' + M + '>' : '')) + ')',
					});
				}
				return C;
				function C() {
					let M = [],
						x,
						S,
						D;
					if (
						(!t || u(d, g, T[T.length - 1] || null)) &&
						((M = eg(r(d, T))), M[0] === kc)
					)
						return M;
					if (d.children && M[0] !== J5)
						for (
							S = (o ? d.children.length : -1) + c, D = T.concat(d);
							S > -1 && S < d.children.length;

						) {
							if (((x = f(d.children[S], S, D)()), x[0] === kc)) return x;
							S = typeof x[1] == 'number' ? x[1] : S + c;
						}
					return M;
				}
			}
		};
	function eg(e) {
		return Array.isArray(e) ? e : typeof e == 'number' ? [Z5, e] : [e];
	}
	const Da = function (e, t, r, o) {
		typeof t == 'function' &&
			typeof r != 'function' &&
			((o = r), (r = t), (t = null)),
			$5(e, t, u, o);
		function u(c, f) {
			const d = f[f.length - 1];
			return r(c, d ? d.children.indexOf(c) : null, d);
		}
	};
	function Oc(e, t, r) {
		const o = e.slice();
		return (o[11] = t[r]), (o[13] = r), o;
	}
	function wc(e) {
		let t,
			r = e[11].text + '',
			o,
			u,
			c,
			f,
			d;
		function g() {
			return e[8](e[13]);
		}
		function T(...A) {
			return e[9](e[13], ...A);
		}
		return {
			c() {
				(t = Re('li')),
					(o = St(r)),
					Ke(t, 'class', (u = `bytemd-toc-${e[11].level}`)),
					Ke(
						t,
						'style',
						(c = `padding-left:${(e[11].level - e[3]) * 16 + 8}px`)
					),
					bt(t, 'bytemd-toc-active', e[4] === e[13]),
					bt(t, 'bytemd-toc-first', e[11].level === e[3]);
			},
			m(A, C) {
				Ct(A, t, C),
					we(t, o),
					f || ((d = [vn(t, 'click', g), vn(t, 'keydown', Ii(T))]), (f = !0));
			},
			p(A, C) {
				(e = A),
					C & 4 && r !== (r = e[11].text + '') && Kt(o, r),
					C & 4 && u !== (u = `bytemd-toc-${e[11].level}`) && Ke(t, 'class', u),
					C & 12 &&
						c !== (c = `padding-left:${(e[11].level - e[3]) * 16 + 8}px`) &&
						Ke(t, 'style', c),
					C & 20 && bt(t, 'bytemd-toc-active', e[4] === e[13]),
					C & 12 && bt(t, 'bytemd-toc-first', e[11].level === e[3]);
			},
			d(A) {
				A && vt(t), (f = !1), Qn(d);
			},
		};
	}
	function tg(e) {
		let t,
			r,
			o = e[0].toc + '',
			u,
			c,
			f = e[2],
			d = [];
		for (let g = 0; g < f.length; g += 1) d[g] = wc(Oc(e, f, g));
		return {
			c() {
				(t = Re('div')), (r = Re('h2')), (u = St(o)), (c = Re('ul'));
				for (let g = 0; g < d.length; g += 1) d[g].c();
				Ke(t, 'class', 'bytemd-toc'), bt(t, 'bytemd-hidden', !e[1]);
			},
			m(g, T) {
				Ct(g, t, T), we(t, r), we(r, u), we(t, c);
				for (let A = 0; A < d.length; A += 1) d[A] && d[A].m(c, null);
			},
			p(g, [T]) {
				if ((T & 1 && o !== (o = g[0].toc + '') && Kt(u, o), T & 60)) {
					f = g[2];
					let A;
					for (A = 0; A < f.length; A += 1) {
						const C = Oc(g, f, A);
						d[A] ? d[A].p(C, T) : ((d[A] = wc(C)), d[A].c(), d[A].m(c, null));
					}
					for (; A < d.length; A += 1) d[A].d(1);
					d.length = f.length;
				}
				T & 2 && bt(t, 'bytemd-hidden', !g[1]);
			},
			i: En,
			o: En,
			d(g) {
				g && vt(t), w1(d, g);
			},
		};
	}
	function ng(e, t, r) {
		let { hast: o } = t,
			{ currentBlockIndex: u } = t,
			{ locale: c } = t,
			{ visible: f } = t;
		const d = R1();
		let g,
			T = 6,
			A = 0;
		function C(S) {
			let D = '';
			return (
				Da(S, (P) => {
					P.type === 'text' && (D += P.value);
				}),
				D
			);
		}
		const M = (S) => {
				d('click', S);
			},
			x = (S, D) => {
				['Enter', 'Space'].includes(D.code) && d('click', S);
			};
		return (
			(e.$$set = (S) => {
				'hast' in S && r(6, (o = S.hast)),
					'currentBlockIndex' in S && r(7, (u = S.currentBlockIndex)),
					'locale' in S && r(0, (c = S.locale)),
					'visible' in S && r(1, (f = S.visible));
			}),
			(e.$$.update = () => {
				e.$$.dirty & 204 &&
					(r(2, (g = [])),
					r(4, (A = 0)),
					o.children
						.filter((S) => S.type === 'element')
						.forEach((S, D) => {
							if (S.tagName[0] === 'h' && S.children.length) {
								const P = Number(S.tagName[1]);
								r(3, (T = Math.min(T, P))),
									g.push({
										level: P,
										text: C(S),
									});
							}
							u >= D && r(4, (A = g.length - 1));
						}));
			}),
			[c, f, g, T, A, d, o, u, M, x]
		);
	}
	class rg extends Bi {
		constructor(t) {
			super(),
				Hi(this, t, ng, tg, Xo, {
					hast: 6,
					currentBlockIndex: 7,
					locale: 0,
					visible: 1,
				});
		}
	}
	var cn = 'top',
		Nn = 'bottom',
		xn = 'right',
		fn = 'left',
		$o = 'auto',
		P1 = [cn, Nn, xn, fn],
		Gi = 'start',
		F1 = 'end',
		ig = 'clippingParents',
		Lc = 'viewport',
		H1 = 'popper',
		og = 'reference',
		Ic = P1.reduce(function (e, t) {
			return e.concat([t + '-' + Gi, t + '-' + F1]);
		}, []),
		Mc = [].concat(P1, [$o]).reduce(function (e, t) {
			return e.concat([t, t + '-' + Gi, t + '-' + F1]);
		}, []),
		sg = 'beforeRead',
		ag = 'read',
		lg = 'afterRead',
		ug = 'beforeMain',
		cg = 'main',
		fg = 'afterMain',
		hg = 'beforeWrite',
		dg = 'write',
		pg = 'afterWrite',
		Pa = [sg, ag, lg, ug, cg, fg, hg, dg, pg];
	function Vn(e) {
		return e ? (e.nodeName || '').toLowerCase() : null;
	}
	function yn(e) {
		if (e == null) return window;
		if (e.toString() !== '[object Window]') {
			var t = e.ownerDocument;
			return (t && t.defaultView) || window;
		}
		return e;
	}
	function ri(e) {
		var t = yn(e).Element;
		return e instanceof t || e instanceof Element;
	}
	function An(e) {
		var t = yn(e).HTMLElement;
		return e instanceof t || e instanceof HTMLElement;
	}
	function Fa(e) {
		if (typeof ShadowRoot == 'undefined') return !1;
		var t = yn(e).ShadowRoot;
		return e instanceof t || e instanceof ShadowRoot;
	}
	function gg(e) {
		var t = e.state;
		Object.keys(t.elements).forEach(function (r) {
			var o = t.styles[r] || {},
				u = t.attributes[r] || {},
				c = t.elements[r];
			!An(c) ||
				!Vn(c) ||
				(Object.assign(c.style, o),
				Object.keys(u).forEach(function (f) {
					var d = u[f];
					d === !1
						? c.removeAttribute(f)
						: c.setAttribute(f, d === !0 ? '' : d);
				}));
		});
	}
	function mg(e) {
		var t = e.state,
			r = {
				popper: {
					position: t.options.strategy,
					left: '0',
					top: '0',
					margin: '0',
				},
				arrow: {
					position: 'absolute',
				},
				reference: {},
			};
		return (
			Object.assign(t.elements.popper.style, r.popper),
			(t.styles = r),
			t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow),
			function () {
				Object.keys(t.elements).forEach(function (o) {
					var u = t.elements[o],
						c = t.attributes[o] || {},
						f = Object.keys(t.styles.hasOwnProperty(o) ? t.styles[o] : r[o]),
						d = f.reduce(function (g, T) {
							return (g[T] = ''), g;
						}, {});
					!An(u) ||
						!Vn(u) ||
						(Object.assign(u.style, d),
						Object.keys(c).forEach(function (g) {
							u.removeAttribute(g);
						}));
				});
			}
		);
	}
	const Rc = {
		name: 'applyStyles',
		enabled: !0,
		phase: 'write',
		fn: gg,
		effect: mg,
		requires: ['computeStyles'],
	};
	function Fn(e) {
		return e.split('-')[0];
	}
	var ii = Math.max,
		es = Math.min,
		zi = Math.round;
	function Ha() {
		var e = navigator.userAgentData;
		return e != null && e.brands && Array.isArray(e.brands)
			? e.brands
					.map(function (t) {
						return t.brand + '/' + t.version;
					})
					.join(' ')
			: navigator.userAgent;
	}
	function Dc() {
		return !/^((?!chrome|android).)*safari/i.test(Ha());
	}
	function Wi(e, t, r) {
		t === void 0 && (t = !1), r === void 0 && (r = !1);
		var o = e.getBoundingClientRect(),
			u = 1,
			c = 1;
		t &&
			An(e) &&
			((u = (e.offsetWidth > 0 && zi(o.width) / e.offsetWidth) || 1),
			(c = (e.offsetHeight > 0 && zi(o.height) / e.offsetHeight) || 1));
		var f = ri(e) ? yn(e) : window,
			d = f.visualViewport,
			g = !Dc() && r,
			T = (o.left + (g && d ? d.offsetLeft : 0)) / u,
			A = (o.top + (g && d ? d.offsetTop : 0)) / c,
			C = o.width / u,
			M = o.height / c;
		return {
			width: C,
			height: M,
			top: A,
			right: T + C,
			bottom: A + M,
			left: T,
			x: T,
			y: A,
		};
	}
	function Ba(e) {
		var t = Wi(e),
			r = e.offsetWidth,
			o = e.offsetHeight;
		return (
			Math.abs(t.width - r) <= 1 && (r = t.width),
			Math.abs(t.height - o) <= 1 && (o = t.height),
			{
				x: e.offsetLeft,
				y: e.offsetTop,
				width: r,
				height: o,
			}
		);
	}
	function Pc(e, t) {
		var r = t.getRootNode && t.getRootNode();
		if (e.contains(t)) return !0;
		if (r && Fa(r)) {
			var o = t;
			do {
				if (o && e.isSameNode(o)) return !0;
				o = o.parentNode || o.host;
			} while (o);
		}
		return !1;
	}
	function Hn(e) {
		return yn(e).getComputedStyle(e);
	}
	function Tg(e) {
		return ['table', 'td', 'th'].indexOf(Vn(e)) >= 0;
	}
	function Lr(e) {
		return (
			(ri(e) ? e.ownerDocument : e.document) || window.document
		).documentElement;
	}
	function ts(e) {
		return Vn(e) === 'html'
			? e
			: e.assignedSlot || e.parentNode || (Fa(e) ? e.host : null) || Lr(e);
	}
	function Fc(e) {
		return !An(e) || Hn(e).position === 'fixed' ? null : e.offsetParent;
	}
	function Eg(e) {
		var t = /firefox/i.test(Ha()),
			r = /Trident/i.test(Ha());
		if (r && An(e)) {
			var o = Hn(e);
			if (o.position === 'fixed') return null;
		}
		var u = ts(e);
		for (
			Fa(u) && (u = u.host);
			An(u) && ['html', 'body'].indexOf(Vn(u)) < 0;

		) {
			var c = Hn(u);
			if (
				c.transform !== 'none' ||
				c.perspective !== 'none' ||
				c.contain === 'paint' ||
				['transform', 'perspective'].indexOf(c.willChange) !== -1 ||
				(t && c.willChange === 'filter') ||
				(t && c.filter && c.filter !== 'none')
			)
				return u;
			u = u.parentNode;
		}
		return null;
	}
	function B1(e) {
		for (var t = yn(e), r = Fc(e); r && Tg(r) && Hn(r).position === 'static'; )
			r = Fc(r);
		return r &&
			(Vn(r) === 'html' || (Vn(r) === 'body' && Hn(r).position === 'static'))
			? t
			: r || Eg(e) || t;
	}
	function Ua(e) {
		return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
	}
	function U1(e, t, r) {
		return ii(e, es(t, r));
	}
	function vg(e, t, r) {
		var o = U1(e, t, r);
		return o > r ? r : o;
	}
	function Hc() {
		return {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		};
	}
	function Bc(e) {
		return Object.assign({}, Hc(), e);
	}
	function Uc(e, t) {
		return t.reduce(function (r, o) {
			return (r[o] = e), r;
		}, {});
	}
	var yg = function (t, r) {
		return (
			(t =
				typeof t == 'function'
					? t(
							Object.assign({}, r.rects, {
								placement: r.placement,
							})
					  )
					: t),
			Bc(typeof t != 'number' ? t : Uc(t, P1))
		);
	};
	function Ag(e) {
		var t,
			r = e.state,
			o = e.name,
			u = e.options,
			c = r.elements.arrow,
			f = r.modifiersData.popperOffsets,
			d = Fn(r.placement),
			g = Ua(d),
			T = [fn, xn].indexOf(d) >= 0,
			A = T ? 'height' : 'width';
		if (!(!c || !f)) {
			var C = yg(u.padding, r),
				M = Ba(c),
				x = g === 'y' ? cn : fn,
				S = g === 'y' ? Nn : xn,
				D =
					r.rects.reference[A] +
					r.rects.reference[g] -
					f[g] -
					r.rects.popper[A],
				P = f[g] - r.rects.reference[g],
				I = B1(c),
				z = I ? (g === 'y' ? I.clientHeight || 0 : I.clientWidth || 0) : 0,
				K = D / 2 - P / 2,
				w = C[x],
				Z = z - M[A] - C[S],
				L = z / 2 - M[A] / 2 + K,
				W = U1(w, L, Z),
				te = g;
			r.modifiersData[o] = ((t = {}), (t[te] = W), (t.centerOffset = W - L), t);
		}
	}
	function _g(e) {
		var t = e.state,
			r = e.options,
			o = r.element,
			u = o === void 0 ? '[data-popper-arrow]' : o;
		if (
			u != null &&
			!(typeof u == 'string' && ((u = t.elements.popper.querySelector(u)), !u))
		) {
			if (
				(An(u) ||
					console.error(
						[
							'Popper: "arrow" element must be an HTMLElement (not an SVGElement).',
							'To use an SVG arrow, wrap it in an HTMLElement that will be used as',
							'the arrow.',
						].join(' ')
					),
				!Pc(t.elements.popper, u))
			) {
				console.error(
					[
						'Popper: "arrow" modifier\'s `element` must be a child of the popper',
						'element.',
					].join(' ')
				);
				return;
			}
			t.elements.arrow = u;
		}
	}
	const Cg = {
		name: 'arrow',
		enabled: !0,
		phase: 'main',
		fn: Ag,
		effect: _g,
		requires: ['popperOffsets'],
		requiresIfExists: ['preventOverflow'],
	};
	function Ki(e) {
		return e.split('-')[1];
	}
	var Sg = {
		top: 'auto',
		right: 'auto',
		bottom: 'auto',
		left: 'auto',
	};
	function bg(e, t) {
		var r = e.x,
			o = e.y,
			u = t.devicePixelRatio || 1;
		return {
			x: zi(r * u) / u || 0,
			y: zi(o * u) / u || 0,
		};
	}
	function Gc(e) {
		var t,
			r = e.popper,
			o = e.popperRect,
			u = e.placement,
			c = e.variation,
			f = e.offsets,
			d = e.position,
			g = e.gpuAcceleration,
			T = e.adaptive,
			A = e.roundOffsets,
			C = e.isFixed,
			M = f.x,
			x = M === void 0 ? 0 : M,
			S = f.y,
			D = S === void 0 ? 0 : S,
			P =
				typeof A == 'function'
					? A({
							x,
							y: D,
					  })
					: {
							x,
							y: D,
					  };
		(x = P.x), (D = P.y);
		var I = f.hasOwnProperty('x'),
			z = f.hasOwnProperty('y'),
			K = fn,
			w = cn,
			Z = window;
		if (T) {
			var L = B1(r),
				W = 'clientHeight',
				te = 'clientWidth';
			if (
				(L === yn(r) &&
					((L = Lr(r)),
					Hn(L).position !== 'static' &&
						d === 'absolute' &&
						((W = 'scrollHeight'), (te = 'scrollWidth'))),
				(L = L),
				u === cn || ((u === fn || u === xn) && c === F1))
			) {
				w = Nn;
				var V =
					C && L === Z && Z.visualViewport ? Z.visualViewport.height : L[W];
				(D -= V - o.height), (D *= g ? 1 : -1);
			}
			if (u === fn || ((u === cn || u === Nn) && c === F1)) {
				K = xn;
				var ae =
					C && L === Z && Z.visualViewport ? Z.visualViewport.width : L[te];
				(x -= ae - o.width), (x *= g ? 1 : -1);
			}
		}
		var X = Object.assign(
				{
					position: d,
				},
				T && Sg
			),
			G =
				A === !0
					? bg(
							{
								x,
								y: D,
							},
							yn(r)
					  )
					: {
							x,
							y: D,
					  };
		if (((x = G.x), (D = G.y), g)) {
			var H;
			return Object.assign(
				{},
				X,
				((H = {}),
				(H[w] = z ? '0' : ''),
				(H[K] = I ? '0' : ''),
				(H.transform =
					(Z.devicePixelRatio || 1) <= 1
						? 'translate(' + x + 'px, ' + D + 'px)'
						: 'translate3d(' + x + 'px, ' + D + 'px, 0)'),
				H)
			);
		}
		return Object.assign(
			{},
			X,
			((t = {}),
			(t[w] = z ? D + 'px' : ''),
			(t[K] = I ? x + 'px' : ''),
			(t.transform = ''),
			t)
		);
	}
	function Ng(e) {
		var t = e.state,
			r = e.options,
			o = r.gpuAcceleration,
			u = o === void 0 ? !0 : o,
			c = r.adaptive,
			f = c === void 0 ? !0 : c,
			d = r.roundOffsets,
			g = d === void 0 ? !0 : d;
		var T = Hn(t.elements.popper).transitionProperty || '';
		f &&
			['transform', 'top', 'right', 'bottom', 'left'].some(function (C) {
				return T.indexOf(C) >= 0;
			}) &&
			console.warn(
				[
					'Popper: Detected CSS transitions on at least one of the following',
					'CSS properties: "transform", "top", "right", "bottom", "left".',
					`

`,
					'Disable the "computeStyles" modifier\'s `adaptive` option to allow',
					'for smooth transitions, or remove these properties from the CSS',
					'transition declaration on the popper element if only transitioning',
					'opacity or background-color for example.',
					`

`,
					'We recommend using the popper element as a wrapper around an inner',
					'element that can have any CSS property transitioned for animations.',
				].join(' ')
			);
		var A = {
			placement: Fn(t.placement),
			variation: Ki(t.placement),
			popper: t.elements.popper,
			popperRect: t.rects.popper,
			gpuAcceleration: u,
			isFixed: t.options.strategy === 'fixed',
		};
		t.modifiersData.popperOffsets != null &&
			(t.styles.popper = Object.assign(
				{},
				t.styles.popper,
				Gc(
					Object.assign({}, A, {
						offsets: t.modifiersData.popperOffsets,
						position: t.options.strategy,
						adaptive: f,
						roundOffsets: g,
					})
				)
			)),
			t.modifiersData.arrow != null &&
				(t.styles.arrow = Object.assign(
					{},
					t.styles.arrow,
					Gc(
						Object.assign({}, A, {
							offsets: t.modifiersData.arrow,
							position: 'absolute',
							adaptive: !1,
							roundOffsets: g,
						})
					)
				)),
			(t.attributes.popper = Object.assign({}, t.attributes.popper, {
				'data-popper-placement': t.placement,
			}));
	}
	const xg = {
		name: 'computeStyles',
		enabled: !0,
		phase: 'beforeWrite',
		fn: Ng,
		data: {},
	};
	var ns = {
		passive: !0,
	};
	function kg(e) {
		var t = e.state,
			r = e.instance,
			o = e.options,
			u = o.scroll,
			c = u === void 0 ? !0 : u,
			f = o.resize,
			d = f === void 0 ? !0 : f,
			g = yn(t.elements.popper),
			T = [].concat(t.scrollParents.reference, t.scrollParents.popper);
		return (
			c &&
				T.forEach(function (A) {
					A.addEventListener('scroll', r.update, ns);
				}),
			d && g.addEventListener('resize', r.update, ns),
			function () {
				c &&
					T.forEach(function (A) {
						A.removeEventListener('scroll', r.update, ns);
					}),
					d && g.removeEventListener('resize', r.update, ns);
			}
		);
	}
	const Og = {
		name: 'eventListeners',
		enabled: !0,
		phase: 'write',
		fn: function () {},
		effect: kg,
		data: {},
	};
	var wg = {
		left: 'right',
		right: 'left',
		bottom: 'top',
		top: 'bottom',
	};
	function rs(e) {
		return e.replace(/left|right|bottom|top/g, function (t) {
			return wg[t];
		});
	}
	var Lg = {
		start: 'end',
		end: 'start',
	};
	function zc(e) {
		return e.replace(/start|end/g, function (t) {
			return Lg[t];
		});
	}
	function Ga(e) {
		var t = yn(e),
			r = t.pageXOffset,
			o = t.pageYOffset;
		return {
			scrollLeft: r,
			scrollTop: o,
		};
	}
	function za(e) {
		return Wi(Lr(e)).left + Ga(e).scrollLeft;
	}
	function Ig(e, t) {
		var r = yn(e),
			o = Lr(e),
			u = r.visualViewport,
			c = o.clientWidth,
			f = o.clientHeight,
			d = 0,
			g = 0;
		if (u) {
			(c = u.width), (f = u.height);
			var T = Dc();
			(T || (!T && t === 'fixed')) && ((d = u.offsetLeft), (g = u.offsetTop));
		}
		return {
			width: c,
			height: f,
			x: d + za(e),
			y: g,
		};
	}
	function Mg(e) {
		var t,
			r = Lr(e),
			o = Ga(e),
			u = (t = e.ownerDocument) == null ? void 0 : t.body,
			c = ii(
				r.scrollWidth,
				r.clientWidth,
				u ? u.scrollWidth : 0,
				u ? u.clientWidth : 0
			),
			f = ii(
				r.scrollHeight,
				r.clientHeight,
				u ? u.scrollHeight : 0,
				u ? u.clientHeight : 0
			),
			d = -o.scrollLeft + za(e),
			g = -o.scrollTop;
		return (
			Hn(u || r).direction === 'rtl' &&
				(d += ii(r.clientWidth, u ? u.clientWidth : 0) - c),
			{
				width: c,
				height: f,
				x: d,
				y: g,
			}
		);
	}
	function Wa(e) {
		var t = Hn(e),
			r = t.overflow,
			o = t.overflowX,
			u = t.overflowY;
		return /auto|scroll|overlay|hidden/.test(r + u + o);
	}
	function Wc(e) {
		return ['html', 'body', '#document'].indexOf(Vn(e)) >= 0
			? e.ownerDocument.body
			: An(e) && Wa(e)
			? e
			: Wc(ts(e));
	}
	function G1(e, t) {
		var r;
		t === void 0 && (t = []);
		var o = Wc(e),
			u = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
			c = yn(o),
			f = u ? [c].concat(c.visualViewport || [], Wa(o) ? o : []) : o,
			d = t.concat(f);
		return u ? d : d.concat(G1(ts(f)));
	}
	function Ka(e) {
		return Object.assign({}, e, {
			left: e.x,
			top: e.y,
			right: e.x + e.width,
			bottom: e.y + e.height,
		});
	}
	function Rg(e, t) {
		var r = Wi(e, !1, t === 'fixed');
		return (
			(r.top = r.top + e.clientTop),
			(r.left = r.left + e.clientLeft),
			(r.bottom = r.top + e.clientHeight),
			(r.right = r.left + e.clientWidth),
			(r.width = e.clientWidth),
			(r.height = e.clientHeight),
			(r.x = r.left),
			(r.y = r.top),
			r
		);
	}
	function Kc(e, t, r) {
		return t === Lc ? Ka(Ig(e, r)) : ri(t) ? Rg(t, r) : Ka(Mg(Lr(e)));
	}
	function Dg(e) {
		var t = G1(ts(e)),
			r = ['absolute', 'fixed'].indexOf(Hn(e).position) >= 0,
			o = r && An(e) ? B1(e) : e;
		return ri(o)
			? t.filter(function (u) {
					return ri(u) && Pc(u, o) && Vn(u) !== 'body';
			  })
			: [];
	}
	function Pg(e, t, r, o) {
		var u = t === 'clippingParents' ? Dg(e) : [].concat(t),
			c = [].concat(u, [r]),
			f = c[0],
			d = c.reduce(function (g, T) {
				var A = Kc(e, T, o);
				return (
					(g.top = ii(A.top, g.top)),
					(g.right = es(A.right, g.right)),
					(g.bottom = es(A.bottom, g.bottom)),
					(g.left = ii(A.left, g.left)),
					g
				);
			}, Kc(e, f, o));
		return (
			(d.width = d.right - d.left),
			(d.height = d.bottom - d.top),
			(d.x = d.left),
			(d.y = d.top),
			d
		);
	}
	function jc(e) {
		var t = e.reference,
			r = e.element,
			o = e.placement,
			u = o ? Fn(o) : null,
			c = o ? Ki(o) : null,
			f = t.x + t.width / 2 - r.width / 2,
			d = t.y + t.height / 2 - r.height / 2,
			g;
		switch (u) {
			case cn:
				g = {
					x: f,
					y: t.y - r.height,
				};
				break;
			case Nn:
				g = {
					x: f,
					y: t.y + t.height,
				};
				break;
			case xn:
				g = {
					x: t.x + t.width,
					y: d,
				};
				break;
			case fn:
				g = {
					x: t.x - r.width,
					y: d,
				};
				break;
			default:
				g = {
					x: t.x,
					y: t.y,
				};
		}
		var T = u ? Ua(u) : null;
		if (T != null) {
			var A = T === 'y' ? 'height' : 'width';
			switch (c) {
				case Gi:
					g[T] = g[T] - (t[A] / 2 - r[A] / 2);
					break;
				case F1:
					g[T] = g[T] + (t[A] / 2 - r[A] / 2);
					break;
			}
		}
		return g;
	}
	function z1(e, t) {
		t === void 0 && (t = {});
		var r = t,
			o = r.placement,
			u = o === void 0 ? e.placement : o,
			c = r.strategy,
			f = c === void 0 ? e.strategy : c,
			d = r.boundary,
			g = d === void 0 ? ig : d,
			T = r.rootBoundary,
			A = T === void 0 ? Lc : T,
			C = r.elementContext,
			M = C === void 0 ? H1 : C,
			x = r.altBoundary,
			S = x === void 0 ? !1 : x,
			D = r.padding,
			P = D === void 0 ? 0 : D,
			I = Bc(typeof P != 'number' ? P : Uc(P, P1)),
			z = M === H1 ? og : H1,
			K = e.rects.popper,
			w = e.elements[S ? z : M],
			Z = Pg(ri(w) ? w : w.contextElement || Lr(e.elements.popper), g, A, f),
			L = Wi(e.elements.reference),
			W = jc({
				reference: L,
				element: K,
				strategy: 'absolute',
				placement: u,
			}),
			te = Ka(Object.assign({}, K, W)),
			V = M === H1 ? te : L,
			ae = {
				top: Z.top - V.top + I.top,
				bottom: V.bottom - Z.bottom + I.bottom,
				left: Z.left - V.left + I.left,
				right: V.right - Z.right + I.right,
			},
			X = e.modifiersData.offset;
		if (M === H1 && X) {
			var G = X[u];
			Object.keys(ae).forEach(function (H) {
				var J = [xn, Nn].indexOf(H) >= 0 ? 1 : -1,
					Q = [cn, Nn].indexOf(H) >= 0 ? 'y' : 'x';
				ae[H] += G[Q] * J;
			});
		}
		return ae;
	}
	function Fg(e, t) {
		t === void 0 && (t = {});
		var r = t,
			o = r.placement,
			u = r.boundary,
			c = r.rootBoundary,
			f = r.padding,
			d = r.flipVariations,
			g = r.allowedAutoPlacements,
			T = g === void 0 ? Mc : g,
			A = Ki(o),
			C = A
				? d
					? Ic
					: Ic.filter(function (S) {
							return Ki(S) === A;
					  })
				: P1,
			M = C.filter(function (S) {
				return T.indexOf(S) >= 0;
			});
		M.length === 0 &&
			((M = C),
			console.error(
				[
					'Popper: The `allowedAutoPlacements` option did not allow any',
					'placements. Ensure the `placement` option matches the variation',
					'of the allowed placements.',
					'For example, "auto" cannot be used to allow "bottom-start".',
					'Use "auto-start" instead.',
				].join(' ')
			));
		var x = M.reduce(function (S, D) {
			return (
				(S[D] = z1(e, {
					placement: D,
					boundary: u,
					rootBoundary: c,
					padding: f,
				})[Fn(D)]),
				S
			);
		}, {});
		return Object.keys(x).sort(function (S, D) {
			return x[S] - x[D];
		});
	}
	function Hg(e) {
		if (Fn(e) === $o) return [];
		var t = rs(e);
		return [zc(e), t, zc(t)];
	}
	function Bg(e) {
		var t = e.state,
			r = e.options,
			o = e.name;
		if (!t.modifiersData[o]._skip) {
			for (
				var u = r.mainAxis,
					c = u === void 0 ? !0 : u,
					f = r.altAxis,
					d = f === void 0 ? !0 : f,
					g = r.fallbackPlacements,
					T = r.padding,
					A = r.boundary,
					C = r.rootBoundary,
					M = r.altBoundary,
					x = r.flipVariations,
					S = x === void 0 ? !0 : x,
					D = r.allowedAutoPlacements,
					P = t.options.placement,
					I = Fn(P),
					z = I === P,
					K = g || (z || !S ? [rs(P)] : Hg(P)),
					w = [P].concat(K).reduce(function (fe, Ue) {
						return fe.concat(
							Fn(Ue) === $o
								? Fg(t, {
										placement: Ue,
										boundary: A,
										rootBoundary: C,
										padding: T,
										flipVariations: S,
										allowedAutoPlacements: D,
								  })
								: Ue
						);
					}, []),
					Z = t.rects.reference,
					L = t.rects.popper,
					W = new Map(),
					te = !0,
					V = w[0],
					ae = 0;
				ae < w.length;
				ae++
			) {
				var X = w[ae],
					G = Fn(X),
					H = Ki(X) === Gi,
					J = [cn, Nn].indexOf(G) >= 0,
					Q = J ? 'width' : 'height',
					se = z1(t, {
						placement: X,
						boundary: A,
						rootBoundary: C,
						altBoundary: M,
						padding: T,
					}),
					Ae = J ? (H ? xn : fn) : H ? Nn : cn;
				Z[Q] > L[Q] && (Ae = rs(Ae));
				var _e = rs(Ae),
					Oe = [];
				if (
					(c && Oe.push(se[G] <= 0),
					d && Oe.push(se[Ae] <= 0, se[_e] <= 0),
					Oe.every(function (fe) {
						return fe;
					}))
				) {
					(V = X), (te = !1);
					break;
				}
				W.set(X, Oe);
			}
			if (te)
				for (
					var O = S ? 3 : 1,
						E = function (Ue) {
							var Pe = w.find(function (Ge) {
								var Ve = W.get(Ge);
								if (Ve)
									return Ve.slice(0, Ue).every(function (rt) {
										return rt;
									});
							});
							if (Pe) return (V = Pe), 'break';
						},
						b = O;
					b > 0;
					b--
				) {
					var Ce = E(b);
					if (Ce === 'break') break;
				}
			t.placement !== V &&
				((t.modifiersData[o]._skip = !0), (t.placement = V), (t.reset = !0));
		}
	}
	const Ug = {
		name: 'flip',
		enabled: !0,
		phase: 'main',
		fn: Bg,
		requiresIfExists: ['offset'],
		data: {
			_skip: !1,
		},
	};
	function Yc(e, t, r) {
		return (
			r === void 0 &&
				(r = {
					x: 0,
					y: 0,
				}),
			{
				top: e.top - t.height - r.y,
				right: e.right - t.width + r.x,
				bottom: e.bottom - t.height + r.y,
				left: e.left - t.width - r.x,
			}
		);
	}
	function qc(e) {
		return [cn, xn, Nn, fn].some(function (t) {
			return e[t] >= 0;
		});
	}
	function Gg(e) {
		var t = e.state,
			r = e.name,
			o = t.rects.reference,
			u = t.rects.popper,
			c = t.modifiersData.preventOverflow,
			f = z1(t, {
				elementContext: 'reference',
			}),
			d = z1(t, {
				altBoundary: !0,
			}),
			g = Yc(f, o),
			T = Yc(d, u, c),
			A = qc(g),
			C = qc(T);
		(t.modifiersData[r] = {
			referenceClippingOffsets: g,
			popperEscapeOffsets: T,
			isReferenceHidden: A,
			hasPopperEscaped: C,
		}),
			(t.attributes.popper = Object.assign({}, t.attributes.popper, {
				'data-popper-reference-hidden': A,
				'data-popper-escaped': C,
			}));
	}
	const zg = {
		name: 'hide',
		enabled: !0,
		phase: 'main',
		requiresIfExists: ['preventOverflow'],
		fn: Gg,
	};
	function Wg(e, t, r) {
		var o = Fn(e),
			u = [fn, cn].indexOf(o) >= 0 ? -1 : 1,
			c =
				typeof r == 'function'
					? r(
							Object.assign({}, t, {
								placement: e,
							})
					  )
					: r,
			f = c[0],
			d = c[1];
		return (
			(f = f || 0),
			(d = (d || 0) * u),
			[fn, xn].indexOf(o) >= 0
				? {
						x: d,
						y: f,
				  }
				: {
						x: f,
						y: d,
				  }
		);
	}
	function Kg(e) {
		var t = e.state,
			r = e.options,
			o = e.name,
			u = r.offset,
			c = u === void 0 ? [0, 0] : u,
			f = Mc.reduce(function (A, C) {
				return (A[C] = Wg(C, t.rects, c)), A;
			}, {}),
			d = f[t.placement],
			g = d.x,
			T = d.y;
		t.modifiersData.popperOffsets != null &&
			((t.modifiersData.popperOffsets.x += g),
			(t.modifiersData.popperOffsets.y += T)),
			(t.modifiersData[o] = f);
	}
	const jg = {
		name: 'offset',
		enabled: !0,
		phase: 'main',
		requires: ['popperOffsets'],
		fn: Kg,
	};
	function Yg(e) {
		var t = e.state,
			r = e.name;
		t.modifiersData[r] = jc({
			reference: t.rects.reference,
			element: t.rects.popper,
			strategy: 'absolute',
			placement: t.placement,
		});
	}
	const qg = {
		name: 'popperOffsets',
		enabled: !0,
		phase: 'read',
		fn: Yg,
		data: {},
	};
	function Xg(e) {
		return e === 'x' ? 'y' : 'x';
	}
	function Qg(e) {
		var t = e.state,
			r = e.options,
			o = e.name,
			u = r.mainAxis,
			c = u === void 0 ? !0 : u,
			f = r.altAxis,
			d = f === void 0 ? !1 : f,
			g = r.boundary,
			T = r.rootBoundary,
			A = r.altBoundary,
			C = r.padding,
			M = r.tether,
			x = M === void 0 ? !0 : M,
			S = r.tetherOffset,
			D = S === void 0 ? 0 : S,
			P = z1(t, {
				boundary: g,
				rootBoundary: T,
				padding: C,
				altBoundary: A,
			}),
			I = Fn(t.placement),
			z = Ki(t.placement),
			K = !z,
			w = Ua(I),
			Z = Xg(w),
			L = t.modifiersData.popperOffsets,
			W = t.rects.reference,
			te = t.rects.popper,
			V =
				typeof D == 'function'
					? D(
							Object.assign({}, t.rects, {
								placement: t.placement,
							})
					  )
					: D,
			ae =
				typeof V == 'number'
					? {
							mainAxis: V,
							altAxis: V,
					  }
					: Object.assign(
							{
								mainAxis: 0,
								altAxis: 0,
							},
							V
					  ),
			X = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
			G = {
				x: 0,
				y: 0,
			};
		if (L) {
			if (c) {
				var H,
					J = w === 'y' ? cn : fn,
					Q = w === 'y' ? Nn : xn,
					se = w === 'y' ? 'height' : 'width',
					Ae = L[w],
					_e = Ae + P[J],
					Oe = Ae - P[Q],
					O = x ? -te[se] / 2 : 0,
					E = z === Gi ? W[se] : te[se],
					b = z === Gi ? -te[se] : -W[se],
					Ce = t.elements.arrow,
					fe =
						x && Ce
							? Ba(Ce)
							: {
									width: 0,
									height: 0,
							  },
					Ue = t.modifiersData['arrow#persistent']
						? t.modifiersData['arrow#persistent'].padding
						: Hc(),
					Pe = Ue[J],
					Ge = Ue[Q],
					Ve = U1(0, W[se], fe[se]),
					rt = K
						? W[se] / 2 - O - Ve - Pe - ae.mainAxis
						: E - Ve - Pe - ae.mainAxis,
					Fe = K
						? -W[se] / 2 + O + Ve + Ge + ae.mainAxis
						: b + Ve + Ge + ae.mainAxis,
					Ze = t.elements.arrow && B1(t.elements.arrow),
					qt = Ze ? (w === 'y' ? Ze.clientTop || 0 : Ze.clientLeft || 0) : 0,
					De = (H = X == null ? void 0 : X[w]) != null ? H : 0,
					Gt = Ae + rt - De - qt,
					Xt = Ae + Fe - De,
					Rt = U1(x ? es(_e, Gt) : _e, Ae, x ? ii(Oe, Xt) : Oe);
				(L[w] = Rt), (G[w] = Rt - Ae);
			}
			if (d) {
				var zt,
					$t = w === 'x' ? cn : fn,
					Ot = w === 'x' ? Nn : xn,
					ie = L[Z],
					Je = Z === 'y' ? 'height' : 'width',
					Pn = ie + P[$t],
					en = ie - P[Ot],
					lt = [cn, fn].indexOf(I) !== -1,
					qe = (zt = X == null ? void 0 : X[Z]) != null ? zt : 0,
					et = lt ? Pn : ie - W[Je] - te[Je] - qe + ae.altAxis,
					pt = lt ? ie + W[Je] + te[Je] - qe - ae.altAxis : en,
					Y = x && lt ? vg(et, ie, pt) : U1(x ? et : Pn, ie, x ? pt : en);
				(L[Z] = Y), (G[Z] = Y - ie);
			}
			t.modifiersData[o] = G;
		}
	}
	const Vg = {
		name: 'preventOverflow',
		enabled: !0,
		phase: 'main',
		fn: Qg,
		requiresIfExists: ['offset'],
	};
	function Zg(e) {
		return {
			scrollLeft: e.scrollLeft,
			scrollTop: e.scrollTop,
		};
	}
	function Jg(e) {
		return e === yn(e) || !An(e) ? Ga(e) : Zg(e);
	}
	function $g(e) {
		var t = e.getBoundingClientRect(),
			r = zi(t.width) / e.offsetWidth || 1,
			o = zi(t.height) / e.offsetHeight || 1;
		return r !== 1 || o !== 1;
	}
	function em(e, t, r) {
		r === void 0 && (r = !1);
		var o = An(t),
			u = An(t) && $g(t),
			c = Lr(t),
			f = Wi(e, u, r),
			d = {
				scrollLeft: 0,
				scrollTop: 0,
			},
			g = {
				x: 0,
				y: 0,
			};
		return (
			(o || (!o && !r)) &&
				((Vn(t) !== 'body' || Wa(c)) && (d = Jg(t)),
				An(t)
					? ((g = Wi(t, !0)), (g.x += t.clientLeft), (g.y += t.clientTop))
					: c && (g.x = za(c))),
			{
				x: f.left + d.scrollLeft - g.x,
				y: f.top + d.scrollTop - g.y,
				width: f.width,
				height: f.height,
			}
		);
	}
	function tm(e) {
		var t = new Map(),
			r = new Set(),
			o = [];
		e.forEach(function (c) {
			t.set(c.name, c);
		});
		function u(c) {
			r.add(c.name);
			var f = [].concat(c.requires || [], c.requiresIfExists || []);
			f.forEach(function (d) {
				if (!r.has(d)) {
					var g = t.get(d);
					g && u(g);
				}
			}),
				o.push(c);
		}
		return (
			e.forEach(function (c) {
				r.has(c.name) || u(c);
			}),
			o
		);
	}
	function nm(e) {
		var t = tm(e);
		return Pa.reduce(function (r, o) {
			return r.concat(
				t.filter(function (u) {
					return u.phase === o;
				})
			);
		}, []);
	}
	function rm(e) {
		var t;
		return function () {
			return (
				t ||
					(t = new Promise(function (r) {
						Promise.resolve().then(function () {
							(t = void 0), r(e());
						});
					})),
				t
			);
		};
	}
	function Ir(e) {
		for (
			var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1;
			o < t;
			o++
		)
			r[o - 1] = arguments[o];
		return [].concat(r).reduce(function (u, c) {
			return u.replace(/%s/, c);
		}, e);
	}
	var oi =
			'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
		im =
			'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
		Xc = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
	function om(e) {
		e.forEach(function (t) {
			[]
				.concat(Object.keys(t), Xc)
				.filter(function (r, o, u) {
					return u.indexOf(r) === o;
				})
				.forEach(function (r) {
					switch (r) {
						case 'name':
							typeof t.name != 'string' &&
								console.error(
									Ir(
										oi,
										String(t.name),
										'"name"',
										'"string"',
										'"' + String(t.name) + '"'
									)
								);
							break;
						case 'enabled':
							typeof t.enabled != 'boolean' &&
								console.error(
									Ir(
										oi,
										t.name,
										'"enabled"',
										'"boolean"',
										'"' + String(t.enabled) + '"'
									)
								);
							break;
						case 'phase':
							Pa.indexOf(t.phase) < 0 &&
								console.error(
									Ir(
										oi,
										t.name,
										'"phase"',
										'either ' + Pa.join(', '),
										'"' + String(t.phase) + '"'
									)
								);
							break;
						case 'fn':
							typeof t.fn != 'function' &&
								console.error(
									Ir(oi, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"')
								);
							break;
						case 'effect':
							t.effect != null &&
								typeof t.effect != 'function' &&
								console.error(
									Ir(
										oi,
										t.name,
										'"effect"',
										'"function"',
										'"' + String(t.fn) + '"'
									)
								);
							break;
						case 'requires':
							t.requires != null &&
								!Array.isArray(t.requires) &&
								console.error(
									Ir(
										oi,
										t.name,
										'"requires"',
										'"array"',
										'"' + String(t.requires) + '"'
									)
								);
							break;
						case 'requiresIfExists':
							Array.isArray(t.requiresIfExists) ||
								console.error(
									Ir(
										oi,
										t.name,
										'"requiresIfExists"',
										'"array"',
										'"' + String(t.requiresIfExists) + '"'
									)
								);
							break;
						case 'options':
						case 'data':
							break;
						default:
							console.error(
								'PopperJS: an invalid property has been provided to the "' +
									t.name +
									'" modifier, valid properties are ' +
									Xc.map(function (o) {
										return '"' + o + '"';
									}).join(', ') +
									'; but "' +
									r +
									'" was provided.'
							);
					}
					t.requires &&
						t.requires.forEach(function (o) {
							e.find(function (u) {
								return u.name === o;
							}) == null && console.error(Ir(im, String(t.name), o, o));
						});
				});
		});
	}
	function sm(e, t) {
		var r = new Set();
		return e.filter(function (o) {
			var u = t(o);
			if (!r.has(u)) return r.add(u), !0;
		});
	}
	function am(e) {
		var t = e.reduce(function (r, o) {
			var u = r[o.name];
			return (
				(r[o.name] = u
					? Object.assign({}, u, o, {
							options: Object.assign({}, u.options, o.options),
							data: Object.assign({}, u.data, o.data),
					  })
					: o),
				r
			);
		}, {});
		return Object.keys(t).map(function (r) {
			return t[r];
		});
	}
	var Qc =
			'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.',
		lm =
			'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.',
		Vc = {
			placement: 'bottom',
			modifiers: [],
			strategy: 'absolute',
		};
	function Zc() {
		for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
			t[r] = arguments[r];
		return !t.some(function (o) {
			return !(o && typeof o.getBoundingClientRect == 'function');
		});
	}
	function um(e) {
		e === void 0 && (e = {});
		var t = e,
			r = t.defaultModifiers,
			o = r === void 0 ? [] : r,
			u = t.defaultOptions,
			c = u === void 0 ? Vc : u;
		return function (d, g, T) {
			T === void 0 && (T = c);
			var A = {
					placement: 'bottom',
					orderedModifiers: [],
					options: Object.assign({}, Vc, c),
					modifiersData: {},
					elements: {
						reference: d,
						popper: g,
					},
					attributes: {},
					styles: {},
				},
				C = [],
				M = !1,
				x = {
					state: A,
					setOptions: function (I) {
						var z = typeof I == 'function' ? I(A.options) : I;
						D(),
							(A.options = Object.assign({}, c, A.options, z)),
							(A.scrollParents = {
								reference: ri(d)
									? G1(d)
									: d.contextElement
									? G1(d.contextElement)
									: [],
								popper: G1(g),
							});
						var K = nm(am([].concat(o, A.options.modifiers)));
						if (
							(A.orderedModifiers = K.filter(function (X) {
								return X.enabled;
							}))
						) {
							var w = sm([].concat(K, A.options.modifiers), function (X) {
								var G = X.name;
								return G;
							});
							if ((om(w), Fn(A.options.placement) === $o)) {
								var Z = A.orderedModifiers.find(function (X) {
									var G = X.name;
									return G === 'flip';
								});
								Z ||
									console.error(
										[
											'Popper: "auto" placements require the "flip" modifier be',
											'present and enabled to work.',
										].join(' ')
									);
							}
							var L = Hn(g),
								W = L.marginTop,
								te = L.marginRight,
								V = L.marginBottom,
								ae = L.marginLeft;
							[W, te, V, ae].some(function (X) {
								return parseFloat(X);
							}) &&
								console.warn(
									[
										'Popper: CSS "margin" styles cannot be used to apply padding',
										'between the popper and its reference element or boundary.',
										'To replicate margin, use the `offset` modifier, as well as',
										'the `padding` option in the `preventOverflow` and `flip`',
										'modifiers.',
									].join(' ')
								);
						}
						return S(), x.update();
					},
					forceUpdate: function () {
						if (!M) {
							var I = A.elements,
								z = I.reference,
								K = I.popper;
							if (!Zc(z, K)) {
								console.error(Qc);
								return;
							}
							(A.rects = {
								reference: em(z, B1(K), A.options.strategy === 'fixed'),
								popper: Ba(K),
							}),
								(A.reset = !1),
								(A.placement = A.options.placement),
								A.orderedModifiers.forEach(function (X) {
									return (A.modifiersData[X.name] = Object.assign({}, X.data));
								});
							for (var w = 0, Z = 0; Z < A.orderedModifiers.length; Z++) {
								if (((w += 1), w > 100)) {
									console.error(lm);
									break;
								}
								if (A.reset === !0) {
									(A.reset = !1), (Z = -1);
									continue;
								}
								var L = A.orderedModifiers[Z],
									W = L.fn,
									te = L.options,
									V = te === void 0 ? {} : te,
									ae = L.name;
								typeof W == 'function' &&
									(A =
										W({
											state: A,
											options: V,
											name: ae,
											instance: x,
										}) || A);
							}
						}
					},
					update: rm(function () {
						return new Promise(function (P) {
							x.forceUpdate(), P(A);
						});
					}),
					destroy: function () {
						D(), (M = !0);
					},
				};
			if (!Zc(d, g)) return console.error(Qc), x;
			x.setOptions(T).then(function (P) {
				!M && T.onFirstUpdate && T.onFirstUpdate(P);
			});
			function S() {
				A.orderedModifiers.forEach(function (P) {
					var I = P.name,
						z = P.options,
						K = z === void 0 ? {} : z,
						w = P.effect;
					if (typeof w == 'function') {
						var Z = w({
								state: A,
								name: I,
								instance: x,
								options: K,
							}),
							L = function () {};
						C.push(Z || L);
					}
				});
			}
			function D() {
				C.forEach(function (P) {
					return P();
				}),
					(C = []);
			}
			return x;
		};
	}
	var cm = [Og, qg, xg, Rc, jg, Ug, Vg, Cg, zg],
		fm = um({
			defaultModifiers: cm,
		}),
		hm = 'tippy-box',
		Jc = 'tippy-content',
		dm = 'tippy-backdrop',
		$c = 'tippy-arrow',
		ef = 'tippy-svg-arrow',
		Mr = {
			passive: !0,
			capture: !0,
		},
		tf = function () {
			return document.body;
		};
	function pm(e, t) {
		return {}.hasOwnProperty.call(e, t);
	}
	function ja(e, t, r) {
		if (Array.isArray(e)) {
			var o = e[t];
			return o == null ? (Array.isArray(r) ? r[t] : r) : o;
		}
		return e;
	}
	function Ya(e, t) {
		var r = {}.toString.call(e);
		return r.indexOf('[object') === 0 && r.indexOf(t + ']') > -1;
	}
	function nf(e, t) {
		return typeof e == 'function' ? e.apply(void 0, t) : e;
	}
	function rf(e, t) {
		if (t === 0) return e;
		var r;
		return function (o) {
			clearTimeout(r),
				(r = setTimeout(function () {
					e(o);
				}, t));
		};
	}
	function of(e, t) {
		var r = Object.assign({}, e);
		return (
			t.forEach(function (o) {
				delete r[o];
			}),
			r
		);
	}
	function gm(e) {
		return e.split(/\s+/).filter(Boolean);
	}
	function si(e) {
		return [].concat(e);
	}
	function sf(e, t) {
		e.indexOf(t) === -1 && e.push(t);
	}
	function mm(e) {
		return e.filter(function (t, r) {
			return e.indexOf(t) === r;
		});
	}
	function Tm(e) {
		return e.split('-')[0];
	}
	function is(e) {
		return [].slice.call(e);
	}
	function af(e) {
		return Object.keys(e).reduce(function (t, r) {
			return e[r] !== void 0 && (t[r] = e[r]), t;
		}, {});
	}
	function W1() {
		return document.createElement('div');
	}
	function K1(e) {
		return ['Element', 'Fragment'].some(function (t) {
			return Ya(e, t);
		});
	}
	function Em(e) {
		return Ya(e, 'NodeList');
	}
	function vm(e) {
		return Ya(e, 'MouseEvent');
	}
	function ym(e) {
		return !!(e && e._tippy && e._tippy.reference === e);
	}
	function Am(e) {
		return K1(e)
			? [e]
			: Em(e)
			? is(e)
			: Array.isArray(e)
			? e
			: is(document.querySelectorAll(e));
	}
	function qa(e, t) {
		e.forEach(function (r) {
			r && (r.style.transitionDuration = t + 'ms');
		});
	}
	function lf(e, t) {
		e.forEach(function (r) {
			r && r.setAttribute('data-state', t);
		});
	}
	function _m(e) {
		var t,
			r = si(e),
			o = r[0];
		return o != null && (t = o.ownerDocument) != null && t.body
			? o.ownerDocument
			: document;
	}
	function Cm(e, t) {
		var r = t.clientX,
			o = t.clientY;
		return e.every(function (u) {
			var c = u.popperRect,
				f = u.popperState,
				d = u.props,
				g = d.interactiveBorder,
				T = Tm(f.placement),
				A = f.modifiersData.offset;
			if (!A) return !0;
			var C = T === 'bottom' ? A.top.y : 0,
				M = T === 'top' ? A.bottom.y : 0,
				x = T === 'right' ? A.left.x : 0,
				S = T === 'left' ? A.right.x : 0,
				D = c.top - o + C > g,
				P = o - c.bottom - M > g,
				I = c.left - r + x > g,
				z = r - c.right - S > g;
			return D || P || I || z;
		});
	}
	function Xa(e, t, r) {
		var o = t + 'EventListener';
		['transitionend', 'webkitTransitionEnd'].forEach(function (u) {
			e[o](u, r);
		});
	}
	function uf(e, t) {
		for (var r = t; r; ) {
			var o;
			if (e.contains(r)) return !0;
			r =
				r.getRootNode == null || (o = r.getRootNode()) == null
					? void 0
					: o.host;
		}
		return !1;
	}
	var Zn = {
			isTouch: !1,
		},
		cf = 0;
	function Sm() {
		Zn.isTouch ||
			((Zn.isTouch = !0),
			window.performance && document.addEventListener('mousemove', ff));
	}
	function ff() {
		var e = performance.now();
		e - cf < 20 &&
			((Zn.isTouch = !1), document.removeEventListener('mousemove', ff)),
			(cf = e);
	}
	function bm() {
		var e = document.activeElement;
		if (ym(e)) {
			var t = e._tippy;
			e.blur && !t.state.isVisible && e.blur();
		}
	}
	function Nm() {
		document.addEventListener('touchstart', Sm, Mr),
			window.addEventListener('blur', bm);
	}
	var xm = typeof window != 'undefined' && typeof document != 'undefined',
		km = xm ? !!window.msCrypto : !1;
	function ji(e) {
		var t = e === 'destroy' ? 'n already-' : ' ';
		return [
			e + '() was called on a' + t + 'destroyed instance. This is a no-op but',
			'indicates a potential memory leak.',
		].join(' ');
	}
	function hf(e) {
		var t = /[ \t]{2,}/g,
			r = /^[ \t]*/gm;
		return e.replace(t, ' ').replace(r, '').trim();
	}
	function Om(e) {
		return hf(
			`
  %ctippy.js

  %c` +
				hf(e) +
				`

  %c👷‍ This is a development-only message. It will be removed in production.
  `
		);
	}
	function df(e) {
		return [
			Om(e),
			'color: #00C584; font-size: 1.3em; font-weight: bold;',
			'line-height: 1.5',
			'color: #a6a095;',
		];
	}
	var j1;
	wm();
	function wm() {
		j1 = new Set();
	}
	function fr(e, t) {
		if (e && !j1.has(t)) {
			var r;
			j1.add(t), (r = console).warn.apply(r, df(t));
		}
	}
	function os(e, t) {
		if (e && !j1.has(t)) {
			var r;
			j1.add(t), (r = console).error.apply(r, df(t));
		}
	}
	function Lm(e) {
		var t = !e,
			r =
				Object.prototype.toString.call(e) === '[object Object]' &&
				!e.addEventListener;
		os(
			t,
			[
				'tippy() was passed',
				'`' + String(e) + '`',
				'as its targets (first) argument. Valid types are: String, Element,',
				'Element[], or NodeList.',
			].join(' ')
		),
			os(
				r,
				[
					'tippy() was passed a plain object which is not supported as an argument',
					'for virtual positioning. Use props.getReferenceClientRect instead.',
				].join(' ')
			);
	}
	var pf = {
			animateFill: !1,
			followCursor: !1,
			inlinePositioning: !1,
			sticky: !1,
		},
		Im = {
			allowHTML: !1,
			animation: 'fade',
			arrow: !0,
			content: '',
			inertia: !1,
			maxWidth: 350,
			role: 'tooltip',
			theme: '',
			zIndex: 9999,
		},
		rn = Object.assign(
			{
				appendTo: tf,
				aria: {
					content: 'auto',
					expanded: 'auto',
				},
				delay: 0,
				duration: [300, 250],
				getReferenceClientRect: null,
				hideOnClick: !0,
				ignoreAttributes: !1,
				interactive: !1,
				interactiveBorder: 2,
				interactiveDebounce: 0,
				moveTransition: '',
				offset: [0, 10],
				onAfterUpdate: function () {},
				onBeforeUpdate: function () {},
				onCreate: function () {},
				onDestroy: function () {},
				onHidden: function () {},
				onHide: function () {},
				onMount: function () {},
				onShow: function () {},
				onShown: function () {},
				onTrigger: function () {},
				onUntrigger: function () {},
				onClickOutside: function () {},
				placement: 'top',
				plugins: [],
				popperOptions: {},
				render: null,
				showOnCreate: !1,
				touch: !0,
				trigger: 'mouseenter focus',
				triggerTarget: null,
			},
			pf,
			Im
		),
		Mm = Object.keys(rn),
		Rm = function (t) {
			Tf(t, []);
			var r = Object.keys(t);
			r.forEach(function (o) {
				rn[o] = t[o];
			});
		};
	function gf(e) {
		var t = e.plugins || [],
			r = t.reduce(function (o, u) {
				var c = u.name,
					f = u.defaultValue;
				if (c) {
					var d;
					o[c] = e[c] !== void 0 ? e[c] : (d = rn[c]) != null ? d : f;
				}
				return o;
			}, {});
		return Object.assign({}, e, r);
	}
	function Dm(e, t) {
		var r = t
				? Object.keys(
						gf(
							Object.assign({}, rn, {
								plugins: t,
							})
						)
				  )
				: Mm,
			o = r.reduce(function (u, c) {
				var f = (e.getAttribute('data-tippy-' + c) || '').trim();
				if (!f) return u;
				if (c === 'content') u[c] = f;
				else
					try {
						u[c] = JSON.parse(f);
					} catch {
						u[c] = f;
					}
				return u;
			}, {});
		return o;
	}
	function mf(e, t) {
		var r = Object.assign(
			{},
			t,
			{
				content: nf(t.content, [e]),
			},
			t.ignoreAttributes ? {} : Dm(e, t.plugins)
		);
		return (
			(r.aria = Object.assign({}, rn.aria, r.aria)),
			(r.aria = {
				expanded: r.aria.expanded === 'auto' ? t.interactive : r.aria.expanded,
				content:
					r.aria.content === 'auto'
						? t.interactive
							? null
							: 'describedby'
						: r.aria.content,
			}),
			r
		);
	}
	function Tf(e, t) {
		e === void 0 && (e = {}), t === void 0 && (t = []);
		var r = Object.keys(e);
		r.forEach(function (o) {
			var u = of(rn, Object.keys(pf)),
				c = !pm(u, o);
			c &&
				(c =
					t.filter(function (f) {
						return f.name === o;
					}).length === 0),
				fr(
					c,
					[
						'`' + o + '`',
						"is not a valid prop. You may have spelled it incorrectly, or if it's",
						'a plugin, forgot to pass it in an array as props.plugins.',
						`

`,
						`All props: https://atomiks.github.io/tippyjs/v6/all-props/
`,
						'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/',
					].join(' ')
				);
		});
	}
	var Pm = function () {
		return 'innerHTML';
	};
	function Qa(e, t) {
		e[Pm()] = t;
	}
	function Ef(e) {
		var t = W1();
		return (
			e === !0
				? (t.className = $c)
				: ((t.className = ef), K1(e) ? t.appendChild(e) : Qa(t, e)),
			t
		);
	}
	function vf(e, t) {
		K1(t.content)
			? (Qa(e, ''), e.appendChild(t.content))
			: typeof t.content != 'function' &&
			  (t.allowHTML ? Qa(e, t.content) : (e.textContent = t.content));
	}
	function Va(e) {
		var t = e.firstElementChild,
			r = is(t.children);
		return {
			box: t,
			content: r.find(function (o) {
				return o.classList.contains(Jc);
			}),
			arrow: r.find(function (o) {
				return o.classList.contains($c) || o.classList.contains(ef);
			}),
			backdrop: r.find(function (o) {
				return o.classList.contains(dm);
			}),
		};
	}
	function yf(e) {
		var t = W1(),
			r = W1();
		(r.className = hm),
			r.setAttribute('data-state', 'hidden'),
			r.setAttribute('tabindex', '-1');
		var o = W1();
		(o.className = Jc),
			o.setAttribute('data-state', 'hidden'),
			vf(o, e.props),
			t.appendChild(r),
			r.appendChild(o),
			u(e.props, e.props);
		function u(c, f) {
			var d = Va(t),
				g = d.box,
				T = d.content,
				A = d.arrow;
			f.theme
				? g.setAttribute('data-theme', f.theme)
				: g.removeAttribute('data-theme'),
				typeof f.animation == 'string'
					? g.setAttribute('data-animation', f.animation)
					: g.removeAttribute('data-animation'),
				f.inertia
					? g.setAttribute('data-inertia', '')
					: g.removeAttribute('data-inertia'),
				(g.style.maxWidth =
					typeof f.maxWidth == 'number' ? f.maxWidth + 'px' : f.maxWidth),
				f.role ? g.setAttribute('role', f.role) : g.removeAttribute('role'),
				(c.content !== f.content || c.allowHTML !== f.allowHTML) &&
					vf(T, e.props),
				f.arrow
					? A
						? c.arrow !== f.arrow &&
						  (g.removeChild(A), g.appendChild(Ef(f.arrow)))
						: g.appendChild(Ef(f.arrow))
					: A && g.removeChild(A);
		}
		return {
			popper: t,
			onUpdate: u,
		};
	}
	yf.$$tippy = !0;
	var Fm = 1,
		ss = [],
		Za = [];
	function Hm(e, t) {
		var r = mf(e, Object.assign({}, rn, gf(af(t)))),
			o,
			u,
			c,
			f = !1,
			d = !1,
			g = !1,
			T = !1,
			A,
			C,
			M,
			x = [],
			S = rf(Gt, r.interactiveDebounce),
			D,
			P = Fm++,
			I = null,
			z = mm(r.plugins),
			K = {
				isEnabled: !0,
				isVisible: !1,
				isDestroyed: !1,
				isMounted: !1,
				isShown: !1,
			},
			w = {
				id: P,
				reference: e,
				popper: W1(),
				popperInstance: I,
				props: r,
				state: K,
				plugins: z,
				clearDelayTimeouts: et,
				setProps: pt,
				setContent: Y,
				show: pe,
				hide: Ne,
				hideWithInteractivity: Xe,
				enable: lt,
				disable: qe,
				unmount: Ee,
				destroy: Kn,
			};
		if (!r.render) return os(!0, 'render() function has not been supplied.'), w;
		var Z = r.render(w),
			L = Z.popper,
			W = Z.onUpdate;
		L.setAttribute('data-tippy-root', ''),
			(L.id = 'tippy-' + w.id),
			(w.popper = L),
			(e._tippy = w),
			(L._tippy = w);
		var te = z.map(function (j) {
				return j.fn(w);
			}),
			V = e.hasAttribute('aria-expanded');
		return (
			Ze(),
			O(),
			Ae(),
			_e('onCreate', [w]),
			r.showOnCreate && Pn(),
			L.addEventListener('mouseenter', function () {
				w.props.interactive && w.state.isVisible && w.clearDelayTimeouts();
			}),
			L.addEventListener('mouseleave', function () {
				w.props.interactive &&
					w.props.trigger.indexOf('mouseenter') >= 0 &&
					J().addEventListener('mousemove', S);
			}),
			w
		);
		function ae() {
			var j = w.props.touch;
			return Array.isArray(j) ? j : [j, 0];
		}
		function X() {
			return ae()[0] === 'hold';
		}
		function G() {
			var j;
			return !!((j = w.props.render) != null && j.$$tippy);
		}
		function H() {
			return D || e;
		}
		function J() {
			var j = H().parentNode;
			return j ? _m(j) : document;
		}
		function Q() {
			return Va(L);
		}
		function se(j) {
			return (w.state.isMounted && !w.state.isVisible) ||
				Zn.isTouch ||
				(A && A.type === 'focus')
				? 0
				: ja(w.props.delay, j ? 0 : 1, rn.delay);
		}
		function Ae(j) {
			j === void 0 && (j = !1),
				(L.style.pointerEvents = w.props.interactive && !j ? '' : 'none'),
				(L.style.zIndex = '' + w.props.zIndex);
		}
		function _e(j, re, me) {
			if (
				(me === void 0 && (me = !0),
				te.forEach(function (ve) {
					ve[j] && ve[j].apply(ve, re);
				}),
				me)
			) {
				var ze;
				(ze = w.props)[j].apply(ze, re);
			}
		}
		function Oe() {
			var j = w.props.aria;
			if (j.content) {
				var re = 'aria-' + j.content,
					me = L.id,
					ze = si(w.props.triggerTarget || e);
				ze.forEach(function (ve) {
					var ut = ve.getAttribute(re);
					if (w.state.isVisible) ve.setAttribute(re, ut ? ut + ' ' + me : me);
					else {
						var We = ut && ut.replace(me, '').trim();
						We ? ve.setAttribute(re, We) : ve.removeAttribute(re);
					}
				});
			}
		}
		function O() {
			if (!(V || !w.props.aria.expanded)) {
				var j = si(w.props.triggerTarget || e);
				j.forEach(function (re) {
					w.props.interactive
						? re.setAttribute(
								'aria-expanded',
								w.state.isVisible && re === H() ? 'true' : 'false'
						  )
						: re.removeAttribute('aria-expanded');
				});
			}
		}
		function E() {
			J().removeEventListener('mousemove', S),
				(ss = ss.filter(function (j) {
					return j !== S;
				}));
		}
		function b(j) {
			if (!(Zn.isTouch && (g || j.type === 'mousedown'))) {
				var re = (j.composedPath && j.composedPath()[0]) || j.target;
				if (!(w.props.interactive && uf(L, re))) {
					if (
						si(w.props.triggerTarget || e).some(function (me) {
							return uf(me, re);
						})
					) {
						if (
							Zn.isTouch ||
							(w.state.isVisible && w.props.trigger.indexOf('click') >= 0)
						)
							return;
					} else _e('onClickOutside', [w, j]);
					w.props.hideOnClick === !0 &&
						(w.clearDelayTimeouts(),
						w.hide(),
						(d = !0),
						setTimeout(function () {
							d = !1;
						}),
						w.state.isMounted || Pe());
				}
			}
		}
		function Ce() {
			g = !0;
		}
		function fe() {
			g = !1;
		}
		function Ue() {
			var j = J();
			j.addEventListener('mousedown', b, !0),
				j.addEventListener('touchend', b, Mr),
				j.addEventListener('touchstart', fe, Mr),
				j.addEventListener('touchmove', Ce, Mr);
		}
		function Pe() {
			var j = J();
			j.removeEventListener('mousedown', b, !0),
				j.removeEventListener('touchend', b, Mr),
				j.removeEventListener('touchstart', fe, Mr),
				j.removeEventListener('touchmove', Ce, Mr);
		}
		function Ge(j, re) {
			rt(j, function () {
				!w.state.isVisible && L.parentNode && L.parentNode.contains(L) && re();
			});
		}
		function Ve(j, re) {
			rt(j, re);
		}
		function rt(j, re) {
			var me = Q().box;
			function ze(ve) {
				ve.target === me && (Xa(me, 'remove', ze), re());
			}
			if (j === 0) return re();
			Xa(me, 'remove', C), Xa(me, 'add', ze), (C = ze);
		}
		function Fe(j, re, me) {
			me === void 0 && (me = !1);
			var ze = si(w.props.triggerTarget || e);
			ze.forEach(function (ve) {
				ve.addEventListener(j, re, me),
					x.push({
						node: ve,
						eventType: j,
						handler: re,
						options: me,
					});
			});
		}
		function Ze() {
			X() &&
				(Fe('touchstart', De, {
					passive: !0,
				}),
				Fe('touchend', Xt, {
					passive: !0,
				})),
				gm(w.props.trigger).forEach(function (j) {
					if (j !== 'manual')
						switch ((Fe(j, De), j)) {
							case 'mouseenter':
								Fe('mouseleave', Xt);
								break;
							case 'focus':
								Fe(km ? 'focusout' : 'blur', Rt);
								break;
							case 'focusin':
								Fe('focusout', Rt);
								break;
						}
				});
		}
		function qt() {
			x.forEach(function (j) {
				var re = j.node,
					me = j.eventType,
					ze = j.handler,
					ve = j.options;
				re.removeEventListener(me, ze, ve);
			}),
				(x = []);
		}
		function De(j) {
			var re,
				me = !1;
			if (!(!w.state.isEnabled || zt(j) || d)) {
				var ze = ((re = A) == null ? void 0 : re.type) === 'focus';
				(A = j),
					(D = j.currentTarget),
					O(),
					!w.state.isVisible &&
						vm(j) &&
						ss.forEach(function (ve) {
							return ve(j);
						}),
					j.type === 'click' &&
					(w.props.trigger.indexOf('mouseenter') < 0 || f) &&
					w.props.hideOnClick !== !1 &&
					w.state.isVisible
						? (me = !0)
						: Pn(j),
					j.type === 'click' && (f = !me),
					me && !ze && en(j);
			}
		}
		function Gt(j) {
			var re = j.target,
				me = H().contains(re) || L.contains(re);
			if (!(j.type === 'mousemove' && me)) {
				var ze = Je()
					.concat(L)
					.map(function (ve) {
						var ut,
							We = ve._tippy,
							_r = (ut = We.popperInstance) == null ? void 0 : ut.state;
						return _r
							? {
									popperRect: ve.getBoundingClientRect(),
									popperState: _r,
									props: r,
							  }
							: null;
					})
					.filter(Boolean);
				Cm(ze, j) && (E(), en(j));
			}
		}
		function Xt(j) {
			var re = zt(j) || (w.props.trigger.indexOf('click') >= 0 && f);
			if (!re) {
				if (w.props.interactive) {
					w.hideWithInteractivity(j);
					return;
				}
				en(j);
			}
		}
		function Rt(j) {
			(w.props.trigger.indexOf('focusin') < 0 && j.target !== H()) ||
				(w.props.interactive &&
					j.relatedTarget &&
					L.contains(j.relatedTarget)) ||
				en(j);
		}
		function zt(j) {
			return Zn.isTouch ? X() !== j.type.indexOf('touch') >= 0 : !1;
		}
		function $t() {
			Ot();
			var j = w.props,
				re = j.popperOptions,
				me = j.placement,
				ze = j.offset,
				ve = j.getReferenceClientRect,
				ut = j.moveTransition,
				We = G() ? Va(L).arrow : null,
				_r = ve
					? {
							getBoundingClientRect: ve,
							contextElement: ve.contextElement || H(),
					  }
					: e,
				l1 = {
					name: '$$tippy',
					enabled: !0,
					phase: 'beforeWrite',
					requires: ['computeStyles'],
					fn: function (Ei) {
						var zr = Ei.state;
						if (G()) {
							var To = Q(),
								Eo = To.box;
							['placement', 'reference-hidden', 'escaped'].forEach(function (
								Wr
							) {
								Wr === 'placement'
									? Eo.setAttribute('data-placement', zr.placement)
									: zr.attributes.popper['data-popper-' + Wr]
									? Eo.setAttribute('data-' + Wr, '')
									: Eo.removeAttribute('data-' + Wr);
							}),
								(zr.attributes.popper = {});
						}
					},
				},
				Sn = [
					{
						name: 'offset',
						options: {
							offset: ze,
						},
					},
					{
						name: 'preventOverflow',
						options: {
							padding: {
								top: 2,
								bottom: 2,
								left: 5,
								right: 5,
							},
						},
					},
					{
						name: 'flip',
						options: {
							padding: 5,
						},
					},
					{
						name: 'computeStyles',
						options: {
							adaptive: !ut,
						},
					},
					l1,
				];
			G() &&
				We &&
				Sn.push({
					name: 'arrow',
					options: {
						element: We,
						padding: 3,
					},
				}),
				Sn.push.apply(Sn, (re == null ? void 0 : re.modifiers) || []),
				(w.popperInstance = fm(
					_r,
					L,
					Object.assign({}, re, {
						placement: me,
						onFirstUpdate: M,
						modifiers: Sn,
					})
				));
		}
		function Ot() {
			w.popperInstance &&
				(w.popperInstance.destroy(), (w.popperInstance = null));
		}
		function ie() {
			var j = w.props.appendTo,
				re,
				me = H();
			(w.props.interactive && j === tf) || j === 'parent'
				? (re = me.parentNode)
				: (re = nf(j, [me])),
				re.contains(L) || re.appendChild(L),
				(w.state.isMounted = !0),
				$t(),
				fr(
					w.props.interactive &&
						j === rn.appendTo &&
						me.nextElementSibling !== L,
					[
						'Interactive tippy element may not be accessible via keyboard',
						'navigation because it is not directly after the reference element',
						'in the DOM source order.',
						`

`,
						'Using a wrapper <div> or <span> tag around the reference element',
						'solves this by creating a new parentNode context.',
						`

`,
						'Specifying `appendTo: document.body` silences this warning, but it',
						'assumes you are using a focus management solution to handle',
						'keyboard navigation.',
						`

`,
						'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity',
					].join(' ')
				);
		}
		function Je() {
			return is(L.querySelectorAll('[data-tippy-root]'));
		}
		function Pn(j) {
			w.clearDelayTimeouts(), j && _e('onTrigger', [w, j]), Ue();
			var re = se(!0),
				me = ae(),
				ze = me[0],
				ve = me[1];
			Zn.isTouch && ze === 'hold' && ve && (re = ve),
				re
					? (o = setTimeout(function () {
							w.show();
					  }, re))
					: w.show();
		}
		function en(j) {
			if (
				(w.clearDelayTimeouts(), _e('onUntrigger', [w, j]), !w.state.isVisible)
			) {
				Pe();
				return;
			}
			if (
				!(
					w.props.trigger.indexOf('mouseenter') >= 0 &&
					w.props.trigger.indexOf('click') >= 0 &&
					['mouseleave', 'mousemove'].indexOf(j.type) >= 0 &&
					f
				)
			) {
				var re = se(!1);
				re
					? (u = setTimeout(function () {
							w.state.isVisible && w.hide();
					  }, re))
					: (c = requestAnimationFrame(function () {
							w.hide();
					  }));
			}
		}
		function lt() {
			w.state.isEnabled = !0;
		}
		function qe() {
			w.hide(), (w.state.isEnabled = !1);
		}
		function et() {
			clearTimeout(o), clearTimeout(u), cancelAnimationFrame(c);
		}
		function pt(j) {
			if ((fr(w.state.isDestroyed, ji('setProps')), !w.state.isDestroyed)) {
				_e('onBeforeUpdate', [w, j]), qt();
				var re = w.props,
					me = mf(
						e,
						Object.assign({}, re, af(j), {
							ignoreAttributes: !0,
						})
					);
				(w.props = me),
					Ze(),
					re.interactiveDebounce !== me.interactiveDebounce &&
						(E(), (S = rf(Gt, me.interactiveDebounce))),
					re.triggerTarget && !me.triggerTarget
						? si(re.triggerTarget).forEach(function (ze) {
								ze.removeAttribute('aria-expanded');
						  })
						: me.triggerTarget && e.removeAttribute('aria-expanded'),
					O(),
					Ae(),
					W && W(re, me),
					w.popperInstance &&
						($t(),
						Je().forEach(function (ze) {
							requestAnimationFrame(ze._tippy.popperInstance.forceUpdate);
						})),
					_e('onAfterUpdate', [w, j]);
			}
		}
		function Y(j) {
			w.setProps({
				content: j,
			});
		}
		function pe() {
			fr(w.state.isDestroyed, ji('show'));
			var j = w.state.isVisible,
				re = w.state.isDestroyed,
				me = !w.state.isEnabled,
				ze = Zn.isTouch && !w.props.touch,
				ve = ja(w.props.duration, 0, rn.duration);
			if (
				!(j || re || me || ze) &&
				!H().hasAttribute('disabled') &&
				(_e('onShow', [w], !1), w.props.onShow(w) !== !1)
			) {
				if (
					((w.state.isVisible = !0),
					G() && (L.style.visibility = 'visible'),
					Ae(),
					Ue(),
					w.state.isMounted || (L.style.transition = 'none'),
					G())
				) {
					var ut = Q(),
						We = ut.box,
						_r = ut.content;
					qa([We, _r], 0);
				}
				(M = function () {
					var Sn;
					if (!(!w.state.isVisible || T)) {
						if (
							((T = !0),
							L.offsetHeight,
							(L.style.transition = w.props.moveTransition),
							G() && w.props.animation)
						) {
							var Ti = Q(),
								Ei = Ti.box,
								zr = Ti.content;
							qa([Ei, zr], ve), lf([Ei, zr], 'visible');
						}
						Oe(),
							O(),
							sf(Za, w),
							(Sn = w.popperInstance) == null || Sn.forceUpdate(),
							_e('onMount', [w]),
							w.props.animation &&
								G() &&
								Ve(ve, function () {
									(w.state.isShown = !0), _e('onShown', [w]);
								});
					}
				}),
					ie();
			}
		}
		function Ne() {
			fr(w.state.isDestroyed, ji('hide'));
			var j = !w.state.isVisible,
				re = w.state.isDestroyed,
				me = !w.state.isEnabled,
				ze = ja(w.props.duration, 1, rn.duration);
			if (
				!(j || re || me) &&
				(_e('onHide', [w], !1), w.props.onHide(w) !== !1)
			) {
				if (
					((w.state.isVisible = !1),
					(w.state.isShown = !1),
					(T = !1),
					(f = !1),
					G() && (L.style.visibility = 'hidden'),
					E(),
					Pe(),
					Ae(!0),
					G())
				) {
					var ve = Q(),
						ut = ve.box,
						We = ve.content;
					w.props.animation && (qa([ut, We], ze), lf([ut, We], 'hidden'));
				}
				Oe(), O(), w.props.animation ? G() && Ge(ze, w.unmount) : w.unmount();
			}
		}
		function Xe(j) {
			fr(w.state.isDestroyed, ji('hideWithInteractivity')),
				J().addEventListener('mousemove', S),
				sf(ss, S),
				S(j);
		}
		function Ee() {
			fr(w.state.isDestroyed, ji('unmount')),
				w.state.isVisible && w.hide(),
				w.state.isMounted &&
					(Ot(),
					Je().forEach(function (j) {
						j._tippy.unmount();
					}),
					L.parentNode && L.parentNode.removeChild(L),
					(Za = Za.filter(function (j) {
						return j !== w;
					})),
					(w.state.isMounted = !1),
					_e('onHidden', [w]));
		}
		function Kn() {
			fr(w.state.isDestroyed, ji('destroy')),
				!w.state.isDestroyed &&
					(w.clearDelayTimeouts(),
					w.unmount(),
					qt(),
					delete e._tippy,
					(w.state.isDestroyed = !0),
					_e('onDestroy', [w]));
		}
	}
	function Yi(e, t) {
		t === void 0 && (t = {});
		var r = rn.plugins.concat(t.plugins || []);
		(Lm(e), Tf(t, r)), Nm();
		var o = Object.assign({}, t, {
				plugins: r,
			}),
			u = Am(e);
		var c = K1(o.content),
			f = u.length > 1;
		fr(
			c && f,
			[
				'tippy() was passed an Element as the `content` prop, but more than',
				'one tippy instance was created by this invocation. This means the',
				'content element will only be appended to the last tippy instance.',
				`

`,
				'Instead, pass the .innerHTML of the element, or use a function that',
				'returns a cloned version of the element instead.',
				`

`,
				`1) content: element.innerHTML
`,
				'2) content: () => element.cloneNode(true)',
			].join(' ')
		);
		var d = u.reduce(function (g, T) {
			var A = T && Hm(T, o);
			return A && g.push(A), g;
		}, []);
		return K1(e) ? d[0] : d;
	}
	(Yi.defaultProps = rn),
		(Yi.setDefaultProps = Rm),
		(Yi.currentInput = Zn),
		Object.assign({}, Rc, {
			effect: function (t) {
				var r = t.state,
					o = {
						popper: {
							position: r.options.strategy,
							left: '0',
							top: '0',
							margin: '0',
						},
						arrow: {
							position: 'absolute',
						},
						reference: {},
					};
				Object.assign(r.elements.popper.style, o.popper),
					(r.styles = o),
					r.elements.arrow && Object.assign(r.elements.arrow.style, o.arrow);
			},
		});
	var Bm = {
		mouseover: 'mouseenter',
		focusin: 'focus',
		click: 'click',
	};
	function Um(e, t) {
		os(
			!(t && t.target),
			[
				'You must specity a `target` prop indicating a CSS selector string matching',
				'the target elements that should receive a tippy.',
			].join(' ')
		);
		var r = [],
			o = [],
			u = !1,
			c = t.target,
			f = of(t, ['target']),
			d = Object.assign({}, f, {
				trigger: 'manual',
				touch: !1,
			}),
			g = Object.assign(
				{
					touch: rn.touch,
				},
				f,
				{
					showOnCreate: !0,
				}
			),
			T = Yi(e, d),
			A = si(T);
		function C(P) {
			if (!(!P.target || u)) {
				var I = P.target.closest(c);
				if (I) {
					var z =
						I.getAttribute('data-tippy-trigger') || t.trigger || rn.trigger;
					if (
						!I._tippy &&
						!(P.type === 'touchstart' && typeof g.touch == 'boolean') &&
						!(P.type !== 'touchstart' && z.indexOf(Bm[P.type]) < 0)
					) {
						var K = Yi(I, g);
						K && (o = o.concat(K));
					}
				}
			}
		}
		function M(P, I, z, K) {
			K === void 0 && (K = !1),
				P.addEventListener(I, z, K),
				r.push({
					node: P,
					eventType: I,
					handler: z,
					options: K,
				});
		}
		function x(P) {
			var I = P.reference;
			M(I, 'touchstart', C, Mr),
				M(I, 'mouseover', C),
				M(I, 'focusin', C),
				M(I, 'click', C);
		}
		function S() {
			r.forEach(function (P) {
				var I = P.node,
					z = P.eventType,
					K = P.handler,
					w = P.options;
				I.removeEventListener(z, K, w);
			}),
				(r = []);
		}
		function D(P) {
			var I = P.destroy,
				z = P.enable,
				K = P.disable;
			(P.destroy = function (w) {
				w === void 0 && (w = !0),
					w &&
						o.forEach(function (Z) {
							Z.destroy();
						}),
					(o = []),
					S(),
					I();
			}),
				(P.enable = function () {
					z(),
						o.forEach(function (w) {
							return w.enable();
						}),
						(u = !1);
				}),
				(P.disable = function () {
					K(),
						o.forEach(function (w) {
							return w.disable();
						}),
						(u = !0);
				}),
				x(P);
		}
		return A.forEach(D), T;
	}
	Yi.setDefaultProps({
		render: yf,
	});
	function Af(e, t, r) {
		const o = e.slice();
		return (o[25] = t[r]), (o[27] = r), o;
	}
	function _f(e, t, r) {
		const o = e.slice();
		return (o[25] = t[r]), (o[27] = r), o;
	}
	function Gm(e) {
		let t,
			r = e[2].write + '',
			o,
			u,
			c = e[2].preview + '',
			f,
			d,
			g;
		return {
			c() {
				(t = Re('div')),
					(o = St(r)),
					(u = Re('div')),
					(f = St(c)),
					Ke(t, 'class', 'bytemd-toolbar-tab'),
					bt(t, 'bytemd-toolbar-tab-active', e[1] !== 'preview'),
					Ke(u, 'class', 'bytemd-toolbar-tab'),
					bt(u, 'bytemd-toolbar-tab-active', e[1] === 'preview');
			},
			m(T, A) {
				Ct(T, t, A),
					we(t, o),
					Ct(T, u, A),
					we(u, f),
					d ||
						((g = [
							vn(t, 'click', e[16]),
							vn(t, 'keydown', Ii(e[17])),
							vn(u, 'click', e[18]),
							vn(u, 'keydown', Ii(e[19])),
						]),
						(d = !0));
			},
			p(T, A) {
				A & 4 && r !== (r = T[2].write + '') && Kt(o, r),
					A & 2 && bt(t, 'bytemd-toolbar-tab-active', T[1] !== 'preview'),
					A & 4 && c !== (c = T[2].preview + '') && Kt(f, c),
					A & 2 && bt(u, 'bytemd-toolbar-tab-active', T[1] === 'preview');
			},
			d(T) {
				T && vt(t), T && vt(u), (d = !1), Qn(g);
			},
		};
	}
	function zm(e) {
		let t,
			r = e[3],
			o = [];
		for (let u = 0; u < r.length; u += 1) o[u] = Sf(_f(e, r, u));
		return {
			c() {
				for (let u = 0; u < o.length; u += 1) o[u].c();
				t = L1();
			},
			m(u, c) {
				for (let f = 0; f < o.length; f += 1) o[f] && o[f].m(u, c);
				Ct(u, t, c);
			},
			p(u, c) {
				if (c & 8) {
					r = u[3];
					let f;
					for (f = 0; f < r.length; f += 1) {
						const d = _f(u, r, f);
						o[f]
							? o[f].p(d, c)
							: ((o[f] = Sf(d)), o[f].c(), o[f].m(t.parentNode, t));
					}
					for (; f < o.length; f += 1) o[f].d(1);
					o.length = r.length;
				}
			},
			d(u) {
				w1(o, u), u && vt(t);
			},
		};
	}
	function Cf(e) {
		let t,
			r = e[25].icon + '';
		return {
			c() {
				(t = Re('div')),
					Ke(t, 'class', ['bytemd-toolbar-icon', as].join(' ')),
					Ke(t, 'bytemd-tippy-path', e[27]);
			},
			m(o, u) {
				Ct(o, t, u), (t.innerHTML = r);
			},
			p(o, u) {
				u & 8 && r !== (r = o[25].icon + '') && (t.innerHTML = r);
			},
			d(o) {
				o && vt(t);
			},
		};
	}
	function Sf(e) {
		let t,
			r = e[25].handler && Cf(e);
		return {
			c() {
				r && r.c(), (t = L1());
			},
			m(o, u) {
				r && r.m(o, u), Ct(o, t, u);
			},
			p(o, u) {
				o[25].handler
					? r
						? r.p(o, u)
						: ((r = Cf(o)), r.c(), r.m(t.parentNode, t))
					: r && (r.d(1), (r = null));
			},
			d(o) {
				r && r.d(o), o && vt(t);
			},
		};
	}
	function bf(e) {
		let t,
			r = e[25].icon + '';
		return {
			c() {
				(t = Re('div')),
					Ke(t, 'class', ['bytemd-toolbar-icon', as, ls].join(' ')),
					Ke(t, 'bytemd-tippy-path', e[27]),
					bt(t, 'bytemd-toolbar-icon-active', e[25].active);
			},
			m(o, u) {
				Ct(o, t, u), (t.innerHTML = r);
			},
			p(o, u) {
				u & 32 && r !== (r = o[25].icon + '') && (t.innerHTML = r),
					u & 32 && bt(t, 'bytemd-toolbar-icon-active', o[25].active);
			},
			d(o) {
				o && vt(t);
			},
		};
	}
	function Nf(e) {
		let t,
			r = !e[25].hidden && bf(e);
		return {
			c() {
				r && r.c(), (t = L1());
			},
			m(o, u) {
				r && r.m(o, u), Ct(o, t, u);
			},
			p(o, u) {
				o[25].hidden
					? r && (r.d(1), (r = null))
					: r
					? r.p(o, u)
					: ((r = bf(o)), r.c(), r.m(t.parentNode, t));
			},
			d(o) {
				r && r.d(o), o && vt(t);
			},
		};
	}
	function Wm(e) {
		let t, r, o, u, c;
		function f(C, M) {
			return C[0] ? zm : Gm;
		}
		let d = f(e),
			g = d(e),
			T = e[5],
			A = [];
		for (let C = 0; C < T.length; C += 1) A[C] = Nf(Af(e, T, C));
		return {
			c() {
				(t = Re('div')), (r = Re('div')), g.c(), (o = Re('div'));
				for (let C = 0; C < A.length; C += 1) A[C].c();
				Ke(r, 'class', 'bytemd-toolbar-left'),
					Ke(o, 'class', 'bytemd-toolbar-right'),
					Ke(t, 'class', 'bytemd-toolbar');
			},
			m(C, M) {
				Ct(C, t, M), we(t, r), g.m(r, null), we(t, o);
				for (let x = 0; x < A.length; x += 1) A[x] && A[x].m(o, null);
				e[20](t),
					u ||
						((c = [vn(t, 'click', e[7]), vn(t, 'keydown', Ii(e[21]))]),
						(u = !0));
			},
			p(C, [M]) {
				if (
					(d === (d = f(C)) && g
						? g.p(C, M)
						: (g.d(1), (g = d(C)), g && (g.c(), g.m(r, null))),
					M & 32)
				) {
					T = C[5];
					let x;
					for (x = 0; x < T.length; x += 1) {
						const S = Af(C, T, x);
						A[x] ? A[x].p(S, M) : ((A[x] = Nf(S)), A[x].c(), A[x].m(o, null));
					}
					for (; x < A.length; x += 1) A[x].d(1);
					A.length = T.length;
				}
			},
			i: En,
			o: En,
			d(C) {
				C && vt(t), g.d(), w1(A, C), e[20](null), (u = !1), Qn(c);
			},
		};
	}
	const as = 'bytemd-tippy',
		ls = 'bytemd-tippy-right',
		Ja = 'bytemd-tippy-path';
	function Km(e, t, r) {
		let o, u, c, f, d;
		const g = R1();
		let T,
			{ context: A } = t,
			{ split: C } = t,
			{ activeTab: M } = t,
			{ fullscreen: x } = t,
			{ sidebar: S } = t,
			{ locale: D } = t,
			{ actions: P } = t,
			{ rightAfferentActions: I } = t;
		function z(G) {
			var Q, se;
			const H =
				(se = (Q = G.getAttribute(Ja)) == null ? void 0 : Q.split('-')) == null
					? void 0
					: se.map((Ae) => parseInt(Ae, 10));
			if (!H) return;
			let J = {
				title: '',
				handler: {
					type: 'dropdown',
					actions: G.classList.contains(ls) ? d : P,
				},
			};
			return (
				H == null ||
					H.forEach((Ae) => {
						var _e;
						((_e = J.handler) == null ? void 0 : _e.type) === 'dropdown' &&
							(J = J.handler.actions[Ae]);
					}),
				{
					paths: H,
					item: J,
				}
			);
		}
		let K;
		function w() {
			K = Um(T, {
				target: `.${as}`,
				onCreate({ setProps: G, reference: H }) {
					const J = z(H);
					if (!J) return;
					const { item: Q, paths: se } = J,
						{ handler: Ae } = Q;
					if (Ae) {
						if (Ae.type === 'action')
							G({
								content: Q.title,
								onHidden(_e) {
									_e.destroy();
								},
							});
						else if (Ae.type === 'dropdown') {
							const _e = document.createElement('div');
							if ((_e.classList.add('bytemd-dropdown'), Q.title)) {
								const Oe = document.createElement('div');
								Oe.classList.add('bytemd-dropdown-title'),
									Oe.appendChild(document.createTextNode(Q.title)),
									_e.appendChild(Oe);
							}
							Ae.actions.forEach((Oe, O) => {
								var b;
								const E = document.createElement('div');
								E.classList.add('bytemd-dropdown-item'),
									E.setAttribute(Ja, [...se, O].join('-')),
									((b = Oe.handler) == null ? void 0 : b.type) === 'dropdown' &&
										E.classList.add(as),
									H.classList.contains(ls) && E.classList.add(ls),
									(E.innerHTML = `${
										Oe.icon
											? `<div class="bytemd-dropdown-item-icon">${Oe.icon}</div>`
											: ''
									}<div class="bytemd-dropdown-item-title">${Oe.title}</div>`),
									_e.appendChild(E);
							}),
								G({
									allowHTML: !0,
									showOnCreate: !0,
									theme: 'light-border',
									placement: 'bottom-start',
									interactive: !0,
									interactiveDebounce: 50,
									arrow: !1,
									offset: [0, 4],
									content: _e.outerHTML,
									onHidden(Oe) {
										Oe.destroy();
									},
									onCreate(Oe) {
										[
											...Oe.popper.querySelectorAll('.bytemd-dropdown-item'),
										].forEach((O, E) => {
											var Ce;
											const b =
												(Ce = Ae.actions[E]) == null ? void 0 : Ce.handler;
											if ((b == null ? void 0 : b.type) === 'action') {
												const { mouseenter: fe, mouseleave: Ue } = b;
												fe &&
													O.addEventListener('mouseenter', () => {
														fe(A);
													}),
													Ue &&
														O.addEventListener('mouseleave', () => {
															Ue(A);
														});
											}
										});
									},
								});
						}
					}
				},
			});
		}
		wa(() => {
			w();
		});
		function Z(G) {
			var Q, se;
			const H = G.target.closest(`[${Ja}]`);
			if (!H) return;
			const J =
				(se = (Q = z(H)) == null ? void 0 : Q.item) == null
					? void 0
					: se.handler;
			(J == null ? void 0 : J.type) === 'action' && J.click(A),
				K == null || K.destroy(),
				w();
		}
		const L = () => g('tab', 'write'),
			W = (G) => ['Enter', 'Space'].includes(G.code) && g('tab', 'write'),
			te = () => g('tab', 'preview'),
			V = (G) => ['Enter', 'Space'].includes(G.code) && g('tab', 'preview');
		function ae(G) {
			ei[G ? 'unshift' : 'push'](() => {
				(T = G), r(4, T);
			});
		}
		const X = (G) => ['Enter', 'Space'].includes(G.code) && Z(G);
		return (
			(e.$$set = (G) => {
				'context' in G && r(8, (A = G.context)),
					'split' in G && r(0, (C = G.split)),
					'activeTab' in G && r(1, (M = G.activeTab)),
					'fullscreen' in G && r(9, (x = G.fullscreen)),
					'sidebar' in G && r(10, (S = G.sidebar)),
					'locale' in G && r(2, (D = G.locale)),
					'actions' in G && r(3, (P = G.actions)),
					'rightAfferentActions' in G && r(11, (I = G.rightAfferentActions));
			}),
			(e.$$.update = () => {
				e.$$.dirty & 1024 && r(15, (o = S === 'toc')),
					e.$$.dirty & 1024 && r(14, (u = S === 'help')),
					e.$$.dirty & 2 && r(13, (c = M === 'write')),
					e.$$.dirty & 2 && r(12, (f = M === 'preview')),
					e.$$.dirty & 64005 &&
						r(
							5,
							(d = [
								{
									title: o ? D.closeToc : D.toc,
									icon: ct.AlignTextLeftOne,
									handler: {
										type: 'action',
										click() {
											g('click', 'toc');
										},
									},
									active: o,
								},
								{
									title: u ? D.closeHelp : D.help,
									icon: ct.Helpcenter,
									handler: {
										type: 'action',
										click() {
											g('click', 'help');
										},
									},
									active: u,
								},
								{
									title: c ? D.exitWriteOnly : D.writeOnly,
									icon: ct.LeftExpand,
									handler: {
										type: 'action',
										click() {
											g('tab', 'write');
										},
									},
									active: c,
									hidden: !C,
								},
								{
									title: f ? D.exitPreviewOnly : D.previewOnly,
									icon: ct.RightExpand,
									handler: {
										type: 'action',
										click() {
											g('tab', 'preview');
										},
									},
									active: f,
									hidden: !C,
								},
								{
									title: x ? D.exitFullscreen : D.fullscreen,
									icon: x ? ct.OffScreen : ct.FullScreen,
									handler: {
										type: 'action',
										click() {
											g('click', 'fullscreen');
										},
									},
								},
								{
									title: D.source,
									icon: ct.GithubOne,
									handler: {
										type: 'action',
										click() {
											window.open('https://github.com/bytedance/bytemd');
										},
									},
								},
								...I,
							])
						);
			}),
			[C, M, D, P, T, d, g, Z, A, x, S, I, f, c, u, o, L, W, te, V, ae, X]
		);
	}
	class jm extends Bi {
		constructor(t) {
			super(),
				Hi(this, t, Km, Wm, Xo, {
					context: 8,
					split: 0,
					activeTab: 1,
					fullscreen: 9,
					sidebar: 10,
					locale: 2,
					actions: 3,
					rightAfferentActions: 11,
				});
		}
	}
	const $a = {
			strip: ['script'],
			clobberPrefix: 'user-content-',
			clobber: ['name', 'id'],
			ancestors: {
				tbody: ['table'],
				tfoot: ['table'],
				thead: ['table'],
				td: ['table'],
				th: ['table'],
				tr: ['table'],
			},
			protocols: {
				href: ['http', 'https', 'mailto', 'xmpp', 'irc', 'ircs'],
				cite: ['http', 'https'],
				src: ['http', 'https'],
				longDesc: ['http', 'https'],
			},
			tagNames: [
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'br',
				'b',
				'i',
				'strong',
				'em',
				'a',
				'pre',
				'code',
				'img',
				'tt',
				'div',
				'ins',
				'del',
				'sup',
				'sub',
				'p',
				'ol',
				'ul',
				'table',
				'thead',
				'tbody',
				'tfoot',
				'blockquote',
				'dl',
				'dt',
				'dd',
				'kbd',
				'q',
				'samp',
				'var',
				'hr',
				'ruby',
				'rt',
				'rp',
				'li',
				'tr',
				'td',
				'th',
				's',
				'strike',
				'summary',
				'details',
				'caption',
				'figure',
				'figcaption',
				'abbr',
				'bdo',
				'cite',
				'dfn',
				'mark',
				'small',
				'span',
				'time',
				'wbr',
				'input',
			],
			attributes: {
				a: ['href'],
				img: ['src', 'longDesc'],
				input: [
					['type', 'checkbox'],
					['disabled', !0],
				],
				li: [['className', 'task-list-item']],
				div: ['itemScope', 'itemType'],
				blockquote: ['cite'],
				del: ['cite'],
				ins: ['cite'],
				q: ['cite'],
				'*': [
					'abbr',
					'accept',
					'acceptCharset',
					'accessKey',
					'action',
					'align',
					'alt',
					'ariaDescribedBy',
					'ariaHidden',
					'ariaLabel',
					'ariaLabelledBy',
					'axis',
					'border',
					'cellPadding',
					'cellSpacing',
					'char',
					'charOff',
					'charSet',
					'checked',
					'clear',
					'cols',
					'colSpan',
					'color',
					'compact',
					'coords',
					'dateTime',
					'dir',
					'disabled',
					'encType',
					'htmlFor',
					'frame',
					'headers',
					'height',
					'hrefLang',
					'hSpace',
					'isMap',
					'id',
					'label',
					'lang',
					'maxLength',
					'media',
					'method',
					'multiple',
					'name',
					'noHref',
					'noShade',
					'noWrap',
					'open',
					'prompt',
					'readOnly',
					'rel',
					'rev',
					'rows',
					'rowSpan',
					'rules',
					'scope',
					'selected',
					'shape',
					'size',
					'span',
					'start',
					'summary',
					'tabIndex',
					'target',
					'title',
					'type',
					'useMap',
					'vAlign',
					'value',
					'vSpace',
					'width',
					'itemProp',
				],
			},
			required: {
				input: {
					type: 'checkbox',
					disabled: !0,
				},
			},
		},
		Jn = {}.hasOwnProperty,
		el = {
			root: {
				children: kf,
			},
			doctype: qm,
			comment: Xm,
			element: {
				tagName: Of,
				properties: Qm,
				children: kf,
			},
			text: {
				value: Jm,
			},
			'*': {
				data: wf,
				position: wf,
			},
		};
	function Ym(e, t) {
		let r = {
			type: 'root',
			children: [],
		};
		if (e && typeof e == 'object' && e.type) {
			const o = xf(Object.assign({}, $a, t || {}), e, []);
			o &&
				(Array.isArray(o)
					? o.length === 1
						? (r = o[0])
						: (r.children = o)
					: (r = o));
		}
		return r;
	}
	function xf(e, t, r) {
		const o = t && t.type,
			u = {
				type: t.type,
			};
		let c;
		if (Jn.call(el, o)) {
			let f = el[o];
			if ((typeof f == 'function' && (f = f(e, t)), f)) {
				const d = Object.assign({}, f, el['*']);
				let g;
				c = !0;
				for (g in d)
					if (Jn.call(d, g)) {
						const T = d[g](e, t[g], t, r);
						T === !1 ? ((c = void 0), (u[g] = t[g])) : T != null && (u[g] = T);
					}
			}
		}
		return c
			? u
			: u.type === 'element' && e.strip && !e.strip.includes(u.tagName)
			? u.children
			: void 0;
	}
	function kf(e, t, r, o) {
		const u = [];
		if (Array.isArray(t)) {
			let c = -1;
			for (r.type === 'element' && o.push(r.tagName); ++c < t.length; ) {
				const f = xf(e, t[c], o);
				f && (Array.isArray(f) ? u.push(...f) : u.push(f));
			}
			r.type === 'element' && o.pop();
		}
		return u;
	}
	function qm(e) {
		return e.allowDoctypes
			? {
					name: Vm,
			  }
			: void 0;
	}
	function Xm(e) {
		return e.allowComments
			? {
					value: Zm,
			  }
			: void 0;
	}
	function Qm(e, t, r, o) {
		const u = Of(e, r.tagName, r, o),
			c = e.attributes || {},
			f = e.required || {},
			d = t || {},
			g = Object.assign({}, If(c['*']), If(u && Jn.call(c, u) ? c[u] : [])),
			T = {};
		let A;
		for (A in d)
			if (Jn.call(d, A)) {
				let C = d[A],
					M;
				if (Jn.call(g, A)) M = g[A];
				else if (t4(A) && Jn.call(g, 'data*')) M = g['data*'];
				else continue;
				(C = Array.isArray(C) ? $m(e, C, A, M) : Lf(e, C, A, M)),
					C != null && (T[A] = C);
			}
		if (u && Jn.call(f, u)) for (A in f[u]) Jn.call(T, A) || (T[A] = f[u][A]);
		return T;
	}
	function Vm() {
		return 'html';
	}
	function Of(e, t, r, o) {
		const u = typeof t == 'string' ? t : '';
		let c = -1;
		if (!u || u === '*' || (e.tagNames && !e.tagNames.includes(u))) return !1;
		if (e.ancestors && Jn.call(e.ancestors, u)) {
			for (; ++c < e.ancestors[u].length; )
				if (o.includes(e.ancestors[u][c])) return u;
			return !1;
		}
		return u;
	}
	function Zm(e, t) {
		const r = typeof t == 'string' ? t : '',
			o = r.indexOf('-->');
		return o < 0 ? r : r.slice(0, o);
	}
	function Jm(e, t) {
		return typeof t == 'string' ? t : '';
	}
	function wf(e, t) {
		return t;
	}
	function $m(e, t, r, o) {
		let u = -1;
		const c = [];
		for (; ++u < t.length; ) {
			const f = Lf(e, t[u], r, o);
			f != null && c.push(f);
		}
		return c;
	}
	function Lf(e, t, r, o) {
		if (
			(typeof t == 'boolean' || typeof t == 'number' || typeof t == 'string') &&
			e4(e, t, r) &&
			(o.length === 0 ||
				o.some((u) =>
					u && typeof u == 'object' && 'flags' in u
						? u.test(String(t))
						: u === t
				))
		)
			return e.clobberPrefix && e.clobber && e.clobber.includes(r)
				? e.clobberPrefix + t
				: t;
	}
	function e4(e, t, r) {
		const o = String(t),
			u = o.indexOf(':'),
			c = o.indexOf('?'),
			f = o.indexOf('#'),
			d = o.indexOf('/'),
			g = e.protocols && Jn.call(e.protocols, r) ? e.protocols[r].concat() : [];
		let T = -1;
		if (
			g.length === 0 ||
			u < 0 ||
			(d > -1 && u > d) ||
			(c > -1 && u > c) ||
			(f > -1 && u > f)
		)
			return !0;
		for (; ++T < g.length; )
			if (u === g[T].length && o.slice(0, g[T].length) === g[T]) return !0;
		return !1;
	}
	function If(e) {
		const t = {};
		let r = -1;
		for (; ++r < e.length; ) {
			const o = e[r];
			Array.isArray(o) ? (t[o[0]] = o.slice(1)) : (t[o] = []);
		}
		return t;
	}
	function t4(e) {
		return e.length > 4 && e.slice(0, 4).toLowerCase() === 'data';
	}
	var Bn = {};
	const n4 = [
		65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678,
		327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823,
		655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502,
		917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111,
	];
	(Bn.REPLACEMENT_CHARACTER = '�'),
		(Bn.CODE_POINTS = {
			EOF: -1,
			NULL: 0,
			TABULATION: 9,
			CARRIAGE_RETURN: 13,
			LINE_FEED: 10,
			FORM_FEED: 12,
			SPACE: 32,
			EXCLAMATION_MARK: 33,
			QUOTATION_MARK: 34,
			NUMBER_SIGN: 35,
			AMPERSAND: 38,
			APOSTROPHE: 39,
			HYPHEN_MINUS: 45,
			SOLIDUS: 47,
			DIGIT_0: 48,
			DIGIT_9: 57,
			SEMICOLON: 59,
			LESS_THAN_SIGN: 60,
			EQUALS_SIGN: 61,
			GREATER_THAN_SIGN: 62,
			QUESTION_MARK: 63,
			LATIN_CAPITAL_A: 65,
			LATIN_CAPITAL_F: 70,
			LATIN_CAPITAL_X: 88,
			LATIN_CAPITAL_Z: 90,
			RIGHT_SQUARE_BRACKET: 93,
			GRAVE_ACCENT: 96,
			LATIN_SMALL_A: 97,
			LATIN_SMALL_F: 102,
			LATIN_SMALL_X: 120,
			LATIN_SMALL_Z: 122,
			REPLACEMENT_CHARACTER: 65533,
		}),
		(Bn.CODE_POINT_SEQUENCES = {
			DASH_DASH_STRING: [45, 45],
			DOCTYPE_STRING: [68, 79, 67, 84, 89, 80, 69],
			CDATA_START_STRING: [91, 67, 68, 65, 84, 65, 91],
			SCRIPT_STRING: [115, 99, 114, 105, 112, 116],
			PUBLIC_STRING: [80, 85, 66, 76, 73, 67],
			SYSTEM_STRING: [83, 89, 83, 84, 69, 77],
		}),
		(Bn.isSurrogate = function (e) {
			return e >= 55296 && e <= 57343;
		}),
		(Bn.isSurrogatePair = function (e) {
			return e >= 56320 && e <= 57343;
		}),
		(Bn.getSurrogatePairCodePoint = function (e, t) {
			return (e - 55296) * 1024 + 9216 + t;
		}),
		(Bn.isControlCodePoint = function (e) {
			return (
				(e !== 32 &&
					e !== 10 &&
					e !== 13 &&
					e !== 9 &&
					e !== 12 &&
					e >= 1 &&
					e <= 31) ||
				(e >= 127 && e <= 159)
			);
		}),
		(Bn.isUndefinedCodePoint = function (e) {
			return (e >= 64976 && e <= 65007) || n4.indexOf(e) > -1;
		});
	var tl = {
		controlCharacterInInputStream: 'control-character-in-input-stream',
		noncharacterInInputStream: 'noncharacter-in-input-stream',
		surrogateInInputStream: 'surrogate-in-input-stream',
		nonVoidHtmlElementStartTagWithTrailingSolidus:
			'non-void-html-element-start-tag-with-trailing-solidus',
		endTagWithAttributes: 'end-tag-with-attributes',
		endTagWithTrailingSolidus: 'end-tag-with-trailing-solidus',
		unexpectedSolidusInTag: 'unexpected-solidus-in-tag',
		unexpectedNullCharacter: 'unexpected-null-character',
		unexpectedQuestionMarkInsteadOfTagName:
			'unexpected-question-mark-instead-of-tag-name',
		invalidFirstCharacterOfTagName: 'invalid-first-character-of-tag-name',
		unexpectedEqualsSignBeforeAttributeName:
			'unexpected-equals-sign-before-attribute-name',
		missingEndTagName: 'missing-end-tag-name',
		unexpectedCharacterInAttributeName:
			'unexpected-character-in-attribute-name',
		unknownNamedCharacterReference: 'unknown-named-character-reference',
		missingSemicolonAfterCharacterReference:
			'missing-semicolon-after-character-reference',
		unexpectedCharacterAfterDoctypeSystemIdentifier:
			'unexpected-character-after-doctype-system-identifier',
		unexpectedCharacterInUnquotedAttributeValue:
			'unexpected-character-in-unquoted-attribute-value',
		eofBeforeTagName: 'eof-before-tag-name',
		eofInTag: 'eof-in-tag',
		missingAttributeValue: 'missing-attribute-value',
		missingWhitespaceBetweenAttributes: 'missing-whitespace-between-attributes',
		missingWhitespaceAfterDoctypePublicKeyword:
			'missing-whitespace-after-doctype-public-keyword',
		missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers:
			'missing-whitespace-between-doctype-public-and-system-identifiers',
		missingWhitespaceAfterDoctypeSystemKeyword:
			'missing-whitespace-after-doctype-system-keyword',
		missingQuoteBeforeDoctypePublicIdentifier:
			'missing-quote-before-doctype-public-identifier',
		missingQuoteBeforeDoctypeSystemIdentifier:
			'missing-quote-before-doctype-system-identifier',
		missingDoctypePublicIdentifier: 'missing-doctype-public-identifier',
		missingDoctypeSystemIdentifier: 'missing-doctype-system-identifier',
		abruptDoctypePublicIdentifier: 'abrupt-doctype-public-identifier',
		abruptDoctypeSystemIdentifier: 'abrupt-doctype-system-identifier',
		cdataInHtmlContent: 'cdata-in-html-content',
		incorrectlyOpenedComment: 'incorrectly-opened-comment',
		eofInScriptHtmlCommentLikeText: 'eof-in-script-html-comment-like-text',
		eofInDoctype: 'eof-in-doctype',
		nestedComment: 'nested-comment',
		abruptClosingOfEmptyComment: 'abrupt-closing-of-empty-comment',
		eofInComment: 'eof-in-comment',
		incorrectlyClosedComment: 'incorrectly-closed-comment',
		eofInCdata: 'eof-in-cdata',
		absenceOfDigitsInNumericCharacterReference:
			'absence-of-digits-in-numeric-character-reference',
		nullCharacterReference: 'null-character-reference',
		surrogateCharacterReference: 'surrogate-character-reference',
		characterReferenceOutsideUnicodeRange:
			'character-reference-outside-unicode-range',
		controlCharacterReference: 'control-character-reference',
		noncharacterCharacterReference: 'noncharacter-character-reference',
		missingWhitespaceBeforeDoctypeName:
			'missing-whitespace-before-doctype-name',
		missingDoctypeName: 'missing-doctype-name',
		invalidCharacterSequenceAfterDoctypeName:
			'invalid-character-sequence-after-doctype-name',
		duplicateAttribute: 'duplicate-attribute',
		nonConformingDoctype: 'non-conforming-doctype',
		missingDoctype: 'missing-doctype',
		misplacedDoctype: 'misplaced-doctype',
		endTagWithoutMatchingOpenElement: 'end-tag-without-matching-open-element',
		closingOfElementWithOpenChildElements:
			'closing-of-element-with-open-child-elements',
		disallowedContentInNoscriptInHead: 'disallowed-content-in-noscript-in-head',
		openElementsLeftAfterEof: 'open-elements-left-after-eof',
		abandonedHeadElementChild: 'abandoned-head-element-child',
		misplacedStartTagForHeadElement: 'misplaced-start-tag-for-head-element',
		nestedNoscriptInHead: 'nested-noscript-in-head',
		eofInElementThatCanContainOnlyText:
			'eof-in-element-that-can-contain-only-text',
	};
	const qi = Bn,
		nl = tl,
		ai = qi.CODE_POINTS,
		r4 = 1 << 16;
	var i4 = class {
			constructor() {
				(this.html = null),
					(this.pos = -1),
					(this.lastGapPos = -1),
					(this.lastCharPos = -1),
					(this.gapStack = []),
					(this.skipNextNewLine = !1),
					(this.lastChunkWritten = !1),
					(this.endOfChunkHit = !1),
					(this.bufferWaterline = r4);
			}
			_err() {}
			_addGap() {
				this.gapStack.push(this.lastGapPos), (this.lastGapPos = this.pos);
			}
			_processSurrogate(t) {
				if (this.pos !== this.lastCharPos) {
					const r = this.html.charCodeAt(this.pos + 1);
					if (qi.isSurrogatePair(r))
						return (
							this.pos++, this._addGap(), qi.getSurrogatePairCodePoint(t, r)
						);
				} else if (!this.lastChunkWritten)
					return (this.endOfChunkHit = !0), ai.EOF;
				return this._err(nl.surrogateInInputStream), t;
			}
			dropParsedChunk() {
				this.pos > this.bufferWaterline &&
					((this.lastCharPos -= this.pos),
					(this.html = this.html.substring(this.pos)),
					(this.pos = 0),
					(this.lastGapPos = -1),
					(this.gapStack = []));
			}
			write(t, r) {
				this.html ? (this.html += t) : (this.html = t),
					(this.lastCharPos = this.html.length - 1),
					(this.endOfChunkHit = !1),
					(this.lastChunkWritten = r);
			}
			insertHtmlAtCurrentPos(t) {
				(this.html =
					this.html.substring(0, this.pos + 1) +
					t +
					this.html.substring(this.pos + 1, this.html.length)),
					(this.lastCharPos = this.html.length - 1),
					(this.endOfChunkHit = !1);
			}
			advance() {
				if ((this.pos++, this.pos > this.lastCharPos))
					return (this.endOfChunkHit = !this.lastChunkWritten), ai.EOF;
				let t = this.html.charCodeAt(this.pos);
				return this.skipNextNewLine && t === ai.LINE_FEED
					? ((this.skipNextNewLine = !1), this._addGap(), this.advance())
					: t === ai.CARRIAGE_RETURN
					? ((this.skipNextNewLine = !0), ai.LINE_FEED)
					: ((this.skipNextNewLine = !1),
					  qi.isSurrogate(t) && (t = this._processSurrogate(t)),
					  (t > 31 && t < 127) ||
							t === ai.LINE_FEED ||
							t === ai.CARRIAGE_RETURN ||
							(t > 159 && t < 64976) ||
							this._checkForProblematicCharacters(t),
					  t);
			}
			_checkForProblematicCharacters(t) {
				qi.isControlCodePoint(t)
					? this._err(nl.controlCharacterInInputStream)
					: qi.isUndefinedCodePoint(t) &&
					  this._err(nl.noncharacterInInputStream);
			}
			retreat() {
				this.pos === this.lastGapPos &&
					((this.lastGapPos = this.gapStack.pop()), this.pos--),
					this.pos--;
			}
		},
		o4 = new Uint16Array([
			4, 52, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
			82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104,
			105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
			120, 121, 122, 106, 303, 412, 810, 1432, 1701, 1796, 1987, 2114, 2360,
			2420, 2484, 3170, 3251, 4140, 4393, 4575, 4610, 5106, 5512, 5728, 6117,
			6274, 6315, 6345, 6427, 6516, 7002, 7910, 8733, 9323, 9870, 10170, 10631,
			10893, 11318, 11386, 11467, 12773, 13092, 14474, 14922, 15448, 15542,
			16419, 17666, 18166, 18611, 19004, 19095, 19298, 19397, 4, 16, 69, 77, 97,
			98, 99, 102, 103, 108, 109, 110, 111, 112, 114, 115, 116, 117, 140, 150,
			158, 169, 176, 194, 199, 210, 216, 222, 226, 242, 256, 266, 283, 294, 108,
			105, 103, 5, 198, 1, 59, 148, 1, 198, 80, 5, 38, 1, 59, 156, 1, 38, 99,
			117, 116, 101, 5, 193, 1, 59, 167, 1, 193, 114, 101, 118, 101, 59, 1, 258,
			4, 2, 105, 121, 182, 191, 114, 99, 5, 194, 1, 59, 189, 1, 194, 59, 1,
			1040, 114, 59, 3, 55349, 56580, 114, 97, 118, 101, 5, 192, 1, 59, 208, 1,
			192, 112, 104, 97, 59, 1, 913, 97, 99, 114, 59, 1, 256, 100, 59, 1, 10835,
			4, 2, 103, 112, 232, 237, 111, 110, 59, 1, 260, 102, 59, 3, 55349, 56632,
			112, 108, 121, 70, 117, 110, 99, 116, 105, 111, 110, 59, 1, 8289, 105,
			110, 103, 5, 197, 1, 59, 264, 1, 197, 4, 2, 99, 115, 272, 277, 114, 59, 3,
			55349, 56476, 105, 103, 110, 59, 1, 8788, 105, 108, 100, 101, 5, 195, 1,
			59, 292, 1, 195, 109, 108, 5, 196, 1, 59, 301, 1, 196, 4, 8, 97, 99, 101,
			102, 111, 114, 115, 117, 321, 350, 354, 383, 388, 394, 400, 405, 4, 2, 99,
			114, 327, 336, 107, 115, 108, 97, 115, 104, 59, 1, 8726, 4, 2, 118, 119,
			342, 345, 59, 1, 10983, 101, 100, 59, 1, 8966, 121, 59, 1, 1041, 4, 3, 99,
			114, 116, 362, 369, 379, 97, 117, 115, 101, 59, 1, 8757, 110, 111, 117,
			108, 108, 105, 115, 59, 1, 8492, 97, 59, 1, 914, 114, 59, 3, 55349, 56581,
			112, 102, 59, 3, 55349, 56633, 101, 118, 101, 59, 1, 728, 99, 114, 59, 1,
			8492, 109, 112, 101, 113, 59, 1, 8782, 4, 14, 72, 79, 97, 99, 100, 101,
			102, 104, 105, 108, 111, 114, 115, 117, 442, 447, 456, 504, 542, 547, 569,
			573, 577, 616, 678, 784, 790, 796, 99, 121, 59, 1, 1063, 80, 89, 5, 169,
			1, 59, 454, 1, 169, 4, 3, 99, 112, 121, 464, 470, 497, 117, 116, 101, 59,
			1, 262, 4, 2, 59, 105, 476, 478, 1, 8914, 116, 97, 108, 68, 105, 102, 102,
			101, 114, 101, 110, 116, 105, 97, 108, 68, 59, 1, 8517, 108, 101, 121,
			115, 59, 1, 8493, 4, 4, 97, 101, 105, 111, 514, 520, 530, 535, 114, 111,
			110, 59, 1, 268, 100, 105, 108, 5, 199, 1, 59, 528, 1, 199, 114, 99, 59,
			1, 264, 110, 105, 110, 116, 59, 1, 8752, 111, 116, 59, 1, 266, 4, 2, 100,
			110, 553, 560, 105, 108, 108, 97, 59, 1, 184, 116, 101, 114, 68, 111, 116,
			59, 1, 183, 114, 59, 1, 8493, 105, 59, 1, 935, 114, 99, 108, 101, 4, 4,
			68, 77, 80, 84, 591, 596, 603, 609, 111, 116, 59, 1, 8857, 105, 110, 117,
			115, 59, 1, 8854, 108, 117, 115, 59, 1, 8853, 105, 109, 101, 115, 59, 1,
			8855, 111, 4, 2, 99, 115, 623, 646, 107, 119, 105, 115, 101, 67, 111, 110,
			116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8754,
			101, 67, 117, 114, 108, 121, 4, 2, 68, 81, 658, 671, 111, 117, 98, 108,
			101, 81, 117, 111, 116, 101, 59, 1, 8221, 117, 111, 116, 101, 59, 1, 8217,
			4, 4, 108, 110, 112, 117, 688, 701, 736, 753, 111, 110, 4, 2, 59, 101,
			696, 698, 1, 8759, 59, 1, 10868, 4, 3, 103, 105, 116, 709, 717, 722, 114,
			117, 101, 110, 116, 59, 1, 8801, 110, 116, 59, 1, 8751, 111, 117, 114, 73,
			110, 116, 101, 103, 114, 97, 108, 59, 1, 8750, 4, 2, 102, 114, 742, 745,
			59, 1, 8450, 111, 100, 117, 99, 116, 59, 1, 8720, 110, 116, 101, 114, 67,
			108, 111, 99, 107, 119, 105, 115, 101, 67, 111, 110, 116, 111, 117, 114,
			73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8755, 111, 115, 115, 59, 1,
			10799, 99, 114, 59, 3, 55349, 56478, 112, 4, 2, 59, 67, 803, 805, 1, 8915,
			97, 112, 59, 1, 8781, 4, 11, 68, 74, 83, 90, 97, 99, 101, 102, 105, 111,
			115, 834, 850, 855, 860, 865, 888, 903, 916, 921, 1011, 1415, 4, 2, 59,
			111, 840, 842, 1, 8517, 116, 114, 97, 104, 100, 59, 1, 10513, 99, 121, 59,
			1, 1026, 99, 121, 59, 1, 1029, 99, 121, 59, 1, 1039, 4, 3, 103, 114, 115,
			873, 879, 883, 103, 101, 114, 59, 1, 8225, 114, 59, 1, 8609, 104, 118, 59,
			1, 10980, 4, 2, 97, 121, 894, 900, 114, 111, 110, 59, 1, 270, 59, 1, 1044,
			108, 4, 2, 59, 116, 910, 912, 1, 8711, 97, 59, 1, 916, 114, 59, 3, 55349,
			56583, 4, 2, 97, 102, 927, 998, 4, 2, 99, 109, 933, 992, 114, 105, 116,
			105, 99, 97, 108, 4, 4, 65, 68, 71, 84, 950, 957, 978, 985, 99, 117, 116,
			101, 59, 1, 180, 111, 4, 2, 116, 117, 964, 967, 59, 1, 729, 98, 108, 101,
			65, 99, 117, 116, 101, 59, 1, 733, 114, 97, 118, 101, 59, 1, 96, 105, 108,
			100, 101, 59, 1, 732, 111, 110, 100, 59, 1, 8900, 102, 101, 114, 101, 110,
			116, 105, 97, 108, 68, 59, 1, 8518, 4, 4, 112, 116, 117, 119, 1021, 1026,
			1048, 1249, 102, 59, 3, 55349, 56635, 4, 3, 59, 68, 69, 1034, 1036, 1041,
			1, 168, 111, 116, 59, 1, 8412, 113, 117, 97, 108, 59, 1, 8784, 98, 108,
			101, 4, 6, 67, 68, 76, 82, 85, 86, 1065, 1082, 1101, 1189, 1211, 1236,
			111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1,
			8751, 111, 4, 2, 116, 119, 1089, 1092, 59, 1, 168, 110, 65, 114, 114, 111,
			119, 59, 1, 8659, 4, 2, 101, 111, 1107, 1141, 102, 116, 4, 3, 65, 82, 84,
			1117, 1124, 1136, 114, 114, 111, 119, 59, 1, 8656, 105, 103, 104, 116, 65,
			114, 114, 111, 119, 59, 1, 8660, 101, 101, 59, 1, 10980, 110, 103, 4, 2,
			76, 82, 1149, 1177, 101, 102, 116, 4, 2, 65, 82, 1158, 1165, 114, 114,
			111, 119, 59, 1, 10232, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1,
			10234, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10233, 105, 103,
			104, 116, 4, 2, 65, 84, 1199, 1206, 114, 114, 111, 119, 59, 1, 8658, 101,
			101, 59, 1, 8872, 112, 4, 2, 65, 68, 1218, 1225, 114, 114, 111, 119, 59,
			1, 8657, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8661, 101, 114,
			116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8741, 110, 4, 6, 65, 66, 76,
			82, 84, 97, 1264, 1292, 1299, 1352, 1391, 1408, 114, 114, 111, 119, 4, 3,
			59, 66, 85, 1276, 1278, 1283, 1, 8595, 97, 114, 59, 1, 10515, 112, 65,
			114, 114, 111, 119, 59, 1, 8693, 114, 101, 118, 101, 59, 1, 785, 101, 102,
			116, 4, 3, 82, 84, 86, 1310, 1323, 1334, 105, 103, 104, 116, 86, 101, 99,
			116, 111, 114, 59, 1, 10576, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1,
			10590, 101, 99, 116, 111, 114, 4, 2, 59, 66, 1345, 1347, 1, 8637, 97, 114,
			59, 1, 10582, 105, 103, 104, 116, 4, 2, 84, 86, 1362, 1373, 101, 101, 86,
			101, 99, 116, 111, 114, 59, 1, 10591, 101, 99, 116, 111, 114, 4, 2, 59,
			66, 1384, 1386, 1, 8641, 97, 114, 59, 1, 10583, 101, 101, 4, 2, 59, 65,
			1399, 1401, 1, 8868, 114, 114, 111, 119, 59, 1, 8615, 114, 114, 111, 119,
			59, 1, 8659, 4, 2, 99, 116, 1421, 1426, 114, 59, 3, 55349, 56479, 114,
			111, 107, 59, 1, 272, 4, 16, 78, 84, 97, 99, 100, 102, 103, 108, 109, 111,
			112, 113, 115, 116, 117, 120, 1466, 1470, 1478, 1489, 1515, 1520, 1525,
			1536, 1544, 1593, 1609, 1617, 1650, 1664, 1668, 1677, 71, 59, 1, 330, 72,
			5, 208, 1, 59, 1476, 1, 208, 99, 117, 116, 101, 5, 201, 1, 59, 1487, 1,
			201, 4, 3, 97, 105, 121, 1497, 1503, 1512, 114, 111, 110, 59, 1, 282, 114,
			99, 5, 202, 1, 59, 1510, 1, 202, 59, 1, 1069, 111, 116, 59, 1, 278, 114,
			59, 3, 55349, 56584, 114, 97, 118, 101, 5, 200, 1, 59, 1534, 1, 200, 101,
			109, 101, 110, 116, 59, 1, 8712, 4, 2, 97, 112, 1550, 1555, 99, 114, 59,
			1, 274, 116, 121, 4, 2, 83, 86, 1563, 1576, 109, 97, 108, 108, 83, 113,
			117, 97, 114, 101, 59, 1, 9723, 101, 114, 121, 83, 109, 97, 108, 108, 83,
			113, 117, 97, 114, 101, 59, 1, 9643, 4, 2, 103, 112, 1599, 1604, 111, 110,
			59, 1, 280, 102, 59, 3, 55349, 56636, 115, 105, 108, 111, 110, 59, 1, 917,
			117, 4, 2, 97, 105, 1624, 1640, 108, 4, 2, 59, 84, 1631, 1633, 1, 10869,
			105, 108, 100, 101, 59, 1, 8770, 108, 105, 98, 114, 105, 117, 109, 59, 1,
			8652, 4, 2, 99, 105, 1656, 1660, 114, 59, 1, 8496, 109, 59, 1, 10867, 97,
			59, 1, 919, 109, 108, 5, 203, 1, 59, 1675, 1, 203, 4, 2, 105, 112, 1683,
			1689, 115, 116, 115, 59, 1, 8707, 111, 110, 101, 110, 116, 105, 97, 108,
			69, 59, 1, 8519, 4, 5, 99, 102, 105, 111, 115, 1713, 1717, 1722, 1762,
			1791, 121, 59, 1, 1060, 114, 59, 3, 55349, 56585, 108, 108, 101, 100, 4,
			2, 83, 86, 1732, 1745, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59,
			1, 9724, 101, 114, 121, 83, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101,
			59, 1, 9642, 4, 3, 112, 114, 117, 1770, 1775, 1781, 102, 59, 3, 55349,
			56637, 65, 108, 108, 59, 1, 8704, 114, 105, 101, 114, 116, 114, 102, 59,
			1, 8497, 99, 114, 59, 1, 8497, 4, 12, 74, 84, 97, 98, 99, 100, 102, 103,
			111, 114, 115, 116, 1822, 1827, 1834, 1848, 1855, 1877, 1882, 1887, 1890,
			1896, 1978, 1984, 99, 121, 59, 1, 1027, 5, 62, 1, 59, 1832, 1, 62, 109,
			109, 97, 4, 2, 59, 100, 1843, 1845, 1, 915, 59, 1, 988, 114, 101, 118,
			101, 59, 1, 286, 4, 3, 101, 105, 121, 1863, 1869, 1874, 100, 105, 108, 59,
			1, 290, 114, 99, 59, 1, 284, 59, 1, 1043, 111, 116, 59, 1, 288, 114, 59,
			3, 55349, 56586, 59, 1, 8921, 112, 102, 59, 3, 55349, 56638, 101, 97, 116,
			101, 114, 4, 6, 69, 70, 71, 76, 83, 84, 1915, 1933, 1944, 1953, 1959,
			1971, 113, 117, 97, 108, 4, 2, 59, 76, 1925, 1927, 1, 8805, 101, 115, 115,
			59, 1, 8923, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8807, 114, 101,
			97, 116, 101, 114, 59, 1, 10914, 101, 115, 115, 59, 1, 8823, 108, 97, 110,
			116, 69, 113, 117, 97, 108, 59, 1, 10878, 105, 108, 100, 101, 59, 1, 8819,
			99, 114, 59, 3, 55349, 56482, 59, 1, 8811, 4, 8, 65, 97, 99, 102, 105,
			111, 115, 117, 2005, 2012, 2026, 2032, 2036, 2049, 2073, 2089, 82, 68, 99,
			121, 59, 1, 1066, 4, 2, 99, 116, 2018, 2023, 101, 107, 59, 1, 711, 59, 1,
			94, 105, 114, 99, 59, 1, 292, 114, 59, 1, 8460, 108, 98, 101, 114, 116,
			83, 112, 97, 99, 101, 59, 1, 8459, 4, 2, 112, 114, 2055, 2059, 102, 59, 1,
			8461, 105, 122, 111, 110, 116, 97, 108, 76, 105, 110, 101, 59, 1, 9472, 4,
			2, 99, 116, 2079, 2083, 114, 59, 1, 8459, 114, 111, 107, 59, 1, 294, 109,
			112, 4, 2, 68, 69, 2097, 2107, 111, 119, 110, 72, 117, 109, 112, 59, 1,
			8782, 113, 117, 97, 108, 59, 1, 8783, 4, 14, 69, 74, 79, 97, 99, 100, 102,
			103, 109, 110, 111, 115, 116, 117, 2144, 2149, 2155, 2160, 2171, 2189,
			2194, 2198, 2209, 2245, 2307, 2329, 2334, 2341, 99, 121, 59, 1, 1045, 108,
			105, 103, 59, 1, 306, 99, 121, 59, 1, 1025, 99, 117, 116, 101, 5, 205, 1,
			59, 2169, 1, 205, 4, 2, 105, 121, 2177, 2186, 114, 99, 5, 206, 1, 59,
			2184, 1, 206, 59, 1, 1048, 111, 116, 59, 1, 304, 114, 59, 1, 8465, 114,
			97, 118, 101, 5, 204, 1, 59, 2207, 1, 204, 4, 3, 59, 97, 112, 2217, 2219,
			2238, 1, 8465, 4, 2, 99, 103, 2225, 2229, 114, 59, 1, 298, 105, 110, 97,
			114, 121, 73, 59, 1, 8520, 108, 105, 101, 115, 59, 1, 8658, 4, 2, 116,
			118, 2251, 2281, 4, 2, 59, 101, 2257, 2259, 1, 8748, 4, 2, 103, 114, 2265,
			2271, 114, 97, 108, 59, 1, 8747, 115, 101, 99, 116, 105, 111, 110, 59, 1,
			8898, 105, 115, 105, 98, 108, 101, 4, 2, 67, 84, 2293, 2300, 111, 109,
			109, 97, 59, 1, 8291, 105, 109, 101, 115, 59, 1, 8290, 4, 3, 103, 112,
			116, 2315, 2320, 2325, 111, 110, 59, 1, 302, 102, 59, 3, 55349, 56640, 97,
			59, 1, 921, 99, 114, 59, 1, 8464, 105, 108, 100, 101, 59, 1, 296, 4, 2,
			107, 109, 2347, 2352, 99, 121, 59, 1, 1030, 108, 5, 207, 1, 59, 2358, 1,
			207, 4, 5, 99, 102, 111, 115, 117, 2372, 2386, 2391, 2397, 2414, 4, 2,
			105, 121, 2378, 2383, 114, 99, 59, 1, 308, 59, 1, 1049, 114, 59, 3, 55349,
			56589, 112, 102, 59, 3, 55349, 56641, 4, 2, 99, 101, 2403, 2408, 114, 59,
			3, 55349, 56485, 114, 99, 121, 59, 1, 1032, 107, 99, 121, 59, 1, 1028, 4,
			7, 72, 74, 97, 99, 102, 111, 115, 2436, 2441, 2446, 2452, 2467, 2472,
			2478, 99, 121, 59, 1, 1061, 99, 121, 59, 1, 1036, 112, 112, 97, 59, 1,
			922, 4, 2, 101, 121, 2458, 2464, 100, 105, 108, 59, 1, 310, 59, 1, 1050,
			114, 59, 3, 55349, 56590, 112, 102, 59, 3, 55349, 56642, 99, 114, 59, 3,
			55349, 56486, 4, 11, 74, 84, 97, 99, 101, 102, 108, 109, 111, 115, 116,
			2508, 2513, 2520, 2562, 2585, 2981, 2986, 3004, 3011, 3146, 3167, 99, 121,
			59, 1, 1033, 5, 60, 1, 59, 2518, 1, 60, 4, 5, 99, 109, 110, 112, 114,
			2532, 2538, 2544, 2548, 2558, 117, 116, 101, 59, 1, 313, 98, 100, 97, 59,
			1, 923, 103, 59, 1, 10218, 108, 97, 99, 101, 116, 114, 102, 59, 1, 8466,
			114, 59, 1, 8606, 4, 3, 97, 101, 121, 2570, 2576, 2582, 114, 111, 110, 59,
			1, 317, 100, 105, 108, 59, 1, 315, 59, 1, 1051, 4, 2, 102, 115, 2591,
			2907, 116, 4, 10, 65, 67, 68, 70, 82, 84, 85, 86, 97, 114, 2614, 2663,
			2672, 2728, 2735, 2760, 2820, 2870, 2888, 2895, 4, 2, 110, 114, 2620,
			2633, 103, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10216, 114,
			111, 119, 4, 3, 59, 66, 82, 2644, 2646, 2651, 1, 8592, 97, 114, 59, 1,
			8676, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8646, 101, 105,
			108, 105, 110, 103, 59, 1, 8968, 111, 4, 2, 117, 119, 2679, 2692, 98, 108,
			101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10214, 110, 4, 2, 84, 86,
			2699, 2710, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10593, 101, 99,
			116, 111, 114, 4, 2, 59, 66, 2721, 2723, 1, 8643, 97, 114, 59, 1, 10585,
			108, 111, 111, 114, 59, 1, 8970, 105, 103, 104, 116, 4, 2, 65, 86, 2745,
			2752, 114, 114, 111, 119, 59, 1, 8596, 101, 99, 116, 111, 114, 59, 1,
			10574, 4, 2, 101, 114, 2766, 2792, 101, 4, 3, 59, 65, 86, 2775, 2777,
			2784, 1, 8867, 114, 114, 111, 119, 59, 1, 8612, 101, 99, 116, 111, 114,
			59, 1, 10586, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 2806, 2808,
			2813, 1, 8882, 97, 114, 59, 1, 10703, 113, 117, 97, 108, 59, 1, 8884, 112,
			4, 3, 68, 84, 86, 2829, 2841, 2852, 111, 119, 110, 86, 101, 99, 116, 111,
			114, 59, 1, 10577, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10592,
			101, 99, 116, 111, 114, 4, 2, 59, 66, 2863, 2865, 1, 8639, 97, 114, 59, 1,
			10584, 101, 99, 116, 111, 114, 4, 2, 59, 66, 2881, 2883, 1, 8636, 97, 114,
			59, 1, 10578, 114, 114, 111, 119, 59, 1, 8656, 105, 103, 104, 116, 97,
			114, 114, 111, 119, 59, 1, 8660, 115, 4, 6, 69, 70, 71, 76, 83, 84, 2922,
			2936, 2947, 2956, 2962, 2974, 113, 117, 97, 108, 71, 114, 101, 97, 116,
			101, 114, 59, 1, 8922, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8806,
			114, 101, 97, 116, 101, 114, 59, 1, 8822, 101, 115, 115, 59, 1, 10913,
			108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 10877, 105, 108, 100,
			101, 59, 1, 8818, 114, 59, 3, 55349, 56591, 4, 2, 59, 101, 2992, 2994, 1,
			8920, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8666, 105, 100, 111, 116,
			59, 1, 319, 4, 3, 110, 112, 119, 3019, 3110, 3115, 103, 4, 4, 76, 82, 108,
			114, 3030, 3058, 3070, 3098, 101, 102, 116, 4, 2, 65, 82, 3039, 3046, 114,
			114, 111, 119, 59, 1, 10229, 105, 103, 104, 116, 65, 114, 114, 111, 119,
			59, 1, 10231, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10230,
			101, 102, 116, 4, 2, 97, 114, 3079, 3086, 114, 114, 111, 119, 59, 1,
			10232, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10234, 105, 103,
			104, 116, 97, 114, 114, 111, 119, 59, 1, 10233, 102, 59, 3, 55349, 56643,
			101, 114, 4, 2, 76, 82, 3123, 3134, 101, 102, 116, 65, 114, 114, 111, 119,
			59, 1, 8601, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8600, 4,
			3, 99, 104, 116, 3154, 3158, 3161, 114, 59, 1, 8466, 59, 1, 8624, 114,
			111, 107, 59, 1, 321, 59, 1, 8810, 4, 8, 97, 99, 101, 102, 105, 111, 115,
			117, 3188, 3192, 3196, 3222, 3227, 3237, 3243, 3248, 112, 59, 1, 10501,
			121, 59, 1, 1052, 4, 2, 100, 108, 3202, 3213, 105, 117, 109, 83, 112, 97,
			99, 101, 59, 1, 8287, 108, 105, 110, 116, 114, 102, 59, 1, 8499, 114, 59,
			3, 55349, 56592, 110, 117, 115, 80, 108, 117, 115, 59, 1, 8723, 112, 102,
			59, 3, 55349, 56644, 99, 114, 59, 1, 8499, 59, 1, 924, 4, 9, 74, 97, 99,
			101, 102, 111, 115, 116, 117, 3271, 3276, 3283, 3306, 3422, 3427, 4120,
			4126, 4137, 99, 121, 59, 1, 1034, 99, 117, 116, 101, 59, 1, 323, 4, 3, 97,
			101, 121, 3291, 3297, 3303, 114, 111, 110, 59, 1, 327, 100, 105, 108, 59,
			1, 325, 59, 1, 1053, 4, 3, 103, 115, 119, 3314, 3380, 3415, 97, 116, 105,
			118, 101, 4, 3, 77, 84, 86, 3327, 3340, 3365, 101, 100, 105, 117, 109, 83,
			112, 97, 99, 101, 59, 1, 8203, 104, 105, 4, 2, 99, 110, 3348, 3357, 107,
			83, 112, 97, 99, 101, 59, 1, 8203, 83, 112, 97, 99, 101, 59, 1, 8203, 101,
			114, 121, 84, 104, 105, 110, 83, 112, 97, 99, 101, 59, 1, 8203, 116, 101,
			100, 4, 2, 71, 76, 3389, 3405, 114, 101, 97, 116, 101, 114, 71, 114, 101,
			97, 116, 101, 114, 59, 1, 8811, 101, 115, 115, 76, 101, 115, 115, 59, 1,
			8810, 76, 105, 110, 101, 59, 1, 10, 114, 59, 3, 55349, 56593, 4, 4, 66,
			110, 112, 116, 3437, 3444, 3460, 3464, 114, 101, 97, 107, 59, 1, 8288, 66,
			114, 101, 97, 107, 105, 110, 103, 83, 112, 97, 99, 101, 59, 1, 160, 102,
			59, 1, 8469, 4, 13, 59, 67, 68, 69, 71, 72, 76, 78, 80, 82, 83, 84, 86,
			3492, 3494, 3517, 3536, 3578, 3657, 3685, 3784, 3823, 3860, 3915, 4066,
			4107, 1, 10988, 4, 2, 111, 117, 3500, 3510, 110, 103, 114, 117, 101, 110,
			116, 59, 1, 8802, 112, 67, 97, 112, 59, 1, 8813, 111, 117, 98, 108, 101,
			86, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8742, 4, 3, 108,
			113, 120, 3544, 3552, 3571, 101, 109, 101, 110, 116, 59, 1, 8713, 117, 97,
			108, 4, 2, 59, 84, 3561, 3563, 1, 8800, 105, 108, 100, 101, 59, 3, 8770,
			824, 105, 115, 116, 115, 59, 1, 8708, 114, 101, 97, 116, 101, 114, 4, 7,
			59, 69, 70, 71, 76, 83, 84, 3600, 3602, 3609, 3621, 3631, 3637, 3650, 1,
			8815, 113, 117, 97, 108, 59, 1, 8817, 117, 108, 108, 69, 113, 117, 97,
			108, 59, 3, 8807, 824, 114, 101, 97, 116, 101, 114, 59, 3, 8811, 824, 101,
			115, 115, 59, 1, 8825, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 3,
			10878, 824, 105, 108, 100, 101, 59, 1, 8821, 117, 109, 112, 4, 2, 68, 69,
			3666, 3677, 111, 119, 110, 72, 117, 109, 112, 59, 3, 8782, 824, 113, 117,
			97, 108, 59, 3, 8783, 824, 101, 4, 2, 102, 115, 3692, 3724, 116, 84, 114,
			105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 3709, 3711, 3717, 1, 8938,
			97, 114, 59, 3, 10703, 824, 113, 117, 97, 108, 59, 1, 8940, 115, 4, 6, 59,
			69, 71, 76, 83, 84, 3739, 3741, 3748, 3757, 3764, 3777, 1, 8814, 113, 117,
			97, 108, 59, 1, 8816, 114, 101, 97, 116, 101, 114, 59, 1, 8824, 101, 115,
			115, 59, 3, 8810, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 3,
			10877, 824, 105, 108, 100, 101, 59, 1, 8820, 101, 115, 116, 101, 100, 4,
			2, 71, 76, 3795, 3812, 114, 101, 97, 116, 101, 114, 71, 114, 101, 97, 116,
			101, 114, 59, 3, 10914, 824, 101, 115, 115, 76, 101, 115, 115, 59, 3,
			10913, 824, 114, 101, 99, 101, 100, 101, 115, 4, 3, 59, 69, 83, 3838,
			3840, 3848, 1, 8832, 113, 117, 97, 108, 59, 3, 10927, 824, 108, 97, 110,
			116, 69, 113, 117, 97, 108, 59, 1, 8928, 4, 2, 101, 105, 3866, 3881, 118,
			101, 114, 115, 101, 69, 108, 101, 109, 101, 110, 116, 59, 1, 8716, 103,
			104, 116, 84, 114, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 3900,
			3902, 3908, 1, 8939, 97, 114, 59, 3, 10704, 824, 113, 117, 97, 108, 59, 1,
			8941, 4, 2, 113, 117, 3921, 3973, 117, 97, 114, 101, 83, 117, 4, 2, 98,
			112, 3933, 3952, 115, 101, 116, 4, 2, 59, 69, 3942, 3945, 3, 8847, 824,
			113, 117, 97, 108, 59, 1, 8930, 101, 114, 115, 101, 116, 4, 2, 59, 69,
			3963, 3966, 3, 8848, 824, 113, 117, 97, 108, 59, 1, 8931, 4, 3, 98, 99,
			112, 3981, 4e3, 4045, 115, 101, 116, 4, 2, 59, 69, 3990, 3993, 3, 8834,
			8402, 113, 117, 97, 108, 59, 1, 8840, 99, 101, 101, 100, 115, 4, 4, 59,
			69, 83, 84, 4015, 4017, 4025, 4037, 1, 8833, 113, 117, 97, 108, 59, 3,
			10928, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8929, 105,
			108, 100, 101, 59, 3, 8831, 824, 101, 114, 115, 101, 116, 4, 2, 59, 69,
			4056, 4059, 3, 8835, 8402, 113, 117, 97, 108, 59, 1, 8841, 105, 108, 100,
			101, 4, 4, 59, 69, 70, 84, 4080, 4082, 4089, 4100, 1, 8769, 113, 117, 97,
			108, 59, 1, 8772, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8775, 105,
			108, 100, 101, 59, 1, 8777, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114,
			59, 1, 8740, 99, 114, 59, 3, 55349, 56489, 105, 108, 100, 101, 5, 209, 1,
			59, 4135, 1, 209, 59, 1, 925, 4, 14, 69, 97, 99, 100, 102, 103, 109, 111,
			112, 114, 115, 116, 117, 118, 4170, 4176, 4187, 4205, 4212, 4217, 4228,
			4253, 4259, 4292, 4295, 4316, 4337, 4346, 108, 105, 103, 59, 1, 338, 99,
			117, 116, 101, 5, 211, 1, 59, 4185, 1, 211, 4, 2, 105, 121, 4193, 4202,
			114, 99, 5, 212, 1, 59, 4200, 1, 212, 59, 1, 1054, 98, 108, 97, 99, 59, 1,
			336, 114, 59, 3, 55349, 56594, 114, 97, 118, 101, 5, 210, 1, 59, 4226, 1,
			210, 4, 3, 97, 101, 105, 4236, 4241, 4246, 99, 114, 59, 1, 332, 103, 97,
			59, 1, 937, 99, 114, 111, 110, 59, 1, 927, 112, 102, 59, 3, 55349, 56646,
			101, 110, 67, 117, 114, 108, 121, 4, 2, 68, 81, 4272, 4285, 111, 117, 98,
			108, 101, 81, 117, 111, 116, 101, 59, 1, 8220, 117, 111, 116, 101, 59, 1,
			8216, 59, 1, 10836, 4, 2, 99, 108, 4301, 4306, 114, 59, 3, 55349, 56490,
			97, 115, 104, 5, 216, 1, 59, 4314, 1, 216, 105, 4, 2, 108, 109, 4323,
			4332, 100, 101, 5, 213, 1, 59, 4330, 1, 213, 101, 115, 59, 1, 10807, 109,
			108, 5, 214, 1, 59, 4344, 1, 214, 101, 114, 4, 2, 66, 80, 4354, 4380, 4,
			2, 97, 114, 4360, 4364, 114, 59, 1, 8254, 97, 99, 4, 2, 101, 107, 4372,
			4375, 59, 1, 9182, 101, 116, 59, 1, 9140, 97, 114, 101, 110, 116, 104,
			101, 115, 105, 115, 59, 1, 9180, 4, 9, 97, 99, 102, 104, 105, 108, 111,
			114, 115, 4413, 4422, 4426, 4431, 4435, 4438, 4448, 4471, 4561, 114, 116,
			105, 97, 108, 68, 59, 1, 8706, 121, 59, 1, 1055, 114, 59, 3, 55349, 56595,
			105, 59, 1, 934, 59, 1, 928, 117, 115, 77, 105, 110, 117, 115, 59, 1, 177,
			4, 2, 105, 112, 4454, 4467, 110, 99, 97, 114, 101, 112, 108, 97, 110, 101,
			59, 1, 8460, 102, 59, 1, 8473, 4, 4, 59, 101, 105, 111, 4481, 4483, 4526,
			4531, 1, 10939, 99, 101, 100, 101, 115, 4, 4, 59, 69, 83, 84, 4498, 4500,
			4507, 4519, 1, 8826, 113, 117, 97, 108, 59, 1, 10927, 108, 97, 110, 116,
			69, 113, 117, 97, 108, 59, 1, 8828, 105, 108, 100, 101, 59, 1, 8830, 109,
			101, 59, 1, 8243, 4, 2, 100, 112, 4537, 4543, 117, 99, 116, 59, 1, 8719,
			111, 114, 116, 105, 111, 110, 4, 2, 59, 97, 4555, 4557, 1, 8759, 108, 59,
			1, 8733, 4, 2, 99, 105, 4567, 4572, 114, 59, 3, 55349, 56491, 59, 1, 936,
			4, 4, 85, 102, 111, 115, 4585, 4594, 4599, 4604, 79, 84, 5, 34, 1, 59,
			4592, 1, 34, 114, 59, 3, 55349, 56596, 112, 102, 59, 1, 8474, 99, 114, 59,
			3, 55349, 56492, 4, 12, 66, 69, 97, 99, 101, 102, 104, 105, 111, 114, 115,
			117, 4636, 4642, 4650, 4681, 4704, 4763, 4767, 4771, 5047, 5069, 5081,
			5094, 97, 114, 114, 59, 1, 10512, 71, 5, 174, 1, 59, 4648, 1, 174, 4, 3,
			99, 110, 114, 4658, 4664, 4668, 117, 116, 101, 59, 1, 340, 103, 59, 1,
			10219, 114, 4, 2, 59, 116, 4675, 4677, 1, 8608, 108, 59, 1, 10518, 4, 3,
			97, 101, 121, 4689, 4695, 4701, 114, 111, 110, 59, 1, 344, 100, 105, 108,
			59, 1, 342, 59, 1, 1056, 4, 2, 59, 118, 4710, 4712, 1, 8476, 101, 114,
			115, 101, 4, 2, 69, 85, 4722, 4748, 4, 2, 108, 113, 4728, 4736, 101, 109,
			101, 110, 116, 59, 1, 8715, 117, 105, 108, 105, 98, 114, 105, 117, 109,
			59, 1, 8651, 112, 69, 113, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59,
			1, 10607, 114, 59, 1, 8476, 111, 59, 1, 929, 103, 104, 116, 4, 8, 65, 67,
			68, 70, 84, 85, 86, 97, 4792, 4840, 4849, 4905, 4912, 4972, 5022, 5040, 4,
			2, 110, 114, 4798, 4811, 103, 108, 101, 66, 114, 97, 99, 107, 101, 116,
			59, 1, 10217, 114, 111, 119, 4, 3, 59, 66, 76, 4822, 4824, 4829, 1, 8594,
			97, 114, 59, 1, 8677, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8644,
			101, 105, 108, 105, 110, 103, 59, 1, 8969, 111, 4, 2, 117, 119, 4856,
			4869, 98, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10215, 110, 4,
			2, 84, 86, 4876, 4887, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10589,
			101, 99, 116, 111, 114, 4, 2, 59, 66, 4898, 4900, 1, 8642, 97, 114, 59, 1,
			10581, 108, 111, 111, 114, 59, 1, 8971, 4, 2, 101, 114, 4918, 4944, 101,
			4, 3, 59, 65, 86, 4927, 4929, 4936, 1, 8866, 114, 114, 111, 119, 59, 1,
			8614, 101, 99, 116, 111, 114, 59, 1, 10587, 105, 97, 110, 103, 108, 101,
			4, 3, 59, 66, 69, 4958, 4960, 4965, 1, 8883, 97, 114, 59, 1, 10704, 113,
			117, 97, 108, 59, 1, 8885, 112, 4, 3, 68, 84, 86, 4981, 4993, 5004, 111,
			119, 110, 86, 101, 99, 116, 111, 114, 59, 1, 10575, 101, 101, 86, 101, 99,
			116, 111, 114, 59, 1, 10588, 101, 99, 116, 111, 114, 4, 2, 59, 66, 5015,
			5017, 1, 8638, 97, 114, 59, 1, 10580, 101, 99, 116, 111, 114, 4, 2, 59,
			66, 5033, 5035, 1, 8640, 97, 114, 59, 1, 10579, 114, 114, 111, 119, 59, 1,
			8658, 4, 2, 112, 117, 5053, 5057, 102, 59, 1, 8477, 110, 100, 73, 109,
			112, 108, 105, 101, 115, 59, 1, 10608, 105, 103, 104, 116, 97, 114, 114,
			111, 119, 59, 1, 8667, 4, 2, 99, 104, 5087, 5091, 114, 59, 1, 8475, 59, 1,
			8625, 108, 101, 68, 101, 108, 97, 121, 101, 100, 59, 1, 10740, 4, 13, 72,
			79, 97, 99, 102, 104, 105, 109, 111, 113, 115, 116, 117, 5134, 5150, 5157,
			5164, 5198, 5203, 5259, 5265, 5277, 5283, 5374, 5380, 5385, 4, 2, 67, 99,
			5140, 5146, 72, 99, 121, 59, 1, 1065, 121, 59, 1, 1064, 70, 84, 99, 121,
			59, 1, 1068, 99, 117, 116, 101, 59, 1, 346, 4, 5, 59, 97, 101, 105, 121,
			5176, 5178, 5184, 5190, 5195, 1, 10940, 114, 111, 110, 59, 1, 352, 100,
			105, 108, 59, 1, 350, 114, 99, 59, 1, 348, 59, 1, 1057, 114, 59, 3, 55349,
			56598, 111, 114, 116, 4, 4, 68, 76, 82, 85, 5216, 5227, 5238, 5250, 111,
			119, 110, 65, 114, 114, 111, 119, 59, 1, 8595, 101, 102, 116, 65, 114,
			114, 111, 119, 59, 1, 8592, 105, 103, 104, 116, 65, 114, 114, 111, 119,
			59, 1, 8594, 112, 65, 114, 114, 111, 119, 59, 1, 8593, 103, 109, 97, 59,
			1, 931, 97, 108, 108, 67, 105, 114, 99, 108, 101, 59, 1, 8728, 112, 102,
			59, 3, 55349, 56650, 4, 2, 114, 117, 5289, 5293, 116, 59, 1, 8730, 97,
			114, 101, 4, 4, 59, 73, 83, 85, 5306, 5308, 5322, 5367, 1, 9633, 110, 116,
			101, 114, 115, 101, 99, 116, 105, 111, 110, 59, 1, 8851, 117, 4, 2, 98,
			112, 5329, 5347, 115, 101, 116, 4, 2, 59, 69, 5338, 5340, 1, 8847, 113,
			117, 97, 108, 59, 1, 8849, 101, 114, 115, 101, 116, 4, 2, 59, 69, 5358,
			5360, 1, 8848, 113, 117, 97, 108, 59, 1, 8850, 110, 105, 111, 110, 59, 1,
			8852, 99, 114, 59, 3, 55349, 56494, 97, 114, 59, 1, 8902, 4, 4, 98, 99,
			109, 112, 5395, 5420, 5475, 5478, 4, 2, 59, 115, 5401, 5403, 1, 8912, 101,
			116, 4, 2, 59, 69, 5411, 5413, 1, 8912, 113, 117, 97, 108, 59, 1, 8838, 4,
			2, 99, 104, 5426, 5468, 101, 101, 100, 115, 4, 4, 59, 69, 83, 84, 5440,
			5442, 5449, 5461, 1, 8827, 113, 117, 97, 108, 59, 1, 10928, 108, 97, 110,
			116, 69, 113, 117, 97, 108, 59, 1, 8829, 105, 108, 100, 101, 59, 1, 8831,
			84, 104, 97, 116, 59, 1, 8715, 59, 1, 8721, 4, 3, 59, 101, 115, 5486,
			5488, 5507, 1, 8913, 114, 115, 101, 116, 4, 2, 59, 69, 5498, 5500, 1,
			8835, 113, 117, 97, 108, 59, 1, 8839, 101, 116, 59, 1, 8913, 4, 11, 72,
			82, 83, 97, 99, 102, 104, 105, 111, 114, 115, 5536, 5546, 5552, 5567,
			5579, 5602, 5607, 5655, 5695, 5701, 5711, 79, 82, 78, 5, 222, 1, 59, 5544,
			1, 222, 65, 68, 69, 59, 1, 8482, 4, 2, 72, 99, 5558, 5563, 99, 121, 59, 1,
			1035, 121, 59, 1, 1062, 4, 2, 98, 117, 5573, 5576, 59, 1, 9, 59, 1, 932,
			4, 3, 97, 101, 121, 5587, 5593, 5599, 114, 111, 110, 59, 1, 356, 100, 105,
			108, 59, 1, 354, 59, 1, 1058, 114, 59, 3, 55349, 56599, 4, 2, 101, 105,
			5613, 5631, 4, 2, 114, 116, 5619, 5627, 101, 102, 111, 114, 101, 59, 1,
			8756, 97, 59, 1, 920, 4, 2, 99, 110, 5637, 5647, 107, 83, 112, 97, 99,
			101, 59, 3, 8287, 8202, 83, 112, 97, 99, 101, 59, 1, 8201, 108, 100, 101,
			4, 4, 59, 69, 70, 84, 5668, 5670, 5677, 5688, 1, 8764, 113, 117, 97, 108,
			59, 1, 8771, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8773, 105, 108,
			100, 101, 59, 1, 8776, 112, 102, 59, 3, 55349, 56651, 105, 112, 108, 101,
			68, 111, 116, 59, 1, 8411, 4, 2, 99, 116, 5717, 5722, 114, 59, 3, 55349,
			56495, 114, 111, 107, 59, 1, 358, 4, 14, 97, 98, 99, 100, 102, 103, 109,
			110, 111, 112, 114, 115, 116, 117, 5758, 5789, 5805, 5823, 5830, 5835,
			5846, 5852, 5921, 5937, 6089, 6095, 6101, 6108, 4, 2, 99, 114, 5764, 5774,
			117, 116, 101, 5, 218, 1, 59, 5772, 1, 218, 114, 4, 2, 59, 111, 5781,
			5783, 1, 8607, 99, 105, 114, 59, 1, 10569, 114, 4, 2, 99, 101, 5796, 5800,
			121, 59, 1, 1038, 118, 101, 59, 1, 364, 4, 2, 105, 121, 5811, 5820, 114,
			99, 5, 219, 1, 59, 5818, 1, 219, 59, 1, 1059, 98, 108, 97, 99, 59, 1, 368,
			114, 59, 3, 55349, 56600, 114, 97, 118, 101, 5, 217, 1, 59, 5844, 1, 217,
			97, 99, 114, 59, 1, 362, 4, 2, 100, 105, 5858, 5905, 101, 114, 4, 2, 66,
			80, 5866, 5892, 4, 2, 97, 114, 5872, 5876, 114, 59, 1, 95, 97, 99, 4, 2,
			101, 107, 5884, 5887, 59, 1, 9183, 101, 116, 59, 1, 9141, 97, 114, 101,
			110, 116, 104, 101, 115, 105, 115, 59, 1, 9181, 111, 110, 4, 2, 59, 80,
			5913, 5915, 1, 8899, 108, 117, 115, 59, 1, 8846, 4, 2, 103, 112, 5927,
			5932, 111, 110, 59, 1, 370, 102, 59, 3, 55349, 56652, 4, 8, 65, 68, 69,
			84, 97, 100, 112, 115, 5955, 5985, 5996, 6009, 6026, 6033, 6044, 6075,
			114, 114, 111, 119, 4, 3, 59, 66, 68, 5967, 5969, 5974, 1, 8593, 97, 114,
			59, 1, 10514, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8645, 111,
			119, 110, 65, 114, 114, 111, 119, 59, 1, 8597, 113, 117, 105, 108, 105,
			98, 114, 105, 117, 109, 59, 1, 10606, 101, 101, 4, 2, 59, 65, 6017, 6019,
			1, 8869, 114, 114, 111, 119, 59, 1, 8613, 114, 114, 111, 119, 59, 1, 8657,
			111, 119, 110, 97, 114, 114, 111, 119, 59, 1, 8661, 101, 114, 4, 2, 76,
			82, 6052, 6063, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8598, 105,
			103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8599, 105, 4, 2, 59, 108,
			6082, 6084, 1, 978, 111, 110, 59, 1, 933, 105, 110, 103, 59, 1, 366, 99,
			114, 59, 3, 55349, 56496, 105, 108, 100, 101, 59, 1, 360, 109, 108, 5,
			220, 1, 59, 6115, 1, 220, 4, 9, 68, 98, 99, 100, 101, 102, 111, 115, 118,
			6137, 6143, 6148, 6152, 6166, 6250, 6255, 6261, 6267, 97, 115, 104, 59, 1,
			8875, 97, 114, 59, 1, 10987, 121, 59, 1, 1042, 97, 115, 104, 4, 2, 59,
			108, 6161, 6163, 1, 8873, 59, 1, 10982, 4, 2, 101, 114, 6172, 6175, 59, 1,
			8897, 4, 3, 98, 116, 121, 6183, 6188, 6238, 97, 114, 59, 1, 8214, 4, 2,
			59, 105, 6194, 6196, 1, 8214, 99, 97, 108, 4, 4, 66, 76, 83, 84, 6209,
			6214, 6220, 6231, 97, 114, 59, 1, 8739, 105, 110, 101, 59, 1, 124, 101,
			112, 97, 114, 97, 116, 111, 114, 59, 1, 10072, 105, 108, 100, 101, 59, 1,
			8768, 84, 104, 105, 110, 83, 112, 97, 99, 101, 59, 1, 8202, 114, 59, 3,
			55349, 56601, 112, 102, 59, 3, 55349, 56653, 99, 114, 59, 3, 55349, 56497,
			100, 97, 115, 104, 59, 1, 8874, 4, 5, 99, 101, 102, 111, 115, 6286, 6292,
			6298, 6303, 6309, 105, 114, 99, 59, 1, 372, 100, 103, 101, 59, 1, 8896,
			114, 59, 3, 55349, 56602, 112, 102, 59, 3, 55349, 56654, 99, 114, 59, 3,
			55349, 56498, 4, 4, 102, 105, 111, 115, 6325, 6330, 6333, 6339, 114, 59,
			3, 55349, 56603, 59, 1, 926, 112, 102, 59, 3, 55349, 56655, 99, 114, 59,
			3, 55349, 56499, 4, 9, 65, 73, 85, 97, 99, 102, 111, 115, 117, 6365, 6370,
			6375, 6380, 6391, 6405, 6410, 6416, 6422, 99, 121, 59, 1, 1071, 99, 121,
			59, 1, 1031, 99, 121, 59, 1, 1070, 99, 117, 116, 101, 5, 221, 1, 59, 6389,
			1, 221, 4, 2, 105, 121, 6397, 6402, 114, 99, 59, 1, 374, 59, 1, 1067, 114,
			59, 3, 55349, 56604, 112, 102, 59, 3, 55349, 56656, 99, 114, 59, 3, 55349,
			56500, 109, 108, 59, 1, 376, 4, 8, 72, 97, 99, 100, 101, 102, 111, 115,
			6445, 6450, 6457, 6472, 6477, 6501, 6505, 6510, 99, 121, 59, 1, 1046, 99,
			117, 116, 101, 59, 1, 377, 4, 2, 97, 121, 6463, 6469, 114, 111, 110, 59,
			1, 381, 59, 1, 1047, 111, 116, 59, 1, 379, 4, 2, 114, 116, 6483, 6497,
			111, 87, 105, 100, 116, 104, 83, 112, 97, 99, 101, 59, 1, 8203, 97, 59, 1,
			918, 114, 59, 1, 8488, 112, 102, 59, 1, 8484, 99, 114, 59, 3, 55349,
			56501, 4, 16, 97, 98, 99, 101, 102, 103, 108, 109, 110, 111, 112, 114,
			115, 116, 117, 119, 6550, 6561, 6568, 6612, 6622, 6634, 6645, 6672, 6699,
			6854, 6870, 6923, 6933, 6963, 6974, 6983, 99, 117, 116, 101, 5, 225, 1,
			59, 6559, 1, 225, 114, 101, 118, 101, 59, 1, 259, 4, 6, 59, 69, 100, 105,
			117, 121, 6582, 6584, 6588, 6591, 6600, 6609, 1, 8766, 59, 3, 8766, 819,
			59, 1, 8767, 114, 99, 5, 226, 1, 59, 6598, 1, 226, 116, 101, 5, 180, 1,
			59, 6607, 1, 180, 59, 1, 1072, 108, 105, 103, 5, 230, 1, 59, 6620, 1, 230,
			4, 2, 59, 114, 6628, 6630, 1, 8289, 59, 3, 55349, 56606, 114, 97, 118,
			101, 5, 224, 1, 59, 6643, 1, 224, 4, 2, 101, 112, 6651, 6667, 4, 2, 102,
			112, 6657, 6663, 115, 121, 109, 59, 1, 8501, 104, 59, 1, 8501, 104, 97,
			59, 1, 945, 4, 2, 97, 112, 6678, 6692, 4, 2, 99, 108, 6684, 6688, 114, 59,
			1, 257, 103, 59, 1, 10815, 5, 38, 1, 59, 6697, 1, 38, 4, 2, 100, 103,
			6705, 6737, 4, 5, 59, 97, 100, 115, 118, 6717, 6719, 6724, 6727, 6734, 1,
			8743, 110, 100, 59, 1, 10837, 59, 1, 10844, 108, 111, 112, 101, 59, 1,
			10840, 59, 1, 10842, 4, 7, 59, 101, 108, 109, 114, 115, 122, 6753, 6755,
			6758, 6762, 6814, 6835, 6848, 1, 8736, 59, 1, 10660, 101, 59, 1, 8736,
			115, 100, 4, 2, 59, 97, 6770, 6772, 1, 8737, 4, 8, 97, 98, 99, 100, 101,
			102, 103, 104, 6790, 6793, 6796, 6799, 6802, 6805, 6808, 6811, 59, 1,
			10664, 59, 1, 10665, 59, 1, 10666, 59, 1, 10667, 59, 1, 10668, 59, 1,
			10669, 59, 1, 10670, 59, 1, 10671, 116, 4, 2, 59, 118, 6821, 6823, 1,
			8735, 98, 4, 2, 59, 100, 6830, 6832, 1, 8894, 59, 1, 10653, 4, 2, 112,
			116, 6841, 6845, 104, 59, 1, 8738, 59, 1, 197, 97, 114, 114, 59, 1, 9084,
			4, 2, 103, 112, 6860, 6865, 111, 110, 59, 1, 261, 102, 59, 3, 55349,
			56658, 4, 7, 59, 69, 97, 101, 105, 111, 112, 6886, 6888, 6891, 6897, 6900,
			6904, 6908, 1, 8776, 59, 1, 10864, 99, 105, 114, 59, 1, 10863, 59, 1,
			8778, 100, 59, 1, 8779, 115, 59, 1, 39, 114, 111, 120, 4, 2, 59, 101,
			6917, 6919, 1, 8776, 113, 59, 1, 8778, 105, 110, 103, 5, 229, 1, 59, 6931,
			1, 229, 4, 3, 99, 116, 121, 6941, 6946, 6949, 114, 59, 3, 55349, 56502,
			59, 1, 42, 109, 112, 4, 2, 59, 101, 6957, 6959, 1, 8776, 113, 59, 1, 8781,
			105, 108, 100, 101, 5, 227, 1, 59, 6972, 1, 227, 109, 108, 5, 228, 1, 59,
			6981, 1, 228, 4, 2, 99, 105, 6989, 6997, 111, 110, 105, 110, 116, 59, 1,
			8755, 110, 116, 59, 1, 10769, 4, 16, 78, 97, 98, 99, 100, 101, 102, 105,
			107, 108, 110, 111, 112, 114, 115, 117, 7036, 7041, 7119, 7135, 7149,
			7155, 7219, 7224, 7347, 7354, 7463, 7489, 7786, 7793, 7814, 7866, 111,
			116, 59, 1, 10989, 4, 2, 99, 114, 7047, 7094, 107, 4, 4, 99, 101, 112,
			115, 7058, 7064, 7073, 7080, 111, 110, 103, 59, 1, 8780, 112, 115, 105,
			108, 111, 110, 59, 1, 1014, 114, 105, 109, 101, 59, 1, 8245, 105, 109, 4,
			2, 59, 101, 7088, 7090, 1, 8765, 113, 59, 1, 8909, 4, 2, 118, 119, 7100,
			7105, 101, 101, 59, 1, 8893, 101, 100, 4, 2, 59, 103, 7113, 7115, 1, 8965,
			101, 59, 1, 8965, 114, 107, 4, 2, 59, 116, 7127, 7129, 1, 9141, 98, 114,
			107, 59, 1, 9142, 4, 2, 111, 121, 7141, 7146, 110, 103, 59, 1, 8780, 59,
			1, 1073, 113, 117, 111, 59, 1, 8222, 4, 5, 99, 109, 112, 114, 116, 7167,
			7181, 7188, 7193, 7199, 97, 117, 115, 4, 2, 59, 101, 7176, 7178, 1, 8757,
			59, 1, 8757, 112, 116, 121, 118, 59, 1, 10672, 115, 105, 59, 1, 1014, 110,
			111, 117, 59, 1, 8492, 4, 3, 97, 104, 119, 7207, 7210, 7213, 59, 1, 946,
			59, 1, 8502, 101, 101, 110, 59, 1, 8812, 114, 59, 3, 55349, 56607, 103, 4,
			7, 99, 111, 115, 116, 117, 118, 119, 7241, 7262, 7288, 7305, 7328, 7335,
			7340, 4, 3, 97, 105, 117, 7249, 7253, 7258, 112, 59, 1, 8898, 114, 99, 59,
			1, 9711, 112, 59, 1, 8899, 4, 3, 100, 112, 116, 7270, 7275, 7281, 111,
			116, 59, 1, 10752, 108, 117, 115, 59, 1, 10753, 105, 109, 101, 115, 59, 1,
			10754, 4, 2, 113, 116, 7294, 7300, 99, 117, 112, 59, 1, 10758, 97, 114,
			59, 1, 9733, 114, 105, 97, 110, 103, 108, 101, 4, 2, 100, 117, 7318, 7324,
			111, 119, 110, 59, 1, 9661, 112, 59, 1, 9651, 112, 108, 117, 115, 59, 1,
			10756, 101, 101, 59, 1, 8897, 101, 100, 103, 101, 59, 1, 8896, 97, 114,
			111, 119, 59, 1, 10509, 4, 3, 97, 107, 111, 7362, 7436, 7458, 4, 2, 99,
			110, 7368, 7432, 107, 4, 3, 108, 115, 116, 7377, 7386, 7394, 111, 122,
			101, 110, 103, 101, 59, 1, 10731, 113, 117, 97, 114, 101, 59, 1, 9642,
			114, 105, 97, 110, 103, 108, 101, 4, 4, 59, 100, 108, 114, 7411, 7413,
			7419, 7425, 1, 9652, 111, 119, 110, 59, 1, 9662, 101, 102, 116, 59, 1,
			9666, 105, 103, 104, 116, 59, 1, 9656, 107, 59, 1, 9251, 4, 2, 49, 51,
			7442, 7454, 4, 2, 50, 52, 7448, 7451, 59, 1, 9618, 59, 1, 9617, 52, 59, 1,
			9619, 99, 107, 59, 1, 9608, 4, 2, 101, 111, 7469, 7485, 4, 2, 59, 113,
			7475, 7478, 3, 61, 8421, 117, 105, 118, 59, 3, 8801, 8421, 116, 59, 1,
			8976, 4, 4, 112, 116, 119, 120, 7499, 7504, 7517, 7523, 102, 59, 3, 55349,
			56659, 4, 2, 59, 116, 7510, 7512, 1, 8869, 111, 109, 59, 1, 8869, 116,
			105, 101, 59, 1, 8904, 4, 12, 68, 72, 85, 86, 98, 100, 104, 109, 112, 116,
			117, 118, 7549, 7571, 7597, 7619, 7655, 7660, 7682, 7708, 7715, 7721,
			7728, 7750, 4, 4, 76, 82, 108, 114, 7559, 7562, 7565, 7568, 59, 1, 9559,
			59, 1, 9556, 59, 1, 9558, 59, 1, 9555, 4, 5, 59, 68, 85, 100, 117, 7583,
			7585, 7588, 7591, 7594, 1, 9552, 59, 1, 9574, 59, 1, 9577, 59, 1, 9572,
			59, 1, 9575, 4, 4, 76, 82, 108, 114, 7607, 7610, 7613, 7616, 59, 1, 9565,
			59, 1, 9562, 59, 1, 9564, 59, 1, 9561, 4, 7, 59, 72, 76, 82, 104, 108,
			114, 7635, 7637, 7640, 7643, 7646, 7649, 7652, 1, 9553, 59, 1, 9580, 59,
			1, 9571, 59, 1, 9568, 59, 1, 9579, 59, 1, 9570, 59, 1, 9567, 111, 120, 59,
			1, 10697, 4, 4, 76, 82, 108, 114, 7670, 7673, 7676, 7679, 59, 1, 9557, 59,
			1, 9554, 59, 1, 9488, 59, 1, 9484, 4, 5, 59, 68, 85, 100, 117, 7694, 7696,
			7699, 7702, 7705, 1, 9472, 59, 1, 9573, 59, 1, 9576, 59, 1, 9516, 59, 1,
			9524, 105, 110, 117, 115, 59, 1, 8863, 108, 117, 115, 59, 1, 8862, 105,
			109, 101, 115, 59, 1, 8864, 4, 4, 76, 82, 108, 114, 7738, 7741, 7744,
			7747, 59, 1, 9563, 59, 1, 9560, 59, 1, 9496, 59, 1, 9492, 4, 7, 59, 72,
			76, 82, 104, 108, 114, 7766, 7768, 7771, 7774, 7777, 7780, 7783, 1, 9474,
			59, 1, 9578, 59, 1, 9569, 59, 1, 9566, 59, 1, 9532, 59, 1, 9508, 59, 1,
			9500, 114, 105, 109, 101, 59, 1, 8245, 4, 2, 101, 118, 7799, 7804, 118,
			101, 59, 1, 728, 98, 97, 114, 5, 166, 1, 59, 7812, 1, 166, 4, 4, 99, 101,
			105, 111, 7824, 7829, 7834, 7846, 114, 59, 3, 55349, 56503, 109, 105, 59,
			1, 8271, 109, 4, 2, 59, 101, 7841, 7843, 1, 8765, 59, 1, 8909, 108, 4, 3,
			59, 98, 104, 7855, 7857, 7860, 1, 92, 59, 1, 10693, 115, 117, 98, 59, 1,
			10184, 4, 2, 108, 109, 7872, 7885, 108, 4, 2, 59, 101, 7879, 7881, 1,
			8226, 116, 59, 1, 8226, 112, 4, 3, 59, 69, 101, 7894, 7896, 7899, 1, 8782,
			59, 1, 10926, 4, 2, 59, 113, 7905, 7907, 1, 8783, 59, 1, 8783, 4, 15, 97,
			99, 100, 101, 102, 104, 105, 108, 111, 114, 115, 116, 117, 119, 121, 7942,
			8021, 8075, 8080, 8121, 8126, 8157, 8279, 8295, 8430, 8446, 8485, 8491,
			8707, 8726, 4, 3, 99, 112, 114, 7950, 7956, 8007, 117, 116, 101, 59, 1,
			263, 4, 6, 59, 97, 98, 99, 100, 115, 7970, 7972, 7977, 7984, 7998, 8003,
			1, 8745, 110, 100, 59, 1, 10820, 114, 99, 117, 112, 59, 1, 10825, 4, 2,
			97, 117, 7990, 7994, 112, 59, 1, 10827, 112, 59, 1, 10823, 111, 116, 59,
			1, 10816, 59, 3, 8745, 65024, 4, 2, 101, 111, 8013, 8017, 116, 59, 1,
			8257, 110, 59, 1, 711, 4, 4, 97, 101, 105, 117, 8031, 8046, 8056, 8061, 4,
			2, 112, 114, 8037, 8041, 115, 59, 1, 10829, 111, 110, 59, 1, 269, 100,
			105, 108, 5, 231, 1, 59, 8054, 1, 231, 114, 99, 59, 1, 265, 112, 115, 4,
			2, 59, 115, 8069, 8071, 1, 10828, 109, 59, 1, 10832, 111, 116, 59, 1, 267,
			4, 3, 100, 109, 110, 8088, 8097, 8104, 105, 108, 5, 184, 1, 59, 8095, 1,
			184, 112, 116, 121, 118, 59, 1, 10674, 116, 5, 162, 2, 59, 101, 8112,
			8114, 1, 162, 114, 100, 111, 116, 59, 1, 183, 114, 59, 3, 55349, 56608, 4,
			3, 99, 101, 105, 8134, 8138, 8154, 121, 59, 1, 1095, 99, 107, 4, 2, 59,
			109, 8146, 8148, 1, 10003, 97, 114, 107, 59, 1, 10003, 59, 1, 967, 114, 4,
			7, 59, 69, 99, 101, 102, 109, 115, 8174, 8176, 8179, 8258, 8261, 8268,
			8273, 1, 9675, 59, 1, 10691, 4, 3, 59, 101, 108, 8187, 8189, 8193, 1, 710,
			113, 59, 1, 8791, 101, 4, 2, 97, 100, 8200, 8223, 114, 114, 111, 119, 4,
			2, 108, 114, 8210, 8216, 101, 102, 116, 59, 1, 8634, 105, 103, 104, 116,
			59, 1, 8635, 4, 5, 82, 83, 97, 99, 100, 8235, 8238, 8241, 8246, 8252, 59,
			1, 174, 59, 1, 9416, 115, 116, 59, 1, 8859, 105, 114, 99, 59, 1, 8858, 97,
			115, 104, 59, 1, 8861, 59, 1, 8791, 110, 105, 110, 116, 59, 1, 10768, 105,
			100, 59, 1, 10991, 99, 105, 114, 59, 1, 10690, 117, 98, 115, 4, 2, 59,
			117, 8288, 8290, 1, 9827, 105, 116, 59, 1, 9827, 4, 4, 108, 109, 110, 112,
			8305, 8326, 8376, 8400, 111, 110, 4, 2, 59, 101, 8313, 8315, 1, 58, 4, 2,
			59, 113, 8321, 8323, 1, 8788, 59, 1, 8788, 4, 2, 109, 112, 8332, 8344, 97,
			4, 2, 59, 116, 8339, 8341, 1, 44, 59, 1, 64, 4, 3, 59, 102, 108, 8352,
			8354, 8358, 1, 8705, 110, 59, 1, 8728, 101, 4, 2, 109, 120, 8365, 8371,
			101, 110, 116, 59, 1, 8705, 101, 115, 59, 1, 8450, 4, 2, 103, 105, 8382,
			8395, 4, 2, 59, 100, 8388, 8390, 1, 8773, 111, 116, 59, 1, 10861, 110,
			116, 59, 1, 8750, 4, 3, 102, 114, 121, 8408, 8412, 8417, 59, 3, 55349,
			56660, 111, 100, 59, 1, 8720, 5, 169, 2, 59, 115, 8424, 8426, 1, 169, 114,
			59, 1, 8471, 4, 2, 97, 111, 8436, 8441, 114, 114, 59, 1, 8629, 115, 115,
			59, 1, 10007, 4, 2, 99, 117, 8452, 8457, 114, 59, 3, 55349, 56504, 4, 2,
			98, 112, 8463, 8474, 4, 2, 59, 101, 8469, 8471, 1, 10959, 59, 1, 10961, 4,
			2, 59, 101, 8480, 8482, 1, 10960, 59, 1, 10962, 100, 111, 116, 59, 1,
			8943, 4, 7, 100, 101, 108, 112, 114, 118, 119, 8507, 8522, 8536, 8550,
			8600, 8697, 8702, 97, 114, 114, 4, 2, 108, 114, 8516, 8519, 59, 1, 10552,
			59, 1, 10549, 4, 2, 112, 115, 8528, 8532, 114, 59, 1, 8926, 99, 59, 1,
			8927, 97, 114, 114, 4, 2, 59, 112, 8545, 8547, 1, 8630, 59, 1, 10557, 4,
			6, 59, 98, 99, 100, 111, 115, 8564, 8566, 8573, 8587, 8592, 8596, 1, 8746,
			114, 99, 97, 112, 59, 1, 10824, 4, 2, 97, 117, 8579, 8583, 112, 59, 1,
			10822, 112, 59, 1, 10826, 111, 116, 59, 1, 8845, 114, 59, 1, 10821, 59, 3,
			8746, 65024, 4, 4, 97, 108, 114, 118, 8610, 8623, 8663, 8672, 114, 114, 4,
			2, 59, 109, 8618, 8620, 1, 8631, 59, 1, 10556, 121, 4, 3, 101, 118, 119,
			8632, 8651, 8656, 113, 4, 2, 112, 115, 8639, 8645, 114, 101, 99, 59, 1,
			8926, 117, 99, 99, 59, 1, 8927, 101, 101, 59, 1, 8910, 101, 100, 103, 101,
			59, 1, 8911, 101, 110, 5, 164, 1, 59, 8670, 1, 164, 101, 97, 114, 114,
			111, 119, 4, 2, 108, 114, 8684, 8690, 101, 102, 116, 59, 1, 8630, 105,
			103, 104, 116, 59, 1, 8631, 101, 101, 59, 1, 8910, 101, 100, 59, 1, 8911,
			4, 2, 99, 105, 8713, 8721, 111, 110, 105, 110, 116, 59, 1, 8754, 110, 116,
			59, 1, 8753, 108, 99, 116, 121, 59, 1, 9005, 4, 19, 65, 72, 97, 98, 99,
			100, 101, 102, 104, 105, 106, 108, 111, 114, 115, 116, 117, 119, 122,
			8773, 8778, 8783, 8821, 8839, 8854, 8887, 8914, 8930, 8944, 9036, 9041,
			9058, 9197, 9227, 9258, 9281, 9297, 9305, 114, 114, 59, 1, 8659, 97, 114,
			59, 1, 10597, 4, 4, 103, 108, 114, 115, 8793, 8799, 8805, 8809, 103, 101,
			114, 59, 1, 8224, 101, 116, 104, 59, 1, 8504, 114, 59, 1, 8595, 104, 4, 2,
			59, 118, 8816, 8818, 1, 8208, 59, 1, 8867, 4, 2, 107, 108, 8827, 8834, 97,
			114, 111, 119, 59, 1, 10511, 97, 99, 59, 1, 733, 4, 2, 97, 121, 8845,
			8851, 114, 111, 110, 59, 1, 271, 59, 1, 1076, 4, 3, 59, 97, 111, 8862,
			8864, 8880, 1, 8518, 4, 2, 103, 114, 8870, 8876, 103, 101, 114, 59, 1,
			8225, 114, 59, 1, 8650, 116, 115, 101, 113, 59, 1, 10871, 4, 3, 103, 108,
			109, 8895, 8902, 8907, 5, 176, 1, 59, 8900, 1, 176, 116, 97, 59, 1, 948,
			112, 116, 121, 118, 59, 1, 10673, 4, 2, 105, 114, 8920, 8926, 115, 104,
			116, 59, 1, 10623, 59, 3, 55349, 56609, 97, 114, 4, 2, 108, 114, 8938,
			8941, 59, 1, 8643, 59, 1, 8642, 4, 5, 97, 101, 103, 115, 118, 8956, 8986,
			8989, 8996, 9001, 109, 4, 3, 59, 111, 115, 8965, 8967, 8983, 1, 8900, 110,
			100, 4, 2, 59, 115, 8975, 8977, 1, 8900, 117, 105, 116, 59, 1, 9830, 59,
			1, 9830, 59, 1, 168, 97, 109, 109, 97, 59, 1, 989, 105, 110, 59, 1, 8946,
			4, 3, 59, 105, 111, 9009, 9011, 9031, 1, 247, 100, 101, 5, 247, 2, 59,
			111, 9020, 9022, 1, 247, 110, 116, 105, 109, 101, 115, 59, 1, 8903, 110,
			120, 59, 1, 8903, 99, 121, 59, 1, 1106, 99, 4, 2, 111, 114, 9048, 9053,
			114, 110, 59, 1, 8990, 111, 112, 59, 1, 8973, 4, 5, 108, 112, 116, 117,
			119, 9070, 9076, 9081, 9130, 9144, 108, 97, 114, 59, 1, 36, 102, 59, 3,
			55349, 56661, 4, 5, 59, 101, 109, 112, 115, 9093, 9095, 9109, 9116, 9122,
			1, 729, 113, 4, 2, 59, 100, 9102, 9104, 1, 8784, 111, 116, 59, 1, 8785,
			105, 110, 117, 115, 59, 1, 8760, 108, 117, 115, 59, 1, 8724, 113, 117, 97,
			114, 101, 59, 1, 8865, 98, 108, 101, 98, 97, 114, 119, 101, 100, 103, 101,
			59, 1, 8966, 110, 4, 3, 97, 100, 104, 9153, 9160, 9172, 114, 114, 111,
			119, 59, 1, 8595, 111, 119, 110, 97, 114, 114, 111, 119, 115, 59, 1, 8650,
			97, 114, 112, 111, 111, 110, 4, 2, 108, 114, 9184, 9190, 101, 102, 116,
			59, 1, 8643, 105, 103, 104, 116, 59, 1, 8642, 4, 2, 98, 99, 9203, 9211,
			107, 97, 114, 111, 119, 59, 1, 10512, 4, 2, 111, 114, 9217, 9222, 114,
			110, 59, 1, 8991, 111, 112, 59, 1, 8972, 4, 3, 99, 111, 116, 9235, 9248,
			9252, 4, 2, 114, 121, 9241, 9245, 59, 3, 55349, 56505, 59, 1, 1109, 108,
			59, 1, 10742, 114, 111, 107, 59, 1, 273, 4, 2, 100, 114, 9264, 9269, 111,
			116, 59, 1, 8945, 105, 4, 2, 59, 102, 9276, 9278, 1, 9663, 59, 1, 9662, 4,
			2, 97, 104, 9287, 9292, 114, 114, 59, 1, 8693, 97, 114, 59, 1, 10607, 97,
			110, 103, 108, 101, 59, 1, 10662, 4, 2, 99, 105, 9311, 9315, 121, 59, 1,
			1119, 103, 114, 97, 114, 114, 59, 1, 10239, 4, 18, 68, 97, 99, 100, 101,
			102, 103, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 120, 9361,
			9376, 9398, 9439, 9444, 9447, 9462, 9495, 9531, 9585, 9598, 9614, 9659,
			9755, 9771, 9792, 9808, 9826, 4, 2, 68, 111, 9367, 9372, 111, 116, 59, 1,
			10871, 116, 59, 1, 8785, 4, 2, 99, 115, 9382, 9392, 117, 116, 101, 5, 233,
			1, 59, 9390, 1, 233, 116, 101, 114, 59, 1, 10862, 4, 4, 97, 105, 111, 121,
			9408, 9414, 9430, 9436, 114, 111, 110, 59, 1, 283, 114, 4, 2, 59, 99,
			9421, 9423, 1, 8790, 5, 234, 1, 59, 9428, 1, 234, 108, 111, 110, 59, 1,
			8789, 59, 1, 1101, 111, 116, 59, 1, 279, 59, 1, 8519, 4, 2, 68, 114, 9453,
			9458, 111, 116, 59, 1, 8786, 59, 3, 55349, 56610, 4, 3, 59, 114, 115,
			9470, 9472, 9482, 1, 10906, 97, 118, 101, 5, 232, 1, 59, 9480, 1, 232, 4,
			2, 59, 100, 9488, 9490, 1, 10902, 111, 116, 59, 1, 10904, 4, 4, 59, 105,
			108, 115, 9505, 9507, 9515, 9518, 1, 10905, 110, 116, 101, 114, 115, 59,
			1, 9191, 59, 1, 8467, 4, 2, 59, 100, 9524, 9526, 1, 10901, 111, 116, 59,
			1, 10903, 4, 3, 97, 112, 115, 9539, 9544, 9564, 99, 114, 59, 1, 275, 116,
			121, 4, 3, 59, 115, 118, 9554, 9556, 9561, 1, 8709, 101, 116, 59, 1, 8709,
			59, 1, 8709, 112, 4, 2, 49, 59, 9571, 9583, 4, 2, 51, 52, 9577, 9580, 59,
			1, 8196, 59, 1, 8197, 1, 8195, 4, 2, 103, 115, 9591, 9594, 59, 1, 331,
			112, 59, 1, 8194, 4, 2, 103, 112, 9604, 9609, 111, 110, 59, 1, 281, 102,
			59, 3, 55349, 56662, 4, 3, 97, 108, 115, 9622, 9635, 9640, 114, 4, 2, 59,
			115, 9629, 9631, 1, 8917, 108, 59, 1, 10723, 117, 115, 59, 1, 10865, 105,
			4, 3, 59, 108, 118, 9649, 9651, 9656, 1, 949, 111, 110, 59, 1, 949, 59, 1,
			1013, 4, 4, 99, 115, 117, 118, 9669, 9686, 9716, 9747, 4, 2, 105, 111,
			9675, 9680, 114, 99, 59, 1, 8790, 108, 111, 110, 59, 1, 8789, 4, 2, 105,
			108, 9692, 9696, 109, 59, 1, 8770, 97, 110, 116, 4, 2, 103, 108, 9705,
			9710, 116, 114, 59, 1, 10902, 101, 115, 115, 59, 1, 10901, 4, 3, 97, 101,
			105, 9724, 9729, 9734, 108, 115, 59, 1, 61, 115, 116, 59, 1, 8799, 118, 4,
			2, 59, 68, 9741, 9743, 1, 8801, 68, 59, 1, 10872, 112, 97, 114, 115, 108,
			59, 1, 10725, 4, 2, 68, 97, 9761, 9766, 111, 116, 59, 1, 8787, 114, 114,
			59, 1, 10609, 4, 3, 99, 100, 105, 9779, 9783, 9788, 114, 59, 1, 8495, 111,
			116, 59, 1, 8784, 109, 59, 1, 8770, 4, 2, 97, 104, 9798, 9801, 59, 1, 951,
			5, 240, 1, 59, 9806, 1, 240, 4, 2, 109, 114, 9814, 9822, 108, 5, 235, 1,
			59, 9820, 1, 235, 111, 59, 1, 8364, 4, 3, 99, 105, 112, 9834, 9838, 9843,
			108, 59, 1, 33, 115, 116, 59, 1, 8707, 4, 2, 101, 111, 9849, 9859, 99,
			116, 97, 116, 105, 111, 110, 59, 1, 8496, 110, 101, 110, 116, 105, 97,
			108, 101, 59, 1, 8519, 4, 12, 97, 99, 101, 102, 105, 106, 108, 110, 111,
			112, 114, 115, 9896, 9910, 9914, 9921, 9954, 9960, 9967, 9989, 9994,
			10027, 10036, 10164, 108, 108, 105, 110, 103, 100, 111, 116, 115, 101,
			113, 59, 1, 8786, 121, 59, 1, 1092, 109, 97, 108, 101, 59, 1, 9792, 4, 3,
			105, 108, 114, 9929, 9935, 9950, 108, 105, 103, 59, 1, 64259, 4, 2, 105,
			108, 9941, 9945, 103, 59, 1, 64256, 105, 103, 59, 1, 64260, 59, 3, 55349,
			56611, 108, 105, 103, 59, 1, 64257, 108, 105, 103, 59, 3, 102, 106, 4, 3,
			97, 108, 116, 9975, 9979, 9984, 116, 59, 1, 9837, 105, 103, 59, 1, 64258,
			110, 115, 59, 1, 9649, 111, 102, 59, 1, 402, 4, 2, 112, 114, 1e4, 10005,
			102, 59, 3, 55349, 56663, 4, 2, 97, 107, 10011, 10016, 108, 108, 59, 1,
			8704, 4, 2, 59, 118, 10022, 10024, 1, 8916, 59, 1, 10969, 97, 114, 116,
			105, 110, 116, 59, 1, 10765, 4, 2, 97, 111, 10042, 10159, 4, 2, 99, 115,
			10048, 10155, 4, 6, 49, 50, 51, 52, 53, 55, 10062, 10102, 10114, 10135,
			10139, 10151, 4, 6, 50, 51, 52, 53, 54, 56, 10076, 10083, 10086, 10093,
			10096, 10099, 5, 189, 1, 59, 10081, 1, 189, 59, 1, 8531, 5, 188, 1, 59,
			10091, 1, 188, 59, 1, 8533, 59, 1, 8537, 59, 1, 8539, 4, 2, 51, 53, 10108,
			10111, 59, 1, 8532, 59, 1, 8534, 4, 3, 52, 53, 56, 10122, 10129, 10132, 5,
			190, 1, 59, 10127, 1, 190, 59, 1, 8535, 59, 1, 8540, 53, 59, 1, 8536, 4,
			2, 54, 56, 10145, 10148, 59, 1, 8538, 59, 1, 8541, 56, 59, 1, 8542, 108,
			59, 1, 8260, 119, 110, 59, 1, 8994, 99, 114, 59, 3, 55349, 56507, 4, 17,
			69, 97, 98, 99, 100, 101, 102, 103, 105, 106, 108, 110, 111, 114, 115,
			116, 118, 10206, 10217, 10247, 10254, 10268, 10273, 10358, 10363, 10374,
			10380, 10385, 10406, 10458, 10464, 10470, 10497, 10610, 4, 2, 59, 108,
			10212, 10214, 1, 8807, 59, 1, 10892, 4, 3, 99, 109, 112, 10225, 10231,
			10244, 117, 116, 101, 59, 1, 501, 109, 97, 4, 2, 59, 100, 10239, 10241, 1,
			947, 59, 1, 989, 59, 1, 10886, 114, 101, 118, 101, 59, 1, 287, 4, 2, 105,
			121, 10260, 10265, 114, 99, 59, 1, 285, 59, 1, 1075, 111, 116, 59, 1, 289,
			4, 4, 59, 108, 113, 115, 10283, 10285, 10288, 10308, 1, 8805, 59, 1, 8923,
			4, 3, 59, 113, 115, 10296, 10298, 10301, 1, 8805, 59, 1, 8807, 108, 97,
			110, 116, 59, 1, 10878, 4, 4, 59, 99, 100, 108, 10318, 10320, 10324,
			10345, 1, 10878, 99, 59, 1, 10921, 111, 116, 4, 2, 59, 111, 10332, 10334,
			1, 10880, 4, 2, 59, 108, 10340, 10342, 1, 10882, 59, 1, 10884, 4, 2, 59,
			101, 10351, 10354, 3, 8923, 65024, 115, 59, 1, 10900, 114, 59, 3, 55349,
			56612, 4, 2, 59, 103, 10369, 10371, 1, 8811, 59, 1, 8921, 109, 101, 108,
			59, 1, 8503, 99, 121, 59, 1, 1107, 4, 4, 59, 69, 97, 106, 10395, 10397,
			10400, 10403, 1, 8823, 59, 1, 10898, 59, 1, 10917, 59, 1, 10916, 4, 4, 69,
			97, 101, 115, 10416, 10419, 10434, 10453, 59, 1, 8809, 112, 4, 2, 59, 112,
			10426, 10428, 1, 10890, 114, 111, 120, 59, 1, 10890, 4, 2, 59, 113, 10440,
			10442, 1, 10888, 4, 2, 59, 113, 10448, 10450, 1, 10888, 59, 1, 8809, 105,
			109, 59, 1, 8935, 112, 102, 59, 3, 55349, 56664, 97, 118, 101, 59, 1, 96,
			4, 2, 99, 105, 10476, 10480, 114, 59, 1, 8458, 109, 4, 3, 59, 101, 108,
			10489, 10491, 10494, 1, 8819, 59, 1, 10894, 59, 1, 10896, 5, 62, 6, 59,
			99, 100, 108, 113, 114, 10512, 10514, 10527, 10532, 10538, 10545, 1, 62,
			4, 2, 99, 105, 10520, 10523, 59, 1, 10919, 114, 59, 1, 10874, 111, 116,
			59, 1, 8919, 80, 97, 114, 59, 1, 10645, 117, 101, 115, 116, 59, 1, 10876,
			4, 5, 97, 100, 101, 108, 115, 10557, 10574, 10579, 10599, 10605, 4, 2,
			112, 114, 10563, 10570, 112, 114, 111, 120, 59, 1, 10886, 114, 59, 1,
			10616, 111, 116, 59, 1, 8919, 113, 4, 2, 108, 113, 10586, 10592, 101, 115,
			115, 59, 1, 8923, 108, 101, 115, 115, 59, 1, 10892, 101, 115, 115, 59, 1,
			8823, 105, 109, 59, 1, 8819, 4, 2, 101, 110, 10616, 10626, 114, 116, 110,
			101, 113, 113, 59, 3, 8809, 65024, 69, 59, 3, 8809, 65024, 4, 10, 65, 97,
			98, 99, 101, 102, 107, 111, 115, 121, 10653, 10658, 10713, 10718, 10724,
			10760, 10765, 10786, 10850, 10875, 114, 114, 59, 1, 8660, 4, 4, 105, 108,
			109, 114, 10668, 10674, 10678, 10684, 114, 115, 112, 59, 1, 8202, 102, 59,
			1, 189, 105, 108, 116, 59, 1, 8459, 4, 2, 100, 114, 10690, 10695, 99, 121,
			59, 1, 1098, 4, 3, 59, 99, 119, 10703, 10705, 10710, 1, 8596, 105, 114,
			59, 1, 10568, 59, 1, 8621, 97, 114, 59, 1, 8463, 105, 114, 99, 59, 1, 293,
			4, 3, 97, 108, 114, 10732, 10748, 10754, 114, 116, 115, 4, 2, 59, 117,
			10741, 10743, 1, 9829, 105, 116, 59, 1, 9829, 108, 105, 112, 59, 1, 8230,
			99, 111, 110, 59, 1, 8889, 114, 59, 3, 55349, 56613, 115, 4, 2, 101, 119,
			10772, 10779, 97, 114, 111, 119, 59, 1, 10533, 97, 114, 111, 119, 59, 1,
			10534, 4, 5, 97, 109, 111, 112, 114, 10798, 10803, 10809, 10839, 10844,
			114, 114, 59, 1, 8703, 116, 104, 116, 59, 1, 8763, 107, 4, 2, 108, 114,
			10816, 10827, 101, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8617, 105,
			103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8618, 102, 59, 3, 55349,
			56665, 98, 97, 114, 59, 1, 8213, 4, 3, 99, 108, 116, 10858, 10863, 10869,
			114, 59, 3, 55349, 56509, 97, 115, 104, 59, 1, 8463, 114, 111, 107, 59, 1,
			295, 4, 2, 98, 112, 10881, 10887, 117, 108, 108, 59, 1, 8259, 104, 101,
			110, 59, 1, 8208, 4, 15, 97, 99, 101, 102, 103, 105, 106, 109, 110, 111,
			112, 113, 115, 116, 117, 10925, 10936, 10958, 10977, 10990, 11001, 11039,
			11045, 11101, 11192, 11220, 11226, 11237, 11285, 11299, 99, 117, 116, 101,
			5, 237, 1, 59, 10934, 1, 237, 4, 3, 59, 105, 121, 10944, 10946, 10955, 1,
			8291, 114, 99, 5, 238, 1, 59, 10953, 1, 238, 59, 1, 1080, 4, 2, 99, 120,
			10964, 10968, 121, 59, 1, 1077, 99, 108, 5, 161, 1, 59, 10975, 1, 161, 4,
			2, 102, 114, 10983, 10986, 59, 1, 8660, 59, 3, 55349, 56614, 114, 97, 118,
			101, 5, 236, 1, 59, 10999, 1, 236, 4, 4, 59, 105, 110, 111, 11011, 11013,
			11028, 11034, 1, 8520, 4, 2, 105, 110, 11019, 11024, 110, 116, 59, 1,
			10764, 116, 59, 1, 8749, 102, 105, 110, 59, 1, 10716, 116, 97, 59, 1,
			8489, 108, 105, 103, 59, 1, 307, 4, 3, 97, 111, 112, 11053, 11092, 11096,
			4, 3, 99, 103, 116, 11061, 11065, 11088, 114, 59, 1, 299, 4, 3, 101, 108,
			112, 11073, 11076, 11082, 59, 1, 8465, 105, 110, 101, 59, 1, 8464, 97,
			114, 116, 59, 1, 8465, 104, 59, 1, 305, 102, 59, 1, 8887, 101, 100, 59, 1,
			437, 4, 5, 59, 99, 102, 111, 116, 11113, 11115, 11121, 11136, 11142, 1,
			8712, 97, 114, 101, 59, 1, 8453, 105, 110, 4, 2, 59, 116, 11129, 11131, 1,
			8734, 105, 101, 59, 1, 10717, 100, 111, 116, 59, 1, 305, 4, 5, 59, 99,
			101, 108, 112, 11154, 11156, 11161, 11179, 11186, 1, 8747, 97, 108, 59, 1,
			8890, 4, 2, 103, 114, 11167, 11173, 101, 114, 115, 59, 1, 8484, 99, 97,
			108, 59, 1, 8890, 97, 114, 104, 107, 59, 1, 10775, 114, 111, 100, 59, 1,
			10812, 4, 4, 99, 103, 112, 116, 11202, 11206, 11211, 11216, 121, 59, 1,
			1105, 111, 110, 59, 1, 303, 102, 59, 3, 55349, 56666, 97, 59, 1, 953, 114,
			111, 100, 59, 1, 10812, 117, 101, 115, 116, 5, 191, 1, 59, 11235, 1, 191,
			4, 2, 99, 105, 11243, 11248, 114, 59, 3, 55349, 56510, 110, 4, 5, 59, 69,
			100, 115, 118, 11261, 11263, 11266, 11271, 11282, 1, 8712, 59, 1, 8953,
			111, 116, 59, 1, 8949, 4, 2, 59, 118, 11277, 11279, 1, 8948, 59, 1, 8947,
			59, 1, 8712, 4, 2, 59, 105, 11291, 11293, 1, 8290, 108, 100, 101, 59, 1,
			297, 4, 2, 107, 109, 11305, 11310, 99, 121, 59, 1, 1110, 108, 5, 239, 1,
			59, 11316, 1, 239, 4, 6, 99, 102, 109, 111, 115, 117, 11332, 11346, 11351,
			11357, 11363, 11380, 4, 2, 105, 121, 11338, 11343, 114, 99, 59, 1, 309,
			59, 1, 1081, 114, 59, 3, 55349, 56615, 97, 116, 104, 59, 1, 567, 112, 102,
			59, 3, 55349, 56667, 4, 2, 99, 101, 11369, 11374, 114, 59, 3, 55349,
			56511, 114, 99, 121, 59, 1, 1112, 107, 99, 121, 59, 1, 1108, 4, 8, 97, 99,
			102, 103, 104, 106, 111, 115, 11404, 11418, 11433, 11438, 11445, 11450,
			11455, 11461, 112, 112, 97, 4, 2, 59, 118, 11413, 11415, 1, 954, 59, 1,
			1008, 4, 2, 101, 121, 11424, 11430, 100, 105, 108, 59, 1, 311, 59, 1,
			1082, 114, 59, 3, 55349, 56616, 114, 101, 101, 110, 59, 1, 312, 99, 121,
			59, 1, 1093, 99, 121, 59, 1, 1116, 112, 102, 59, 3, 55349, 56668, 99, 114,
			59, 3, 55349, 56512, 4, 23, 65, 66, 69, 72, 97, 98, 99, 100, 101, 102,
			103, 104, 106, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 11515,
			11538, 11544, 11555, 11560, 11721, 11780, 11818, 11868, 12136, 12160,
			12171, 12203, 12208, 12246, 12275, 12327, 12509, 12523, 12569, 12641,
			12732, 12752, 4, 3, 97, 114, 116, 11523, 11528, 11532, 114, 114, 59, 1,
			8666, 114, 59, 1, 8656, 97, 105, 108, 59, 1, 10523, 97, 114, 114, 59, 1,
			10510, 4, 2, 59, 103, 11550, 11552, 1, 8806, 59, 1, 10891, 97, 114, 59, 1,
			10594, 4, 9, 99, 101, 103, 109, 110, 112, 113, 114, 116, 11580, 11586,
			11594, 11600, 11606, 11624, 11627, 11636, 11694, 117, 116, 101, 59, 1,
			314, 109, 112, 116, 121, 118, 59, 1, 10676, 114, 97, 110, 59, 1, 8466, 98,
			100, 97, 59, 1, 955, 103, 4, 3, 59, 100, 108, 11615, 11617, 11620, 1,
			10216, 59, 1, 10641, 101, 59, 1, 10216, 59, 1, 10885, 117, 111, 5, 171, 1,
			59, 11634, 1, 171, 114, 4, 8, 59, 98, 102, 104, 108, 112, 115, 116, 11655,
			11657, 11669, 11673, 11677, 11681, 11685, 11690, 1, 8592, 4, 2, 59, 102,
			11663, 11665, 1, 8676, 115, 59, 1, 10527, 115, 59, 1, 10525, 107, 59, 1,
			8617, 112, 59, 1, 8619, 108, 59, 1, 10553, 105, 109, 59, 1, 10611, 108,
			59, 1, 8610, 4, 3, 59, 97, 101, 11702, 11704, 11709, 1, 10923, 105, 108,
			59, 1, 10521, 4, 2, 59, 115, 11715, 11717, 1, 10925, 59, 3, 10925, 65024,
			4, 3, 97, 98, 114, 11729, 11734, 11739, 114, 114, 59, 1, 10508, 114, 107,
			59, 1, 10098, 4, 2, 97, 107, 11745, 11758, 99, 4, 2, 101, 107, 11752,
			11755, 59, 1, 123, 59, 1, 91, 4, 2, 101, 115, 11764, 11767, 59, 1, 10635,
			108, 4, 2, 100, 117, 11774, 11777, 59, 1, 10639, 59, 1, 10637, 4, 4, 97,
			101, 117, 121, 11790, 11796, 11811, 11815, 114, 111, 110, 59, 1, 318, 4,
			2, 100, 105, 11802, 11807, 105, 108, 59, 1, 316, 108, 59, 1, 8968, 98, 59,
			1, 123, 59, 1, 1083, 4, 4, 99, 113, 114, 115, 11828, 11832, 11845, 11864,
			97, 59, 1, 10550, 117, 111, 4, 2, 59, 114, 11840, 11842, 1, 8220, 59, 1,
			8222, 4, 2, 100, 117, 11851, 11857, 104, 97, 114, 59, 1, 10599, 115, 104,
			97, 114, 59, 1, 10571, 104, 59, 1, 8626, 4, 5, 59, 102, 103, 113, 115,
			11880, 11882, 12008, 12011, 12031, 1, 8804, 116, 4, 5, 97, 104, 108, 114,
			116, 11895, 11913, 11935, 11947, 11996, 114, 114, 111, 119, 4, 2, 59, 116,
			11905, 11907, 1, 8592, 97, 105, 108, 59, 1, 8610, 97, 114, 112, 111, 111,
			110, 4, 2, 100, 117, 11925, 11931, 111, 119, 110, 59, 1, 8637, 112, 59, 1,
			8636, 101, 102, 116, 97, 114, 114, 111, 119, 115, 59, 1, 8647, 105, 103,
			104, 116, 4, 3, 97, 104, 115, 11959, 11974, 11984, 114, 114, 111, 119, 4,
			2, 59, 115, 11969, 11971, 1, 8596, 59, 1, 8646, 97, 114, 112, 111, 111,
			110, 115, 59, 1, 8651, 113, 117, 105, 103, 97, 114, 114, 111, 119, 59, 1,
			8621, 104, 114, 101, 101, 116, 105, 109, 101, 115, 59, 1, 8907, 59, 1,
			8922, 4, 3, 59, 113, 115, 12019, 12021, 12024, 1, 8804, 59, 1, 8806, 108,
			97, 110, 116, 59, 1, 10877, 4, 5, 59, 99, 100, 103, 115, 12043, 12045,
			12049, 12070, 12083, 1, 10877, 99, 59, 1, 10920, 111, 116, 4, 2, 59, 111,
			12057, 12059, 1, 10879, 4, 2, 59, 114, 12065, 12067, 1, 10881, 59, 1,
			10883, 4, 2, 59, 101, 12076, 12079, 3, 8922, 65024, 115, 59, 1, 10899, 4,
			5, 97, 100, 101, 103, 115, 12095, 12103, 12108, 12126, 12131, 112, 112,
			114, 111, 120, 59, 1, 10885, 111, 116, 59, 1, 8918, 113, 4, 2, 103, 113,
			12115, 12120, 116, 114, 59, 1, 8922, 103, 116, 114, 59, 1, 10891, 116,
			114, 59, 1, 8822, 105, 109, 59, 1, 8818, 4, 3, 105, 108, 114, 12144,
			12150, 12156, 115, 104, 116, 59, 1, 10620, 111, 111, 114, 59, 1, 8970, 59,
			3, 55349, 56617, 4, 2, 59, 69, 12166, 12168, 1, 8822, 59, 1, 10897, 4, 2,
			97, 98, 12177, 12198, 114, 4, 2, 100, 117, 12184, 12187, 59, 1, 8637, 4,
			2, 59, 108, 12193, 12195, 1, 8636, 59, 1, 10602, 108, 107, 59, 1, 9604,
			99, 121, 59, 1, 1113, 4, 5, 59, 97, 99, 104, 116, 12220, 12222, 12227,
			12235, 12241, 1, 8810, 114, 114, 59, 1, 8647, 111, 114, 110, 101, 114, 59,
			1, 8990, 97, 114, 100, 59, 1, 10603, 114, 105, 59, 1, 9722, 4, 2, 105,
			111, 12252, 12258, 100, 111, 116, 59, 1, 320, 117, 115, 116, 4, 2, 59, 97,
			12267, 12269, 1, 9136, 99, 104, 101, 59, 1, 9136, 4, 4, 69, 97, 101, 115,
			12285, 12288, 12303, 12322, 59, 1, 8808, 112, 4, 2, 59, 112, 12295, 12297,
			1, 10889, 114, 111, 120, 59, 1, 10889, 4, 2, 59, 113, 12309, 12311, 1,
			10887, 4, 2, 59, 113, 12317, 12319, 1, 10887, 59, 1, 8808, 105, 109, 59,
			1, 8934, 4, 8, 97, 98, 110, 111, 112, 116, 119, 122, 12345, 12359, 12364,
			12421, 12446, 12467, 12474, 12490, 4, 2, 110, 114, 12351, 12355, 103, 59,
			1, 10220, 114, 59, 1, 8701, 114, 107, 59, 1, 10214, 103, 4, 3, 108, 109,
			114, 12373, 12401, 12409, 101, 102, 116, 4, 2, 97, 114, 12382, 12389, 114,
			114, 111, 119, 59, 1, 10229, 105, 103, 104, 116, 97, 114, 114, 111, 119,
			59, 1, 10231, 97, 112, 115, 116, 111, 59, 1, 10236, 105, 103, 104, 116,
			97, 114, 114, 111, 119, 59, 1, 10230, 112, 97, 114, 114, 111, 119, 4, 2,
			108, 114, 12433, 12439, 101, 102, 116, 59, 1, 8619, 105, 103, 104, 116,
			59, 1, 8620, 4, 3, 97, 102, 108, 12454, 12458, 12462, 114, 59, 1, 10629,
			59, 3, 55349, 56669, 117, 115, 59, 1, 10797, 105, 109, 101, 115, 59, 1,
			10804, 4, 2, 97, 98, 12480, 12485, 115, 116, 59, 1, 8727, 97, 114, 59, 1,
			95, 4, 3, 59, 101, 102, 12498, 12500, 12506, 1, 9674, 110, 103, 101, 59,
			1, 9674, 59, 1, 10731, 97, 114, 4, 2, 59, 108, 12517, 12519, 1, 40, 116,
			59, 1, 10643, 4, 5, 97, 99, 104, 109, 116, 12535, 12540, 12548, 12561,
			12564, 114, 114, 59, 1, 8646, 111, 114, 110, 101, 114, 59, 1, 8991, 97,
			114, 4, 2, 59, 100, 12556, 12558, 1, 8651, 59, 1, 10605, 59, 1, 8206, 114,
			105, 59, 1, 8895, 4, 6, 97, 99, 104, 105, 113, 116, 12583, 12589, 12594,
			12597, 12614, 12635, 113, 117, 111, 59, 1, 8249, 114, 59, 3, 55349, 56513,
			59, 1, 8624, 109, 4, 3, 59, 101, 103, 12606, 12608, 12611, 1, 8818, 59, 1,
			10893, 59, 1, 10895, 4, 2, 98, 117, 12620, 12623, 59, 1, 91, 111, 4, 2,
			59, 114, 12630, 12632, 1, 8216, 59, 1, 8218, 114, 111, 107, 59, 1, 322, 5,
			60, 8, 59, 99, 100, 104, 105, 108, 113, 114, 12660, 12662, 12675, 12680,
			12686, 12692, 12698, 12705, 1, 60, 4, 2, 99, 105, 12668, 12671, 59, 1,
			10918, 114, 59, 1, 10873, 111, 116, 59, 1, 8918, 114, 101, 101, 59, 1,
			8907, 109, 101, 115, 59, 1, 8905, 97, 114, 114, 59, 1, 10614, 117, 101,
			115, 116, 59, 1, 10875, 4, 2, 80, 105, 12711, 12716, 97, 114, 59, 1,
			10646, 4, 3, 59, 101, 102, 12724, 12726, 12729, 1, 9667, 59, 1, 8884, 59,
			1, 9666, 114, 4, 2, 100, 117, 12739, 12746, 115, 104, 97, 114, 59, 1,
			10570, 104, 97, 114, 59, 1, 10598, 4, 2, 101, 110, 12758, 12768, 114, 116,
			110, 101, 113, 113, 59, 3, 8808, 65024, 69, 59, 3, 8808, 65024, 4, 14, 68,
			97, 99, 100, 101, 102, 104, 105, 108, 110, 111, 112, 115, 117, 12803,
			12809, 12893, 12908, 12914, 12928, 12933, 12937, 13011, 13025, 13032,
			13049, 13052, 13069, 68, 111, 116, 59, 1, 8762, 4, 4, 99, 108, 112, 114,
			12819, 12827, 12849, 12887, 114, 5, 175, 1, 59, 12825, 1, 175, 4, 2, 101,
			116, 12833, 12836, 59, 1, 9794, 4, 2, 59, 101, 12842, 12844, 1, 10016,
			115, 101, 59, 1, 10016, 4, 2, 59, 115, 12855, 12857, 1, 8614, 116, 111, 4,
			4, 59, 100, 108, 117, 12869, 12871, 12877, 12883, 1, 8614, 111, 119, 110,
			59, 1, 8615, 101, 102, 116, 59, 1, 8612, 112, 59, 1, 8613, 107, 101, 114,
			59, 1, 9646, 4, 2, 111, 121, 12899, 12905, 109, 109, 97, 59, 1, 10793, 59,
			1, 1084, 97, 115, 104, 59, 1, 8212, 97, 115, 117, 114, 101, 100, 97, 110,
			103, 108, 101, 59, 1, 8737, 114, 59, 3, 55349, 56618, 111, 59, 1, 8487, 4,
			3, 99, 100, 110, 12945, 12954, 12985, 114, 111, 5, 181, 1, 59, 12952, 1,
			181, 4, 4, 59, 97, 99, 100, 12964, 12966, 12971, 12976, 1, 8739, 115, 116,
			59, 1, 42, 105, 114, 59, 1, 10992, 111, 116, 5, 183, 1, 59, 12983, 1, 183,
			117, 115, 4, 3, 59, 98, 100, 12995, 12997, 13e3, 1, 8722, 59, 1, 8863, 4,
			2, 59, 117, 13006, 13008, 1, 8760, 59, 1, 10794, 4, 2, 99, 100, 13017,
			13021, 112, 59, 1, 10971, 114, 59, 1, 8230, 112, 108, 117, 115, 59, 1,
			8723, 4, 2, 100, 112, 13038, 13044, 101, 108, 115, 59, 1, 8871, 102, 59,
			3, 55349, 56670, 59, 1, 8723, 4, 2, 99, 116, 13058, 13063, 114, 59, 3,
			55349, 56514, 112, 111, 115, 59, 1, 8766, 4, 3, 59, 108, 109, 13077,
			13079, 13087, 1, 956, 116, 105, 109, 97, 112, 59, 1, 8888, 97, 112, 59, 1,
			8888, 4, 24, 71, 76, 82, 86, 97, 98, 99, 100, 101, 102, 103, 104, 105,
			106, 108, 109, 111, 112, 114, 115, 116, 117, 118, 119, 13142, 13165,
			13217, 13229, 13247, 13330, 13359, 13414, 13420, 13508, 13513, 13579,
			13602, 13626, 13631, 13762, 13767, 13855, 13936, 13995, 14214, 14285,
			14312, 14432, 4, 2, 103, 116, 13148, 13152, 59, 3, 8921, 824, 4, 2, 59,
			118, 13158, 13161, 3, 8811, 8402, 59, 3, 8811, 824, 4, 3, 101, 108, 116,
			13173, 13200, 13204, 102, 116, 4, 2, 97, 114, 13181, 13188, 114, 114, 111,
			119, 59, 1, 8653, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8654,
			59, 3, 8920, 824, 4, 2, 59, 118, 13210, 13213, 3, 8810, 8402, 59, 3, 8810,
			824, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8655, 4, 2, 68,
			100, 13235, 13241, 97, 115, 104, 59, 1, 8879, 97, 115, 104, 59, 1, 8878,
			4, 5, 98, 99, 110, 112, 116, 13259, 13264, 13270, 13275, 13308, 108, 97,
			59, 1, 8711, 117, 116, 101, 59, 1, 324, 103, 59, 3, 8736, 8402, 4, 5, 59,
			69, 105, 111, 112, 13287, 13289, 13293, 13298, 13302, 1, 8777, 59, 3,
			10864, 824, 100, 59, 3, 8779, 824, 115, 59, 1, 329, 114, 111, 120, 59, 1,
			8777, 117, 114, 4, 2, 59, 97, 13316, 13318, 1, 9838, 108, 4, 2, 59, 115,
			13325, 13327, 1, 9838, 59, 1, 8469, 4, 2, 115, 117, 13336, 13344, 112, 5,
			160, 1, 59, 13342, 1, 160, 109, 112, 4, 2, 59, 101, 13352, 13355, 3, 8782,
			824, 59, 3, 8783, 824, 4, 5, 97, 101, 111, 117, 121, 13371, 13385, 13391,
			13407, 13411, 4, 2, 112, 114, 13377, 13380, 59, 1, 10819, 111, 110, 59, 1,
			328, 100, 105, 108, 59, 1, 326, 110, 103, 4, 2, 59, 100, 13399, 13401, 1,
			8775, 111, 116, 59, 3, 10861, 824, 112, 59, 1, 10818, 59, 1, 1085, 97,
			115, 104, 59, 1, 8211, 4, 7, 59, 65, 97, 100, 113, 115, 120, 13436, 13438,
			13443, 13466, 13472, 13478, 13494, 1, 8800, 114, 114, 59, 1, 8663, 114, 4,
			2, 104, 114, 13450, 13454, 107, 59, 1, 10532, 4, 2, 59, 111, 13460, 13462,
			1, 8599, 119, 59, 1, 8599, 111, 116, 59, 3, 8784, 824, 117, 105, 118, 59,
			1, 8802, 4, 2, 101, 105, 13484, 13489, 97, 114, 59, 1, 10536, 109, 59, 3,
			8770, 824, 105, 115, 116, 4, 2, 59, 115, 13503, 13505, 1, 8708, 59, 1,
			8708, 114, 59, 3, 55349, 56619, 4, 4, 69, 101, 115, 116, 13523, 13527,
			13563, 13568, 59, 3, 8807, 824, 4, 3, 59, 113, 115, 13535, 13537, 13559,
			1, 8817, 4, 3, 59, 113, 115, 13545, 13547, 13551, 1, 8817, 59, 3, 8807,
			824, 108, 97, 110, 116, 59, 3, 10878, 824, 59, 3, 10878, 824, 105, 109,
			59, 1, 8821, 4, 2, 59, 114, 13574, 13576, 1, 8815, 59, 1, 8815, 4, 3, 65,
			97, 112, 13587, 13592, 13597, 114, 114, 59, 1, 8654, 114, 114, 59, 1,
			8622, 97, 114, 59, 1, 10994, 4, 3, 59, 115, 118, 13610, 13612, 13623, 1,
			8715, 4, 2, 59, 100, 13618, 13620, 1, 8956, 59, 1, 8954, 59, 1, 8715, 99,
			121, 59, 1, 1114, 4, 7, 65, 69, 97, 100, 101, 115, 116, 13647, 13652,
			13656, 13661, 13665, 13737, 13742, 114, 114, 59, 1, 8653, 59, 3, 8806,
			824, 114, 114, 59, 1, 8602, 114, 59, 1, 8229, 4, 4, 59, 102, 113, 115,
			13675, 13677, 13703, 13725, 1, 8816, 116, 4, 2, 97, 114, 13684, 13691,
			114, 114, 111, 119, 59, 1, 8602, 105, 103, 104, 116, 97, 114, 114, 111,
			119, 59, 1, 8622, 4, 3, 59, 113, 115, 13711, 13713, 13717, 1, 8816, 59, 3,
			8806, 824, 108, 97, 110, 116, 59, 3, 10877, 824, 4, 2, 59, 115, 13731,
			13734, 3, 10877, 824, 59, 1, 8814, 105, 109, 59, 1, 8820, 4, 2, 59, 114,
			13748, 13750, 1, 8814, 105, 4, 2, 59, 101, 13757, 13759, 1, 8938, 59, 1,
			8940, 105, 100, 59, 1, 8740, 4, 2, 112, 116, 13773, 13778, 102, 59, 3,
			55349, 56671, 5, 172, 3, 59, 105, 110, 13787, 13789, 13829, 1, 172, 110,
			4, 4, 59, 69, 100, 118, 13800, 13802, 13806, 13812, 1, 8713, 59, 3, 8953,
			824, 111, 116, 59, 3, 8949, 824, 4, 3, 97, 98, 99, 13820, 13823, 13826,
			59, 1, 8713, 59, 1, 8951, 59, 1, 8950, 105, 4, 2, 59, 118, 13836, 13838,
			1, 8716, 4, 3, 97, 98, 99, 13846, 13849, 13852, 59, 1, 8716, 59, 1, 8958,
			59, 1, 8957, 4, 3, 97, 111, 114, 13863, 13892, 13899, 114, 4, 4, 59, 97,
			115, 116, 13874, 13876, 13883, 13888, 1, 8742, 108, 108, 101, 108, 59, 1,
			8742, 108, 59, 3, 11005, 8421, 59, 3, 8706, 824, 108, 105, 110, 116, 59,
			1, 10772, 4, 3, 59, 99, 101, 13907, 13909, 13914, 1, 8832, 117, 101, 59,
			1, 8928, 4, 2, 59, 99, 13920, 13923, 3, 10927, 824, 4, 2, 59, 101, 13929,
			13931, 1, 8832, 113, 59, 3, 10927, 824, 4, 4, 65, 97, 105, 116, 13946,
			13951, 13971, 13982, 114, 114, 59, 1, 8655, 114, 114, 4, 3, 59, 99, 119,
			13961, 13963, 13967, 1, 8603, 59, 3, 10547, 824, 59, 3, 8605, 824, 103,
			104, 116, 97, 114, 114, 111, 119, 59, 1, 8603, 114, 105, 4, 2, 59, 101,
			13990, 13992, 1, 8939, 59, 1, 8941, 4, 7, 99, 104, 105, 109, 112, 113,
			117, 14011, 14036, 14060, 14080, 14085, 14090, 14106, 4, 4, 59, 99, 101,
			114, 14021, 14023, 14028, 14032, 1, 8833, 117, 101, 59, 1, 8929, 59, 3,
			10928, 824, 59, 3, 55349, 56515, 111, 114, 116, 4, 2, 109, 112, 14045,
			14050, 105, 100, 59, 1, 8740, 97, 114, 97, 108, 108, 101, 108, 59, 1,
			8742, 109, 4, 2, 59, 101, 14067, 14069, 1, 8769, 4, 2, 59, 113, 14075,
			14077, 1, 8772, 59, 1, 8772, 105, 100, 59, 1, 8740, 97, 114, 59, 1, 8742,
			115, 117, 4, 2, 98, 112, 14098, 14102, 101, 59, 1, 8930, 101, 59, 1, 8931,
			4, 3, 98, 99, 112, 14114, 14157, 14171, 4, 4, 59, 69, 101, 115, 14124,
			14126, 14130, 14133, 1, 8836, 59, 3, 10949, 824, 59, 1, 8840, 101, 116, 4,
			2, 59, 101, 14141, 14144, 3, 8834, 8402, 113, 4, 2, 59, 113, 14151, 14153,
			1, 8840, 59, 3, 10949, 824, 99, 4, 2, 59, 101, 14164, 14166, 1, 8833, 113,
			59, 3, 10928, 824, 4, 4, 59, 69, 101, 115, 14181, 14183, 14187, 14190, 1,
			8837, 59, 3, 10950, 824, 59, 1, 8841, 101, 116, 4, 2, 59, 101, 14198,
			14201, 3, 8835, 8402, 113, 4, 2, 59, 113, 14208, 14210, 1, 8841, 59, 3,
			10950, 824, 4, 4, 103, 105, 108, 114, 14224, 14228, 14238, 14242, 108, 59,
			1, 8825, 108, 100, 101, 5, 241, 1, 59, 14236, 1, 241, 103, 59, 1, 8824,
			105, 97, 110, 103, 108, 101, 4, 2, 108, 114, 14254, 14269, 101, 102, 116,
			4, 2, 59, 101, 14263, 14265, 1, 8938, 113, 59, 1, 8940, 105, 103, 104,
			116, 4, 2, 59, 101, 14279, 14281, 1, 8939, 113, 59, 1, 8941, 4, 2, 59,
			109, 14291, 14293, 1, 957, 4, 3, 59, 101, 115, 14301, 14303, 14308, 1, 35,
			114, 111, 59, 1, 8470, 112, 59, 1, 8199, 4, 9, 68, 72, 97, 100, 103, 105,
			108, 114, 115, 14332, 14338, 14344, 14349, 14355, 14369, 14376, 14408,
			14426, 97, 115, 104, 59, 1, 8877, 97, 114, 114, 59, 1, 10500, 112, 59, 3,
			8781, 8402, 97, 115, 104, 59, 1, 8876, 4, 2, 101, 116, 14361, 14365, 59,
			3, 8805, 8402, 59, 3, 62, 8402, 110, 102, 105, 110, 59, 1, 10718, 4, 3,
			65, 101, 116, 14384, 14389, 14393, 114, 114, 59, 1, 10498, 59, 3, 8804,
			8402, 4, 2, 59, 114, 14399, 14402, 3, 60, 8402, 105, 101, 59, 3, 8884,
			8402, 4, 2, 65, 116, 14414, 14419, 114, 114, 59, 1, 10499, 114, 105, 101,
			59, 3, 8885, 8402, 105, 109, 59, 3, 8764, 8402, 4, 3, 65, 97, 110, 14440,
			14445, 14468, 114, 114, 59, 1, 8662, 114, 4, 2, 104, 114, 14452, 14456,
			107, 59, 1, 10531, 4, 2, 59, 111, 14462, 14464, 1, 8598, 119, 59, 1, 8598,
			101, 97, 114, 59, 1, 10535, 4, 18, 83, 97, 99, 100, 101, 102, 103, 104,
			105, 108, 109, 111, 112, 114, 115, 116, 117, 118, 14512, 14515, 14535,
			14560, 14597, 14603, 14618, 14643, 14657, 14662, 14701, 14741, 14747,
			14769, 14851, 14877, 14907, 14916, 59, 1, 9416, 4, 2, 99, 115, 14521,
			14531, 117, 116, 101, 5, 243, 1, 59, 14529, 1, 243, 116, 59, 1, 8859, 4,
			2, 105, 121, 14541, 14557, 114, 4, 2, 59, 99, 14548, 14550, 1, 8858, 5,
			244, 1, 59, 14555, 1, 244, 59, 1, 1086, 4, 5, 97, 98, 105, 111, 115,
			14572, 14577, 14583, 14587, 14591, 115, 104, 59, 1, 8861, 108, 97, 99, 59,
			1, 337, 118, 59, 1, 10808, 116, 59, 1, 8857, 111, 108, 100, 59, 1, 10684,
			108, 105, 103, 59, 1, 339, 4, 2, 99, 114, 14609, 14614, 105, 114, 59, 1,
			10687, 59, 3, 55349, 56620, 4, 3, 111, 114, 116, 14626, 14630, 14640, 110,
			59, 1, 731, 97, 118, 101, 5, 242, 1, 59, 14638, 1, 242, 59, 1, 10689, 4,
			2, 98, 109, 14649, 14654, 97, 114, 59, 1, 10677, 59, 1, 937, 110, 116, 59,
			1, 8750, 4, 4, 97, 99, 105, 116, 14672, 14677, 14693, 14698, 114, 114, 59,
			1, 8634, 4, 2, 105, 114, 14683, 14687, 114, 59, 1, 10686, 111, 115, 115,
			59, 1, 10683, 110, 101, 59, 1, 8254, 59, 1, 10688, 4, 3, 97, 101, 105,
			14709, 14714, 14719, 99, 114, 59, 1, 333, 103, 97, 59, 1, 969, 4, 3, 99,
			100, 110, 14727, 14733, 14736, 114, 111, 110, 59, 1, 959, 59, 1, 10678,
			117, 115, 59, 1, 8854, 112, 102, 59, 3, 55349, 56672, 4, 3, 97, 101, 108,
			14755, 14759, 14764, 114, 59, 1, 10679, 114, 112, 59, 1, 10681, 117, 115,
			59, 1, 8853, 4, 7, 59, 97, 100, 105, 111, 115, 118, 14785, 14787, 14792,
			14831, 14837, 14841, 14848, 1, 8744, 114, 114, 59, 1, 8635, 4, 4, 59, 101,
			102, 109, 14802, 14804, 14817, 14824, 1, 10845, 114, 4, 2, 59, 111, 14811,
			14813, 1, 8500, 102, 59, 1, 8500, 5, 170, 1, 59, 14822, 1, 170, 5, 186, 1,
			59, 14829, 1, 186, 103, 111, 102, 59, 1, 8886, 114, 59, 1, 10838, 108,
			111, 112, 101, 59, 1, 10839, 59, 1, 10843, 4, 3, 99, 108, 111, 14859,
			14863, 14873, 114, 59, 1, 8500, 97, 115, 104, 5, 248, 1, 59, 14871, 1,
			248, 108, 59, 1, 8856, 105, 4, 2, 108, 109, 14884, 14893, 100, 101, 5,
			245, 1, 59, 14891, 1, 245, 101, 115, 4, 2, 59, 97, 14901, 14903, 1, 8855,
			115, 59, 1, 10806, 109, 108, 5, 246, 1, 59, 14914, 1, 246, 98, 97, 114,
			59, 1, 9021, 4, 12, 97, 99, 101, 102, 104, 105, 108, 109, 111, 114, 115,
			117, 14948, 14992, 14996, 15033, 15038, 15068, 15090, 15189, 15192, 15222,
			15427, 15441, 114, 4, 4, 59, 97, 115, 116, 14959, 14961, 14976, 14989, 1,
			8741, 5, 182, 2, 59, 108, 14968, 14970, 1, 182, 108, 101, 108, 59, 1,
			8741, 4, 2, 105, 108, 14982, 14986, 109, 59, 1, 10995, 59, 1, 11005, 59,
			1, 8706, 121, 59, 1, 1087, 114, 4, 5, 99, 105, 109, 112, 116, 15009,
			15014, 15019, 15024, 15027, 110, 116, 59, 1, 37, 111, 100, 59, 1, 46, 105,
			108, 59, 1, 8240, 59, 1, 8869, 101, 110, 107, 59, 1, 8241, 114, 59, 3,
			55349, 56621, 4, 3, 105, 109, 111, 15046, 15057, 15063, 4, 2, 59, 118,
			15052, 15054, 1, 966, 59, 1, 981, 109, 97, 116, 59, 1, 8499, 110, 101, 59,
			1, 9742, 4, 3, 59, 116, 118, 15076, 15078, 15087, 1, 960, 99, 104, 102,
			111, 114, 107, 59, 1, 8916, 59, 1, 982, 4, 2, 97, 117, 15096, 15119, 110,
			4, 2, 99, 107, 15103, 15115, 107, 4, 2, 59, 104, 15110, 15112, 1, 8463,
			59, 1, 8462, 118, 59, 1, 8463, 115, 4, 9, 59, 97, 98, 99, 100, 101, 109,
			115, 116, 15140, 15142, 15148, 15151, 15156, 15168, 15171, 15179, 15184,
			1, 43, 99, 105, 114, 59, 1, 10787, 59, 1, 8862, 105, 114, 59, 1, 10786, 4,
			2, 111, 117, 15162, 15165, 59, 1, 8724, 59, 1, 10789, 59, 1, 10866, 110,
			5, 177, 1, 59, 15177, 1, 177, 105, 109, 59, 1, 10790, 119, 111, 59, 1,
			10791, 59, 1, 177, 4, 3, 105, 112, 117, 15200, 15208, 15213, 110, 116,
			105, 110, 116, 59, 1, 10773, 102, 59, 3, 55349, 56673, 110, 100, 5, 163,
			1, 59, 15220, 1, 163, 4, 10, 59, 69, 97, 99, 101, 105, 110, 111, 115, 117,
			15244, 15246, 15249, 15253, 15258, 15334, 15347, 15367, 15416, 15421, 1,
			8826, 59, 1, 10931, 112, 59, 1, 10935, 117, 101, 59, 1, 8828, 4, 2, 59,
			99, 15264, 15266, 1, 10927, 4, 6, 59, 97, 99, 101, 110, 115, 15280, 15282,
			15290, 15299, 15303, 15329, 1, 8826, 112, 112, 114, 111, 120, 59, 1,
			10935, 117, 114, 108, 121, 101, 113, 59, 1, 8828, 113, 59, 1, 10927, 4, 3,
			97, 101, 115, 15311, 15319, 15324, 112, 112, 114, 111, 120, 59, 1, 10937,
			113, 113, 59, 1, 10933, 105, 109, 59, 1, 8936, 105, 109, 59, 1, 8830, 109,
			101, 4, 2, 59, 115, 15342, 15344, 1, 8242, 59, 1, 8473, 4, 3, 69, 97, 115,
			15355, 15358, 15362, 59, 1, 10933, 112, 59, 1, 10937, 105, 109, 59, 1,
			8936, 4, 3, 100, 102, 112, 15375, 15378, 15404, 59, 1, 8719, 4, 3, 97,
			108, 115, 15386, 15392, 15398, 108, 97, 114, 59, 1, 9006, 105, 110, 101,
			59, 1, 8978, 117, 114, 102, 59, 1, 8979, 4, 2, 59, 116, 15410, 15412, 1,
			8733, 111, 59, 1, 8733, 105, 109, 59, 1, 8830, 114, 101, 108, 59, 1, 8880,
			4, 2, 99, 105, 15433, 15438, 114, 59, 3, 55349, 56517, 59, 1, 968, 110,
			99, 115, 112, 59, 1, 8200, 4, 6, 102, 105, 111, 112, 115, 117, 15462,
			15467, 15472, 15478, 15485, 15491, 114, 59, 3, 55349, 56622, 110, 116, 59,
			1, 10764, 112, 102, 59, 3, 55349, 56674, 114, 105, 109, 101, 59, 1, 8279,
			99, 114, 59, 3, 55349, 56518, 4, 3, 97, 101, 111, 15499, 15520, 15534,
			116, 4, 2, 101, 105, 15506, 15515, 114, 110, 105, 111, 110, 115, 59, 1,
			8461, 110, 116, 59, 1, 10774, 115, 116, 4, 2, 59, 101, 15528, 15530, 1,
			63, 113, 59, 1, 8799, 116, 5, 34, 1, 59, 15540, 1, 34, 4, 21, 65, 66, 72,
			97, 98, 99, 100, 101, 102, 104, 105, 108, 109, 110, 111, 112, 114, 115,
			116, 117, 120, 15586, 15609, 15615, 15620, 15796, 15855, 15893, 15931,
			15977, 16001, 16039, 16183, 16204, 16222, 16228, 16285, 16312, 16318,
			16363, 16408, 16416, 4, 3, 97, 114, 116, 15594, 15599, 15603, 114, 114,
			59, 1, 8667, 114, 59, 1, 8658, 97, 105, 108, 59, 1, 10524, 97, 114, 114,
			59, 1, 10511, 97, 114, 59, 1, 10596, 4, 7, 99, 100, 101, 110, 113, 114,
			116, 15636, 15651, 15656, 15664, 15687, 15696, 15770, 4, 2, 101, 117,
			15642, 15646, 59, 3, 8765, 817, 116, 101, 59, 1, 341, 105, 99, 59, 1,
			8730, 109, 112, 116, 121, 118, 59, 1, 10675, 103, 4, 4, 59, 100, 101, 108,
			15675, 15677, 15680, 15683, 1, 10217, 59, 1, 10642, 59, 1, 10661, 101, 59,
			1, 10217, 117, 111, 5, 187, 1, 59, 15694, 1, 187, 114, 4, 11, 59, 97, 98,
			99, 102, 104, 108, 112, 115, 116, 119, 15721, 15723, 15727, 15739, 15742,
			15746, 15750, 15754, 15758, 15763, 15767, 1, 8594, 112, 59, 1, 10613, 4,
			2, 59, 102, 15733, 15735, 1, 8677, 115, 59, 1, 10528, 59, 1, 10547, 115,
			59, 1, 10526, 107, 59, 1, 8618, 112, 59, 1, 8620, 108, 59, 1, 10565, 105,
			109, 59, 1, 10612, 108, 59, 1, 8611, 59, 1, 8605, 4, 2, 97, 105, 15776,
			15781, 105, 108, 59, 1, 10522, 111, 4, 2, 59, 110, 15788, 15790, 1, 8758,
			97, 108, 115, 59, 1, 8474, 4, 3, 97, 98, 114, 15804, 15809, 15814, 114,
			114, 59, 1, 10509, 114, 107, 59, 1, 10099, 4, 2, 97, 107, 15820, 15833,
			99, 4, 2, 101, 107, 15827, 15830, 59, 1, 125, 59, 1, 93, 4, 2, 101, 115,
			15839, 15842, 59, 1, 10636, 108, 4, 2, 100, 117, 15849, 15852, 59, 1,
			10638, 59, 1, 10640, 4, 4, 97, 101, 117, 121, 15865, 15871, 15886, 15890,
			114, 111, 110, 59, 1, 345, 4, 2, 100, 105, 15877, 15882, 105, 108, 59, 1,
			343, 108, 59, 1, 8969, 98, 59, 1, 125, 59, 1, 1088, 4, 4, 99, 108, 113,
			115, 15903, 15907, 15914, 15927, 97, 59, 1, 10551, 100, 104, 97, 114, 59,
			1, 10601, 117, 111, 4, 2, 59, 114, 15922, 15924, 1, 8221, 59, 1, 8221,
			104, 59, 1, 8627, 4, 3, 97, 99, 103, 15939, 15966, 15970, 108, 4, 4, 59,
			105, 112, 115, 15950, 15952, 15957, 15963, 1, 8476, 110, 101, 59, 1, 8475,
			97, 114, 116, 59, 1, 8476, 59, 1, 8477, 116, 59, 1, 9645, 5, 174, 1, 59,
			15975, 1, 174, 4, 3, 105, 108, 114, 15985, 15991, 15997, 115, 104, 116,
			59, 1, 10621, 111, 111, 114, 59, 1, 8971, 59, 3, 55349, 56623, 4, 2, 97,
			111, 16007, 16028, 114, 4, 2, 100, 117, 16014, 16017, 59, 1, 8641, 4, 2,
			59, 108, 16023, 16025, 1, 8640, 59, 1, 10604, 4, 2, 59, 118, 16034, 16036,
			1, 961, 59, 1, 1009, 4, 3, 103, 110, 115, 16047, 16167, 16171, 104, 116,
			4, 6, 97, 104, 108, 114, 115, 116, 16063, 16081, 16103, 16130, 16143,
			16155, 114, 114, 111, 119, 4, 2, 59, 116, 16073, 16075, 1, 8594, 97, 105,
			108, 59, 1, 8611, 97, 114, 112, 111, 111, 110, 4, 2, 100, 117, 16093,
			16099, 111, 119, 110, 59, 1, 8641, 112, 59, 1, 8640, 101, 102, 116, 4, 2,
			97, 104, 16112, 16120, 114, 114, 111, 119, 115, 59, 1, 8644, 97, 114, 112,
			111, 111, 110, 115, 59, 1, 8652, 105, 103, 104, 116, 97, 114, 114, 111,
			119, 115, 59, 1, 8649, 113, 117, 105, 103, 97, 114, 114, 111, 119, 59, 1,
			8605, 104, 114, 101, 101, 116, 105, 109, 101, 115, 59, 1, 8908, 103, 59,
			1, 730, 105, 110, 103, 100, 111, 116, 115, 101, 113, 59, 1, 8787, 4, 3,
			97, 104, 109, 16191, 16196, 16201, 114, 114, 59, 1, 8644, 97, 114, 59, 1,
			8652, 59, 1, 8207, 111, 117, 115, 116, 4, 2, 59, 97, 16214, 16216, 1,
			9137, 99, 104, 101, 59, 1, 9137, 109, 105, 100, 59, 1, 10990, 4, 4, 97,
			98, 112, 116, 16238, 16252, 16257, 16278, 4, 2, 110, 114, 16244, 16248,
			103, 59, 1, 10221, 114, 59, 1, 8702, 114, 107, 59, 1, 10215, 4, 3, 97,
			102, 108, 16265, 16269, 16273, 114, 59, 1, 10630, 59, 3, 55349, 56675,
			117, 115, 59, 1, 10798, 105, 109, 101, 115, 59, 1, 10805, 4, 2, 97, 112,
			16291, 16304, 114, 4, 2, 59, 103, 16298, 16300, 1, 41, 116, 59, 1, 10644,
			111, 108, 105, 110, 116, 59, 1, 10770, 97, 114, 114, 59, 1, 8649, 4, 4,
			97, 99, 104, 113, 16328, 16334, 16339, 16342, 113, 117, 111, 59, 1, 8250,
			114, 59, 3, 55349, 56519, 59, 1, 8625, 4, 2, 98, 117, 16348, 16351, 59, 1,
			93, 111, 4, 2, 59, 114, 16358, 16360, 1, 8217, 59, 1, 8217, 4, 3, 104,
			105, 114, 16371, 16377, 16383, 114, 101, 101, 59, 1, 8908, 109, 101, 115,
			59, 1, 8906, 105, 4, 4, 59, 101, 102, 108, 16394, 16396, 16399, 16402, 1,
			9657, 59, 1, 8885, 59, 1, 9656, 116, 114, 105, 59, 1, 10702, 108, 117,
			104, 97, 114, 59, 1, 10600, 59, 1, 8478, 4, 19, 97, 98, 99, 100, 101, 102,
			104, 105, 108, 109, 111, 112, 113, 114, 115, 116, 117, 119, 122, 16459,
			16466, 16472, 16572, 16590, 16672, 16687, 16746, 16844, 16850, 16924,
			16963, 16988, 17115, 17121, 17154, 17206, 17614, 17656, 99, 117, 116, 101,
			59, 1, 347, 113, 117, 111, 59, 1, 8218, 4, 10, 59, 69, 97, 99, 101, 105,
			110, 112, 115, 121, 16494, 16496, 16499, 16513, 16518, 16531, 16536,
			16556, 16564, 16569, 1, 8827, 59, 1, 10932, 4, 2, 112, 114, 16505, 16508,
			59, 1, 10936, 111, 110, 59, 1, 353, 117, 101, 59, 1, 8829, 4, 2, 59, 100,
			16524, 16526, 1, 10928, 105, 108, 59, 1, 351, 114, 99, 59, 1, 349, 4, 3,
			69, 97, 115, 16544, 16547, 16551, 59, 1, 10934, 112, 59, 1, 10938, 105,
			109, 59, 1, 8937, 111, 108, 105, 110, 116, 59, 1, 10771, 105, 109, 59, 1,
			8831, 59, 1, 1089, 111, 116, 4, 3, 59, 98, 101, 16582, 16584, 16587, 1,
			8901, 59, 1, 8865, 59, 1, 10854, 4, 7, 65, 97, 99, 109, 115, 116, 120,
			16606, 16611, 16634, 16642, 16646, 16652, 16668, 114, 114, 59, 1, 8664,
			114, 4, 2, 104, 114, 16618, 16622, 107, 59, 1, 10533, 4, 2, 59, 111,
			16628, 16630, 1, 8600, 119, 59, 1, 8600, 116, 5, 167, 1, 59, 16640, 1,
			167, 105, 59, 1, 59, 119, 97, 114, 59, 1, 10537, 109, 4, 2, 105, 110,
			16659, 16665, 110, 117, 115, 59, 1, 8726, 59, 1, 8726, 116, 59, 1, 10038,
			114, 4, 2, 59, 111, 16679, 16682, 3, 55349, 56624, 119, 110, 59, 1, 8994,
			4, 4, 97, 99, 111, 121, 16697, 16702, 16716, 16739, 114, 112, 59, 1, 9839,
			4, 2, 104, 121, 16708, 16713, 99, 121, 59, 1, 1097, 59, 1, 1096, 114, 116,
			4, 2, 109, 112, 16724, 16729, 105, 100, 59, 1, 8739, 97, 114, 97, 108,
			108, 101, 108, 59, 1, 8741, 5, 173, 1, 59, 16744, 1, 173, 4, 2, 103, 109,
			16752, 16770, 109, 97, 4, 3, 59, 102, 118, 16762, 16764, 16767, 1, 963,
			59, 1, 962, 59, 1, 962, 4, 8, 59, 100, 101, 103, 108, 110, 112, 114,
			16788, 16790, 16795, 16806, 16817, 16828, 16832, 16838, 1, 8764, 111, 116,
			59, 1, 10858, 4, 2, 59, 113, 16801, 16803, 1, 8771, 59, 1, 8771, 4, 2, 59,
			69, 16812, 16814, 1, 10910, 59, 1, 10912, 4, 2, 59, 69, 16823, 16825, 1,
			10909, 59, 1, 10911, 101, 59, 1, 8774, 108, 117, 115, 59, 1, 10788, 97,
			114, 114, 59, 1, 10610, 97, 114, 114, 59, 1, 8592, 4, 4, 97, 101, 105,
			116, 16860, 16883, 16891, 16904, 4, 2, 108, 115, 16866, 16878, 108, 115,
			101, 116, 109, 105, 110, 117, 115, 59, 1, 8726, 104, 112, 59, 1, 10803,
			112, 97, 114, 115, 108, 59, 1, 10724, 4, 2, 100, 108, 16897, 16900, 59, 1,
			8739, 101, 59, 1, 8995, 4, 2, 59, 101, 16910, 16912, 1, 10922, 4, 2, 59,
			115, 16918, 16920, 1, 10924, 59, 3, 10924, 65024, 4, 3, 102, 108, 112,
			16932, 16938, 16958, 116, 99, 121, 59, 1, 1100, 4, 2, 59, 98, 16944,
			16946, 1, 47, 4, 2, 59, 97, 16952, 16954, 1, 10692, 114, 59, 1, 9023, 102,
			59, 3, 55349, 56676, 97, 4, 2, 100, 114, 16970, 16985, 101, 115, 4, 2, 59,
			117, 16978, 16980, 1, 9824, 105, 116, 59, 1, 9824, 59, 1, 8741, 4, 3, 99,
			115, 117, 16996, 17028, 17089, 4, 2, 97, 117, 17002, 17015, 112, 4, 2, 59,
			115, 17009, 17011, 1, 8851, 59, 3, 8851, 65024, 112, 4, 2, 59, 115, 17022,
			17024, 1, 8852, 59, 3, 8852, 65024, 117, 4, 2, 98, 112, 17035, 17062, 4,
			3, 59, 101, 115, 17043, 17045, 17048, 1, 8847, 59, 1, 8849, 101, 116, 4,
			2, 59, 101, 17056, 17058, 1, 8847, 113, 59, 1, 8849, 4, 3, 59, 101, 115,
			17070, 17072, 17075, 1, 8848, 59, 1, 8850, 101, 116, 4, 2, 59, 101, 17083,
			17085, 1, 8848, 113, 59, 1, 8850, 4, 3, 59, 97, 102, 17097, 17099, 17112,
			1, 9633, 114, 4, 2, 101, 102, 17106, 17109, 59, 1, 9633, 59, 1, 9642, 59,
			1, 9642, 97, 114, 114, 59, 1, 8594, 4, 4, 99, 101, 109, 116, 17131, 17136,
			17142, 17148, 114, 59, 3, 55349, 56520, 116, 109, 110, 59, 1, 8726, 105,
			108, 101, 59, 1, 8995, 97, 114, 102, 59, 1, 8902, 4, 2, 97, 114, 17160,
			17172, 114, 4, 2, 59, 102, 17167, 17169, 1, 9734, 59, 1, 9733, 4, 2, 97,
			110, 17178, 17202, 105, 103, 104, 116, 4, 2, 101, 112, 17188, 17197, 112,
			115, 105, 108, 111, 110, 59, 1, 1013, 104, 105, 59, 1, 981, 115, 59, 1,
			175, 4, 5, 98, 99, 109, 110, 112, 17218, 17351, 17420, 17423, 17427, 4, 9,
			59, 69, 100, 101, 109, 110, 112, 114, 115, 17238, 17240, 17243, 17248,
			17261, 17267, 17279, 17285, 17291, 1, 8834, 59, 1, 10949, 111, 116, 59, 1,
			10941, 4, 2, 59, 100, 17254, 17256, 1, 8838, 111, 116, 59, 1, 10947, 117,
			108, 116, 59, 1, 10945, 4, 2, 69, 101, 17273, 17276, 59, 1, 10955, 59, 1,
			8842, 108, 117, 115, 59, 1, 10943, 97, 114, 114, 59, 1, 10617, 4, 3, 101,
			105, 117, 17299, 17335, 17339, 116, 4, 3, 59, 101, 110, 17308, 17310,
			17322, 1, 8834, 113, 4, 2, 59, 113, 17317, 17319, 1, 8838, 59, 1, 10949,
			101, 113, 4, 2, 59, 113, 17330, 17332, 1, 8842, 59, 1, 10955, 109, 59, 1,
			10951, 4, 2, 98, 112, 17345, 17348, 59, 1, 10965, 59, 1, 10963, 99, 4, 6,
			59, 97, 99, 101, 110, 115, 17366, 17368, 17376, 17385, 17389, 17415, 1,
			8827, 112, 112, 114, 111, 120, 59, 1, 10936, 117, 114, 108, 121, 101, 113,
			59, 1, 8829, 113, 59, 1, 10928, 4, 3, 97, 101, 115, 17397, 17405, 17410,
			112, 112, 114, 111, 120, 59, 1, 10938, 113, 113, 59, 1, 10934, 105, 109,
			59, 1, 8937, 105, 109, 59, 1, 8831, 59, 1, 8721, 103, 59, 1, 9834, 4, 13,
			49, 50, 51, 59, 69, 100, 101, 104, 108, 109, 110, 112, 115, 17455, 17462,
			17469, 17476, 17478, 17481, 17496, 17509, 17524, 17530, 17536, 17548,
			17554, 5, 185, 1, 59, 17460, 1, 185, 5, 178, 1, 59, 17467, 1, 178, 5, 179,
			1, 59, 17474, 1, 179, 1, 8835, 59, 1, 10950, 4, 2, 111, 115, 17487, 17491,
			116, 59, 1, 10942, 117, 98, 59, 1, 10968, 4, 2, 59, 100, 17502, 17504, 1,
			8839, 111, 116, 59, 1, 10948, 115, 4, 2, 111, 117, 17516, 17520, 108, 59,
			1, 10185, 98, 59, 1, 10967, 97, 114, 114, 59, 1, 10619, 117, 108, 116, 59,
			1, 10946, 4, 2, 69, 101, 17542, 17545, 59, 1, 10956, 59, 1, 8843, 108,
			117, 115, 59, 1, 10944, 4, 3, 101, 105, 117, 17562, 17598, 17602, 116, 4,
			3, 59, 101, 110, 17571, 17573, 17585, 1, 8835, 113, 4, 2, 59, 113, 17580,
			17582, 1, 8839, 59, 1, 10950, 101, 113, 4, 2, 59, 113, 17593, 17595, 1,
			8843, 59, 1, 10956, 109, 59, 1, 10952, 4, 2, 98, 112, 17608, 17611, 59, 1,
			10964, 59, 1, 10966, 4, 3, 65, 97, 110, 17622, 17627, 17650, 114, 114, 59,
			1, 8665, 114, 4, 2, 104, 114, 17634, 17638, 107, 59, 1, 10534, 4, 2, 59,
			111, 17644, 17646, 1, 8601, 119, 59, 1, 8601, 119, 97, 114, 59, 1, 10538,
			108, 105, 103, 5, 223, 1, 59, 17664, 1, 223, 4, 13, 97, 98, 99, 100, 101,
			102, 104, 105, 111, 112, 114, 115, 119, 17694, 17709, 17714, 17737, 17742,
			17749, 17754, 17860, 17905, 17957, 17964, 18090, 18122, 4, 2, 114, 117,
			17700, 17706, 103, 101, 116, 59, 1, 8982, 59, 1, 964, 114, 107, 59, 1,
			9140, 4, 3, 97, 101, 121, 17722, 17728, 17734, 114, 111, 110, 59, 1, 357,
			100, 105, 108, 59, 1, 355, 59, 1, 1090, 111, 116, 59, 1, 8411, 108, 114,
			101, 99, 59, 1, 8981, 114, 59, 3, 55349, 56625, 4, 4, 101, 105, 107, 111,
			17764, 17805, 17836, 17851, 4, 2, 114, 116, 17770, 17786, 101, 4, 2, 52,
			102, 17777, 17780, 59, 1, 8756, 111, 114, 101, 59, 1, 8756, 97, 4, 3, 59,
			115, 118, 17795, 17797, 17802, 1, 952, 121, 109, 59, 1, 977, 59, 1, 977,
			4, 2, 99, 110, 17811, 17831, 107, 4, 2, 97, 115, 17818, 17826, 112, 112,
			114, 111, 120, 59, 1, 8776, 105, 109, 59, 1, 8764, 115, 112, 59, 1, 8201,
			4, 2, 97, 115, 17842, 17846, 112, 59, 1, 8776, 105, 109, 59, 1, 8764, 114,
			110, 5, 254, 1, 59, 17858, 1, 254, 4, 3, 108, 109, 110, 17868, 17873,
			17901, 100, 101, 59, 1, 732, 101, 115, 5, 215, 3, 59, 98, 100, 17884,
			17886, 17898, 1, 215, 4, 2, 59, 97, 17892, 17894, 1, 8864, 114, 59, 1,
			10801, 59, 1, 10800, 116, 59, 1, 8749, 4, 3, 101, 112, 115, 17913, 17917,
			17953, 97, 59, 1, 10536, 4, 4, 59, 98, 99, 102, 17927, 17929, 17934,
			17939, 1, 8868, 111, 116, 59, 1, 9014, 105, 114, 59, 1, 10993, 4, 2, 59,
			111, 17945, 17948, 3, 55349, 56677, 114, 107, 59, 1, 10970, 97, 59, 1,
			10537, 114, 105, 109, 101, 59, 1, 8244, 4, 3, 97, 105, 112, 17972, 17977,
			18082, 100, 101, 59, 1, 8482, 4, 7, 97, 100, 101, 109, 112, 115, 116,
			17993, 18051, 18056, 18059, 18066, 18072, 18076, 110, 103, 108, 101, 4, 5,
			59, 100, 108, 113, 114, 18009, 18011, 18017, 18032, 18035, 1, 9653, 111,
			119, 110, 59, 1, 9663, 101, 102, 116, 4, 2, 59, 101, 18026, 18028, 1,
			9667, 113, 59, 1, 8884, 59, 1, 8796, 105, 103, 104, 116, 4, 2, 59, 101,
			18045, 18047, 1, 9657, 113, 59, 1, 8885, 111, 116, 59, 1, 9708, 59, 1,
			8796, 105, 110, 117, 115, 59, 1, 10810, 108, 117, 115, 59, 1, 10809, 98,
			59, 1, 10701, 105, 109, 101, 59, 1, 10811, 101, 122, 105, 117, 109, 59, 1,
			9186, 4, 3, 99, 104, 116, 18098, 18111, 18116, 4, 2, 114, 121, 18104,
			18108, 59, 3, 55349, 56521, 59, 1, 1094, 99, 121, 59, 1, 1115, 114, 111,
			107, 59, 1, 359, 4, 2, 105, 111, 18128, 18133, 120, 116, 59, 1, 8812, 104,
			101, 97, 100, 4, 2, 108, 114, 18143, 18154, 101, 102, 116, 97, 114, 114,
			111, 119, 59, 1, 8606, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1,
			8608, 4, 18, 65, 72, 97, 98, 99, 100, 102, 103, 104, 108, 109, 111, 112,
			114, 115, 116, 117, 119, 18204, 18209, 18214, 18234, 18250, 18268, 18292,
			18308, 18319, 18343, 18379, 18397, 18413, 18504, 18547, 18553, 18584,
			18603, 114, 114, 59, 1, 8657, 97, 114, 59, 1, 10595, 4, 2, 99, 114, 18220,
			18230, 117, 116, 101, 5, 250, 1, 59, 18228, 1, 250, 114, 59, 1, 8593, 114,
			4, 2, 99, 101, 18241, 18245, 121, 59, 1, 1118, 118, 101, 59, 1, 365, 4, 2,
			105, 121, 18256, 18265, 114, 99, 5, 251, 1, 59, 18263, 1, 251, 59, 1,
			1091, 4, 3, 97, 98, 104, 18276, 18281, 18287, 114, 114, 59, 1, 8645, 108,
			97, 99, 59, 1, 369, 97, 114, 59, 1, 10606, 4, 2, 105, 114, 18298, 18304,
			115, 104, 116, 59, 1, 10622, 59, 3, 55349, 56626, 114, 97, 118, 101, 5,
			249, 1, 59, 18317, 1, 249, 4, 2, 97, 98, 18325, 18338, 114, 4, 2, 108,
			114, 18332, 18335, 59, 1, 8639, 59, 1, 8638, 108, 107, 59, 1, 9600, 4, 2,
			99, 116, 18349, 18374, 4, 2, 111, 114, 18355, 18369, 114, 110, 4, 2, 59,
			101, 18363, 18365, 1, 8988, 114, 59, 1, 8988, 111, 112, 59, 1, 8975, 114,
			105, 59, 1, 9720, 4, 2, 97, 108, 18385, 18390, 99, 114, 59, 1, 363, 5,
			168, 1, 59, 18395, 1, 168, 4, 2, 103, 112, 18403, 18408, 111, 110, 59, 1,
			371, 102, 59, 3, 55349, 56678, 4, 6, 97, 100, 104, 108, 115, 117, 18427,
			18434, 18445, 18470, 18475, 18494, 114, 114, 111, 119, 59, 1, 8593, 111,
			119, 110, 97, 114, 114, 111, 119, 59, 1, 8597, 97, 114, 112, 111, 111,
			110, 4, 2, 108, 114, 18457, 18463, 101, 102, 116, 59, 1, 8639, 105, 103,
			104, 116, 59, 1, 8638, 117, 115, 59, 1, 8846, 105, 4, 3, 59, 104, 108,
			18484, 18486, 18489, 1, 965, 59, 1, 978, 111, 110, 59, 1, 965, 112, 97,
			114, 114, 111, 119, 115, 59, 1, 8648, 4, 3, 99, 105, 116, 18512, 18537,
			18542, 4, 2, 111, 114, 18518, 18532, 114, 110, 4, 2, 59, 101, 18526,
			18528, 1, 8989, 114, 59, 1, 8989, 111, 112, 59, 1, 8974, 110, 103, 59, 1,
			367, 114, 105, 59, 1, 9721, 99, 114, 59, 3, 55349, 56522, 4, 3, 100, 105,
			114, 18561, 18566, 18572, 111, 116, 59, 1, 8944, 108, 100, 101, 59, 1,
			361, 105, 4, 2, 59, 102, 18579, 18581, 1, 9653, 59, 1, 9652, 4, 2, 97,
			109, 18590, 18595, 114, 114, 59, 1, 8648, 108, 5, 252, 1, 59, 18601, 1,
			252, 97, 110, 103, 108, 101, 59, 1, 10663, 4, 15, 65, 66, 68, 97, 99, 100,
			101, 102, 108, 110, 111, 112, 114, 115, 122, 18643, 18648, 18661, 18667,
			18847, 18851, 18857, 18904, 18909, 18915, 18931, 18937, 18943, 18949,
			18996, 114, 114, 59, 1, 8661, 97, 114, 4, 2, 59, 118, 18656, 18658, 1,
			10984, 59, 1, 10985, 97, 115, 104, 59, 1, 8872, 4, 2, 110, 114, 18673,
			18679, 103, 114, 116, 59, 1, 10652, 4, 7, 101, 107, 110, 112, 114, 115,
			116, 18695, 18704, 18711, 18720, 18742, 18754, 18810, 112, 115, 105, 108,
			111, 110, 59, 1, 1013, 97, 112, 112, 97, 59, 1, 1008, 111, 116, 104, 105,
			110, 103, 59, 1, 8709, 4, 3, 104, 105, 114, 18728, 18732, 18735, 105, 59,
			1, 981, 59, 1, 982, 111, 112, 116, 111, 59, 1, 8733, 4, 2, 59, 104, 18748,
			18750, 1, 8597, 111, 59, 1, 1009, 4, 2, 105, 117, 18760, 18766, 103, 109,
			97, 59, 1, 962, 4, 2, 98, 112, 18772, 18791, 115, 101, 116, 110, 101, 113,
			4, 2, 59, 113, 18784, 18787, 3, 8842, 65024, 59, 3, 10955, 65024, 115,
			101, 116, 110, 101, 113, 4, 2, 59, 113, 18803, 18806, 3, 8843, 65024, 59,
			3, 10956, 65024, 4, 2, 104, 114, 18816, 18822, 101, 116, 97, 59, 1, 977,
			105, 97, 110, 103, 108, 101, 4, 2, 108, 114, 18834, 18840, 101, 102, 116,
			59, 1, 8882, 105, 103, 104, 116, 59, 1, 8883, 121, 59, 1, 1074, 97, 115,
			104, 59, 1, 8866, 4, 3, 101, 108, 114, 18865, 18884, 18890, 4, 3, 59, 98,
			101, 18873, 18875, 18880, 1, 8744, 97, 114, 59, 1, 8891, 113, 59, 1, 8794,
			108, 105, 112, 59, 1, 8942, 4, 2, 98, 116, 18896, 18901, 97, 114, 59, 1,
			124, 59, 1, 124, 114, 59, 3, 55349, 56627, 116, 114, 105, 59, 1, 8882,
			115, 117, 4, 2, 98, 112, 18923, 18927, 59, 3, 8834, 8402, 59, 3, 8835,
			8402, 112, 102, 59, 3, 55349, 56679, 114, 111, 112, 59, 1, 8733, 116, 114,
			105, 59, 1, 8883, 4, 2, 99, 117, 18955, 18960, 114, 59, 3, 55349, 56523,
			4, 2, 98, 112, 18966, 18981, 110, 4, 2, 69, 101, 18973, 18977, 59, 3,
			10955, 65024, 59, 3, 8842, 65024, 110, 4, 2, 69, 101, 18988, 18992, 59, 3,
			10956, 65024, 59, 3, 8843, 65024, 105, 103, 122, 97, 103, 59, 1, 10650, 4,
			7, 99, 101, 102, 111, 112, 114, 115, 19020, 19026, 19061, 19066, 19072,
			19075, 19089, 105, 114, 99, 59, 1, 373, 4, 2, 100, 105, 19032, 19055, 4,
			2, 98, 103, 19038, 19043, 97, 114, 59, 1, 10847, 101, 4, 2, 59, 113,
			19050, 19052, 1, 8743, 59, 1, 8793, 101, 114, 112, 59, 1, 8472, 114, 59,
			3, 55349, 56628, 112, 102, 59, 3, 55349, 56680, 59, 1, 8472, 4, 2, 59,
			101, 19081, 19083, 1, 8768, 97, 116, 104, 59, 1, 8768, 99, 114, 59, 3,
			55349, 56524, 4, 14, 99, 100, 102, 104, 105, 108, 109, 110, 111, 114, 115,
			117, 118, 119, 19125, 19146, 19152, 19157, 19173, 19176, 19192, 19197,
			19202, 19236, 19252, 19269, 19286, 19291, 4, 3, 97, 105, 117, 19133,
			19137, 19142, 112, 59, 1, 8898, 114, 99, 59, 1, 9711, 112, 59, 1, 8899,
			116, 114, 105, 59, 1, 9661, 114, 59, 3, 55349, 56629, 4, 2, 65, 97, 19163,
			19168, 114, 114, 59, 1, 10234, 114, 114, 59, 1, 10231, 59, 1, 958, 4, 2,
			65, 97, 19182, 19187, 114, 114, 59, 1, 10232, 114, 114, 59, 1, 10229, 97,
			112, 59, 1, 10236, 105, 115, 59, 1, 8955, 4, 3, 100, 112, 116, 19210,
			19215, 19230, 111, 116, 59, 1, 10752, 4, 2, 102, 108, 19221, 19225, 59, 3,
			55349, 56681, 117, 115, 59, 1, 10753, 105, 109, 101, 59, 1, 10754, 4, 2,
			65, 97, 19242, 19247, 114, 114, 59, 1, 10233, 114, 114, 59, 1, 10230, 4,
			2, 99, 113, 19258, 19263, 114, 59, 3, 55349, 56525, 99, 117, 112, 59, 1,
			10758, 4, 2, 112, 116, 19275, 19281, 108, 117, 115, 59, 1, 10756, 114,
			105, 59, 1, 9651, 101, 101, 59, 1, 8897, 101, 100, 103, 101, 59, 1, 8896,
			4, 8, 97, 99, 101, 102, 105, 111, 115, 117, 19316, 19335, 19349, 19357,
			19362, 19367, 19373, 19379, 99, 4, 2, 117, 121, 19323, 19332, 116, 101, 5,
			253, 1, 59, 19330, 1, 253, 59, 1, 1103, 4, 2, 105, 121, 19341, 19346, 114,
			99, 59, 1, 375, 59, 1, 1099, 110, 5, 165, 1, 59, 19355, 1, 165, 114, 59,
			3, 55349, 56630, 99, 121, 59, 1, 1111, 112, 102, 59, 3, 55349, 56682, 99,
			114, 59, 3, 55349, 56526, 4, 2, 99, 109, 19385, 19389, 121, 59, 1, 1102,
			108, 5, 255, 1, 59, 19395, 1, 255, 4, 10, 97, 99, 100, 101, 102, 104, 105,
			111, 115, 119, 19419, 19426, 19441, 19446, 19462, 19467, 19472, 19480,
			19486, 19492, 99, 117, 116, 101, 59, 1, 378, 4, 2, 97, 121, 19432, 19438,
			114, 111, 110, 59, 1, 382, 59, 1, 1079, 111, 116, 59, 1, 380, 4, 2, 101,
			116, 19452, 19458, 116, 114, 102, 59, 1, 8488, 97, 59, 1, 950, 114, 59, 3,
			55349, 56631, 99, 121, 59, 1, 1078, 103, 114, 97, 114, 114, 59, 1, 8669,
			112, 102, 59, 3, 55349, 56683, 99, 114, 59, 3, 55349, 56527, 4, 2, 106,
			110, 19498, 19501, 59, 1, 8205, 106, 59, 1, 8204,
		]);
	const s4 = i4,
		it = Bn,
		li = o4,
		ee = tl,
		R = it.CODE_POINTS,
		ui = it.CODE_POINT_SEQUENCES,
		a4 = {
			128: 8364,
			130: 8218,
			131: 402,
			132: 8222,
			133: 8230,
			134: 8224,
			135: 8225,
			136: 710,
			137: 8240,
			138: 352,
			139: 8249,
			140: 338,
			142: 381,
			145: 8216,
			146: 8217,
			147: 8220,
			148: 8221,
			149: 8226,
			150: 8211,
			151: 8212,
			152: 732,
			153: 8482,
			154: 353,
			155: 8250,
			156: 339,
			158: 382,
			159: 376,
		},
		Mf = 1 << 0,
		Rf = 1 << 1,
		Df = 1 << 2,
		l4 = Mf | Rf | Df,
		je = 'DATA_STATE',
		Xi = 'RCDATA_STATE',
		Y1 = 'RAWTEXT_STATE',
		hr = 'SCRIPT_DATA_STATE',
		Pf = 'PLAINTEXT_STATE',
		Ff = 'TAG_OPEN_STATE',
		Hf = 'END_TAG_OPEN_STATE',
		rl = 'TAG_NAME_STATE',
		Bf = 'RCDATA_LESS_THAN_SIGN_STATE',
		Uf = 'RCDATA_END_TAG_OPEN_STATE',
		Gf = 'RCDATA_END_TAG_NAME_STATE',
		zf = 'RAWTEXT_LESS_THAN_SIGN_STATE',
		Wf = 'RAWTEXT_END_TAG_OPEN_STATE',
		Kf = 'RAWTEXT_END_TAG_NAME_STATE',
		jf = 'SCRIPT_DATA_LESS_THAN_SIGN_STATE',
		Yf = 'SCRIPT_DATA_END_TAG_OPEN_STATE',
		qf = 'SCRIPT_DATA_END_TAG_NAME_STATE',
		Xf = 'SCRIPT_DATA_ESCAPE_START_STATE',
		Qf = 'SCRIPT_DATA_ESCAPE_START_DASH_STATE',
		Un = 'SCRIPT_DATA_ESCAPED_STATE',
		Vf = 'SCRIPT_DATA_ESCAPED_DASH_STATE',
		il = 'SCRIPT_DATA_ESCAPED_DASH_DASH_STATE',
		us = 'SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE',
		Zf = 'SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE',
		Jf = 'SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE',
		$f = 'SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE',
		dr = 'SCRIPT_DATA_DOUBLE_ESCAPED_STATE',
		eh = 'SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE',
		th = 'SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE',
		cs = 'SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE',
		nh = 'SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE',
		$n = 'BEFORE_ATTRIBUTE_NAME_STATE',
		fs = 'ATTRIBUTE_NAME_STATE',
		ol = 'AFTER_ATTRIBUTE_NAME_STATE',
		sl = 'BEFORE_ATTRIBUTE_VALUE_STATE',
		hs = 'ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE',
		ds = 'ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE',
		ps = 'ATTRIBUTE_VALUE_UNQUOTED_STATE',
		al = 'AFTER_ATTRIBUTE_VALUE_QUOTED_STATE',
		Rr = 'SELF_CLOSING_START_TAG_STATE',
		q1 = 'BOGUS_COMMENT_STATE',
		rh = 'MARKUP_DECLARATION_OPEN_STATE',
		ih = 'COMMENT_START_STATE',
		oh = 'COMMENT_START_DASH_STATE',
		Dr = 'COMMENT_STATE',
		sh = 'COMMENT_LESS_THAN_SIGN_STATE',
		ah = 'COMMENT_LESS_THAN_SIGN_BANG_STATE',
		lh = 'COMMENT_LESS_THAN_SIGN_BANG_DASH_STATE',
		uh = 'COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH_STATE',
		gs = 'COMMENT_END_DASH_STATE',
		ms = 'COMMENT_END_STATE',
		ch = 'COMMENT_END_BANG_STATE',
		fh = 'DOCTYPE_STATE',
		Ts = 'BEFORE_DOCTYPE_NAME_STATE',
		Es = 'DOCTYPE_NAME_STATE',
		hh = 'AFTER_DOCTYPE_NAME_STATE',
		dh = 'AFTER_DOCTYPE_PUBLIC_KEYWORD_STATE',
		ph = 'BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE',
		ll = 'DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE',
		ul = 'DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE',
		cl = 'AFTER_DOCTYPE_PUBLIC_IDENTIFIER_STATE',
		gh = 'BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE',
		mh = 'AFTER_DOCTYPE_SYSTEM_KEYWORD_STATE',
		Th = 'BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE',
		X1 = 'DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE',
		Q1 = 'DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE',
		fl = 'AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE',
		pr = 'BOGUS_DOCTYPE_STATE',
		vs = 'CDATA_SECTION_STATE',
		Eh = 'CDATA_SECTION_BRACKET_STATE',
		vh = 'CDATA_SECTION_END_STATE',
		Qi = 'CHARACTER_REFERENCE_STATE',
		yh = 'NAMED_CHARACTER_REFERENCE_STATE',
		Ah = 'AMBIGUOS_AMPERSAND_STATE',
		_h = 'NUMERIC_CHARACTER_REFERENCE_STATE',
		Ch = 'HEXADEMICAL_CHARACTER_REFERENCE_START_STATE',
		Sh = 'DECIMAL_CHARACTER_REFERENCE_START_STATE',
		bh = 'HEXADEMICAL_CHARACTER_REFERENCE_STATE',
		Nh = 'DECIMAL_CHARACTER_REFERENCE_STATE',
		V1 = 'NUMERIC_CHARACTER_REFERENCE_END_STATE';
	function ft(e) {
		return (
			e === R.SPACE ||
			e === R.LINE_FEED ||
			e === R.TABULATION ||
			e === R.FORM_FEED
		);
	}
	function Z1(e) {
		return e >= R.DIGIT_0 && e <= R.DIGIT_9;
	}
	function Gn(e) {
		return e >= R.LATIN_CAPITAL_A && e <= R.LATIN_CAPITAL_Z;
	}
	function ci(e) {
		return e >= R.LATIN_SMALL_A && e <= R.LATIN_SMALL_Z;
	}
	function Pr(e) {
		return ci(e) || Gn(e);
	}
	function hl(e) {
		return Pr(e) || Z1(e);
	}
	function xh(e) {
		return e >= R.LATIN_CAPITAL_A && e <= R.LATIN_CAPITAL_F;
	}
	function kh(e) {
		return e >= R.LATIN_SMALL_A && e <= R.LATIN_SMALL_F;
	}
	function u4(e) {
		return Z1(e) || xh(e) || kh(e);
	}
	function ys(e) {
		return e + 32;
	}
	function Tt(e) {
		return e <= 65535
			? String.fromCharCode(e)
			: ((e -= 65536),
			  String.fromCharCode(((e >>> 10) & 1023) | 55296) +
					String.fromCharCode(56320 | (e & 1023)));
	}
	function Fr(e) {
		return String.fromCharCode(ys(e));
	}
	function Oh(e, t) {
		const r = li[++e];
		let o = ++e,
			u = o + r - 1;
		for (; o <= u; ) {
			const c = (o + u) >>> 1,
				f = li[c];
			if (f < t) o = c + 1;
			else if (f > t) u = c - 1;
			else return li[c + r];
		}
		return -1;
	}
	let kn = class Tn {
		constructor() {
			(this.preprocessor = new s4()),
				(this.tokenQueue = []),
				(this.allowCDATA = !1),
				(this.state = je),
				(this.returnState = ''),
				(this.charRefCode = -1),
				(this.tempBuff = []),
				(this.lastStartTagName = ''),
				(this.consumedAfterSnapshot = -1),
				(this.active = !1),
				(this.currentCharacterToken = null),
				(this.currentToken = null),
				(this.currentAttr = null);
		}
		_err() {}
		_errOnNextCodePoint(t) {
			this._consume(), this._err(t), this._unconsume();
		}
		getNextToken() {
			for (; !this.tokenQueue.length && this.active; ) {
				this.consumedAfterSnapshot = 0;
				const t = this._consume();
				this._ensureHibernation() || this[this.state](t);
			}
			return this.tokenQueue.shift();
		}
		write(t, r) {
			(this.active = !0), this.preprocessor.write(t, r);
		}
		insertHtmlAtCurrentPos(t) {
			(this.active = !0), this.preprocessor.insertHtmlAtCurrentPos(t);
		}
		_ensureHibernation() {
			if (this.preprocessor.endOfChunkHit) {
				for (; this.consumedAfterSnapshot > 0; this.consumedAfterSnapshot--)
					this.preprocessor.retreat();
				return (
					(this.active = !1),
					this.tokenQueue.push({
						type: Tn.HIBERNATION_TOKEN,
					}),
					!0
				);
			}
			return !1;
		}
		_consume() {
			return this.consumedAfterSnapshot++, this.preprocessor.advance();
		}
		_unconsume() {
			this.consumedAfterSnapshot--, this.preprocessor.retreat();
		}
		_reconsumeInState(t) {
			(this.state = t), this._unconsume();
		}
		_consumeSequenceIfMatch(t, r, o) {
			let u = 0,
				c = !0;
			const f = t.length;
			let d = 0,
				g = r,
				T;
			for (; d < f; d++) {
				if ((d > 0 && ((g = this._consume()), u++), g === R.EOF)) {
					c = !1;
					break;
				}
				if (((T = t[d]), g !== T && (o || g !== ys(T)))) {
					c = !1;
					break;
				}
			}
			if (!c) for (; u--; ) this._unconsume();
			return c;
		}
		_isTempBufferEqualToScriptString() {
			if (this.tempBuff.length !== ui.SCRIPT_STRING.length) return !1;
			for (let t = 0; t < this.tempBuff.length; t++)
				if (this.tempBuff[t] !== ui.SCRIPT_STRING[t]) return !1;
			return !0;
		}
		_createStartTagToken() {
			this.currentToken = {
				type: Tn.START_TAG_TOKEN,
				tagName: '',
				selfClosing: !1,
				ackSelfClosing: !1,
				attrs: [],
			};
		}
		_createEndTagToken() {
			this.currentToken = {
				type: Tn.END_TAG_TOKEN,
				tagName: '',
				selfClosing: !1,
				attrs: [],
			};
		}
		_createCommentToken() {
			this.currentToken = {
				type: Tn.COMMENT_TOKEN,
				data: '',
			};
		}
		_createDoctypeToken(t) {
			this.currentToken = {
				type: Tn.DOCTYPE_TOKEN,
				name: t,
				forceQuirks: !1,
				publicId: null,
				systemId: null,
			};
		}
		_createCharacterToken(t, r) {
			this.currentCharacterToken = {
				type: t,
				chars: r,
			};
		}
		_createEOFToken() {
			this.currentToken = {
				type: Tn.EOF_TOKEN,
			};
		}
		_createAttr(t) {
			this.currentAttr = {
				name: t,
				value: '',
			};
		}
		_leaveAttrName(t) {
			Tn.getTokenAttr(this.currentToken, this.currentAttr.name) === null
				? this.currentToken.attrs.push(this.currentAttr)
				: this._err(ee.duplicateAttribute),
				(this.state = t);
		}
		_leaveAttrValue(t) {
			this.state = t;
		}
		_emitCurrentToken() {
			this._emitCurrentCharacterToken();
			const t = this.currentToken;
			(this.currentToken = null),
				t.type === Tn.START_TAG_TOKEN
					? (this.lastStartTagName = t.tagName)
					: t.type === Tn.END_TAG_TOKEN &&
					  (t.attrs.length > 0 && this._err(ee.endTagWithAttributes),
					  t.selfClosing && this._err(ee.endTagWithTrailingSolidus)),
				this.tokenQueue.push(t);
		}
		_emitCurrentCharacterToken() {
			this.currentCharacterToken &&
				(this.tokenQueue.push(this.currentCharacterToken),
				(this.currentCharacterToken = null));
		}
		_emitEOFToken() {
			this._createEOFToken(), this._emitCurrentToken();
		}
		_appendCharToCurrentCharacterToken(t, r) {
			this.currentCharacterToken &&
				this.currentCharacterToken.type !== t &&
				this._emitCurrentCharacterToken(),
				this.currentCharacterToken
					? (this.currentCharacterToken.chars += r)
					: this._createCharacterToken(t, r);
		}
		_emitCodePoint(t) {
			let r = Tn.CHARACTER_TOKEN;
			ft(t)
				? (r = Tn.WHITESPACE_CHARACTER_TOKEN)
				: t === R.NULL && (r = Tn.NULL_CHARACTER_TOKEN),
				this._appendCharToCurrentCharacterToken(r, Tt(t));
		}
		_emitSeveralCodePoints(t) {
			for (let r = 0; r < t.length; r++) this._emitCodePoint(t[r]);
		}
		_emitChars(t) {
			this._appendCharToCurrentCharacterToken(Tn.CHARACTER_TOKEN, t);
		}
		_matchNamedCharacterReference(t) {
			let r = null,
				o = 1,
				u = Oh(0, t);
			for (this.tempBuff.push(t); u > -1; ) {
				const c = li[u],
					f = c < l4;
				f && c & Mf && ((r = c & Rf ? [li[++u], li[++u]] : [li[++u]]), (o = 0));
				const g = this._consume();
				if ((this.tempBuff.push(g), o++, g === R.EOF)) break;
				f ? (u = c & Df ? Oh(u, g) : -1) : (u = g === c ? ++u : -1);
			}
			for (; o--; ) this.tempBuff.pop(), this._unconsume();
			return r;
		}
		_isCharacterReferenceInAttribute() {
			return (
				this.returnState === hs ||
				this.returnState === ds ||
				this.returnState === ps
			);
		}
		_isCharacterReferenceAttributeQuirk(t) {
			if (!t && this._isCharacterReferenceInAttribute()) {
				const r = this._consume();
				return this._unconsume(), r === R.EQUALS_SIGN || hl(r);
			}
			return !1;
		}
		_flushCodePointsConsumedAsCharacterReference() {
			if (this._isCharacterReferenceInAttribute())
				for (let t = 0; t < this.tempBuff.length; t++)
					this.currentAttr.value += Tt(this.tempBuff[t]);
			else this._emitSeveralCodePoints(this.tempBuff);
			this.tempBuff = [];
		}
		[je](t) {
			this.preprocessor.dropParsedChunk(),
				t === R.LESS_THAN_SIGN
					? (this.state = Ff)
					: t === R.AMPERSAND
					? ((this.returnState = je), (this.state = Qi))
					: t === R.NULL
					? (this._err(ee.unexpectedNullCharacter), this._emitCodePoint(t))
					: t === R.EOF
					? this._emitEOFToken()
					: this._emitCodePoint(t);
		}
		[Xi](t) {
			this.preprocessor.dropParsedChunk(),
				t === R.AMPERSAND
					? ((this.returnState = Xi), (this.state = Qi))
					: t === R.LESS_THAN_SIGN
					? (this.state = Bf)
					: t === R.NULL
					? (this._err(ee.unexpectedNullCharacter),
					  this._emitChars(it.REPLACEMENT_CHARACTER))
					: t === R.EOF
					? this._emitEOFToken()
					: this._emitCodePoint(t);
		}
		[Y1](t) {
			this.preprocessor.dropParsedChunk(),
				t === R.LESS_THAN_SIGN
					? (this.state = zf)
					: t === R.NULL
					? (this._err(ee.unexpectedNullCharacter),
					  this._emitChars(it.REPLACEMENT_CHARACTER))
					: t === R.EOF
					? this._emitEOFToken()
					: this._emitCodePoint(t);
		}
		[hr](t) {
			this.preprocessor.dropParsedChunk(),
				t === R.LESS_THAN_SIGN
					? (this.state = jf)
					: t === R.NULL
					? (this._err(ee.unexpectedNullCharacter),
					  this._emitChars(it.REPLACEMENT_CHARACTER))
					: t === R.EOF
					? this._emitEOFToken()
					: this._emitCodePoint(t);
		}
		[Pf](t) {
			this.preprocessor.dropParsedChunk(),
				t === R.NULL
					? (this._err(ee.unexpectedNullCharacter),
					  this._emitChars(it.REPLACEMENT_CHARACTER))
					: t === R.EOF
					? this._emitEOFToken()
					: this._emitCodePoint(t);
		}
		[Ff](t) {
			t === R.EXCLAMATION_MARK
				? (this.state = rh)
				: t === R.SOLIDUS
				? (this.state = Hf)
				: Pr(t)
				? (this._createStartTagToken(), this._reconsumeInState(rl))
				: t === R.QUESTION_MARK
				? (this._err(ee.unexpectedQuestionMarkInsteadOfTagName),
				  this._createCommentToken(),
				  this._reconsumeInState(q1))
				: t === R.EOF
				? (this._err(ee.eofBeforeTagName),
				  this._emitChars('<'),
				  this._emitEOFToken())
				: (this._err(ee.invalidFirstCharacterOfTagName),
				  this._emitChars('<'),
				  this._reconsumeInState(je));
		}
		[Hf](t) {
			Pr(t)
				? (this._createEndTagToken(), this._reconsumeInState(rl))
				: t === R.GREATER_THAN_SIGN
				? (this._err(ee.missingEndTagName), (this.state = je))
				: t === R.EOF
				? (this._err(ee.eofBeforeTagName),
				  this._emitChars('</'),
				  this._emitEOFToken())
				: (this._err(ee.invalidFirstCharacterOfTagName),
				  this._createCommentToken(),
				  this._reconsumeInState(q1));
		}
		[rl](t) {
			ft(t)
				? (this.state = $n)
				: t === R.SOLIDUS
				? (this.state = Rr)
				: t === R.GREATER_THAN_SIGN
				? ((this.state = je), this._emitCurrentToken())
				: Gn(t)
				? (this.currentToken.tagName += Fr(t))
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentToken.tagName += it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInTag), this._emitEOFToken())
				: (this.currentToken.tagName += Tt(t));
		}
		[Bf](t) {
			t === R.SOLIDUS
				? ((this.tempBuff = []), (this.state = Uf))
				: (this._emitChars('<'), this._reconsumeInState(Xi));
		}
		[Uf](t) {
			Pr(t)
				? (this._createEndTagToken(), this._reconsumeInState(Gf))
				: (this._emitChars('</'), this._reconsumeInState(Xi));
		}
		[Gf](t) {
			if (Gn(t)) (this.currentToken.tagName += Fr(t)), this.tempBuff.push(t);
			else if (ci(t))
				(this.currentToken.tagName += Tt(t)), this.tempBuff.push(t);
			else {
				if (this.lastStartTagName === this.currentToken.tagName) {
					if (ft(t)) {
						this.state = $n;
						return;
					}
					if (t === R.SOLIDUS) {
						this.state = Rr;
						return;
					}
					if (t === R.GREATER_THAN_SIGN) {
						(this.state = je), this._emitCurrentToken();
						return;
					}
				}
				this._emitChars('</'),
					this._emitSeveralCodePoints(this.tempBuff),
					this._reconsumeInState(Xi);
			}
		}
		[zf](t) {
			t === R.SOLIDUS
				? ((this.tempBuff = []), (this.state = Wf))
				: (this._emitChars('<'), this._reconsumeInState(Y1));
		}
		[Wf](t) {
			Pr(t)
				? (this._createEndTagToken(), this._reconsumeInState(Kf))
				: (this._emitChars('</'), this._reconsumeInState(Y1));
		}
		[Kf](t) {
			if (Gn(t)) (this.currentToken.tagName += Fr(t)), this.tempBuff.push(t);
			else if (ci(t))
				(this.currentToken.tagName += Tt(t)), this.tempBuff.push(t);
			else {
				if (this.lastStartTagName === this.currentToken.tagName) {
					if (ft(t)) {
						this.state = $n;
						return;
					}
					if (t === R.SOLIDUS) {
						this.state = Rr;
						return;
					}
					if (t === R.GREATER_THAN_SIGN) {
						this._emitCurrentToken(), (this.state = je);
						return;
					}
				}
				this._emitChars('</'),
					this._emitSeveralCodePoints(this.tempBuff),
					this._reconsumeInState(Y1);
			}
		}
		[jf](t) {
			t === R.SOLIDUS
				? ((this.tempBuff = []), (this.state = Yf))
				: t === R.EXCLAMATION_MARK
				? ((this.state = Xf), this._emitChars('<!'))
				: (this._emitChars('<'), this._reconsumeInState(hr));
		}
		[Yf](t) {
			Pr(t)
				? (this._createEndTagToken(), this._reconsumeInState(qf))
				: (this._emitChars('</'), this._reconsumeInState(hr));
		}
		[qf](t) {
			if (Gn(t)) (this.currentToken.tagName += Fr(t)), this.tempBuff.push(t);
			else if (ci(t))
				(this.currentToken.tagName += Tt(t)), this.tempBuff.push(t);
			else {
				if (this.lastStartTagName === this.currentToken.tagName) {
					if (ft(t)) {
						this.state = $n;
						return;
					} else if (t === R.SOLIDUS) {
						this.state = Rr;
						return;
					} else if (t === R.GREATER_THAN_SIGN) {
						this._emitCurrentToken(), (this.state = je);
						return;
					}
				}
				this._emitChars('</'),
					this._emitSeveralCodePoints(this.tempBuff),
					this._reconsumeInState(hr);
			}
		}
		[Xf](t) {
			t === R.HYPHEN_MINUS
				? ((this.state = Qf), this._emitChars('-'))
				: this._reconsumeInState(hr);
		}
		[Qf](t) {
			t === R.HYPHEN_MINUS
				? ((this.state = il), this._emitChars('-'))
				: this._reconsumeInState(hr);
		}
		[Un](t) {
			t === R.HYPHEN_MINUS
				? ((this.state = Vf), this._emitChars('-'))
				: t === R.LESS_THAN_SIGN
				? (this.state = us)
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  this._emitChars(it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInScriptHtmlCommentLikeText), this._emitEOFToken())
				: this._emitCodePoint(t);
		}
		[Vf](t) {
			t === R.HYPHEN_MINUS
				? ((this.state = il), this._emitChars('-'))
				: t === R.LESS_THAN_SIGN
				? (this.state = us)
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.state = Un),
				  this._emitChars(it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInScriptHtmlCommentLikeText), this._emitEOFToken())
				: ((this.state = Un), this._emitCodePoint(t));
		}
		[il](t) {
			t === R.HYPHEN_MINUS
				? this._emitChars('-')
				: t === R.LESS_THAN_SIGN
				? (this.state = us)
				: t === R.GREATER_THAN_SIGN
				? ((this.state = hr), this._emitChars('>'))
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.state = Un),
				  this._emitChars(it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInScriptHtmlCommentLikeText), this._emitEOFToken())
				: ((this.state = Un), this._emitCodePoint(t));
		}
		[us](t) {
			t === R.SOLIDUS
				? ((this.tempBuff = []), (this.state = Zf))
				: Pr(t)
				? ((this.tempBuff = []),
				  this._emitChars('<'),
				  this._reconsumeInState($f))
				: (this._emitChars('<'), this._reconsumeInState(Un));
		}
		[Zf](t) {
			Pr(t)
				? (this._createEndTagToken(), this._reconsumeInState(Jf))
				: (this._emitChars('</'), this._reconsumeInState(Un));
		}
		[Jf](t) {
			if (Gn(t)) (this.currentToken.tagName += Fr(t)), this.tempBuff.push(t);
			else if (ci(t))
				(this.currentToken.tagName += Tt(t)), this.tempBuff.push(t);
			else {
				if (this.lastStartTagName === this.currentToken.tagName) {
					if (ft(t)) {
						this.state = $n;
						return;
					}
					if (t === R.SOLIDUS) {
						this.state = Rr;
						return;
					}
					if (t === R.GREATER_THAN_SIGN) {
						this._emitCurrentToken(), (this.state = je);
						return;
					}
				}
				this._emitChars('</'),
					this._emitSeveralCodePoints(this.tempBuff),
					this._reconsumeInState(Un);
			}
		}
		[$f](t) {
			ft(t) || t === R.SOLIDUS || t === R.GREATER_THAN_SIGN
				? ((this.state = this._isTempBufferEqualToScriptString() ? dr : Un),
				  this._emitCodePoint(t))
				: Gn(t)
				? (this.tempBuff.push(ys(t)), this._emitCodePoint(t))
				: ci(t)
				? (this.tempBuff.push(t), this._emitCodePoint(t))
				: this._reconsumeInState(Un);
		}
		[dr](t) {
			t === R.HYPHEN_MINUS
				? ((this.state = eh), this._emitChars('-'))
				: t === R.LESS_THAN_SIGN
				? ((this.state = cs), this._emitChars('<'))
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  this._emitChars(it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInScriptHtmlCommentLikeText), this._emitEOFToken())
				: this._emitCodePoint(t);
		}
		[eh](t) {
			t === R.HYPHEN_MINUS
				? ((this.state = th), this._emitChars('-'))
				: t === R.LESS_THAN_SIGN
				? ((this.state = cs), this._emitChars('<'))
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.state = dr),
				  this._emitChars(it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInScriptHtmlCommentLikeText), this._emitEOFToken())
				: ((this.state = dr), this._emitCodePoint(t));
		}
		[th](t) {
			t === R.HYPHEN_MINUS
				? this._emitChars('-')
				: t === R.LESS_THAN_SIGN
				? ((this.state = cs), this._emitChars('<'))
				: t === R.GREATER_THAN_SIGN
				? ((this.state = hr), this._emitChars('>'))
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.state = dr),
				  this._emitChars(it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInScriptHtmlCommentLikeText), this._emitEOFToken())
				: ((this.state = dr), this._emitCodePoint(t));
		}
		[cs](t) {
			t === R.SOLIDUS
				? ((this.tempBuff = []), (this.state = nh), this._emitChars('/'))
				: this._reconsumeInState(dr);
		}
		[nh](t) {
			ft(t) || t === R.SOLIDUS || t === R.GREATER_THAN_SIGN
				? ((this.state = this._isTempBufferEqualToScriptString() ? Un : dr),
				  this._emitCodePoint(t))
				: Gn(t)
				? (this.tempBuff.push(ys(t)), this._emitCodePoint(t))
				: ci(t)
				? (this.tempBuff.push(t), this._emitCodePoint(t))
				: this._reconsumeInState(dr);
		}
		[$n](t) {
			ft(t) ||
				(t === R.SOLIDUS || t === R.GREATER_THAN_SIGN || t === R.EOF
					? this._reconsumeInState(ol)
					: t === R.EQUALS_SIGN
					? (this._err(ee.unexpectedEqualsSignBeforeAttributeName),
					  this._createAttr('='),
					  (this.state = fs))
					: (this._createAttr(''), this._reconsumeInState(fs)));
		}
		[fs](t) {
			ft(t) || t === R.SOLIDUS || t === R.GREATER_THAN_SIGN || t === R.EOF
				? (this._leaveAttrName(ol), this._unconsume())
				: t === R.EQUALS_SIGN
				? this._leaveAttrName(sl)
				: Gn(t)
				? (this.currentAttr.name += Fr(t))
				: t === R.QUOTATION_MARK || t === R.APOSTROPHE || t === R.LESS_THAN_SIGN
				? (this._err(ee.unexpectedCharacterInAttributeName),
				  (this.currentAttr.name += Tt(t)))
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentAttr.name += it.REPLACEMENT_CHARACTER))
				: (this.currentAttr.name += Tt(t));
		}
		[ol](t) {
			ft(t) ||
				(t === R.SOLIDUS
					? (this.state = Rr)
					: t === R.EQUALS_SIGN
					? (this.state = sl)
					: t === R.GREATER_THAN_SIGN
					? ((this.state = je), this._emitCurrentToken())
					: t === R.EOF
					? (this._err(ee.eofInTag), this._emitEOFToken())
					: (this._createAttr(''), this._reconsumeInState(fs)));
		}
		[sl](t) {
			ft(t) ||
				(t === R.QUOTATION_MARK
					? (this.state = hs)
					: t === R.APOSTROPHE
					? (this.state = ds)
					: t === R.GREATER_THAN_SIGN
					? (this._err(ee.missingAttributeValue),
					  (this.state = je),
					  this._emitCurrentToken())
					: this._reconsumeInState(ps));
		}
		[hs](t) {
			t === R.QUOTATION_MARK
				? (this.state = al)
				: t === R.AMPERSAND
				? ((this.returnState = hs), (this.state = Qi))
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentAttr.value += it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInTag), this._emitEOFToken())
				: (this.currentAttr.value += Tt(t));
		}
		[ds](t) {
			t === R.APOSTROPHE
				? (this.state = al)
				: t === R.AMPERSAND
				? ((this.returnState = ds), (this.state = Qi))
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentAttr.value += it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInTag), this._emitEOFToken())
				: (this.currentAttr.value += Tt(t));
		}
		[ps](t) {
			ft(t)
				? this._leaveAttrValue($n)
				: t === R.AMPERSAND
				? ((this.returnState = ps), (this.state = Qi))
				: t === R.GREATER_THAN_SIGN
				? (this._leaveAttrValue(je), this._emitCurrentToken())
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentAttr.value += it.REPLACEMENT_CHARACTER))
				: t === R.QUOTATION_MARK ||
				  t === R.APOSTROPHE ||
				  t === R.LESS_THAN_SIGN ||
				  t === R.EQUALS_SIGN ||
				  t === R.GRAVE_ACCENT
				? (this._err(ee.unexpectedCharacterInUnquotedAttributeValue),
				  (this.currentAttr.value += Tt(t)))
				: t === R.EOF
				? (this._err(ee.eofInTag), this._emitEOFToken())
				: (this.currentAttr.value += Tt(t));
		}
		[al](t) {
			ft(t)
				? this._leaveAttrValue($n)
				: t === R.SOLIDUS
				? this._leaveAttrValue(Rr)
				: t === R.GREATER_THAN_SIGN
				? (this._leaveAttrValue(je), this._emitCurrentToken())
				: t === R.EOF
				? (this._err(ee.eofInTag), this._emitEOFToken())
				: (this._err(ee.missingWhitespaceBetweenAttributes),
				  this._reconsumeInState($n));
		}
		[Rr](t) {
			t === R.GREATER_THAN_SIGN
				? ((this.currentToken.selfClosing = !0),
				  (this.state = je),
				  this._emitCurrentToken())
				: t === R.EOF
				? (this._err(ee.eofInTag), this._emitEOFToken())
				: (this._err(ee.unexpectedSolidusInTag), this._reconsumeInState($n));
		}
		[q1](t) {
			t === R.GREATER_THAN_SIGN
				? ((this.state = je), this._emitCurrentToken())
				: t === R.EOF
				? (this._emitCurrentToken(), this._emitEOFToken())
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentToken.data += it.REPLACEMENT_CHARACTER))
				: (this.currentToken.data += Tt(t));
		}
		[rh](t) {
			this._consumeSequenceIfMatch(ui.DASH_DASH_STRING, t, !0)
				? (this._createCommentToken(), (this.state = ih))
				: this._consumeSequenceIfMatch(ui.DOCTYPE_STRING, t, !1)
				? (this.state = fh)
				: this._consumeSequenceIfMatch(ui.CDATA_START_STRING, t, !0)
				? this.allowCDATA
					? (this.state = vs)
					: (this._err(ee.cdataInHtmlContent),
					  this._createCommentToken(),
					  (this.currentToken.data = '[CDATA['),
					  (this.state = q1))
				: this._ensureHibernation() ||
				  (this._err(ee.incorrectlyOpenedComment),
				  this._createCommentToken(),
				  this._reconsumeInState(q1));
		}
		[ih](t) {
			t === R.HYPHEN_MINUS
				? (this.state = oh)
				: t === R.GREATER_THAN_SIGN
				? (this._err(ee.abruptClosingOfEmptyComment),
				  (this.state = je),
				  this._emitCurrentToken())
				: this._reconsumeInState(Dr);
		}
		[oh](t) {
			t === R.HYPHEN_MINUS
				? (this.state = ms)
				: t === R.GREATER_THAN_SIGN
				? (this._err(ee.abruptClosingOfEmptyComment),
				  (this.state = je),
				  this._emitCurrentToken())
				: t === R.EOF
				? (this._err(ee.eofInComment),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: ((this.currentToken.data += '-'), this._reconsumeInState(Dr));
		}
		[Dr](t) {
			t === R.HYPHEN_MINUS
				? (this.state = gs)
				: t === R.LESS_THAN_SIGN
				? ((this.currentToken.data += '<'), (this.state = sh))
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentToken.data += it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInComment),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: (this.currentToken.data += Tt(t));
		}
		[sh](t) {
			t === R.EXCLAMATION_MARK
				? ((this.currentToken.data += '!'), (this.state = ah))
				: t === R.LESS_THAN_SIGN
				? (this.currentToken.data += '!')
				: this._reconsumeInState(Dr);
		}
		[ah](t) {
			t === R.HYPHEN_MINUS ? (this.state = lh) : this._reconsumeInState(Dr);
		}
		[lh](t) {
			t === R.HYPHEN_MINUS ? (this.state = uh) : this._reconsumeInState(gs);
		}
		[uh](t) {
			t !== R.GREATER_THAN_SIGN && t !== R.EOF && this._err(ee.nestedComment),
				this._reconsumeInState(ms);
		}
		[gs](t) {
			t === R.HYPHEN_MINUS
				? (this.state = ms)
				: t === R.EOF
				? (this._err(ee.eofInComment),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: ((this.currentToken.data += '-'), this._reconsumeInState(Dr));
		}
		[ms](t) {
			t === R.GREATER_THAN_SIGN
				? ((this.state = je), this._emitCurrentToken())
				: t === R.EXCLAMATION_MARK
				? (this.state = ch)
				: t === R.HYPHEN_MINUS
				? (this.currentToken.data += '-')
				: t === R.EOF
				? (this._err(ee.eofInComment),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: ((this.currentToken.data += '--'), this._reconsumeInState(Dr));
		}
		[ch](t) {
			t === R.HYPHEN_MINUS
				? ((this.currentToken.data += '--!'), (this.state = gs))
				: t === R.GREATER_THAN_SIGN
				? (this._err(ee.incorrectlyClosedComment),
				  (this.state = je),
				  this._emitCurrentToken())
				: t === R.EOF
				? (this._err(ee.eofInComment),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: ((this.currentToken.data += '--!'), this._reconsumeInState(Dr));
		}
		[fh](t) {
			ft(t)
				? (this.state = Ts)
				: t === R.GREATER_THAN_SIGN
				? this._reconsumeInState(Ts)
				: t === R.EOF
				? (this._err(ee.eofInDoctype),
				  this._createDoctypeToken(null),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: (this._err(ee.missingWhitespaceBeforeDoctypeName),
				  this._reconsumeInState(Ts));
		}
		[Ts](t) {
			ft(t) ||
				(Gn(t)
					? (this._createDoctypeToken(Fr(t)), (this.state = Es))
					: t === R.NULL
					? (this._err(ee.unexpectedNullCharacter),
					  this._createDoctypeToken(it.REPLACEMENT_CHARACTER),
					  (this.state = Es))
					: t === R.GREATER_THAN_SIGN
					? (this._err(ee.missingDoctypeName),
					  this._createDoctypeToken(null),
					  (this.currentToken.forceQuirks = !0),
					  this._emitCurrentToken(),
					  (this.state = je))
					: t === R.EOF
					? (this._err(ee.eofInDoctype),
					  this._createDoctypeToken(null),
					  (this.currentToken.forceQuirks = !0),
					  this._emitCurrentToken(),
					  this._emitEOFToken())
					: (this._createDoctypeToken(Tt(t)), (this.state = Es)));
		}
		[Es](t) {
			ft(t)
				? (this.state = hh)
				: t === R.GREATER_THAN_SIGN
				? ((this.state = je), this._emitCurrentToken())
				: Gn(t)
				? (this.currentToken.name += Fr(t))
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentToken.name += it.REPLACEMENT_CHARACTER))
				: t === R.EOF
				? (this._err(ee.eofInDoctype),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: (this.currentToken.name += Tt(t));
		}
		[hh](t) {
			ft(t) ||
				(t === R.GREATER_THAN_SIGN
					? ((this.state = je), this._emitCurrentToken())
					: t === R.EOF
					? (this._err(ee.eofInDoctype),
					  (this.currentToken.forceQuirks = !0),
					  this._emitCurrentToken(),
					  this._emitEOFToken())
					: this._consumeSequenceIfMatch(ui.PUBLIC_STRING, t, !1)
					? (this.state = dh)
					: this._consumeSequenceIfMatch(ui.SYSTEM_STRING, t, !1)
					? (this.state = mh)
					: this._ensureHibernation() ||
					  (this._err(ee.invalidCharacterSequenceAfterDoctypeName),
					  (this.currentToken.forceQuirks = !0),
					  this._reconsumeInState(pr)));
		}
		[dh](t) {
			ft(t)
				? (this.state = ph)
				: t === R.QUOTATION_MARK
				? (this._err(ee.missingWhitespaceAfterDoctypePublicKeyword),
				  (this.currentToken.publicId = ''),
				  (this.state = ll))
				: t === R.APOSTROPHE
				? (this._err(ee.missingWhitespaceAfterDoctypePublicKeyword),
				  (this.currentToken.publicId = ''),
				  (this.state = ul))
				: t === R.GREATER_THAN_SIGN
				? (this._err(ee.missingDoctypePublicIdentifier),
				  (this.currentToken.forceQuirks = !0),
				  (this.state = je),
				  this._emitCurrentToken())
				: t === R.EOF
				? (this._err(ee.eofInDoctype),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: (this._err(ee.missingQuoteBeforeDoctypePublicIdentifier),
				  (this.currentToken.forceQuirks = !0),
				  this._reconsumeInState(pr));
		}
		[ph](t) {
			ft(t) ||
				(t === R.QUOTATION_MARK
					? ((this.currentToken.publicId = ''), (this.state = ll))
					: t === R.APOSTROPHE
					? ((this.currentToken.publicId = ''), (this.state = ul))
					: t === R.GREATER_THAN_SIGN
					? (this._err(ee.missingDoctypePublicIdentifier),
					  (this.currentToken.forceQuirks = !0),
					  (this.state = je),
					  this._emitCurrentToken())
					: t === R.EOF
					? (this._err(ee.eofInDoctype),
					  (this.currentToken.forceQuirks = !0),
					  this._emitCurrentToken(),
					  this._emitEOFToken())
					: (this._err(ee.missingQuoteBeforeDoctypePublicIdentifier),
					  (this.currentToken.forceQuirks = !0),
					  this._reconsumeInState(pr)));
		}
		[ll](t) {
			t === R.QUOTATION_MARK
				? (this.state = cl)
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentToken.publicId += it.REPLACEMENT_CHARACTER))
				: t === R.GREATER_THAN_SIGN
				? (this._err(ee.abruptDoctypePublicIdentifier),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  (this.state = je))
				: t === R.EOF
				? (this._err(ee.eofInDoctype),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: (this.currentToken.publicId += Tt(t));
		}
		[ul](t) {
			t === R.APOSTROPHE
				? (this.state = cl)
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentToken.publicId += it.REPLACEMENT_CHARACTER))
				: t === R.GREATER_THAN_SIGN
				? (this._err(ee.abruptDoctypePublicIdentifier),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  (this.state = je))
				: t === R.EOF
				? (this._err(ee.eofInDoctype),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: (this.currentToken.publicId += Tt(t));
		}
		[cl](t) {
			ft(t)
				? (this.state = gh)
				: t === R.GREATER_THAN_SIGN
				? ((this.state = je), this._emitCurrentToken())
				: t === R.QUOTATION_MARK
				? (this._err(
						ee.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
				  ),
				  (this.currentToken.systemId = ''),
				  (this.state = X1))
				: t === R.APOSTROPHE
				? (this._err(
						ee.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers
				  ),
				  (this.currentToken.systemId = ''),
				  (this.state = Q1))
				: t === R.EOF
				? (this._err(ee.eofInDoctype),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: (this._err(ee.missingQuoteBeforeDoctypeSystemIdentifier),
				  (this.currentToken.forceQuirks = !0),
				  this._reconsumeInState(pr));
		}
		[gh](t) {
			ft(t) ||
				(t === R.GREATER_THAN_SIGN
					? (this._emitCurrentToken(), (this.state = je))
					: t === R.QUOTATION_MARK
					? ((this.currentToken.systemId = ''), (this.state = X1))
					: t === R.APOSTROPHE
					? ((this.currentToken.systemId = ''), (this.state = Q1))
					: t === R.EOF
					? (this._err(ee.eofInDoctype),
					  (this.currentToken.forceQuirks = !0),
					  this._emitCurrentToken(),
					  this._emitEOFToken())
					: (this._err(ee.missingQuoteBeforeDoctypeSystemIdentifier),
					  (this.currentToken.forceQuirks = !0),
					  this._reconsumeInState(pr)));
		}
		[mh](t) {
			ft(t)
				? (this.state = Th)
				: t === R.QUOTATION_MARK
				? (this._err(ee.missingWhitespaceAfterDoctypeSystemKeyword),
				  (this.currentToken.systemId = ''),
				  (this.state = X1))
				: t === R.APOSTROPHE
				? (this._err(ee.missingWhitespaceAfterDoctypeSystemKeyword),
				  (this.currentToken.systemId = ''),
				  (this.state = Q1))
				: t === R.GREATER_THAN_SIGN
				? (this._err(ee.missingDoctypeSystemIdentifier),
				  (this.currentToken.forceQuirks = !0),
				  (this.state = je),
				  this._emitCurrentToken())
				: t === R.EOF
				? (this._err(ee.eofInDoctype),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: (this._err(ee.missingQuoteBeforeDoctypeSystemIdentifier),
				  (this.currentToken.forceQuirks = !0),
				  this._reconsumeInState(pr));
		}
		[Th](t) {
			ft(t) ||
				(t === R.QUOTATION_MARK
					? ((this.currentToken.systemId = ''), (this.state = X1))
					: t === R.APOSTROPHE
					? ((this.currentToken.systemId = ''), (this.state = Q1))
					: t === R.GREATER_THAN_SIGN
					? (this._err(ee.missingDoctypeSystemIdentifier),
					  (this.currentToken.forceQuirks = !0),
					  (this.state = je),
					  this._emitCurrentToken())
					: t === R.EOF
					? (this._err(ee.eofInDoctype),
					  (this.currentToken.forceQuirks = !0),
					  this._emitCurrentToken(),
					  this._emitEOFToken())
					: (this._err(ee.missingQuoteBeforeDoctypeSystemIdentifier),
					  (this.currentToken.forceQuirks = !0),
					  this._reconsumeInState(pr)));
		}
		[X1](t) {
			t === R.QUOTATION_MARK
				? (this.state = fl)
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentToken.systemId += it.REPLACEMENT_CHARACTER))
				: t === R.GREATER_THAN_SIGN
				? (this._err(ee.abruptDoctypeSystemIdentifier),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  (this.state = je))
				: t === R.EOF
				? (this._err(ee.eofInDoctype),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: (this.currentToken.systemId += Tt(t));
		}
		[Q1](t) {
			t === R.APOSTROPHE
				? (this.state = fl)
				: t === R.NULL
				? (this._err(ee.unexpectedNullCharacter),
				  (this.currentToken.systemId += it.REPLACEMENT_CHARACTER))
				: t === R.GREATER_THAN_SIGN
				? (this._err(ee.abruptDoctypeSystemIdentifier),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  (this.state = je))
				: t === R.EOF
				? (this._err(ee.eofInDoctype),
				  (this.currentToken.forceQuirks = !0),
				  this._emitCurrentToken(),
				  this._emitEOFToken())
				: (this.currentToken.systemId += Tt(t));
		}
		[fl](t) {
			ft(t) ||
				(t === R.GREATER_THAN_SIGN
					? (this._emitCurrentToken(), (this.state = je))
					: t === R.EOF
					? (this._err(ee.eofInDoctype),
					  (this.currentToken.forceQuirks = !0),
					  this._emitCurrentToken(),
					  this._emitEOFToken())
					: (this._err(ee.unexpectedCharacterAfterDoctypeSystemIdentifier),
					  this._reconsumeInState(pr)));
		}
		[pr](t) {
			t === R.GREATER_THAN_SIGN
				? (this._emitCurrentToken(), (this.state = je))
				: t === R.NULL
				? this._err(ee.unexpectedNullCharacter)
				: t === R.EOF && (this._emitCurrentToken(), this._emitEOFToken());
		}
		[vs](t) {
			t === R.RIGHT_SQUARE_BRACKET
				? (this.state = Eh)
				: t === R.EOF
				? (this._err(ee.eofInCdata), this._emitEOFToken())
				: this._emitCodePoint(t);
		}
		[Eh](t) {
			t === R.RIGHT_SQUARE_BRACKET
				? (this.state = vh)
				: (this._emitChars(']'), this._reconsumeInState(vs));
		}
		[vh](t) {
			t === R.GREATER_THAN_SIGN
				? (this.state = je)
				: t === R.RIGHT_SQUARE_BRACKET
				? this._emitChars(']')
				: (this._emitChars(']]'), this._reconsumeInState(vs));
		}
		[Qi](t) {
			(this.tempBuff = [R.AMPERSAND]),
				t === R.NUMBER_SIGN
					? (this.tempBuff.push(t), (this.state = _h))
					: hl(t)
					? this._reconsumeInState(yh)
					: (this._flushCodePointsConsumedAsCharacterReference(),
					  this._reconsumeInState(this.returnState));
		}
		[yh](t) {
			const r = this._matchNamedCharacterReference(t);
			if (this._ensureHibernation()) this.tempBuff = [R.AMPERSAND];
			else if (r) {
				const o = this.tempBuff[this.tempBuff.length - 1] === R.SEMICOLON;
				this._isCharacterReferenceAttributeQuirk(o) ||
					(o ||
						this._errOnNextCodePoint(
							ee.missingSemicolonAfterCharacterReference
						),
					(this.tempBuff = r)),
					this._flushCodePointsConsumedAsCharacterReference(),
					(this.state = this.returnState);
			} else
				this._flushCodePointsConsumedAsCharacterReference(), (this.state = Ah);
		}
		[Ah](t) {
			hl(t)
				? this._isCharacterReferenceInAttribute()
					? (this.currentAttr.value += Tt(t))
					: this._emitCodePoint(t)
				: (t === R.SEMICOLON && this._err(ee.unknownNamedCharacterReference),
				  this._reconsumeInState(this.returnState));
		}
		[_h](t) {
			(this.charRefCode = 0),
				t === R.LATIN_SMALL_X || t === R.LATIN_CAPITAL_X
					? (this.tempBuff.push(t), (this.state = Ch))
					: this._reconsumeInState(Sh);
		}
		[Ch](t) {
			u4(t)
				? this._reconsumeInState(bh)
				: (this._err(ee.absenceOfDigitsInNumericCharacterReference),
				  this._flushCodePointsConsumedAsCharacterReference(),
				  this._reconsumeInState(this.returnState));
		}
		[Sh](t) {
			Z1(t)
				? this._reconsumeInState(Nh)
				: (this._err(ee.absenceOfDigitsInNumericCharacterReference),
				  this._flushCodePointsConsumedAsCharacterReference(),
				  this._reconsumeInState(this.returnState));
		}
		[bh](t) {
			xh(t)
				? (this.charRefCode = this.charRefCode * 16 + t - 55)
				: kh(t)
				? (this.charRefCode = this.charRefCode * 16 + t - 87)
				: Z1(t)
				? (this.charRefCode = this.charRefCode * 16 + t - 48)
				: t === R.SEMICOLON
				? (this.state = V1)
				: (this._err(ee.missingSemicolonAfterCharacterReference),
				  this._reconsumeInState(V1));
		}
		[Nh](t) {
			Z1(t)
				? (this.charRefCode = this.charRefCode * 10 + t - 48)
				: t === R.SEMICOLON
				? (this.state = V1)
				: (this._err(ee.missingSemicolonAfterCharacterReference),
				  this._reconsumeInState(V1));
		}
		[V1]() {
			if (this.charRefCode === R.NULL)
				this._err(ee.nullCharacterReference),
					(this.charRefCode = R.REPLACEMENT_CHARACTER);
			else if (this.charRefCode > 1114111)
				this._err(ee.characterReferenceOutsideUnicodeRange),
					(this.charRefCode = R.REPLACEMENT_CHARACTER);
			else if (it.isSurrogate(this.charRefCode))
				this._err(ee.surrogateCharacterReference),
					(this.charRefCode = R.REPLACEMENT_CHARACTER);
			else if (it.isUndefinedCodePoint(this.charRefCode))
				this._err(ee.noncharacterCharacterReference);
			else if (
				it.isControlCodePoint(this.charRefCode) ||
				this.charRefCode === R.CARRIAGE_RETURN
			) {
				this._err(ee.controlCharacterReference);
				const t = a4[this.charRefCode];
				t && (this.charRefCode = t);
			}
			(this.tempBuff = [this.charRefCode]),
				this._flushCodePointsConsumedAsCharacterReference(),
				this._reconsumeInState(this.returnState);
		}
	};
	(kn.CHARACTER_TOKEN = 'CHARACTER_TOKEN'),
		(kn.NULL_CHARACTER_TOKEN = 'NULL_CHARACTER_TOKEN'),
		(kn.WHITESPACE_CHARACTER_TOKEN = 'WHITESPACE_CHARACTER_TOKEN'),
		(kn.START_TAG_TOKEN = 'START_TAG_TOKEN'),
		(kn.END_TAG_TOKEN = 'END_TAG_TOKEN'),
		(kn.COMMENT_TOKEN = 'COMMENT_TOKEN'),
		(kn.DOCTYPE_TOKEN = 'DOCTYPE_TOKEN'),
		(kn.EOF_TOKEN = 'EOF_TOKEN'),
		(kn.HIBERNATION_TOKEN = 'HIBERNATION_TOKEN'),
		(kn.MODE = {
			DATA: je,
			RCDATA: Xi,
			RAWTEXT: Y1,
			SCRIPT_DATA: hr,
			PLAINTEXT: Pf,
		}),
		(kn.getTokenAttr = function (e, t) {
			for (let r = e.attrs.length - 1; r >= 0; r--)
				if (e.attrs[r].name === t) return e.attrs[r].value;
			return null;
		});
	var As = kn,
		zn = {};
	const dl = (zn.NAMESPACES = {
		HTML: 'http://www.w3.org/1999/xhtml',
		MATHML: 'http://www.w3.org/1998/Math/MathML',
		SVG: 'http://www.w3.org/2000/svg',
		XLINK: 'http://www.w3.org/1999/xlink',
		XML: 'http://www.w3.org/XML/1998/namespace',
		XMLNS: 'http://www.w3.org/2000/xmlns/',
	});
	(zn.ATTRS = {
		TYPE: 'type',
		ACTION: 'action',
		ENCODING: 'encoding',
		PROMPT: 'prompt',
		NAME: 'name',
		COLOR: 'color',
		FACE: 'face',
		SIZE: 'size',
	}),
		(zn.DOCUMENT_MODE = {
			NO_QUIRKS: 'no-quirks',
			QUIRKS: 'quirks',
			LIMITED_QUIRKS: 'limited-quirks',
		});
	const ue = (zn.TAG_NAMES = {
		A: 'a',
		ADDRESS: 'address',
		ANNOTATION_XML: 'annotation-xml',
		APPLET: 'applet',
		AREA: 'area',
		ARTICLE: 'article',
		ASIDE: 'aside',
		B: 'b',
		BASE: 'base',
		BASEFONT: 'basefont',
		BGSOUND: 'bgsound',
		BIG: 'big',
		BLOCKQUOTE: 'blockquote',
		BODY: 'body',
		BR: 'br',
		BUTTON: 'button',
		CAPTION: 'caption',
		CENTER: 'center',
		CODE: 'code',
		COL: 'col',
		COLGROUP: 'colgroup',
		DD: 'dd',
		DESC: 'desc',
		DETAILS: 'details',
		DIALOG: 'dialog',
		DIR: 'dir',
		DIV: 'div',
		DL: 'dl',
		DT: 'dt',
		EM: 'em',
		EMBED: 'embed',
		FIELDSET: 'fieldset',
		FIGCAPTION: 'figcaption',
		FIGURE: 'figure',
		FONT: 'font',
		FOOTER: 'footer',
		FOREIGN_OBJECT: 'foreignObject',
		FORM: 'form',
		FRAME: 'frame',
		FRAMESET: 'frameset',
		H1: 'h1',
		H2: 'h2',
		H3: 'h3',
		H4: 'h4',
		H5: 'h5',
		H6: 'h6',
		HEAD: 'head',
		HEADER: 'header',
		HGROUP: 'hgroup',
		HR: 'hr',
		HTML: 'html',
		I: 'i',
		IMG: 'img',
		IMAGE: 'image',
		INPUT: 'input',
		IFRAME: 'iframe',
		KEYGEN: 'keygen',
		LABEL: 'label',
		LI: 'li',
		LINK: 'link',
		LISTING: 'listing',
		MAIN: 'main',
		MALIGNMARK: 'malignmark',
		MARQUEE: 'marquee',
		MATH: 'math',
		MENU: 'menu',
		META: 'meta',
		MGLYPH: 'mglyph',
		MI: 'mi',
		MO: 'mo',
		MN: 'mn',
		MS: 'ms',
		MTEXT: 'mtext',
		NAV: 'nav',
		NOBR: 'nobr',
		NOFRAMES: 'noframes',
		NOEMBED: 'noembed',
		NOSCRIPT: 'noscript',
		OBJECT: 'object',
		OL: 'ol',
		OPTGROUP: 'optgroup',
		OPTION: 'option',
		P: 'p',
		PARAM: 'param',
		PLAINTEXT: 'plaintext',
		PRE: 'pre',
		RB: 'rb',
		RP: 'rp',
		RT: 'rt',
		RTC: 'rtc',
		RUBY: 'ruby',
		S: 's',
		SCRIPT: 'script',
		SECTION: 'section',
		SELECT: 'select',
		SOURCE: 'source',
		SMALL: 'small',
		SPAN: 'span',
		STRIKE: 'strike',
		STRONG: 'strong',
		STYLE: 'style',
		SUB: 'sub',
		SUMMARY: 'summary',
		SUP: 'sup',
		TABLE: 'table',
		TBODY: 'tbody',
		TEMPLATE: 'template',
		TEXTAREA: 'textarea',
		TFOOT: 'tfoot',
		TD: 'td',
		TH: 'th',
		THEAD: 'thead',
		TITLE: 'title',
		TR: 'tr',
		TRACK: 'track',
		TT: 'tt',
		U: 'u',
		UL: 'ul',
		SVG: 'svg',
		VAR: 'var',
		WBR: 'wbr',
		XMP: 'xmp',
	});
	zn.SPECIAL_ELEMENTS = {
		[dl.HTML]: {
			[ue.ADDRESS]: !0,
			[ue.APPLET]: !0,
			[ue.AREA]: !0,
			[ue.ARTICLE]: !0,
			[ue.ASIDE]: !0,
			[ue.BASE]: !0,
			[ue.BASEFONT]: !0,
			[ue.BGSOUND]: !0,
			[ue.BLOCKQUOTE]: !0,
			[ue.BODY]: !0,
			[ue.BR]: !0,
			[ue.BUTTON]: !0,
			[ue.CAPTION]: !0,
			[ue.CENTER]: !0,
			[ue.COL]: !0,
			[ue.COLGROUP]: !0,
			[ue.DD]: !0,
			[ue.DETAILS]: !0,
			[ue.DIR]: !0,
			[ue.DIV]: !0,
			[ue.DL]: !0,
			[ue.DT]: !0,
			[ue.EMBED]: !0,
			[ue.FIELDSET]: !0,
			[ue.FIGCAPTION]: !0,
			[ue.FIGURE]: !0,
			[ue.FOOTER]: !0,
			[ue.FORM]: !0,
			[ue.FRAME]: !0,
			[ue.FRAMESET]: !0,
			[ue.H1]: !0,
			[ue.H2]: !0,
			[ue.H3]: !0,
			[ue.H4]: !0,
			[ue.H5]: !0,
			[ue.H6]: !0,
			[ue.HEAD]: !0,
			[ue.HEADER]: !0,
			[ue.HGROUP]: !0,
			[ue.HR]: !0,
			[ue.HTML]: !0,
			[ue.IFRAME]: !0,
			[ue.IMG]: !0,
			[ue.INPUT]: !0,
			[ue.LI]: !0,
			[ue.LINK]: !0,
			[ue.LISTING]: !0,
			[ue.MAIN]: !0,
			[ue.MARQUEE]: !0,
			[ue.MENU]: !0,
			[ue.META]: !0,
			[ue.NAV]: !0,
			[ue.NOEMBED]: !0,
			[ue.NOFRAMES]: !0,
			[ue.NOSCRIPT]: !0,
			[ue.OBJECT]: !0,
			[ue.OL]: !0,
			[ue.P]: !0,
			[ue.PARAM]: !0,
			[ue.PLAINTEXT]: !0,
			[ue.PRE]: !0,
			[ue.SCRIPT]: !0,
			[ue.SECTION]: !0,
			[ue.SELECT]: !0,
			[ue.SOURCE]: !0,
			[ue.STYLE]: !0,
			[ue.SUMMARY]: !0,
			[ue.TABLE]: !0,
			[ue.TBODY]: !0,
			[ue.TD]: !0,
			[ue.TEMPLATE]: !0,
			[ue.TEXTAREA]: !0,
			[ue.TFOOT]: !0,
			[ue.TH]: !0,
			[ue.THEAD]: !0,
			[ue.TITLE]: !0,
			[ue.TR]: !0,
			[ue.TRACK]: !0,
			[ue.UL]: !0,
			[ue.WBR]: !0,
			[ue.XMP]: !0,
		},
		[dl.MATHML]: {
			[ue.MI]: !0,
			[ue.MO]: !0,
			[ue.MN]: !0,
			[ue.MS]: !0,
			[ue.MTEXT]: !0,
			[ue.ANNOTATION_XML]: !0,
		},
		[dl.SVG]: {
			[ue.TITLE]: !0,
			[ue.FOREIGN_OBJECT]: !0,
			[ue.DESC]: !0,
		},
	};
	const wh = zn,
		ce = wh.TAG_NAMES,
		ot = wh.NAMESPACES;
	function Lh(e) {
		switch (e.length) {
			case 1:
				return e === ce.P;
			case 2:
				return (
					e === ce.RB ||
					e === ce.RP ||
					e === ce.RT ||
					e === ce.DD ||
					e === ce.DT ||
					e === ce.LI
				);
			case 3:
				return e === ce.RTC;
			case 6:
				return e === ce.OPTION;
			case 8:
				return e === ce.OPTGROUP;
		}
		return !1;
	}
	function c4(e) {
		switch (e.length) {
			case 1:
				return e === ce.P;
			case 2:
				return (
					e === ce.RB ||
					e === ce.RP ||
					e === ce.RT ||
					e === ce.DD ||
					e === ce.DT ||
					e === ce.LI ||
					e === ce.TD ||
					e === ce.TH ||
					e === ce.TR
				);
			case 3:
				return e === ce.RTC;
			case 5:
				return e === ce.TBODY || e === ce.TFOOT || e === ce.THEAD;
			case 6:
				return e === ce.OPTION;
			case 7:
				return e === ce.CAPTION;
			case 8:
				return e === ce.OPTGROUP || e === ce.COLGROUP;
		}
		return !1;
	}
	function _s(e, t) {
		switch (e.length) {
			case 2:
				if (e === ce.TD || e === ce.TH) return t === ot.HTML;
				if (e === ce.MI || e === ce.MO || e === ce.MN || e === ce.MS)
					return t === ot.MATHML;
				break;
			case 4:
				if (e === ce.HTML) return t === ot.HTML;
				if (e === ce.DESC) return t === ot.SVG;
				break;
			case 5:
				if (e === ce.TABLE) return t === ot.HTML;
				if (e === ce.MTEXT) return t === ot.MATHML;
				if (e === ce.TITLE) return t === ot.SVG;
				break;
			case 6:
				return (e === ce.APPLET || e === ce.OBJECT) && t === ot.HTML;
			case 7:
				return (e === ce.CAPTION || e === ce.MARQUEE) && t === ot.HTML;
			case 8:
				return e === ce.TEMPLATE && t === ot.HTML;
			case 13:
				return e === ce.FOREIGN_OBJECT && t === ot.SVG;
			case 14:
				return e === ce.ANNOTATION_XML && t === ot.MATHML;
		}
		return !1;
	}
	var f4 = class {
		constructor(t, r) {
			(this.stackTop = -1),
				(this.items = []),
				(this.current = t),
				(this.currentTagName = null),
				(this.currentTmplContent = null),
				(this.tmplCount = 0),
				(this.treeAdapter = r);
		}
		_indexOf(t) {
			let r = -1;
			for (let o = this.stackTop; o >= 0; o--)
				if (this.items[o] === t) {
					r = o;
					break;
				}
			return r;
		}
		_isInTemplate() {
			return (
				this.currentTagName === ce.TEMPLATE &&
				this.treeAdapter.getNamespaceURI(this.current) === ot.HTML
			);
		}
		_updateCurrentElement() {
			(this.current = this.items[this.stackTop]),
				(this.currentTagName =
					this.current && this.treeAdapter.getTagName(this.current)),
				(this.currentTmplContent = this._isInTemplate()
					? this.treeAdapter.getTemplateContent(this.current)
					: null);
		}
		push(t) {
			(this.items[++this.stackTop] = t),
				this._updateCurrentElement(),
				this._isInTemplate() && this.tmplCount++;
		}
		pop() {
			this.stackTop--,
				this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--,
				this._updateCurrentElement();
		}
		replace(t, r) {
			const o = this._indexOf(t);
			(this.items[o] = r), o === this.stackTop && this._updateCurrentElement();
		}
		insertAfter(t, r) {
			const o = this._indexOf(t) + 1;
			this.items.splice(o, 0, r),
				o === ++this.stackTop && this._updateCurrentElement();
		}
		popUntilTagNamePopped(t) {
			for (; this.stackTop > -1; ) {
				const r = this.currentTagName,
					o = this.treeAdapter.getNamespaceURI(this.current);
				if ((this.pop(), r === t && o === ot.HTML)) break;
			}
		}
		popUntilElementPopped(t) {
			for (; this.stackTop > -1; ) {
				const r = this.current;
				if ((this.pop(), r === t)) break;
			}
		}
		popUntilNumberedHeaderPopped() {
			for (; this.stackTop > -1; ) {
				const t = this.currentTagName,
					r = this.treeAdapter.getNamespaceURI(this.current);
				if (
					(this.pop(),
					t === ce.H1 ||
						t === ce.H2 ||
						t === ce.H3 ||
						t === ce.H4 ||
						t === ce.H5 ||
						(t === ce.H6 && r === ot.HTML))
				)
					break;
			}
		}
		popUntilTableCellPopped() {
			for (; this.stackTop > -1; ) {
				const t = this.currentTagName,
					r = this.treeAdapter.getNamespaceURI(this.current);
				if ((this.pop(), t === ce.TD || (t === ce.TH && r === ot.HTML))) break;
			}
		}
		popAllUpToHtmlElement() {
			(this.stackTop = 0), this._updateCurrentElement();
		}
		clearBackToTableContext() {
			for (
				;
				(this.currentTagName !== ce.TABLE &&
					this.currentTagName !== ce.TEMPLATE &&
					this.currentTagName !== ce.HTML) ||
				this.treeAdapter.getNamespaceURI(this.current) !== ot.HTML;

			)
				this.pop();
		}
		clearBackToTableBodyContext() {
			for (
				;
				(this.currentTagName !== ce.TBODY &&
					this.currentTagName !== ce.TFOOT &&
					this.currentTagName !== ce.THEAD &&
					this.currentTagName !== ce.TEMPLATE &&
					this.currentTagName !== ce.HTML) ||
				this.treeAdapter.getNamespaceURI(this.current) !== ot.HTML;

			)
				this.pop();
		}
		clearBackToTableRowContext() {
			for (
				;
				(this.currentTagName !== ce.TR &&
					this.currentTagName !== ce.TEMPLATE &&
					this.currentTagName !== ce.HTML) ||
				this.treeAdapter.getNamespaceURI(this.current) !== ot.HTML;

			)
				this.pop();
		}
		remove(t) {
			for (let r = this.stackTop; r >= 0; r--)
				if (this.items[r] === t) {
					this.items.splice(r, 1),
						this.stackTop--,
						this._updateCurrentElement();
					break;
				}
		}
		tryPeekProperlyNestedBodyElement() {
			const t = this.items[1];
			return t && this.treeAdapter.getTagName(t) === ce.BODY ? t : null;
		}
		contains(t) {
			return this._indexOf(t) > -1;
		}
		getCommonAncestor(t) {
			let r = this._indexOf(t);
			return --r >= 0 ? this.items[r] : null;
		}
		isRootHtmlElementCurrent() {
			return this.stackTop === 0 && this.currentTagName === ce.HTML;
		}
		hasInScope(t) {
			for (let r = this.stackTop; r >= 0; r--) {
				const o = this.treeAdapter.getTagName(this.items[r]),
					u = this.treeAdapter.getNamespaceURI(this.items[r]);
				if (o === t && u === ot.HTML) return !0;
				if (_s(o, u)) return !1;
			}
			return !0;
		}
		hasNumberedHeaderInScope() {
			for (let t = this.stackTop; t >= 0; t--) {
				const r = this.treeAdapter.getTagName(this.items[t]),
					o = this.treeAdapter.getNamespaceURI(this.items[t]);
				if (
					(r === ce.H1 ||
						r === ce.H2 ||
						r === ce.H3 ||
						r === ce.H4 ||
						r === ce.H5 ||
						r === ce.H6) &&
					o === ot.HTML
				)
					return !0;
				if (_s(r, o)) return !1;
			}
			return !0;
		}
		hasInListItemScope(t) {
			for (let r = this.stackTop; r >= 0; r--) {
				const o = this.treeAdapter.getTagName(this.items[r]),
					u = this.treeAdapter.getNamespaceURI(this.items[r]);
				if (o === t && u === ot.HTML) return !0;
				if (((o === ce.UL || o === ce.OL) && u === ot.HTML) || _s(o, u))
					return !1;
			}
			return !0;
		}
		hasInButtonScope(t) {
			for (let r = this.stackTop; r >= 0; r--) {
				const o = this.treeAdapter.getTagName(this.items[r]),
					u = this.treeAdapter.getNamespaceURI(this.items[r]);
				if (o === t && u === ot.HTML) return !0;
				if ((o === ce.BUTTON && u === ot.HTML) || _s(o, u)) return !1;
			}
			return !0;
		}
		hasInTableScope(t) {
			for (let r = this.stackTop; r >= 0; r--) {
				const o = this.treeAdapter.getTagName(this.items[r]);
				if (this.treeAdapter.getNamespaceURI(this.items[r]) === ot.HTML) {
					if (o === t) return !0;
					if (o === ce.TABLE || o === ce.TEMPLATE || o === ce.HTML) return !1;
				}
			}
			return !0;
		}
		hasTableBodyContextInTableScope() {
			for (let t = this.stackTop; t >= 0; t--) {
				const r = this.treeAdapter.getTagName(this.items[t]);
				if (this.treeAdapter.getNamespaceURI(this.items[t]) === ot.HTML) {
					if (r === ce.TBODY || r === ce.THEAD || r === ce.TFOOT) return !0;
					if (r === ce.TABLE || r === ce.HTML) return !1;
				}
			}
			return !0;
		}
		hasInSelectScope(t) {
			for (let r = this.stackTop; r >= 0; r--) {
				const o = this.treeAdapter.getTagName(this.items[r]);
				if (this.treeAdapter.getNamespaceURI(this.items[r]) === ot.HTML) {
					if (o === t) return !0;
					if (o !== ce.OPTION && o !== ce.OPTGROUP) return !1;
				}
			}
			return !0;
		}
		generateImpliedEndTags() {
			for (; Lh(this.currentTagName); ) this.pop();
		}
		generateImpliedEndTagsThoroughly() {
			for (; c4(this.currentTagName); ) this.pop();
		}
		generateImpliedEndTagsWithExclusion(t) {
			for (; Lh(this.currentTagName) && this.currentTagName !== t; ) this.pop();
		}
	};
	const Cs = 3;
	let pl = class $r {
		constructor(t) {
			(this.length = 0),
				(this.entries = []),
				(this.treeAdapter = t),
				(this.bookmark = null);
		}
		_getNoahArkConditionCandidates(t) {
			const r = [];
			if (this.length >= Cs) {
				const o = this.treeAdapter.getAttrList(t).length,
					u = this.treeAdapter.getTagName(t),
					c = this.treeAdapter.getNamespaceURI(t);
				for (let f = this.length - 1; f >= 0; f--) {
					const d = this.entries[f];
					if (d.type === $r.MARKER_ENTRY) break;
					const g = d.element,
						T = this.treeAdapter.getAttrList(g);
					this.treeAdapter.getTagName(g) === u &&
						this.treeAdapter.getNamespaceURI(g) === c &&
						T.length === o &&
						r.push({
							idx: f,
							attrs: T,
						});
				}
			}
			return r.length < Cs ? [] : r;
		}
		_ensureNoahArkCondition(t) {
			const r = this._getNoahArkConditionCandidates(t);
			let o = r.length;
			if (o) {
				const u = this.treeAdapter.getAttrList(t),
					c = u.length,
					f = Object.create(null);
				for (let d = 0; d < c; d++) {
					const g = u[d];
					f[g.name] = g.value;
				}
				for (let d = 0; d < c; d++)
					for (let g = 0; g < o; g++) {
						const T = r[g].attrs[d];
						if ((f[T.name] !== T.value && (r.splice(g, 1), o--), r.length < Cs))
							return;
					}
				for (let d = o - 1; d >= Cs - 1; d--)
					this.entries.splice(r[d].idx, 1), this.length--;
			}
		}
		insertMarker() {
			this.entries.push({
				type: $r.MARKER_ENTRY,
			}),
				this.length++;
		}
		pushElement(t, r) {
			this._ensureNoahArkCondition(t),
				this.entries.push({
					type: $r.ELEMENT_ENTRY,
					element: t,
					token: r,
				}),
				this.length++;
		}
		insertElementAfterBookmark(t, r) {
			let o = this.length - 1;
			for (; o >= 0 && this.entries[o] !== this.bookmark; o--);
			this.entries.splice(o + 1, 0, {
				type: $r.ELEMENT_ENTRY,
				element: t,
				token: r,
			}),
				this.length++;
		}
		removeEntry(t) {
			for (let r = this.length - 1; r >= 0; r--)
				if (this.entries[r] === t) {
					this.entries.splice(r, 1), this.length--;
					break;
				}
		}
		clearToLastMarker() {
			for (; this.length; ) {
				const t = this.entries.pop();
				if ((this.length--, t.type === $r.MARKER_ENTRY)) break;
			}
		}
		getElementEntryInScopeWithTagName(t) {
			for (let r = this.length - 1; r >= 0; r--) {
				const o = this.entries[r];
				if (o.type === $r.MARKER_ENTRY) return null;
				if (this.treeAdapter.getTagName(o.element) === t) return o;
			}
			return null;
		}
		getElementEntry(t) {
			for (let r = this.length - 1; r >= 0; r--) {
				const o = this.entries[r];
				if (o.type === $r.ELEMENT_ENTRY && o.element === t) return o;
			}
			return null;
		}
	};
	(pl.MARKER_ENTRY = 'MARKER_ENTRY'), (pl.ELEMENT_ENTRY = 'ELEMENT_ENTRY');
	var h4 = pl;
	let Ih = class {
		constructor(t) {
			const r = {},
				o = this._getOverriddenMethods(this, r);
			for (const u of Object.keys(o))
				typeof o[u] == 'function' && ((r[u] = t[u]), (t[u] = o[u]));
		}
		_getOverriddenMethods() {
			throw new Error('Not implemented');
		}
	};
	Ih.install = function (e, t, r) {
		e.__mixins || (e.__mixins = []);
		for (let u = 0; u < e.__mixins.length; u++)
			if (e.__mixins[u].constructor === t) return e.__mixins[u];
		const o = new t(e, r);
		return e.__mixins.push(o), o;
	};
	var gr = Ih;
	const d4 = gr;
	var Mh = class extends d4 {
		constructor(t) {
			super(t),
				(this.preprocessor = t),
				(this.isEol = !1),
				(this.lineStartPos = 0),
				(this.droppedBufferSize = 0),
				(this.offset = 0),
				(this.col = 0),
				(this.line = 1);
		}
		_getOverriddenMethods(t, r) {
			return {
				advance() {
					const o = this.pos + 1,
						u = this.html[o];
					return (
						t.isEol && ((t.isEol = !1), t.line++, (t.lineStartPos = o)),
						(u ===
							`
` ||
							(u === '\r' &&
								this.html[o + 1] !==
									`
`)) &&
							(t.isEol = !0),
						(t.col = o - t.lineStartPos + 1),
						(t.offset = t.droppedBufferSize + o),
						r.advance.call(this)
					);
				},
				retreat() {
					r.retreat.call(this),
						(t.isEol = !1),
						(t.col = this.pos - t.lineStartPos + 1);
				},
				dropParsedChunk() {
					const o = this.pos;
					r.dropParsedChunk.call(this);
					const u = o - this.pos;
					(t.lineStartPos -= u),
						(t.droppedBufferSize += u),
						(t.offset = t.droppedBufferSize + this.pos);
				},
			};
		}
	};
	const Rh = gr,
		gl = As,
		p4 = Mh;
	var Dh = class extends Rh {
		constructor(t) {
			super(t),
				(this.tokenizer = t),
				(this.posTracker = Rh.install(t.preprocessor, p4)),
				(this.currentAttrLocation = null),
				(this.ctLoc = null);
		}
		_getCurrentLocation() {
			return {
				startLine: this.posTracker.line,
				startCol: this.posTracker.col,
				startOffset: this.posTracker.offset,
				endLine: -1,
				endCol: -1,
				endOffset: -1,
			};
		}
		_attachCurrentAttrLocationInfo() {
			(this.currentAttrLocation.endLine = this.posTracker.line),
				(this.currentAttrLocation.endCol = this.posTracker.col),
				(this.currentAttrLocation.endOffset = this.posTracker.offset);
			const t = this.tokenizer.currentToken,
				r = this.tokenizer.currentAttr;
			t.location.attrs || (t.location.attrs = Object.create(null)),
				(t.location.attrs[r.name] = this.currentAttrLocation);
		}
		_getOverriddenMethods(t, r) {
			const o = {
				_createStartTagToken() {
					r._createStartTagToken.call(this),
						(this.currentToken.location = t.ctLoc);
				},
				_createEndTagToken() {
					r._createEndTagToken.call(this),
						(this.currentToken.location = t.ctLoc);
				},
				_createCommentToken() {
					r._createCommentToken.call(this),
						(this.currentToken.location = t.ctLoc);
				},
				_createDoctypeToken(u) {
					r._createDoctypeToken.call(this, u),
						(this.currentToken.location = t.ctLoc);
				},
				_createCharacterToken(u, c) {
					r._createCharacterToken.call(this, u, c),
						(this.currentCharacterToken.location = t.ctLoc);
				},
				_createEOFToken() {
					r._createEOFToken.call(this),
						(this.currentToken.location = t._getCurrentLocation());
				},
				_createAttr(u) {
					r._createAttr.call(this, u),
						(t.currentAttrLocation = t._getCurrentLocation());
				},
				_leaveAttrName(u) {
					r._leaveAttrName.call(this, u), t._attachCurrentAttrLocationInfo();
				},
				_leaveAttrValue(u) {
					r._leaveAttrValue.call(this, u), t._attachCurrentAttrLocationInfo();
				},
				_emitCurrentToken() {
					const u = this.currentToken.location;
					this.currentCharacterToken &&
						((this.currentCharacterToken.location.endLine = u.startLine),
						(this.currentCharacterToken.location.endCol = u.startCol),
						(this.currentCharacterToken.location.endOffset = u.startOffset)),
						this.currentToken.type === gl.EOF_TOKEN
							? ((u.endLine = u.startLine),
							  (u.endCol = u.startCol),
							  (u.endOffset = u.startOffset))
							: ((u.endLine = t.posTracker.line),
							  (u.endCol = t.posTracker.col + 1),
							  (u.endOffset = t.posTracker.offset + 1)),
						r._emitCurrentToken.call(this);
				},
				_emitCurrentCharacterToken() {
					const u =
						this.currentCharacterToken && this.currentCharacterToken.location;
					u &&
						u.endOffset === -1 &&
						((u.endLine = t.posTracker.line),
						(u.endCol = t.posTracker.col),
						(u.endOffset = t.posTracker.offset)),
						r._emitCurrentCharacterToken.call(this);
				},
			};
			return (
				Object.keys(gl.MODE).forEach((u) => {
					const c = gl.MODE[u];
					o[c] = function (f) {
						(t.ctLoc = t._getCurrentLocation()), r[c].call(this, f);
					};
				}),
				o
			);
		}
	};
	const g4 = gr;
	var m4 = class extends g4 {
		constructor(t, r) {
			super(t), (this.onItemPop = r.onItemPop);
		}
		_getOverriddenMethods(t, r) {
			return {
				pop() {
					t.onItemPop(this.current), r.pop.call(this);
				},
				popAllUpToHtmlElement() {
					for (let o = this.stackTop; o > 0; o--) t.onItemPop(this.items[o]);
					r.popAllUpToHtmlElement.call(this);
				},
				remove(o) {
					t.onItemPop(this.current), r.remove.call(this, o);
				},
			};
		}
	};
	const ml = gr,
		Ph = As,
		T4 = Dh,
		E4 = m4,
		Tl = zn.TAG_NAMES;
	var v4 = class extends ml {
		constructor(t) {
			super(t),
				(this.parser = t),
				(this.treeAdapter = this.parser.treeAdapter),
				(this.posTracker = null),
				(this.lastStartTagToken = null),
				(this.lastFosterParentingLocation = null),
				(this.currentToken = null);
		}
		_setStartLocation(t) {
			let r = null;
			this.lastStartTagToken &&
				((r = Object.assign({}, this.lastStartTagToken.location)),
				(r.startTag = this.lastStartTagToken.location)),
				this.treeAdapter.setNodeSourceCodeLocation(t, r);
		}
		_setEndLocation(t, r) {
			if (this.treeAdapter.getNodeSourceCodeLocation(t) && r.location) {
				const u = r.location,
					c = this.treeAdapter.getTagName(t),
					f = r.type === Ph.END_TAG_TOKEN && c === r.tagName,
					d = {};
				f
					? ((d.endTag = Object.assign({}, u)),
					  (d.endLine = u.endLine),
					  (d.endCol = u.endCol),
					  (d.endOffset = u.endOffset))
					: ((d.endLine = u.startLine),
					  (d.endCol = u.startCol),
					  (d.endOffset = u.startOffset)),
					this.treeAdapter.updateNodeSourceCodeLocation(t, d);
			}
		}
		_getOverriddenMethods(t, r) {
			return {
				_bootstrap(o, u) {
					r._bootstrap.call(this, o, u),
						(t.lastStartTagToken = null),
						(t.lastFosterParentingLocation = null),
						(t.currentToken = null);
					const c = ml.install(this.tokenizer, T4);
					(t.posTracker = c.posTracker),
						ml.install(this.openElements, E4, {
							onItemPop: function (f) {
								t._setEndLocation(f, t.currentToken);
							},
						});
				},
				_runParsingLoop(o) {
					r._runParsingLoop.call(this, o);
					for (let u = this.openElements.stackTop; u >= 0; u--)
						t._setEndLocation(this.openElements.items[u], t.currentToken);
				},
				_processTokenInForeignContent(o) {
					(t.currentToken = o), r._processTokenInForeignContent.call(this, o);
				},
				_processToken(o) {
					if (
						((t.currentToken = o),
						r._processToken.call(this, o),
						o.type === Ph.END_TAG_TOKEN &&
							(o.tagName === Tl.HTML ||
								(o.tagName === Tl.BODY &&
									this.openElements.hasInScope(Tl.BODY))))
					)
						for (let c = this.openElements.stackTop; c >= 0; c--) {
							const f = this.openElements.items[c];
							if (this.treeAdapter.getTagName(f) === o.tagName) {
								t._setEndLocation(f, o);
								break;
							}
						}
				},
				_setDocumentType(o) {
					r._setDocumentType.call(this, o);
					const u = this.treeAdapter.getChildNodes(this.document),
						c = u.length;
					for (let f = 0; f < c; f++) {
						const d = u[f];
						if (this.treeAdapter.isDocumentTypeNode(d)) {
							this.treeAdapter.setNodeSourceCodeLocation(d, o.location);
							break;
						}
					}
				},
				_attachElementToTree(o) {
					t._setStartLocation(o),
						(t.lastStartTagToken = null),
						r._attachElementToTree.call(this, o);
				},
				_appendElement(o, u) {
					(t.lastStartTagToken = o), r._appendElement.call(this, o, u);
				},
				_insertElement(o, u) {
					(t.lastStartTagToken = o), r._insertElement.call(this, o, u);
				},
				_insertTemplate(o) {
					(t.lastStartTagToken = o), r._insertTemplate.call(this, o);
					const u = this.treeAdapter.getTemplateContent(
						this.openElements.current
					);
					this.treeAdapter.setNodeSourceCodeLocation(u, null);
				},
				_insertFakeRootElement() {
					r._insertFakeRootElement.call(this),
						this.treeAdapter.setNodeSourceCodeLocation(
							this.openElements.current,
							null
						);
				},
				_appendCommentNode(o, u) {
					r._appendCommentNode.call(this, o, u);
					const c = this.treeAdapter.getChildNodes(u),
						f = c[c.length - 1];
					this.treeAdapter.setNodeSourceCodeLocation(f, o.location);
				},
				_findFosterParentingLocation() {
					return (
						(t.lastFosterParentingLocation =
							r._findFosterParentingLocation.call(this)),
						t.lastFosterParentingLocation
					);
				},
				_insertCharacters(o) {
					r._insertCharacters.call(this, o);
					const u = this._shouldFosterParentOnInsertion(),
						c =
							(u && t.lastFosterParentingLocation.parent) ||
							this.openElements.currentTmplContent ||
							this.openElements.current,
						f = this.treeAdapter.getChildNodes(c),
						d =
							u && t.lastFosterParentingLocation.beforeElement
								? f.indexOf(t.lastFosterParentingLocation.beforeElement) - 1
								: f.length - 1,
						g = f[d];
					if (this.treeAdapter.getNodeSourceCodeLocation(g)) {
						const { endLine: A, endCol: C, endOffset: M } = o.location;
						this.treeAdapter.updateNodeSourceCodeLocation(g, {
							endLine: A,
							endCol: C,
							endOffset: M,
						});
					} else this.treeAdapter.setNodeSourceCodeLocation(g, o.location);
				},
			};
		}
	};
	const y4 = gr;
	var El = class extends y4 {
		constructor(t, r) {
			super(t), (this.posTracker = null), (this.onParseError = r.onParseError);
		}
		_setErrorLocation(t) {
			(t.startLine = t.endLine = this.posTracker.line),
				(t.startCol = t.endCol = this.posTracker.col),
				(t.startOffset = t.endOffset = this.posTracker.offset);
		}
		_reportError(t) {
			const r = {
				code: t,
				startLine: -1,
				startCol: -1,
				startOffset: -1,
				endLine: -1,
				endCol: -1,
				endOffset: -1,
			};
			this._setErrorLocation(r), this.onParseError(r);
		}
		_getOverriddenMethods(t) {
			return {
				_err(r) {
					t._reportError(r);
				},
			};
		}
	};
	const A4 = El,
		_4 = Mh,
		C4 = gr;
	var S4 = class extends A4 {
		constructor(t, r) {
			super(t, r),
				(this.posTracker = C4.install(t, _4)),
				(this.lastErrOffset = -1);
		}
		_reportError(t) {
			this.lastErrOffset !== this.posTracker.offset &&
				((this.lastErrOffset = this.posTracker.offset), super._reportError(t));
		}
	};
	const b4 = El,
		N4 = S4,
		x4 = gr;
	var k4 = class extends b4 {
		constructor(t, r) {
			super(t, r);
			const o = x4.install(t.preprocessor, N4, r);
			this.posTracker = o.posTracker;
		}
	};
	const O4 = El,
		w4 = k4,
		L4 = Dh,
		Fh = gr;
	var I4 = class extends O4 {
			constructor(t, r) {
				super(t, r),
					(this.opts = r),
					(this.ctLoc = null),
					(this.locBeforeToken = !1);
			}
			_setErrorLocation(t) {
				this.ctLoc &&
					((t.startLine = this.ctLoc.startLine),
					(t.startCol = this.ctLoc.startCol),
					(t.startOffset = this.ctLoc.startOffset),
					(t.endLine = this.locBeforeToken
						? this.ctLoc.startLine
						: this.ctLoc.endLine),
					(t.endCol = this.locBeforeToken
						? this.ctLoc.startCol
						: this.ctLoc.endCol),
					(t.endOffset = this.locBeforeToken
						? this.ctLoc.startOffset
						: this.ctLoc.endOffset));
			}
			_getOverriddenMethods(t, r) {
				return {
					_bootstrap(o, u) {
						r._bootstrap.call(this, o, u),
							Fh.install(this.tokenizer, w4, t.opts),
							Fh.install(this.tokenizer, L4);
					},
					_processInputToken(o) {
						(t.ctLoc = o.location), r._processInputToken.call(this, o);
					},
					_err(o, u) {
						(t.locBeforeToken = u && u.beforeToken), t._reportError(o);
					},
				};
			}
		},
		Qe = {};
	const { DOCUMENT_MODE: M4 } = zn;
	(Qe.createDocument = function () {
		return {
			nodeName: '#document',
			mode: M4.NO_QUIRKS,
			childNodes: [],
		};
	}),
		(Qe.createDocumentFragment = function () {
			return {
				nodeName: '#document-fragment',
				childNodes: [],
			};
		}),
		(Qe.createElement = function (e, t, r) {
			return {
				nodeName: e,
				tagName: e,
				attrs: r,
				namespaceURI: t,
				childNodes: [],
				parentNode: null,
			};
		}),
		(Qe.createCommentNode = function (e) {
			return {
				nodeName: '#comment',
				data: e,
				parentNode: null,
			};
		});
	const Hh = function (e) {
			return {
				nodeName: '#text',
				value: e,
				parentNode: null,
			};
		},
		Bh = (Qe.appendChild = function (e, t) {
			e.childNodes.push(t), (t.parentNode = e);
		}),
		R4 = (Qe.insertBefore = function (e, t, r) {
			const o = e.childNodes.indexOf(r);
			e.childNodes.splice(o, 0, t), (t.parentNode = e);
		});
	(Qe.setTemplateContent = function (e, t) {
		e.content = t;
	}),
		(Qe.getTemplateContent = function (e) {
			return e.content;
		}),
		(Qe.setDocumentType = function (e, t, r, o) {
			let u = null;
			for (let c = 0; c < e.childNodes.length; c++)
				if (e.childNodes[c].nodeName === '#documentType') {
					u = e.childNodes[c];
					break;
				}
			u
				? ((u.name = t), (u.publicId = r), (u.systemId = o))
				: Bh(e, {
						nodeName: '#documentType',
						name: t,
						publicId: r,
						systemId: o,
				  });
		}),
		(Qe.setDocumentMode = function (e, t) {
			e.mode = t;
		}),
		(Qe.getDocumentMode = function (e) {
			return e.mode;
		}),
		(Qe.detachNode = function (e) {
			if (e.parentNode) {
				const t = e.parentNode.childNodes.indexOf(e);
				e.parentNode.childNodes.splice(t, 1), (e.parentNode = null);
			}
		}),
		(Qe.insertText = function (e, t) {
			if (e.childNodes.length) {
				const r = e.childNodes[e.childNodes.length - 1];
				if (r.nodeName === '#text') {
					r.value += t;
					return;
				}
			}
			Bh(e, Hh(t));
		}),
		(Qe.insertTextBefore = function (e, t, r) {
			const o = e.childNodes[e.childNodes.indexOf(r) - 1];
			o && o.nodeName === '#text' ? (o.value += t) : R4(e, Hh(t), r);
		}),
		(Qe.adoptAttributes = function (e, t) {
			const r = [];
			for (let o = 0; o < e.attrs.length; o++) r.push(e.attrs[o].name);
			for (let o = 0; o < t.length; o++)
				r.indexOf(t[o].name) === -1 && e.attrs.push(t[o]);
		}),
		(Qe.getFirstChild = function (e) {
			return e.childNodes[0];
		}),
		(Qe.getChildNodes = function (e) {
			return e.childNodes;
		}),
		(Qe.getParentNode = function (e) {
			return e.parentNode;
		}),
		(Qe.getAttrList = function (e) {
			return e.attrs;
		}),
		(Qe.getTagName = function (e) {
			return e.tagName;
		}),
		(Qe.getNamespaceURI = function (e) {
			return e.namespaceURI;
		}),
		(Qe.getTextNodeContent = function (e) {
			return e.value;
		}),
		(Qe.getCommentNodeContent = function (e) {
			return e.data;
		}),
		(Qe.getDocumentTypeNodeName = function (e) {
			return e.name;
		}),
		(Qe.getDocumentTypeNodePublicId = function (e) {
			return e.publicId;
		}),
		(Qe.getDocumentTypeNodeSystemId = function (e) {
			return e.systemId;
		}),
		(Qe.isTextNode = function (e) {
			return e.nodeName === '#text';
		}),
		(Qe.isCommentNode = function (e) {
			return e.nodeName === '#comment';
		}),
		(Qe.isDocumentTypeNode = function (e) {
			return e.nodeName === '#documentType';
		}),
		(Qe.isElementNode = function (e) {
			return !!e.tagName;
		}),
		(Qe.setNodeSourceCodeLocation = function (e, t) {
			e.sourceCodeLocation = t;
		}),
		(Qe.getNodeSourceCodeLocation = function (e) {
			return e.sourceCodeLocation;
		}),
		(Qe.updateNodeSourceCodeLocation = function (e, t) {
			e.sourceCodeLocation = Object.assign(e.sourceCodeLocation, t);
		});
	var D4 = function (t, r) {
			return (
				(r = r || Object.create(null)),
				[t, r].reduce(
					(o, u) => (
						Object.keys(u).forEach((c) => {
							o[c] = u[c];
						}),
						o
					),
					Object.create(null)
				)
			);
		},
		Ss = {};
	const { DOCUMENT_MODE: Vi } = zn,
		Uh = 'html',
		P4 = 'about:legacy-compat',
		F4 = 'http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd',
		Gh = [
			'+//silmaril//dtd html pro v0r11 19970101//',
			'-//as//dtd html 3.0 aswedit + extensions//',
			'-//advasoft ltd//dtd html 3.0 aswedit + extensions//',
			'-//ietf//dtd html 2.0 level 1//',
			'-//ietf//dtd html 2.0 level 2//',
			'-//ietf//dtd html 2.0 strict level 1//',
			'-//ietf//dtd html 2.0 strict level 2//',
			'-//ietf//dtd html 2.0 strict//',
			'-//ietf//dtd html 2.0//',
			'-//ietf//dtd html 2.1e//',
			'-//ietf//dtd html 3.0//',
			'-//ietf//dtd html 3.2 final//',
			'-//ietf//dtd html 3.2//',
			'-//ietf//dtd html 3//',
			'-//ietf//dtd html level 0//',
			'-//ietf//dtd html level 1//',
			'-//ietf//dtd html level 2//',
			'-//ietf//dtd html level 3//',
			'-//ietf//dtd html strict level 0//',
			'-//ietf//dtd html strict level 1//',
			'-//ietf//dtd html strict level 2//',
			'-//ietf//dtd html strict level 3//',
			'-//ietf//dtd html strict//',
			'-//ietf//dtd html//',
			'-//metrius//dtd metrius presentational//',
			'-//microsoft//dtd internet explorer 2.0 html strict//',
			'-//microsoft//dtd internet explorer 2.0 html//',
			'-//microsoft//dtd internet explorer 2.0 tables//',
			'-//microsoft//dtd internet explorer 3.0 html strict//',
			'-//microsoft//dtd internet explorer 3.0 html//',
			'-//microsoft//dtd internet explorer 3.0 tables//',
			'-//netscape comm. corp.//dtd html//',
			'-//netscape comm. corp.//dtd strict html//',
			"-//o'reilly and associates//dtd html 2.0//",
			"-//o'reilly and associates//dtd html extended 1.0//",
			"-//o'reilly and associates//dtd html extended relaxed 1.0//",
			'-//sq//dtd html 2.0 hotmetal + extensions//',
			'-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//',
			'-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//',
			'-//spyglass//dtd html 2.0 extended//',
			'-//sun microsystems corp.//dtd hotjava html//',
			'-//sun microsystems corp.//dtd hotjava strict html//',
			'-//w3c//dtd html 3 1995-03-24//',
			'-//w3c//dtd html 3.2 draft//',
			'-//w3c//dtd html 3.2 final//',
			'-//w3c//dtd html 3.2//',
			'-//w3c//dtd html 3.2s draft//',
			'-//w3c//dtd html 4.0 frameset//',
			'-//w3c//dtd html 4.0 transitional//',
			'-//w3c//dtd html experimental 19960712//',
			'-//w3c//dtd html experimental 970421//',
			'-//w3c//dtd w3 html//',
			'-//w3o//dtd w3 html 3.0//',
			'-//webtechs//dtd mozilla html 2.0//',
			'-//webtechs//dtd mozilla html//',
		],
		H4 = Gh.concat([
			'-//w3c//dtd html 4.01 frameset//',
			'-//w3c//dtd html 4.01 transitional//',
		]),
		B4 = [
			'-//w3o//dtd w3 html strict 3.0//en//',
			'-/w3c/dtd html 4.0 transitional/en',
			'html',
		],
		zh = [
			'-//w3c//dtd xhtml 1.0 frameset//',
			'-//w3c//dtd xhtml 1.0 transitional//',
		],
		U4 = zh.concat([
			'-//w3c//dtd html 4.01 frameset//',
			'-//w3c//dtd html 4.01 transitional//',
		]);
	function Wh(e) {
		const t = e.indexOf('"') !== -1 ? "'" : '"';
		return t + e + t;
	}
	function Kh(e, t) {
		for (let r = 0; r < t.length; r++) if (e.indexOf(t[r]) === 0) return !0;
		return !1;
	}
	(Ss.isConforming = function (e) {
		return (
			e.name === Uh &&
			e.publicId === null &&
			(e.systemId === null || e.systemId === P4)
		);
	}),
		(Ss.getDocumentMode = function (e) {
			if (e.name !== Uh) return Vi.QUIRKS;
			const t = e.systemId;
			if (t && t.toLowerCase() === F4) return Vi.QUIRKS;
			let r = e.publicId;
			if (r !== null) {
				if (((r = r.toLowerCase()), B4.indexOf(r) > -1)) return Vi.QUIRKS;
				let o = t === null ? H4 : Gh;
				if (Kh(r, o)) return Vi.QUIRKS;
				if (((o = t === null ? zh : U4), Kh(r, o))) return Vi.LIMITED_QUIRKS;
			}
			return Vi.NO_QUIRKS;
		}),
		(Ss.serializeContent = function (e, t, r) {
			let o = '!DOCTYPE ';
			return (
				e && (o += e),
				t ? (o += ' PUBLIC ' + Wh(t)) : r && (o += ' SYSTEM'),
				r !== null && (o += ' ' + Wh(r)),
				o
			);
		});
	var Hr = {};
	const vl = As,
		yl = zn,
		ke = yl.TAG_NAMES,
		jt = yl.NAMESPACES,
		bs = yl.ATTRS,
		jh = {
			TEXT_HTML: 'text/html',
			APPLICATION_XML: 'application/xhtml+xml',
		},
		G4 = 'definitionurl',
		z4 = 'definitionURL',
		W4 = {
			attributename: 'attributeName',
			attributetype: 'attributeType',
			basefrequency: 'baseFrequency',
			baseprofile: 'baseProfile',
			calcmode: 'calcMode',
			clippathunits: 'clipPathUnits',
			diffuseconstant: 'diffuseConstant',
			edgemode: 'edgeMode',
			filterunits: 'filterUnits',
			glyphref: 'glyphRef',
			gradienttransform: 'gradientTransform',
			gradientunits: 'gradientUnits',
			kernelmatrix: 'kernelMatrix',
			kernelunitlength: 'kernelUnitLength',
			keypoints: 'keyPoints',
			keysplines: 'keySplines',
			keytimes: 'keyTimes',
			lengthadjust: 'lengthAdjust',
			limitingconeangle: 'limitingConeAngle',
			markerheight: 'markerHeight',
			markerunits: 'markerUnits',
			markerwidth: 'markerWidth',
			maskcontentunits: 'maskContentUnits',
			maskunits: 'maskUnits',
			numoctaves: 'numOctaves',
			pathlength: 'pathLength',
			patterncontentunits: 'patternContentUnits',
			patterntransform: 'patternTransform',
			patternunits: 'patternUnits',
			pointsatx: 'pointsAtX',
			pointsaty: 'pointsAtY',
			pointsatz: 'pointsAtZ',
			preservealpha: 'preserveAlpha',
			preserveaspectratio: 'preserveAspectRatio',
			primitiveunits: 'primitiveUnits',
			refx: 'refX',
			refy: 'refY',
			repeatcount: 'repeatCount',
			repeatdur: 'repeatDur',
			requiredextensions: 'requiredExtensions',
			requiredfeatures: 'requiredFeatures',
			specularconstant: 'specularConstant',
			specularexponent: 'specularExponent',
			spreadmethod: 'spreadMethod',
			startoffset: 'startOffset',
			stddeviation: 'stdDeviation',
			stitchtiles: 'stitchTiles',
			surfacescale: 'surfaceScale',
			systemlanguage: 'systemLanguage',
			tablevalues: 'tableValues',
			targetx: 'targetX',
			targety: 'targetY',
			textlength: 'textLength',
			viewbox: 'viewBox',
			viewtarget: 'viewTarget',
			xchannelselector: 'xChannelSelector',
			ychannelselector: 'yChannelSelector',
			zoomandpan: 'zoomAndPan',
		},
		K4 = {
			'xlink:actuate': {
				prefix: 'xlink',
				name: 'actuate',
				namespace: jt.XLINK,
			},
			'xlink:arcrole': {
				prefix: 'xlink',
				name: 'arcrole',
				namespace: jt.XLINK,
			},
			'xlink:href': {
				prefix: 'xlink',
				name: 'href',
				namespace: jt.XLINK,
			},
			'xlink:role': {
				prefix: 'xlink',
				name: 'role',
				namespace: jt.XLINK,
			},
			'xlink:show': {
				prefix: 'xlink',
				name: 'show',
				namespace: jt.XLINK,
			},
			'xlink:title': {
				prefix: 'xlink',
				name: 'title',
				namespace: jt.XLINK,
			},
			'xlink:type': {
				prefix: 'xlink',
				name: 'type',
				namespace: jt.XLINK,
			},
			'xml:base': {
				prefix: 'xml',
				name: 'base',
				namespace: jt.XML,
			},
			'xml:lang': {
				prefix: 'xml',
				name: 'lang',
				namespace: jt.XML,
			},
			'xml:space': {
				prefix: 'xml',
				name: 'space',
				namespace: jt.XML,
			},
			xmlns: {
				prefix: '',
				name: 'xmlns',
				namespace: jt.XMLNS,
			},
			'xmlns:xlink': {
				prefix: 'xmlns',
				name: 'xlink',
				namespace: jt.XMLNS,
			},
		},
		j4 = (Hr.SVG_TAG_NAMES_ADJUSTMENT_MAP = {
			altglyph: 'altGlyph',
			altglyphdef: 'altGlyphDef',
			altglyphitem: 'altGlyphItem',
			animatecolor: 'animateColor',
			animatemotion: 'animateMotion',
			animatetransform: 'animateTransform',
			clippath: 'clipPath',
			feblend: 'feBlend',
			fecolormatrix: 'feColorMatrix',
			fecomponenttransfer: 'feComponentTransfer',
			fecomposite: 'feComposite',
			feconvolvematrix: 'feConvolveMatrix',
			fediffuselighting: 'feDiffuseLighting',
			fedisplacementmap: 'feDisplacementMap',
			fedistantlight: 'feDistantLight',
			feflood: 'feFlood',
			fefunca: 'feFuncA',
			fefuncb: 'feFuncB',
			fefuncg: 'feFuncG',
			fefuncr: 'feFuncR',
			fegaussianblur: 'feGaussianBlur',
			feimage: 'feImage',
			femerge: 'feMerge',
			femergenode: 'feMergeNode',
			femorphology: 'feMorphology',
			feoffset: 'feOffset',
			fepointlight: 'fePointLight',
			fespecularlighting: 'feSpecularLighting',
			fespotlight: 'feSpotLight',
			fetile: 'feTile',
			feturbulence: 'feTurbulence',
			foreignobject: 'foreignObject',
			glyphref: 'glyphRef',
			lineargradient: 'linearGradient',
			radialgradient: 'radialGradient',
			textpath: 'textPath',
		}),
		Y4 = {
			[ke.B]: !0,
			[ke.BIG]: !0,
			[ke.BLOCKQUOTE]: !0,
			[ke.BODY]: !0,
			[ke.BR]: !0,
			[ke.CENTER]: !0,
			[ke.CODE]: !0,
			[ke.DD]: !0,
			[ke.DIV]: !0,
			[ke.DL]: !0,
			[ke.DT]: !0,
			[ke.EM]: !0,
			[ke.EMBED]: !0,
			[ke.H1]: !0,
			[ke.H2]: !0,
			[ke.H3]: !0,
			[ke.H4]: !0,
			[ke.H5]: !0,
			[ke.H6]: !0,
			[ke.HEAD]: !0,
			[ke.HR]: !0,
			[ke.I]: !0,
			[ke.IMG]: !0,
			[ke.LI]: !0,
			[ke.LISTING]: !0,
			[ke.MENU]: !0,
			[ke.META]: !0,
			[ke.NOBR]: !0,
			[ke.OL]: !0,
			[ke.P]: !0,
			[ke.PRE]: !0,
			[ke.RUBY]: !0,
			[ke.S]: !0,
			[ke.SMALL]: !0,
			[ke.SPAN]: !0,
			[ke.STRONG]: !0,
			[ke.STRIKE]: !0,
			[ke.SUB]: !0,
			[ke.SUP]: !0,
			[ke.TABLE]: !0,
			[ke.TT]: !0,
			[ke.U]: !0,
			[ke.UL]: !0,
			[ke.VAR]: !0,
		};
	(Hr.causesExit = function (e) {
		const t = e.tagName;
		return t === ke.FONT &&
			(vl.getTokenAttr(e, bs.COLOR) !== null ||
				vl.getTokenAttr(e, bs.SIZE) !== null ||
				vl.getTokenAttr(e, bs.FACE) !== null)
			? !0
			: Y4[t];
	}),
		(Hr.adjustTokenMathMLAttrs = function (e) {
			for (let t = 0; t < e.attrs.length; t++)
				if (e.attrs[t].name === G4) {
					e.attrs[t].name = z4;
					break;
				}
		}),
		(Hr.adjustTokenSVGAttrs = function (e) {
			for (let t = 0; t < e.attrs.length; t++) {
				const r = W4[e.attrs[t].name];
				r && (e.attrs[t].name = r);
			}
		}),
		(Hr.adjustTokenXMLAttrs = function (e) {
			for (let t = 0; t < e.attrs.length; t++) {
				const r = K4[e.attrs[t].name];
				r &&
					((e.attrs[t].prefix = r.prefix),
					(e.attrs[t].name = r.name),
					(e.attrs[t].namespace = r.namespace));
			}
		}),
		(Hr.adjustTokenSVGTagName = function (e) {
			const t = j4[e.tagName];
			t && (e.tagName = t);
		});
	function q4(e, t) {
		return (
			t === jt.MATHML &&
			(e === ke.MI ||
				e === ke.MO ||
				e === ke.MN ||
				e === ke.MS ||
				e === ke.MTEXT)
		);
	}
	function X4(e, t, r) {
		if (t === jt.MATHML && e === ke.ANNOTATION_XML) {
			for (let o = 0; o < r.length; o++)
				if (r[o].name === bs.ENCODING) {
					const u = r[o].value.toLowerCase();
					return u === jh.TEXT_HTML || u === jh.APPLICATION_XML;
				}
		}
		return (
			t === jt.SVG &&
			(e === ke.FOREIGN_OBJECT || e === ke.DESC || e === ke.TITLE)
		);
	}
	Hr.isIntegrationPoint = function (e, t, r, o) {
		return !!(
			((!o || o === jt.HTML) && X4(e, t, r)) ||
			((!o || o === jt.MATHML) && q4(e, t))
		);
	};
	const F = As,
		Q4 = f4,
		Yh = h4,
		V4 = v4,
		Z4 = I4,
		qh = gr,
		J4 = Qe,
		$4 = D4,
		Xh = Ss,
		er = Hr,
		Yt = tl,
		e2 = Bn,
		fi = zn,
		v = fi.TAG_NAMES,
		ye = fi.NAMESPACES,
		Qh = fi.ATTRS,
		t2 = {
			scriptingEnabled: !0,
			sourceCodeLocationInfo: !1,
			onParseError: null,
			treeAdapter: J4,
		},
		Vh = 'hidden',
		n2 = 8,
		r2 = 3,
		Zh = 'INITIAL_MODE',
		Al = 'BEFORE_HTML_MODE',
		Ns = 'BEFORE_HEAD_MODE',
		Zi = 'IN_HEAD_MODE',
		Jh = 'IN_HEAD_NO_SCRIPT_MODE',
		xs = 'AFTER_HEAD_MODE',
		tr = 'IN_BODY_MODE',
		ks = 'TEXT_MODE',
		Zt = 'IN_TABLE_MODE',
		$h = 'IN_TABLE_TEXT_MODE',
		Os = 'IN_CAPTION_MODE',
		J1 = 'IN_COLUMN_GROUP_MODE',
		On = 'IN_TABLE_BODY_MODE',
		mr = 'IN_ROW_MODE',
		ws = 'IN_CELL_MODE',
		_l = 'IN_SELECT_MODE',
		Cl = 'IN_SELECT_IN_TABLE_MODE',
		Ls = 'IN_TEMPLATE_MODE',
		Sl = 'AFTER_BODY_MODE',
		Is = 'IN_FRAMESET_MODE',
		e0 = 'AFTER_FRAMESET_MODE',
		t0 = 'AFTER_AFTER_BODY_MODE',
		n0 = 'AFTER_AFTER_FRAMESET_MODE',
		i2 = {
			[v.TR]: mr,
			[v.TBODY]: On,
			[v.THEAD]: On,
			[v.TFOOT]: On,
			[v.CAPTION]: Os,
			[v.COLGROUP]: J1,
			[v.TABLE]: Zt,
			[v.BODY]: tr,
			[v.FRAMESET]: Is,
		},
		o2 = {
			[v.CAPTION]: Zt,
			[v.COLGROUP]: Zt,
			[v.TBODY]: Zt,
			[v.TFOOT]: Zt,
			[v.THEAD]: Zt,
			[v.COL]: J1,
			[v.TR]: On,
			[v.TD]: mr,
			[v.TH]: mr,
		},
		r0 = {
			[Zh]: {
				[F.CHARACTER_TOKEN]: eo,
				[F.NULL_CHARACTER_TOKEN]: eo,
				[F.WHITESPACE_CHARACTER_TOKEN]: Ye,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: g2,
				[F.START_TAG_TOKEN]: eo,
				[F.END_TAG_TOKEN]: eo,
				[F.EOF_TOKEN]: eo,
			},
			[Al]: {
				[F.CHARACTER_TOKEN]: to,
				[F.NULL_CHARACTER_TOKEN]: to,
				[F.WHITESPACE_CHARACTER_TOKEN]: Ye,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: m2,
				[F.END_TAG_TOKEN]: T2,
				[F.EOF_TOKEN]: to,
			},
			[Ns]: {
				[F.CHARACTER_TOKEN]: no,
				[F.NULL_CHARACTER_TOKEN]: no,
				[F.WHITESPACE_CHARACTER_TOKEN]: Ye,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ms,
				[F.START_TAG_TOKEN]: E2,
				[F.END_TAG_TOKEN]: v2,
				[F.EOF_TOKEN]: no,
			},
			[Zi]: {
				[F.CHARACTER_TOKEN]: ro,
				[F.NULL_CHARACTER_TOKEN]: ro,
				[F.WHITESPACE_CHARACTER_TOKEN]: hn,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ms,
				[F.START_TAG_TOKEN]: Ut,
				[F.END_TAG_TOKEN]: hi,
				[F.EOF_TOKEN]: ro,
			},
			[Jh]: {
				[F.CHARACTER_TOKEN]: io,
				[F.NULL_CHARACTER_TOKEN]: io,
				[F.WHITESPACE_CHARACTER_TOKEN]: hn,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ms,
				[F.START_TAG_TOKEN]: y2,
				[F.END_TAG_TOKEN]: A2,
				[F.EOF_TOKEN]: io,
			},
			[xs]: {
				[F.CHARACTER_TOKEN]: oo,
				[F.NULL_CHARACTER_TOKEN]: oo,
				[F.WHITESPACE_CHARACTER_TOKEN]: hn,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ms,
				[F.START_TAG_TOKEN]: _2,
				[F.END_TAG_TOKEN]: C2,
				[F.EOF_TOKEN]: oo,
			},
			[tr]: {
				[F.CHARACTER_TOKEN]: Rs,
				[F.NULL_CHARACTER_TOKEN]: Ye,
				[F.WHITESPACE_CHARACTER_TOKEN]: di,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: dn,
				[F.END_TAG_TOKEN]: bl,
				[F.EOF_TOKEN]: Er,
			},
			[ks]: {
				[F.CHARACTER_TOKEN]: hn,
				[F.NULL_CHARACTER_TOKEN]: hn,
				[F.WHITESPACE_CHARACTER_TOKEN]: hn,
				[F.COMMENT_TOKEN]: Ye,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: Ye,
				[F.END_TAG_TOKEN]: eT,
				[F.EOF_TOKEN]: tT,
			},
			[Zt]: {
				[F.CHARACTER_TOKEN]: vr,
				[F.NULL_CHARACTER_TOKEN]: vr,
				[F.WHITESPACE_CHARACTER_TOKEN]: vr,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: Nl,
				[F.END_TAG_TOKEN]: xl,
				[F.EOF_TOKEN]: Er,
			},
			[$h]: {
				[F.CHARACTER_TOKEN]: fT,
				[F.NULL_CHARACTER_TOKEN]: Ye,
				[F.WHITESPACE_CHARACTER_TOKEN]: cT,
				[F.COMMENT_TOKEN]: so,
				[F.DOCTYPE_TOKEN]: so,
				[F.START_TAG_TOKEN]: so,
				[F.END_TAG_TOKEN]: so,
				[F.EOF_TOKEN]: so,
			},
			[Os]: {
				[F.CHARACTER_TOKEN]: Rs,
				[F.NULL_CHARACTER_TOKEN]: Ye,
				[F.WHITESPACE_CHARACTER_TOKEN]: di,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: hT,
				[F.END_TAG_TOKEN]: dT,
				[F.EOF_TOKEN]: Er,
			},
			[J1]: {
				[F.CHARACTER_TOKEN]: Ds,
				[F.NULL_CHARACTER_TOKEN]: Ds,
				[F.WHITESPACE_CHARACTER_TOKEN]: hn,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: pT,
				[F.END_TAG_TOKEN]: gT,
				[F.EOF_TOKEN]: Er,
			},
			[On]: {
				[F.CHARACTER_TOKEN]: vr,
				[F.NULL_CHARACTER_TOKEN]: vr,
				[F.WHITESPACE_CHARACTER_TOKEN]: vr,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: mT,
				[F.END_TAG_TOKEN]: TT,
				[F.EOF_TOKEN]: Er,
			},
			[mr]: {
				[F.CHARACTER_TOKEN]: vr,
				[F.NULL_CHARACTER_TOKEN]: vr,
				[F.WHITESPACE_CHARACTER_TOKEN]: vr,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: ET,
				[F.END_TAG_TOKEN]: vT,
				[F.EOF_TOKEN]: Er,
			},
			[ws]: {
				[F.CHARACTER_TOKEN]: Rs,
				[F.NULL_CHARACTER_TOKEN]: Ye,
				[F.WHITESPACE_CHARACTER_TOKEN]: di,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: yT,
				[F.END_TAG_TOKEN]: AT,
				[F.EOF_TOKEN]: Er,
			},
			[_l]: {
				[F.CHARACTER_TOKEN]: hn,
				[F.NULL_CHARACTER_TOKEN]: Ye,
				[F.WHITESPACE_CHARACTER_TOKEN]: hn,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: h0,
				[F.END_TAG_TOKEN]: d0,
				[F.EOF_TOKEN]: Er,
			},
			[Cl]: {
				[F.CHARACTER_TOKEN]: hn,
				[F.NULL_CHARACTER_TOKEN]: Ye,
				[F.WHITESPACE_CHARACTER_TOKEN]: hn,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: _T,
				[F.END_TAG_TOKEN]: CT,
				[F.EOF_TOKEN]: Er,
			},
			[Ls]: {
				[F.CHARACTER_TOKEN]: Rs,
				[F.NULL_CHARACTER_TOKEN]: Ye,
				[F.WHITESPACE_CHARACTER_TOKEN]: di,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: ST,
				[F.END_TAG_TOKEN]: bT,
				[F.EOF_TOKEN]: p0,
			},
			[Sl]: {
				[F.CHARACTER_TOKEN]: Ps,
				[F.NULL_CHARACTER_TOKEN]: Ps,
				[F.WHITESPACE_CHARACTER_TOKEN]: di,
				[F.COMMENT_TOKEN]: p2,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: NT,
				[F.END_TAG_TOKEN]: xT,
				[F.EOF_TOKEN]: $1,
			},
			[Is]: {
				[F.CHARACTER_TOKEN]: Ye,
				[F.NULL_CHARACTER_TOKEN]: Ye,
				[F.WHITESPACE_CHARACTER_TOKEN]: hn,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: kT,
				[F.END_TAG_TOKEN]: OT,
				[F.EOF_TOKEN]: $1,
			},
			[e0]: {
				[F.CHARACTER_TOKEN]: Ye,
				[F.NULL_CHARACTER_TOKEN]: Ye,
				[F.WHITESPACE_CHARACTER_TOKEN]: hn,
				[F.COMMENT_TOKEN]: Lt,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: wT,
				[F.END_TAG_TOKEN]: LT,
				[F.EOF_TOKEN]: $1,
			},
			[t0]: {
				[F.CHARACTER_TOKEN]: Fs,
				[F.NULL_CHARACTER_TOKEN]: Fs,
				[F.WHITESPACE_CHARACTER_TOKEN]: di,
				[F.COMMENT_TOKEN]: i0,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: IT,
				[F.END_TAG_TOKEN]: Fs,
				[F.EOF_TOKEN]: $1,
			},
			[n0]: {
				[F.CHARACTER_TOKEN]: Ye,
				[F.NULL_CHARACTER_TOKEN]: Ye,
				[F.WHITESPACE_CHARACTER_TOKEN]: di,
				[F.COMMENT_TOKEN]: i0,
				[F.DOCTYPE_TOKEN]: Ye,
				[F.START_TAG_TOKEN]: MT,
				[F.END_TAG_TOKEN]: Ye,
				[F.EOF_TOKEN]: $1,
			},
		};
	class s2 {
		constructor(t) {
			(this.options = $4(t2, t)),
				(this.treeAdapter = this.options.treeAdapter),
				(this.pendingScript = null),
				this.options.sourceCodeLocationInfo && qh.install(this, V4),
				this.options.onParseError &&
					qh.install(this, Z4, {
						onParseError: this.options.onParseError,
					});
		}
		parse(t) {
			const r = this.treeAdapter.createDocument();
			return (
				this._bootstrap(r, null),
				this.tokenizer.write(t, !0),
				this._runParsingLoop(null),
				r
			);
		}
		parseFragment(t, r) {
			r || (r = this.treeAdapter.createElement(v.TEMPLATE, ye.HTML, []));
			const o = this.treeAdapter.createElement('documentmock', ye.HTML, []);
			this._bootstrap(o, r),
				this.treeAdapter.getTagName(r) === v.TEMPLATE &&
					this._pushTmplInsertionMode(Ls),
				this._initTokenizerForFragmentParsing(),
				this._insertFakeRootElement(),
				this._resetInsertionMode(),
				this._findFormInFragmentContext(),
				this.tokenizer.write(t, !0),
				this._runParsingLoop(null);
			const u = this.treeAdapter.getFirstChild(o),
				c = this.treeAdapter.createDocumentFragment();
			return this._adoptNodes(u, c), c;
		}
		_bootstrap(t, r) {
			(this.tokenizer = new F(this.options)),
				(this.stopped = !1),
				(this.insertionMode = Zh),
				(this.originalInsertionMode = ''),
				(this.document = t),
				(this.fragmentContext = r),
				(this.headElement = null),
				(this.formElement = null),
				(this.openElements = new Q4(this.document, this.treeAdapter)),
				(this.activeFormattingElements = new Yh(this.treeAdapter)),
				(this.tmplInsertionModeStack = []),
				(this.tmplInsertionModeStackTop = -1),
				(this.currentTmplInsertionMode = null),
				(this.pendingCharacterTokens = []),
				(this.hasNonWhitespacePendingCharacterToken = !1),
				(this.framesetOk = !0),
				(this.skipNextNewLine = !1),
				(this.fosterParentingEnabled = !1);
		}
		_err() {}
		_runParsingLoop(t) {
			for (; !this.stopped; ) {
				this._setupTokenizerCDATAMode();
				const r = this.tokenizer.getNextToken();
				if (r.type === F.HIBERNATION_TOKEN) break;
				if (
					this.skipNextNewLine &&
					((this.skipNextNewLine = !1),
					r.type === F.WHITESPACE_CHARACTER_TOKEN &&
						r.chars[0] ===
							`
`)
				) {
					if (r.chars.length === 1) continue;
					r.chars = r.chars.substr(1);
				}
				if ((this._processInputToken(r), t && this.pendingScript)) break;
			}
		}
		runParsingLoopForCurrentChunk(t, r) {
			if ((this._runParsingLoop(r), r && this.pendingScript)) {
				const o = this.pendingScript;
				(this.pendingScript = null), r(o);
				return;
			}
			t && t();
		}
		_setupTokenizerCDATAMode() {
			const t = this._getAdjustedCurrentElement();
			this.tokenizer.allowCDATA =
				t &&
				t !== this.document &&
				this.treeAdapter.getNamespaceURI(t) !== ye.HTML &&
				!this._isIntegrationPoint(t);
		}
		_switchToTextParsing(t, r) {
			this._insertElement(t, ye.HTML),
				(this.tokenizer.state = r),
				(this.originalInsertionMode = this.insertionMode),
				(this.insertionMode = ks);
		}
		switchToPlaintextParsing() {
			(this.insertionMode = ks),
				(this.originalInsertionMode = tr),
				(this.tokenizer.state = F.MODE.PLAINTEXT);
		}
		_getAdjustedCurrentElement() {
			return this.openElements.stackTop === 0 && this.fragmentContext
				? this.fragmentContext
				: this.openElements.current;
		}
		_findFormInFragmentContext() {
			let t = this.fragmentContext;
			do {
				if (this.treeAdapter.getTagName(t) === v.FORM) {
					this.formElement = t;
					break;
				}
				t = this.treeAdapter.getParentNode(t);
			} while (t);
		}
		_initTokenizerForFragmentParsing() {
			if (this.treeAdapter.getNamespaceURI(this.fragmentContext) === ye.HTML) {
				const t = this.treeAdapter.getTagName(this.fragmentContext);
				t === v.TITLE || t === v.TEXTAREA
					? (this.tokenizer.state = F.MODE.RCDATA)
					: t === v.STYLE ||
					  t === v.XMP ||
					  t === v.IFRAME ||
					  t === v.NOEMBED ||
					  t === v.NOFRAMES ||
					  t === v.NOSCRIPT
					? (this.tokenizer.state = F.MODE.RAWTEXT)
					: t === v.SCRIPT
					? (this.tokenizer.state = F.MODE.SCRIPT_DATA)
					: t === v.PLAINTEXT && (this.tokenizer.state = F.MODE.PLAINTEXT);
			}
		}
		_setDocumentType(t) {
			const r = t.name || '',
				o = t.publicId || '',
				u = t.systemId || '';
			this.treeAdapter.setDocumentType(this.document, r, o, u);
		}
		_attachElementToTree(t) {
			if (this._shouldFosterParentOnInsertion()) this._fosterParentElement(t);
			else {
				const r =
					this.openElements.currentTmplContent || this.openElements.current;
				this.treeAdapter.appendChild(r, t);
			}
		}
		_appendElement(t, r) {
			const o = this.treeAdapter.createElement(t.tagName, r, t.attrs);
			this._attachElementToTree(o);
		}
		_insertElement(t, r) {
			const o = this.treeAdapter.createElement(t.tagName, r, t.attrs);
			this._attachElementToTree(o), this.openElements.push(o);
		}
		_insertFakeElement(t) {
			const r = this.treeAdapter.createElement(t, ye.HTML, []);
			this._attachElementToTree(r), this.openElements.push(r);
		}
		_insertTemplate(t) {
			const r = this.treeAdapter.createElement(t.tagName, ye.HTML, t.attrs),
				o = this.treeAdapter.createDocumentFragment();
			this.treeAdapter.setTemplateContent(r, o),
				this._attachElementToTree(r),
				this.openElements.push(r);
		}
		_insertFakeRootElement() {
			const t = this.treeAdapter.createElement(v.HTML, ye.HTML, []);
			this.treeAdapter.appendChild(this.openElements.current, t),
				this.openElements.push(t);
		}
		_appendCommentNode(t, r) {
			const o = this.treeAdapter.createCommentNode(t.data);
			this.treeAdapter.appendChild(r, o);
		}
		_insertCharacters(t) {
			if (this._shouldFosterParentOnInsertion())
				this._fosterParentText(t.chars);
			else {
				const r =
					this.openElements.currentTmplContent || this.openElements.current;
				this.treeAdapter.insertText(r, t.chars);
			}
		}
		_adoptNodes(t, r) {
			for (
				let o = this.treeAdapter.getFirstChild(t);
				o;
				o = this.treeAdapter.getFirstChild(t)
			)
				this.treeAdapter.detachNode(o), this.treeAdapter.appendChild(r, o);
		}
		_shouldProcessTokenInForeignContent(t) {
			const r = this._getAdjustedCurrentElement();
			if (!r || r === this.document) return !1;
			const o = this.treeAdapter.getNamespaceURI(r);
			if (
				o === ye.HTML ||
				(this.treeAdapter.getTagName(r) === v.ANNOTATION_XML &&
					o === ye.MATHML &&
					t.type === F.START_TAG_TOKEN &&
					t.tagName === v.SVG)
			)
				return !1;
			const u =
				t.type === F.CHARACTER_TOKEN ||
				t.type === F.NULL_CHARACTER_TOKEN ||
				t.type === F.WHITESPACE_CHARACTER_TOKEN;
			return (((t.type === F.START_TAG_TOKEN &&
				t.tagName !== v.MGLYPH &&
				t.tagName !== v.MALIGNMARK) ||
				u) &&
				this._isIntegrationPoint(r, ye.MATHML)) ||
				((t.type === F.START_TAG_TOKEN || u) &&
					this._isIntegrationPoint(r, ye.HTML))
				? !1
				: t.type !== F.EOF_TOKEN;
		}
		_processToken(t) {
			r0[this.insertionMode][t.type](this, t);
		}
		_processTokenInBodyMode(t) {
			r0[tr][t.type](this, t);
		}
		_processTokenInForeignContent(t) {
			t.type === F.CHARACTER_TOKEN
				? DT(this, t)
				: t.type === F.NULL_CHARACTER_TOKEN
				? RT(this, t)
				: t.type === F.WHITESPACE_CHARACTER_TOKEN
				? hn(this, t)
				: t.type === F.COMMENT_TOKEN
				? Lt(this, t)
				: t.type === F.START_TAG_TOKEN
				? PT(this, t)
				: t.type === F.END_TAG_TOKEN && FT(this, t);
		}
		_processInputToken(t) {
			this._shouldProcessTokenInForeignContent(t)
				? this._processTokenInForeignContent(t)
				: this._processToken(t),
				t.type === F.START_TAG_TOKEN &&
					t.selfClosing &&
					!t.ackSelfClosing &&
					this._err(Yt.nonVoidHtmlElementStartTagWithTrailingSolidus);
		}
		_isIntegrationPoint(t, r) {
			const o = this.treeAdapter.getTagName(t),
				u = this.treeAdapter.getNamespaceURI(t),
				c = this.treeAdapter.getAttrList(t);
			return er.isIntegrationPoint(o, u, c, r);
		}
		_reconstructActiveFormattingElements() {
			const t = this.activeFormattingElements.length;
			if (t) {
				let r = t,
					o = null;
				do
					if (
						(r--,
						(o = this.activeFormattingElements.entries[r]),
						o.type === Yh.MARKER_ENTRY || this.openElements.contains(o.element))
					) {
						r++;
						break;
					}
				while (r > 0);
				for (let u = r; u < t; u++)
					(o = this.activeFormattingElements.entries[u]),
						this._insertElement(
							o.token,
							this.treeAdapter.getNamespaceURI(o.element)
						),
						(o.element = this.openElements.current);
			}
		}
		_closeTableCell() {
			this.openElements.generateImpliedEndTags(),
				this.openElements.popUntilTableCellPopped(),
				this.activeFormattingElements.clearToLastMarker(),
				(this.insertionMode = mr);
		}
		_closePElement() {
			this.openElements.generateImpliedEndTagsWithExclusion(v.P),
				this.openElements.popUntilTagNamePopped(v.P);
		}
		_resetInsertionMode() {
			for (let t = this.openElements.stackTop, r = !1; t >= 0; t--) {
				let o = this.openElements.items[t];
				t === 0 &&
					((r = !0), this.fragmentContext && (o = this.fragmentContext));
				const u = this.treeAdapter.getTagName(o),
					c = i2[u];
				if (c) {
					this.insertionMode = c;
					break;
				} else if (!r && (u === v.TD || u === v.TH)) {
					this.insertionMode = ws;
					break;
				} else if (!r && u === v.HEAD) {
					this.insertionMode = Zi;
					break;
				} else if (u === v.SELECT) {
					this._resetInsertionModeForSelect(t);
					break;
				} else if (u === v.TEMPLATE) {
					this.insertionMode = this.currentTmplInsertionMode;
					break;
				} else if (u === v.HTML) {
					this.insertionMode = this.headElement ? xs : Ns;
					break;
				} else if (r) {
					this.insertionMode = tr;
					break;
				}
			}
		}
		_resetInsertionModeForSelect(t) {
			if (t > 0)
				for (let r = t - 1; r > 0; r--) {
					const o = this.openElements.items[r],
						u = this.treeAdapter.getTagName(o);
					if (u === v.TEMPLATE) break;
					if (u === v.TABLE) {
						this.insertionMode = Cl;
						return;
					}
				}
			this.insertionMode = _l;
		}
		_pushTmplInsertionMode(t) {
			this.tmplInsertionModeStack.push(t),
				this.tmplInsertionModeStackTop++,
				(this.currentTmplInsertionMode = t);
		}
		_popTmplInsertionMode() {
			this.tmplInsertionModeStack.pop(),
				this.tmplInsertionModeStackTop--,
				(this.currentTmplInsertionMode =
					this.tmplInsertionModeStack[this.tmplInsertionModeStackTop]);
		}
		_isElementCausesFosterParenting(t) {
			const r = this.treeAdapter.getTagName(t);
			return (
				r === v.TABLE ||
				r === v.TBODY ||
				r === v.TFOOT ||
				r === v.THEAD ||
				r === v.TR
			);
		}
		_shouldFosterParentOnInsertion() {
			return (
				this.fosterParentingEnabled &&
				this._isElementCausesFosterParenting(this.openElements.current)
			);
		}
		_findFosterParentingLocation() {
			const t = {
				parent: null,
				beforeElement: null,
			};
			for (let r = this.openElements.stackTop; r >= 0; r--) {
				const o = this.openElements.items[r],
					u = this.treeAdapter.getTagName(o),
					c = this.treeAdapter.getNamespaceURI(o);
				if (u === v.TEMPLATE && c === ye.HTML) {
					t.parent = this.treeAdapter.getTemplateContent(o);
					break;
				} else if (u === v.TABLE) {
					(t.parent = this.treeAdapter.getParentNode(o)),
						t.parent
							? (t.beforeElement = o)
							: (t.parent = this.openElements.items[r - 1]);
					break;
				}
			}
			return t.parent || (t.parent = this.openElements.items[0]), t;
		}
		_fosterParentElement(t) {
			const r = this._findFosterParentingLocation();
			r.beforeElement
				? this.treeAdapter.insertBefore(r.parent, t, r.beforeElement)
				: this.treeAdapter.appendChild(r.parent, t);
		}
		_fosterParentText(t) {
			const r = this._findFosterParentingLocation();
			r.beforeElement
				? this.treeAdapter.insertTextBefore(r.parent, t, r.beforeElement)
				: this.treeAdapter.insertText(r.parent, t);
		}
		_isSpecialElement(t) {
			const r = this.treeAdapter.getTagName(t),
				o = this.treeAdapter.getNamespaceURI(t);
			return fi.SPECIAL_ELEMENTS[o][r];
		}
	}
	var a2 = s2;
	function l2(e, t) {
		let r = e.activeFormattingElements.getElementEntryInScopeWithTagName(
			t.tagName
		);
		return (
			r
				? e.openElements.contains(r.element)
					? e.openElements.hasInScope(t.tagName) || (r = null)
					: (e.activeFormattingElements.removeEntry(r), (r = null))
				: Wn(e, t),
			r
		);
	}
	function u2(e, t) {
		let r = null;
		for (let o = e.openElements.stackTop; o >= 0; o--) {
			const u = e.openElements.items[o];
			if (u === t.element) break;
			e._isSpecialElement(u) && (r = u);
		}
		return (
			r ||
				(e.openElements.popUntilElementPopped(t.element),
				e.activeFormattingElements.removeEntry(t)),
			r
		);
	}
	function c2(e, t, r) {
		let o = t,
			u = e.openElements.getCommonAncestor(t);
		for (let c = 0, f = u; f !== r; c++, f = u) {
			u = e.openElements.getCommonAncestor(f);
			const d = e.activeFormattingElements.getElementEntry(f),
				g = d && c >= r2;
			!d || g
				? (g && e.activeFormattingElements.removeEntry(d),
				  e.openElements.remove(f))
				: ((f = f2(e, d)),
				  o === t && (e.activeFormattingElements.bookmark = d),
				  e.treeAdapter.detachNode(o),
				  e.treeAdapter.appendChild(f, o),
				  (o = f));
		}
		return o;
	}
	function f2(e, t) {
		const r = e.treeAdapter.getNamespaceURI(t.element),
			o = e.treeAdapter.createElement(t.token.tagName, r, t.token.attrs);
		return e.openElements.replace(t.element, o), (t.element = o), o;
	}
	function h2(e, t, r) {
		if (e._isElementCausesFosterParenting(t)) e._fosterParentElement(r);
		else {
			const o = e.treeAdapter.getTagName(t),
				u = e.treeAdapter.getNamespaceURI(t);
			o === v.TEMPLATE &&
				u === ye.HTML &&
				(t = e.treeAdapter.getTemplateContent(t)),
				e.treeAdapter.appendChild(t, r);
		}
	}
	function d2(e, t, r) {
		const o = e.treeAdapter.getNamespaceURI(r.element),
			u = r.token,
			c = e.treeAdapter.createElement(u.tagName, o, u.attrs);
		e._adoptNodes(t, c),
			e.treeAdapter.appendChild(t, c),
			e.activeFormattingElements.insertElementAfterBookmark(c, r.token),
			e.activeFormattingElements.removeEntry(r),
			e.openElements.remove(r.element),
			e.openElements.insertAfter(t, c);
	}
	function Br(e, t) {
		let r;
		for (let o = 0; o < n2 && ((r = l2(e, t)), !!r); o++) {
			const u = u2(e, r);
			if (!u) break;
			e.activeFormattingElements.bookmark = r;
			const c = c2(e, u, r.element),
				f = e.openElements.getCommonAncestor(r.element);
			e.treeAdapter.detachNode(c), h2(e, f, c), d2(e, u, r);
		}
	}
	function Ye() {}
	function Ms(e) {
		e._err(Yt.misplacedDoctype);
	}
	function Lt(e, t) {
		e._appendCommentNode(
			t,
			e.openElements.currentTmplContent || e.openElements.current
		);
	}
	function p2(e, t) {
		e._appendCommentNode(t, e.openElements.items[0]);
	}
	function i0(e, t) {
		e._appendCommentNode(t, e.document);
	}
	function hn(e, t) {
		e._insertCharacters(t);
	}
	function $1(e) {
		e.stopped = !0;
	}
	function g2(e, t) {
		e._setDocumentType(t);
		const r = t.forceQuirks ? fi.DOCUMENT_MODE.QUIRKS : Xh.getDocumentMode(t);
		Xh.isConforming(t) || e._err(Yt.nonConformingDoctype),
			e.treeAdapter.setDocumentMode(e.document, r),
			(e.insertionMode = Al);
	}
	function eo(e, t) {
		e._err(Yt.missingDoctype, {
			beforeToken: !0,
		}),
			e.treeAdapter.setDocumentMode(e.document, fi.DOCUMENT_MODE.QUIRKS),
			(e.insertionMode = Al),
			e._processToken(t);
	}
	function m2(e, t) {
		t.tagName === v.HTML
			? (e._insertElement(t, ye.HTML), (e.insertionMode = Ns))
			: to(e, t);
	}
	function T2(e, t) {
		const r = t.tagName;
		(r === v.HTML || r === v.HEAD || r === v.BODY || r === v.BR) && to(e, t);
	}
	function to(e, t) {
		e._insertFakeRootElement(), (e.insertionMode = Ns), e._processToken(t);
	}
	function E2(e, t) {
		const r = t.tagName;
		r === v.HTML
			? dn(e, t)
			: r === v.HEAD
			? (e._insertElement(t, ye.HTML),
			  (e.headElement = e.openElements.current),
			  (e.insertionMode = Zi))
			: no(e, t);
	}
	function v2(e, t) {
		const r = t.tagName;
		r === v.HEAD || r === v.BODY || r === v.HTML || r === v.BR
			? no(e, t)
			: e._err(Yt.endTagWithoutMatchingOpenElement);
	}
	function no(e, t) {
		e._insertFakeElement(v.HEAD),
			(e.headElement = e.openElements.current),
			(e.insertionMode = Zi),
			e._processToken(t);
	}
	function Ut(e, t) {
		const r = t.tagName;
		r === v.HTML
			? dn(e, t)
			: r === v.BASE ||
			  r === v.BASEFONT ||
			  r === v.BGSOUND ||
			  r === v.LINK ||
			  r === v.META
			? (e._appendElement(t, ye.HTML), (t.ackSelfClosing = !0))
			: r === v.TITLE
			? e._switchToTextParsing(t, F.MODE.RCDATA)
			: r === v.NOSCRIPT
			? e.options.scriptingEnabled
				? e._switchToTextParsing(t, F.MODE.RAWTEXT)
				: (e._insertElement(t, ye.HTML), (e.insertionMode = Jh))
			: r === v.NOFRAMES || r === v.STYLE
			? e._switchToTextParsing(t, F.MODE.RAWTEXT)
			: r === v.SCRIPT
			? e._switchToTextParsing(t, F.MODE.SCRIPT_DATA)
			: r === v.TEMPLATE
			? (e._insertTemplate(t, ye.HTML),
			  e.activeFormattingElements.insertMarker(),
			  (e.framesetOk = !1),
			  (e.insertionMode = Ls),
			  e._pushTmplInsertionMode(Ls))
			: r === v.HEAD
			? e._err(Yt.misplacedStartTagForHeadElement)
			: ro(e, t);
	}
	function hi(e, t) {
		const r = t.tagName;
		r === v.HEAD
			? (e.openElements.pop(), (e.insertionMode = xs))
			: r === v.BODY || r === v.BR || r === v.HTML
			? ro(e, t)
			: r === v.TEMPLATE && e.openElements.tmplCount > 0
			? (e.openElements.generateImpliedEndTagsThoroughly(),
			  e.openElements.currentTagName !== v.TEMPLATE &&
					e._err(Yt.closingOfElementWithOpenChildElements),
			  e.openElements.popUntilTagNamePopped(v.TEMPLATE),
			  e.activeFormattingElements.clearToLastMarker(),
			  e._popTmplInsertionMode(),
			  e._resetInsertionMode())
			: e._err(Yt.endTagWithoutMatchingOpenElement);
	}
	function ro(e, t) {
		e.openElements.pop(), (e.insertionMode = xs), e._processToken(t);
	}
	function y2(e, t) {
		const r = t.tagName;
		r === v.HTML
			? dn(e, t)
			: r === v.BASEFONT ||
			  r === v.BGSOUND ||
			  r === v.HEAD ||
			  r === v.LINK ||
			  r === v.META ||
			  r === v.NOFRAMES ||
			  r === v.STYLE
			? Ut(e, t)
			: r === v.NOSCRIPT
			? e._err(Yt.nestedNoscriptInHead)
			: io(e, t);
	}
	function A2(e, t) {
		const r = t.tagName;
		r === v.NOSCRIPT
			? (e.openElements.pop(), (e.insertionMode = Zi))
			: r === v.BR
			? io(e, t)
			: e._err(Yt.endTagWithoutMatchingOpenElement);
	}
	function io(e, t) {
		const r =
			t.type === F.EOF_TOKEN
				? Yt.openElementsLeftAfterEof
				: Yt.disallowedContentInNoscriptInHead;
		e._err(r), e.openElements.pop(), (e.insertionMode = Zi), e._processToken(t);
	}
	function _2(e, t) {
		const r = t.tagName;
		r === v.HTML
			? dn(e, t)
			: r === v.BODY
			? (e._insertElement(t, ye.HTML),
			  (e.framesetOk = !1),
			  (e.insertionMode = tr))
			: r === v.FRAMESET
			? (e._insertElement(t, ye.HTML), (e.insertionMode = Is))
			: r === v.BASE ||
			  r === v.BASEFONT ||
			  r === v.BGSOUND ||
			  r === v.LINK ||
			  r === v.META ||
			  r === v.NOFRAMES ||
			  r === v.SCRIPT ||
			  r === v.STYLE ||
			  r === v.TEMPLATE ||
			  r === v.TITLE
			? (e._err(Yt.abandonedHeadElementChild),
			  e.openElements.push(e.headElement),
			  Ut(e, t),
			  e.openElements.remove(e.headElement))
			: r === v.HEAD
			? e._err(Yt.misplacedStartTagForHeadElement)
			: oo(e, t);
	}
	function C2(e, t) {
		const r = t.tagName;
		r === v.BODY || r === v.HTML || r === v.BR
			? oo(e, t)
			: r === v.TEMPLATE
			? hi(e, t)
			: e._err(Yt.endTagWithoutMatchingOpenElement);
	}
	function oo(e, t) {
		e._insertFakeElement(v.BODY), (e.insertionMode = tr), e._processToken(t);
	}
	function di(e, t) {
		e._reconstructActiveFormattingElements(), e._insertCharacters(t);
	}
	function Rs(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertCharacters(t),
			(e.framesetOk = !1);
	}
	function S2(e, t) {
		e.openElements.tmplCount === 0 &&
			e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs);
	}
	function b2(e, t) {
		const r = e.openElements.tryPeekProperlyNestedBodyElement();
		r &&
			e.openElements.tmplCount === 0 &&
			((e.framesetOk = !1), e.treeAdapter.adoptAttributes(r, t.attrs));
	}
	function N2(e, t) {
		const r = e.openElements.tryPeekProperlyNestedBodyElement();
		e.framesetOk &&
			r &&
			(e.treeAdapter.detachNode(r),
			e.openElements.popAllUpToHtmlElement(),
			e._insertElement(t, ye.HTML),
			(e.insertionMode = Is));
	}
	function Tr(e, t) {
		e.openElements.hasInButtonScope(v.P) && e._closePElement(),
			e._insertElement(t, ye.HTML);
	}
	function x2(e, t) {
		e.openElements.hasInButtonScope(v.P) && e._closePElement();
		const r = e.openElements.currentTagName;
		(r === v.H1 ||
			r === v.H2 ||
			r === v.H3 ||
			r === v.H4 ||
			r === v.H5 ||
			r === v.H6) &&
			e.openElements.pop(),
			e._insertElement(t, ye.HTML);
	}
	function o0(e, t) {
		e.openElements.hasInButtonScope(v.P) && e._closePElement(),
			e._insertElement(t, ye.HTML),
			(e.skipNextNewLine = !0),
			(e.framesetOk = !1);
	}
	function k2(e, t) {
		const r = e.openElements.tmplCount > 0;
		(!e.formElement || r) &&
			(e.openElements.hasInButtonScope(v.P) && e._closePElement(),
			e._insertElement(t, ye.HTML),
			r || (e.formElement = e.openElements.current));
	}
	function O2(e, t) {
		e.framesetOk = !1;
		const r = t.tagName;
		for (let o = e.openElements.stackTop; o >= 0; o--) {
			const u = e.openElements.items[o],
				c = e.treeAdapter.getTagName(u);
			let f = null;
			if (
				(r === v.LI && c === v.LI
					? (f = v.LI)
					: (r === v.DD || r === v.DT) && (c === v.DD || c === v.DT) && (f = c),
				f)
			) {
				e.openElements.generateImpliedEndTagsWithExclusion(f),
					e.openElements.popUntilTagNamePopped(f);
				break;
			}
			if (c !== v.ADDRESS && c !== v.DIV && c !== v.P && e._isSpecialElement(u))
				break;
		}
		e.openElements.hasInButtonScope(v.P) && e._closePElement(),
			e._insertElement(t, ye.HTML);
	}
	function w2(e, t) {
		e.openElements.hasInButtonScope(v.P) && e._closePElement(),
			e._insertElement(t, ye.HTML),
			(e.tokenizer.state = F.MODE.PLAINTEXT);
	}
	function L2(e, t) {
		e.openElements.hasInScope(v.BUTTON) &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilTagNamePopped(v.BUTTON)),
			e._reconstructActiveFormattingElements(),
			e._insertElement(t, ye.HTML),
			(e.framesetOk = !1);
	}
	function I2(e, t) {
		const r = e.activeFormattingElements.getElementEntryInScopeWithTagName(v.A);
		r &&
			(Br(e, t),
			e.openElements.remove(r.element),
			e.activeFormattingElements.removeEntry(r)),
			e._reconstructActiveFormattingElements(),
			e._insertElement(t, ye.HTML),
			e.activeFormattingElements.pushElement(e.openElements.current, t);
	}
	function Ji(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertElement(t, ye.HTML),
			e.activeFormattingElements.pushElement(e.openElements.current, t);
	}
	function M2(e, t) {
		e._reconstructActiveFormattingElements(),
			e.openElements.hasInScope(v.NOBR) &&
				(Br(e, t), e._reconstructActiveFormattingElements()),
			e._insertElement(t, ye.HTML),
			e.activeFormattingElements.pushElement(e.openElements.current, t);
	}
	function s0(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertElement(t, ye.HTML),
			e.activeFormattingElements.insertMarker(),
			(e.framesetOk = !1);
	}
	function R2(e, t) {
		e.treeAdapter.getDocumentMode(e.document) !== fi.DOCUMENT_MODE.QUIRKS &&
			e.openElements.hasInButtonScope(v.P) &&
			e._closePElement(),
			e._insertElement(t, ye.HTML),
			(e.framesetOk = !1),
			(e.insertionMode = Zt);
	}
	function $i(e, t) {
		e._reconstructActiveFormattingElements(),
			e._appendElement(t, ye.HTML),
			(e.framesetOk = !1),
			(t.ackSelfClosing = !0);
	}
	function D2(e, t) {
		e._reconstructActiveFormattingElements(), e._appendElement(t, ye.HTML);
		const r = F.getTokenAttr(t, Qh.TYPE);
		(!r || r.toLowerCase() !== Vh) && (e.framesetOk = !1),
			(t.ackSelfClosing = !0);
	}
	function a0(e, t) {
		e._appendElement(t, ye.HTML), (t.ackSelfClosing = !0);
	}
	function P2(e, t) {
		e.openElements.hasInButtonScope(v.P) && e._closePElement(),
			e._appendElement(t, ye.HTML),
			(e.framesetOk = !1),
			(t.ackSelfClosing = !0);
	}
	function F2(e, t) {
		(t.tagName = v.IMG), $i(e, t);
	}
	function H2(e, t) {
		e._insertElement(t, ye.HTML),
			(e.skipNextNewLine = !0),
			(e.tokenizer.state = F.MODE.RCDATA),
			(e.originalInsertionMode = e.insertionMode),
			(e.framesetOk = !1),
			(e.insertionMode = ks);
	}
	function B2(e, t) {
		e.openElements.hasInButtonScope(v.P) && e._closePElement(),
			e._reconstructActiveFormattingElements(),
			(e.framesetOk = !1),
			e._switchToTextParsing(t, F.MODE.RAWTEXT);
	}
	function U2(e, t) {
		(e.framesetOk = !1), e._switchToTextParsing(t, F.MODE.RAWTEXT);
	}
	function l0(e, t) {
		e._switchToTextParsing(t, F.MODE.RAWTEXT);
	}
	function G2(e, t) {
		e._reconstructActiveFormattingElements(),
			e._insertElement(t, ye.HTML),
			(e.framesetOk = !1),
			e.insertionMode === Zt ||
			e.insertionMode === Os ||
			e.insertionMode === On ||
			e.insertionMode === mr ||
			e.insertionMode === ws
				? (e.insertionMode = Cl)
				: (e.insertionMode = _l);
	}
	function u0(e, t) {
		e.openElements.currentTagName === v.OPTION && e.openElements.pop(),
			e._reconstructActiveFormattingElements(),
			e._insertElement(t, ye.HTML);
	}
	function c0(e, t) {
		e.openElements.hasInScope(v.RUBY) &&
			e.openElements.generateImpliedEndTags(),
			e._insertElement(t, ye.HTML);
	}
	function z2(e, t) {
		e.openElements.hasInScope(v.RUBY) &&
			e.openElements.generateImpliedEndTagsWithExclusion(v.RTC),
			e._insertElement(t, ye.HTML);
	}
	function W2(e, t) {
		e.openElements.hasInButtonScope(v.P) && e._closePElement(),
			e._insertElement(t, ye.HTML);
	}
	function K2(e, t) {
		e._reconstructActiveFormattingElements(),
			er.adjustTokenMathMLAttrs(t),
			er.adjustTokenXMLAttrs(t),
			t.selfClosing
				? e._appendElement(t, ye.MATHML)
				: e._insertElement(t, ye.MATHML),
			(t.ackSelfClosing = !0);
	}
	function j2(e, t) {
		e._reconstructActiveFormattingElements(),
			er.adjustTokenSVGAttrs(t),
			er.adjustTokenXMLAttrs(t),
			t.selfClosing ? e._appendElement(t, ye.SVG) : e._insertElement(t, ye.SVG),
			(t.ackSelfClosing = !0);
	}
	function wn(e, t) {
		e._reconstructActiveFormattingElements(), e._insertElement(t, ye.HTML);
	}
	function dn(e, t) {
		const r = t.tagName;
		switch (r.length) {
			case 1:
				r === v.I || r === v.S || r === v.B || r === v.U
					? Ji(e, t)
					: r === v.P
					? Tr(e, t)
					: r === v.A
					? I2(e, t)
					: wn(e, t);
				break;
			case 2:
				r === v.DL || r === v.OL || r === v.UL
					? Tr(e, t)
					: r === v.H1 ||
					  r === v.H2 ||
					  r === v.H3 ||
					  r === v.H4 ||
					  r === v.H5 ||
					  r === v.H6
					? x2(e, t)
					: r === v.LI || r === v.DD || r === v.DT
					? O2(e, t)
					: r === v.EM || r === v.TT
					? Ji(e, t)
					: r === v.BR
					? $i(e, t)
					: r === v.HR
					? P2(e, t)
					: r === v.RB
					? c0(e, t)
					: r === v.RT || r === v.RP
					? z2(e, t)
					: r !== v.TH && r !== v.TD && r !== v.TR && wn(e, t);
				break;
			case 3:
				r === v.DIV || r === v.DIR || r === v.NAV
					? Tr(e, t)
					: r === v.PRE
					? o0(e, t)
					: r === v.BIG
					? Ji(e, t)
					: r === v.IMG || r === v.WBR
					? $i(e, t)
					: r === v.XMP
					? B2(e, t)
					: r === v.SVG
					? j2(e, t)
					: r === v.RTC
					? c0(e, t)
					: r !== v.COL && wn(e, t);
				break;
			case 4:
				r === v.HTML
					? S2(e, t)
					: r === v.BASE || r === v.LINK || r === v.META
					? Ut(e, t)
					: r === v.BODY
					? b2(e, t)
					: r === v.MAIN || r === v.MENU
					? Tr(e, t)
					: r === v.FORM
					? k2(e, t)
					: r === v.CODE || r === v.FONT
					? Ji(e, t)
					: r === v.NOBR
					? M2(e, t)
					: r === v.AREA
					? $i(e, t)
					: r === v.MATH
					? K2(e, t)
					: r === v.MENU
					? W2(e, t)
					: r !== v.HEAD && wn(e, t);
				break;
			case 5:
				r === v.STYLE || r === v.TITLE
					? Ut(e, t)
					: r === v.ASIDE
					? Tr(e, t)
					: r === v.SMALL
					? Ji(e, t)
					: r === v.TABLE
					? R2(e, t)
					: r === v.EMBED
					? $i(e, t)
					: r === v.INPUT
					? D2(e, t)
					: r === v.PARAM || r === v.TRACK
					? a0(e, t)
					: r === v.IMAGE
					? F2(e, t)
					: r !== v.FRAME &&
					  r !== v.TBODY &&
					  r !== v.TFOOT &&
					  r !== v.THEAD &&
					  wn(e, t);
				break;
			case 6:
				r === v.SCRIPT
					? Ut(e, t)
					: r === v.CENTER ||
					  r === v.FIGURE ||
					  r === v.FOOTER ||
					  r === v.HEADER ||
					  r === v.HGROUP ||
					  r === v.DIALOG
					? Tr(e, t)
					: r === v.BUTTON
					? L2(e, t)
					: r === v.STRIKE || r === v.STRONG
					? Ji(e, t)
					: r === v.APPLET || r === v.OBJECT
					? s0(e, t)
					: r === v.KEYGEN
					? $i(e, t)
					: r === v.SOURCE
					? a0(e, t)
					: r === v.IFRAME
					? U2(e, t)
					: r === v.SELECT
					? G2(e, t)
					: r === v.OPTION
					? u0(e, t)
					: wn(e, t);
				break;
			case 7:
				r === v.BGSOUND
					? Ut(e, t)
					: r === v.DETAILS ||
					  r === v.ADDRESS ||
					  r === v.ARTICLE ||
					  r === v.SECTION ||
					  r === v.SUMMARY
					? Tr(e, t)
					: r === v.LISTING
					? o0(e, t)
					: r === v.MARQUEE
					? s0(e, t)
					: r === v.NOEMBED
					? l0(e, t)
					: r !== v.CAPTION && wn(e, t);
				break;
			case 8:
				r === v.BASEFONT
					? Ut(e, t)
					: r === v.FRAMESET
					? N2(e, t)
					: r === v.FIELDSET
					? Tr(e, t)
					: r === v.TEXTAREA
					? H2(e, t)
					: r === v.TEMPLATE
					? Ut(e, t)
					: r === v.NOSCRIPT
					? e.options.scriptingEnabled
						? l0(e, t)
						: wn(e, t)
					: r === v.OPTGROUP
					? u0(e, t)
					: r !== v.COLGROUP && wn(e, t);
				break;
			case 9:
				r === v.PLAINTEXT ? w2(e, t) : wn(e, t);
				break;
			case 10:
				r === v.BLOCKQUOTE || r === v.FIGCAPTION ? Tr(e, t) : wn(e, t);
				break;
			default:
				wn(e, t);
		}
	}
	function Y2(e) {
		e.openElements.hasInScope(v.BODY) && (e.insertionMode = Sl);
	}
	function q2(e, t) {
		e.openElements.hasInScope(v.BODY) &&
			((e.insertionMode = Sl), e._processToken(t));
	}
	function Ur(e, t) {
		const r = t.tagName;
		e.openElements.hasInScope(r) &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilTagNamePopped(r));
	}
	function X2(e) {
		const t = e.openElements.tmplCount > 0,
			r = e.formElement;
		t || (e.formElement = null),
			(r || t) &&
				e.openElements.hasInScope(v.FORM) &&
				(e.openElements.generateImpliedEndTags(),
				t
					? e.openElements.popUntilTagNamePopped(v.FORM)
					: e.openElements.remove(r));
	}
	function Q2(e) {
		e.openElements.hasInButtonScope(v.P) || e._insertFakeElement(v.P),
			e._closePElement();
	}
	function V2(e) {
		e.openElements.hasInListItemScope(v.LI) &&
			(e.openElements.generateImpliedEndTagsWithExclusion(v.LI),
			e.openElements.popUntilTagNamePopped(v.LI));
	}
	function Z2(e, t) {
		const r = t.tagName;
		e.openElements.hasInScope(r) &&
			(e.openElements.generateImpliedEndTagsWithExclusion(r),
			e.openElements.popUntilTagNamePopped(r));
	}
	function J2(e) {
		e.openElements.hasNumberedHeaderInScope() &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilNumberedHeaderPopped());
	}
	function f0(e, t) {
		const r = t.tagName;
		e.openElements.hasInScope(r) &&
			(e.openElements.generateImpliedEndTags(),
			e.openElements.popUntilTagNamePopped(r),
			e.activeFormattingElements.clearToLastMarker());
	}
	function $2(e) {
		e._reconstructActiveFormattingElements(),
			e._insertFakeElement(v.BR),
			e.openElements.pop(),
			(e.framesetOk = !1);
	}
	function Wn(e, t) {
		const r = t.tagName;
		for (let o = e.openElements.stackTop; o > 0; o--) {
			const u = e.openElements.items[o];
			if (e.treeAdapter.getTagName(u) === r) {
				e.openElements.generateImpliedEndTagsWithExclusion(r),
					e.openElements.popUntilElementPopped(u);
				break;
			}
			if (e._isSpecialElement(u)) break;
		}
	}
	function bl(e, t) {
		const r = t.tagName;
		switch (r.length) {
			case 1:
				r === v.A || r === v.B || r === v.I || r === v.S || r === v.U
					? Br(e, t)
					: r === v.P
					? Q2(e)
					: Wn(e, t);
				break;
			case 2:
				r === v.DL || r === v.UL || r === v.OL
					? Ur(e, t)
					: r === v.LI
					? V2(e)
					: r === v.DD || r === v.DT
					? Z2(e, t)
					: r === v.H1 ||
					  r === v.H2 ||
					  r === v.H3 ||
					  r === v.H4 ||
					  r === v.H5 ||
					  r === v.H6
					? J2(e)
					: r === v.BR
					? $2(e)
					: r === v.EM || r === v.TT
					? Br(e, t)
					: Wn(e, t);
				break;
			case 3:
				r === v.BIG
					? Br(e, t)
					: r === v.DIR || r === v.DIV || r === v.NAV || r === v.PRE
					? Ur(e, t)
					: Wn(e, t);
				break;
			case 4:
				r === v.BODY
					? Y2(e)
					: r === v.HTML
					? q2(e, t)
					: r === v.FORM
					? X2(e)
					: r === v.CODE || r === v.FONT || r === v.NOBR
					? Br(e, t)
					: r === v.MAIN || r === v.MENU
					? Ur(e, t)
					: Wn(e, t);
				break;
			case 5:
				r === v.ASIDE ? Ur(e, t) : r === v.SMALL ? Br(e, t) : Wn(e, t);
				break;
			case 6:
				r === v.CENTER ||
				r === v.FIGURE ||
				r === v.FOOTER ||
				r === v.HEADER ||
				r === v.HGROUP ||
				r === v.DIALOG
					? Ur(e, t)
					: r === v.APPLET || r === v.OBJECT
					? f0(e, t)
					: r === v.STRIKE || r === v.STRONG
					? Br(e, t)
					: Wn(e, t);
				break;
			case 7:
				r === v.ADDRESS ||
				r === v.ARTICLE ||
				r === v.DETAILS ||
				r === v.SECTION ||
				r === v.SUMMARY ||
				r === v.LISTING
					? Ur(e, t)
					: r === v.MARQUEE
					? f0(e, t)
					: Wn(e, t);
				break;
			case 8:
				r === v.FIELDSET ? Ur(e, t) : r === v.TEMPLATE ? hi(e, t) : Wn(e, t);
				break;
			case 10:
				r === v.BLOCKQUOTE || r === v.FIGCAPTION ? Ur(e, t) : Wn(e, t);
				break;
			default:
				Wn(e, t);
		}
	}
	function Er(e, t) {
		e.tmplInsertionModeStackTop > -1 ? p0(e, t) : (e.stopped = !0);
	}
	function eT(e, t) {
		t.tagName === v.SCRIPT && (e.pendingScript = e.openElements.current),
			e.openElements.pop(),
			(e.insertionMode = e.originalInsertionMode);
	}
	function tT(e, t) {
		e._err(Yt.eofInElementThatCanContainOnlyText),
			e.openElements.pop(),
			(e.insertionMode = e.originalInsertionMode),
			e._processToken(t);
	}
	function vr(e, t) {
		const r = e.openElements.currentTagName;
		r === v.TABLE ||
		r === v.TBODY ||
		r === v.TFOOT ||
		r === v.THEAD ||
		r === v.TR
			? ((e.pendingCharacterTokens = []),
			  (e.hasNonWhitespacePendingCharacterToken = !1),
			  (e.originalInsertionMode = e.insertionMode),
			  (e.insertionMode = $h),
			  e._processToken(t))
			: Ln(e, t);
	}
	function nT(e, t) {
		e.openElements.clearBackToTableContext(),
			e.activeFormattingElements.insertMarker(),
			e._insertElement(t, ye.HTML),
			(e.insertionMode = Os);
	}
	function rT(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertElement(t, ye.HTML),
			(e.insertionMode = J1);
	}
	function iT(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertFakeElement(v.COLGROUP),
			(e.insertionMode = J1),
			e._processToken(t);
	}
	function oT(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertElement(t, ye.HTML),
			(e.insertionMode = On);
	}
	function sT(e, t) {
		e.openElements.clearBackToTableContext(),
			e._insertFakeElement(v.TBODY),
			(e.insertionMode = On),
			e._processToken(t);
	}
	function aT(e, t) {
		e.openElements.hasInTableScope(v.TABLE) &&
			(e.openElements.popUntilTagNamePopped(v.TABLE),
			e._resetInsertionMode(),
			e._processToken(t));
	}
	function lT(e, t) {
		const r = F.getTokenAttr(t, Qh.TYPE);
		r && r.toLowerCase() === Vh ? e._appendElement(t, ye.HTML) : Ln(e, t),
			(t.ackSelfClosing = !0);
	}
	function uT(e, t) {
		!e.formElement &&
			e.openElements.tmplCount === 0 &&
			(e._insertElement(t, ye.HTML),
			(e.formElement = e.openElements.current),
			e.openElements.pop());
	}
	function Nl(e, t) {
		const r = t.tagName;
		switch (r.length) {
			case 2:
				r === v.TD || r === v.TH || r === v.TR ? sT(e, t) : Ln(e, t);
				break;
			case 3:
				r === v.COL ? iT(e, t) : Ln(e, t);
				break;
			case 4:
				r === v.FORM ? uT(e, t) : Ln(e, t);
				break;
			case 5:
				r === v.TABLE
					? aT(e, t)
					: r === v.STYLE
					? Ut(e, t)
					: r === v.TBODY || r === v.TFOOT || r === v.THEAD
					? oT(e, t)
					: r === v.INPUT
					? lT(e, t)
					: Ln(e, t);
				break;
			case 6:
				r === v.SCRIPT ? Ut(e, t) : Ln(e, t);
				break;
			case 7:
				r === v.CAPTION ? nT(e, t) : Ln(e, t);
				break;
			case 8:
				r === v.COLGROUP ? rT(e, t) : r === v.TEMPLATE ? Ut(e, t) : Ln(e, t);
				break;
			default:
				Ln(e, t);
		}
	}
	function xl(e, t) {
		const r = t.tagName;
		r === v.TABLE
			? e.openElements.hasInTableScope(v.TABLE) &&
			  (e.openElements.popUntilTagNamePopped(v.TABLE), e._resetInsertionMode())
			: r === v.TEMPLATE
			? hi(e, t)
			: r !== v.BODY &&
			  r !== v.CAPTION &&
			  r !== v.COL &&
			  r !== v.COLGROUP &&
			  r !== v.HTML &&
			  r !== v.TBODY &&
			  r !== v.TD &&
			  r !== v.TFOOT &&
			  r !== v.TH &&
			  r !== v.THEAD &&
			  r !== v.TR &&
			  Ln(e, t);
	}
	function Ln(e, t) {
		const r = e.fosterParentingEnabled;
		(e.fosterParentingEnabled = !0),
			e._processTokenInBodyMode(t),
			(e.fosterParentingEnabled = r);
	}
	function cT(e, t) {
		e.pendingCharacterTokens.push(t);
	}
	function fT(e, t) {
		e.pendingCharacterTokens.push(t),
			(e.hasNonWhitespacePendingCharacterToken = !0);
	}
	function so(e, t) {
		let r = 0;
		if (e.hasNonWhitespacePendingCharacterToken)
			for (; r < e.pendingCharacterTokens.length; r++)
				Ln(e, e.pendingCharacterTokens[r]);
		else
			for (; r < e.pendingCharacterTokens.length; r++)
				e._insertCharacters(e.pendingCharacterTokens[r]);
		(e.insertionMode = e.originalInsertionMode), e._processToken(t);
	}
	function hT(e, t) {
		const r = t.tagName;
		r === v.CAPTION ||
		r === v.COL ||
		r === v.COLGROUP ||
		r === v.TBODY ||
		r === v.TD ||
		r === v.TFOOT ||
		r === v.TH ||
		r === v.THEAD ||
		r === v.TR
			? e.openElements.hasInTableScope(v.CAPTION) &&
			  (e.openElements.generateImpliedEndTags(),
			  e.openElements.popUntilTagNamePopped(v.CAPTION),
			  e.activeFormattingElements.clearToLastMarker(),
			  (e.insertionMode = Zt),
			  e._processToken(t))
			: dn(e, t);
	}
	function dT(e, t) {
		const r = t.tagName;
		r === v.CAPTION || r === v.TABLE
			? e.openElements.hasInTableScope(v.CAPTION) &&
			  (e.openElements.generateImpliedEndTags(),
			  e.openElements.popUntilTagNamePopped(v.CAPTION),
			  e.activeFormattingElements.clearToLastMarker(),
			  (e.insertionMode = Zt),
			  r === v.TABLE && e._processToken(t))
			: r !== v.BODY &&
			  r !== v.COL &&
			  r !== v.COLGROUP &&
			  r !== v.HTML &&
			  r !== v.TBODY &&
			  r !== v.TD &&
			  r !== v.TFOOT &&
			  r !== v.TH &&
			  r !== v.THEAD &&
			  r !== v.TR &&
			  bl(e, t);
	}
	function pT(e, t) {
		const r = t.tagName;
		r === v.HTML
			? dn(e, t)
			: r === v.COL
			? (e._appendElement(t, ye.HTML), (t.ackSelfClosing = !0))
			: r === v.TEMPLATE
			? Ut(e, t)
			: Ds(e, t);
	}
	function gT(e, t) {
		const r = t.tagName;
		r === v.COLGROUP
			? e.openElements.currentTagName === v.COLGROUP &&
			  (e.openElements.pop(), (e.insertionMode = Zt))
			: r === v.TEMPLATE
			? hi(e, t)
			: r !== v.COL && Ds(e, t);
	}
	function Ds(e, t) {
		e.openElements.currentTagName === v.COLGROUP &&
			(e.openElements.pop(), (e.insertionMode = Zt), e._processToken(t));
	}
	function mT(e, t) {
		const r = t.tagName;
		r === v.TR
			? (e.openElements.clearBackToTableBodyContext(),
			  e._insertElement(t, ye.HTML),
			  (e.insertionMode = mr))
			: r === v.TH || r === v.TD
			? (e.openElements.clearBackToTableBodyContext(),
			  e._insertFakeElement(v.TR),
			  (e.insertionMode = mr),
			  e._processToken(t))
			: r === v.CAPTION ||
			  r === v.COL ||
			  r === v.COLGROUP ||
			  r === v.TBODY ||
			  r === v.TFOOT ||
			  r === v.THEAD
			? e.openElements.hasTableBodyContextInTableScope() &&
			  (e.openElements.clearBackToTableBodyContext(),
			  e.openElements.pop(),
			  (e.insertionMode = Zt),
			  e._processToken(t))
			: Nl(e, t);
	}
	function TT(e, t) {
		const r = t.tagName;
		r === v.TBODY || r === v.TFOOT || r === v.THEAD
			? e.openElements.hasInTableScope(r) &&
			  (e.openElements.clearBackToTableBodyContext(),
			  e.openElements.pop(),
			  (e.insertionMode = Zt))
			: r === v.TABLE
			? e.openElements.hasTableBodyContextInTableScope() &&
			  (e.openElements.clearBackToTableBodyContext(),
			  e.openElements.pop(),
			  (e.insertionMode = Zt),
			  e._processToken(t))
			: ((r !== v.BODY && r !== v.CAPTION && r !== v.COL && r !== v.COLGROUP) ||
					(r !== v.HTML && r !== v.TD && r !== v.TH && r !== v.TR)) &&
			  xl(e, t);
	}
	function ET(e, t) {
		const r = t.tagName;
		r === v.TH || r === v.TD
			? (e.openElements.clearBackToTableRowContext(),
			  e._insertElement(t, ye.HTML),
			  (e.insertionMode = ws),
			  e.activeFormattingElements.insertMarker())
			: r === v.CAPTION ||
			  r === v.COL ||
			  r === v.COLGROUP ||
			  r === v.TBODY ||
			  r === v.TFOOT ||
			  r === v.THEAD ||
			  r === v.TR
			? e.openElements.hasInTableScope(v.TR) &&
			  (e.openElements.clearBackToTableRowContext(),
			  e.openElements.pop(),
			  (e.insertionMode = On),
			  e._processToken(t))
			: Nl(e, t);
	}
	function vT(e, t) {
		const r = t.tagName;
		r === v.TR
			? e.openElements.hasInTableScope(v.TR) &&
			  (e.openElements.clearBackToTableRowContext(),
			  e.openElements.pop(),
			  (e.insertionMode = On))
			: r === v.TABLE
			? e.openElements.hasInTableScope(v.TR) &&
			  (e.openElements.clearBackToTableRowContext(),
			  e.openElements.pop(),
			  (e.insertionMode = On),
			  e._processToken(t))
			: r === v.TBODY || r === v.TFOOT || r === v.THEAD
			? (e.openElements.hasInTableScope(r) ||
					e.openElements.hasInTableScope(v.TR)) &&
			  (e.openElements.clearBackToTableRowContext(),
			  e.openElements.pop(),
			  (e.insertionMode = On),
			  e._processToken(t))
			: ((r !== v.BODY && r !== v.CAPTION && r !== v.COL && r !== v.COLGROUP) ||
					(r !== v.HTML && r !== v.TD && r !== v.TH)) &&
			  xl(e, t);
	}
	function yT(e, t) {
		const r = t.tagName;
		r === v.CAPTION ||
		r === v.COL ||
		r === v.COLGROUP ||
		r === v.TBODY ||
		r === v.TD ||
		r === v.TFOOT ||
		r === v.TH ||
		r === v.THEAD ||
		r === v.TR
			? (e.openElements.hasInTableScope(v.TD) ||
					e.openElements.hasInTableScope(v.TH)) &&
			  (e._closeTableCell(), e._processToken(t))
			: dn(e, t);
	}
	function AT(e, t) {
		const r = t.tagName;
		r === v.TD || r === v.TH
			? e.openElements.hasInTableScope(r) &&
			  (e.openElements.generateImpliedEndTags(),
			  e.openElements.popUntilTagNamePopped(r),
			  e.activeFormattingElements.clearToLastMarker(),
			  (e.insertionMode = mr))
			: r === v.TABLE ||
			  r === v.TBODY ||
			  r === v.TFOOT ||
			  r === v.THEAD ||
			  r === v.TR
			? e.openElements.hasInTableScope(r) &&
			  (e._closeTableCell(), e._processToken(t))
			: r !== v.BODY &&
			  r !== v.CAPTION &&
			  r !== v.COL &&
			  r !== v.COLGROUP &&
			  r !== v.HTML &&
			  bl(e, t);
	}
	function h0(e, t) {
		const r = t.tagName;
		r === v.HTML
			? dn(e, t)
			: r === v.OPTION
			? (e.openElements.currentTagName === v.OPTION && e.openElements.pop(),
			  e._insertElement(t, ye.HTML))
			: r === v.OPTGROUP
			? (e.openElements.currentTagName === v.OPTION && e.openElements.pop(),
			  e.openElements.currentTagName === v.OPTGROUP && e.openElements.pop(),
			  e._insertElement(t, ye.HTML))
			: r === v.INPUT || r === v.KEYGEN || r === v.TEXTAREA || r === v.SELECT
			? e.openElements.hasInSelectScope(v.SELECT) &&
			  (e.openElements.popUntilTagNamePopped(v.SELECT),
			  e._resetInsertionMode(),
			  r !== v.SELECT && e._processToken(t))
			: (r === v.SCRIPT || r === v.TEMPLATE) && Ut(e, t);
	}
	function d0(e, t) {
		const r = t.tagName;
		if (r === v.OPTGROUP) {
			const o = e.openElements.items[e.openElements.stackTop - 1],
				u = o && e.treeAdapter.getTagName(o);
			e.openElements.currentTagName === v.OPTION &&
				u === v.OPTGROUP &&
				e.openElements.pop(),
				e.openElements.currentTagName === v.OPTGROUP && e.openElements.pop();
		} else r === v.OPTION ? e.openElements.currentTagName === v.OPTION && e.openElements.pop() : r === v.SELECT && e.openElements.hasInSelectScope(v.SELECT) ? (e.openElements.popUntilTagNamePopped(v.SELECT), e._resetInsertionMode()) : r === v.TEMPLATE && hi(e, t);
	}
	function _T(e, t) {
		const r = t.tagName;
		r === v.CAPTION ||
		r === v.TABLE ||
		r === v.TBODY ||
		r === v.TFOOT ||
		r === v.THEAD ||
		r === v.TR ||
		r === v.TD ||
		r === v.TH
			? (e.openElements.popUntilTagNamePopped(v.SELECT),
			  e._resetInsertionMode(),
			  e._processToken(t))
			: h0(e, t);
	}
	function CT(e, t) {
		const r = t.tagName;
		r === v.CAPTION ||
		r === v.TABLE ||
		r === v.TBODY ||
		r === v.TFOOT ||
		r === v.THEAD ||
		r === v.TR ||
		r === v.TD ||
		r === v.TH
			? e.openElements.hasInTableScope(r) &&
			  (e.openElements.popUntilTagNamePopped(v.SELECT),
			  e._resetInsertionMode(),
			  e._processToken(t))
			: d0(e, t);
	}
	function ST(e, t) {
		const r = t.tagName;
		if (
			r === v.BASE ||
			r === v.BASEFONT ||
			r === v.BGSOUND ||
			r === v.LINK ||
			r === v.META ||
			r === v.NOFRAMES ||
			r === v.SCRIPT ||
			r === v.STYLE ||
			r === v.TEMPLATE ||
			r === v.TITLE
		)
			Ut(e, t);
		else {
			const o = o2[r] || tr;
			e._popTmplInsertionMode(),
				e._pushTmplInsertionMode(o),
				(e.insertionMode = o),
				e._processToken(t);
		}
	}
	function bT(e, t) {
		t.tagName === v.TEMPLATE && hi(e, t);
	}
	function p0(e, t) {
		e.openElements.tmplCount > 0
			? (e.openElements.popUntilTagNamePopped(v.TEMPLATE),
			  e.activeFormattingElements.clearToLastMarker(),
			  e._popTmplInsertionMode(),
			  e._resetInsertionMode(),
			  e._processToken(t))
			: (e.stopped = !0);
	}
	function NT(e, t) {
		t.tagName === v.HTML ? dn(e, t) : Ps(e, t);
	}
	function xT(e, t) {
		t.tagName === v.HTML
			? e.fragmentContext || (e.insertionMode = t0)
			: Ps(e, t);
	}
	function Ps(e, t) {
		(e.insertionMode = tr), e._processToken(t);
	}
	function kT(e, t) {
		const r = t.tagName;
		r === v.HTML
			? dn(e, t)
			: r === v.FRAMESET
			? e._insertElement(t, ye.HTML)
			: r === v.FRAME
			? (e._appendElement(t, ye.HTML), (t.ackSelfClosing = !0))
			: r === v.NOFRAMES && Ut(e, t);
	}
	function OT(e, t) {
		t.tagName === v.FRAMESET &&
			!e.openElements.isRootHtmlElementCurrent() &&
			(e.openElements.pop(),
			!e.fragmentContext &&
				e.openElements.currentTagName !== v.FRAMESET &&
				(e.insertionMode = e0));
	}
	function wT(e, t) {
		const r = t.tagName;
		r === v.HTML ? dn(e, t) : r === v.NOFRAMES && Ut(e, t);
	}
	function LT(e, t) {
		t.tagName === v.HTML && (e.insertionMode = n0);
	}
	function IT(e, t) {
		t.tagName === v.HTML ? dn(e, t) : Fs(e, t);
	}
	function Fs(e, t) {
		(e.insertionMode = tr), e._processToken(t);
	}
	function MT(e, t) {
		const r = t.tagName;
		r === v.HTML ? dn(e, t) : r === v.NOFRAMES && Ut(e, t);
	}
	function RT(e, t) {
		(t.chars = e2.REPLACEMENT_CHARACTER), e._insertCharacters(t);
	}
	function DT(e, t) {
		e._insertCharacters(t), (e.framesetOk = !1);
	}
	function PT(e, t) {
		if (er.causesExit(t) && !e.fragmentContext) {
			for (
				;
				e.treeAdapter.getNamespaceURI(e.openElements.current) !== ye.HTML &&
				!e._isIntegrationPoint(e.openElements.current);

			)
				e.openElements.pop();
			e._processToken(t);
		} else {
			const r = e._getAdjustedCurrentElement(),
				o = e.treeAdapter.getNamespaceURI(r);
			o === ye.MATHML
				? er.adjustTokenMathMLAttrs(t)
				: o === ye.SVG &&
				  (er.adjustTokenSVGTagName(t), er.adjustTokenSVGAttrs(t)),
				er.adjustTokenXMLAttrs(t),
				t.selfClosing ? e._appendElement(t, o) : e._insertElement(t, o),
				(t.ackSelfClosing = !0);
		}
	}
	function FT(e, t) {
		for (let r = e.openElements.stackTop; r > 0; r--) {
			const o = e.openElements.items[r];
			if (e.treeAdapter.getNamespaceURI(o) === ye.HTML) {
				e._processToken(t);
				break;
			}
			if (e.treeAdapter.getTagName(o).toLowerCase() === t.tagName) {
				e.openElements.popUntilElementPopped(o);
				break;
			}
		}
	}
	const Hs = g0('start'),
		kl = g0('end');
	function g0(e) {
		return t;
		function t(r) {
			const o = (r && r.position && r.position[e]) || {};
			return {
				line: o.line || null,
				column: o.column || null,
				offset: o.offset > -1 ? o.offset : null,
			};
		}
	}
	class ao {
		constructor(t, r, o) {
			(this.property = t), (this.normal = r), o && (this.space = o);
		}
	}
	(ao.prototype.property = {}),
		(ao.prototype.normal = {}),
		(ao.prototype.space = null);
	function m0(e, t) {
		const r = {},
			o = {};
		let u = -1;
		for (; ++u < e.length; )
			Object.assign(r, e[u].property), Object.assign(o, e[u].normal);
		return new ao(r, o, t);
	}
	function lo(e) {
		return e.toLowerCase();
	}
	class In {
		constructor(t, r) {
			(this.property = t), (this.attribute = r);
		}
	}
	(In.prototype.space = null),
		(In.prototype.boolean = !1),
		(In.prototype.booleanish = !1),
		(In.prototype.overloadedBoolean = !1),
		(In.prototype.number = !1),
		(In.prototype.commaSeparated = !1),
		(In.prototype.spaceSeparated = !1),
		(In.prototype.commaOrSpaceSeparated = !1),
		(In.prototype.mustUseProperty = !1),
		(In.prototype.defined = !1);
	let HT = 0;
	const Be = pi(),
		Nt = pi(),
		T0 = pi(),
		le = pi(),
		ht = pi(),
		e1 = pi(),
		_n = pi();
	function pi() {
		return 2 ** ++HT;
	}
	const Ol = Object.freeze(
			Object.defineProperty(
				{
					__proto__: null,
					boolean: Be,
					booleanish: Nt,
					commaOrSpaceSeparated: _n,
					commaSeparated: e1,
					number: le,
					overloadedBoolean: T0,
					spaceSeparated: ht,
				},
				Symbol.toStringTag,
				{
					value: 'Module',
				}
			)
		),
		wl = Object.keys(Ol);
	class Ll extends In {
		constructor(t, r, o, u) {
			let c = -1;
			if ((super(t, r), E0(this, 'space', u), typeof o == 'number'))
				for (; ++c < wl.length; ) {
					const f = wl[c];
					E0(this, wl[c], (o & Ol[f]) === Ol[f]);
				}
		}
	}
	Ll.prototype.defined = !0;
	function E0(e, t, r) {
		r && (e[t] = r);
	}
	const BT = {}.hasOwnProperty;
	function t1(e) {
		const t = {},
			r = {};
		let o;
		for (o in e.properties)
			if (BT.call(e.properties, o)) {
				const u = e.properties[o],
					c = new Ll(o, e.transform(e.attributes || {}, o), u, e.space);
				e.mustUseProperty &&
					e.mustUseProperty.includes(o) &&
					(c.mustUseProperty = !0),
					(t[o] = c),
					(r[lo(o)] = o),
					(r[lo(c.attribute)] = o);
			}
		return new ao(t, r, e.space);
	}
	const v0 = t1({
			space: 'xlink',
			transform(e, t) {
				return 'xlink:' + t.slice(5).toLowerCase();
			},
			properties: {
				xLinkActuate: null,
				xLinkArcRole: null,
				xLinkHref: null,
				xLinkRole: null,
				xLinkShow: null,
				xLinkTitle: null,
				xLinkType: null,
			},
		}),
		y0 = t1({
			space: 'xml',
			transform(e, t) {
				return 'xml:' + t.slice(3).toLowerCase();
			},
			properties: {
				xmlLang: null,
				xmlBase: null,
				xmlSpace: null,
			},
		});
	function A0(e, t) {
		return t in e ? e[t] : t;
	}
	function _0(e, t) {
		return A0(e, t.toLowerCase());
	}
	const C0 = t1({
			space: 'xmlns',
			attributes: {
				xmlnsxlink: 'xmlns:xlink',
			},
			transform: _0,
			properties: {
				xmlns: null,
				xmlnsXLink: null,
			},
		}),
		S0 = t1({
			transform(e, t) {
				return t === 'role' ? t : 'aria-' + t.slice(4).toLowerCase();
			},
			properties: {
				ariaActiveDescendant: null,
				ariaAtomic: Nt,
				ariaAutoComplete: null,
				ariaBusy: Nt,
				ariaChecked: Nt,
				ariaColCount: le,
				ariaColIndex: le,
				ariaColSpan: le,
				ariaControls: ht,
				ariaCurrent: null,
				ariaDescribedBy: ht,
				ariaDetails: null,
				ariaDisabled: Nt,
				ariaDropEffect: ht,
				ariaErrorMessage: null,
				ariaExpanded: Nt,
				ariaFlowTo: ht,
				ariaGrabbed: Nt,
				ariaHasPopup: null,
				ariaHidden: Nt,
				ariaInvalid: null,
				ariaKeyShortcuts: null,
				ariaLabel: null,
				ariaLabelledBy: ht,
				ariaLevel: le,
				ariaLive: null,
				ariaModal: Nt,
				ariaMultiLine: Nt,
				ariaMultiSelectable: Nt,
				ariaOrientation: null,
				ariaOwns: ht,
				ariaPlaceholder: null,
				ariaPosInSet: le,
				ariaPressed: Nt,
				ariaReadOnly: Nt,
				ariaRelevant: null,
				ariaRequired: Nt,
				ariaRoleDescription: ht,
				ariaRowCount: le,
				ariaRowIndex: le,
				ariaRowSpan: le,
				ariaSelected: Nt,
				ariaSetSize: le,
				ariaSort: null,
				ariaValueMax: le,
				ariaValueMin: le,
				ariaValueNow: le,
				ariaValueText: null,
				role: null,
			},
		}),
		UT = t1({
			space: 'html',
			attributes: {
				acceptcharset: 'accept-charset',
				classname: 'class',
				htmlfor: 'for',
				httpequiv: 'http-equiv',
			},
			transform: _0,
			mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
			properties: {
				abbr: null,
				accept: e1,
				acceptCharset: ht,
				accessKey: ht,
				action: null,
				allow: null,
				allowFullScreen: Be,
				allowPaymentRequest: Be,
				allowUserMedia: Be,
				alt: null,
				as: null,
				async: Be,
				autoCapitalize: null,
				autoComplete: ht,
				autoFocus: Be,
				autoPlay: Be,
				capture: Be,
				charSet: null,
				checked: Be,
				cite: null,
				className: ht,
				cols: le,
				colSpan: null,
				content: null,
				contentEditable: Nt,
				controls: Be,
				controlsList: ht,
				coords: le | e1,
				crossOrigin: null,
				data: null,
				dateTime: null,
				decoding: null,
				default: Be,
				defer: Be,
				dir: null,
				dirName: null,
				disabled: Be,
				download: T0,
				draggable: Nt,
				encType: null,
				enterKeyHint: null,
				form: null,
				formAction: null,
				formEncType: null,
				formMethod: null,
				formNoValidate: Be,
				formTarget: null,
				headers: ht,
				height: le,
				hidden: Be,
				high: le,
				href: null,
				hrefLang: null,
				htmlFor: ht,
				httpEquiv: ht,
				id: null,
				imageSizes: null,
				imageSrcSet: null,
				inputMode: null,
				integrity: null,
				is: null,
				isMap: Be,
				itemId: null,
				itemProp: ht,
				itemRef: ht,
				itemScope: Be,
				itemType: ht,
				kind: null,
				label: null,
				lang: null,
				language: null,
				list: null,
				loading: null,
				loop: Be,
				low: le,
				manifest: null,
				max: null,
				maxLength: le,
				media: null,
				method: null,
				min: null,
				minLength: le,
				multiple: Be,
				muted: Be,
				name: null,
				nonce: null,
				noModule: Be,
				noValidate: Be,
				onAbort: null,
				onAfterPrint: null,
				onAuxClick: null,
				onBeforePrint: null,
				onBeforeUnload: null,
				onBlur: null,
				onCancel: null,
				onCanPlay: null,
				onCanPlayThrough: null,
				onChange: null,
				onClick: null,
				onClose: null,
				onContextLost: null,
				onContextMenu: null,
				onContextRestored: null,
				onCopy: null,
				onCueChange: null,
				onCut: null,
				onDblClick: null,
				onDrag: null,
				onDragEnd: null,
				onDragEnter: null,
				onDragExit: null,
				onDragLeave: null,
				onDragOver: null,
				onDragStart: null,
				onDrop: null,
				onDurationChange: null,
				onEmptied: null,
				onEnded: null,
				onError: null,
				onFocus: null,
				onFormData: null,
				onHashChange: null,
				onInput: null,
				onInvalid: null,
				onKeyDown: null,
				onKeyPress: null,
				onKeyUp: null,
				onLanguageChange: null,
				onLoad: null,
				onLoadedData: null,
				onLoadedMetadata: null,
				onLoadEnd: null,
				onLoadStart: null,
				onMessage: null,
				onMessageError: null,
				onMouseDown: null,
				onMouseEnter: null,
				onMouseLeave: null,
				onMouseMove: null,
				onMouseOut: null,
				onMouseOver: null,
				onMouseUp: null,
				onOffline: null,
				onOnline: null,
				onPageHide: null,
				onPageShow: null,
				onPaste: null,
				onPause: null,
				onPlay: null,
				onPlaying: null,
				onPopState: null,
				onProgress: null,
				onRateChange: null,
				onRejectionHandled: null,
				onReset: null,
				onResize: null,
				onScroll: null,
				onSecurityPolicyViolation: null,
				onSeeked: null,
				onSeeking: null,
				onSelect: null,
				onSlotChange: null,
				onStalled: null,
				onStorage: null,
				onSubmit: null,
				onSuspend: null,
				onTimeUpdate: null,
				onToggle: null,
				onUnhandledRejection: null,
				onUnload: null,
				onVolumeChange: null,
				onWaiting: null,
				onWheel: null,
				open: Be,
				optimum: le,
				pattern: null,
				ping: ht,
				placeholder: null,
				playsInline: Be,
				poster: null,
				preload: null,
				readOnly: Be,
				referrerPolicy: null,
				rel: ht,
				required: Be,
				reversed: Be,
				rows: le,
				rowSpan: le,
				sandbox: ht,
				scope: null,
				scoped: Be,
				seamless: Be,
				selected: Be,
				shape: null,
				size: le,
				sizes: null,
				slot: null,
				span: le,
				spellCheck: Nt,
				src: null,
				srcDoc: null,
				srcLang: null,
				srcSet: null,
				start: le,
				step: null,
				style: null,
				tabIndex: le,
				target: null,
				title: null,
				translate: null,
				type: null,
				typeMustMatch: Be,
				useMap: null,
				value: Nt,
				width: le,
				wrap: null,
				align: null,
				aLink: null,
				archive: ht,
				axis: null,
				background: null,
				bgColor: null,
				border: le,
				borderColor: null,
				bottomMargin: le,
				cellPadding: null,
				cellSpacing: null,
				char: null,
				charOff: null,
				classId: null,
				clear: null,
				code: null,
				codeBase: null,
				codeType: null,
				color: null,
				compact: Be,
				declare: Be,
				event: null,
				face: null,
				frame: null,
				frameBorder: null,
				hSpace: le,
				leftMargin: le,
				link: null,
				longDesc: null,
				lowSrc: null,
				marginHeight: le,
				marginWidth: le,
				noResize: Be,
				noHref: Be,
				noShade: Be,
				noWrap: Be,
				object: null,
				profile: null,
				prompt: null,
				rev: null,
				rightMargin: le,
				rules: null,
				scheme: null,
				scrolling: Nt,
				standby: null,
				summary: null,
				text: null,
				topMargin: le,
				valueType: null,
				version: null,
				vAlign: null,
				vLink: null,
				vSpace: le,
				allowTransparency: null,
				autoCorrect: null,
				autoSave: null,
				disablePictureInPicture: Be,
				disableRemotePlayback: Be,
				prefix: null,
				property: null,
				results: le,
				security: null,
				unselectable: null,
			},
		}),
		GT = t1({
			space: 'svg',
			attributes: {
				accentHeight: 'accent-height',
				alignmentBaseline: 'alignment-baseline',
				arabicForm: 'arabic-form',
				baselineShift: 'baseline-shift',
				capHeight: 'cap-height',
				className: 'class',
				clipPath: 'clip-path',
				clipRule: 'clip-rule',
				colorInterpolation: 'color-interpolation',
				colorInterpolationFilters: 'color-interpolation-filters',
				colorProfile: 'color-profile',
				colorRendering: 'color-rendering',
				crossOrigin: 'crossorigin',
				dataType: 'datatype',
				dominantBaseline: 'dominant-baseline',
				enableBackground: 'enable-background',
				fillOpacity: 'fill-opacity',
				fillRule: 'fill-rule',
				floodColor: 'flood-color',
				floodOpacity: 'flood-opacity',
				fontFamily: 'font-family',
				fontSize: 'font-size',
				fontSizeAdjust: 'font-size-adjust',
				fontStretch: 'font-stretch',
				fontStyle: 'font-style',
				fontVariant: 'font-variant',
				fontWeight: 'font-weight',
				glyphName: 'glyph-name',
				glyphOrientationHorizontal: 'glyph-orientation-horizontal',
				glyphOrientationVertical: 'glyph-orientation-vertical',
				hrefLang: 'hreflang',
				horizAdvX: 'horiz-adv-x',
				horizOriginX: 'horiz-origin-x',
				horizOriginY: 'horiz-origin-y',
				imageRendering: 'image-rendering',
				letterSpacing: 'letter-spacing',
				lightingColor: 'lighting-color',
				markerEnd: 'marker-end',
				markerMid: 'marker-mid',
				markerStart: 'marker-start',
				navDown: 'nav-down',
				navDownLeft: 'nav-down-left',
				navDownRight: 'nav-down-right',
				navLeft: 'nav-left',
				navNext: 'nav-next',
				navPrev: 'nav-prev',
				navRight: 'nav-right',
				navUp: 'nav-up',
				navUpLeft: 'nav-up-left',
				navUpRight: 'nav-up-right',
				onAbort: 'onabort',
				onActivate: 'onactivate',
				onAfterPrint: 'onafterprint',
				onBeforePrint: 'onbeforeprint',
				onBegin: 'onbegin',
				onCancel: 'oncancel',
				onCanPlay: 'oncanplay',
				onCanPlayThrough: 'oncanplaythrough',
				onChange: 'onchange',
				onClick: 'onclick',
				onClose: 'onclose',
				onCopy: 'oncopy',
				onCueChange: 'oncuechange',
				onCut: 'oncut',
				onDblClick: 'ondblclick',
				onDrag: 'ondrag',
				onDragEnd: 'ondragend',
				onDragEnter: 'ondragenter',
				onDragExit: 'ondragexit',
				onDragLeave: 'ondragleave',
				onDragOver: 'ondragover',
				onDragStart: 'ondragstart',
				onDrop: 'ondrop',
				onDurationChange: 'ondurationchange',
				onEmptied: 'onemptied',
				onEnd: 'onend',
				onEnded: 'onended',
				onError: 'onerror',
				onFocus: 'onfocus',
				onFocusIn: 'onfocusin',
				onFocusOut: 'onfocusout',
				onHashChange: 'onhashchange',
				onInput: 'oninput',
				onInvalid: 'oninvalid',
				onKeyDown: 'onkeydown',
				onKeyPress: 'onkeypress',
				onKeyUp: 'onkeyup',
				onLoad: 'onload',
				onLoadedData: 'onloadeddata',
				onLoadedMetadata: 'onloadedmetadata',
				onLoadStart: 'onloadstart',
				onMessage: 'onmessage',
				onMouseDown: 'onmousedown',
				onMouseEnter: 'onmouseenter',
				onMouseLeave: 'onmouseleave',
				onMouseMove: 'onmousemove',
				onMouseOut: 'onmouseout',
				onMouseOver: 'onmouseover',
				onMouseUp: 'onmouseup',
				onMouseWheel: 'onmousewheel',
				onOffline: 'onoffline',
				onOnline: 'ononline',
				onPageHide: 'onpagehide',
				onPageShow: 'onpageshow',
				onPaste: 'onpaste',
				onPause: 'onpause',
				onPlay: 'onplay',
				onPlaying: 'onplaying',
				onPopState: 'onpopstate',
				onProgress: 'onprogress',
				onRateChange: 'onratechange',
				onRepeat: 'onrepeat',
				onReset: 'onreset',
				onResize: 'onresize',
				onScroll: 'onscroll',
				onSeeked: 'onseeked',
				onSeeking: 'onseeking',
				onSelect: 'onselect',
				onShow: 'onshow',
				onStalled: 'onstalled',
				onStorage: 'onstorage',
				onSubmit: 'onsubmit',
				onSuspend: 'onsuspend',
				onTimeUpdate: 'ontimeupdate',
				onToggle: 'ontoggle',
				onUnload: 'onunload',
				onVolumeChange: 'onvolumechange',
				onWaiting: 'onwaiting',
				onZoom: 'onzoom',
				overlinePosition: 'overline-position',
				overlineThickness: 'overline-thickness',
				paintOrder: 'paint-order',
				panose1: 'panose-1',
				pointerEvents: 'pointer-events',
				referrerPolicy: 'referrerpolicy',
				renderingIntent: 'rendering-intent',
				shapeRendering: 'shape-rendering',
				stopColor: 'stop-color',
				stopOpacity: 'stop-opacity',
				strikethroughPosition: 'strikethrough-position',
				strikethroughThickness: 'strikethrough-thickness',
				strokeDashArray: 'stroke-dasharray',
				strokeDashOffset: 'stroke-dashoffset',
				strokeLineCap: 'stroke-linecap',
				strokeLineJoin: 'stroke-linejoin',
				strokeMiterLimit: 'stroke-miterlimit',
				strokeOpacity: 'stroke-opacity',
				strokeWidth: 'stroke-width',
				tabIndex: 'tabindex',
				textAnchor: 'text-anchor',
				textDecoration: 'text-decoration',
				textRendering: 'text-rendering',
				typeOf: 'typeof',
				underlinePosition: 'underline-position',
				underlineThickness: 'underline-thickness',
				unicodeBidi: 'unicode-bidi',
				unicodeRange: 'unicode-range',
				unitsPerEm: 'units-per-em',
				vAlphabetic: 'v-alphabetic',
				vHanging: 'v-hanging',
				vIdeographic: 'v-ideographic',
				vMathematical: 'v-mathematical',
				vectorEffect: 'vector-effect',
				vertAdvY: 'vert-adv-y',
				vertOriginX: 'vert-origin-x',
				vertOriginY: 'vert-origin-y',
				wordSpacing: 'word-spacing',
				writingMode: 'writing-mode',
				xHeight: 'x-height',
				playbackOrder: 'playbackorder',
				timelineBegin: 'timelinebegin',
			},
			transform: A0,
			properties: {
				about: _n,
				accentHeight: le,
				accumulate: null,
				additive: null,
				alignmentBaseline: null,
				alphabetic: le,
				amplitude: le,
				arabicForm: null,
				ascent: le,
				attributeName: null,
				attributeType: null,
				azimuth: le,
				bandwidth: null,
				baselineShift: null,
				baseFrequency: null,
				baseProfile: null,
				bbox: null,
				begin: null,
				bias: le,
				by: null,
				calcMode: null,
				capHeight: le,
				className: ht,
				clip: null,
				clipPath: null,
				clipPathUnits: null,
				clipRule: null,
				color: null,
				colorInterpolation: null,
				colorInterpolationFilters: null,
				colorProfile: null,
				colorRendering: null,
				content: null,
				contentScriptType: null,
				contentStyleType: null,
				crossOrigin: null,
				cursor: null,
				cx: null,
				cy: null,
				d: null,
				dataType: null,
				defaultAction: null,
				descent: le,
				diffuseConstant: le,
				direction: null,
				display: null,
				dur: null,
				divisor: le,
				dominantBaseline: null,
				download: Be,
				dx: null,
				dy: null,
				edgeMode: null,
				editable: null,
				elevation: le,
				enableBackground: null,
				end: null,
				event: null,
				exponent: le,
				externalResourcesRequired: null,
				fill: null,
				fillOpacity: le,
				fillRule: null,
				filter: null,
				filterRes: null,
				filterUnits: null,
				floodColor: null,
				floodOpacity: null,
				focusable: null,
				focusHighlight: null,
				fontFamily: null,
				fontSize: null,
				fontSizeAdjust: null,
				fontStretch: null,
				fontStyle: null,
				fontVariant: null,
				fontWeight: null,
				format: null,
				fr: null,
				from: null,
				fx: null,
				fy: null,
				g1: e1,
				g2: e1,
				glyphName: e1,
				glyphOrientationHorizontal: null,
				glyphOrientationVertical: null,
				glyphRef: null,
				gradientTransform: null,
				gradientUnits: null,
				handler: null,
				hanging: le,
				hatchContentUnits: null,
				hatchUnits: null,
				height: null,
				href: null,
				hrefLang: null,
				horizAdvX: le,
				horizOriginX: le,
				horizOriginY: le,
				id: null,
				ideographic: le,
				imageRendering: null,
				initialVisibility: null,
				in: null,
				in2: null,
				intercept: le,
				k: le,
				k1: le,
				k2: le,
				k3: le,
				k4: le,
				kernelMatrix: _n,
				kernelUnitLength: null,
				keyPoints: null,
				keySplines: null,
				keyTimes: null,
				kerning: null,
				lang: null,
				lengthAdjust: null,
				letterSpacing: null,
				lightingColor: null,
				limitingConeAngle: le,
				local: null,
				markerEnd: null,
				markerMid: null,
				markerStart: null,
				markerHeight: null,
				markerUnits: null,
				markerWidth: null,
				mask: null,
				maskContentUnits: null,
				maskUnits: null,
				mathematical: null,
				max: null,
				media: null,
				mediaCharacterEncoding: null,
				mediaContentEncodings: null,
				mediaSize: le,
				mediaTime: null,
				method: null,
				min: null,
				mode: null,
				name: null,
				navDown: null,
				navDownLeft: null,
				navDownRight: null,
				navLeft: null,
				navNext: null,
				navPrev: null,
				navRight: null,
				navUp: null,
				navUpLeft: null,
				navUpRight: null,
				numOctaves: null,
				observer: null,
				offset: null,
				onAbort: null,
				onActivate: null,
				onAfterPrint: null,
				onBeforePrint: null,
				onBegin: null,
				onCancel: null,
				onCanPlay: null,
				onCanPlayThrough: null,
				onChange: null,
				onClick: null,
				onClose: null,
				onCopy: null,
				onCueChange: null,
				onCut: null,
				onDblClick: null,
				onDrag: null,
				onDragEnd: null,
				onDragEnter: null,
				onDragExit: null,
				onDragLeave: null,
				onDragOver: null,
				onDragStart: null,
				onDrop: null,
				onDurationChange: null,
				onEmptied: null,
				onEnd: null,
				onEnded: null,
				onError: null,
				onFocus: null,
				onFocusIn: null,
				onFocusOut: null,
				onHashChange: null,
				onInput: null,
				onInvalid: null,
				onKeyDown: null,
				onKeyPress: null,
				onKeyUp: null,
				onLoad: null,
				onLoadedData: null,
				onLoadedMetadata: null,
				onLoadStart: null,
				onMessage: null,
				onMouseDown: null,
				onMouseEnter: null,
				onMouseLeave: null,
				onMouseMove: null,
				onMouseOut: null,
				onMouseOver: null,
				onMouseUp: null,
				onMouseWheel: null,
				onOffline: null,
				onOnline: null,
				onPageHide: null,
				onPageShow: null,
				onPaste: null,
				onPause: null,
				onPlay: null,
				onPlaying: null,
				onPopState: null,
				onProgress: null,
				onRateChange: null,
				onRepeat: null,
				onReset: null,
				onResize: null,
				onScroll: null,
				onSeeked: null,
				onSeeking: null,
				onSelect: null,
				onShow: null,
				onStalled: null,
				onStorage: null,
				onSubmit: null,
				onSuspend: null,
				onTimeUpdate: null,
				onToggle: null,
				onUnload: null,
				onVolumeChange: null,
				onWaiting: null,
				onZoom: null,
				opacity: null,
				operator: null,
				order: null,
				orient: null,
				orientation: null,
				origin: null,
				overflow: null,
				overlay: null,
				overlinePosition: le,
				overlineThickness: le,
				paintOrder: null,
				panose1: null,
				path: null,
				pathLength: le,
				patternContentUnits: null,
				patternTransform: null,
				patternUnits: null,
				phase: null,
				ping: ht,
				pitch: null,
				playbackOrder: null,
				pointerEvents: null,
				points: null,
				pointsAtX: le,
				pointsAtY: le,
				pointsAtZ: le,
				preserveAlpha: null,
				preserveAspectRatio: null,
				primitiveUnits: null,
				propagate: null,
				property: _n,
				r: null,
				radius: null,
				referrerPolicy: null,
				refX: null,
				refY: null,
				rel: _n,
				rev: _n,
				renderingIntent: null,
				repeatCount: null,
				repeatDur: null,
				requiredExtensions: _n,
				requiredFeatures: _n,
				requiredFonts: _n,
				requiredFormats: _n,
				resource: null,
				restart: null,
				result: null,
				rotate: null,
				rx: null,
				ry: null,
				scale: null,
				seed: null,
				shapeRendering: null,
				side: null,
				slope: null,
				snapshotTime: null,
				specularConstant: le,
				specularExponent: le,
				spreadMethod: null,
				spacing: null,
				startOffset: null,
				stdDeviation: null,
				stemh: null,
				stemv: null,
				stitchTiles: null,
				stopColor: null,
				stopOpacity: null,
				strikethroughPosition: le,
				strikethroughThickness: le,
				string: null,
				stroke: null,
				strokeDashArray: _n,
				strokeDashOffset: null,
				strokeLineCap: null,
				strokeLineJoin: null,
				strokeMiterLimit: le,
				strokeOpacity: le,
				strokeWidth: null,
				style: null,
				surfaceScale: le,
				syncBehavior: null,
				syncBehaviorDefault: null,
				syncMaster: null,
				syncTolerance: null,
				syncToleranceDefault: null,
				systemLanguage: _n,
				tabIndex: le,
				tableValues: null,
				target: null,
				targetX: le,
				targetY: le,
				textAnchor: null,
				textDecoration: null,
				textRendering: null,
				textLength: null,
				timelineBegin: null,
				title: null,
				transformBehavior: null,
				type: null,
				typeOf: _n,
				to: null,
				transform: null,
				u1: null,
				u2: null,
				underlinePosition: le,
				underlineThickness: le,
				unicode: null,
				unicodeBidi: null,
				unicodeRange: null,
				unitsPerEm: le,
				values: null,
				vAlphabetic: le,
				vMathematical: le,
				vectorEffect: null,
				vHanging: le,
				vIdeographic: le,
				version: null,
				vertAdvY: le,
				vertOriginX: le,
				vertOriginY: le,
				viewBox: null,
				viewTarget: null,
				visibility: null,
				width: null,
				widths: null,
				wordSpacing: null,
				writingMode: null,
				x: null,
				x1: null,
				x2: null,
				xChannelSelector: null,
				xHeight: le,
				y: null,
				y1: null,
				y2: null,
				yChannelSelector: null,
				z: null,
				zoomAndPan: null,
			},
		}),
		zT = /^data[-\w.:]+$/i,
		b0 = /-[a-z]/g,
		WT = /[A-Z]/g;
	function uo(e, t) {
		const r = lo(t);
		let o = t,
			u = In;
		if (r in e.normal) return e.property[e.normal[r]];
		if (r.length > 4 && r.slice(0, 4) === 'data' && zT.test(t)) {
			if (t.charAt(4) === '-') {
				const c = t.slice(5).replace(b0, jT);
				o = 'data' + c.charAt(0).toUpperCase() + c.slice(1);
			} else {
				const c = t.slice(4);
				if (!b0.test(c)) {
					let f = c.replace(WT, KT);
					f.charAt(0) !== '-' && (f = '-' + f), (t = 'data' + f);
				}
			}
			u = Ll;
		}
		return new u(o, t);
	}
	function KT(e) {
		return '-' + e.toLowerCase();
	}
	function jT(e) {
		return e.charAt(1).toUpperCase();
	}
	const YT = {
			classId: 'classID',
			dataType: 'datatype',
			itemId: 'itemID',
			strokeDashArray: 'strokeDasharray',
			strokeDashOffset: 'strokeDashoffset',
			strokeLineCap: 'strokeLinecap',
			strokeLineJoin: 'strokeLinejoin',
			strokeMiterLimit: 'strokeMiterlimit',
			typeOf: 'typeof',
			xLinkActuate: 'xlinkActuate',
			xLinkArcRole: 'xlinkArcrole',
			xLinkHref: 'xlinkHref',
			xLinkRole: 'xlinkRole',
			xLinkShow: 'xlinkShow',
			xLinkTitle: 'xlinkTitle',
			xLinkType: 'xlinkType',
			xmlnsXLink: 'xmlnsXlink',
		},
		n1 = m0([y0, v0, C0, S0, UT], 'html'),
		yr = m0([y0, v0, C0, S0, GT], 'svg');
	var N0 = /[#.]/g;
	const qT = function (e, t = 'div') {
		for (var r = e || '', o = {}, u = 0, c, f, d; u < r.length; )
			(N0.lastIndex = u),
				(d = N0.exec(r)),
				(c = r.slice(u, d ? d.index : r.length)),
				c &&
					(f
						? f === '#'
							? (o.id = c)
							: Array.isArray(o.className)
							? o.className.push(c)
							: (o.className = [c])
						: (t = c),
					(u += c.length)),
				d && ((f = d[0]), u++);
		return {
			type: 'element',
			tagName: t,
			properties: o,
			children: [],
		};
	};
	function x0(e) {
		const t = String(e || '').trim();
		return t ? t.split(/[ \t\n\r\f]+/g) : [];
	}
	function k0(e) {
		return e.join(' ').trim();
	}
	function O0(e) {
		for (var t = [], r = String(e || ''), o = r.indexOf(','), u = 0, c, f; !c; )
			o === -1 && ((o = r.length), (c = !0)),
				(f = r.slice(u, o).trim()),
				(f || !c) && t.push(f),
				(u = o + 1),
				(o = r.indexOf(',', u));
		return t;
	}
	function w0(e, t) {
		var r = t || {};
		return (
			e[e.length - 1] === '' && (e = e.concat('')),
			e
				.join((r.padRight ? ' ' : '') + ',' + (r.padLeft === !1 ? '' : ' '))
				.trim()
		);
	}
	const XT = new Set(['menu', 'submit', 'reset', 'button']),
		Il = {}.hasOwnProperty;
	function L0(e, t, r) {
		const o = r && JT(r);
		return function (c, f, ...d) {
			let g = -1,
				T;
			if (c == null)
				(T = {
					type: 'root',
					children: [],
				}),
					d.unshift(f);
			else if (
				((T = qT(c, t)),
				(T.tagName = T.tagName.toLowerCase()),
				o && Il.call(o, T.tagName) && (T.tagName = o[T.tagName]),
				QT(f, T.tagName))
			) {
				let A;
				for (A in f) Il.call(f, A) && VT(e, T.properties, A, f[A]);
			} else d.unshift(f);
			for (; ++g < d.length; ) Ml(T.children, d[g]);
			return (
				T.type === 'element' &&
					T.tagName === 'template' &&
					((T.content = {
						type: 'root',
						children: T.children,
					}),
					(T.children = [])),
				T
			);
		};
	}
	function QT(e, t) {
		return e == null || typeof e != 'object' || Array.isArray(e)
			? !1
			: t === 'input' || !e.type || typeof e.type != 'string'
			? !0
			: 'children' in e && Array.isArray(e.children)
			? !1
			: t === 'button'
			? XT.has(e.type.toLowerCase())
			: !('value' in e);
	}
	function VT(e, t, r, o) {
		const u = uo(e, r);
		let c = -1,
			f;
		if (o != null) {
			if (typeof o == 'number') {
				if (Number.isNaN(o)) return;
				f = o;
			} else
				typeof o == 'boolean'
					? (f = o)
					: typeof o == 'string'
					? u.spaceSeparated
						? (f = x0(o))
						: u.commaSeparated
						? (f = O0(o))
						: u.commaOrSpaceSeparated
						? (f = x0(O0(o).join(' ')))
						: (f = I0(u, u.property, o))
					: Array.isArray(o)
					? (f = o.concat())
					: (f = u.property === 'style' ? ZT(o) : String(o));
			if (Array.isArray(f)) {
				const d = [];
				for (; ++c < f.length; ) d[c] = I0(u, u.property, f[c]);
				f = d;
			}
			u.property === 'className' &&
				Array.isArray(t.className) &&
				(f = t.className.concat(f)),
				(t[u.property] = f);
		}
	}
	function Ml(e, t) {
		let r = -1;
		if (t != null)
			if (typeof t == 'string' || typeof t == 'number')
				e.push({
					type: 'text',
					value: String(t),
				});
			else if (Array.isArray(t)) for (; ++r < t.length; ) Ml(e, t[r]);
			else if (typeof t == 'object' && 'type' in t)
				t.type === 'root' ? Ml(e, t.children) : e.push(t);
			else throw new Error('Expected node, nodes, or string, got `' + t + '`');
	}
	function I0(e, t, r) {
		if (typeof r == 'string') {
			if (e.number && r && !Number.isNaN(Number(r))) return Number(r);
			if ((e.boolean || e.overloadedBoolean) && (r === '' || lo(r) === lo(t)))
				return !0;
		}
		return r;
	}
	function ZT(e) {
		const t = [];
		let r;
		for (r in e) Il.call(e, r) && t.push([r, e[r]].join(': '));
		return t.join('; ');
	}
	function JT(e) {
		const t = {};
		let r = -1;
		for (; ++r < e.length; ) t[e[r].toLowerCase()] = e[r];
		return t;
	}
	const $T = L0(n1, 'div'),
		e8 = L0(yr, 'g', [
			'altGlyph',
			'altGlyphDef',
			'altGlyphItem',
			'animateColor',
			'animateMotion',
			'animateTransform',
			'clipPath',
			'feBlend',
			'feColorMatrix',
			'feComponentTransfer',
			'feComposite',
			'feConvolveMatrix',
			'feDiffuseLighting',
			'feDisplacementMap',
			'feDistantLight',
			'feDropShadow',
			'feFlood',
			'feFuncA',
			'feFuncB',
			'feFuncG',
			'feFuncR',
			'feGaussianBlur',
			'feImage',
			'feMerge',
			'feMergeNode',
			'feMorphology',
			'feOffset',
			'fePointLight',
			'feSpecularLighting',
			'feSpotLight',
			'feTile',
			'feTurbulence',
			'foreignObject',
			'glyphRef',
			'linearGradient',
			'radialGradient',
			'solidColor',
			'textArea',
			'textPath',
		]);
	function t8(e) {
		for (var t = String(e), r = [], o = /\r?\n|\r/g; o.test(t); )
			r.push(o.lastIndex);
		return (
			r.push(t.length + 1),
			{
				toPoint: u,
				toOffset: c,
			}
		);
		function u(f) {
			var d = -1;
			if (f > -1 && f < r[r.length - 1]) {
				for (; ++d < r.length; )
					if (r[d] > f)
						return {
							line: d + 1,
							column: f - (r[d - 1] || 0) + 1,
							offset: f,
						};
			}
			return {
				line: void 0,
				column: void 0,
				offset: void 0,
			};
		}
		function c(f) {
			var d = f && f.line,
				g = f && f.column,
				T;
			return (
				typeof d == 'number' &&
					typeof g == 'number' &&
					!Number.isNaN(d) &&
					!Number.isNaN(g) &&
					d - 1 in r &&
					(T = (r[d - 2] || 0) + g - 1 || 0),
				T > -1 && T < r[r.length - 1] ? T : -1
			);
		}
	}
	const gi = {
			html: 'http://www.w3.org/1999/xhtml',
			mathml: 'http://www.w3.org/1998/Math/MathML',
			svg: 'http://www.w3.org/2000/svg',
			xlink: 'http://www.w3.org/1999/xlink',
			xml: 'http://www.w3.org/XML/1998/namespace',
			xmlns: 'http://www.w3.org/2000/xmlns/',
		},
		M0 = {}.hasOwnProperty,
		R0 = {
			'#document': D0,
			'#document-fragment': D0,
			'#text': o8,
			'#comment': s8,
			'#documentType': i8,
		};
	function n8(e, t = {}) {
		let r, o;
		return (
			u8(t) ? ((o = t), (r = {})) : ((o = t.file), (r = t)),
			Rl(
				{
					schema: r.space === 'svg' ? yr : n1,
					file: o,
					verbose: r.verbose,
					location: !1,
				},
				e
			)
		);
	}
	function Rl(e, t) {
		const r = e.schema,
			o = M0.call(R0, t.nodeName) ? R0[t.nodeName] : a8;
		let u;
		'tagName' in t && (e.schema = t.namespaceURI === gi.svg ? yr : n1),
			'childNodes' in t && (u = r8(e, t.childNodes));
		const c = o(e, t, u);
		if ('sourceCodeLocation' in t && t.sourceCodeLocation && e.file) {
			const f = l8(e, c, t.sourceCodeLocation);
			f && ((e.location = !0), (c.position = f));
		}
		return (e.schema = r), c;
	}
	function r8(e, t) {
		let r = -1;
		const o = [];
		for (; ++r < t.length; ) o[r] = Rl(e, t[r]);
		return o;
	}
	function D0(e, t, r) {
		const o = {
			type: 'root',
			children: r,
			data: {
				quirksMode: t.mode === 'quirks' || t.mode === 'limited-quirks',
			},
		};
		if (e.file && e.location) {
			const u = String(e.file),
				c = t8(u);
			o.position = {
				start: c.toPoint(0),
				end: c.toPoint(u.length),
			};
		}
		return o;
	}
	function i8() {
		return {
			type: 'doctype',
		};
	}
	function o8(e, t) {
		return {
			type: 'text',
			value: t.value,
		};
	}
	function s8(e, t) {
		return {
			type: 'comment',
			value: t.data,
		};
	}
	function a8(e, t, r) {
		const o = e.schema.space === 'svg' ? e8 : $T;
		let u = -1;
		const c = {};
		for (; ++u < t.attrs.length; ) {
			const d = t.attrs[u];
			c[(d.prefix ? d.prefix + ':' : '') + d.name] = d.value;
		}
		const f = o(t.tagName, c, r);
		if (f.tagName === 'template' && 'content' in t) {
			const d = t.sourceCodeLocation,
				g = d && d.startTag && r1(d.startTag),
				T = d && d.endTag && r1(d.endTag),
				A = Rl(e, t.content);
			g &&
				T &&
				e.file &&
				(A.position = {
					start: g.end,
					end: T.start,
				}),
				(f.content = A);
		}
		return f;
	}
	function l8(e, t, r) {
		const o = r1(r);
		if (t.type === 'element') {
			const u = t.children[t.children.length - 1];
			if (
				(o &&
					!r.endTag &&
					u &&
					u.position &&
					u.position.end &&
					(o.end = Object.assign({}, u.position.end)),
				e.verbose)
			) {
				const c = {};
				let f;
				for (f in r.attrs)
					M0.call(r.attrs, f) && (c[uo(e.schema, f).property] = r1(r.attrs[f]));
				t.data = {
					position: {
						opening: r1(r.startTag),
						closing: r.endTag ? r1(r.endTag) : null,
						properties: c,
					},
				};
			}
		}
		return o;
	}
	function r1(e) {
		const t = P0({
				line: e.startLine,
				column: e.startCol,
				offset: e.startOffset,
			}),
			r = P0({
				line: e.endLine,
				column: e.endCol,
				offset: e.endOffset,
			});
		return t || r
			? {
					start: t,
					end: r,
			  }
			: null;
	}
	function P0(e) {
		return e.line && e.column ? e : null;
	}
	function u8(e) {
		return 'messages' in e;
	}
	var F0 = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
		c8 = /\n/g,
		f8 = /^\s*/,
		h8 = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
		d8 = /^:\s*/,
		p8 = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
		g8 = /^[;\s]*/,
		m8 = /^\s+|\s+$/g,
		T8 = `
`,
		H0 = '/',
		B0 = '*',
		mi = '',
		E8 = 'comment',
		v8 = 'declaration',
		y8 = function (e, t) {
			if (typeof e != 'string')
				throw new TypeError('First argument must be a string');
			if (!e) return [];
			t = t || {};
			var r = 1,
				o = 1;
			function u(S) {
				var D = S.match(c8);
				D && (r += D.length);
				var P = S.lastIndexOf(T8);
				o = ~P ? S.length - P : o + S.length;
			}
			function c() {
				var S = {
					line: r,
					column: o,
				};
				return function (D) {
					return (D.position = new f(S)), T(), D;
				};
			}
			function f(S) {
				(this.start = S),
					(this.end = {
						line: r,
						column: o,
					}),
					(this.source = t.source);
			}
			f.prototype.content = e;
			function d(S) {
				var D = new Error(t.source + ':' + r + ':' + o + ': ' + S);
				if (
					((D.reason = S),
					(D.filename = t.source),
					(D.line = r),
					(D.column = o),
					(D.source = e),
					!t.silent)
				)
					throw D;
			}
			function g(S) {
				var D = S.exec(e);
				if (D) {
					var P = D[0];
					return u(P), (e = e.slice(P.length)), D;
				}
			}
			function T() {
				g(f8);
			}
			function A(S) {
				var D;
				for (S = S || []; (D = C()); ) D !== !1 && S.push(D);
				return S;
			}
			function C() {
				var S = c();
				if (!(H0 != e.charAt(0) || B0 != e.charAt(1))) {
					for (
						var D = 2;
						mi != e.charAt(D) && (B0 != e.charAt(D) || H0 != e.charAt(D + 1));

					)
						++D;
					if (((D += 2), mi === e.charAt(D - 1)))
						return d('End of comment missing');
					var P = e.slice(2, D - 2);
					return (
						(o += 2),
						u(P),
						(e = e.slice(D)),
						(o += 2),
						S({
							type: E8,
							comment: P,
						})
					);
				}
			}
			function M() {
				var S = c(),
					D = g(h8);
				if (D) {
					if ((C(), !g(d8))) return d("property missing ':'");
					var P = g(p8),
						I = S({
							type: v8,
							property: U0(D[0].replace(F0, mi)),
							value: P ? U0(P[0].replace(F0, mi)) : mi,
						});
					return g(g8), I;
				}
			}
			function x() {
				var S = [];
				A(S);
				for (var D; (D = M()); ) D !== !1 && (S.push(D), A(S));
				return S;
			}
			return T(), x();
		};
	function U0(e) {
		return e ? e.replace(m8, mi) : mi;
	}
	var A8 = y8;
	function _8(e, t) {
		var r = null;
		if (!e || typeof e != 'string') return r;
		for (
			var o, u = A8(e), c = typeof t == 'function', f, d, g = 0, T = u.length;
			g < T;
			g++
		)
			(o = u[g]),
				(f = o.property),
				(d = o.value),
				c ? t(f, d, o) : d && (r || (r = {}), (r[f] = d));
		return r;
	}
	var C8 = _8;
	const S8 = gi,
		b8 = YT,
		N8 = {}.hasOwnProperty,
		x8 = Ui('root'),
		Dl = Ui('element'),
		k8 = Ui('text');
	function O8(e, t, r) {
		if (typeof e != 'function') throw new TypeError('h is not a function');
		const o = L8(e),
			u = R8(e),
			c = M8(e);
		let f, d;
		if (
			(typeof r == 'string' || typeof r == 'boolean'
				? ((f = r), (r = {}))
				: (r || (r = {}), (f = r.prefix)),
			x8(t))
		)
			d =
				t.children.length === 1 && Dl(t.children[0])
					? t.children[0]
					: {
							type: 'element',
							tagName: 'div',
							properties: {},
							children: t.children,
					  };
		else if (Dl(t)) d = t;
		else
			throw new Error(
				'Expected root or element, not `' + ((t && t.type) || t) + '`'
			);
		return G0(e, d, {
			schema: r.space === 'svg' ? yr : n1,
			prefix:
				f == null
					? o || u || c
						? 'h-'
						: null
					: typeof f == 'string'
					? f
					: f
					? 'h-'
					: null,
			key: 0,
			react: o,
			vue: u,
			vdom: c,
			hyperscript: I8(e),
		});
	}
	function G0(e, t, r) {
		const o = r.schema;
		let u = o,
			c = t.tagName;
		const f = {},
			d = [];
		let g = -1,
			T;
		o.space === 'html' &&
			c.toLowerCase() === 'svg' &&
			((u = yr), (r.schema = u));
		for (T in t.properties)
			t.properties &&
				N8.call(t.properties, T) &&
				w8(f, T, t.properties[T], r, c);
		if (
			(r.vdom &&
				(u.space === 'html'
					? (c = c.toUpperCase())
					: u.space && (f.namespace = S8[u.space])),
			r.prefix && (r.key++, (f.key = r.prefix + r.key)),
			t.children)
		)
			for (; ++g < t.children.length; ) {
				const A = t.children[g];
				Dl(A) ? d.push(G0(e, A, r)) : k8(A) && d.push(A.value);
			}
		return (r.schema = o), d.length > 0 ? e.call(t, c, f, d) : e.call(t, c, f);
	}
	function w8(e, t, r, o, u) {
		const c = uo(o.schema, t);
		let f;
		r == null ||
			(typeof r == 'number' && Number.isNaN(r)) ||
			(r === !1 && (o.vue || o.vdom || o.hyperscript)) ||
			(!r && c.boolean && (o.vue || o.vdom || o.hyperscript)) ||
			(Array.isArray(r) && (r = c.commaSeparated ? w0(r) : k0(r)),
			c.boolean && o.hyperscript && (r = ''),
			c.property === 'style' &&
				typeof r == 'string' &&
				(o.react || o.vue || o.vdom) &&
				(r = D8(r, u)),
			o.vue
				? c.property !== 'style' && (f = 'attrs')
				: c.mustUseProperty ||
				  (o.vdom
						? c.property !== 'style' && (f = 'attributes')
						: o.hyperscript && (f = 'attrs')),
			f
				? (e[f] = Object.assign(e[f] || {}, {
						[c.attribute]: r,
				  }))
				: c.space && o.react
				? (e[b8[c.property] || c.property] = r)
				: (e[c.attribute] = r));
	}
	function L8(e) {
		const t = e('div', {});
		return !!(
			t &&
			('_owner' in t || '_store' in t) &&
			(t.key === void 0 || t.key === null)
		);
	}
	function I8(e) {
		return 'context' in e && 'cleanup' in e;
	}
	function M8(e) {
		return e('div', {}).type === 'VirtualNode';
	}
	function R8(e) {
		const t = e('div', {});
		return !!(t && t.context && t.context._isVue);
	}
	function D8(e, t) {
		const r = {};
		try {
			C8(e, (o, u) => {
				o.slice(0, 4) === '-ms-' && (o = 'ms-' + o.slice(4)),
					(r[o.replace(/-([a-z])/g, (c, f) => f.toUpperCase())] = u);
			});
		} catch (o) {
			throw ((o.message = t + '[style]' + o.message.slice(9)), o);
		}
		return r;
	}
	var z0 = {}.hasOwnProperty;
	function W0(e, t) {
		var r = t || {};
		function o(u) {
			var c = o.invalid,
				f = o.handlers;
			if (
				(u && z0.call(u, e) && (c = z0.call(f, u[e]) ? f[u[e]] : o.unknown), c)
			)
				return c.apply(this, arguments);
		}
		return (
			(o.handlers = r.handlers || {}),
			(o.invalid = r.invalid),
			(o.unknown = r.unknown),
			o
		);
	}
	var P8 = {}.hasOwnProperty,
		K0 = W0('type', {
			handlers: {
				root: H8,
				element: W8,
				text: G8,
				comment: z8,
				doctype: U8,
			},
		});
	function F8(e, t) {
		return K0(e, t === 'svg' ? yr : n1);
	}
	function H8(e, t) {
		var r = {
			nodeName: '#document',
			mode: (e.data || {}).quirksMode ? 'quirks' : 'no-quirks',
			childNodes: [],
		};
		return (r.childNodes = Pl(e.children, r, t)), i1(e, r);
	}
	function B8(e, t) {
		var r = {
			nodeName: '#document-fragment',
			childNodes: [],
		};
		return (r.childNodes = Pl(e.children, r, t)), i1(e, r);
	}
	function U8(e) {
		return i1(e, {
			nodeName: '#documentType',
			name: 'html',
			publicId: '',
			systemId: '',
			parentNode: void 0,
		});
	}
	function G8(e) {
		return i1(e, {
			nodeName: '#text',
			value: e.value,
			parentNode: void 0,
		});
	}
	function z8(e) {
		return i1(e, {
			nodeName: '#comment',
			data: e.value,
			parentNode: void 0,
		});
	}
	function W8(e, t) {
		var r = t.space;
		return O8(
			o,
			Object.assign({}, e, {
				children: [],
			}),
			{
				space: r,
			}
		);
		function o(u, c) {
			var f = [],
				d,
				g,
				T,
				A,
				C;
			for (T in c)
				!P8.call(c, T) ||
					c[T] === !1 ||
					((d = uo(t, T)),
					!(d.boolean && !c[T]) &&
						((g = {
							name: T,
							value: c[T] === !0 ? '' : String(c[T]),
						}),
						d.space &&
							d.space !== 'html' &&
							d.space !== 'svg' &&
							((A = T.indexOf(':')),
							A < 0
								? (g.prefix = '')
								: ((g.name = T.slice(A + 1)), (g.prefix = T.slice(0, A))),
							(g.namespace = gi[d.space])),
						f.push(g)));
			return (
				t.space === 'html' && e.tagName === 'svg' && (t = yr),
				(C = i1(e, {
					nodeName: u,
					tagName: u,
					attrs: f,
					namespaceURI: gi[t.space],
					childNodes: [],
					parentNode: void 0,
				})),
				(C.childNodes = Pl(e.children, C, t)),
				u === 'template' && (C.content = B8(e.content, t)),
				C
			);
		}
	}
	function Pl(e, t, r) {
		var o = -1,
			u = [],
			c;
		if (e)
			for (; ++o < e.length; ) (c = K0(e[o], r)), (c.parentNode = t), u.push(c);
		return u;
	}
	function i1(e, t) {
		var r = e.position;
		return (
			r &&
				r.start &&
				r.end &&
				(t.sourceCodeLocation = {
					startLine: r.start.line,
					startCol: r.start.column,
					startOffset: r.start.offset,
					endLine: r.end.line,
					endCol: r.end.column,
					endOffset: r.end.offset,
				}),
			t
		);
	}
	const j0 = [
			'area',
			'base',
			'basefont',
			'bgsound',
			'br',
			'col',
			'command',
			'embed',
			'frame',
			'hr',
			'image',
			'img',
			'input',
			'isindex',
			'keygen',
			'link',
			'menuitem',
			'meta',
			'nextid',
			'param',
			'source',
			'track',
			'wbr',
		],
		K8 = 'IN_TEMPLATE_MODE',
		j8 = 'DATA_STATE',
		Y8 = 'CHARACTER_TOKEN',
		q8 = 'START_TAG_TOKEN',
		X8 = 'END_TAG_TOKEN',
		Q8 = 'COMMENT_TOKEN',
		V8 = 'DOCTYPE_TOKEN',
		Z8 = {
			sourceCodeLocationInfo: !0,
			scriptingEnabled: !1,
		},
		Y0 = function (e, t, r) {
			let o = -1;
			const u = new a2(Z8),
				c = W0('type', {
					handlers: {
						root: D,
						element: P,
						text: I,
						comment: K,
						doctype: z,
						raw: w,
					},
					unknown: tE,
				});
			let f, d, g, T, A;
			if ((rE(t) && ((r = t), (t = void 0)), r && r.passThrough))
				for (; ++o < r.passThrough.length; ) c.handlers[r.passThrough[o]] = Z;
			const C = n8(nE(e) ? x() : M(), t);
			if (
				(f &&
					Da(C, 'comment', (W, te, V) => {
						const ae = W;
						if (ae.value.stitch && V !== null && te !== null)
							return (V.children[te] = ae.value.stitch), te;
					}),
				e.type !== 'root' && C.type === 'root' && C.children.length === 1)
			)
				return C.children[0];
			return C;
			function M() {
				const W = {
						nodeName: 'template',
						tagName: 'template',
						attrs: [],
						namespaceURI: gi.html,
						childNodes: [],
					},
					te = {
						nodeName: 'documentmock',
						tagName: 'documentmock',
						attrs: [],
						namespaceURI: gi.html,
						childNodes: [],
					},
					V = {
						nodeName: '#document-fragment',
						childNodes: [],
					};
				if (
					(u._bootstrap(te, W),
					u._pushTmplInsertionMode(K8),
					u._initTokenizerForFragmentParsing(),
					u._insertFakeRootElement(),
					u._resetInsertionMode(),
					u._findFormInFragmentContext(),
					(d = u.tokenizer),
					!d)
				)
					throw new Error('Expected `tokenizer`');
				return (
					(g = d.preprocessor),
					(A = d.__mixins[0]),
					(T = A.posTracker),
					c(e),
					u._adoptNodes(te.childNodes[0], V),
					V
				);
			}
			function x() {
				const W = u.treeAdapter.createDocument();
				if ((u._bootstrap(W, void 0), (d = u.tokenizer), !d))
					throw new Error('Expected `tokenizer`');
				return (
					(g = d.preprocessor), (A = d.__mixins[0]), (T = A.posTracker), c(e), W
				);
			}
			function S(W) {
				let te = -1;
				if (W) for (; ++te < W.length; ) c(W[te]);
			}
			function D(W) {
				S(W.children);
			}
			function P(W) {
				L(),
					u._processToken(J8(W), gi.html),
					S(W.children),
					j0.includes(W.tagName) || (L(), u._processToken(eE(W)));
			}
			function I(W) {
				L(),
					u._processToken({
						type: Y8,
						chars: W.value,
						location: o1(W),
					});
			}
			function z(W) {
				L(),
					u._processToken({
						type: V8,
						name: 'html',
						forceQuirks: !1,
						publicId: '',
						systemId: '',
						location: o1(W),
					});
			}
			function K(W) {
				L(),
					u._processToken({
						type: Q8,
						data: W.value,
						location: o1(W),
					});
			}
			function w(W) {
				const te = Hs(W),
					V = te.line || 1,
					ae = te.column || 1,
					X = te.offset || 0;
				if (!g) throw new Error('Expected `preprocessor`');
				if (!d) throw new Error('Expected `tokenizer`');
				if (!T) throw new Error('Expected `posTracker`');
				if (!A) throw new Error('Expected `locationTracker`');
				(g.html = void 0),
					(g.pos = -1),
					(g.lastGapPos = -1),
					(g.lastCharPos = -1),
					(g.gapStack = []),
					(g.skipNextNewLine = !1),
					(g.lastChunkWritten = !1),
					(g.endOfChunkHit = !1),
					(T.isEol = !1),
					(T.lineStartPos = -ae + 1),
					(T.droppedBufferSize = X),
					(T.offset = 0),
					(T.col = 1),
					(T.line = V),
					(A.currentAttrLocation = void 0),
					(A.ctLoc = o1(W)),
					d.write(W.value),
					u._runParsingLoop(null),
					(d.state === 'NAMED_CHARACTER_REFERENCE_STATE' ||
						d.state === 'NUMERIC_CHARACTER_REFERENCE_END_STATE') &&
						((g.lastChunkWritten = !0), d[d.state](d._consume()));
				const G = d.currentCharacterToken;
				G &&
					((G.location.endLine = T.line),
					(G.location.endCol = T.col + 1),
					(G.location.endOffset = T.offset + 1),
					u._processToken(G));
			}
			function Z(W) {
				f = !0;
				let te;
				'children' in W
					? (te = {
							...W,
							children: Y0(
								{
									type: 'root',
									children: W.children,
								},
								t,
								r
							).children,
					  })
					: (te = {
							...W,
					  }),
					K({
						type: 'comment',
						value: {
							stitch: te,
						},
					});
			}
			function L() {
				if (!d) throw new Error('Expected `tokenizer`');
				(d.tokenQueue = []),
					(d.state = j8),
					(d.returnState = ''),
					(d.charRefCode = -1),
					(d.tempBuff = []),
					(d.lastStartTagName = ''),
					(d.consumedAfterSnapshot = -1),
					(d.active = !1),
					(d.currentCharacterToken = void 0),
					(d.currentToken = void 0),
					(d.currentAttr = void 0);
			}
		};
	function J8(e) {
		const t = Object.assign(o1(e));
		return (
			(t.startTag = Object.assign({}, t)),
			{
				type: q8,
				tagName: e.tagName,
				selfClosing: !1,
				attrs: $8(e),
				location: t,
			}
		);
	}
	function $8(e) {
		return F8({
			tagName: e.tagName,
			type: 'element',
			properties: e.properties,
			children: [],
		}).attrs;
	}
	function eE(e) {
		const t = Object.assign(o1(e));
		return (
			(t.startTag = Object.assign({}, t)),
			{
				type: X8,
				tagName: e.tagName,
				attrs: [],
				location: t,
			}
		);
	}
	function tE(e) {
		throw new Error('Cannot compile `' + e.type + '` node');
	}
	function nE(e) {
		const t = e.type === 'root' ? e.children[0] : e;
		return !!(
			t &&
			(t.type === 'doctype' || (t.type === 'element' && t.tagName === 'html'))
		);
	}
	function o1(e) {
		const t = Hs(e),
			r = kl(e);
		return {
			startLine: t.line,
			startCol: t.column,
			startOffset: t.offset,
			endLine: r.line,
			endCol: r.column,
			endOffset: r.offset,
		};
	}
	function rE(e) {
		return !!(e && !('message' in e && 'messages' in e));
	}
	function iE(e = {}) {
		return (t, r) => Y0(t, r, e);
	}
	function oE(e = $a) {
		return (t) => Ym(t, e);
	}
	const It = function (e, t, r, o, u) {
			const c = q0(t);
			if (
				r != null &&
				(typeof r != 'number' || r < 0 || r === Number.POSITIVE_INFINITY)
			)
				throw new Error('Expected positive finite index for child node');
			if (o != null && (!o.type || !o.children))
				throw new Error('Expected parent node');
			if (!e || !e.type || typeof e.type != 'string') return !1;
			if ((o == null) != (r == null))
				throw new Error('Expected both parent and index');
			return c.call(u, e, r, o);
		},
		q0 = function (e) {
			if (e == null) return Fl;
			if (typeof e == 'string') return aE(e);
			if (typeof e == 'object') return sE(e);
			if (typeof e == 'function') return X0(e);
			throw new Error('Expected function, string, or array as test');
		};
	function sE(e) {
		const t = [];
		let r = -1;
		for (; ++r < e.length; ) t[r] = q0(e[r]);
		return X0(o);
		function o(...u) {
			let c = -1;
			for (; ++c < t.length; ) if (t[c].call(this, ...u)) return !0;
			return !1;
		}
	}
	function aE(e) {
		return t;
		function t(r) {
			return Fl(r) && r.tagName === e;
		}
	}
	function X0(e) {
		return t;
		function t(r, ...o) {
			return Fl(r) && !!e.call(this, r, ...o);
		}
	}
	function Fl(e) {
		return !!(
			e &&
			typeof e == 'object' &&
			e.type === 'element' &&
			typeof e.tagName == 'string'
		);
	}
	const Hl = function (e) {
		if (e == null) return fE;
		if (typeof e == 'string') return cE(e);
		if (typeof e == 'object') return Array.isArray(e) ? lE(e) : uE(e);
		if (typeof e == 'function') return Bs(e);
		throw new Error('Expected function, string, or object as test');
	};
	function lE(e) {
		const t = [];
		let r = -1;
		for (; ++r < e.length; ) t[r] = Hl(e[r]);
		return Bs(o);
		function o(...u) {
			let c = -1;
			for (; ++c < t.length; ) if (t[c].call(this, ...u)) return !0;
			return !1;
		}
	}
	function uE(e) {
		return Bs(t);
		function t(r) {
			let o;
			for (o in e) if (r[o] !== e[o]) return !1;
			return !0;
		}
	}
	function cE(e) {
		return Bs(t);
		function t(r) {
			return r && r.type === e;
		}
	}
	function Bs(e) {
		return t;
		function t(...r) {
			return !!e.call(this, ...r);
		}
	}
	function fE() {
		return !0;
	}
	const co = Hl('comment');
	function Q0(e) {
		var t = e && typeof e == 'object' && e.type === 'text' ? e.value || '' : e;
		return typeof t == 'string' && t.replace(/[ \t\n\f\r]/g, '') === '';
	}
	const xt = Z0(1),
		V0 = Z0(-1);
	function Z0(e) {
		return t;
		function t(r, o, u) {
			const c = r && r.children;
			let f = o + e,
				d = c && c[f];
			if (!u) for (; d && Q0(d); ) (f += e), (d = c[f]);
			return d;
		}
	}
	const hE = Hl('text');
	function J0(e) {
		return hE(e) && Q0(e.value.charAt(0));
	}
	const dE = {}.hasOwnProperty;
	function $0(e) {
		return t;
		function t(r, o, u) {
			return dE.call(e, r.tagName) && e[r.tagName](r, o, u);
		}
	}
	const Bl = $0({
		html: pE,
		head: Ul,
		body: gE,
		p: mE,
		li: TE,
		dt: EE,
		dd: vE,
		rt: ed,
		rp: ed,
		optgroup: yE,
		option: AE,
		menuitem: _E,
		colgroup: Ul,
		caption: Ul,
		thead: CE,
		tbody: SE,
		tfoot: bE,
		tr: NE,
		td,
		th: td,
	});
	function Ul(e, t, r) {
		const o = xt(r, t, !0);
		return !o || (!co(o) && !J0(o));
	}
	function pE(e, t, r) {
		const o = xt(r, t);
		return !o || !co(o);
	}
	function gE(e, t, r) {
		const o = xt(r, t);
		return !o || !co(o);
	}
	function mE(e, t, r) {
		const o = xt(r, t);
		return o
			? It(o, [
					'address',
					'article',
					'aside',
					'blockquote',
					'details',
					'div',
					'dl',
					'fieldset',
					'figcaption',
					'figure',
					'footer',
					'form',
					'h1',
					'h2',
					'h3',
					'h4',
					'h5',
					'h6',
					'header',
					'hgroup',
					'hr',
					'main',
					'menu',
					'nav',
					'ol',
					'p',
					'pre',
					'section',
					'table',
					'ul',
			  ])
			: !r || !It(r, ['a', 'audio', 'del', 'ins', 'map', 'noscript', 'video']);
	}
	function TE(e, t, r) {
		const o = xt(r, t);
		return !o || It(o, 'li');
	}
	function EE(e, t, r) {
		const o = xt(r, t);
		return o && It(o, ['dt', 'dd']);
	}
	function vE(e, t, r) {
		const o = xt(r, t);
		return !o || It(o, ['dt', 'dd']);
	}
	function ed(e, t, r) {
		const o = xt(r, t);
		return !o || It(o, ['rp', 'rt']);
	}
	function yE(e, t, r) {
		const o = xt(r, t);
		return !o || It(o, 'optgroup');
	}
	function AE(e, t, r) {
		const o = xt(r, t);
		return !o || It(o, ['option', 'optgroup']);
	}
	function _E(e, t, r) {
		const o = xt(r, t);
		return !o || It(o, ['menuitem', 'hr', 'menu']);
	}
	function CE(e, t, r) {
		const o = xt(r, t);
		return o && It(o, ['tbody', 'tfoot']);
	}
	function SE(e, t, r) {
		const o = xt(r, t);
		return !o || It(o, ['tbody', 'tfoot']);
	}
	function bE(e, t, r) {
		return !xt(r, t);
	}
	function NE(e, t, r) {
		const o = xt(r, t);
		return !o || It(o, 'tr');
	}
	function td(e, t, r) {
		const o = xt(r, t);
		return !o || It(o, ['td', 'th']);
	}
	const xE = $0({
		html: kE,
		head: OE,
		body: wE,
		colgroup: LE,
		tbody: IE,
	});
	function kE(e) {
		const t = xt(e, -1);
		return !t || !co(t);
	}
	function OE(e) {
		const t = e.children,
			r = [];
		let o = -1,
			u;
		for (; ++o < t.length; )
			if (((u = t[o]), It(u, ['title', 'base']))) {
				if (r.includes(u.tagName)) return !1;
				r.push(u.tagName);
			}
		return t.length > 0;
	}
	function wE(e) {
		const t = xt(e, -1, !0);
		return (
			!t ||
			(!co(t) &&
				!J0(t) &&
				!It(t, ['meta', 'link', 'script', 'style', 'template']))
		);
	}
	function LE(e, t, r) {
		const o = V0(r, t),
			u = xt(e, -1, !0);
		return It(o, 'colgroup') && Bl(o, r.children.indexOf(o), r)
			? !1
			: u && It(u, 'col');
	}
	function IE(e, t, r) {
		const o = V0(r, t),
			u = xt(e, -1);
		return It(o, ['thead', 'tbody']) && Bl(o, r.children.indexOf(o), r)
			? !1
			: u && It(u, 'tr');
	}
	const ME = {
		opening: xE,
		closing: Bl,
	};
	function RE(e, t) {
		if (
			((e = e.replace(t.subset ? DE(t.subset) : /["&'<>`]/g, o)),
			t.subset || t.escapeOnly)
		)
			return e;
		return e
			.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, r)
			.replace(/[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g, o);
		function r(u, c, f) {
			return t.format(
				(u.charCodeAt(0) - 55296) * 1024 + u.charCodeAt(1) - 56320 + 65536,
				f.charCodeAt(c + 2),
				t
			);
		}
		function o(u, c, f) {
			return t.format(u.charCodeAt(0), f.charCodeAt(c + 1), t);
		}
	}
	function DE(e) {
		const t = [];
		let r = -1;
		for (; ++r < e.length; )
			t.push(e[r].replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'));
		return new RegExp('(?:' + t.join('|') + ')', 'g');
	}
	function PE(e, t, r) {
		const o = '&#x' + e.toString(16).toUpperCase();
		return r && t && !/[\dA-Fa-f]/.test(String.fromCharCode(t)) ? o : o + ';';
	}
	function FE(e, t, r) {
		const o = '&#' + String(e);
		return r && t && !/\d/.test(String.fromCharCode(t)) ? o : o + ';';
	}
	const HE = [
			'AElig',
			'AMP',
			'Aacute',
			'Acirc',
			'Agrave',
			'Aring',
			'Atilde',
			'Auml',
			'COPY',
			'Ccedil',
			'ETH',
			'Eacute',
			'Ecirc',
			'Egrave',
			'Euml',
			'GT',
			'Iacute',
			'Icirc',
			'Igrave',
			'Iuml',
			'LT',
			'Ntilde',
			'Oacute',
			'Ocirc',
			'Ograve',
			'Oslash',
			'Otilde',
			'Ouml',
			'QUOT',
			'REG',
			'THORN',
			'Uacute',
			'Ucirc',
			'Ugrave',
			'Uuml',
			'Yacute',
			'aacute',
			'acirc',
			'acute',
			'aelig',
			'agrave',
			'amp',
			'aring',
			'atilde',
			'auml',
			'brvbar',
			'ccedil',
			'cedil',
			'cent',
			'copy',
			'curren',
			'deg',
			'divide',
			'eacute',
			'ecirc',
			'egrave',
			'eth',
			'euml',
			'frac12',
			'frac14',
			'frac34',
			'gt',
			'iacute',
			'icirc',
			'iexcl',
			'igrave',
			'iquest',
			'iuml',
			'laquo',
			'lt',
			'macr',
			'micro',
			'middot',
			'nbsp',
			'not',
			'ntilde',
			'oacute',
			'ocirc',
			'ograve',
			'ordf',
			'ordm',
			'oslash',
			'otilde',
			'ouml',
			'para',
			'plusmn',
			'pound',
			'quot',
			'raquo',
			'reg',
			'sect',
			'shy',
			'sup1',
			'sup2',
			'sup3',
			'szlig',
			'thorn',
			'times',
			'uacute',
			'ucirc',
			'ugrave',
			'uml',
			'uuml',
			'yacute',
			'yen',
			'yuml',
		],
		Gl = {
			nbsp: ' ',
			iexcl: '¡',
			cent: '¢',
			pound: '£',
			curren: '¤',
			yen: '¥',
			brvbar: '¦',
			sect: '§',
			uml: '¨',
			copy: '©',
			ordf: 'ª',
			laquo: '«',
			not: '¬',
			shy: '­',
			reg: '®',
			macr: '¯',
			deg: '°',
			plusmn: '±',
			sup2: '²',
			sup3: '³',
			acute: '´',
			micro: 'µ',
			para: '¶',
			middot: '·',
			cedil: '¸',
			sup1: '¹',
			ordm: 'º',
			raquo: '»',
			frac14: '¼',
			frac12: '½',
			frac34: '¾',
			iquest: '¿',
			Agrave: 'À',
			Aacute: 'Á',
			Acirc: 'Â',
			Atilde: 'Ã',
			Auml: 'Ä',
			Aring: 'Å',
			AElig: 'Æ',
			Ccedil: 'Ç',
			Egrave: 'È',
			Eacute: 'É',
			Ecirc: 'Ê',
			Euml: 'Ë',
			Igrave: 'Ì',
			Iacute: 'Í',
			Icirc: 'Î',
			Iuml: 'Ï',
			ETH: 'Ð',
			Ntilde: 'Ñ',
			Ograve: 'Ò',
			Oacute: 'Ó',
			Ocirc: 'Ô',
			Otilde: 'Õ',
			Ouml: 'Ö',
			times: '×',
			Oslash: 'Ø',
			Ugrave: 'Ù',
			Uacute: 'Ú',
			Ucirc: 'Û',
			Uuml: 'Ü',
			Yacute: 'Ý',
			THORN: 'Þ',
			szlig: 'ß',
			agrave: 'à',
			aacute: 'á',
			acirc: 'â',
			atilde: 'ã',
			auml: 'ä',
			aring: 'å',
			aelig: 'æ',
			ccedil: 'ç',
			egrave: 'è',
			eacute: 'é',
			ecirc: 'ê',
			euml: 'ë',
			igrave: 'ì',
			iacute: 'í',
			icirc: 'î',
			iuml: 'ï',
			eth: 'ð',
			ntilde: 'ñ',
			ograve: 'ò',
			oacute: 'ó',
			ocirc: 'ô',
			otilde: 'õ',
			ouml: 'ö',
			divide: '÷',
			oslash: 'ø',
			ugrave: 'ù',
			uacute: 'ú',
			ucirc: 'û',
			uuml: 'ü',
			yacute: 'ý',
			thorn: 'þ',
			yuml: 'ÿ',
			fnof: 'ƒ',
			Alpha: 'Α',
			Beta: 'Β',
			Gamma: 'Γ',
			Delta: 'Δ',
			Epsilon: 'Ε',
			Zeta: 'Ζ',
			Eta: 'Η',
			Theta: 'Θ',
			Iota: 'Ι',
			Kappa: 'Κ',
			Lambda: 'Λ',
			Mu: 'Μ',
			Nu: 'Ν',
			Xi: 'Ξ',
			Omicron: 'Ο',
			Pi: 'Π',
			Rho: 'Ρ',
			Sigma: 'Σ',
			Tau: 'Τ',
			Upsilon: 'Υ',
			Phi: 'Φ',
			Chi: 'Χ',
			Psi: 'Ψ',
			Omega: 'Ω',
			alpha: 'α',
			beta: 'β',
			gamma: 'γ',
			delta: 'δ',
			epsilon: 'ε',
			zeta: 'ζ',
			eta: 'η',
			theta: 'θ',
			iota: 'ι',
			kappa: 'κ',
			lambda: 'λ',
			mu: 'μ',
			nu: 'ν',
			xi: 'ξ',
			omicron: 'ο',
			pi: 'π',
			rho: 'ρ',
			sigmaf: 'ς',
			sigma: 'σ',
			tau: 'τ',
			upsilon: 'υ',
			phi: 'φ',
			chi: 'χ',
			psi: 'ψ',
			omega: 'ω',
			thetasym: 'ϑ',
			upsih: 'ϒ',
			piv: 'ϖ',
			bull: '•',
			hellip: '…',
			prime: '′',
			Prime: '″',
			oline: '‾',
			frasl: '⁄',
			weierp: '℘',
			image: 'ℑ',
			real: 'ℜ',
			trade: '™',
			alefsym: 'ℵ',
			larr: '←',
			uarr: '↑',
			rarr: '→',
			darr: '↓',
			harr: '↔',
			crarr: '↵',
			lArr: '⇐',
			uArr: '⇑',
			rArr: '⇒',
			dArr: '⇓',
			hArr: '⇔',
			forall: '∀',
			part: '∂',
			exist: '∃',
			empty: '∅',
			nabla: '∇',
			isin: '∈',
			notin: '∉',
			ni: '∋',
			prod: '∏',
			sum: '∑',
			minus: '−',
			lowast: '∗',
			radic: '√',
			prop: '∝',
			infin: '∞',
			ang: '∠',
			and: '∧',
			or: '∨',
			cap: '∩',
			cup: '∪',
			int: '∫',
			there4: '∴',
			sim: '∼',
			cong: '≅',
			asymp: '≈',
			ne: '≠',
			equiv: '≡',
			le: '≤',
			ge: '≥',
			sub: '⊂',
			sup: '⊃',
			nsub: '⊄',
			sube: '⊆',
			supe: '⊇',
			oplus: '⊕',
			otimes: '⊗',
			perp: '⊥',
			sdot: '⋅',
			lceil: '⌈',
			rceil: '⌉',
			lfloor: '⌊',
			rfloor: '⌋',
			lang: '〈',
			rang: '〉',
			loz: '◊',
			spades: '♠',
			clubs: '♣',
			hearts: '♥',
			diams: '♦',
			quot: '"',
			amp: '&',
			lt: '<',
			gt: '>',
			OElig: 'Œ',
			oelig: 'œ',
			Scaron: 'Š',
			scaron: 'š',
			Yuml: 'Ÿ',
			circ: 'ˆ',
			tilde: '˜',
			ensp: ' ',
			emsp: ' ',
			thinsp: ' ',
			zwnj: '‌',
			zwj: '‍',
			lrm: '‎',
			rlm: '‏',
			ndash: '–',
			mdash: '—',
			lsquo: '‘',
			rsquo: '’',
			sbquo: '‚',
			ldquo: '“',
			rdquo: '”',
			bdquo: '„',
			dagger: '†',
			Dagger: '‡',
			permil: '‰',
			lsaquo: '‹',
			rsaquo: '›',
			euro: '€',
		},
		BE = ['cent', 'copy', 'divide', 'gt', 'lt', 'not', 'para', 'times'],
		nd = {}.hasOwnProperty,
		zl = {};
	let Us;
	for (Us in Gl) nd.call(Gl, Us) && (zl[Gl[Us]] = Us);
	function UE(e, t, r, o) {
		const u = String.fromCharCode(e);
		if (nd.call(zl, u)) {
			const c = zl[u],
				f = '&' + c;
			return r &&
				HE.includes(c) &&
				!BE.includes(c) &&
				(!o || (t && t !== 61 && /[^\da-z]/i.test(String.fromCharCode(t))))
				? f
				: f + ';';
		}
		return '';
	}
	function GE(e, t, r) {
		let o = PE(e, t, r.omitOptionalSemicolons),
			u;
		if (
			((r.useNamedReferences || r.useShortestReferences) &&
				(u = UE(e, t, r.omitOptionalSemicolons, r.attribute)),
			(r.useShortestReferences || !u) && r.useShortestReferences)
		) {
			const c = FE(e, t, r.omitOptionalSemicolons);
			c.length < o.length && (o = c);
		}
		return u && (!r.useShortestReferences || u.length < o.length) ? u : o;
	}
	function s1(e, t) {
		return RE(
			e,
			Object.assign(
				{
					format: GE,
				},
				t
			)
		);
	}
	function rd(e, t) {
		const r = String(e);
		if (typeof t != 'string') throw new TypeError('Expected character');
		let o = 0,
			u = r.indexOf(t);
		for (; u !== -1; ) o++, (u = r.indexOf(t, u + t.length));
		return o;
	}
	const Gs = {
		name: [
			[
				`	
\f\r &/=>`.split(''),
				`	
\f\r "&'/=>\``.split(''),
			],
			[
				`\0	
\f\r "&'/<=>`.split(''),
				`\0	
\f\r "&'/<=>\``.split(''),
			],
		],
		unquoted: [
			[
				`	
\f\r &>`.split(''),
				`\0	
\f\r "&'<=>\``.split(''),
			],
			[
				`\0	
\f\r "&'<=>\``.split(''),
				`\0	
\f\r "&'<=>\``.split(''),
			],
		],
		single: [
			["&'".split(''), '"&\'`'.split('')],
			["\0&'".split(''), '\0"&\'`'.split('')],
		],
		double: [
			['"&'.split(''), '"&\'`'.split('')],
			['\0"&'.split(''), '\0"&\'`'.split('')],
		],
	};
	function zE(e, t) {
		return e.bogusComments
			? '<?' +
					s1(
						t.value,
						Object.assign({}, e.entities, {
							subset: ['>'],
						})
					) +
					'>'
			: '<!--' + t.value.replace(/^>|^->|<!--|-->|--!>|<!-$/g, r) + '-->';
		function r(o) {
			return s1(
				o,
				Object.assign({}, e.entities, {
					subset: ['<', '>'],
				})
			);
		}
	}
	function WE(e) {
		return (
			'<!' +
			(e.upperDoctype ? 'DOCTYPE' : 'doctype') +
			(e.tightDoctype ? '' : ' ') +
			'html>'
		);
	}
	function id(e, t, r, o) {
		return o &&
			o.type === 'element' &&
			(o.tagName === 'script' || o.tagName === 'style')
			? t.value
			: s1(
					t.value,
					Object.assign({}, e.entities, {
						subset: ['<', '&'],
					})
			  );
	}
	function KE(e, t, r, o) {
		return e.dangerous ? t.value : id(e, t, r, o);
	}
	const od = {
			comment: zE,
			doctype: WE,
			element: YE,
			raw: KE,
			root: ad,
			text: id,
		},
		jE = {}.hasOwnProperty;
	function sd(e, t, r, o) {
		if (!t || !t.type) throw new Error('Expected node, not `' + t + '`');
		if (!jE.call(od, t.type))
			throw new Error('Cannot compile unknown node `' + t.type + '`');
		return od[t.type](e, t, r, o);
	}
	function ad(e, t) {
		const r = [],
			o = (t && t.children) || [];
		let u = -1;
		for (; ++u < o.length; ) r[u] = sd(e, o[u], u, t);
		return r.join('');
	}
	function YE(e, t, r, o) {
		const u = e.schema,
			c = u.space === 'svg' ? void 0 : e.omit;
		let f =
			u.space === 'svg'
				? e.closeEmpty
				: e.voids.includes(t.tagName.toLowerCase());
		const d = [];
		let g;
		u.space === 'html' && t.tagName === 'svg' && (e.schema = yr);
		const T = qE(e, t.properties),
			A = ad(e, u.space === 'html' && t.tagName === 'template' ? t.content : t);
		return (
			(e.schema = u),
			A && (f = !1),
			(T || !c || !c.opening(t, r, o)) &&
				(d.push('<', t.tagName, T ? ' ' + T : ''),
				f &&
					(u.space === 'svg' || e.close) &&
					((g = T.charAt(T.length - 1)),
					(!e.tightClose || g === '/' || (g && g !== '"' && g !== "'")) &&
						d.push(' '),
					d.push('/')),
				d.push('>')),
			d.push(A),
			!f && (!c || !c.closing(t, r, o)) && d.push('</' + t.tagName + '>'),
			d.join('')
		);
	}
	function qE(e, t) {
		const r = [];
		let o = -1,
			u,
			c,
			f;
		for (u in t)
			t[u] !== void 0 &&
				t[u] !== null &&
				((c = XE(e, u, t[u])), c && r.push(c));
		for (; ++o < r.length; )
			(f = e.tight ? r[o].charAt(r[o].length - 1) : null),
				o !== r.length - 1 && f !== '"' && f !== "'" && (r[o] += ' ');
		return r.join('');
	}
	function XE(e, t, r) {
		const o = uo(e.schema, t);
		let u = e.quote,
			c;
		if (
			(o.overloadedBoolean && (r === o.attribute || r === '')
				? (r = !0)
				: (o.boolean || (o.overloadedBoolean && typeof r != 'string')) &&
				  (r = !!r),
			r == null || r === !1 || (typeof r == 'number' && Number.isNaN(r)))
		)
			return '';
		const f = s1(
			o.attribute,
			Object.assign({}, e.entities, {
				subset: Gs.name[e.schema.space === 'html' ? e.valid : 1][e.safe],
			})
		);
		return r === !0 ||
			((r =
				typeof r == 'object' && 'length' in r
					? (o.commaSeparated ? w0 : k0)(r, {
							padLeft: !e.tightLists,
					  })
					: String(r)),
			e.collapseEmpty && !r)
			? f
			: (e.unquoted &&
					(c = s1(
						r,
						Object.assign({}, e.entities, {
							subset: Gs.unquoted[e.valid][e.safe],
							attribute: !0,
						})
					)),
			  c !== r &&
					(e.smart && rd(r, u) > rd(r, e.alternative) && (u = e.alternative),
					(c =
						u +
						s1(
							r,
							Object.assign({}, e.entities, {
								subset: (u === "'" ? Gs.single : Gs.double)[
									e.schema.space === 'html' ? e.valid : 1
								][e.safe],
								attribute: !0,
							})
						) +
						u)),
			  f + (c && '=' + c));
	}
	function QE(e, t = {}) {
		const r = t.quote || '"',
			o = r === '"' ? "'" : '"';
		if (r !== '"' && r !== "'")
			throw new Error('Invalid quote `' + r + '`, expected `\'` or `"`');
		const u = {
			valid: t.allowParseErrors ? 0 : 1,
			safe: t.allowDangerousCharacters ? 0 : 1,
			schema: t.space === 'svg' ? yr : n1,
			omit: t.omitOptionalTags ? ME : void 0,
			quote: r,
			alternative: o,
			smart: t.quoteSmart,
			unquoted: t.preferUnquoted,
			tight: t.tightAttributes,
			upperDoctype: t.upperDoctype,
			tightDoctype: t.tightDoctype,
			bogusComments: t.bogusComments,
			tightLists: t.tightCommaSeparatedLists,
			tightClose: t.tightSelfClosing,
			collapseEmpty: t.collapseEmptyAttributes,
			dangerous: t.allowDangerousHtml,
			voids: t.voids || j0.concat(),
			entities: t.entities || {},
			close: t.closeSelfClosing,
			closeEmpty: t.closeEmptyElements,
		};
		return sd(
			u,
			Array.isArray(e)
				? {
						type: 'root',
						children: e,
				  }
				: e,
			null,
			null
		);
	}
	function VE(e) {
		const t = this.data('settings'),
			r = Object.assign({}, t, e);
		Object.assign(this, {
			Compiler: o,
		});
		function o(u) {
			return QE(u, r);
		}
	}
	function ZE(e, t) {
		var { includeImageAlt: r = !0 } = t || {};
		return ld(e, r);
	}
	function ld(e, t) {
		return (
			(e &&
				typeof e == 'object' &&
				(e.value ||
					(t ? e.alt : '') ||
					('children' in e && ud(e.children, t)) ||
					(Array.isArray(e) && ud(e, t)))) ||
			''
		);
	}
	function ud(e, t) {
		for (var r = [], o = -1; ++o < e.length; ) r[o] = ld(e[o], t);
		return r.join('');
	}
	function nr(e, t, r, o) {
		const u = e.length;
		let c = 0,
			f;
		if (
			(t < 0 ? (t = -t > u ? 0 : u + t) : (t = t > u ? u : t),
			(r = r > 0 ? r : 0),
			o.length < 1e4)
		)
			(f = Array.from(o)), f.unshift(t, r), [].splice.apply(e, f);
		else
			for (r && [].splice.apply(e, [t, r]); c < o.length; )
				(f = o.slice(c, c + 1e4)),
					f.unshift(t, 0),
					[].splice.apply(e, f),
					(c += 1e4),
					(t += 1e4);
	}
	function Mn(e, t) {
		return e.length > 0 ? (nr(e, e.length, 0, t), e) : t;
	}
	const cd = {}.hasOwnProperty;
	function JE(e) {
		const t = {};
		let r = -1;
		for (; ++r < e.length; ) $E(t, e[r]);
		return t;
	}
	function $E(e, t) {
		let r;
		for (r in t) {
			const u = (cd.call(e, r) ? e[r] : void 0) || (e[r] = {}),
				c = t[r];
			let f;
			for (f in c) {
				cd.call(u, f) || (u[f] = []);
				const d = c[f];
				ev(u[f], Array.isArray(d) ? d : d ? [d] : []);
			}
		}
	}
	function ev(e, t) {
		let r = -1;
		const o = [];
		for (; ++r < t.length; ) (t[r].add === 'after' ? e : o).push(t[r]);
		nr(e, 0, 0, o);
	}
	const tv =
			/[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,
		rr = Gr(/[A-Za-z]/),
		Wl = Gr(/\d/),
		nv = Gr(/[\dA-Fa-f]/),
		Cn = Gr(/[\dA-Za-z]/),
		rv = Gr(/[!-/:-@[-`{-~]/),
		fd = Gr(/[#-'*+\--9=?A-Z^-~]/);
	function Kl(e) {
		return e !== null && (e < 32 || e === 127);
	}
	function Rn(e) {
		return e !== null && (e < 0 || e === 32);
	}
	function Me(e) {
		return e !== null && e < -2;
	}
	function kt(e) {
		return e === -2 || e === -1 || e === 32;
	}
	const iv = Gr(/\s/),
		ov = Gr(tv);
	function Gr(e) {
		return t;
		function t(r) {
			return r !== null && e.test(String.fromCharCode(r));
		}
	}
	function at(e, t, r, o) {
		const u = o ? o - 1 : Number.POSITIVE_INFINITY;
		let c = 0;
		return f;
		function f(g) {
			return kt(g) ? (e.enter(r), d(g)) : t(g);
		}
		function d(g) {
			return kt(g) && c++ < u ? (e.consume(g), d) : (e.exit(r), t(g));
		}
	}
	const sv = {
		tokenize: av,
	};
	function av(e) {
		const t = e.attempt(this.parser.constructs.contentInitial, o, u);
		let r;
		return t;
		function o(d) {
			if (d === null) {
				e.consume(d);
				return;
			}
			return (
				e.enter('lineEnding'),
				e.consume(d),
				e.exit('lineEnding'),
				at(e, t, 'linePrefix')
			);
		}
		function u(d) {
			return e.enter('paragraph'), c(d);
		}
		function c(d) {
			const g = e.enter('chunkText', {
				contentType: 'text',
				previous: r,
			});
			return r && (r.next = g), (r = g), f(d);
		}
		function f(d) {
			if (d === null) {
				e.exit('chunkText'), e.exit('paragraph'), e.consume(d);
				return;
			}
			return Me(d) ? (e.consume(d), e.exit('chunkText'), c) : (e.consume(d), f);
		}
	}
	const lv = {
			tokenize: uv,
		},
		hd = {
			tokenize: cv,
		};
	function uv(e) {
		const t = this,
			r = [];
		let o = 0,
			u,
			c,
			f;
		return d;
		function d(K) {
			if (o < r.length) {
				const w = r[o];
				return (t.containerState = w[1]), e.attempt(w[0].continuation, g, T)(K);
			}
			return T(K);
		}
		function g(K) {
			if ((o++, t.containerState._closeFlow)) {
				(t.containerState._closeFlow = void 0), u && z();
				const w = t.events.length;
				let Z = w,
					L;
				for (; Z--; )
					if (
						t.events[Z][0] === 'exit' &&
						t.events[Z][1].type === 'chunkFlow'
					) {
						L = t.events[Z][1].end;
						break;
					}
				I(o);
				let W = w;
				for (; W < t.events.length; )
					(t.events[W][1].end = Object.assign({}, L)), W++;
				return (
					nr(t.events, Z + 1, 0, t.events.slice(w)), (t.events.length = W), T(K)
				);
			}
			return d(K);
		}
		function T(K) {
			if (o === r.length) {
				if (!u) return M(K);
				if (u.currentConstruct && u.currentConstruct.concrete) return S(K);
				t.interrupt = !!(
					u.currentConstruct && !u._gfmTableDynamicInterruptHack
				);
			}
			return (t.containerState = {}), e.check(hd, A, C)(K);
		}
		function A(K) {
			return u && z(), I(o), M(K);
		}
		function C(K) {
			return (
				(t.parser.lazy[t.now().line] = o !== r.length),
				(f = t.now().offset),
				S(K)
			);
		}
		function M(K) {
			return (t.containerState = {}), e.attempt(hd, x, S)(K);
		}
		function x(K) {
			return o++, r.push([t.currentConstruct, t.containerState]), M(K);
		}
		function S(K) {
			if (K === null) {
				u && z(), I(0), e.consume(K);
				return;
			}
			return (
				(u = u || t.parser.flow(t.now())),
				e.enter('chunkFlow', {
					contentType: 'flow',
					previous: c,
					_tokenizer: u,
				}),
				D(K)
			);
		}
		function D(K) {
			if (K === null) {
				P(e.exit('chunkFlow'), !0), I(0), e.consume(K);
				return;
			}
			return Me(K)
				? (e.consume(K),
				  P(e.exit('chunkFlow')),
				  (o = 0),
				  (t.interrupt = void 0),
				  d)
				: (e.consume(K), D);
		}
		function P(K, w) {
			const Z = t.sliceStream(K);
			if (
				(w && Z.push(null),
				(K.previous = c),
				c && (c.next = K),
				(c = K),
				u.defineSkip(K.start),
				u.write(Z),
				t.parser.lazy[K.start.line])
			) {
				let L = u.events.length;
				for (; L--; )
					if (
						u.events[L][1].start.offset < f &&
						(!u.events[L][1].end || u.events[L][1].end.offset > f)
					)
						return;
				const W = t.events.length;
				let te = W,
					V,
					ae;
				for (; te--; )
					if (
						t.events[te][0] === 'exit' &&
						t.events[te][1].type === 'chunkFlow'
					) {
						if (V) {
							ae = t.events[te][1].end;
							break;
						}
						V = !0;
					}
				for (I(o), L = W; L < t.events.length; )
					(t.events[L][1].end = Object.assign({}, ae)), L++;
				nr(t.events, te + 1, 0, t.events.slice(W)), (t.events.length = L);
			}
		}
		function I(K) {
			let w = r.length;
			for (; w-- > K; ) {
				const Z = r[w];
				(t.containerState = Z[1]), Z[0].exit.call(t, e);
			}
			r.length = K;
		}
		function z() {
			u.write([null]),
				(c = void 0),
				(u = void 0),
				(t.containerState._closeFlow = void 0);
		}
	}
	function cv(e, t, r) {
		return at(
			e,
			e.attempt(this.parser.constructs.document, t, r),
			'linePrefix',
			this.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
		);
	}
	function dd(e) {
		if (e === null || Rn(e) || iv(e)) return 1;
		if (ov(e)) return 2;
	}
	function jl(e, t, r) {
		const o = [];
		let u = -1;
		for (; ++u < e.length; ) {
			const c = e[u].resolveAll;
			c && !o.includes(c) && ((t = c(t, r)), o.push(c));
		}
		return t;
	}
	const Yl = {
		name: 'attention',
		tokenize: hv,
		resolveAll: fv,
	};
	function fv(e, t) {
		let r = -1,
			o,
			u,
			c,
			f,
			d,
			g,
			T,
			A;
		for (; ++r < e.length; )
			if (
				e[r][0] === 'enter' &&
				e[r][1].type === 'attentionSequence' &&
				e[r][1]._close
			) {
				for (o = r; o--; )
					if (
						e[o][0] === 'exit' &&
						e[o][1].type === 'attentionSequence' &&
						e[o][1]._open &&
						t.sliceSerialize(e[o][1]).charCodeAt(0) ===
							t.sliceSerialize(e[r][1]).charCodeAt(0)
					) {
						if (
							(e[o][1]._close || e[r][1]._open) &&
							(e[r][1].end.offset - e[r][1].start.offset) % 3 &&
							!(
								(e[o][1].end.offset -
									e[o][1].start.offset +
									e[r][1].end.offset -
									e[r][1].start.offset) %
								3
							)
						)
							continue;
						g =
							e[o][1].end.offset - e[o][1].start.offset > 1 &&
							e[r][1].end.offset - e[r][1].start.offset > 1
								? 2
								: 1;
						const C = Object.assign({}, e[o][1].end),
							M = Object.assign({}, e[r][1].start);
						pd(C, -g),
							pd(M, g),
							(f = {
								type: g > 1 ? 'strongSequence' : 'emphasisSequence',
								start: C,
								end: Object.assign({}, e[o][1].end),
							}),
							(d = {
								type: g > 1 ? 'strongSequence' : 'emphasisSequence',
								start: Object.assign({}, e[r][1].start),
								end: M,
							}),
							(c = {
								type: g > 1 ? 'strongText' : 'emphasisText',
								start: Object.assign({}, e[o][1].end),
								end: Object.assign({}, e[r][1].start),
							}),
							(u = {
								type: g > 1 ? 'strong' : 'emphasis',
								start: Object.assign({}, f.start),
								end: Object.assign({}, d.end),
							}),
							(e[o][1].end = Object.assign({}, f.start)),
							(e[r][1].start = Object.assign({}, d.end)),
							(T = []),
							e[o][1].end.offset - e[o][1].start.offset &&
								(T = Mn(T, [
									['enter', e[o][1], t],
									['exit', e[o][1], t],
								])),
							(T = Mn(T, [
								['enter', u, t],
								['enter', f, t],
								['exit', f, t],
								['enter', c, t],
							])),
							(T = Mn(
								T,
								jl(t.parser.constructs.insideSpan.null, e.slice(o + 1, r), t)
							)),
							(T = Mn(T, [
								['exit', c, t],
								['enter', d, t],
								['exit', d, t],
								['exit', u, t],
							])),
							e[r][1].end.offset - e[r][1].start.offset
								? ((A = 2),
								  (T = Mn(T, [
										['enter', e[r][1], t],
										['exit', e[r][1], t],
								  ])))
								: (A = 0),
							nr(e, o - 1, r - o + 3, T),
							(r = o + T.length - A - 2);
						break;
					}
			}
		for (r = -1; ++r < e.length; )
			e[r][1].type === 'attentionSequence' && (e[r][1].type = 'data');
		return e;
	}
	function hv(e, t) {
		const r = this.parser.constructs.attentionMarkers.null,
			o = this.previous,
			u = dd(o);
		let c;
		return f;
		function f(g) {
			return e.enter('attentionSequence'), (c = g), d(g);
		}
		function d(g) {
			if (g === c) return e.consume(g), d;
			const T = e.exit('attentionSequence'),
				A = dd(g),
				C = !A || (A === 2 && u) || r.includes(g),
				M = !u || (u === 2 && A) || r.includes(o);
			return (
				(T._open = !!(c === 42 ? C : C && (u || !M))),
				(T._close = !!(c === 42 ? M : M && (A || !C))),
				t(g)
			);
		}
	}
	function pd(e, t) {
		(e.column += t), (e.offset += t), (e._bufferIndex += t);
	}
	const dv = {
		name: 'autolink',
		tokenize: pv,
	};
	function pv(e, t, r) {
		let o = 1;
		return u;
		function u(S) {
			return (
				e.enter('autolink'),
				e.enter('autolinkMarker'),
				e.consume(S),
				e.exit('autolinkMarker'),
				e.enter('autolinkProtocol'),
				c
			);
		}
		function c(S) {
			return rr(S) ? (e.consume(S), f) : fd(S) ? T(S) : r(S);
		}
		function f(S) {
			return S === 43 || S === 45 || S === 46 || Cn(S) ? d(S) : T(S);
		}
		function d(S) {
			return S === 58
				? (e.consume(S), g)
				: (S === 43 || S === 45 || S === 46 || Cn(S)) && o++ < 32
				? (e.consume(S), d)
				: T(S);
		}
		function g(S) {
			return S === 62
				? (e.exit('autolinkProtocol'), x(S))
				: S === null || S === 32 || S === 60 || Kl(S)
				? r(S)
				: (e.consume(S), g);
		}
		function T(S) {
			return S === 64
				? (e.consume(S), (o = 0), A)
				: fd(S)
				? (e.consume(S), T)
				: r(S);
		}
		function A(S) {
			return Cn(S) ? C(S) : r(S);
		}
		function C(S) {
			return S === 46
				? (e.consume(S), (o = 0), A)
				: S === 62
				? ((e.exit('autolinkProtocol').type = 'autolinkEmail'), x(S))
				: M(S);
		}
		function M(S) {
			return (S === 45 || Cn(S)) && o++ < 63
				? (e.consume(S), S === 45 ? M : C)
				: r(S);
		}
		function x(S) {
			return (
				e.enter('autolinkMarker'),
				e.consume(S),
				e.exit('autolinkMarker'),
				e.exit('autolink'),
				t
			);
		}
	}
	const zs = {
		tokenize: gv,
		partial: !0,
	};
	function gv(e, t, r) {
		return at(e, o, 'linePrefix');
		function o(u) {
			return u === null || Me(u) ? t(u) : r(u);
		}
	}
	const gd = {
		name: 'blockQuote',
		tokenize: mv,
		continuation: {
			tokenize: Tv,
		},
		exit: Ev,
	};
	function mv(e, t, r) {
		const o = this;
		return u;
		function u(f) {
			if (f === 62) {
				const d = o.containerState;
				return (
					d.open ||
						(e.enter('blockQuote', {
							_container: !0,
						}),
						(d.open = !0)),
					e.enter('blockQuotePrefix'),
					e.enter('blockQuoteMarker'),
					e.consume(f),
					e.exit('blockQuoteMarker'),
					c
				);
			}
			return r(f);
		}
		function c(f) {
			return kt(f)
				? (e.enter('blockQuotePrefixWhitespace'),
				  e.consume(f),
				  e.exit('blockQuotePrefixWhitespace'),
				  e.exit('blockQuotePrefix'),
				  t)
				: (e.exit('blockQuotePrefix'), t(f));
		}
	}
	function Tv(e, t, r) {
		return at(
			e,
			e.attempt(gd, t, r),
			'linePrefix',
			this.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
		);
	}
	function Ev(e) {
		e.exit('blockQuote');
	}
	const md = {
		name: 'characterEscape',
		tokenize: vv,
	};
	function vv(e, t, r) {
		return o;
		function o(c) {
			return (
				e.enter('characterEscape'),
				e.enter('escapeMarker'),
				e.consume(c),
				e.exit('escapeMarker'),
				u
			);
		}
		function u(c) {
			return rv(c)
				? (e.enter('characterEscapeValue'),
				  e.consume(c),
				  e.exit('characterEscapeValue'),
				  e.exit('characterEscape'),
				  t)
				: r(c);
		}
	}
	const Td = document.createElement('i');
	function ql(e) {
		const t = '&' + e + ';';
		Td.innerHTML = t;
		const r = Td.textContent;
		return (r.charCodeAt(r.length - 1) === 59 && e !== 'semi') || r === t
			? !1
			: r;
	}
	const Ed = {
		name: 'characterReference',
		tokenize: yv,
	};
	function yv(e, t, r) {
		const o = this;
		let u = 0,
			c,
			f;
		return d;
		function d(C) {
			return (
				e.enter('characterReference'),
				e.enter('characterReferenceMarker'),
				e.consume(C),
				e.exit('characterReferenceMarker'),
				g
			);
		}
		function g(C) {
			return C === 35
				? (e.enter('characterReferenceMarkerNumeric'),
				  e.consume(C),
				  e.exit('characterReferenceMarkerNumeric'),
				  T)
				: (e.enter('characterReferenceValue'), (c = 31), (f = Cn), A(C));
		}
		function T(C) {
			return C === 88 || C === 120
				? (e.enter('characterReferenceMarkerHexadecimal'),
				  e.consume(C),
				  e.exit('characterReferenceMarkerHexadecimal'),
				  e.enter('characterReferenceValue'),
				  (c = 6),
				  (f = nv),
				  A)
				: (e.enter('characterReferenceValue'), (c = 7), (f = Wl), A(C));
		}
		function A(C) {
			let M;
			return C === 59 && u
				? ((M = e.exit('characterReferenceValue')),
				  f === Cn && !ql(o.sliceSerialize(M))
						? r(C)
						: (e.enter('characterReferenceMarker'),
						  e.consume(C),
						  e.exit('characterReferenceMarker'),
						  e.exit('characterReference'),
						  t))
				: f(C) && u++ < c
				? (e.consume(C), A)
				: r(C);
		}
	}
	const vd = {
		name: 'codeFenced',
		tokenize: Av,
		concrete: !0,
	};
	function Av(e, t, r) {
		const o = this,
			u = {
				tokenize: Z,
				partial: !0,
			},
			c = {
				tokenize: w,
				partial: !0,
			},
			f = this.events[this.events.length - 1],
			d =
				f && f[1].type === 'linePrefix'
					? f[2].sliceSerialize(f[1], !0).length
					: 0;
		let g = 0,
			T;
		return A;
		function A(L) {
			return (
				e.enter('codeFenced'),
				e.enter('codeFencedFence'),
				e.enter('codeFencedFenceSequence'),
				(T = L),
				C(L)
			);
		}
		function C(L) {
			return L === T
				? (e.consume(L), g++, C)
				: (e.exit('codeFencedFenceSequence'),
				  g < 3 ? r(L) : at(e, M, 'whitespace')(L));
		}
		function M(L) {
			return L === null || Me(L)
				? P(L)
				: (e.enter('codeFencedFenceInfo'),
				  e.enter('chunkString', {
						contentType: 'string',
				  }),
				  x(L));
		}
		function x(L) {
			return L === null || Rn(L)
				? (e.exit('chunkString'),
				  e.exit('codeFencedFenceInfo'),
				  at(e, S, 'whitespace')(L))
				: L === 96 && L === T
				? r(L)
				: (e.consume(L), x);
		}
		function S(L) {
			return L === null || Me(L)
				? P(L)
				: (e.enter('codeFencedFenceMeta'),
				  e.enter('chunkString', {
						contentType: 'string',
				  }),
				  D(L));
		}
		function D(L) {
			return L === null || Me(L)
				? (e.exit('chunkString'), e.exit('codeFencedFenceMeta'), P(L))
				: L === 96 && L === T
				? r(L)
				: (e.consume(L), D);
		}
		function P(L) {
			return e.exit('codeFencedFence'), o.interrupt ? t(L) : I(L);
		}
		function I(L) {
			return L === null
				? K(L)
				: Me(L)
				? e.attempt(
						c,
						e.attempt(u, K, d ? at(e, I, 'linePrefix', d + 1) : I),
						K
				  )(L)
				: (e.enter('codeFlowValue'), z(L));
		}
		function z(L) {
			return L === null || Me(L)
				? (e.exit('codeFlowValue'), I(L))
				: (e.consume(L), z);
		}
		function K(L) {
			return e.exit('codeFenced'), t(L);
		}
		function w(L, W, te) {
			const V = this;
			return ae;
			function ae(G) {
				return L.enter('lineEnding'), L.consume(G), L.exit('lineEnding'), X;
			}
			function X(G) {
				return V.parser.lazy[V.now().line] ? te(G) : W(G);
			}
		}
		function Z(L, W, te) {
			let V = 0;
			return at(
				L,
				ae,
				'linePrefix',
				this.parser.constructs.disable.null.includes('codeIndented')
					? void 0
					: 4
			);
			function ae(H) {
				return (
					L.enter('codeFencedFence'), L.enter('codeFencedFenceSequence'), X(H)
				);
			}
			function X(H) {
				return H === T
					? (L.consume(H), V++, X)
					: V < g
					? te(H)
					: (L.exit('codeFencedFenceSequence'), at(L, G, 'whitespace')(H));
			}
			function G(H) {
				return H === null || Me(H) ? (L.exit('codeFencedFence'), W(H)) : te(H);
			}
		}
	}
	const Xl = {
			name: 'codeIndented',
			tokenize: Cv,
		},
		_v = {
			tokenize: Sv,
			partial: !0,
		};
	function Cv(e, t, r) {
		const o = this;
		return u;
		function u(T) {
			return e.enter('codeIndented'), at(e, c, 'linePrefix', 4 + 1)(T);
		}
		function c(T) {
			const A = o.events[o.events.length - 1];
			return A &&
				A[1].type === 'linePrefix' &&
				A[2].sliceSerialize(A[1], !0).length >= 4
				? f(T)
				: r(T);
		}
		function f(T) {
			return T === null
				? g(T)
				: Me(T)
				? e.attempt(_v, f, g)(T)
				: (e.enter('codeFlowValue'), d(T));
		}
		function d(T) {
			return T === null || Me(T)
				? (e.exit('codeFlowValue'), f(T))
				: (e.consume(T), d);
		}
		function g(T) {
			return e.exit('codeIndented'), t(T);
		}
	}
	function Sv(e, t, r) {
		const o = this;
		return u;
		function u(f) {
			return o.parser.lazy[o.now().line]
				? r(f)
				: Me(f)
				? (e.enter('lineEnding'), e.consume(f), e.exit('lineEnding'), u)
				: at(e, c, 'linePrefix', 4 + 1)(f);
		}
		function c(f) {
			const d = o.events[o.events.length - 1];
			return d &&
				d[1].type === 'linePrefix' &&
				d[2].sliceSerialize(d[1], !0).length >= 4
				? t(f)
				: Me(f)
				? u(f)
				: r(f);
		}
	}
	const bv = {
		name: 'codeText',
		tokenize: kv,
		resolve: Nv,
		previous: xv,
	};
	function Nv(e) {
		let t = e.length - 4,
			r = 3,
			o,
			u;
		if (
			(e[r][1].type === 'lineEnding' || e[r][1].type === 'space') &&
			(e[t][1].type === 'lineEnding' || e[t][1].type === 'space')
		) {
			for (o = r; ++o < t; )
				if (e[o][1].type === 'codeTextData') {
					(e[r][1].type = 'codeTextPadding'),
						(e[t][1].type = 'codeTextPadding'),
						(r += 2),
						(t -= 2);
					break;
				}
		}
		for (o = r - 1, t++; ++o <= t; )
			u === void 0
				? o !== t && e[o][1].type !== 'lineEnding' && (u = o)
				: (o === t || e[o][1].type === 'lineEnding') &&
				  ((e[u][1].type = 'codeTextData'),
				  o !== u + 2 &&
						((e[u][1].end = e[o - 1][1].end),
						e.splice(u + 2, o - u - 2),
						(t -= o - u - 2),
						(o = u + 2)),
				  (u = void 0));
		return e;
	}
	function xv(e) {
		return (
			e !== 96 ||
			this.events[this.events.length - 1][1].type === 'characterEscape'
		);
	}
	function kv(e, t, r) {
		let o = 0,
			u,
			c;
		return f;
		function f(C) {
			return e.enter('codeText'), e.enter('codeTextSequence'), d(C);
		}
		function d(C) {
			return C === 96
				? (e.consume(C), o++, d)
				: (e.exit('codeTextSequence'), g(C));
		}
		function g(C) {
			return C === null
				? r(C)
				: C === 96
				? ((c = e.enter('codeTextSequence')), (u = 0), A(C))
				: C === 32
				? (e.enter('space'), e.consume(C), e.exit('space'), g)
				: Me(C)
				? (e.enter('lineEnding'), e.consume(C), e.exit('lineEnding'), g)
				: (e.enter('codeTextData'), T(C));
		}
		function T(C) {
			return C === null || C === 32 || C === 96 || Me(C)
				? (e.exit('codeTextData'), g(C))
				: (e.consume(C), T);
		}
		function A(C) {
			return C === 96
				? (e.consume(C), u++, A)
				: u === o
				? (e.exit('codeTextSequence'), e.exit('codeText'), t(C))
				: ((c.type = 'codeTextData'), T(C));
		}
	}
	function yd(e) {
		const t = {};
		let r = -1,
			o,
			u,
			c,
			f,
			d,
			g,
			T;
		for (; ++r < e.length; ) {
			for (; r in t; ) r = t[r];
			if (
				((o = e[r]),
				r &&
					o[1].type === 'chunkFlow' &&
					e[r - 1][1].type === 'listItemPrefix' &&
					((g = o[1]._tokenizer.events),
					(c = 0),
					c < g.length && g[c][1].type === 'lineEndingBlank' && (c += 2),
					c < g.length && g[c][1].type === 'content'))
			)
				for (; ++c < g.length && g[c][1].type !== 'content'; )
					g[c][1].type === 'chunkText' &&
						((g[c][1]._isInFirstContentOfListItem = !0), c++);
			if (o[0] === 'enter')
				o[1].contentType && (Object.assign(t, Ov(e, r)), (r = t[r]), (T = !0));
			else if (o[1]._container) {
				for (
					c = r, u = void 0;
					c-- &&
					((f = e[c]),
					f[1].type === 'lineEnding' || f[1].type === 'lineEndingBlank');

				)
					f[0] === 'enter' &&
						(u && (e[u][1].type = 'lineEndingBlank'),
						(f[1].type = 'lineEnding'),
						(u = c));
				u &&
					((o[1].end = Object.assign({}, e[u][1].start)),
					(d = e.slice(u, r)),
					d.unshift(o),
					nr(e, u, r - u + 1, d));
			}
		}
		return !T;
	}
	function Ov(e, t) {
		const r = e[t][1],
			o = e[t][2];
		let u = t - 1;
		const c = [],
			f = r._tokenizer || o.parser[r.contentType](r.start),
			d = f.events,
			g = [],
			T = {};
		let A,
			C,
			M = -1,
			x = r,
			S = 0,
			D = 0;
		const P = [D];
		for (; x; ) {
			for (; e[++u][1] !== x; );
			c.push(u),
				x._tokenizer ||
					((A = o.sliceStream(x)),
					x.next || A.push(null),
					C && f.defineSkip(x.start),
					x._isInFirstContentOfListItem &&
						(f._gfmTasklistFirstContentOfListItem = !0),
					f.write(A),
					x._isInFirstContentOfListItem &&
						(f._gfmTasklistFirstContentOfListItem = void 0)),
				(C = x),
				(x = x.next);
		}
		for (x = r; ++M < d.length; )
			d[M][0] === 'exit' &&
				d[M - 1][0] === 'enter' &&
				d[M][1].type === d[M - 1][1].type &&
				d[M][1].start.line !== d[M][1].end.line &&
				((D = M + 1),
				P.push(D),
				(x._tokenizer = void 0),
				(x.previous = void 0),
				(x = x.next));
		for (
			f.events = [],
				x ? ((x._tokenizer = void 0), (x.previous = void 0)) : P.pop(),
				M = P.length;
			M--;

		) {
			const I = d.slice(P[M], P[M + 1]),
				z = c.pop();
			g.unshift([z, z + I.length - 1]), nr(e, z, 2, I);
		}
		for (M = -1; ++M < g.length; )
			(T[S + g[M][0]] = S + g[M][1]), (S += g[M][1] - g[M][0] - 1);
		return T;
	}
	const wv = {
			tokenize: Mv,
			resolve: Iv,
		},
		Lv = {
			tokenize: Rv,
			partial: !0,
		};
	function Iv(e) {
		return yd(e), e;
	}
	function Mv(e, t) {
		let r;
		return o;
		function o(d) {
			return (
				e.enter('content'),
				(r = e.enter('chunkContent', {
					contentType: 'content',
				})),
				u(d)
			);
		}
		function u(d) {
			return d === null
				? c(d)
				: Me(d)
				? e.check(Lv, f, c)(d)
				: (e.consume(d), u);
		}
		function c(d) {
			return e.exit('chunkContent'), e.exit('content'), t(d);
		}
		function f(d) {
			return (
				e.consume(d),
				e.exit('chunkContent'),
				(r.next = e.enter('chunkContent', {
					contentType: 'content',
					previous: r,
				})),
				(r = r.next),
				u
			);
		}
	}
	function Rv(e, t, r) {
		const o = this;
		return u;
		function u(f) {
			return (
				e.exit('chunkContent'),
				e.enter('lineEnding'),
				e.consume(f),
				e.exit('lineEnding'),
				at(e, c, 'linePrefix')
			);
		}
		function c(f) {
			if (f === null || Me(f)) return r(f);
			const d = o.events[o.events.length - 1];
			return !o.parser.constructs.disable.null.includes('codeIndented') &&
				d &&
				d[1].type === 'linePrefix' &&
				d[2].sliceSerialize(d[1], !0).length >= 4
				? t(f)
				: e.interrupt(o.parser.constructs.flow, r, t)(f);
		}
	}
	function Ad(e, t, r, o, u, c, f, d, g) {
		const T = g || Number.POSITIVE_INFINITY;
		let A = 0;
		return C;
		function C(I) {
			return I === 60
				? (e.enter(o), e.enter(u), e.enter(c), e.consume(I), e.exit(c), M)
				: I === null || I === 41 || Kl(I)
				? r(I)
				: (e.enter(o),
				  e.enter(f),
				  e.enter(d),
				  e.enter('chunkString', {
						contentType: 'string',
				  }),
				  D(I));
		}
		function M(I) {
			return I === 62
				? (e.enter(c), e.consume(I), e.exit(c), e.exit(u), e.exit(o), t)
				: (e.enter(d),
				  e.enter('chunkString', {
						contentType: 'string',
				  }),
				  x(I));
		}
		function x(I) {
			return I === 62
				? (e.exit('chunkString'), e.exit(d), M(I))
				: I === null || I === 60 || Me(I)
				? r(I)
				: (e.consume(I), I === 92 ? S : x);
		}
		function S(I) {
			return I === 60 || I === 62 || I === 92 ? (e.consume(I), x) : x(I);
		}
		function D(I) {
			return I === 40
				? ++A > T
					? r(I)
					: (e.consume(I), D)
				: I === 41
				? A--
					? (e.consume(I), D)
					: (e.exit('chunkString'), e.exit(d), e.exit(f), e.exit(o), t(I))
				: I === null || Rn(I)
				? A
					? r(I)
					: (e.exit('chunkString'), e.exit(d), e.exit(f), e.exit(o), t(I))
				: Kl(I)
				? r(I)
				: (e.consume(I), I === 92 ? P : D);
		}
		function P(I) {
			return I === 40 || I === 41 || I === 92 ? (e.consume(I), D) : D(I);
		}
	}
	function _d(e, t, r, o, u, c) {
		const f = this;
		let d = 0,
			g;
		return T;
		function T(x) {
			return e.enter(o), e.enter(u), e.consume(x), e.exit(u), e.enter(c), A;
		}
		function A(x) {
			return x === null ||
				x === 91 ||
				(x === 93 && !g) ||
				(x === 94 && !d && '_hiddenFootnoteSupport' in f.parser.constructs) ||
				d > 999
				? r(x)
				: x === 93
				? (e.exit(c), e.enter(u), e.consume(x), e.exit(u), e.exit(o), t)
				: Me(x)
				? (e.enter('lineEnding'), e.consume(x), e.exit('lineEnding'), A)
				: (e.enter('chunkString', {
						contentType: 'string',
				  }),
				  C(x));
		}
		function C(x) {
			return x === null || x === 91 || x === 93 || Me(x) || d++ > 999
				? (e.exit('chunkString'), A(x))
				: (e.consume(x), (g = g || !kt(x)), x === 92 ? M : C);
		}
		function M(x) {
			return x === 91 || x === 92 || x === 93 ? (e.consume(x), d++, C) : C(x);
		}
	}
	function Cd(e, t, r, o, u, c) {
		let f;
		return d;
		function d(M) {
			return (
				e.enter(o),
				e.enter(u),
				e.consume(M),
				e.exit(u),
				(f = M === 40 ? 41 : M),
				g
			);
		}
		function g(M) {
			return M === f
				? (e.enter(u), e.consume(M), e.exit(u), e.exit(o), t)
				: (e.enter(c), T(M));
		}
		function T(M) {
			return M === f
				? (e.exit(c), g(f))
				: M === null
				? r(M)
				: Me(M)
				? (e.enter('lineEnding'),
				  e.consume(M),
				  e.exit('lineEnding'),
				  at(e, T, 'linePrefix'))
				: (e.enter('chunkString', {
						contentType: 'string',
				  }),
				  A(M));
		}
		function A(M) {
			return M === f || M === null || Me(M)
				? (e.exit('chunkString'), T(M))
				: (e.consume(M), M === 92 ? C : A);
		}
		function C(M) {
			return M === f || M === 92 ? (e.consume(M), A) : A(M);
		}
	}
	function fo(e, t) {
		let r;
		return o;
		function o(u) {
			return Me(u)
				? (e.enter('lineEnding'),
				  e.consume(u),
				  e.exit('lineEnding'),
				  (r = !0),
				  o)
				: kt(u)
				? at(e, o, r ? 'linePrefix' : 'lineSuffix')(u)
				: t(u);
		}
	}
	function a1(e) {
		return e
			.replace(/[\t\n\r ]+/g, ' ')
			.replace(/^ | $/g, '')
			.toLowerCase()
			.toUpperCase();
	}
	const Dv = {
			name: 'definition',
			tokenize: Fv,
		},
		Pv = {
			tokenize: Hv,
			partial: !0,
		};
	function Fv(e, t, r) {
		const o = this;
		let u;
		return c;
		function c(g) {
			return (
				e.enter('definition'),
				_d.call(
					o,
					e,
					f,
					r,
					'definitionLabel',
					'definitionLabelMarker',
					'definitionLabelString'
				)(g)
			);
		}
		function f(g) {
			return (
				(u = a1(
					o.sliceSerialize(o.events[o.events.length - 1][1]).slice(1, -1)
				)),
				g === 58
					? (e.enter('definitionMarker'),
					  e.consume(g),
					  e.exit('definitionMarker'),
					  fo(
							e,
							Ad(
								e,
								e.attempt(Pv, at(e, d, 'whitespace'), at(e, d, 'whitespace')),
								r,
								'definitionDestination',
								'definitionDestinationLiteral',
								'definitionDestinationLiteralMarker',
								'definitionDestinationRaw',
								'definitionDestinationString'
							)
					  ))
					: r(g)
			);
		}
		function d(g) {
			return g === null || Me(g)
				? (e.exit('definition'),
				  o.parser.defined.includes(u) || o.parser.defined.push(u),
				  t(g))
				: r(g);
		}
	}
	function Hv(e, t, r) {
		return o;
		function o(f) {
			return Rn(f) ? fo(e, u)(f) : r(f);
		}
		function u(f) {
			return f === 34 || f === 39 || f === 40
				? Cd(
						e,
						at(e, c, 'whitespace'),
						r,
						'definitionTitle',
						'definitionTitleMarker',
						'definitionTitleString'
				  )(f)
				: r(f);
		}
		function c(f) {
			return f === null || Me(f) ? t(f) : r(f);
		}
	}
	const Bv = {
		name: 'hardBreakEscape',
		tokenize: Uv,
	};
	function Uv(e, t, r) {
		return o;
		function o(c) {
			return (
				e.enter('hardBreakEscape'), e.enter('escapeMarker'), e.consume(c), u
			);
		}
		function u(c) {
			return Me(c)
				? (e.exit('escapeMarker'), e.exit('hardBreakEscape'), t(c))
				: r(c);
		}
	}
	const Gv = {
		name: 'headingAtx',
		tokenize: Wv,
		resolve: zv,
	};
	function zv(e, t) {
		let r = e.length - 2,
			o = 3,
			u,
			c;
		return (
			e[o][1].type === 'whitespace' && (o += 2),
			r - 2 > o && e[r][1].type === 'whitespace' && (r -= 2),
			e[r][1].type === 'atxHeadingSequence' &&
				(o === r - 1 || (r - 4 > o && e[r - 2][1].type === 'whitespace')) &&
				(r -= o + 1 === r ? 2 : 4),
			r > o &&
				((u = {
					type: 'atxHeadingText',
					start: e[o][1].start,
					end: e[r][1].end,
				}),
				(c = {
					type: 'chunkText',
					start: e[o][1].start,
					end: e[r][1].end,
					contentType: 'text',
				}),
				nr(e, o, r - o + 1, [
					['enter', u, t],
					['enter', c, t],
					['exit', c, t],
					['exit', u, t],
				])),
			e
		);
	}
	function Wv(e, t, r) {
		const o = this;
		let u = 0;
		return c;
		function c(A) {
			return e.enter('atxHeading'), e.enter('atxHeadingSequence'), f(A);
		}
		function f(A) {
			return A === 35 && u++ < 6
				? (e.consume(A), f)
				: A === null || Rn(A)
				? (e.exit('atxHeadingSequence'), o.interrupt ? t(A) : d(A))
				: r(A);
		}
		function d(A) {
			return A === 35
				? (e.enter('atxHeadingSequence'), g(A))
				: A === null || Me(A)
				? (e.exit('atxHeading'), t(A))
				: kt(A)
				? at(e, d, 'whitespace')(A)
				: (e.enter('atxHeadingText'), T(A));
		}
		function g(A) {
			return A === 35
				? (e.consume(A), g)
				: (e.exit('atxHeadingSequence'), d(A));
		}
		function T(A) {
			return A === null || A === 35 || Rn(A)
				? (e.exit('atxHeadingText'), d(A))
				: (e.consume(A), T);
		}
	}
	const Kv = [
			'address',
			'article',
			'aside',
			'base',
			'basefont',
			'blockquote',
			'body',
			'caption',
			'center',
			'col',
			'colgroup',
			'dd',
			'details',
			'dialog',
			'dir',
			'div',
			'dl',
			'dt',
			'fieldset',
			'figcaption',
			'figure',
			'footer',
			'form',
			'frame',
			'frameset',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'head',
			'header',
			'hr',
			'html',
			'iframe',
			'legend',
			'li',
			'link',
			'main',
			'menu',
			'menuitem',
			'nav',
			'noframes',
			'ol',
			'optgroup',
			'option',
			'p',
			'param',
			'section',
			'summary',
			'table',
			'tbody',
			'td',
			'tfoot',
			'th',
			'thead',
			'title',
			'tr',
			'track',
			'ul',
		],
		Sd = ['pre', 'script', 'style', 'textarea'],
		jv = {
			name: 'htmlFlow',
			tokenize: Xv,
			resolveTo: qv,
			concrete: !0,
		},
		Yv = {
			tokenize: Qv,
			partial: !0,
		};
	function qv(e) {
		let t = e.length;
		for (; t-- && !(e[t][0] === 'enter' && e[t][1].type === 'htmlFlow'); );
		return (
			t > 1 &&
				e[t - 2][1].type === 'linePrefix' &&
				((e[t][1].start = e[t - 2][1].start),
				(e[t + 1][1].start = e[t - 2][1].start),
				e.splice(t - 2, 2)),
			e
		);
	}
	function Xv(e, t, r) {
		const o = this;
		let u, c, f, d, g;
		return T;
		function T(b) {
			return e.enter('htmlFlow'), e.enter('htmlFlowData'), e.consume(b), A;
		}
		function A(b) {
			return b === 33
				? (e.consume(b), C)
				: b === 47
				? (e.consume(b), S)
				: b === 63
				? (e.consume(b), (u = 3), o.interrupt ? t : Oe)
				: rr(b)
				? (e.consume(b), (f = String.fromCharCode(b)), (c = !0), D)
				: r(b);
		}
		function C(b) {
			return b === 45
				? (e.consume(b), (u = 2), M)
				: b === 91
				? (e.consume(b), (u = 5), (f = 'CDATA['), (d = 0), x)
				: rr(b)
				? (e.consume(b), (u = 4), o.interrupt ? t : Oe)
				: r(b);
		}
		function M(b) {
			return b === 45 ? (e.consume(b), o.interrupt ? t : Oe) : r(b);
		}
		function x(b) {
			return b === f.charCodeAt(d++)
				? (e.consume(b), d === f.length ? (o.interrupt ? t : X) : x)
				: r(b);
		}
		function S(b) {
			return rr(b) ? (e.consume(b), (f = String.fromCharCode(b)), D) : r(b);
		}
		function D(b) {
			return b === null || b === 47 || b === 62 || Rn(b)
				? b !== 47 && c && Sd.includes(f.toLowerCase())
					? ((u = 1), o.interrupt ? t(b) : X(b))
					: Kv.includes(f.toLowerCase())
					? ((u = 6), b === 47 ? (e.consume(b), P) : o.interrupt ? t(b) : X(b))
					: ((u = 7),
					  o.interrupt && !o.parser.lazy[o.now().line]
							? r(b)
							: c
							? z(b)
							: I(b))
				: b === 45 || Cn(b)
				? (e.consume(b), (f += String.fromCharCode(b)), D)
				: r(b);
		}
		function P(b) {
			return b === 62 ? (e.consume(b), o.interrupt ? t : X) : r(b);
		}
		function I(b) {
			return kt(b) ? (e.consume(b), I) : V(b);
		}
		function z(b) {
			return b === 47
				? (e.consume(b), V)
				: b === 58 || b === 95 || rr(b)
				? (e.consume(b), K)
				: kt(b)
				? (e.consume(b), z)
				: V(b);
		}
		function K(b) {
			return b === 45 || b === 46 || b === 58 || b === 95 || Cn(b)
				? (e.consume(b), K)
				: w(b);
		}
		function w(b) {
			return b === 61 ? (e.consume(b), Z) : kt(b) ? (e.consume(b), w) : z(b);
		}
		function Z(b) {
			return b === null || b === 60 || b === 61 || b === 62 || b === 96
				? r(b)
				: b === 34 || b === 39
				? (e.consume(b), (g = b), L)
				: kt(b)
				? (e.consume(b), Z)
				: ((g = null), W(b));
		}
		function L(b) {
			return b === null || Me(b)
				? r(b)
				: b === g
				? (e.consume(b), te)
				: (e.consume(b), L);
		}
		function W(b) {
			return b === null ||
				b === 34 ||
				b === 39 ||
				b === 60 ||
				b === 61 ||
				b === 62 ||
				b === 96 ||
				Rn(b)
				? w(b)
				: (e.consume(b), W);
		}
		function te(b) {
			return b === 47 || b === 62 || kt(b) ? z(b) : r(b);
		}
		function V(b) {
			return b === 62 ? (e.consume(b), ae) : r(b);
		}
		function ae(b) {
			return kt(b) ? (e.consume(b), ae) : b === null || Me(b) ? X(b) : r(b);
		}
		function X(b) {
			return b === 45 && u === 2
				? (e.consume(b), Q)
				: b === 60 && u === 1
				? (e.consume(b), se)
				: b === 62 && u === 4
				? (e.consume(b), O)
				: b === 63 && u === 3
				? (e.consume(b), Oe)
				: b === 93 && u === 5
				? (e.consume(b), _e)
				: Me(b) && (u === 6 || u === 7)
				? e.check(Yv, O, G)(b)
				: b === null || Me(b)
				? G(b)
				: (e.consume(b), X);
		}
		function G(b) {
			return e.exit('htmlFlowData'), H(b);
		}
		function H(b) {
			return b === null
				? E(b)
				: Me(b)
				? e.attempt(
						{
							tokenize: J,
							partial: !0,
						},
						H,
						E
				  )(b)
				: (e.enter('htmlFlowData'), X(b));
		}
		function J(b, Ce, fe) {
			return Ue;
			function Ue(Ge) {
				return b.enter('lineEnding'), b.consume(Ge), b.exit('lineEnding'), Pe;
			}
			function Pe(Ge) {
				return o.parser.lazy[o.now().line] ? fe(Ge) : Ce(Ge);
			}
		}
		function Q(b) {
			return b === 45 ? (e.consume(b), Oe) : X(b);
		}
		function se(b) {
			return b === 47 ? (e.consume(b), (f = ''), Ae) : X(b);
		}
		function Ae(b) {
			return b === 62 && Sd.includes(f.toLowerCase())
				? (e.consume(b), O)
				: rr(b) && f.length < 8
				? (e.consume(b), (f += String.fromCharCode(b)), Ae)
				: X(b);
		}
		function _e(b) {
			return b === 93 ? (e.consume(b), Oe) : X(b);
		}
		function Oe(b) {
			return b === 62
				? (e.consume(b), O)
				: b === 45 && u === 2
				? (e.consume(b), Oe)
				: X(b);
		}
		function O(b) {
			return b === null || Me(b)
				? (e.exit('htmlFlowData'), E(b))
				: (e.consume(b), O);
		}
		function E(b) {
			return e.exit('htmlFlow'), t(b);
		}
	}
	function Qv(e, t, r) {
		return o;
		function o(u) {
			return (
				e.exit('htmlFlowData'),
				e.enter('lineEndingBlank'),
				e.consume(u),
				e.exit('lineEndingBlank'),
				e.attempt(zs, t, r)
			);
		}
	}
	const Vv = {
		name: 'htmlText',
		tokenize: Zv,
	};
	function Zv(e, t, r) {
		const o = this;
		let u, c, f, d;
		return g;
		function g(E) {
			return e.enter('htmlText'), e.enter('htmlTextData'), e.consume(E), T;
		}
		function T(E) {
			return E === 33
				? (e.consume(E), A)
				: E === 47
				? (e.consume(E), W)
				: E === 63
				? (e.consume(E), Z)
				: rr(E)
				? (e.consume(E), ae)
				: r(E);
		}
		function A(E) {
			return E === 45
				? (e.consume(E), C)
				: E === 91
				? (e.consume(E), (c = 'CDATA['), (f = 0), P)
				: rr(E)
				? (e.consume(E), w)
				: r(E);
		}
		function C(E) {
			return E === 45 ? (e.consume(E), M) : r(E);
		}
		function M(E) {
			return E === null || E === 62
				? r(E)
				: E === 45
				? (e.consume(E), x)
				: S(E);
		}
		function x(E) {
			return E === null || E === 62 ? r(E) : S(E);
		}
		function S(E) {
			return E === null
				? r(E)
				: E === 45
				? (e.consume(E), D)
				: Me(E)
				? ((d = S), _e(E))
				: (e.consume(E), S);
		}
		function D(E) {
			return E === 45 ? (e.consume(E), O) : S(E);
		}
		function P(E) {
			return E === c.charCodeAt(f++)
				? (e.consume(E), f === c.length ? I : P)
				: r(E);
		}
		function I(E) {
			return E === null
				? r(E)
				: E === 93
				? (e.consume(E), z)
				: Me(E)
				? ((d = I), _e(E))
				: (e.consume(E), I);
		}
		function z(E) {
			return E === 93 ? (e.consume(E), K) : I(E);
		}
		function K(E) {
			return E === 62 ? O(E) : E === 93 ? (e.consume(E), K) : I(E);
		}
		function w(E) {
			return E === null || E === 62
				? O(E)
				: Me(E)
				? ((d = w), _e(E))
				: (e.consume(E), w);
		}
		function Z(E) {
			return E === null
				? r(E)
				: E === 63
				? (e.consume(E), L)
				: Me(E)
				? ((d = Z), _e(E))
				: (e.consume(E), Z);
		}
		function L(E) {
			return E === 62 ? O(E) : Z(E);
		}
		function W(E) {
			return rr(E) ? (e.consume(E), te) : r(E);
		}
		function te(E) {
			return E === 45 || Cn(E) ? (e.consume(E), te) : V(E);
		}
		function V(E) {
			return Me(E) ? ((d = V), _e(E)) : kt(E) ? (e.consume(E), V) : O(E);
		}
		function ae(E) {
			return E === 45 || Cn(E)
				? (e.consume(E), ae)
				: E === 47 || E === 62 || Rn(E)
				? X(E)
				: r(E);
		}
		function X(E) {
			return E === 47
				? (e.consume(E), O)
				: E === 58 || E === 95 || rr(E)
				? (e.consume(E), G)
				: Me(E)
				? ((d = X), _e(E))
				: kt(E)
				? (e.consume(E), X)
				: O(E);
		}
		function G(E) {
			return E === 45 || E === 46 || E === 58 || E === 95 || Cn(E)
				? (e.consume(E), G)
				: H(E);
		}
		function H(E) {
			return E === 61
				? (e.consume(E), J)
				: Me(E)
				? ((d = H), _e(E))
				: kt(E)
				? (e.consume(E), H)
				: X(E);
		}
		function J(E) {
			return E === null || E === 60 || E === 61 || E === 62 || E === 96
				? r(E)
				: E === 34 || E === 39
				? (e.consume(E), (u = E), Q)
				: Me(E)
				? ((d = J), _e(E))
				: kt(E)
				? (e.consume(E), J)
				: (e.consume(E), (u = void 0), Ae);
		}
		function Q(E) {
			return E === u
				? (e.consume(E), se)
				: E === null
				? r(E)
				: Me(E)
				? ((d = Q), _e(E))
				: (e.consume(E), Q);
		}
		function se(E) {
			return E === 62 || E === 47 || Rn(E) ? X(E) : r(E);
		}
		function Ae(E) {
			return E === null ||
				E === 34 ||
				E === 39 ||
				E === 60 ||
				E === 61 ||
				E === 96
				? r(E)
				: E === 62 || Rn(E)
				? X(E)
				: (e.consume(E), Ae);
		}
		function _e(E) {
			return (
				e.exit('htmlTextData'),
				e.enter('lineEnding'),
				e.consume(E),
				e.exit('lineEnding'),
				at(
					e,
					Oe,
					'linePrefix',
					o.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
				)
			);
		}
		function Oe(E) {
			return e.enter('htmlTextData'), d(E);
		}
		function O(E) {
			return E === 62
				? (e.consume(E), e.exit('htmlTextData'), e.exit('htmlText'), t)
				: r(E);
		}
	}
	const Ql = {
			name: 'labelEnd',
			tokenize: r6,
			resolveTo: n6,
			resolveAll: t6,
		},
		Jv = {
			tokenize: i6,
		},
		$v = {
			tokenize: o6,
		},
		e6 = {
			tokenize: s6,
		};
	function t6(e) {
		let t = -1,
			r;
		for (; ++t < e.length; )
			(r = e[t][1]),
				(r.type === 'labelImage' ||
					r.type === 'labelLink' ||
					r.type === 'labelEnd') &&
					(e.splice(t + 1, r.type === 'labelImage' ? 4 : 2),
					(r.type = 'data'),
					t++);
		return e;
	}
	function n6(e, t) {
		let r = e.length,
			o = 0,
			u,
			c,
			f,
			d;
		for (; r--; )
			if (((u = e[r][1]), c)) {
				if (u.type === 'link' || (u.type === 'labelLink' && u._inactive)) break;
				e[r][0] === 'enter' && u.type === 'labelLink' && (u._inactive = !0);
			} else if (f) {
				if (
					e[r][0] === 'enter' &&
					(u.type === 'labelImage' || u.type === 'labelLink') &&
					!u._balanced &&
					((c = r), u.type !== 'labelLink')
				) {
					o = 2;
					break;
				}
			} else u.type === 'labelEnd' && (f = r);
		const g = {
				type: e[c][1].type === 'labelLink' ? 'link' : 'image',
				start: Object.assign({}, e[c][1].start),
				end: Object.assign({}, e[e.length - 1][1].end),
			},
			T = {
				type: 'label',
				start: Object.assign({}, e[c][1].start),
				end: Object.assign({}, e[f][1].end),
			},
			A = {
				type: 'labelText',
				start: Object.assign({}, e[c + o + 2][1].end),
				end: Object.assign({}, e[f - 2][1].start),
			};
		return (
			(d = [
				['enter', g, t],
				['enter', T, t],
			]),
			(d = Mn(d, e.slice(c + 1, c + o + 3))),
			(d = Mn(d, [['enter', A, t]])),
			(d = Mn(
				d,
				jl(t.parser.constructs.insideSpan.null, e.slice(c + o + 4, f - 3), t)
			)),
			(d = Mn(d, [['exit', A, t], e[f - 2], e[f - 1], ['exit', T, t]])),
			(d = Mn(d, e.slice(f + 1))),
			(d = Mn(d, [['exit', g, t]])),
			nr(e, c, e.length, d),
			e
		);
	}
	function r6(e, t, r) {
		const o = this;
		let u = o.events.length,
			c,
			f;
		for (; u--; )
			if (
				(o.events[u][1].type === 'labelImage' ||
					o.events[u][1].type === 'labelLink') &&
				!o.events[u][1]._balanced
			) {
				c = o.events[u][1];
				break;
			}
		return d;
		function d(A) {
			return c
				? c._inactive
					? T(A)
					: ((f = o.parser.defined.includes(
							a1(
								o.sliceSerialize({
									start: c.end,
									end: o.now(),
								})
							)
					  )),
					  e.enter('labelEnd'),
					  e.enter('labelMarker'),
					  e.consume(A),
					  e.exit('labelMarker'),
					  e.exit('labelEnd'),
					  g)
				: r(A);
		}
		function g(A) {
			return A === 40
				? e.attempt(Jv, t, f ? t : T)(A)
				: A === 91
				? e.attempt($v, t, f ? e.attempt(e6, t, T) : T)(A)
				: f
				? t(A)
				: T(A);
		}
		function T(A) {
			return (c._balanced = !0), r(A);
		}
	}
	function i6(e, t, r) {
		return o;
		function o(g) {
			return (
				e.enter('resource'),
				e.enter('resourceMarker'),
				e.consume(g),
				e.exit('resourceMarker'),
				fo(e, u)
			);
		}
		function u(g) {
			return g === 41
				? d(g)
				: Ad(
						e,
						c,
						r,
						'resourceDestination',
						'resourceDestinationLiteral',
						'resourceDestinationLiteralMarker',
						'resourceDestinationRaw',
						'resourceDestinationString',
						32
				  )(g);
		}
		function c(g) {
			return Rn(g) ? fo(e, f)(g) : d(g);
		}
		function f(g) {
			return g === 34 || g === 39 || g === 40
				? Cd(
						e,
						fo(e, d),
						r,
						'resourceTitle',
						'resourceTitleMarker',
						'resourceTitleString'
				  )(g)
				: d(g);
		}
		function d(g) {
			return g === 41
				? (e.enter('resourceMarker'),
				  e.consume(g),
				  e.exit('resourceMarker'),
				  e.exit('resource'),
				  t)
				: r(g);
		}
	}
	function o6(e, t, r) {
		const o = this;
		return u;
		function u(f) {
			return _d.call(
				o,
				e,
				c,
				r,
				'reference',
				'referenceMarker',
				'referenceString'
			)(f);
		}
		function c(f) {
			return o.parser.defined.includes(
				a1(o.sliceSerialize(o.events[o.events.length - 1][1]).slice(1, -1))
			)
				? t(f)
				: r(f);
		}
	}
	function s6(e, t, r) {
		return o;
		function o(c) {
			return (
				e.enter('reference'),
				e.enter('referenceMarker'),
				e.consume(c),
				e.exit('referenceMarker'),
				u
			);
		}
		function u(c) {
			return c === 93
				? (e.enter('referenceMarker'),
				  e.consume(c),
				  e.exit('referenceMarker'),
				  e.exit('reference'),
				  t)
				: r(c);
		}
	}
	const a6 = {
		name: 'labelStartImage',
		tokenize: l6,
		resolveAll: Ql.resolveAll,
	};
	function l6(e, t, r) {
		const o = this;
		return u;
		function u(d) {
			return (
				e.enter('labelImage'),
				e.enter('labelImageMarker'),
				e.consume(d),
				e.exit('labelImageMarker'),
				c
			);
		}
		function c(d) {
			return d === 91
				? (e.enter('labelMarker'),
				  e.consume(d),
				  e.exit('labelMarker'),
				  e.exit('labelImage'),
				  f)
				: r(d);
		}
		function f(d) {
			return d === 94 && '_hiddenFootnoteSupport' in o.parser.constructs
				? r(d)
				: t(d);
		}
	}
	const u6 = {
		name: 'labelStartLink',
		tokenize: c6,
		resolveAll: Ql.resolveAll,
	};
	function c6(e, t, r) {
		const o = this;
		return u;
		function u(f) {
			return (
				e.enter('labelLink'),
				e.enter('labelMarker'),
				e.consume(f),
				e.exit('labelMarker'),
				e.exit('labelLink'),
				c
			);
		}
		function c(f) {
			return f === 94 && '_hiddenFootnoteSupport' in o.parser.constructs
				? r(f)
				: t(f);
		}
	}
	const Vl = {
		name: 'lineEnding',
		tokenize: f6,
	};
	function f6(e, t) {
		return r;
		function r(o) {
			return (
				e.enter('lineEnding'),
				e.consume(o),
				e.exit('lineEnding'),
				at(e, t, 'linePrefix')
			);
		}
	}
	const Ws = {
		name: 'thematicBreak',
		tokenize: h6,
	};
	function h6(e, t, r) {
		let o = 0,
			u;
		return c;
		function c(g) {
			return e.enter('thematicBreak'), (u = g), f(g);
		}
		function f(g) {
			return g === u
				? (e.enter('thematicBreakSequence'), d(g))
				: kt(g)
				? at(e, f, 'whitespace')(g)
				: o < 3 || (g !== null && !Me(g))
				? r(g)
				: (e.exit('thematicBreak'), t(g));
		}
		function d(g) {
			return g === u
				? (e.consume(g), o++, d)
				: (e.exit('thematicBreakSequence'), f(g));
		}
	}
	const pn = {
			name: 'list',
			tokenize: g6,
			continuation: {
				tokenize: m6,
			},
			exit: E6,
		},
		d6 = {
			tokenize: v6,
			partial: !0,
		},
		p6 = {
			tokenize: T6,
			partial: !0,
		};
	function g6(e, t, r) {
		const o = this,
			u = o.events[o.events.length - 1];
		let c =
				u && u[1].type === 'linePrefix'
					? u[2].sliceSerialize(u[1], !0).length
					: 0,
			f = 0;
		return d;
		function d(x) {
			const S =
				o.containerState.type ||
				(x === 42 || x === 43 || x === 45 ? 'listUnordered' : 'listOrdered');
			if (
				S === 'listUnordered'
					? !o.containerState.marker || x === o.containerState.marker
					: Wl(x)
			) {
				if (
					(o.containerState.type ||
						((o.containerState.type = S),
						e.enter(S, {
							_container: !0,
						})),
					S === 'listUnordered')
				)
					return (
						e.enter('listItemPrefix'),
						x === 42 || x === 45 ? e.check(Ws, r, T)(x) : T(x)
					);
				if (!o.interrupt || x === 49)
					return e.enter('listItemPrefix'), e.enter('listItemValue'), g(x);
			}
			return r(x);
		}
		function g(x) {
			return Wl(x) && ++f < 10
				? (e.consume(x), g)
				: (!o.interrupt || f < 2) &&
				  (o.containerState.marker
						? x === o.containerState.marker
						: x === 41 || x === 46)
				? (e.exit('listItemValue'), T(x))
				: r(x);
		}
		function T(x) {
			return (
				e.enter('listItemMarker'),
				e.consume(x),
				e.exit('listItemMarker'),
				(o.containerState.marker = o.containerState.marker || x),
				e.check(zs, o.interrupt ? r : A, e.attempt(d6, M, C))
			);
		}
		function A(x) {
			return (o.containerState.initialBlankLine = !0), c++, M(x);
		}
		function C(x) {
			return kt(x)
				? (e.enter('listItemPrefixWhitespace'),
				  e.consume(x),
				  e.exit('listItemPrefixWhitespace'),
				  M)
				: r(x);
		}
		function M(x) {
			return (
				(o.containerState.size =
					c + o.sliceSerialize(e.exit('listItemPrefix'), !0).length),
				t(x)
			);
		}
	}
	function m6(e, t, r) {
		const o = this;
		return (o.containerState._closeFlow = void 0), e.check(zs, u, c);
		function u(d) {
			return (
				(o.containerState.furtherBlankLines =
					o.containerState.furtherBlankLines ||
					o.containerState.initialBlankLine),
				at(e, t, 'listItemIndent', o.containerState.size + 1)(d)
			);
		}
		function c(d) {
			return o.containerState.furtherBlankLines || !kt(d)
				? ((o.containerState.furtherBlankLines = void 0),
				  (o.containerState.initialBlankLine = void 0),
				  f(d))
				: ((o.containerState.furtherBlankLines = void 0),
				  (o.containerState.initialBlankLine = void 0),
				  e.attempt(p6, t, f)(d));
		}
		function f(d) {
			return (
				(o.containerState._closeFlow = !0),
				(o.interrupt = void 0),
				at(
					e,
					e.attempt(pn, t, r),
					'linePrefix',
					o.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
				)(d)
			);
		}
	}
	function T6(e, t, r) {
		const o = this;
		return at(e, u, 'listItemIndent', o.containerState.size + 1);
		function u(c) {
			const f = o.events[o.events.length - 1];
			return f &&
				f[1].type === 'listItemIndent' &&
				f[2].sliceSerialize(f[1], !0).length === o.containerState.size
				? t(c)
				: r(c);
		}
	}
	function E6(e) {
		e.exit(this.containerState.type);
	}
	function v6(e, t, r) {
		const o = this;
		return at(
			e,
			u,
			'listItemPrefixWhitespace',
			o.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4 + 1
		);
		function u(c) {
			const f = o.events[o.events.length - 1];
			return !kt(c) && f && f[1].type === 'listItemPrefixWhitespace'
				? t(c)
				: r(c);
		}
	}
	const bd = {
		name: 'setextUnderline',
		tokenize: A6,
		resolveTo: y6,
	};
	function y6(e, t) {
		let r = e.length,
			o,
			u,
			c;
		for (; r--; )
			if (e[r][0] === 'enter') {
				if (e[r][1].type === 'content') {
					o = r;
					break;
				}
				e[r][1].type === 'paragraph' && (u = r);
			} else
				e[r][1].type === 'content' && e.splice(r, 1),
					!c && e[r][1].type === 'definition' && (c = r);
		const f = {
			type: 'setextHeading',
			start: Object.assign({}, e[u][1].start),
			end: Object.assign({}, e[e.length - 1][1].end),
		};
		return (
			(e[u][1].type = 'setextHeadingText'),
			c
				? (e.splice(u, 0, ['enter', f, t]),
				  e.splice(c + 1, 0, ['exit', e[o][1], t]),
				  (e[o][1].end = Object.assign({}, e[c][1].end)))
				: (e[o][1] = f),
			e.push(['exit', f, t]),
			e
		);
	}
	function A6(e, t, r) {
		const o = this;
		let u = o.events.length,
			c,
			f;
		for (; u--; )
			if (
				o.events[u][1].type !== 'lineEnding' &&
				o.events[u][1].type !== 'linePrefix' &&
				o.events[u][1].type !== 'content'
			) {
				f = o.events[u][1].type === 'paragraph';
				break;
			}
		return d;
		function d(A) {
			return !o.parser.lazy[o.now().line] && (o.interrupt || f)
				? (e.enter('setextHeadingLine'),
				  e.enter('setextHeadingLineSequence'),
				  (c = A),
				  g(A))
				: r(A);
		}
		function g(A) {
			return A === c
				? (e.consume(A), g)
				: (e.exit('setextHeadingLineSequence'), at(e, T, 'lineSuffix')(A));
		}
		function T(A) {
			return A === null || Me(A) ? (e.exit('setextHeadingLine'), t(A)) : r(A);
		}
	}
	const _6 = {
		tokenize: C6,
	};
	function C6(e) {
		const t = this,
			r = e.attempt(
				zs,
				o,
				e.attempt(
					this.parser.constructs.flowInitial,
					u,
					at(
						e,
						e.attempt(this.parser.constructs.flow, u, e.attempt(wv, u)),
						'linePrefix'
					)
				)
			);
		return r;
		function o(c) {
			if (c === null) {
				e.consume(c);
				return;
			}
			return (
				e.enter('lineEndingBlank'),
				e.consume(c),
				e.exit('lineEndingBlank'),
				(t.currentConstruct = void 0),
				r
			);
		}
		function u(c) {
			if (c === null) {
				e.consume(c);
				return;
			}
			return (
				e.enter('lineEnding'),
				e.consume(c),
				e.exit('lineEnding'),
				(t.currentConstruct = void 0),
				r
			);
		}
	}
	const S6 = {
			resolveAll: xd(),
		},
		b6 = Nd('string'),
		N6 = Nd('text');
	function Nd(e) {
		return {
			tokenize: t,
			resolveAll: xd(e === 'text' ? x6 : void 0),
		};
		function t(r) {
			const o = this,
				u = this.parser.constructs[e],
				c = r.attempt(u, f, d);
			return f;
			function f(A) {
				return T(A) ? c(A) : d(A);
			}
			function d(A) {
				if (A === null) {
					r.consume(A);
					return;
				}
				return r.enter('data'), r.consume(A), g;
			}
			function g(A) {
				return T(A) ? (r.exit('data'), c(A)) : (r.consume(A), g);
			}
			function T(A) {
				if (A === null) return !0;
				const C = u[A];
				let M = -1;
				if (C)
					for (; ++M < C.length; ) {
						const x = C[M];
						if (!x.previous || x.previous.call(o, o.previous)) return !0;
					}
				return !1;
			}
		}
	}
	function xd(e) {
		return t;
		function t(r, o) {
			let u = -1,
				c;
			for (; ++u <= r.length; )
				c === void 0
					? r[u] && r[u][1].type === 'data' && ((c = u), u++)
					: (!r[u] || r[u][1].type !== 'data') &&
					  (u !== c + 2 &&
							((r[c][1].end = r[u - 1][1].end),
							r.splice(c + 2, u - c - 2),
							(u = c + 2)),
					  (c = void 0));
			return e ? e(r, o) : r;
		}
	}
	function x6(e, t) {
		let r = 0;
		for (; ++r <= e.length; )
			if (
				(r === e.length || e[r][1].type === 'lineEnding') &&
				e[r - 1][1].type === 'data'
			) {
				const o = e[r - 1][1],
					u = t.sliceStream(o);
				let c = u.length,
					f = -1,
					d = 0,
					g;
				for (; c--; ) {
					const T = u[c];
					if (typeof T == 'string') {
						for (f = T.length; T.charCodeAt(f - 1) === 32; ) d++, f--;
						if (f) break;
						f = -1;
					} else if (T === -2) (g = !0), d++;
					else if (T !== -1) {
						c++;
						break;
					}
				}
				if (d) {
					const T = {
						type:
							r === e.length || g || d < 2 ? 'lineSuffix' : 'hardBreakTrailing',
						start: {
							line: o.end.line,
							column: o.end.column - d,
							offset: o.end.offset - d,
							_index: o.start._index + c,
							_bufferIndex: c ? f : o.start._bufferIndex + f,
						},
						end: Object.assign({}, o.end),
					};
					(o.end = Object.assign({}, T.start)),
						o.start.offset === o.end.offset
							? Object.assign(o, T)
							: (e.splice(r, 0, ['enter', T, t], ['exit', T, t]), (r += 2));
				}
				r++;
			}
		return e;
	}
	function k6(e, t, r) {
		let o = Object.assign(
			r
				? Object.assign({}, r)
				: {
						line: 1,
						column: 1,
						offset: 0,
				  },
			{
				_index: 0,
				_bufferIndex: -1,
			}
		);
		const u = {},
			c = [];
		let f = [],
			d = [];
		const g = {
				consume: z,
				enter: K,
				exit: w,
				attempt: W(Z),
				check: W(L),
				interrupt: W(L, {
					interrupt: !0,
				}),
			},
			T = {
				previous: null,
				code: null,
				containerState: {},
				events: [],
				parser: e,
				sliceStream: x,
				sliceSerialize: M,
				now: S,
				defineSkip: D,
				write: C,
			};
		let A = t.tokenize.call(T, g);
		return t.resolveAll && c.push(t), T;
		function C(X) {
			return (
				(f = Mn(f, X)),
				P(),
				f[f.length - 1] !== null
					? []
					: (te(t, 0), (T.events = jl(c, T.events, T)), T.events)
			);
		}
		function M(X, G) {
			return w6(x(X), G);
		}
		function x(X) {
			return O6(f, X);
		}
		function S() {
			return Object.assign({}, o);
		}
		function D(X) {
			(u[X.line] = X.column), ae();
		}
		function P() {
			let X;
			for (; o._index < f.length; ) {
				const G = f[o._index];
				if (typeof G == 'string')
					for (
						X = o._index, o._bufferIndex < 0 && (o._bufferIndex = 0);
						o._index === X && o._bufferIndex < G.length;

					)
						I(G.charCodeAt(o._bufferIndex));
				else I(G);
			}
		}
		function I(X) {
			A = A(X);
		}
		function z(X) {
			Me(X)
				? (o.line++, (o.column = 1), (o.offset += X === -3 ? 2 : 1), ae())
				: X !== -1 && (o.column++, o.offset++),
				o._bufferIndex < 0
					? o._index++
					: (o._bufferIndex++,
					  o._bufferIndex === f[o._index].length &&
							((o._bufferIndex = -1), o._index++)),
				(T.previous = X);
		}
		function K(X, G) {
			const H = G || {};
			return (
				(H.type = X),
				(H.start = S()),
				T.events.push(['enter', H, T]),
				d.push(H),
				H
			);
		}
		function w(X) {
			const G = d.pop();
			return (G.end = S()), T.events.push(['exit', G, T]), G;
		}
		function Z(X, G) {
			te(X, G.from);
		}
		function L(X, G) {
			G.restore();
		}
		function W(X, G) {
			return H;
			function H(J, Q, se) {
				let Ae, _e, Oe, O;
				return Array.isArray(J) ? b(J) : 'tokenize' in J ? b([J]) : E(J);
				function E(Pe) {
					return Ge;
					function Ge(Ve) {
						const rt = Ve !== null && Pe[Ve],
							Fe = Ve !== null && Pe.null,
							Ze = [
								...(Array.isArray(rt) ? rt : rt ? [rt] : []),
								...(Array.isArray(Fe) ? Fe : Fe ? [Fe] : []),
							];
						return b(Ze)(Ve);
					}
				}
				function b(Pe) {
					return (Ae = Pe), (_e = 0), Pe.length === 0 ? se : Ce(Pe[_e]);
				}
				function Ce(Pe) {
					return Ge;
					function Ge(Ve) {
						return (
							(O = V()),
							(Oe = Pe),
							Pe.partial || (T.currentConstruct = Pe),
							Pe.name && T.parser.constructs.disable.null.includes(Pe.name)
								? Ue()
								: Pe.tokenize.call(
										G ? Object.assign(Object.create(T), G) : T,
										g,
										fe,
										Ue
								  )(Ve)
						);
					}
				}
				function fe(Pe) {
					return X(Oe, O), Q;
				}
				function Ue(Pe) {
					return O.restore(), ++_e < Ae.length ? Ce(Ae[_e]) : se;
				}
			}
		}
		function te(X, G) {
			X.resolveAll && !c.includes(X) && c.push(X),
				X.resolve &&
					nr(T.events, G, T.events.length - G, X.resolve(T.events.slice(G), T)),
				X.resolveTo && (T.events = X.resolveTo(T.events, T));
		}
		function V() {
			const X = S(),
				G = T.previous,
				H = T.currentConstruct,
				J = T.events.length,
				Q = Array.from(d);
			return {
				restore: se,
				from: J,
			};
			function se() {
				(o = X),
					(T.previous = G),
					(T.currentConstruct = H),
					(T.events.length = J),
					(d = Q),
					ae();
			}
		}
		function ae() {
			o.line in u &&
				o.column < 2 &&
				((o.column = u[o.line]), (o.offset += u[o.line] - 1));
		}
	}
	function O6(e, t) {
		const r = t.start._index,
			o = t.start._bufferIndex,
			u = t.end._index,
			c = t.end._bufferIndex;
		let f;
		return (
			r === u
				? (f = [e[r].slice(o, c)])
				: ((f = e.slice(r, u)),
				  o > -1 && (f[0] = f[0].slice(o)),
				  c > 0 && f.push(e[u].slice(0, c))),
			f
		);
	}
	function w6(e, t) {
		let r = -1;
		const o = [];
		let u;
		for (; ++r < e.length; ) {
			const c = e[r];
			let f;
			if (typeof c == 'string') f = c;
			else
				switch (c) {
					case -5: {
						f = '\r';
						break;
					}
					case -4: {
						f = `
`;
						break;
					}
					case -3: {
						f = `\r
`;
						break;
					}
					case -2: {
						f = t ? ' ' : '	';
						break;
					}
					case -1: {
						if (!t && u) continue;
						f = ' ';
						break;
					}
					default:
						f = String.fromCharCode(c);
				}
			(u = c === -2), o.push(f);
		}
		return o.join('');
	}
	const L6 = {
			[42]: pn,
			[43]: pn,
			[45]: pn,
			[48]: pn,
			[49]: pn,
			[50]: pn,
			[51]: pn,
			[52]: pn,
			[53]: pn,
			[54]: pn,
			[55]: pn,
			[56]: pn,
			[57]: pn,
			[62]: gd,
		},
		I6 = {
			[91]: Dv,
		},
		M6 = {
			[-2]: Xl,
			[-1]: Xl,
			[32]: Xl,
		},
		R6 = Object.freeze(
			Object.defineProperty(
				{
					__proto__: null,
					attentionMarkers: {
						null: [42, 95],
					},
					contentInitial: I6,
					disable: {
						null: [],
					},
					document: L6,
					flow: {
						[35]: Gv,
						[42]: Ws,
						[45]: [bd, Ws],
						[60]: jv,
						[61]: bd,
						[95]: Ws,
						[96]: vd,
						[126]: vd,
					},
					flowInitial: M6,
					insideSpan: {
						null: [Yl, S6],
					},
					string: {
						[38]: Ed,
						[92]: md,
					},
					text: {
						[-5]: Vl,
						[-4]: Vl,
						[-3]: Vl,
						[33]: a6,
						[38]: Ed,
						[42]: Yl,
						[60]: [dv, Vv],
						[91]: u6,
						[92]: [Bv, md],
						[93]: Ql,
						[95]: Yl,
						[96]: bv,
					},
				},
				Symbol.toStringTag,
				{
					value: 'Module',
				}
			)
		);
	function D6(e = {}) {
		const t = JE([R6].concat(e.extensions || [])),
			r = {
				defined: [],
				lazy: {},
				constructs: t,
				content: o(sv),
				document: o(lv),
				flow: o(_6),
				string: o(b6),
				text: o(N6),
			};
		return r;
		function o(u) {
			return c;
			function c(f) {
				return k6(r, u, f);
			}
		}
	}
	const kd = /[\0\t\n\r]/g;
	function P6() {
		let e = 1,
			t = '',
			r = !0,
			o;
		return u;
		function u(c, f, d) {
			const g = [];
			let T, A, C, M, x;
			for (
				c = t + c.toString(f),
					C = 0,
					t = '',
					r && (c.charCodeAt(0) === 65279 && C++, (r = void 0));
				C < c.length;

			) {
				if (
					((kd.lastIndex = C),
					(T = kd.exec(c)),
					(M = T && T.index !== void 0 ? T.index : c.length),
					(x = c.charCodeAt(M)),
					!T)
				) {
					t = c.slice(C);
					break;
				}
				if (x === 10 && C === M && o) g.push(-3), (o = void 0);
				else
					switch (
						(o && (g.push(-5), (o = void 0)),
						C < M && (g.push(c.slice(C, M)), (e += M - C)),
						x)
					) {
						case 0: {
							g.push(65533), e++;
							break;
						}
						case 9: {
							for (A = Math.ceil(e / 4) * 4, g.push(-2); e++ < A; ) g.push(-1);
							break;
						}
						case 10: {
							g.push(-4), (e = 1);
							break;
						}
						default:
							(o = !0), (e = 1);
					}
				C = M + 1;
			}
			return d && (o && g.push(-5), t && g.push(t), g.push(null)), g;
		}
	}
	function F6(e) {
		for (; !yd(e); );
		return e;
	}
	function Od(e, t) {
		const r = Number.parseInt(e, t);
		return r < 9 ||
			r === 11 ||
			(r > 13 && r < 32) ||
			(r > 126 && r < 160) ||
			(r > 55295 && r < 57344) ||
			(r > 64975 && r < 65008) ||
			(r & 65535) === 65535 ||
			(r & 65535) === 65534 ||
			r > 1114111
			? '�'
			: String.fromCharCode(r);
	}
	const H6 =
		/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
	function B6(e) {
		return e.replace(H6, U6);
	}
	function U6(e, t, r) {
		if (t) return t;
		if (r.charCodeAt(0) === 35) {
			const u = r.charCodeAt(1),
				c = u === 120 || u === 88;
			return Od(r.slice(c ? 2 : 1), c ? 16 : 10);
		}
		return ql(r) || e;
	}
	function ho(e) {
		return !e || typeof e != 'object'
			? ''
			: 'position' in e || 'type' in e
			? wd(e.position)
			: 'start' in e || 'end' in e
			? wd(e)
			: 'line' in e || 'column' in e
			? Zl(e)
			: '';
	}
	function Zl(e) {
		return Ld(e && e.line) + ':' + Ld(e && e.column);
	}
	function wd(e) {
		return Zl(e && e.start) + '-' + Zl(e && e.end);
	}
	function Ld(e) {
		return e && typeof e == 'number' ? e : 1;
	}
	const Jl = {}.hasOwnProperty,
		G6 = function (e, t, r) {
			return (
				typeof t != 'string' && ((r = t), (t = void 0)),
				z6(r)(F6(D6(r).document().write(P6()(e, t, !0))))
			);
		};
	function z6(e = {}) {
		const t = Id(
				{
					transforms: [],
					canContainEols: [
						'emphasis',
						'fragment',
						'heading',
						'paragraph',
						'strong',
					],
					enter: {
						autolink: g(Je),
						autolinkProtocol: G,
						autolinkEmail: G,
						atxHeading: g(zt),
						blockQuote: g(qt),
						characterEscape: G,
						characterReference: G,
						codeFenced: g(De),
						codeFencedFenceInfo: T,
						codeFencedFenceMeta: T,
						codeIndented: g(De, T),
						codeText: g(Gt, T),
						codeTextData: G,
						data: G,
						codeFlowValue: G,
						definition: g(Xt),
						definitionDestinationString: T,
						definitionLabelString: T,
						definitionTitleString: T,
						emphasis: g(Rt),
						hardBreakEscape: g($t),
						hardBreakTrailing: g($t),
						htmlFlow: g(Ot, T),
						htmlFlowData: G,
						htmlText: g(Ot, T),
						htmlTextData: G,
						image: g(ie),
						label: T,
						link: g(Je),
						listItem: g(en),
						listItemValue: D,
						listOrdered: g(Pn, S),
						listUnordered: g(Pn),
						paragraph: g(lt),
						reference: Pe,
						referenceString: T,
						resourceDestinationString: T,
						resourceTitleString: T,
						setextHeading: g(zt),
						strong: g(qe),
						thematicBreak: g(pt),
					},
					exit: {
						atxHeading: C(),
						atxHeadingSequence: te,
						autolink: C(),
						autolinkEmail: Ze,
						autolinkProtocol: Fe,
						blockQuote: C(),
						characterEscapeValue: H,
						characterReferenceMarkerHexadecimal: Ve,
						characterReferenceMarkerNumeric: Ve,
						characterReferenceValue: rt,
						codeFenced: C(K),
						codeFencedFence: z,
						codeFencedFenceInfo: P,
						codeFencedFenceMeta: I,
						codeFlowValue: H,
						codeIndented: C(w),
						codeText: C(_e),
						codeTextData: H,
						data: H,
						definition: C(),
						definitionDestinationString: W,
						definitionLabelString: Z,
						definitionTitleString: L,
						emphasis: C(),
						hardBreakEscape: C(Q),
						hardBreakTrailing: C(Q),
						htmlFlow: C(se),
						htmlFlowData: H,
						htmlText: C(Ae),
						htmlTextData: H,
						image: C(O),
						label: b,
						labelText: E,
						lineEnding: J,
						link: C(Oe),
						listItem: C(),
						listOrdered: C(),
						listUnordered: C(),
						paragraph: C(),
						referenceString: Ge,
						resourceDestinationString: Ce,
						resourceTitleString: fe,
						resource: Ue,
						setextHeading: C(X),
						setextHeadingLineSequence: ae,
						setextHeadingText: V,
						strong: C(),
						thematicBreak: C(),
					},
				},
				e.mdastExtensions || []
			),
			r = {};
		return o;
		function o(Y) {
			let pe = {
				type: 'root',
				children: [],
			};
			const Ne = [pe],
				Xe = [],
				Ee = [],
				Kn = {
					stack: Ne,
					tokenStack: Xe,
					config: t,
					enter: A,
					exit: M,
					buffer: T,
					resume: x,
					setData: c,
					getData: f,
				};
			let j = -1;
			for (; ++j < Y.length; )
				if (Y[j][1].type === 'listOrdered' || Y[j][1].type === 'listUnordered')
					if (Y[j][0] === 'enter') Ee.push(j);
					else {
						const re = Ee.pop();
						j = u(Y, re, j);
					}
			for (j = -1; ++j < Y.length; ) {
				const re = t[Y[j][0]];
				Jl.call(re, Y[j][1].type) &&
					re[Y[j][1].type].call(
						Object.assign(
							{
								sliceSerialize: Y[j][2].sliceSerialize,
							},
							Kn
						),
						Y[j][1]
					);
			}
			if (Xe.length > 0) {
				const re = Xe[Xe.length - 1];
				(re[1] || Md).call(Kn, void 0, re[0]);
			}
			for (
				pe.position = {
					start: d(
						Y.length > 0
							? Y[0][1].start
							: {
									line: 1,
									column: 1,
									offset: 0,
							  }
					),
					end: d(
						Y.length > 0
							? Y[Y.length - 2][1].end
							: {
									line: 1,
									column: 1,
									offset: 0,
							  }
					),
				},
					j = -1;
				++j < t.transforms.length;

			)
				pe = t.transforms[j](pe) || pe;
			return pe;
		}
		function u(Y, pe, Ne) {
			let Xe = pe - 1,
				Ee = -1,
				Kn = !1,
				j,
				re,
				me,
				ze;
			for (; ++Xe <= Ne; ) {
				const ve = Y[Xe];
				if (
					(ve[1].type === 'listUnordered' ||
					ve[1].type === 'listOrdered' ||
					ve[1].type === 'blockQuote'
						? (ve[0] === 'enter' ? Ee++ : Ee--, (ze = void 0))
						: ve[1].type === 'lineEndingBlank'
						? ve[0] === 'enter' &&
						  (j && !ze && !Ee && !me && (me = Xe), (ze = void 0))
						: ve[1].type === 'linePrefix' ||
						  ve[1].type === 'listItemValue' ||
						  ve[1].type === 'listItemMarker' ||
						  ve[1].type === 'listItemPrefix' ||
						  ve[1].type === 'listItemPrefixWhitespace' ||
						  (ze = void 0),
					(!Ee && ve[0] === 'enter' && ve[1].type === 'listItemPrefix') ||
						(Ee === -1 &&
							ve[0] === 'exit' &&
							(ve[1].type === 'listUnordered' || ve[1].type === 'listOrdered')))
				) {
					if (j) {
						let ut = Xe;
						for (re = void 0; ut--; ) {
							const We = Y[ut];
							if (
								We[1].type === 'lineEnding' ||
								We[1].type === 'lineEndingBlank'
							) {
								if (We[0] === 'exit') continue;
								re && ((Y[re][1].type = 'lineEndingBlank'), (Kn = !0)),
									(We[1].type = 'lineEnding'),
									(re = ut);
							} else if (
								!(
									We[1].type === 'linePrefix' ||
									We[1].type === 'blockQuotePrefix' ||
									We[1].type === 'blockQuotePrefixWhitespace' ||
									We[1].type === 'blockQuoteMarker' ||
									We[1].type === 'listItemIndent'
								)
							)
								break;
						}
						me && (!re || me < re) && (j._spread = !0),
							(j.end = Object.assign({}, re ? Y[re][1].start : ve[1].end)),
							Y.splice(re || Xe, 0, ['exit', j, ve[2]]),
							Xe++,
							Ne++;
					}
					ve[1].type === 'listItemPrefix' &&
						((j = {
							type: 'listItem',
							_spread: !1,
							start: Object.assign({}, ve[1].start),
						}),
						Y.splice(Xe, 0, ['enter', j, ve[2]]),
						Xe++,
						Ne++,
						(me = void 0),
						(ze = !0));
				}
			}
			return (Y[pe][1]._spread = Kn), Ne;
		}
		function c(Y, pe) {
			r[Y] = pe;
		}
		function f(Y) {
			return r[Y];
		}
		function d(Y) {
			return {
				line: Y.line,
				column: Y.column,
				offset: Y.offset,
			};
		}
		function g(Y, pe) {
			return Ne;
			function Ne(Xe) {
				A.call(this, Y(Xe), Xe), pe && pe.call(this, Xe);
			}
		}
		function T() {
			this.stack.push({
				type: 'fragment',
				children: [],
			});
		}
		function A(Y, pe, Ne) {
			return (
				this.stack[this.stack.length - 1].children.push(Y),
				this.stack.push(Y),
				this.tokenStack.push([pe, Ne]),
				(Y.position = {
					start: d(pe.start),
				}),
				Y
			);
		}
		function C(Y) {
			return pe;
			function pe(Ne) {
				Y && Y.call(this, Ne), M.call(this, Ne);
			}
		}
		function M(Y, pe) {
			const Ne = this.stack.pop(),
				Xe = this.tokenStack.pop();
			if (Xe)
				Xe[0].type !== Y.type &&
					(pe ? pe.call(this, Y, Xe[0]) : (Xe[1] || Md).call(this, Y, Xe[0]));
			else
				throw new Error(
					'Cannot close `' +
						Y.type +
						'` (' +
						ho({
							start: Y.start,
							end: Y.end,
						}) +
						'): it’s not open'
				);
			return (Ne.position.end = d(Y.end)), Ne;
		}
		function x() {
			return ZE(this.stack.pop());
		}
		function S() {
			c('expectingFirstListItemValue', !0);
		}
		function D(Y) {
			if (f('expectingFirstListItemValue')) {
				const pe = this.stack[this.stack.length - 2];
				(pe.start = Number.parseInt(this.sliceSerialize(Y), 10)),
					c('expectingFirstListItemValue');
			}
		}
		function P() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			pe.lang = Y;
		}
		function I() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			pe.meta = Y;
		}
		function z() {
			f('flowCodeInside') || (this.buffer(), c('flowCodeInside', !0));
		}
		function K() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			(pe.value = Y.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')),
				c('flowCodeInside');
		}
		function w() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			pe.value = Y.replace(/(\r?\n|\r)$/g, '');
		}
		function Z(Y) {
			const pe = this.resume(),
				Ne = this.stack[this.stack.length - 1];
			(Ne.label = pe),
				(Ne.identifier = a1(this.sliceSerialize(Y)).toLowerCase());
		}
		function L() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			pe.title = Y;
		}
		function W() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			pe.url = Y;
		}
		function te(Y) {
			const pe = this.stack[this.stack.length - 1];
			if (!pe.depth) {
				const Ne = this.sliceSerialize(Y).length;
				pe.depth = Ne;
			}
		}
		function V() {
			c('setextHeadingSlurpLineEnding', !0);
		}
		function ae(Y) {
			const pe = this.stack[this.stack.length - 1];
			pe.depth = this.sliceSerialize(Y).charCodeAt(0) === 61 ? 1 : 2;
		}
		function X() {
			c('setextHeadingSlurpLineEnding');
		}
		function G(Y) {
			const pe = this.stack[this.stack.length - 1];
			let Ne = pe.children[pe.children.length - 1];
			(!Ne || Ne.type !== 'text') &&
				((Ne = et()),
				(Ne.position = {
					start: d(Y.start),
				}),
				pe.children.push(Ne)),
				this.stack.push(Ne);
		}
		function H(Y) {
			const pe = this.stack.pop();
			(pe.value += this.sliceSerialize(Y)), (pe.position.end = d(Y.end));
		}
		function J(Y) {
			const pe = this.stack[this.stack.length - 1];
			if (f('atHardBreak')) {
				const Ne = pe.children[pe.children.length - 1];
				(Ne.position.end = d(Y.end)), c('atHardBreak');
				return;
			}
			!f('setextHeadingSlurpLineEnding') &&
				t.canContainEols.includes(pe.type) &&
				(G.call(this, Y), H.call(this, Y));
		}
		function Q() {
			c('atHardBreak', !0);
		}
		function se() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			pe.value = Y;
		}
		function Ae() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			pe.value = Y;
		}
		function _e() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			pe.value = Y;
		}
		function Oe() {
			const Y = this.stack[this.stack.length - 1];
			f('inReference')
				? ((Y.type += 'Reference'),
				  (Y.referenceType = f('referenceType') || 'shortcut'),
				  delete Y.url,
				  delete Y.title)
				: (delete Y.identifier, delete Y.label),
				c('referenceType');
		}
		function O() {
			const Y = this.stack[this.stack.length - 1];
			f('inReference')
				? ((Y.type += 'Reference'),
				  (Y.referenceType = f('referenceType') || 'shortcut'),
				  delete Y.url,
				  delete Y.title)
				: (delete Y.identifier, delete Y.label),
				c('referenceType');
		}
		function E(Y) {
			const pe = this.stack[this.stack.length - 2],
				Ne = this.sliceSerialize(Y);
			(pe.label = B6(Ne)), (pe.identifier = a1(Ne).toLowerCase());
		}
		function b() {
			const Y = this.stack[this.stack.length - 1],
				pe = this.resume(),
				Ne = this.stack[this.stack.length - 1];
			c('inReference', !0),
				Ne.type === 'link' ? (Ne.children = Y.children) : (Ne.alt = pe);
		}
		function Ce() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			pe.url = Y;
		}
		function fe() {
			const Y = this.resume(),
				pe = this.stack[this.stack.length - 1];
			pe.title = Y;
		}
		function Ue() {
			c('inReference');
		}
		function Pe() {
			c('referenceType', 'collapsed');
		}
		function Ge(Y) {
			const pe = this.resume(),
				Ne = this.stack[this.stack.length - 1];
			(Ne.label = pe),
				(Ne.identifier = a1(this.sliceSerialize(Y)).toLowerCase()),
				c('referenceType', 'full');
		}
		function Ve(Y) {
			c('characterReferenceType', Y.type);
		}
		function rt(Y) {
			const pe = this.sliceSerialize(Y),
				Ne = f('characterReferenceType');
			let Xe;
			Ne
				? ((Xe = Od(pe, Ne === 'characterReferenceMarkerNumeric' ? 10 : 16)),
				  c('characterReferenceType'))
				: (Xe = ql(pe));
			const Ee = this.stack.pop();
			(Ee.value += Xe), (Ee.position.end = d(Y.end));
		}
		function Fe(Y) {
			H.call(this, Y);
			const pe = this.stack[this.stack.length - 1];
			pe.url = this.sliceSerialize(Y);
		}
		function Ze(Y) {
			H.call(this, Y);
			const pe = this.stack[this.stack.length - 1];
			pe.url = 'mailto:' + this.sliceSerialize(Y);
		}
		function qt() {
			return {
				type: 'blockquote',
				children: [],
			};
		}
		function De() {
			return {
				type: 'code',
				lang: null,
				meta: null,
				value: '',
			};
		}
		function Gt() {
			return {
				type: 'inlineCode',
				value: '',
			};
		}
		function Xt() {
			return {
				type: 'definition',
				identifier: '',
				label: null,
				title: null,
				url: '',
			};
		}
		function Rt() {
			return {
				type: 'emphasis',
				children: [],
			};
		}
		function zt() {
			return {
				type: 'heading',
				depth: void 0,
				children: [],
			};
		}
		function $t() {
			return {
				type: 'break',
			};
		}
		function Ot() {
			return {
				type: 'html',
				value: '',
			};
		}
		function ie() {
			return {
				type: 'image',
				title: null,
				url: '',
				alt: null,
			};
		}
		function Je() {
			return {
				type: 'link',
				title: null,
				url: '',
				children: [],
			};
		}
		function Pn(Y) {
			return {
				type: 'list',
				ordered: Y.type === 'listOrdered',
				start: null,
				spread: Y._spread,
				children: [],
			};
		}
		function en(Y) {
			return {
				type: 'listItem',
				spread: Y._spread,
				checked: null,
				children: [],
			};
		}
		function lt() {
			return {
				type: 'paragraph',
				children: [],
			};
		}
		function qe() {
			return {
				type: 'strong',
				children: [],
			};
		}
		function et() {
			return {
				type: 'text',
				value: '',
			};
		}
		function pt() {
			return {
				type: 'thematicBreak',
			};
		}
	}
	function Id(e, t) {
		let r = -1;
		for (; ++r < t.length; ) {
			const o = t[r];
			Array.isArray(o) ? Id(e, o) : W6(e, o);
		}
		return e;
	}
	function W6(e, t) {
		let r;
		for (r in t)
			if (Jl.call(t, r)) {
				const o = r === 'canContainEols' || r === 'transforms',
					c = (Jl.call(e, r) ? e[r] : void 0) || (e[r] = o ? [] : {}),
					f = t[r];
				f && (o ? (e[r] = [...c, ...f]) : Object.assign(c, f));
			}
	}
	function Md(e, t) {
		throw e
			? new Error(
					'Cannot close `' +
						e.type +
						'` (' +
						ho({
							start: e.start,
							end: e.end,
						}) +
						'): a different token (`' +
						t.type +
						'`, ' +
						ho({
							start: t.start,
							end: t.end,
						}) +
						') is open'
			  )
			: new Error(
					'Cannot close document, a token (`' +
						t.type +
						'`, ' +
						ho({
							start: t.start,
							end: t.end,
						}) +
						') is still open'
			  );
	}
	function K6(e) {
		Object.assign(this, {
			Parser: (r) => {
				const o = this.data('settings');
				return G6(
					r,
					Object.assign({}, o, e, {
						extensions: this.data('micromarkExtensions') || [],
						mdastExtensions: this.data('fromMarkdownExtensions') || [],
					})
				);
			},
		});
	}
	var Mt = function (e, t, r) {
		var o = {
			type: String(e),
		};
		return (
			r == null && (typeof t == 'string' || Array.isArray(t))
				? (r = t)
				: Object.assign(o, t),
			Array.isArray(r) ? (o.children = r) : r != null && (o.value = String(r)),
			o
		);
	};
	const Ks = {}.hasOwnProperty;
	function j6(e, t) {
		const r = t.data || {};
		return 'value' in t &&
			!(
				Ks.call(r, 'hName') ||
				Ks.call(r, 'hProperties') ||
				Ks.call(r, 'hChildren')
			)
			? e.augment(t, Mt('text', t.value))
			: e(t, 'div', Jt(e, t));
	}
	function Rd(e, t, r) {
		const o = t && t.type;
		let u;
		if (!o) throw new Error('Expected node, got `' + t + '`');
		return (
			Ks.call(e.handlers, o)
				? (u = e.handlers[o])
				: e.passThrough && e.passThrough.includes(o)
				? (u = Y6)
				: (u = e.unknownHandler),
			(typeof u == 'function' ? u : j6)(e, t, r)
		);
	}
	function Y6(e, t) {
		return 'children' in t
			? {
					...t,
					children: Jt(e, t),
			  }
			: t;
	}
	function Jt(e, t) {
		const r = [];
		if ('children' in t) {
			const o = t.children;
			let u = -1;
			for (; ++u < o.length; ) {
				const c = Rd(e, o[u], t);
				if (c) {
					if (
						u &&
						o[u - 1].type === 'break' &&
						(!Array.isArray(c) &&
							c.type === 'text' &&
							(c.value = c.value.replace(/^\s+/, '')),
						!Array.isArray(c) && c.type === 'element')
					) {
						const f = c.children[0];
						f && f.type === 'text' && (f.value = f.value.replace(/^\s+/, ''));
					}
					Array.isArray(c) ? r.push(...c) : r.push(c);
				}
			}
		}
		return r;
	}
	function q6(e) {
		return (
			!e ||
			!e.position ||
			!e.position.start ||
			!e.position.start.line ||
			!e.position.start.column ||
			!e.position.end ||
			!e.position.end.line ||
			!e.position.end.column
		);
	}
	function J_(e) {
		return e;
	}
	const X6 = !0,
		Q6 = 'skip',
		Dd = !1,
		V6 = function (e, t, r, o) {
			typeof t == 'function' &&
				typeof r != 'function' &&
				((o = r), (r = t), (t = null));
			var u = Ui(t),
				c = o ? -1 : 1;
			f(e, null, [])();
			function f(d, g, T) {
				var A = typeof d == 'object' && d !== null ? d : {},
					C;
				return (
					typeof A.type == 'string' &&
						((C =
							typeof A.tagName == 'string'
								? A.tagName
								: typeof A.name == 'string'
								? A.name
								: void 0),
						Object.defineProperty(M, 'name', {
							value: 'node (' + (A.type + (C ? '<' + C + '>' : '')) + ')',
						})),
					M
				);
				function M() {
					var x = [],
						S,
						D,
						P;
					if (
						(!t || u(d, g, T[T.length - 1] || null)) &&
						((x = Z6(r(d, T))), x[0] === Dd)
					)
						return x;
					if (d.children && x[0] !== Q6)
						for (
							D = (o ? d.children.length : -1) + c, P = T.concat(d);
							D > -1 && D < d.children.length;

						) {
							if (((S = f(d.children[D], D, P)()), S[0] === Dd)) return S;
							D = typeof S[1] == 'number' ? S[1] : D + c;
						}
					return x;
				}
			}
		};
	function Z6(e) {
		return Array.isArray(e) ? e : typeof e == 'number' ? [X6, e] : [e];
	}
	const J6 = function (e, t, r, o) {
			typeof t == 'function' &&
				typeof r != 'function' &&
				((o = r), (r = t), (t = null)),
				V6(e, t, u, o);
			function u(c, f) {
				var d = f[f.length - 1];
				return r(c, d ? d.children.indexOf(c) : null, d);
			}
		},
		Pd = {}.hasOwnProperty;
	function $6(e) {
		const t = Object.create(null);
		if (!e || !e.type) throw new Error('mdast-util-definitions expected node');
		return J6(e, 'definition', r), o;
		function r(u) {
			const c = Fd(u.identifier);
			c && !Pd.call(t, c) && (t[c] = u);
		}
		function o(u) {
			const c = Fd(u);
			return c && Pd.call(t, c) ? t[c] : null;
		}
	}
	function Fd(e) {
		return String(e || '').toUpperCase();
	}
	const e3 = {
		'"': 'quot',
		'&': 'amp',
		'<': 'lt',
		'>': 'gt',
	};
	function t3(e) {
		return e.replace(/["&<>]/g, t);
		function t(r) {
			return '&' + e3[r] + ';';
		}
	}
	function Hd(e, t) {
		const r = t3(n3(e || ''));
		if (!t) return r;
		const o = r.indexOf(':'),
			u = r.indexOf('?'),
			c = r.indexOf('#'),
			f = r.indexOf('/');
		return o < 0 ||
			(f > -1 && o > f) ||
			(u > -1 && o > u) ||
			(c > -1 && o > c) ||
			t.test(r.slice(0, o))
			? r
			: '';
	}
	function n3(e) {
		const t = [];
		let r = -1,
			o = 0,
			u = 0;
		for (; ++r < e.length; ) {
			const c = e.charCodeAt(r);
			let f = '';
			if (c === 37 && Cn(e.charCodeAt(r + 1)) && Cn(e.charCodeAt(r + 2))) u = 2;
			else if (c < 128)
				/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(c)) ||
					(f = String.fromCharCode(c));
			else if (c > 55295 && c < 57344) {
				const d = e.charCodeAt(r + 1);
				c < 56320 && d > 56319 && d < 57344
					? ((f = String.fromCharCode(c, d)), (u = 1))
					: (f = '�');
			} else f = String.fromCharCode(c);
			f &&
				(t.push(e.slice(o, r), encodeURIComponent(f)),
				(o = r + u + 1),
				(f = '')),
				u && ((r += u), (u = 0));
		}
		return t.join('') + e.slice(o);
	}
	function Ar(e, t) {
		const r = [];
		let o = -1;
		for (
			t &&
			r.push(
				Mt(
					'text',
					`
`
				)
			);
			++o < e.length;

		)
			o &&
				r.push(
					Mt(
						'text',
						`
`
					)
				),
				r.push(e[o]);
		return (
			t &&
				e.length > 0 &&
				r.push(
					Mt(
						'text',
						`
`
					)
				),
			r
		);
	}
	function r3(e) {
		let t = -1;
		const r = [];
		for (; ++t < e.footnoteOrder.length; ) {
			const o = e.footnoteById[e.footnoteOrder[t].toUpperCase()];
			if (!o) continue;
			const u = Jt(e, o),
				c = String(o.identifier),
				f = Hd(c.toLowerCase());
			let d = 0;
			const g = [];
			for (; ++d <= e.footnoteCounts[c]; ) {
				const C = {
					type: 'element',
					tagName: 'a',
					properties: {
						href: '#' + e.clobberPrefix + 'fnref-' + f + (d > 1 ? '-' + d : ''),
						dataFootnoteBackref: !0,
						className: ['data-footnote-backref'],
						ariaLabel: e.footnoteBackLabel,
					},
					children: [
						{
							type: 'text',
							value: '↩',
						},
					],
				};
				d > 1 &&
					C.children.push({
						type: 'element',
						tagName: 'sup',
						children: [
							{
								type: 'text',
								value: String(d),
							},
						],
					}),
					g.length > 0 &&
						g.push({
							type: 'text',
							value: ' ',
						}),
					g.push(C);
			}
			const T = u[u.length - 1];
			if (T && T.type === 'element' && T.tagName === 'p') {
				const C = T.children[T.children.length - 1];
				C && C.type === 'text'
					? (C.value += ' ')
					: T.children.push({
							type: 'text',
							value: ' ',
					  }),
					T.children.push(...g);
			} else u.push(...g);
			const A = {
				type: 'element',
				tagName: 'li',
				properties: {
					id: e.clobberPrefix + 'fn-' + f,
				},
				children: Ar(u, !0),
			};
			o.position && (A.position = o.position), r.push(A);
		}
		return r.length === 0
			? null
			: {
					type: 'element',
					tagName: 'section',
					properties: {
						dataFootnotes: !0,
						className: ['footnotes'],
					},
					children: [
						{
							type: 'element',
							tagName: 'h2',
							properties: {
								id: 'footnote-label',
								className: ['sr-only'],
							},
							children: [Mt('text', e.footnoteLabel)],
						},
						{
							type: 'text',
							value: `
`,
						},
						{
							type: 'element',
							tagName: 'ol',
							properties: {},
							children: Ar(r, !0),
						},
						{
							type: 'text',
							value: `
`,
						},
					],
			  };
	}
	function i3(e, t) {
		return e(t, 'blockquote', Ar(Jt(e, t), !0));
	}
	function o3(e, t) {
		return [
			e(t, 'br'),
			Mt(
				'text',
				`
`
			),
		];
	}
	function s3(e, t) {
		const r = t.value
				? t.value +
				  `
`
				: '',
			o = t.lang && t.lang.match(/^[^ \t]+(?=[ \t]|$)/),
			u = {};
		o && (u.className = ['language-' + o]);
		const c = e(t, 'code', u, [Mt('text', r)]);
		return (
			t.meta &&
				(c.data = {
					meta: t.meta,
				}),
			e(t.position, 'pre', [c])
		);
	}
	function a3(e, t) {
		return e(t, 'del', Jt(e, t));
	}
	function l3(e, t) {
		return e(t, 'em', Jt(e, t));
	}
	function Bd(e, t) {
		const r = String(t.identifier),
			o = Hd(r.toLowerCase()),
			u = e.footnoteOrder.indexOf(r);
		let c;
		u === -1
			? (e.footnoteOrder.push(r),
			  (e.footnoteCounts[r] = 1),
			  (c = e.footnoteOrder.length))
			: (e.footnoteCounts[r]++, (c = u + 1));
		const f = e.footnoteCounts[r];
		return e(t, 'sup', [
			e(
				t.position,
				'a',
				{
					href: '#' + e.clobberPrefix + 'fn-' + o,
					id: e.clobberPrefix + 'fnref-' + o + (f > 1 ? '-' + f : ''),
					dataFootnoteRef: !0,
					ariaDescribedBy: 'footnote-label',
				},
				[Mt('text', String(c))]
			),
		]);
	}
	function u3(e, t) {
		const r = e.footnoteById;
		let o = 1;
		for (; o in r; ) o++;
		const u = String(o);
		return (
			(r[u] = {
				type: 'footnoteDefinition',
				identifier: u,
				children: [
					{
						type: 'paragraph',
						children: t.children,
					},
				],
				position: t.position,
			}),
			Bd(e, {
				type: 'footnoteReference',
				identifier: u,
				position: t.position,
			})
		);
	}
	function c3(e, t) {
		return e(t, 'h' + t.depth, Jt(e, t));
	}
	function f3(e, t) {
		return e.dangerous ? e.augment(t, Mt('raw', t.value)) : null;
	}
	var Ud = {};
	function h3(e) {
		var t,
			r,
			o = Ud[e];
		if (o) return o;
		for (o = Ud[e] = [], t = 0; t < 128; t++)
			(r = String.fromCharCode(t)),
				/^[0-9a-z]$/i.test(r)
					? o.push(r)
					: o.push('%' + ('0' + t.toString(16).toUpperCase()).slice(-2));
		for (t = 0; t < e.length; t++) o[e.charCodeAt(t)] = e[t];
		return o;
	}
	function js(e, t, r) {
		var o,
			u,
			c,
			f,
			d,
			g = '';
		for (
			typeof t != 'string' && ((r = t), (t = js.defaultChars)),
				typeof r == 'undefined' && (r = !0),
				d = h3(t),
				o = 0,
				u = e.length;
			o < u;
			o++
		) {
			if (
				((c = e.charCodeAt(o)),
				r &&
					c === 37 &&
					o + 2 < u &&
					/^[0-9a-f]{2}$/i.test(e.slice(o + 1, o + 3)))
			) {
				(g += e.slice(o, o + 3)), (o += 2);
				continue;
			}
			if (c < 128) {
				g += d[c];
				continue;
			}
			if (c >= 55296 && c <= 57343) {
				if (
					c >= 55296 &&
					c <= 56319 &&
					o + 1 < u &&
					((f = e.charCodeAt(o + 1)), f >= 56320 && f <= 57343)
				) {
					(g += encodeURIComponent(e[o] + e[o + 1])), o++;
					continue;
				}
				g += '%EF%BF%BD';
				continue;
			}
			g += encodeURIComponent(e[o]);
		}
		return g;
	}
	(js.defaultChars = ";/?:@&=+$,-_.!~*'()#"), (js.componentChars = "-_.!~*'()");
	var Ys = js;
	function Gd(e, t) {
		const r = t.referenceType;
		let o = ']';
		if (
			(r === 'collapsed'
				? (o += '[]')
				: r === 'full' && (o += '[' + (t.label || t.identifier) + ']'),
			t.type === 'imageReference')
		)
			return Mt('text', '![' + t.alt + o);
		const u = Jt(e, t),
			c = u[0];
		c && c.type === 'text'
			? (c.value = '[' + c.value)
			: u.unshift(Mt('text', '['));
		const f = u[u.length - 1];
		return f && f.type === 'text' ? (f.value += o) : u.push(Mt('text', o)), u;
	}
	function d3(e, t) {
		const r = e.definition(t.identifier);
		if (!r) return Gd(e, t);
		const o = {
			src: Ys(r.url || ''),
			alt: t.alt,
		};
		return (
			r.title !== null && r.title !== void 0 && (o.title = r.title),
			e(t, 'img', o)
		);
	}
	function p3(e, t) {
		const r = {
			src: Ys(t.url),
			alt: t.alt,
		};
		return (
			t.title !== null && t.title !== void 0 && (r.title = t.title),
			e(t, 'img', r)
		);
	}
	function g3(e, t) {
		return e(t, 'code', [Mt('text', t.value.replace(/\r?\n|\r/g, ' '))]);
	}
	function m3(e, t) {
		const r = e.definition(t.identifier);
		if (!r) return Gd(e, t);
		const o = {
			href: Ys(r.url || ''),
		};
		return (
			r.title !== null && r.title !== void 0 && (o.title = r.title),
			e(t, 'a', o, Jt(e, t))
		);
	}
	function T3(e, t) {
		const r = {
			href: Ys(t.url),
		};
		return (
			t.title !== null && t.title !== void 0 && (r.title = t.title),
			e(t, 'a', r, Jt(e, t))
		);
	}
	function E3(e, t, r) {
		const o = Jt(e, t),
			u = r ? v3(r) : zd(t),
			c = {},
			f = [];
		if (typeof t.checked == 'boolean') {
			let T;
			o[0] && o[0].type === 'element' && o[0].tagName === 'p'
				? (T = o[0])
				: ((T = e(null, 'p', [])), o.unshift(T)),
				T.children.length > 0 && T.children.unshift(Mt('text', ' ')),
				T.children.unshift(
					e(null, 'input', {
						type: 'checkbox',
						checked: t.checked,
						disabled: !0,
					})
				),
				(c.className = ['task-list-item']);
		}
		let d = -1;
		for (; ++d < o.length; ) {
			const T = o[d];
			(u || d !== 0 || T.type !== 'element' || T.tagName !== 'p') &&
				f.push(
					Mt(
						'text',
						`
`
					)
				),
				T.type === 'element' && T.tagName === 'p' && !u
					? f.push(...T.children)
					: f.push(T);
		}
		const g = o[o.length - 1];
		return (
			g &&
				(u || !('tagName' in g) || g.tagName !== 'p') &&
				f.push(
					Mt(
						'text',
						`
`
					)
				),
			e(t, 'li', c, f)
		);
	}
	function v3(e) {
		let t = e.spread;
		const r = e.children;
		let o = -1;
		for (; !t && ++o < r.length; ) t = zd(r[o]);
		return !!t;
	}
	function zd(e) {
		const t = e.spread;
		return t == null ? e.children.length > 1 : t;
	}
	function y3(e, t) {
		const r = {},
			o = t.ordered ? 'ol' : 'ul',
			u = Jt(e, t);
		let c = -1;
		for (
			typeof t.start == 'number' && t.start !== 1 && (r.start = t.start);
			++c < u.length;

		) {
			const f = u[c];
			if (
				f.type === 'element' &&
				f.tagName === 'li' &&
				f.properties &&
				Array.isArray(f.properties.className) &&
				f.properties.className.includes('task-list-item')
			) {
				r.className = ['contains-task-list'];
				break;
			}
		}
		return e(t, o, r, Ar(u, !0));
	}
	function A3(e, t) {
		return e(t, 'p', Jt(e, t));
	}
	function _3(e, t) {
		return e.augment(t, Mt('root', Ar(Jt(e, t))));
	}
	function C3(e, t) {
		return e(t, 'strong', Jt(e, t));
	}
	function S3(e, t) {
		const r = t.children;
		let o = -1;
		const u = t.align || [],
			c = [];
		for (; ++o < r.length; ) {
			const f = r[o].children,
				d = o === 0 ? 'th' : 'td',
				g = [];
			let T = -1;
			const A = t.align ? u.length : f.length;
			for (; ++T < A; ) {
				const C = f[T];
				g.push(
					e(
						C,
						d,
						{
							align: u[T],
						},
						C ? Jt(e, C) : []
					)
				);
			}
			c[o] = e(r[o], 'tr', Ar(g, !0));
		}
		return e(
			t,
			'table',
			Ar(
				[e(c[0].position, 'thead', Ar([c[0]], !0))].concat(
					c[1]
						? e(
								{
									start: Hs(c[1]),
									end: kl(c[c.length - 1]),
								},
								'tbody',
								Ar(c.slice(1), !0)
						  )
						: []
				),
				!0
			)
		);
	}
	function b3(e, t) {
		return e.augment(
			t,
			Mt('text', String(t.value).replace(/[ \t]*(\r?\n|\r)[ \t]*/g, '$1'))
		);
	}
	function N3(e, t) {
		return e(t, 'hr');
	}
	const x3 = {
		blockquote: i3,
		break: o3,
		code: s3,
		delete: a3,
		emphasis: l3,
		footnoteReference: Bd,
		footnote: u3,
		heading: c3,
		html: f3,
		imageReference: d3,
		image: p3,
		inlineCode: g3,
		linkReference: m3,
		link: T3,
		listItem: E3,
		list: y3,
		paragraph: A3,
		root: _3,
		strong: C3,
		table: S3,
		text: b3,
		thematicBreak: N3,
		toml: qs,
		yaml: qs,
		definition: qs,
		footnoteDefinition: qs,
	};
	function qs() {
		return null;
	}
	const k3 = {}.hasOwnProperty;
	function O3(e, t) {
		const r = t || {},
			o = r.allowDangerousHtml || !1,
			u = {};
		return (
			(f.dangerous = o),
			(f.clobberPrefix =
				r.clobberPrefix === void 0 || r.clobberPrefix === null
					? 'user-content-'
					: r.clobberPrefix),
			(f.footnoteLabel = r.footnoteLabel || 'Footnotes'),
			(f.footnoteBackLabel = r.footnoteBackLabel || 'Back to content'),
			(f.definition = $6(e)),
			(f.footnoteById = u),
			(f.footnoteOrder = []),
			(f.footnoteCounts = {}),
			(f.augment = c),
			(f.handlers = {
				...x3,
				...r.handlers,
			}),
			(f.unknownHandler = r.unknownHandler),
			(f.passThrough = r.passThrough),
			Da(e, 'footnoteDefinition', (d) => {
				const g = String(d.identifier).toUpperCase();
				k3.call(u, g) || (u[g] = d);
			}),
			f
		);
		function c(d, g) {
			if (d && 'data' in d && d.data) {
				const T = d.data;
				T.hName &&
					(g.type !== 'element' &&
						(g = {
							type: 'element',
							tagName: '',
							properties: {},
							children: [],
						}),
					(g.tagName = T.hName)),
					g.type === 'element' &&
						T.hProperties &&
						(g.properties = {
							...g.properties,
							...T.hProperties,
						}),
					'children' in g &&
						g.children &&
						T.hChildren &&
						(g.children = T.hChildren);
			}
			if (d) {
				const T =
					'type' in d
						? d
						: {
								position: d,
						  };
				q6(T) ||
					(g.position = {
						start: Hs(T),
						end: kl(T),
					});
			}
			return g;
		}
		function f(d, g, T, A) {
			return (
				Array.isArray(T) && ((A = T), (T = {})),
				c(d, {
					type: 'element',
					tagName: g,
					properties: T || {},
					children: A || [],
				})
			);
		}
	}
	function Wd(e, t) {
		const r = O3(e, t),
			o = Rd(r, e, null),
			u = r3(r);
		return (
			u &&
				o.children.push(
					Mt(
						'text',
						`
`
					),
					u
				),
			Array.isArray(o)
				? {
						type: 'root',
						children: o,
				  }
				: o
		);
	}
	const w3 = function (e, t) {
		return e && 'run' in e ? L3(e, t) : I3(e || t);
	};
	function L3(e, t) {
		return (r, o, u) => {
			e.run(Wd(r, t), o, (c) => {
				u(c);
			});
		};
	}
	function I3(e) {
		return (t) => Wd(t, e);
	}
	function Kd(e) {
		if (e) throw e;
	}
	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
	var jd = function (t) {
			return (
				t != null &&
				t.constructor != null &&
				typeof t.constructor.isBuffer == 'function' &&
				t.constructor.isBuffer(t)
			);
		},
		Xs = Object.prototype.hasOwnProperty,
		Yd = Object.prototype.toString,
		qd = Object.defineProperty,
		Xd = Object.getOwnPropertyDescriptor,
		Qd = function (t) {
			return typeof Array.isArray == 'function'
				? Array.isArray(t)
				: Yd.call(t) === '[object Array]';
		},
		Vd = function (t) {
			if (!t || Yd.call(t) !== '[object Object]') return !1;
			var r = Xs.call(t, 'constructor'),
				o =
					t.constructor &&
					t.constructor.prototype &&
					Xs.call(t.constructor.prototype, 'isPrototypeOf');
			if (t.constructor && !r && !o) return !1;
			var u;
			for (u in t);
			return typeof u == 'undefined' || Xs.call(t, u);
		},
		Zd = function (t, r) {
			qd && r.name === '__proto__'
				? qd(t, r.name, {
						enumerable: !0,
						configurable: !0,
						value: r.newValue,
						writable: !0,
				  })
				: (t[r.name] = r.newValue);
		},
		Jd = function (t, r) {
			if (r === '__proto__')
				if (Xs.call(t, r)) {
					if (Xd) return Xd(t, r).value;
				} else return;
			return t[r];
		},
		$d = function e() {
			var t,
				r,
				o,
				u,
				c,
				f,
				d = arguments[0],
				g = 1,
				T = arguments.length,
				A = !1;
			for (
				typeof d == 'boolean' && ((A = d), (d = arguments[1] || {}), (g = 2)),
					(d == null || (typeof d != 'object' && typeof d != 'function')) &&
						(d = {});
				g < T;
				++g
			)
				if (((t = arguments[g]), t != null))
					for (r in t)
						(o = Jd(d, r)),
							(u = Jd(t, r)),
							d !== u &&
								(A && u && (Vd(u) || (c = Qd(u)))
									? (c
											? ((c = !1), (f = o && Qd(o) ? o : []))
											: (f = o && Vd(o) ? o : {}),
									  Zd(d, {
											name: r,
											newValue: e(A, f, u),
									  }))
									: typeof u != 'undefined' &&
									  Zd(d, {
											name: r,
											newValue: u,
									  }));
			return d;
		};
	function $l(e) {
		if (Object.prototype.toString.call(e) !== '[object Object]') return !1;
		const t = Object.getPrototypeOf(e);
		return t === null || t === Object.prototype;
	}
	function M3() {
		const e = [],
			t = {
				run: r,
				use: o,
			};
		return t;
		function r(...u) {
			let c = -1;
			const f = u.pop();
			if (typeof f != 'function')
				throw new TypeError('Expected function as last argument, not ' + f);
			d(null, ...u);
			function d(g, ...T) {
				const A = e[++c];
				let C = -1;
				if (g) {
					f(g);
					return;
				}
				for (; ++C < u.length; )
					(T[C] === null || T[C] === void 0) && (T[C] = u[C]);
				(u = T), A ? R3(A, d)(...T) : f(null, ...T);
			}
		}
		function o(u) {
			if (typeof u != 'function')
				throw new TypeError('Expected `middelware` to be a function, not ' + u);
			return e.push(u), t;
		}
	}
	function R3(e, t) {
		let r;
		return o;
		function o(...f) {
			const d = e.length > f.length;
			let g;
			d && f.push(u);
			try {
				g = e.apply(this, f);
			} catch (T) {
				const A = T;
				if (d && r) throw A;
				return u(A);
			}
			d ||
				(g instanceof Promise
					? g.then(c, u)
					: g instanceof Error
					? u(g)
					: c(g));
		}
		function u(f, ...d) {
			r || ((r = !0), t(f, ...d));
		}
		function c(f) {
			u(null, f);
		}
	}
	class Dn extends Error {
		constructor(t, r, o) {
			const u = [null, null];
			let c = {
				start: {
					line: null,
					column: null,
				},
				end: {
					line: null,
					column: null,
				},
			};
			if (
				(super(),
				typeof r == 'string' && ((o = r), (r = void 0)),
				typeof o == 'string')
			) {
				const f = o.indexOf(':');
				f === -1
					? (u[1] = o)
					: ((u[0] = o.slice(0, f)), (u[1] = o.slice(f + 1)));
			}
			r &&
				('type' in r || 'position' in r
					? r.position && (c = r.position)
					: 'start' in r || 'end' in r
					? (c = r)
					: ('line' in r || 'column' in r) && (c.start = r)),
				(this.name = ho(r) || '1:1'),
				(this.message = typeof t == 'object' ? t.message : t),
				(this.stack = ''),
				typeof t == 'object' && t.stack && (this.stack = t.stack),
				(this.reason = this.message),
				this.fatal,
				(this.line = c.start.line),
				(this.column = c.start.column),
				(this.position = c),
				(this.source = u[0]),
				(this.ruleId = u[1]),
				this.file,
				this.actual,
				this.expected,
				this.url,
				this.note;
		}
	}
	(Dn.prototype.file = ''),
		(Dn.prototype.name = ''),
		(Dn.prototype.reason = ''),
		(Dn.prototype.message = ''),
		(Dn.prototype.stack = ''),
		(Dn.prototype.fatal = null),
		(Dn.prototype.column = null),
		(Dn.prototype.line = null),
		(Dn.prototype.source = null),
		(Dn.prototype.ruleId = null),
		(Dn.prototype.position = null);
	const ir = {
		basename: D3,
		dirname: P3,
		extname: F3,
		join: H3,
		sep: '/',
	};
	function D3(e, t) {
		if (t !== void 0 && typeof t != 'string')
			throw new TypeError('"ext" argument must be a string');
		po(e);
		let r = 0,
			o = -1,
			u = e.length,
			c;
		if (t === void 0 || t.length === 0 || t.length > e.length) {
			for (; u--; )
				if (e.charCodeAt(u) === 47) {
					if (c) {
						r = u + 1;
						break;
					}
				} else o < 0 && ((c = !0), (o = u + 1));
			return o < 0 ? '' : e.slice(r, o);
		}
		if (t === e) return '';
		let f = -1,
			d = t.length - 1;
		for (; u--; )
			if (e.charCodeAt(u) === 47) {
				if (c) {
					r = u + 1;
					break;
				}
			} else
				f < 0 && ((c = !0), (f = u + 1)),
					d > -1 &&
						(e.charCodeAt(u) === t.charCodeAt(d--)
							? d < 0 && (o = u)
							: ((d = -1), (o = f)));
		return r === o ? (o = f) : o < 0 && (o = e.length), e.slice(r, o);
	}
	function P3(e) {
		if ((po(e), e.length === 0)) return '.';
		let t = -1,
			r = e.length,
			o;
		for (; --r; )
			if (e.charCodeAt(r) === 47) {
				if (o) {
					t = r;
					break;
				}
			} else o || (o = !0);
		return t < 0
			? e.charCodeAt(0) === 47
				? '/'
				: '.'
			: t === 1 && e.charCodeAt(0) === 47
			? '//'
			: e.slice(0, t);
	}
	function F3(e) {
		po(e);
		let t = e.length,
			r = -1,
			o = 0,
			u = -1,
			c = 0,
			f;
		for (; t--; ) {
			const d = e.charCodeAt(t);
			if (d === 47) {
				if (f) {
					o = t + 1;
					break;
				}
				continue;
			}
			r < 0 && ((f = !0), (r = t + 1)),
				d === 46 ? (u < 0 ? (u = t) : c !== 1 && (c = 1)) : u > -1 && (c = -1);
		}
		return u < 0 || r < 0 || c === 0 || (c === 1 && u === r - 1 && u === o + 1)
			? ''
			: e.slice(u, r);
	}
	function H3(...e) {
		let t = -1,
			r;
		for (; ++t < e.length; )
			po(e[t]), e[t] && (r = r === void 0 ? e[t] : r + '/' + e[t]);
		return r === void 0 ? '.' : B3(r);
	}
	function B3(e) {
		po(e);
		const t = e.charCodeAt(0) === 47;
		let r = U3(e, !t);
		return (
			r.length === 0 && !t && (r = '.'),
			r.length > 0 && e.charCodeAt(e.length - 1) === 47 && (r += '/'),
			t ? '/' + r : r
		);
	}
	function U3(e, t) {
		let r = '',
			o = 0,
			u = -1,
			c = 0,
			f = -1,
			d,
			g;
		for (; ++f <= e.length; ) {
			if (f < e.length) d = e.charCodeAt(f);
			else {
				if (d === 47) break;
				d = 47;
			}
			if (d === 47) {
				if (!(u === f - 1 || c === 1))
					if (u !== f - 1 && c === 2) {
						if (
							r.length < 2 ||
							o !== 2 ||
							r.charCodeAt(r.length - 1) !== 46 ||
							r.charCodeAt(r.length - 2) !== 46
						) {
							if (r.length > 2) {
								if (((g = r.lastIndexOf('/')), g !== r.length - 1)) {
									g < 0
										? ((r = ''), (o = 0))
										: ((r = r.slice(0, g)),
										  (o = r.length - 1 - r.lastIndexOf('/'))),
										(u = f),
										(c = 0);
									continue;
								}
							} else if (r.length > 0) {
								(r = ''), (o = 0), (u = f), (c = 0);
								continue;
							}
						}
						t && ((r = r.length > 0 ? r + '/..' : '..'), (o = 2));
					} else
						r.length > 0
							? (r += '/' + e.slice(u + 1, f))
							: (r = e.slice(u + 1, f)),
							(o = f - u - 1);
				(u = f), (c = 0);
			} else d === 46 && c > -1 ? c++ : (c = -1);
		}
		return r;
	}
	function po(e) {
		if (typeof e != 'string')
			throw new TypeError(
				'Path must be a string. Received ' + JSON.stringify(e)
			);
	}
	const G3 = {
		cwd: z3,
	};
	function z3() {
		return '/';
	}
	function eu(e) {
		return e !== null && typeof e == 'object' && e.href && e.origin;
	}
	function W3(e) {
		if (typeof e == 'string') e = new URL(e);
		else if (!eu(e)) {
			const t = new TypeError(
				'The "path" argument must be of type string or an instance of URL. Received `' +
					e +
					'`'
			);
			throw ((t.code = 'ERR_INVALID_ARG_TYPE'), t);
		}
		if (e.protocol !== 'file:') {
			const t = new TypeError('The URL must be of scheme file');
			throw ((t.code = 'ERR_INVALID_URL_SCHEME'), t);
		}
		return K3(e);
	}
	function K3(e) {
		if (e.hostname !== '') {
			const o = new TypeError(
				'File URL host must be "localhost" or empty on darwin'
			);
			throw ((o.code = 'ERR_INVALID_FILE_URL_HOST'), o);
		}
		const t = e.pathname;
		let r = -1;
		for (; ++r < t.length; )
			if (t.charCodeAt(r) === 37 && t.charCodeAt(r + 1) === 50) {
				const o = t.charCodeAt(r + 2);
				if (o === 70 || o === 102) {
					const u = new TypeError(
						'File URL path must not include encoded / characters'
					);
					throw ((u.code = 'ERR_INVALID_FILE_URL_PATH'), u);
				}
			}
		return decodeURIComponent(t);
	}
	const tu = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];
	class j3 {
		constructor(t) {
			let r;
			t
				? typeof t == 'string' || Y3(t)
					? (r = {
							value: t,
					  })
					: eu(t)
					? (r = {
							path: t,
					  })
					: (r = t)
				: (r = {}),
				(this.data = {}),
				(this.messages = []),
				(this.history = []),
				(this.cwd = G3.cwd()),
				this.value,
				this.stored,
				this.result,
				this.map;
			let o = -1;
			for (; ++o < tu.length; ) {
				const c = tu[o];
				c in r &&
					r[c] !== void 0 &&
					r[c] !== null &&
					(this[c] = c === 'history' ? [...r[c]] : r[c]);
			}
			let u;
			for (u in r) tu.includes(u) || (this[u] = r[u]);
		}
		get path() {
			return this.history[this.history.length - 1];
		}
		set path(t) {
			eu(t) && (t = W3(t)),
				ru(t, 'path'),
				this.path !== t && this.history.push(t);
		}
		get dirname() {
			return typeof this.path == 'string' ? ir.dirname(this.path) : void 0;
		}
		set dirname(t) {
			ep(this.basename, 'dirname'),
				(this.path = ir.join(t || '', this.basename));
		}
		get basename() {
			return typeof this.path == 'string' ? ir.basename(this.path) : void 0;
		}
		set basename(t) {
			ru(t, 'basename'),
				nu(t, 'basename'),
				(this.path = ir.join(this.dirname || '', t));
		}
		get extname() {
			return typeof this.path == 'string' ? ir.extname(this.path) : void 0;
		}
		set extname(t) {
			if ((nu(t, 'extname'), ep(this.dirname, 'extname'), t)) {
				if (t.charCodeAt(0) !== 46)
					throw new Error('`extname` must start with `.`');
				if (t.includes('.', 1))
					throw new Error('`extname` cannot contain multiple dots');
			}
			this.path = ir.join(this.dirname, this.stem + (t || ''));
		}
		get stem() {
			return typeof this.path == 'string'
				? ir.basename(this.path, this.extname)
				: void 0;
		}
		set stem(t) {
			ru(t, 'stem'),
				nu(t, 'stem'),
				(this.path = ir.join(this.dirname || '', t + (this.extname || '')));
		}
		toString(t) {
			return (this.value || '').toString(t || void 0);
		}
		message(t, r, o) {
			const u = new Dn(t, r, o);
			return (
				this.path &&
					((u.name = this.path + ':' + u.name), (u.file = this.path)),
				(u.fatal = !1),
				this.messages.push(u),
				u
			);
		}
		info(t, r, o) {
			const u = this.message(t, r, o);
			return (u.fatal = null), u;
		}
		fail(t, r, o) {
			const u = this.message(t, r, o);
			throw ((u.fatal = !0), u);
		}
	}
	function nu(e, t) {
		if (e && e.includes(ir.sep))
			throw new Error(
				'`' + t + '` cannot be a path: did not expect `' + ir.sep + '`'
			);
	}
	function ru(e, t) {
		if (!e) throw new Error('`' + t + '` cannot be empty');
	}
	function ep(e, t) {
		if (!e)
			throw new Error('Setting `' + t + '` requires `path` to be set too');
	}
	function Y3(e) {
		return jd(e);
	}
	const q3 = np().freeze(),
		tp = {}.hasOwnProperty;
	function np() {
		const e = M3(),
			t = [];
		let r = {},
			o,
			u = -1;
		return (
			(c.data = f),
			(c.Parser = void 0),
			(c.Compiler = void 0),
			(c.freeze = d),
			(c.attachers = t),
			(c.use = g),
			(c.parse = T),
			(c.stringify = A),
			(c.run = C),
			(c.runSync = M),
			(c.process = x),
			(c.processSync = S),
			c
		);
		function c() {
			const D = np();
			let P = -1;
			for (; ++P < t.length; ) D.use(...t[P]);
			return D.data($d(!0, {}, r)), D;
		}
		function f(D, P) {
			return typeof D == 'string'
				? arguments.length === 2
					? (su('data', o), (r[D] = P), c)
					: (tp.call(r, D) && r[D]) || null
				: D
				? (su('data', o), (r = D), c)
				: r;
		}
		function d() {
			if (o) return c;
			for (; ++u < t.length; ) {
				const [D, ...P] = t[u];
				if (P[0] === !1) continue;
				P[0] === !0 && (P[0] = void 0);
				const I = D.call(c, ...P);
				typeof I == 'function' && e.use(I);
			}
			return (o = !0), (u = Number.POSITIVE_INFINITY), c;
		}
		function g(D, ...P) {
			let I;
			if ((su('use', o), D != null))
				if (typeof D == 'function') Z(D, ...P);
				else if (typeof D == 'object') Array.isArray(D) ? w(D) : K(D);
				else throw new TypeError('Expected usable value, not `' + D + '`');
			return I && (r.settings = Object.assign(r.settings || {}, I)), c;
			function z(L) {
				if (typeof L == 'function') Z(L);
				else if (typeof L == 'object')
					if (Array.isArray(L)) {
						const [W, ...te] = L;
						Z(W, ...te);
					} else K(L);
				else throw new TypeError('Expected usable value, not `' + L + '`');
			}
			function K(L) {
				w(L.plugins), L.settings && (I = Object.assign(I || {}, L.settings));
			}
			function w(L) {
				let W = -1;
				if (L != null)
					if (Array.isArray(L))
						for (; ++W < L.length; ) {
							const te = L[W];
							z(te);
						}
					else
						throw new TypeError('Expected a list of plugins, not `' + L + '`');
			}
			function Z(L, W) {
				let te = -1,
					V;
				for (; ++te < t.length; )
					if (t[te][0] === L) {
						V = t[te];
						break;
					}
				V
					? ($l(V[1]) && $l(W) && (W = $d(!0, V[1], W)), (V[1] = W))
					: t.push([...arguments]);
			}
		}
		function T(D) {
			c.freeze();
			const P = go(D),
				I = c.Parser;
			return (
				iu('parse', I),
				rp(I, 'parse') ? new I(String(P), P).parse() : I(String(P), P)
			);
		}
		function A(D, P) {
			c.freeze();
			const I = go(P),
				z = c.Compiler;
			return (
				ou('stringify', z),
				ip(D),
				rp(z, 'compile') ? new z(D, I).compile() : z(D, I)
			);
		}
		function C(D, P, I) {
			if (
				(ip(D),
				c.freeze(),
				!I && typeof P == 'function' && ((I = P), (P = void 0)),
				!I)
			)
				return new Promise(z);
			z(null, I);
			function z(K, w) {
				e.run(D, go(P), Z);
				function Z(L, W, te) {
					(W = W || D), L ? w(L) : K ? K(W) : I(null, W, te);
				}
			}
		}
		function M(D, P) {
			let I, z;
			return c.run(D, P, K), op('runSync', 'run', z), I;
			function K(w, Z) {
				Kd(w), (I = Z), (z = !0);
			}
		}
		function x(D, P) {
			if ((c.freeze(), iu('process', c.Parser), ou('process', c.Compiler), !P))
				return new Promise(I);
			I(null, P);
			function I(z, K) {
				const w = go(D);
				c.run(c.parse(w), w, (L, W, te) => {
					if (L || !W || !te) Z(L);
					else {
						const V = c.stringify(W, te);
						V == null || (V3(V) ? (te.value = V) : (te.result = V)), Z(L, te);
					}
				});
				function Z(L, W) {
					L || !W ? K(L) : z ? z(W) : P(null, W);
				}
			}
		}
		function S(D) {
			let P;
			c.freeze(), iu('processSync', c.Parser), ou('processSync', c.Compiler);
			const I = go(D);
			return c.process(I, z), op('processSync', 'process', P), I;
			function z(K) {
				(P = !0), Kd(K);
			}
		}
	}
	function rp(e, t) {
		return (
			typeof e == 'function' &&
			e.prototype &&
			(X3(e.prototype) || t in e.prototype)
		);
	}
	function X3(e) {
		let t;
		for (t in e) if (tp.call(e, t)) return !0;
		return !1;
	}
	function iu(e, t) {
		if (typeof t != 'function')
			throw new TypeError('Cannot `' + e + '` without `Parser`');
	}
	function ou(e, t) {
		if (typeof t != 'function')
			throw new TypeError('Cannot `' + e + '` without `Compiler`');
	}
	function su(e, t) {
		if (t)
			throw new Error(
				'Cannot call `' +
					e +
					'` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
			);
	}
	function ip(e) {
		if (!$l(e) || typeof e.type != 'string')
			throw new TypeError('Expected node, got `' + e + '`');
	}
	function op(e, t, r) {
		if (!r)
			throw new Error('`' + e + '` finished async. Use `' + t + '` instead');
	}
	function go(e) {
		return Q3(e) ? e : new j3(e);
	}
	function Q3(e) {
		return !!(e && typeof e == 'object' && 'message' in e && 'messages' in e);
	}
	function V3(e) {
		return typeof e == 'string' || jd(e);
	}
	const Z3 = JSON.stringify($a);
	function sp({ sanitize: e, plugins: t, remarkRehype: r = {} }) {
		let o = q3().use(K6);
		t == null ||
			t.forEach(({ remark: c }) => {
				c && (o = c(o));
			}),
			(o = o
				.use(w3, {
					allowDangerousHtml: !0,
					...r,
				})
				.use(iE));
		let u = JSON.parse(Z3);
		return (
			u.attributes['*'].push('className'),
			typeof e == 'function' && (u = e(u)),
			(o = o.use(oE, u)),
			t == null ||
				t.forEach(({ rehype: c }) => {
					c && (o = c(o));
				}),
			o.use(VE)
		);
	}
	function J3(e) {
		let t;
		return {
			c() {
				(t = Re('div')), Ke(t, 'class', 'markdown-body');
			},
			m(r, o) {
				Ct(r, t, o), (t.innerHTML = e[1]), e[8](t);
			},
			p(r, [o]) {
				o & 2 && (t.innerHTML = r[1]);
			},
			i: En,
			o: En,
			d(r) {
				r && vt(t), e[8](null);
			},
		};
	}
	function $3(e, t, r) {
		let o;
		const u = R1();
		let { value: c = '' } = t,
			{ plugins: f = [] } = t,
			{ sanitize: d = void 0 } = t,
			{ remarkRehype: g = void 0 } = t,
			T,
			A = [];
		function C() {
			A = f.map((I) => {
				var z;
				return (z = I.viewerEffect) == null
					? void 0
					: z.call(I, {
							markdownBody: T,
							file: x,
					  });
			});
		}
		function M() {
			A.forEach((I) => (I == null ? void 0 : I()));
		}
		wa(() => {
			T.addEventListener('click', (I) => {
				var w;
				const z = I.target;
				if (z.tagName !== 'A') return;
				const K = z.getAttribute('href');
				K != null &&
					K.startsWith('#') &&
					((w = T.querySelector('#user-content-' + K.slice(1))) == null ||
						w.scrollIntoView());
			});
		}),
			dc(M);
		let x,
			S = 0;
		const D = () => (I, z) => {
			Vo().then(() => {
				u('hast', {
					hast: I,
					file: z,
				});
			});
		};
		v5(() => {
			M(), C();
		});
		function P(I) {
			ei[I ? 'unshift' : 'push'](() => {
				(T = I), r(0, T);
			});
		}
		return (
			(e.$$set = (I) => {
				'value' in I && r(2, (c = I.value)),
					'plugins' in I && r(3, (f = I.plugins)),
					'sanitize' in I && r(4, (d = I.sanitize)),
					'remarkRehype' in I && r(5, (g = I.remarkRehype));
			}),
			(e.$$.update = () => {
				if (e.$$.dirty & 188)
					try {
						r(
							6,
							(x = sp({
								sanitize: d,
								plugins: [
									...f,
									{
										rehype: (I) => I.use(D),
									},
								],
								remarkRehype: g,
							}).processSync(c))
						),
							r(7, S++, S);
					} catch (I) {
						console.error(I);
					}
				e.$$.dirty & 192 && r(1, (o = `${x}<!--${S}-->`));
			}),
			[T, o, c, f, d, g, x, S, P]
		);
	}
	class ap extends Bi {
		constructor(t) {
			super(),
				Hi(this, t, $3, J3, Xo, {
					value: 2,
					plugins: 3,
					sanitize: 4,
					remarkRehype: 5,
				});
		}
	}
	var e7 =
		typeof global == 'object' && global && global.Object === Object && global;
	const t7 = e7;
	var n7 = typeof self == 'object' && self && self.Object === Object && self,
		r7 = t7 || n7 || Function('return this')();
	const lp = r7;
	var i7 = lp.Symbol;
	const Qs = i7;
	var up = Object.prototype,
		o7 = up.hasOwnProperty,
		s7 = up.toString,
		mo = Qs ? Qs.toStringTag : void 0;
	function a7(e) {
		var t = o7.call(e, mo),
			r = e[mo];
		try {
			e[mo] = void 0;
			var o = !0;
		} catch {}
		var u = s7.call(e);
		return o && (t ? (e[mo] = r) : delete e[mo]), u;
	}
	var l7 = Object.prototype,
		u7 = l7.toString;
	function c7(e) {
		return u7.call(e);
	}
	var f7 = '[object Null]',
		h7 = '[object Undefined]',
		cp = Qs ? Qs.toStringTag : void 0;
	function d7(e) {
		return e == null
			? e === void 0
				? h7
				: f7
			: cp && cp in Object(e)
			? a7(e)
			: c7(e);
	}
	function p7(e) {
		return e != null && typeof e == 'object';
	}
	var g7 = '[object Symbol]';
	function m7(e) {
		return typeof e == 'symbol' || (p7(e) && d7(e) == g7);
	}
	var T7 = /\s/;
	function E7(e) {
		for (var t = e.length; t-- && T7.test(e.charAt(t)); );
		return t;
	}
	var v7 = /^\s+/;
	function y7(e) {
		return e && e.slice(0, E7(e) + 1).replace(v7, '');
	}
	function Vs(e) {
		var t = typeof e;
		return e != null && (t == 'object' || t == 'function');
	}
	var fp = 0 / 0,
		A7 = /^[-+]0x[0-9a-f]+$/i,
		_7 = /^0b[01]+$/i,
		C7 = /^0o[0-7]+$/i,
		S7 = parseInt;
	function hp(e) {
		if (typeof e == 'number') return e;
		if (m7(e)) return fp;
		if (Vs(e)) {
			var t = typeof e.valueOf == 'function' ? e.valueOf() : e;
			e = Vs(t) ? t + '' : t;
		}
		if (typeof e != 'string') return e === 0 ? e : +e;
		e = y7(e);
		var r = _7.test(e);
		return r || C7.test(e) ? S7(e.slice(2), r ? 2 : 8) : A7.test(e) ? fp : +e;
	}
	var b7 = function () {
		return lp.Date.now();
	};
	const au = b7;
	var N7 = 'Expected a function',
		x7 = Math.max,
		k7 = Math.min;
	function dp(e, t, r) {
		var o,
			u,
			c,
			f,
			d,
			g,
			T = 0,
			A = !1,
			C = !1,
			M = !0;
		if (typeof e != 'function') throw new TypeError(N7);
		(t = hp(t) || 0),
			Vs(r) &&
				((A = !!r.leading),
				(C = 'maxWait' in r),
				(c = C ? x7(hp(r.maxWait) || 0, t) : c),
				(M = 'trailing' in r ? !!r.trailing : M));
		function x(L) {
			var W = o,
				te = u;
			return (o = u = void 0), (T = L), (f = e.apply(te, W)), f;
		}
		function S(L) {
			return (T = L), (d = setTimeout(I, t)), A ? x(L) : f;
		}
		function D(L) {
			var W = L - g,
				te = L - T,
				V = t - W;
			return C ? k7(V, c - te) : V;
		}
		function P(L) {
			var W = L - g,
				te = L - T;
			return g === void 0 || W >= t || W < 0 || (C && te >= c);
		}
		function I() {
			var L = au();
			if (P(L)) return z(L);
			d = setTimeout(I, D(L));
		}
		function z(L) {
			return (d = void 0), M && o ? x(L) : ((o = u = void 0), f);
		}
		function K() {
			d !== void 0 && clearTimeout(d), (T = 0), (o = g = u = d = void 0);
		}
		function w() {
			return d === void 0 ? f : z(au());
		}
		function Z() {
			var L = au(),
				W = P(L);
			if (((o = arguments), (u = this), (g = L), W)) {
				if (d === void 0) return S(g);
				if (C) return clearTimeout(d), (d = setTimeout(I, t)), x(g);
			}
			return d === void 0 && (d = setTimeout(I, t)), f;
		}
		return (Z.cancel = K), (Z.flush = w), Z;
	}
	var O7 = 'Expected a function';
	function w7(e, t, r) {
		var o = !0,
			u = !0;
		if (typeof e != 'function') throw new TypeError(O7);
		return (
			Vs(r) &&
				((o = 'leading' in r ? !!r.leading : o),
				(u = 'trailing' in r ? !!r.trailing : u)),
			dp(e, t, {
				leading: o,
				maxWait: t,
				trailing: u,
			})
		);
	}
	function pp(e) {
		let t, r;
		return (
			(t = new ap({
				props: {
					value: e[16],
					plugins: e[1],
					sanitize: e[2],
					remarkRehype: e[3],
				},
			})),
			t.$on('hast', e[35]),
			{
				c() {
					D1(t.$$.fragment);
				},
				m(o, u) {
					Pi(t, o, u), (r = !0);
				},
				p(o, u) {
					const c = {};
					u[0] & 65536 && (c.value = o[16]),
						u[0] & 2 && (c.plugins = o[1]),
						u[0] & 4 && (c.sanitize = o[2]),
						u[0] & 8 && (c.remarkRehype = o[3]),
						t.$set(c);
				},
				i(o) {
					r || (cr(t.$$.fragment, o), (r = !0));
				},
				o(o) {
					ni(t.$$.fragment, o), (r = !1);
				},
				d(o) {
					Fi(t, o);
				},
			}
		);
	}
	function L7(e) {
		let t,
			r,
			o,
			u,
			c,
			f,
			d,
			g,
			T,
			A = ct.Close + '',
			C,
			M,
			x,
			S,
			D,
			P;
		(r = new jm({
			props: {
				context: e[10],
				split: e[11],
				activeTab: e[8],
				sidebar: e[9],
				fullscreen: e[15],
				rightAfferentActions: e[21].rightActions,
				locale: e[12],
				actions: e[21].leftActions,
			},
		})),
			r.$on('key', e[31]),
			r.$on('tab', e[32]),
			r.$on('click', e[33]);
		let I = !e[4] && (e[11] || e[8] === 'preview') && pp(e);
		return (
			(C = new G5({
				props: {
					locale: e[12],
					actions: e[21].leftActions,
					visible: e[9] === 'help',
				},
			})),
			(M = new rg({
				props: {
					hast: e[18],
					locale: e[12],
					currentBlockIndex: e[20],
					visible: e[9] === 'toc',
				},
			})),
			M.$on('click', e[39]),
			(x = new Y5({
				props: {
					locale: e[12],
					showSync: !e[4] && e[11],
					value: e[16],
					syncEnabled: e[17],
					islimited: e[0].length > e[5],
				},
			})),
			x.$on('sync', e[40]),
			x.$on('top', e[41]),
			{
				c() {
					(t = Re('div')),
						D1(r.$$.fragment),
						(o = Re('div')),
						(u = Re('div')),
						(f = Re('div')),
						I && I.c(),
						(g = Re('div')),
						(T = Re('div')),
						D1(C.$$.fragment),
						D1(M.$$.fragment),
						D1(x.$$.fragment),
						Ke(u, 'class', 'bytemd-editor'),
						Ke(u, 'style', (c = e[22].edit)),
						Ke(f, 'class', 'bytemd-preview'),
						Ke(f, 'style', (d = e[22].preview)),
						Ke(T, 'class', 'bytemd-sidebar-close'),
						Ke(g, 'class', 'bytemd-sidebar'),
						bt(g, 'bytemd-hidden', e[9] === !1),
						Ke(o, 'class', 'bytemd-body'),
						Ke(t, 'class', 'bytemd'),
						bt(t, 'bytemd-split', e[11] && e[8] === !1),
						bt(t, 'bytemd-fullscreen', e[15]);
				},
				m(z, K) {
					Ct(z, t, K),
						Pi(r, t, null),
						we(t, o),
						we(o, u),
						e[34](u),
						we(o, f),
						I && I.m(f, null),
						e[36](f),
						we(o, g),
						we(g, T),
						(T.innerHTML = A),
						Pi(C, g, null),
						Pi(M, g, null),
						Pi(x, t, null),
						e[42](t),
						(S = !0),
						D ||
							((P = [vn(T, 'click', e[37]), vn(T, 'keydown', Ii(e[38]))]),
							(D = !0));
				},
				p(z, K) {
					const w = {};
					K[0] & 1024 && (w.context = z[10]),
						K[0] & 2048 && (w.split = z[11]),
						K[0] & 256 && (w.activeTab = z[8]),
						K[0] & 512 && (w.sidebar = z[9]),
						K[0] & 32768 && (w.fullscreen = z[15]),
						K[0] & 2097152 && (w.rightAfferentActions = z[21].rightActions),
						K[0] & 4096 && (w.locale = z[12]),
						K[0] & 2097152 && (w.actions = z[21].leftActions),
						r.$set(w),
						(!S || (K[0] & 4194304 && c !== (c = z[22].edit))) &&
							Ke(u, 'style', c),
						!z[4] && (z[11] || z[8] === 'preview')
							? I
								? (I.p(z, K), K[0] & 2320 && cr(I, 1))
								: ((I = pp(z)), I.c(), cr(I, 1), I.m(f, null))
							: I &&
							  (_5(),
							  ni(I, 1, 1, () => {
									I = null;
							  }),
							  C5()),
						(!S || (K[0] & 4194304 && d !== (d = z[22].preview))) &&
							Ke(f, 'style', d);
					const Z = {};
					K[0] & 4096 && (Z.locale = z[12]),
						K[0] & 2097152 && (Z.actions = z[21].leftActions),
						K[0] & 512 && (Z.visible = z[9] === 'help'),
						C.$set(Z);
					const L = {};
					K[0] & 262144 && (L.hast = z[18]),
						K[0] & 4096 && (L.locale = z[12]),
						K[0] & 1048576 && (L.currentBlockIndex = z[20]),
						K[0] & 512 && (L.visible = z[9] === 'toc'),
						M.$set(L),
						(!S || K[0] & 512) && bt(g, 'bytemd-hidden', z[9] === !1);
					const W = {};
					K[0] & 4096 && (W.locale = z[12]),
						K[0] & 2064 && (W.showSync = !z[4] && z[11]),
						K[0] & 65536 && (W.value = z[16]),
						K[0] & 131072 && (W.syncEnabled = z[17]),
						K[0] & 33 && (W.islimited = z[0].length > z[5]),
						x.$set(W),
						(!S || K[0] & 2304) && bt(t, 'bytemd-split', z[11] && z[8] === !1),
						(!S || K[0] & 32768) && bt(t, 'bytemd-fullscreen', z[15]);
				},
				i(z) {
					S ||
						(cr(r.$$.fragment, z),
						cr(I),
						cr(C.$$.fragment, z),
						cr(M.$$.fragment, z),
						cr(x.$$.fragment, z),
						(S = !0));
				},
				o(z) {
					ni(r.$$.fragment, z),
						ni(I),
						ni(C.$$.fragment, z),
						ni(M.$$.fragment, z),
						ni(x.$$.fragment, z),
						(S = !1);
				},
				d(z) {
					z && vt(t),
						Fi(r),
						e[34](null),
						I && I.d(),
						e[36](null),
						Fi(C),
						Fi(M),
						Fi(x),
						e[42](null),
						(D = !1),
						Qn(P);
				},
			}
		);
	}
	function I7(e, t, r) {
		let o,
			u,
			c,
			f,
			d,
			{ value: g = '' } = t,
			{ plugins: T = [] } = t,
			{ sanitize: A = void 0 } = t,
			{ remarkRehype: C = void 0 } = t,
			{ mode: M = 'auto' } = t,
			{ previewDebounce: x = 300 } = t,
			{ placeholder: S = void 0 } = t,
			{ editorConfig: D = void 0 } = t,
			{ locale: P = void 0 } = t,
			{ uploadImages: I = void 0 } = t,
			{ overridePreview: z = void 0 } = t,
			{ maxLength: K = 1 / 0 } = t;
		const w = R1();
		let Z,
			L,
			W,
			te = 1 / 0,
			V,
			ae,
			X,
			G = !1,
			H = !1,
			J = [],
			Q = {};
		function se() {
			(J = T.map((ie) => {
				var Je;
				return (Je = ie.editorEffect) == null ? void 0 : Je.call(ie, d);
			})),
				(Q = {}),
				u.leftActions.forEach(({ handler: ie }) => {
					(ie == null ? void 0 : ie.type) === 'action' &&
						ie.shortcut &&
						(Q[ie.shortcut] = () => {
							ie.click(d);
						});
				}),
				ae.addKeyMap(Q);
		}
		function Ae() {
			J.forEach((ie) => ie && ie()), ae == null || ae.removeKeyMap(Q);
		}
		let _e = g;
		const Oe = dp((ie) => {
			r(16, (_e = ie)),
				z == null ||
					z(W, {
						value: _e,
						plugins: T,
						sanitize: A,
						remarkRehype: C,
					});
		}, x);
		let O = !0,
			E = !1,
			b = !1,
			Ce,
			fe,
			Ue = {
				type: 'root',
				children: [],
			},
			Pe,
			Ge = 0;
		wa(async () => {
			r(30, (V = P5())),
				r(
					7,
					(ae = V(L, {
						value: g,
						mode: 'yaml-frontmatter',
						lineWrapping: !0,
						tabSize: 8,
						indentUnit: 4,
						extraKeys: {
							Enter: 'newlineAndIndentContinueMarkdownList',
						},
						...D,
						placeholder: S,
					}))
				),
				ae.addKeyMap({
					Tab: 'indentMore',
					'Shift-Tab': 'indentLess',
				}),
				ae.on('change', () => {
					w('change', {
						value: ae.getValue(),
					});
				});
			const ie = w7(() => {
					(Ce = []), (fe = []);
					const lt = ae.getScrollInfo(),
						qe = W.childNodes[0];
					if (!(qe instanceof HTMLElement)) return;
					const et = Ue.children.filter((Y) => Y.type === 'element'),
						pt = [...qe.childNodes].filter((Y) => Y instanceof HTMLElement);
					for (let Y = 0; Y < et.length; Y++) {
						const pe = et[Y],
							Ne = pt[Y];
						if (!pe.position) continue;
						const Xe =
								ae.heightAtLine(pe.position.start.line - 1, 'local') /
								(lt.height - lt.clientHeight),
							Ee =
								(Ne.offsetTop - qe.offsetTop) /
								(W.scrollHeight - W.clientHeight);
						if (Xe >= 1 || Ee >= 1) break;
						Ce.push(Xe), fe.push(Ee);
					}
					Ce.push(1), fe.push(1);
				}, 1e3),
				Je = () => {
					if (z || !O) return;
					if (b) {
						b = !1;
						return;
					}
					ie();
					const lt = ae.getScrollInfo(),
						qe = lt.top / (lt.height - lt.clientHeight),
						et = Ra(qe, Ce),
						pt =
							((qe - Ce[et]) * (fe[et + 1] - fe[et])) / (Ce[et + 1] - Ce[et]) +
							fe[et];
					W.scrollTo(0, pt * (W.scrollHeight - W.clientHeight)), (E = !0);
				},
				Pn = () => {
					if (
						z ||
						(ie(),
						r(
							20,
							(Ge = Ra(W.scrollTop / (W.scrollHeight - W.offsetHeight), fe))
						),
						!O)
					)
						return;
					if (E) {
						E = !1;
						return;
					}
					const lt = W.scrollTop / (W.scrollHeight - W.clientHeight),
						qe = Ra(lt, fe),
						et =
							((lt - fe[qe]) * (Ce[qe + 1] - Ce[qe])) / (fe[qe + 1] - fe[qe]) +
							Ce[qe];
					if (isNaN(et)) return;
					const pt = ae.getScrollInfo();
					ae.scrollTo(0, et * (pt.height - pt.clientHeight)), (b = !0);
				};
			ae.on('scroll', Je),
				W.addEventListener('scroll', Pn, {
					passive: !0,
				});
			const en = async (lt, qe) => {
				if (!I) return;
				const et = Array.from(qe != null ? qe : [])
					.map((pt) => {
						if (pt.type.startsWith('image/')) return pt.getAsFile();
					})
					.filter((pt) => pt != null);
				et.length && (lt.preventDefault(), await vc(d, I, et));
			};
			ae.on('drop', async (lt, qe) => {
				var et;
				en(qe, (et = qe.dataTransfer) == null ? void 0 : et.items);
			}),
				ae.on('paste', async (lt, qe) => {
					var et;
					en(qe, (et = qe.clipboardData) == null ? void 0 : et.items);
				}),
				new ResizeObserver((lt) => {
					r(29, (te = lt[0].contentRect.width));
				}).observe(Z, {
					box: 'border-box',
				});
		}),
			dc(Ae);
		const Ve = (ie) => {
				ae.setOption('keyMap', ie.detail), ae.focus();
			},
			rt = (ie) => {
				const Je = ie.detail;
				c ? r(8, (X = X === Je ? !1 : Je)) : r(8, (X = Je)),
					X === 'write' &&
						Vo().then(() => {
							ae && ae.focus();
						}),
					Je === 'write' &&
						Vo().then(() => {
							ae && ae.setSize(null, null);
						});
			},
			Fe = (ie) => {
				switch (ie.detail) {
					case 'fullscreen':
						r(15, (G = !G));
						break;
					case 'help':
						r(9, (H = H === 'help' ? !1 : 'help'));
						break;
					case 'toc':
						r(9, (H = H === 'toc' ? !1 : 'toc'));
						break;
				}
			};
		function Ze(ie) {
			ei[ie ? 'unshift' : 'push'](() => {
				(L = ie), r(13, L);
			});
		}
		const qt = (ie) => {
			r(18, (Ue = ie.detail.hast)), r(19, (Pe = ie.detail.file));
		};
		function De(ie) {
			ei[ie ? 'unshift' : 'push'](() => {
				(W = ie), r(14, W);
			});
		}
		const Gt = () => {
				r(9, (H = !1));
			},
			Xt = (ie) => {
				['Enter', 'Space'].includes(ie.code) && r(9, (H = !1));
			},
			Rt = (ie) => {
				W.querySelectorAll('h1,h2,h3,h4,h5,h6')[ie.detail].scrollIntoView();
			},
			zt = (ie) => {
				r(17, (O = ie.detail));
			},
			$t = () => {
				ae.scrollTo(null, 0),
					W.scrollTo({
						top: 0,
					});
			};
		function Ot(ie) {
			ei[ie ? 'unshift' : 'push'](() => {
				(Z = ie), r(6, Z);
			});
		}
		return (
			(e.$$set = (ie) => {
				'value' in ie && r(0, (g = ie.value)),
					'plugins' in ie && r(1, (T = ie.plugins)),
					'sanitize' in ie && r(2, (A = ie.sanitize)),
					'remarkRehype' in ie && r(3, (C = ie.remarkRehype)),
					'mode' in ie && r(23, (M = ie.mode)),
					'previewDebounce' in ie && r(24, (x = ie.previewDebounce)),
					'placeholder' in ie && r(25, (S = ie.placeholder)),
					'editorConfig' in ie && r(26, (D = ie.editorConfig)),
					'locale' in ie && r(27, (P = ie.locale)),
					'uploadImages' in ie && r(28, (I = ie.uploadImages)),
					'overridePreview' in ie && r(4, (z = ie.overridePreview)),
					'maxLength' in ie && r(5, (K = ie.maxLength));
			}),
			(e.$$.update = () => {
				e.$$.dirty[0] & 134217728 &&
					r(
						12,
						(o = {
							...b5,
							...P,
						})
					),
					e.$$.dirty[0] & 268439554 && r(21, (u = H5(o, T, I))),
					e.$$.dirty[0] & 545259520 &&
						r(11, (c = M === 'split' || (M === 'auto' && te >= 800))),
					e.$$.dirty[0] & 2048 &&
						((ie) => {
							c && r(8, (X = !1));
						})(),
					e.$$.dirty[0] & 2816 &&
						r(
							22,
							(f = (() => {
								let ie, Je;
								return (
									c && X === !1
										? H
											? ((ie = `width:calc(50% - ${H ? 140 : 0}px)`),
											  (Je = `width:calc(50% - ${H ? 140 : 0}px)`))
											: ((ie = 'width:50%'), (Je = 'width:50%'))
										: X === 'preview'
										? ((ie = 'display:none'),
										  (Je = `width:calc(100% - ${H ? 280 : 0}px)`))
										: ((ie = `width:calc(100% - ${H ? 280 : 0}px)`),
										  (Je = 'display:none')),
									{
										edit: ie,
										preview: Je,
									}
								);
							})())
						),
					e.$$.dirty[0] & 1073742016 &&
						r(
							10,
							(d = (() => ({
								codemirror: V,
								editor: ae,
								root: Z,
								...F5(V, ae),
							}))())
						),
					e.$$.dirty[0] & 1 && Oe(g),
					e.$$.dirty[0] & 129 && ae && g !== ae.getValue() && ae.setValue(g),
					e.$$.dirty[0] & 130 &&
						ae &&
						T &&
						(Ae(),
						Vo().then(() => {
							se();
						}));
			}),
			[
				g,
				T,
				A,
				C,
				z,
				K,
				Z,
				ae,
				X,
				H,
				d,
				c,
				o,
				L,
				W,
				G,
				_e,
				O,
				Ue,
				Pe,
				Ge,
				u,
				f,
				M,
				x,
				S,
				D,
				P,
				I,
				te,
				V,
				Ve,
				rt,
				Fe,
				Ze,
				qt,
				De,
				Gt,
				Xt,
				Rt,
				zt,
				$t,
				Ot,
			]
		);
	}
	class M7 extends Bi {
		constructor(t) {
			super(),
				Hi(
					this,
					t,
					I7,
					L7,
					Xo,
					{
						value: 0,
						plugins: 1,
						sanitize: 2,
						remarkRehype: 3,
						mode: 23,
						previewDebounce: 24,
						placeholder: 25,
						editorConfig: 26,
						locale: 27,
						uploadImages: 28,
						overridePreview: 4,
						maxLength: 5,
					},
					null,
					[-1, -1]
				);
		}
	}
	(Or.Editor = M7),
		(Or.Viewer = ap),
		(Or.getProcessor = sp),
		Object.defineProperty(Or, Symbol.toStringTag, {
			value: 'Module',
		});
});
