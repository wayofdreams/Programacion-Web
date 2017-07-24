
const MYPATH = 'rafael';
function getBase() {
    var base;
    if (location.hostname == '45.55.65.103') {
        base = `${location.protocol}//${location.hostname}/${MYPATH}`;
    } else {
        base = location.origin;
    }
    return base;
}
