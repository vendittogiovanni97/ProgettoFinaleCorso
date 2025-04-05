const NotFound404Paged = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[var(--background-dark)] to-[var(--background-light)]">
      <div className="text-[var(--primary-color)] text-9xl font-bold animate-bounce">404</div>
      <div className="text-[var(--text-light)] text-2xl mt-4 animate-pulse">
        Oops! Pagina non trovata.
      </div>
      <div className="mt-8">
        <a
          href="/home"
          className="px-6 py-3 bg-[var(--primary-color)] text-[var(--text-dark)] font-semibold rounded-lg shadow-lg hover:bg-[var(--secondary-color)] transition duration-300 ease-in-out transform hover:scale-105"
        >
          Torna alla Home
        </a>
      </div>
    </div>
  );
};

export default NotFound404Paged;
