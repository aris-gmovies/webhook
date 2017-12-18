 'use strict'
    
    const express = require('express')
    const bodyParser = require('body-parser')
    const request = require('request')
    const app = express()

    app.set('port', (process.env.PORT || 5000))

    // Process application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({extended: false}))

    // Process application/json
    app.use(bodyParser.json())

    // Index route
    app.get('/', function (req, res) {
      res.send('Hello world, I am a chat bot asd asfa')
    })

    // for Facebook verification
    app.get('/webhook/', function (req, res) {
      if (req.query['hub.verify_token'] === 'gmovies-webhook') {
        res.send(req.query['hub.challenge'])
      }
      res.send('Error, wrong token')
    })

    // Spin up the server
    app.listen(app.get('port'), function() {
      console.log('running on port', app.get('port'))
    })

    app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
      let event = req.body.entry[0].messaging[i]
      let sender = event.sender.id
      if (event.message && event.message.text) {
        let text = event.message.text
        }
      if (event.postback) {
        let text = JSON.stringify(event.postback)
        decideFaqButton(sender, text)
        continue
      }
    }
    res.sendStatus(200)
  })


  //* Selected Action *//  
  function decideFaqButton(sender, text1) {
      let text = text1.toLowerCase()
      
      if (text.includes("general")) {
          general(sender, "You have selected 'General'")

      } else if (text.includes("whatisgmovies")) {
         sendTextMessage(sender, "GMovies is the Philippines' first and only movie schedule and ticketing platform that aggregates over 100 cinemas nationwide - including Ayala Malls cinemas, SM Malls cinemas, Theater Mall & Promenade Greenhills cinemas, Lucky Chinatown Mall and Cinema ‘76.\n\nAvailable for download for free on Google Play Store (Android) and on the App Store (iOS) as well as on the web via www.gmovies.ph, GMovies makes booking seats and buying cinema tickets convenient and hassle-free. Skip the lines and go straight to the cinema door with GMovies. Get inside, not in line!\n\nCheck out GMovies for movie reviews and exclusive movie ticket promos too!")
           continueFAQ(sender, "Click below to continue")

      } else if (text.includes("features")) {
          sendTextMessage(sender, "GMovies is the ultimate app for movie buffs and movie-goers.\n\n- Book seats & buy tickets to over 100 partner cinemas - Ayala Malls, SM Malls, Theater Mall & Promenade Greenhills, Lucky Chinatown Mall and Cinema ‘76.\n\n - Check movie schedules of all cinemas nationwide.\n\n - Stay up-to-date about upcoming blockbusters.\n\n - Read up on the latest movie reviews.\n\n - Get exclusive movie ticket perks!")
            continueFAQ(sender, "Click below to continue")

      } else if (text.includes("schedules")) {
          schedules(sender, "You have selected 'Schedules'")

      } else if (text.includes("moviesched")) {
          sendTextMessage(sender, "You can check out movie schedules on mobile app from any of your favorite cinemas nationwide.")
            continueFAQ(sender, "Click below to continue")

      } else if (text.includes("availableseats")) {
          sendTextMessage(sender, "You can view available seats of our cinema partners - Ayala Malls Cinemas (Abreeza, Ayala Center Cebu, Bonifacio High Street, Centrio, Glorietta 4, Greenbelt 1, Greenbelt 3, Harbor Point, Marquee, Market! Market!, Trinoma), SM Cinemas, Greenhills Cinemas (Promenade Mall and Theater Mall), Lucky Chinatown Mall and Cinema ‘76.")
            continueFAQ(sender, "Click below to continue")

      } else if (text.includes("reservation")) {
          reservation(sender, "You have selected reservation")

      }  else if (text.includes("seatsbuy")) {
          sendTextMessage(sender, "You can purchase movie tickets through the GMovies app in 3 simple steps.\n\n 1. Download the GMovies app from the App Store or Google Play Store and sign up.\n\n 2. Select a movie, preferred movie theater, desired screening time and seats then press “Buy Tickets”.\n\n 3. Choose your preferred mode of payment from our list of payment options.\n\n - For promo codes")
            continueFAQ(sender, "Click below to continue") 
      
      } else if (text.includes("paymentopt")) {
          sendTextMessage(sender, "You can pay via locally-issued Credit Card (MasterCard/Visa), Bank Deposit (over-the-counter payment), G-Cash, Ayala Malls Cinema's M-Pass or through claim codes. For Credit Card and Bank Deposit payments, an additional convenience fee of Php25 per ticket is charged for Ayala Malls Cinemas, Cinema ‘76, and Php20 per ticket for all other partner cinemas.")
            continueFAQ(sender, "Click below to continue") 

      } else if (text.includes("error")) {
          sendTextMessage(sender, "Our system locks-in the seat/s selected for 20 minutes once you have reached the payment page, hence when you tried to check the seats again after your previous unsuccessful transaction, they were still marked occupied. You may try to purchase again after the said lock-in period.") 
          continueFAQ(sender, "Click below to continue") 
      
      } else if (text.includes("refund")) {
          sendTextMessage(sender, "For tickets purchased in any Ayala Malls Cinemas, you may request to cancel your credit card transaction up to three (3) hours before the screening time. For GCash and MPass transactions, you may cancel your reservation one (1) hour before the screening time. Kindly send the electronic payment confirmation to support@gmovies.ph.\n\nTickets purchased for Greenhills Cinemas, SM Cinema, Robinsons Malls Cinemas, Cinema ‘76, and Lucky Chinatown are final, non-refundable and non-exchangeable, as requested by our cinema partners.") 
          continueFAQ(sender, "Click below to continue") 
      
      } else if (text.includes("contact")) {
          sendTextMessage(sender, "If you experience any glitch or difficulty with GMovies, please email us at support@gmovies.ph.") 
          continueFAQ(sender, "Click below to continue") 
      
      } else {
         sendTextMessage(sender, "Gmovies Faqs")
         sendFaqButton(sender, "Please select any button for Gmovies information")
      }
    }     

    /* Main Menus */
    function sendFaqButton(sender, text) {
      let messageData = {
        
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": text,
            "buttons": [
            {
              "type": "postback",
              "title": "GENERAL",
              "payload": "general",
            },
            {
              "type": "postback",
              "title": "SCHEDULES",
              "payload": "schedules",
            },
            {
              "type": "postback",
              "title": "RESERVATION",
              "payload": "reservation",
            },

            ],

          }

        }
      }
      sendRequest(sender, messageData)
    }

    // FAQ GENERAL

    /* Output from General Tab */
    function general(sender, text) {
      let messageData = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": text,
            "buttons": [
            {
              "type": "postback",
              "title": "What is GMovies?",
              "payload": "whatisgmovies",
            },
            {
              "type": "postback",
              "title": "Features of GMovies",
              "payload": "features",
            },
          ],
         }
        }
      }
      sendRequest(sender, messageData)
    }
    
    // FAQ SCHEDULES

    /* Output from Schedules Tab */
    function schedules(sender, text) {
      let messageData = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": text,
            "buttons": [
            {
              "type": "postback",
              "title": "Check movie schedule",
              "payload": "moviesched",
            },
            {
              "type": "postback",
              "title": "Available Seats",
              "payload": "availableseats",
            },
          ],
         }
        }
      }
      sendRequest(sender, messageData)
    }
    
