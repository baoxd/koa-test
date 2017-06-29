// var expect = require('chai').expect;

// describe('add.test.js', function(){


// 	it('add', function(){
// 		expect(1+1).to.be.equal(2);
// 	});

// 	it('add2', function(){
// 		expect(1+1).to.be.equal(2);
// 	});

// 	it('add3', function(){
// 		expect(1+1).to.be.equal(2);
// 	});

// });

var add = require('../app/add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
	
	// 	before(function() {
	// 	    // 在本区块的所有测试用例之前执行
	// 	});

	// 	after(function() {
	// 	    // 在本区块的所有测试用例之后执行
	// 	});

	// 	beforeEach(function() {
	// 	    // 在本区块的每个测试用例之前执行
	// 	});

	// 	afterEach(function() {
	// 	    // 在本区块的每个测试用例之后执行
	// 	});

	it('1 加 1 应该等于 2', function() {
		expect(add(1, 1)).to.be.equal(2);
	});

	it('任何数加0应该等于自身', function() {
		expect(add(1, 0)).to.be.equal(1);
	});
});
