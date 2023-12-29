/**
 * A simple title component.
 *
 * @param {Object} props - The props for the ComTitle component.
 * @param {string} props.text - The text to display as the title.
 * @param {string} props.className - The CSS class name(s) for styling the title.
 * @returns {JSX.Element} The ComTitle component.
 */
function ComTitle({ text, className }) {
  return (
    <div>
      <h1 className={className}>{text}</h1>
    </div>
  );
}

export default ComTitle;
