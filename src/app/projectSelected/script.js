// URL de exemplo
const url = "https://www.example.com/user/123";

// Usando expressão regular para capturar o ID
const regex = /\/user\/(\d+)/;
const match = url.match(regex);

if (match) {
  const userId = match[1];  // O ID estará no primeiro grupo da regex
  console.log(userId);  // Saída: 123
} else {
  console.log("ID não encontrado");
}
