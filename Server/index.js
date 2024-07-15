  const express = require("express");
  const cors = require("cors");
  const jwt = require("jsonwebtoken");
  const cookieParser = require("cookie-parser");
  const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
  require ('dotenv').config();
  const port = process.env.PORT || 9000;
  const app = express();

  const corsOptions = {
      origin: ["http://localhost:5173", "http://localhost:5174", "https://roomify-3c4bc.web.app", "https://roomify-3c4bc.firebaseapp.com/" ],
      credentials: true,
      optionsSuccessStatus: 200, 
  }
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());

  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xmkkdak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });


  // jwt middleware
  const verifyToken = (req, res, next) => {
    const token = req.cookies?.token; 
        if(!token) {
            return res.status(401).send({ message: "Unauthorized access" });
        }
          if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
              if (err) {
                console.log(err);
                return res.status(401).send({ message: "Forbidden access" });
              }
              console.log(decoded);
              req.user = decoded;
              next();
            });
          }
          
         
    }


    async function run() {
      try {

          const roomsCollection = client.db("Hotel").collection("rooms");
          const bookingsCollection = client.db("Hotel").collection("bookings");
          const reviewCollection = client.db("Hotel").collection("reviews");

        // jwt token
        app.post('/jwt', async (req, res) => {
          const user = req.body
          const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '365d',
          })
          res
            .cookie('token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            })
            .send({ success: true })
        })
       
        // clear token on log out
        app.get('/logout', (req, res) => {
          res
            .clearCookie('token', {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
              maxAge: 0,
            })
            .send({ success: true })  
        })

        //get all rooms data from db
        app.get('/rooms', async (req, res) => {
          const filter = req.query.filter;
          const sort = req.query.sort;
          let search = req.query.search; 
        
          if (search) {
            search = new RegExp(search, 'i'); 
          } else {
            search = { $regex: '', $options: 'i' }; 
          }
        
          const query = {
            name: search,
          };
        
          if (filter) query.category = filter;
          
          let options = {};
          if (sort) options = { sort: { pricePerNight: sort === 'asc' ? 1 : -1 } };
        
          const result = await roomsCollection
            .find(query, options)
            .toArray();
        
          res.send(result);
        });

          


        // get single room data from db
        app.get("/rooms/:id", async(req, res) => {
          const id = req.params.id;
          const query = {_id: new ObjectId(id)};
          const room = await roomsCollection.findOne(query);
          const reviewQuery = {roomId: id};
          const totalReviews = await reviewCollection.countDocuments(reviewQuery);
          const result = {...room, totalReviews};
          res.send(result)
        })


        // create bookings data to db
        app.post("/bookings", verifyToken, async(req, res) => {

          if (req.user.email !== req.body.userEmail) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
          const booking = req.body;
          const result = await bookingsCollection.insertOne(booking);
          res.send(result)
        })

        // get all bookings data from db by email
        app.get('/myBookings', verifyToken, async (req, res) => {
          const tokenEmail = req.user.email;
          const email = req.query.email;

          if (tokenEmail !== email) {
            return res.status(403).send({ message: 'forbidden access' });
          }
          const query = { userEmail: email };
          const result = await bookingsCollection.find(query).toArray();
          console.log("Bookings found:", result);
          res.send(result);
      });

      // cancel booking
      app.delete('/bookings/:id', async(req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await bookingsCollection.deleteOne(query);
        res.send(result)
      })

      // update booking date
      app.patch('/bookings/:id', verifyToken, async(req, res) => {
        const tokenEmail = req.user.email;
         

        const id = req.params.id;
        const updatedDate = new Date(req.body.date);
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            date: updatedDate
          },
        }

        const result = await bookingsCollection.updateOne(filter, updateDoc);
        res.send(result)
      })

      //create a new review
      app.post('/reviews', async(req, res)=>{
        const review = req.body;
        review.timestamp = new Date();
        const result = await reviewCollection.insertOne(review);
        res.send(result)
      })

      //get reviews from specific room
      app.get('/reviews/:roomId', async(req, res)=>{
        const roomId = req.params.roomId;
        const reviews = await reviewCollection.find({roomId: roomId}).sort({timestamp: -1}).toArray();
        res.json(reviews)
      })

      
      


        // get all rooms from db for pagination



        // get all rooms count from db 

        
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } 
      finally {
        // Ensures that the client will close when you finish/error
      
      }
    }
    run().catch(console.dir);

    app.get('/', (req, res) => {
      res.send('Hello world....')
    })

  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  })

