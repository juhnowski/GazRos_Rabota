var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "qqq@gmail.com",
        pass: "qqq"
    }
});

var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());
app.use(express.methodOverride());



app.post('/send',function(req,res){
	console.log(req.body.zsum);

	mailOptions = {
    	from: "Грузоперевозки52.рф ✔ <gruzoperevozky52@gmail.com>", // sender address
    	to: "juhnowski@gmail.com, gruzoperevozky52@gmail.com"+", "+req.body.job_email_contacts,
    	subject: "Работа ✔", // Subject line
    	text: "Спасибо, что заинтересовались нашей вакансией. Мы свяжемся с Вами в ближайшее время по указанной в заявке контактной информации.", // plaintext body
    	html: "<h1>Запрос соискателя</h1>"+
    	      "<h2>Email</h2><br><p>"+req.body.job_email_contacts+"</p><br>"+
    	      "<h2>Телефон:</h2><br><p>"+req.body.job_phone_contacts+"</p><br>"+
    	      "<h2>Условия:</h2><br><p>"+req.body.job_description+"</p><br>"+
    	      "<b>Спасибо, что заинтересовались нашей вакансией. Мы свяжемся с Вами в " +
    	      "ближайшее время по указанной в заявке контактной информации."+
    	      "</b><br>ООО Группа Компаний ГазРос</br><br><br>"
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
    	if(error){
        	console.log(error);
    	}else{
        	console.log("Заявка на трудоустройство принята."); //response.message
    	}

//    	smtpTransport.close(); // shut down the connection pool, no more messages
	});
	res.send('Заявка на трудоустройство принята.');
});


app.use(function(err,req,res,next){
	console.error(err.stack);
	res.send(500,'У нас что-то сломалось. Ваша заявка важна для нас. Пожалуйста позвоните по телефону +7-908-154-20-43');
});

var server = app.listen(4001, function(){
	console.log("GazRos_Rabota: Listening on port %d", server.address().port);
});
