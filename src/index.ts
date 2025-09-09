import { error } from "console";
import express from "express";
import { Express, Request, Response } from "express";

const app: Express = express();
const port: Number = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});

app.use(express.json());

type Usuario = {
  id: number;
  nome: string;
  idade: number;
};
const users: Usuario[] = [
  { id: 1, nome: "ana", idade: 20 },
  { id: 2, nome: "Pedro", idade: 12 },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo a minha API!");
});

app.get("/users", (req: Request, res: Response) => {
  res.json(users);
});

app.get("/users/:id", (req: Request, res: Response) => {
  const userId: number = Number(req.params.id);
  const usuariosEncontrados: Usuario | undefined = users.find((user) => user.id == userId)
  if (!usuariosEncontrados) {
    res.status(404).json("Usuario nao encontrado")
  } 
  res.json(usuariosEncontrados)
});

app.put("/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const dadosAtualizados = req.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  users[userIndex] = { ...users[userIndex], ...dadosAtualizados };

  res.json(users[userIndex]);
});

app.post("/users", (req: Request, res: Response) => {
  const novoUsuario: Usuario = req.body;
  users.push(novoUsuario);
  res.status(201).json(users);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const userRemovido = users.splice(userIndex, 1);

  res.json(userRemovido[0]);
});
