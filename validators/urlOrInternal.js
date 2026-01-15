    export const urlOrInternal = {
    validator: function (v) {
        if (!v) return true; // opcional
        // http(s)://...  o  /api/media/xxx...
        return /^https?:\/\//.test(v) || /^\/api\/media\/[a-z]+\/[A-Za-z0-9_\-]+$/.test(v);
    },
    message: function (props) {
        return `${props.path} debe ser una URL http(s) válida o una ruta interna /api/media/...`;
    },
    };