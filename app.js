const Discord = require('discord.js');              // require disord.js node module
const client = new Discord.Client();                
const Request = require("request");                 // require request node module
console.log('mcBOT Connected Successfully');        // Bot connected message show in terminal

client.on("message", message => {

  // run if the message start with https://steemit.com
  
if(message.content.startsWith("https://steemit.com")){
var msg = message.content;               // store input message
var url = "http://api.steemtools.cf/get_blog_count?url=";       // steemtools api
var api = url.concat(msg);                                    // generate api address

 Request.get(api, (error, response, body) => { if(error) { return console.dir(error);
 // Get data in JSON from API by HTTP request
  }
 
var result = JSON.parse(body);        // convert json to object

//run only when total_words value is not equal to zero or null

if(result.total_words !== 0){
message.channel.send({embed:{
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: message.content,
    url: message.content,
    fields: [{
        name: "Total Words",
        value: result.total_words
      },
      {
        name: "Total Characters",
        value: result.total_char
      },
      {
        name: "Total Votes",
        value: result.net_votes
      }
    ],
    footer: {
      text: "This BOT is developed by © Nawab69"
    }
  }
});      // send embed message 
};


  });
  
  };

  // Here you can add more command

});



// client.login("client secret");     // insert client secret here (uncomment)

client.login(process.env.BOT_TOKEN);  //BOT_TOKEN is the Client Secret. Only for heroku server.  (comment this line if you run own server)
