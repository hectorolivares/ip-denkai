interface CopyNotificationProps {
  show: boolean;
}

export function CopyNotification({ show }: CopyNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
      <div className="font-mono text-[12px] font-bold text-[var(--accent)] bg-purple-500/35 px-6 py-2 rounded-full border border-[var(--accent-border)] shadow-lg backdrop-blur-lg">
        ¡COPIADO AL PORTAPAPELES!
      </div>
    </div>
  );
}
