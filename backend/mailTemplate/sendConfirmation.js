const sendConfirmation = (otp , name) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}

			.btn {
				padding:7px;
				background-color: #000000;
				color: #ffffff;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href=""><img class="logo"
					src="https://www.wedesignetees.com/white%20logo.png" alt="WeDesigneTees Logo"></a>
			<div class="message">Email Verification</div>
			<div class="body">
				<p>Hello ${name}</p>
				<p>Thank you for joining with WeDesigneTees. To complete your registration, please click on the activate button to activate your account:</p>
				<a class="highlight" href="${otp}"> <button classname='btn'>Activate</button></a>
				<p>This Link is valid for 5 minutes. If you did not request this verification, please disregard this email.
				Once your account is verified, you will have access to our platform and order our best products</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:wedesignetees@gmail.com">wedesignetees@gmail.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = sendConfirmation;