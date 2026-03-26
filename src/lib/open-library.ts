// Open Library API — Free, no auth needed
// Docs: https://openlibrary.org/dev/docs/api/search

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
  number_of_pages_median?: number;
  language?: string[];
  isbn?: string[];
}

export interface BookSearchResult {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  year: number | null;
  subjects: string[];
  pages: number | null;
  isbn: string | null;
}

export async function searchBooks(query: string, limit = 12): Promise<BookSearchResult[]> {
  if (!query.trim()) return [];

  const res = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}&fields=key,title,author_name,first_publish_year,cover_i,subject,number_of_pages_median,isbn`
  );

  if (!res.ok) return [];

  const data = await res.json();
  const docs: OpenLibraryBook[] = data.docs || [];

  return docs.map((doc) => ({
    id: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] || "Unknown",
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    year: doc.first_publish_year || null,
    subjects: (doc.subject || []).slice(0, 3),
    pages: doc.number_of_pages_median || null,
    isbn: doc.isbn?.[0] || null,
  }));
}

export async function getBookDetails(workId: string) {
  const res = await fetch(`https://openlibrary.org${workId}.json`);
  if (!res.ok) return null;
  return res.json();
}

export function getCoverUrl(coverId: number, size: "S" | "M" | "L" = "M"): string {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

// Get a daily inspirational quote from a free API
export async function getDailyQuote(): Promise<{ text: string; author: string } | null> {
  try {
    const res = await fetch("https://api.quotable.io/quotes/random?tags=education|reading|books&limit=1");
    if (!res.ok) {
      // Fallback quotes if API is down
      const fallbacks = [
        { text: "Um leitor vive mil vidas antes de morrer. Quem nunca lê vive apenas uma.", author: "George R.R. Martin" },
        { text: "A leitura é para a mente o que o exercício é para o corpo.", author: "Joseph Addison" },
        { text: "Não existe navio como um livro para nos levar a terras distantes.", author: "Emily Dickinson" },
      ];
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
    const data = await res.json();
    return data[0] ? { text: data[0].content, author: data[0].author } : null;
  } catch {
    return { text: "A leitura é uma viagem para quem não pode pegar o trem.", author: "Francis de Croisset" };
  }
}
