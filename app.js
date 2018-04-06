var basis = require("node-basis");
/*
basis 是解决路由请求与处理，静态文件访问处理的组件。

通过basis.setRouter()可以设置访问路由
通过basis.contriller()可以设置某个路由的处理函数
通过basis.run(port)启动 basis,port是启动的端口号
*/

basis.setRouter({
	"controllerName1":"/api/:id/:version", /*:id,:version是URL中的动态参数,在basis.controller()中可以获取参数*/
	"controllerName2":"/",
	"interface":"/restful/info"
});

basis.setFilter({
	"myfileController" : "./html/my.node"
});

basis.controller("myfileController",function(req,res,fileTpl){
	/*fileTpl is file html*/
	var tpl = new basis.template();
	var data = {
		students : [
			{name:"张雨",age:"22"},
			{name:"刘1强",age:"23"},
			{name:"刘34强",age:"26"},
			{name:"王懂",age:"27"},
		],
		items:[
    		{ text: 'text1' ,status:'done' },
    		{ text: 'text2' ,status:'pending' },
    		{ text: 'text3' ,status:'pending' },
    		{ text: 'text4' ,status:'processing'}
		]
	}
	tpl.assign("tplData",data);
	//tpl.response = res;
	//tpl.render(fileTpl);
	tpl.render(fileTpl,res);
});

basis.controller("controllerName1",function(req,res,argv){
	res.writeHead(200,{'content-type':'text/html'});
	res.write("<h1>This is request.</h1>");
	res.write("<h3>params id:"+argv.id+"</h3>");
	res.write("<h3>params version:"+argv.version+"</h3>");
	res.end();
});

/*
首页
(1) http://localhost:3000/
*/
basis.controller("controllerName2",function(req,res){
	res.writeHead(200,{'content-type':'text/html'});
	basis.outfile("./html/index.html"); /*转到html/index.html文件*/
	res.end();
});



/*
restfull 接口
url is /restful/info
参见html/index.html里的ajax请求
*/
basis.controller("interface",function(req,res){
	/*向客户端输出JSON*/
	res.writeHead(200,{'content-type':'text/javascript'});
	res.write('{"data":[1,2,3,4],"errorCode":"0"}'); /*restfull接口数据*/
	res.end();
});
//basis.port = 3000;
basis.start(3000);
