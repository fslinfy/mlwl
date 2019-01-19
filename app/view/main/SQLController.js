Ext.require('Ext.slider.*');
Ext.define('MyApp.view.main.SQLController', {
	extend: 'Ext.Mixin',
	sqltest1: function () {
		console.log('sqltest1');
	}
	// 新增一条记录
	/*
	 addRecord : function(button) {
	 var grid = this.getView().down('modulegrid');
	 var model = Ext.create(grid.getStore().model);
	 model.set('tf_id', null); // 设置为null,可自动增加
	 grid.getStore().insert(0, model);
	 grid.getSelectionModel().select(model); // 选中当前新增的记录
	 }*/

});


sumjs = function (store1, store2, panel) {

	console.log(" controller sumjs");
	if (store2) {
		var je = 0, xjje = 0;

		store2.each(function (rec) {
			je = je + rec.data.je;
			if (rec.data.xjbz) {
				xjje = xjje + rec.data.je;
			}
		})
		panel.set('jcje', je);
		panel.set('xjje', xjje);
	}
	if (store1) {
		var sl = store1.sum('sl');
		panel.set('jcsl', sl);
		var zl = store1.sum('zl');

		panel.set('jczl', zl);

	}


};

sqltest2 = function () {
	console.log('sqltest2');

};

trim = function (str) {
	if (str == "")
		return ""
	for (var i = 0; i < str.length && str.charAt(i) == " "; i++);
	for (var j = str.length; j > 0 && str.charAt(j - 1) == " "; j--);
	if (i > j)
		return "";
	return str.substring(i, j);
};
jerenderer = function (value, cellmeta) {
	if (value == 0) {
		return "";
	}
	else {
		return Ext.util.Format.number(value, '0.00');
	}
};
zlrenderer = function (value, cellmeta) {
	if (value == 0) {
		return "";
	}
	else {
		return Ext.util.Format.number(value, '0.000');
	}
};
slrenderer = function (value, cellmeta) {
	if (value == 0) {
		return "";
	}
	else {
		if (Math.round(value) == value) {
			return Ext.util.Format.number(value, '0');
		}
		else {
			if (Math.round(value * 10) == 10 * value) {
				return Ext.util.Format.number(value, '0.0');
			}
			else {
				if (Math.round(value * 100) == 100 * value) {
					return Ext.util.Format.number(value, '0.00');
				}
				else {
					return Ext.util.Format.number(value, '0.000');
				}
			}
		}
	}
};
intrenderer = function (value, cellmeta) {
	if (value == 0) {
		return "";
	}
	else {
		return Ext.util.Format.number(value, '0');
	}
};
obj2str = function (o) {
	var r = [];
	if (typeof o == "string") {
		/*o = o.replace("'", "");
		o = o.replace('"', "");
		o = o.replace('\\', "");
		o = o.replace(',', "-");
		o = o.replace(':', "|");
		o = o.replace(/(n)/g, "\n").replace(/(r)/g, "\r").replace(/(t)/g, "\t");
		*/
		//return  o;
		return '"' + o + '"';
	}

	//    if (typeof o == "string") return '"'+o+ '"';
	if (o == null) return '""';
	if (typeof o == "string") return o;
	if (typeof o == "object") {
		if (!o.sort) {
			for (var i in o)
				r.push('"' + i + '":' + obj2str(o[i]));
			if (!!document.all && !/^n?functions*toString()s*{n?s*[native code]n?s*}n?s*$/.test(o.toString)) {
				r.push("toString:" + o.toString.toString());
			}
			r = "{" + r.join() + "}"
		} else {
			for (var i = 0; i < o.length; i++)
				r.push(obj2str(o[i]))
			r = "[" + r.join() + "]"
		}
		return r;
	}
	return o.toString();
};


obj2str0 = function (o) {
	var r = [];
	if (o == null) {
		return "";
	}
	if (typeof o == "string") {
		return o;
	}
	if (typeof o == "object") {
		if (!o.sort) {
			r[0] = "{"
			for (var i in o) {
				//	console.log(i,o[i]);

				r[r.length] = i;
				r[r.length] = ":";
				r[r.length] = obj2str(o[i]);

				r[r.length] = ",";
			}
			r[r.length - 1] = "}"
		} else {
			if (o.length == 0) return "";

			r[0] = "["
			for (var i = 0; i < o.length; i++) {
				//console.log("row",i);
				//console.log(o[i]);
				r[r.length] = obj2str(o[i]);
				r[r.length] = ",";
			}
			r[r.length - 1] = "]"
		}
		return r.join("");
	}
	return o.toString();
};

