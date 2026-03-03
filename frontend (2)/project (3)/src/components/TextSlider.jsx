import './textSlider.css';

const items = [
  "Color In Your Look",
  "Elegant And Everlasting",
  "Black Friday Offer",
  "Charm For Your Everyday",
  "The Iconic Collection",
];

function TextSlider() {
  // Duplicate the items so the CSS animation can scroll seamlessly in a loop
  const list = [...items, ...items];

  return (
    <div className="text-slider" aria-label="Promotional text carousel">
      <div className="slider-track">
        {list.map((text, i) => (
          <div className="slide" key={`${i}-${text}`} aria-hidden={i >= items.length}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TextSlider;


