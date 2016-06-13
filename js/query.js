
var itemNo =[];
var check= [];
var totalPrice =0;
var queryDate=[];
var queryItem=[];


//change product dropdown
$(".product").each(function(){
	$(this).find("a").removeAttr("href");
});


for(i=0; i<9; i++){
	$("#item"+i).remove();
	$("#item"+i+"Name").siblings("span").remove();
};

//get queryDate
$("#dateBtn").click(function(){
	var UserDate = $("#dateInput").val();
	if (UserDate.length < 2){
		$(this).attr("href","#step1");
		return alert("請輸入日期");
	}else{
		$(this).attr("href","#step2")
	};
	var queryDateTemp=UserDate.split("-");
	for(i=0; i<queryDateTemp.length;i++){
		queryDate.push(parseInt(queryDateTemp[i])); 
	};
	console.log(queryDate);
	$("#day").text(queryDate[0]+"年"+queryDate[1]+"月"+queryDate[2]+"日");

});

//print queryDate




//DOM 
$(".product").click(function(){
	itemNo.push("");
	
	if(itemNo.length>10){
		return alert("一次最多只能選取10個商品喔");
	};

	var curItem = "#item"+itemNo.length+"Display";
	var curItemName = "#item"+itemNo.length+"Name";
	console.log(curItem);
	$(curItem).css("display","block");
	$(curItemName).text("");
	$(curItemName).append('<span class="name">'+ $(this).attr("pName")+'</span>');

	//getQueryItem
	var nowItem=[];
	nowItem.push($(this).attr("pName"));
	queryItem.push(nowItem);

	//getItem
	var item =[];
	item.push($(this).attr("pName"));
	item.push(parseInt($(this).attr("pNo")));
	item.push(parseInt($(this).attr("pprice")));
	check.push(item);
	//CheckOut showUp
	if( $("#payMoney").css("display") === "none"){
		$("#payMoney").css("display","block");
	};
	$("#payMoney").css("padding-top","+=0");
});

//removeData
var removeData =function(){
	for(i=0;i<itemNo.length;i++){
		var curItem = "#item"+(i+1)+"Display";
		var curItemName = "#item"+(i+1)+"Name";
		$(curItem).css("display","none");
		$(curItemName).html("");
		$(".sugar").html("");
		$(".heat").html("");
	};
	itemNo =[];
	check=[];
	totalPrice =0;
	queryItem=[];
	console.log("remove conducted!資料掰掰");
};


//重設(清除商品資料)
$("#noPay").click(removeData);


//重新選擇商品
$("#return1").click(removeData);

//重新選擇時間
$("#return2").click(function(){
	removeData();
	queryDate=[];
	$("#day").text("您尚未輸入");
});
//回到首頁
$("#return3").click(function(){
	removeData();
	queryDate=[];
	$("#day").text("您尚未輸入");
});




//pay就是日銷量
$("#pay").click(function(){
	//check格式: [[pName(string),pNo(int),pPrice(int)]]
	//queryDate格式 [year(int),month(int),date(int)]
	/*------------------------------------------------------------
	 	在這裡呼叫後端
		回傳資料格式 [[產品名,銷售額],[],[],...]
	--------------------------------------------------------------   */
	

	//假資料，做完後端就刪掉八
	console.log("queryItem:"+queryItem);
	for(i=0; i<queryItem.length; i++){
		var randomSell = parseInt(Math.random()*10)*50;
		queryItem[i].push(randomSell);
	};

	//把queryItem改為後端傳來的陣列
	barResult("#resultContainer",queryItem,800,800);
});


//月銷量
$("#monthQuery").click(function(){;
	//check格式: [[pName(string),pNo(int),pPrice(int)]]
	//queryDate格式 [year(int),month(int),date(int)]
	/*------------------------------------------------------------
	 	在這裡呼叫後端
		回傳資料格式 [[產品名,銷售額],[],[],...]
	--------------------------------------------------------------   */
	

	//假資料，做完後端就刪掉八
	console.log("queryItem:"+queryItem);
	for(i=0; i<queryItem.length; i++){
		var randomSell = parseInt(Math.random()*100)*150;
		queryItem[i].push(randomSell);
	};

	//把queryItem改為後端傳來的陣列
	barResult("#resultContainer",queryItem,800,800);
});



