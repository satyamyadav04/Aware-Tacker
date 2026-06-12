import "./hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-banner">

        <div className="left">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
            alt="Nature"
          />
        </div>

        <div className="right">
          <h1>Keep Your Garden Chemical-Free</h1>

          <p>
            Track your environmental impact, reduce waste,
            and build a greener future with EcoTrack.
          </p>

         
        </div>

      </div>
    </section>
  );
}

export default Hero;