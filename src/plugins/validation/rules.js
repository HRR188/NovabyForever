export default {
    email: {
        regex: /.+@.+\..+/
    },
    required: {
        regex: /\S+/
    },
    url: {
        regex: /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[:?\d]*)\S*$/
    },
    password: {
        regex: /\w{6,}/
    }
}