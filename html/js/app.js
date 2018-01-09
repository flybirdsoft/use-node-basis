
/*
write by wuweiwei
www.github.com/flybirdsoft

*/

var App = {
	init : function(){
		this.getCompany();
		this.bindEvent();
		this.loadHover();
	},
	bindEvent :function(){
		var $title = $(".pageContent");
		var $booksList = $title.find(".booksList");
		$title.on("click","dt",function(){
			$title.find(".booksList").hide();
			$title.find("dt").attr("class","");
			this.className = "select";
			$(this.parentNode).find(".booksList")[0].style.display = "block";
		});

		$title.on("click","label",function(){
			$title.find("label").attr("class","");
			if(this.className=="")
			{
				this.className = "select";
			}
		});
	},

	getCompany:function(){
		var th = this;
		$.ajax({
			url:"company.json",
			type:"get",
			dataType:"json",
			success:function(data){
				th.viewPage(data.companys);
			}
		});
	},

	loadHover : function(){
		var img = new Image();
		img.src = "images/autotax-submit-hover.png";
	},

	viewPage : function(data){
		template.repeat({
		    repeatElement : $("#booksList")[0],
		    data : data
		});
	}
	,
	showLoading:function(){
		
	},
	hideLoading:function(){
		
	}
}

