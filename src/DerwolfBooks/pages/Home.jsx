import { Link } from "react-router-dom";
import books from "../Books";
import "../styles/home.css";
const sortedBooks = [
  ...books.filter(b => b.disponivel).sort((a, b) => b.nota - a.nota),
  ...books.filter(b => !b.disponivel).sort((a, b) => b.nota - a.nota),
];
function HomePage() {
  return (
    <div className="home-container">
      <h1 className="home-title">Derwolf Books</h1>
      <p className="home-subtitle">Escolha um livro para ler ou baixar.</p>

      <div className="books-grid">
        {sortedBooks.map((livro) => (
          <div key={livro.id} className="book-card">
            <img
              src={livro.imagem}
              alt={`Capa de ${livro.nome}`}
              className="book-image"
              style={{ borderRadius: "20px" }}
            />
            <h2 className="book-title">{livro.nome}</h2>
            <p className="book-description">{livro.descricao}</p>
            <p className="book-rating">Nota: {livro.nota} / 10</p>

            {livro.disponivel ? (
              <Link to={`/derwolfbooks/books/${livro.id}`} className="book-link">
                Ler online
              </Link>
            ) : (
              <button
                disabled
                className="book-link book-link-disabled"
                title="Livro indisponível no momento"
              >
                Indisponível
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="donation-section">
        <h2>Gostou dos livros?</h2>
        <p>
          Se quiser apoiar o projeto Derwolf Books e ajudar na produção de mais
          conteúdos gratuitos, considere fazer uma doação.
        </p>
        <a
          href="https://link.mercadopago.com.br/abnercruz"
          target="_blank"
          rel="noopener noreferrer"
          className="donation-button"
        >
          Fazer uma doação
        </a>
      </div>
    </div>
  );
}

export default HomePage;
