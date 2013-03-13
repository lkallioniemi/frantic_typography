function franticTypography(elements) {
	for (e = 0; e < elements.length; e++) {
		var styles, text = elements[e].childNodes[0].nodeValue;
		if (elements[e].currentStyle) { //IE
			temp = elements[e].currentStyle["text-shadow"].split('px ');
			styles = {
				textTransform: elements[e].currentStyle.textTransform,
				height: elements[e].offsetHeight,
				kerning: parseInt(elements[e].currentStyle.letterSpacing, 10),
				textShadow: {
					color: temp[3],
					position: new Array(temp[0], temp[1], temp[2])
				},
				fontFamily: elements[e].currentStyle.fontFamily,
				fontSize: elements[e].currentStyle.fontSize,
				fontWeight: elements[e].currentStyle.fontWeight,
				fontStyle: elements[e].currentStyle.fontStyle,
				textColor: elements[e].currentStyle.color
			};
		} else if (document.defaultView && document.defaultView.getComputedStyle) { // Others
			temp = document.defaultView.getComputedStyle(elements[e]).textShadow.split(') ');
			styles = {
				textTransform: document.defaultView.getComputedStyle(elements[e]).textTransform,
				height: parseInt(document.defaultView.getComputedStyle(elements[e]).height, 10),
				kerning: parseInt(document.defaultView.getComputedStyle(elements[e]).letterSpacing, 10),
				textShadow: {
					color: temp[0] + ")",
					position: temp[1].split(' ')
				},
				fontFamily: document.defaultView.getComputedStyle(elements[e]).fontFamily,
				fontSize: document.defaultView.getComputedStyle(elements[e]).fontSize,
				fontWeight: document.defaultView.getComputedStyle(elements[e]).fontWeight,
				fontStyle: document.defaultView.getComputedStyle(elements[e]).fontStyle,
				textColor: document.defaultView.getComputedStyle(elements[e]).color
			};
		}
		text = (styles.textTransform == 'uppercase') ? text.toUpperCase() : text;
		text = text.split('');

		elements[e].innerHTML = '';
		elements[e].style.letterSpacing = 0;
		var children = [];
		for (i = 0; i < text.length; i++) {
			var child = document.createElement('span');
			elements[e].appendChild(child);
			child.textContent = text[i];
			child.style.zIndex = text.length - i;
			child.width = child.offsetWidth;
			children.push(child);
		}

		for (i = 0; i < children.length; i++) {
			var canvas = document.createElement('canvas');
			var canvas1 = document.createElement('canvas');
			
			var font = styles.fontStyle + ' ' + styles.fontWeight + ' ' + styles.fontSize + ' ' + styles.fontFamily;
			canvas.width = canvas1.width = children[i].width * 2;
			canvas.height = canvas1.height = styles.height;

			var context = canvas.getContext('2d');
			context.fillStyle = styles.textColor;
			context.font = font;
			context.shadowColor = styles.textColor;
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0;
			context.shadowBlur = 2;

			context.fillText(children[i].childNodes[0].nodeValue, children[i].width, styles.height * 0.78);

			var context1 = canvas1.getContext('2d');
			context1.font = font;
			context1.fillStyle = styles.textShadow.color;
			context1.shadowColor = styles.textShadow.color;
			context1.shadowOffsetX = parseInt(styles.textShadow.position[0], 10);
			context1.shadowOffsetY = parseInt(styles.textShadow.position[1], 10);
			context1.shadowBlur = parseInt(styles.textShadow.position[2], 10);

			if (i > 0) {
				context1.fillText(children[i - 1].childNodes[0].nodeValue, children[i].width - children[i - 1].width - styles.kerning, styles.height * 0.78);
			}
			
			context.globalCompositeOperation = 'source-atop';
			context.drawImage(canvas1, 0, 0);
			
			children[i].style.backgroundImage = "url(" + canvas.toDataURL("image/png") + ")";
			children[i].style.backgroundPosition = 'right 50%';
			children[i].style.backgroundRepeat = 'no-repeat';
			children[i].style.color = 'rgba(255,255,255,0.1)';
			children[i].style.position = 'relative';
			children[i].style.textShadow = 'none';
			children[i].style.marginLeft = styles.kerning + 'px';
		}
	}
}
