var keys = {};
var hash = {};

// 1. 初始化数据
init();

// 2.生成键盘
generateKeyboard(keys, hash);

//3.监听键盘事件
listenKeyBoard();

function init() {
    keys = {
        '0': { 0: 'q', 1: 'w', 2: 'e', 3: 'r', 4: 't', 5: 'y', 6: 'u', 7: 'i', 8: 'o', 9: 'p', length: 10 },
        '1': { 0: 'a', 1: 's', 2: 'd', 3: 'f', 4: 'g', 5: 'h', 6: 'j', 7: 'k', 8: 'l', length: 9 },
        '2': { 0: 'z', 1: 'x', 2: 'c', 3: 'v', 4: 'b', 5: 'n', 6: 'm', length: 7 },
        'length': 3
    }

    hash = {'q': 'qq.com', 'w': 'weibo.com', 'e': 'ele.me', 'r': 'renren.com', 't': 'tianya.com', 'y': 'youtube.com', 'u': 'uc.com' , 'i': 'iqiyi.com', 'o': 'opera.com', 'p': undefined, 'a': 'acfun.tv', 's': 'sohu.com', 'z': 'zhihu.com', 'm': 'www.mcdonalds.com.cn'}

    var hashInStorage = getStorageData('hash');
    if (hashInStorage) {
        hash = hashInStorage
    }
}

function getStorageData(name) {
    return JSON.parse(localStorage.getItem(name) || 'null');
}

function setStorageData(name, data) {
    localStorage.setItem(name, JSON.stringify(data))
}

function createTag(tagName, attrs) {
    var tag = document.createElement(tagName);
    for (key in attrs) {
        tag[key] = attrs[key];
    }
    return tag;
}

function generateKeyboard(keys, hash) {
    for (var index = 0; index < keys.length; index++) {
        var rowDiv = createTag('div', { 'className': 'row' });
        var row = keys[index];
        for (var index2 = 0; index2 < row.length; index2++) {
            var span = createTag('span', { 'textContent': row[index2] });

            var button = createTag('button', {
                'id': row[index2],
                'textContent': '编辑',
                'onclick': function(event) {
                    var key = event.target.id;
                    x = prompt('请给我一个网址')
                    hash[key] = x;

                    var img = event.target.previousSibling;
                    img.src = 'http://'+ x + '/favicon.ico'
                    img.onerror = function(xxx){
                        xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
                    }
                    setStorageData('hash',hash);
                }
            });

            var domain = hash[row[index2]];
            var url = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
            if (domain) {
                url = 'http://' + domain + '/favicon.ico'
            }
            var img = createTag('img', {
                'src': url,
                'onerror': function(event) {
                    event.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
                }
            });

            var kbd = createTag('kbd', { 'className': 'key' });
            kbd.appendChild(span)
            kbd.appendChild(img)
            kbd.appendChild(button)

            rowDiv.appendChild(kbd);
        }
        keyboardWrapper.appendChild(rowDiv);
    }
}

function listenKeyBoard() {
    document.onkeypress = function(event) {
        var key = event.key;
        var url = hash[key];
        window.open('http://' + url, '_blank');
    }
}