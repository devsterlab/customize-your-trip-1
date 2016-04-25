
class DOM {
    constructor() {
        if (DOM.instance) return DOM.instance;
        DOM.instance = this;

        this.handlers = new Map();
    }

    isElementInViewport (el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    _onVisibilityChange(el, callback) {
        var old_visible;
        return () => {
            var visible = this.isElementInViewport(el);
            if (visible != old_visible) {
                if (typeof callback == 'function') {
                    callback(visible, old_visible);
                }
                old_visible = visible;
            }
        };
    }

    onVisibilityChange(el, parent, callback) {
        var handler = this._onVisibilityChange(el, callback);
        parent && $(parent).on('DOMContentLoaded load resize scroll', handler);
        $(window).on('DOMContentLoaded load resize scroll', handler);
        this.handlers.set(el, handler);
        handler();
    }

    offVisibilityChange(el, parent) {
        parent && $(parent).off('DOMContentLoaded load resize scroll', this.handlers.get(el));
        $(window).off('DOMContentLoaded load resize scroll', this.handlers.get(el));
        this.handlers.delete(el);
    }
}

export default (new DOM());
