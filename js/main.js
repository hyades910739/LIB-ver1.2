
var itemNo =[];
var check= [];
var totalPrice =0;
var checkTime=[];



//DOM 
$(".product").click(function(){
	itemNo.push("");
	var curItem = "#item"+itemNo.length+"Display";
	var curItemName = "#item"+itemNo.length+"Name";
	console.log(curItem);
	console.log(curItemName);
	$(curItem).css("display","block");
	$(curItemName).text("");
	$(curItemName).append('<span class="name">'+ $(this).attr("pName")+'</span>');
	$(curItemName).append('<span class="price">$' + $(this).attr("pPrice")+'</span>');

	//getItem
	var item =[];
	item.push($(this).attr("pName"));
	item.push(parseInt($(this).attr("pNo")));
	item.push(parseInt($(this).attr("pprice")));
	check.push(item);
	console.log(check);

	//CheckOut showUp
	if( $("#payMoney").css("display") === "none"){
		$("#payMoney").css("display","block");
	};
	$("#payMoney").css("padding-top","-=79");

	//getTotalPrice
	totalPrice =0;
	for(i=0;i<check.length;i++){
		totalPrice += check[i][2];
		$("#total").text(totalPrice+"元");
	};

});


$(".productSugar").click(function(){
	console.log("sugar!!!!!!!!!!");
	var curItemNo =$(this).parent("ul").attr("no");
	var curItemName = "#item"+curItemNo+"Name";
	console.log(curItemName);
	$(curItemName).parent("h4").find(".sugar").text($(this).attr("sugar"));



});

$(".productHeat").click(function(){
	console.log("Heat!!!!!!!!!!!");
	var curItemNo =$(this).parent("ul").attr("no");
	var curItemName = "#item"+curItemNo+"Name";
	console.log(curItemName);
	$(curItemName).parent("h4").find(".heat").text($(this).attr("heat"));
	$(this).closest("div[id*='item']").collapse('hide');
	if($(this).attr("heat")==="熱"){
		$(this).closest("div[id*='Display']").find("span[class='name']").css("color","red");
	}

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

	$("#payMoney").css("display","none");
	itemNo =[];
	check=[];
	totalPrice =0;
	console.log("remove conducted!資料掰掰");
};


$("#noPay").click(removeData);



//getData  看你要怎麼傳到後端
$("#pay").click(function(){
	
	//get time
	var date = new Date();
	checkTime.push(date);
	checkTime.push(date.getFullYear());
	checkTime.push(date.getMonth()+1);
	checkTime.push(date.getDate());


	console.log("時間:"+checkTime);
	console.log("總金額:"+totalPrice);
	console.log("商品明細:"+check);
	//check格式: [[pName(string),pNo(int),pPrice(int)]]
	//checkTime格式:[new Date(),年,月,日]

	/*在這裡把資料傳到後端*/


	/*在這裡把資料傳到後端*/
	//資料掰掰
	removeData();
	checkTime=[];
});