//************************************ */


/**
*
*  Base64 encode / decode
*
*  @author haitao.tu
*  @date   2010-04-26
*  @email  tuhaitao@foxmail.com
*
*/

//function Base64() {

// private property
//var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

// public method for encoding
encode1 = function (input) {
	var _keyStr = encode_keyStr;
	console.log(_keyStr);
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;
	input = _utf8_encode(input);
	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output +
			_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
			_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
	}
	console.log("output:", output);
	return output;
}
// base64s : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",  

encode = function (decStr) {
	//if (typeof btoa === 'function') {  
	//     return btoa(decStr);              
	//}
	var _keyStr = encode_keyStr;
	var base64s = _keyStr;// this.base64s;  
	var bits;
	var dual;
	var i = 0;
	var encOut = "";
	while (decStr.length >= i + 3) {
		bits = (decStr.charCodeAt(i++) & 0xff) << 16 | (decStr.charCodeAt(i++) & 0xff) << 8 | decStr.charCodeAt(i++) & 0xff;
		encOut += base64s.charAt((bits & 0x00fc0000) >> 18) + base64s.charAt((bits & 0x0003f000) >> 12) + base64s.charAt((bits & 0x00000fc0) >> 6) + base64s.charAt((bits & 0x0000003f));
	}
	if (decStr.length - i > 0 && decStr.length - i < 3) {
		dual = Boolean(decStr.length - i - 1);
		bits = ((decStr.charCodeAt(i++) & 0xff) << 16) | (dual ? (decStr.charCodeAt(i) & 0xff) << 8 : 0);
		encOut += base64s.charAt((bits & 0x00fc0000) >> 18) + base64s.charAt((bits & 0x0003f000) >> 12) + (dual ? base64s.charAt((bits & 0x00000fc0) >> 6) : '=') + '=';
	}
	return (encOut);
},

	decode = function (encStr) {
		//  if (typeof atob === 'function') {  
		//     return atob(encStr);   
		// }  
		var _keyStr = encode_keyStr;
		var base64s = _keyStr;// this.base64s;          
		var bits;
		var decOut = "";
		var i = 0;
		for (; i < encStr.length; i += 4) {
			bits = (base64s.indexOf(encStr.charAt(i)) & 0xff) << 18 | (base64s.indexOf(encStr.charAt(i + 1)) & 0xff) << 12 | (base64s.indexOf(encStr.charAt(i + 2)) & 0xff) << 6 | base64s.indexOf(encStr.charAt(i + 3)) & 0xff;
			decOut += String.fromCharCode((bits & 0xff0000) >> 16, (bits & 0xff00) >> 8, bits & 0xff);
		}
		if (encStr.charCodeAt(i - 2) == 61) {
			return (decOut.substring(0, decOut.length - 2));
		}
		else if (encStr.charCodeAt(i - 1) == 61) {
			return (decOut.substring(0, decOut.length - 1));
		}
		else {
			return (decOut);
		}
	}
// public method for decoding
decode1 = function (input) {
	var output = "";
	var _keyStr = encode_keyStr;
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < input.length) {
		enc1 = _keyStr.indexOf(input.charAt(i++));
		enc2 = _keyStr.indexOf(input.charAt(i++));
		enc3 = _keyStr.indexOf(input.charAt(i++));
		enc4 = _keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}
	output = _utf8_decode(output);
	return output;
}

