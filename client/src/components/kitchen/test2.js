export default function TestTwo({ open, setOpen }) {
  // console.log(open)

  return (
    <button
      onClick={() => {
        if (open) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      }}
    >
      clickme
    </button>
  );
}
