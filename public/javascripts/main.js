var url = "http://localhost:3000";
var doc = $(document);


var socket = io.connect(url);

doc.on("click","#msg_submit",function(){
	var txt = $("#msg_user").val();
	var nick = $("#nick_user").val();
	if(!nick || nick=='')
	{
		nick='anonimo';
	}
	resp={"msg":txt,"name":nick};
	socket.emit("msg_emit",resp);
	$("#msg_user").val("");
	console.log("submit");
});
doc.on("keypress","#msg_user",function (e){
	if (e.keyCode == 13) {
		var txt = $("#msg_user").val();
		socket.emit("msg_emit",txt);
		$("#msg_user").val("");
	}

});
socket.on("msg_draw",function (data){
	console.log("draw")
	$("#msg_container").html("");
	for(i=0;i<data.length;i++)
	{
		$("#msg_container").append("<p>"+data[i].msg+"</p>");
	}
});