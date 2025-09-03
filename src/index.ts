import express from "express";

const app = express();

app.use(express.json());

const users = [
  { nome: "ana", idade: 20 },
  { nome: "Pedro", idade: 12 },
];

app.get("/", (req, res) => {
  res.send("Bem vindo a minha API!");
});

app.get("/users", (req, res) => {
  res.json(users)
});

app.post("/users", (req, res) => {
  const novoUsuario = req.body;
  users.push(novoUsuario);
  res.status(201).json(users);
})

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
