type IntervalHandle = number;

export function startMinuteCountdown(
  startTimeString: string,
  onUpdate: (minutesLeft: number) => void,
  onComplete?: () => void
): IntervalHandle {
  const startDate = new Date(startTimeString);
  const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // +30 min

  // Función que calcula y notifica
  const tick = () => {
    const now = new Date();
    const diffMs = endDate.getTime() - now.getTime();
    const minutesLeft = Math.ceil(diffMs / (60 * 1000));

    if (minutesLeft > 0) {
      onUpdate(minutesLeft);
    } else {
      onUpdate(0);
      if (onComplete) onComplete();
      clearInterval(interval);
    }
  };

  // Llamada inmediata para mostrar el estado actual
  tick();
  // Y luego cada minuto
  const interval = setInterval(tick, 60 * 1000);

  return interval as unknown as number;
}
