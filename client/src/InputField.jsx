export default function InputField({ id, label, value, onChange, error }) {
  return (
    <div className='input'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
      />
      <p>{error}</p>
    </div>
  )
}