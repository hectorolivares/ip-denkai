export function LoadingStatus() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 grow min-h-75">
      <div className="w-14 h-14 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin"></div>
      <h2 className="animate-pulse opacity-80 text-[14px]">
        Rastreando dirección IP...
      </h2>
    </div>
  );
}
