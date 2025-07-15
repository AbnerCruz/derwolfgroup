import { Link } from "react-router-dom";
import React, { useState } from "react";
import books from "../Books";
import "../styles/home.css";

import { genre } from "../Books";
import { subGenre } from "../Books";


function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function HomePage() {
  const [searchText, setSearchText] = useState("");
  const [selectedgenre, setSelectedgenre] = useState("");
  const [selectedsubGenre, setSelectedsubGenre] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("disponivel");
  const top3Books = [...books]
  .filter((b) => b.disponivel)
  .sort((a, b) => b.nota - a.nota)
  .slice(0, 3);

  const livrosFiltrados = books.filter((livro) => {
    const { genre, subGenre } = livro.filtros || {};

    const genreOk = selectedgenre === "" || genre === selectedgenre;
    const subGenreOk =
      selectedsubGenre.length === 0 ||
      selectedsubGenre.every((t) => subGenre?.includes(t));

    const availabilityOk =
      availabilityFilter === "" ||
      (availabilityFilter === "disponivel" && livro.disponivel) ||
      (availabilityFilter === "indisponivel" && !livro.disponivel);

    const searchOk =
      searchText.trim() === "" ||
      livro.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      livro.descricao.toLowerCase().includes(searchText.toLowerCase());

      return genreOk && subGenreOk && availabilityOk && searchOk;
    });

    const isSorting = sortOrder === "asc" || sortOrder === "desc";

    const sortedBooks = isSorting
      ? [
          ...livrosFiltrados.filter((b) => b.disponivel).sort((a, b) =>
            sortOrder === "asc" ? a.nota - b.nota : b.nota - a.nota
          ),
          ...livrosFiltrados.filter((b) => !b.disponivel).sort((a, b) =>
            sortOrder === "asc" ? a.nota - b.nota : b.nota - a.nota
          ),
        ]
      : shuffleArray([
          ...livrosFiltrados.filter((b) => b.disponivel),
          ...livrosFiltrados.filter((b) => !b.disponivel),
    ]);
  
  function toggleTema(tema) {
    setSelectedsubGenre(prev =>
      prev.includes(tema)
        ? prev.filter(t => t !== tema)
        : [...prev, tema]
    );
  }
  return (
    <div className="home-container">
      <h1 className="home-title">Derwolf Books</h1>
      <p className="home-subtitle">Escolha um livro para ler ou baixar.</p>

      <div className="top-rated-section">
        <h2>Melhores</h2>
        <div className="books-grid">
          {top3Books.map((livro) => (
            <div key={livro.id} className="book-card book-card-small">
              <img src={livro.imagem} alt={`Capa de ${livro.nome}`} className="book-image" />
              <h2 className="book-title">{livro.nome}</h2>
              <p className="book-description">{livro.descricao}</p>
              <p className="book-rating">Nota: {livro.nota} / 10</p>

              <Link to={`/derwolfbooks/books/${livro.id}`} className="book-link">
                Ler online
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <p>Filtros</p>
        {/* Grupo: Filtro por gênero */}
        <div className="filters-group">
          <h3>Gênero</h3>
          <select value={selectedgenre} onChange={(e) => setSelectedgenre(e.target.value)}>
            <option value="" selected>Todos</option>
            {genre.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {/* Grupo: Filtro por subgêneros */}
        <div className="filters-group">
          <h3>Subgêneros</h3>
          <div className="filters-checkboxes">
            {subGenre.map((t) => (
              <label key={t}>
                <input
                  type="checkbox"
                  value={t}
                  checked={selectedsubGenre.includes(t)}
                  onChange={() => toggleTema(t)}
                />
                {t}
              </label>
            ))}
          </div>
        </div>

        {/* Grupo: Ordenação */}
        <div className="filters-group">
          <h3>Ordenar</h3>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Aleatório</option>
            <option value="desc">Maior nota</option>
            <option value="asc">Menor nota</option>
          </select>
        </div>

        <div className="filters-group">
          <h3>Disponibilidade</h3>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="disponivel">Disponível</option>
            <option value="indisponivel">Indisponível</option>
          </select>
        </div>

        <div className="filters-group">
          <button
            onClick={() => {
              setSelectedgenre("");
              setSelectedsubGenre([]);
              setAvailabilityFilter("disponivel");
              setSortOrder("");
            }}
          >
            Limpar filtros
          </button>
        </div>
      </div>

      <div className="filters-group" style={{ width: "100%", marginBottom: "1rem" }}>
        <h3>Pesquisar</h3>
        <input
          type="search"
          placeholder="Digite termo para buscar em título ou descrição..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
          aria-label="Campo de pesquisa por texto"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      <div className="books-grid">
        {sortedBooks.map((livro) => (
          <div key={livro.id} className="book-card book-card-large">
            <img src={livro.imagem} alt={`Capa de ${livro.nome}`} className="book-image" />
            <h2 className="book-title">{livro.nome}</h2>
            <p className="book-description">{livro.descricao}</p>
            <p className="book-rating">Nota: {livro.nota} / 10</p>

            {livro.disponivel ? (
              <Link to={`/derwolfbooks/books/${livro.id}`} className="book-link">
                Ler online
              </Link>
            ) : (
              <button disabled className="book-link book-link-disabled">
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
