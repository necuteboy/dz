let fs = require('fs');
let arg = process.argv;
let inText;
let i = 0, n = 1,t=0;
let stroka="";
let stroka2="";
//ABC
fs.readFile(arg[2], (err, data) => {
	if (err){
		console.error(err);
		return;
	}
	inText = data.toString();
	/*Файл в коировке UTF-8 с BOM, а потому первым символом (не байтом а символом!) идет специальный маркер BOM.*/
	/*Находем длины цепочек подряд идущих символов*/
	while (i < inText.length) {
		while (inText.charAt(i) == inText.charAt(i + n))
			n++;
		let t=n;
		while (n > 255) {
			n = n - 255;
			stroka += "#" + String.fromCharCode(255) + inText.charAt(i);
		}
		if (n > 3) {
			stroka += "#" + String.fromCharCode(n) + inText.charAt(i);
		}
		if (n <= 3) {
			if (inText.charAt(i) == "#")
				stroka += "#" + String.fromCharCode(n) + inText.charAt(i)
			else {
				let q = 0;
				while (q < n) {
					stroka += inText.charAt(i);
					q += 1;
					//console.log(n,q);
				}
			}
		}
		i += t;
		n = 1;
	}
	fs.writeFile('code.txt', stroka, (err) => {
		if (err){
			console.err(err);
			return;
		}
	});
	i=0
	while (i<stroka.length){
		if (stroka[i]!="#")  {
			stroka2+=stroka[i];
			i+=1;
		}
		else {
			for (j=0;j<stroka[i+1].charCodeAt(0);j++){
				stroka2+=stroka[i+2];
			}
			i+=3;
		}
	}
	fs.writeFile('decode.txt', stroka2, (err) => {
		if (err){
			console.err(err);
			return;
		}
		});

});
