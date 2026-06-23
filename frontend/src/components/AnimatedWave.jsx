import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../assets/styles/animatedWave.css";

function AnimatedWave() {
  const pathRef = useRef(null);

  useEffect(() => {
    const paths = [
      `M0 160
       C250 40 450 280 768 160
       C1050 40 1250 280 1536 160
       L1536 400
       L0 400
       Z`,

      `M0 140
       C250 260 500 40 768 170
       C1050 280 1280 60 1536 140
       L1536 400
       L0 400
       Z`,

      `M0 180
       C300 80 500 260 768 140
       C1000 40 1300 260 1536 180
       L1536 400
       L0 400
       Z`,
    ];

    let index = 0;

    const morph = () => {
      index = (index + 1) % paths.length;

      gsap.to(pathRef.current, {
        duration: 4,
        attr: {
          d: paths[index],
        },
        ease: "sine.inOut",
        onComplete: morph,
      });
    };

    pathRef.current.setAttribute("d", paths[0]);
    morph();
  }, []);

  return (
    <div className="wave-wrapper">
      <svg
        className="jelly-wave"
        viewBox="0 0 1536 320"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          className="wave-path"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default AnimatedWave;