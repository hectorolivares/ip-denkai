interface ErrorStatusProps {
  error: string;
  onRetry: () => void;
}

export function ErrorStatus({ error, onRetry }: ErrorStatusProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 flex-grow min-h-[300px]">
      <div className="text-red-500 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h1 className="text-[16px] text-red-500 font-bold tracking-tight">
        Error de Conexión
      </h1>
      <p className="opacity-80 text-[14px]">{error}</p>
      <button
        className="counter mt-6 !text-[14px] !px-6 !py-3"
        onClick={onRetry}
      >
        Reintentar
      </button>
    </div>
  );
}
