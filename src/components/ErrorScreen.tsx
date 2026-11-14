interface Props {
  onRetry: () => void
}

// Экран «Критическая ошибка»: нет сети, сервер недоступен или вернул ошибку
export function ErrorScreen({ onRetry }: Props) {
  return (
    <div className="state-screen" role="alert">
      <div className="state-screen__emoji" aria-hidden="true">
        🛸
      </div>
      <h2 className="state-screen__title">Что-то пошло не так</h2>
      <p className="state-screen__text">
        Не получилось загрузить список сотрудников. Проверьте интернет и
        попробуйте ещё раз.
      </p>
      <button className="link-button" type="button" onClick={onRetry}>
        Попробовать снова
      </button>
    </div>
  )
}
