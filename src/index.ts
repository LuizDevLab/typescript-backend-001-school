import { error } from "console";
import express from "express";

const app = express();

app.use(express.json());

const users = [
  { id: 1, nome: "ana", idade: 20 },
  { id: 2, nome: "Pedro", idade: 12 },
];

app.get("/", (req, res) => {
  res.send("Bem vindo a minha API!");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const dadosAtualizados = req.body;

  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  users[userIndex] = { ...users[userIndex], ...dadosAtualizados };

  res.json(users[userIndex]);
});

app.post("/users", (req, res) => {
  const novoUsuario = req.body;
  users.push(novoUsuario);
  res.status(201).json(users);
});

app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const userIndex =users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const userRemovido = users.splice(userIndex, 1)

  res.json(userRemovido[0])
})

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
