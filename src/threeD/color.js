let HSV = [0, 1, 1];
function HSV2RGB(a) {
    let h = +a[0],
        s = +a[1],
        v = +a[2],
        r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    i = i || 0;
    q = q || 0;
    t = t || 0;
    switch (i % 6) {
        case 0:
            r = v;g = t;b = p;
            break;
        case 1:
            r = q; g = v; b = p;
            break;
        case 2:
            r = p; g = v; b = t;
            break;
        case 3:
            r = p; g = q; b = v;
            break;
        case 4:
            r = t; g = p; b = v;
            break;
        case 5:
            r = v; g = p; b = q;
            break;
    }
    return [round(r * 255), round(g * 255), round(b * 255)];
}
function RGB2HEX(a) {
    let s = +a[2] | (+a[1] << 8) | (+a[0] << 16);
    s = '000000' + s.toString(16);
    return s.slice(-6);
}
function round(i) {
    return Math.round(i);
}
function changeH(y,defaultHeight) {
    HSV[0] = (defaultHeight - y) / defaultHeight;
    return RGB2HEX(HSV2RGB(HSV));
}
function changeSV(x,y,defaultWidthAndHeight) {
    HSV[1] = 1 - ((defaultWidthAndHeight - x) / defaultWidthAndHeight);
    HSV[2] = (defaultWidthAndHeight - y) / defaultWidthAndHeight;
    return RGB2HEX(HSV2RGB(HSV))
}
function getHex(){
    return RGB2HEX(HSV2RGB(HSV))
}
function isHex(val){
    return true
}

export {isHex,changeH,changeSV,getHex}