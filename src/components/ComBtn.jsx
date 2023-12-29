const ComBtn = ({ text, onClick, className }) => {
  return (
    <button type='button' onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default ComBtn;
