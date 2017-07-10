import fs from 'fs'
import path from 'path'

// 生成主键
let uuid = function(len) {
	len = len ? len : 8;
	var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var res = "";
	for (var i = 0; i < len; i++) {
		var id = Math.ceil(Math.random() * 35);
		res += chars[id];
	}
	return res;
}

let upload = function(file){
	// 上传目的文件夹
	let destination = file.destination;
	// 源文件名字
	let originalname = file.originalname;
	// 临时文件名
	let filename = file.filename;
	// 临时文件
	let filepath = file.path;
	// 文件类型
	let mimetype = file.mimetype;

	if(fs.existsSync(filepath)){
		let newPath = path.join(destination, filename + '_' + originalname) 
		let input = fs.createReadStream(filepath)
		let output = fs.createWriteStream(newPath)

		input.on('data', function(d){
			output.write(d)
		})

		input.on('error', function(e){
			// console.log(e)
			throw e
		})

		input.on('end', function(){
			output.end()
			// 删除临时文件
			fs.unlink(filepath, function(e){
				if(e){
					// console.log(e)
					throw e
				}
			})
		})
	}
}

export default{
	uuid,
	upload
}