// private method for UTF-8 encoding
_utf8_encode = function (string) {
	string = string.replace(/\r\n/g, "\n");

	var utftext = "";
	for (var n = 0; n < string.length; n++) {
		var c = string.charCodeAt(n);
		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if ((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}

	}
	return utftext;
}

// private method for UTF-8 decoding
_utf8_decode = function (utftext) {
	var string = "";
	var i = 0;
	var c = 0;
	var c1 = 0;
	var c2 = 0;
	var c3 = 0;

	while (i < utftext.length) {
		c = utftext.charCodeAt(i);
		if (c < 128) {
			string += String.fromCharCode(c);
			i++;
		} else if ((c > 191) && (c < 224)) {
			c2 = utftext.charCodeAt(i + 1);
			string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
			i += 2;
		} else {
			c2 = utftext.charCodeAt(i + 1);
			c3 = utftext.charCodeAt(i + 2);
			string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			i += 3;
		}
	}
	return string;
}
//}


function _encrypt(strings) {
	//var obj_base64 = new fun_base64.Base64();
	// var key = 'e10adc3949ba59abbe56e057f20f883e';
	key = "7b8d4382730222b472a6861109e00195";
	var strings = encode(strings);
	var len = key.length;
	var code = '';
	for (var i = 0; i < strings.length; i++) {
		var k = i % len;
		code += String.fromCharCode(strings.charCodeAt(i) ^ key.charCodeAt(k));
	}
	return obj_base64.encode(code);
}
function _decrypt(strings) {
	//var obj_base64 = new fun_base64.Base64();
	var key = md5.hex_md5('18165608618');
	var strings = decode(strings);
	var len = key.length;
	var code = '';
	for (var i = 0; i < strings.length; i++) {
		var k = i % len;
		code += String.fromCharCode(strings.charCodeAt(i) ^ key.charCodeAt(k));
	}
	return obj_base64.decode(code);
}



/**
 * base64编码
 * @param {Object} str
 */
function base64encode(str) {
	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xF) << 2);
			out += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
}
/**
 * base64解码
 * @param {Object} str
 */
function base64decode(str) {
	var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
	var c1, c2, c3, c4;
	var i, len, out;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		}
		while (i < len && c1 == -1);
		if (c1 == -1)
			break;
		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		}
		while (i < len && c2 == -1);
		if (c2 == -1)
			break;
		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61)
				return out;
			c3 = base64DecodeChars[c3];
		}
		while (i < len && c3 == -1);
		if (c3 == -1)
			break;
		out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61)
				return out;
			c4 = base64DecodeChars[c4];
		}
		while (i < len && c4 == -1);
		if (c4 == -1)
			break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
}
/**
 * utf16转utf8
 * @param {Object} str
 */
function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		}
		else
			if (c > 0x07FF) {
				out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
				out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
			else {
				out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
				out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
			}
	}
	return out;
}
/**
 * utf8转utf16
 * @param {Object} str
 */
function utf8to16(str) {
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
				// 0xxxxxxx
				out += str.charAt(i - 1);
				break;
			case 12:
			case 13:
				// 110x xxxx 10xx xxxx
				char2 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
				break;
			case 14:
				// 1110 xxxx10xx xxxx10xx xxxx
				char2 = str.charCodeAt(i++);
				char3 = str.charCodeAt(i++);
				out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
				break;
		}
	}
	return out;
}





gettreeurl = function (str) {
	return sys_ActionPHP + '?act=' + str;
}


showSelectKhbmView = function (record, that0, vmodel, refresh) {

	console.log('sys_DisplayAll=', sys_DisplayAll);

	var view = that0.getView();
	that0.dialog = view.add({
		xtype: 'selectKhbmWindow',
		//query:query,
		viewModel: {
			data: record
		},
		refresh: refresh,
		session: true
	});
	that0.dialog.show();
	console.log('showSelectKhbmView', record);
	that0.getView().down('#selectKhbmTreePanel').that0 = that0;
	that0.getView().down('#selectKhbmTreePanel').vmodel = vmodel;
	that0.getView().down('#selectKhbmTreePanel').refresh = refresh;
	that0.refresh = refresh;
}
onKhbmSelectOkClick = function () {
	//  console.log('onKhbmSelectOkClick');
	var panel = this.up('window').down('#selectKhbmTreePanel');
	var that0 = panel.that0;
	var vmodel = panel.vmodel;
	var sm = panel.getSelectionModel();
	if (sm.hasSelection()) {
		node = sm.getSelection()[0];
		vmodel.getViewModel().set('khmc', node.data.text);
		vmodel.getViewModel().set('khid', node.data.id);
		this.up('window').hide();
		if (panel.refresh == 1) {
			that.onBtnQueryClick();
		}
	}
}


showSelectCkbmView = function (record, that0, vmodel, refresh) {
	var view = that0.getView();
	that0.dialog = view.add({
		xtype: 'selectCkbmWindow',
		//query:query,
		viewModel: {
			data: record
		},
		refresh: refresh,
		session: true
	});
	that0.dialog.show();
	that0.getView().down('#selectCkbmTreePanel').that0 = that0;
	that0.getView().down('#selectCkbmTreePanel').vmodel = vmodel;
	that0.getView().down('#selectCkbmTreePanel').refresh = refresh;
	that0.refresh = refresh;
}
onCkbmSelectOkClick = function () {
	var panel = this.up('window').down('#selectCkbmTreePanel');
	var that0 = panel.that0;
	var vmodel = panel.vmodel;
	var sm = panel.getSelectionModel();
	if (sm.hasSelection()) {
		node = sm.getSelection()[0];
		vmodel.getViewModel().set('ckmc', node.data.text);
		vmodel.getViewModel().set('ckid', node.data.id);
		this.up('window').hide();
		if (panel.refresh == 1) {
			that.onBtnQueryClick();
		}
	}
}

