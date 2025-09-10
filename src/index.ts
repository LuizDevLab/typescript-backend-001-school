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


  if (isNaN(userId) || userId <= 0) {
    res.status(400).json("Id inválido")
  }

  const usuariosEncontrados: Usuario | undefined = users.find((user) => user.id == userId)
  if (!usuariosEncontrados) {
    res.status(404).json("Usuario nao encontrado")
  } 
  res.json(usuariosEncontrados)
});

app.put("/users/:id", (req: Request, res: Response) => {
  const userId: number = Number(req.params.id);
  const { nome, idade } = req.body;

  const userIndex: number = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const usuarioAtt: Usuario = {id: userId, nome, idade}
  users[userIndex] = usuarioAtt;
  res.json(usuarioAtt);
});

app.post("/users", (req: Request, res: Response) => {
  const { nome, idade } = req.body; // nome: "nome", idade: number

  if (typeof nome !== "string" || nome.trim() == "") {
    res.status(400).json("nome inválido")
  }

  if (typeof idade !== "number" || !Number.isInteger(idade) || idade <= 0){
    res.status(400).json("Idade inválida")
  }

  /*
  let maxId: number = 0;
  for (const user of users){
    if (user.id > maxId) maxId = user.id
  }
  */
  const maxId: number = users.reduce( (max, user) => (user.id > max ? user.id : max), 0 )  

  const novoUsuario: Usuario = {id: maxId + 1, nome, idade }

  users.push(novoUsuario);
  res.status(201).json(users);
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const userId: number = Number(req.params.id);

  const userIndex: number = users.findIndex((user) => user.id === userId);

  if (isNaN(userId) || userId <= 0) {
    res.status(400).json("Id inválido")
  }

  if (userIndex === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  users.splice(userIndex)
  res.status(204).send();
});
