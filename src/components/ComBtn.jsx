/**
 * A simple button component.
 *
 * @param {Object} props - The props for the ComBtn component.
 * @param {string} props.text - The text to display on the button.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * @param {string} props.className - The CSS class name(s) for styling the button.
 * @returns {JSX.Element} The ComBtn component.
 */
const ComBtn = ({ text, onClick, className }) => {
  return (
    <button type='button' onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default ComBtn;