showSelectCdbmView = function (record, that0, vmodel, refresh) {
	var view = that0.getView();
	that0.dialog = view.add({
		xtype: 'selectCdbmWindow',
		//query:query,
		viewModel: {
			data: record
		},
		refresh: refresh,
		session: true
	});
	that0.dialog.show();
	that0.getView().down('#selectCdbmTreePanel').that0 = that0;
	that0.getView().down('#selectCdbmTreePanel').vmodel = vmodel;
	that0.getView().down('#selectCdbmTreePanel').refresh = refresh;
	that0.refresh = refresh;
}
onCdbmSelectOkClick = function () {
	var panel = this.up('window').down('#selectCdbmTreePanel');
	var that0 = panel.that0;
	var vmodel = panel.vmodel;
	var sm = panel.getSelectionModel();
	if (sm.hasSelection()) {
		node = sm.getSelection()[0];
		vmodel.getViewModel().set('cdmc', node.data.text);
		vmodel.getViewModel().set('cdid', node.data.id);
		this.up('window').hide();
		if (panel.refresh == 1) {
			that.onBtnQueryClick();
		}
	}
}

showSelectCpbmView = function (record, that0, vmodel, refresh) {
	var view = that0.getView();
	that0.dialog = view.add({
		xtype: 'selectCpbmWindow',
		//query:query,
		viewModel: {
			data: record
		},
		refresh: refresh,
		session: true
	});
	that0.dialog.show();
	that0.getView().down('#selectCpbmTreePanel').that0 = that0;
	that0.getView().down('#selectCpbmTreePanel').vmodel = vmodel;
	that0.getView().down('#selectCpbmTreePanel').refresh = refresh;
	that0.refresh = refresh;
}
onCpbmSelectOkClick = function () {
	var panel = this.up('window').down('#selectCpbmTreePanel');
	var that0 = panel.that0;
	var vmodel = panel.vmodel;
	var sm = panel.getSelectionModel();
	if (sm.hasSelection()) {
		node = sm.getSelection()[0];
		vmodel.getViewModel().set('cpmc', node.data.text);
		vmodel.getViewModel().set('cpid', node.data.id);
		this.up('window').hide();
		if (panel.refresh == 1) {
			that.onBtnQueryClick();
		}
	}
}





AjaxDataSave = function (act, loc, data, CallBackFunction, the) {
	//Ext.Msg.confirm(title, msg, function (e) {
	//	if (e == 'yes') {
	Ext.Ajax.request({
		method: 'GET',
		url: sys_ActionPHP,
		params: {
			act: act,
			loc: loc,
			p_l_id: sys_location_id,
			userInfo: base64encode(Ext.encode(obj2str(sys_userInfo))),
			data: data
		},
		scope: that,
		success: function (response) {
			var result = Ext.decode(response.responseText);
			if (result.result == 'success') {
				/*Ext.toast({
					html: "数据保存成功！！！",
					closable: true,
					title: '信息',
					align: 't',
					slideInDuration: 100,
					minWidth: 400
				});
				*/
				Ext.toast.msg('注意！', ' 数据保存成功！！！');
				CallBackFunction(the);
				//if (store) {
				//	store.load();
				//}
				//panel.hide();
			}
			else {
				Ext.MessageBox.alert('错误!', '数据保存失败！');
			}
		},
		failure: function () {
			Ext.MessageBox.alert('错误!', '发生错误！');
		}
	});
	//}
	//	})
}
Ext.toast = function () {
	var msgCt;
	function createBox(t, s) {
		return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
	}
	return {
		msg: function (title, format) {
			if (!msgCt) {
				msgCt = Ext.DomHelper.insertFirst(document.body, { id: 'msg-div' }, true);
			}
			var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
			var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
			m.hide();
			m.slideIn('t').ghost("t", { delay: 1000, remove: true });
		},

		init: function () {
			if (!msgCt) {
				// It's better to create the msg-div here in order to avoid re-layouts  
				// later that could interfere with the HtmlEditor and reset its iFrame.  
				msgCt = Ext.DomHelper.insertFirst(document.body, { id: 'msg-div' }, true);
			}
		}
	};
}()  
