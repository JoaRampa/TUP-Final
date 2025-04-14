export const Button = ({label, parentMethod}) => {
  return (
    <button class="button" onClick={parentMethod}>
      {label}
    </button>
  )
} 