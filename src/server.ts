import express from "express";

const app = express()

app.get("/", (request, response) => {
    response.json({message:"Tout est OK sur la route principale"})
})

app.listen(3000, () => {
  console.log("Server en fonctionnement");

})