//D3.js  
var getMaxValue = function(data,index){
	var max=data[0][index];
	for(i=0; i<data.length; i++ ){
		if(max<data[i][index]){
			max = data[i][index];
		};
	};
	return max;
};

//graph the data
/*

parameter needed: object selecter,data,svgWidth,svgHeight.
format: 
selecter : string
data: [["item",sales],]
svgWidth,svgHeight : int

*/

var barResult = function(selecter,myData,svgWidth,svgHeight){
	//create  new svg
	d3.select(selecter).select("svg").remove();
	var svg = d3.select(selecter)
		.append("svg").attr({
			width:svgWidth,
			height:myData.length*30+60,
		});
	//create rect
	var updateSvg =svg.selectAll("rect").data(myData);
	updateSvg.enter().append("rect");
	updateSvg.exit().remove();
	d3.select(selecter)
		.select("svg")
		.selectAll("rect")
		.attr({
			x:155,
			y: function(d,i){return i*30;},
			height:18,
			width: 0,									
			fill:"red",
			rx:12,
			ry:12,
		});
	//createItem
	var updateItem = d3.select(selecter).select("svg").selectAll("text").data(myData);
	updateItem.enter().append("text");
	updateItem.exit().remove();
	d3.select(selecter).select("svg").selectAll("text").text(function(d){ return d[0] ;});
	d3.select(selecter).select("svg").selectAll("text").attr({
		x:0,
		y:function(d,i){ return 18+i*30;},
		class: "item",
	}).style({
		"font-size": "18px",
	});
	//createSales
	var createSales = d3.select(selecter).select("svg").append("text").attr({class:"sales",});
	var updateSales = d3.select(selecter).select("svg").selectAll(".sales")
						.data(myData).enter().append("text").attr({class:"sales",});
	d3.select(selecter)
		.selectAll(".sales")
		.transition()
		.delay(2050)
		.text(function(d){ return d[1]+"元";})
		.attr({
			x:function(d,i){
				var max = getMaxValue(myData,1);
				return 180+d[1]*(500-12)/max;
			},
			y:function(d,i){ return 18+i*30;},
		}).style({
			"font-size":"18px",
		});
	//animation
	d3.select(selecter)
			.select("svg")
			.selectAll("rect")
			.transition()
			.duration(1000)
			.delay(1150)
			.attr({
				width: function(d,i){
					var max = getMaxValue(myData,1);
					return d[1]*(500-12)/max +12;
				},									
				fill:"red",
			});	

};



/*
var svg = d3.select("#resultContainer")
		.append("svg").attr({
			width:svg_width,
			height:svg_height,
		});


var updateSvg =svg.selectAll("rect").data(testData1);
updateSvg.enter().append("rect");
updateSvg.exit().remove();

d3.select("#resultContainer").select("svg").selectAll("rect")
			.attr({
				x:30,
				y: function(d,i){
					return i*30;
				},
				height: 25,
				width: function(d,i){
					var max = getMaxValue(testData1,1);
					return d[1]*500/max;
				},
								
				fill:"red",
				rx:12,
				ry:12,
			});

var updateItem = d3.select("#resultContainer").select("svg").selectAll("text").data(testData1);
updateItem.enter().append("text");
updateItem.exit().remove();
d3.select("#resultContainer").select("svg").selectAll("text").text(function(d){ return d[0] ;});
d3.select("#resultContainer").select("svg").selectAll("text").attr({
	x:38,
	y:function(d,i){ return 18+i*30;},
	class: "item",
}).style({
	"font-size": "18px",
});

var createSales = d3.select("#resultContainer").select("svg").append("text").attr({class:"sales",});
var updateSales = d3.select("#resultContainer").select("svg").selectAll(".sales")
					.data(testData1).enter().append("text").attr({class:"sales",});

d3.select("#resultContainer")
	.selectAll(".sales")
	.text(function(d){ return d[1]+"元";})
	.attr({
		x:function(d,i){
			var max = getMaxValue(testData1,1);
			return 38+d[1]*500/max;
		},
		y:function(d,i){ return 18+i*30;},
	}).style({
		"font-size":"18px",
	});
*/










