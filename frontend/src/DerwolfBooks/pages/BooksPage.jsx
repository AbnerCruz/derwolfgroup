import { useParams } from "react-router-dom";
import books from "../Books";
import "../styles/books.css";

function BooksPage() {
  const { id } = useParams();
  const book = books.find((l) => l.id === parseInt(id));

  if (!book) return <p>Livro não encontrado.</p>;

  return (
    <div className="book-page-container">
      <h1 className="book-title">{book.nome}</h1>
      <p className="book-description">{book.descricao}</p>

      <div className="pdf-viewer">
        <iframe
          src={`${book.arquivo}?v=${Date.now()}`}
          width="100%"
          height="600px"
          title="Leitor PDF"
        />
      </div>

      <a href={book.arquivo} download className="download-link">
        Baixar PDF
      </a>
      <div className="donation-section">
        <h2>Gostou do livro?</h2>
        <p>Se quiser apoiar o projeto Derwolf Books e ajudar na produção de mais conteúdos gratuitos, considere fazer uma doação.</p>
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

export default BooksPage;
