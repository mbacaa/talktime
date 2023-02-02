const createMessage = (_id) => {
	return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    </head>
    
    <body>
        <div>
            <h1>Welcome to Talktime!</h1>
            <p>To verify your account, click the button below:</p>
            <a target="_blank" href="http://localhost:4000/api/auth/verifyUser/${_id}">
                <button>Verify</button>
            </a>
            
        </div>
    </body>
    </html>`;
};

module.exports = { createMessage };