// FAQ GENERAL

    /* Output from General Tab */
    function reservation(sender, text) {
      let messageData = {
       "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Reservation",
              "subtitle": "How do I book seats and buy tickets through GMovies mobile app?",
              "image_url": "https://s3.envato.com/files/228448382/screenshots/10_Background_Color.png",
              "buttons": [{
                "type": "postback",
                "title": "Click here for info",
                "payload": "seatsbuy",
              }],
            }, {
              "title": "Reservation",
              "buttons": [{
                "type": "postback",
                "title": "Click here for info",
                "payload": "paymentopt",
              }],
            },{
              "title": "Reservation",
              "buttons": [{
                "type": "postback",
                "title": "Click here for info",
                "payload": "error",
              }],
            }, {
              "title": "Reservation",
              "buttons": [{
                "type": "postback",
                "title": "Click here for info",
                "payload": "refund",
              }],
            }, {
              "title": "Reservation",
              "buttons": [{
                "type": "postback",
                "title": "Click here for info",
                "payload": "contact",
              }],
            }]
          }
        }
    }
      sendRequest(sender, messageData)
    }
    
    

    //** TEMPLATE **//

    const token = process.env.PAGE_ACCESS_TOKEN

    /* Sending Request */
    function sendRequest(sender, messageData) {
       request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
          recipient: {id:sender},
          message: messageData,
        }
      }, function(error, response, body) {
        if (error) {
          console.log('Error sending messages: ', error)
        } else if (response.body.error) {
          console.log('Error: ', response.body.error)
        }
      })
    }

    /* Continue Button */
    function continueFAQ(sender, text) {
      let messageData = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "button",
            "text": text,
            "buttons": [
            {
              "type": "postback",
              "title": "Continue",
              "payload": "continue",
            },
          ],
         }
        }
      }
      sendRequest(sender, messageData)
    }

    function decideToContinue(sender, text1) {
      let text = text1.toLowerCase()
      if (text.includes("continue")) {
        decideFaqButton(sender, text)
      }
    }

    /* Test Message */
    function sendTextMessage(sender, text) {
      let messageData = { text: text }
      sendRequest(sender, messageData)
    }