let fName;

function getName() {
	console.log('getName() called');
	fName = 'alice';
	return fName;
}

getName();

// console.log(fName);

module.exports = { getName, fName };
